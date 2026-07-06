"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function AyudaLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando centro de ayuda..."
      className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20"
    >
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <Shimmer className="h-12 w-64 md:h-16" />
        <Shimmer className="h-6 w-full max-w-lg" />
        <Shimmer className="h-12 w-full max-w-md rounded-xl" />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 rounded-2xl border border-gray-100 p-6 shadow-sm"
          >
            <Shimmer className="h-10 w-10 rounded-full" />
            <Shimmer className="h-6 w-3/4" />
            <Shimmer className="h-4 w-full" />
            <Shimmer className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
}
