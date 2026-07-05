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

// ── Columnas SELECT para revalidación de precios del carrito ────
// Solo lo mínimo necesario para actualizar CartItem.product.
// No incluye el JOIN de categories — no se necesita para el carrito.
export const CART_SELECT_COLUMNS =
  "id, name, price, old_price, images, image_path, slug, is_active, offer_starts_at, offer_ends_at, sector, category, categories(name, catalog)";

// ── Columnas SELECT para FavoritesModal ─────────────────────────
// Coincide con la interfaz FavoriteProduct del modal.
// Incluye sector y category para generación de enlaces correctos
export const FAVORITES_SELECT_COLUMNS =
  "id, name, price, images, image_path, slug, is_active, category_id, sector, category, categories(name, catalog)";

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
