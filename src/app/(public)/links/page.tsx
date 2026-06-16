import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LinksPageClient } from "./LinksPageClient";

const PAGE_URL = `${siteConfig.url}/links`;
const PAGE_TITLE =
  "Redes Sociales y Enlaces Oficiales de Confecciones Liss — Contacto Directo.";
const PAGE_DESCRIPTION =
  "Accede a los enlaces oficiales de Confecciones Liss: WhatsApp de ventas, Instagram, Facebook, TikTok y ubicación de nuestro taller en San Miguel.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  keywords:
    "Confecciones Liss, contacto, WhatsApp de ventas, redes sociales oficiales, Instagram Confecciones Liss, TikTok Confecciones Liss, Facebook Confecciones Liss, ubicación taller San Miguel",
  alternates: {
    canonical: PAGE_URL,
  },
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

export default function LinksPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${siteConfig.url}/links#profile`,
        mainEntity: {
          "@type": "Organization",
          name: siteConfig.name,
          description:
            "Taller de confección a la medida en San Miguel, El Salvador. Fabricación de uniformes y scrubs médicos.",
          url: siteConfig.url,
          logo: `${siteConfig.url}/logo.png`,
          sameAs: [
            siteConfig.links.facebook,
            siteConfig.links.instagram,
            siteConfig.links.tiktok,
            siteConfig.links.youtube,
            siteConfig.links.threads,
            siteConfig.links.twitter,
            siteConfig.links.linkedin,
            siteConfig.links.pinterest,
            "https://web.facebook.com/marketplace/profile/61556619779863/",
            siteConfig.links.googleMaps,
          ],
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
            name: "Enlaces",
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
      <LinksPageClient />
    </>
  );
}
