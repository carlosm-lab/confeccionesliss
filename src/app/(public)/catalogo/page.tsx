import type { Metadata } from "next";
import { ALL_PRODUCTS } from "@/data/products";
import { UnifiedCatalogClient } from "@/components/catalogo/UnifiedCatalogClient";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Catálogo completo de uniformes y scrubs",
  description:
    "Explora nuestro catálogo completo: scrubs médicos Sincatex, uniformes universitarios UNIVO, UNAB, UGB, escolares y corporativos. Confección a la medida en San Miguel, El Salvador. Desde $35.",
  openGraph: {
    title: "Catálogo de Uniformes | Confecciones Liss",
    description:
      "Encuentra uniformes para el sector salud, universidades, colegios y empresas. Bordado, sublimación y precios por volumen.",
    url: `${siteConfig.url}/catalogo`,
  },
  alternates: {
    canonical: `${siteConfig.url}/catalogo`,
  },
};

export default function CatalogoPage() {
  return (
    <>
      <UnifiedCatalogClient products={ALL_PRODUCTS} />

      {/* JSON-LD */}
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
            hasPart: [
              {
                "@type": "CollectionPage",
                name: "Scrubs Médicos",
                url: `${siteConfig.url}/catalogo/salud`,
              },
              {
                "@type": "CollectionPage",
                name: "Uniformes Universitarios",
                url: `${siteConfig.url}/catalogo/universitario`,
              },
              {
                "@type": "CollectionPage",
                name: "Uniformes Escolares",
                url: `${siteConfig.url}/catalogo/escolar`,
              },
              {
                "@type": "CollectionPage",
                name: "Uniformes Corporativos",
                url: `${siteConfig.url}/catalogo/corporativo`,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
