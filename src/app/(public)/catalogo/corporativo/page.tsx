"use client";

import { useState, useMemo, useCallback } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/catalogo/FilterSidebar";
import { VolumePricingCard } from "@/components/catalogo/VolumePricingCard";
import { ProcessSteps } from "@/components/catalogo/ProcessSteps";
import { QuoteForm } from "@/components/catalogo/QuoteForm";

const BREADCRUMB = [
  { label: "Inicio", href: "/" },
  { label: "Catálogo", href: "/catalogo" },
  { label: "Corporativo" },
];

const CATEGORIES = [
  { label: "Todos", icon: "grid_view" },
  { label: "Camisas", icon: "apparel" },
  { label: "Polos", icon: "dry_cleaning" },
  { label: "Gabachas", icon: "checkroom" },
  { label: "Chalecos", icon: "shield_with_heart" },
];

const FILTER_GROUPS = [
  {
    label: "Tipo de prenda",
    icon: "checkroom",
    options: [
      { value: "camisas", label: "Camisas", count: 2 },
      { value: "polos", label: "Polos", count: 2 },
      { value: "gabachas", label: "Gabachas", count: 1 },
      { value: "chalecos", label: "Chalecos", count: 1 },
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
    options: [
      { value: "0-20", label: "$0 - $20" },
      { value: "20-30", label: "$20 - $30" },
    ],
  },
];

const PRODUCTS = [
  {
    id: "camisa-oxford",
    nombre: "Camisa Oxford Corporativa",
    precio: 28,
    categoria: "Camisas",
    tipo: "camisas",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcr4ELZM-dIaG8Xlo-cMiT9GWGeLLSQJr14Wj5SoifRJb-MfWHST3w8Y2nfP7TnJlwvZTEPbcSM1OZhZWQFm5jjy8HYGG9_h-HN9pWiqn1swCfKVYyeVBsKHkM0nBUlXMPg9Yj7K64B69i90aGdPEQs7pPFyYKbWl2hN4TafZgCFVnJd2O5P9GUh9Ht6fW8J2X5fQIB-g3j1FgGGk8QC4uh2LMQMK7PmT-jUhYnBCk48KIqSR1SZYEP0iY68jkzKjzYx5HI3zMt",
    tallas: ["S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Más vendido",
    priceSuffix: "/unid.",
  },
  {
    id: "polo-dri-fit",
    nombre: "Polo Dri-Fit Empresarial",
    precio: 22,
    categoria: "Polos",
    tipo: "polos",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO",
    tallas: ["S", "M", "L", "XL"],
    priceSuffix: "/unid.",
  },
  {
    id: "gabacha-industrial",
    nombre: "Gabacha Industrial",
    precio: 25,
    categoria: "Gabachas",
    tipo: "gabachas",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YwV1ovoyjSwwiIBSXICjSK7t1NRCrORLAJ_WG-VlxLKegY62cdSW0kO4i3RxDxHeOqFaTkKljC8uUBjX8XSP244WgBQ8bv4mqN4XAi-Z3lze5iprsJy74iA97nN7xLG5T9DBh4P0VEV695KAJVFJrMjA6g4-7UnCczo95wFOeSaQEwmOur-gRTwnqJw5YmdyL-yRztA_ycYcCO6hlBmQgXtwurLLPdd7k6oBBIlTI68PQeL9OeeJZoTLCf6r-BJF1EXy2TeD_qa9",
    tallas: ["M", "L", "XL"],
    priceSuffix: "/unid.",
  },
  {
    id: "chaleco-seguridad",
    nombre: "Chaleco de Seguridad",
    precio: 18,
    categoria: "Chalecos",
    tipo: "chalecos",
    imagen: null,
    tallas: ["M", "L", "XL", "XXL"],
    priceSuffix: "/unid.",
  },
  {
    id: "camisa-manga-corta",
    nombre: "Camisa Manga Corta Ejecutiva",
    precio: 24,
    precioAnterior: 28,
    categoria: "Camisas",
    tipo: "camisas",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV",
    tallas: ["S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Oferta",
    priceSuffix: "/unid.",
  },
  {
    id: "polo-pique",
    nombre: "Polo Piqué Premium",
    precio: 26,
    categoria: "Polos",
    tipo: "polos",
    imagen: null,
    tallas: ["S", "M", "L", "XL"],
    priceSuffix: "/unid.",
  },
];

const VOLUME_TIERS = [
  { range: "1 - 9 unidades", discount: "Precio regular" },
  { range: "10 - 24 unidades", discount: "10% descuento" },
  { range: "25 - 49 unidades", discount: "15% descuento" },
  { range: "50 - 99 unidades", discount: "20% descuento", highlight: true },
  { range: "100+ unidades", discount: "Precio especial", highlight: true },
];

const ORDER_STEPS = [
  {
    number: 1,
    title: "Consulta",
    description: "Cuéntanos tus necesidades por WhatsApp o formulario.",
    icon: "chat",
  },
  {
    number: 2,
    title: "Diseño",
    description: "Creamos mockups con tu logo y colores corporativos.",
    icon: "design_services",
  },
  {
    number: 3,
    title: "Aprobación",
    description: "Revisas y apruebas el diseño antes de producción.",
    icon: "task_alt",
  },
  {
    number: 4,
    title: "Producción",
    description: "Confección artesanal con materiales de primera.",
    icon: "precision_manufacturing",
  },
  {
    number: 5,
    title: "Entrega",
    description: "Entregamos en tu sede o enviamos a todo El Salvador.",
    icon: "local_shipping",
  },
];

function matchesPriceRange(precio: number, range: string): boolean {
  const [min, max] = range.split("-").map(Number);
  return precio >= min && precio <= max;
}

export default function CatalogoCorporativoPage() {
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
      <section className="relative overflow-hidden bg-[#1a1a2e] px-5 py-16 text-white md:px-8 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-90" />
        <div className="relative z-10 mx-auto max-w-screen-xl">
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
                  business_center
                </span>
                Corporativo
              </span>
              <h1 className="font-headline mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">
                Uniformes que Representan tu Marca
              </h1>
              <p className="text-base leading-relaxed text-white/80 md:text-lg">
                Confección profesional de uniformes empresariales con bordado de
                logo, sublimación y personalización completa. Precios especiales
                por volumen.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: "verified", text: "Bordado de logo" },
                  { icon: "palette", text: "Colores corporativos" },
                  { icon: "groups", text: "Precios por volumen" },
                  { icon: "local_shipping", text: "Entrega en sede" },
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
              <h2 className="section-title text-xl">Catálogo Corporativo</h2>
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
                    sector="corporativo"
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

      {/* Volume Pricing + Quote Form */}
      <section className="bg-surface-container-low px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-screen-xl gap-8 lg:grid-cols-2">
          <VolumePricingCard
            title="Descuentos por Volumen"
            description="Mientras más unidades ordenes, mayor tu ahorro."
            tiers={VOLUME_TIERS}
          />
          <QuoteForm />
        </div>
      </section>

      <ProcessSteps
        title="¿Cómo funciona el pedido corporativo?"
        steps={ORDER_STEPS}
        className="bg-white"
      />

      {/* Trust strip */}
      <section
        className="bg-surface-container-low border-t border-gray-200 px-5 py-10 md:px-8"
        aria-label="Garantías del servicio"
      >
        <div className="mx-auto grid max-w-screen-xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { icon: "verified", text: "Bordado de logo incluido" },
            { icon: "palette", text: "Colores corporativos exactos" },
            { icon: "groups", text: "Precios por volumen" },
            { icon: "local_shipping", text: "Entrega en tu sede" },
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
              +500 empresas confían en nosotros
            </h2>
            <p className="text-sm text-white/70">
              Clínicas, restaurantes, hoteles y más en toda la zona oriental.
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
