/**
 * proxy.ts — Middleware único de Next.js (Confecciones Liss)
 * ──────────────────────────────────────────────────────────────
 * Este archivo reemplaza middleware.ts. Next.js solo admite uno de los dos.
 *
 * Responsabilidades:
 * 1. KILLSWITCH: Si site_config.killswitch_active = 'true' en Supabase,
 *    bloquear todo excepto / y /links → redirigir a /mantenimiento.
 *    Caché en memoria con TTL de 30s para no agregar latencia en cada request.
 * 2. HOME_ONLY mode: bloquear todo excepto / y /links
 * 3. SEC-002: Protección server-side de rutas /admin
 *    - Patrón oficial Supabase SSR: https://supabase.com/docs/guides/auth/server-side/creating-a-client
 *    - Usa getUser() (valida contra Supabase Auth Server, no confía en cookies sin verificar)
 *    - Verifica app_metadata.role del JWT (inmutable por el usuario)
 */

import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env";

// ── Killswitch: caché en memoria con TTL de 30 segundos ──────────
// Patrón stale-while-revalidate: se sirve el valor cacheado inmediatamente
// y se refresca en background. Máx 30s para que el killswitch se propague.
let killswitchCache: { active: boolean; expiresAt: number } = {
  active: false,
  expiresAt: 0,
};

async function isKillswitchActive(): Promise<boolean> {
  const now = Date.now();

  // Si el caché es válido, retornarlo inmediatamente sin query a BD
  if (now < killswitchCache.expiresAt) {
    return killswitchCache.active;
  }

  // Caché expirado → refrescar desde Supabase
  try {
    const supabase = createClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    // Usa RPC SECURITY DEFINER en vez de SELECT directo.
    // site_config no tiene GRANT a anon — la función expone solo el boolean
    // necesario para que el proxy decida si bloquear o no el tráfico.
    const { data } = await supabase.rpc("get_killswitch_public");

    const active = data === true;
    killswitchCache = { active, expiresAt: now + 30_000 };
    return active;
  } catch {
    // Si falla la BD, no bloquear el sitio — fail-open para no afectar disponibilidad
    killswitchCache = { active: false, expiresAt: now + 10_000 };
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;

  // Rutas siempre accesibles (incluso con killswitch activo)
  const ALWAYS_ALLOWED = ["/", "/links", "/mantenimiento", "/api/csp-report"];
  const isAlwaysAllowed =
    ALWAYS_ALLOWED.includes(pathname) ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/");

  // ── 0. KILLSWITCH ────────────────────────────────────────────
  // Solo verificar en producción y para rutas que no son siempre permitidas
  if (env.NODE_ENV === "production" && !isAlwaysAllowed) {
    const killswitch = await isKillswitchActive();
    if (killswitch) {
      url.pathname = "/mantenimiento";
      return NextResponse.redirect(url, 307);
    }
  }

  // ── 1. HOME_ONLY mode ────────────────────────────────────────
  if (env.NEXT_PUBLIC_HOME_ONLY === "true") {
    if (pathname !== "/" && pathname !== "/links") {
      url.pathname = "/";
      return NextResponse.redirect(url, 307);
    }
    return NextResponse.next();
  }

  // ── 2. PROTECCIÓN SERVER-SIDE DE /ADMIN ──────────────────────
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    /**
     * Crear cliente Supabase SSR con el patrón correcto de cookies:
     * - supabaseResponse se recrea en setAll() para que las cookies actualizadas
     *   (token refresh) se propaguen correctamente al browser.
     * - CRÍTICO: retornar siempre supabaseResponse al final, nunca NextResponse.next() nuevo,
     *   o se pierden las cookies de sesión.
     */
    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
      env.NEXT_PUBLIC_SUPABASE_URL,
      env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            // Paso 1: actualizar request para que Server Components lean el token nuevo
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            // Paso 2: recrear response con la request actualizada
            supabaseResponse = NextResponse.next({ request });
            // Paso 3: setear cookies en la response para persistencia en browser
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    /**
     * CRÍTICO: usar getUser(), NO getSession().
     * getSession() puede retornar datos de cookies sin validar contra el servidor.
     * getUser() refresca el token si está próximo a expirar y valida con Supabase Auth.
     * Ver: https://supabase.com/docs/guides/auth/server-side/creating-a-client#middleware
     */
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!isAdminLoginPage) {
      // Sin sesión → login
      if (!user) {
        const loginUrl = request.nextUrl.clone();
        loginUrl.pathname = "/admin/login";
        loginUrl.searchParams.set("redirectTo", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Con sesión pero sin rol admin → home
      // app_metadata.role viene del JWT — inmutable por el usuario
      if (user.app_metadata?.role !== "admin") {
        const homeUrl = request.nextUrl.clone();
        homeUrl.pathname = "/";
        return NextResponse.redirect(homeUrl);
      }
    }

    // En /admin/login ya autenticado como admin → redirigir directo al dashboard
    if (isAdminLoginPage && user?.app_metadata?.role === "admin") {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      return NextResponse.redirect(adminUrl);
    }

    // Retornar supabaseResponse (no NextResponse.next() nuevo) para preservar cookies
    return supabaseResponse;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Ejecutar en todas las rutas EXCEPTO archivos estáticos y de imagen:
     * - _next/static, _next/image
     * - favicon, logo, icon, apple-icon
     * - Archivos con extensiones de asset (png, jpg, webp, svg, css, js, xml, txt)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|icon.png|apple-icon.png|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.svg|.*\\.css|.*\\.js|.*\\.xml|.*\\.txt).*)",
  ],
};
