import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES } from "@/data/categories";
import { ProductDetailClient } from "@/components/catalogo/ProductDetailClient";
import { siteConfig } from "@/config/site";
import type { Sector } from "@/data/types";
import {
  getProductBySlug,
  getRelatedProducts,
  getProductSector,
  getProductMainImage,
  getAllProductsForSitemap,
} from "@/lib/catalogService";
import { getProductReviews } from "@/lib/reviewsService";
import { testimonials } from "@/lib/seo-data";

// ── SSG puro + On-Demand Revalidation ──────────────────────────────────────
// No ISR por tiempo. Revalidación on-demand vía src/actions/catalog.ts.

// ── dynamicParams: true (default) — productos nuevos post-build se generan
// on-demand la primera vez y luego se cachean como estáticos (SSG diferido) ──
export const dynamicParams = true;

// ── generateStaticParams: pre-genera TODAS las páginas de producto en build ──
// Google recibe HTML pre-construido → SSG real, sin SSR on-demand
export async function generateStaticParams(): Promise<
  { sector: string; id: string }[]
> {
  try {
    const products = await getAllProductsForSitemap();
    return products
      .filter((p) => p.slug && p.sector)
      .map((p) => ({
        sector: p.sector,
        id: p.slug,
      }));
  } catch {
    // Si Supabase no está disponible en build time, Next.js caerá en
    // dynamicParams = true y generará on-demand (sin romper el build)
    return [];
  }
}

// ── Calificación agregada — 21 reseñas reales de Google Maps ─────────────────
const PRODUCT_AGGREGATE_RATING = {
  "@type": "AggregateRating",
  ratingValue: "4.9",
  ratingCount: "21",
  reviewCount: "21",
  bestRating: "5",
  worstRating: "1",
} as const;

// ── Reseñas reales de Google Maps — fuente verificada ────────────────────────
// Recuperadas del historial de commits tras optimizaciones de rendimiento
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

// Política de envío para El Salvador (OfferShippingDetails)
const SHIPPING_DETAILS_SV = {
  "@type": "OfferShippingDetails",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "0",
    currency: "USD",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "SV",
  },
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

// Política de devoluciones
const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "SV",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 7,
  returnMethod: "https://schema.org/ReturnInStore",
  returnFees: "https://schema.org/FreeReturn",
} as const;

// ── Dynamic metadata per product ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ sector: string; id: string }>;
}): Promise<Metadata> {
  const { sector, id } = await params;
  const product = await getProductBySlug(id);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  const productSector = getProductSector(product);
  if (productSector !== sector || sector === "universitario") {
    return { title: "Producto no encontrado" };
  }

  const config = CATEGORIES[sector as Sector];
  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}/${id}`;

  // ── Valores automáticos (comportamiento pre-existente) ──
  const autoTitle = `${product.name} | ${config?.subtitle ?? "Catálogo"}`;
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
            // 1200×630 es el estándar recomendado para Facebook, Instagram,
            // LinkedIn, Pinterest y X. La imagen del producto es cuadrada (1:1)
            // y se recortará en las previsualizaciones — esto es normal.
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

// ── Page ─────────────────────────────────────────────────────────────────────
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ sector: string; id: string }>;
}) {
  const { sector, id } = await params;
  const config = CATEGORIES[sector as Sector];

  // Fetch product from Supabase by slug
  const product = await getProductBySlug(id);

  if (!config || !product || sector === "universitario") {
    notFound();
  }

  const productSector = getProductSector(product);
  if (productSector !== sector) {
    notFound();
  }

  // Fetch related products AND real reviews in parallel (no waterfall)
  const [relatedProducts, reviewData] = await Promise.all([
    getRelatedProducts(productSector, id, 6),
    getProductReviews(product.id),
  ]);

  const PAGE_URL = `${siteConfig.url}/catalogo/${sector}/${id}`;
  const description =
    product.short_description ?? product.description ?? product.name;
  const imageUrl = getProductMainImage(product);
  const productImageAbsolute = imageUrl
    ? imageUrl.startsWith("http")
      ? imageUrl
      : `${siteConfig.url}${imageUrl}`
    : undefined;

  // ── JSON-LD: Use real reviews when available, else fallback to testimonials
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
      {/* LCP preload: main product image — evita el warning de Next.js y mejora Core Web Vitals */}
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

      {/* JSON-LD: Product — Rich Results (aggregateRating + review + Offer completo) */}
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
            // Identificadores de categoría
            ...(product.category && { category: product.category }),
            // Material del producto (si está disponible)
            ...(product.material && { material: product.material }),
            // Marca
            brand: {
              "@type": "Brand",
              name: siteConfig.name,
            },
            // Oferta — Merchant Listing completo
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
              // Precio válido hasta fin del año corriente
              priceValidUntil: `${new Date().getFullYear()}-12-31`,
              seller: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
              },
              // Envío a El Salvador
              shippingDetails: SHIPPING_DETAILS_SV,
              // Política de devoluciones
              hasMerchantReturnPolicy: MERCHANT_RETURN_POLICY,
            },
            // ⭐ Calificación agregada — real si hay reseñas, fallback a testimonios
            aggregateRating: jsonLdAggregateRating,
            // ⭐ Reseñas — reales si existen, fallback a testimonios verificados
            review: jsonLdReviews,
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* JSON-LD: BreadcrumbList */}
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
                name: config.subtitle,
                item: `${siteConfig.url}/catalogo/${sector}`,
              },
              {
                "@type": "ListItem",
                position: 4,
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
