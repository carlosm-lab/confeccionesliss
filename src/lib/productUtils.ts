// ──────────────────────────────────────────────────────────────
// UTILIDADES DE OFERTAS / PROMOCIONES
// ──────────────────────────────────────────────────────────────
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Valida que un precio de oferta sea menor al precio original.
 * Un producto es "oferta válida" solo si old_price > price.
 */
export function isValidOffer(
  price: number | string,
  oldPrice: number | string | null | undefined
): boolean {
  if (!oldPrice) return false;
  return Number(oldPrice) > Number(price);
}

export interface Product {
  id?: string;
  name?: string;
  price?: number | string;
  old_price?: number | string | null;
  offer_starts_at?: string | null;
  offer_ends_at?: string | null;
  /** true = oferta sin fecha de fin definida */
  offer_indefinida?: boolean;
  /** Texto libre describiendo los terminos especiales de la oferta */
  offer_terms?: string | null;
  image_path?: string | null;
  images?: string[];
  category?: string | null;
  category_id?: string | null;
  /** Campo virtual (join con categories) — NO columna real en DB */
  catalog?: string | null;
  tags?: string[];
  description?: string | null;
  short_description?: string | null;
  is_active?: boolean;
  slug?: string;
  created_at?: string;
  updated_at?: string;
  categories?: { name: string; catalog?: string } | null;
  // Campos del catálogo público
  sector?: string | null;
  tallas?: string[] | null;
  colores?: { name: string; hex: string }[] | null;
  material?: string | null;
  caracteristicas?: string[] | null;
  // Precio por talla — mapa { talla: precio } (null si no aplica)
  price_by_size?: Record<string, number> | null;
  // Oferta por talla — mapa { talla: precio_oferta } (null si no hay ofertas)
  offer_by_size?: Record<string, number> | null;
  // ── Campos SEO manuales (opcionales por producto) ─────────────
  /** Título SEO manual — si null, se usa el automático */
  seo_title?: string | null;
  /** Meta description manual — si null, se usa short_description ?? description */
  seo_description?: string | null;
  /** Keywords SEO — texto separado por comas */
  seo_keywords?: string | null;
  /** Directiva de indexación */
  seo_robots?: string | null;
  /** Publisher manual */
  seo_publisher?: string | null;
}

/**
 * Determina si un producto tiene una oferta activa AHORA.
 */
const isOfferActive = (product: Product): boolean => {
  if (!product) return false;
  const now = new Date();

  // Nuevo modelo: oferta por talla
  const hasOfferBySize =
    product.offer_by_size && Object.keys(product.offer_by_size).length > 0;
  // Modelo legacy: old_price global
  const hasGlobalOldPrice =
    product.old_price && Number(product.old_price) > Number(product.price);

  if (!hasOfferBySize && !hasGlobalOldPrice) return false;

  if (product.offer_starts_at && new Date(product.offer_starts_at) > now)
    return false;
  if (product.offer_ends_at && new Date(product.offer_ends_at) <= now)
    return false;

  return true;
};

/**
 * Detecta ofertas programadas (futuras).
 */
const isOfferScheduled = (product: Product): boolean => {
  if (!product) return false;
  const now = new Date();
  return Boolean(
    product.old_price &&
    Number(product.old_price) > Number(product.price) &&
    product.offer_starts_at &&
    new Date(product.offer_starts_at) > now
  );
};

/**
 * Aplica filtros de oferta activa a una query de Supabase.
 */

export const applyActiveOfferFilter = (query: any): any => {
  const now = new Date().toISOString();
  return query
    .not("old_price", "is", null)
    .or(`offer_starts_at.is.null,offer_starts_at.lte.${now}`)
    .or(`offer_ends_at.is.null,offer_ends_at.gt.${now}`);
};
