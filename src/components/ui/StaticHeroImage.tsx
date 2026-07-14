interface StaticHeroImageProps {
  sizes: string;
}

export function StaticHeroImage({ sizes }: StaticHeroImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      {/*
       * Preload explícito con atributos HTML nativos en minúsculas.
       * ReactDOM.preload() emite imageSrcSet/imageSizes (camelCase) que los navegadores ignoran.
       * Este <link> va al <head> gracias al hoisting de Next.js y usa los atributos
       * correctos: imagesrcset e imagesizes que los browsers sí leen.
       */}
      {}
      <link
        rel="preload"
        as="image"
        href="/images/uniformes/portada-640.webp"
        // @ts-expect-error -- imagesrcset/imagesizes are valid HTML attrs but not in React types
        imagesrcset="/images/uniformes/portada-640.webp 640w, /images/uniformes/portada-750.webp 750w, /images/uniformes/portada-1080.webp 1080w, /images/uniformes/portada-1200.webp 1200w"
        imagesizes={sizes}
        fetchPriority="high"
      />
      <picture>
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
        <img
          src="/images/uniformes/portada-1200.webp"
          alt="Confeccion de uniformes a la medida en el taller de Confecciones Liss, San Miguel, El Salvador"
          className="h-full w-full rounded-xl object-cover object-center"
          fetchPriority="high"
        />
      </picture>
    </div>
  );
}
