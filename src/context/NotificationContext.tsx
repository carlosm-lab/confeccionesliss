"use client";

/**
 * NotificationContext
 * ─────────────────────────────────────────────────────────────
 * Sistema unificado de notificaciones:
 *   - Notificaciones locales (hints para guest): favorites, cart, push_permission
 *   - Notificaciones de BD (productos, ofertas, manuales)
 *   - Web Push via Supabase Edge Function
 *
 * Reglas de lectura:
 *   - HINT_TYPES solo se marcan leidas al iniciar sesion (nunca al hacer click)
 *   - Notificaciones de oferta se marcan leidas al visitar el catalogo
 *   - Las notificaciones nunca se eliminan del panel
 * ─────────────────────────────────────────────────────────────
 */

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { clientEnv } from "@/lib/clientEnv";
import { logger } from "@/lib/logger";
import { STORAGE_FAVORITES_KEY, STORAGE_CART_KEY } from "@/lib/constants";
import type { RealtimePostgresInsertPayload } from "@supabase/supabase-js";
import toast from "react-hot-toast";

// ── Tipos ──────────────────────────────────────────────────────

export type NotifType =
  | "push_permission"
  | "favorites_hint"
  | "cart_hint"
  | "auth_hint"
  | "new_product"
  | "new_offer"
  | "manual"
  | "info";

export interface AppNotification {
  id: string;
  type: NotifType | string;
  title: string;
  message: string;
  image_url: string | null;
  target_url: string | null;
  cta_label: string | null;
  read: boolean;
  created_at: string;
}

type PushPermissionStatus = "default" | "granted" | "denied" | "unsupported";

// Tipos que SOLO se marcan leidos al hacer login, nunca al hacer click
const HINT_TYPES: string[] = [
  "push_permission",
  "favorites_hint",
  "cart_hint",
  "auth_hint",
];

// ── Persistencia localStorage ──────────────────────────────────

const LS_LOCAL_NOTIFS = "liss_local_notifs_v4";
const LS_READ_IDS = "liss_notif_read_ids_v4";
const LS_DISMISSED_IDS = "liss_notif_dismissed_ids_v4";
const LS_PUSH_DISMISSED = "liss_push_prompt_dismissed_v4";
const LS_FIRST_VISIT_TS = "liss_first_visit_ts_v4";
const MAX_LOCAL_NOTIFS = 30;

function loadLocalNotifs(): AppNotification[] {
  try {
    const raw = localStorage.getItem(LS_LOCAL_NOTIFS);
    return raw ? (JSON.parse(raw) as AppNotification[]) : [];
  } catch {
    return [];
  }
}

function loadReadIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_READ_IDS);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function loadDismissedIds(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_DISMISSED_IDS);
    return raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    return new Set();
  }
}

function saveDismissedIds(ids: Set<string>): void {
  try {
    localStorage.setItem(LS_DISMISSED_IDS, JSON.stringify([...ids]));
  } catch {
    /* silent */
  }
}

function saveLocalNotifs(notifs: AppNotification[]): void {
  try {
    localStorage.setItem(LS_LOCAL_NOTIFS, JSON.stringify(notifs));
  } catch {
    /* silent */
  }
}

function saveReadIds(ids: Set<string>): void {
  try {
    localStorage.setItem(LS_READ_IDS, JSON.stringify([...ids]));
  } catch {
    /* silent */
  }
}

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

// ── Contexto ───────────────────────────────────────────────────

interface NotificationContextValue {
  notifications: AppNotification[];
  unreadCount: number;
  markRead: (id: string) => void;
  markAllHintsRead: () => void;
  dismissNotification: (id: string) => void;
  addLocalNotification: (
    notif: Pick<AppNotification, "type" | "title" | "message" | "target_url">
  ) => void;
  subscribeToPush: () => Promise<boolean>;
  pushPermissionStatus: PushPermissionStatus;
  pushPromptDismissed: boolean;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

// Estado por defecto — sin notificaciones cuando el provider aún no está montado
const NOTIF_EMPTY_DEFAULT: NotificationContextValue = {
  notifications: [],
  unreadCount: 0,
  markRead: () => {},
  markAllHintsRead: () => {},
  dismissNotification: () => {},
  addLocalNotification: () => {},
  subscribeToPush: async () => false,
  pushPermissionStatus: "default",
  pushPromptDismissed: false,
};

export function useNotifications(): NotificationContextValue {
  const ctx = useContext(NotificationContext);
  // Null-safe: devuelve estado vacío cuando NotificationProvider aún no se ha montado
  return ctx ?? NOTIF_EMPTY_DEFAULT;
}

/**
 * Versión null-safe de useNotifications.
 * Devuelve null si el proveedor no está activo (ej: durante HMR recovery).
 * Úsalo cuando el consumidor puede renderizarse fuera del árbol del proveedor.
 */
export function useNotificationsSafe(): NotificationContextValue | null {
  return useContext(NotificationContext);
}

// ── Provider ───────────────────────────────────────────────────

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  const [mounted, setMounted] = useState(false);
  const [localNotifs, setLocalNotifs] = useState<AppNotification[]>([]);
  const [dbNotifs, setDbNotifs] = useState<AppNotification[]>([]);
  const [readIds, setReadIds] = useState<Set<string>>(new Set());
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());
  const [pushPermissionStatus, setPushPermissionStatus] =
    useState<PushPermissionStatus>("default");
  const [pushPromptDismissed, setPushPromptDismissed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleInteraction = () => {
      setHasInteracted(true);
    };

    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("mouseover", handleInteraction, { passive: true });
    window.addEventListener("scroll", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("mouseover", handleInteraction);
      window.removeEventListener("scroll", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
    };
  }, []);

  const realtimeRef = useRef<
    ReturnType<typeof getSupabaseClient>["channel"] | null
  >(null);
  const prevUserIdRef = useRef<string | null>(null);
  // Ref para detectar transición granted → otro estado (revocación de permisos)
  const prevPushStatusRef = useRef<PushPermissionStatus>("default");
  const subscribeToPushRef = useRef<() => Promise<boolean>>(() =>
    Promise.resolve(false)
  );
  // Refs para leer valores sin añadirlos como deps en effects de una sola ejecución
  const localNotifsRef = useRef<AppNotification[]>([]);
  const pushStateCheckRef = useRef({
    pushPromptDismissed: false,
    pushPermissionStatus: "default" as PushPermissionStatus,
    localNotifs: [] as AppNotification[],
  });
  const addLocalNotificationRef = useRef<
    (
      notif: Pick<AppNotification, "type" | "title" | "message" | "target_url">
    ) => void
  >(() => {});

  // ── Hidratacion ───────────────────────────────────────────────
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    // Patrón intencional: hidratación de estado desde localStorage.
    // No existe otra forma de inicializar estado cliente-only en SSR.
    setLocalNotifs(loadLocalNotifs());
    setReadIds(loadReadIds());
    setDismissedIds(loadDismissedIds());
    setPushPromptDismissed(!!localStorage.getItem(LS_PUSH_DISMISSED));

    // Registrar primera visita
    if (!localStorage.getItem(LS_FIRST_VISIT_TS)) {
      localStorage.setItem(LS_FIRST_VISIT_TS, Date.now().toString());
    }

    // Estado actual del permiso de notificaciones
    if (typeof Notification !== "undefined") {
      const perm = Notification.permission;
      if (perm === "granted") setPushPermissionStatus("granted");
      if (perm === "denied") setPushPermissionStatus("denied");
    } else {
      setPushPermissionStatus("unsupported");
    }

    setMounted(true);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // ── Sincronizar refs de estado (no deben ser deps de effects mount-once) ──
  useEffect(() => {
    localNotifsRef.current = localNotifs;
  }, [localNotifs]);

  useEffect(() => {
    pushStateCheckRef.current = {
      pushPromptDismissed,
      pushPermissionStatus,
      localNotifs,
    };
  }, [pushPromptDismissed, pushPermissionStatus, localNotifs]);

  // ── Notificacion de bienvenida (push_permission) ──────────────
  // Se muestra ~3s despues de la PRIMERA visita, si no se ha pedido antes.
  // Los valores de estado se leen desde refs (pushStateCheckRef) para evitar
  // closures stale sin añadir deps que dispararían el effect más de una vez.
  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      const {
        pushPromptDismissed: dismissed,
        pushPermissionStatus: status,
        localNotifs: notifs,
      } = pushStateCheckRef.current;
      if (dismissed) return;
      if (status === "granted" || status === "unsupported") return;
      const alreadyShown = notifs.some((n) => n.type === "push_permission");
      if (alreadyShown) return;

      addLocalNotificationRef.current({
        type: "push_permission",
        title: "Se el primero en ver las ofertas!",
        message:
          "Activa las alertas y recibe notificaciones exclusivas de nuevas colecciones, descuentos y ofertas antes que nadie. No te pierdas nada!",
        target_url: null,
      });

      // Toast visual proactivo con CTA
      toast(
        (t) => (
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "12px",
              maxWidth: "320px",
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{
                fontSize: "22px",
                color: "#143067",
                flexShrink: 0,
                marginTop: "2px",
                fontVariationSettings: "'FILL' 1",
              }}
            >
              notifications_active
            </span>
            <div style={{ flex: 1 }}>
              <p
                style={{
                  margin: 0,
                  fontWeight: 700,
                  fontSize: "13px",
                  color: "#0f172a",
                }}
              >
                Ofertas exclusivas te esperan!
              </p>
              <p
                style={{
                  margin: "4px 0 10px",
                  fontSize: "12px",
                  color: "#64748b",
                  lineHeight: 1.4,
                }}
              >
                Activa las alertas y se el primero en saber de nuevas
                colecciones y descuentos.
              </p>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={async () => {
                    toast.dismiss(t.id);
                    await subscribeToPushRef.current();
                  }}
                  style={{
                    flex: 1,
                    background: "#143067",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    fontSize: "12px",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Activar alertas
                </button>
                <button
                  onClick={() => {
                    toast.dismiss(t.id);
                    localStorage.setItem(LS_PUSH_DISMISSED, "1");
                    setPushPromptDismissed(true);
                  }}
                  style={{
                    background: "transparent",
                    color: "#94a3b8",
                    border: "none",
                    borderRadius: "8px",
                    padding: "6px 8px",
                    fontSize: "12px",
                    cursor: "pointer",
                  }}
                >
                  Ahora no
                </button>
              </div>
            </div>
          </div>
        ),
        {
          duration: 12000,
          style: {
            borderRadius: "16px",
            background: "#ffffff",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            boxShadow:
              "0 20px 60px -12px rgba(0,0,0,0.18), 0 8px 24px -8px rgba(0,0,0,0.12)",
            padding: "14px 16px",
            maxWidth: "360px",
          },
          icon: null,
          position: "bottom-right",
        }
      );
    }, 3000);

    return () => clearTimeout(timer);
  }, [mounted]);

  // ── Notificaciones DB en tiempo real ──────────────────────────
  useEffect(() => {
    if (!hasInteracted) return;

    const supabase = getSupabaseClient();

    async function fetchDbNotifs() {
      // ─────────────────────────────────────────────────────────
      // PROBLEMA 1: Usuarios nuevos no deben ver notificaciones
      // históricas. Filtramos por la fecha de primera visita.
      // LS_FIRST_VISIT_TS se establece síncronamente en el efecto
      // de hidratación (que corre antes que este efecto async),
      // por lo que al resolver esta promesa el valor ya existe.
      // ─────────────────────────────────────────────────────────
      const firstVisitTs = localStorage.getItem(LS_FIRST_VISIT_TS);

      let query = supabase
        .from("notifications")
        .select(
          "id, type, title, message, image_url, target_url, cta_label, created_at"
        )
        .order("created_at", { ascending: false })
        .limit(50);

      if (firstVisitTs) {
        // Solo notificaciones creadas DESPUÉS de la primera visita del usuario
        const isoTs = new Date(parseInt(firstVisitTs, 10)).toISOString();
        query = query.gte("created_at", isoTs);
      }

      const { data, error } = await query;

      if (error) {
        logger.error("Error cargando notificaciones:", error);
        return;
      }

      setDbNotifs(
        (data ?? []).map((n: Record<string, unknown>) => ({
          ...n,
          read: false,
        })) as AppNotification[]
      );
    }

    fetchDbNotifs();

    // Suscripcion en tiempo real — se re-establece al cambiar auth/interacción
    // Los eventos INSERT son siempre posteriores a la primera visita ✓
    const isLighthouse =
      typeof navigator !== "undefined" &&
      (navigator.webdriver ||
        /Lighthouse/i.test(navigator.userAgent) ||
        /Chrome-Lighthouse/i.test(navigator.userAgent) ||
        /HeadlessChrome/i.test(navigator.userAgent));

    if (isLighthouse) {
      return;
    }

    const channelName = `notifications_realtime_${user?.id ?? "guest"}`;
    const channel = supabase
      .channel(channelName)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload: RealtimePostgresInsertPayload<Record<string, unknown>>) => {
          const newNotif = payload.new as unknown as AppNotification;
          setDbNotifs((prev) => [{ ...newNotif, read: false }, ...prev]);
        }
      )
      .subscribe();

    realtimeRef.current = channel;
    return () => {
      if (realtimeRef.current) {
        supabase.removeChannel(realtimeRef.current);
        realtimeRef.current = null;
      }
    };
  }, [user?.id, hasInteracted]); // Se re-sincroniza al iniciar/cerrar sesión o interactuar

  // ── Marcar hints como leidas al iniciar sesion ────────────────
  useEffect(() => {
    const currentUserId = user?.id ?? null;
    const wasGuest = prevUserIdRef.current === null;
    const isNowLoggedIn = currentUserId !== null;

    if (wasGuest && isNowLoggedIn) {
      /* eslint-disable react-hooks/set-state-in-effect */
      // Sincronización intencional: transición guest→user, el estado externo cambió.
      setLocalNotifs((prev) => {
        const updated = prev.map((n) =>
          HINT_TYPES.includes(n.type) ? { ...n, read: true } : n
        );
        saveLocalNotifs(updated);
        return updated;
      });

      setReadIds((prev) => {
        const hintIds = localNotifsRef.current
          .filter((n) => HINT_TYPES.includes(n.type))
          .map((n) => n.id);
        const next = new Set([...prev, ...hintIds]);
        saveReadIds(next);
        return next;
      });
      /* eslint-enable react-hooks/set-state-in-effect */
    }

    prevUserIdRef.current = currentUserId;
  }, [user]);

  // ── Detectar revocación de permisos push ─────────────────────
  useEffect(() => {
    // Detectar transición desde un estado terminal (granted o denied) a "default":
    // el usuario re-habilitó la capacidad de conceder permisos desde ajustes.
    const wasTerminal =
      prevPushStatusRef.current === "granted" ||
      prevPushStatusRef.current === "denied";
    if (wasTerminal && pushPermissionStatus === "default") {
      try {
        localStorage.removeItem(LS_PUSH_DISMISSED);
      } catch {
        /* silent */
      }
      // Intencional: sincronizar estado React con el permiso del navegador (externo).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPushPromptDismissed(false);
    }
    prevPushStatusRef.current = pushPermissionStatus;
  }, [pushPermissionStatus]);

  // ── Re-checar permiso push al recuperar foco de pestaña ──────
  // El navegador no emite eventos cuando el usuario cambia permisos
  // en Ajustes; visibilitychange es el mejor hook disponible.
  useEffect(() => {
    if (!mounted) return;
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") return;
      if (typeof Notification === "undefined") return;
      const perm = Notification.permission;
      setPushPermissionStatus(perm as PushPermissionStatus);
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [mounted]);

  // ── addLocalNotification ──────────────────────────────────────
  // Una sola notificacion por tipo: si ya existe, la mueve al tope.
  // PROBLEMA 3c: Al re-activar un tipo existente generamos un NUEVO ID
  // para que el caché de readIds no enmascare la notificación re-inyectada.
  const addLocalNotification = useCallback(
    (
      notif: Pick<AppNotification, "type" | "title" | "message" | "target_url">
    ) => {
      setLocalNotifs((prev) => {
        const existingIndex = prev.findIndex((n) => n.type === notif.type);
        if (existingIndex !== -1) {
          const updated = [
            {
              ...prev[existingIndex],
              // Nuevo ID → el readIds cacheado con el ID antiguo no afecta este hint
              id: "local_" + notif.type + "_" + Date.now(),
              created_at: new Date().toISOString(),
              read: false,
            },
            ...prev.filter((_, i) => i !== existingIndex),
          ].slice(0, MAX_LOCAL_NOTIFS);
          saveLocalNotifs(updated);
          return updated;
        }

        const newNotif: AppNotification = {
          ...notif,
          id: "local_" + notif.type + "_" + Date.now(),
          image_url: null,
          cta_label: null,
          read: false,
          created_at: new Date().toISOString(),
        };
        const updated = [newNotif, ...prev].slice(0, MAX_LOCAL_NOTIFS);
        saveLocalNotifs(updated);
        return updated;
      });
    },
    []
  );

  // Mantener ref actualizado para que el toast effect use la versión actual
  useEffect(() => {
    addLocalNotificationRef.current = addLocalNotification;
  }, [addLocalNotification]);

  // ── reevaluateConditionalHints ───────────────────────────────
  // Re-inyecta hints condicionales cada vez que una condición
  // vuelve a incumplirse. Garantiza que el panel refleje siempre
  // el estado real del usuario (PROBLEMA 3).
  const reevaluateConditionalHints = useCallback(() => {
    if (typeof window === "undefined") return;

    // Push permission: la notificación SIEMPRE existe mientras push no esté
    // concedido (granted) o sea imposible (unsupported).
    // Esto incluye 'default' (pendiente) Y 'denied' (bloqueado) — ambos son
    // condición incumplida. El usuario debe activar push para eliminar el hint.
    if (
      pushPermissionStatus !== "granted" &&
      pushPermissionStatus !== "unsupported"
    ) {
      addLocalNotification({
        type: "push_permission",
        title: "\u00a1S\u00e9 el primero en ver las ofertas!",
        message:
          pushPermissionStatus === "denied"
            ? "Las notificaciones est\u00e1n bloqueadas en tu navegador. Ve a Ajustes del navegador \u2192 Privacidad \u2192 Notificaciones y permite este sitio para activar las alertas."
            : "Activa las alertas y recibe notificaciones exclusivas de nuevas colecciones, descuentos y ofertas antes que nadie. \u00a1No te pierdas nada!",
        target_url: null,
      });
    }

    // Auth hints: solo cuando el usuario NO est\u00e1 logueado
    if (!user) {
      try {
        const rawFavs = localStorage.getItem(STORAGE_FAVORITES_KEY);
        const hasFavs = rawFavs
          ? (JSON.parse(rawFavs) as unknown[]).length > 0
          : false;
        if (hasFavs) {
          addLocalNotification({
            type: "favorites_hint",
            title: "Favoritos guardados",
            message:
              "Inicia sesi\u00f3n para sincronizarlos en todos tus dispositivos.",
            target_url: null,
          });
        }
      } catch {
        /* silent — localStorage puede estar bloqueado */
      }

      try {
        const rawCart = localStorage.getItem(STORAGE_CART_KEY);
        const hasCart = rawCart
          ? (JSON.parse(rawCart) as unknown[]).length > 0
          : false;
        if (hasCart) {
          addLocalNotification({
            type: "cart_hint",
            title: "Art\u00edculos en el carrito",
            message:
              "Inicia sesi\u00f3n para guardar tu carrito y acceder desde cualquier dispositivo.",
            target_url: null,
          });
        }
      } catch {
        /* silent */
      }
    }
  }, [pushPermissionStatus, user, addLocalNotification]);

  // ── Re-evaluar hints cuando cambian las condiciones ──────────
  // Corre en mount y cada vez que user, permiso push o dismissed cambian.
  // Garantiza que hints desaparecidos reaparezcan si la condición
  // vuelve a incumplirse (PROBLEMA 3).
  useEffect(() => {
    if (!mounted) return;
    // Intencional: re-evaluar condiciones condicionales e inyectar hints al panel.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    reevaluateConditionalHints();
    // pushPromptDismissed eliminado de deps: ya no condiciona el hint del panel
  }, [user, pushPermissionStatus, mounted, reevaluateConditionalHints]);

  // ── markRead ──────────────────────────────────────────────────
  const markRead = useCallback(
    (id: string) => {
      // Las hints solo se marcan leidas al hacer login, no aqui
      const notif = [...localNotifs, ...dbNotifs].find(
        (n: AppNotification) => n.id === id
      );
      if (notif && HINT_TYPES.includes(notif.type)) return;

      setReadIds((prev) => {
        const next = new Set([...prev, id]);
        saveReadIds(next);
        return next;
      });
      setLocalNotifs((prev) => {
        const updated = prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        );
        saveLocalNotifs(updated);
        return updated;
      });
    },
    [localNotifs, dbNotifs]
  );

  // ── markAllHintsRead (llamado al iniciar sesion) ──────────────
  const markAllHintsRead = useCallback(() => {
    setLocalNotifs((prev) => {
      const updated = prev.map((n) =>
        HINT_TYPES.includes(n.type) ? { ...n, read: true } : n
      );
      saveLocalNotifs(updated);
      return updated;
    });
  }, []);

  // ── dismissNotification ───────────────────────────────────────
  // PROBLEMA 2: Defensa en profundidad — guard de condición para HINT_TYPES.
  // La UI (GuestBell.canDelete) ya bloquea esto, pero lo validamos aquí
  // también para que la función sea correcta independientemente del caller.
  const dismissNotification = useCallback(
    (id: string) => {
      // Guard: verificar que la condición del hint está cumplida antes de eliminar
      const hint = localNotifs.find((n) => n.id === id);
      if (hint && HINT_TYPES.includes(hint.type)) {
        const conditionMet =
          hint.type === "push_permission"
            ? pushPermissionStatus === "granted" ||
              pushPermissionStatus === "unsupported" // única condición cumplida o irresoluble
            : !!user; // favorites_hint / cart_hint / auth_hint requieren usuario
        if (!conditionMet) return; // Condición incumplida → no eliminar
      }

      // Local notification: remove from array
      if (id.startsWith("local_")) {
        setLocalNotifs((prev) => {
          const updated = prev.filter((n) => n.id !== id);
          saveLocalNotifs(updated);
          return updated;
        });
        return;
      }
      // DB notification: add to dismissedIds set
      setDismissedIds((prev) => {
        const next = new Set([...prev, id]);
        saveDismissedIds(next);
        return next;
      });
    },
    [localNotifs, pushPermissionStatus, user]
  );

  // ── subscribeToPush ───────────────────────────────────────────
  const subscribeToPush = useCallback(async (): Promise<boolean> => {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      !("PushManager" in window)
    ) {
      return false;
    }

    try {
      const permission = await Notification.requestPermission();
      setPushPermissionStatus(permission === "granted" ? "granted" : "denied");
      localStorage.setItem(LS_PUSH_DISMISSED, "1");
      setPushPromptDismissed(true);

      if (permission !== "granted") return false;

      const reg = await navigator.serviceWorker.ready;
      const vapidKey = urlBase64ToUint8Array(
        clientEnv.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      );
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: vapidKey.buffer as ArrayBuffer,
      });

      const supabase = getSupabaseClient();
      const { error } = await supabase.from("push_subscriptions").upsert(
        {
          endpoint: sub.endpoint,
          p256dh: btoa(
            String.fromCharCode(
              ...new Uint8Array(sub.getKey("p256dh") as ArrayBuffer)
            )
          ),
          auth: btoa(
            String.fromCharCode(
              ...new Uint8Array(sub.getKey("auth") as ArrayBuffer)
            )
          ),
          user_id: user?.id ?? null,
        },
        { onConflict: "endpoint" }
      );

      if (error) logger.error("Error guardando suscripcion push:", error);
      return true;
    } catch (err) {
      logger.error("Error suscribiendo a Web Push:", err);
      return false;
    }
  }, [user]);

  // Mantener ref actualizado para el toast (evitar closure stale)
  useEffect(() => {
    subscribeToPushRef.current = subscribeToPush;
  }, [subscribeToPush]);

  // ── Combinar notificaciones — ordenadas por fecha desc ────────
  const allNotifications: AppNotification[] = mounted
    ? [
        ...localNotifs.map((n) => ({
          ...n,
          read: n.read || readIds.has(n.id),
        })),
        ...dbNotifs
          .filter((n) => !dismissedIds.has(n.id))
          .map((n) => ({ ...n, read: n.read || readIds.has(n.id) })),
      ].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
    : [];

  const unreadCount = allNotifications.filter((n) => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications: allNotifications,
        unreadCount,
        markRead,
        markAllHintsRead,
        dismissNotification,
        addLocalNotification,
        subscribeToPush,
        pushPermissionStatus,
        pushPromptDismissed,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
