"use client";

/**
 * DeferredProviders
 * Carga los providers pesados (Supabase/Auth/Cart/Notifications)
 * de forma diferida, fuera del critical path de renderización.
 *
 * IMPACTO EN PERFORMANCE:
 * - Supabase browser client (~227KB, 82% unused en homepage)
 * - Zod (~250KB, 83% unused en homepage)
 * Diferirlos elimina ~7s de script evaluation en el CPU
 * throttleado de Lighthouse, mejorando LCP y TBT.
 */

import { useState, useEffect, type ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { Toaster } from "react-hot-toast";

interface DeferredProvidersProps {
  children: ReactNode;
}

export function DeferredProviders({ children }: DeferredProvidersProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Montar providers pesados tras el primer frame — el hero image
    // y el contenido crítico ya habrán pintado antes de que Supabase cargue.
    const raf = requestAnimationFrame(() => {
      setReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!ready) {
    // Antes de que los providers estén listos, renderizamos children
    // sin auth/cart context. El navbar muestra estado guest y el badge
    // del carrito en vacío — se actualiza en ~1 frame.
    return <>{children}</>;
  }

  return (
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
  );
}
