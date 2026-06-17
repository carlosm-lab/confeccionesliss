"use client";
// ──────────────────────────────────────────────────────────────
// CONTEXTO DE FAVORITOS — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Maneja la lista de productos favoritos del usuario.
//
// PERSISTENCIA DUAL:
//   - localStorage: siempre, para guests y para acceso rápido
//   - Supabase (user_favorites): cuando hay usuario logueado
//
// FLUJO DE SINCRONIZACIÓN al login:
//   1. Cargar favoritos locales (localStorage)
//   2. Cargar favoritos de DB (user_favorites)
//   3. Merge: unión de ambos sets (sin duplicados)
//   4. Si hay favoritos locales que no estaban en DB → insert
//   5. Resultado final = unión de ambos
//
// UPDATES OPTIMISTAS:
// toggleFavorite() actualiza la UI inmediatamente y luego
// sincroniza con la DB. Si falla, hace rollback.
//
// toggleFavorite rechaza llamadas sin usuario autenticado.
// Este bloqueo es "defense in depth" — los botones de UI ya
// están protegidos por showAuthModal, pero esto es un segundo check.
// ──────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  ReactNode,
} from "react";
import { useAuth } from "./AuthContext";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { STORAGE_FAVORITES_KEY } from "@/lib/constants";

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

interface FavoritesContextValue {
  favorites: string[];
  toggleFavorite: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined
);

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<string[]>([]);
  const favoritesRef = useRef<string[]>([]);

  useEffect(() => {
    favoritesRef.current = favorites;
  }, [favorites]);

  // ── Carga inicial desde localStorage ──────────────────────────
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FAVORITES_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as unknown[];
        // Filtrar IDs que no sean UUIDs válidos (corrupción o manipulación)
        const valid = parsed.filter(
          (id): id is string =>
            typeof id === "string" && id.length > 0 && UUID_REGEX.test(id)
        );
        setFavorites(valid);
        // Si se limpiaron IDs inválidos, actualizar localStorage
        if (valid.length !== parsed.length) {
          localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(valid));
        }
      }
    } catch (e) {
      logger.error("Error parsing favorites from localStorage:", e);
      setFavorites([]);
    }
  }, []);

  // ── Sincronización con Supabase al login ──────────────────────
  useEffect(() => {
    if (!user) return;
    let mounted = true;

    const syncFavorites = async () => {
      try {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase
          .from("user_favorites")
          .select("product_id")
          .eq("user_id", user.id);

        if (error) {
          if (error.code === "PGRST116") {
            logger.warn(
              "Tabla favorites no existe aún. Necesitas crearla en Supabase."
            );
          } else {
            throw error;
          }
          return;
        }

        const dbFavorites = (data as { product_id: string }[]).map(
          (f) => f.product_id
        );
        let localFavorites: string[] = [];
        try {
          localFavorites = JSON.parse(
            localStorage.getItem(STORAGE_FAVORITES_KEY) || "[]"
          ) as string[];
        } catch (e) {
          logger.error(
            "Error parsing favorites from localStorage during sync:",
            e
          );
        }

        // Filtrar locales inválidos antes de insertar en DB
        const validLocalFavorites = localFavorites.filter(
          (id) => typeof id === "string" && id.length > 0 && UUID_REGEX.test(id)
        );

        // Insertar favoritos locales que no existen en DB
        const toInsert = validLocalFavorites.filter(
          (id) => !dbFavorites.includes(id)
        );

        if (toInsert.length > 0) {
          const newRecords = toInsert.map((product_id) => ({
            user_id: user.id,
            product_id,
          }));
          const { error: insertError } = await supabase
            .from("user_favorites")
            .insert(newRecords);
          if (insertError)
            logger.error(
              "Error inserting missing local favorites:",
              insertError
            );
        }

        // Merge: unión sin duplicados
        if (mounted) {
          const updatedFavorites = [
            ...new Set([...dbFavorites, ...validLocalFavorites]),
          ];
          setFavorites(updatedFavorites);
          localStorage.setItem(
            STORAGE_FAVORITES_KEY,
            JSON.stringify(updatedFavorites)
          );
        }
      } catch (err) {
        logger.error("Error sincronizando favoritos:", err);
      }
    };

    syncFavorites();

    return () => {
      mounted = false;
    };
  }, [user]);

  // Mantener localStorage sincronizado con el estado React
  useEffect(() => {
    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // ── Toggle con update optimista ───────────────────────────────
  const toggleFavorite = useCallback(
    async (productId: string) => {
      // Defense in depth: rechazar si no hay usuario
      if (!user) {
        logger.warn(
          "toggleFavorite called without authenticated user. Ignoring."
        );
        return;
      }

      const isFav = favoritesRef.current.includes(productId);

      // Update optimista: la UI responde instantáneamente
      setFavorites((prev) =>
        isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
      );

      try {
        const supabase = getSupabaseClient();
        if (isFav) {
          const { error } = await supabase
            .from("user_favorites")
            .delete()
            .match({ user_id: user.id, product_id: String(productId) });
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("user_favorites")
            .insert([{ user_id: user.id, product_id: String(productId) }]);
          if (error) throw error;
        }
      } catch (err) {
        logger.error("Error DB favoritos:", err);
        // Rollback: deshacer el update optimista
        setFavorites((prev) =>
          isFav ? [...prev, productId] : prev.filter((id) => id !== productId)
        );
      }
    },
    [user]
  );

  // Set para O(1) lookups en isFavorite (en vez de .includes() que es O(n))
  const favoritesSet = useMemo(() => new Set(favorites), [favorites]);

  const isFavorite = useCallback(
    (productId: string) => favoritesSet.has(productId),
    [favoritesSet]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}
