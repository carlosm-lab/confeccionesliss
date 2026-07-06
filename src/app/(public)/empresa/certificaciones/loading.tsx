"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function CertificacionesLoading() {
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
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Shimmer className="h-80 w-full rounded-2xl" />
        <div className="flex flex-col gap-4">
          <Shimmer className="h-8 w-56" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-full" />
          <Shimmer className="h-4 w-5/6" />
          <Shimmer className="h-4 w-4/6" />
        </div>
      </div>
    </div>
  );
}
