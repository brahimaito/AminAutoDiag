# Amin Auto Diagnostic — Meknès

Static landing page. Serve `dist/` with any static HTTP server.

- Contact: +212607456120, direct WhatsApp and telephone links.
- Five service cards, each with its own prefilled WhatsApp message.
- Google Maps and Instagram link to the URLs supplied by the business.
- Selected AI illustrations are documented in `assets/generated/README.md`; optimized publication images live in `dist/images/`.
- Exact street address and opening hours were not supplied; no invented reviews, prices, opening times or vehicle compatibility claims are displayed. The ads-safe landing page uses French only; do not add Arabic-script or Darija copy while using formats reviewed under Display & Video 360 language rules.

## Ads measurement

`dist/app.js` pushes `whatsapp_click` (service, placement), `phone_click`, and `directions_click` to `window.dataLayer`. No Google tag/account ID has been supplied. These events are prepared for integration, but are **not currently sent to Google Ads or Analytics**. A WhatsApp click measures an outbound click, not a sent message, qualified lead or booking. Configure account tags and appropriate privacy handling before advertising; verify actual conversations and appointments separately.

## Hosting

`.openai/hosting.json` identifies the registered Site. The delivered Sites preview is owner-private; public hosting or a public custom domain is needed before using it as a Google Ads destination.
# AminAutoDiag
