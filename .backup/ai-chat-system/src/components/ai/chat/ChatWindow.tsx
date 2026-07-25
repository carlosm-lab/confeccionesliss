"use client";

import React, { useRef, useEffect } from "react";
import { useChat } from "@/context/ChatContext";
import { MessageBubble } from "./MessageBubble";
import { TypingIndicator } from "./TypingIndicator";
import { QuickChipsSuggestions } from "./QuickChipsSuggestions";
import { ChatInput } from "./ChatInput";
import { Icon } from "@/components/ui/icons/Icon";

export function ChatWindow() {
  const { messages, isLoading, isTyping, sendMessage } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  return (
    <div className="flex h-full min-h-0 w-full flex-col bg-slate-50/30 dark:bg-slate-900/30">
      {/* Scrollable messages container - min-h-0 y overscroll-contain para scroll fluido en móvil */}
      <div className="min-h-0 flex-1 touch-pan-y space-y-1 overflow-y-auto overscroll-contain p-2.5 sm:p-4">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="bg-primary/10 text-primary mb-3 flex h-12 w-12 items-center justify-center rounded-2xl">
              <Icon name="support_agent" size={28} />
            </div>
            <h4 className="font-serif text-base font-bold text-slate-800 dark:text-slate-200">
              Centro de Asistencia y Soporte
            </h4>
            <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              Iniciando chat con Lucas... Puedes realizar cualquier pregunta
              sobre uniformes o servicios.
            </p>
          </div>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
        )}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested chips if conversation is starting */}
      {messages.length < 3 && !isLoading && (
        <QuickChipsSuggestions onSelectChip={(q) => sendMessage(q)} />
      )}

      {/* Message input */}
      <ChatInput onSend={(text) => sendMessage(text)} disabled={isLoading} />
    </div>
  );
}
