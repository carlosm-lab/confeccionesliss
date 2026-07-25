"use client";

import React, { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { ChatTranscriptViewer } from "@/components/admin/ChatTranscriptViewer";
import {
  MessageSquare,
  Calendar,
  User,
  Search,
  RefreshCw,
  ChevronRight,
} from "lucide-react";

interface Conversation {
  id: string;
  user_id: string;
  title: string;
  status: "active" | "closed";
  created_at: string;
  updated_at: string;
  user_email?: string;
}

export default function AdminChatsPage() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const supabase = getSupabaseClient();

  const loadConversations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("chat_conversations")
        .select("*")
        .order("updated_at", { ascending: false });

      if (!error && data) {
        setConversations(data as Conversation[]);
        if (data.length > 0 && !selectedId) {
          setSelectedId(data[0].id);
        }
      }
    } catch (err) {
      console.error("[AdminChatsPage] Error fetching conversations:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConversations();
  }, []);

  const filteredConversations = conversations.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Conversaciones con Lucas AI
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Registro completo de consultas realizadas por clientes en la
            plataforma
          </p>
        </div>

        <button
          onClick={loadConversations}
          className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-2xs transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700/50"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Actualizar</span>
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left panel: Conversation list */}
        <div className="space-y-3 lg:col-span-5">
          <div className="relative">
            <Search className="absolute top-2.5 left-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-2 pr-4 pl-9 text-sm text-slate-900 focus:border-[#055e38] focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="max-h-[600px] space-y-1.5 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 dark:border-slate-800 dark:bg-slate-900">
            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400">
                Cargando historial de chats...
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No hay conversaciones registradas.
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isSelected = conv.id === selectedId;
                return (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedId(conv.id)}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 text-left transition-all ${
                      isSelected
                        ? "border-[#055e38]/40 bg-emerald-50/80 shadow-2xs dark:bg-emerald-950/40"
                        : "border-transparent bg-slate-50/50 hover:bg-slate-100 dark:bg-slate-800/40 dark:hover:bg-slate-800"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                        {conv.title || "Consulta con Lucas"}
                      </h4>
                      <div className="mt-1 flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(conv.created_at).toLocaleDateString([], {
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span
                          className={`font-semibold capitalize ${
                            conv.status === "closed"
                              ? "text-slate-400"
                              : "text-emerald-600 dark:text-emerald-400"
                          }`}
                        >
                          {conv.status === "closed" ? "Cerrado" : "Activo"}
                        </span>
                      </div>
                    </div>
                    <ChevronRight
                      className={`h-4 w-4 shrink-0 transition-transform ${
                        isSelected
                          ? "translate-x-0.5 text-[#055e38]"
                          : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right panel: Transcript viewer */}
        <div className="lg:col-span-7">
          <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="flex items-center gap-2 font-sans text-base font-bold text-slate-900 dark:text-slate-100">
              <MessageSquare className="h-5 w-5 text-[#055e38]" />
              Transcripción detallada
            </h3>

            {selectedId ? (
              <ChatTranscriptViewer conversationId={selectedId} />
            ) : (
              <div className="flex h-64 items-center justify-center text-xs text-slate-400">
                Selecciona una conversación a la izquierda para ver su detalle.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
