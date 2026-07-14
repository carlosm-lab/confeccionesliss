"use client";

/**
 * clientEnv
 * ─────────────────────────────────────────────────────────────
 * Copia segura para el cliente de las variables de entorno NEXT_PUBLIC.
 *
 * IMPORTANTE:
 * Importar esta copia en componentes de cliente en lugar de `@/env`
 * evita que `zod` y `@t3-oss/env-nextjs` entren en los bundles de JS
 * del cliente, reduciendo el peso de la página inicial en ~250KB y
 * eliminando tiempo de Script Evaluation.
 *
 * Las variables siguen declaradas y validadas en `src/env.ts` en el server.
 */

export const clientEnv = {
  NEXT_PUBLIC_SUPABASE_URL:
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
  NEXT_PUBLIC_SUPABASE_ANON_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder_key",
  NEXT_PUBLIC_WHATSAPP_NUMBER:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50373317181",
  NEXT_PUBLIC_CONTACT_EMAIL:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@confeccionesliss.com",
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
  NEXT_PUBLIC_SITE_URL:
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  NEXT_PUBLIC_HOME_ONLY: process.env.NEXT_PUBLIC_HOME_ONLY || "false",
  NEXT_PUBLIC_GOOGLE_CLIENT_ID:
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "placeholder_client_id",
  NEXT_PUBLIC_VAPID_PUBLIC_KEY:
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "placeholder_vapid",
  NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
};
