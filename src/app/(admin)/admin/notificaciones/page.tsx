"use client";

/**
 * /admin/notificaciones
 * ─────────────────────────────────────────────────────────────
 * Panel de administración de notificaciones.
 * Permite:
 *   - Ver todas las notificaciones enviadas
 *   - Crear notificaciones manuales (con o sin Web Push)
 *   - Eliminar notificaciones
 * ─────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-hot-toast";
import { cn } from "@/lib/utils";
import { env } from "@/env";
import { logger } from "@/lib/logger";

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  image_url: string | null;
  target_url: string | null;
  cta_label: string | null;
  push_sent: boolean;
  created_at: string;
}

const TYPE_LABELS: Record<string, { label: string; color: string }> = {
  manual: { label: "Manual", color: "bg-primary/10 text-primary" },
  new_product: { label: "Producto", color: "bg-emerald-100 text-emerald-700" },
  new_offer: { label: "Oferta", color: "bg-amber-100 text-amber-700" },
  info: { label: "Info", color: "bg-sky-100 text-sky-700" },
};

function timeAgo(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);
  if (diff < 60_000) return "Ahora mismo";
  if (mins < 60) return `Hace ${mins}m`;
  if (hours < 24) return `Hace ${hours}h`;
  return `Hace ${days}d`;
}

export default function NotificacionesAdminPage() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    message: "",
    type: "manual" as string,
    target_url: "",
    cta_label: "",
    image_url: "",
    sendPush: true,
  });

  const fetchNotifications = useCallback(async () => {
    const supabase = getSupabaseClient();
    const { data, error } = await supabase
      .from("notifications")
      .select(
        "id, type, title, message, image_url, target_url, cta_label, push_sent, created_at"
      )
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      toast.error("Error cargando notificaciones");
      return;
    }
    setNotifications((data ?? []) as Notification[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.message.trim()) {
      toast.error("Título y mensaje son requeridos");
      return;
    }

    setSubmitting(true);
    const supabase = getSupabaseClient();

    try {
      // 1. Insertar en notifications
      const { data: notif, error } = await supabase
        .from("notifications")
        .insert({
          type: form.type,
          title: form.title.trim(),
          message: form.message.trim(),
          target_url: form.target_url.trim() || null,
          cta_label: form.cta_label.trim() || null,
          image_url: form.image_url.trim() || null,
        })
        .select("id")
        .single();

      if (error || !notif) throw error ?? new Error("Insert failed");

      // 2. Enviar Web Push si se solicitó
      if (form.sendPush) {
        try {
          const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
          const res = await fetch(`${supabaseUrl}/functions/v1/send-push`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
            },
            body: JSON.stringify({ notification_id: notif.id }),
          });
          const result = (await res.json()) as {
            sent?: number;
            failed?: number;
          };
          toast.success(
            `Notificación enviada — ${result.sent ?? 0} push enviados`
          );
        } catch {
          toast.success(
            "Notificación creada (Web Push falló, verificar Edge Function)"
          );
        }
      } else {
        toast.success("Notificación in-app creada");
      }

      // Resetear form y recargar lista
      setForm({
        title: "",
        message: "",
        type: "manual",
        target_url: "",
        cta_label: "",
        image_url: "",
        sendPush: true,
      });
      await fetchNotifications();
    } catch (err) {
      toast.error("Error creando notificación");
      logger.error("[notificaciones] Error creando notificación:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    const supabase = getSupabaseClient();
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error("Error eliminando");
      return;
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.success("Notificación eliminada");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Notificaciones
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Envía notificaciones in-app y Web Push a todos los visitantes.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2">
            <span className="material-symbols-outlined text-[18px] text-slate-500">
              people
            </span>
            <span className="text-sm font-semibold text-slate-600">
              {notifications.length} enviadas
            </span>
          </div>
        </div>

        {/* Formulario de creación */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-base font-bold text-slate-900">
            Nueva notificación
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Tipo */}
              <div>
                <label
                  htmlFor="notif-type"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  Tipo
                </label>
                <select
                  id="notif-type"
                  value={form.type}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, type: e.target.value }))
                  }
                  className="focus:border-primary/40 focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 focus:ring-2 focus:outline-none"
                >
                  <option value="manual">Manual</option>
                  <option value="new_product">Nuevo producto</option>
                  <option value="new_offer">Nueva oferta</option>
                  <option value="info">Informativa</option>
                </select>
              </div>

              {/* URL destino */}
              <div>
                <label
                  htmlFor="notif-target-url"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  URL destino (opcional)
                </label>
                <input
                  id="notif-target-url"
                  type="url"
                  placeholder="https://confeccionesliss.com/catalogo"
                  value={form.target_url}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, target_url: e.target.value }))
                  }
                  className="focus:border-primary/40 focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:outline-none"
                />
              </div>

              {/* Texto del botón CTA */}
              <div>
                <label
                  htmlFor="notif-cta-label"
                  className="mb-1.5 block text-xs font-semibold text-slate-600"
                >
                  Texto del botón CTA{" "}
                  <span className="font-normal text-slate-400">
                    (opcional — ej: «Ver oferta», «Aprovechar ahora»)
                  </span>
                </label>
                <input
                  id="notif-cta-label"
                  type="text"
                  placeholder="Ver oferta"
                  maxLength={60}
                  value={form.cta_label}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, cta_label: e.target.value }))
                  }
                  disabled={!form.target_url.trim()}
                  className="focus:border-primary/40 focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            </div>

            {/* Título */}
            <div>
              <label
                htmlFor="notif-title"
                className="mb-1.5 block text-xs font-semibold text-slate-600"
              >
                Título *
              </label>
              <input
                id="notif-title"
                type="text"
                required
                placeholder="¡Nueva colección disponible!"
                maxLength={100}
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                className="focus:border-primary/40 focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:outline-none"
              />
            </div>

            {/* Mensaje */}
            <div>
              <label
                htmlFor="notif-message"
                className="mb-1.5 block text-xs font-semibold text-slate-600"
              >
                Mensaje *
              </label>
              <textarea
                id="notif-message"
                required
                rows={3}
                placeholder="Descubre los nuevos uniformes para esta temporada..."
                maxLength={300}
                value={form.message}
                onChange={(e) =>
                  setForm((f) => ({ ...f, message: e.target.value }))
                }
                className="focus:border-primary/40 focus:ring-primary/20 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:outline-none"
              />
            </div>

            {/* URL imagen */}
            <div>
              <label
                htmlFor="notif-image-url"
                className="mb-1.5 block text-xs font-semibold text-slate-600"
              >
                Imagen URL (opcional — para Web Push)
              </label>
              <input
                id="notif-image-url"
                type="url"
                placeholder="https://..."
                value={form.image_url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, image_url: e.target.value }))
                }
                className="focus:border-primary/40 focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:outline-none"
              />
            </div>

            {/* Toggle Web Push — switch accesible */}
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
              <button
                type="button"
                role="switch"
                aria-checked={form.sendPush}
                aria-label="Enviar Web Push"
                onClick={() =>
                  setForm((f) => ({ ...f, sendPush: !f.sendPush }))
                }
                className={cn(
                  "focus:ring-primary/30 relative h-6 w-11 shrink-0 rounded-full transition-colors focus:ring-2 focus:outline-none",
                  form.sendPush ? "bg-primary" : "bg-slate-300"
                )}
              >
                <span className="sr-only">
                  {form.sendPush ? "Activado" : "Desactivado"}
                </span>
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
                    form.sendPush ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
              <div>
                <p className="text-sm font-semibold text-slate-800">
                  Enviar Web Push
                </p>
                <p className="text-xs text-slate-400">
                  Notificará al dispositivo de los suscriptores aunque no estén
                  en el sitio
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-gradient flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            >
              <span className="material-symbols-outlined text-[18px]">
                {submitting ? "hourglass_empty" : "send"}
              </span>
              {submitting ? "Enviando..." : "Enviar notificación"}
            </button>
          </form>
        </div>

        {/* Lista de notificaciones enviadas */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="text-base font-bold text-slate-900">Historial</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="border-primary h-8 w-8 animate-spin rounded-full border-2 border-t-transparent" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <span className="material-symbols-outlined text-[40px] text-slate-300">
                notifications_none
              </span>
              <p className="text-sm text-slate-400">
                No hay notificaciones enviadas aún
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {notifications.map((notif) => {
                const typeInfo = TYPE_LABELS[notif.type] ?? TYPE_LABELS.manual;
                return (
                  <li
                    key={notif.id}
                    className="flex items-start gap-4 px-6 py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-[10px] font-bold",
                            typeInfo.color
                          )}
                        >
                          {typeInfo.label}
                        </span>
                        {notif.push_sent && (
                          <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-bold text-violet-700">
                            Push ✓
                          </span>
                        )}
                        <span className="text-[11px] text-slate-400">
                          {timeAgo(notif.created_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-semibold text-slate-800">
                        {notif.title}
                      </p>
                      <p className="text-xs text-slate-500">{notif.message}</p>
                      {notif.target_url && (
                        <a
                          href={notif.target_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary mt-0.5 inline-block text-[11px] underline"
                        >
                          {notif.target_url}
                        </a>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                      aria-label="Eliminar notificación"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        delete
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
