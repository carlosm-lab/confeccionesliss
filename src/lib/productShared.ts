// ──────────────────────────────────────────────────────────────
// PRODUCT SHARED UTILITIES — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Utilidades síncronas y definiciones de tipos para productos.
// Seguro para importar tanto en Server como en Client Components
// ya que NO tiene dependencias de Supabase, @/env (zod), ni next/cache.
// ──────────────────────────────────────────────────────────────

/** Producto tal como viene de la tabla `products` de Supabase */
export interface DbProduct {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  price: number;
  old_price: number | null;
  offer_ends_at: string | null;
  offer_starts_at: string | null;
  offer_type: string | null;
  category: string | null;
  category_id: string | null;
  tags: string[] | null;
  image_path: string | null;
  images: string[] | null;
  is_active: boolean;
  slug: string | null;
  sector: string | null;
  tallas: string[] | null;
  colores: { name: string; hex: string }[] | null;
  colores_label: string | null;
  material: string | null;
  caracteristicas: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  price_by_size: Record<string, number> | null;
  offer_by_size: Record<string, number> | null;
  categories?: { name: string; catalog: string } | null;
  offer_terms?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  seo_keywords?: string | null;
  seo_robots?: string | null;
  seo_publisher?: string | null;
  base_price?: number | null;
  ocasion?: string[] | null;
  dimensiones?: string | null;
  cantidad_minima?: number | null;
  envio_nacional?: boolean | null;
  solo_san_miguel?: boolean | null;
  is_featured?: boolean;
}

/** Categoría tal como viene de la tabla `categories` de Supabase */
export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  catalog: string | null;
}

/**
 * Convierte cualquier ruta de imagen (relativa, absoluta o de Supabase Storage)
 * a una URL completa y accesible para el navegador.
 */
export function resolveImageUrl(url: string | null | undefined): string {
  if (!url) return "";
  const trimmed = url.trim();
  if (!trimmed) return "";

  // 1. URL HTTP/HTTPS completa
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // 2. Data URL o Blob
  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:")) {
    return trimmed;
  }

  // 3. Ruta relativa local que empieza por /
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // 4. Ruta relativa almacenada en Supabase Storage (bucket `product-images` o `products`)
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    "https://cvbdqsxjfrbwovzpydng.supabase.co";
  const cleanPath = trimmed.startsWith("product-images/")
    ? trimmed.replace("product-images/", "")
    : trimmed;

  return `${supabaseUrl}/storage/v1/object/public/product-images/${cleanPath}`;
}

/**
 * Obtiene la URL de la imagen principal de un producto.
 */
export function getProductMainImage(product: DbProduct): string {
  let raw: string | null = null;
  if (
    product.images &&
    Array.isArray(product.images) &&
    product.images.length > 0
  ) {
    raw = product.images[0];
  } else {
    raw = product.image_path ?? null;
  }
  return resolveImageUrl(raw);
}

/**
 * Determina si un producto tiene una oferta activa.
 */
export function isProductOnSale(product: DbProduct): boolean {
  const hasOfferBySize =
    product.offer_by_size && Object.keys(product.offer_by_size).length > 0;
  const hasGlobalOldPrice =
    product.old_price && product.old_price > product.price;
  if (!hasOfferBySize && !hasGlobalOldPrice) return false;

  const now = new Date();
  if (product.offer_starts_at && new Date(product.offer_starts_at) > now)
    return false;
  if (product.offer_ends_at && new Date(product.offer_ends_at) <= now)
    return false;
  return true;
}

/**
 * Obtiene el sector de un producto, con fallbacks.
 */
export function getProductSector(product: DbProduct): string {
  return (
    product.sector ??
    product.categories?.catalog ??
    product.category?.split("-")[0] ??
    "scrubs"
  );
}

const VALID_UNIVERSITY_SLUGS = new Set([
  "univo",
  "ieproes",
  "ugb",
  "unab",
  "ues",
  "uma",
]);

/**
 * Obtiene el slug de la universidad asociada al producto, si aplica.
 */
export function getProductUniversity(
  product: Pick<DbProduct, "category" | "categories">
): string | null {
  if (
    product.categories?.catalog &&
    VALID_UNIVERSITY_SLUGS.has(product.categories.catalog)
  ) {
    return product.categories.catalog;
  }
  if (product.category) {
    const prefix = product.category.split("-")[0];
    if (VALID_UNIVERSITY_SLUGS.has(prefix)) {
      return prefix;
    }
  }
  return null;
}

/**
 * Resuelve la URL del detalle de un producto.
 */
export function getProductUrl(
  product: Pick<DbProduct, "id" | "slug" | "sector" | "category" | "categories">
): string {
  const sector = getProductSector(product as DbProduct);

  let slug = product.slug ?? product.id;
  if (slug.includes("/")) {
    slug = slug.split("/").pop() || slug;
  }

  if (sector === "universitario") {
    const universitySlug = getProductUniversity(product) ?? "univo";
    return `/catalogo/universidades/${universitySlug}/${slug}`;
  }
  return `/catalogo/${sector}/${slug}`;
}
