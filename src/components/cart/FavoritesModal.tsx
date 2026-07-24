"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFavorites } from "@/context/FavoritesContext";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { formatPrice } from "@/lib/formatPrice";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useModal } from "@/hooks/useModal";
import { logger } from "@/lib/logger";
import { FAVORITES_SELECT_COLUMNS } from "@/lib/constants";
import FocusLock from "react-focus-lock";
import { getProductUrl } from "@/lib/productShared";

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image_path?: string | null;
  images?: string[] | null;
  slug?: string | null;
  is_active?: boolean;
  category_id?: string;
  sector?: string | null;
  category?: string | null;
  categories?: { name: string; catalog: string } | null;
}

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FavoritesModal({ isOpen, onClose }: FavoritesModalProps) {
  const { favorites, toggleFavorite } = useFavorites();
  const [products, setProducts] = useState<FavoriteProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { modalRef } = useModal({ isOpen, onClose });

  useBodyScrollLock(isOpen);

  const fetchFavorites = useCallback(async () => {
    if (favorites.length === 0) {
      setProducts([]);
      return;
    }

    // Solo mostrar spinner en la carga inicial (no cuando se borra un favorito):
    // usamos setProducts en forma funcional para leer el estado actual sin
    // añadir `products` a las deps (evita el ciclo infinito).
    setProducts((prev) => {
      if (prev.length === 0) setLoading(true);
      return prev;
    });

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("products")
        .select(FAVORITES_SELECT_COLUMNS)
        .in("id", favorites)
        .eq("is_active", true);

      if (error) throw error;

      setProducts((data as FavoriteProduct[]) || []);
    } catch (err) {
      logger.error("Error fetching favorite products", err);
    } finally {
      setLoading(false);
    }
  }, [favorites]);

  useEffect(() => {
    if (!isOpen) return;
    fetchFavorites();
  }, [isOpen, favorites, fetchFavorites]);

  // Swipe-down-to-close (mobile bottom sheet)
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartY = useRef(0);

  const handleDragStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
    setIsDragging(true);
  };
  const handleDragMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - touchStartY.current;
    if (delta > 0) setDragY(delta);
  };
  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragY > 100) {
      setDragY(0);
      onClose();
    } else {
      setDragY(0);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="animate-in fade-in fixed inset-0 z-[100] flex w-full cursor-default items-end justify-center bg-black/30 backdrop-blur-[2px] duration-200 sm:items-center sm:bg-black/20 sm:p-4"
        onClick={onClose}
        aria-hidden="true"
      >
        <div
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="flex w-full max-w-2xl sm:max-h-[90vh]"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="favorites-modal-title"
            className="flex w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-h-[90vh] sm:rounded-3xl"
            style={{
              transform: `translateY(${dragY}px)`,
              transition: isDragging
                ? "none"
                : "transform 0.35s cubic-bezier(0.32,0.72,0,1), opacity 0.35s ease",
              opacity: Math.max(0, 1 - dragY / 350),
            }}
          >
            <FocusLock returnFocus className="flex h-full w-full flex-col">
              {/* Drag handle - mobile only */}
              <div
                className="flex shrink-0 touch-none justify-center pt-3 pb-1 sm:hidden"
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
              >
                <div className="h-1 w-10 rounded-full bg-slate-300" />
              </div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <h2
                  id="favorites-modal-title"
                  className="flex items-center gap-2 font-serif text-2xl font-bold"
                >
                  <Icon name="favorite" fill className="text-primary" />
                  Mis Favoritos
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                  aria-label="Cerrar favoritos"
                >
                  <Icon name="close" />
                </button>
              </div>

              {/* Content */}
              <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex justify-center p-12">
                    <Icon
                      name="progress_activity"
                      size={48}
                      className="text-primary animate-spin text-5xl"
                    />
                  </div>
                ) : products.length === 0 ? (
                  <div className="p-12 text-center">
                    <Icon
                      name="favorite_border"
                      className="mb-4 block text-6xl text-gray-300"
                    />
                    <p className="text-gray-500">
                      Aún no tienes productos favoritos guardados.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        router.push("/catalogo");
                      }}
                      className="bg-primary text-on-primary mt-6 rounded-full px-8 py-3 font-bold shadow-md transition-all hover:scale-105 hover:opacity-90"
                    >
                      Explorar Catálogo
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {products
                      .filter((p) => favorites.includes(p.id))
                      .map((product) => (
                        <Link
                          key={product.id}
                          href={getProductUrl(product as any)}
                          onClick={onClose}
                          className="group relative flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-all hover:shadow-md"
                        >
                          <div className="aspect-square w-[clamp(4.5rem,15vw,6rem)] shrink-0 overflow-hidden rounded-xl bg-white">
                            <Image
                              src={
                                product.image_path ||
                                product.images?.[0] ||
                                "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'><rect width='96' height='96' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='10'>Sin Imagen</text></svg>"
                              }
                              alt={product.name}
                              width={96}
                              height={96}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex flex-1 flex-col justify-center pr-10">
                            <h3 className="group-hover:text-primary line-clamp-1 text-lg font-bold text-slate-800 transition-colors">
                              {product.name}
                            </h3>
                            <p className="text-primary mt-1 text-xl font-bold">
                              {formatPrice(product.price)}
                            </p>
                          </div>

                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFavorite(product.id);
                            }}
                            className="absolute top-1/2 right-4 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
                            aria-label="Quitar de favoritos"
                          >
                            <Icon
                              name="favorite"
                              fill
                              className="text-primary"
                            />
                          </button>
                        </Link>
                      ))}
                  </div>
                )}
              </div>
            </FocusLock>
          </div>
        </div>
      </div>
    </>
  );
}
