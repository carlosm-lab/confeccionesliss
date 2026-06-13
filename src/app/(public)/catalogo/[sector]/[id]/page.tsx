import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { ALL_PRODUCTS } from "@/data/products";
import { ProductDetailClient } from "@/components/catalogo/ProductDetailClient";
import { siteConfig } from "@/config/site";
import type { Sector } from "@/data/types";

// ── Static params: generate one page per product ─────────────────────────────
export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    sector: product.sector,
    id: product.id,
  }));
}

// ── Dynamic metadata per product ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string; id: string }>;
}): Promise<Metadata> {
  const { sector, id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id && p.sector === sector);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}/${id}`;
  const description =
    product.descripcionCorta ?? product.descripcion ?? product.categoria;

  return {
    title: `${product.nombre} | ${CATEGORIES[sector as Sector]?.subtitle ?? "Catálogo"}`,
    description,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: `${product.nombre} | Confecciones Liss`,
      description,
      url: PAGE_URL,
      siteName: siteConfig.name,
      locale: "es_SV",
      type: "website",
      ...(product.imagen
        ? {
            images: [
              {
                url: product.imagen,
                alt: product.imageAlt ?? product.nombre,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: product.nombre,
      description,
      creator: siteConfig.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sector: string; id: string }>;
}) {
  const { sector, id } = await params;
  const config = CATEGORIES[sector as Sector];
  const product = ALL_PRODUCTS.find((p) => p.id === id && p.sector === sector);

  if (!config || !product) {
    notFound();
  }

  // Related products: same sector, different product, up to 5
  const relatedProducts = ALL_PRODUCTS.filter(
    (p) => p.sector === sector && p.id !== id
  ).slice(0, 5);

  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}/${id}`;
  const description =
    product.descripcionCorta ?? product.descripcion ?? product.categoria;

  return (
    <>
      <ProductDetailClient
        product={product}
        config={config}
        relatedProducts={relatedProducts}
      />

      {/* JSON-LD: Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.nombre,
            description,
            image: product.imagen ?? undefined,
            url: PAGE_URL,
            offers: {
              "@type": "Offer",
              price: product.precio.toFixed(2),
              priceCurrency: "USD",
              availability: "https://schema.org/InStock",
              seller: {
                "@type": "Organization",
                name: siteConfig.name,
              },
            },
            brand: {
              "@type": "Brand",
              name: siteConfig.name,
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
                item: `${siteConfig.url}/catalogo/${sector}`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: product.nombre,
                item: PAGE_URL,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
