"use client";

/**
 * ProductDetailClient — Confecciones Liss
 * Vista de detalle pixel-fiel al ProductDetailPage de Padilla Store:
 * - Grid 45%/55%, gap-10/12
 * - Izquierda sticky: thumbnails laterales (desktop) / inferiores (mobile)
 *   + imagen principal 1:1 + zoom cursor + favorito overlay
 * - Lightbox fullscreen al clic
 * - Derecha: Breadcrumbs → H1 → descripción → Buy Box
 * - Buy Box: precio + personalización acordeón + CTA WhatsApp + compartir
 * - Sección productos relacionados 1→2→4 cols
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CatalogProductCard } from "./CatalogProductCard";
import { siteConfig } from "@/config/site";
import type { Product, CategoryConfig } from "@/data/types";

interface ProductDetailClientProps {
  product: Product;
  config: CategoryConfig;
  relatedProducts: Product[];
}

export function ProductDetailClient({
  product,
  config,
  relatedProducts,
}: ProductDetailClientProps) {
  const images: string[] = [...(product.imagen ? [product.imagen] : [])].filter(
    Boolean
  );

  const [mainImg, setMainImg] = useState<string>(images[0] ?? "");
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [customNote, setCustomNote] = useState("");
  const [isFavorited, setIsFavorited] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const hasDiscount =
    product.precioAnterior != null && product.precioAnterior > product.precio;

  function handleAddToCart() {
    const noteText = customNote ? `\nNota: ${customNote}` : "";
    const text = encodeURIComponent(
      `¡Hola! Me interesa este producto:\n*${product.nombre}*\nPrecio: $${product.precio.toFixed(2)}${noteText}\n¿Está disponible?`
    );
    window.open(
      `${siteConfig.links.whatsappDirect}?text=${text}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const handleCopy = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";

    // Check if navigator.clipboard is available (blocked in insecure HTTP environments)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 2500);
        return;
      } catch (err) {
        console.error("Failed to copy link via clipboard API:", err);
      }
    }

    // Fallback for insecure contexts (e.g. mobile testing on local network HTTP)
    try {
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      textArea.style.position = "fixed"; // avoid scrolling to bottom
      textArea.style.left = "-9999px"; // hide off-screen
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const successful = document.execCommand("copy");
      document.body.removeChild(textArea);
      if (successful) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      } else {
        throw new Error("execCommand copy returned false");
      }
    } catch (fallbackErr) {
      console.error("Fallback copy failed:", fallbackErr);
    }
  };

  // Placeholder thumbnails to keep 4-slot gallery consistent
  const placeholderCount = Math.max(0, 4 - images.length);

  return (
    <div className="mx-auto flex min-h-[calc(100dvh-56px)] w-full max-w-screen-2xl flex-1 flex-col px-5 py-[var(--space-lg)] md:px-8">
      {/* ── Main product grid ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 lg:grid-cols-[45%_1fr] lg:gap-12">
        {/* ── Left column: Sticky image gallery ───────────────────────────── */}
        <div className="flex w-full min-w-0 flex-col-reverse items-start gap-5 md:sticky md:top-24 lg:flex-row lg:gap-7">
          {/* Thumbnail strip: below on mobile/tablet, left column on desktop */}
          <div className="no-scrollbar flex w-full min-w-0 shrink-0 flex-row gap-4 overflow-x-auto pb-2 lg:max-h-[600px] lg:w-24 lg:flex-col lg:overflow-y-auto lg:pb-0">
            {images.map((img, i) => (
              <button
                key={`img-${i}`}
                type="button"
                onClick={() => setMainImg(img)}
                className={`aspect-[4/5] w-20 shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-gray-50 transition-all lg:w-24 ${
                  mainImg === img
                    ? "border-primary shadow-sm"
                    : "border-transparent opacity-60 hover:border-slate-300 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.nombre} miniatura ${i + 1}`}
                  width={96}
                  height={120}
                  className="h-full w-full object-contain object-center"
                />
              </button>
            ))}

            {/* Empty placeholder slots */}
            {Array.from({ length: placeholderCount }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="aspect-[4/5] w-20 shrink-0 rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 lg:w-24"
                aria-hidden="true"
              />
            ))}
          </div>

          {/* Divider line (desktop only) */}
          <div className="mt-2 mb-2 hidden w-px shrink-0 self-stretch rounded-full bg-slate-200 lg:block" />

          {/* Main image */}
          <div className="relative aspect-[4/5] w-full min-w-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 shadow-sm md:flex-1">
            <button
              type="button"
              onClick={() => setIsImageModalOpen(true)}
              className="group relative flex h-full w-full cursor-zoom-in items-center justify-center"
            >
              {mainImg ? (
                <Image
                  src={mainImg}
                  alt={product.imageAlt ?? product.nombre}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="rounded-xl object-contain object-center transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <span
                  className="material-symbols-outlined text-6xl text-slate-300"
                  aria-hidden="true"
                >
                  checkroom
                </span>
              )}
              {mainImg && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-colors group-hover:bg-black/5 group-hover:opacity-100">
                  <span className="material-symbols-outlined text-5xl text-white drop-shadow-md">
                    zoom_in
                  </span>
                </div>
              )}
            </button>

            {/* Favorite button overlay */}
            <button
              type="button"
              onClick={() => setIsFavorited((v) => !v)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-md transition-all hover:scale-110"
              aria-label={
                isFavorited ? "Quitar de favoritos" : "Añadir a favoritos"
              }
            >
              <span
                className={`material-symbols-outlined ${isFavorited ? "text-primary" : "text-slate-400"}`}
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* ── Right column: Product info ───────────────────────────────────── */}
        <div className="flex min-w-0 flex-col gap-6">
          {/* Breadcrumbs */}
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catálogo", href: "/catalogo" },
              { label: config.subtitle, href: `/catalogo/${product.sector}` },
            ]}
          />

          {/* Title + description */}
          <div className="flex min-w-0 flex-col gap-4">
            <h1 className="min-w-0 text-xl font-extrabold tracking-tight break-words text-gray-900 md:text-2xl">
              {product.nombre}
            </h1>

            <div className="w-full min-w-0 overflow-hidden">
              {product.descripcion ? (
                <p className="text-base whitespace-pre-wrap text-slate-600">
                  {product.descripcion}
                </p>
              ) : (
                <p className="text-sm text-slate-500 italic">
                  Sin descripción detallada.
                </p>
              )}
            </div>

            {/* Available sizes */}
            {product.tallas.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Tallas disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.tallas.map((talla) => (
                    <span
                      key={talla}
                      className="rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {talla}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available colors */}
            {product.colores && product.colores.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-semibold tracking-wider text-slate-500 uppercase">
                  Colores disponibles
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colores.map((color) => (
                    <div
                      key={color.hex}
                      className="group flex items-center gap-1.5"
                      title={color.name}
                    >
                      <span
                        className="h-6 w-6 rounded-full border border-slate-200 shadow-sm"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-xs text-slate-500">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Characteristics */}
            {product.caracteristicas && product.caracteristicas.length > 0 && (
              <ul className="flex flex-col gap-1.5">
                {product.caracteristicas.map((item) => (
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
          </div>

          {/* ── Buy Box ─────────────────────────────────────────────────────── */}
          <div className="flex flex-col gap-5 rounded-2xl bg-slate-50 p-5 shadow-sm">
            {/* Price */}
            <div className="flex flex-col gap-1">
              <div className="flex items-end gap-3">
                <p className="text-2xl font-bold text-gray-900">
                  ${product.precio.toFixed(2)}
                  {product.priceSuffix && (
                    <span className="ml-1 text-sm font-normal text-slate-500">
                      {product.priceSuffix}
                    </span>
                  )}
                </p>
                {hasDiscount && (
                  <p className="text-lg font-medium text-slate-400 line-through">
                    ${product.precioAnterior!.toFixed(2)}
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

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="bg-primary hover:bg-primary/90 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-white shadow-md transition-all hover:shadow-lg active:scale-[0.98]"
              >
                <span className="material-symbols-outlined">shopping_bag</span>
                Consultar por WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCopy}
                className="flex w-14 flex-shrink-0 cursor-pointer items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-colors hover:bg-slate-200 dark:bg-transparent dark:text-slate-300 dark:hover:bg-white/10"
                title="Compartir"
                aria-label="Compartir este producto"
              >
                <span className="material-symbols-outlined text-primary">
                  share
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related products ─────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              También Te Puede Gustar
            </h2>
            <Link
              href={`/catalogo/${product.sector}`}
              className="text-primary text-sm font-bold hover:underline"
            >
              Ver Todo
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
            {relatedProducts.map((p) => (
              <CatalogProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* ── Lightbox modal ───────────────────────────────────────────────── */}
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
            <span className="material-symbols-outlined text-3xl">close</span>
          </button>
          <div className="relative z-10 max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] sm:max-h-[calc(100vh-6rem)] sm:max-w-[calc(100vw-6rem)]">
            <Image
              src={mainImg}
              alt={product.imageAlt ?? product.nombre}
              width={1200}
              height={1200}
              className="h-auto max-h-[calc(100vh-4rem)] w-auto max-w-full rounded-xl object-contain shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {showToast && (
        <div
          style={{
            position: "fixed",
            bottom: "2.5rem",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#1e1e24",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: "9999px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
            fontSize: "0.875rem",
            fontWeight: 600,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            animation:
              "toastFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              color: "#10b981",
              fontSize: "1.25rem",
              fontWeight: "bold",
            }}
          >
            check_circle
          </span>
          <span>Enlace copiado</span>
        </div>
      )}

      {/* CSS Animation injection */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes toastFadeIn {
              from {
                opacity: 0;
                transform: translate(-50%, 16px);
              }
              to {
                opacity: 1;
                transform: translate(-50%, 0);
              }
            }
          `,
        }}
      />
    </div>
  );
}
