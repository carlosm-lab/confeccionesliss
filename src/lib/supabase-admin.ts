import { createClient } from "@supabase/supabase-js";
import { env } from "@/env";

// Cliente Supabase con Service Role Key para uso EXCLUSIVO en servidor
// Evita RLS y se usa para operaciones administrativas.
export const supabaseAdmin = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);
