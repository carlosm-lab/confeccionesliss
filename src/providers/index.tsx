"use client";

import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { ConfirmProvider } from "@/context/ConfirmContext";

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
        <AuthProvider>
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
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
