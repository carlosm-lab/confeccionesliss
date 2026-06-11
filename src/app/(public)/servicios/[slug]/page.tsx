import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { SERVICE_PAGES } from "@/data/services";
import { siteConfig } from "@/config/site";

export function generateStaticParams() {
  return SERVICE_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = SERVICE_PAGES.find((p) => p.slug === slug);

  if (!config) return { title: "Página no encontrada" };

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    alternates: {
      canonical: `${siteConfig.url}/servicios/${slug}`,
    },
    openGraph: {
      title: config.seoTitle,
      description: config.seoDescription,
      url: `${siteConfig.url}/servicios/${slug}`,
      type: "article",
      siteName: siteConfig.name,
    },
  };
}

export default async function ServiceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = SERVICE_PAGES.find((p) => p.slug === slug);

  if (!config) notFound();

  // BreadcrumbList JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Servicios",
        item: `${siteConfig.url}/servicios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.navLabel,
        item: `${siteConfig.url}/servicios/${config.slug}`,
      },
    ],
  };

  // Service JSON-LD
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.title,
    description: config.seoDescription,
    provider: {
      "@type": "LocalBusiness",
      name: "Confecciones Liss",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur",
        addressLocality: "San Miguel",
        addressRegion: "San Miguel",
        addressCountry: "SV",
      },
    },
  };

  // FAQ JSON-LD
  const faqSchema =
    config.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: config.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, "\\u003c"),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c"),
          }}
        />
      )}

      {/* Hero */}
      <section className={`${config.heroGradient} px-8 py-12 md:py-20`}>
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
                <Link href="/servicios" className="hover:text-white">
                  Servicios
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <span className="text-white/90">{config.navLabel}</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-2xl"
                  aria-hidden="true"
                >
                  {config.navIcon}
                </span>
                <span className="text-sm font-medium tracking-widest uppercase opacity-80">
                  {config.subtitle}
                </span>
              </div>
              <h1 className="font-serif text-3xl font-bold md:text-4xl">
                {config.title}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed opacity-80 md:text-base">
                {config.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {config.heroFeatures.map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 rounded-lg bg-white/10 p-3 backdrop-blur-sm"
                >
                  <span
                    className="material-symbols-outlined text-white"
                    aria-hidden="true"
                  >
                    {b.icon}
                  </span>
                  <span className="text-sm font-medium">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Artículo principal */}
      <article className="bg-surface px-8 py-10 md:py-16">
        <div className="mx-auto max-w-screen-2xl">
          {config.sections.map((section, i) => (
            <section key={i} className="mb-10 last:mb-0">
              <h2 className="text-on-surface mb-4 font-serif text-xl font-bold md:text-2xl">
                {section.heading}
              </h2>
              <p className="text-on-surface-variant text-sm leading-relaxed md:text-base">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </article>

      {/* FAQ */}
      {config.faqs.length > 0 && (
        <section className="bg-surface-container-low border-t border-gray-200 px-8 py-10 md:py-16">
          <div className="mx-auto max-w-screen-2xl">
            <h2 className="text-on-surface mb-8 font-serif text-xl font-bold md:text-2xl">
              Preguntas frecuentes
            </h2>
            <dl className="space-y-6">
              {config.faqs.map((faq, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >
                  <dt className="text-on-surface mb-2 text-sm font-semibold md:text-base">
                    {faq.question}
                  </dt>
                  <dd className="text-on-surface-variant text-sm leading-relaxed">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="bg-primary px-8 py-10 text-white">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <h2 className="font-headline text-xl font-bold md:text-2xl">
              {config.ctaBanner.title}
            </h2>
            <p className="text-sm text-white/70">
              {config.ctaBanner.description}
            </p>
          </div>
          <a
            href={config.ctaBanner.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary shrink-0 rounded-lg bg-white px-8 py-3 font-semibold transition-colors hover:bg-gray-100"
          >
            {config.ctaBanner.ctaText}
            <span className="sr-only"> (se abre en nueva ventana)</span>
          </a>
        </div>
      </section>

      {/* Otros servicios */}
      <section className="bg-surface px-8 py-10">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="text-on-surface mb-6 font-serif text-lg font-bold">
            Otros servicios que ofrecemos
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {SERVICE_PAGES.filter((p) => p.slug !== config.slug).map((page) => (
              <Link
                key={page.slug}
                href={`/servicios/${page.slug}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white p-4 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <span
                  className="material-symbols-outlined text-primary text-2xl"
                  aria-hidden="true"
                >
                  {page.navIcon}
                </span>
                <span className="text-on-surface text-xs font-medium">
                  {page.navLabel}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
