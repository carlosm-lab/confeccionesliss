"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { env } from "@/env";
import toast from "react-hot-toast";
import FocusLock from "react-focus-lock";
import { DEPARTMENTS, getShippingInfo } from "@/lib/shipping";
import { getProductUrl } from "@/lib/catalogService";

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
        }
      );

      if (error) throw error;
      rawMessage = serverMessage as string;
    } catch (err) {
      logger.error("Error generando mensaje seguro:", err);
      toast.error("Error al generar el pedido. Intenta nuevamente.", {
        duration: 5000,
      });
      if (whatsappWindow) whatsappWindow.close();
      return;
    } finally {
      setIsGeneratingMessage(false);
    }

    if (!rawMessage) {
      toast.error("Error al generar el mensaje. Verifica tu carrito.");
      if (whatsappWindow) whatsappWindow.close();
      return;
    }

    let url = "";
    const rawPhoneNumber = env.NEXT_PUBLIC_WHATSAPP_NUMBER;

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
      <span
        className="material-symbols-outlined transition-transform duration-200 group-hover:-translate-x-0.5"
        style={{ fontSize: "18px" }}
      >
        arrow_back
      </span>
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
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "20px" }}
              >
                close
              </span>
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
                  <span
                    className="material-symbols-outlined text-[var(--color-whatsapp)]"
                    style={{
                      fontSize: "28px",
                      fontVariationSettings: "'FILL' 1",
                    }}
                  >
                    check_circle
                  </span>
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
                      <span
                        className="material-symbols-outlined mt-0.5 shrink-0 text-[var(--color-primary)]"
                        style={{ fontSize: "16px" }}
                      >
                        local_shipping
                      </span>
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
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "18px" }}
                    >
                      {isGeneratingMessage ? "hourglass_top" : "chat"}
                    </span>
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
              <div className="flex flex-col gap-4">
                <BackButton onClick={() => setStep("cart")} />

                <div>
                  <h3 className="mb-1 font-serif text-lg font-bold text-[var(--color-on-surface)]">
                    ¿A dónde enviamos?
                  </h3>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">
                    Selecciona tu ubicación para calcular el envío.
                  </p>
                </div>

                {/* Referencia de zonas */}
                <div className="space-y-2 rounded-xl bg-[var(--color-surface-container-low)] p-4 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-whatsapp)]" />
                    <span className="text-[var(--color-on-surface-variant)]">
                      <span className="font-semibold text-[var(--color-on-surface)]">
                        San Miguel
                      </span>{" "}
                      — Gratis
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
                    <span className="text-[var(--color-on-surface-variant)]">
                      <span className="font-semibold text-[var(--color-on-surface)]">
                        Zona Oriental
                      </span>{" "}
                      — $1 a $3
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
                    <span className="text-[var(--color-on-surface-variant)]">
                      <span className="font-semibold text-[var(--color-on-surface)]">
                        Resto del país
                      </span>{" "}
                      — $3 a $5
                    </span>
                  </div>
                </div>

                {/* Selector departamento */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="shipping-dept"
                    className="text-xs font-semibold tracking-wide text-[var(--color-on-surface-variant)] uppercase"
                  >
                    Departamento
                  </label>
                  <select
                    id="shipping-dept"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-on-surface)] transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none"
                  >
                    <option value="">Selecciona departamento</option>
                    {DEPARTMENTS.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selector municipio */}
                {selectedDept && (
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="shipping-muni"
                      className="text-xs font-semibold tracking-wide text-[var(--color-on-surface-variant)] uppercase"
                    >
                      Municipio
                    </label>
                    <select
                      id="shipping-muni"
                      value={selectedMunicipality}
                      onChange={(e) => setSelectedMunicipality(e.target.value)}
                      className="w-full rounded-xl border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-on-surface)] transition-all duration-200 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none"
                    >
                      <option value="">Selecciona municipio</option>
                      {municipalities.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Preview costo */}
                {selectedDept && selectedMunicipality && (
                  <div className="rounded-xl bg-[var(--color-primary-container)]/30 p-3.5 text-sm">
                    <p className="font-semibold text-[var(--color-on-surface)]">
                      Envío a {selectedMunicipality}
                    </p>
                    <p className="text-[var(--color-on-surface-variant)]">
                      {
                        getShippingInfo(selectedDept, selectedMunicipality)
                          .label
                      }
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-2">
                  <button
                    onClick={handleConfirmShipping}
                    disabled={!selectedDept || !selectedMunicipality}
                    className="w-full rounded-xl bg-[var(--color-primary)] py-3.5 text-sm font-bold text-[var(--color-on-primary)] transition-all duration-200 hover:bg-[var(--color-on-primary-container)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    Confirmar ubicación
                  </button>
                </div>
              </div>
            ) : /* ─ CARRITO VACÍO ─ */
            safeCartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary-container)]/40">
                  <span
                    className="material-symbols-outlined text-[var(--color-primary)]"
                    style={{ fontSize: "32px" }}
                  >
                    shopping_bag
                  </span>
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
                              "https://placehold.co/200x240?text=Sin+Imagen"
                            }
                            alt={item.product.name}
                            width={100}
                            height={125}
                            className="h-full w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/item:scale-105"
                            unoptimized
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
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "18px" }}
                                >
                                  delete
                                </span>
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
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "16px" }}
                                >
                                  remove
                                </span>
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
                                <span
                                  className="material-symbols-outlined"
                                  style={{ fontSize: "16px" }}
                                >
                                  add
                                </span>
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
                <span
                  className="material-symbols-outlined text-[var(--color-outline)]"
                  style={{ fontSize: "14px" }}
                >
                  schedule
                </span>
                <p>
                  Reservado en este dispositivo por{" "}
                  <span className="font-semibold text-[var(--color-on-surface)]">
                    7 días
                  </span>
                </p>
              </div>

              {arePricesStale && (
                <div className="mb-3 flex items-center gap-2 rounded-lg bg-[var(--color-tertiary)]/5 p-2.5 text-[11px] text-[var(--color-tertiary)]">
                  <span
                    className="material-symbols-outlined shrink-0"
                    style={{ fontSize: "14px" }}
                  >
                    error
                  </span>
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
                  <span
                    className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-0.5"
                    style={{ fontSize: "18px" }}
                  >
                    arrow_forward
                  </span>
                )}
              </button>
            </div>
          )}
        </FocusLock>
      </div>
    </>
  );
}
