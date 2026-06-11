"use client";

import { useState, useMemo, useCallback } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogo/FilterSidebar";
import { FilterDrawer } from "@/components/catalogo/FilterDrawer";
import { CATEGORIES } from "@/data/categories";
import type { Product, CatalogSubPage } from "@/data/types";

const EMPTY_ARRAY: any[] = [];

interface CatalogSubPageClientProps {
  products: Product[];
  config: Omit<CatalogSubPage, "filterFn">;
}

export function CatalogSubPageClient({
  products,
  config,
}: CatalogSubPageClientProps) {
  const [sidebarFilters, setSidebarFilters] = useState<
    Record<string, string[]>
  >({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const parentSectorConfig = config.parentSector
    ? CATEGORIES[config.parentSector]
    : null;
  const filterGroups = parentSectorConfig?.filterGroups || EMPTY_ARRAY;

  const handleFilterChange = useCallback(
    (groupLabel: string, values: string[]) => {
      setSidebarFilters((prev) => ({ ...prev, [groupLabel]: values }));
    },
    []
  );

  const handleClearFilters = useCallback(() => {
    setSidebarFilters({});
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Sidebar filters — AND between groups, OR within each group
    const activeFilterGroups = Object.entries(sidebarFilters).filter(
      ([, values]) => values.length > 0
    );
    for (const [groupLabel, values] of activeFilterGroups) {
      const group = filterGroups.find((g) => g.label === groupLabel);
      const field = group?.filterField ?? "tipo";
      result = result.filter((p) => {
        if (field === "tallas") return values.some((v) => p.tallas.includes(v));
        const productValue = String(
          p[field as keyof typeof p] ?? ""
        ).toLowerCase();
        return values.some((v) => productValue === v.toLowerCase());
      });
    }

    return result;
  }, [products, sidebarFilters, filterGroups]);

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
  ];

  if (config.parentSector && config.slug !== config.parentSector) {
    breadcrumbItems.push({
      label: parentSectorConfig?.title || config.parentSector,
      href: `/catalogo/${config.parentSector}`,
    });
  }

  breadcrumbItems.push({
    label: config.navLabel,
    href: `/catalogo/${config.slug}`,
  });

  return (
    <>
      {/* Hero */}
      <section className={`${config.heroGradient} px-5 py-12 md:px-8 md:py-20`}>
        <div className="mx-auto max-w-screen-2xl">
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
                  {config.navIcon}
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
            <div className="flex flex-wrap gap-2 lg:gap-3">
              {config.heroFeatures.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-sm backdrop-blur-sm"
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

      {/* Mobile Filter Drawer */}
      {filterGroups.length > 0 && (
        <FilterDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          groups={filterGroups}
          selected={sidebarFilters}
          onFilterChange={handleFilterChange}
          onClearAll={handleClearFilters}
        />
      )}

      {/* Content with sidebar */}
      <section className="bg-surface px-5 py-10 md:px-8 md:py-16">
        <div className="mx-auto flex max-w-screen-2xl gap-6 xl:gap-8">
          {/* Sidebar (desktop) */}
          {filterGroups.length > 0 && (
            <div className="hidden w-56 shrink-0 xl:block xl:w-64">
              <FilterSidebar
                groups={filterGroups}
                selected={sidebarFilters}
                onFilterChange={handleFilterChange}
                onClearAll={handleClearFilters}
              />
            </div>
          )}

          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="section-title text-xl">{config.title}</h2>
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                {filterGroups.length > 0 && (
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
                )}
                <p className="text-sm text-gray-500" aria-live="polite">
                  {filteredProducts.length} producto
                  {filteredProducts.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 items-start gap-4 md:gap-6 lg:grid-cols-3">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    sector={config.parentSector || p.sector}
                    catalogSlug={config.slug}
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
                  inventory_2
                </span>
                <h3 className="mb-2 text-lg font-semibold text-gray-700">
                  Pronto agregaremos más productos
                </h3>
                <p className="mb-4 max-w-sm text-sm text-gray-500">
                  Actualmente no hay productos para mostrar con estos filtros.
                </p>
                {Object.keys(sidebarFilters).length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="bg-primary rounded-lg px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
                  >
                    Limpiar filtros
                  </button>
                )}
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
          <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-6 md:grid-cols-4">
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
      <section className="bg-primary px-5 pt-10 pb-20 text-white md:px-8">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 md:flex-row">
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
