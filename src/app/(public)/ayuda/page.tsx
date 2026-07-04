import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { AYUDA_CATEGORIES, TOTAL_AYUDA_QUESTIONS } from "@/data/ayuda";
import { AyudaPageClient } from "./AyudaPageClient";

const PAGE_URL = `${siteConfig.url}/ayuda`;
const PAGE_TITLE = "Ayuda sobre Scrubs y Uniformes Médicos | Liss El Salvador";
const PAGE_DESCRIPTION =
  "Resuelve tus dudas sobre scrubs, uniformes médicos, universitarios y escolares en San Miguel, El Salvador: precios, tallas, envíos, bordados y garantía.";

export const metadata: Metadata = {
  title: {
    absolute: PAGE_TITLE,
  },
  description: PAGE_DESCRIPTION,
  keywords:
    "scrubs El Salvador, uniformes médicos San Miguel, filipina médica El Salvador, gabacha médica, uniformes de enfermería, uniformes universitarios UNIVO UGB UNAB UMA IEPROES UES, uniformes escolares San Miguel, preguntas frecuentes uniformes, ayuda Confecciones Liss",
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

export default function AyudaPage() {
  // Build FAQPage schema containing all 156 questions
  const faqEntities = AYUDA_CATEGORIES.flatMap((cat) =>
    cat.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    }))
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: PAGE_TITLE,
        description: PAGE_DESCRIPTION,
        inLanguage: "es-SV",
        isPartOf: { "@id": `${siteConfig.url}/#website` },
        about: { "@id": `${siteConfig.url}/#business` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${PAGE_URL}#breadcrumb`,
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
            name: "Ayuda",
            item: PAGE_URL,
          },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqEntities,
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
      <AyudaPageClient
        categories={AYUDA_CATEGORIES}
        totalQuestions={TOTAL_AYUDA_QUESTIONS}
      />
    </>
  );
}
