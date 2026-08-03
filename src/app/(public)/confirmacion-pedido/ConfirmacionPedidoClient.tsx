"use client";

import { useMemo, Suspense } from "react";
import { useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import Link from "next/link";
import { Icon } from "@/components/ui/icons/Icon";
import { siteConfig } from "@/config/site";
import { GoogleCustomerReviewsOptIn } from "@/components/analytics/GoogleCustomerReviewsOptIn";

function getDefaultEstimatedDeliveryDate(): string {
  const date = new Date();
  let addedDays = 0;
  while (addedDays < 4) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) {
      addedDays++;
    }
  }
  return date.toISOString().split("T")[0];
}

interface OrderData {
  orderId: string;
  email: string;
  estimatedDeliveryDate: string;
  deliveryCountry: string;
  gtin?: string;
}

function getOrderDataFromUrlOrSession(
  searchParams: ReadonlyURLSearchParams
): OrderData | null {
  const qOrderId = searchParams.get("order_id") || searchParams.get("orderId");
  const qEmail = searchParams.get("email");
  const qDeliveryDate =
    searchParams.get("estimated_delivery_date") ||
    searchParams.get("delivery_date") ||
    searchParams.get("date");
  const qCountry = searchParams.get("country") || "SV";
  const qGtin = searchParams.get("gtin") || undefined;

  let orderId = qOrderId || "";
  let email = qEmail || "";
  let deliveryDate = qDeliveryDate || "";

  if (typeof window !== "undefined" && (!orderId || !email)) {
    try {
      const cachedOrder = sessionStorage.getItem("liss_last_order");
      if (cachedOrder) {
        const parsed = JSON.parse(cachedOrder);
        if (parsed.orderId && !orderId) orderId = parsed.orderId;
        if (parsed.email && !email) email = parsed.email;
        if (parsed.estimatedDeliveryDate && !deliveryDate)
          deliveryDate = parsed.estimatedDeliveryDate;
      }
    } catch (err) {
      console.warn("Error al leer liss_last_order:", err);
    }
  }

  // Si no hay ID de orden ni email del cliente real, retornamos null (no mostrar orden ficticia)
  if (!orderId || !email) {
    return null;
  }

  if (!deliveryDate) {
    deliveryDate = getDefaultEstimatedDeliveryDate();
  }

  return {
    orderId,
    email,
    estimatedDeliveryDate: deliveryDate,
    deliveryCountry: qCountry,
    gtin: qGtin,
  };
}

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderData = useMemo(
    () => getOrderDataFromUrlOrSession(searchParams),
    [searchParams]
  );

  const productsOptIn = useMemo(() => {
    return orderData?.gtin ? [{ gtin: orderData.gtin }] : undefined;
  }, [orderData]);

  // Si no hay una orden válida con email y order_id, se muestra un estado limpio y seguro
  if (!orderData) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[var(--color-surface)] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-[var(--color-surface-container-high)] text-[var(--color-primary)] shadow-sm ring-1 ring-[var(--color-outline-variant)]/20">
            <Icon name="receipt_long" className="h-10 w-10" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[var(--color-on-surface)] sm:text-3xl">
            Confirmación de Pedido
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-on-surface-variant)]">
            No se encontró un pedido activo reciente. Si acabas de realizar una
            compra o consulta en nuestro taller, revisa tu enlace de seguimiento
            o explora nuestro catálogo.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[var(--color-primary-dark)] sm:w-auto"
            >
              <Icon name="store" />
              Explorar Catálogo
            </Link>
            <a
              href={siteConfig.links.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-bold text-emerald-600 transition-all duration-200 hover:bg-emerald-500/20 sm:w-auto dark:text-emerald-400"
            >
              <Icon name="chat" />
              Contactar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)] px-4 py-12 sm:px-6 lg:px-8">
      {/* Módulo Opt-In oficial de Reseñas de Clientes en Google */}
      <GoogleCustomerReviewsOptIn
        merchantId={5773588467}
        orderId={orderData.orderId}
        email={orderData.email}
        deliveryCountry={orderData.deliveryCountry}
        estimatedDeliveryDate={orderData.estimatedDeliveryDate}
        products={productsOptIn}
      />

      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-3xl border border-[var(--color-outline-variant)]/30 bg-[var(--color-surface-elevated)] shadow-2xl transition-all duration-300">
          <div className="bg-gradient-to-r from-[#1B365D] via-[#2A4D7C] to-[#1B365D] p-8 text-center text-white sm:p-12">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 backdrop-blur-md">
              <Icon
                name="check_circle"
                className="h-12 w-12 text-emerald-400"
              />
            </div>
            <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wider text-emerald-300 uppercase backdrop-blur-md">
              ¡Pedido Confirmado!
            </span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              ¡Gracias por tu preferencia!
            </h1>
            <p className="mt-2 text-sm text-slate-200 sm:text-base">
              Tu orden ha sido registrada con éxito en el sistema de
              Confecciones Liss.
            </p>
          </div>

          <div className="space-y-8 p-6 sm:p-10">
            {/* Detalles del pedido */}
            <div className="rounded-2xl border border-[var(--color-outline-variant)]/20 bg-[var(--color-surface)] p-6 shadow-sm">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-[var(--color-on-surface)]">
                <Icon name="receipt" className="text-[var(--color-primary)]" />
                Resumen de la Confirmación
              </h2>

              <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                <div className="rounded-xl border border-[var(--color-outline-variant)]/10 bg-[var(--color-surface-elevated)] p-4">
                  <span className="mb-1 block text-xs tracking-wider text-[var(--color-on-surface-variant)] uppercase">
                    Número de Orden
                  </span>
                  <span className="font-mono text-base font-bold text-[var(--color-primary)]">
                    {orderData.orderId}
                  </span>
                </div>

                <div className="rounded-xl border border-[var(--color-outline-variant)]/10 bg-[var(--color-surface-elevated)] p-4">
                  <span className="mb-1 block text-xs tracking-wider text-[var(--color-on-surface-variant)] uppercase">
                    Correo Asociado
                  </span>
                  <span className="block truncate font-semibold text-[var(--color-on-surface)]">
                    {orderData.email}
                  </span>
                </div>

                <div className="rounded-xl border border-[var(--color-outline-variant)]/10 bg-[var(--color-surface-elevated)] p-4">
                  <span className="mb-1 block text-xs tracking-wider text-[var(--color-on-surface-variant)] uppercase">
                    Fecha Estimada de Entrega
                  </span>
                  <span className="font-semibold text-[var(--color-on-surface)]">
                    {orderData.estimatedDeliveryDate}
                  </span>
                </div>

                <div className="rounded-xl border border-[var(--color-outline-variant)]/10 bg-[var(--color-surface-elevated)] p-4">
                  <span className="mb-1 block text-xs tracking-wider text-[var(--color-on-surface-variant)] uppercase">
                    País de Destino
                  </span>
                  <span className="font-semibold text-[var(--color-on-surface)]">
                    El Salvador ({orderData.deliveryCountry})
                  </span>
                </div>
              </div>
            </div>

            {/* Aviso sobre Reseñas de Clientes en Google */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-50/50 p-6 dark:bg-blue-950/20">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-full bg-blue-500/10 p-3 text-blue-600 dark:text-blue-400">
                  <Icon name="star" className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-900 dark:text-blue-200">
                    Encuesta de Reseñas de Clientes en Google
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-blue-800 dark:text-blue-300">
                    Google mostrará una invitación en pantalla para participar
                    en la encuesta oficial de satisfacción de nuestra empresa.
                    Tu opinión nos ayuda a mantener nuestra máxima calidad.
                  </p>
                </div>
              </div>
            </div>

            {/* Acciones */}
            <div className="flex flex-col items-center justify-between gap-4 border-t border-[var(--color-outline-variant)]/20 pt-6 sm:flex-row">
              <Link
                href="/catalogo"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-200 hover:bg-[var(--color-primary-dark)] sm:w-auto"
              >
                <Icon name="store" />
                Volver al Catálogo
              </Link>

              <a
                href={siteConfig.links.whatsappDirect}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-bold text-emerald-600 transition-all duration-200 hover:bg-emerald-500/20 sm:w-auto dark:text-emerald-400"
              >
                <Icon name="chat" />
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConfirmacionPedidoClient() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center p-8">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--color-primary)] border-t-transparent" />
            <p className="text-sm text-[var(--color-on-surface-variant)]">
              Cargando confirmación del pedido...
            </p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
