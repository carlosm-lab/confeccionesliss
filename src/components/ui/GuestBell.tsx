"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleString("es-SV", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ── Icon config ────────────────────────────────────────────────

type IconConfig = {
  icon: string;
  iconColor: string;
  iconBg: string;
  iconRing: string;
  dotColor: string;
  label: string;
};

const NOTIF_CONFIG: Record<string, IconConfig> = {
  push_permission: {
    icon: "notifications_active",
    iconColor: "text-violet-600",
    iconBg: "bg-violet-50",
    iconRing: "ring-violet-200",
    dotColor: "bg-violet-500",
    label: "Alertas",
  },
  favorites_hint: {
    icon: "favorite",
    iconColor: "text-pink-600",
    iconBg: "bg-pink-50",
    iconRing: "ring-pink-200",
    dotColor: "bg-pink-500",
    label: "Favoritos",
  },
  cart_hint: {
    icon: "shopping_cart",
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
    iconRing: "ring-blue-200",
    dotColor: "bg-blue-500",
    label: "Carrito",
  },
  auth_hint: {
    icon: "person",
    iconColor: "text-slate-600",
    iconBg: "bg-slate-50",
    iconRing: "ring-slate-200",
    dotColor: "bg-slate-500",
    label: "Cuenta",
  },
  new_product: {
    icon: "new_releases",
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
    iconRing: "ring-emerald-200",
    dotColor: "bg-emerald-500",
    label: "Nuevo producto",
  },
  new_offer: {
    icon: "local_offer",
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
    iconRing: "ring-amber-200",
    dotColor: "bg-amber-500",
    label: "Oferta",
  },
  manual: {
    icon: "campaign",
    iconColor: "text-primary",
    iconBg: "bg-primary/5",
    iconRing: "ring-primary/20",
    dotColor: "bg-primary",
    label: "Anuncio",
  },
  info: {
    icon: "info",
    iconColor: "text-sky-600",
    iconBg: "bg-sky-50",
    iconRing: "ring-sky-200",
    dotColor: "bg-sky-500",
    label: "Información",
  },
};

const FALLBACK_CONFIG: IconConfig = NOTIF_CONFIG.info;

// Hint types: local notifications that have special conditions
const HINT_TYPES = [
  "push_permission",
  "favorites_hint",
  "cart_hint",
  "auth_hint",
];

// Tab type — simplified: Recibidas (unread) | Leídas (read)
type Tab = "unread" | "read";

// ── GuestBell ──────────────────────────────────────────────────

export function GuestBell() {
  const {
    notifications,
    unreadCount,
    markRead,
    dismissNotification,
    pushPermissionStatus,
    subscribeToPush,
  } = useNotifications();
  const { user, showAuthModal } = useAuth();
  const router = useRouter();

  // Panel state
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isSubscribing, setIsSubscribing] = useState(false);

  // Tab state — default: Recibidas (no leídas)
  const [activeTab, setActiveTab] = useState<Tab>("unread");

  // Expanded detail sub-panel
  const [expandedNotif, setExpandedNotif] = useState<AppNotification | null>(
    null
  );

  // Delete confirmation target
  const [deleteTarget, setDeleteTarget] = useState<AppNotification | null>(
    null
  );

  // Block info modal (when hint condition not met)
  const [blockInfo, setBlockInfo] = useState<{
    message: string;
    actionLabel: string;
    onAction: () => void;
  } | null>(null);

  // Swipe-to-dismiss (mobile)
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);

  // Unified close: resets ALL panel + modal state
  const closePanel = useCallback(() => {
    setIsOpen(false);
    setExpandedNotif(null);
    setActiveTab("unread");
    setDeleteTarget(null);
    setBlockInfo(null);
  }, []);

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
      closePanel();
      setDragY(0);
    } else {
      setDragY(0);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        closePanel();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, closePanel]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (expandedNotif) {
          setExpandedNotif(null);
        } else {
          closePanel();
        }
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, expandedNotif, closePanel]);

  // ── Helpers ──────────────────────────────────────────────────

  const handleSubscribePush = useCallback(async () => {
    setIsSubscribing(true);
    await subscribeToPush();
    setIsSubscribing(false);
  }, [subscribeToPush]);

  /**
   * Verifica si la notificación condicional ya cumplió su condición.
   * - allowed: true  → mostrar modal de confirmación normal
   * - allowed: false → mostrar modal explicativo con botón de acción
   */
  const canDelete = useCallback(
    (
      notif: AppNotification
    ):
      | { allowed: true }
      | {
          allowed: false;
          message: string;
          actionLabel: string;
          onAction: () => void;
        } => {
      if (notif.type === "push_permission") {
        if (
          pushPermissionStatus === "default" ||
          pushPermissionStatus === "unsupported"
        ) {
          return {
            allowed: false,
            message:
              "Esta notificación te recuerda activar las alertas de la tienda. Responde primero la solicitud de permisos de notificaciones para poder eliminarla.",
            actionLabel: "Activar alertas",
            onAction: () => {
              void handleSubscribePush();
            },
          };
        }
        return { allowed: true };
      }
      if (
        notif.type === "auth_hint" ||
        notif.type === "favorites_hint" ||
        notif.type === "cart_hint"
      ) {
        if (!user) {
          return {
            allowed: false,
            message:
              "Esta notificación te invita a iniciar sesión para disfrutar de todas las funciones. Inicia sesión primero para poder eliminarla.",
            actionLabel: "Iniciar sesión",
            onAction: () => {
              closePanel();
              showAuthModal("generic");
            },
          };
        }
        return { allowed: true };
      }
      return { allowed: true };
    },
    [pushPermissionStatus, user, handleSubscribePush, closePanel, showAuthModal]
  );

  /** Click en papelera: si no cumple condición → bloqueo; si la cumple → confirmar */
  const handleTrashClick = useCallback(
    (e: React.MouseEvent | React.KeyboardEvent, notif: AppNotification) => {
      e.stopPropagation();
      const result = canDelete(notif);
      if (!result.allowed) {
        setBlockInfo({
          message: result.message,
          actionLabel: result.actionLabel,
          onAction: result.onAction,
        });
      } else {
        setDeleteTarget(notif);
      }
    },
    [canDelete]
  );

  /** Confirmar eliminación */
  const handleDeleteConfirm = useCallback(() => {
    if (!deleteTarget) return;
    if (expandedNotif?.id === deleteTarget.id) setExpandedNotif(null);
    dismissNotification(deleteTarget.id);
    setDeleteTarget(null);
  }, [deleteTarget, expandedNotif, dismissNotification]);

  /** Click on a notification row → open detail sub-panel */
  const handleNotifClick = useCallback(
    (notif: AppNotification) => {
      setExpandedNotif(notif);
      // Mark read when opening detail
      if (!notif.read && !HINT_TYPES.includes(notif.type)) {
        markRead(notif.id);
      }
    },
    [markRead]
  );

  /**
   * Get the CTA for the detail sub-panel.
   * Hints (push_permission, auth_hint, etc.) have their own CTAs.
   * DB notifications with target_url get a "Ver contenido" button.
   */
  const getDetailCTA = useCallback(
    (
      notif: AppNotification
    ): { label: string; icon: string; action: () => void } | null => {
      if (
        notif.type === "push_permission" &&
        pushPermissionStatus !== "granted" &&
        pushPermissionStatus !== "denied" &&
        pushPermissionStatus !== "unsupported"
      ) {
        return {
          label: isSubscribing ? "Activando..." : "Activar alertas",
          icon: "notifications_active",
          action: () => {
            void handleSubscribePush();
          },
        };
      }
      if (
        (notif.type === "auth_hint" ||
          notif.type === "favorites_hint" ||
          notif.type === "cart_hint") &&
        !user
      ) {
        return {
          label: "Iniciar sesión",
          icon: "login",
          action: () => {
            closePanel();
            showAuthModal("generic");
          },
        };
      }
      if (notif.target_url) {
        return {
          label: "Ver contenido",
          icon: "open_in_new",
          action: () => {
            markRead(notif.id);
            closePanel();
            router.push(notif.target_url!);
          },
        };
      }
      return null;
    },
    [
      pushPermissionStatus,
      isSubscribing,
      user,
      handleSubscribePush,
      showAuthModal,
      markRead,
      router,
      closePanel,
    ]
  );

  // ── Filtered list ─────────────────────────────────────────────

  // Recibidas = no leídas | Leídas = leídas
  const filteredNotifs = notifications.filter((n) =>
    activeTab === "unread" ? !n.read : n.read
  );

  const unreadTabCount = notifications.filter((n) => !n.read).length;
  const readTabCount = notifications.filter((n) => n.read).length;

  if (!mounted) return null;

  const isActive = unreadCount > 0;

  // ── Portal modal ──────────────────────────────────────────────

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
            onClick={closePanel}
            aria-hidden="true"
          />

          {/* Panel */}
          <div
            ref={panelRef}
            className={cn(
              "relative z-10 flex w-full flex-col",
              "rounded-t-2xl rounded-b-none sm:rounded-2xl",
              "border border-slate-200/80 bg-white",
              "shadow-[0_-8px_40px_-4px_rgba(0,0,0,0.18)] sm:shadow-[0_24px_80px_-12px_rgba(0,0,0,0.22),0_8px_32px_-8px_rgba(0,0,0,0.12)]",
              "sm:mt-14 sm:mr-4 sm:max-w-[380px]",
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
            {/* Drag handle — mobile only */}
            <div
              className="flex shrink-0 touch-none justify-center pt-3 pb-1 sm:hidden"
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              <div className="h-1 w-10 rounded-full bg-slate-300" />
            </div>

            {/* ── Header ─────────────────────────────────────────── */}
            {expandedNotif ? (
              /* Detail header */
              <div className="flex shrink-0 items-center gap-2 border-b border-slate-100 px-4 py-3">
                <button
                  onClick={() => setExpandedNotif(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100"
                  aria-label="Volver a lista"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_back
                  </span>
                </button>
                <span className="text-sm font-bold text-slate-900">
                  Detalle
                </span>
                <div className="ml-auto flex items-center gap-1">
                  <button
                    onClick={(e) => handleTrashClick(e, expandedNotif)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    aria-label="Eliminar notificación"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      delete
                    </span>
                  </button>
                  <button
                    onClick={closePanel}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Cerrar"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      close
                    </span>
                  </button>
                </div>
              </div>
            ) : (
              /* List header */
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
                <button
                  onClick={closePanel}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                  aria-label="Cerrar notificaciones"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    close
                  </span>
                </button>
              </div>
            )}

            {/* ── Tabs — only visible in list mode ───────────────── */}
            {!expandedNotif && (
              <div className="flex shrink-0 gap-1 border-b border-slate-100 px-4 py-2">
                {(
                  [
                    {
                      key: "unread",
                      label: "Recibidas",
                      count: unreadTabCount,
                    },
                    { key: "read", label: "Le\u00eddas", count: readTabCount },
                  ] as { key: Tab; label: string; count: number }[]
                ).map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold transition-colors",
                      activeTab === tab.key
                        ? "bg-primary/10 text-primary"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                    )}
                  >
                    {tab.label}
                    {tab.count > 0 && (
                      <span
                        className={cn(
                          "flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[9px] font-black",
                          activeTab === tab.key
                            ? "bg-primary text-white"
                            : "bg-slate-200 text-slate-500"
                        )}
                      >
                        {tab.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* ── Body ───────────────────────────────────────────── */}
            <div className="flex-1 overflow-hidden overflow-y-auto overscroll-contain">
              {expandedNotif ? (
                /* ── Detail sub-panel ─────────────────────────── */
                <DetailView
                  notif={expandedNotif}
                  cta={getDetailCTA(expandedNotif)}
                />
              ) : filteredNotifs.length === 0 ? (
                /* ── Empty state ──────────────────────────────── */
                <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                    <span
                      className="material-symbols-outlined text-[28px] text-slate-400"
                      style={{ fontVariationSettings: "'FILL' 0" }}
                    >
                      {activeTab === "read"
                        ? "mark_email_read"
                        : "notifications_none"}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-700">
                      {activeTab === "unread"
                        ? "Todo al d\u00eda"
                        : "Nada le\u00eddo a\u00fan"}
                    </p>
                    <p className="text-xs leading-relaxed text-slate-400">
                      {activeTab === "unread"
                        ? "No tienes notificaciones pendientes."
                        : "Las notificaciones que abras aparecer\u00e1n aqu\u00ed."}
                    </p>
                  </div>
                </div>
              ) : (
                /* ── Notification list ────────────────────────── */
                <ul className="flex flex-col gap-1 p-3">
                  {filteredNotifs.map((notif) => {
                    const cfg = NOTIF_CONFIG[notif.type] ?? FALLBACK_CONFIG;

                    return (
                      <NotifRow
                        key={notif.id}
                        notif={notif}
                        cfg={cfg}
                        onOpen={handleNotifClick}
                        onTrash={handleTrashClick}
                      />
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* ── Confirmación de eliminación ───────────────────── */}
          {deleteTarget && (
            <ConfirmModal
              title="¿Eliminar notificación?"
              message={`Se eliminará "${deleteTarget.title}" de forma permanente.`}
              confirmLabel="Eliminar"
              confirmClass="bg-red-500 hover:bg-red-600 text-white"
              onConfirm={handleDeleteConfirm}
              onCancel={() => setDeleteTarget(null)}
            />
          )}

          {/* ── Modal de bloqueo (condición no cumplida) ─────── */}
          {blockInfo && (
            <ConfirmModal
              title="No puedes eliminar esto aún"
              message={blockInfo.message}
              confirmLabel={blockInfo.actionLabel}
              confirmClass="bg-primary hover:bg-primary/90 text-white"
              onConfirm={blockInfo.onAction}
              onCancel={() => setBlockInfo(null)}
            />
          )}
        </div>,
        document.body
      )
    : null;

  return (
    <>
      {/* ── Trigger ─────────────────────────────────────────── */}
      <button
        type="button"
        aria-label={
          unreadCount > 0
            ? `Tienes ${unreadCount} notificación${unreadCount > 1 ? "es" : ""} sin leer`
            : "Centro de notificaciones"
        }
        onClick={() => setIsOpen(true)}
        className="border-primary/10 text-primary relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
      >
        {/* Pulse */}
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

// ── NotifRow ───────────────────────────────────────────────────

interface NotifRowProps {
  notif: AppNotification;
  cfg: IconConfig;
  onOpen: (notif: AppNotification) => void;
  onTrash: (
    e: React.MouseEvent | React.KeyboardEvent,
    notif: AppNotification
  ) => void;
}

function NotifRow({ notif, cfg, onOpen, onTrash }: NotifRowProps) {
  return (
    <li>
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(notif)}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen(notif)}
        className={cn(
          "group relative w-full cursor-pointer rounded-xl border px-3 py-3 text-left transition-colors",
          notif.read
            ? "border-slate-100 hover:bg-slate-50/70"
            : "border-slate-200 bg-blue-50/25 hover:bg-blue-50/40"
        )}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
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

          {/* Content */}
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p
                className={cn(
                  "truncate text-xs leading-snug font-semibold",
                  notif.read ? "text-slate-500" : "text-slate-900"
                )}
              >
                {notif.title}
              </p>
              <div className="flex shrink-0 items-center gap-1">
                {!notif.read && (
                  <span
                    className={cn(
                      "h-2 w-2 shrink-0 rounded-full",
                      cfg.dotColor
                    )}
                    aria-label="No leído"
                  />
                )}
              </div>
            </div>
            <p className="mt-0.5 line-clamp-2 text-[11px] leading-relaxed text-slate-400">
              {notif.message}
            </p>
            <div className="mt-1.5 flex items-center justify-between gap-2">
              <p className="text-[10px] font-medium text-slate-300">
                {timeAgo(notif.created_at)}
              </p>
              <span className="text-[10px] text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">
                Ver detalle →
              </span>
            </div>
          </div>

          {/* Trash */}
          <button
            onClick={(e) => onTrash(e, notif)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && onTrash(e, notif)
            }
            className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-red-50 hover:text-red-400"
            aria-label="Eliminar notificación"
          >
            <span className="material-symbols-outlined text-[16px]">
              delete
            </span>
          </button>
        </div>
      </div>
    </li>
  );
}

// ── DetailView ─────────────────────────────────────────────────

interface DetailViewProps {
  notif: AppNotification;
  cta: { label: string; icon: string; action: () => void } | null;
}

function DetailView({ notif, cta }: DetailViewProps) {
  const cfg = NOTIF_CONFIG[notif.type] ?? FALLBACK_CONFIG;

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Icon + type badge */}
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1",
            cfg.iconBg,
            cfg.iconRing
          )}
        >
          <span
            className={cn(
              "material-symbols-outlined text-[24px]",
              cfg.iconColor
            )}
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            {cfg.icon}
          </span>
        </div>
        <div>
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold",
              cfg.iconBg,
              cfg.iconColor
            )}
          >
            {cfg.label}
          </span>
          <p className="mt-0.5 text-[10px] text-slate-400">
            {formatDate(notif.created_at)}
          </p>
        </div>
        {/* Read indicator */}
        {notif.read ? (
          <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-500">
            <span className="material-symbols-outlined text-[14px]">
              check_circle
            </span>
            Leída
          </span>
        ) : (
          <span
            className={cn(
              "ml-auto h-2.5 w-2.5 shrink-0 rounded-full",
              cfg.dotColor
            )}
            aria-label="No leída"
          />
        )}
      </div>

      {/* Title */}
      <div>
        <h3 className="text-base leading-snug font-bold text-slate-900">
          {notif.title}
        </h3>
      </div>

      {/* Full message */}
      <div className="rounded-xl bg-slate-50 p-4">
        <p className="text-sm leading-relaxed text-slate-600">
          {notif.message}
        </p>
      </div>

      {/* CTA */}
      {cta && (
        <button
          onClick={cta.action}
          className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-bold text-white shadow-sm transition-colors"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            aria-hidden="true"
          >
            {cta.icon}
          </span>
          {cta.label}
        </button>
      )}
    </div>
  );
}

// ── ConfirmModal ───────────────────────────────────────────────

interface ConfirmModalProps {
  title: string;
  message: string;
  confirmLabel: string;
  confirmClass: string;
  onConfirm: () => void;
  onCancel: () => void;
  hideCancel?: boolean;
}

function ConfirmModal({
  title,
  message,
  confirmLabel,
  confirmClass,
  onConfirm,
  onCancel,
  hideCancel = false,
}: ConfirmModalProps) {
  return (
    <div
      className="absolute inset-0 z-20 flex items-center justify-center p-6"
      role="alertdialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-5 shadow-xl">
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">{message}</p>
        <div className="mt-4 flex gap-2">
          {!hideCancel && (
            <button
              onClick={onCancel}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50"
            >
              Cancelar
            </button>
          )}
          <button
            onClick={onConfirm}
            className={cn(
              "flex-1 rounded-xl px-4 py-2 text-sm font-bold transition-colors",
              confirmClass
            )}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
