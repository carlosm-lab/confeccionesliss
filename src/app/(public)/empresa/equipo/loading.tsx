"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function EquipoLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando..."
      className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20"
    >
      <Shimmer className="mb-4 h-5 w-32" />
      <Shimmer className="mb-6 h-12 w-3/4 max-w-xl md:h-16" />
      <Shimmer className="mb-10 h-6 w-full max-w-2xl" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-6"
          >
            <Shimmer className="h-40 w-full rounded-xl" />
            <Shimmer className="h-6 w-3/4" />
            <Shimmer className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
