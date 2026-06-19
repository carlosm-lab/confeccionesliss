import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env";

/**
 * Routes that are blocked in production even when HOME_ONLY is disabled.
 * These pages are not ready for public access yet.
 * The proxy redirects them back to home.
 *
 * NOTE: /catalogo and /carrito have been removed — the catalog is now
 * fully dynamic (Supabase) and ready for production.
 */
const BLOCKED_ROUTES = ["/servicios", "/mi-cuenta"];

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();

  // ── HOME_ONLY mode: block everything except / and /links ──
  if (env.NEXT_PUBLIC_HOME_ONLY === "true") {
    if (url.pathname !== "/" && url.pathname !== "/links") {
      url.pathname = "/";
      return NextResponse.redirect(url, 307);
    }
    return NextResponse.next();
  }

  // ── Selective blocking: redirect BLOCKED_ROUTES to home only in production ──
  if (env.NODE_ENV === "production") {
    const isBlocked = BLOCKED_ROUTES.some(
      (route) => url.pathname === route || url.pathname.startsWith(`${route}/`)
    );

    if (isBlocked) {
      url.pathname = "/";
      return NextResponse.redirect(url, 307);
    }
  }

  return NextResponse.next();
}

// Run proxy on all routes except static assets, media, and API endpoints
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.png, icon.png, apple-icon.png (static public files)
     * - any files with extensions like .png, .jpg, .webp, .svg
     */
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|icon.png|apple-icon.png|.*\\.png|.*\\.jpg|.*\\.webp|.*\\.svg|.*\\.css|.*\\.js|.*\\.xml|.*\\.txt).*)",
  ],
};
