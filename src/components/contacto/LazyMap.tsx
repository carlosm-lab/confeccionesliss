"use client";

import { useEffect, useState, useRef } from "react";

interface LazyMapProps {
  src: string;
  title: string;
}

export function LazyMap({ src, title }: LazyMapProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px", // Load when map gets within 300px of viewport
      }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex h-full min-h-[400px] w-full items-center justify-center bg-gray-50"
    >
      {!shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center gap-2">
            <span
              className="border-primary/30 border-t-primary h-8 w-8 rounded-full border-4"
              aria-hidden="true"
            />
            <span className="text-xs font-medium text-gray-400">
              Cargando mapa...
            </span>
          </div>
        </div>
      )}
      {shouldLoad && (
        <iframe
          title={title}
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "400px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="animate-fade-in h-full w-full"
        />
      )}
    </div>
  );
}
