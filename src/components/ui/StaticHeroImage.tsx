interface StaticHeroImageProps {
  sizes?: string;
}

/**
 * StaticHeroImage — Server Component
 *
 * Usa archivos WebP estáticos optimizados desde /hero.png para rendimiento máximo
 * y cumplimiento de Core Web Vitals (LCP estático sin JavaScript).
 */
export function StaticHeroImage({ sizes: _sizes }: StaticHeroImageProps) {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/images/hero/hero-home-640.webp"
        // @ts-expect-error — imagesrcset/imagesizes son atributos HTML válidos pero no tipados en React
        imagesrcset="/images/hero/hero-home-640.webp 640w, /images/hero/hero-home-800.webp 800w, /images/hero/hero-home.webp 1122w"
        imagesizes="(max-width:768px) 80vw, 40vw"
        fetchPriority="high"
      />
      <div className="absolute inset-0 overflow-hidden rounded-xl">
        <picture>
          <source
            media="(max-width: 640px)"
            srcSet="/images/hero/hero-home-640.webp"
          />
          <source
            media="(max-width: 1024px)"
            srcSet="/images/hero/hero-home-800.webp"
          />
          <img
            src="/images/hero/hero-home.webp"
            alt="Uniformes médicos y universitarios de Confecciones Liss, empresa de uniformes en San Miguel, El Salvador"
            className="h-full w-full rounded-xl object-cover object-center"
            fetchPriority="high"
            loading="eager"
            decoding="sync"
          />
        </picture>
      </div>
    </>
  );
}
