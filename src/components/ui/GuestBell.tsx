"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import {
  useNotifications,
  type AppNotification,
} from "@/context/NotificationContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

// ── Helpers ────────────────────────────────────────────────────

function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (diff < 60_000) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} min`;
  if (hours < 24) return `Hace ${hours} h`;
  return `Hace ${days} día${days > 1 ? "s" : ""}`;
}

type IconConfig = {
  icon: string;
  iconColor: string;
  iconBg: string;
  iconRing: string;
  dotColor: string;
};

const NOTIF_CONFIG: Record<AppNotification["type"], IconConfig> = {
  push_permission: {
    icon: "notifications_active",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconRing: "ring-violet-200",
    dotColor: "bg-violet-500",
  },
  favorites_hint: {
    icon: "favorite",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
    iconRing: "ring-pink-200",
    dotColor: "bg-pink-500",
  },
  cart_hint: {
    icon: "shopping_cart",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconRing: "ring-blue-200",
    dotColor: "bg-blue-500",
  },
  auth_hint: {
    icon: "person",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-50",
    iconRing: "ring-slate-200",
    dotColor: "bg-slate-500",
  },
  new_product: {
    icon: "new_releases",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconRing: "ring-emerald-200",
    dotColor: "bg-emerald-500",
  },
  new_offer: {
    icon: "local_offer",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconRing: "ring-amber-200",
    dotColor: "bg-amber-500",
  },
  manual: {
    icon: "campaign",
    iconColor: "text-primary",
    iconBg: "bg-primary/5",
    iconRing: "ring-primary/20",
    dotColor: "bg-primary",
  },
  info: {
    icon: "info",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    iconRing: "ring-sky-200",
    dotColor: "bg-sky-500",
  },
};

// ── NotificationBell ───────────────────────────────────────────

export function GuestBell() {
  const {
    notifications,
    unreadCount,
    markRead,
    markAllHintsRead,
    pushPermissionStatus,
    subscribeToPush,
    pushPromptDismissed,
  } = useNotifications();
  const { showAuthModal } = useAuth();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  // Swipe-to-dismiss (mobile)
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  const handleDragStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };

  const handleDragMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragY(delta);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragY > 100) {
      // Umbral superado: cerrar con animacion
      setIsOpen(false);
      setDragY(0);
    } else {
      // Bajo el umbral: volver a posicion original
      setDragY(0);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cerrar con click fuera
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // Cerrar con Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  // Auto-marcar notificaciones informativas como leidas al abrir el panel
  useEffect(() => {
    if (!isOpen) return;
    notifications
      .filter(
        (n) =>
          !n.read && !HINT_TYPES.includes(n.type as AppNotification["type"])
      )
      .forEach((n) => markRead(n.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  // Tipos que solo se marcan como leidos en acciones especificas (login, ver oferta)
  const HINT_TYPES: AppNotification["type"][] = [
    "push_permission",
    "favorites_hint",
    "cart_hint",
    "auth_hint",
  ];

  const handleNotifClick = (notif: AppNotification) => {
    // 1. Hints de auth → abrir login modal
    if (
      notif.type === "favorites_hint" ||
      notif.type === "cart_hint" ||
      notif.type === "auth_hint"
    ) {
      setIsOpen(false);
      showAuthModal("generic");
      return;
    }

    // 2. Push permission → solicitar permiso del navegador
    if (notif.type === "push_permission") {
      setIsOpen(false);
      void handleSubscribePush();
      return;
    }

    // 3. Notificaciones de BD: marcar leida y navegar
    if (!notif.read) markRead(notif.id);
    setIsOpen(false);

    if (notif.target_url) {
      // URL especifica (producto/oferta concreta)
      router.push(notif.target_url);
    } else if (
      notif.type === "new_product" ||
      notif.type === "new_offer" ||
      notif.type === "manual"
    ) {
      // Sin URL especifica → ir al catalogo
      router.push("/catalogo");
    }
    // info sin target_url: ya se marco leida al abrir, no navega
  };

  const handleLoginClick = () => {
    setIsOpen(false);
    showAuthModal("generic");
  };

  const handleSubscribePush = async () => {
    setIsSubscribing(true);
    await subscribeToPush();
    setIsSubscribing(false);
  };

  if (!mounted) return null;

  const isActive = unreadCount > 0;

  // ── Notificaciones filtradas (sin tipos que no aplican si logueado) ──
  const visibleNotifs = notifications;

  // ── Mostrar footer de auth solo si hay hint no leída ──────────
  const hasAuthHint = notifications.some(
    (n) =>
      (n.type === "cart_hint" ||
        n.type === "favorites_hint" ||
        n.type === "auth_hint") &&
      !n.read
  );

  // ── Mostrar CTA de push si hay push_permission no leída ───────
  const hasPushHint = notifications.some(
    (n) => n.type === "push_permission" && !n.read
  );

  // -- Modal via Portal ---
  const modal = isOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-end justify-center sm:items-start sm:justify-end"
          role="dialog"
          aria-label="Centro de notificaciones"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-[2px] sm:bg-black/20"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className={cn(
              // Mobile: bottom sheet full width, rounded top only
              "relative z-10 flex w-full flex-col",
              "rounded-t-2xl rounded-b-none sm:rounded-2xl",
              "border border-slate-200/80 bg-white",
              "shadow-[0_-8px_40px_-4px_rgba(0,0,0,0.18)] sm:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.22),0_8px_32px_-8px_rgba(0,0,0,0.12)]",
              // Desktop: top-right dropdown
              "sm:mt-14 sm:mr-4 sm:max-w-[360px]",
              // Animation: slide up on mobile, slide down on desktop
              "animate-in fade-in slide-in-from-bottom-4 sm:slide-in-from-bottom-0 sm:slide-in-from-top-3 duration-300 sm:duration-200",
              "overflow-hidden"
            )}
            style={{
              maxHeight: "min(90dvh, 92vh)",
              transform: `translateY(${dragY}px)`,
              transition: isDragging
                ? "none"
                : "transform 0.35s cubic-bezier(0.32,0.72,0,1), opacity 0.35s ease",
              opacity: Math.max(0, 1 - dragY / 350),
            }}
          >
            {/* Drag handle — solo mobile: captura el gesto de swipe */}
            <div
              className="flex shrink-0 touch-none justify-center pt-3 pb-1 sm:hidden"
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="material-symbols-outlined text-primary text-[20px]"
                  aria-hidden="true"
                  style={{
                    fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                  }}
                >
                  notifications
                </span>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Notificaciones
                  </h2>
                  {unreadCount > 0 && (
                    <p className="text-[11px] text-slate-400">
                      {unreadCount} sin leer
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Cerrar notificaciones"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
            </div>

            {/* Lista */}
            <div className="flex-1 overflow-hidden overflow-y-auto overscroll-contain">
              {visibleNotifs.length === 0 ? (
                <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                    <span
                      className="material-symbols-outlined text-[28px] text-slate-400"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      notifications_none
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-700">
                      Sin notificaciones
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400">
                      Te avisaremos cuando haya nuevos productos, ofertas o
                      actualizaciones.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="flex flex-col gap-3 p-3">
                  {visibleNotifs.map((notif) => {
                    const cfg = NOTIF_CONFIG[notif.type] ?? NOTIF_CONFIG.info;
                    const isHintUnread =
                      !notif.read &&
                      (notif.type === "favorites_hint" ||
                        notif.type === "cart_hint" ||
                        notif.type === "auth_hint");
                    const isPushUnread =
                      !notif.read &&
                      notif.type === "push_permission" &&
                      pushPermissionStatus !== "granted" &&
                      pushPermissionStatus !== "denied";

                    return (
                      <li key={notif.id}>
                        <div
                          role="button"
                          tabIndex={0}
                          onClick={() => handleNotifClick(notif)}
                          onKeyDown={(e) =>
                            (e.key === "Enter" || e.key === " ") &&
                            handleNotifClick(notif)
                          }
                          className={cn(
                            "group relative w-full cursor-pointer rounded-xl border border-dashed px-4 py-3 text-left transition-colors",
                            notif.read
                              ? "border-slate-200 hover:bg-slate-50/60"
                              : "border-slate-300 bg-blue-50/30 hover:bg-blue-50/50"
                          )}
                        >
                          <div className="flex items-start gap-3">
                            {/* Icono */}
                            <div
                              className={cn(
                                "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ring-1",
                                cfg.iconBg,
                                cfg.iconRing
                              )}
                            >
                              <span
                                className={cn(
                                  "material-symbols-outlined text-[18px]",
                                  cfg.iconColor
                                )}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                                aria-hidden="true"
                              >
                                {cfg.icon}
                              </span>
                            </div>

                            {/* Contenido */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-start justify-between gap-2">
                                <p
                                  className={cn(
                                    "text-xs leading-snug font-semibold",
                                    notif.read
                                      ? "text-slate-500"
                                      : "text-slate-900"
                                  )}
                                >
                                  {notif.title}
                                </p>
                                {!notif.read && (
                                  <span
                                    className={cn(
                                      "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                                      cfg.dotColor
                                    )}
                                    aria-label="No leido"
                                  />
                                )}
                              </div>
                              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                                {notif.message}
                              </p>
                              {/* Fila inferior: hora + CTA alineados */}
                              <div className="mt-1.5 flex items-center justify-between gap-2">
                                <p className="text-[10px] font-medium text-slate-300">
                                  {timeAgo(notif.created_at)}
                                </p>
                                {isHintUnread && (
                                  <span className="text-primary/70 group-hover:text-primary text-[10px] font-medium">
                                    Iniciar sesion &rarr;
                                  </span>
                                )}
                                {isPushUnread && (
                                  <span className="text-primary/70 text-[10px] font-medium">
                                    {isSubscribing
                                      ? "Activando..."
                                      : "Activar alertas →"}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* ── Trigger ───────────────────────────────────────────── */}
      <button
        type="button"
        aria-label={
          unreadCount > 0
            ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer`
            : "Centro de notificaciones"
        }
        onClick={handleOpen}
        className="border-primary/10 text-primary relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
      >
        {/* Pulso */}
        {isActive && (
          <span
            className="bg-primary/20 absolute inset-0 animate-ping rounded-full"
            aria-hidden="true"
          />
        )}

        <span
          className="material-symbols-outlined relative z-10 text-[22px]"
          aria-hidden="true"
          style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
        >
          notifications
        </span>

        {/* Badge */}
        {isActive && (
          <span
            className="bg-primary absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] animate-[bounceIn_0.3s_ease-out] items-center justify-center rounded-full px-1 text-[9px] font-black tracking-tight text-white ring-2 ring-white"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {modal}
    </>
  );
}
