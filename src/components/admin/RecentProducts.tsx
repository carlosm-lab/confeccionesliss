"use client";

import { Icon } from "@/components/ui/icons/Icon";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";

interface Product {
  id: string;
  name: string;
  price: number;
  image_path?: string | null;
}

interface RecentProductsProps {
  products: Product[];
  loading: boolean;
}

export default function RecentProducts({
  products,
  loading,
}: RecentProductsProps) {
  if (loading) {
    return (
      <div className="border-primary/30 dark:border-primary/20 h-full rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Productos Recientes
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex animate-pulse items-center gap-4">
              <div className="h-12 w-12 shrink-0 rounded-lg bg-slate-200 dark:bg-white/10"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-slate-200 dark:bg-white/10"></div>
                <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-white/10"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="border-primary/30 dark:border-primary/20 flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
          Productos Recientes
        </h3>
        <Link
          href="/admin/products"
          className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
        >
          Ver todos
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          No hay productos recientes.
        </p>
      ) : (
        <div className="custom-scrollbar flex-1 overflow-y-auto">
          <ul className="divide-y divide-slate-100 dark:divide-white/5">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between gap-4 py-3"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-slate-100 dark:bg-white/10">
                    {product.image_path ? (
                      <Image
                        src={product.image_path}
                        alt={product.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-slate-400">
                        <Icon name="image" size={20} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {product.name}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {formatPrice(product.price)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
