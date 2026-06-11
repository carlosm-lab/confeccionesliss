"use client";

import { useMemo, Suspense } from "react";
import { ProductCard } from "@/components/ui/ProductCard";
import { SearchBar } from "@/components/catalogo/SearchBar";
import { SortSelect } from "@/components/catalogo/SortSelect";
import { Pagination } from "@/components/catalogo/Pagination";
import { FilterSidebar } from "@/components/catalogo/FilterSidebar";
import { FilterDrawer } from "@/components/catalogo/FilterDrawer";
import { useFilterParams } from "@/hooks/useFilterParams";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import type { Product, FilterGroup } from "@/data/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

/* ─── Sector display config ─── */
const SECTOR_LABELS: Record<string, { label: string; icon: string }> = {
  scrubs: { label: "Scrubs", icon: "health_and_safety" },
  universitario: { label: "Universitario", icon: "school" },
  escolar: { label: "Escolar", icon: "domain" },
  corporativo: { label: "Corporativo", icon: "business_center" },
  deportivo: { label: "Deportivo", icon: "sports" },
  accesorios: { label: "Accesorios", icon: "checkroom" },
};

/* ─── Build filter groups from ALL products ─── */
function buildFilterGroups(products: Product[]): FilterGroup[] {
  // Sector filter
  const sectors = [...new Set(products.map((p) => p.sector))];
  const sectorGroup: FilterGroup = {
    label: "Sector",
    icon: "category",
    filterField: "sector",
    options: sectors.map((s) => ({
      label: SECTOR_LABELS[s]?.label ?? s,
      value: s,
    })),
  };

  // Tipo filter
  const tipos = [...new Set(products.map((p) => p.tipo))];
  const tipoGroup: FilterGroup = {
    label: "Tipo",
    icon: "style",
    filterField: "tipo",
    options: tipos.map((t) => ({
      label: t.charAt(0).toUpperCase() + t.slice(1),
      value: t,
    })),
  };

  // Tallas filter
  const allTallas = new Set<string>();
  products.forEach((p) => p.tallas.forEach((t) => allTallas.add(t)));
  const tallaOrder = [
    "XS",
    "S",
    "M",
    "L",
    "XL",
    "XXL",
    "2",
    "4",
    "6",
    "8",
    "10",
    "12",
    "14",
    "16",
  ];
  const sortedTallas = [...allTallas].sort(
    (a, b) =>
      (tallaOrder.indexOf(a) === -1 ? 999 : tallaOrder.indexOf(a)) -
      (tallaOrder.indexOf(b) === -1 ? 999 : tallaOrder.indexOf(b))
  );
  const tallaGroup: FilterGroup = {
    label: "Talla",
    icon: "straighten",
    filterField: "tallas",
    options: sortedTallas.map((t) => ({ label: t, value: t })),
  };

  return [sectorGroup, tipoGroup, tallaGroup];
}

/* ─── Sort helper ─── */
function sortProducts(products: Product[], sort: string): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.precio - b.precio);
    case "price-desc":
      return sorted.sort((a, b) => b.precio - a.precio);
    case "name-asc":
      return sorted.sort((a, b) => a.nombre.localeCompare(b.nombre));
    case "name-desc":
      return sorted.sort((a, b) => b.nombre.localeCompare(a.nombre));
    default:
      return sorted;
  }
}

interface UnifiedCatalogClientProps {
  products: Product[];
}

function UnifiedCatalogInner({ products }: UnifiedCatalogClientProps) {
  const {
    query,
    filters,
    sort,
    page,
    pageSize,
    setQuery,
    toggleFilter,
    clearAll,
    setSort,
    setPage,
    hasActiveFilters,
  } = useFilterParams({ pageSize: 12 });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const filterGroups = useMemo(() => buildFilterGroups(products), [products]);

  // Convert URL filter state to sidebar format
  const sidebarSelected = useMemo(() => {
    const result: Record<string, string[]> = {};
    // Map URL param keys to group labels
    const keyToLabel: Record<string, string> = {
      sector: "Sector",
      tipo: "Tipo",
      talla: "Talla",
    };
    for (const [key, values] of Object.entries(filters)) {
      const label = keyToLabel[key];
      if (label && values.length > 0) {
        result[label] = values;
      }
    }
    return result;
  }, [filters]);

  // Handle sidebar filter changes — translate group label back to URL param key
  const handleFilterChange = (groupLabel: string, values: string[]) => {
    const labelToKey: Record<string, string> = {
      Sector: "sector",
      Tipo: "tipo",
      Talla: "talla",
    };
    const key = labelToKey[groupLabel];
    if (!key) return;

    // Set entire group at once via URL
    const params = new URLSearchParams(window.location.search);
    if (values.length > 0) {
      params.set(key, values.join(","));
    } else {
      params.delete(key);
    }
    params.delete("page");
    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${search ? `?${search}` : ""}`
    );
    // Trigger re-render via toggleFilter (toggle last value to force URL update)
    // Actually, let's just use setFilterGroup approach
    // We need to use the hook's method. Let me use toggleFilter differently.
    // The simplest way: clear all values in the group then set new ones
    const currentValues = filters[key] ?? [];
    // Remove all current values
    for (const v of currentValues) {
      if (!values.includes(v)) {
        toggleFilter(key, v);
      }
    }
    // Add new values
    for (const v of values) {
      if (!currentValues.includes(v)) {
        toggleFilter(key, v);
      }
    }
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = products;

    // Search query
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.nombre.toLowerCase().includes(q) ||
          p.categoria.toLowerCase().includes(q) ||
          p.tipo.toLowerCase().includes(q) ||
          p.sector.toLowerCase().includes(q) ||
          p.tallas.some((t) => t.toLowerCase() === q) ||
          (p.descripcionCorta?.toLowerCase().includes(q) ?? false)
      );
    }

    // Sector filter
    const sectorVals = filters.sector ?? [];
    if (sectorVals.length > 0) {
      result = result.filter((p) => sectorVals.includes(p.sector));
    }

    // Tipo filter
    const tipoVals = filters.tipo ?? [];
    if (tipoVals.length > 0) {
      result = result.filter((p) =>
        tipoVals.some((v) => p.tipo.toLowerCase() === v.toLowerCase())
      );
    }

    // Talla filter
    const tallaVals = filters.talla ?? [];
    if (tallaVals.length > 0) {
      result = result.filter((p) =>
        tallaVals.some((v) => p.tallas.includes(v))
      );
    }

    return result;
  }, [products, query, filters]);

  // Sort
  const sortedProducts = useMemo(
    () => sortProducts(filteredProducts, sort),
    [filteredProducts, sort]
  );

  // Paginate
  const totalPages = Math.ceil(sortedProducts.length / pageSize);
  const paginatedProducts = useMemo(
    () => sortedProducts.slice((page - 1) * pageSize, page * pageSize),
    [sortedProducts, page, pageSize]
  );

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#143067] via-[#1a3d7c] to-[#0d2147] px-5 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-screen-2xl">
          <Breadcrumb
            items={breadcrumbItems}
            className="mb-6 text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/90"
          />
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-serif text-3xl font-bold md:text-4xl">
                Catálogo Completo de Uniformes
              </h1>
              <p className="mt-2 max-w-lg text-sm opacity-80">
                Explora todos nuestros productos: scrubs médicos, uniformes
                universitarios, escolares y corporativos. Confección a la medida
                en San Miguel.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-lg bg-white/10 p-3 backdrop-blur-sm">
                <span
                  className="material-symbols-outlined text-white"
                  aria-hidden="true"
                >
                  inventory_2
                </span>
                <span className="text-sm font-medium">
                  {products.length} productos
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              resultCount={
                hasActiveFilters ? filteredProducts.length : undefined
              }
            />
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        groups={filterGroups}
        selected={sidebarSelected}
        onFilterChange={handleFilterChange}
        onClearAll={clearAll}
      />

      {/* Content */}
      <section className="bg-surface px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-screen-2xl gap-6 xl:gap-8">
          {/* Sidebar (desktop) */}
          <div className="hidden w-56 shrink-0 xl:block xl:w-64">
            <FilterSidebar
              groups={filterGroups}
              selected={sidebarSelected}
              onFilterChange={handleFilterChange}
              onClearAll={clearAll}
            />
          </div>

          {/* Main Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile filter toggle */}
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(true)}
                  className="bg-primary/10 text-primary flex min-h-[44px] items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium xl:hidden"
                  aria-label="Abrir filtros"
                >
                  <span
                    className="material-symbols-outlined text-base"
                    aria-hidden="true"
                  >
                    tune
                  </span>
                  Filtros
                </button>
                <p className="text-sm text-gray-500" aria-live="polite">
                  {filteredProducts.length} producto
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
              <SortSelect value={sort} onChange={setSort} />
            </div>

            {/* Active filters badges */}
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {query && (
                  <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                    &quot;{query}&quot;
                    <button
                      type="button"
                      onClick={() => setQuery("")}
                      aria-label={`Quitar búsqueda: ${query}`}
                      className="ml-0.5 hover:opacity-70"
                    >
                      <span
                        className="material-symbols-outlined text-xs"
                        aria-hidden="true"
                      >
                        close
                      </span>
                    </button>
                  </span>
                )}
                {Object.entries(filters).map(([key, values]) =>
                  values.map((v) => (
                    <span
                      key={`${key}-${v}`}
                      className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium"
                    >
                      {v}
                      <button
                        type="button"
                        onClick={() => toggleFilter(key, v)}
                        aria-label={`Quitar filtro: ${v}`}
                        className="ml-0.5 hover:opacity-70"
                      >
                        <span
                          className="material-symbols-outlined text-xs"
                          aria-hidden="true"
                        >
                          close
                        </span>
                      </button>
                    </span>
                  ))
                )}
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs font-medium text-gray-500 underline hover:text-gray-700"
                >
                  Limpiar todo
                </button>
              </div>
            )}

            {/* Product Grid */}
            {paginatedProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-2 items-start gap-4 md:grid-cols-3 md:gap-6 xl:grid-cols-3">
                  {paginatedProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      id={p.id}
                      sector={p.sector}
                      nombre={p.nombre}
                      precio={p.precio}
                      precioAnterior={p.precioAnterior ?? null}
                      categoria={p.categoria}
                      imagen={p.imagen}
                      tallas={p.tallas}
                      showBadge={p.showBadge ?? false}
                      badgeText={p.badgeText}
                      priceSuffix={p.priceSuffix}
                      showFavorite
                    />
                  ))}
                </div>
                {/* Pagination */}
                <div className="mt-10">
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
                <span
                  className="material-symbols-outlined mb-4 text-5xl text-gray-300"
                  aria-hidden="true"
                >
                  search_off
                </span>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  No se encontraron productos
                </h3>
                <p className="mb-4 max-w-sm text-sm text-gray-500">
                  Prueba ajustando los filtros o cambiando tu búsqueda.
                </p>
                <button
                  type="button"
                  onClick={clearAll}
                  className="bg-primary rounded-lg px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary px-5 pt-10 pb-20 text-white md:px-8">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-headline text-xl font-bold md:text-2xl">
              ¿No encuentras lo que buscas?
            </h2>
            <p className="text-sm text-white/70">
              Confeccionamos uniformes a la medida. Cuéntanos tu proyecto y te
              damos una cotización en minutos.
            </p>
          </div>
          <a
            href={siteConfig.links.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary shrink-0 rounded-lg bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100"
          >
            Cotizar por WhatsApp
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </a>
        </div>
      </section>
    </>
  );
}

/**
 * Wrapper with Suspense boundary for useSearchParams
 */
export function UnifiedCatalogClient(props: UnifiedCatalogClientProps) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
        </div>
      }
    >
      <UnifiedCatalogInner {...props} />
    </Suspense>
  );
}
