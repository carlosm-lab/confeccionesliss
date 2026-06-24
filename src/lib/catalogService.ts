// ──────────────────────────────────────────────────────────────
// CATALOG SERVICE — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Capa de datos para el catálogo público. Consulta Supabase
// directamente desde el servidor (RSC) usando el anon key.
// NO importar en Client Components — usar el hook useProducts.ts.
// ──────────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";

// ── Tipo de producto proveniente de la base de datos ─────────

// ── Tipo de producto proveniente de la base de datos ─────────
export interface DbProduct {
  id: string;
  name: string;
  description: string | null;
  short_description: string | null;
  price: number;
  old_price: number | null;
  offer_ends_at: string | null;
  offer_starts_at: string | null;
  /** Tipo de oferta (campo legacy). Ver product_offer_rules para multi-tipo. */
  offer_type: string | null;
  category: string | null; // slug de la categoría
  category_id: string | null;
  tags: string[] | null;
  image_path: string | null;
  images: string[] | null;
  is_active: boolean;
  slug: string | null;
  sector: string | null; // catálogo/sector (scrubs, escolar, etc.)
  tallas: string[] | null; // ["S","M","L","XL"]
  colores: { name: string; hex: string }[] | null;
  /** Etiqueta editable para la sección de colores en la ficha pública */
  colores_label: string | null;
  material: string | null;
  caracteristicas: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  // Precio por talla — mapa { talla: precio } (null si no aplica)
  price_by_size: Record<string, number> | null;
  // Oferta por talla — mapa { talla: precio_oferta } (null si no hay ofertas en ninguna talla)
  offer_by_size: Record<string, number> | null;
  // Join from categories table
  categories?: { name: string; catalog: string } | null;
  /** Términos de la oferta — texto libre para mostrar al cliente */
  offer_terms?: string | null;
  // ── Campos SEO manuales (opcionales por producto) ─────────────
  /** Título SEO manual — si null, se usa el automático (product.name | subtitle) */
  seo_title?: string | null;
  /** Meta description manual — si null, se usa short_description ?? description */
  seo_description?: string | null;
  /** Keywords SEO — texto libre separado por comas */
  seo_keywords?: string | null;
  /** Directiva de indexación: 'index, follow' | 'noindex, follow' | 'index, nofollow' | 'noindex, nofollow' */
  seo_robots?: string | null;
  /** Publisher manual — si null, se usa siteConfig.name */
  seo_publisher?: string | null;
}

// ── Imagen principal resuelta ─────────────────────────────────
export function getProductMainImage(product: DbProduct): string | null {
  if (product.images && product.images.length > 0) return product.images[0];
  return product.image_path ?? null;
}

// ── Determinar si el producto tiene oferta activa ─────────────
// Verifica si existe offer_by_size con al menos una talla, O el old_price global,
// y que las fechas de oferta sean válidas (o indefinida).
export function isProductOnSale(product: DbProduct): boolean {
  // Verificar si hay oferta en alguna talla (nuevo modelo) o precio global (legacy)
  const hasOfferBySize =
    product.offer_by_size && Object.keys(product.offer_by_size).length > 0;
  const hasGlobalOldPrice =
    product.old_price && product.old_price > product.price;
  if (!hasOfferBySize && !hasGlobalOldPrice) return false;

  // Verificar vigencia temporal
  const now = new Date();
  if (product.offer_starts_at && new Date(product.offer_starts_at) > now)
    return false;
  if (product.offer_ends_at && new Date(product.offer_ends_at) <= now)
    return false;
  return true;
}

// ── Resolver el sector de un producto ────────────────────────
export function getProductSector(product: DbProduct): string {
  return (
    product.sector ??
    product.categories?.catalog ??
    product.category?.split("-")[0] ??
    "scrubs"
  );
}

// ── Crear cliente Supabase sin "use client" (para RSC) ────────
function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase env variables");
  }
  return createClient(url, key);
}

// ── Selects reutilizables ─────────────────────────────────
// EXPORTADO — úsalo en cualquier query que necesite todos los campos de un producto.
// Si agregas una columna nueva a la DB, agrégala AQUÍ y se propagará automáticamente.
export const PRODUCT_SELECT = `
  id, name, description, short_description, price, old_price,
  offer_ends_at, offer_starts_at, offer_terms, category, category_id, tags,
  image_path, images, is_active, slug, sector,
  tallas, colores, colores_label, material, caracteristicas,
  price_by_size, offer_by_size,
  seo_title, seo_description, seo_keywords, seo_robots, seo_publisher,
  created_at, updated_at,
  categories(name, catalog)
`;

/** Select para página de detalle — igual al base, el offer_terms ya está incluido */
const PRODUCT_DETAIL_SELECT = PRODUCT_SELECT;

// ── Obtener todos los productos activos de un sector ─────────
export async function getProductsBySector(
  sector: string
): Promise<DbProduct[]> {
  const supabase = createServerClient();

  // PostgREST no soporta filtros sobre tablas relacionadas en .or()
  // Estrategia: dos queries separadas, una por sector directo
  // y otra por category_id (de categorías cuyo catalog coincide).

  // Query 1: productos con sector directo
  const { data: byDirect, error: err1 } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("sector", sector)
    .order("created_at", { ascending: false });

  if (err1) {
    logger.error("[catalogService] getProductsBySector (direct) error:", err1);
  }

  // Query 2: obtener los category_ids del catalog que coincida
  const { data: catData, error: err2 } = await supabase
    .from("categories")
    .select("id")
    .eq("catalog", sector);

  if (err2) {
    logger.error(
      "[catalogService] getProductsBySector (categories) error:",
      err2
    );
  }

  let byCategory: DbProduct[] = [];
  const categoryIds = (catData ?? []).map((c: { id: string }) => c.id);

  if (categoryIds.length > 0) {
    const { data: byCat, error: err3 } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .in("category_id", categoryIds)
      .order("created_at", { ascending: false });

    if (err3) {
      logger.error(
        "[catalogService] getProductsBySector (by category) error:",
        err3
      );
    }
    byCategory = (byCat ?? []) as unknown as DbProduct[];
  }

  // Combinar y deduplicar por id
  const directList = (byDirect ?? []) as unknown as DbProduct[];
  const seen = new Set<string>(directList.map((p) => p.id));
  const merged = [...directList, ...byCategory.filter((p) => !seen.has(p.id))];

  // Ordenar por created_at descendente
  merged.sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));

  return merged;
}

// ── Obtener un producto por slug ──────────────────────────────
export async function getProductBySlug(
  slug: string
): Promise<DbProduct | null> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_DETAIL_SELECT)
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    logger.error("[catalogService] getProductBySlug error:", error);
    return null;
  }

  return (data ?? null) as unknown as DbProduct | null;
}

// ── Obtener productos recientes/novedades ─────────────────────
export async function getRecentProducts(limit = 6): Promise<DbProduct[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    logger.error("[catalogService] getRecentProducts error:", error);
    return [];
  }

  return (data ?? []) as unknown as DbProduct[];
}

// ── Obtener conteo de productos activos por sector ────────────
export async function getProductCountsBySector(): Promise<
  Record<string, number>
> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("sector, categories(catalog)")
    .eq("is_active", true);

  if (error) {
    logger.error("[catalogService] getProductCountsBySector error:", error);
    return {};
  }

  const counts: Record<string, number> = {};
  for (const row of data ?? []) {
    const r = row as unknown as {
      sector: string | null;
      categories: { catalog: string } | { catalog: string }[] | null;
    };
    // categories puede ser un objeto o un array según el join de Supabase
    let catalog: string | null = null;
    if (r.categories) {
      const cat = Array.isArray(r.categories) ? r.categories[0] : r.categories;
      catalog = cat?.catalog ?? null;
    }
    const s = r.sector ?? catalog ?? null;
    if (s) counts[s] = (counts[s] ?? 0) + 1;
  }
  return counts;
}

// ── Obtener productos relacionados del mismo sector ───────────
export async function getRelatedProducts(
  sector: string,
  excludeSlug: string,
  limit = 5
): Promise<DbProduct[]> {
  const supabase = createServerClient();

  // Query 1: por sector directo
  const { data: byDirect, error: err1 } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("sector", sector)
    .neq("slug", excludeSlug)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (err1) {
    logger.error("[catalogService] getRelatedProducts (direct) error:", err1);
  }

  const directList = (byDirect ?? []) as unknown as DbProduct[];
  if (directList.length >= limit) return directList.slice(0, limit);

  // Query 2: por category_id del catalog
  const { data: catData } = await supabase
    .from("categories")
    .select("id")
    .eq("catalog", sector);

  const categoryIds = (catData ?? []).map((c: { id: string }) => c.id);

  if (categoryIds.length > 0) {
    const seen = new Set<string>(directList.map((p) => p.id));
    const { data: byCat } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .in("category_id", categoryIds)
      .neq("slug", excludeSlug)
      .order("created_at", { ascending: false })
      .limit(limit);

    const byCatList = ((byCat ?? []) as unknown as DbProduct[]).filter(
      (p) => !seen.has(p.id)
    );
    return [...directList, ...byCatList].slice(0, limit);
  }

  return directList.slice(0, limit);
}

// ── Obtener slug + sector de todos los productos activos (para sitemap) ───────
export async function getAllProductsForSitemap(): Promise<
  {
    slug: string;
    sector: string;
    updated_at: string | null;
    category: string | null;
  }[]
> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("slug, sector, category, updated_at, categories(catalog)")
    .eq("is_active", true)
    .not("slug", "is", null);

  if (error) {
    logger.error("[catalogService] getAllProductsForSitemap error:", error);
    return [];
  }

  return (data ?? []).map((row) => {
    const r = row as {
      slug: string | null;
      sector: string | null;
      category: string | null;
      updated_at: string | null;
      categories: { catalog: string } | { catalog: string }[] | null;
    };
    let sectorVal = r.sector;
    if (!sectorVal && r.categories) {
      const cat = Array.isArray(r.categories) ? r.categories[0] : r.categories;
      sectorVal = cat?.catalog ?? null;
    }
    return {
      slug: r.slug ?? "",
      sector: sectorVal ?? "scrubs",
      updated_at: r.updated_at,
      category: r.category ?? null,
    };
  });
}

// ── Categorías de un sector — alimenta los filtros dinámicos ──

/** Categoría tal como viene de la tabla `categories` de Supabase */
interface DbCategory {
  id: string;
  name: string;
  slug: string;
  catalog: string | null;
}

/**
 * Devuelve las categorías activas del catalog/sector desde Supabase.
 * Úsalo en el servidor (RSC / page.tsx) para construir los filtros dinámicamente
 * en lugar de depender del array hardcodeado en data/categories.ts.
 */
export async function getCategoriesForSector(
  sector: string
): Promise<DbCategory[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, catalog")
    .eq("catalog", sector)
    .order("name");

  if (error) {
    logger.error("[catalogService] getCategoriesForSector error:", error);
    return [];
  }

  return (data ?? []) as DbCategory[];
}

// ── Obtener productos del sector universitario filtrados por universidad ──────
/**
 * Devuelve los productos activos del sector "universitario" cuya `category`
 * coincide (parcialmente, case-insensitive) con el slug de la universidad.
 * Ejemplo: universidad = "univo" → products donde category ILIKE "%univo%"
 */
export async function getProductsByUniversity(
  universidad: string
): Promise<DbProduct[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .eq("sector", "universitario")
    .ilike("category", `%${universidad}%`)
    .order("created_at", { ascending: false });

  if (error) {
    logger.error("[catalogService] getProductsByUniversity error:", error);
    // Fallback: devolver todos los universitarios sin filtrar
    return getProductsBySector("universitario");
  }

  return (data ?? []) as unknown as DbProduct[];
}

// ── Obtener categorías (carreras) de una universidad específica ───────────────
/**
 * Devuelve las categorías de la tabla `categories` cuyo slug empieza con
 * el slug de la universidad. Por ejemplo, para "univo" devuelve:
 *   { slug: "univo-enfermeria", name: "Enfermería" }
 *   { slug: "univo-medicina",   name: "Medicina" }
 * Si no hay categorías en DB, devuelve un array vacío (el caller usará
 * las carreras hardcodeadas del UNIVERSITY_CONFIG como fallback).
 */
export async function getCategoriesForUniversity(
  universidad: string
): Promise<DbCategory[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, catalog")
    .eq("catalog", "universitario")
    .ilike("slug", `${universidad}%`)
    .order("name");

  if (error) {
    logger.error("[catalogService] getCategoriesForUniversity error:", error);
    return [];
  }

  return (data ?? []) as DbCategory[];
}
