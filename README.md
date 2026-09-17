# FIZZL AI Customer Service Automation

Render-ready React/Vite application for **De Antwoordredactie**.

## v6 — knowledge-driven setup

The application now separates customer-service knowledge from the UI:

- `src/customerServiceData.js` — titles and case types.
- `src/knowledge/templates.js` — selectable response templates.
- `src/knowledge/contactData.js` — controlled contact data per title.
- `src/MediahuisDesk.jsx` — interface and AI prompt assembly.

Templates are selected in the same way as the case/rubric selection. Contact data is automatically associated with the selected publication.

### Important

Phone numbers are intentionally empty until they are verified. The AI is explicitly instructed not to invent phone numbers or other company data.

The Anthropic API key belongs only in Render as `ANTHROPIC_API_KEY`. Never commit the key to GitHub.
