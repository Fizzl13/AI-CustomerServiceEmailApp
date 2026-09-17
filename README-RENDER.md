# FIZZL AI Customer Service — Render v5

Deze versie bouwt voort op de werkende Render-deployment van De Antwoordredactie.

## v5 wijzigingen
- Template-selectie toegevoegd naast Titel en Rubriek.
- Drie aangeleverde templates toegevoegd: Aankondiging beëindiging, Overlijden, Definitieve beëindiging.
- Template-inhoud wordt als context aan de AI meegegeven.
- Geen hardcoded telefoonnummers meer: nieuwe contactgegevens komen later in een aparte kennislaag.
- API-response parsing gefixt (`{ text }`).
- Express 5 wildcard route gefixt voor SPA fallback.
- Template-data staat los van de React-interface in `src/knowledge/templates.js`.

## Render
Build: `npm install && npm run build`
Start: `npm start`
Environment: `ANTHROPIC_API_KEY` vereist. `ANTHROPIC_MODEL` is optioneel.

## Belangrijk
Commit nooit een API-key naar GitHub. Zet die uitsluitend als Environment Variable/Secret in Render.
