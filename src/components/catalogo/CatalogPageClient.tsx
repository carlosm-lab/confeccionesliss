"use client";

/**
 * CatalogPageClient — Confecciones Liss
 * Layout de catálogo pixel-fiel al TechCatalogPage de Padilla Store:
 * - Sidebar sticky desktop con FilterSidebar
 * - H1 + barra superior de ordenamiento
 * - Grid responsive 2→3→4 columnas
 * - Paginación con chevrons
 * - MobileFilterDrawer
 * - Estado vacío elegante
 */

import { useState, useMemo, useRef, useEffect } from "react";
import { ALL_PRODUCTS } from "@/data/products";
import { FilterSidebar, type ActiveFilters } from "./FilterSidebar";
import { MobileFilterDrawer, type SortOption } from "./MobileFilterDrawer";
import { CatalogProductCard } from "./CatalogProductCard";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { CategoryConfig, Product, Sector } from "@/data/types";

const ITEMS_PER_PAGE = 15;

interface CatalogPageClientProps {
  sector: Sector;
  config: CategoryConfig;
}

function applySort(products: Product[], sortBy: SortOption): Product[] {
  const sorted = [...products];
  switch (sortBy) {
    case "price-low":
      return sorted.sort((a, b) => a.precio - b.precio);
    case "price-high":
      return sorted.sort((a, b) => b.precio - a.precio);
    case "newest":
      // Without a date field we just reverse insertion order
      return sorted.reverse();
    case "best-selling":
    default:
      return sorted;
  }
}

export function CatalogPageClient({ sector, config }: CatalogPageClientProps) {
  const [sortBy, setSortBy] = useState<SortOption>("best-selling");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  const [onSaleOnly, setOnSaleOnly] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isMultiSelect, setIsMultiSelect] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleSetIsMultiSelect(multi: boolean) {
    setIsMultiSelect(multi);
    if (!multi) {
      setActiveFilters((prev) => {
        const next = { ...prev };
        for (const [key, val] of Object.entries(next)) {
          if (val && val.length > 1) {
            next[key] = [];
          }
        }
        return next;
      });
    }
  }

  // Base products for this sector
  const sectorProducts = useMemo(
    () => ALL_PRODUCTS.filter((p) => p.sector === sector),
    [sector]
  );

  // Apply filters
  const filteredProducts = useMemo(() => {
    let result = sectorProducts;

    // Filter by active filter groups
    for (const [field, values] of Object.entries(activeFilters)) {
      if (values.length === 0) continue;
      result = result.filter((p) => {
        const productValue = (p as unknown as Record<string, unknown>)[field];
        if (Array.isArray(productValue)) {
          // e.g. tallas: ["S", "M", "L"]
          return values.some((v) =>
            (productValue as unknown[]).some(
              (pv) =>
                String(pv) === v ||
                (typeof pv === "object" &&
                  pv !== null &&
                  "value" in pv &&
                  (pv as { value: string }).value === v)
            )
          );
        }
        return values.includes(String(productValue ?? ""));
      });
    }

    // Filter on-sale
    if (onSaleOnly) {
      result = result.filter(
        (p) => p.precioAnterior != null && p.precioAnterior > p.precio
      );
    }

    return applySort(result, sortBy);
  }, [sectorProducts, activeFilters, onSaleOnly, sortBy]);

  const totalCount = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / ITEMS_PER_PAGE));

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Filter helpers
  function handleFilterToggle(field: string, value: string) {
    setActiveFilters((prev) => {
      if (value === "all") {
        return { ...prev, [field]: [] };
      }
      const current = prev[field] ?? [];
      const next = isMultiSelect
        ? current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value]
        : current.includes(value)
          ? []
          : [value];
      return { ...prev, [field]: next };
    });
    setCurrentPage(1);
  }

  function handleClearFilters() {
    setActiveFilters({});
    setOnSaleOnly(false);
    setCurrentPage(1);
  }

  const hasActiveFilters = useMemo(() => {
    const hasGroupFilters = Object.values(activeFilters).some(
      (v) => v.length > 0
    );
    return hasGroupFilters || onSaleOnly;
  }, [activeFilters, onSaleOnly]);

  const activeFilterCount = useMemo(() => {
    const groupCount = Object.values(activeFilters).reduce(
      (acc, v) => acc + v.length,
      0
    );
    return groupCount + (onSaleOnly ? 1 : 0);
  }, [activeFilters, onSaleOnly]);

  function goToPage(page: number) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Pagination: show first, last, and ±1 from current page
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  ).filter(
    (page) =>
      page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1
  );

  const rangeStart =
    totalCount === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const rangeEnd = Math.min(currentPage * ITEMS_PER_PAGE, totalCount);

  return (
    <div className="relative w-full">
      {/* Breadcrumbs full width above layout */}
      <div className="mx-auto w-full max-w-screen-2xl px-5 pt-6 md:px-8 lg:absolute lg:top-0 lg:right-0 lg:left-0 lg:z-10">
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Catálogo", href: "/catalogo" },
            { label: config.subtitle },
          ]}
        />
      </div>

      {/* ── Main catalog layout ─────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-screen-2xl flex-1 flex-col gap-[var(--space-lg)] px-5 pt-6 pb-[var(--space-lg)] md:px-8 lg:flex-row lg:gap-12">
        {/* Desktop sidebar */}
        <FilterSidebar
          categoriesGroup={config.filterGroups[0]}
          categoryChips={config.categoryChips}
          activeFilters={activeFilters}
          onFilterToggle={handleFilterToggle}
          onSaleOnly={onSaleOnly}
          setOnSaleOnly={(v) => {
            setOnSaleOnly(v);
            setCurrentPage(1);
          }}
          isMultiSelect={isMultiSelect}
          setIsMultiSelect={handleSetIsMultiSelect}
        />

        {/* Product area */}
        <div className="w-full lg:flex-1">
          <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-slate-900">
            {config.title}
          </h1>

          {/* Desktop sort bar */}
          <div className="mb-[var(--space-lg)] hidden items-center justify-between lg:flex">
            <p className="font-medium text-[var(--text-sm)] text-slate-500">
              Mostrando {rangeStart}–{rangeEnd} de {totalCount}{" "}
              {totalCount === 1 ? "prenda" : "prendas"}
            </p>
            <div
              className="relative flex items-center gap-[var(--space-sm)]"
              ref={sortRef}
            >
              <span className="font-medium whitespace-nowrap text-[var(--text-sm)] text-slate-700">
                Ordenar por:
              </span>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsSortOpen((v) => !v)}
                  className="group flex cursor-pointer items-center gap-1 font-bold text-[var(--color-primary)] text-[var(--text-sm)] outline-none"
                >
                  <span>
                    {sortBy === "best-selling" && "Recomendados"}
                    {sortBy === "newest" && "Más Nuevos"}
                    {sortBy === "price-low" && "Precio: Menor a Mayor"}
                    {sortBy === "price-high" && "Precio: Mayor a Menor"}
                  </span>
                  <span
                    className={`material-symbols-outlined transition-transform duration-200 ${
                      isSortOpen ? "rotate-180" : ""
                    }`}
                    style={{ fontSize: "18px" }}
                  >
                    expand_more
                  </span>
                </button>

                {isSortOpen && (
                  <div className="animate-in fade-in slide-in-from-top-2 absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl border border-slate-100 bg-white p-1.5 shadow-[0_10px_25px_rgba(20,48,103,0.12)] ring-1 ring-black/5 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("best-selling");
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
                        sortBy === "best-selling"
                          ? "bg-[rgba(20,48,103,0.06)] text-[var(--color-primary)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>Recomendados</span>
                      {sortBy === "best-selling" && (
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("newest");
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
                        sortBy === "newest"
                          ? "bg-[rgba(20,48,103,0.06)] text-[var(--color-primary)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>Más Nuevos</span>
                      {sortBy === "newest" && (
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("price-low");
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
                        sortBy === "price-low"
                          ? "bg-[rgba(20,48,103,0.06)] text-[var(--color-primary)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>Precio: Menor a Mayor</span>
                      {sortBy === "price-low" && (
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setSortBy("price-high");
                        setIsSortOpen(false);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-semibold transition-all ${
                        sortBy === "price-high"
                          ? "bg-[rgba(20,48,103,0.06)] text-[var(--color-primary)]"
                          : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      <span>Precio: Mayor a Menor</span>
                      {sortBy === "price-high" && (
                        <span className="material-symbols-outlined text-[16px]">
                          check
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile top bar */}
          <div className="mb-[var(--space-lg)] flex items-center justify-between lg:hidden">
            <p className="font-medium text-[var(--text-sm)] text-slate-500">
              {totalCount} prenda{totalCount !== 1 ? "s" : ""}
            </p>
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="relative flex items-center gap-[var(--space-xs)] rounded-xl bg-slate-100 px-[var(--space-md)] py-[var(--space-sm)] font-medium text-[var(--text-sm)] text-slate-700 transition-colors hover:bg-slate-200"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "var(--icon-md)" }}
                aria-hidden="true"
              >
                tune
              </span>
              Filtros y Orden
              {activeFilterCount > 0 && (
                <span className="bg-primary absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Product grid */}
          {paginatedProducts.length > 0 ? (
            <>
              <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
                {paginatedProducts.map((p) => (
                  <CatalogProductCard key={p.id} product={p} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-[var(--space-xl)] flex items-center justify-center gap-[var(--space-xs)]">
                  {/* Prev */}
                  {currentPage === 1 ? (
                    <span className="flex aspect-square min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg border border-slate-200 text-slate-600 opacity-30">
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage - 1)}
                      aria-label="Página anterior"
                      className="hover:bg-primary flex aspect-square min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all hover:text-white"
                    >
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                  )}

                  {/* Page numbers */}
                  {pageNumbers.map((page, index) => {
                    const prev = pageNumbers[index - 1];
                    return (
                      <div
                        key={page}
                        className="flex items-center gap-[var(--space-xs)]"
                      >
                        {prev && page - prev > 1 && (
                          <span className="px-[var(--space-xs)] text-slate-400">
                            ...
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => goToPage(page)}
                          aria-label={`Ir a página ${page}`}
                          aria-current={
                            currentPage === page ? "page" : undefined
                          }
                          className={`flex aspect-square min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg font-bold transition-all ${
                            currentPage === page
                              ? "bg-primary text-white"
                              : "hover:bg-primary border border-slate-200 text-slate-600 hover:text-white"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}

                  {/* Next */}
                  {currentPage === totalPages ? (
                    <span className="flex aspect-square min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg border border-slate-200 text-slate-600 opacity-30">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToPage(currentPage + 1)}
                      aria-label="Página siguiente"
                      className="hover:bg-primary flex aspect-square min-h-[44px] w-11 min-w-[44px] items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition-all hover:text-white"
                    >
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-[var(--space-3xl)] text-center">
              <span
                className="material-symbols-outlined mb-[var(--space-md)] text-slate-300"
                style={{ fontSize: "4rem" }}
                aria-hidden="true"
              >
                {hasActiveFilters ? "search_off" : "inventory_2"}
              </span>
              <p className="mb-[var(--space-sm)] font-medium text-slate-500">
                {hasActiveFilters
                  ? "No se encontraron prendas con esos filtros"
                  : "Próximamente más prendas en este catálogo"}
              </p>
              {hasActiveFilters ? (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-primary font-semibold text-[var(--text-sm)] hover:underline"
                >
                  Limpiar filtros
                </button>
              ) : (
                <a
                  href={config.ctaBanner.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold text-[var(--text-sm)] hover:underline"
                >
                  Consultar disponibilidad
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <MobileFilterDrawer
        isOpen={isFilterDrawerOpen}
        onClose={() => setIsFilterDrawerOpen(false)}
        categoriesGroup={config.filterGroups[0]}
        categoryChips={config.categoryChips}
        activeFilters={activeFilters}
        onFilterToggle={handleFilterToggle}
        onSaleOnly={onSaleOnly}
        setOnSaleOnly={(v) => {
          setOnSaleOnly(v);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        setSortBy={setSortBy}
        hasActiveFilters={hasActiveFilters}
        onClearFilters={handleClearFilters}
        totalCount={totalCount}
        isMultiSelect={isMultiSelect}
        setIsMultiSelect={handleSetIsMultiSelect}
      />
    </div>
  );
}
