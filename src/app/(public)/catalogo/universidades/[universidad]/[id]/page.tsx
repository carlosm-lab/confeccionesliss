import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/catalogo/ProductDetailClient";
import { siteConfig } from "@/config/site";
import {
  getProductBySlug,
  getRelatedProducts,
  getProductMainImage,
  getProductUniversity,
} from "@/lib/catalogService";
import { getProductReviews } from "@/lib/reviewsService";
import { testimonials } from "@/lib/seo-data";
import { CATEGORIES } from "@/data/categories";
import type { Sector } from "@/data/types";

// ── SSG puro + On-Demand Revalidation ──────────────────────────────────────
// No ISR por tiempo. Revalidación on-demand vía src/actions/catalog.ts.
export const dynamicParams = true;

// ── Static params: pre-genera páginas de detalle para cada universidad ─────────
// Una sola query a Supabase en lugar de 6. Deriva la universidad del slug
// compuesto de categoría: "ieproes-enfermeria" → "ieproes".
const VALID_UNIVERSITY_SLUGS = new Set([
  "univo",
  "ieproes",
  "ugb",
  "unab",
  "ues",
  "uma",
]);

export async function generateStaticParams(): Promise<
  { universidad: string; id: string }[]
> {
  try {
    const { getSupabaseClient } = await import("@/lib/supabaseClient");
    const supabase = getSupabaseClient();

    const { data } = await supabase
      .from("products")
      .select("slug, category")
      .eq("is_active", true)
      .eq("sector", "universitario")
      .not("slug", "is", null)
      .not("category", "is", null);

    if (!data) return [];

    const params: { universidad: string; id: string }[] = [];
    for (const p of data as { slug: string; category: string }[]) {
      // Slug compuesto: "ieproes-enfermeria" → universidad = "ieproes"
      // Slug simple:    "ieproes"            → universidad = "ieproes"
      const universitySlug = p.category.split("-")[0];
      if (VALID_UNIVERSITY_SLUGS.has(universitySlug)) {
        params.push({ universidad: universitySlug, id: p.slug });
      }
    }
    return params;
  } catch {
    // Si Supabase no está disponible, dynamicParams = true genera on-demand
    return [];
  }
}

// ── Schema constants ─ Calificación agregada — 21 reseñas de Google Maps ────
const PRODUCT_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.9",
  ratingCount: "21",
  reviewCount: "21",
  bestRating: "5",
  worstRating: "1",
} as const;

// ── Reseñas reales de Google Maps — fuente verificada ────────────────────
const PRODUCT_REVIEWS = [
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Juan Carlos Garcia" },
    reviewBody:
      "Pedí uniformes para un grupo de compañeras de enfermería y todo salió perfecto todos los scrubs quedaron bien hechos, en las medidas exactas de cada una, y los entregaron en el tiempo acordado ña atención por WhatsApp fue rápida y clara durante todo el proceso. ademas la señora me recuerda a mi abuelita :)",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2025-06-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "José Antonio dias" },
    reviewBody:
      "Excelente taller de uniformes médicos y scrubs en San Miguel, la atención rápida por WhatsApp, precios justos y lo más importante es que hacen los uniformes a la medida de cada persona. Yo tengo una talla difícil de encontrar y aquí no fue ningún problema ademas ni me cobraron demas por talla extra.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2025-06-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Kairo Boutique" },
    reviewBody:
      "Mandamos a hacer los uniformes de la tienda en Confecciones Liss y la verdad es que quedamos muy satisfechos, precios comodos, nos hicieron descuento por mayoreo, en fin, encantados.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2025-06-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Iris M." },
    reviewBody: "Uniformes confeccionados a la perfección",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-05-15",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "RUTH MEJIA" },
    reviewBody:
      "Excelente calidad, me encanta su trabajo y sobre todo la responsabilisad",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-06-10",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Marlyn Antonio Palacio Reyes" },
    reviewBody:
      "Una confección 10/10, muy recomendable me ha ayudado demasiado para mis uniformes de la universidad",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-03",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "ツツ" },
    reviewBody:
      "¡Excelente servicio en Confección Liss! El trabajo que hacen es de primera calidad, con acabados impecables y mucha atención al detalle. Además, la atención al cliente es muy amable y cumplen con los tiempos de entrega. Totalmente recomendados.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Manuel Godoy" },
    reviewBody:
      "Excelente , uniformes a la medida confecciones segun los gustos personalizados y tela de alta calidad y confeccion",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Damaris Navarrete" },
    reviewBody: "Excelente atención y calidad en las confecciones",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Gerardo Vargas" },
    reviewBody: "buena atención y exelente trabajo.",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-02",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Erick Josue fuentes" },
    reviewBody: "Buenos trabajos",
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Erick Salvador" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-06-20",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Carlitos" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-02",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Antonio Guzmán" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-03",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "José Menéndez" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-02",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Jackelline Lisseth Molina Villacorta" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-02",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Carlos Molina" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Karla Vanessa Perla Blanco" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Isaac Padilla" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Kenia Yaritza Pérez Martínez" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-01",
  },
  {
    "@type": "Review",
    author: { "@type": "Person", name: "Enmanuel Mejía" },
    reviewRating: {
      "@type": "Rating",
      ratingValue: "5",
      bestRating: "5",
      worstRating: "1",
    },
    datePublished: "2026-07-03",
  },
];

const SHIPPING_DETAILS_SV = {
  "@type": "OfferShippingDetails",
  shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: "SV" },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 3,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 3,
      unitCode: "DAY",
    },
  },
} as const;

const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "SV",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 7,
  returnMethod: "https://schema.org/ReturnInStore",
  returnFees: "https://schema.org/FreeReturn",
} as const;

// ── Metadata ───────────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ universidad: string; id: string }>;
}): Promise<Metadata> {
  const { universidad, id } = await params;
  const product = await getProductBySlug(id);
  if (!product) return { title: "Producto no encontrado" };

  const productUniv = getProductUniversity(product);
  if (productUniv !== universidad) return { title: "Producto no encontrado" };

  const config = CATEGORIES["universitario" as Sector];
  const PAGE_URL = `${siteConfig.url}/catalogo/universidades/${universidad}/${id}`;
  const autoTitle = `${product.name} | ${config?.subtitle ?? "Uniformes Universitarios"}`;
  const autoDescription =
    product.short_description ?? product.description ?? product.name;
  const imageUrl = getProductMainImage(product);
  const absoluteImage = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`
    : undefined;

  // ── Campos SEO manuales (prioridad sobre automático si no son null/empty) ──
  const seoTitle = product.seo_title?.trim() || autoTitle;
  const seoDescription = product.seo_description?.trim() || autoDescription;
  const seoKeywords = product.seo_keywords?.trim() || undefined;
  const seoPublisher = product.seo_publisher?.trim() || siteConfig.name;

  // Parsear seo_robots ("noindex, nofollow" → { index: false, follow: false })
  let robotsDirective: { index: boolean; follow: boolean } = {
    index: true,
    follow: true,
  };
  if (product.seo_robots?.trim()) {
    robotsDirective = {
      index: !product.seo_robots.includes("noindex"),
      follow: !product.seo_robots.includes("nofollow"),
    };
  }

  return {
    title: seoTitle,
    description: seoDescription,
    ...(seoKeywords && { keywords: seoKeywords }),
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: `${product.seo_title?.trim() || product.name} | ${seoPublisher}`,
      description: seoDescription ?? undefined,
      url: PAGE_URL,
      siteName: seoPublisher,
      locale: "es_SV",
      type: "website",
      ...(absoluteImage && {
        images: [
          {
            url: absoluteImage,
            secureUrl: absoluteImage,
            width: 1200,
            height: 630,
            alt: product.name,
            type: "image/webp",
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.seo_title?.trim() || product.name,
      description: seoDescription ?? undefined,
      creator: siteConfig.twitterHandle,
      site: siteConfig.twitterHandle,
      ...(absoluteImage && { images: [absoluteImage] }),
    },
    robots: robotsDirective,
    ...(siteConfig.facebookAppId && {
      facebook: {
        appId: siteConfig.facebookAppId,
      },
    }),
  };
}

// ── Página ────────────────────────────────────────────────────────────────────
export default async function UniversityProductDetailPage({
  params,
}: {
  params: Promise<{ universidad: string; id: string }>;
}) {
  const { universidad, id } = await params;
  const product = await getProductBySlug(id);
  const config = CATEGORIES["universitario" as Sector];

  if (!product || !config) notFound();

  const productUniv = getProductUniversity(product);
  if (productUniv !== universidad) {
    notFound();
  }

  const [relatedProducts, reviewData] = await Promise.all([
    getRelatedProducts("universitario", id, 6),
    getProductReviews(product.id),
  ]);

  const PAGE_URL = `${siteConfig.url}/catalogo/universidades/${universidad}/${id}`;
  const description =
    product.short_description ?? product.description ?? product.name;
  const imageUrl = getProductMainImage(product);
  const productImageAbsolute = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`
    : undefined;

  const hasRealReviews = reviewData.totalCount > 0;
  const jsonLdAggregateRating = hasRealReviews
    ? {
        "@type": "AggregateRating",
        ratingValue: reviewData.averageRating,
        ratingCount: reviewData.totalCount,
        reviewCount: reviewData.totalCount,
        bestRating: 5,
        worstRating: 1,
      }
    : PRODUCT_AGGREGATE_RATING;

  const jsonLdReviews = hasRealReviews
    ? reviewData.reviews.map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.user_name },
        reviewBody: r.comment,
        reviewRating: {
          "@type": "Rating",
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        datePublished: r.created_at.slice(0, 10),
      }))
    : PRODUCT_REVIEWS;

  return (
    <>
      {imageUrl && (
        <link
          rel="preload"
          as="image"
          href={
            imageUrl.startsWith("http")
              ? imageUrl
              : `${siteConfig.url}${imageUrl}`
          }
          fetchPriority="high"
        />
      )}

      <ProductDetailClient
        product={product}
        config={config}
        relatedProducts={relatedProducts}
        initialReviews={reviewData.reviews}
        averageRating={reviewData.averageRating}
        totalCount={reviewData.totalCount}
      />

      {/* JSON-LD: Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description,
            image: productImageAbsolute ? [productImageAbsolute] : undefined,
            url: PAGE_URL,
            sku: `LIS-${product.id.split("-")[0].toUpperCase()}`,
            ...(product.category && { category: product.category }),
            ...(product.material && { material: product.material }),
            brand: { "@type": "Brand", name: siteConfig.name },
            offers: {
              "@type": "Offer",
              price: Number(product.price).toFixed(2),
              priceCurrency: "USD",
              availability:
                product.is_active !== false
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
              url: PAGE_URL,
              // Fecha de inicio de la oferta — requerido por Google Merchant Listing
              validFrom: `${new Date().getFullYear()}-01-01`,
              priceValidUntil: `${new Date().getFullYear()}-12-31`,
              seller: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
              shippingDetails: SHIPPING_DETAILS_SV,
              hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
            },
            aggregateRating: jsonLdAggregateRating,
            review: jsonLdReviews,
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* JSON-LD: BreadcrumbList — 5 niveles: Inicio › Catálogo › Universidades › [SIGLA] › [Producto] */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
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
                name: "Catálogo",
                item: `${siteConfig.url}/catalogo`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Universidades",
                item: `${siteConfig.url}/catalogo/universidades`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: universidad.toUpperCase(),
                item: `${siteConfig.url}/catalogo/universidades/${universidad}`,
              },
              {
                "@type": "ListItem",
                position: 5,
                name: product.name,
                item: PAGE_URL,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
