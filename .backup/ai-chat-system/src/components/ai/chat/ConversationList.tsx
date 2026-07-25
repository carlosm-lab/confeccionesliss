"use client";

import React from "react";
import { Icon } from "@/components/ui/icons/Icon";
import { useChat } from "@/context/ChatContext";
import { cn } from "@/lib/utils";

export function ConversationList() {
  const {
    conversations,
    activeConversationId,
    selectConversation,
    startNewConversation,
  } = useChat();

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffDays = Math.floor(
        (now.getTime() - date.getTime()) / (1000 * 3600 * 24)
      );

      if (diffDays === 0) {
        return date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
      }
      if (diffDays === 1) return "Ayer";
      if (diffDays < 7) return `${diffDays} días`;
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    } catch {
      return "";
    }
  };

  return (
    <div className="flex h-full w-full flex-col bg-slate-50/50 dark:bg-slate-900/50">
      {/* Upper header */}
      <div className="flex items-center justify-between border-b border-gray-100 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
        <div>
          <h4 className="font-serif text-base font-bold text-slate-900 dark:text-slate-100">
            Historial de chats
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Tus consultas guardadas
          </p>
        </div>

        <button
          onClick={() => startNewConversation()}
          className="bg-primary/10 text-primary hover:bg-primary/20 flex cursor-pointer items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all"
        >
          <Icon name="add" size={16} />
          <span>Nueva consulta</span>
        </button>
      </div>

      {/* Conversations scroll area */}
      <div className="flex-1 space-y-2 overflow-y-auto p-3">
        {conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center text-slate-400">
            <Icon
              name="chat_bubble_outline"
              size={36}
              className="mb-2 text-gray-300"
            />
            <p className="text-sm font-medium">
              No tienes consultas guardadas.
            </p>
            <button
              onClick={() => startNewConversation()}
              className="bg-primary text-on-primary mt-4 cursor-pointer rounded-full px-6 py-2 text-xs font-bold shadow-md hover:opacity-90"
            >
              Iniciar primera consulta
            </button>
          </div>
        ) : (
          conversations.map((conv) => {
            const isActive = conv.id === activeConversationId;
            return (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl border p-3.5 text-left transition-all",
                  isActive
                    ? "border-primary/40 ring-primary/20 bg-white shadow-sm ring-1 dark:bg-slate-800"
                    : "border-transparent bg-white/60 hover:border-gray-200 hover:bg-white dark:bg-slate-800/40 dark:hover:border-slate-700 dark:hover:bg-slate-800"
                )}
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                      {conv.title || "Consulta de Soporte"}
                    </span>
                    <span className="flex shrink-0 items-center gap-1 text-[10px] text-slate-400">
                      <Icon name="schedule" size={12} />
                      {formatDate(conv.updated_at)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                    <span className="capitalize">
                      {conv.status === "closed" ? "Finalizada" : "Activa"}
                    </span>
                    {isActive && (
                      <Icon
                        name="chevron_right"
                        size={16}
                        className="text-primary"
                      />
                    )}
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
