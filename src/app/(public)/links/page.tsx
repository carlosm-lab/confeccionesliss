import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { LinksPageClient } from "./LinksPageClient";

const PAGE_URL = `${siteConfig.url}/links`;
const PAGE_TITLE = "Redes Sociales Oficiales | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Síguenos en Instagram, Facebook, TikTok, YouTube, Threads y más. Todos los perfiles y canales oficiales de Confecciones Liss en un solo lugar.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  keywords:
    "redes sociales Confecciones Liss, Instagram Confecciones Liss, Facebook Confecciones Liss, TikTok Confecciones Liss, YouTube Confecciones Liss, Threads, perfiles oficiales, síguenos",
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
