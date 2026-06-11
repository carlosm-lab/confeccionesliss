import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES } from "@/data/services";
import { siteConfig } from "@/config/site";

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
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 px-8 py-12 text-white md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <nav className="mb-6 text-sm text-white/70" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1">
              <li>
                <Link href="/" className="hover:text-white">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-white/90">Servicios</span>
              </li>
            </ol>
          </nav>
          <h1 className="font-serif text-3xl font-bold md:text-4xl">
            Nuestros Servicios
          </h1>
          <p className="mt-2 max-w-lg text-sm opacity-80">
            Más allá de la venta de uniformes, ofrecemos servicios
            especializados de confección, bordado y sublimación para que tu
            proyecto sea exactamente como lo imaginas.
          </p>
        </div>
      </section>

      {/* Grid de servicios */}
      <section className="bg-surface px-8 py-10 md:py-16">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_PAGES.map((page) => (
            <Link
              key={page.slug}
              href={`/servicios/${page.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Gradient header */}
              <div
                className={`${page.heroGradient} flex items-center gap-3 px-6 py-5`}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  aria-hidden="true"
                >
                  {page.navIcon}
                </span>
                <h2 className="font-serif text-lg font-bold">{page.title}</h2>
              </div>

              {/* Description */}
              <div className="flex flex-1 flex-col p-6">
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                  {page.description}
                </p>

                {/* Features */}
                <ul className="mb-4 space-y-2">
                  {page.heroFeatures.map((feat) => (
                    <li
                      key={feat.text}
                      className="flex items-center gap-2 text-xs text-gray-500"
                    >
                      <span
                        className="material-symbols-outlined text-primary text-sm"
                        aria-hidden="true"
                      >
                        {feat.icon}
                      </span>
                      {feat.text}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <span className="text-primary mt-auto inline-flex items-center gap-1 text-sm font-semibold transition-all group-hover:gap-2">
                  Leer más
                  <span
                    className="material-symbols-outlined text-sm"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary px-8 py-10 text-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-headline text-xl font-bold md:text-2xl">
              ¿Tienes un proyecto especial?
            </h2>
            <p className="text-sm text-white/70">
              Cuéntanos tu idea y te ayudamos a hacerla realidad. Cotización sin
              compromiso.
            </p>
          </div>
          <a
            href={siteConfig.links.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary shrink-0 rounded-lg bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100"
          >
            Cotizar por WhatsApp
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </a>
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
