import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES } from "@/data/services";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const metadata: Metadata = {
  title: "Servicios de Confección y Personalización | Confecciones Liss",
  description:
    "Bordado computarizado, sublimación textil, confección a medida, mano de obra y ropa casual. Servicios profesionales de confección en San Miguel, El Salvador.",
  openGraph: {
    title: "Servicios de Confección | Confecciones Liss",
    description:
      "Bordado, sublimación, confección a medida y más servicios profesionales de costura en San Miguel.",
    url: `${siteConfig.url}/servicios`,
  },
  alternates: {
    canonical: `${siteConfig.url}/servicios`,
  },
};

export default function ServiciosPage() {
  return (
    <>
      {/* Editorial page header — no colored banner, clean typography */}
      <section className="bg-surface px-5 pt-6 pb-0 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: "Servicios" }]}
            className="animate-fade-in-up mb-6"
          />
          <h1
            className="animate-fade-in-up text-primary font-serif text-3xl font-bold tracking-tight md:text-4xl lg:text-[2.75rem]"
            style={{ animationDelay: "100ms" }}
          >
            Nuestros Servicios
          </h1>
          <p
            className="animate-fade-in-up text-on-surface-variant mt-4 max-w-xl text-base leading-relaxed"
            style={{ animationDelay: "200ms" }}
          >
            Más allá de la venta de uniformes, ofrecemos servicios
            especializados de confección, bordado y sublimación para que tu
            proyecto sea exactamente como lo imaginas.
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="bg-surface px-5 pt-12 pb-20 md:px-8">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map((page, index) => (
            <Link
              key={page.slug}
              href={`/servicios/${page.slug}`}
              className="group border-primary/35 animate-fade-in-up hover:border-primary/55 focus-visible:ring-primary relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              style={{ animationDelay: `${index * 75 + 300}ms` }}
            >
              {/* Indicador visual de navegación (estático en móvil/tablet, con animación sutil en desktop) */}
              <div className="text-primary absolute top-4 right-4 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 lg:translate-x-1.5 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100">
                <span
                  className="material-symbols-outlined text-[15px] font-semibold"
                  aria-hidden="true"
                >
                  open_in_new
                </span>
              </div>

              {/* Brand blue header */}
              <div className="bg-primary flex min-h-[5.5rem] items-center gap-3 px-6 py-5 text-white transition-colors duration-300">
                <span
                  className="material-symbols-outlined shrink-0 text-2xl transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110"
                  aria-hidden="true"
                >
                  {page.navIcon}
                </span>
                <h2 className="pr-9 font-serif text-base leading-snug font-bold transition-colors duration-300 group-hover:text-white/95">
                  {page.title}
                </h2>
              </div>

              {/* Description & CTA */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-2 flex-1 text-sm leading-relaxed text-gray-600 lg:mb-6">
                  {page.cardDescription}
                </p>

                {/* CTA */}
                <span className="text-primary mt-auto hidden items-center gap-1.5 text-sm font-semibold transition-colors duration-300 lg:inline-flex">
                  Leer más
                  <span
                    className="material-symbols-outlined text-sm transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:translate-x-1.5"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          ))}

          {/* Tarjeta de Proyecto Especial (Dashed Border CTA) */}
          <div
            className="group border-primary/45 animate-fade-in-up hover:border-primary/65 relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-dashed bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
            style={{ animationDelay: `${5 * 75 + 300}ms` }}
          >
            {/* Header: fondo suave, bordes punteados */}
            <div className="bg-primary/5 border-primary/20 text-primary flex min-h-[5.5rem] items-center gap-3 border-b border-dashed px-6 py-5">
              <span
                className="material-symbols-outlined shrink-0 text-2xl"
                aria-hidden="true"
              >
                design_services
              </span>
              <h2 className="pr-9 font-serif text-base leading-snug font-bold">
                ¿Proyecto Especial?
              </h2>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6">
              <p className="mb-6 flex-1 text-sm leading-relaxed text-gray-600">
                Cuéntanos tu idea y te ayudamos a hacerla realidad. Confección,
                bordados o sublimaciones a tu medida con cotización sin
                compromiso.
              </p>

              {/* Botón WhatsApp */}
              <a
                href={siteConfig.links.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/95 mt-auto flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white shadow-sm transition-[transform,background-color] duration-200 active:scale-[0.97]"
              >
                Cotizar por WhatsApp
                <span className="sr-only"> (se abre en nueva ventana)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Servicios de Confección — Confecciones Liss",
            description:
              "Servicios profesionales de bordado, sublimación, confección a medida y mano de obra en San Miguel.",
            url: `${siteConfig.url}/servicios`,
            numberOfItems: SERVICE_PAGES.length,
            itemListElement: SERVICE_PAGES.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteConfig.url}/servicios/${p.slug}`,
              name: p.title,
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
