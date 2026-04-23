"use client";

import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: string;
  nombre: string;
  precio: number;
  precioAnterior?: number | null;
  categoria: string;
  imagen?: string | null;
  tallas?: string[];
  showBadge?: boolean;
  badgeText?: string;
  showFavorite?: boolean;
  isFavorited?: boolean;
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  className?: string;
}

export function ProductCard({
  nombre,
  precio,
  precioAnterior,
  categoria,
  tallas = [],
  showBadge = false,
  badgeText,
  showFavorite = false,
  isFavorited = false,
  onAddToCart,
  onToggleFavorite,
  className,
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md",
        className
      )}
    >
      {/* Imagen Placeholder */}
      <div className="relative aspect-square w-full bg-gray-200">
        {/* Badge */}
        {showBadge && badgeText && (
          <span className="bg-brand-accent absolute top-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white uppercase">
            {badgeText}
          </span>
        )}

        {/* Favorito */}
        {showFavorite && (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            aria-label={
              isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"
            }
            className="absolute top-3 right-3 flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/90 shadow-sm transition-transform hover:scale-110"
          >
            <Heart
              className={cn(
                "size-4 transition-colors",
                isFavorited
                  ? "fill-brand-accent text-brand-accent"
                  : "text-gray-400"
              )}
            />
          </button>
        )}
      </div>

      {/* Contenido */}
      <div className="space-y-2 p-4">
        {/* Categoría */}
        <span className="text-xs font-medium tracking-wide text-gray-500 uppercase">
          {categoria}
        </span>

        {/* Nombre */}
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {nombre}
        </h3>

        {/* Precio */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ${precio.toFixed(2)}
          </span>
          {precioAnterior && (
            <span className="text-sm text-gray-400 line-through">
              ${precioAnterior.toFixed(2)}
            </span>
          )}
        </div>

        {/* Tallas */}
        {tallas.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {tallas.slice(0, 6).map((talla) => (
              <span
                key={talla}
                className="flex size-6 items-center justify-center rounded-full border border-gray-200 text-[9px] font-medium text-gray-500"
              >
                {talla}
              </span>
            ))}
          </div>
        )}

        {/* Botón Agregar */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onAddToCart?.();
          }}
          className="bg-brand-primary mt-1 w-full cursor-pointer rounded-lg py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
