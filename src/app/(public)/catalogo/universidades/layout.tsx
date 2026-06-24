import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

// ── Metadata del hub de universidades ──────────────────────────────────────────
// La página /catalogo/universidades es "use client" (interactiva: collage de logos,
// animaciones, hover states), por lo que no puede exportar generateMetadata.
// Este layout la envuelve y provee los metadatos SEO correctos.
// Las páginas hijas /[universidad] tienen su propio generateMetadata que SOBRESCRIBE
// este (Next.js usa el metadata más específico — el de la página gana al layout).
const PAGE_URL = `${siteConfig.url}/catalogo/universidades`;

export const metadata: Metadata = {
  title:
    "Uniformes Universitarios | UNIVO, IEPROES, UGB, UES, UNAB, UMA — Confecciones Liss",
  description:
    "Scrubs clínicos con colores oficiales para UNIVO, IEPROES, UGB, UNAB, UES y UMA. Confeccionados a la medida en San Miguel, El Salvador. Tela Sincatex, bordado de carrera incluido. Desde $39.50.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "Uniformes Universitarios — Confecciones Liss",
    description:
      "Scrubs con colores oficiales para las universidades de la zona oriental de El Salvador. UNIVO, IEPROES, UGB, UES, UNAB, UMA.",
    url: PAGE_URL,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Uniformes Universitarios | UNIVO, IEPROES, UGB, UES — Confecciones Liss",
    description:
      "Scrubs con colores oficiales para universidades de El Salvador. Bordado de carrera incluido.",
    creator: siteConfig.twitterHandle,
  },
  robots: { index: true, follow: true },
};

export default function UniversidadesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
