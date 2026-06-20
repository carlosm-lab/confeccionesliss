"use client";

/**
 * CatalogProductCard — Confecciones Liss
 * Usa DbProduct (schema de Supabase) directamente.
 * Compatible con el catálogo dinámico conectado a la BD.
 */

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
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

  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;

  // Contextos reales
  const { addToCart, setIsCartOpen } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFavorited = isFavorite(product.id);

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product.id);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: price,
      old_price: oldPrice,
      image_path: imagen,
      slug: `${sector}/${slug}`,
    });
    setIsCartOpen(true);
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
        {product.badge_text && !onSale && (
          <span
            className={cn(
              "rounded px-[var(--space-xs)] py-[0.25rem] font-black tracking-widest uppercase shadow-sm select-none",
              product.badge_text === "Premium"
                ? "bg-slate-900 text-white"
                : "bg-primary text-white"
            )}
            style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.625rem)" }}
          >
            {product.badge_text}
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
            ${price.toFixed(2)}
            {product.price_suffix && (
              <span className="ml-0.5 text-xs font-normal text-slate-500">
                {product.price_suffix}
              </span>
            )}
          </span>
          {onSale && oldPrice && (
            <span className="pointer-events-none text-xs text-slate-400 line-through decoration-slate-400/50">
              ${oldPrice.toFixed(2)}
            </span>
          )}
          <button
            onClick={handleAddToCart}
            className="hover:bg-primary text-primary relative z-[20] ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-all hover:text-white active:scale-90"
            aria-label="Añadir al carrito"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_shopping_cart
            </span>
          </button>
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
