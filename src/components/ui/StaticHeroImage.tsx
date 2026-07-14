import { preload } from "react-dom";

interface StaticHeroImageProps {
  sizes: string;
}

export function StaticHeroImage({ sizes }: StaticHeroImageProps) {
  // Pre-cargar responsivamente las imágenes estáticas locales pre-optimizadas
  preload("/images/uniformes/portada-750.webp", {
    as: "image",
    fetchPriority: "high",
    imageSrcSet:
      "/images/uniformes/portada-640.webp 640w, /images/uniformes/portada-750.webp 750w, /images/uniformes/portada-1080.webp 1080w, /images/uniformes/portada-1200.webp 1200w",
    imageSizes: sizes,
  } as any);

  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
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
