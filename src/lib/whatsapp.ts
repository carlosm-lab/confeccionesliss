// ──────────────────────────────────────────────────────────────
// GENERADOR DE URLS DE WHATSAPP — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Transforma el carrito en un mensaje legible para WhatsApp.
//
// Los mensajes de WhatsApp vía URL (wa.me) tienen un límite
// práctico de ~2000 caracteres. Si el carrito tiene muchos
// productos, el truncamiento inteligente acorta el mensaje.
// ──────────────────────────────────────────────────────────────
import { clientEnv } from "@/lib/clientEnv";

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
  const fallbackPhone = clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER;
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

// ──────────────────────────────────────────────────────────────
// GENERADOR DE MENSAJES DE COTIZACIÓN
// Para el botón "Cotizar" en la vista de producto.
// ──────────────────────────────────────────────────────────────

interface QuoteMessageOptions {
  /** Nombre del producto */
  productName: string;
  /** Sector/catálogo: scrubs | universitario | escolar | corporativo | etc. */
  sector: string;
  /** Categoría específica del producto (ej: "UNIVO" para universitario) */
  category?: string | null;
  /** Talla seleccionada por el usuario */
  selectedSize?: string | null;
  /** Nota de personalización ingresada por el usuario */
  customNote?: string;
  /** Departamento de envío seleccionado */
  department?: string | null;
  /** Municipio de envío seleccionado */
  municipality?: string | null;
  /** Tipo de entrega seleccionado */
  deliveryType?: "taller" | "punto_medio" | "domicilio" | null;
  /** URL completa del producto */
  productUrl: string;
}

/**
 * Genera un mensaje natural para cotizar un producto por WhatsApp.
 * El mensaje varía según el catálogo y la información seleccionada.
 */
function buildQuoteMessage(opts: QuoteMessageOptions): string {
  const {
    productName,
    sector,
    category,
    selectedSize,
    customNote,
    department,
    municipality,
    deliveryType,
    productUrl,
  } = opts;

  // ── Saludo y cuerpo principal según catálogo ──────────────────
  let intro = "";
  if (sector === "universitario" && category) {
    intro = `Hola, me gustaría pedir el uniforme de *${category}* — *${productName}*. ¿Me pueden dar más información?`;
  } else if (sector === "universitario") {
    intro = `Hola, me gustaría pedir este uniforme universitario — *${productName}*. ¿Me pueden dar más información?`;
  } else if (sector === "scrubs") {
    intro = `Hola, me gustaría pedir este uniforme médico — *${productName}*. ¿Me pueden dar más información?`;
  } else if (sector === "escolar") {
    intro = `Hola, me gustaría pedir este uniforme escolar — *${productName}*. ¿Me pueden dar más información?`;
  } else if (sector === "corporativo") {
    intro = `Hola, me gustaría pedir este uniforme corporativo — *${productName}*. ¿Me pueden dar más información?`;
  } else {
    intro = `Hola, me gustaría hacer un pedido — *${productName}*. ¿Me pueden dar más información?`;
  }

  const lines: string[] = [intro];

  // ── Talla ────────────────────────────────────────────────────
  if (selectedSize) {
    if (selectedSize === "A la medida") {
      lines.push(
        "Me interesa que sea *a la medida*, así que luego les comparto mis medidas exactas."
      );
    } else {
      lines.push(`La talla que me interesa es la *${selectedSize}*.`);
    }
  }

  // ── Nota de personalización ──────────────────────────────────
  if (customNote && customNote.trim()) {
    lines.push(`Además, tengo esta nota especial: _"${customNote.trim()}"_`);
  }

  // ── Información de envío ─────────────────────────────────────
  if (deliveryType === "taller") {
    lines.push("Prefiero *recoger el pedido en el taller* en San Miguel.");
  } else if (deliveryType === "punto_medio") {
    lines.push(
      "Me gustaría coordinar un *punto de entrega acordado* en San Miguel."
    );
  } else if (deliveryType === "domicilio" && department) {
    const locationStr = municipality
      ? `${municipality}, ${department}`
      : department;
    lines.push(`Necesito *envío a domicilio* a ${locationStr}.`);
  }

  // ── Enlace del producto ──────────────────────────────────────
  lines.push(`\nAquí el enlace del producto:\n${productUrl}`);

  return lines.join("\n\n");
}

/**
 * Genera la URL de WhatsApp para cotizar un producto.
 * Combina buildQuoteMessage + buildWhatsAppUrl.
 */
export function buildQuoteUrl(
  opts: QuoteMessageOptions,
  phone?: string
): string {
  const message = buildQuoteMessage(opts);
  const { url } = buildWhatsAppUrl(
    phone ?? clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER,
    message
  );
  return url;
}

// ──────────────────────────────────────────────────────────────
// GENERADOR DE MENSAJES DE CARRITO (FALLBACK CLIENT-SIDE)
// ──────────────────────────────────────────────────────────────

interface CartMessageItem {
  product: {
    name: string;
    price: number;
  };
  quantity: number;
  color?: string | null;
  note?: string | null;
  productSize?: string | null;
}

interface CartMessageShippingInfo {
  /** Tipo de entrega seleccionado por el usuario */
  deliveryMethod?: "taller" | "punto_medio" | "domicilio" | null;
  department?: string | null;
  municipality?: string | null;
  cost?: number;
  label?: string | null;
  // ── Datos del destinatario ──
  recipientName?: string | null;
  recipientPhone?: string | null;
  alternatePhone?: string | null;
  // ── Dirección completa (solo para domicilio) ──
  addressColonia?: string | null;
  addressStreet?: string | null;
  addressPolygon?: string | null;
  addressNumber?: string | null;
  addressReference?: string | null;
}

interface CartMessageOptions {
  items: CartMessageItem[];
  shippingInfo?: CartMessageShippingInfo | null;
  /** URL de la página donde se originó el pedido (para incluir enlace en el mensaje) */
  originUrl?: string | null;
}

/**
 * Genera el mensaje formateado del carrito en cliente como alternativa de alta disponibilidad
 * cuando la RPC server-side de Supabase no está accesible o falla por incompatibilidad de esquema.
 */
export function buildCartWhatsAppMessage(opts: CartMessageOptions): string {
  const { items, shippingInfo, originUrl } = opts;
  if (!items || items.length === 0) return "";

  const lines: string[] = ["\uD83D\uDED2 *NUEVO PEDIDO — Confecciones Liss*"];
  let subtotal = 0;

  // ── Productos ────────────────────────────────────────────────────────────
  lines.push("\n*Productos:*");
  items.forEach((item) => {
    const unitPrice = item.product.price || 0;
    const itemTotal = unitPrice * item.quantity;
    subtotal += itemTotal;

    let line = `\u2022 ${item.quantity}x *${item.product.name}* ($${unitPrice.toFixed(2)} c/u)`;
    const details: string[] = [];
    if (item.productSize) details.push(`Talla: ${item.productSize}`);
    if (item.color) details.push(`Color: ${item.color}`);
    if (item.note?.trim()) details.push(`Nota: ${item.note.trim()}`);

    if (details.length > 0) {
      line += `\n  _${details.join(" \u00b7 ")}_`;
    }
    lines.push(line);
  });

  // ── Totales ─────────────────────────────────────────────────────────────
  lines.push("");
  lines.push(`Subtotal: $${subtotal.toFixed(2)}`);

  const shippingCost = shippingInfo?.cost ?? 0;
  const deliveryMethod = shippingInfo?.deliveryMethod;

  // Línea de costo de envío adaptada al método
  if (deliveryMethod === "taller") {
    lines.push(
      `Entrega (Retiro en taller — San Miguel): $${shippingCost.toFixed(2)}`
    );
  } else if (deliveryMethod === "punto_medio") {
    lines.push(
      `Entrega (Punto de entrega acordado — San Miguel): $${shippingCost.toFixed(2)}`
    );
  } else if (shippingInfo?.department) {
    const loc = shippingInfo.municipality
      ? `${shippingInfo.municipality}, ${shippingInfo.department}`
      : shippingInfo.department;
    lines.push(`Envío a domicilio (${loc}): $${shippingCost.toFixed(2)}`);
  } else if (shippingInfo?.label) {
    lines.push(`Envío (${shippingInfo.label}): $${shippingCost.toFixed(2)}`);
  }

  const total = subtotal + shippingCost;
  lines.push(`*Total a pagar: $${total.toFixed(2)}*`);

  // ── Datos del cliente / destinatario ───────────────────────────────────────
  // Solo se imprime si hay al menos nombre o teléfono ingresado.
  const hasRecipientData =
    shippingInfo?.recipientName?.trim() || shippingInfo?.recipientPhone?.trim();

  if (hasRecipientData) {
    lines.push("");
    // La etiqueta cambia según el método de entrega
    const recipientHeader =
      deliveryMethod === "domicilio"
        ? "\uD83D\uDC64 *Datos del destinatario:*"
        : "\uD83D\uDC64 *Datos del cliente:*";
    lines.push(recipientHeader);

    if (shippingInfo!.recipientName?.trim()) {
      lines.push(`\u2022 Nombre: ${shippingInfo!.recipientName.trim()}`);
    }
    if (shippingInfo!.recipientPhone?.trim()) {
      lines.push(
        `\u2022 Tel\u00e9fono: ${shippingInfo!.recipientPhone.trim()}`
      );
    }
    if (shippingInfo!.alternatePhone?.trim()) {
      lines.push(
        `\u2022 Contacto alterno: ${shippingInfo!.alternatePhone.trim()}`
      );
    }
  }

  // ── Método de entrega / Dirección ────────────────────────────────────────
  // Bloque SOLO para domicilio: muestra la dirección completa.
  // Para taller/punto_medio: solo un aviso contextual, sin datos de dirección vacíos.
  if (deliveryMethod === "taller") {
    lines.push("");
    lines.push("\uD83C\uDFEA *Método de entrega: Retiro en taller*");
    lines.push(
      "\u2022 El cliente retirará el pedido directamente en nuestro taller en San Miguel."
    );
  } else if (deliveryMethod === "punto_medio") {
    lines.push("");
    lines.push("\uD83E\uDD1D *Método de entrega: Punto Medio (Finde)*");
    lines.push(
      "\u2022 Se acordará un punto de entrega en San Miguel con el cliente."
    );
  } else if (
    deliveryMethod === "domicilio" ||
    (!deliveryMethod &&
      (shippingInfo?.addressColonia?.trim() ||
        shippingInfo?.addressStreet?.trim() ||
        shippingInfo?.department))
  ) {
    // Entrega a domicilio — mostrar dirección solo si hay campos no vacíos
    const hasAddressData =
      shippingInfo?.department ||
      shippingInfo?.addressColonia?.trim() ||
      shippingInfo?.addressStreet?.trim();

    if (hasAddressData) {
      lines.push("");
      lines.push("\uD83D\uDCCD *Direcci\u00f3n de entrega:*");
      if (shippingInfo!.department) {
        const loc = shippingInfo!.municipality
          ? `${shippingInfo!.municipality}, ${shippingInfo!.department}`
          : shippingInfo!.department;
        lines.push(`\u2022 Departamento/Municipio: ${loc}`);
      }
      if (shippingInfo!.addressColonia?.trim()) {
        lines.push(
          `\u2022 Colonia/Residencial: ${shippingInfo!.addressColonia!.trim()}`
        );
      }
      if (shippingInfo!.addressStreet?.trim()) {
        lines.push(
          `\u2022 Calle/Avenida: ${shippingInfo!.addressStreet!.trim()}`
        );
      }
      if (shippingInfo!.addressPolygon?.trim()) {
        lines.push(
          `\u2022 Pol\u00edgono: ${shippingInfo!.addressPolygon!.trim()}`
        );
      }
      if (shippingInfo!.addressNumber?.trim()) {
        lines.push(
          `\u2022 N\u00famero de casa/apartamento: ${shippingInfo!.addressNumber!.trim()}`
        );
      }
      if (shippingInfo!.addressReference?.trim()) {
        lines.push(
          `\u2022 Punto de referencia: _"${shippingInfo!.addressReference!.trim()}"_`
        );
      }
    }
  }

  // ── Enlace origen (si aplica) ─────────────────────────────────────────────
  if (originUrl) {
    lines.push("");
    lines.push(`\uD83D\uDD17 Ver tienda: ${originUrl}`);
  }

  return lines.join("\n");
}
