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

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogProductCard } from "./CatalogProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { logger } from "@/lib/logger";
import toast from "react-hot-toast";
import type { CategoryConfig } from "@/data/types";
import {
  getProductMainImage,
  isProductOnSale,
  getProductSector,
  type DbProduct,
} from "@/lib/catalogService";
import {
  DEPARTMENTS,
  getShippingInfo,
  type DeliveryType,
  DELIVERY_TYPE_LABEL,
  DELIVERY_TYPES_BY_ZONE,
} from "@/lib/shipping";
import { buildQuoteUrl } from "@/lib/whatsapp";

interface ProductDetailClientProps {
  product: DbProduct;
  config: CategoryConfig;
  relatedProducts: DbProduct[];
}

export function ProductDetailClient({
  product,
  config,
  relatedProducts,
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

  // Shipping state
  const [selectedDept, setSelectedDept] = useState<string>("");
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");
  const [selectedDelivery, setSelectedDelivery] = useState<DeliveryType | null>(
    null
  );
  const [isCalculating, setIsCalculating] = useState(false);
  const [shippingResult, setShippingResult] = useState<{
    label: string;
    method: string;
    cost: number;
  } | null>(null);
  const calcTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Guest modal state
  const [showGuestModal, setShowGuestModal] = useState(false);

  const onSale = isProductOnSale(product);
  const sector = getProductSector(product);
  const slug = product.slug ?? product.id;
  const price = Number(product.price);
  const oldPrice = product.old_price ? Number(product.old_price) : null;
  const offerTerms = (product as { offer_terms?: string | null }).offer_terms;

  // Contexts
  const { isFavorite, toggleFavorite } = useFavorites();
  const { user, showAuthModal } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();
  const isFavorited = isFavorite(product.id);

  const handleToggleFavorite = () => {
    if (!user) {
      showAuthModal("favorites");
      return;
    }
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

  // Departamentos para el select
  const departmentOptions = DEPARTMENTS.map((d) => ({
    value: d.name,
    label: d.name,
  }));

  // Municipios del departamento seleccionado
  const municipalityOptions =
    DEPARTMENTS.find((d) => d.name === selectedDept)?.municipalities.map(
      (m) => ({ value: m, label: m })
    ) ?? [];

  // Zona del departamento seleccionado
  const selectedZone =
    DEPARTMENTS.find((d) => d.name === selectedDept)?.zone ?? null;

  // Opciones de entrega para la zona seleccionada
  const deliveryOptions = selectedZone
    ? DELIVERY_TYPES_BY_ZONE[selectedZone]
    : [];

  // ── Cálculo de envío con animación ───────────────────────────
  function triggerShippingCalculation(
    dept: string,
    municipality: string,
    delivery: DeliveryType
  ) {
    if (calcTimerRef.current) clearTimeout(calcTimerRef.current);
    setIsCalculating(true);
    setShippingResult(null);

    calcTimerRef.current = setTimeout(() => {
      const info = getShippingInfo(dept, municipality || dept);
      setShippingResult({
        label: info.label,
        method: info.method,
        cost: info.cost,
      });
      setIsCalculating(false);
    }, 1200);
  }

  useEffect(() => {
    return () => {
      if (calcTimerRef.current) clearTimeout(calcTimerRef.current);
    };
  }, []);

  function handleDeptChange(value: string) {
    setSelectedDept(value);
    setSelectedMunicipality("");
    setSelectedDelivery(null);
    setShippingResult(null);
    setIsCalculating(false);
  }

  function handleMunicipalityChange(value: string) {
    setSelectedMunicipality(value);
    if (selectedDelivery === "domicilio") {
      triggerShippingCalculation(selectedDept, value, "domicilio");
    }
  }

  function handleDeliveryChange(delivery: DeliveryType) {
    setSelectedDelivery(delivery);
    if (delivery === "taller" || delivery === "punto_medio") {
      triggerShippingCalculation(selectedDept, selectedMunicipality, delivery);
    } else if (delivery === "domicilio" && selectedDept) {
      triggerShippingCalculation(selectedDept, selectedMunicipality, delivery);
    }
  }

  // ── Carrito ───────────────────────────────────────────────────
  function handleAddToCart() {
    if (!user) {
      setShowGuestModal(true);
      return;
    }
    if (tallas.length > 0 && !selectedSize) {
      toast.error(
        "Por favor selecciona una talla antes de agregar al carrito.",
        { id: "no-size-toast", duration: 3000 }
      );
      return;
    }

    const sizePart = selectedSize ? `Talla: ${selectedSize}` : "";
    const notePart = customNote ? `Nota: ${customNote}` : "";
    const noteText = [sizePart, notePart].filter(Boolean).join(" · ");

    addToCart(
      {
        id: product.id,
        name: product.name,
        price: price,
        old_price: oldPrice,
        image_path: getProductMainImage(product),
        slug: `${sector}/${slug}`,
      },
      1,
      null,
      noteText
    );
    setIsCartOpen(true);
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
      department: selectedDept || null,
      municipality: selectedMunicipality || null,
      deliveryType: selectedDelivery,
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
              className="block h-full w-full cursor-zoom-in"
              onClick={() => setIsImageModalOpen(true)}
              aria-label="Ver imagen ampliada"
            >
              {mainImg ? (
                <Image
                  src={mainImg}
                  alt={product.name ?? "Producto"}
                  fill
                  className="object-cover object-center"
                  priority
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

        {/* Right column: Product info */}
        <div
          className="animate-fade-in-up flex flex-col gap-6"
          style={{ animationDelay: "200ms" }}
        >
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Catálogo", href: "/catalogo" },
              {
                label: config.title,
                href: `/catalogo/${sector}`,
              },
              { label: product.name ?? "Producto" },
            ]}
          />

          {/* Title + badge */}
          <div>
            {product.badge_text && (
              <span className="bg-primary/10 text-primary mb-2 inline-block rounded-full px-3 py-0.5 text-xs font-bold">
                {product.badge_text}
              </span>
            )}
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 md:text-3xl">
              {product.name}
            </h1>
            {product.short_description && (
              <p className="mt-1 text-sm text-slate-500">
                {product.short_description}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-sm prose-slate max-w-none">
            {product.description ? (
              <p className="text-sm leading-relaxed text-slate-600">
                {product.description}
              </p>
            ) : (
              <p className="text-sm text-slate-500 italic">
                Sin descripción detallada.
              </p>
            )}
          </div>

          {/* Available sizes */}
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
                    (elige una)
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

          {/* Available colors */}
          {colores.length > 0 && (
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                Colores disponibles
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

          {/* Characteristics */}
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

          {/* Buy Box */}
          <div
            className="animate-fade-in-up flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 shadow-sm"
            style={{ animationDelay: "250ms" }}
          >
            {/* Price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-3">
                <p className="text-2xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                  {product.price_suffix && (
                    <span className="ml-1 text-sm font-normal text-slate-500">
                      {product.price_suffix}
                    </span>
                  )}
                </p>
                {onSale && oldPrice && (
                  <p className="text-lg font-medium text-slate-400 line-through">
                    ${oldPrice.toFixed(2)}
                  </p>
                )}
              </div>
              {product.material && (
                <p className="text-xs text-slate-500">
                  Material:{" "}
                  <span className="font-medium">{product.material}</span>
                </p>
              )}
            </div>

            {/* Offer terms warning */}
            {offerTerms && (
              <details className="group rounded-xl border border-amber-200 bg-amber-50 p-3">
                <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-amber-700">
                  <span className="material-symbols-outlined text-[18px] text-amber-500">
                    warning
                  </span>
                  <span>Esta oferta tiene términos especiales</span>
                  <span className="material-symbols-outlined ml-auto text-[18px] transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="mt-2 text-xs leading-relaxed text-amber-700">
                  {offerTerms}
                </p>
              </details>
            )}

            {/* Personalization accordion */}
            <details className="group cursor-pointer">
              <summary className="hover:text-primary flex list-none items-center justify-between text-sm font-semibold text-slate-700 transition-colors">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[1.125rem]">
                    edit_note
                  </span>
                  <span>¿Necesitas personalizar tu pedido?</span>
                </div>
                <span className="material-symbols-outlined transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pt-3">
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
            </details>

            {/* Shipping calculator */}
            <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <p className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                <span className="material-symbols-outlined text-[16px]">
                  local_shipping
                </span>
                Calcular envío
              </p>

              {/* Department selector */}
              <div>
                <label
                  htmlFor="shipping-dept"
                  className="mb-1 block text-xs font-medium text-slate-600"
                >
                  Departamento
                </label>
                <select
                  id="shipping-dept"
                  value={selectedDept}
                  onChange={(e) => handleDeptChange(e.target.value)}
                  className="focus:border-primary w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-1 focus:ring-blue-100"
                >
                  <option value="">Selecciona tu departamento</option>
                  {departmentOptions.map((d) => (
                    <option key={d.value} value={d.value}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Municipality selector (only for non-LOCAL zones) */}
              {selectedDept && selectedZone !== "LOCAL" && (
                <div>
                  <label
                    htmlFor="shipping-municipality"
                    className="mb-1 block text-xs font-medium text-slate-600"
                  >
                    Municipio
                  </label>
                  <select
                    id="shipping-municipality"
                    value={selectedMunicipality}
                    onChange={(e) => handleMunicipalityChange(e.target.value)}
                    className="focus:border-primary w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:ring-1 focus:ring-blue-100"
                  >
                    <option value="">Selecciona tu municipio</option>
                    {municipalityOptions.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Delivery type options */}
              {selectedDept && deliveryOptions.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-medium text-slate-600">
                    Tipo de entrega
                  </p>
                  <div className="flex flex-col gap-2">
                    {deliveryOptions.map((dt) => (
                      <button
                        key={dt}
                        type="button"
                        onClick={() => handleDeliveryChange(dt)}
                        className={`flex items-center gap-3 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                          selectedDelivery === dt
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                        }`}
                      >
                        <span
                          className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                            selectedDelivery === dt
                              ? "border-primary bg-primary"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedDelivery === dt && (
                            <span className="h-1.5 w-1.5 rounded-full bg-white" />
                          )}
                        </span>
                        {DELIVERY_TYPE_LABEL[dt]}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Calculating animation */}
              {isCalculating && (
                <div className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
                  <svg
                    className="h-4 w-4 animate-spin text-slate-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  <span className="text-xs text-slate-500">
                    Calculando costo de envío...
                  </span>
                </div>
              )}

              {/* Shipping result */}
              {!isCalculating && shippingResult && (
                <div className="animate-fade-in-up rounded-lg border border-green-100 bg-green-50 px-3 py-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-green-800">
                      {shippingResult.method}
                    </span>
                    <span className="text-sm font-black text-green-700">
                      {shippingResult.cost === 0
                        ? "Gratis"
                        : `$${shippingResult.cost.toFixed(2)}`}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Actions — 3 buttons */}
            <div className="flex gap-3">
              {/* Add to cart */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-md transition hover:shadow-lg active:scale-[0.97]"
              >
                <span className="material-symbols-outlined">shopping_cart</span>
                Agregar
              </button>

              {/* Share */}
              <button
                type="button"
                onClick={handleCopy}
                className="flex w-12 shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-200 active:scale-[0.95] dark:bg-transparent dark:text-slate-300 dark:hover:bg-white/10"
                title="Compartir"
                aria-label="Compartir este producto"
              >
                <span className="material-symbols-outlined text-primary">
                  share
                </span>
              </button>

              {/* Cotizar por WhatsApp */}
              <button
                type="button"
                onClick={handleCotizar}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-green-600 py-3.5 font-bold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg active:scale-[0.97]"
                title="Cotizar por WhatsApp"
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
                Cotizar
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

      {/* Guest modal — when non-logged-in user tries to add to cart */}
      {showGuestModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowGuestModal(false)}
            aria-label="Cerrar"
          />
          <div className="relative z-10 mx-4 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
              <span className="material-symbols-outlined text-2xl text-amber-500">
                lock
              </span>
            </div>
            <h3 className="mb-2 text-lg font-extrabold text-slate-900">
              Inicia sesión para usar el carrito
            </h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-500">
              El carrito está disponible para usuarios registrados. Si
              prefieres, puedes cotizar este producto directamente por WhatsApp
              sin crear una cuenta.
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowGuestModal(false);
                  showAuthModal("login");
                }}
                className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl py-3 font-bold text-white transition hover:opacity-90"
              >
                <span className="material-symbols-outlined text-[20px]">
                  login
                </span>
                Iniciar sesión
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowGuestModal(false);
                  handleCotizar();
                }}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 py-3 font-bold text-white transition hover:bg-green-700"
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
                Cotizar por WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
