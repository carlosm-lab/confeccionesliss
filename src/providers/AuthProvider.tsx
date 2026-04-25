"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { useAppStore } from "@/context/useAppStore";
import type { UserProfile } from "@/context/useAppStore";

/**
 * AuthProvider: Sincroniza la sesión de Supabase con el store de Zustand.
 * Se monta una sola vez en el root layout via Providers.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, logout } = useAppStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const supabase = createClient();

    // 1. Hidratar sesión inicial
    const hydrateSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        await fetchAndSetProfile(session.user.id, session.user.email ?? "");
      }
    };

    // 2. Escuchar cambios de sesión
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (
        event === "SIGNED_IN" ||
        event === "TOKEN_REFRESHED" ||
        event === "USER_UPDATED"
      ) {
        if (session?.user) {
          await fetchAndSetProfile(session.user.id, session.user.email ?? "");
        }
      }

      if (event === "SIGNED_OUT") {
        logout();
      }
    });

    async function fetchAndSetProfile(userId: string, email: string) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profile) {
        const userProfile: UserProfile = {
          id: profile.id,
          nombre: profile.nombre ?? "",
          email: profile.email ?? email,
          avatar: null,
          primerLogin: !profile.onboarding_completed,
          onboardingCompleted: profile.onboarding_completed ?? false,
          rol: profile.rol ?? "cliente",
          institucion: profile.institucion ?? undefined,
          tipoCompra: profile.tipo_compra ?? undefined,
          coloresFavoritos: profile.colores_favoritos ?? [],
          notificaciones: profile.notificaciones ?? {},
        };
        setUser(userProfile);
      } else {
        // Profile not yet created (trigger delay) — set minimal
        setUser({
          id: userId,
          nombre: "",
          email,
          avatar: null,
          primerLogin: true,
          onboardingCompleted: false,
        });
      }
    }

    hydrateSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, logout]);

  return <>{children}</>;
}
