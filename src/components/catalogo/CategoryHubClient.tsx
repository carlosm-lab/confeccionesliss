"use client";

import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { ALL_PRODUCTS } from "@/data/products";
import type { Sector } from "@/data/types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

/** Ordered list of sectors for the hub grid */
const SECTOR_ORDER: Sector[] = [
  "scrubs",
  "universitario",
  "escolar",
  "corporativo",
  "deportivo",
  "accesorios",
];

function CategoryCard({
  sector,
  productCount,
}: {
  sector: Sector;
  productCount: number;
}) {
  const config = CATEGORIES[sector];

  return (
    <Link
      href={`/catalogo/${sector}`}
      className={cn(
        "group border-primary/35 flex flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300",
        "shadow-[0_8px_24px_-6px_rgba(20,48,103,0.18),0_4px_10px_-4px_rgba(20,48,103,0.12)]",
        "hover:border-primary/55 hover:-translate-y-1 hover:shadow-[0_16px_36px_-8px_rgba(20,48,103,0.24),0_6px_16px_-4px_rgba(20,48,103,0.18)]",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      )}
      aria-label={`Ver catálogo de ${config.subtitle}: ${config.hubTagline}`}
    >
      {/* Category Image - Visual focus without text overlays */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gray-50">
        <Image
          src={config.hubImage}
          alt={`Colección de ${config.subtitle}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-103"
          priority={sector === "scrubs" || sector === "universitario"}
        />
      </div>

      {/* Information Panel - Sólido, altamente legible, contraste AAA */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Badge & Product Count */}
          <div className="mb-2.5 flex items-center justify-between gap-2">
            <div className="text-secondary flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[16px]"
                aria-hidden="true"
              >
                {config.icon}
              </span>
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                {config.subtitle}
              </span>
            </div>
            <span className="bg-surface-container text-primary rounded-full px-2.5 py-0.5 text-[10px] font-semibold">
              {productCount} {productCount === 1 ? "prenda" : "prendas"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-primary group-hover:text-tertiary font-serif text-lg leading-tight font-bold transition-colors sm:text-xl">
            {config.subtitle}
          </h2>

          {/* Description / Tagline */}
          <p className="text-on-surface-variant mt-2 line-clamp-2 text-xs leading-relaxed sm:text-sm">
            {config.hubTagline}
          </p>
        </div>

        {/* Action Button Link */}
        <div className="text-primary group-hover:text-tertiary mt-5 flex items-center gap-1 text-xs font-bold tracking-wider uppercase transition-colors">
          <span>Explorar colección</span>
          <span
            className="material-symbols-outlined text-[14px] transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CategoryHubClient() {
  // Compute product counts per sector
  const productCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const sector of SECTOR_ORDER) {
      counts[sector] = ALL_PRODUCTS.filter((p) => p.sector === sector).length;
    }
    return counts;
  }, []);

  return (
    <>
      {/* Category Grid */}
      <section className="bg-surface px-5 py-10 md:px-8 md:py-14">
        <div className="mx-auto max-w-screen-2xl">
          {/* Section header */}
          <div className="mb-8 flex flex-col items-center text-center md:mb-12">
            <h1 className="section-title">Nuestro Catálogo</h1>
            <p className="text-on-surface-variant mt-3 max-w-xl text-sm leading-relaxed md:text-base">
              Selecciona la categoría que necesitas y explora productos
              diseñados para tu profesión, institución o equipo.
            </p>
          </div>

          {/* Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {SECTOR_ORDER.map((sector) => (
              <CategoryCard
                key={sector}
                sector={sector}
                productCount={productCounts[sector] ?? 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section
        className="bg-surface-container-low border-t border-gray-200 px-5 py-8 md:px-8"
        aria-label="Garantías del servicio"
      >
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-5 md:grid-cols-4">
          {[
            { icon: "local_shipping", text: "Envío a todo El Salvador" },
            { icon: "payments", text: "Pago al recibir" },
            { icon: "verified", text: "Confección garantizada" },
            { icon: "support_agent", text: "Atención personalizada" },
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
    </>
  );
}
