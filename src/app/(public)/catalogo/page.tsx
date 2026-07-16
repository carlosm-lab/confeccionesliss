import type { Metadata } from "next";
import { CategoryHubClient } from "@/components/catalogo/CategoryHubClient";
import { siteConfig } from "@/config/site";
import { getProductCountsBySector } from "@/lib/catalogService";
import { OffersReadTracker } from "@/components/ui/OffersReadTracker";

const PAGE_URL = `${siteConfig.url}/catalogo`;
const PAGE_TITLE = "Catálogo de Uniformes por Categoría";
const PAGE_DESCRIPTION =
  "Catálogo de uniformes en Confecciones Liss: scrubs médicos, universitarios, escolares y más. Confección a la medida desde $8, envíos a todo El Salvador.";

// ── SSG + On-Demand Revalidation (ISR) ──────────────────────────────────────
// revalidate = 86400 (24h) habilita la infraestructura de ISR en Vercel,
// permitiendo que revalidatePath('/catalogo') purgue el CDN en caché bajo demanda.
export const revalidate = false;

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
  },
};

export default async function CatalogoPage() {
  // Fetch product counts from Supabase server-side
  const productCounts = await getProductCountsBySector();
  const totalProducts = Object.values(productCounts).reduce(
    (sum, n) => sum + n,
    0
  );

  return (
    <>
      {/* LCP preloads for category hub page */}
      <link
        rel="preload"
        as="image"
        href="/images/categorias/scrubs.webp"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/categorias/universitarios.webp"
        fetchPriority="high"
      />

      <OffersReadTracker />
      <CategoryHubClient productCounts={productCounts} />

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
            numberOfItems: totalProducts,
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
