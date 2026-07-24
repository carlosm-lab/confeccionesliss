"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { buildWhatsAppUrl, buildCartWhatsAppMessage } from "@/lib/whatsapp";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { clientEnv } from "@/lib/clientEnv";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";
import FocusLock from "react-focus-lock";
import { DEPARTMENTS, getShippingInfo } from "@/lib/shipping";
import { getProductUrl } from "@/lib/productShared";
import { DeliveryForm } from "./DeliveryFormModal";
import type { ShippingInfo } from "@/lib/shipping";

// Pasos del checkout
type DrawerStep = "cart" | "shipping" | "confirm" | "sent";

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    isRefreshingPrices,
    arePricesStale,
    refreshCartPrices,
    shippingInfo,
    setShippingInfo,
  } = useCart();

  const [step, setStep] = useState<DrawerStep>("cart");
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedMunicipality, setSelectedMunicipality] = useState("");

  // Datos adicionales de entrega — guardados del formulario extendido
  const [deliveryFormKey, setDeliveryFormKey] = useState(0);

  // Guard de hidratación: cartItems viene de localStorage (solo disponible en cliente).
  // En SSR cartItems = [], en el cliente puede tener items.
  // Renderizar el badge de conteo solo después de montar evita el mismatch de hidratación.
  // Mismo patrón que Navbar.tsx (safeCartCount).
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  const safeCartItems = isMounted ? cartItems : [];

  const municipalities = useMemo(() => {
    const dept = DEPARTMENTS.find((d) => d.name === selectedDept);
    return dept?.municipalities ?? [];
  }, [selectedDept]);

  useEffect(() => {
    setSelectedMunicipality("");
  }, [selectedDept]);

  useEffect(() => {
    if (!isCartOpen) {
      setStep("cart");
      setSelectedDept("");
      setSelectedMunicipality("");
      setDeliveryFormKey((k) => k + 1); // resetear formulario
    }
  }, [isCartOpen]);

  useEffect(() => {
    if (isCartOpen) {
      refreshCartPrices();
    }
  }, [isCartOpen, refreshCartPrices]);

  useBodyScrollLock(isCartOpen);

  const closeDrawer = useCallback(() => {
    setStep("cart");
    setIsCartOpen(false);
    setDragX(0);
  }, [setIsCartOpen]);

  // ── Swipe-right-to-close (mobile only) ────────────────────────
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const swipeAxis = useRef<"h" | "v" | null>(null);

  // Reset drag when drawer closes externally
  useEffect(() => {
    if (!isCartOpen) setDragX(0);
  }, [isCartOpen]);

  const onDragStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    swipeAxis.current = null;
  };

  const onDragMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = Math.abs(e.touches[0].clientY - touchStartY.current);
    // Lock axis on first significant movement
    if (!swipeAxis.current && (Math.abs(dx) > 6 || dy > 6)) {
      swipeAxis.current = Math.abs(dx) > dy ? "h" : "v";
    }
    if (swipeAxis.current === "h" && dx > 0) {
      setIsDragging(true);
      setDragX(dx);
    }
  };

  const onDragEnd = () => {
    setIsDragging(false);
    if (dragX > 120) {
      closeDrawer();
    } else {
      setDragX(0);
    }
    swipeAxis.current = null;
  };

  useEffect(() => {
    if (!isCartOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isCartOpen, closeDrawer]);

  // Items con price=0 son productos "A la medida" sin precio fijo — se excluyen del subtotal
  const subtotal = safeCartItems.reduce((total, item) => {
    if (!item.product.price) return total; // A la medida: precio=0, no suma
    return total + item.product.price * item.quantity;
  }, 0);

  const shippingCost = shippingInfo?.cost ?? 0;
  const grandTotal = subtotal + shippingCost;

  const handleConfirmShipping = () => {
    if (!selectedDept) {
      toast.error("Por favor selecciona un departamento.");
      return;
    }
    if (!selectedMunicipality) {
      toast.error("Por favor selecciona un municipio.");
      return;
    }
    const info = getShippingInfo(selectedDept, selectedMunicipality);
    setShippingInfo(info);
    setStep("confirm");
  };

  const handleWhatsAppOrder = async () => {
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(
      navigator.userAgent
    );
    let whatsappWindow: Window | null = null;
    if (!isMobileDevice) {
      whatsappWindow = window.open("about:blank", "_blank");
    }

    setIsGeneratingMessage(true);
    let rawMessage = "";
    const originUrl =
      typeof window !== "undefined" ? window.location.origin : "";

    try {
      const supabase = getSupabaseClient();
      const { data: serverMessage, error } = await supabase.rpc(
        "generate_whatsapp_message",
        {
          items: cartItems,
          store_domain: window.location.origin,
          shipping_department: shippingInfo?.department ?? null,
          shipping_municipality: shippingInfo?.municipality ?? null,
          shipping_cost: shippingInfo?.cost ?? 0,
          shipping_label: shippingInfo?.label ?? null,
          delivery_method: shippingInfo?.deliveryMethod ?? null,
        }
      );

      if (error) {
        logger.warn(
          "RPC generate_whatsapp_message falló en servidor, usando generador local fallback:",
          error
        );
        rawMessage = buildCartWhatsAppMessage({
          items: cartItems.map((item) => ({
            product: item.product,
            quantity: item.quantity,
            color: item.color,
            note: item.note,
            productSize: item.product.selectedSize,
          })),
          shippingInfo: shippingInfo
            ? {
                deliveryMethod: shippingInfo.deliveryMethod,
                department: shippingInfo.department,
                municipality: shippingInfo.municipality,
                cost: shippingInfo.cost,
                label: shippingInfo.label,
                recipientName: shippingInfo.recipientName,
                recipientPhone: shippingInfo.recipientPhone,
                alternatePhone: shippingInfo.alternatePhone,
                addressColonia: shippingInfo.addressColonia,
                addressStreet: shippingInfo.addressStreet,
                addressPolygon: shippingInfo.addressPolygon,
                addressNumber: shippingInfo.addressNumber,
                addressReference: shippingInfo.addressReference,
              }
            : null,
          originUrl,
        });
      } else {
        rawMessage = serverMessage as string;
      }
    } catch (err) {
      logger.warn(
        "Excepción al invocar generate_whatsapp_message, usando fallback local:",
        err
      );
      rawMessage = buildCartWhatsAppMessage({
        items: cartItems.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          color: item.color,
          note: item.note,
          productSize: item.product.selectedSize,
        })),
        shippingInfo: shippingInfo
          ? {
              deliveryMethod: shippingInfo.deliveryMethod,
              department: shippingInfo.department,
              municipality: shippingInfo.municipality,
              cost: shippingInfo.cost,
              label: shippingInfo.label,
              recipientName: shippingInfo.recipientName,
              recipientPhone: shippingInfo.recipientPhone,
              alternatePhone: shippingInfo.alternatePhone,
              addressColonia: shippingInfo.addressColonia,
              addressStreet: shippingInfo.addressStreet,
              addressPolygon: shippingInfo.addressPolygon,
              addressNumber: shippingInfo.addressNumber,
              addressReference: shippingInfo.addressReference,
            }
          : null,
        originUrl,
      });
    } finally {
      setIsGeneratingMessage(false);
    }

    if (!rawMessage) {
      toast.error("Error al generar el mensaje. Verifica tu carrito.");
      if (whatsappWindow) whatsappWindow.close();
      return;
    }

    // ── Agregar datos de entrega y destinatario si no están en el mensaje (omitidos por RPC) ──
    if (shippingInfo) {
      const deliveryMethod = shippingInfo.deliveryMethod;
      const extraLines: string[] = [];

      // Datos del destinatario/cliente — se añaden si el RPC no los incluyó
      if (
        (shippingInfo.recipientName?.trim() ||
          shippingInfo.recipientPhone?.trim()) &&
        !rawMessage.includes("destinatario") &&
        !rawMessage.includes("Destinatario") &&
        !rawMessage.includes("cliente") &&
        !rawMessage.includes("Cliente")
      ) {
        const recipientHeader =
          deliveryMethod === "domicilio"
            ? "\n👤 *Datos del destinatario:*"
            : "\n👤 *Datos del cliente:*";
        extraLines.push(recipientHeader);
        if (shippingInfo.recipientName?.trim()) {
          extraLines.push(`• Nombre: ${shippingInfo.recipientName.trim()}`);
        }
        if (shippingInfo.recipientPhone?.trim()) {
          extraLines.push(`• Teléfono: ${shippingInfo.recipientPhone.trim()}`);
        }
        if (shippingInfo.alternatePhone?.trim()) {
          extraLines.push(
            `• Contacto alterno: ${shippingInfo.alternatePhone.trim()}`
          );
        }
      }

      // Método de entrega / dirección — solo si el RPC no los incluyó
      const hasDeliveryInfo =
        rawMessage.includes("Método de entrega") ||
        rawMessage.includes("Dirección de entrega") ||
        rawMessage.includes("dirección de entrega") ||
        rawMessage.includes("Punto Medio") ||
        rawMessage.includes("Retiro en taller");

      if (!hasDeliveryInfo) {
        if (deliveryMethod === "taller") {
          extraLines.push("\n🏪 *Método de entrega: Retiro en taller*");
          extraLines.push(
            "• El cliente retirará el pedido directamente en nuestro taller en San Miguel."
          );
        } else if (deliveryMethod === "punto_medio") {
          extraLines.push("\n🤝 *Método de entrega: Punto Medio (Finde)*");
          extraLines.push(
            "• Se acordará un punto de entrega en San Miguel con el cliente."
          );
        } else if (
          deliveryMethod === "domicilio" &&
          (shippingInfo.addressColonia?.trim() ||
            shippingInfo.addressStreet?.trim() ||
            shippingInfo.department)
        ) {
          extraLines.push("\n📍 *Dirección de entrega:*");
          if (shippingInfo.department) {
            const loc = shippingInfo.municipality
              ? `${shippingInfo.municipality}, ${shippingInfo.department}`
              : shippingInfo.department;
            extraLines.push(`• Departamento/Municipio: ${loc}`);
          }
          if (shippingInfo.addressColonia?.trim()) {
            extraLines.push(
              `• Colonia/Residencial: ${shippingInfo.addressColonia!.trim()}`
            );
          }
          if (shippingInfo.addressStreet?.trim()) {
            extraLines.push(
              `• Calle/Avenida: ${shippingInfo.addressStreet!.trim()}`
            );
          }
          if (shippingInfo.addressPolygon?.trim()) {
            extraLines.push(
              `• Polígono: ${shippingInfo.addressPolygon!.trim()}`
            );
          }
          if (shippingInfo.addressNumber?.trim()) {
            extraLines.push(
              `• Número de casa/apartamento: ${shippingInfo.addressNumber!.trim()}`
            );
          }
          if (shippingInfo.addressReference?.trim()) {
            extraLines.push(
              `• Punto de referencia: _"${shippingInfo.addressReference!.trim()}"_`
            );
          }
        }
      }

      if (extraLines.length > 0) {
        rawMessage += "\n" + extraLines.join("\n");
      }
    }

    // ── Agregar enlaces de producto al final del mensaje ──────────
    // El RPC no incluye URLs de producto. Los construimos aquí desde item.product.slug.
    const storeOrigin =
      typeof window !== "undefined" ? window.location.origin : "";
    const productLinks = cartItems
      .filter((item) => item.product.slug)
      .map(
        (item) =>
          `• ${item.product.name}: ${storeOrigin}/catalogo/${item.product.slug}`
      )
      .join("\n");

    if (productLinks) {
      rawMessage += `\n\n🔗 *Enlace(s) de producto:*\n${productLinks}`;
    }

    let url = "";
    const rawPhoneNumber = clientEnv.NEXT_PUBLIC_WHATSAPP_NUMBER;

    try {
      const { url: safeUrl, usedFallback } = buildWhatsAppUrl(
        rawPhoneNumber,
        rawMessage
      );
      url = safeUrl;
      if (usedFallback) {
        toast.error("El pedido es muy extenso, enviando resumen...", {
          duration: 5000,
        });
      }
    } catch (err) {
      logger.error("Error de configuracion de WhatsApp:", err);
      toast.error("Error de configuracion: Numero de vendedor invalido.");
      if (whatsappWindow) whatsappWindow.close();
      return;
    }

    setStep("sent");

    setTimeout(() => {
      try {
        if (isMobileDevice) {
          window.location.href = url;
        } else {
          if (whatsappWindow) {
            whatsappWindow.location.href = url;
          } else {
            window.open(url, "_blank", "noopener,noreferrer");
          }
        }
      } catch (e) {
        logger.error("Error al redirigir a WhatsApp:", e);
        toast(`Abre WhatsApp manualmente al ${rawPhoneNumber}`, { icon: "📱" });
      }
    }, 100);
  };

  const handleFinishAndClear = () => {
    clearCart();
    setShippingInfo(null);
    setStep("cart");
    setIsCartOpen(false);
  };

  /* ── Back button — reusable across steps ─────────────── */
  const BackButton = ({ onClick }: { onClick: () => void }) => (
    <button
      onClick={onClick}
      className="group mb-5 flex w-max items-center gap-1 text-sm font-medium text-[var(--color-on-surface-variant)] transition-colors duration-200 hover:text-[var(--color-primary)]"
    >
      <Icon
        name="arrow_back"
        className="transition-transform duration-200 group-hover:-translate-x-0.5"
      />
      Atrás
    </button>
  );

  return (
    <>
      {/* ── Backdrop ─────────────────────────────────────── */}
      <button
        type="button"
        className={`fixed inset-0 z-50 w-full cursor-default bg-black/30 backdrop-blur-[2px] transition-opacity duration-300 ease-[var(--ease-out-expo)] sm:bg-black/20 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-label="Cerrar carrito"
        tabIndex={isCartOpen ? 0 : -1}
      />

      {/* ── Drawer panel ─────────────────────────────────── */}
      <div
        data-testid="cart-drawer"
        onTouchStart={onDragStart}
        onTouchMove={onDragMove}
        onTouchEnd={onDragEnd}
        className="fixed top-0 right-0 z-50 flex h-[100dvh] w-full flex-col bg-[var(--color-surface)] sm:max-w-[26rem]"
        style={{
          transform: isCartOpen ? `translateX(${dragX}px)` : `translateX(100%)`,
          transition: isDragging
            ? "none"
            : "transform 0.5s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
          opacity: Math.max(0, 1 - dragX / 500),
          boxShadow: isCartOpen
            ? "-16px 0 48px rgba(20, 48, 103, 0.07), -2px 0 12px rgba(20, 48, 103, 0.03)"
            : "none",
        }}
      >
        <FocusLock
          returnFocus
          disabled={!isCartOpen}
          className="flex h-[100dvh] w-full flex-col"
        >
          {/* ── Header ──────────────────────────────────── */}
          <header className="flex items-center justify-between px-5 pt-5 pb-4 sm:px-6">
            <h2 className="flex items-baseline gap-2">
              <span className="font-serif text-[1.25rem] font-bold tracking-tight text-[var(--color-primary)]">
                {step === "shipping"
                  ? "Datos de entrega"
                  : step === "confirm"
                    ? "Confirmar pedido"
                    : step === "sent"
                      ? "Pedido enviado"
                      : "Tu carrito"}
              </span>
              {step === "cart" && safeCartItems.length > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[var(--color-primary)] px-1.5 text-xs font-bold text-[var(--color-on-primary)] tabular-nums">
                  {safeCartItems.length}
                </span>
              )}
            </h2>
            <button
              data-testid="close-cart"
              onClick={closeDrawer}
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-on-surface-variant)] transition-all duration-200 hover:bg-[var(--color-surface-container)] hover:text-[var(--color-on-surface)] active:scale-95"
              aria-label="Cerrar carrito"
            >
              <Icon name="close" />
            </button>
          </header>

          {/* Hairline */}
          <div className="mx-5 h-px bg-[var(--color-outline-variant)]/25 sm:mx-6" />

          {/* ── Content area ────────────────────────────── */}
          <div className="elegant-scrollbar flex-1 overflow-y-auto px-5 py-4 sm:px-6">
            {/* ─ PASO: ENVIADO ─ */}
            {step === "sent" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-whatsapp)]/10">
                  <Icon
                    name="check_circle"
                    fill
                    className="text-[var(--color-whatsapp)]"
                  />
                </div>
                <h3 className="mb-1 font-serif text-lg font-bold text-[var(--color-on-surface)]">
                  Pedido generado
                </h3>
                <p className="mb-7 max-w-[240px] text-sm leading-relaxed text-[var(--color-on-surface-variant)]">
                  Te hemos redirigido a WhatsApp. ¿Pudiste enviar el mensaje?
                </p>
                <button
                  onClick={handleFinishAndClear}
                  className="mb-3 w-full rounded-xl bg-[var(--color-primary)] py-3 text-sm font-bold text-[var(--color-on-primary)] transition-all duration-200 hover:bg-[var(--color-on-primary-container)] active:scale-[0.98]"
                >
                  Sí, pedido enviado
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  className="w-full py-2.5 text-sm font-medium text-[var(--color-on-surface-variant)] transition-colors duration-200 hover:text-[var(--color-primary)]"
                >
                  Volver al carrito
                </button>
              </div>
            ) : /* ─ PASO: CONFIRMACIÓN ─ */
            step === "confirm" ? (
              <div className="flex h-full flex-col">
                <BackButton onClick={() => setStep("shipping")} />

                <div className="mb-5 rounded-2xl bg-[var(--color-surface-container-low)] p-5">
                  <p className="mb-4 text-sm leading-relaxed text-[var(--color-on-surface-variant)]">
                    Serás redirigido a WhatsApp para enviar el pedido.
                  </p>

                  {/* Productos */}
                  <div className="mb-4 space-y-2">
                    {safeCartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="line-clamp-1 pr-3 text-[var(--color-on-surface-variant)]">
                          {item.quantity}× {item.product.name}
                        </span>
                        <span className="shrink-0 font-semibold text-[var(--color-on-surface)] tabular-nums">
                          {item.product.price === 0 ? (
                            <span className="text-amber-600">A cotizar</span>
                          ) : (
                            formatPrice(item.product.price * item.quantity)
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Info de envío */}
                  {shippingInfo && (
                    <div className="mb-4 flex items-start gap-2 text-xs text-[var(--color-on-surface-variant)]">
                      <Icon
                        name="local_shipping"
                        className="mt-0.5 shrink-0 text-[var(--color-primary)]"
                      />
                      <div>
                        <p className="font-semibold text-[var(--color-on-surface)]">
                          {shippingInfo.municipality}, {shippingInfo.department}
                        </p>
                        <p>{shippingInfo.label}</p>
                      </div>
                    </div>
                  )}

                  {/* Totales */}
                  <div className="space-y-1.5 border-t border-[var(--color-outline-variant)]/20 pt-3 text-sm">
                    <div className="flex justify-between text-[var(--color-on-surface-variant)]">
                      <span>Subtotal</span>
                      <span className="tabular-nums">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-[var(--color-on-surface-variant)]">
                      <span>Envío</span>
                      <span className="tabular-nums">
                        {shippingCost === 0
                          ? "Gratis"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 font-bold">
                      <span className="text-[var(--color-on-surface)]">
                        Total
                      </span>
                      <span className="text-[var(--color-primary)] tabular-nums">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-2">
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={isGeneratingMessage || cartItems.length === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-whatsapp)] py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_rgba(37,211,102,0.18)] transition-all duration-200 hover:bg-[var(--color-whatsapp-hover)] hover:shadow-[0_6px_20px_rgba(37,211,102,0.28)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <Icon
                      name={isGeneratingMessage ? "pending" : "chat"}
                      size={18}
                    />
                    {isGeneratingMessage
                      ? "Verificando..."
                      : "Confirmar e ir a WhatsApp"}
                  </button>
                  <button
                    onClick={() => setStep("shipping")}
                    className="w-full py-2 text-sm font-medium text-[var(--color-on-surface-variant)] transition-colors hover:text-[var(--color-on-surface)]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : /* ─ PASO: ENVÍO ─ */
            step === "shipping" ? (
              <DeliveryForm
                key={deliveryFormKey}
                initialState={{
                  department: shippingInfo?.department ?? "",
                  municipality: shippingInfo?.municipality ?? "",
                  recipientName: shippingInfo?.recipientName ?? "",
                  recipientPhone: shippingInfo?.recipientPhone ?? "",
                  alternatePhone: shippingInfo?.alternatePhone ?? "",
                  addressColonia: shippingInfo?.addressColonia ?? "",
                  addressStreet: shippingInfo?.addressStreet ?? "",
                  addressPolygon: shippingInfo?.addressPolygon ?? "",
                  addressNumber: shippingInfo?.addressNumber ?? "",
                  addressReference: shippingInfo?.addressReference ?? "",
                  termsAccepted: shippingInfo?.termsAccepted ?? false,
                  deliveryMethod: shippingInfo?.deliveryMethod ?? "",
                }}
                hasALaMedidaItem={safeCartItems.some(
                  (item) =>
                    item.product.selectedSize === "A la medida" ||
                    (item.note && item.note.includes("A la medida"))
                )}
                onConfirm={(info) => {
                  setShippingInfo(info);
                  setStep("confirm");
                }}
                onBack={() => setStep("cart")}
                confirmLabel="Confirmar datos de entrega"
              />
            ) : /* ─ CARRITO VACÍO ─ */
            safeCartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary-container)]/40">
                  <Icon
                    name="shopping_bag"
                    className="text-[var(--color-primary)]"
                  />
                </div>
                <p className="mb-1 font-serif text-base font-bold text-[var(--color-on-surface)]">
                  Tu carrito está vacío
                </p>
                <p className="mb-6 text-sm text-[var(--color-on-surface-variant)]">
                  Agrega productos desde nuestro catálogo
                </p>
                <button
                  onClick={closeDrawer}
                  className="rounded-full bg-[var(--color-primary)] px-7 py-2.5 text-sm font-semibold text-[var(--color-on-primary)] transition-all duration-200 hover:bg-[var(--color-on-primary-container)] active:scale-[0.97]"
                >
                  Explorar catálogo
                </button>
              </div>
            ) : (
              /* ─ ITEMS DEL CARRITO ─ */
              <div className="flex flex-col">
                {safeCartItems.map((item, index) => {
                  if (!item || !item.product) return null;
                  return (
                    <div key={item.id}>
                      <div
                        data-testid="cart-item"
                        className="group/item flex gap-4 py-4"
                      >
                        {/* Product image */}
                        <Link
                          href={getProductUrl(item.product as any)}
                          onClick={closeDrawer}
                          className="aspect-[4/5] w-[5rem] shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface-container-low)] ring-1 ring-[var(--color-outline-variant)]/15"
                        >
                          <Image
                            loading="lazy"
                            src={
                              item.product.image_path ||
                              item.product.images?.[0] ||
                              "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='125' viewBox='0 0 100 125'><rect width='100' height='125' fill='%23f1f5f9'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-size='11'>Sin Imagen</text></svg>"
                            }
                            alt={item.product.name}
                            width={100}
                            height={125}
                            className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/item:scale-105"
                            quality={70}
                          />
                        </Link>

                        {/* Details */}
                        <div className="flex flex-1 flex-col justify-between">
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="line-clamp-2 text-sm leading-snug font-semibold text-[var(--color-on-surface)]">
                                {item.product.name}
                              </h3>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                aria-label="Eliminar producto"
                                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-outline)] transition-all duration-200 hover:bg-[var(--color-tertiary)]/8 hover:text-[var(--color-tertiary)] active:scale-90"
                              >
                                <Icon name="delete" />
                              </button>
                            </div>
                            {(item.color || item.note) && (
                              <div className="mt-1 space-y-0.5 text-[11px] text-[var(--color-on-surface-variant)]">
                                {item.color && <p>Color: {item.color}</p>}
                                {item.note && (
                                  <p className="line-clamp-1 italic">
                                    {item.note}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="mt-2 flex items-end justify-between">
                            {/* Quantity stepper — pill */}
                            <div className="flex items-center rounded-full bg-[var(--color-surface-container)] ring-1 ring-[var(--color-outline-variant)]/20">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                aria-label="Disminuir cantidad"
                                disabled={item.quantity <= 1}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-primary)] active:scale-90 disabled:opacity-20"
                              >
                                <Icon name="remove" />
                              </button>
                              <span className="w-7 text-center text-sm font-bold text-[var(--color-on-surface)] tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                aria-label="Aumentar cantidad"
                                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-surface-container-high)] hover:text-[var(--color-primary)] active:scale-90"
                              >
                                <Icon name="add" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="text-[15px] font-bold tabular-nums">
                              {item.product.price === 0 ? (
                                <span className="text-amber-600">
                                  A cotizar
                                </span>
                              ) : (
                                <span className="text-[var(--color-primary)]">
                                  {formatPrice(item.product.price)}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Divider between items */}
                      {index < safeCartItems.length - 1 && (
                        <div className="h-px bg-[var(--color-outline-variant)]/15" />
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Footer ──────────────────────────────────── */}
          {step === "cart" && safeCartItems.length > 0 && (
            <div
              className="mt-auto bg-[var(--color-surface)] px-5 pt-4 pb-5 sm:px-6"
              style={{ boxShadow: "0 -6px 20px rgba(20, 48, 103, 0.04)" }}
            >
              {/* Reservation notice */}
              <div className="mb-3 flex items-center gap-2 text-[11px] text-[var(--color-on-surface-variant)]">
                <Icon name="schedule" className="text-[var(--color-outline)]" />
                <p>
                  Reservado en este dispositivo por{" "}
                  <span className="font-semibold text-[var(--color-on-surface)]">
                    7 días
                  </span>
                </p>
              </div>

              {arePricesStale && (
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-[var(--color-tertiary)]/5 p-2.5 text-[11px] text-[var(--color-tertiary)]">
                  <Icon name="error" className="shrink-0" />
                  <p>
                    No pudimos verificar precios.{" "}
                    <button
                      onClick={() => refreshCartPrices()}
                      className="font-bold underline decoration-[var(--color-tertiary)]/40 underline-offset-2 hover:decoration-[var(--color-tertiary)]"
                    >
                      Reintentar
                    </button>
                  </p>
                </div>
              )}

              {/* Subtotal */}
              <div className="mb-4 flex items-baseline justify-between">
                <span className="text-sm text-[var(--color-on-surface-variant)]">
                  Subtotal
                </span>
                <span className="text-xl font-bold tracking-tight text-[var(--color-on-surface)] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* CTA — brand primary, NOT WhatsApp green */}
              <button
                data-testid="checkout-button"
                onClick={() => setStep("shipping")}
                disabled={isRefreshingPrices}
                className={`group flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3.5 text-sm font-bold text-[var(--color-on-primary)] shadow-[0_4px_14px_rgba(20,48,103,0.15)] transition-all duration-200 hover:bg-[var(--color-on-primary-container)] hover:shadow-[0_6px_20px_rgba(20,48,103,0.22)] active:scale-[0.98] ${
                  isRefreshingPrices ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isRefreshingPrices
                  ? "Actualizando..."
                  : "Continuar con el pedido"}
                {!isRefreshingPrices && (
                  <Icon
                    name="arrow_forward"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  />
                )}
              </button>
            </div>
          )}
        </FocusLock>
      </div>
    </>
  );
}
