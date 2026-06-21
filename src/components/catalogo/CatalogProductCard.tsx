"use client";

/**
 * CatalogProductCard — Confecciones Liss
 * Usa DbProduct (schema de Supabase) directamente.
 * Compatible con el catálogo dinámico conectado a la BD.
 */

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useFavorites } from "@/context/FavoritesContext";
import {
  getProductMainImage,
  isProductOnSale,
  getProductSector,
  type DbProduct,
} from "@/lib/catalogService";

interface CatalogProductCardProps {
  product: DbProduct;
  /** Set to true for above-the-fold images to optimize LCP. */
  priority?: boolean;
}

export function CatalogProductCard({
  product,
  priority = false,
}: CatalogProductCardProps) {
  const imagen = getProductMainImage(product);
  const onSale = isProductOnSale(product);
  const sector = getProductSector(product);
  const slug = product.slug ?? product.id;

  const priceBySize = (
    product as { price_by_size?: Record<string, number> | null }
  ).price_by_size;
  const offerBySize = (
    product as { offer_by_size?: Record<string, number> | null }
  ).offer_by_size;

  // Precio base mínimo (de price_by_size o global)
  const minBasePrice =
    priceBySize && Object.keys(priceBySize).length > 0
      ? Math.min(...Object.values(priceBySize))
      : Number(product.price);

  // Precio de oferta mínimo — lee offer_by_size directamente, independiente de onSale
  // Solo cuenta como oferta si el precio de oferta es MENOR al precio base de esa talla
  const validOfferEntries =
    offerBySize && priceBySize
      ? Object.entries(offerBySize).filter(([talla, offerP]) => {
          const baseP = priceBySize[talla];
          return baseP !== undefined && offerP < baseP;
        })
      : [];
  const minOfferPrice =
    validOfferEntries.length > 0
      ? Math.min(...validOfferEntries.map(([, p]) => p))
      : null;

  const displayPrice = minOfferPrice !== null ? minOfferPrice : minBasePrice;
  const hasMultiplePrices = priceBySize && Object.keys(priceBySize).length > 1;
  const price = displayPrice;

  // Precio tachado: el precio base mínimo cuando hay oferta válida
  // GUARDIA: solo mostrar si es estrictamente MAYOR al precio mostrado
  const rawOldPrice =
    minOfferPrice !== null
      ? minBasePrice
      : product.old_price
        ? Number(product.old_price)
        : null;
  const oldPrice =
    rawOldPrice !== null && rawOldPrice > displayPrice ? rawOldPrice : null;

  // Contextos reales
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFavorited = isFavorite(product.id);

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  }

  return (
    <article
      data-testid="product-card"
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      {/* Badges top-left */}
      <div className="pointer-events-none absolute top-[var(--space-md)] left-[var(--space-md)] z-[20] flex flex-col gap-[var(--space-xs)]">
        {onSale && (
          <span
            className="bg-primary rounded-full px-[var(--space-xs)] py-[0.25rem] font-black tracking-widest text-white uppercase shadow-sm select-none sm:px-[var(--space-sm)]"
            style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.625rem)" }}
          >
            ¡Oferta!
          </span>
        )}
      </div>

      {/* Favorite button top-right */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-[var(--space-sm)] right-[var(--space-sm)] z-[20] flex h-9 w-9 items-center justify-center rounded-full bg-black/20 backdrop-blur-sm transition-all duration-300 hover:bg-black/30 active:scale-90"
        aria-label="Alternar Favorito"
      >
        <span
          className={cn(
            "material-symbols-outlined drop-shadow-[0_0px_4px_rgba(0,0,0,0.8)] transition-colors",
            isFavorited ? "text-primary" : "text-white"
          )}
          style={{
            fontSize: "20px",
            fontVariationSettings: "'FILL' 1",
          }}
        >
          favorite
        </span>
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-white">
        {imagen ? (
          <Image
            src={imagen}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority={priority}
            unoptimized={
              imagen.startsWith("http") && !imagen.includes("supabase.co")
            }
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-50">
            <span
              className="material-symbols-outlined text-4xl text-gray-300"
              aria-hidden="true"
            >
              checkroom
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="group-hover:text-primary pointer-events-none truncate text-sm font-bold text-slate-900 transition-colors">
          {product.name}
        </h3>

        {product.short_description && (
          <p className="pointer-events-none line-clamp-1 text-[11px] text-slate-500">
            {product.short_description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-1 pt-1 select-none">
          <span className="text-primary pointer-events-none text-base font-bold">
            {hasMultiplePrices ? "Desde " : ""}${price.toFixed(2)}
          </span>
          {onSale && oldPrice && (
            <span className="pointer-events-none text-xs text-slate-400 line-through decoration-slate-400/50">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Full-card link */}
      <Link
        href={`/catalogo/${sector}/${slug}`}
        className="absolute inset-0 z-[10]"
        aria-label={`Ver detalles de ${product.name}`}
        prefetch={false}
      />
    </article>
  );
}
