import { env } from "@/env";

export const siteConfig = {
  name: "Confecciones Liss",
  description:
    "Taller de confección a la medida en San Miguel, El Salvador. Scrubs médicos, uniformes universitarios para UNIVO, UNAB, UGB. Envíos nacionales. Desde $35.",
  url: "https://www.confeccionesliss.com",

  twitterHandle: "@confeccionliss",
  keywords:
    "scrubs El Salvador, uniformes médicos San Miguel, confección a medida San Miguel, uniformes universitarios zona oriental, UNIVO uniformes, UGB uniformes, UNAB uniformes, scrubs Sincatex El Salvador, taller uniformes San Miguel",

  // Contacto
  phone: "+503 7331-7181",
  phoneRaw: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  email: env.NEXT_PUBLIC_CONTACT_EMAIL,
  address: {
    street: "5A Calle Poniente & 1A Avenida Sur",
    neighborhood: "Barrio La Merced",
    city: "San Miguel",
    country: "El Salvador",
    full: "Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur, San Miguel, El Salvador",
    reference:
      "A un costado del edificio anexo de la UNAB, sobre la misma calle de la Corte de Cuentas",
  },
  schedule: "Lun–Sáb 8:00 AM – 5:00 PM",
  geo: { lat: 13.4783213, lng: -88.1770113 },

  links: {
    whatsapp: "https://wa.me/50373317181",
    whatsappDirect: "https://wa.me/50373317181",
    facebook: "https://www.facebook.com/confeccionliss",
    instagram: "https://www.instagram.com/confeccionliss",
    tiktok: "https://www.tiktok.com/@confeccionliss",
    youtube: "https://www.youtube.com/@confeccionliss",
    threads: "https://www.threads.com/@confeccionliss",
    twitter: "https://x.com/confeccionliss",
    linkedin: "https://www.linkedin.com/company/confeccionliss",
    pinterest: "https://www.pinterest.com/confeccionliss/",
    googleMaps: "https://maps.app.goo.gl/8z27tCfvnoBeyoWz9",
  },
};
