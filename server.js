import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 10000;

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "fizzl-ai-customer-service", version: "6.0" });
});

app.post("/api/generate", async (req, res) => {
  try {
    const { systemPrompt, incoming } = req.body || {};
    if (!systemPrompt || !incoming?.trim()) {
      return res.status(400).json({ error: "Ontbrekende invoer." });
    }
    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({ error: "ANTHROPIC_API_KEY ontbreekt op de server." });
    }

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6",
        max_tokens: 1200,
        system: systemPrompt,
        messages: [{ role: "user", content: `Inkomende brief van de klant:\n\n${incoming}` }],
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      console.error("Anthropic error:", data);
      return res.status(response.status).json({ error: data?.error?.message || "Anthropic API-fout." });
    }

    const text = (data.content || [])
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim();

    if (!text) return res.status(502).json({ error: "Leeg antwoord ontvangen." });
    res.json({ text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Genereren mislukt. Probeer het opnieuw." });
  }
});

const dist = path.join(__dirname, "dist");
app.use(express.static(dist));
app.get("/{*splat}", (_req, res) => res.sendFile(path.join(dist, "index.html")));

app.listen(port, () => console.log(`Server running on port ${port}`));
