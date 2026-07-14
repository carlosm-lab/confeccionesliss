"use client";

import { useState, useEffect, useRef, useMemo, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import type { Sector } from "@/data/types";
import { siteConfig } from "@/config/site";
import { getSupabaseClient } from "@/lib/supabaseClient";
import {
  getProductMainImage,
  getProductSector,
  getProductUrl,
  type DbProduct,
} from "@/lib/productShared";

/* ─── Typewriter placeholder ─── */
const SEARCH_PHRASES = [
  "Scrubs médicos...",
  "Uniformes UNIVO...",
  "Bordados personalizados...",
  "Uniformes escolares...",
  "Sublimación deportiva...",
  "Confección a la medida...",
  "Pantalones de vestir...",
];

function TypewriterPlaceholder() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const i = loopNum % SEARCH_PHRASES.length;
    const fullText = SEARCH_PHRASES[i];
    const handleType = () => {
      setText((cur) =>
        isDeleting
          ? fullText.substring(0, cur.length - 1)
          : fullText.substring(0, cur.length + 1)
      );
      setTypingSpeed(isDeleting ? 30 : 60);
      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((p) => p + 1);
        setTypingSpeed(500);
      }
    };
    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, mounted]);

  return (
    <div
      className="pointer-events-none flex min-w-0 items-center overflow-hidden text-base whitespace-nowrap text-gray-400"
      aria-hidden="true"
    >
      <span className="truncate">
        {mounted ? text : "¿Qué estás buscando?"}
      </span>
      {mounted && (
        <span className="bg-primary animate-blink ml-[2px] inline-block h-[20px] w-[1.5px] shrink-0" />
      )}
    </div>
  );
}

/* ─── Sector order ─── */
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
  const [isFocused, setIsFocused] = useState(false);
  const [results, setResults] = useState<DbProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, startTransition] = useTransition();
  const router = useRouter();

  /* ── Lock body scroll + reset query (sin auto-focus: el teclado abre solo cuando el usuario toca el input) ── */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const resetTimer = setTimeout(() => {
        setQuery("");
        setResults([]);
      }, 0);
      return () => {
        clearTimeout(resetTimer);
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

  /* ── Close on backdrop click handled by button below ── */

  /* ── Debounced search against Supabase ── */
  useEffect(() => {
    if (query.length < 2) {
      // No setState directly — use a dedicated cleanup path
      const timer = setTimeout(() => {
        setResults([]);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      startTransition(() => {
        setIsLoading(true);
        const supabase = getSupabaseClient();
        supabase
          .from("products")
          .select(
            `id, name, description, short_description, price, old_price,
             image_path, images, slug, sector, category,
             categories(name, catalog)`
          )
          .eq("is_active", true)
          .ilike("name", `%${query}%`)
          .limit(8)
          .then(
            ({
              data,
              error,
            }: {
              data: unknown[] | null;
              error: { message: string } | null;
            }) => {
              if (!error && data) {
                setResults(data as unknown as DbProduct[]);
              }
              setIsLoading(false);
            }
          );
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const visibleResults = useMemo(() => results.slice(0, 6), [results]);
  const hasMoreResults = results.length > 6;
  const isSearching = query.length >= 2;
  const noResults = isSearching && !isLoading && results.length === 0;

  /* ── Navigate to product page ── */
  function navigateToProduct(product: DbProduct) {
    onClose();
    router.push(getProductUrl(product));
  }

  function handleChipClick(sector: Sector) {
    onClose();
    if (sector === "universitario") {
      router.push("/catalogo/universidades");
    } else {
      router.push(`/catalogo/${sector}`);
    }
  }

  // Swipe-up-to-close (mobile) — el modal esta en la parte superior
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  const onDragStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };
  const onDragMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta < 0) setDragY(delta); // solo hacia arriba
  };
  const onDragEnd = () => {
    setIsDragging(false);
    if (dragY < -90) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999] flex items-start justify-center bg-black/30 pt-[8vh] backdrop-blur-[2px] sm:bg-black/20 sm:pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Buscar productos"
    >
      {/* Invisible backdrop button for click-to-close */}
      <button
        type="button"
        className="fixed inset-0 z-0 h-full w-full cursor-default"
        onClick={onClose}
        aria-label="Cerrar buscador"
        tabIndex={-1}
      />
      <div
        className="relative z-10 mx-4 flex w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        style={{
          transform: `translateY(${dragY}px)`,
          transition: isDragging
            ? "none"
            : "transform 0.3s cubic-bezier(0.32,0.72,0,1), opacity 0.3s ease",
          opacity: Math.max(0, 1 + dragY / 200),
        }}
      >
        {/* ── Search Input Header ── */}
        <div className="flex items-center gap-3 border-b border-gray-100 px-5 py-4">
          <span
            className="material-symbols-outlined text-primary shrink-0 text-[22px]"
            aria-hidden="true"
          >
            {isLoading ? "sync" : "search"}
          </span>
          <div className="relative min-w-0 flex-1">
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full text-base text-gray-800 outline-none"
              aria-label="Buscar productos, categorías o servicios"
            />
            {/* Typewriter placeholder — oculto cuando el input tiene foco o hay texto */}
            {query === "" && !isFocused && (
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                <TypewriterPlaceholder />
              </div>
            )}
          </div>
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
                      onClick={() => handleChipClick(sector)}
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

          {/* State: Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-10">
              <span
                className="material-symbols-outlined text-primary animate-spin text-4xl"
                aria-hidden="true"
              >
                progress_activity
              </span>
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
          {isSearching && !isLoading && visibleResults.length > 0 && (
            <div>
              {/* Results header */}
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
                  {results.length}{" "}
                  {results.length === 1 ? "resultado" : "resultados"}
                  {hasMoreResults && " (mostrando 6)"}
                </p>
              </div>

              {/* Results list */}
              <div className="space-y-2">
                {visibleResults.map((product) => {
                  const imagen = getProductMainImage(product);
                  const sector = getProductSector(product);
                  const slug = product.slug ?? product.id;
                  const categoryName =
                    product.categories?.name ?? product.category ?? sector;
                  const price = Number(product.price);

                  return (
                    <button
                      key={product.id}
                      onClick={() => navigateToProduct(product)}
                      className="group flex w-full items-center gap-3.5 rounded-xl px-2 py-2.5 text-left transition-colors hover:bg-gray-50"
                    >
                      {/* Thumbnail */}
                      <div className="bg-surface-container-low relative size-14 shrink-0 overflow-hidden rounded-lg">
                        {imagen ? (
                          <Image
                            src={imagen}
                            alt={product.name}
                            fill
                            sizes="56px"
                            className="object-cover"
                            quality={70}
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
                          {product.name}
                        </p>
                        <p className="mt-0.5 truncate text-xs text-gray-500">
                          {categoryName} ·{" "}
                          {CATEGORIES[sector as Sector]?.subtitle ?? sector}
                        </p>
                        <p className="text-primary mt-0.5 text-sm font-bold">
                          ${price.toFixed(2)}
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
                  );
                })}
              </div>

              {/* See all results */}
              {hasMoreResults && (
                <button
                  onClick={() => {
                    onClose();
                    window.location.href = `/catalogo`;
                  }}
                  className="text-primary mt-3 w-full rounded-xl py-2 text-center text-sm font-semibold hover:bg-gray-50"
                >
                  Ver todos los resultados →
                </button>
              )}
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

        {/* Drag handle — fondo del panel, solo mobile */}
        <div
          className="flex touch-none justify-center py-2 sm:hidden"
          onTouchStart={onDragStart}
          onTouchMove={onDragMove}
          onTouchEnd={onDragEnd}
        >
          <div className="h-1 w-10 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
