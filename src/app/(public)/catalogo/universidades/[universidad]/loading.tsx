"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

function ProductCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl bg-white shadow-sm">
      <Shimmer className="aspect-[3/4] w-full" />
      <div className="flex flex-col gap-2 p-3">
        <Shimmer className="h-4 w-5/6" />
        <Shimmer className="h-4 w-2/3" />
        <Shimmer className="h-5 w-1/3" />
      </div>
    </div>
  );
}

export default function UniversidadLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando catálogo de universidad"
      className="mx-auto max-w-screen-2xl px-5 py-8 md:px-8"
    >
      {/* Breadcrumb — 4 niveles */}
      <div className="mb-6 flex items-center gap-2">
        <Shimmer className="h-4 w-12" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-20" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-28" />
        <Shimmer className="h-4 w-4 rounded-full" />
        <Shimmer className="h-4 w-16" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        {/* Sidebar skeleton */}
        <div className="w-full shrink-0 lg:w-72">
          <div className="rounded-2xl border border-slate-100 bg-white p-5">
            <Shimmer className="mb-4 h-5 w-24" />
            <div className="flex flex-col gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Shimmer key={i} className="h-10 w-full rounded-xl" />
              ))}
            </div>
            <div className="mt-6">
              <Shimmer className="mb-4 h-5 w-16" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Shimmer key={i} className="h-9 w-12 rounded-lg" />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product area skeleton */}
        <div className="w-full flex-1">
          <Shimmer className="mb-6 h-10 w-64" />
          <Shimmer className="mb-8 h-4 w-48" />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-5 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
