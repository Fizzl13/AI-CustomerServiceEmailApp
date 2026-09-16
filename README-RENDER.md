# FIZZL AI Customer Service Automation — Render deployment

## Render
1. Push this folder to the GitHub repository `Fizzl13/AI-CustomerServiceEmailApp`.
2. In Render choose **New → Blueprint** if you want Render to use `render.yaml`, or create a Web Service manually.
3. Add the secret environment variable `ANTHROPIC_API_KEY` in Render.
4. Optional: set `ANTHROPIC_MODEL` if you want to use a different Anthropic model.

The browser calls `/api/generate`; the server calls Anthropic. This keeps the API key out of the browser.
