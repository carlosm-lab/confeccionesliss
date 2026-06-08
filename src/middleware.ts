import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "@/env";

export function middleware(request: NextRequest) {
  // If the Home-Only feature flag is enabled, redirect all sub-pages back to home
  if (env.NEXT_PUBLIC_HOME_ONLY === "true") {
    const url = request.nextUrl.clone();

    // Prevent infinite redirect loops if already at home
    if (url.pathname !== "/") {
      url.pathname = "/";
      return NextResponse.redirect(url, 307);
    }
  }

  return NextResponse.next();
}

// Run middleware on all routes except static assets, media, and API endpoints
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
