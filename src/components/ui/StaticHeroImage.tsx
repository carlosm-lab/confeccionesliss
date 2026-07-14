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
import { preload } from "react-dom";

interface StaticHeroImageProps {
  sizes: string;
}

export function StaticHeroImage({ sizes }: StaticHeroImageProps) {
  // Preload the LCP image using ReactDOM.preload() — emits a correct <link rel="preload">
  // in the SSR HTML. 750w matches Moto G Power (DPR 1.75, 412px × 80vw × 1.75 ≈ 577px).
  preload("/_next/image?url=%2Fimages%2Funiformes%2Fportada.webp&w=750&q=75", {
    as: "image",
    fetchPriority: "high",
  });
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/_next/image?url=%2Fimages%2Funiformes%2Fportada.webp&w=750&q=75"
        srcSet="/_next/image?url=%2Fimages%2Funiformes%2Fportada.webp&w=640&q=75 640w, /_next/image?url=%2Fimages%2Funiformes%2Fportada.webp&w=750&q=75 750w, /_next/image?url=%2Fimages%2Funiformes%2Fportada.webp&w=1080&q=75 1080w, /_next/image?url=%2Fimages%2Funiformes%2Fportada.webp&w=1200&q=75 1200w"
        sizes={sizes}
        alt="Confeccion de uniformes a la medida en el taller de Confecciones Liss, San Miguel, El Salvador"
        className="h-full w-full rounded-xl object-cover object-center"
        fetchPriority="high"
      />
    </div>
  );
}
