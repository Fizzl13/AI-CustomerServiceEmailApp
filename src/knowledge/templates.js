export const TEMPLATES = [
  {
    "id": "aankondiging-beeindiging",
    "label": "Aankondiging beëindiging",
    "caseTypes": [
      "opzegging"
    ],
    "description": "Voor een klant die aangeeft het abonnement te willen opzeggen, waarbij later telefonisch contact wordt opgenomen over de einddatum.",
    "text": "Beste [naam],\n\nBedankt voor je bericht waarin je aangeeft je abonnement op te willen zeggen.\nWe vinden het uiteraard jammer dat je ons verlaat, maar we zullen je opzegging zo snel mogelijk verwerken.\n\nBinnen twee weken nemen wij telefonisch contact met je op om de einddatum van je abonnement te bespreken. Kunnen we je niet bereiken? Dan wordt het abonnement beëindigd volgens de geldende voorwaarden.\n\nWij waarderen het zeer dat je abonnee bent geweest en hopen je in de toekomst opnieuw te mogen begroeten.\n\nHeb je nog vragen of opmerkingen?\nKijk dan eens op onze selfservice-site MyMediahuis."
  },
  {
    "id": "overlijden",
    "label": "Overlijden",
    "caseTypes": [
      "gevoelig"
    ],
    "description": "Voor beëindiging van een abonnement wegens overlijden.",
    "text": "Klantnummer: {!Case:Customer Number;}\n\nBeste {!Account:Account Name:Contact:Full Name;},/aan de erven van {!Account:Account Name;},\n\nHierbij bevestigen wij het verzoek om het abonnement te beëindigen wegens overlijden.\nOnze deelneming met dit verlies.\n\nVanaf <EINDDATUM BEDANK> stopt het abonnement.\nHet eventueel te veel betaalde abonnementsgeld storten wij terug op het bij ons bekende rekeningnummer.\n\nWij vertrouwen erop je hiermee goed geïnformeerd te hebben."
  },
  {
    "id": "definitieve-beeindiging",
    "label": "Definitieve beëindiging",
    "caseTypes": [
      "opzegging"
    ],
    "description": "Voor een definitieve bevestiging van een reeds verwerkte beëindiging.",
    "text": "Klantnummer: {!Case:Customer Number;}\n\nBeste {!Account:Account Name:Contact:Full Name;},\n\nWe hebben je verzoek om je abonnement te beëindigen ontvangen. Natuurlijk vinden we het jammer dat je stopt met je abonnement.\n\nVanaf <EINDDATUM BEDANK> ontvang je de krant niet meer in de brievenbus en/of heb je geen digitale toegang meer.\n\nWij zorgen ervoor dat de automatische incasso wordt stopgezet. Het kan zijn dat er nog een afschrijving volgt na het moment van opzegging. Dit krijg je zo snel mogelijk teruggestort op je bankrekening.\n\nWil je het nieuws blijven volgen? Dat kan gratis via onze website of nieuwsapp.\n\nHeb je nog vragen of opmerkingen?\nKijk dan eens op onze selfservice-site MyMediahuis."
  }
];
