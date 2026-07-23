import Link from "next/link";
import { StaticHeroImage } from "@/components/ui/StaticHeroImage";
import {
  schemaFAQ,
  buildWebPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/schemas";
import { heroTrustBadges, whyItems, processSteps } from "@/lib/seo-data";
import { CatalogProductCard } from "@/components/catalogo/CatalogProductCard";
import { siteConfig } from "@/config/site";
import { getRecentProducts } from "@/lib/catalogService";
import { getGoogleReviews } from "@/lib/googleReviewsService";
import { ServiciosPrincipales } from "@/components/seo/ServiciosPrincipales";
import { NapContacto } from "@/components/seo/NapContacto";
import { GoogleReviews } from "@/components/seo/GoogleReviews";

import type { Metadata } from "next";

// Metadata explícita para la homepage — usa { absolute } para evitar que el template
// del layout raíz duplique "| Confecciones Liss" al final del título.
export const metadata: Metadata = {
  title: {
    absolute: "Scrubs y Uniformes Médicos en San Miguel, El Salvador | Liss",
  },
  description:
    "Empresa de uniformes médicos y universitarios en San Miguel, El Salvador. Scrubs, uniformes para IEPROES, UNIVO, UNAB, UGB, UES y UMA. Desde $35.",
  alternates: { canonical: siteConfig.url },
  openGraph: {
    title: "Scrubs y Uniformes Médicos en San Miguel, El Salvador | Liss",
    description:
      "Empresa de uniformes médicos y universitarios en San Miguel, El Salvador. Scrubs, uniformes para IEPROES, UNIVO, UNAB, UGB, UES y UMA. Desde $35.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Scrubs y Uniformes Médicos en San Miguel, El Salvador | Liss",
    description:
      "Empresa de uniformes médicos y universitarios en San Miguel, El Salvador. Scrubs, uniformes para IEPROES, UNIVO, UNAB, UGB, UES y UMA. Desde $35.",
    creator: siteConfig.twitterHandle,
  },
};

// ── SSG + On-Demand Revalidation (ISR) ──────────────────────────────────────
// revalidate = 3600 (1h) habilita ISR real en Vercel:
//   - La página se pre-renderiza en build time y se distribuye a TODOS los CDN edges.
//   - Se regenera automáticamente cada hora y también bajo demanda via revalidatePath('/').
// revalidate = false causaba que cada edge node renderizara la página en su primer hit
// (lazy cold-start), produciendo FCP variable de 1.5s vs 2.4s entre audits consecutivos.
export const revalidate = 3600;

export default async function HomePage() {
  // Load recent products and reviews in parallel to minimize TTFB on cold starts
  const [rawRecentProducts, rawReviews] = await Promise.all([
    getRecentProducts(10),
    getGoogleReviews(),
  ]);

  const recentProducts = rawRecentProducts.map((p) => {
    // 1. Resolve LCP image in server
    let rawImg = null;
    if (p.images && Array.isArray(p.images) && p.images.length > 0) {
      rawImg = p.images[0];
    } else {
      rawImg = p.image_path ?? null;
    }

    // 2. Compute sector in server
    const sector =
      p.sector ??
      p.categories?.catalog ??
      p.category?.split("-")[0] ??
      "scrubs";

    // 3. Resolve display and list prices in server
    const priceBySize = p.price_by_size;
    const offerBySize = p.offer_by_size;
    const minBasePrice =
      priceBySize && Object.keys(priceBySize).length > 0
        ? Math.min(...Object.values(priceBySize))
        : Number(p.price);

    const validOfferEntries =
      offerBySize && priceBySize
        ? Object.entries(offerBySize).filter(([talla, offerP]) => {
            const baseP = priceBySize[talla];
            return baseP !== undefined && offerP < baseP;
          })
        : [];
    const minOfferPrice =
      validOfferEntries.length > 0
        ? Math.min(...validOfferEntries.map(([, price]) => price))
        : null;

    const finalPrice = minOfferPrice !== null ? minOfferPrice : minBasePrice;

    const rawOldPrice =
      minOfferPrice !== null
        ? minBasePrice
        : p.old_price
          ? Number(p.old_price)
          : null;
    const finalOldPrice =
      rawOldPrice !== null && rawOldPrice > finalPrice ? rawOldPrice : null;

    // 4. Determine sale status in server
    let onSale = false;
    const hasOfferBySize = offerBySize && Object.keys(offerBySize).length > 0;
    const hasGlobalOldPrice = p.old_price && p.old_price > p.price;
    if (hasOfferBySize || hasGlobalOldPrice) {
      const now = new Date();
      const startOk = !p.offer_starts_at || new Date(p.offer_starts_at) <= now;
      const endOk = !p.offer_ends_at || new Date(p.offer_ends_at) > now;
      onSale = startOk && endOk;
    }

    return {
      id: p.id,
      name: p.name,
      price: finalPrice,
      old_price: finalOldPrice,
      image_path: rawImg,
      images: null,
      slug: p.slug ?? p.id,
      sector,
      price_by_size: null,
      offer_by_size: null,
      offer_ends_at: onSale ? "active" : null,
      offer_starts_at: null,
      categories: null,
      category: p.category,
    };
  }) as unknown as typeof rawRecentProducts;

  // Process reviews, slicing to top 8 with real comments to reduce HTML size by ~30KB
  const reviews = [...rawReviews]
    .sort((a, b) => {
      const hasCommentA = a.comment ? 1 : 0;
      const hasCommentB = b.comment ? 1 : 0;
      if (hasCommentA !== hasCommentB) return hasCommentB - hasCommentA;
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    })
    .slice(0, 8);

  return (
    <>
      {/* ═══ JSON-LD STRUCTURED DATA ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              buildWebPageSchema({
                url: siteConfig.url,
                name: "Scrubs y Uniformes Médicos en San Miguel, El Salvador | Liss",
                description:
                  "Empresa de uniformes médicos y universitarios en San Miguel, El Salvador. Scrubs, uniformes para IEPROES, UNIVO, UNAB, UGB, UES y UMA. Desde $35.",
              }),
              buildBreadcrumbSchema([{ name: "Inicio", item: siteConfig.url }]),
              schemaFAQ,
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* ═══ HERO ═══ */}
      <section className="bg-surface-container-low relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
        <div className="mx-auto grid h-full w-full max-w-screen-2xl grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2 lg:grid-cols-12 lg:items-center lg:gap-x-16 lg:gap-y-0">
          {/* TÍTULO HERO (Ocupa ancho completo en móvil/tablet, 7 cols en desktop) */}
          <div className="z-10 order-1 w-full md:col-span-2 lg:order-none lg:col-span-7 lg:row-span-1">
            <h1 className="animate-fade-in-up text-primary mb-5 w-full text-center font-serif text-2xl leading-[1.15] tracking-tight sm:text-3xl md:mb-8 md:flex md:flex-col md:items-center md:text-4xl lg:mb-5 lg:block lg:text-left lg:text-4xl xl:text-5xl xl:leading-[1.1]">
              <span className="text-center lg:text-left">
                Scrubs y Uniformes para Salud y Universidad{" "}
              </span>
              <span className="text-secondary font-serif md:mt-2 md:flex md:w-full md:items-center md:justify-center md:gap-4 lg:mt-0 lg:inline lg:gap-0">
                {/* LÍNEA DECORATIVA IZQUIERDA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="to-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r from-transparent" />
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                </span>

                <span className="shrink-0">en El Salvador</span>

                {/* LÍNEA DECORATIVA DERECHA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                  <span className="from-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r to-transparent" />
                </span>
              </span>
            </h1>
          </div>

          {/* IMAGEN HERO ÚNICA - OPTIMIZADA RESPONSIVE (Evita duplicación de descargas) */}
          <div className="order-2 flex w-full max-w-sm self-center md:order-3 md:col-span-1 md:h-full md:max-w-none md:self-stretch lg:order-none lg:col-span-5 lg:row-span-2 lg:h-full lg:items-center">
            <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
              <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
              <div className="relative aspect-[4/5] w-full rounded-xl md:aspect-auto md:h-full md:w-full">
                {/* SSR static image — visible before JS hydrates (fixes LCP) */}
                <StaticHeroImage sizes="(max-width:768px) 80vw, 40vw" />
              </div>
            </div>
          </div>

          {/* COLUMNA DE TEXTO Y ACCIONES */}
          <div className="order-3 flex w-full flex-col items-start md:order-2 md:col-span-1 md:justify-center lg:order-none lg:col-span-7 lg:row-span-1">
            <p
              className="animate-fade-in-up text-on-surface-variant font-body mb-5 w-full text-sm leading-relaxed sm:text-base md:text-base lg:mb-5 lg:text-lg"
              style={{ animationDelay: "150ms" }}
            >
              Empresa especializada en scrubs médicos y uniformes universitarios
              en tela Sincatex y Lino Oxford. Uniformes para UNIVO, UNAB, UGB,
              colegios y empresas. Bordados, sublimación y envío a todo El
              Salvador. <strong>Desde $35 USD.</strong>
            </p>
            <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2">
              {heroTrustBadges.map((b, index) => (
                <div
                  key={b.text}
                  className="animate-fade-in-up border-primary/5 text-secondary flex w-full items-center gap-2 rounded-full border bg-white/60 px-2.5 py-1.5 text-xs font-medium shadow-xs backdrop-blur-xs sm:text-sm"
                  style={{ animationDelay: `${index * 50 + 200}ms` }}
                >
                  <span className="material-symbols-outlined text-primary flex h-6 w-6 shrink-0 items-center justify-center text-[16px] font-bold">
                    {b.icon}
                  </span>
                  <span className="leading-tight font-semibold text-gray-700">
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/catalogo"
                prefetch={false}
                className="animate-fade-in-up btn-gradient font-body ambient-shadow flex h-12 w-full items-center justify-center rounded-md px-12 text-center text-base font-semibold whitespace-nowrap text-white transition hover:opacity-90 active:scale-[0.97] sm:flex-1"
                style={{ animationDelay: "400ms" }}
              >
                Catálogo
              </Link>
              <a
                href="https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="animate-fade-in-up border-outline text-primary hover:bg-surface-variant/50 flex h-12 w-full items-center justify-center rounded-md border bg-transparent px-12 text-center font-serif text-base font-medium whitespace-nowrap transition active:scale-[0.97] sm:flex-1"
                style={{ animationDelay: "450ms" }}
              >
                Cómo llegar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NOVEDADES (productos reales desde Supabase) ═══ */}
      {recentProducts.length > 0 && (
        <section className="bg-surface lazy-section px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-12 flex items-end justify-between lg:pr-12">
              <h2 className="animate-fade-in-up text-primary font-serif text-4xl">
                Novedades en Uniformes y Scrubs
              </h2>
              <Link
                href="/catalogo"
                prefetch={false}
                className="text-primary text-sm font-bold hover:underline"
              >
                <span className="hidden lg:inline">Ver catálogo completo</span>
                <span className="sr-only">Ver catálogo completo</span>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
              {recentProducts.map((product, index) => {
                const visibilityClass =
                  index >= 8
                    ? "hidden lg:block"
                    : index >= 6
                      ? "hidden md:block"
                      : "block";

                return (
                  <div
                    key={product.id}
                    className={`animate-fade-in-up h-full w-full ${visibilityClass}`}
                    style={{ animationDelay: `${index * 50 + 150}ms` }}
                  >
                    <CatalogProductCard product={product} priority={false} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ═══ SERVICIOS PRINCIPALES (NEW) ═══ */}
      <ServiciosPrincipales />

      {/* ═══ ¿POR QUÉ ELEGIRNOS? (updated content) ═══ */}
      <section className="bg-surface-container-low border-surface-variant/50 lazy-section border-t border-b px-5 py-14 md:px-8 md:py-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="animate-fade-in-up section-title">
              ¿Por qué elegir Confecciones Liss en San Miguel?
            </h2>
            <div
              className="animate-fade-in-up bg-tertiary mt-6 h-1 w-16 rounded-full"
              style={{ animationDelay: "100ms" }}
            ></div>
          </div>
          <div className="flex flex-col gap-6 lg:grid lg:grid-cols-4 lg:gap-6">
            {whyItems.map((w, index) => (
              <div
                key={w.title}
                className="animate-fade-in-up flex flex-row items-start gap-4 text-left lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                style={{ animationDelay: `${index * 75 + 150}ms` }}
              >
                <div className="bg-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white lg:mb-6 lg:h-16 lg:w-16">
                  <span className="material-symbols-outlined text-3xl">
                    {w.icon}
                  </span>
                </div>
                <div>
                  <h3 className="text-primary mb-1 font-serif text-lg lg:mb-3 lg:text-xl">
                    {w.title}
                  </h3>
                  <p className="text-on-surface-variant font-body text-sm">
                    {w.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GOOGLE REVIEWS (dynamic) ═══ */}
      <GoogleReviews reviews={reviews} />

      {/* ═══ CTA INSTITUCIONAL (updated content) ═══ */}
      <section
        aria-labelledby="institucional-heading"
        className="bg-primary px-5 py-14 text-white md:px-8 md:py-20"
      >
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="animate-fade-in-up md:w-2/3">
            <h2
              id="institucional-heading"
              className="mb-4 font-serif text-2xl leading-tight md:text-3xl lg:text-4xl"
            >
              ¿Necesitas uniformes para tu clínica, hospital, colegio o empresa?
            </h2>
            <p className="text-primary-container text-lg">
              Atendemos pedidos institucionales para todo El Salvador. Precios
              especiales por volumen, bordado de logo institucional y entrega en
              tu sede. Clínicas privadas, hospitales, colegios, empresas y más.
            </p>
          </div>
          <div
            className="animate-fade-in-up flex md:w-1/3 md:justify-end"
            style={{ animationDelay: "150ms" }}
          >
            <a
              href={siteConfig.links.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-body hover:bg-surface-container w-full rounded-md bg-white px-8 py-4 text-center font-bold transition active:scale-[0.97] md:w-auto"
            >
              Solicitar cotización institucional
            </a>
          </div>
        </div>
      </section>

      {/* ═══ NAP + CONTACTO (NEW) ═══ */}
      <NapContacto />
    </>
  );
}
