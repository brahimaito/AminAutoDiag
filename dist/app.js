'use strict';
const whatsappNumber = '212607456120';
const generalMessage = 'Bonjour Amin Auto Diagnostic, je souhaite me renseigner pour mon véhicule. Pouvez-vous me conseiller ?';
const services = {
  diagnostic: {
    label: 'Diagnostic auto / moto',
    title: 'Diagnostic auto & moto',
    description: 'Voyant allumé, panne ou démarrage difficile ? Parlons de votre véhicule et de ses symptômes.',
    message: 'Bonjour Amin Auto Diagnostic, je souhaite faire un diagnostic de mon véhicule. Pouvez-vous me renseigner ?'
  },
  cles: {
    label: 'Programmation des clés',
    title: 'Programmation de clés',
    description: 'Une clé à programmer ? Vérifions ensemble les possibilités pour votre véhicule.',
    message: 'Bonjour Amin Auto Diagnostic, je souhaite programmer une clé pour mon véhicule. Est-ce possible chez vous ?'
  },
  fap: {
    label: 'Désactivation FAP / EGR / AdBlue',
    title: 'FAP / EGR / AdBlue',
    description: 'Parlons de votre demande de désactivation, selon votre véhicule et son usage.',
    message: 'Bonjour Amin Auto Diagnostic, je souhaite me renseigner sur la désactivation FAP / EGR / AdBlue pour mon véhicule.'
  },
  puissance: {
    label: 'Augmentation de puissance / couple',
    title: 'Puissance & couple',
    description: 'Envie d’optimiser les performances ? Étudions les possibilités selon votre moteur.',
    message: 'Bonjour Amin Auto Diagnostic, je souhaite me renseigner sur l’optimisation de puissance et de couple de mon véhicule.'
  },
  carplay: {
    label: 'Activation CarPlay / GPS',
    title: 'Activation CarPlay & GPS',
    description: 'CarPlay ou GPS : vérifions la compatibilité avec le système de votre voiture.',
    message: 'Bonjour Amin Auto Diagnostic, je souhaite activer CarPlay ou le GPS. Pouvez-vous vérifier la compatibilité de mon véhicule ?'
  }
};
// Only predefined service values can change the page; never render query text.
const requestedService = new URLSearchParams(window.location.search).get('service');
const landingService = Object.hasOwn(services, requestedService) ? requestedService : 'general';
if (landingService !== 'general') {
  document.getElementById('hero-service').textContent = services[landingService].title;
  document.querySelector('.hero-description').textContent = services[landingService].description;
  document.querySelectorAll('a.whatsapp[data-service="Conseil"]').forEach(link => {
    link.dataset.service = services[landingService].label;
  });
}
const trackContact = (eventName, params = {}) => {
  // dataLayer objects alone do not send custom events through gtag.js.
  // These are contact clicks, not confirmed conversations or appointments.
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, {...params, landing_service: landingService,
      funnel_version: 'contact_v2', send_to: 'G-09S8K7RNJY'});
  }
};
document.querySelectorAll('a.whatsapp').forEach(link => {
  const service = Object.values(services).find(item => item.label === link.dataset.service);
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(service ? service.message : generalMessage)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', () => {
    trackContact('whatsapp_click', {service: service ? service.label : 'Conseil', placement: link.dataset.placement || 'page'});
  });
});
document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('a[href^="tel:"]').forEach(link => link.addEventListener('click', () => {
  trackContact('phone_click', {placement: link.dataset.placement || 'page'});
}));
document.querySelectorAll('a[href*="maps.app.goo.gl"]').forEach(link => link.addEventListener('click', () => {
  trackContact('directions_click', {placement: link.dataset.placement || 'page'});
}));
