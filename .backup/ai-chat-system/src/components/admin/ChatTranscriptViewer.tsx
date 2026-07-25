"use client";

import React, { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { AvatarLucas } from "@/components/ai/chat/AvatarLucas";
import { User, Calendar, Clock, MessageSquare, Loader2 } from "lucide-react";

interface ChatTranscriptViewerProps {
  conversationId: string;
}

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: string;
}

export function ChatTranscriptViewer({
  conversationId,
}: ChatTranscriptViewerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = getSupabaseClient();

  useEffect(() => {
    async function loadTranscript() {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true });

        if (!error && data) {
          setMessages(data as Message[]);
        }
      } catch (err) {
        console.error("[ChatTranscriptViewer] Error loading transcript:", err);
      } finally {
        setLoading(false);
      }
    }

    if (conversationId) {
      loadTranscript();
    }
  }, [conversationId, supabase]);

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-slate-400">
        <Loader2 className="h-6 w-6 animate-spin text-[#055e38]" />
        <span className="text-xs">Cargando conversación...</span>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center p-6 text-center text-slate-400">
        <MessageSquare className="mb-2 h-8 w-8 opacity-40" />
        <p className="text-sm font-medium">
          No se encontraron mensajes en esta conversación.
        </p>
      </div>
    );
  }

  return (
    <div className="flex max-h-[500px] flex-col gap-3 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={msg.id}
            className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
          >
            {isUser ? (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-xs font-bold text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                <User className="h-4 w-4" />
              </div>
            ) : (
              <AvatarLucas size="sm" />
            )}

            <div
              className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm shadow-xs ${
                isUser
                  ? "rounded-tr-xs bg-[#055e38] text-white"
                  : "rounded-tl-xs border border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              }`}
            >
              <div className="leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
              <div
                className={`mt-1 text-right text-[10px] ${
                  isUser ? "text-emerald-100/70" : "text-slate-400"
                }`}
              >
                {new Date(msg.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
