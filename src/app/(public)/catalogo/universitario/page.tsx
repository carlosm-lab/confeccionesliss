"use client";

import { useState, useMemo, useCallback } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogo/FilterSidebar";

const BREADCRUMB = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Universitario" },
];

const CATEGORIES = [
  { label: "Todos", icon: "grid_view" },
  { label: "UNIVO", icon: "school" },
  { label: "UNAB", icon: "school" },
  { label: "UGB", icon: "school" },
  { label: "UMA", icon: "school" },
  { label: "IEPROES", icon: "school" },
  { label: "UES", icon: "school" },
];

const FILTER_GROUPS = [
  {
    label: "Universidad",
    icon: "school",
    options: [
      { value: "UNIVO", label: "UNIVO", count: 1 },
      { value: "UNAB", label: "UNAB", count: 1 },
      { value: "UGB", label: "UGB", count: 1 },
      { value: "UMA", label: "UMA", count: 1 },
      { value: "IEPROES", label: "IEPROES", count: 1 },
      { value: "UES", label: "UES", count: 1 },
    ],
  },
  {
    label: "Talla",
    icon: "straighten",
    options: [
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
      { value: "XL", label: "XL" },
      { value: "XXL", label: "XXL" },
    ],
  },
  {
    label: "Rango de precio",
    icon: "payments",
    options: [{ value: "35-45", label: "$35 - $45" }],
  },
];

const PRODUCTS = [
  {
    id: "scrub-univo",
    nombre: "Scrub Clínico UNIVO",
    precio: 39.5,
    categoria: "UNIVO",
    tipo: "UNIVO",
    imagen: "/images/uniformes/univo.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Nuevo",
  },
  {
    id: "scrub-unab",
    nombre: "Scrub Clínico UNAB",
    precio: 39.5,
    categoria: "UNAB",
    tipo: "UNAB",
    imagen: "/images/uniformes/unab.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Nuevo",
  },
  {
    id: "scrub-ugb",
    nombre: "Scrub Clínico UGB",
    precio: 39.5,
    categoria: "UGB",
    tipo: "UGB",
    imagen: "/images/uniformes/ugb.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "scrub-uma",
    nombre: "Scrub Clínico UMA",
    precio: 39.5,
    categoria: "UMA",
    tipo: "UMA",
    imagen: "/images/uniformes/uma.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "scrub-ieproes",
    nombre: "Scrub Clínico IEPROES",
    precio: 39.5,
    categoria: "IEPROES",
    tipo: "IEPROES",
    imagen: "/images/uniformes/ieproes.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "scrub-ues",
    nombre: "Scrub Clínico UES",
    precio: 39.5,
    categoria: "UES",
    tipo: "UES",
    imagen: "/images/uniformes/ues.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
];

function matchesPriceRange(precio: number, range: string): boolean {
  const [min, max] = range.split("-").map(Number);
  return precio >= min && precio <= max;
}

export default function CatalogoUniversitarioPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
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
    setSidebarFilters({});
    setActiveCategory("Todos");
  }, []);

  const filteredProducts = useMemo(() => {
    let result = PRODUCTS;
    if (activeCategory !== "Todos") {
      result = result.filter((p) => p.categoria === activeCategory);
    }
    const uniFilters = sidebarFilters["Universidad"] ?? [];
    if (uniFilters.length > 0) {
      result = result.filter((p) => uniFilters.includes(p.tipo));
    }
    const tallaFilters = sidebarFilters["Talla"] ?? [];
    if (tallaFilters.length > 0) {
      result = result.filter((p) =>
        tallaFilters.some((t) => p.tallas.includes(t))
      );
    }
    const priceFilters = sidebarFilters["Rango de precio"] ?? [];
    if (priceFilters.length > 0) {
      result = result.filter((p) =>
        priceFilters.some((range) => matchesPriceRange(p.precio, range))
      );
    }
    return result;
  }, [activeCategory, sidebarFilters]);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-screen-xl">
          <Breadcrumb
            items={BREADCRUMB}
            className="mb-6 text-white/60 [&_a]:text-white/60 [&_a:hover]:text-white [&_span[aria-current]]:text-white"
          />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase backdrop-blur-sm">
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  biotech
                </span>
                Universitario
              </span>
              <h1 className="font-headline mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Uniformes Clínicos Universitarios
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Scrubs personalizados para UNIVO, UNAB, UGB, UMA, IEPROES y UES.
                Bordado de logo y nombre por carrera y facultad. Desde $39.50.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "verified", text: "Colores oficiales" },
                  { icon: "auto_awesome", text: "Bordado de nombre" },
                  { icon: "groups", text: "Descuentos grupales" },
                  { icon: "local_shipping", text: "Entrega en campus" },
                ].map((b) => (
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
        </div>
      </section>

      {/* Sticky filter chips */}
      <section
        className="sticky top-[52px] z-40 border-b border-gray-200 bg-white/95 backdrop-blur-md"
        aria-label="Filtrar por universidad"
      >
        <div
          role="tablist"
          aria-label="Universidades"
          className="hide-scrollbar mx-auto flex max-w-screen-xl gap-2 overflow-x-auto px-5 py-3 md:px-8"
        >
          {CATEGORIES.map((cat) => (
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
          <div className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar
              groups={FILTER_GROUPS}
              selected={sidebarFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </div>
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="section-title text-xl">Uniformes disponibles</h2>
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
                    sector="universitario"
                    nombre={p.nombre}
                    precio={p.precio}
                    categoria={p.categoria}
                    imagen={p.imagen}
                    tallas={p.tallas}
                    showBadge={p.showBadge ?? false}
                    badgeText={p.badgeText}
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
      <section
        className="bg-surface-container-low border-t border-gray-200 px-5 py-10 md:px-8"
        aria-label="Garantías del servicio"
      >
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: "verified", text: "Colores oficiales por universidad" },
            { icon: "auto_awesome", text: "Bordado de nombre y carrera" },
            { icon: "groups", text: "Descuentos grupales" },
            { icon: "local_shipping", text: "Entrega en campus" },
          ].map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-3 text-sm text-gray-600"
            >
              <span
                className="material-symbols-outlined text-primary text-xl"
                aria-hidden="true"
              >
                {f.icon}
              </span>
              <span className="font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-headline text-xl font-bold md:text-2xl">
              ¿Pedido grupal para tu facultad?
            </h2>
            <p className="text-sm text-white/70">
              Descuentos especiales para grupos de 10+ estudiantes. Coordina con
              tu representante de carrera.
            </p>
          </div>
          <a
            href="https://confeccionesliss.axkar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary shrink-0 rounded-lg bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100"
          >
            Pedir para mi grupo
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </a>
        </div>
      </section>
    </>
  );
}
