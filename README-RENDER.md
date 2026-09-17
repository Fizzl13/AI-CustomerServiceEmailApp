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


## Templates en contactgegevens

De interface toont geen aparte balk met contactgegevens. Contactgegevens staan in `src/knowledge/contactData.js` als interne AI-kennis en worden alleen gebruikt wanneer de klantvraag, instructie of template dat nodig maakt.

Templates staan in `src/knowledge/templates.js` en zijn gekoppeld aan een `caseType`. Als voor een rubriek nog geen template is aangeleverd, toont de selector **"Geen template — AI stelt op basis van de rubriek op"**. De AI kan dan nog steeds een concept maken op basis van de rubriek, instructie en het juridische kader.

