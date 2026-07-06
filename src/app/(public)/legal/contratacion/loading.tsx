"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function ContratacionLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando política..."
      className="mx-auto max-w-screen-md px-5 py-12 md:px-8 md:py-20"
    >
      <Shimmer className="mb-4 h-5 w-32" />
      <Shimmer className="mb-6 h-10 w-3/4" />
      <Shimmer className="mb-8 h-4 w-full" />
      <div className="flex flex-col gap-4">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
        <Shimmer className="h-4 w-4/6" />
        <Shimmer className="mt-4 h-6 w-1/2" />
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-full" />
      </div>
    </div>
  );
}
