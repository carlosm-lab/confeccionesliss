interface StaticHeroImageProps {
  sizes: string;
}

/**
 * StaticHeroImage — Server Component
 *
 * Usa archivos WebP estáticos pre-generados con sharp para que el URL del
 * preload en layout.tsx coincida EXACTAMENTE con el src del img element.
 * La desincronización de URLs (preload vs img src) causaba que el browser
 * ignorara el preload y esperara hasta encontrar el img en el DOM (~1000ms).
 */
export function StaticHeroImage({ sizes: _sizes }: StaticHeroImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      <picture>
        {/*
         * Preload del LCP usando archivos estáticos pre-generados.
         * URL exacta = URL que usa el <picture> en StaticHeroImage.tsx.
         * Sin desincronización → el preload scanner carga el archivo correcto
         * y el img element lo reutiliza sin segunda descarga.
         */}
        <link
          rel="preload"
          as="image"
          href="/images/uniformes/portada-640.webp"
          {...({
            imagesrcset:
              "/images/uniformes/portada-640.webp 640w, /images/uniformes/portada-750.webp 750w, /images/uniformes/portada-1080.webp 1080w, /images/uniformes/portada-1200.webp 1200w",
            imagesizes: "(max-width:768px) 80vw, 40vw",
            fetchpriority: "high",
          } as React.HTMLAttributes<HTMLLinkElement>)}
        />
        <source
          media="(max-width: 640px)"
          srcSet="/images/uniformes/portada-640.webp"
        />
        <source
          media="(max-width: 768px)"
          srcSet="/images/uniformes/portada-750.webp"
        />
        <source
          media="(max-width: 1024px)"
          srcSet="/images/uniformes/portada-1080.webp"
        />
        {}
        <img
          src="/images/uniformes/portada-1200.webp"
          alt="Confeccion de uniformes a la medida en el taller de Confecciones Liss, San Miguel, El Salvador"
          className="h-full w-full rounded-xl object-cover object-center"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
      </picture>
    </div>
  );
}
