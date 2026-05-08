"use client";

import { useState, useMemo, useCallback } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogo/FilterSidebar";

const BREADCRUMB = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Escolar" },
];

const CATEGORIES = [
  { label: "Todos", icon: "grid_view" },
  { label: "Camisas", icon: "apparel" },
  { label: "Faldas", icon: "checkroom" },
  { label: "Pantalones", icon: "straighten" },
  { label: "Suéteres", icon: "dry_cleaning" },
  { label: "Corbatas", icon: "badge" },
];

const FILTER_GROUPS = [
  {
    label: "Tipo de prenda",
    icon: "checkroom",
    options: [
      { value: "camisas", label: "Camisas", count: 8 },
      { value: "faldas", label: "Faldas", count: 5 },
      { value: "pantalones", label: "Pantalones", count: 6 },
      { value: "sueteres", label: "Suéteres", count: 4 },
      { value: "corbatas", label: "Corbatas", count: 3 },
    ],
  },
  {
    label: "Talla",
    icon: "straighten",
    options: [
      { value: "4", label: "Talla 4" },
      { value: "6", label: "Talla 6" },
      { value: "8", label: "Talla 8" },
      { value: "10", label: "Talla 10" },
      { value: "12", label: "Talla 12" },
      { value: "14", label: "Talla 14" },
      { value: "16", label: "Talla 16" },
      { value: "S", label: "S" },
      { value: "M", label: "M" },
      { value: "L", label: "L" },
    ],
  },
  {
    label: "Rango de precio",
    icon: "payments",
    options: [
      { value: "0-15", label: "$0 - $15" },
      { value: "15-25", label: "$15 - $25" },
      { value: "25-40", label: "$25 - $40" },
    ],
  },
];

const PRODUCTS = [
  {
    id: "camisa-escolar-blanca",
    nombre: "Camisa Escolar Blanca",
    precio: 12,
    categoria: "Camisas",
    tipo: "camisas",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJPYa3I9MInD_1_NRQIb3_4yvlHu9SPGOEd9N-x7eE5Gz7D0K6n4PQaW_2P_h6yIniP1Sd3nfEBLGDKfXurQKUkCJfF5RLBI8xKXz_3cKnLJlQqnABuF21DpaxBkKBK8nw2-WKhRMeRxq-X9hslzwTqV4Q3wHwqNPg-PxVG7yE_qJidGp3H_qR7VRUQMTwbSRqN4kpB2h-gxNdXHCCr9lCcLBZ-v_z_9dbbJBIrCaH3q_9uBOKfJvyPEf3qvUxLM14t38DqAZlsxI",
    tallas: ["4", "6", "8", "10", "12", "14", "16"],
    showBadge: true,
    badgeText: "Popular",
  },
  {
    id: "falda-escolar-plisada",
    nombre: "Falda Escolar Plisada",
    precio: 15,
    categoria: "Faldas",
    tipo: "faldas",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO",
    tallas: ["4", "6", "8", "10", "12", "14"],
  },
  {
    id: "pantalon-escolar-azul",
    nombre: "Pantalón Escolar Azul",
    precio: 14,
    categoria: "Pantalones",
    tipo: "pantalones",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YwV1ovoyjSwwiIBSXICjSK7t1NRCrORLAJ_WG-VlxLKegY62cdSW0kO4i3RxDxHeOqFaTkKljC8uUBjX8XSP244WgBQ8bv4mqN4XAi-Z3lze5iprsJy74iA97nN7xLG5T9DBh4P0VEV695KAJVFJrMjA6g4-7UnCczo95wFOeSaQEwmOur-gRTwnqJw5YmdyL-yRztA_ycYcCO6hlBmQgXtwurLLPdd7k6oBBIlTI68PQeL9OeeJZoTLCf6r-BJF1EXy2TeD_qa9",
    tallas: ["4", "6", "8", "10", "12", "14", "16"],
  },
  {
    id: "sueter-escolar",
    nombre: "Suéter Escolar V-Neck",
    precio: 18,
    categoria: "Suéteres",
    tipo: "sueteres",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV",
    tallas: ["S", "M", "L"],
  },
  {
    id: "camisa-polo-escolar",
    nombre: "Camisa Polo Escolar",
    precio: 14,
    categoria: "Camisas",
    tipo: "camisas",
    imagen: null,
    tallas: ["4", "6", "8", "10", "12", "14", "16"],
  },
  {
    id: "corbata-escolar",
    nombre: "Corbata Escolar",
    precio: 8,
    categoria: "Corbatas",
    tipo: "corbatas",
    imagen: null,
    tallas: [] as string[],
  },
];

function matchesPriceRange(precio: number, range: string): boolean {
  const [min, max] = range.split("-").map(Number);
  return precio >= min && precio <= max;
}

export default function CatalogoEscolarPage() {
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
    const tipoFilters = sidebarFilters["Tipo de prenda"] ?? [];
    if (tipoFilters.length > 0) {
      result = result.filter((p) => tipoFilters.includes(p.tipo));
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
      <section className="bg-emerald-900 px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-screen-xl">
          <Breadcrumb
            items={BREADCRUMB}
            className="mb-6 text-white/60 [&_a]:text-white/60 [&_a:hover]:text-white [&_span[aria-current]]:text-white"
          />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wide uppercase">
                <span
                  className="material-symbols-outlined text-sm"
                  aria-hidden="true"
                >
                  school
                </span>
                Escolar
              </span>
              <h1 className="font-headline mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Uniformes Escolares de Calidad
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Confección resistente y cómoda para todos los colegios de San
                Miguel y zona oriental. Disponibles en todas las tallas.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "shield", text: "Tela resistente" },
                  { icon: "straighten", text: "A la medida" },
                  { icon: "palette", text: "Colores institucionales" },
                  { icon: "local_shipping", text: "Entrega en colegio" },
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
        aria-label="Filtrar por categoría"
      >
        <div
          role="tablist"
          aria-label="Categorías de productos"
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
              <h2 className="section-title text-xl">Todos los productos</h2>
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
                    sector="escolar"
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
            { icon: "shield", text: "Tela resistente al uso diario" },
            { icon: "straighten", text: "Confección a la medida" },
            { icon: "palette", text: "Colores institucionales exactos" },
            { icon: "local_shipping", text: "Entrega en tu colegio" },
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
              ¿Uniformes para tu colegio completo?
            </h2>
            <p className="text-sm text-white/70">
              Precios especiales para instituciones educativas. Entrega directa
              en tu colegio.
            </p>
          </div>
          <a
            href="https://confeccionesliss.axkar.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary shrink-0 rounded-lg bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100"
          >
            Solicitar cotización
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </a>
        </div>
      </section>
    </>
  );
}
