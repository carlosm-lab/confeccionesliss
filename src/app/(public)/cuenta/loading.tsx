"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function CuentaLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando cuenta"
      className="mx-auto max-w-screen-xl px-5 py-10 md:px-8"
    >
      {/* Header */}
      <div className="mb-8 flex flex-col gap-2">
        <Shimmer className="h-10 w-48" />
        <Shimmer className="h-5 w-64" />
      </div>

      {/* Tabs */}
      <div className="mb-6 flex gap-2 overflow-x-hidden">
        {Array.from({ length: 4 }).map((_, i) => (
          <Shimmer key={i} className="h-10 w-32 flex-shrink-0 rounded-full" />
        ))}
      </div>

      {/* Content panel */}
      <div className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
        {/* Profile section */}
        <div className="mb-8 flex items-center gap-5">
          <Shimmer className="h-20 w-20 rounded-full" />
          <div className="flex flex-col gap-2">
            <Shimmer className="h-7 w-40" />
            <Shimmer className="h-5 w-56" />
          </div>
        </div>

        {/* Form fields */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1.5">
              <Shimmer className="h-4 w-24" />
              <Shimmer className="h-12 w-full rounded-lg" />
            </div>
          ))}
        </div>

        {/* Favorites list */}
        <div className="mt-10 flex flex-col gap-4">
          <Shimmer className="h-7 w-36" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2">
                <Shimmer className="aspect-[3/4] w-full rounded-xl" />
                <Shimmer className="h-4 w-3/4" />
                <Shimmer className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
