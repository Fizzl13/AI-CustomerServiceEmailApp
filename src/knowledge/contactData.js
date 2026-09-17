/**
 * FIZZL Customer Service contact data
 *
 * Vul hier later de gecontroleerde telefoonnummers per titel in.
 * Laat een waarde leeg totdat het nummer daadwerkelijk is geverifieerd.
 * Zo voorkomen we dat de AI een oud of verkeerd telefoonnummer gebruikt.
 */
export const CONTACT_DATA = {
  "De Telegraaf": {
    customerServicePhone: "",
    retentionPhone: "",
    notes: "",
  },
  "Noordhollands Dagblad": {
    customerServicePhone: "",
    retentionPhone: "",
    notes: "",
  },
  "Gooi- en Eemlander": {
    customerServicePhone: "",
    retentionPhone: "",
    notes: "",
  },
  "Leidsch Dagblad": {
    customerServicePhone: "",
    retentionPhone: "",
    notes: "",
  },
  "Privé": {
    customerServicePhone: "",
    retentionPhone: "",
    notes: "",
  },
  "Vrouw": {
    customerServicePhone: "",
    retentionPhone: "",
    notes: "",
  },
  "Autovisie": {
    customerServicePhone: "",
    retentionPhone: "",
    notes: "",
  },
};

export function getContactData(publication) {
  return CONTACT_DATA[publication] || {};
}
