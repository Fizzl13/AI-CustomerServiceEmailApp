# FIZZL AI Customer Service — Render v4

De Antwoordredactie is een React/Vite-app met een Express-backend. De AI-aanroep loopt server-side via `/api/generate`; de Anthropic API-key staat uitsluitend als Render environment variable.

## Nieuw in v4
- Centrale brondata in `src/customerServiceData.js`.
- Per titel ruimte voor gecontroleerde telefoonnummer-, e-mail-, website- en openingstijdgegevens.
- Template-selectie naast Titel en Rubriek. Templates worden automatisch gefilterd op de gekozen rubriek.
- AI krijgt alleen ingevulde, gecontroleerde contactgegevens mee. Ontbrekende contactgegevens mogen niet worden ingevuld vanuit algemene kennis.
- Bij het wisselen van rubriek wordt de templatekeuze gereset.

## Data aanpassen
Open `src/customerServiceData.js`. Vul de juiste gegevens in en voeg templates toe volgens de bestaande structuur. Laat onbekende gegevens leeg.

## Render
- Build: `npm install && npm run build`
- Start: `npm start`
- Health check: `/api/health`
- Environment: `ANTHROPIC_API_KEY` verplicht; `ANTHROPIC_MODEL` optioneel.
