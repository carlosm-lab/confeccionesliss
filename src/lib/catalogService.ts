// ──────────────────────────────────────────────────────────────
// CATALOG SERVICE — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Capa de datos para el catálogo público. Consulta Supabase
// directamente desde el servidor (RSC) usando el anon key.
// NO importar en Client Components — usar el hook useProducts.ts.
// ──────────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";

// ── Tipo de producto proveniente de la base de datos ─────────
import type { ProductOfferRule } from "@/lib/productUtils";

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
  badge_text: string | null; // "Nuevo", "Popular", "Oferta"
  price_suffix: string | null; // "/unid." etc.
  tallas: string[] | null; // ["S","M","L","XL"]
  colores: { name: string; hex: string }[] | null;
  material: string | null;
  caracteristicas: string[] | null;
  created_at: string | null;
  updated_at: string | null;
  // Precios avanzados
  wholesale_price: number | null;
  wholesale_min_qty: number | null;
  labor_price: number | null;
  // Join from categories table
  categories?: { name: string; catalog: string } | null;
  /** Join con product_offer_rules — incluido solo en getProductBySlug */
  offer_rules?: ProductOfferRule[];
}

// ── Imagen principal resuelta ─────────────────────────────────
export function getProductMainImage(product: DbProduct): string | null {
  if (product.images && product.images.length > 0) return product.images[0];
  return product.image_path ?? null;
}

// ── Determinar si el producto tiene oferta activa ─────────────
export function isProductOnSale(product: DbProduct): boolean {
  if (!product.old_price || product.old_price <= product.price) return false;
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
const PRODUCT_SELECT = `
  id, name, description, short_description, price, old_price,
  offer_ends_at, offer_starts_at, offer_type, category, category_id, tags,
  image_path, images, is_active, slug, sector, badge_text,
  price_suffix, tallas, colores, material, caracteristicas,
  wholesale_price, wholesale_min_qty, labor_price,
  created_at, updated_at,
  categories(name, catalog)
`;

/** Select extendido para página de detalle — incluye reglas de oferta */
const PRODUCT_DETAIL_SELECT = `
  ${PRODUCT_SELECT.trimEnd()},
  product_offer_rules(
    id, offer_type, custom_label, offer_price, is_active, created_at
  )
`;

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
    console.error("[catalogService] getProductsBySector (direct) error:", err1);
  }

  // Query 2: obtener los category_ids del catalog que coincida
  const { data: catData, error: err2 } = await supabase
    .from("categories")
    .select("id")
    .eq("catalog", sector);

  if (err2) {
    console.error(
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
      console.error(
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
    console.error("[catalogService] getProductBySlug error:", error);
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
    console.error("[catalogService] getRecentProducts error:", error);
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
    console.error("[catalogService] getProductCountsBySector error:", error);
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
    console.error("[catalogService] getRelatedProducts (direct) error:", err1);
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
  { slug: string; sector: string; updated_at: string | null }[]
> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("products")
    .select("slug, sector, updated_at, categories(catalog)")
    .eq("is_active", true)
    .not("slug", "is", null);

  if (error) {
    console.error("[catalogService] getAllProductsForSitemap error:", error);
    return [];
  }

  return (data ?? []).map((row) => {
    const r = row as {
      slug: string | null;
      sector: string | null;
      updated_at: string | null;
      categories: { catalog: string } | { catalog: string }[] | null;
    };
    let sectorResolved = r.sector;
    if (!sectorResolved && r.categories) {
      const cat = Array.isArray(r.categories) ? r.categories[0] : r.categories;
      sectorResolved = cat?.catalog ?? null;
    }
    return {
      slug: r.slug ?? "",
      sector: sectorResolved ?? "scrubs",
      updated_at: r.updated_at,
    };
  });
}
