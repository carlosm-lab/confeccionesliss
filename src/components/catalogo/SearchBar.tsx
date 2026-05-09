"use client";

import { useState, useEffect, useRef } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Buscar uniformes, scrubs, tallas...",
  resultCount,
}: SearchBarProps) {
  const [localValue, setLocalValue] = useState(value);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  // Sync external value changes
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    setLocalValue(newValue);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, 300);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  return (
    <div className="relative w-full">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
        <span
          className="material-symbols-outlined text-primary text-xl"
          aria-hidden="true"
        >
          search
        </span>
      </div>
      <input
        type="search"
        value={localValue}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="text-on-surface placeholder:text-on-surface-variant/50 focus:ring-primary block w-full rounded-xl border border-gray-200 bg-white py-3.5 pr-12 pl-12 text-sm shadow-sm transition-shadow focus:border-transparent focus:ring-2 focus:outline-none"
        aria-label="Buscar productos"
      />
      {localValue && (
        <button
          type="button"
          onClick={() => handleChange("")}
          className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
          aria-label="Limpiar búsqueda"
        >
          <span
            className="material-symbols-outlined text-lg"
            aria-hidden="true"
          >
            close
          </span>
        </button>
      )}
      {resultCount !== undefined && localValue && (
        <p className="mt-1.5 text-xs text-gray-500" aria-live="polite">
          {resultCount} resultado{resultCount !== 1 ? "s" : ""} encontrado
          {resultCount !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
