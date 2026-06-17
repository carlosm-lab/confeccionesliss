// ──────────────────────────────────────────────────────────────
// FORMATO DE PRECIOS
// ──────────────────────────────────────────────────────────────
// Centralizado aquí para que un cambio de moneda/locale
// afecte a toda la app. Usa Intl.NumberFormat nativo.
// ──────────────────────────────────────────────────────────────
import { LOCALE_CURRENCY, LOCALE_LANG } from "@/lib/constants";

const formatter = new Intl.NumberFormat(LOCALE_LANG, {
  style: "currency",
  currency: LOCALE_CURRENCY,
});

/**
 * Formatea un número como precio en dólares (USD).
 * Retorna '$0.00' si el valor no es numérico — nunca lanza.
 */
export const formatPrice = (
  price: number | string | null | undefined
): string => {
  if (price === null || price === undefined) return "";
  const num = Number(price);
  if (isNaN(num)) return formatter.format(0);
  return formatter.format(num);
};
