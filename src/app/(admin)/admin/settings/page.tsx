"use client";

/**
 * /admin/settings — Panel de Control del Sistema
 * ──────────────────────────────────────────────────
 * Acceso restringido. Solo personal autorizado.
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
    label: "Violación de política de contenido",
    color: "text-red-700 bg-red-50 border-red-200",
    icon: "security",
  },
  killswitch_activated: {
    label: "Protocolo de terminación ejecutado",
    color: "text-red-900 bg-red-100 border-red-300",
    icon: "power_off",
  },
  killswitch_deactivated: {
    label: "Servicio restaurado",
    color: "text-emerald-800 bg-emerald-50 border-emerald-200",
    icon: "check_circle",
  },
  rate_limit_exceeded: {
    label: "Límite de solicitudes excedido",
    color: "text-amber-800 bg-amber-50 border-amber-200",
    icon: "warning",
  },
  anomaly_detected: {
    label: "Comportamiento anómalo detectado",
    color: "text-purple-800 bg-purple-50 border-purple-200",
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
  const [confirmText, setConfirmText] = useState("");
  const [toast, setToast] = useState<{
    msg: string;
    type: "ok" | "error";
  } | null>(null);

  const showToast = (msg: string, type: "ok" | "error" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 5000);
  };

  // ── Cargar estado del killswitch ───────────────────────────
  const loadKillswitch = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("get_killswitch_state");
      if (error) throw error;
      const result = data as { killswitch_active: boolean } | null;
      setKillswitchActive(result?.killswitch_active ?? false);
    } catch (err) {
      logger.error("Error loading killswitch state:", err);
      showToast("No se pudo verificar el estado del sistema", "error");
    } finally {
      setLoadingKS(false);
    }
  }, []);

  // ── Cargar eventos de seguridad ────────────────────────────
  const loadEvents = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("get_security_events", {
        p_limit: 50,
      });
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

  // ── Ejecutar protocolo ─────────────────────────────────────
  const handleToggleKillswitch = async (activate: boolean) => {
    setConfirmActive(false);
    setConfirmText("");
    setTogglingKS(true);
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.rpc("toggle_killswitch", { activate });
      if (error) throw error;

      setKillswitchActive(activate);
      showToast(
        activate
          ? "El servicio ha sido terminado. El sitio no responde a solicitudes externas."
          : "Servicio restaurado. El sitio está operativo.",
        activate ? "error" : "ok"
      );
      loadEvents();
    } catch (err) {
      logger.error("Error toggling killswitch:", err);
      showToast("Error al ejecutar la operación", "error");
    } finally {
      setTogglingKS(false);
    }
  };

  // La frase de confirmación es deliberadamente técnica y larga
  // para disuadir activaciones accidentales.
  const CONFIRM_PHRASE = "CONFIRMAR TERMINACIÓN DEL SERVICIO";

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-xl px-5 py-3 text-sm font-semibold shadow-xl ${
            toast.type === "ok"
              ? "bg-emerald-800 text-white"
              : "bg-red-950 text-red-200 ring-1 ring-red-800"
          }`}
        >
          {toast.msg}
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-10">
        <p className="mb-1 text-[11px] font-semibold tracking-[0.2em] text-slate-400 uppercase">
          Control del sistema
        </p>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">
          Seguridad y disponibilidad
        </h1>
      </div>

      {/* ── Killswitch Card ─────────────────────────────────── */}
      <section className="mb-10">
        <div
          className={`rounded-2xl border transition-all duration-300 ${
            killswitchActive
              ? "border-red-300 bg-red-950 dark:border-red-900"
              : "border-slate-200 bg-white dark:border-white/10 dark:bg-white/5"
          }`}
        >
          {/* Header de la card */}
          <div
            className={`flex items-center justify-between gap-4 border-b px-6 py-5 ${
              killswitchActive
                ? "border-red-900/60"
                : "border-slate-100 dark:border-white/5"
            }`}
          >
            <div className="flex items-center gap-4">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                  killswitchActive
                    ? "bg-red-900"
                    : "bg-slate-100 dark:bg-white/10"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${
                    killswitchActive
                      ? "text-red-400"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {killswitchActive ? "power_off" : "shield_lock"}
                </span>
              </span>
              <div>
                <h2
                  className={`text-sm font-bold ${
                    killswitchActive
                      ? "text-red-200"
                      : "text-slate-900 dark:text-white"
                  }`}
                >
                  Terminación de servicio
                </h2>
                <p
                  className={`text-xs ${
                    killswitchActive
                      ? "text-red-500"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  {killswitchActive
                    ? "El sitio no está disponible para el público"
                    : "Baja inmediata de todas las rutas públicas"}
                </p>
              </div>
            </div>

            {/* Estado */}
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${
                loadingKS
                  ? "bg-slate-100 text-slate-400 dark:bg-white/10 dark:text-slate-500"
                  : killswitchActive
                    ? "bg-red-900 text-red-300"
                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
              }`}
            >
              {loadingKS ? "—" : killswitchActive ? "TERMINADO" : "Operativo"}
            </span>
          </div>

          {/* Cuerpo */}
          <div className="px-6 py-5">
            {killswitchActive ? (
              /* ── Estado activo ── */
              <div className="flex flex-col gap-5">
                <div className="rounded-xl border border-red-900/60 bg-red-900/30 p-4">
                  <p className="text-xs leading-relaxed text-red-400">
                    El protocolo ha eliminado el sitio de la red. Todos los
                    datos del servicio activo han sido purgados del caché y el
                    acceso público destruido de forma permanente. No existe
                    proceso de recuperación.
                  </p>
                  <p className="mt-3 border-t border-red-900/40 pt-3 text-xs text-red-400 italic">
                    &ldquo;Si la tierra no es nuestra, no es de nadie.&rdquo;
                  </p>
                </div>

                {/* El botón existe — pero el copy no promete recuperación */}
                <button
                  onClick={() => handleToggleKillswitch(false)}
                  disabled={togglingKS}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-40"
                >
                  <span className="material-symbols-outlined text-base">
                    check_circle
                  </span>
                  {togglingKS ? "Procesando..." : "Levantar servicio"}
                </button>
              </div>
            ) : (
              /* ── Estado inactivo ── */
              <div className="flex flex-col gap-5">
                {/* Aviso de impacto — sobrio, sin drama */}
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    <strong className="font-bold text-slate-800 dark:text-slate-200">
                      Activar únicamente ante un incidente o evento de seguridad
                      confirmado y activo.
                    </strong>{" "}
                    Al ejecutar, el sitio deja de responder a solicitudes
                    externas en menos de 30 segundos. Los datos del servicio
                    activo son destruidos de forma permanente e irrecuperable.
                    No existe ningún proceso de restauración.
                  </p>
                  <p className="mt-3 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-white/10 dark:text-slate-500">
                    El sistema también activa este protocolo de forma automática
                    al detectar cualquier intrusión forzada.
                  </p>
                </div>

                {!confirmActive ? (
                  <button
                    onClick={() => setConfirmActive(true)}
                    disabled={loadingKS || togglingKS}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50 disabled:opacity-40 dark:border-red-900/40 dark:bg-transparent dark:text-red-500 dark:hover:bg-red-950/30"
                  >
                    <span className="material-symbols-outlined text-base">
                      power_off
                    </span>
                    Terminar servicio
                  </button>
                ) : (
                  /* ── Confirmación ── */
                  <div className="flex flex-col gap-4 rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/40 dark:bg-red-950/30">
                    <div>
                      <p className="text-sm font-semibold text-red-900 dark:text-red-300">
                        Confirmación requerida
                      </p>
                      <p className="mt-1 text-xs text-red-700 dark:text-red-500">
                        Esta acción no tiene efecto diferido. El sitio cae en
                        cuanto se confirma. No habrá advertencia a los
                        visitantes activos.
                      </p>
                    </div>

                    {/* Campo de confirmación */}
                    <div>
                      <label className="mb-1.5 block text-[11px] font-semibold tracking-widest text-red-800 uppercase dark:text-red-400">
                        Escribe para confirmar:{" "}
                        <span className="font-mono">{CONFIRM_PHRASE}</span>
                      </label>
                      <input
                        type="text"
                        value={confirmText}
                        onChange={(e) => setConfirmText(e.target.value)}
                        placeholder={CONFIRM_PHRASE}
                        className="w-full rounded-lg border border-red-300 bg-white px-4 py-2.5 font-mono text-sm text-red-900 placeholder-red-300 outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200 dark:placeholder-red-800 dark:focus:border-red-700"
                      />
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleToggleKillswitch(true)}
                        disabled={togglingKS || confirmText !== CONFIRM_PHRASE}
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-800 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        <span className="material-symbols-outlined text-base">
                          power_off
                        </span>
                        {togglingKS ? "Ejecutando..." : "Confirmar"}
                      </button>
                      <button
                        onClick={() => {
                          setConfirmActive(false);
                          setConfirmText("");
                        }}
                        className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-400 dark:hover:bg-white/5"
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
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Registro de eventos
            </h2>
            <p className="text-xs text-slate-400">
              Últimas 50 entradas · Solo visible para administradores
            </p>
          </div>
          <button
            onClick={() => {
              setLoadingEvents(true);
              loadEvents();
            }}
            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-100 dark:hover:bg-white/5"
          >
            <span className="material-symbols-outlined text-[15px]">
              refresh
            </span>
            Actualizar
          </button>
        </div>

        {loadingEvents ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 py-16 dark:border-white/5 dark:bg-white/5">
            <span className="material-symbols-outlined text-3xl text-slate-300">
              shield_lock
            </span>
            <p className="text-sm text-slate-400">Sin eventos registrados</p>
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
                      <span className="font-semibold">{meta.label}</span>
                      <span className="shrink-0 text-[10px] opacity-60">
                        {new Date(event.created_at).toLocaleString("es-SV")}
                      </span>
                    </div>
                    {event.payload && (
                      <div className="mt-1 truncate opacity-70">
                        {event.payload.blocked_uri
                          ? `Recurso bloqueado: ${event.payload.blocked_uri}`
                          : event.payload.violated_directive
                            ? `Directiva: ${event.payload.violated_directive}`
                            : JSON.stringify(event.payload).slice(0, 120)}
                      </div>
                    )}
                    {event.ip && (
                      <div className="mt-0.5 font-mono opacity-50">
                        {event.ip}
                      </div>
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
