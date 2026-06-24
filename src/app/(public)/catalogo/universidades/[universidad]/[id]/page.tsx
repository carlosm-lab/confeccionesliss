import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetailClient } from "@/components/catalogo/ProductDetailClient";
import { siteConfig } from "@/config/site";
import {
  getProductBySlug,
  getRelatedProducts,
  getProductMainImage,
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

// ── Schema constants ───────────────────────────────────────────────────────────
const PRODUCT_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "5.0",
  ratingCount: "3",
  reviewCount: "3",
  bestRating: "5",
  worstRating: "1",
} as const;

const PRODUCT_REVIEWS = testimonials.map((t) => ({
  "@type": "Review",
  author: { "@type": "Person", name: t.nombre },
  reviewBody: t.texto,
  reviewRating: {
    "@type": "Rating",
    ratingValue: String(t.stars),
    bestRating: "5",
    worstRating: "1",
  },
  datePublished: "2025-06-01",
}));

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
  const { id } = await params;
  const product = await getProductBySlug(id);
  if (!product) return { title: "Producto no encontrado" };

  const config = CATEGORIES["universitario" as Sector];
  const PAGE_URL = `${siteConfig.url}/catalogo/universidades/${(await params).universidad}/${id}`;
  const autoTitle = `${product.name} | ${config?.subtitle ?? "Uniformes Universitarios"}`;
  const autoDescription =
    product.short_description ?? product.description ?? product.name;
  const imageUrl = getProductMainImage(product);
  const absoluteImage = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`
    : undefined;

  return {
    title: product.seo_title?.trim() || autoTitle,
    description: product.seo_description?.trim() || autoDescription,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: product.name,
      description: autoDescription ?? undefined,
      url: PAGE_URL,
      siteName: siteConfig.name,
      locale: "es_SV",
      type: "website",
      ...(absoluteImage && {
        images: [
          { url: absoluteImage, width: 800, height: 800, alt: product.name },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: autoDescription ?? undefined,
      creator: siteConfig.twitterHandle,
    },
    robots: { index: true, follow: true },
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
            sku: product.slug ?? product.id,
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
