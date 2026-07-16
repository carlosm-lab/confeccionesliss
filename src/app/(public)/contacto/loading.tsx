"use client";

import { useEffect } from "react";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
    />
  );
}

export default function ContactoLoading() {
  return (
    <div
      aria-busy="true"
      aria-label="Cargando contacto"
      className="mx-auto max-w-screen-xl px-5 py-12 md:px-8 md:py-20"
    >
      {/* Heading */}
      <div className="mb-12 flex flex-col items-center gap-4">
        <Shimmer className="h-12 w-72" />
        <Shimmer className="h-5 w-96" />
      </div>

      {/* 2-column card */}
      <div className="grid grid-cols-1 gap-0 overflow-hidden rounded-2xl shadow-lg md:grid-cols-2">
        {/* Info panel (left) */}
        <div className="flex flex-col gap-6 p-8 md:p-10">
          <Shimmer className="h-7 w-48" />
          <div className="flex flex-col gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Shimmer className="h-10 w-10 rounded-full" />
                <div className="flex flex-col gap-1.5">
                  <Shimmer className="h-4 w-24" />
                  <Shimmer className="h-4 w-40" />
                </div>
              </div>
            ))}
          </div>
          <Shimmer className="mt-4 h-12 w-full rounded-lg" />
        </div>

        {/* Form panel (right) */}
        <div className="flex flex-col gap-5 bg-gray-50 p-8 md:p-10">
          <Shimmer className="h-7 w-40" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Shimmer className="h-4 w-20" />
              <Shimmer className="h-12 w-full rounded-lg" />
            </div>
            <div className="flex flex-col gap-1.5">
              <Shimmer className="h-4 w-20" />
              <Shimmer className="h-12 w-full rounded-lg" />
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-24" />
            <Shimmer className="h-12 w-full rounded-lg" />
          </div>
          <div className="flex flex-col gap-1.5">
            <Shimmer className="h-4 w-28" />
            <Shimmer className="h-32 w-full rounded-lg" />
          </div>
          <Shimmer className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
