import { env } from "@/env";

export const siteConfig = {
  name: "Confecciones Liss",
  description:
    "Empresa de uniformes médicos y universitarios en San Miguel, El Salvador. Scrubs, uniformes para IEPROES, UNIVO, UNAB, UGB, UES, UMA y más. Desde $35.",
  url: "https://www.confeccionesliss.com",

  twitterHandle: "@confeccionliss",
  keywords:
    "scrubs El Salvador, uniformes médicos San Miguel, uniformes universitarios zona oriental, UNIVO uniformes, UGB uniformes, UNAB uniformes, IEPROES uniformes, UES uniformes, UMA uniformes, scrubs Sincatex El Salvador, empresa uniformes San Miguel, venta uniformes médicos El Salvador",

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
    facebookAdmin: "https://web.facebook.com/confeccionliss.admin/",
    instagram: "https://www.instagram.com/confeccionliss",
    tiktok: "https://www.tiktok.com/@confeccionliss",
    youtube: "https://www.youtube.com/@confeccionliss",
    threads: "https://www.threads.net/@confeccionliss",
    twitter: "https://x.com/confeccionliss",
    linkedin: "https://www.linkedin.com/company/confeccionliss",
    pinterest: "https://www.pinterest.com/confeccionliss",
    googleMaps: "https://maps.app.goo.gl/UmJdZgoYD7pgC88GA",
    marketplace: "https://web.facebook.com/marketplace/profile/61556619779863/",
  },
  facebookAppId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID || "",
};

/**
 * Email del superadmin — esta cuenta es INTOCABLE.
 * Ninguna acción de promote/degrade/delete puede aplicarse a este email.
 *
 * Se compara case-insensitive contra el email de auth de Supabase.
 * Para cambiarlo, actualiza NEXT_PUBLIC_CONTACT_EMAIL en el archivo .env.
 *
 * IMPORTANTE: el email aquí debe coincidir exactamente con el email
 * con el que creaste tu cuenta en Supabase (tu email de autenticación).
 */
export const SUPER_ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
  env.NEXT_PUBLIC_CONTACT_EMAIL ??
  "contacto@confeccionesliss.com";
