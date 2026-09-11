'use strict';
const whatsappNumber = '212607456120';
const messageFor = service => `Salam Amin Auto Diagnostic, jit men site. Bghit ${service === 'Conseil' ? 'nsewel 3la service' : service} f Meknès.\n\nVéhicule / modèle : \nAnnée : \nMon besoin / problème : `;
document.querySelectorAll('a.whatsapp').forEach(link => {
  const service = link.dataset.service || 'Conseil';
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageFor(service))}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({event: 'whatsapp_click', service, placement: link.dataset.placement || 'page'});
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="tel:"]').forEach(link => link.addEventListener('click', () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event: 'phone_click'});
}));
document.querySelectorAll('a[href*="maps.app.goo.gl"]').forEach(link => link.addEventListener('click', () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({event: 'directions_click'});
}));
