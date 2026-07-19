"use client";
import { useEffect } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: "danger" | "warning" | "info";
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  type,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useBodyScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const confirmBtnClass =
    type === "danger"
      ? "bg-red-600 hover:bg-red-700 text-white"
      : type === "warning"
        ? "bg-amber-500 hover:bg-amber-600 text-white"
        : "bg-primary hover:bg-primary/90 text-white";

  return (
    <div
      role="button"
      tabIndex={-1}
      aria-label="Cancelar"
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px] sm:bg-black/20"
      onClick={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
      onKeyDown={(e) => e.key === "Escape" && onCancel()}
    >
      <div
        className="flex w-full max-w-md flex-col gap-4 rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
              type === "danger"
                ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                : type === "warning"
                  ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                  : "bg-primary/10 text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">
              {type === "danger"
                ? "warning"
                : type === "warning"
                  ? "info"
                  : "help"}
            </span>
          </div>
          <h2
            id="confirm-title"
            className="text-lg font-bold text-slate-900 dark:text-white"
          >
            {title}
          </h2>
        </div>

        <p
          id="confirm-message"
          className="text-sm leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {message}
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onCancel}
            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-sm font-bold transition-colors ${confirmBtnClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
