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
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { NotificationProvider } from "@/context/NotificationContext";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
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
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <FavoritesProvider>
                <ConfirmProvider>
                  {children}
                  <Toaster
                    position="bottom-center"
                    toastOptions={{
                      duration: 3000,
                      style: {
                        borderRadius: "12px",
                        background: "#1e293b",
                        color: "#f8fafc",
                        fontSize: "14px",
                        fontFamily: "var(--font-sans, Manrope, sans-serif)",
                      },
                      success: {
                        iconTheme: {
                          primary: "#143067",
                          secondary: "#ffffff",
                        },
                      },
                    }}
                  />
                </ConfirmProvider>
              </FavoritesProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
