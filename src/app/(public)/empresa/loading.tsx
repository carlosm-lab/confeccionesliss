"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function EmpresaLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando información corporativa..."
      className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <Shimmer className="h-12 w-80 md:h-16" />
        <Shimmer className="h-6 w-full max-w-xl" />
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-4 rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <Shimmer className="h-12 w-12 rounded-xl" />
            <Shimmer className="h-7 w-3/4" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
            <Shimmer className="mt-2 h-10 w-32 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
