"use client";

import { useState, useMemo, useCallback } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogo/FilterSidebar";
import type { Product, CategoryConfig } from "@/data/types";

interface CatalogClientShellProps {
  products: Product[];
  config: CategoryConfig;
}

export function CatalogClientShell({
  products,
  config,
}: CatalogClientShellProps) {
  const [activeCategory, setActiveCategory] = useState("Todo");
  const [sidebarFilters, setSidebarFilters] = useState<
    Record<string, string[]>
  >({});

  const handleFilterChange = useCallback(
    (groupLabel: string, values: string[]) => {
      setSidebarFilters((prev) => ({ ...prev, [groupLabel]: values }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setActiveCategory("Todo");
    setSidebarFilters({});
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Chip filter
    if (activeCategory !== "Todo") {
      result = result.filter(
        (p) =>
          p.categoria.toLowerCase().includes(activeCategory.toLowerCase()) ||
          p.tipo.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // Sidebar filters
    const activeFilterGroups = Object.entries(sidebarFilters).filter(
      ([, values]) => values.length > 0
    );
    for (const [, values] of activeFilterGroups) {
      result = result.filter(
        (p) =>
          values.some((v) => p.tipo.toLowerCase() === v.toLowerCase()) ||
          values.some((v) => p.tallas.includes(v)) ||
          values.some((v) => p.categoria.toLowerCase() === v.toLowerCase())
      );
    }

    return result;
  }, [products, activeCategory, sidebarFilters]);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
    { label: config.subtitle },
  ];

  return (
    <>
      {/* Hero */}
      <section className={`${config.heroGradient} px-5 py-12 md:px-8 md:py-20`}>
        <div className="mx-auto max-w-screen-xl">
          <Breadcrumb
            items={breadcrumbItems}
            className="mb-6 text-white/70 [&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white/90"
          />
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-2xl"
                  aria-hidden="true"
                >
                  {config.icon}
                </span>
                <span className="text-sm font-medium tracking-widest uppercase opacity-80">
                  {config.subtitle}
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold md:text-4xl">
                {config.title}
              </h1>
              <p className="mt-2 max-w-lg text-sm opacity-80">
                {config.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {config.heroFeatures.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 rounded-lg bg-white/10 p-3 backdrop-blur-sm"
                >
                  <span
                    className="material-symbols-outlined text-white"
                    aria-hidden="true"
                  >
                    {b.icon}
                  </span>
                  <span className="text-sm font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Chips (sticky) */}
      <section
        className="sticky top-[52px] z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md"
        aria-label="Filtrar por categoría"
      >
        <div
          role="tablist"
          aria-label="Categorías de productos"
          className="hide-scrollbar mx-auto flex max-w-screen-xl gap-2 overflow-x-auto px-5 py-3 md:px-8"
        >
          {config.categoryChips.map((cat) => (
            <button
              key={cat.label}
              type="button"
              role="tab"
              aria-selected={activeCategory === cat.label}
              onClick={() => setActiveCategory(cat.label)}
              className={`focus-visible:ring-primary flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-all focus-visible:ring-2 focus-visible:ring-offset-2 ${
                activeCategory === cat.label
                  ? "border-primary bg-primary text-white"
                  : "hover:border-primary hover:text-primary border-gray-200 bg-white text-gray-600"
              }`}
            >
              <span
                className="material-symbols-outlined text-sm"
                aria-hidden="true"
              >
                {cat.icon}
              </span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Content with sidebar */}
      <section className="bg-surface px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-screen-xl gap-8">
          {/* Sidebar (desktop only for now — FilterDrawer added in Phase C) */}
          <div className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar
              groups={config.filterGroups}
              selected={sidebarFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </div>
          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="section-title text-xl">
                Catálogo {config.subtitle}
              </h2>
              <p className="text-sm text-gray-500" aria-live="polite">
                {filteredProducts.length} producto
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    sector={config.sector}
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
                  Prueba ajustando los filtros o selecciona otra categoría.
                </p>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="bg-primary rounded-lg px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                >
                  Limpiar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      {config.trustFeatures.length > 0 && (
        <section
          className="bg-surface-container-low border-t border-gray-200 px-5 py-10 md:px-8"
          aria-label="Garantías del servicio"
        >
          <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 md:grid-cols-4">
            {config.trustFeatures.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 text-sm text-gray-600"
              >
                <span
                  className="material-symbols-outlined text-primary text-xl"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-primary px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-headline text-xl font-bold md:text-2xl">
              {config.ctaBanner.title}
            </h2>
            <p className="text-sm text-white/70">
              {config.ctaBanner.description}
            </p>
          </div>
          <a
            href={config.ctaBanner.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary shrink-0 rounded-lg bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100"
          >
            {config.ctaBanner.ctaText}
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </a>
        </div>
      </section>
    </>
  );
}
