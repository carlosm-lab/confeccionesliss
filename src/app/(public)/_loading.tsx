"use client";

import { useEffect } from "react";

function Shimmer({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-200 dark:bg-gray-700 ${className ?? ""}`}
      style={style}
    />
  );
}

function HeroSkeleton() {
  return (
    <section className="bg-surface-container-low relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Text column */}
        <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
          <Shimmer className="mb-6 h-12 w-3/4 md:h-16 lg:h-20" />
          <Shimmer className="mb-2 h-5 w-full md:h-6" />
          <Shimmer className="mb-2 h-5 w-5/6 md:h-6" />
          <Shimmer className="mb-8 h-5 w-4/6 md:h-6" />
          {/* Badge grid */}
          <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <Shimmer key={i} className="h-9 w-full rounded-full" />
            ))}
          </div>
          {/* CTA buttons */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <Shimmer className="h-12 w-full flex-1 rounded-md" />
            <Shimmer className="h-12 w-full flex-1 rounded-md" />
          </div>
        </div>
        {/* Image column – desktop */}
        <div className="hidden h-full lg:flex lg:w-[40%] lg:items-center">
          <Shimmer
            className="h-full w-full rounded-2xl"
            style={{ minHeight: "560px" }}
          />
        </div>
        {/* Image column – mobile/tablet */}
        <div className="relative w-full max-w-sm self-center md:order-2 md:h-full md:max-w-none lg:hidden">
          <Shimmer className="aspect-[4/5] w-full rounded-2xl md:aspect-auto" />
        </div>
      </div>
    </section>
  );
}

function ProductGridSkeleton() {
  return (
    <section className="bg-surface px-5 py-14 md:px-8 md:py-20">
      <div className="mx-auto max-w-screen-2xl">
        <Shimmer className="mb-12 h-10 w-72" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
          {Array.from({ length: 10 }).map((_, i) => {
            const visibilityClass =
              i >= 8 ? "hidden lg:flex" : i >= 6 ? "hidden md:flex" : "flex";

            return (
              <div key={i} className={`flex-col gap-2 ${visibilityClass}`}>
                <Shimmer className="aspect-[3/4] w-full rounded-xl" />
                <Shimmer className="h-4 w-3/4" />
                <Shimmer className="h-4 w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionSkeleton({ cols = 4 }: { cols?: number }) {
  return (
    <section className="border-surface-variant/50 bg-surface-container-low border-t border-b px-5 py-14 md:px-8 md:py-24">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Shimmer className="h-10 w-64" />
          <Shimmer className="h-1 w-16 rounded-full" />
        </div>
        <div
          className={`grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-${cols} lg:gap-6`}
        >
          {Array.from({ length: cols }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <Shimmer className="h-16 w-16 rounded-full" />
              <Shimmer className="h-6 w-32" />
              <Shimmer className="h-4 w-full" />
              <Shimmer className="h-4 w-4/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSkeleton() {
  return (
    <section className="bg-[#f4f5f7] px-5 py-14 md:px-8 md:py-24">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex flex-col items-center gap-4">
          <Shimmer className="h-10 w-80" />
          <Shimmer className="h-1 w-16 rounded-full" />
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-white p-5 shadow-sm md:p-8">
              <Shimmer className="mb-4 h-4 w-24" />
              <Shimmer className="mb-2 h-4 w-full" />
              <Shimmer className="mb-2 h-4 w-5/6" />
              <Shimmer className="mb-6 h-4 w-4/5" />
              <div className="flex items-center gap-4">
                <Shimmer className="h-12 w-12 rounded-full" />
                <div className="flex flex-col gap-1">
                  <Shimmer className="h-4 w-28" />
                  <Shimmer className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function HomeLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);

  return (
    <div role="status" aria-busy="true" aria-label="Cargando página de inicio">
      <HeroSkeleton />
      <ProductGridSkeleton />
      <SectionSkeleton cols={4} />
      <SectionSkeleton cols={4} />
      <TestimonialsSkeleton />
    </div>
  );
}
