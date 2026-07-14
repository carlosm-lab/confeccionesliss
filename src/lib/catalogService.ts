// ──────────────────────────────────────────────────────────────
// CATALOG SERVICE — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Capa de datos para el catálogo público. Consulta Supabase
// directamente desde el servidor (RSC) usando el anon key.
// NO importar en Client Components — usar el hook useProducts.ts.
// ──────────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";
import { logger } from "@/lib/logger";
import { env } from "@/env";

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
  /** Precio único para productos sin variantes de talla.
   * Cuando price_by_size es null/vacío, este campo es el precio definitivo del producto. */
  base_price?: number | null;
  /** Etiquetas de ocasión: San Valentín, Cumpleaños, Boda, etc. */
  ocasion?: string[] | null;
  /** Dimensiones físicas en texto libre. Ej: "30cm × 20cm" */
  dimensiones?: string | null;
  /** Cantidad mínima de pedido. Default 1. */
  cantidad_minima?: number | null;
  /** Si hay envío disponible a nivel nacional. */
  envio_nacional?: boolean | null;
  /** Si el producto solo se entrega en San Miguel. */
  solo_san_miguel?: boolean | null;
  /** Si TRUE, el producto aparece fijado en la sección Novedades del home */
  is_featured?: boolean;
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

// ── Imagen principal resuelta ─────────────────────────────────
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

const VALID_UNIVERSITY_SLUGS = new Set([
  "univo",
  "ieproes",
  "ugb",
  "unab",
  "ues",
  "uma",
]);

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

// ── Resolver la URL de un producto ───────────────────────────
export function getProductUrl(
  product: Pick<DbProduct, "id" | "slug" | "sector" | "category" | "categories">
): string {
  const sector = getProductSector(product as DbProduct);

  // Si viene con prefijo sector/slug, limpiar la primera parte para evitar duplicados
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

// -- Crear cliente Supabase para RSC ------------------------------------------------
// ARQUITECTURA: Usamos el comportamiento por defecto de Next.js 16 (auto no cache).
// Los datos se obtienen una vez durante el build → HTML se guarda en el Full Route Cache (CDN).
// Cuando el admin muta datos, revalidatePath() invalida el Full Route Cache.
// El siguiente request al Home dispara un re-render que va directo a Supabase (sin Data Cache),
// genera HTML fresco y lo vuelve a guardar en el CDN. No se necesita revalidateTag.

function createServerClient(_tags: string[] = []) {
  const url = env.NEXT_PUBLIC_SUPABASE_URL;
  const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url, key);
}

// ── Selects reutilizables ─────────────────────────────────
// EXPORTADO — úsalo en cualquier query que necesite todos los campos de un producto.
// Si agregas una columna nueva a la DB, agrégala AQUÍ y se propagará automáticamente.
export const PRODUCT_SELECT = `
  id, name, description, short_description, price, old_price,
  offer_ends_at, offer_starts_at, offer_terms, category, category_id, tags,
  image_path, images, is_active, is_featured, slug, sector,
  tallas, colores, colores_label, material, caracteristicas,
  price_by_size, offer_by_size,
  base_price, ocasion, dimensiones, cantidad_minima, envio_nacional, solo_san_miguel,
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
  const supabase = createServerClient(["products"]);

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
  const supabaseCat = createServerClient(["categories"]);
  const { data: catData, error: err2 } = await supabaseCat
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
    byCategory = ((byCat ?? []) as unknown as DbProduct[]).filter(
      (p) => !p.sector || p.sector === sector
    );
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
  const supabase = createServerClient(["products"]);

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

// -- Obtener productos para la seccion Novedades del home (ISR on-demand) -----
// La revalidacion funciona via revalidatePath("/") en los Server Actions.
// Los resultados se cachean en el servidor (unstable_cache) por 5 minutos para
// que los renders SSR fríos (CDN cache miss) no incurran en roundtrip a Supabase.
// La etiqueta "recent-products" permite invalidar el cache on-demand.
const _fetchRecentProducts = unstable_cache(
  async (limit: number): Promise<DbProduct[]> => {
    const supabase = createServerClient(["products"]);

    // 1. Obtener todos los productos fijados activos
    const { data: featured, error: featuredError } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("updated_at", { ascending: false })
      .limit(limit);

    if (featuredError) {
      logger.error(
        "[catalogService] getRecentProducts (featured) error:",
        featuredError
      );
      return [];
    }

    const featuredList = (featured ?? []) as unknown as DbProduct[];

    if (featuredList.length >= limit) {
      return featuredList.slice(0, limit);
    }

    const remaining = limit - featuredList.length;
    const featuredIds = featuredList.map((p) => p.id).filter(Boolean);

    let recentsQuery = supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(remaining);

    if (featuredIds.length > 0) {
      recentsQuery = recentsQuery.not("id", "in", `(${featuredIds.join(",")})`);
    }

    const { data: recents, error: recentsError } = await recentsQuery;

    if (recentsError) {
      logger.error(
        "[catalogService] getRecentProducts (recents) error:",
        recentsError
      );
      return featuredList;
    }

    return [...featuredList, ...((recents ?? []) as unknown as DbProduct[])];
  },
  ["recent-products"],
  {
    revalidate: 300, // 5 minutos — suficiente frescura para novedades
    tags: ["recent-products"],
  }
);

export async function getRecentProducts(limit = 10): Promise<DbProduct[]> {
  return _fetchRecentProducts(limit);
}

// ── Obtener conteo de productos activos por sector ────────────
export async function getProductCountsBySector(): Promise<
  Record<string, number>
> {
  const supabase = createServerClient(["product-counts"]);

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
  const supabase = createServerClient(["products"]);

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
      (p) => !seen.has(p.id) && (!p.sector || p.sector === sector)
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
  const supabase = createServerClient(["products"]);

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
  const supabase = createServerClient(["categories"]);

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
  const supabase = createServerClient(["products", "categories"]);

  // 1. Obtener los IDs de categoría pertenecientes a esta universidad (catalog = universidad)
  const { data: catData, error: catErr } = await supabase
    .from("categories")
    .select("id")
    .eq("catalog", universidad);

  if (catErr) {
    logger.error(
      "[catalogService] getProductsByUniversity (categories) error:",
      catErr
    );
  }

  const categoryIds = (catData ?? []).map((c: { id: string }) => c.id);

  // 2. Query 1: Productos asociados vía category_id
  let byCategory: DbProduct[] = [];
  if (categoryIds.length > 0) {
    const { data: byCat, error: errCat } = await supabase
      .from("products")
      .select(PRODUCT_SELECT)
      .eq("is_active", true)
      .in("category_id", categoryIds)
      .order("created_at", { ascending: false });

    if (errCat) {
      logger.error(
        "[catalogService] getProductsByUniversity (by category_id) error:",
        errCat
      );
    } else {
      byCategory = (byCat ?? []) as unknown as DbProduct[];
    }
  }

  // 3. Query 2: Productos con sector "universitario" o el slug de la universidad y category ILIKE %universidad% (legacy/fallback)
  const { data: byDirect, error: errDirect } = await supabase
    .from("products")
    .select(PRODUCT_SELECT)
    .eq("is_active", true)
    .or(`sector.eq.universitario,sector.eq.${universidad}`)
    .ilike("category", `%${universidad}%`)
    .order("created_at", { ascending: false });

  if (errDirect) {
    logger.error(
      "[catalogService] getProductsByUniversity (direct) error:",
      errDirect
    );
  }

  const directList = (byDirect ?? []) as unknown as DbProduct[];

  // 4. Combinar y deduplicar por id
  const seen = new Set<string>(byCategory.map((p) => p.id));
  const merged = [...byCategory, ...directList.filter((p) => !seen.has(p.id))];

  merged.sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""));

  return merged;
}

// ── Obtener categorías (carreras) de una universidad específica ───────────────
/**
 * Devuelve las carreras de una universidad desde la tabla `categories`.
 *
 * ARQUITECTURA ACTUALIZADA:
 * Cada universidad es su propio catálogo en la DB.
 *   catalog = 'univo'    → carreras de UNIVO
 *   catalog = 'ugb'      → carreras de UGB
 *   ...etc.
 *
 * El hub /catalogo/universidades NO tiene catalog propio en la DB.
 * Las categorías se crean con catalog = slug_universidad directamente.
 */
export async function getCategoriesForUniversity(
  universidad: string
): Promise<DbCategory[]> {
  const supabase = createServerClient(["categories"]);

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, slug, catalog")
    .eq("catalog", universidad)
    .order("name");

  if (error) {
    logger.error("[catalogService] getCategoriesForUniversity error:", error);
    return [];
  }

  return (data ?? []) as DbCategory[];
}
