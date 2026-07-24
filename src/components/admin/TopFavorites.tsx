"use client";

import { Icon } from "@/components/ui/icons/Icon";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";

interface FavoriteProduct {
  id: string;
  name: string;
  price: number;
  image_path?: string | null;
  fav_count: number;
}

interface TopFavoritesProps {
  products: FavoriteProduct[];
  loading: boolean;
}

export default function TopFavorites({ products, loading }: TopFavoritesProps) {
  if (loading) {
    return (
      <div className="border-primary/30 dark:border-primary/20 h-full rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Top Favoritos
        </h3>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex animate-pulse items-center gap-4">
              <div className="h-10 w-10 shrink-0 rounded bg-slate-200 dark:bg-white/10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-3 w-3/4 rounded bg-slate-200 dark:bg-white/10"></div>
              </div>
              <div className="h-8 w-8 shrink-0 rounded-full bg-slate-200 dark:bg-white/10"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-primary/30 dark:border-primary/20 flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
      <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
        Top Favoritos
      </h3>

      {products.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          Nadie ha guardado favoritos aún.
        </p>
      ) : (
        <div className="custom-scrollbar flex-1 overflow-y-auto px-1">
          <ul className="divide-y divide-slate-100 dark:divide-white/5">
            {products.map((product, idx) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-3 py-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative shrink-0">
                    <div className="relative h-12 w-12 overflow-hidden rounded-lg bg-slate-100 dark:bg-white/10">
                      {product.image_path ? (
                        <Image
                          src={product.image_path}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="48px"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-400">
                          <Icon name="image" size={20} />
                        </div>
                      )}
                    </div>
                    {/* Rank badge */}
                    <div className="bg-primary absolute -top-2 -left-2 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white shadow-md dark:border-slate-900">
                      {idx + 1}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {product.name}
                    </p>
                    <p className="truncate text-[10px] text-slate-500 dark:text-slate-400">
                      {formatPrice(product.price)}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-center justify-center rounded-lg bg-pink-50 px-3 py-1.5 dark:bg-pink-900/10">
                  <Icon
                    name="favorite"
                    size={16}
                    className="mb-0.5 text-pink-500"
                  />
                  <span className="text-xs font-bold text-pink-600 dark:text-pink-400">
                    {product.fav_count}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
