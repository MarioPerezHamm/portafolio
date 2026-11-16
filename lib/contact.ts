export const CONTACT = {
  email: "perezfernan159@gmail.com",
  phoneE164: "573162344785",
  phoneDisplay: "+57 316 234 4785",
  linkedin: "https://www.linkedin.com/in/marioperezdev",
  github: "https://github.com/MarioPerezHamm",
  location: "Pasto / Armenia, Colombia",
} as const

const DEFAULT_WHATSAPP_MESSAGE =
  "Hola Mario, vi tu portafolio y me gustaría conversar contigo sobre una oportunidad."
const DEFAULT_EMAIL_SUBJECT = "Contacto desde tu portafolio"
const DEFAULT_EMAIL_BODY = "Hola Mario,\n\nVi tu portafolio y me gustaría conversar contigo sobre...\n\n"

export function whatsappUrl(message: string = DEFAULT_WHATSAPP_MESSAGE) {
  return `https://wa.me/${CONTACT.phoneE164}?text=${encodeURIComponent(message)}`
}

export function mailtoUrl({
  subject = DEFAULT_EMAIL_SUBJECT,
  body = DEFAULT_EMAIL_BODY,
}: { subject?: string; body?: string } = {}) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
