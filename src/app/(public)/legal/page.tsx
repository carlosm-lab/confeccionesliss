import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import LegalHubClient from "@/components/legal/LegalHubClient";

export const dynamic = "force-static";

const PAGE_URL = `${siteConfig.url}/legal`;

export const metadata: Metadata = {
  title: "Documentos Legales: Políticas y Privacidad",
  description:
    "Accede a los documentos legales de Confecciones Liss: privacidad, términos, devoluciones, envíos, cookies, referidos, IA y accesibilidad en El Salvador.",
  keywords:
    "documentos legales, política de privacidad, términos y condiciones, políticas legales, derechos usuario, devoluciones, envíos El Salvador, cookies, Confecciones Liss",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Documentos Legales: Políticas y Privacidad | Confecciones Liss",
    description:
      "Accede a los documentos legales de Confecciones Liss: privacidad, términos, devoluciones, envíos, cookies, referidos, IA y accesibilidad en El Salvador.",
    url: PAGE_URL,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Documentos Legales: Políticas y Privacidad | Confecciones Liss",
    description:
      "Accede a los documentos legales de Confecciones Liss: privacidad, términos, devoluciones, envíos, cookies, referidos, IA y accesibilidad en El Salvador.",
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
  other: {
    publisher: siteConfig.name,
  },
};

export default function LegalHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: "Documentos Legales | Confecciones Liss",
        description:
          "Accede a los documentos legales de Confecciones Liss: privacidad, términos, devoluciones, envíos, cookies, referidos, IA y accesibilidad en El Salvador.",
        inLanguage: "es-SV",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
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
            name: "Legal",
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
      <LegalHubClient />
    </>
  );
}
