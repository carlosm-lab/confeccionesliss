"use client";

/**
 * /admin/settings — Panel de control de seguridad
 * ──────────────────────────────────────────────────
 * Permite al administrador:
 * 1. Activar/desactivar el killswitch del sitio (baja inmediata < 30s)
 * 2. Ver el log de eventos de seguridad (violaciones CSP, activaciones)
 */

import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";

interface SecurityEvent {
  id: string;
  event_type: string;
  payload: Record<string, unknown> | null;
  ip: string | null;
  user_agent: string | null;
  url: string | null;
  created_at: string;
}

const EVENT_LABELS: Record<
  string,
  { label: string; color: string; icon: string }
> = {
  csp_violation: {
    label: "Violación CSP",
    color: "text-red-600 bg-red-50 border-red-100",
    icon: "security",
  },
  killswitch_activated: {
    label: "Killswitch ACTIVADO",
    color: "text-orange-600 bg-orange-50 border-orange-100",
    icon: "power_off",
  },
  killswitch_deactivated: {
    label: "Killswitch desactivado",
    color: "text-green-600 bg-green-50 border-green-100",
    icon: "power",
  },
  rate_limit_exceeded: {
    label: "Rate limit excedido",
    color: "text-yellow-600 bg-yellow-50 border-yellow-100",
    icon: "warning",
  },
  anomaly_detected: {
    label: "Anomalía detectada",
    color: "text-purple-600 bg-purple-50 border-purple-100",
    icon: "radar",
  },
};

export default function AdminSettingsPage() {
  const [killswitchActive, setKillswitchActive] = useState(false);
  const [loadingKS, setLoadingKS] = useState(true);
  const [togglingKS, setTogglingKS] = useState(false);
  const [events, setEvents] = useState<SecurityEvent[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [confirmActive, setConfirmActive] = useState(false);
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "error";
  } | null>(null);

  const showToast = (msg: string, type: "ok" | "error" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  // ── Cargar estado del killswitch ───────────────────────────
  const loadKillswitch = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("site_config")
        .select("value")
        .eq("key", "killswitch_active")
        .single();

      if (error) throw error;
      setKillswitchActive(data?.value === "true");
    } catch (err) {
      logger.error("Error loading killswitch state:", err);
      showToast("Error al cargar el estado del killswitch", "error");
    } finally {
      setLoadingKS(false);
    }
  }, []);

  // ── Cargar eventos de seguridad ────────────────────────────
  const loadEvents = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("security_events")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setEvents((data ?? []) as SecurityEvent[]);
    } catch (err) {
      logger.error("Error loading security events:", err);
    } finally {
      setLoadingEvents(false);
    }
  }, []);

  useEffect(() => {
    loadKillswitch();
    loadEvents();
  }, [loadKillswitch, loadEvents]);

  // ── Toggle killswitch ──────────────────────────────────────
  const handleToggleKillswitch = async (activate: boolean) => {
    setConfirmActive(false);
    setTogglingKS(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.rpc("toggle_killswitch", {
        activate,
      });
      if (error) throw error;

      setKillswitchActive(activate);
      showToast(
        activate
          ? "⚠️ Killswitch ACTIVADO — el sitio está en mantenimiento"
          : "✅ Killswitch desactivado — el sitio volvió a funcionar",
        activate ? "error" : "ok"
      );
      loadEvents();
    } catch (err) {
      logger.error("Error toggling killswitch:", err);
      showToast("Error al cambiar el estado del killswitch", "error");
    } finally {
      setTogglingKS(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-2xl px-5 py-3 text-sm font-bold shadow-xl transition-all ${
            toast.type === "ok"
              ? "bg-green-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {toast.msg}
        </div>
      )}

      <h1 className="mb-8 text-2xl font-black text-slate-900 dark:text-white">
        Panel de Seguridad
      </h1>

      {/* ── Killswitch Card ──────────────────────────────────── */}
      <section className="mb-8">
        <div
          className={`overflow-hidden rounded-2xl border shadow-sm transition-all ${
            killswitchActive
              ? "border-red-200 bg-red-50 dark:border-red-800/40 dark:bg-red-900/10"
              : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
          }`}
        >
          {/* Header */}
          <div className="flex items-center gap-4 border-b border-slate-100 px-6 py-4 dark:border-white/5">
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                killswitchActive
                  ? "bg-red-100 dark:bg-red-900/30"
                  : "bg-slate-100 dark:bg-white/10"
              }`}
            >
              <span
                className={`material-symbols-outlined text-xl ${
                  killswitchActive
                    ? "text-red-600"
                    : "text-slate-600 dark:text-slate-300"
                }`}
              >
                {killswitchActive ? "power_off" : "power"}
              </span>
            </span>
            <div>
              <h2 className="font-bold text-slate-900 dark:text-white">
                Killswitch del Sitio
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Activa para poner el sitio en modo mantenimiento en menos de 30
                segundos
              </p>
            </div>
            {/* Estado badge */}
            <span
              className={`ml-auto rounded-full px-3 py-1 text-xs font-bold ${
                loadingKS
                  ? "bg-slate-100 text-slate-500"
                  : killswitchActive
                    ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400"
                    : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
              }`}
            >
              {loadingKS
                ? "Cargando..."
                : killswitchActive
                  ? "ACTIVO"
                  : "Inactivo"}
            </span>
          </div>

          {/* Body */}
          <div className="px-6 py-5">
            {killswitchActive ? (
              <div className="flex flex-col gap-4">
                {/* Alerta activa */}
                <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-100 p-4 dark:border-red-800/40 dark:bg-red-900/20">
                  <span className="material-symbols-outlined mt-0.5 text-lg text-red-600">
                    warning
                  </span>
                  <div>
                    <p className="text-sm font-bold text-red-800 dark:text-red-400">
                      El sitio está en modo mantenimiento
                    </p>
                    <p className="mt-1 text-xs text-red-700 dark:text-red-500">
                      Todas las rutas excepto{" "}
                      <code className="rounded bg-red-200/50 px-1">/</code>,{" "}
                      <code className="rounded bg-red-200/50 px-1">/links</code>{" "}
                      y{" "}
                      <code className="rounded bg-red-200/50 px-1">
                        /mantenimiento
                      </code>{" "}
                      están bloqueadas.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleToggleKillswitch(false)}
                  disabled={togglingKS}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold text-white shadow-md transition hover:bg-green-700 disabled:opacity-50"
                >
                  <span className="material-symbols-outlined text-lg">
                    power
                  </span>
                  {togglingKS
                    ? "Desactivando..."
                    : "Desactivar — Restaurar sitio"}
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  El sitio está operando con normalidad. Activa el killswitch
                  solo ante un incidente de seguridad confirmado.
                </p>

                {!confirmActive ? (
                  <button
                    onClick={() => setConfirmActive(true)}
                    disabled={loadingKS || togglingKS}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3 font-bold text-red-600 shadow-sm transition hover:border-red-300 hover:bg-red-50 disabled:opacity-50 dark:border-red-800/40 dark:bg-transparent dark:hover:bg-red-900/10"
                  >
                    <span className="material-symbols-outlined text-lg">
                      power_off
                    </span>
                    Activar Killswitch
                  </button>
                ) : (
                  <div className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 dark:border-red-800/40 dark:bg-red-900/10">
                    <p className="text-sm font-bold text-red-700 dark:text-red-400">
                      ¿Confirmas que quieres poner el sitio en mantenimiento?
                    </p>
                    <p className="text-xs text-red-600 dark:text-red-500">
                      El sitio será inaccesible para todos los visitantes hasta
                      que lo reactives.
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleToggleKillswitch(true)}
                        disabled={togglingKS}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white transition hover:bg-red-700 disabled:opacity-50"
                      >
                        {togglingKS ? "Activando..." : "Sí, activar ahora"}
                      </button>
                      <button
                        onClick={() => setConfirmActive(false)}
                        className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-slate-50 dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Log de Eventos ───────────────────────────────────── */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Registro de Eventos de Seguridad
          </h2>
          <button
            onClick={() => {
              setLoadingEvents(true);
              loadEvents();
            }}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <span className="material-symbols-outlined text-[16px]">
              refresh
            </span>
            Actualizar
          </button>
        </div>

        {loadingEvents ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 py-16 dark:border-white/5 dark:bg-white/5">
            <span className="material-symbols-outlined text-4xl text-slate-300">
              shield
            </span>
            <p className="text-sm font-medium text-slate-400">
              Sin eventos de seguridad registrados
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {events.map((event) => {
              const meta = EVENT_LABELS[event.event_type] ?? {
                label: event.event_type,
                color: "text-slate-600 bg-slate-50 border-slate-100",
                icon: "info",
              };
              return (
                <div
                  key={event.id}
                  className={`flex items-start gap-3 rounded-xl border px-4 py-3 text-xs ${meta.color}`}
                >
                  <span className="material-symbols-outlined mt-0.5 text-base">
                    {meta.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold">{meta.label}</span>
                      <span className="shrink-0 text-[10px] opacity-60">
                        {new Date(event.created_at).toLocaleString("es-SV")}
                      </span>
                    </div>
                    {event.payload && (
                      <div className="mt-1 truncate opacity-70">
                        {event.payload.blocked_uri
                          ? `Bloqueado: ${event.payload.blocked_uri}`
                          : event.payload.violated_directive
                            ? `Directiva: ${event.payload.violated_directive}`
                            : JSON.stringify(event.payload).slice(0, 120)}
                      </div>
                    )}
                    {event.ip && (
                      <div className="mt-0.5 opacity-50">IP: {event.ip}</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
