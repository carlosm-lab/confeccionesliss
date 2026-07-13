import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { CatalogPageClient } from "@/components/catalogo/CatalogPageClient";
import { siteConfig } from "@/config/site";
import type { Sector } from "@/data/types";
import {
  getProductsBySector,
  getCategoriesForSector,
} from "@/lib/catalogService";
import { OffersReadTracker } from "@/components/ui/OffersReadTracker";

// ── SSG + On-Demand Revalidation (ISR) ──────────────────────────────────────
// revalidate = 86400 (24h) habilita la infraestructura de ISR en Vercel,
// permitiendo que revalidatePath() purgue el CDN en caché bajo demanda.
export const revalidate = 86400;

// ── Static params: genera una página por sector ───────────────────────────────
// "universitario" se excluye: la ruta fue eliminada, ahora existe /catalogo/universidades.
export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as Sector[])
    .filter((sector) => sector !== "universitario")
    .map((sector) => ({ sector }));
}

// ── Metadata dinámica por sector ──────────────────────────────────────────────
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
    title: config.seoTitle ?? config.title,
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
    },
  };
}

// ── Página ────────────────────────────────────────────────────────────────────
export default async function SectorCatalogPage({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const config = CATEGORIES[sector as Sector];

  if (!config || sector === "universitario") {
    notFound();
  }

  // Fetch productos y categorías en paralelo desde Supabase (SSG)
  const [products, dbCategories] = await Promise.all([
    getProductsBySector(sector),
    getCategoriesForSector(sector),
  ]);

  // Construir config dinámico — las categorías de DB reemplazan las hardcodeadas.
  // Si la DB no devuelve categorías para este sector, se conservan las del archivo.
  const resolvedConfig =
    dbCategories.length > 0
      ? {
          ...config,
          filterGroups: [
            {
              ...config.filterGroups[0],
              options: dbCategories.map((cat) => ({
                value: cat.slug,
                label: cat.name,
              })),
            },
            ...config.filterGroups.slice(1),
          ],
          categoryChips: [
            { label: "Todo", icon: "grid_view" },
            ...dbCategories.map((cat) => ({
              label: cat.name,
              icon: config.filterGroups[0]?.icon ?? config.icon ?? "checkroom",
            })),
          ],
        }
      : config;

  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}`;

  return (
    <>
      <OffersReadTracker />
      <CatalogPageClient
        sector={sector as Sector}
        config={resolvedConfig}
        initialProducts={products}
      />

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
            numberOfItems: products.length,
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
