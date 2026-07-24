import { Icon } from "@/components/ui/icons/Icon";
import Image from "next/image";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import type { Sector } from "@/data/types";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/** Ordered list of sectors for the hub grid */
const SECTOR_ORDER: Sector[] = [
  "scrubs",
  "universitario",
  "escolar",
  "corporativo",
  "deportivo",
  "accesorios",
  "lenceria",
  "sublimacion",
  "ropa-calzado",
  "tops",
  "limpiapipas",
];

function CategoryCard({
  sector,
  productCount,
  isPriority,
}: {
  sector: Sector;
  productCount: number;
  isPriority: boolean;
}) {
  const config = CATEGORIES[sector];

  return (
    <Link
      href={
        sector === "universitario"
          ? "/catalogo/universidades"
          : `/catalogo/${sector}`
      }
      className={cn(
        "group border-primary/35 @container mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 lg:max-w-none",
        "shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]",
        "hover:border-primary/55 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]",
        "focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      )}
      aria-label={`Ver catálogo de ${config.subtitle}: ${config.hubTagline}`}
    >
      {/* Category Image */}
      <div className="relative aspect-[32/15] max-h-[150px] w-full overflow-hidden bg-gray-50 sm:max-h-none">
        <Image
          src={config.hubImage}
          alt={`Colección de ${config.subtitle}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-103"
          // isPriority controla loading: solo las 2 primeras cargan eager para no
          // saturar el ancho de banda mobile. El resto carga lazy al hacer scroll.
          // unoptimized: WebPs ya optimizados, servir directo del CDN sin /_next/image.
          loading={isPriority ? "eager" : "lazy"}
          unoptimized
          priority={isPriority}
        />

        <div className="bg-primary absolute top-3 right-3 z-20 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md transition-all duration-300">
          <Icon
            name="open_in_new"
            size={15}
            className="@[280px]: font-semibold"
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Information Panel */}
      <div className="p-3 @[280px]:p-3.5 @[320px]:p-4">
        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Icon
              name={config.icon}
              size={13}
              className="text-primary group-hover:text-tertiary transition-colors duration-300 @[280px]:w-[15px] @[320px]:w-[17px]"
              aria-hidden="true"
            />
            <h2 className="text-primary group-hover:text-tertiary text-[11px] font-extrabold tracking-wider uppercase transition-colors duration-300 @[280px]:text-[12.5px] @[320px]:text-[14px] @[360px]:text-[15px]">
              {config.subtitle}
            </h2>
          </div>
          <span className="bg-surface-container text-primary rounded-full px-1.5 py-0.5 text-[8px] font-semibold @[280px]:px-2 @[280px]:text-[9px] @[320px]:text-[10px]">
            {productCount} {productCount === 1 ? "prenda" : "prendas"}
          </span>
        </div>

        <p className="text-on-surface-variant mt-1 line-clamp-2 text-[9px] leading-snug transition-all @[280px]:text-[10px] @[320px]:text-[11px] @[360px]:text-[12px]">
          {config.hubTagline}
        </p>
      </div>
    </Link>
  );
}

interface CategoryHubClientProps {
  /** Conteo de productos activos por sector, obtenido del servidor */
  productCounts: Record<string, number>;
}

export function CategoryHubClient({ productCounts }: CategoryHubClientProps) {
  return (
    <>
      {/* Page header */}
      <section className="bg-surface px-5 pt-6 pb-0 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catálogo", href: "/catalogo" },
            ]}
            className="animate-fade-in-up mb-6"
          />
          <h1
            className="animate-fade-in-up section-title"
            style={{ animationDelay: "100ms", textAlign: "left" }}
          >
            ¿Qué deseas comprar hoy?
          </h1>
          <p
            className="animate-fade-in-up text-on-surface-variant mt-4 max-w-xl text-left text-sm leading-relaxed md:text-base"
            style={{ animationDelay: "200ms" }}
          >
            Selecciona la categoría que necesitas y explora productos diseñados
            para tu profesión, institución o equipo. 🥰
          </p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="bg-surface px-5 pt-12 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
            {SECTOR_ORDER.map((sector, index) => (
              <div
                key={sector}
                className={cn(
                  "h-full w-full",
                  index >= 2 && "animate-fade-in-up"
                )}
                style={
                  index >= 2
                    ? {
                        animationDelay: `${
                          index < 4 ? index * 50 + 100 : (index - 4) * 50 + 300
                        }ms`,
                      }
                    : undefined
                }
              >
                <CategoryCard
                  sector={sector}
                  productCount={productCounts[sector] ?? 0}
                  isPriority={sector === "scrubs" || sector === "universitario"}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section
        className="animate-fade-in-up bg-surface-container-low border-t border-gray-200 px-5 pt-8 pb-20 md:px-8 md:pt-8"
        aria-label="Garantías del servicio"
        style={{ animationDelay: "850ms" }}
      >
        <div className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-5 md:grid-cols-4">
          {[
            { icon: "local_shipping", text: "Envío a todo El Salvador" },
            { icon: "payments", text: "Pago al recibir" },
            { icon: "verified", text: "Confección garantizada" },
            { icon: "support_agent", text: "Atención personalizada" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 text-sm text-gray-600"
            >
              <Icon
                name={item.icon}
                size={20}
                className="text-primary"
                aria-hidden="true"
              />
              <span className="font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
