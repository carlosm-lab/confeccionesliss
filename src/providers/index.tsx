"use client";
// ──────────────────────────────────────────────────────────────
// PROVIDERS — Capa de contextos globales
// ──────────────────────────────────────────────────────────────
// Arquitectura de dos capas:
//
// CAPA 1 — Bundle inicial (ligero, no bloquea FCP/LCP):
//   - QueryClientProvider (React Query)
//   - ThemeProvider (next-themes, necesario para evitar FOUC de tema)
//
// CAPA 2 — DeferredProviders (lazy con next/dynamic, ssr: false):
//   - AuthProvider  → saca Supabase del critical path
//   - CartProvider  → saca Supabase + react-hot-toast del critical path
//   - FavoritesProvider, ConfirmProvider, NotificationProvider
//   - Toaster (react-hot-toast)
//
// ESTRATEGIA DE CARGA:
//   DeferredProviders NO se monta inmediatamente al hidratarse React.
//   Se usa requestIdleCallback (fallback: setTimeout 200ms) para diferir
//   la carga hasta que el main thread esté libre, DESPUÉS del LCP.
//   Esto evita que el chunk (~100ms long task) bloquee el paint del LCP.
//
//   Durante la ventana de carga (<~200ms post-hidratación),
//   los hooks de contexto devuelven sus valores por defecto (null-safe):
//   useAuth() → AUTH_GUEST_DEFAULT, useCart() → CART_EMPTY_DEFAULT, etc.
// ──────────────────────────────────────────────────────────────
import * as React from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";

// Carga LAZY — excluye Supabase, react-hot-toast y todos los
// contextos pesados del bundle crítico del homepage.
const DeferredProviders = dynamic(
  () => import("./DeferredProviders").then((mod) => mod.DeferredProviders),
  { ssr: false, loading: () => null }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  // Retrasa el montaje de DeferredProviders hasta tiempo de idle del browser.
  // requestIdleCallback asegura que el chunk no se ejecuta durante la ventana
  // del LCP. Fallback de 200ms para browsers sin soporte (Safari <17).
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    if ("requestIdleCallback" in window) {
      (window as Window & typeof globalThis).requestIdleCallback(
        () => setMounted(true),
        { timeout: 1500 }
      );
    } else {
      const id = setTimeout(() => setMounted(true), 200);
      return () => clearTimeout(id);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        {mounted ? <DeferredProviders>{children}</DeferredProviders> : children}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
