const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('dist/index.html', 'utf8');
const script = fs.readFileSync('dist/app.js', 'utf8');

function run(search, analytics = true) {
  const links = [...html.matchAll(/<a\b([^>]+)>/g)].map(([, attrs]) => {
    const values = Object.fromEntries([...attrs.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1], m[2]]));
    return {href: values.href, className: values.class || '', dataset: {service: values['data-service'], placement: values['data-placement']},
      handlers: {}, addEventListener(event, handler) { this.handlers[event] = handler; }};
  });
  const nodes = {'hero-service': {textContent: 'default'}, year: {}, description: {}};
  const events = [];
  const document = {
    getElementById: id => nodes[id],
    querySelector: () => nodes.description,
    querySelectorAll: selector => {
      if (selector.startsWith('a.whatsapp')) return links.filter(l => l.className.split(' ').includes('whatsapp') && (!selector.includes('[data-service') || l.dataset.service === 'Conseil'));
      if (selector.includes('tel:')) return links.filter(l => l.href.startsWith('tel:'));
      if (selector.includes('maps.app.goo.gl')) return links.filter(l => l.href.includes('maps.app.goo.gl'));
      throw new Error(`Uncovered selector: ${selector}`);
    }
  };
  vm.runInNewContext(script, {document, window: {location: {search}, ...(analytics ? {gtag: (...args) => events.push(args)} : {})}, URLSearchParams});
  return {links, nodes, events};
}

for (const key of ['', 'diagnostic', 'cles', 'fap', 'puissance', 'carplay', '__proto__', 'unknown']) {
  const {links, events, nodes} = run(`?service=${key}&utm_source=google`);
  const whatsapp = links.filter(l => l.className.split(' ').includes('whatsapp'));
  assert.equal(whatsapp.length, 11);
  for (const link of whatsapp) {
    const url = new URL(link.href);
    assert.equal(url.origin + url.pathname, 'https://wa.me/212607456120');
    const message = url.searchParams.get('text');
    assert.ok(message.startsWith('Bonjour Amin Auto Diagnostic,'));
    assert.ok(!message.includes('\n') && !message.includes('Année :'));
    link.handlers.click();
  }
  assert.equal(events.length, whatsapp.length, 'One custom event per WhatsApp click');
  assert.ok(events.every(([command, name, params]) => command === 'event' && name === 'whatsapp_click' && params.send_to === 'G-09S8K7RNJY'));
  const expected = ['diagnostic','cles','fap','puissance','carplay'].includes(key) ? key : 'general';
  assert.ok(events.every(([, , params]) => params.landing_service === expected));
  if (expected === 'general') assert.equal(nodes['hero-service'].textContent, 'default');
  else assert.notEqual(nodes['hero-service'].textContent, 'default');
  const serviceLink = whatsapp.find(l => l.dataset.placement === 'service' && l.dataset.service === whatsapp.find(l => l.dataset.placement === 'hero').dataset.service);
  if (expected !== 'general') assert.equal(serviceLink.href, whatsapp.find(l => l.dataset.placement === 'hero').href);
  links.filter(l => l.href.startsWith('tel:')).forEach(l => l.handlers.click());
  links.filter(l => l.href.includes('maps.app.goo.gl')).forEach(l => l.handlers.click());
  assert.ok(events.some(([, name]) => name === 'phone_click'));
  assert.ok(events.some(([, name]) => name === 'directions_click'));
}
const noAnalytics = run('', false);
noAnalytics.links.filter(l => l.handlers.click).forEach(l => l.handlers.click());
assert.equal((html.match(/gtag\('config', 'G-09S8K7RNJY'\)/g) || []).length, 1);
console.log('PASS: all 11 WhatsApp links, 5 service routes, invalid-query fallback, event dispatch and analytics-unavailable behavior.');
