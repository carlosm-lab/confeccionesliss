"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function UniversidadesLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando hub de universidades"
      className="min-h-screen"
    >
      {/* Hero skeleton */}
      <div className="relative w-full bg-gray-100" style={{ height: "85vh" }}>
        <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-200 to-gray-100" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
          <Shimmer className="h-6 w-32" />
          <Shimmer className="h-16 w-3/4 max-w-2xl" />
          <Shimmer className="h-10 w-48 rounded-full" />
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-10">
        <Shimmer className="mb-8 h-10 w-64" />
        <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Shimmer className="col-span-2 h-80 rounded-xl" />
          <Shimmer className="h-80 rounded-xl" />
        </div>
        <div className="mb-2 grid grid-cols-3 gap-2">
          <Shimmer className="h-64 rounded-xl" />
          <Shimmer className="h-64 rounded-xl" />
          <Shimmer className="h-64 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
