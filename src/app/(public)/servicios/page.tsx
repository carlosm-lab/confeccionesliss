import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SERVICE_PAGES } from "@/data/services";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const PAGE_URL = `${siteConfig.url}/servicios`;
const PAGE_TITLE =
  "Servicios de Confección y Personalización | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Bordado computarizado, sublimación textil, confección a medida, mano de obra y ropa casual. Servicios profesionales de confección en San Miguel, El Salvador.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Servicios de Confección | Confecciones Liss",
    description:
      "Bordado, sublimación, confección a medida y más servicios profesionales de costura en San Miguel.",
    url: PAGE_URL,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
          {SERVICE_PAGES.map((page, index) => (
            <Link
              key={page.slug}
              href={`/servicios/${page.slug}`}
              className="group border-primary/35 animate-fade-in-up hover:border-primary/55 focus-visible:ring-primary @container relative mx-auto flex h-full w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none lg:max-w-none"
              style={{ animationDelay: `${index * 75 + 300}ms` }}
            >
              {/* Indicador visual de navegación (siempre visible) */}
              <div className="bg-primary absolute top-4 right-4 z-20 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md transition-all duration-300">
                <span
                  className="material-symbols-outlined text-[15px] font-semibold"
                  aria-hidden="true"
                >
                  open_in_new
                </span>
              </div>

              {/* Brand white header */}
              <div className="text-primary flex min-h-[4.25rem] items-center gap-3 bg-white px-6 py-3.5 transition-colors duration-300">
                <span
                  className="material-symbols-outlined shrink-0 text-2xl transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-110"
                  aria-hidden="true"
                >
                  {page.navIcon}
                </span>
                <h2 className="group-hover:text-primary/95 pr-9 font-serif text-base leading-snug font-bold transition-colors duration-300">
                  {page.title}
                </h2>
              </div>

              {/* Body: imagen de fondo */}
              <div className="relative aspect-[2/1] w-full overflow-hidden">
                {/* Imagen de fondo */}
                <Image
                  src={page.cardImage}
                  alt={`Imagen representativa del servicio de ${page.navLabel}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-105"
                />
              </div>
            </Link>
          ))}
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
