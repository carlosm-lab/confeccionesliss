import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICE_PAGES } from "@/data/services";
import { siteConfig } from "@/config/site";
import { ServicioDetallePage } from "@/components/servicios/ServicioDetallePage";
import { buildBreadcrumbSchema } from "@/lib/schemas";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!service) return {};
  const pageUrl = `${siteConfig.url}/servicios/${slug}`;
  return {
    title: { absolute: service.seoTitle },
    description: service.seoDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: pageUrl,
      siteName: siteConfig.name,
      locale: "es_SV",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
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
}

export default async function ServicioSlugPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!service) notFound();
  const pageUrl = `${siteConfig.url}/servicios/${slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    url: pageUrl,
    areaServed: { "@type": "City", name: "San Miguel" },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  // FAQPage structured data — aplica a cualquier servicio con FAQs
  const faqJsonLd =
    service.faqs?.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: service.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null;

  // BreadcrumbList structured data
  const breadcrumbJsonLd = buildBreadcrumbSchema([
    { name: "Inicio", item: siteConfig.url },
    { name: "Servicios", item: `${siteConfig.url}/servicios` },
    { name: service.navLabel || service.title, item: pageUrl },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <ServicioDetallePage service={service} />
    </>
  );
}
