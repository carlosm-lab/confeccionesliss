import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { UniversityHubClient } from "@/components/catalogo/UniversityHubClient";
import { buildBreadcrumbSchema } from "@/lib/schemas";

const PAGE_URL = `${siteConfig.url}/catalogo/universidades`;
const PAGE_TITLE =
  "Uniformes Universitarios en San Miguel | UNIVO, IEPROES, UGB, UNAB, UES, UMA";
const PAGE_DESCRIPTION =
  "Scrubs médicos y uniformes universitarios confeccionados a la medida para estudiantes de UNIVO, IEPROES, UGB, UNAB, UES y UMA en San Miguel, El Salvador. Tela Sincatex, bordado de escudo de carrera incluido. Desde $35.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: `${PAGE_TITLE} | ${siteConfig.name}`,
    description: PAGE_DESCRIPTION,
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
  },
};

export default function UniversidadesPage() {
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    hasPart: [
      {
        "@type": "WebPage",
        name: "Uniformes UNIVO",
        url: `${siteConfig.url}/catalogo/universidades/univo`,
      },
      {
        "@type": "WebPage",
        name: "Uniformes IEPROES",
        url: `${siteConfig.url}/catalogo/universidades/ieproes`,
      },
      {
        "@type": "WebPage",
        name: "Uniformes UGB",
        url: `${siteConfig.url}/catalogo/universidades/ugb`,
      },
      {
        "@type": "WebPage",
        name: "Uniformes UNAB",
        url: `${siteConfig.url}/catalogo/universidades/unab`,
      },
      {
        "@type": "WebPage",
        name: "Uniformes UES",
        url: `${siteConfig.url}/catalogo/universidades/ues`,
      },
      {
        "@type": "WebPage",
        name: "Uniformes UMA",
        url: `${siteConfig.url}/catalogo/universidades/uma`,
      },
    ],
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Inicio", item: siteConfig.url },
    { name: "Catálogo", item: `${siteConfig.url}/catalogo` },
    { name: "Universidades", item: PAGE_URL },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(collectionSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />
      <UniversityHubClient />
    </>
  );
}
