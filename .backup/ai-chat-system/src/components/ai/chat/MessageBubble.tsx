"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { AvatarLucas } from "./AvatarLucas";
import type { ChatMessage } from "@/context/ChatContext";
import { Check, CheckCheck } from "lucide-react";

interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="my-3 flex justify-center px-4">
        <div className="max-w-xs rounded-full border border-slate-200 bg-slate-100 px-3.5 py-1.5 text-center text-xs font-medium text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
          {message.content}
        </div>
      </div>
    );
  }

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "";
    }
  };

  return (
    <div
      className={cn(
        "group flex w-full gap-2.5 px-3 py-1.5 transition-all duration-200",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isUser && <AvatarLucas size="sm" className="mt-1" />}

      <div
        className={cn(
          "relative max-w-[82%] rounded-2xl px-4 py-2.5 text-sm shadow-xs transition-all duration-150 sm:max-w-[75%]",
          isUser
            ? "bg-primary text-on-primary rounded-tr-xs font-sans"
            : "rounded-tl-xs border border-slate-200 bg-slate-100 text-slate-900 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
        )}
      >
        <div className="font-sans leading-relaxed break-words whitespace-pre-wrap">
          {message.content || (
            <span className="italic opacity-60">Escribiendo respuesta...</span>
          )}
        </div>

        <div
          className={cn(
            "mt-1.5 flex items-center justify-end gap-1 text-[10px]",
            isUser ? "text-slate-200" : "text-slate-400 dark:text-slate-400"
          )}
        >
          <span>{formatTime(message.created_at)}</span>

          {isUser && (
            <span
              className="ml-0.5 inline-flex items-center"
              title={`Estado: ${message.status}`}
            >
              {message.status === "sent" && (
                <Check className="h-3 w-3 text-slate-300" />
              )}
              {message.status === "delivered" && (
                <CheckCheck className="h-3 w-3 text-slate-300" />
              )}
              {message.status === "read" && (
                <CheckCheck className="h-3 w-3 font-bold text-sky-300" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
