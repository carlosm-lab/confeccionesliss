"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [text]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || disabled) return;
    onSend(text.trim());
    setText("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-end gap-2 border-t border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje aquí..."
          rows={1}
          disabled={disabled}
          className="focus:border-primary focus:ring-primary/20 max-h-30 w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 transition-all duration-150 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:outline-none disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800/90 dark:text-slate-100 dark:focus:bg-slate-800"
        />
      </div>

      <button
        type="submit"
        disabled={!text.trim() || disabled}
        className={cn(
          "bg-primary text-on-primary flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl shadow-sm transition-all duration-150 hover:opacity-90 active:scale-95 disabled:opacity-40",
          !text.trim() && "cursor-not-allowed"
        )}
        aria-label="Enviar mensaje"
      >
        {disabled ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Send className="ml-0.5 h-4 w-4" />
        )}
      </button>
    </form>
  );
}
