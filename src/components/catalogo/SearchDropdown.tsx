"use client";

import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import type { Sector } from "@/data/types";
import { cn } from "@/lib/utils";

/* ─── Sector display labels ─── */
const SECTOR_LABELS: Record<Sector, string> = {
  scrubs: "Scrubs",
  universitario: "Universitario",
  escolar: "Escolar",
  corporativo: "Corporativo",
  deportivo: "Deportivo",
  accesorios: "Accesorios",
  lenceria: "Lencería",
  sublimacion: "Sublimación",
  "ropa-calzado": "Ropa y Calzado",
  tops: "Crop Tops y Tops",
  limpiapipas: "Limpiapipas",
};

const SECTORS_LIST: Sector[] = [
  "scrubs",
  "universitario",
  "escolar",
  "corporativo",
  "deportivo",
  "accesorios",
  "lenceria",
  "sublimacion",
  "ropa-calzado",
  "tops",
  "limpiapipas",
];

interface SearchDropdownProps {
  query: string;
  isOpen: boolean;
  onClose: () => void;
  activeIndex: number;
}

interface CategoryMatch {
  type: "category";
  sector: Sector;
  label: string;
  icon: string;
  tagline: string;
}

interface ProductMatch {
  type: "product";
  id: string;
  nombre: string;
  categoria: string;
  sector: Sector;
  precio: number;
  imagen: string | null;
  catalogSlug?: string;
}

type SearchResult = CategoryMatch | ProductMatch;

function searchItems(query: string): SearchResult[] {
  if (query.length < 2) return [];

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  // 1. Search categories
  for (const sector of SECTORS_LIST) {
    const config = CATEGORIES[sector];
    const searchables = [
      config.subtitle.toLowerCase(),
      config.title.toLowerCase(),
      config.description.toLowerCase(),
      config.hubTagline.toLowerCase(),
      sector.toLowerCase(),
    ].join(" ");

    if (searchables.includes(q)) {
      results.push({
        type: "category",
        sector,
        label: config.subtitle,
        icon: config.icon,
        tagline: config.hubTagline,
      });
    }
  }

  // Limit categories to 2
  const categoryResults = results.slice(0, 2);

  // 2. Search products
  const productMatches: ProductMatch[] = [];
  for (const p of ALL_PRODUCTS) {
    const searchables = [
      p.nombre.toLowerCase(),
      p.categoria.toLowerCase(),
      p.tipo.toLowerCase(),
      p.sector.toLowerCase(),
      (p.descripcionCorta ?? "").toLowerCase(),
    ].join(" ");

    if (searchables.includes(q)) {
      productMatches.push({
        type: "product",
        id: p.id,
        nombre: p.nombre,
        categoria: p.categoria,
        sector: p.sector,
        precio: p.precio,
        imagen: p.imagen,
        catalogSlug: p.subPageSlug,
      });
    }
  }

  // Limit products to 5
  return [...categoryResults, ...productMatches.slice(0, 5)];
}

export function SearchDropdown({
  query,
  isOpen,
  onClose,
  activeIndex,
}: SearchDropdownProps) {
  const results = useMemo(() => searchItems(query), [query]);

  if (!isOpen || results.length === 0) return null;

  const categoryResults = results.filter(
    (r): r is CategoryMatch => r.type === "category"
  );
  const productResults = results.filter(
    (r): r is ProductMatch => r.type === "product"
  );

  let itemIndex = -1;

  return (
    <div
      className="absolute top-full right-0 left-0 z-[100] mt-2 max-h-[70vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl"
      role="listbox"
      id="search-results-listbox"
      aria-label="Resultados de búsqueda"
    >
      {/* Category results */}
      {categoryResults.length > 0 && (
        <div className="border-b border-gray-100 px-3 py-2">
          <p className="mb-1.5 px-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            Categorías
          </p>
          {categoryResults.map((cat) => {
            itemIndex++;
            const currentIndex = itemIndex;
            return (
              <Link
                key={cat.sector}
                href={`/catalogo/${cat.sector}`}
                onClick={onClose}
                id={`search-result-${currentIndex}`}
                role="option"
                aria-selected={activeIndex === currentIndex}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors",
                  activeIndex === currentIndex
                    ? "bg-primary/10"
                    : "hover:bg-gray-50"
                )}
              >
                <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-on-surface text-sm font-semibold">
                    {cat.label}
                  </p>
                  <p className="truncate text-xs text-gray-500">
                    {cat.tagline}
                  </p>
                </div>
                <span
                  className="material-symbols-outlined text-sm text-gray-400"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Product results */}
      {productResults.length > 0 && (
        <div className="px-3 py-2">
          <p className="mb-1.5 px-1 text-[10px] font-semibold tracking-widest text-gray-400 uppercase">
            Productos
          </p>
          {productResults.map((product) => {
            itemIndex++;
            const currentIndex = itemIndex;
            return (
              <Link
                key={product.id}
                href={`/catalogo/${product.catalogSlug || product.sector}/${product.id}`}
                onClick={onClose}
                id={`search-result-${currentIndex}`}
                role="option"
                aria-selected={activeIndex === currentIndex}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-2 py-2.5 transition-colors",
                  activeIndex === currentIndex
                    ? "bg-primary/10"
                    : "hover:bg-gray-50"
                )}
              >
                {/* Product image */}
                <div className="bg-surface-container-low relative size-10 shrink-0 overflow-hidden rounded-lg">
                  {product.imagen ? (
                    <Image
                      src={product.imagen}
                      alt={product.nombre}
                      fill
                      sizes="40px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span
                        className="material-symbols-outlined text-lg text-gray-400"
                        aria-hidden="true"
                      >
                        image
                      </span>
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-on-surface truncate text-sm font-medium">
                    {product.nombre}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.categoria} ·{" "}
                    {SECTOR_LABELS[product.sector] ?? product.sector}
                  </p>
                </div>
                <span className="text-primary shrink-0 text-sm font-bold">
                  ${product.precio.toFixed(2)}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Footer hint */}
      <div className="border-t border-gray-100 px-4 py-2.5 text-center text-xs text-gray-400">
        <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px]">
          Enter
        </kbd>{" "}
        para buscar todo ·{" "}
        <kbd className="rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 font-mono text-[10px]">
          Esc
        </kbd>{" "}
        para cerrar
      </div>
    </div>
  );
}
