import React, { useState, useMemo } from "react";

const PUBLICATIONS = [
  "De Telegraaf",
  "Noordhollands Dagblad",
  "Gooi- en Eemlander",
  "Leidsch Dagblad",
  "Privé",
  "Vrouw",
  "Autovisie",
];

const CASE_TYPES = [
  {
    id: "retentie",
    label: "Prijsverhoging / opzegging voorkomen",
    tone: "Warm en oplossingsgericht. Bied begrip voor de klacht en leg de aanhoudingsactie of tegemoetkoming uit.",
    hint: "Verwijs naar het aanhoudingsteam: 088 - 824 8242, werkdagen 08:00–17:00.",
  },
  {
    id: "opzegging",
    label: "Opzegging bevestigen / datum corrigeren",
    tone: "Zakelijk, kort en duidelijk. Bevestig de einddatum expliciet.",
    hint: "",
  },
  {
    id: "bezorging",
    label: "Bezorgklacht / compensatie",
    tone: "Verontschuldigend maar niet onderdanig. Benoem concrete vervolgstap richting de bezorger of het depot.",
    hint: "",
  },
  {
    id: "incasso",
    label: "Incasso / betalingsgeschil",
    tone: "Zakelijk-neutraal en feitelijk. Vermijd schuldtoewijzing; verwijs waar nodig door naar het incassobureau.",
    hint: "",
  },
  {
    id: "digitaal",
    label: "Digitale toegang (login / app)",
    tone: "Praktisch en stapsgewijs, geen overbodige stappen die de klant al heeft geprobeerd.",
    hint: "",
  },
  {
    id: "factuur",
    label: "Factuur / betaalvraag",
    tone: "Feitelijk en behulpzaam.",
    hint: "",
  },
  {
    id: "account",
    label: "Adreswijziging / accountgegevens",
    tone: "Kort, bevestigend, geen overbodige uitleg.",
    hint: "",
  },
  {
    id: "gevoelig",
    label: "Overlijden / bewindvoerder",
    tone: "Zeer zorgvuldig, invoelend en rustig. Geen commerciële toon, geen haast.",
    hint: "",
  },
];

const NHD_NUMBER = "088 - 824 11 11";

// Kernbepalingen uit de Algemene Abonnementsvoorwaarden Mediahuis Nederland
// (per 2 februari 2026). Dit is geen volledige juridische tekst, maar een
// samenvatting die als kader dient zodat concepten geen toezeggingen doen
// die buiten de voorwaarden vallen.
const LEGAL_FRAMEWORK = `JURIDISCH KADER — Algemene Abonnementsvoorwaarden Mediahuis Nederland (per 2 februari 2026):
- Herroepingsrecht: de abonnee mag het abonnement binnen 14 dagen na aanvang (digitale uitgave) of na eerste levering (printuitgave/combi) kosteloos ontbinden, gemeld bij de klantenservice van de titel.
- Opzegtermijn: de standaard opzegtermijn is één maand, tenzij de aanbieding waarop het abonnement is afgesloten uitdrukkelijk een andere termijn of minimumperiode vermeldt.
- Prijswijziging: Mediahuis mag het abonnementsgeld wijzigen (o.a. door inflatie-indexatie) en publiceert dit in de uitgave. Is de abonnee het niet eens met de wijziging, dan mag hij het abonnement vóór ingang van de wijziging beëindigen met inachtneming van een opzegtermijn van één maand.
- Restitutie: bij voortijdige, rechtmatige beëindiging wordt het reeds betaalde abonnementsgeld voor de resterende, nog niet geleverde periode gerestitueerd.
- Adresgegevens: de abonnee is zelf verantwoordelijk voor het tijdig doorgeven van juiste (adres/bezorg/factuur)gegevens.
- Nederlands recht is van toepassing.

REGELS VOOR HET CONCEPT:
- Doe geen toezeggingen die buiten dit kader vallen: noem geen opzegtermijn, terugbetaling of recht dat hier niet in staat, en verzin geen bedragen, kortingspercentages of termijnen.
- Een tegemoetkoming (zoals een gratis week bij een bezorgklacht) is coulance, geen wettelijk recht — formuleer dit ook zo ("als tegemoetkoming bieden wij..."), niet als iets waar de klant recht op heeft, tenzij de instructie van de medewerker een concreet aanbod expliciet voorschrijft.
- Bij een opzegging vanwege een prijswijziging: bevestig dat dit kan, met de opzegtermijn van één maand vóór de ingangsdatum van de wijziging.
- Bij een gewone opzegging: ga uit van de standaard opzegtermijn van één maand, tenzij de instructie van de medewerker een andere termijn aangeeft (bijvoorbeeld omdat de aanbieding een minimumperiode kent).
- Als iets niet met zekerheid uit de brief, de instructie of dit kader is af te leiden (bijvoorbeeld een exacte einddatum of een bedrag), formuleer dit dan voorzichtig of verwijs naar de klantenservice, in plaats van te gokken.`;

export default function MediahuisDesk() {
  const [publication, setPublication] = useState(PUBLICATIONS[0]);
  const [caseType, setCaseType] = useState(CASE_TYPES[0].id);
  const [incoming, setIncoming] = useState("");
  const [instruction, setInstruction] = useState("");
  const [draft, setDraft] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [stampVisible, setStampVisible] = useState(false);

  const activeCase = useMemo(
    () => CASE_TYPES.find((c) => c.id === caseType),
    [caseType]
  );

  const today = useMemo(
    () =>
      new Date().toLocaleDateString("nl-NL", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    []
  );

  async function handleGenerate() {
    if (!incoming.trim()) {
      setError("Plak eerst de inkomende brief van de klant.");
      return;
    }
    setError("");
    setLoading(true);
    setStampVisible(false);
    setDraft("");
    setCopied(false);

    const numberContext =
      caseType === "retentie"
        ? "Vermeld indien passend het aanhoudingsteam: 088 - 824 8242, werkdagen 08:00–17:00."
        : publication === "Noordhollands Dagblad" && caseType === "digitaal"
        ? `Vermeld indien passend de klantenservice van Noordhollands Dagblad: ${NHD_NUMBER}, werkdagen 08:00–17:00.`
        : "";

    const systemPrompt = `Je bent een ervaren klantenservicemedewerker bij Mediahuis Nederland en schrijft namens ${publication}.
Schrijf uitsluitend in het Nederlands, in correct en professioneel 'u'-Nederlands.
Toon/aanpak voor dit gevalstype: ${activeCase.tone}
${numberContext}

${LEGAL_FRAMEWORK}

Instructie van de medewerker voor de richting van dit antwoord: ${instruction || "(geen aanvullende instructie, gebruik je eigen inschatting op basis van de brief, binnen het juridisch kader hierboven)"}
Schrijf een volledige, verzendklare e-mail: aanhef, body, passende afsluiting en ondertekening "Klantenservice ${publication}". Geen placeholders zoals [naam], gebruik neutrale aanhef "Geachte klant," tenzij de naam uit de brief blijkt. Blijf strikt binnen het juridisch kader hierboven. Geef alleen de e-mailtekst terug, zonder inleiding of toelichting eromheen.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: `Inkomende brief van de klant:\n\n${incoming}`,
            },
          ],
        }),
      });
      const data = await response.json();
      const text = (data.content || [])
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("\n")
        .trim();
      if (!text) throw new Error("Leeg antwoord ontvangen.");
      setDraft(text);
      setTimeout(() => setStampVisible(true), 120);
    } catch (e) {
      setError("Genereren mislukt. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!draft) return;
    navigator.clipboard.writeText(draft).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#EAE7DD",
        fontFamily: "'Source Sans 3', ui-sans-serif, system-ui",
        color: "#1F1E1B",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Zilla+Slab:wght@500;700&family=Source+Sans+3:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        textarea, select, input { font-family: 'Source Sans 3', ui-sans-serif, system-ui; }
        ::selection { background: #2F6F4E33; }
      `}</style>

      {/* Masthead */}
      <header
        style={{
          borderBottom: "3px solid #1F1E1B",
          padding: "22px 28px 14px",
          background: "#EAE7DD",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <h1
            style={{
              fontFamily: "'Zilla Slab', serif",
              fontWeight: 700,
              fontSize: 34,
              letterSpacing: "-0.01em",
              margin: 0,
            }}
          >
            De Antwoordredactie
          </h1>
          <div
            style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 12,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "#5B5A54",
            }}
          >
            Editie · {today}
          </div>
        </div>
        <p
          style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 12.5,
            letterSpacing: "0.04em",
            color: "#5B5A54",
            marginTop: 6,
          }}
        >
          Klantenservice-desk — Mediahuis Nederland
        </p>
      </header>

      <main style={{ maxWidth: 1180, margin: "0 auto", padding: "26px 28px 60px" }}>
        {/* Section labels / controls */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 22,
          }}
        >
          <Field label="Titel">
            <select
              value={publication}
              onChange={(e) => setPublication(e.target.value)}
              style={selectStyle}
            >
              {PUBLICATIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Rubriek (type zaak)">
            <select
              value={caseType}
              onChange={(e) => setCaseType(e.target.value)}
              style={selectStyle}
            >
              {CASE_TYPES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {/* Two-column spread */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
          }}
        >
          {/* Incoming */}
          <div>
            <ColumnHeading>Inkomend</ColumnHeading>
            <textarea
              value={incoming}
              onChange={(e) => setIncoming(e.target.value)}
              placeholder="Plak hier de e-mail van de klant…"
              style={{
                ...telegramBox,
                minHeight: 230,
              }}
            />
            <ColumnHeading style={{ marginTop: 18 }}>Richting voor antwoord</ColumnHeading>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              placeholder="Korte instructie, bijv. 'bevestig opzegging per 1 oktober, geen tegemoetkoming'…"
              style={{
                ...telegramBox,
                minHeight: 90,
              }}
            />
            <button
              onClick={handleGenerate}
              disabled={loading}
              style={{
                marginTop: 16,
                width: "100%",
                background: loading ? "#8B8A82" : "#1F1E1B",
                color: "#F5F3EC",
                border: "none",
                padding: "13px 18px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 13,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                cursor: loading ? "default" : "pointer",
              }}
            >
              {loading ? "Bezig met opstellen…" : "Stel concept op"}
            </button>
            {error && (
              <p style={{ color: "#A6371F", fontSize: 13.5, marginTop: 10 }}>{error}</p>
            )}
          </div>

          {/* Draft output */}
          <div style={{ position: "relative" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <ColumnHeading>Concept</ColumnHeading>
              {draft && (
                <button
                  onClick={handleCopy}
                  style={{
                    background: "none",
                    border: "1px solid #1F1E1B",
                    padding: "5px 12px",
                    fontSize: 12,
                    fontFamily: "'IBM Plex Mono', monospace",
                    letterSpacing: "0.05em",
                    cursor: "pointer",
                    color: "#1F1E1B",
                  }}
                >
                  {copied ? "Gekopieerd" : "Kopieer"}
                </button>
              )}
            </div>
            <div
              style={{
                position: "relative",
                border: "1px solid #C9C6BA",
                background: "#F5F3EC",
                minHeight: 342,
                padding: "20px 22px",
                overflow: "hidden",
              }}
            >
              {stampVisible && draft && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: 14,
                    right: 14,
                    width: 92,
                    height: 92,
                    borderRadius: "50%",
                    border: "3px solid #2F6F4E",
                    color: "#2F6F4E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 10.5,
                    letterSpacing: "0.06em",
                    lineHeight: 1.25,
                    fontWeight: 500,
                    transform: "rotate(-11deg)",
                    opacity: 0.85,
                    pointerEvents: "none",
                  }}
                >
                  CONCEPT
                  <br />
                  {publication.toUpperCase()}
                </div>
              )}
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={
                  loading
                    ? "…"
                    : "Het concept verschijnt hier zodra het is opgesteld. U kunt de tekst vervolgens direct bewerken."
                }
                style={{
                  width: "100%",
                  height: 300,
                  border: "none",
                  background: "transparent",
                  resize: "vertical",
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: "#1F1E1B",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <div
        style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11.5,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#5B5A54",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

function ColumnHeading({ children, style }) {
  return (
    <h2
      style={{
        fontFamily: "'Zilla Slab', serif",
        fontWeight: 700,
        fontSize: 18,
        borderBottom: "2px solid #1F1E1B",
        paddingBottom: 6,
        margin: 0,
        marginBottom: 10,
        ...style,
      }}
    >
      {children}
    </h2>
  );
}

const selectStyle = {
  width: "100%",
  padding: "10px 12px",
  border: "1px solid #1F1E1B",
  background: "#F5F3EC",
  fontSize: 14.5,
  color: "#1F1E1B",
};

const telegramBox = {
  width: "100%",
  padding: "14px 16px",
  border: "1px solid #C9C6BA",
  background: "#F5F3EC",
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: 13,
  lineHeight: 1.6,
  color: "#1F1E1B",
  resize: "vertical",
  outline: "none",
};
