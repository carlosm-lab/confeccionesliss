"use client";
/**
 * NOTA:
 * Este formulario NO incluye campo de stock intencionalmente.
 * El negocio opera bajo modelo de PRENDAS POR PEDIDO (catálogo).
 * La administradora crea productos que siempre están disponibles.
 * Todo pedido se concreta vía WhatsApp.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import ImageUploader from "./ImageUploader";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { sanitizeUrl } from "@/lib/sanitize";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useModal } from "@/hooks/useModal";
import { logger } from "@/lib/logger";
import { generateSlug } from "@/lib/slug";
import type { Category } from "@/hooks/useCategories";
import type { Product } from "@/lib/productUtils";
import { CATALOGS } from "@/config/catalogs";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (payload: Partial<Product>) => Promise<void>;
  categories: Category[];
}

interface FormData {
  name: string;
  description: string;
  price: string;
  old_price: string;
  offer_days: string;
  offer_hours: string;
  offer_minutes: string;
  offer_starts_at: string;
  /** Catálogo al que pertenece el producto (scrubs, universitario, etc.) */
  catalog: string;
  category: string;
  tags: string[];
  image_path: string;
  images: string[];
  is_active: boolean;
  slug: string;
}

export default function ProductModal({
  isOpen,
  onClose,
  product,
  onSave,
  categories,
}: ProductModalProps) {
  const manualUrlRef = useRef<HTMLInputElement>(null);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const { modalRef } = useModal({ isOpen, onClose });
  const [toastMsg, setToastMsg] = useState<{
    text: string;
    type: "error" | "info";
  } | null>(null);

  useBodyScrollLock(isOpen);
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    old_price: "",
    offer_days: "",
    offer_hours: "",
    offer_minutes: "",
    offer_starts_at: "",
    catalog: "",
    category: "",
    tags: [],
    image_path: "",
    images: [],
    is_active: true,
    slug: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (text: string, type: "error" | "info" = "error") => {
    setToastMsg({ text, type });
    setTimeout(() => {
      if (isMounted.current) setToastMsg(null);
    }, 4000);
  };

  useEffect(() => {
    setIsSubmitting(false);

    if (product) {
      // Modo edición: derivar el catálogo desde la categoría actual del producto
      const inferredCatalog =
        product.catalog ||
        (product.category
          ? (categories.find((c) => c.slug === product.category)?.catalog ?? "")
          : "");

      setFormData({
        name: product.name || "",
        description: product.description || "",
        price: product.price?.toString() || "",
        old_price: product.old_price?.toString() || "",
        offer_days: "",
        offer_hours: "",
        offer_minutes: "",
        offer_starts_at: product.offer_starts_at
          ? new Date(product.offer_starts_at).toISOString().slice(0, 16)
          : "",
        catalog: inferredCatalog,
        category: product.category || "",
        tags: Array.isArray(product.tags) ? product.tags : [],
        image_path: Array.isArray(product.images)
          ? product.images[0] || product.image_path || ""
          : product.image_path || "",
        images: Array.isArray(product.images)
          ? product.images
          : product.image_path
            ? [product.image_path]
            : [],
        is_active: product.is_active ?? true,
        slug: product.slug || "",
      });
      setSlugManuallyEdited(!!product.slug);
    } else {
      // Modo nuevo: primer catálogo con categorías disponibles
      const availableCatalogs = CATALOGS.filter((cat) =>
        categories.some((c) => c.catalog === cat.value)
      );
      const defaultCatalog = availableCatalogs[0]?.value ?? "";
      const defaultCategory =
        categories.find((c) => c.catalog === defaultCatalog)?.slug ?? "";

      setFormData({
        name: "",
        description: "",
        price: "",
        old_price: "",
        offer_days: "",
        offer_hours: "",
        offer_minutes: "",
        offer_starts_at: "",
        catalog: defaultCatalog,
        category: defaultCategory,
        tags: [],
        image_path: "",
        images: [],
        is_active: true,
        slug: "",
      });
      setSlugManuallyEdited(false);
    }
    setTagInput("");
  }, [product, isOpen, categories]);

  const handleAddImage = useCallback((url: string) => {
    setFormData((prev) => {
      const newImages = [...prev.images, url];
      return { ...prev, images: newImages, image_path: newImages[0] || "" };
    });
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setFormData((prev) => {
      const newImages = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: newImages, image_path: newImages[0] || "" };
    });
  }, []);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      if (name === "name" && !slugManuallyEdited) {
        newData.slug = generateSlug(value);
      }
      return newData;
    });
    if (name === "slug") setSlugManuallyEdited(value.trim() !== "");
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()],
        }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate catalog & category (formerly enforced by HTML5 required on <select>)
    if (!formData.catalog) {
      showToast("Por favor selecciona un catálogo.");
      setIsSubmitting(false);
      return;
    }
    if (!formData.category) {
      showToast("Por favor selecciona una categoría.");
      setIsSubmitting(false);
      return;
    }

    if (
      formData.old_price &&
      parseFloat(formData.old_price) <= parseFloat(formData.price)
    ) {
      showToast(
        'El precio "Antes" debe ser mayor al precio actual para ser una oferta válida.'
      );
      setIsSubmitting(false);
      return;
    }

    const finalSlug = formData.slug?.trim() || generateSlug(formData.name);

    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("products")
        .select("id")
        .eq("slug", finalSlug)
        .maybeSingle();
      if (error) throw error;
      if (data && (!product || data.id !== product.id)) {
        showToast(
          "Ya existe un producto con esta URL/Slug. Modifica el nombre."
        );
        setIsSubmitting(false);
        return;
      }
    } catch (err) {
      logger.error("Error checking slug:", err);
      showToast("Error al validar la URL del producto.");
      setIsSubmitting(false);
      return;
    }

    const parsedPrice = formData.price === "" ? 0 : parseFloat(formData.price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      showToast("Por favor, ingresa un precio válido.");
      setIsSubmitting(false);
      return;
    }

    let parsedOldPrice: number | null = null;
    let offerEndsAt: string | null =
      (product as Product & { offer_ends_at?: string })?.offer_ends_at || null;
    let offerStartsAt: string | null =
      (product as Product & { offer_ends_at?: string })?.offer_starts_at ||
      null;

    if (formData.old_price) {
      parsedOldPrice = parseFloat(formData.old_price);
      const days = parseInt(formData.offer_days, 10) || 0;
      const hours = parseInt(formData.offer_hours, 10) || 0;
      const minutes = parseInt(formData.offer_minutes, 10) || 0;
      const totalMinutes = days * 1440 + hours * 60 + minutes;
      if (totalMinutes > 0) {
        const baseDate = formData.offer_starts_at
          ? new Date(formData.offer_starts_at)
          : new Date();
        baseDate.setMinutes(baseDate.getMinutes() + totalMinutes);
        offerEndsAt = baseDate.toISOString();
      }
      offerStartsAt = formData.offer_starts_at
        ? new Date(formData.offer_starts_at).toISOString()
        : null;
    } else {
      offerEndsAt = null;
      offerStartsAt = null;
    }

    const payload: Partial<Product> = {
      name: formData.name,
      description: formData.description || null,
      price: parsedPrice,
      old_price: parsedOldPrice,
      catalog: formData.catalog || null,
      category: formData.category || null,
      tags: Array.isArray(formData.tags) ? formData.tags : [],
      image_path: formData.images[0] || formData.image_path || null,
      images:
        formData.images.length > 0
          ? formData.images
          : formData.image_path
            ? [formData.image_path]
            : [],
      is_active: formData.is_active,
      slug: finalSlug,
      offer_ends_at: offerEndsAt,
      offer_starts_at: offerStartsAt,
      category_id:
        categories.find((c) => c.slug === formData.category)?.id || null,
    };

    await onSave(payload);
    if (isMounted.current) setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      ></div>

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="relative mb-16 flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:mb-0 dark:bg-slate-900"
      >
        {/* Toast inline */}
        {toastMsg && (
          <div
            className={`absolute top-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold shadow-lg ${toastMsg.type === "error" ? "bg-red-600 text-white" : "bg-primary text-white"}`}
          >
            <span className="material-symbols-outlined text-[16px]">
              {toastMsg.type === "error" ? "error" : "info"}
            </span>
            {toastMsg.text}
          </div>
        )}

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-white/5">
          <h2
            id="product-modal-title"
            className="text-xl font-bold text-slate-900 dark:text-white"
          >
            {product ? "Editar Producto" : "Nuevo Producto"}
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-200"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="elegant-scrollbar flex-1 overflow-y-auto p-6">
          <form id="productForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Basic Info */}
              <div className="space-y-4 md:col-span-2">
                <div>
                  <label
                    htmlFor="product-name"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Nombre
                  </label>
                  <input
                    id="product-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="product-slug"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    URL (Slug){" "}
                    <span className="ml-1 font-normal text-slate-400">
                      (Opcional, se genera auto)
                    </span>
                  </label>
                  <input
                    id="product-slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="ejemplo-de-producto"
                    maxLength={200}
                    className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="product-description"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Descripción
                  </label>
                  <textarea
                    id="product-description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    maxLength={2000}
                    className="focus:ring-primary/20 focus:border-primary w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  ></textarea>
                </div>
              </div>

              {/* Pricing */}
              <div>
                <label
                  htmlFor="product-price"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Precio ($)
                </label>
                <input
                  id="product-price"
                  type="number"
                  step="0.01"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  min="0"
                  placeholder="0.00"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="product-old-price"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Precio Anterior (Oferta)
                </label>
                <input
                  id="product-old-price"
                  type="number"
                  step="0.01"
                  name="old_price"
                  value={formData.old_price}
                  onChange={handleChange}
                  min="0"
                  placeholder="Dejar vacío si no hay oferta"
                  onWheel={(e) => (e.target as HTMLInputElement).blur()}
                  className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              {formData.old_price && (
                <div className="space-y-4 rounded-xl border border-amber-200 bg-amber-50 p-4 md:col-span-2 dark:border-amber-500/20 dark:bg-amber-500/5">
                  <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "20px" }}
                    >
                      timer
                    </span>
                    <h4 className="text-sm font-bold">
                      Configuración de Oferta
                    </h4>
                  </div>
                  <div>
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Duración de la oferta
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: "offer_days", label: "Días", max: undefined },
                        { name: "offer_hours", label: "Horas", max: 23 },
                        { name: "offer_minutes", label: "Minutos", max: 59 },
                      ].map((field) => (
                        <div key={field.name}>
                          <input
                            type="number"
                            name={field.name}
                            value={
                              (formData as unknown as Record<string, string>)[
                                field.name
                              ]
                            }
                            onChange={handleChange}
                            min="0"
                            max={field.max}
                            placeholder="0"
                            onWheel={(e) =>
                              (e.target as HTMLInputElement).blur()
                            }
                            aria-label={`${field.label} de duración de oferta`}
                            className="focus:ring-primary/20 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                          />
                          <span className="mt-0.5 block text-center text-[10px] text-slate-500 dark:text-slate-400">
                            {field.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      Si dejas todo en 0, la oferta no expirará automáticamente.
                    </p>
                  </div>
                  <div>
                    <label
                      htmlFor="product-offer-starts-at"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      <span className="flex items-center gap-1">
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "14px" }}
                        >
                          schedule
                        </span>
                        Programar inicio (Opcional)
                      </span>
                    </label>
                    <input
                      id="product-offer-starts-at"
                      type="datetime-local"
                      name="offer_starts_at"
                      value={formData.offer_starts_at}
                      onChange={handleChange}
                      className="focus:ring-primary/20 w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                    <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                      Si dejas vacío, la oferta inicia inmediatamente al
                      guardar.
                    </p>
                  </div>
                </div>
              )}

              {/* Catálogo — filtra las categorías disponibles */}
              <div>
                <label
                  htmlFor="product-catalog"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Catálogo
                </label>
                <CustomSelect
                  id="product-catalog"
                  options={CATALOGS.filter((cat) =>
                    categories.some((c) => c.catalog === cat.value)
                  ).map((cat) => ({ value: cat.value, label: cat.label }))}
                  value={formData.catalog}
                  onChange={(nextCatalog) =>
                    setFormData((prev) => ({
                      ...prev,
                      catalog: nextCatalog,
                      category: "",
                    }))
                  }
                  placeholder="Seleccionar catálogo..."
                />
              </div>

              {/* Categoría — filtrada por el catálogo seleccionado */}
              <div>
                <label
                  htmlFor="product-category"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Categoría
                </label>
                <CustomSelect
                  id="product-category"
                  options={categories
                    .filter((cat) => cat.catalog === formData.catalog)
                    .map((cat) => ({ value: cat.slug, label: cat.name }))}
                  value={formData.category}
                  onChange={(v) =>
                    setFormData((prev) => ({ ...prev, category: v }))
                  }
                  placeholder={
                    formData.catalog
                      ? "Seleccionar categoría..."
                      : "Primero selecciona un catálogo"
                  }
                  disabled={!formData.catalog}
                />
              </div>

              {/* Multi-Image Upload */}
              <div className="md:col-span-2">
                <p className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Imágenes del Producto
                </p>
                {formData.images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-3">
                    {formData.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="group relative h-20 w-20 overflow-hidden rounded-lg border border-slate-200 dark:border-white/5"
                      >
                        <Image
                          src={sanitizeUrl(img) || img}
                          alt={`Imagen ${idx + 1}`}
                          fill
                          className="object-cover"
                          unoptimized
                          sizes="80px"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          aria-label={`Eliminar imagen ${idx + 1}`}
                          className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <span className="material-symbols-outlined text-[18px] text-white">
                            delete
                          </span>
                        </button>
                        {idx === 0 && (
                          <span className="bg-primary absolute top-0.5 left-0.5 rounded px-1 text-[9px] font-bold text-white">
                            Principal
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <ImageUploader
                  currentImage={null}
                  onUploadSuccess={handleAddImage}
                  onRemoveImage={() => {}}
                />
                <div className="mt-3 flex flex-col gap-1">
                  <label
                    htmlFor="manual-image-url"
                    className="text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    O ingresar URL de imagen manualmente
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      id="manual-image-url"
                      ref={manualUrlRef}
                      placeholder="https://ejemplo.com/imagen.jpg"
                      aria-label="URL de imagen manual"
                      className="focus:ring-primary/20 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-900 outline-none focus:ring-1 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const url = (
                            e.target as HTMLInputElement
                          ).value.trim();
                          if (url) {
                            const safeUrl = sanitizeUrl(url);
                            if (safeUrl) {
                              handleAddImage(safeUrl);
                              (e.target as HTMLInputElement).value = "";
                            } else
                              showToast(
                                "URL inválida. Usa una URL con https://"
                              );
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const url = manualUrlRef.current?.value?.trim();
                        if (url) {
                          const safeUrl = sanitizeUrl(url);
                          if (safeUrl) {
                            handleAddImage(safeUrl);
                            manualUrlRef.current!.value = "";
                          } else
                            showToast("URL inválida. Usa una URL con https://");
                        }
                      }}
                      className="rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20"
                    >
                      Agregar URL
                    </button>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label
                  htmlFor="product-tags"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Etiquetas (Presiona Enter)
                </label>
                <input
                  id="product-tags"
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Ej: Nuevo, Bestseller, Oferta..."
                  className="focus:ring-primary/20 mb-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-primary/60 hover:text-red-500"
                        aria-label={`Quitar etiqueta ${tag}`}
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontSize: "14px" }}
                        >
                          close
                        </span>
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Active Toggle */}
              <div className="md:col-span-2">
                <label className="flex cursor-pointer items-center gap-3">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      className="peer sr-only"
                      aria-label="Producto Activo (Visible en catálogo)"
                    />
                    <div className="peer-focus:ring-primary/20 peer peer-checked:bg-primary h-6 w-11 rounded-full bg-slate-200 peer-focus:ring-2 peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white dark:border-white/5 dark:bg-white/10"></div>
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Producto Activo (Visible en catálogo)
                  </span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div
          className="flex shrink-0 justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/5 dark:bg-white/5"
          aria-live="polite"
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          >
            Cancelar
          </button>
          <button
            type="submit"
            form="productForm"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-6 py-2 font-bold text-white shadow-sm transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"
                  aria-hidden="true"
                ></span>{" "}
                Guardando...
              </>
            ) : (
              "Guardar Producto"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
