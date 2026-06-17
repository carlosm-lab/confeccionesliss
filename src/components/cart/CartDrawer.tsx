"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useModal } from "@/hooks/useModal";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { env } from "@/env";
import toast from "react-hot-toast";
import FocusLock from "react-focus-lock";

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
  } = useCart();

  const [showConfirm, setShowConfirm] = useState(false);
  const [orderSent, setOrderSent] = useState(false);
  const [isGeneratingMessage, setIsGeneratingMessage] = useState(false);

  // Auto-refresh precios al abrir el drawer
  useEffect(() => {
    if (isCartOpen) {
      refreshCartPrices();
    }
  }, [isCartOpen, refreshCartPrices]);

  // Cerrar con tecla Escape
  useEffect(() => {
    if (!isCartOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsCartOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isCartOpen, setIsCartOpen]);

  useBodyScrollLock(isCartOpen);

  const calculateTotal = () =>
    cartItems.reduce((total, item) => {
      const price = item.product.price || 0;
      return total + price * item.quantity;
    }, 0);

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
        }
      );

      if (error) throw error;
      rawMessage = serverMessage as string;
    } catch (err) {
      logger.error("Error generando mensaje seguro:", err);
      toast.error("Error al generar el pedido. Intenta nuevamente por favor.", {
        duration: 5000,
      });
      if (whatsappWindow) whatsappWindow.close();
      return;
    } finally {
      setIsGeneratingMessage(false);
    }

    if (!rawMessage) {
      toast.error(
        "Error al generar el mensaje. Tu carrito podría estar vacío o tener productos inválidos."
      );
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
        toast.error(
          "El pedido es muy extenso para WhatsApp, enviando resumen...",
          { duration: 5000 }
        );
      }
    } catch (err) {
      logger.error("Error de configuración de WhatsApp:", err);
      toast.error("Error de configuración: Número de vendedor inválido.");
      if (whatsappWindow) whatsappWindow.close();
      return;
    }

    setOrderSent(true);
    setShowConfirm(false);

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
        toast(`Abre WhatsApp manualmente al ${rawPhoneNumber}`, {
          icon: "📱",
        });
      }
    }, 100);
  };

  const handleFinishAndClear = () => {
    clearCart();
    setOrderSent(false);
    setIsCartOpen(false);
  };

  const closeDrawer = () => {
    setShowConfirm(false);
    setOrderSent(false);
    setIsCartOpen(false);
  };

  return (
    <>
      {/* Backdrop */}
      <button
        type="button"
        className={`fixed inset-0 z-50 w-full cursor-default bg-slate-900/40 backdrop-blur-sm transition-opacity ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={closeDrawer}
        aria-label="Cerrar carrito"
        tabIndex={isCartOpen ? 0 : -1}
      />

      {/* Drawer */}
      <div
        data-testid="cart-drawer"
        className={`fixed top-0 right-0 z-50 flex h-[100dvh] w-full max-w-[28rem] flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <FocusLock
          returnFocus
          disabled={!isCartOpen}
          className="flex h-[100dvh] w-full flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 p-[var(--space-lg)]">
            <h2 className="flex items-center gap-[var(--space-xs)] font-bold text-[var(--text-xl)] text-slate-900">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "var(--icon-lg)" }}
              >
                shopping_cart
              </span>
              Tu Carrito
            </h2>
            <button
              data-testid="close-cart"
              onClick={closeDrawer}
              className="rounded-full p-[var(--space-xs)] text-gray-400 transition-colors hover:bg-gray-50 hover:text-slate-900"
              aria-label="Cerrar carrito"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="relative flex-1 overflow-y-auto p-[var(--space-lg)]">
            {/* Order Sent View */}
            {orderSent ? (
              <div className="animate-in fade-in zoom-in-95 flex h-full flex-col items-center justify-center text-center duration-300">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "32px" }}
                  >
                    check_circle
                  </span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  ¡Pedido generado!
                </h3>
                <p className="mb-8 max-w-[250px] text-slate-600">
                  Te hemos redirigido a WhatsApp. ¿Pudiste enviar el mensaje
                  correctamente?
                </p>

                <button
                  onClick={handleFinishAndClear}
                  className="mb-3 w-full rounded-xl bg-slate-900 py-3 font-bold text-white transition-colors hover:bg-slate-800"
                >
                  Sí, ya hice mi pedido (Limpiar carrito)
                </button>
                <button
                  onClick={() => setOrderSent(false)}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 font-bold text-slate-600 transition-colors hover:bg-slate-50"
                >
                  No, volver al carrito
                </button>
              </div>
            ) : showConfirm ? (
              /* Confirm View */
              <div className="animate-in fade-in slide-in-from-right-4 flex h-full flex-col duration-200">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="mb-6 flex w-max items-center gap-1 font-medium text-slate-500 transition-colors hover:text-slate-800"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    arrow_back
                  </span>
                  Atrás
                </button>

                <h3 className="mb-4 text-xl font-bold text-slate-900">
                  Confirmar Pedido
                </h3>
                <div className="mb-6 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
                  <p className="border-primary mb-4 border-l-2 pl-3 text-sm leading-relaxed whitespace-pre-wrap text-slate-600">
                    Serás redirigido a WhatsApp para enviar este mensaje
                    preconfigurado.
                  </p>

                  <div className="mb-4 space-y-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm"
                      >
                        <span className="line-clamp-1 pr-2 text-slate-700">
                          {item.quantity}x {item.product.name}
                        </span>
                        <span className="shrink-0 font-medium text-slate-900">
                          {formatPrice(item.product.price)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between border-t border-slate-200 pt-3 font-bold">
                    <span className="text-slate-900">Total Estimado</span>
                    <span className="text-primary">
                      {formatPrice(calculateTotal())}
                    </span>
                  </div>
                </div>

                <div className="mt-auto space-y-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    disabled={isGeneratingMessage || cartItems.length === 0}
                    className="flex w-full items-center justify-center gap-[var(--space-xs)] rounded-xl bg-[var(--color-whatsapp)] py-[var(--space-md)] font-bold text-white shadow-[var(--color-whatsapp)]/20 shadow-md transition-colors hover:bg-[var(--color-whatsapp-hover)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "var(--icon-md)" }}
                    >
                      {isGeneratingMessage ? "hourglass_top" : "chat"}
                    </span>
                    {isGeneratingMessage
                      ? "Verificando..."
                      : "Confirmar e Ir a WhatsApp"}
                  </button>
                  <button
                    onClick={() => setShowConfirm(false)}
                    className="w-full rounded-xl py-2 font-bold text-slate-600 transition-colors hover:text-slate-900"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            ) : cartItems.length === 0 ? (
              /* Empty Cart View */
              <div className="flex h-full flex-col items-center justify-center text-center text-gray-500">
                <span
                  className="material-symbols-outlined mb-[var(--space-md)] text-gray-200"
                  style={{ fontSize: "var(--icon-hero)" }}
                >
                  remove_shopping_cart
                </span>
                <p className="mb-[var(--space-lg)]">Tu carrito está vacío.</p>
                <button
                  onClick={closeDrawer}
                  className="rounded-full border border-slate-100 bg-white px-8 py-3 font-bold text-slate-900 shadow-sm transition-colors hover:bg-slate-50"
                >
                  Volver a la tienda
                </button>
              </div>
            ) : (
              /* Cart Items View */
              <div className="flex flex-col gap-[var(--space-lg)]">
                {cartItems.map((item) => {
                  if (!item || !item.product) return null;
                  return (
                    <div
                      data-testid="cart-item"
                      key={item.id}
                      className="flex gap-[var(--space-md)] rounded-2xl border border-gray-100 bg-gray-50 p-[var(--space-md)]"
                    >
                      <Link
                        href={
                          item.product.slug
                            ? `/catalogo/${item.product.slug}`
                            : "#"
                        }
                        onClick={closeDrawer}
                        className={`aspect-[5/6] w-[clamp(3.5rem,12vw,5rem)] shrink-0 overflow-hidden rounded-xl bg-white ${
                          !item.product.slug && "pointer-events-none opacity-80"
                        }`}
                      >
                        <img
                          loading="lazy"
                          src={
                            item.product.image_path ||
                            item.product.images?.[0] ||
                            "https://placehold.co/200x240?text=Sin+Imagen"
                          }
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <h3 className="line-clamp-1 font-bold text-slate-900">
                              {item.product.name}
                            </h3>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Eliminar producto"
                              className="text-gray-400 transition-colors hover:text-red-500"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "var(--icon-sm)" }}
                              >
                                delete
                              </span>
                            </button>
                          </div>
                          <p className="text-primary mt-1 font-bold text-[var(--text-sm)]">
                            {formatPrice(item.product.price)}
                          </p>
                          {(item.color || item.note) && (
                            <div className="mt-[var(--space-xs)] space-y-[0.25rem] text-[var(--text-xs)] text-gray-500">
                              {item.color && <p>Color: {item.color}</p>}
                              {item.note && (
                                <p className="line-clamp-1 italic">
                                  Nota: &ldquo;{item.note}&rdquo;
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="mt-[var(--space-sm)] flex items-center gap-[var(--space-sm)]">
                          <div className="flex w-max items-center rounded-lg border border-gray-200 bg-white shadow-md">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              aria-label="Disminuir cantidad"
                              disabled={item.quantity <= 1}
                              className="hover:text-primary flex aspect-square w-[clamp(1.5rem,4vw,2rem)] items-center justify-center text-gray-500 transition-colors disabled:opacity-50"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "var(--icon-sm)" }}
                              >
                                remove
                              </span>
                            </button>
                            <span className="w-[clamp(1.5rem,4vw,2rem)] text-center font-bold text-[var(--text-sm)] text-slate-900">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              aria-label="Aumentar cantidad"
                              className="hover:text-primary flex aspect-square w-[clamp(1.5rem,4vw,2rem)] items-center justify-center text-gray-500 transition-colors"
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "var(--icon-sm)" }}
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

          {/* Footer */}
          {cartItems.length > 0 && !showConfirm && !orderSent && (
            <div className="mt-auto border-t border-gray-100 bg-gray-50 p-[var(--space-lg)]">
              <div className="mb-[var(--space-md)] flex items-start gap-2 rounded-lg border border-orange-100 bg-orange-50 p-3 text-xs text-orange-800">
                <span className="material-symbols-outlined mt-0.5 shrink-0 text-[16px]">
                  schedule
                </span>
                <p>
                  Tus productos están reservados en este dispositivo por{" "}
                  <strong>7 días</strong>.
                </p>
              </div>

              {arePricesStale && (
                <div className="animate-in fade-in zoom-in-95 mb-[var(--space-md)] flex flex-col gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800 duration-300">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined mt-0.5 shrink-0 text-[16px]">
                      error
                    </span>
                    <p>
                      <strong>Atención:</strong> No pudimos verificar los
                      precios actualizados con el servidor.
                    </p>
                  </div>
                  <button
                    onClick={() => refreshCartPrices()}
                    className="mt-1 flex items-center gap-1 self-start rounded bg-red-100 px-3 py-1.5 font-bold text-red-900 transition-colors hover:bg-red-200"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      refresh
                    </span>
                    Reintentar conexión
                  </button>
                </div>
              )}

              <div className="mb-[var(--space-md)] flex items-end justify-between">
                <span className="font-medium text-slate-500">
                  Total a pagar:
                </span>
                <span className="font-black text-[var(--text-2xl)] text-slate-900">
                  {formatPrice(calculateTotal())}
                </span>
              </div>
              <button
                data-testid="checkout-button"
                onClick={() => setShowConfirm(true)}
                disabled={isRefreshingPrices || arePricesStale}
                className={`flex w-full items-center justify-center gap-[var(--space-xs)] rounded-xl bg-[var(--color-whatsapp)] py-[var(--space-md)] font-bold text-white shadow-[var(--color-whatsapp)]/20 shadow-md transition-colors hover:bg-[var(--color-whatsapp-hover)] ${
                  isRefreshingPrices || arePricesStale
                    ? "cursor-not-allowed opacity-50"
                    : ""
                }`}
              >
                {isRefreshingPrices
                  ? "Actualizando precios..."
                  : arePricesStale
                    ? "Conexión inestable"
                    : "Pedir por WhatsApp"}
                {!isRefreshingPrices && !arePricesStale && (
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "var(--icon-md)" }}
                  >
                    chat
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
