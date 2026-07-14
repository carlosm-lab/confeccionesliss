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
// GUEST MODE:
// Guests pueden guardar favoritos en localStorage libremente.
// Al hacerlo, se activa la GuestNotificationContext (campana).
// Al iniciar sesión, los favoritos locales se fusionan con DB.
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
import toast from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { useNotificationsSafe } from "@/context/NotificationContext";
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

// Estado por defecto — favoritos vacíos cuando el provider no está montado
const FAVORITES_EMPTY_DEFAULT: FavoritesContextValue = {
  favorites: [],
  toggleFavorite: async () => {},
  isFavorite: () => false,
};

export const useFavorites = (): FavoritesContextValue => {
  const ctx = useContext(FavoritesContext);
  return ctx ?? FAVORITES_EMPTY_DEFAULT;
};

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const notificationsCtx = useNotificationsSafe();
  const addLocalNotification = notificationsCtx?.addLocalNotification;
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

    // Al iniciar sesion los hints se marcan leidos automaticamente en NotificationContext

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

        // Filtrar locales con sintaxis UUID válida
        const validSyntaxLocalFavorites = localFavorites.filter(
          (id) => typeof id === "string" && id.length > 0 && UUID_REGEX.test(id)
        );

        // Identificar favoritos locales que no existen aún en DB
        const candidateToInsert = validSyntaxLocalFavorites.filter(
          (id) => !dbFavorites.includes(id)
        );

        let validToInsert: string[] = [];
        if (candidateToInsert.length > 0) {
          // Consultar la tabla products para asegurar que los product_id existen físicamente en la BD
          // evitando así violaciones de la Foreign Key constraint (user_favorites_product_id_fkey)
          const { data: existingProducts } = await supabase
            .from("products")
            .select("id")
            .in("id", candidateToInsert);

          const dbProductIds = new Set(
            (existingProducts as { id: string }[] | null)?.map((p) => p.id) ||
              []
          );
          validToInsert = candidateToInsert.filter((id) =>
            dbProductIds.has(id)
          );
        }

        // Insertar únicamente los favoritos válidos cuyo producto existe en la base de datos
        if (validToInsert.length > 0) {
          const newRecords = validToInsert.map((product_id) => ({
            user_id: user.id,
            product_id,
          }));
          const { error: insertError } = await supabase
            .from("user_favorites")
            .upsert(newRecords, { onConflict: "user_id,product_id" });

          if (insertError) {
            logger.error(
              "Error inserting missing local favorites:",
              insertError.message || insertError.details || insertError
            );
          }
        }

        // Merge: unión sin duplicados, purgando IDs locales huérfanos/eliminados
        if (mounted) {
          const validLocalFavorites = validSyntaxLocalFavorites.filter(
            (id) => dbFavorites.includes(id) || validToInsert.includes(id)
          );
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
      const isFav = favoritesRef.current.includes(productId);

      // ── GUEST MODE: toggle local + notificación ───────────────
      if (!user) {
        setFavorites((prev) =>
          isFav ? prev.filter((id) => id !== productId) : [...prev, productId]
        );
        // Solo notificar al agregar (no al quitar)
        if (!isFav) {
          addLocalNotification?.({
            type: "favorites_hint",
            title: "Favoritos guardados",
            message:
              "Inicia sesión para sincronizarlos en todos tus dispositivos.",

            target_url: null,
          });
          toast(
            "¡Guardado! Inicia sesión para sincronizarlo en otros dispositivos",

            {
              icon: "🔔",
              duration: 4000,
            }
          );
        }
        return;
      }

      // ── USER MODE: update optimista + sync DB ─────────────────

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
    [user, addLocalNotification]
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
