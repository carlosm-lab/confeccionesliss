import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
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
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANTE: NO uses supabase.auth.getSession() en el middleware. Usa getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const isAuthRoute =
    url.pathname.startsWith("/login") ||
    url.pathname.startsWith("/registro") ||
    url.pathname.startsWith("/recuperar") ||
    url.pathname.startsWith("/actualizar-password");

  const isOnboardingRoute = url.pathname.startsWith("/onboarding");

  const isProtectedRoute =
    url.pathname.startsWith("/cuenta") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/pedidos") ||
    url.pathname.startsWith("/checkout");

  if (user) {
    // Si está autenticado, verificamos su perfil
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .single();

    const hasCompletedOnboarding = profile?.onboarding_completed === true;

    if (!hasCompletedOnboarding && !isOnboardingRoute && !isAuthRoute) {
      // Usuario logueado pero sin onboarding: forzar onboarding
      url.pathname = "/onboarding/perfil";
      return NextResponse.redirect(url);
    }

    if (hasCompletedOnboarding && isOnboardingRoute) {
      // Usuario con onboarding completo intentando entrar al onboarding
      url.pathname = "/cuenta";
      return NextResponse.redirect(url);
    }

    if (isAuthRoute) {
      // Redirigir usuarios autenticados lejos del login/registro
      url.pathname = hasCompletedOnboarding ? "/cuenta" : "/onboarding/perfil";
      return NextResponse.redirect(url);
    }
  } else {
    // Redirigir usuarios no autenticados lejos de rutas protegidas u onboarding
    if (isProtectedRoute || isOnboardingRoute) {
      url.pathname = "/login";
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Excluir archivos estáticos, imágenes, etc.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
// Force rebuild 1
