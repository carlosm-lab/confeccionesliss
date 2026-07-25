"use client";

import React from "react";
import { Icon } from "@/components/ui/icons/Icon";
import { useChat } from "@/context/ChatContext";
import { AvatarLucas } from "./AvatarLucas";
import { cn } from "@/lib/utils";

export function ChatTriggerButton() {
  const { toggleChat, isOpen, unreadCount } = useChat();

  return (
    <div
      style={{ zIndex: 99998 }}
      className="pointer-events-auto fixed right-4 bottom-20 isolate flex items-center justify-center sm:right-6 sm:bottom-6"
    >
      <button
        onClick={toggleChat}
        className={cn(
          "group bg-primary text-on-primary ring-primary/30 relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full shadow-2xl ring-4 transition-all duration-300 hover:scale-105 hover:opacity-90 active:scale-95",
          isOpen && "rotate-90 bg-slate-800 ring-slate-700/50"
        )}
        aria-label="Abrir chat de asistencia y soporte"
      >
        {!isOpen && (
          <span className="bg-primary/50 absolute -inset-0.5 animate-pulse rounded-full opacity-50 blur-xs transition group-hover:opacity-80" />
        )}

        <div className="relative flex items-center justify-center">
          {isOpen ? (
            <Icon name="close" size={24} className="text-white" />
          ) : (
            <AvatarLucas size="md" showOnlineStatus />
          )}
        </div>

        {unreadCount > 0 && !isOpen && (
          <span className="bg-tertiary absolute -top-1 -right-1 flex h-5 w-5 animate-bounce items-center justify-center rounded-full text-[10px] font-bold text-white shadow-md">
            {unreadCount}
          </span>
        )}
      </button>
    </div>
  );
}
