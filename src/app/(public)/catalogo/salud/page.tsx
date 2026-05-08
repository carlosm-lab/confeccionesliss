"use client";

import { useState, useMemo, useCallback } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogo/FilterSidebar";
import { Badge } from "@/components/ui/Badge";

const BREADCRUMB_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Sector Salud" },
];

const CATEGORIES = [
  { label: "Todos", icon: "grid_view" },
  { label: "Scrubs", icon: "checkroom" },
  { label: "Batas", icon: "science" },
  { label: "Gorros", icon: "face" },
  { label: "Chaquetas", icon: "apparel" },
  { label: "Accesorios", icon: "medical_services" },
];

const FILTER_GROUPS = [
  {
    label: "Tipo de prenda",
    icon: "checkroom",
    options: [
      { value: "scrubs", label: "Scrubs", count: 3 },
      { value: "batas", label: "Batas", count: 1 },
      { value: "gorros", label: "Gorros", count: 1 },
      { value: "chaquetas", label: "Chaquetas", count: 1 },
    ],
  },
  {
    label: "Talla",
    icon: "straighten",
    options: [
      { value: "XS", label: "XS" },
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
    options: [
      { value: "0-20", label: "$0 - $20" },
      { value: "20-40", label: "$20 - $40" },
      { value: "40-60", label: "$40 - $60" },
    ],
  },
];

const PRODUCTS = [
  {
    id: "scrub-san-miguel",
    nombre: "Scrub Médico Premium 'San Miguel'",
    precio: 45.0,
    precioAnterior: 55.0,
    categoria: "Scrubs Médicos",
    tipo: "scrubs",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHxaJ3wC7_Tyv2qoS2x-JxEIKirXQbF3Oa93ux9PxpkeDL7PxP9HgLzvuK4PXKFpUyQIEazDIMFGi-ippZhPkDRGzV0_DgjDlpq1lvYtUEKv6MM_9SCEIjG9hv1Kuj25-a2myQC0CLzn4fEvE0DFt2kbgC_jM_U-I-1a5mo6eKrFB-IUhmbhCp2sfLYyoGpdjIhZHsgiWX3J4kkrsjmCwv49dPUsoa-VXowlnCp231nVGXqhuBRF3wCeAivhPWKCJ4QLH2jr6oNBXo",
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Nuevo",
    showFavorite: true,
  },
  {
    id: "scrub-sincatex-clasico",
    nombre: "Scrub Sincatex Clásico",
    precio: 35.0,
    precioAnterior: null,
    categoria: "Scrubs Médicos",
    tipo: "scrubs",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO",
    tallas: ["S", "M", "L", "XL"],
    showBadge: false,
    showFavorite: true,
  },
  {
    id: "gorro-quirurgico-premium",
    nombre: "Gorro Quirúrgico Premium",
    precio: 12.0,
    precioAnterior: null,
    categoria: "Gorros",
    tipo: "gorros",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJrG7ywGURCgxGpPBAAxum4EmcC_Ho7DeJYfkcDI1HZLbfrOwjxr84oTYIAz6pJDmYCubgLMXEu2F6OidCmmzN5zFRZRxwQ222Y0aygqOfBOYVJahJFWuX1ePwZ70pzkqqTns9WnbaMFcG5KdIxznIxMA88-3K0vSoYKbvHDe4mMUaQL0c7sboJLYopKKEkMRVQKJkyE-lYKgm8CKMjDe4Hx0thfhqjjJQzYH7PffT9wI0yDesJPkDx8eTyFVeai0jSXh9nfgbPMTI",
    tallas: [] as string[],
    showBadge: false,
    showFavorite: true,
  },
  {
    id: "bata-medica-clasica",
    nombre: "Bata Médica Clásica",
    precio: 35.0,
    precioAnterior: null,
    categoria: "Batas",
    tipo: "batas",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YwV1ovoyjSwwiIBSXICjSK7t1NRCrORLAJ_WG-VlxLKegY62cdSW0kO4i3RxDxHeOqFaTkKljC8uUBjX8XSP244WgBQ8bv4mqN4XAi-Z3lze5iprsJy74iA97nN7xLG5T9DBh4P0VEV695KAJVFJrMjA6g4-7UnCczo95wFOeSaQEwmOur-gRTwnqJw5YmdyL-yRztA_ycYcCO6hlBmQgXtwurLLPdd7k6oBBIlTI68PQeL9OeeJZoTLCf6r-BJF1EXy2TeD_qa9",
    tallas: ["S", "M", "L", "XL"],
    showBadge: false,
    showFavorite: true,
  },
  {
    id: "scrub-premium-verde",
    nombre: "Scrub Premium Verde Quirófano",
    precio: 45.0,
    precioAnterior: null,
    categoria: "Scrubs Médicos",
    tipo: "scrubs",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV",
    tallas: ["XS", "S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Popular",
    showFavorite: true,
  },
  {
    id: "chaqueta-clinica",
    nombre: "Chaqueta Clínica",
    precio: 40.0,
    precioAnterior: null,
    categoria: "Chaquetas",
    tipo: "chaquetas",
    imagen: null,
    tallas: ["M", "L", "XL"],
    showBadge: false,
    showFavorite: true,
  },
];

function matchesPriceRange(precio: number, range: string): boolean {
  const [min, max] = range.split("-").map(Number);
  return precio >= min && precio <= max;
}

export default function CatalogoSaludPage() {
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

    // Filter by active category chip
    if (activeCategory !== "Todos") {
      result = result.filter((p) =>
        p.categoria.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    // Filter by sidebar: tipo de prenda
    const tipoFilters = sidebarFilters["Tipo de prenda"] ?? [];
    if (tipoFilters.length > 0) {
      result = result.filter((p) => tipoFilters.includes(p.tipo));
    }

    // Filter by sidebar: talla
    const tallaFilters = sidebarFilters["Talla"] ?? [];
    if (tallaFilters.length > 0) {
      result = result.filter((p) =>
        tallaFilters.some((t) => p.tallas.includes(t))
      );
    }

    // Filter by sidebar: price range
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
      <section className="bg-primary relative overflow-hidden px-5 py-16 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-screen-xl">
          <Breadcrumb
            items={BREADCRUMB_ITEMS}
            className="mb-6 text-white/60 [&_a]:text-white/60 [&_a:hover]:text-white [&_span[aria-current]]:text-white"
          />
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <Badge variant="accent" className="mb-4 bg-white/10 text-white">
                <span
                  className="material-symbols-outlined mr-1 text-xs"
                  aria-hidden="true"
                >
                  health_and_safety
                </span>
                Sector Salud
              </Badge>
              <h1 className="font-headline mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Uniformes Médicos de Alta Calidad
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Scrubs, batas y accesorios confeccionados con tela
                antimicrobiana Sincatex. Diseño ergonómico para largas jornadas.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "verified", text: "Tela Sincatex" },
                  { icon: "auto_awesome", text: "Bordado incluido" },
                  { icon: "local_shipping", text: "Envío nacional" },
                  { icon: "payments", text: "Desde $35" },
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

      {/* Filters */}
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
          {/* Sidebar */}
          <div className="hidden w-64 shrink-0 lg:block">
            <FilterSidebar
              groups={FILTER_GROUPS}
              selected={sidebarFilters}
              onFilterChange={handleFilterChange}
              onClearAll={handleClearFilters}
            />
          </div>
          {/* Grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="section-title text-xl">Catálogo Salud</h2>
              <p className="text-sm text-gray-500" aria-live="polite">
                {filteredProducts.length} producto
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    sector="salud"
                    nombre={product.nombre}
                    precio={product.precio}
                    precioAnterior={product.precioAnterior}
                    categoria={product.categoria}
                    imagen={product.imagen}
                    tallas={product.tallas}
                    showBadge={product.showBadge}
                    badgeText={product.badgeText}
                    showFavorite={product.showFavorite}
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
            { icon: "checkroom", text: "Confección artesanal" },
            { icon: "health_and_safety", text: "Tela médica certificada" },
            { icon: "auto_awesome", text: "Bordado profesional" },
            { icon: "local_shipping", text: "Envío zona oriental" },
          ].map((item) => (
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

      {/* CTA Banner */}
      <section className="bg-primary px-5 py-10 text-white md:px-8">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-headline text-xl font-bold md:text-2xl">
              ¿Necesitas uniformes para tu clínica o consultorio?
            </h2>
            <p className="text-sm text-white/70">
              Precios especiales por volumen. Bordado de logo y nombre incluido
              desde 10 unidades.
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
