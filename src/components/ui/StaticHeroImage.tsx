import Image from "next/image";

/**
 * StaticHeroImage — Server Component
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the LCP hero image as pure SSR HTML. NO client JS needed.
 *
 * Why: HeroImageCarousel is a "use client" component that requires hydration
 * before any <Image> renders. On slow mobile (Lighthouse), this waterfall
 * costs 20+ seconds. This component bakes the first slide into the HTML
 * so the browser can start fetching the image immediately on first byte.
 *
 * The full carousel progressively replaces this once JS hydrates.
 */
interface StaticHeroImageProps {
  sizes: string;
}

export function StaticHeroImage({ sizes }: StaticHeroImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      <Image
        src="/images/uniformes/portada.webp"
        fill
        alt="Confeccion de uniformes a la medida en el taller de Confecciones Liss, San Miguel, El Salvador"
        className="rounded-xl object-cover object-center"
        sizes={sizes}
        quality={80}
        priority
        fetchPriority="high"
      />
    </div>
  );
}
