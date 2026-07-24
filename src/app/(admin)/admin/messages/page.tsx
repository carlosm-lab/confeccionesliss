"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import MessageCard from "@/components/admin/MessageCard";
import { logger } from "@/lib/logger";
import { useConfirm } from "@/context/ConfirmContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import FocusLock from "react-focus-lock";

interface Message {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"unread" | "read" | "all">("unread");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const confirm = useConfirm();

  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();

      let query: any = supabase
        .from("messages")
        .select("id, name, email, subject, message, created_at, is_read")
        .order("created_at", { ascending: false });

      if (filter === "unread") query = query.eq("is_read", false);
      else if (filter === "read") query = query.eq("is_read", true);

      const { data, error } = await query;
      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      logger.error("Error fetching messages:", error);
      showToast("Error cargando mensajes", false);
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleSelectMessage = (message: Message) => {
    setSelectedMessage(message);
    if (!message.is_read) toggleReadStatus(message.id, true);
  };

  const toggleReadStatus = async (id: string, newStatus: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, is_read: newStatus } : m))
    );
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("messages")
        .update({ is_read: newStatus })
        .eq("id", id);
      if (error) throw error;
    } catch (error) {
      logger.error("Error updating message:", error);
      showToast("Error al actualizar", false);
      fetchMessages();
    }
  };

  const deleteMessage = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Eliminar mensaje",
      message:
        "¿Eliminar este mensaje permanentemente? No podrá ser recuperado.",
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      type: "danger",
    });
    if (!isConfirmed) return;

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("messages").delete().eq("id", id);
      if (error) throw error;
      setMessages((prev) => prev.filter((m) => m.id !== id));
      showToast("Mensaje eliminado");
    } catch (error) {
      logger.error("Error deleting message:", error);
      showToast("Error al eliminar", false);
    }
  };

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <div className="flex h-full w-full max-w-[1400px] flex-col">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[300] flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
        >
          <Icon name={toast.ok ? "check_circle" : "error"} size={18} />
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="mb-2 flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-white">
            Bandeja de Entrada
            {unreadCount > 0 && filter === "unread" && (
              <span className="bg-primary rounded-full px-2 py-0.5 text-xs text-white">
                {unreadCount} nuevos
              </span>
            )}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Consultas desde el formulario de contacto.
          </p>
        </div>

        {/* Filters */}
        <div className="flex w-full self-start rounded-xl bg-slate-100 p-1 sm:w-auto sm:self-auto dark:bg-white/5">
          {(["unread", "read", "all"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium whitespace-nowrap transition-all sm:px-4 ${filter === f ? "bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              {f === "unread" ? "No Leídos" : f === "read" ? "Leídos" : "Todos"}
            </button>
          ))}
        </div>
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-md dark:border-white/10 dark:bg-white/5">
        <div className="custom-scrollbar h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="border-primary/20 border-t-primary mb-4 h-10 w-10 animate-spin rounded-full border-4"></div>
              <p className="text-slate-500">Cargando mensajes...</p>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 dark:bg-transparent">
                <Icon name="mark_email_read" size={32} />
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                ¡Bandeja vacía!
              </h3>
              <p className="text-slate-500">
                No tienes{" "}
                {filter === "unread"
                  ? "mensajes nuevos"
                  : filter === "read"
                    ? "mensajes leídos"
                    : "mensajes"}{" "}
                en este momento.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {messages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  onClick={() => handleSelectMessage(message)}
                  onDelete={deleteMessage}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <MessageDetailModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          onDelete={deleteMessage}
        />
      )}
    </div>
  );
}

interface MessageDetailModalProps {
  message: Message;
  onClose: () => void;
  onDelete: (id: string) => void;
}

function MessageDetailModal({
  message,
  onClose,
  onDelete,
}: MessageDetailModalProps) {
  useBodyScrollLock(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="button"
      tabIndex={-1}
      aria-label="Cerrar mensaje"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px] sm:bg-black/20"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="message-detail-title"
        className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
      >
        <FocusLock returnFocus className="flex w-full flex-col">
          <div className="flex items-center justify-between border-b border-slate-100 p-6 dark:border-white/5">
            <h2
              id="message-detail-title"
              className="flex items-center gap-2 text-xl font-bold text-slate-900 dark:text-white"
            >
              <Icon name="mail" className="text-primary" />
              {message.subject || "Sin asunto"}
            </h2>
            <button
              onClick={onClose}
              aria-label="Cerrar mensaje"
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <Icon name="close" />
            </button>
          </div>

          <div className="custom-scrollbar max-h-[60vh] flex-1 overflow-y-auto p-6">
            <div className="mb-6 flex items-start justify-between border-b border-slate-100 pb-4 dark:border-white/5">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {message.name}
                </h3>
                <a
                  href={`mailto:${message.email}`}
                  className="text-primary text-sm hover:underline"
                >
                  {message.email}
                </a>
              </div>
              <span className="text-sm whitespace-nowrap text-slate-500">
                {new Date(message.created_at).toLocaleString("es-ES", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </span>
            </div>
            <div className="leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">
              {message.message}
            </div>
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5">
            <button
              onClick={() => {
                onDelete(message.id);
                onClose();
              }}
              className="flex items-center gap-2 rounded-xl px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Icon name="delete" size={18} />
              Eliminar
            </button>
          </div>
        </FocusLock>
      </div>
    </div>
  );
}
