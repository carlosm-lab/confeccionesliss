// ──────────────────────────────────────────────────────────────
// CONSTANTES GLOBALES DE NEGOCIO — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Este archivo centraliza la configuración del carrito y BD.
// Cualquier cambio aquí impacta CartContext y CartDrawer.
// ──────────────────────────────────────────────────────────────

// ── Límites del carrito ──────────────────────────────────────
// Existen porque el mensaje de WhatsApp tiene un límite práctico
// de ~2000 caracteres. Con 50 ítems y cantidades altas, el
// truncamiento en buildWhatsAppUrl() entra en acción.
export const MAX_CART_QUANTITY = 50;
export const MAX_TOTAL_ITEMS = 50;

// ── Columnas SELECT de productos ─────────────────────────────
// NUNCA usar .select('*') — superficie de ataque menor y menos
// datos en el wire. Si se agrega una columna a products, hay
// que ponerla aquí manualmente. Eso es intencional.
export const PRODUCT_SELECT_COLUMNS =
  "id, name, description, price, old_price, images, image_path, category, category_id, slug, is_active, offer_starts_at, offer_ends_at, tags, categories!products_category_id_fkey(name, icon, slug)";

// ── Localización ─────────────────────────────────────────────
export const LOCALE_CURRENCY = "USD";
export const LOCALE_LANG = "es-SV";

// ── localStorage keys ────────────────────────────────────────
// Prefijo 'liss_' para evitar colisiones con otros proyectos
// que corran en el mismo origen (ej: localhost:3000 vs :3001).
export const STORAGE_CART_KEY = "liss_cart";
export const STORAGE_CART_TIMESTAMP_KEY = "liss_cart_timestamp";
export const STORAGE_CART_EXPIRED_KEY = "liss_cart_was_expired";
export const STORAGE_FAVORITES_KEY = "liss_favorites";
