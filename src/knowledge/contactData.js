/**
 * FIZZL Customer Service contact data
 *
 * Overgenomen uit de door de gebruiker aangeleverde contactlijst algemeen
 * (10-09-2026). Deze gegevens worden niet in de interface getoond.
 * De AI gebruikt ze als interne kennis en alleen wanneer contactinformatie
 * inhoudelijk nodig is.
 */
export const CONTACT_DATA = {
  "De Telegraaf": {
    customerServicePhone: "+31 88 824 8242",
    whatsapp: "+31 88 824 2424",
    email: "klantenservice@telegraaf.nl",
  },
  "Noordhollands Dagblad": {
    customerServicePhone: "+31 88 824 1111",
    whatsapp: "+31 72 518 40 20",
    email: "klantenservice@noordhollandsdagblad.nl",
  },
  "Gooi- en Eemlander": {
    customerServicePhone: "+31 88 824 1111",
    whatsapp: "+31 35 647 71 00",
    email: "klantenservice@gooieneemlander.nl",
  },
  "Leidsch Dagblad": {
    customerServicePhone: "+31 88 824 1111",
    whatsapp: "+31 71 535 64 64",
    email: "klantenservice@leidschdagblad.nl",
  },
  "Privé": {
    customerServicePhone: "+31 88 824 8088",
    whatsapp: "+31 88 824 28 28",
    email: "klantenservice@prive.nl",
  },
  "Vrouw": {
    customerServicePhone: "+31 88 824 82 05",
    whatsapp: "+31 88 824 27 27",
    email: "klantenservice@vrouwglossy.nl",
  },
  "Autovisie": {
    customerServicePhone: "+31 88 824 8188",
    whatsapp: "+31 88 824 44 44",
    email: "klantenservice@autovisie.nl",
  },
};

export function getContactData(publication) {
  return CONTACT_DATA[publication] || {};
}
