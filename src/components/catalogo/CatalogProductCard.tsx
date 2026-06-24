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

  // Precio de oferta mínimo — solo si es MENOR al base de esa talla
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

  // Precio tachado: solo si es estrictamente MAYOR al precio mostrado
  const rawOldPrice =
    minOfferPrice !== null
      ? minBasePrice
      : product.old_price
        ? Number(product.old_price)
        : null;
  const oldPrice =
    rawOldPrice !== null && rawOldPrice > displayPrice ? rawOldPrice : null;

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
      className="group border-primary/35 hover:border-primary/55 relative flex h-full w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
    >
      {/* Badge OFERTA */}
      {onSale && (
        <div className="pointer-events-none absolute top-2 left-2 z-[20]">
          <span
            className="rounded-full bg-red-500 px-2 py-0.5 font-bold text-white shadow-sm select-none"
            style={{
              fontSize: "clamp(0.45rem, 1.5vw, 0.6rem)",
              letterSpacing: "0.05em",
            }}
          >
            OFERTA
          </span>
        </div>
      )}

      {/* Favorito — idéntico a la vista de detalle */}
      <button
        type="button"
        onClick={handleToggleFavorite}
        className="absolute top-2 right-2 z-[20] flex h-7 w-7 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-110 active:scale-95"
        aria-label={isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"}
      >
        <span
          className="material-symbols-outlined text-[17px] text-red-500"
          style={{
            fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
          }}
        >
          favorite
        </span>
      </button>

      {/* Imagen — aspect-ratio 4/5 para uniformes (retrato natural) */}
      <div className="relative aspect-[4/5] overflow-hidden bg-white">
        {imagen ? (
          <Image
            src={imagen}
            alt={product.name}
            fill
            sizes="(max-width: 480px) 50vw, (max-width: 768px) 40vw, (max-width: 1280px) 30vw, 320px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            priority={priority}
            quality={90}
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

      {/* Contenido — solo título y precio */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Título completo, sin truncar, interlineado mínimo */}
        <h3 className="group-hover:text-primary pointer-events-none text-sm leading-tight font-bold text-slate-900 transition-colors">
          {product.name}
        </h3>

        {/* Precio: final a la izquierda, tachado a la derecha */}
        <div className="mt-auto flex items-center justify-between gap-1 pt-0.5 select-none">
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

      {/* Link de toda la tarjeta */}
      <Link
        href={
          sector === "universitario" && product.category
            ? // Soporte para slugs compuestos: "univo-enfermeria" → universidad = "univo"
              `/catalogo/universidades/${product.category.split("-")[0]}/${slug}`
            : `/catalogo/${sector}/${slug}`
        }
        className="absolute inset-0 z-[10]"
        aria-label={`Ver detalles de ${product.name}`}
        prefetch={false}
      />
    </article>
  );
}
