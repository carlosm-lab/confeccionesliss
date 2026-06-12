"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Sector } from "@/data/types";
import { siteConfig } from "@/config/site";

interface ProductCardProps {
  id: string;
  nombre: string;
  sector: Sector;
  precio: number;
  precioAnterior?: number | null;
  categoria: string;
  imagen?: string | null;
  imageAlt?: string;
  tallas?: string[];
  showBadge?: boolean;
  badgeText?: string;
  showFavorite?: boolean;
  isFavorited?: boolean;
  pricePrefix?: string;
  priceSuffix?: string;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
}

export function ProductCard({
  id,
  nombre,
  sector,
  precio,
  precioAnterior,
  categoria,
  imagen,
  imageAlt,
  tallas = [],
  showBadge = false,
  badgeText,
  showFavorite = false,
  isFavorited = false,
  pricePrefix,
  priceSuffix,
  onAddToCart,
  onToggleFavorite,
  className,
}: ProductCardProps) {
  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart();
    } else {
      // Default: redirect to WhatsApp with product info
      const message = encodeURIComponent(
        `¡Hola! Me interesa el producto: ${nombre} ($${precio.toFixed(2)}). ¿Está disponible?`
      );
      window.open(
        `${siteConfig.links.whatsappDirect}?text=${message}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    onToggleFavorite?.();
  }

  return (
    <div
      className={cn(
        "group hover:border-primary/20 relative flex h-full flex-col overflow-hidden rounded-xl border border-transparent bg-white shadow-sm transition-all hover:shadow-md focus-visible:outline-none",
        className
      )}
    >
      {/* Imagen */}
      <div className="bg-surface-container-low relative aspect-square min-h-[140px] w-full overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={imageAlt ?? nombre}
            width={400}
            height={400}
            className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 motion-safe:group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center bg-gray-200"
            aria-hidden="true"
          >
            <span
              className="material-symbols-outlined text-4xl text-gray-400"
              aria-hidden="true"
            >
              image
            </span>
          </div>
        )}

        {/* Badge */}
        {showBadge && badgeText && (
          <span
            className="bg-tertiary absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase"
            role="status"
          >
            <span className="sr-only">Estado del producto: </span>
            {badgeText}
          </span>
        )}

        {/* Favorito */}
        {showFavorite && (
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={
              isFavorited
                ? `Quitar ${nombre} de favoritos`
                : `Agregar ${nombre} a favoritos`
            }
            className="focus-visible:ring-primary absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110 focus-visible:ring-2"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                isFavorited ? "fill-tertiary text-tertiary" : "text-gray-400"
              )}
            />
          </button>
        )}
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col space-y-1.5 p-3 sm:space-y-2 sm:p-4">
        {/* Categoría */}
        <span className="text-[10px] font-medium tracking-wide text-gray-500 uppercase sm:text-xs">
          {categoria}
        </span>

        {/* Nombre */}
        <h3 className="text-on-surface line-clamp-2 text-xs font-semibold sm:text-sm">
          {nombre}
        </h3>

        {/* Precio */}
        <div className="flex items-center gap-2">
          {pricePrefix && (
            <span className="text-on-surface-variant text-xs">
              {pricePrefix}
            </span>
          )}
          <span className="text-primary text-base font-bold sm:text-lg">
            ${precio.toFixed(2)}
          </span>
          {priceSuffix && (
            <span className="text-on-surface-variant text-xs font-normal">
              {priceSuffix}
            </span>
          )}
          {precioAnterior && (
            <>
              <span className="sr-only">
                Precio anterior: ${precioAnterior.toFixed(2)}
              </span>
              <span
                className="text-sm text-gray-400 line-through"
                aria-hidden="true"
              >
                ${precioAnterior.toFixed(2)}
              </span>
            </>
          )}
        </div>

        {/* Tallas */}
        {tallas.length > 0 && (
          <div className="flex flex-wrap gap-1" aria-label="Tallas disponibles">
            {tallas.slice(0, 5).map((talla) => (
              <span
                key={talla}
                className="flex size-6 items-center justify-center rounded-full border border-gray-200 text-[9px] font-medium text-gray-500"
              >
                {talla}
              </span>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={handleAddToCart}
          aria-label={`Agregar al carrito: ${nombre}`}
          className="bg-primary focus-visible:ring-primary mt-auto w-full cursor-pointer rounded-lg py-2 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:ring-offset-2 sm:py-2.5 sm:text-sm"
        >
          Agregar al carrito
          <span className="sr-only">: {nombre}</span>
        </button>
      </div>
    </div>
  );
}
