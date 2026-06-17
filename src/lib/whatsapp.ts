// ──────────────────────────────────────────────────────────────
// GENERADOR DE URLS DE WHATSAPP — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Transforma el carrito en un mensaje legible para WhatsApp.
//
// Los mensajes de WhatsApp vía URL (wa.me) tienen un límite
// práctico de ~2000 caracteres. Si el carrito tiene muchos
// productos, el truncamiento inteligente acorta el mensaje.
// ──────────────────────────────────────────────────────────────
import { env } from "@/env";

const MAX_MESSAGE_LENGTH = 1800;

/**
 * Construye la URL wa.me con el mensaje del pedido.
 * Aplica truncamiento inteligente si supera el límite.
 *
 * @param phone - Número de teléfono del vendedor (con código de país)
 * @param rawMessage - Mensaje ya generado (server-side o local)
 * @returns { url, usedFallback, isMobile }
 */
export function buildWhatsAppUrl(
  phone: string | undefined | null,
  rawMessage: string | null | undefined
): { url: string; usedFallback: boolean; isMobile: boolean } {
  const fallbackPhone = env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const formattedPhone = phone
    ? phone.toString().replace(/\D/g, "")
    : fallbackPhone.replace(/\D/g, "");

  const fallbackMessage =
    "¡Hola! He realizado un pedido extenso en la tienda, me gustaría revisarlo contigo. Mi carrito está guardado en el sistema.";

  let messageToSend = rawMessage || fallbackMessage;
  let usedFallback = !rawMessage;

  // ── Truncamiento de seguridad ──────────────────────────────
  if (messageToSend.length > MAX_MESSAGE_LENGTH) {
    usedFallback = true;
    messageToSend =
      messageToSend.substring(0, MAX_MESSAGE_LENGTH) +
      "\n\n... [El pedido es más extenso, el resto se omitió para poder enviarlo. Por favor revisa tu carrito en la tienda].";
  }

  const encodedMessage = encodeURIComponent(messageToSend);

  let isMobile = false;
  if (typeof navigator !== "undefined") {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  const url = isMobile
    ? `whatsapp://send?phone=${formattedPhone}&text=${encodedMessage}`
    : `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;

  return { url, usedFallback, isMobile };
}
