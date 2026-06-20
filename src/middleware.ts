/**
 * SEC-002: Middleware de protección de rutas admin (Server-Side)
 * ──────────────────────────────────────────────────────────────
 * Patrón oficial Supabase SSR para Next.js:
 * https://supabase.com/docs/guides/auth/server-side/creating-a-client
 *
 * PROPÓSITO:
 * - Validar la sesión del usuario en el SERVIDOR antes de renderizar /admin/*
 * - Eliminar el "flash" de UI que ocurría con la protección solo client-side
 * - Redirigir a /admin/login si no hay sesión válida
 *
 * NOTA IMPORTANTE SOBRE SEGURIDAD:
 * Este middleware verifica la existencia de sesión (autenticación).
 * La verificación del rol 'admin' (autorización) la siguen haciendo:
 * 1. El layout /admin (client-side, para UX)
 * 2. Las políticas RLS de Supabase (server-side, última línea de defensa)
 * 3. Los chequeos IS DISTINCT FROM dentro de las funciones SECURITY DEFINER
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Crear una respuesta mutable para poder modificar cookies
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Primero seteamos en la request para que el Server Component pueda leerlas
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          // Recreamos la response con cookies actualizadas
          supabaseResponse = NextResponse.next({
            request,
          });
          // Luego seteamos en la response para persistencia en el browser
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  /**
   * CRÍTICO: getUser() refresca el token si está expirado.
   * NO usar getSession() — puede retornar datos de session de cookies sin verificar.
   * getUser() valida el token con el servidor de Supabase Auth.
   * Ver: https://supabase.com/docs/guides/auth/server-side/creating-a-client#middleware
   */
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Ruta actual
  const pathname = request.nextUrl.pathname;

  // Solo actuar en rutas /admin/* que no sean /admin/login
  // (el matcher a continuación ya filtra, pero verificamos por seguridad)
  const isAdminLoginPage = pathname === "/admin/login";
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute && !isAdminLoginPage) {
    // Sin sesión → redirigir a login
    if (!user) {
      const loginUrl = request.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      return NextResponse.redirect(loginUrl);
    }

    // Con sesión, pero sin rol admin → redirigir a home
    // El rol se verifica desde app_metadata del JWT (inmutable por el usuario)
    const userRole = user.app_metadata?.role;
    if (userRole !== "admin") {
      const homeUrl = request.nextUrl.clone();
      homeUrl.pathname = "/";
      return NextResponse.redirect(homeUrl);
    }
  }

  // Si está en /admin/login y ya es admin autenticado → redirigir al dashboard
  if (isAdminLoginPage && user) {
    const userRole = user.app_metadata?.role;
    if (userRole === "admin") {
      const adminUrl = request.nextUrl.clone();
      adminUrl.pathname = "/admin";
      return NextResponse.redirect(adminUrl);
    }
  }

  // IMPORTANTE: Retornar siempre supabaseResponse (no NextResponse.next())
  // para que las cookies de sesión se propaguen correctamente.
  return supabaseResponse;
}

export const config = {
  matcher: [
    /**
     * Aplica el middleware a todas las rutas /admin/*
     * Excluye archivos estáticos (_next, favicon, etc.) para no afectar performance.
     */
    "/admin/:path*",
  ],
};
