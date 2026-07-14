"use client";

import { createBrowserClient } from "@supabase/ssr";
import { clientEnv } from "./clientEnv";

let _supabase: ReturnType<typeof createBrowserClient> | null = null;

export function getSupabaseClient() {
  if (!_supabase) {
    _supabase = createBrowserClient(
      clientEnv.NEXT_PUBLIC_SUPABASE_URL,
      clientEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );
  }
  return _supabase;
}
