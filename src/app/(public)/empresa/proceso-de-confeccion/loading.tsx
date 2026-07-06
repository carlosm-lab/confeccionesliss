"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function ProcesoDeConfeccionLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando proceso de confección..."
      className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20"
    >
      <Shimmer className="mb-4 h-5 w-32" />
      <Shimmer className="mb-6 h-12 w-3/4 max-w-xl md:h-16" />
      <Shimmer className="mb-10 h-6 w-full max-w-2xl" />
      <div className="flex flex-col gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 md:flex-row md:items-center"
          >
            <Shimmer className="h-48 w-full rounded-2xl md:w-1/2" />
            <div className="flex flex-col gap-2 md:w-1/2">
              <Shimmer className="h-8 w-48" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-5/6" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
