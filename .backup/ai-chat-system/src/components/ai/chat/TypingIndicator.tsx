"use client";

import React from "react";
import { AvatarLucas } from "./AvatarLucas";

export function TypingIndicator() {
  return (
    <div className="animate-fadeIn flex w-full items-center gap-2.5 px-3 py-1.5">
      <AvatarLucas size="sm" showOnlineStatus={false} />
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs border border-slate-200 bg-slate-100 px-4 py-3 shadow-xs dark:border-slate-700 dark:bg-slate-800">
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]" />
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]" />
        <span className="bg-primary h-2 w-2 animate-bounce rounded-full" />
        <span className="ml-1 text-xs font-medium text-slate-500 dark:text-slate-400">
          Lucas está escribiendo...
        </span>
      </div>
    </div>
  );
}
