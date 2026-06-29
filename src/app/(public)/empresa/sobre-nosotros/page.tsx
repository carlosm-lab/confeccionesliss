import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import SobreNosotrosClient from "@/components/empresa/SobreNosotrosClient";

const PAGE_URL = `${siteConfig.url}/empresa/sobre-nosotros`;
const PAGE_TITLE =
  "Sobre Nosotros | Taller de Confección en San Miguel | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Conoce la historia y el taller de Confecciones Liss, ubicado en el Barrio La Merced de San Miguel. Desde 2005 cosiendo con pasión y precisión artesanal.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
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
  robots: { index: true, follow: true },
};

export default function SobreNosotrosPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        isPartOf: {
          "@type": "WebSite",
          "@id": `${siteConfig.url}#website`,
          name: siteConfig.name,
          url: siteConfig.url,
        },
        mainEntity: {
          "@id": `${siteConfig.url}/#business`,
        },
      },
      {
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
            name: "Empresa",
            item: `${siteConfig.url}/empresa`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Sobre Nosotros",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="min-h-screen bg-[#f8f9fb]">
        {/* Storytelling Client Page */}
        <SobreNosotrosClient />
      </div>
    </>
  );
}
