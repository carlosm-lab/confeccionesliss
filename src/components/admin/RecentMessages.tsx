"use client";

import { Icon } from "@/components/ui/icons/Icon";
import Link from "next/link";

interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

interface RecentMessagesProps {
  messages: Message[];
  loading: boolean;
}

export default function RecentMessages({
  messages,
  loading,
}: RecentMessagesProps) {
  if (loading) {
    return (
      <div className="border-primary/30 dark:border-primary/20 h-full rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Mensajes Recientes
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex animate-pulse flex-col gap-2 rounded-xl border border-slate-100 p-3 dark:border-white/5"
            >
              <div className="mb-1 flex h-4 w-full items-center justify-between rounded bg-slate-200 dark:bg-white/10"></div>
              <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-white/10"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-primary/30 dark:border-primary/20 flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Mensajes Recientes
        </h3>
        <Link
          href="/admin/messages"
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          Ver todos
        </Link>
      </div>

      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center p-6 text-center">
          <div className="flex flex-col items-center text-slate-400 dark:text-slate-500">
            <Icon
              name="mark_email_read"
              size={36}
              className="mb-2 opacity-50"
            />
            <p className="text-sm">No hay mensajes nuevos.</p>
          </div>
        </div>
      ) : (
        <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto px-1">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50 dark:border-white/5 dark:hover:bg-white/5"
            >
              <div className="mb-1 flex justify-between gap-2">
                <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                  {msg.name}
                </p>
                <span className="shrink-0 text-[10px] whitespace-nowrap text-slate-400">
                  {new Date(msg.created_at).toLocaleDateString("es-SV", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                {msg.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
