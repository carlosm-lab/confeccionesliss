"use client";

/**
 * CatalogProductCard — Confecciones Liss
 * Copia EXACTA del ProductCard de Padilla Store:
 * - article relative overflow-hidden bg-white rounded-2xl border shadow-sm
 * - Link invisible inset-0 z-[1]
 * - Badges z-[2] pointer-events-none
 * - Favorite button z-[2] stopPropagation
 * - Imagen aspect-square object-contain bg-white
 * - Content: nombre, descripción, precio, botón carrito z-[2]
 */

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import type { CartProduct } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import type { Product } from "@/data/types";

interface CatalogProductCardProps {
  product: Product;
  // Props opcionales para compatibilidad hacia atrás (ahora se usan los contextos directamente)
  isFavorited?: boolean;
  onToggleFavorite?: (id: string) => void;
}

export function CatalogProductCard({ product }: CatalogProductCardProps) {
  const {
    id,
    nombre,
    sector,
    precio,
    precioAnterior,
    imagen,
    imageAlt,
    descripcion,
    showBadge,
    badgeText,
    priceSuffix,
  } = product;

  // Contextos reales
  const { addToCart, setIsCartOpen } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user, showAuthModal } = useAuth();

  const isFavorited = isFavorite(id);

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      showAuthModal("favorites");
      return;
    }
    toggleFavorite(id);
  }

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    // Construir un CartProduct desde el Product local
    addToCart({
      id,
      name: nombre,
      price: precio,
      old_price: precioAnterior ?? null,
      image_path: imagen,
      slug: `${sector}/${id}`,
    });
    // Abrir el drawer para que el usuario vea el item agregado
    setIsCartOpen(true);
  }

  const hasDiscount = precioAnterior != null && precioAnterior > precio;

  return (
    <article
      data-testid="product-card"
      className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      {/* Badges top-left */}
      <div className="pointer-events-none absolute top-[var(--space-md)] left-[var(--space-md)] z-[20] flex flex-col gap-[var(--space-xs)]">
        {hasDiscount && (
          <span
            className="bg-primary rounded-full px-[var(--space-xs)] py-[0.25rem] font-black tracking-widest text-white uppercase shadow-sm select-none sm:px-[var(--space-sm)]"
            style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.625rem)" }}
          >
            ¡Oferta!
          </span>
        )}
        {showBadge && badgeText && !hasDiscount && (
          <span
            className={cn(
              "rounded px-[var(--space-xs)] py-[0.25rem] font-black tracking-widest uppercase shadow-sm select-none",
              badgeText === "Premium"
                ? "bg-slate-900 text-white"
                : "bg-primary text-white"
            )}
            style={{ fontSize: "clamp(0.5rem, 0.8vw, 0.625rem)" }}
          >
            {badgeText}
          </span>
        )}
      </div>

      {/* Favorite button top-right */}
      <button
        onClick={handleToggleFavorite}
        className="absolute top-[var(--space-md)] right-[var(--space-md)] z-[20] p-[var(--space-xs)] transition-all duration-300"
        aria-label="Alternar Favorito"
      >
        <span
          className={cn(
            "material-symbols-outlined drop-shadow-[0_0px_4px_rgba(0,0,0,0.8)] transition-colors",
            isFavorited ? "text-primary" : "text-white hover:text-slate-200"
          )}
          style={{
            fontSize: "var(--icon-md)",
            fontVariationSettings: "'FILL' 1",
          }}
        >
          favorite
        </span>
      </button>

      {/* Image — bg-white prevents dark backgrounds showing through */}
      <div className="relative aspect-square overflow-hidden bg-white">
        {imagen ? (
          <Image
            src={imagen}
            alt={imageAlt ?? nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 240px"
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
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
          {nombre}
        </h3>

        {descripcion && (
          <p className="pointer-events-none line-clamp-1 text-[11px] text-slate-500">
            {descripcion}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-1 pt-1 select-none">
          <span className="text-primary pointer-events-none text-base font-bold">
            ${precio.toFixed(2)}
            {priceSuffix && (
              <span className="ml-0.5 text-xs font-normal text-slate-500">
                {priceSuffix}
              </span>
            )}
          </span>
          {hasDiscount && (
            <span className="pointer-events-none text-xs text-slate-400 line-through decoration-slate-400/50">
              ${precioAnterior!.toFixed(2)}
            </span>
          )}
          <button
            onClick={handleAddToCart}
            className="hover:bg-primary text-primary relative z-[20] ml-auto rounded-lg bg-slate-100 p-1 transition-all hover:text-white"
            aria-label="Añadir al carrito"
          >
            <span className="material-symbols-outlined text-[18px]">
              add_shopping_cart
            </span>
          </button>
        </div>
      </div>

      {/* Full-card link — sits above image and text (default stacks) but below active buttons */}
      <Link
        href={`/catalogo/${sector}/${id}`}
        className="absolute inset-0 z-[10]"
        aria-label={`Ver detalles de ${nombre}`}
        prefetch={false}
      />
    </article>
  );
}
