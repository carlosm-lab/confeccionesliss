"use server";

import { createClient } from "@supabase/supabase-js";
import { contactSchema } from "@/schemas/contactSchema";
import type { ContactFormData } from "@/schemas/contactSchema";

type ActionResult =
  | { success: true }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
    };

export async function sendContactMessage(
  data: ContactFormData
): Promise<ActionResult> {
  // Validate with Zod
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
    for (const [key, issues] of Object.entries(
      parsed.error.flatten().fieldErrors
    )) {
      const k = key as keyof ContactFormData;
      fieldErrors[k] = issues?.[0];
    }
    return { success: false, error: "Datos inválidos", fieldErrors };
  }

  // Use service role on server — never exposed to client
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Fallback to anon key if service role key not configured
  // RLS policy allows anon INSERT on contact_messages
  const apiKey = serviceKey ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createClient(supabaseUrl, apiKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("messages").insert([
    {
      name: parsed.data.nombre,
      email: parsed.data.email,
      phone: parsed.data.telefono || null,
      subject: parsed.data.asunto,
      message: parsed.data.mensaje,
    },
  ]);

  if (error) {
    console.error("[sendContactMessage] Supabase error:", error.message);
    return {
      success: false,
      error: "No pudimos enviar tu mensaje. Inténtalo de nuevo.",
    };
  }

  return { success: true };
}
