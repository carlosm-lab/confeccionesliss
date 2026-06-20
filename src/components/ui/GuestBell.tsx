"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useGuestNotification, type GuestNotification } from "@/context/GuestNotificationContext";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

// ── Helpers ────────────────────────────────────────────────────

function timeAgo(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (diff < 60_000) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins} min`;
  if (hours < 24) return `Hace ${hours} h`;
  return `Hace ${days} día${days > 1 ? "s" : ""}`;
}

const NOTIF_CONFIG: Record<
  GuestNotification["type"],
  { icon: string; iconColor: string; iconBg: string; iconRing: string; dotColor: string }
> = {
  favorite: {
    icon: "favorite",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
    iconRing: "ring-pink-200",
    dotColor: "bg-pink-500",
  },
  cart: {
    icon: "shopping_cart",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconRing: "ring-blue-200",
    dotColor: "bg-blue-500",
  },
};

// ── Componente ─────────────────────────────────────────────────

export function GuestBell() {
  const { notifications, isActive } = useGuestNotification();
  const { showAuthModal } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
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

  const handleLoginClick = () => {
    setIsOpen(false);
    showAuthModal("generic");
  };

  if (!mounted) return null;

  const unreadCount = notifications.length;

  // ── Modal via Portal ───────────────────────────────────────────
  const modal = isOpen
    ? createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-start justify-end"
          role="dialog"
          aria-label="Centro de notificaciones"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className={cn(
              "relative z-10 mt-14 mr-4 flex w-full max-w-[360px] flex-col",
              "rounded-2xl border border-slate-200/80 bg-white shadow-[0_24px_80px_-12px_rgba(0,0,0,0.22),0_8px_32px_-8px_rgba(0,0,0,0.12)]",
              "animate-in fade-in slide-in-from-top-3 duration-200"
            )}
            style={{ maxHeight: "min(520px, calc(100vh - 80px))" }}
          >
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span
                  className="material-symbols-outlined text-primary text-[20px]"
                  aria-hidden="true"
                  style={{
                    fontVariationSettings:
                      unreadCount > 0 ? "'FILL' 1" : "'FILL' 0",
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

            {/* Lista de notificaciones */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {unreadCount === 0 ? (
                // Estado vacío
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
                      Te avisaremos aquí cuando guardes productos en el carrito
                      o en favoritos.
                    </p>
                  </div>
                </div>
              ) : (
                <ul className="divide-y divide-slate-100">
                  {notifications.map((notif) => {
                    const cfg = NOTIF_CONFIG[notif.type];
                    return (
                      <li key={notif.id}>
                        <div className="relative w-full bg-blue-50/40 px-5 py-4">
                          <div className="flex items-start gap-3">
                            {/* Ícono */}
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
                                <p className="text-xs font-semibold leading-snug text-slate-900">
                                  {notif.title}
                                  {notif.count > 1 && (
                                    <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-500">
                                      ×{notif.count}
                                    </span>
                                  )}
                                </p>
                                <span
                                  className={cn(
                                    "mt-0.5 h-2 w-2 shrink-0 rounded-full",
                                    cfg.dotColor
                                  )}
                                  aria-label="No leído"
                                />
                              </div>
                              <p className="mt-0.5 text-[11px] leading-relaxed text-slate-400">
                                {notif.message}
                              </p>
                              <p className="mt-1.5 text-[10px] font-medium text-slate-300">
                                {timeAgo(notif.updatedAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>

            {/* Footer CTA */}
            {unreadCount > 0 && (
              <div className="shrink-0 border-t border-slate-100 p-3">
                <button
                  onClick={handleLoginClick}
                  className="btn-gradient flex h-10 w-full items-center justify-center gap-2 rounded-xl text-xs font-bold tracking-wide text-white transition-all hover:opacity-90 active:scale-[0.98]"
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    aria-hidden="true"
                  >
                    login
                  </span>
                  Iniciar sesión · Sincronizar entre dispositivos
                </button>
              </div>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* ── Trigger Button ────────────────────────────────────── */}
      <button
        type="button"
        aria-label={
          unreadCount > 0
            ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer`
            : "Centro de notificaciones"
        }
        onClick={() => setIsOpen(true)}
        className={cn(
          "relative flex size-10 cursor-pointer items-center justify-center rounded-full border transition-all",
          isActive
            ? "border-blue-200 bg-blue-50 text-blue-600 shadow-[0_2px_8px_-2px_rgba(59,130,246,0.25),0_1px_4px_-1px_rgba(59,130,246,0.15)] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_-2px_rgba(59,130,246,0.35)]"
            : "border-primary/10 text-primary bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
        )}
      >
        {/* Anillo de pulso ping */}
        {isActive && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-blue-400/30"
            aria-hidden="true"
          />
        )}

        <span
          className="material-symbols-outlined relative z-10 text-[22px]"
          aria-hidden="true"
          style={{
            fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          notifications
        </span>

        {/* Badge */}
        {isActive && (
          <span
            className="absolute -top-1.5 -right-1.5 z-10 flex h-[18px] min-w-[18px] animate-[bounceIn_0.3s_ease-out] items-center justify-center rounded-full bg-blue-600 px-1 text-[9px] font-black tracking-tight text-white ring-2 ring-white"
            aria-hidden="true"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Portal — fuera del stacking context del header */}
      {modal}
    </>
  );
}
