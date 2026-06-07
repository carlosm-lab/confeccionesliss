import type { Metadata } from "next";
import { ALL_PRODUCTS } from "@/data/products";
import { CategoryHubClient } from "@/components/catalogo/CategoryHubClient";
import { UnifiedCatalogClient } from "@/components/catalogo/UnifiedCatalogClient";
import { siteConfig } from "@/config/site";
import { CATEGORIES } from "@/data/categories";
import type { Sector } from "@/data/types";

export const metadata: Metadata = {
  title: "Catálogo de Uniformes por Categoría",
  description:
    "Explora nuestro catálogo de uniformes: Scrubs médicos, universitarios, escolares, corporativos, deportivos y accesorios. Confección a la medida en San Miguel, El Salvador. Desde $8.",
  openGraph: {
    title: "Catálogo de Uniformes | Confecciones Liss",
    description:
      "Encuentra uniformes y scrubs médicos a la medida para el sector salud, universidades, colegios y empresas. Bordado, sublimación y precios por volumen.",
    url: `${siteConfig.url}/catalogo`,
  },
  alternates: {
    canonical: `${siteConfig.url}/catalogo`,
  },
};

const SECTOR_ORDER: Sector[] = [
  "scrubs",
  "universitario",
  "escolar",
  "corporativo",
  "deportivo",
  "accesorios",
];

interface CatalogoPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CatalogoPage({
  searchParams,
}: CatalogoPageProps) {
  const resolvedParams = await searchParams;
  const hasSearchQuery =
    typeof resolvedParams.q === "string" && resolvedParams.q.trim().length > 0;

  // Build ItemList JSON-LD for category hub
  const categoryListItems = SECTOR_ORDER.map((sector, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: CATEGORIES[sector].subtitle,
    url: `${siteConfig.url}/catalogo/${sector}`,
  }));

  return (
    <>
      {/* Conditional rendering: search results vs category hub */}
      {hasSearchQuery ? (
        <UnifiedCatalogClient products={ALL_PRODUCTS} />
      ) : (
        <CategoryHubClient />
      )}

      {/* JSON-LD: ItemList of categories */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Catálogo de uniformes por categoría — Confecciones Liss",
            description:
              "Catálogo completo de uniformes médicos, universitarios, escolares, corporativos, deportivos y accesorios en San Miguel, El Salvador.",
            url: `${siteConfig.url}/catalogo`,
            numberOfItems: SECTOR_ORDER.length,
            itemListElement: categoryListItems,
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* JSON-LD: CollectionPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Catálogo completo de uniformes y scrubs — Confecciones Liss",
            description:
              "Catálogo completo de uniformes médicos, universitarios, escolares y corporativos en San Miguel, El Salvador.",
            url: `${siteConfig.url}/catalogo`,
            numberOfItems: ALL_PRODUCTS.length,
            provider: {
              "@type": "LocalBusiness",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
