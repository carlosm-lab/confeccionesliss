"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function UniversityProductLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div
      aria-busy="true"
      aria-label="Cargando producto universitario"
      className="mx-auto max-w-screen-xl px-5 py-8 md:px-8"
    >
      {/* Breadcrumb — 5 niveles */}
      <div className="mb-6 flex items-center gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <Shimmer className="h-4 w-14" />
            {i < 4 && <Shimmer className="h-4 w-4 rounded-full" />}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <Shimmer className="aspect-square w-full rounded-2xl" />
        <div className="flex flex-col gap-4">
          <Shimmer className="h-8 w-3/4" />
          <Shimmer className="h-5 w-1/2" />
          <Shimmer className="h-12 w-1/3" />
          <Shimmer className="h-20 w-full" />
          <div className="flex gap-2">
            {["S", "M", "L", "XL"].map((s) => (
              <Shimmer key={s} className="h-10 w-12 rounded-xl" />
            ))}
          </div>
          <Shimmer className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </div>
  );
}
