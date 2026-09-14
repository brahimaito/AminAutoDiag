# Amin Auto Diagnostic — Meknès

Static landing page. Serve `dist/` with any static HTTP server.

- Contact: +212607456120, direct WhatsApp and telephone links.
- Five service cards, each with its own prefilled WhatsApp message.
- Google Maps and Instagram link to the URLs supplied by the business.
- Selected AI illustrations are documented in `assets/generated/README.md`; optimized publication images live in `dist/images/`.
- Exact street address and opening hours were not supplied; no invented reviews, prices, opening times or vehicle compatibility claims are displayed. The ads-safe landing page uses French only; do not add Arabic-script or Darija copy while using formats reviewed under Display & Video 360 language rules.

## Ads measurement

GA4 `G-09S8K7RNJY` is installed once in the HTML head. `dist/app.js` sends `whatsapp_click` (service, placement), `phone_click`, and `directions_click` with `gtag('event', ...)`, plus `landing_service` and `funnel_version`. Confirm receipt in GA4 Realtime/DebugView. A WhatsApp click is not a sent message, qualified lead or booking. Google Ads conversion import is configured separately in the account.

Optional `?service=diagnostic|cles|fap|puissance|carplay` adapts the hero and general WhatsApp CTAs. Unknown values use the general page. Every service card retains its own message. Run `node tests/contact-flow.cjs` to verify the contact flow. See `marketing-audit.md` for the audit and WhatsApp Business setup.

## Hosting

Push to the GitHub repository's `main` branch to trigger the existing Vercel deployment. Public URL: https://amin-auto-diag.vercel.app/. The old `.openai/hosting.json` is retained for history; do not deploy to Sites for this project.
# AminAutoDiag
