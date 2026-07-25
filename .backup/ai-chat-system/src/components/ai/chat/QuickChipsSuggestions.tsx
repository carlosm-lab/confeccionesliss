"use client";

import React from "react";
import { Icon } from "@/components/ui/icons/Icon";

interface QuickChipsProps {
  onSelectChip: (question: string) => void;
}

const SUGGESTED_QUESTIONS = [
  "¿Cuáles son los precios de los scrubs?",
  "¿Hacen envíos a todo El Salvador?",
  "¿Cuáles son las políticas de garantía?",
  "¿Cómo puedo solicitar una cotización?",
  "¿Tienen uniformes para UNIVO e IEPROES?",
  "¿Dónde está ubicado el taller?",
];

export function QuickChipsSuggestions({ onSelectChip }: QuickChipsProps) {
  return (
    <div className="w-full px-3 py-2">
      <div className="text-primary mb-2 flex items-center gap-1.5 text-xs font-semibold">
        <Icon name="auto_awesome" size={14} />
        <span>Preguntas sugeridas</span>
      </div>
      <div className="no-scrollbar flex w-full gap-2 overflow-x-auto scroll-smooth pt-0.5 pb-2">
        {SUGGESTED_QUESTIONS.map((question, index) => (
          <button
            key={index}
            onClick={() => onSelectChip(question)}
            className="border-primary/20 bg-primary/5 hover:bg-primary/10 dark:bg-primary/20 dark:border-primary/30 dark:hover:bg-primary/30 shrink-0 cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium text-slate-800 shadow-2xs transition-all duration-150 hover:scale-[1.02] active:scale-[0.98] dark:text-slate-200"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
