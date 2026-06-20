/**
 * /api/csp-report — Receptor de violaciones de Content Security Policy
 * ─────────────────────────────────────────────────────────────────────
 * Los navegadores envían automáticamente un POST a este endpoint cuando
 * el CSP bloquea un recurso/script/estilo no autorizado.
 *
 * IMPORTANTE: Este endpoint no requiere autenticación (los browsers
 * lo invocan sin cookies ni headers de auth). Por eso se usa anon key
 * y la política RLS solo permite INSERT con event_type = 'csp_violation'.
 *
 * Formato del body (MIME: application/csp-report):
 * { "csp-report": { "blocked-uri": "...", "violated-directive": "...", ... } }
 *
 * Documentación: https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
 */

import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

// Rate limiting simple en memoria (por IP) para prevenir flood del endpoint
const ipHits = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10; // máx 10 reports por IP por minuto
const RATE_WINDOW_MS = 60_000;

// Campos del report CSP que nos interesan (ignoramos el resto)
interface CspReport {
  "blocked-uri"?: string;
  "violated-directive"?: string;
  "original-policy"?: string;
  "source-file"?: string;
  "line-number"?: number;
  "document-uri"?: string;
  referrer?: string;
}

function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(request);
  const now = Date.now();

  // ── Rate limiting por IP ────────────────────────────────────────
  const hit = ipHits.get(ip);
  if (hit) {
    if (now < hit.resetAt) {
      hit.count++;
      if (hit.count > RATE_LIMIT) {
        // Silently drop — no retornar error para no dar info al atacante
        return NextResponse.json({ ok: true }, { status: 202 });
      }
    } else {
      // Ventana expirada → resetear
      ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    }
  } else {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  }

  // Limpiar IPs antiguas periódicamente (evita memory leak)
  if (ipHits.size > 1000) {
    for (const [key, val] of ipHits.entries()) {
      if (now > val.resetAt) ipHits.delete(key);
    }
  }

  // ── Parsear el body del CSP report ────────────────────────────
  let report: CspReport = {};
  try {
    const contentType = request.headers.get("content-type") ?? "";
    // Navegadores envían application/csp-report o application/json
    if (contentType.includes("csp-report") || contentType.includes("json")) {
      const raw = await request.json();
      report = (raw["csp-report"] ?? raw) as CspReport;
    } else {
      // Body inesperado — ignorar silenciosamente
      return NextResponse.json({ ok: true }, { status: 202 });
    }
  } catch {
    // JSON malformado — ignorar
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  // Ignorar reports de extensiones del navegador (son ruido)
  const blockedUri = report["blocked-uri"] ?? "";
  if (
    blockedUri.startsWith("chrome-extension://") ||
    blockedUri.startsWith("moz-extension://") ||
    blockedUri === "about" ||
    blockedUri === "inline" // inline scripts propios — ya manejados con 'unsafe-inline' permitido
  ) {
    return NextResponse.json({ ok: true }, { status: 202 });
  }

  // ── Persistir en Supabase ──────────────────────────────────────
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    await supabase.from("security_events").insert({
      event_type: "csp_violation",
      payload: {
        blocked_uri: report["blocked-uri"],
        violated_directive: report["violated-directive"],
        source_file: report["source-file"],
        line_number: report["line-number"],
        document_uri: report["document-uri"],
      },
      ip,
      user_agent: request.headers.get("user-agent")?.slice(0, 500) ?? null,
      url: report["document-uri"]?.slice(0, 500) ?? null,
    });
  } catch (err) {
    // No propagamos el error — el browser no necesita saber si falló
    console.error("[csp-report] Failed to persist:", err);
  }

  // Siempre responder 204 (navegadores ignoran el body)
  return new NextResponse(null, { status: 204 });
}
