import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { CatalogPageClient } from "@/components/catalogo/CatalogPageClient";
import { siteConfig } from "@/config/site";
import type { Sector } from "@/data/types";

// ── Static params: generate one page per sector ──────────────────────────────
export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as Sector[]).map((sector) => ({
    sector,
  }));
}

// ── Dynamic metadata per sector ───────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string }>;
}): Promise<Metadata> {
  const { sector } = await params;
  const config = CATEGORIES[sector as Sector];

  if (!config) {
    return { title: "Catálogo no encontrado" };
  }

  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}`;

  return {
    title: config.title,
    description: config.seoDescription,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: `${config.subtitle} | Confecciones Liss`,
      description: config.seoDescription,
      url: PAGE_URL,
      siteName: siteConfig.name,
      locale: "es_SV",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.seoDescription,
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function SectorCatalogPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const config = CATEGORIES[sector as Sector];

  if (!config) {
    notFound();
  }

  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}`;

  return (
    <>
      <CatalogPageClient sector={sector as Sector} config={config} />

      {/* JSON-LD: CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: config.title,
            description: config.seoDescription,
            url: PAGE_URL,
            provider: {
              "@type": "LocalBusiness",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
                name: "Catálogo",
                item: `${siteConfig.url}/catalogo`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: config.subtitle,
                item: PAGE_URL,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
