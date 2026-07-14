import Image from "next/image";

interface StaticHeroImageProps {
  sizes: string;
}

/**
 * StaticHeroImage — Server Component
 *
 * Usa <Image priority> de Next.js que inyecta automáticamente un
 * <link rel="preload" imagesrcset="..." imagesizes="..." fetchpriority="high">
 * directamente en el <head> del HTML del servidor, donde el preload scanner
 * del navegador sí lo detecta. El link manual dentro del body JSX no es
 * leído por el preload scanner.
 */
export function StaticHeroImage({ sizes }: StaticHeroImageProps) {
  return (
    <div className="absolute inset-0 overflow-hidden rounded-xl">
      <Image
        src="/images/uniformes/portada.webp"
        fill
        sizes={sizes}
        alt="Confeccion de uniformes a la medida en el taller de Confecciones Liss, San Miguel, El Salvador"
        className="rounded-xl object-cover object-center"
        priority
        fetchPriority="high"
        quality={80}
      />
    </div>
  );
}
