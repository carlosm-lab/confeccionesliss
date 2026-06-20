"use client";

/**
 * GuestNotificationContext
 * ─────────────────────────────────────────────────────────────
 * Maneja las notificaciones de la campana para usuarios guest.
 *
 * LÓGICA:
 * - Acepta notificaciones tipadas: "favorite" | "cart"
 * - Cada tipo genera un único item (se actualiza si ya existe, no duplica)
 * - Persiste en localStorage con timestamp real
 * - Se limpia al iniciar sesión
 * ─────────────────────────────────────────────────────────────
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";

// ── Tipos ──────────────────────────────────────────────────────

export type GuestNotifType = "favorite" | "cart";

export interface GuestNotification {
  id: GuestNotifType; // uno por tipo — actúa como clave única
  type: GuestNotifType;
  title: string;
  message: string;
  createdAt: number; // timestamp unix ms
  updatedAt: number; // se actualiza con cada nuevo evento del mismo tipo
  count: number;     // cuántas veces se activó (para "3 productos en carrito")
}

interface GuestNotificationContextValue {
  notifications: GuestNotification[];
  /** true si hay al menos una notificación */
  isActive: boolean;
  /** Registra o actualiza una notificación del tipo dado */
  pushNotification: (type: GuestNotifType) => void;
  /** Elimina todas las notificaciones */
  dismiss: () => void;
  /** Activa la campana (alias legacy para favoritos — compatible con FavoritesContext) */
  activate: () => void;
}

// ── Persistencia ───────────────────────────────────────────────

const STORAGE_KEY = "liss_guest_notifications_v2";

const NOTIF_DEFAULTS: Record<GuestNotifType, { title: string; message: string }> = {
  favorite: {
    title: "Favoritos guardados",
    message: "Inicia sesión para sincronizarlos en todos tus dispositivos.",
  },
  cart: {
    title: "Artículos en el carrito",
    message: "Inicia sesión para guardar tu carrito y acceder desde cualquier dispositivo.",
  },
};

function loadFromStorage(): GuestNotification[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GuestNotification[];
  } catch {
    return [];
  }
}

function saveToStorage(notifications: GuestNotification[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notifications));
  } catch { /* noop */ }
}

// ── Context ────────────────────────────────────────────────────

const GuestNotificationContext = createContext<
  GuestNotificationContextValue | undefined
>(undefined);

export function useGuestNotification(): GuestNotificationContextValue {
  const ctx = useContext(GuestNotificationContext);
  if (!ctx) {
    throw new Error(
      "useGuestNotification must be used within GuestNotificationProvider"
    );
  }
  return ctx;
}

export function GuestNotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [notifications, setNotifications] = useState<GuestNotification[]>([]);

  // Hidratar desde localStorage al montar
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNotifications(loadFromStorage());
  }, []);

  const pushNotification = useCallback((type: GuestNotifType) => {
    setNotifications((prev) => {
      const defaults = NOTIF_DEFAULTS[type];
      const now = Date.now();
      const existing = prev.find((n) => n.id === type);

      let next: GuestNotification[];
      if (existing) {
        // Actualizar el existente — incrementar count y timestamp
        next = prev.map((n) =>
          n.id === type
            ? { ...n, updatedAt: now, count: n.count + 1 }
            : n
        );
      } else {
        // Crear nueva notificación
        const notif: GuestNotification = {
          id: type,
          type,
          title: defaults.title,
          message: defaults.message,
          createdAt: now,
          updatedAt: now,
          count: 1,
        };
        next = [...prev, notif];
      }

      saveToStorage(next);
      return next;
    });
  }, []);

  // Alias legacy: activate() → pushNotification("favorite")
  const activate = useCallback(() => {
    pushNotification("favorite");
  }, [pushNotification]);

  const dismiss = useCallback(() => {
    setNotifications([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
      // También limpiar la clave legacy si existe
      localStorage.removeItem("liss_guest_notification_active");
    } catch { /* noop */ }
  }, []);

  const isActive = notifications.length > 0;

  return (
    <GuestNotificationContext.Provider
      value={{ notifications, isActive, pushNotification, activate, dismiss }}
    >
      {children}
    </GuestNotificationContext.Provider>
  );
}
