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
    url.pathname.startsWith("/login") || url.pathname.startsWith("/registro");
  const isProtectedRoute =
    url.pathname.startsWith("/cuenta") ||
    url.pathname.startsWith("/admin") ||
    url.pathname.startsWith("/pedidos") ||
    url.pathname.startsWith("/checkout");

  // Redirigir usuarios autenticados lejos del login/registro
  if (user && isAuthRoute) {
    url.pathname = "/cuenta";
    return NextResponse.redirect(url);
  }

  // Redirigir usuarios no autenticados lejos de rutas protegidas
  if (!user && isProtectedRoute) {
    url.pathname = "/login";
    url.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(url);
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
