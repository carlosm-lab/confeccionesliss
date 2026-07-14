import Image from "next/image";

interface StaticHeroImageProps {
  sizes: string;
}

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
      />
    </div>
  );
}
