"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ALL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import type { Sector } from "@/data/types";

/* ─── Sector order for category chips ─── */
const SECTOR_ORDER: Sector[] = [
  "scrubs",
  "universitario",
  "escolar",
  "corporativo",
  "deportivo",
  "accesorios",
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* ── Lock body scroll + auto-focus + reset query ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
      const timer = setTimeout(() => inputRef.current?.focus(), 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }
    document.body.style.overflow = "";
  }, [isOpen]);

  /* ── Escape to close ── */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  /* ── Close on backdrop click ── */
  const handleBackdropMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === backdropRef.current) onClose();
    },
    [onClose]
  );

  /* ── Search logic ── */
  const allMatches = useMemo(() => {
    if (query.length < 2) return [];
    const q = query.toLowerCase().trim();
    return ALL_PRODUCTS.filter((p) => {
      const searchables = [
        p.nombre,
        p.sector,
        p.tipo,
        p.categoria,
        p.descripcionCorta ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return searchables.includes(q);
    });
  }, [query]);

  const visibleResults = allMatches.slice(0, 6);
  const hasMoreResults = allMatches.length > 6;
  const isSearching = query.length >= 2;
  const noResults = isSearching && allMatches.length === 0;

  /* ── Navigation handlers ── */
  const navigateToProduct = useCallback(
    (sector: string, id: string) => {
      onClose();
      router.push(`/catalogo/${sector}/${id}`);
    },
    [onClose, router]
  );

  const navigateToAllResults = useCallback(() => {
    onClose();
    router.push(`/catalogo?query=${encodeURIComponent(query.trim())}`);
  }, [onClose, router, query]);

  const handleChipClick = useCallback((label: string) => {
    setQuery(label);
  }, []);

  if (!isOpen) return null;

  return (
    /* Backdrop — uses onMouseDown on the ref'd div to avoid a11y issues with role="dialog" */
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[999] flex items-start justify-center bg-black/50 pt-[8vh] backdrop-blur-sm sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
      onMouseDown={handleBackdropMouseDown}
    >
      <div className="mx-4 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* ── Search Input Header ── */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <span
            className="material-symbols-outlined text-primary shrink-0 text-[22px]"
            aria-hidden="true"
          >
            search
          </span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="¿Qué estás buscando?"
            className="min-w-0 flex-1 text-base text-gray-800 outline-none placeholder:text-gray-400"
            aria-label="Buscar productos, categorías o servicios"
          />
          <button
            onClick={onClose}
            className="text-primary/60 hover:bg-primary/5 flex size-8 shrink-0 items-center justify-center rounded-full transition-colors"
            aria-label="Cerrar buscador"
          >
            <span
              className="material-symbols-outlined text-xl"
              aria-hidden="true"
            >
              close
            </span>
          </button>
        </div>

        {/* ── Body ── */}
        <div className="max-h-[60vh] overflow-y-auto px-5 py-4">
          {/* State: Idle — show category chips */}
          {!isSearching && (
            <div>
              <p className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
                Explorar categorías
              </p>
              <div className="flex flex-wrap gap-2">
                {SECTOR_ORDER.map((sector) => {
                  const config = CATEGORIES[sector];
                  return (
                    <button
                      key={sector}
                      onClick={() => handleChipClick(config.subtitle)}
                      className="border-primary/15 text-primary hover:bg-primary hover:text-on-primary flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors"
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        aria-hidden="true"
                      >
                        {config.icon}
                      </span>
                      {config.subtitle}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* State: No results */}
          {noResults && (
            <div className="flex flex-col items-center py-10 text-center">
              <span
                className="material-symbols-outlined mb-3 text-5xl text-gray-300"
                aria-hidden="true"
              >
                search_off
              </span>
              <p className="text-sm font-semibold text-gray-600">
                No encontramos resultados para &quot;{query}&quot;
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Prueba con otro término como &quot;scrub&quot;,
                &quot;UNIVO&quot; o &quot;bordados&quot;.
              </p>
            </div>
          )}

          {/* State: Results */}
          {isSearching && allMatches.length > 0 && (
            <div>
              {/* Results header */}
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  {allMatches.length}{" "}
                  {allMatches.length === 1 ? "resultado" : "resultados"}
                </p>
                {hasMoreResults && (
                  <button
                    onClick={navigateToAllResults}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs font-semibold transition-colors"
                  >
                    Ver todos los resultados
                    <span
                      className="material-symbols-outlined text-sm"
                      aria-hidden="true"
                    >
                      arrow_forward
                    </span>
                  </button>
                )}
              </div>

              {/* Results grid */}
              <div className="space-y-2">
                {visibleResults.map((product) => (
                  <button
                    key={product.id}
                    onClick={() =>
                      navigateToProduct(product.sector, product.id)
                    }
                    className="group flex w-full items-center gap-3.5 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-gray-50"
                  >
                    {/* Thumbnail */}
                    <div className="bg-surface-container-low relative size-14 shrink-0 overflow-hidden rounded-lg">
                      {product.imagen ? (
                        <Image
                          src={product.imagen}
                          alt={product.nombre}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <span
                            className="material-symbols-outlined text-2xl text-gray-300"
                            aria-hidden="true"
                          >
                            image
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="min-w-0 flex-1">
                      <p className="text-on-surface truncate text-sm font-semibold">
                        {product.nombre}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-gray-500">
                        {product.categoria} ·{" "}
                        {CATEGORIES[product.sector as Sector]?.subtitle ??
                          product.sector}
                      </p>
                      <p className="text-primary mt-0.5 text-sm font-bold">
                        ${product.precio.toFixed(2)}
                      </p>
                    </div>

                    {/* Arrow */}
                    <span
                      className="material-symbols-outlined shrink-0 text-lg text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-gray-500"
                      aria-hidden="true"
                    >
                      arrow_forward_ios
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Footer shortcut hint ── */}
        <div className="border-t border-gray-100 px-5 py-2.5 text-center text-[11px] text-gray-400">
          <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px]">
            Esc
          </kbd>{" "}
          para cerrar
        </div>
      </div>
    </div>
  );
}
