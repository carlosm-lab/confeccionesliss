"use client";

/**
 * Providers — Árbol de providers de la aplicación
 * ─────────────────────────────────────────────────────────────
 * ARQUITECTURA DE PERFORMANCE:
 *
 * Para mantener un LCP y TBT óptimos en mobile, los providers se
 * dividen en dos capas:
 *
 * 1. CoreProviders (síncrono, crítico):
 *    - QueryClientProvider: necesario para react-query
 *    - ThemeProvider: necesario para evitar flash de color
 *
 * 2. DeferredProviders (diferido, no crítico):
 *    - AuthProvider, CartProvider, NotificationProvider, FavoritesProvider
 *    - Importados estáticamente pero montados DESPUÉS del primer frame
 *      mediante requestAnimationFrame en DeferredProviders.tsx.
 *    - Los hooks (useAuth, useCart, useNotifications) devuelven valores
 *      por defecto seguros (guest/vacío) cuando el provider no está montado.
 *    - Esto mueve la INICIALIZACIÓN de Supabase (~227KB) fuera del
 *      primer script evaluation del critical path.
 */

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./theme-provider";
import { DeferredProviders } from "./DeferredProviders";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
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
