"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";
import { CategoryChip } from "@/components/ui/CategoryChip";
import { SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Todos",
  "Scrubs",
  "Batas",
  "Chaquetas",
  "Conjuntos",
  "Accesorios",
];
const COLORS = [
  { id: "navy", hex: "#143067", label: "Navy" },
  { id: "celeste", hex: "#87CEEB", label: "Celeste" },
  { id: "verde", hex: "#1a5c3a", label: "Verde" },
  { id: "burdeos", hex: "#800020", label: "Burdeos" },
  { id: "blanco", hex: "#ffffff", label: "Blanco" },
  { id: "negro", hex: "#000000", label: "Negro" },
  { id: "rosa", hex: "#d4a0a0", label: "Rosa" },
  { id: "teal", hex: "#008080", label: "Teal" },
];
const SIZES = ["XS", "S", "M", "L", "XL", "2XL"];

const PRODUCTS = [
  {
    id: "1",
    nombre: "Scrub Clásico Azul Marino",
    precio: 28.99,
    precioAnterior: 34.99,
    categoria: "Scrubs",
    tallas: ["XS", "S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Oferta",
  },
  {
    id: "2",
    nombre: "Scrub Enfermería Rosa Palo",
    precio: 32.5,
    precioAnterior: null,
    categoria: "Scrubs",
    tallas: ["XS", "S", "M", "L"],
    showBadge: true,
    badgeText: "Nuevo",
  },
  {
    id: "3",
    nombre: "Bata Médica Larga Blanca",
    precio: 38.0,
    precioAnterior: null,
    categoria: "Batas",
    tallas: ["S", "M", "L", "XL"],
    showBadge: false,
  },
  {
    id: "4",
    nombre: "Conjunto Quirúrgico Verde",
    precio: 45.0,
    precioAnterior: 52.0,
    categoria: "Conjuntos",
    tallas: ["S", "M", "L", "XL", "2XL"],
    showBadge: true,
    badgeText: "Oferta",
  },
  {
    id: "5",
    nombre: "Chaqueta Médica Premium",
    precio: 55.0,
    precioAnterior: null,
    categoria: "Chaquetas",
    tallas: ["S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Premium",
  },
  {
    id: "6",
    nombre: "Scrub Quirófano Burdeos",
    precio: 36.5,
    precioAnterior: 42.0,
    categoria: "Scrubs",
    tallas: ["XS", "S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Popular",
  },
  {
    id: "7",
    nombre: "Scrub Fisioterapia Teal",
    precio: 30.0,
    precioAnterior: null,
    categoria: "Scrubs",
    tallas: ["S", "M", "L", "XL"],
    showBadge: false,
  },
  {
    id: "8",
    nombre: "Bata Laboratorio Corta",
    precio: 22.0,
    precioAnterior: 26.0,
    categoria: "Batas",
    tallas: ["S", "M", "L"],
    showBadge: true,
    badgeText: "Oferta",
  },
];

export default function CatalogoSaludPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const filtered =
    activeCategory === "Todos"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.categoria === activeCategory);

  return (
    <div>
      {/* Hero */}
      <div className="relative bg-emerald-900 px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold tracking-wider text-emerald-300 uppercase">
            Catálogo
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Sector Salud
          </h1>
          <p className="mt-2 text-emerald-100/70">
            Scrubs, batas y uniformes médicos de calidad artesanal
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {CATEGORIES.map((cat) => (
              <CategoryChip
                key={cat}
                label={cat}
                isActive={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            <SlidersHorizontal className="size-4" /> Filtros
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar de filtros */}
          {filtersOpen && (
            <aside className="hidden w-60 shrink-0 space-y-6 lg:block">
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Talla
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSizes((prev) =>
                          prev.includes(size)
                            ? prev.filter((s) => s !== size)
                            : [...prev, size]
                        )
                      }
                      className={cn(
                        "flex size-9 cursor-pointer items-center justify-center rounded-full border text-xs font-medium",
                        selectedSizes.includes(size)
                          ? "border-brand-primary bg-brand-primary text-white"
                          : "hover:border-brand-primary border-gray-200 text-gray-600"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color.id}
                      type="button"
                      title={color.label}
                      className={cn(
                        "size-7 cursor-pointer rounded-full border-2",
                        color.hex === "#ffffff"
                          ? "border-gray-300"
                          : "border-transparent"
                      )}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-700">
                  Precio
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      className="accent-brand-primary"
                    />{" "}
                    Todos
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      className="accent-brand-primary"
                    />{" "}
                    Menos de $30
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      className="accent-brand-primary"
                    />{" "}
                    $30 - $50
                  </label>
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="radio"
                      name="price"
                      className="accent-brand-primary"
                    />{" "}
                    Más de $50
                  </label>
                </div>
              </div>
            </aside>
          )}

          {/* Grid */}
          <div className="flex-1">
            <p className="mb-4 text-sm text-gray-500">
              {filtered.length} productos
            </p>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <Link key={product.id} href={`/producto/${product.id}` as any}>
                  <ProductCard
                    id={product.id}
                    nombre={product.nombre}
                    precio={product.precio}
                    precioAnterior={product.precioAnterior}
                    categoria={product.categoria}
                    tallas={product.tallas}
                    showBadge={product.showBadge}
                    badgeText={product.badgeText}
                    showFavorite
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
