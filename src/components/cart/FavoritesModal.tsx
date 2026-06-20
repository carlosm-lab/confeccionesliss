"use client";

import { useEffect, useState, useCallback } from "react";
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

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image_path?: string | null;
  images?: string[] | null;
  slug?: string | null;
  is_active?: boolean;
  category_id?: string;
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

    // Solo mostrar spinner en la carga inicial (no cuando se borra un favorito)
    if (products.length === 0) {
      setLoading(true);
    }

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
  }, [favorites, products.length]);

  useEffect(() => {
    if (!isOpen) return;
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, favorites]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop — div con onClick para cerrar al hacer click fuera */}
      <div
        className="animate-in fade-in fixed inset-0 z-[100] flex w-full cursor-default items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm duration-200"
        onClick={onClose}
        aria-hidden="true"
      >
        {/* presentation div stops click propagation so clicking inside the dialog doesn't close it */}
        <div
          role="presentation"
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
          className="flex max-h-[90vh] w-full max-w-2xl"
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="favorites-modal-title"
            className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
          >
            <FocusLock returnFocus className="flex h-full w-full flex-col">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <h2
                  id="favorites-modal-title"
                  className="flex items-center gap-2 font-serif text-2xl font-bold"
                >
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                  Mis Favoritos
                </h2>
                <button
                  onClick={onClose}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
                  aria-label="Cerrar favoritos"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    close
                  </span>
                </button>
              </div>

              {/* Content */}
              <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
                {loading ? (
                  <div className="flex justify-center p-12">
                    <span className="material-symbols-outlined text-primary animate-spin text-5xl">
                      progress_activity
                    </span>
                  </div>
                ) : products.length === 0 ? (
                  <div className="p-12 text-center">
                    <span className="material-symbols-outlined mb-4 block text-6xl text-gray-300">
                      favorite_border
                    </span>
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
                          href={
                            product.slug
                              ? `/catalogo/${product.slug}`
                              : "/catalogo"
                          }
                          onClick={onClose}
                          className="group relative flex items-center gap-4 rounded-2xl bg-gray-50 p-4 transition-all hover:shadow-md"
                        >
                          <div className="aspect-square w-[clamp(4.5rem,15vw,6rem)] shrink-0 overflow-hidden rounded-xl bg-white">
                            <Image
                              src={
                                product.image_path ||
                                product.images?.[0] ||
                                "https://placehold.co/200x200?text=Sin+Imagen"
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
                            <span
                              className="material-symbols-outlined text-primary"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              favorite
                            </span>
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
