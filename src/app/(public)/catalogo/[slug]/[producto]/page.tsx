import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ALL_PRODUCTS } from "@/data/products";
import { CATALOG_PAGES } from "@/data/catalog-pages";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// ── SSG: pre-renderiza todas las rutas de productos ──
export function generateStaticParams() {
  const params: { slug: string; producto: string }[] = [];

  CATALOG_PAGES.forEach((page) => {
    const products = page.filterFn(ALL_PRODUCTS);
    products.forEach((p) => {
      params.push({ slug: page.slug, producto: p.id });
    });
  });

  return params;
}

// ── Metadata dinámica ──
type PageParams = { slug: string; producto: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug, producto } = await params;
  const config = CATALOG_PAGES.find((p) => p.slug === slug);
  if (!config) return {};

  const products = config.filterFn(ALL_PRODUCTS);
  const product = products.find((p) => p.id === producto);

  if (!product) return {};

  const title = `${product.nombre} | ${config.title} — Confecciones Liss`;
  const description =
    product.descripcionCorta ??
    `${product.nombre} disponible desde $${product.precio.toFixed(2)}. Confeccionado a la medida en San Miguel, El Salvador.`;

  return {
    title,
    description,
    alternates: { canonical: `${siteConfig.url}/catalogo/${slug}/${producto}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/catalogo/${slug}/${producto}`,
      type: "website",
      siteName: siteConfig.name,
      images: product.imagen
        ? [
            {
              url: product.imagen.startsWith("/")
                ? `${siteConfig.url}${product.imagen}`
                : product.imagen,
            },
          ]
        : undefined,
    },
  };
}

// ── Componente de Página (Server Component) ──
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug, producto } = await params;

  const config = CATALOG_PAGES.find((p) => p.slug === slug);
  if (!config) notFound();

  const products = config.filterFn(ALL_PRODUCTS);
  const product = products.find((p) => p.id === producto);

  if (!product) notFound();

  const breadcrumbItems: { label: string; href?: string }[] = [
    { label: "Inicio", href: "/" },
    { label: "Catálogo", href: "/catalogo" },
  ];

  if (config.parentSector && config.slug !== config.parentSector) {
    const parentConfig = CATALOG_PAGES.find(
      (p) => p.slug === config.parentSector
    );
    breadcrumbItems.push({
      label: parentConfig?.navLabel || config.parentSector,
      href: `/catalogo/${config.parentSector}`,
    });
  }

  breadcrumbItems.push({
    label: config.navLabel,
    href: `/catalogo/${config.slug}`,
  });
  breadcrumbItems.push({ label: product.nombre });

  // JSON-LD Product Schema
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.nombre,
    description:
      product.descripcion ??
      product.descripcionCorta ??
      `${product.nombre} confeccionado a la medida.`,
    image: product.imagen
      ? product.imagen.startsWith("/")
        ? `${siteConfig.url}${product.imagen}`
        : product.imagen
      : undefined,
    brand: {
      "@type": "Brand",
      name: "Confecciones Liss",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.precio.toFixed(2),
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Confecciones Liss",
      },
    },
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola! Me interesa el producto: ${product.nombre} ($${product.precio.toFixed(2)}). ¿Está disponible?`
  );
  const whatsappHref = `${siteConfig.links.whatsappDirect}?text=${whatsappMessage}`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main className="px-5 pt-8 pb-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-screen-2xl">
          <Breadcrumb
            items={breadcrumbItems}
            className="animate-fade-in-up mb-6"
          />

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            {/* Imagen */}
            <div className="bg-surface-container-low relative aspect-square overflow-hidden rounded-2xl">
              {product.imagen ? (
                <Image
                  src={product.imagen}
                  alt={product.imageAlt ?? product.nombre}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-gray-100"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-6xl text-gray-300">
                    image
                  </span>
                </div>
              )}
              {product.showBadge && product.badgeText && (
                <span className="bg-tertiary absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-semibold text-white uppercase">
                  {product.badgeText}
                </span>
              )}
            </div>

            {/* Información */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                  {product.categoria}
                </span>
                <h1 className="text-on-surface mt-1 font-serif text-2xl font-bold md:text-3xl">
                  {product.nombre}
                </h1>
              </div>

              {/* Precio */}
              <div className="flex items-baseline gap-3">
                <span className="text-primary text-3xl font-bold">
                  ${product.precio.toFixed(2)}
                </span>
                {product.precioAnterior && (
                  <span className="text-lg text-gray-400 line-through">
                    ${product.precioAnterior.toFixed(2)}
                  </span>
                )}
                {product.priceSuffix && (
                  <span className="text-sm text-gray-500">
                    {product.priceSuffix}
                  </span>
                )}
              </div>

              {/* Descripción */}
              {product.descripcion && (
                <p className="leading-relaxed text-gray-600">
                  {product.descripcion}
                </p>
              )}

              {/* Material */}
              {product.material && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    aria-hidden="true"
                  >
                    checkroom
                  </span>
                  <span>
                    <strong>Material:</strong> {product.material}
                  </span>
                </div>
              )}

              {/* Características */}
              {product.caracteristicas &&
                product.caracteristicas.length > 0 && (
                  <ul className="space-y-2">
                    {product.caracteristicas.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span
                          className="material-symbols-outlined text-primary mt-0.5 text-base"
                          aria-hidden="true"
                        >
                          check_circle
                        </span>
                        {feat}
                      </li>
                    ))}
                  </ul>
                )}

              {/* Colores */}
              {product.colores && product.colores.length > 0 && (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700">
                    Colores disponibles
                  </h2>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Colores disponibles"
                  >
                    {product.colores.map((color) => (
                      <div
                        key={color.hex}
                        role="listitem"
                        className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1 text-xs"
                      >
                        <span
                          className="inline-block size-3 rounded-full border border-gray-300"
                          style={{ backgroundColor: color.hex }}
                          aria-hidden="true"
                        />
                        {color.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tallas */}
              {product.tallas.length > 0 && (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700">
                    Tallas disponibles
                  </h2>
                  <div
                    className="flex flex-wrap gap-2"
                    role="list"
                    aria-label="Tallas disponibles"
                  >
                    {product.tallas.map((talla) => (
                      <span
                        key={talla}
                        role="listitem"
                        className="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-sm font-medium text-gray-600"
                      >
                        {talla}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary flex flex-1 items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    aria-hidden="true"
                  >
                    shopping_cart
                  </span>
                  Pedir por WhatsApp
                </a>
                <Link
                  href={`/catalogo/${slug}`}
                  className="border-primary text-primary flex flex-1 items-center justify-center gap-2 rounded-xl border py-3 text-sm font-semibold transition-colors hover:bg-blue-50"
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    aria-hidden="true"
                  >
                    arrow_back
                  </span>
                  Ver más en {config.navLabel}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
