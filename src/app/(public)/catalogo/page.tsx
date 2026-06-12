import type { Metadata } from "next";
import { ALL_PRODUCTS } from "@/data/products";
import { CategoryHubClient } from "@/components/catalogo/CategoryHubClient";
import { siteConfig } from "@/config/site";

const PAGE_URL = `${siteConfig.url}/catalogo`;
const PAGE_TITLE = "Catálogo de Uniformes por Categoría";
const PAGE_DESCRIPTION =
  "Explora nuestro catálogo de uniformes: Scrubs médicos, universitarios, escolares, corporativos, deportivos y accesorios. Confección a la medida en San Miguel, El Salvador. Desde $8.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Catálogo de Uniformes | Confecciones Liss",
    description:
      "Encuentra uniformes y scrubs médicos a la medida para el sector salud, universidades, colegios y empresas. Bordado, sublimación y precios por volumen.",
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

export default function CatalogoPage() {
  return (
    <>
      <CategoryHubClient />

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
