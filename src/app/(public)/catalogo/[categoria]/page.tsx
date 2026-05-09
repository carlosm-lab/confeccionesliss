import { notFound } from "next/navigation";
import { getProductsBySector } from "@/data/products";
import { CATEGORIES, SECTOR_SLUGS } from "@/data/categories";
import type { Sector } from "@/data/types";
import { siteConfig } from "@/config/site";
import { CatalogClientShell } from "@/components/catalogo/CatalogClientShell";

export function generateStaticParams() {
  return SECTOR_SLUGS.map((categoria) => ({ categoria }));
}

type PageParams = { categoria: string };

export default async function CategoriaPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { categoria } = await params;

  if (!SECTOR_SLUGS.includes(categoria as Sector)) notFound();

  const config = CATEGORIES[categoria as Sector];
  const products = getProductsBySector(categoria as Sector);

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
        name: "Catálogo",
        item: `${siteConfig.url}/catalogo`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.subtitle,
        item: `${siteConfig.url}/catalogo/${categoria}`,
      },
    ],
  };

  // ItemList JSON-LD
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: config.title,
    description: config.seoDescription,
    numberOfItems: products.length,
    itemListElement: products.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${siteConfig.url}/catalogo/${categoria}/${p.id}`,
      name: p.nombre,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(itemListSchema),
        }}
      />
      <CatalogClientShell products={products} config={config} />
    </>
  );
}
