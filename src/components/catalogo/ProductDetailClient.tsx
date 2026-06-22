"use client";

/**
 * ProductDetailClient — Confecciones Liss
 * Vista de detalle usando DbProduct (schema de Supabase).
 * Compatible con el catálogo dinámico.
 *
 * Features:
 * - 3 botones: Agregar al carrito, Compartir, Cotizar por WhatsApp
 * - Selector de envío siempre visible con animación de cálculo
 * - Warning de términos de oferta cuando aplica
 * - Modal informativo para usuarios no logueados
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogProductCard } from "./CatalogProductCard";
import { ProductReviews } from "./ProductReviews";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { logger } from "@/lib/logger";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import type { CategoryConfig } from "@/data/types";
import {
  getProductMainImage,
  isProductOnSale,
  getProductSector,
  type DbProduct,
} from "@/lib/catalogService";
import type { DbReview } from "@/lib/reviewsService";
import { buildQuoteUrl } from "@/lib/whatsapp";

interface ProductDetailClientProps {
  product: DbProduct;
  config: CategoryConfig;
  relatedProducts: DbProduct[];
  /** Reseñas iniciales cargadas en el servidor (SSR) */
  initialReviews: DbReview[];
  /** Promedio de calificaciones (0 si no hay reseñas) */
  averageRating: number;
  /** Total de reseñas */
  totalCount: number;
}

export function ProductDetailClient({
  product,
  config,
  relatedProducts,
  initialReviews,
  averageRating,
  totalCount,
}: ProductDetailClientProps) {
  const allImages: string[] = [
    ...(product.images && product.images.length > 0
      ? product.images
      : product.image_path
        ? [product.image_path]
        : []),
  ].filter(Boolean);

  const mainImageFallback = getProductMainImage(product);
  const [mainImg, setMainImg] = useState<string>(
    allImages[0] ?? mainImageFallback ?? ""
  );
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [customNote, setCustomNote] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  // Shipping state removed — la calculadora de envío fue eliminada (ver correcciones.txt)

  const onSale = isProductOnSale(product);
  const sector = getProductSector(product);
  const slug = product.slug ?? product.id;
  // oldPrice global eliminado — se usa displayOldPrice calculado desde offer_by_size
  const offerTerms = (product as { offer_terms?: string | null }).offer_terms;
  const offerEndsAt = (product as { offer_ends_at?: string | null })
    .offer_ends_at
    ? new Date(
        (product as { offer_ends_at?: string | null }).offer_ends_at as string
      )
    : null;
  const offerStartsAt = (product as { offer_starts_at?: string | null })
    .offer_starts_at
    ? new Date(
        (product as { offer_starts_at?: string | null })
          .offer_starts_at as string
      )
    : null;
  const now = new Date();
  const isOfferScheduled = !!(offerStartsAt && offerStartsAt > now);

  // Precio por talla
  const priceBySize: Record<string, number> | null =
    (product as { price_by_size?: Record<string, number> | null })
      .price_by_size ?? null;

  // Oferta por talla
  const offerBySize: Record<string, number> | null =
    (product as { offer_by_size?: Record<string, number> | null })
      .offer_by_size ?? null;

  // Precio a mostrar: depende de la talla seleccionada
  const isALaMedida = selectedSize === "A la medida";
  const selectedSizeBasePrice =
    selectedSize && priceBySize ? (priceBySize[selectedSize] ?? null) : null;

  // Precio de oferta de la talla seleccionada:
  // lee offer_by_size directamente y solo lo aplica si es MENOR al precio base (no depende de onSale)
  const selectedSizeOfferPrice: number | null = (() => {
    if (!selectedSize || !offerBySize) return null;
    const offerP = offerBySize[selectedSize] ?? null;
    if (offerP === null) return null;
    const baseP = selectedSizeBasePrice;
    // Solo es oferta válida si el precio de oferta es menor al base
    return baseP !== null && offerP < baseP ? offerP : null;
  })();

  // Precio de oferta global mínimo válido (para el "Desde" cuando no hay talla seleccionada)
  // Solo cuenta pares donde offer_by_size[talla] < price_by_size[talla]
  const globalMinOfferPrice: number | null = (() => {
    if (!offerBySize || !priceBySize) return null;
    const validOffers = Object.entries(offerBySize)
      .filter(([talla, offerP]) => {
        const baseP = priceBySize[talla];
        return baseP !== undefined && offerP < baseP;
      })
      .map(([, offerP]) => offerP);
    return validOffers.length > 0 ? Math.min(...validOffers) : null;
  })();

  // Precio mínimo base (para el "Desde" cuando no hay talla seleccionada)
  const globalMinBasePrice =
    priceBySize && Object.keys(priceBySize).length > 0
      ? Math.min(...Object.values(priceBySize))
      : Number(product.price);

  // Precio efectivo: precio de oferta si existe y es válido, si no precio base
  const effectivePrice =
    selectedSizeOfferPrice !== null
      ? selectedSizeOfferPrice
      : selectedSizeBasePrice !== null
        ? selectedSizeBasePrice
        : Number(product.price);

  // Precio para el carrito
  const cartPrice = effectivePrice;

  // Precio anterior a mostrar tachado:
  // - Si hay oferta válida por talla seleccionada: mostrar el precio base de esa talla
  // - Si hay old_price global (legacy) mayor al efectivo: mostrarlo
  // GUARDIA: nunca mostrar tachado si es <= al precio efectivo
  const rawDisplayOldPrice: number | null =
    selectedSizeOfferPrice !== null && selectedSizeBasePrice !== null
      ? selectedSizeBasePrice
      : product.old_price
        ? Number(product.old_price)
        : null;
  const displayOldPrice: number | null =
    rawDisplayOldPrice !== null && rawDisplayOldPrice > effectivePrice
      ? rawDisplayOldPrice
      : null;

  // Contexts
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const isFavorited = isFavorite(product.id);

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  // Parse tallas y colores desde los campos de DB
  const tallas: string[] = Array.isArray(product.tallas) ? product.tallas : [];
  const colores: { name: string; hex: string }[] = Array.isArray(
    product.colores
  )
    ? product.colores
    : [];
  const caracteristicas: string[] = Array.isArray(product.caracteristicas)
    ? product.caracteristicas
    : [];

  const placeholderCount = Math.max(0, 4 - allImages.length);

  // ── Carrito ───────────────────────────────────────────────────
  function handleAddToCart() {
    if (tallas.length > 0 && !selectedSize) {
      toast.error(
        "Por favor selecciona una talla antes de agregar al carrito.",
        { id: "no-size-toast", duration: 3000 }
      );
      return;
    }

    const sizePart = selectedSize ? `Talla: ${selectedSize}` : "";
    const notePart = customNote ? `Nota: ${customNote}` : "";

    // Productos "A la medida": sin precio fijo — se cotiza por WhatsApp.
    // Se usa price=0 para que no sume al subtotal del carrito.
    // La nota predefinida aclara al vendedor que debe cotizar.
    const aLaMedida = selectedSize === "A la medida";
    const quotePart = aLaMedida
      ? "⚠️ Sin precio fijo — requiere cotización por WhatsApp"
      : "";
    const noteText = [quotePart, sizePart, notePart]
      .filter(Boolean)
      .join(" · ");

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: aLaMedida ? 0 : cartPrice,
        old_price: aLaMedida ? null : displayOldPrice,
        image_path: getProductMainImage(product),
        slug: `${sector}/${slug}`,
      },
      1,
      null,
      noteText
    );
    setIsCartOpen(true);
  }

  // ── Pedir ahora ──────────────────────────────────────────────
  function handlePedirAhora() {
    handleAddToCart();
    handleCotizar();
  }

  // ── Compartir ─────────────────────────────────────────────────
  const handleCopy = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
        return;
      } catch (err) {
        logger.error("Failed to copy link via clipboard API:", err);
      }
    }
    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      }
    } catch (fallbackErr) {
      logger.error("Fallback copy failed:", fallbackErr);
    }
  };

  // ── Cotizar por WhatsApp ──────────────────────────────────────
  function handleCotizar() {
    const productUrl =
      typeof window !== "undefined" ? window.location.href : "";
    const categoryName =
      typeof product.category === "string" ? product.category : null;

    const url = buildQuoteUrl({
      productName: product.name ?? "Producto",
      sector,
      category: categoryName,
      selectedSize,
      customNote,
      department: null,
      municipality: null,
      deliveryType: null,
      productUrl,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-screen-2xl flex-1 flex-col px-5 py-[var(--space-lg)] md:px-8">
      {/* Main product grid */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[45%_1fr] lg:gap-12">
        {/* Left column: Sticky image gallery */}
        <div
          className="animate-fade-in-up isolate flex w-full min-w-0 flex-col-reverse items-start gap-5 md:grid md:grid-cols-[calc(20%-12.16px)_calc(80%-19.84px)] md:gap-8 lg:sticky lg:top-24 lg:grid-cols-[calc(20%-17.16px)_1px_calc(80%-39.84px)] lg:gap-7"
          style={{ animationDelay: "100ms" }}
        >
          {/* Thumbnail strip */}
          <div className="no-scrollbar flex w-full min-w-0 shrink-0 flex-row gap-4 overflow-x-auto pb-2 md:w-full md:flex-col md:gap-3 md:pb-0">
            {allImages.map((img, i) => (
              <button
                key={`img-${i}`}
                type="button"
                onClick={() => setMainImg(img)}
                className="aspect-[4/5] w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl bg-white transition-all duration-300 active:scale-[0.96] md:w-full"
                style={
                  mainImg === img
                    ? { border: "2px solid #143067", opacity: 1 }
                    : { border: "2px dashed #cbd5e1", opacity: 0.7 }
                }
              >
                <Image
                  src={img}
                  alt={`${product.name} miniatura ${i + 1}`}
                  width={96}
                  height={120}
                  className="h-full w-full object-cover object-center"
                  unoptimized={
                    img.startsWith("http") && !img.includes("supabase.co")
                  }
                />
              </button>
            ))}

            {Array.from({ length: placeholderCount }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="aspect-[4/5] w-20 shrink-0 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 md:w-full"
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Vertical divider (desktop only) */}
          <div className="hidden h-full w-px bg-slate-100 lg:block" />

          {/* Main image */}
          <div className="relative aspect-[4/5] w-full self-start overflow-hidden rounded-2xl bg-white">
            <button
              type="button"
              className="relative block h-full w-full cursor-zoom-in"
              onClick={() => setIsImageModalOpen(true)}
              aria-label="Ver imagen ampliada"
            >
              {mainImg ? (
                <Image
                  src={mainImg}
                  alt={product.name ?? "Producto"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 55vw, 45vw"
                  className="object-cover object-center"
                  priority
                  quality={90}
                  unoptimized={
                    mainImg.startsWith("http") &&
                    !mainImg.includes("supabase.co")
                  }
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100 text-slate-300">
                  <span className="material-symbols-outlined text-6xl">
                    image
                  </span>
                </div>
              )}
            </button>

            {/* Sale badge */}
            {onSale && (
              <span className="absolute top-3 left-3 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                OFERTA
              </span>
            )}

            {/* Favorite button */}
            <button
              type="button"
              onClick={handleToggleFavorite}
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition hover:scale-110 active:scale-95"
              aria-label={
                isFavorited ? "Quitar de favoritos" : "Agregar a favoritos"
              }
            >
              <span
                className="material-symbols-outlined text-[22px] text-red-500"
                style={{
                  fontVariationSettings: isFavorited ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* ── RIGHT COLUMN ─────────────────────────────────────────────
            Orden definitivo:
            1. Breadcrumb
            2. Tags
            3. Título + Desc. Corta
            4. Descripción larga
            5. Características
            6. Colores
            7. Tallas
            8. BuyBox (Precio → Oferta → Personalizar → CTAs)
        ─────────────────────────────────────────────────────────────── */}
        <div
          className="animate-fade-in-up flex flex-col gap-6"
          style={{ animationDelay: "200ms" }}
        >
          {/* 1 ── Breadcrumb + Compartir */}
          <div className="flex items-center justify-between">
            <Breadcrumb
              items={[
                { label: "Inicio", href: "/" },
                { label: "Catálogo", href: "/catalogo" },
                {
                  label: config.subtitle,
                  href: `/catalogo/${sector}`,
                },
              ]}
            />
            <button
              type="button"
              onClick={handleCopy}
              className="text-primary shrink-0 cursor-pointer transition-transform hover:scale-110 active:scale-95"
              title="Compartir"
              aria-label="Compartir este producto"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "22px" }}
              >
                share
              </span>
            </button>
          </div>

          {/* 3 ── Título */}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
              {product.name}
            </h1>
          </div>

          {/* 4 ── Descripción larga */}
          {product.description && (
            <p className="text-sm leading-relaxed text-slate-600">
              {product.description}
            </p>
          )}

          {/* 4b ── Descripción corta — MAYUSC + negrita, mismo tamaño/fuente */}
          {product.short_description && (
            <p className="text-sm font-bold tracking-wide text-slate-700 uppercase">
              {product.short_description}
            </p>
          )}

          {/* 5 ── Características */}
          {caracteristicas.length > 0 && (
            <ul className="flex flex-col gap-1.5">
              {caracteristicas.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-slate-600"
                >
                  <span
                    className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                    style={{ fontSize: "1rem" }}
                    aria-hidden="true"
                  >
                    check_circle
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* 6 ── Colores */}
          {colores.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                {product.colores_label ?? "Colores disponibles"}
              </p>
              <div className="flex flex-wrap gap-2">
                {colores.map((color) => (
                  <div
                    key={color.hex}
                    className="group flex items-center gap-1.5"
                    title={color.name}
                  >
                    <span
                      className="h-6 w-6 rounded-full border border-slate-200 shadow-sm"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-xs text-slate-500">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6b ── Material */}
          {product.material && (
            <div>
              <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Material:{" "}
                <span className="font-medium text-slate-700 normal-case">
                  {product.material}
                </span>
              </p>
            </div>
          )}

          {/* 7 ── Tallas */}
          {tallas.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Talla
                {selectedSize ? (
                  <span className="text-primary ml-2 font-bold normal-case">
                    seleccionada: {selectedSize}
                  </span>
                ) : (
                  <span className="ml-2 font-normal text-slate-400 normal-case">
                    Selecciona una talla para ver el precio correspondiente
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {tallas.map((talla) => (
                  <button
                    key={talla}
                    type="button"
                    onClick={() =>
                      setSelectedSize((prev) => (prev === talla ? null : talla))
                    }
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-all active:scale-95 ${
                      selectedSize === talla
                        ? "bg-primary border-primary text-white shadow-sm"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    }`}
                    aria-pressed={selectedSize === talla}
                  >
                    {talla}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 8 ── BuyBox */}
          <div
            className="animate-fade-in-up flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-md"
            style={{ animationDelay: "250ms" }}
          >
            {/* Precio */}
            <div className="flex flex-col gap-1">
              {isALaMedida ? (
                <li className="flex items-start gap-2 text-sm text-slate-600">
                  <span
                    className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                    style={{ fontSize: "1rem" }}
                    aria-hidden="true"
                  >
                    chat
                  </span>
                  <span>
                    Los precios por servicio a la medida se cotizan por
                    WhatsApp. Pero tranquil@ 🥰 los uniformes confeccionados a
                    la medida tienen el mismo precio que las tallas estándar y
                    se cobran según la equivalencia de tus medidas; por ejemplo,
                    si estas corresponden a una talla M, se aplicará el precio
                    de la talla M.
                  </span>
                </li>
              ) : (
                <div className="flex items-end gap-3">
                  {selectedSizeBasePrice !== null ? (
                    <p className="text-primary text-3xl leading-none font-extrabold tracking-tight">
                      ${effectivePrice.toFixed(2)}
                    </p>
                  ) : tallas.length > 0 && !selectedSize ? (
                    <p className="text-primary text-3xl leading-none font-extrabold tracking-tight">
                      Desde $
                      {(globalMinOfferPrice ?? globalMinBasePrice).toFixed(2)}
                    </p>
                  ) : (
                    <p className="text-primary text-3xl leading-none font-extrabold tracking-tight">
                      ${Number(product.price).toFixed(2)}
                    </p>
                  )}
                  {!selectedSize && globalMinOfferPrice !== null ? (
                    <p className="mb-0.5 text-base text-slate-400 line-through">
                      ${globalMinBasePrice.toFixed(2)}
                    </p>
                  ) : displayOldPrice ? (
                    <p className="mb-0.5 text-base text-slate-400 line-through">
                      ${displayOldPrice.toFixed(2)}
                    </p>
                  ) : null}
                  {onSale && displayOldPrice && displayOldPrice > cartPrice && (
                    <span className="mb-0.5 rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                      {Math.round(
                        ((displayOldPrice - cartPrice) / displayOldPrice) * 100
                      )}
                      % OFF
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Oferta — lista estilo características con icono azul de marca.
                No se muestra si la talla seleccionada es "A la medida":
                sin precio fijo → sin oferta → sin términos de oferta. */}
            {!isALaMedida &&
              ((onSale && offerEndsAt && !isOfferScheduled) ||
                isOfferScheduled ||
                offerTerms) && (
                <ul className="flex flex-col gap-1.5">
                  {/* Vigencia activa */}
                  {onSale && offerEndsAt && !isOfferScheduled && (
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span
                        className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                        style={{ fontSize: "1rem" }}
                        aria-hidden="true"
                      >
                        timer
                      </span>
                      <span>
                        Oferta válida hasta el{" "}
                        <strong className="text-slate-800">
                          {offerEndsAt.toLocaleDateString("es-SV", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </strong>
                      </span>
                    </li>
                  )}

                  {/* Oferta programada */}
                  {isOfferScheduled && offerStartsAt && (
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span
                        className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                        style={{ fontSize: "1rem" }}
                        aria-hidden="true"
                      >
                        schedule
                      </span>
                      <span>
                        Disponible desde el{" "}
                        <strong className="text-slate-800">
                          {offerStartsAt.toLocaleDateString("es-SV", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </strong>
                      </span>
                    </li>
                  )}

                  {/* Condiciones */}
                  {offerTerms && (
                    <li className="flex items-start gap-2 text-sm text-slate-600">
                      <span
                        className="material-symbols-outlined text-primary mt-0.5 shrink-0"
                        style={{ fontSize: "1rem" }}
                        aria-hidden="true"
                      >
                        info
                      </span>
                      <span>{offerTerms}</span>
                    </li>
                  )}
                </ul>
              )}

            {/* Personalización — siempre visible */}
            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span className="material-symbols-outlined text-[1.125rem]">
                  edit_note
                </span>
                <span>¿Necesitas personalizar tu pedido?</span>
              </div>
              <textarea
                id="custom-note"
                className="focus:border-primary focus:ring-primary w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:ring-1"
                placeholder="Ej. Talla exacta, color preferido, bordado personalizado, nombre a bordar... (Máx. 500 caracteres)"
                rows={2}
                maxLength={500}
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
              />
            </div>

            {/* CTAs — Agregar | Pedir ahora */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-md transition hover:shadow-lg active:scale-[0.97]"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Agregar
              </button>

              <button
                type="button"
                onClick={handlePedirAhora}
                className="border-primary text-primary hover:bg-primary/5 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 bg-white py-3.5 font-bold transition active:scale-[0.97]"
                title="Pedir ahora por WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 shrink-0"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Pedir ahora
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section
          className="animate-fade-in-up mt-16"
          style={{ animationDelay: "300ms" }}
        >
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              También Te Puede Gustar
            </h2>
            <Link
              href={`/catalogo/${sector}`}
              className="text-primary text-sm font-bold hover:underline"
            >
              Ver Todo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {relatedProducts.map((p, index) => (
              <div
                key={p.id}
                className="animate-fade-in-up h-full w-full"
                style={{ animationDelay: `${index * 40 + 350}ms` }}
              >
                <CatalogProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Reviews section — debajo de "También te puede gustar" */}
      <ProductReviews
        productId={product.id}
        initialReviews={initialReviews}
        averageRating={averageRating}
        totalCount={totalCount}
      />

      {/* Copy toast */}
      {showToast && (
        <div className="animate-fade-in-up fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl">
          ✓ Enlace copiado al portapapeles
        </div>
      )}

      {/* Lightbox modal */}
      {isImageModalOpen && mainImg && (
        <div className="animate-in fade-in fixed inset-0 z-[100] flex items-center justify-center duration-200">
          <button
            type="button"
            className="absolute inset-0 w-full cursor-default bg-black/90 backdrop-blur-sm"
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Cerrar vista de imagen"
          />
          <button
            type="button"
            onClick={() => setIsImageModalOpen(false)}
            className="absolute top-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/20 text-white/60 transition-all hover:bg-black/40 hover:text-white sm:top-6 sm:right-6"
            aria-label="Cerrar imagen"
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
          <div className="relative z-10 max-h-[90dvh] max-w-[90vw] overflow-hidden rounded-2xl">
            <Image
              src={mainImg}
              alt={product.name ?? "Producto"}
              width={900}
              height={1125}
              className="max-h-[90dvh] w-auto object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </div>
  );
}
