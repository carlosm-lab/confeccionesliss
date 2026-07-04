"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

interface HeroImageCarouselProps {
  sizes: string;
  priority?: boolean;
}

const IMAGES = [
  "/images/uniformes/portada.webp",
  "/images/uniformes/001.png",
  "/images/uniformes/002.png",
  "/images/uniformes/003.png",
  "/images/uniformes/004.png",
  "/images/uniformes/005.png",
];

const INTERVAL_MS = 2000;
/** Mínimo de px horizontales para considerar un swipe */
const SWIPE_THRESHOLD = 40;

export function HeroImageCarousel({
  sizes,
  priority = false,
}: HeroImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // ── Touch swipe ─────────────────────────────────────────
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;

    // Solo procesar swipe horizontal si el movimiento X domina sobre Y
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
      if (dx < 0) {
        setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
      } else {
        setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    setIsPaused(false);
  };

  // ── Navegación manual ────────────────────────────────────
  const goTo = useCallback((idx: number) => {
    setCurrentIndex((idx + IMAGES.length) % IMAGES.length);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + IMAGES.length) % IMAGES.length);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
  }, []);

  // ── Auto-avance ──────────────────────────────────────────
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    /*
     * El wrapper externo NO tiene overflow-hidden, para que las burbujas
     * sobresalgan fuera del borde de la imagen.
     * El contenedor card tiene p-4 = 16px de padding.
     * El gap entre borde de imagen y borde de tarjeta = 16px.
     * Las burbujas se centran en el punto medio del gap = -8px del borde de imagen.
     * Eso se logra con -left-2 / -right-2 (left/right: -8px)
     * combinado con -translate-x-1/2 / translate-x-1/2.
     */
    <div
      className="relative h-full w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Imágenes con su propio overflow-hidden ─────── */}
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        {IMAGES.map((src, idx) => (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-700 ${
              idx === currentIndex ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <Image
              src={src}
              fill
              alt="Scrubs médicos a la medida confeccionados en San Miguel El Salvador por Confecciones Liss"
              className="rounded-xl object-cover object-center"
              sizes={sizes}
              priority={priority || idx === 0}
            />
          </div>
        ))}
      </div>

      {/* ── Flecha Izquierda ─────────────────────────────
       *  -left-2 = left: -8px → centro a -8px del borde de la imagen,
       *  justo en la mitad del gap entre borde imagen y borde tarjeta.
       */}
      <button
        onClick={goPrev}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Imagen anterior"
        className="border-primary/10 absolute top-1/2 -left-2 z-30 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-[0_4px_24px_rgba(20,48,103,0.55),0_2px_12px_rgba(20,48,103,0.45)] backdrop-blur-sm transition-all hover:scale-110 hover:shadow-[0_6px_28px_rgba(20,48,103,0.7),0_3px_14px_rgba(20,48,103,0.55)] active:scale-95"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="text-primary"
        >
          <path
            d="M10 12L6 8l4-4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Flecha Derecha ───────────────────────────────
       *  -right-2 = right: -8px → espejo del izquierdo.
       */}
      <button
        onClick={goNext}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        aria-label="Imagen siguiente"
        className="border-primary/10 absolute top-1/2 -right-2 z-30 flex h-8 w-8 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-[0_4px_24px_rgba(20,48,103,0.55),0_2px_12px_rgba(20,48,103,0.45)] backdrop-blur-sm transition-all hover:scale-110 hover:shadow-[0_6px_28px_rgba(20,48,103,0.7),0_3px_14px_rgba(20,48,103,0.55)] active:scale-95"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="text-primary"
        >
          <path
            d="M6 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── Indicadores de puntos + línea activa ────── */}
      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5">
        {IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label={`Ir a imagen ${idx + 1}`}
            className={`block rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "h-1.5 w-6 bg-white shadow-sm"
                : "h-1.5 w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
