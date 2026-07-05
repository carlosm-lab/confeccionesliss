"use client";
// ─────────────────────────────────────────────────────────────────────────────
// CustomSelect — Premium dropdown to replace native <select> elements.
//
// Design decisions:
//  - CSS-only animation (scale + opacity) — no Framer Motion, keeps admin fast
//  - Full ARIA: role=combobox, aria-expanded, role=listbox, aria-selected
//  - Close on click-outside (mousedown) and Escape key
//  - Selected item is highlighted with bg-primary/10 + a filled check icon
//  - Chevron rotates 180° when open
//  - leadingIcon prop: Material Symbol shown in the trigger (for filter bars)
//  - Works in dark mode
// ─────────────────────────────────────────────────────────────────────────────
import { useState, useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SelectOption {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  /**
   * Material Symbol name shown to the left of the trigger label.
   * Use for filter bars (e.g. "layers", "filter_list").
   * When omitted, no leading icon is rendered.
   */
  leadingIcon?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────

export function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Seleccionar...",
  disabled = false,
  id,
  className,
  leadingIcon,
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const fallbackId = useId();
  const selectId = id ?? fallbackId;

  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  // ── Close on outside click ────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  // ── Close on Escape ───────────────────────────────────────────────────────
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen]);

  const handleSelect = (optValue: string) => {
    onChange(optValue);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* ── Trigger ──────────────────────────────────────────────────────── */}
      <button
        id={selectId}
        type="button"
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${selectId}-listbox`}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen((p) => !p)}
        className={cn(
          // base layout
          "relative flex w-full cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-left text-sm transition-all duration-150 outline-none select-none",
          // colors
          "border-slate-200 bg-white dark:border-white/10 dark:bg-white/5",
          // open ring
          isOpen && "border-primary ring-primary/20 ring-2",
          // hover (only when closed and not disabled)
          !isOpen &&
            !disabled &&
            "hover:border-slate-300 dark:hover:border-white/20",
          // disabled
          disabled && "cursor-not-allowed opacity-50",
          // text
          selectedOption
            ? "text-slate-900 dark:text-white"
            : "text-slate-400 dark:text-slate-500"
        )}
      >
        {leadingIcon && (
          <span className="material-symbols-outlined shrink-0 text-[20px] leading-none text-slate-400">
            {leadingIcon}
          </span>
        )}

        <span className="flex-1 truncate">
          {selectedOption?.label ?? placeholder}
        </span>

        <span
          className={cn(
            "material-symbols-outlined shrink-0 text-[20px] leading-none text-slate-400 transition-transform duration-200",
            isOpen && "-rotate-180"
          )}
        >
          expand_more
        </span>
      </button>

      {/* ── Dropdown panel ───────────────────────────────────────────────── */}
      <div
        id={`${selectId}-listbox`}
        role="listbox"
        style={{
          transformOrigin: "top center",
          transition: "opacity 130ms ease, transform 130ms ease",
          opacity: isOpen ? 1 : 0,
          transform: isOpen
            ? "scaleY(1) translateY(0)"
            : "scaleY(0.92) translateY(-6px)",
          pointerEvents: isOpen ? "auto" : "none",
        }}
        className="absolute right-0 left-0 z-[60] mt-1.5 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_30px_-4px_rgba(0,0,0,0.16),0_2px_8px_-2px_rgba(0,0,0,0.08)] dark:border-white/10 dark:bg-slate-800"
      >
        <div className="elegant-scrollbar max-h-60 overflow-y-auto py-1">
          {options.length === 0 ? (
            <p className="px-4 py-3 text-center text-xs text-slate-400">
              Sin opciones disponibles
            </p>
          ) : (
            options.map((opt, idx) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={`${opt.value}-${idx}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(opt.value)}
                  className={cn(
                    "flex w-full items-center gap-2.5 px-3 py-2.5 text-left text-sm transition-colors",
                    isSelected
                      ? "bg-primary/10 text-primary dark:bg-primary/20 font-semibold"
                      : "text-slate-700 hover:bg-slate-50 dark:text-slate-200 dark:hover:bg-white/5"
                  )}
                >
                  <span className="flex-1">{opt.label}</span>
                  {isSelected && (
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-primary shrink-0 text-[16px] leading-none"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  )}
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
