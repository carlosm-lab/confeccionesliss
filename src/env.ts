import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z
      .string()
      .url()
      .default("https://placeholder.supabase.co"),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1).default("placeholder_key"),
    NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().min(1).default("50373317181"),
    NEXT_PUBLIC_CONTACT_EMAIL: z
      .string()
      .email()
      .default("contacto@confeccionesliss.com"),
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
    NEXT_PUBLIC_HOME_ONLY: z.enum(["true", "false"]).default("true"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
    NEXT_PUBLIC_TURNSTILE_SITE_KEY: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_HOME_ONLY: process.env.NEXT_PUBLIC_HOME_ONLY,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
