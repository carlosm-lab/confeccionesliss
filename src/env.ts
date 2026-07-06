import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    VAPID_PRIVATE_KEY: z.string().min(1).default("placeholder_vapid_private"),
    VAPID_SUBJECT: z.string().default("mailto:contacto@confeccionesliss.com"),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .url()
      .default("https://cvbdqsxjfrbwovzpydng.supabase.co"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z
      .string()
      .min(1)
      .default(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YmRxc3hqZnJid292enB5ZG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODc5MDQsImV4cCI6MjA5MjQ2MzkwNH0.UesSE_PRrkYK5n4nrwzS_k7HDO7TVFHOMJcF2zzRnzo"
      ),
    NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().min(1).default("50373317181"),
    NEXT_PUBLIC_CONTACT_EMAIL: z
      .string()
      .email()
      .default("contacto@confeccionesliss.com"),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_HOME_ONLY: z.enum(["true", "false"]).default("false"),
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: z
      .string()
      .min(1)
      .default("placeholder_client_id"),
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: z
      .string()
      .min(1)
      .default("placeholder_vapid"),
    NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
    NEXT_PUBLIC_META_PIXEL_ID: z.string().optional(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_HOME_ONLY: process.env.NEXT_PUBLIC_HOME_ONLY,
    NEXT_PUBLIC_GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    NEXT_PUBLIC_VAPID_PUBLIC_KEY: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_META_PIXEL_ID: process.env.NEXT_PUBLIC_META_PIXEL_ID,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
