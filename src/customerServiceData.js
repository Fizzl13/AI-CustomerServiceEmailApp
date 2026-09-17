// Centrale brondata voor De Antwoordredactie.
// Voeg hier later telefoonnummers, e-mailadressen en eigen templates toe.
// Belangrijk: laat een veld leeg als de waarde nog niet gecontroleerd is.

export const CUSTOMER_SERVICE_DATA = {
  publications: {
    "De Telegraaf": {
      contact: {
        phone: "",
        email: "",
        website: "",
        hours: "",
      },
    },
    "Noordhollands Dagblad": {
      contact: {
        phone: "",
        email: "",
        website: "",
        hours: "",
      },
    },
    "Gooi- en Eemlander": {
      contact: { phone: "", email: "", website: "", hours: "" },
    },
    "Leidsch Dagblad": {
      contact: { phone: "", email: "", website: "", hours: "" },
    },
    "Privé": {
      contact: { phone: "", email: "", website: "", hours: "" },
    },
    "Vrouw": {
      contact: { phone: "", email: "", website: "", hours: "" },
    },
    "Autovisie": {
      contact: { phone: "", email: "", website: "", hours: "" },
    },
  },

  caseTypes: [
    {
      id: "retentie",
      label: "Prijsverhoging / opzegging voorkomen",
      tone: "Warm en oplossingsgericht. Bied begrip voor de klacht en leg de aanhoudingsactie of tegemoetkoming uit.",
    },
    {
      id: "opzegging",
      label: "Opzegging bevestigen / datum corrigeren",
      tone: "Zakelijk, kort en duidelijk. Bevestig de einddatum expliciet als die uit de beschikbare informatie volgt.",
    },
    {
      id: "bezorging",
      label: "Bezorgklacht / compensatie",
      tone: "Verontschuldigend maar niet onderdanig. Benoem concrete vervolgstappen alleen als die uit de brondata of instructie volgen.",
    },
    {
      id: "incasso",
      label: "Incasso / betalingsgeschil",
      tone: "Zakelijk-neutraal en feitelijk. Vermijd schuldtoewijzing; verwijs waar nodig door.",
    },
    {
      id: "digitaal",
      label: "Digitale toegang (login / app)",
      tone: "Praktisch en stapsgewijs, zonder overbodige stappen.",
    },
    {
      id: "factuur",
      label: "Factuur / betaalvraag",
      tone: "Feitelijk en behulpzaam.",
    },
    {
      id: "account",
      label: "Adreswijziging / accountgegevens",
      tone: "Kort, bevestigend, zonder overbodige uitleg.",
    },
    {
      id: "gevoelig",
      label: "Overlijden / bewindvoerder",
      tone: "Zeer zorgvuldig, invoelend en rustig. Geen commerciële toon, geen haast.",
    },
  ],

  templates: [
    {
      id: "opzegging-ontvangen",
      caseType: "opzegging",
      label: "Opzegging ontvangen",
      text: `Bevestig dat het verzoek tot opzegging is ontvangen. Vermeld alleen een einddatum als die uit de inkomende brief, medewerkerinstructie of het juridische kader volgt. Gebruik de vaste contactgegevens van de gekozen titel alleen wanneer deze zijn ingevuld in customerServiceData.js.`,
    },
    {
      id: "opzegging-gegevens-nodig",
      caseType: "opzegging",
      label: "Opzegging — aanvullende gegevens nodig",
      text: `Leg kort uit welke aanvullende gegevens nodig zijn om de opzegging te verwerken. Noem geen specifiek gegeven als dat niet uit de brief of instructie blijkt. Gebruik uitsluitend gecontroleerde contactgegevens uit customerServiceData.js.`,
    },
    {
      id: "bezorging-klacht",
      caseType: "bezorging",
      label: "Bezorgklacht — ontvangst bevestigen",
      text: `Erken de klacht, toon begrip en beschrijf de vervolgstap. Bied alleen een tegemoetkoming aan als de medewerkerinstructie of brondata dat expliciet toestaat.`,
    },
    {
      id: "factuur-vraag",
      caseType: "factuur",
      label: "Factuur / betaalvraag",
      text: `Beantwoord de betaalvraag feitelijk. Verzin geen bedragen, betaaldata of voorwaarden. Vraag om aanvullende informatie als die nodig is.`,
    },
    {
      id: "digitaal-toegang",
      caseType: "digitaal",
      label: "Digitale toegang — stappen",
      text: `Geef alleen praktische stappen die passen bij de vraag. Vermijd stappen die de klant al aantoonbaar heeft uitgevoerd. Gebruik alleen gecontroleerde contactgegevens.`,
    },
  ],
};

export function getPublicationData(publication) {
  return CUSTOMER_SERVICE_DATA.publications[publication] || { contact: {} };
}

export function getCaseType(caseTypeId) {
  return CUSTOMER_SERVICE_DATA.caseTypes.find((item) => item.id === caseTypeId);
}

export function getTemplatesForCase(caseTypeId) {
  return CUSTOMER_SERVICE_DATA.templates.filter((item) => item.caseType === caseTypeId);
}
