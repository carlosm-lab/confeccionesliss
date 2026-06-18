"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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
  }, [setIsCartOpen]);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isCartOpen, closeDrawer]);

  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.product.price || 0) * item.quantity;
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

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={`fixed inset-0 z-50 w-full cursor-default bg-[var(--color-scrim)]/40 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-label="Cerrar carrito"
        tabIndex={isCartOpen ? 0 : -1}
      />

      {/* Drawer */}
      <div
        data-testid="cart-drawer"
        className={`fixed top-0 right-0 z-50 flex h-[100dvh] w-full max-w-[26rem] flex-col bg-[var(--color-surface-container-lowest)] shadow-[−8px_0_30px_rgba(20,48,103,0.10)] transition-transform duration-300 ease-[var(--ease-out-expo)] ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FocusLock
          returnFocus
          disabled={!isCartOpen}
          className="flex h-[100dvh] w-full flex-col"
        >
          {/* ─── Header ──────────────────────────────────────────── */}
          <div className="flex items-center justify-between bg-[var(--color-primary)] px-5 py-4">
            <h2 className="flex items-center gap-2 text-lg font-bold text-white">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "24px" }}
              >
                shopping_cart
              </span>
              {step === "shipping"
                ? "Datos de entrega"
                : step === "confirm"
                  ? "Confirmar pedido"
                  : step === "sent"
                    ? "Pedido enviado"
                    : "Tu carrito"}
              {step === "cart" && cartItems.length > 0 && (
                <span className="ml-1 flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold text-white">
                  {cartItems.length}
                </span>
              )}
            </h2>
            <button
              data-testid="close-cart"
              onClick={closeDrawer}
              className="rounded-full p-1.5 text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
              aria-label="Cerrar carrito"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "22px" }}
              >
                close
              </span>
            </button>
          </div>

          {/* ─── Content ─────────────────────────────────────────── */}
          <div className="relative flex-1 overflow-y-auto bg-[var(--color-surface-container-low)] p-4">
            {/* PASO: ENVIADO */}
            {step === "sent" ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#25d366]/15 text-[var(--color-whatsapp)]">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "32px" }}
                  >
                    check_circle
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-[var(--color-on-surface)]">
                  Pedido generado
                </h3>
                <p className="mb-8 max-w-[250px] text-sm text-[var(--color-on-surface-variant)]">
                  Te hemos redirigido a WhatsApp. ¿Pudiste enviar el mensaje
                  correctamente?
                </p>
                <button
                  onClick={handleFinishAndClear}
                  className="mb-3 w-full rounded-xl bg-[var(--color-primary)] py-3.5 font-bold text-white transition-all duration-200 hover:bg-[var(--color-on-primary-container)] active:scale-[0.98]"
                >
                  Sí, ya hice mi pedido
                </button>
                <button
                  onClick={() => setStep("confirm")}
                  className="w-full rounded-xl border border-[var(--color-outline-variant)] bg-white py-3 text-sm font-semibold text-[var(--color-on-surface-variant)] transition-all duration-200 hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] active:scale-[0.98]"
                >
                  No, volver al carrito
                </button>
              </div>
            ) : /* PASO: CONFIRMACIÓN */
            step === "confirm" ? (
              <div className="flex h-full flex-col">
                <button
                  onClick={() => setStep("shipping")}
                  className="mb-5 flex w-max items-center gap-1 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-on-primary-container)]"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    arrow_back
                  </span>
                  Atrás
                </button>

                <h3 className="mb-4 text-lg font-bold text-[var(--color-on-surface)]">
                  Resumen del pedido
                </h3>
                <div className="mb-5 rounded-xl border border-[var(--color-primary-container)] bg-white p-4">
                  <p className="mb-4 border-l-2 border-[var(--color-primary)] pl-3 text-sm leading-relaxed text-[var(--color-on-surface-variant)]">
                    Serás redirigido a WhatsApp para enviar el pedido.
                  </p>

                  {/* Productos */}
                  <div className="mb-4 space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="line-clamp-1 pr-2 text-[var(--color-on-surface-variant)]">
                          {item.quantity}× {item.product.name}
                        </span>
                        <span className="shrink-0 font-semibold text-[var(--color-on-surface)] tabular-nums">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Info de envío */}
                  {shippingInfo && (
                    <div className="mb-3 flex items-start gap-2 rounded-lg bg-[var(--color-surface-container-low)] p-3 text-xs text-[var(--color-on-surface-variant)]">
                      <span className="material-symbols-outlined mt-0.5 shrink-0 text-[16px] text-[var(--color-primary)]">
                        local_shipping
                      </span>
                      <div>
                        <p className="font-semibold text-[var(--color-on-surface)]">
                          Entrega a {shippingInfo.municipality},{" "}
                          {shippingInfo.department}
                        </p>
                        <p>{shippingInfo.label}</p>
                      </div>
                    </div>
                  )}

                  {/* Totales */}
                  <div className="space-y-1.5 border-t border-[var(--color-outline-variant)]/40 pt-3">
                    <div className="flex justify-between text-sm text-[var(--color-on-surface-variant)]">
                      <span>Subtotal productos</span>
                      <span className="tabular-nums">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-[var(--color-on-surface-variant)]">
                      <span>Envío estimado</span>
                      <span className="tabular-nums">
                        {shippingCost === 0
                          ? "Gratis"
                          : formatPrice(shippingCost)}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 text-base font-bold">
                      <span className="text-[var(--color-on-surface)]">
                        Total estimado
                      </span>
                      <span className="text-[var(--color-primary)] tabular-nums">
                        {formatPrice(grandTotal)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto space-y-2.5">
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={isGeneratingMessage || cartItems.length === 0}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-whatsapp)] py-3.5 font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.25)] transition-all duration-200 hover:bg-[var(--color-whatsapp-hover)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.35)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      {isGeneratingMessage ? "hourglass_top" : "chat"}
                    </span>
                    {isGeneratingMessage
                      ? "Verificando..."
                      : "Confirmar e ir a WhatsApp"}
                  </button>
                  <button
                    onClick={() => setStep("shipping")}
                    className="w-full rounded-xl py-2.5 text-sm font-semibold text-[var(--color-on-surface-variant)] transition-all duration-200 hover:text-[var(--color-on-surface)] active:scale-[0.98]"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : /* PASO: ENVÍO */
            step === "shipping" ? (
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => setStep("cart")}
                  className="flex w-max items-center gap-1 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:text-[var(--color-on-primary-container)]"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "18px" }}
                  >
                    arrow_back
                  </span>
                  Atrás
                </button>

                <div>
                  <h3 className="mb-1 text-lg font-bold text-[var(--color-on-surface)]">
                    ¿A dónde enviamos?
                  </h3>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">
                    Selecciona tu ubicación para calcular el costo de envío.
                  </p>
                </div>

                {/* Referencia de zonas */}
                <div className="grid grid-cols-1 gap-2 rounded-xl border border-[var(--color-primary-container)] bg-white p-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-whatsapp)]" />
                    <span className="text-[var(--color-on-surface-variant)]">
                      <strong className="text-[var(--color-on-surface)]">
                        San Miguel
                      </strong>{" "}
                      — Gratis (punto de entrega)
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="text-[var(--color-on-surface-variant)]">
                      <strong className="text-[var(--color-on-surface)]">
                        Zona Oriental
                      </strong>{" "}
                      (Usulután, La Unión, Morazán) — $1 a $3
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[var(--color-primary)]" />
                    <span className="text-[var(--color-on-surface-variant)]">
                      <strong className="text-[var(--color-on-surface)]">
                        Resto del país
                      </strong>{" "}
                      — $3 a $5
                    </span>
                  </div>
                </div>

                {/* Selector departamento */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="shipping-dept"
                    className="text-sm font-semibold text-[var(--color-on-surface)]"
                  >
                    Departamento
                  </label>
                  <select
                    id="shipping-dept"
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="w-full rounded-xl border border-[var(--color-outline-variant)] bg-white px-4 py-3 text-sm text-[var(--color-on-surface)] transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none"
                  >
                    <option value="">Selecciona tu departamento...</option>
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
                      className="text-sm font-semibold text-[var(--color-on-surface)]"
                    >
                      Municipio
                    </label>
                    <select
                      id="shipping-muni"
                      value={selectedMunicipality}
                      onChange={(e) => setSelectedMunicipality(e.target.value)}
                      className="w-full rounded-xl border border-[var(--color-outline-variant)] bg-white px-4 py-3 text-sm text-[var(--color-on-surface)] transition-colors focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none"
                    >
                      <option value="">Selecciona tu municipio...</option>
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
                  <div className="rounded-xl border border-[#25d366]/30 bg-[#25d366]/5 p-3 text-sm">
                    <p className="font-semibold text-[var(--color-on-surface)]">
                      Costo estimado a {selectedMunicipality}:
                    </p>
                    <p className="text-[var(--color-on-surface-variant)]">
                      {
                        getShippingInfo(selectedDept, selectedMunicipality)
                          .label
                      }
                    </p>
                  </div>
                )}

                <div className="mt-auto pt-4">
                  <button
                    onClick={handleConfirmShipping}
                    disabled={!selectedDept || !selectedMunicipality}
                    className="w-full rounded-xl bg-[var(--color-primary)] py-3.5 font-bold text-white transition-all duration-200 hover:bg-[var(--color-on-primary-container)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Confirmar ubicación
                  </button>
                </div>
              </div>
            ) : /* CARRITO VACÍO */
            cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-primary-container)]">
                  <span
                    className="material-symbols-outlined text-[var(--color-primary)]"
                    style={{ fontSize: "40px" }}
                  >
                    shopping_cart
                  </span>
                </div>
                <p className="mb-1 text-base font-semibold text-[var(--color-on-surface)]">
                  Tu carrito está vacío
                </p>
                <p className="mb-6 text-sm text-[var(--color-on-surface-variant)]">
                  Explora nuestro catálogo y agrega productos
                </p>
                <button
                  onClick={closeDrawer}
                  className="rounded-xl border border-[var(--color-primary)] bg-white px-8 py-3 text-sm font-bold text-[var(--color-primary)] transition-all duration-200 hover:bg-[var(--color-primary)] hover:text-white active:scale-[0.98]"
                >
                  Ver catálogo
                </button>
              </div>
            ) : (
              /* ITEMS DEL CARRITO */
              <div className="flex flex-col gap-2.5">
                {cartItems.map((item) => {
                  if (!item || !item.product) return null;
                  return (
                    <div
                      data-testid="cart-item"
                      key={item.id}
                      className="flex gap-3 rounded-xl border border-[var(--color-primary-container)]/60 bg-white p-3 transition-all duration-200 hover:border-[var(--color-primary-container)] hover:shadow-[0_2px_8px_rgba(20,48,103,0.08)]"
                    >
                      <Link
                        href={
                          item.product.slug
                            ? `/catalogo/${item.product.slug}`
                            : "#"
                        }
                        onClick={closeDrawer}
                        className={`aspect-[4/5] w-[4.5rem] shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-container)] ${
                          !item.product.slug && "pointer-events-none opacity-80"
                        }`}
                      >
                        <Image
                          loading="lazy"
                          src={
                            item.product.image_path ||
                            item.product.images?.[0] ||
                            "https://placehold.co/200x240?text=Sin+Imagen"
                          }
                          alt={item.product.name}
                          width={90}
                          height={112}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                          unoptimized
                        />
                      </Link>

                      <div className="flex flex-1 flex-col justify-between gap-1">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="line-clamp-2 text-[13px] leading-snug font-bold text-[var(--color-on-surface)]">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Eliminar producto"
                              className="shrink-0 rounded-md p-1 text-[var(--color-outline)] transition-all duration-200 hover:bg-red-50 hover:text-[var(--color-tertiary)] active:scale-90"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "18px" }}
                              >
                                delete
                              </span>
                            </button>
                          </div>
                          <p className="mt-0.5 text-[15px] font-extrabold text-[var(--color-primary)] tabular-nums">
                            {formatPrice(item.product.price)}
                          </p>
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

                        <div className="mt-1 flex items-center">
                          <div className="flex w-max items-center rounded-lg border border-[var(--color-outline-variant)]/60 bg-[var(--color-surface-container-lowest)]">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="Disminuir cantidad"
                              disabled={item.quantity <= 1}
                              className="flex aspect-square w-8 items-center justify-center rounded-l-lg text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-primary-container)]/40 hover:text-[var(--color-primary)] active:scale-90 disabled:opacity-25"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "16px" }}
                              >
                                remove
                              </span>
                            </button>
                            <span className="w-8 text-center text-sm font-bold text-[var(--color-on-surface)] tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Aumentar cantidad"
                              className="flex aspect-square w-8 items-center justify-center rounded-r-lg text-[var(--color-on-surface-variant)] transition-all duration-150 hover:bg-[var(--color-primary-container)]/40 hover:text-[var(--color-primary)] active:scale-90"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "16px" }}
                              >
                                add
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ─── Footer — solo en paso carrito con items ──────── */}
          {step === "cart" && cartItems.length > 0 && (
            <div className="mt-auto border-t border-[var(--color-primary-container)] bg-white px-5 py-4">
              <div className="mb-3 flex items-start gap-2 rounded-lg bg-[var(--color-primary-container)]/20 p-2.5 text-[11px] text-[var(--color-on-surface-variant)]">
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[14px] text-[var(--color-primary)]">
                  schedule
                </span>
                <p>
                  Reservado en este dispositivo por{" "}
                  <strong className="text-[var(--color-on-surface)]">
                    7 días
                  </strong>
                  .
                </p>
              </div>

              {arePricesStale && (
                <div className="mb-3 flex flex-col gap-1.5 rounded-lg border border-[var(--color-tertiary)]/20 bg-[var(--color-tertiary)]/5 p-2.5 text-xs text-[var(--color-tertiary)]">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[14px]">
                      error
                    </span>
                    <p>
                      <strong>Atención:</strong> No pudimos verificar los
                      precios actualizados.
                    </p>
                  </div>
                  <button
                    onClick={() => refreshCartPrices()}
                    className="mt-0.5 flex items-center gap-1 self-start rounded-md bg-[var(--color-tertiary)]/10 px-2.5 py-1.5 text-[11px] font-bold text-[var(--color-tertiary)] transition-colors hover:bg-[var(--color-tertiary)]/20 active:scale-[0.97]"
                  >
                    <span className="material-symbols-outlined text-[12px]">
                      refresh
                    </span>
                    Reintentar
                  </button>
                </div>
              )}

              <div className="mb-3 flex items-end justify-between">
                <span className="text-sm text-[var(--color-on-surface-variant)]">
                  Subtotal:
                </span>
                <span className="text-xl font-black text-[var(--color-primary)] tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button
                data-testid="checkout-button"
                onClick={() => setStep("shipping")}
                disabled={isRefreshingPrices}
                className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-whatsapp)] py-3.5 font-bold text-white shadow-[0_4px_12px_rgba(37,211,102,0.25)] transition-all duration-200 hover:bg-[var(--color-whatsapp-hover)] hover:shadow-[0_6px_16px_rgba(37,211,102,0.35)] active:scale-[0.98] ${
                  isRefreshingPrices ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {isRefreshingPrices
                  ? "Actualizando precios..."
                  : "Continuar con el pedido"}
                {!isRefreshingPrices && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
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
