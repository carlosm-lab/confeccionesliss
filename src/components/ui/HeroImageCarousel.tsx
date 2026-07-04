"use client";

import React, { useState, useEffect } from "react";
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

export function HeroImageCarousel({
  sizes,
  priority = false,
}: HeroImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
    }, 4000); // Cambia cada 4 segundos
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full">
      {IMAGES.map((src, idx) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
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
  );
}
