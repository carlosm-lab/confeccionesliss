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
// Durante la ventana de carga de DeferredProviders (<100ms post-hidratación),
// los hooks de contexto devuelven sus valores por defecto (null-safe).
// ──────────────────────────────────────────────────────────────
import * as React from "react";
import dynamic from "next/dynamic";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";

// DeferredProviders se carga de forma lazy, post-hidratación de React.
// ssr: false garantiza que Supabase y react-hot-toast NO se incluyan
// en el bundle inicial de JS que bloquea el FCP/LCP.
const DeferredProviders = dynamic(
  () =>
    import("./DeferredProviders").then((mod) => ({
      default: mod.DeferredProviders,
    })),
  { ssr: false }
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

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        disableTransitionOnChange
      >
        <DeferredProviders>{children}</DeferredProviders>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
