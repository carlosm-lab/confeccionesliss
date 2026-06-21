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
import { isValidOffer } from "@/lib/productUtils";

import { CATALOGS } from "@/config/catalogs";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (
    payload: Partial<Product>,
    offerRules: unknown[],
    notify: boolean
  ) => Promise<void>;
  categories: Category[];
}

interface FormData {
  name: string;
  description: string;
  /** Descripción corta — se muestra debajo del título en la vista de detalle */
  short_description: string;
  price: string;
  old_price: string;
  /** Duración de oferta temporal (en el precio base) */
  offer_indefinida: boolean;
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
  // Campos del catálogo público
  badge_text: string;
  price_suffix: string;
  tallas: string[];
  /** Colores disponibles — array de { name, hex } */
  colores: { name: string; hex: string }[];
  material: string;
  /** Características del producto — lista de strings para bullets con check */
  caracteristicas: string[];
  // Precios avanzados
  wholesale_price: string;
  wholesale_min_qty: string;
  labor_price: string;
  /** Términos de la oferta — texto libre */
  offer_terms: string;
  // ── Campos SEO manuales ────────────────────────
  seo_title: string;
  seo_description: string;
  seo_keywords: string;
  seo_robots: string;
  seo_publisher: string;
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

  const [colorInput, setColorInput] = useState<{ name: string; hex: string }>({
    name: "",
    hex: "#000000",
  });
  const [caracteristicaInput, setCaracteristicaInput] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    short_description: "",
    price: "",
    old_price: "",
    offer_indefinida: false,
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
    badge_text: "",
    price_suffix: "",
    tallas: [],
    colores: [],
    material: "",
    caracteristicas: [],
    wholesale_price: "",
    wholesale_min_qty: "",
    labor_price: "",
    offer_terms: "",
    // SEO
    seo_title: "",
    seo_description: "",
    seo_keywords: "",
    seo_robots: "",
    seo_publisher: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifyOnSave, setNotifyOnSave] = useState(false);

  const showToast = (text: string, type: "error" | "info" = "error") => {
    setToastMsg({ text, type });
    setTimeout(() => {
      if (isMounted.current) setToastMsg(null);
    }, 4000);
  };

  useEffect(() => {
    setIsSubmitting(false);

    if (product) {
      // Modo edición: derivar el catálogo desde la categoría actual del producto.
      // product.catalog es campo virtual (no existe en DB).
      // product.sector es la columna real que persiste el valor.
      const inferredCatalog =
        product.catalog ||
        product.sector ||
        (product.category
          ? (categories.find((c) => c.slug === product.category)?.catalog ?? "")
          : "");

      setFormData({
        name: product.name || "",
        description: product.description || "",
        short_description: product.short_description || "",
        price: product.price?.toString() || "",
        old_price: product.old_price?.toString() || "",
        offer_indefinida: !product.offer_ends_at && !!product.old_price,
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
        badge_text: product.badge_text || "",
        price_suffix: product.price_suffix || "",
        tallas: Array.isArray(product.tallas) ? product.tallas : [],
        colores: Array.isArray(product.colores) ? product.colores : [],
        material: product.material || "",
        caracteristicas: Array.isArray(product.caracteristicas)
          ? product.caracteristicas
          : [],
        wholesale_price: product.wholesale_price?.toString() || "",
        wholesale_min_qty: product.wholesale_min_qty?.toString() || "",
        labor_price: product.labor_price?.toString() || "",
        offer_terms:
          (product as { offer_terms?: string | null }).offer_terms || "",
        // SEO
        seo_title: product.seo_title || "",
        seo_description: product.seo_description || "",
        seo_keywords: product.seo_keywords || "",
        seo_robots: product.seo_robots || "",
        seo_publisher: product.seo_publisher || "",
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
        short_description: "",
        price: "",
        old_price: "",
        offer_indefinida: false,
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
        badge_text: "",
        price_suffix: "",
        tallas: [],
        colores: [],
        material: "",
        caracteristicas: [],
        wholesale_price: "",
        wholesale_min_qty: "",
        labor_price: "",
        offer_terms: "",
        // SEO
        seo_title: "",
        seo_description: "",
        seo_keywords: "",
        seo_robots: "",
        seo_publisher: "",
      });
      setColorInput({ name: "", hex: "#000000" });
      setCaracteristicaInput("");
      setSlugManuallyEdited(false);
    }
    setTagInput("");
    setColorInput({ name: "", hex: "#000000" });
    setCaracteristicaInput("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id, isOpen]);

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

    // ── Validación de oferta ──────────────────────────────────
    if (formData.old_price) {
      const oldPriceNum = parseFloat(formData.old_price);
      const priceNum = parseFloat(formData.price);

      if (isNaN(oldPriceNum) || oldPriceNum <= 0) {
        showToast('El precio anterior ("Antes") debe ser un número positivo.');
        setIsSubmitting(false);
        return;
      }
      if (oldPriceNum <= priceNum) {
        showToast(
          'El precio "Antes" debe ser MAYOR al precio actual para ser una oferta válida.'
        );
        setIsSubmitting(false);
        return;
      }
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

    // ── Validación precios avanzados ─────────────────────────
    const parsedWholesale = formData.wholesale_price
      ? parseFloat(formData.wholesale_price)
      : null;
    const parsedWholesaleMinQty = formData.wholesale_min_qty
      ? parseInt(formData.wholesale_min_qty, 10)
      : null;
    const parsedLaborPrice = formData.labor_price
      ? parseFloat(formData.labor_price)
      : null;

    if (parsedWholesale !== null) {
      if (isNaN(parsedWholesale) || parsedWholesale <= 0) {
        showToast("El precio de mayoreo debe ser un número positivo.");
        setIsSubmitting(false);
        return;
      }
      if (parsedWholesale >= parsedPrice) {
        showToast(
          "El precio de mayoreo debe ser MENOR al precio regular para que sea una ventaja."
        );
        setIsSubmitting(false);
        return;
      }
      if (!parsedWholesaleMinQty || parsedWholesaleMinQty < 2) {
        showToast(
          "Para precio mayoreo debes indicar la cantidad mínima (mínimo 2 unidades)."
        );
        setIsSubmitting(false);
        return;
      }
    }

    if (
      parsedLaborPrice !== null &&
      (isNaN(parsedLaborPrice) || parsedLaborPrice <= 0)
    ) {
      showToast("El precio de mano de obra debe ser un número positivo.");
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

      if (formData.offer_indefinida) {
        // Oferta indefinida: sin fecha de vencimiento
        offerEndsAt = null;
        offerStartsAt = formData.offer_starts_at
          ? new Date(formData.offer_starts_at).toISOString()
          : null;
      } else {
        // Oferta temporal: calcular duración
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
      }
    } else {
      offerEndsAt = null;
      offerStartsAt = null;
    }

    const payload: Partial<Product> = {
      name: formData.name,
      description: formData.description || null,
      short_description: formData.short_description?.trim() || null,
      price: parsedPrice,
      old_price: parsedOldPrice,
      // 'catalog' NO es columna real en la tabla — se guarda como 'sector'
      sector: formData.catalog || null,
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
      // Campos del catálogo público
      badge_text: formData.badge_text || null,
      price_suffix: formData.price_suffix || null,
      tallas: formData.tallas.length > 0 ? formData.tallas : [],
      colores: formData.colores.length > 0 ? formData.colores : [],
      material: formData.material || null,
      caracteristicas:
        formData.caracteristicas.length > 0 ? formData.caracteristicas : [],
      // Precios avanzados
      wholesale_price: parsedWholesale,
      wholesale_min_qty: parsedWholesaleMinQty,
      labor_price: parsedLaborPrice,
      // offer_terms: texto libre de términos de oferta
      offer_terms: formData.offer_terms?.trim() || null,
      // ── Campos SEO manuales (null si vacíos, para preservar fallback automático) ──
      seo_title: formData.seo_title?.trim() || null,
      seo_description: formData.seo_description?.trim() || null,
      seo_keywords: formData.seo_keywords?.trim() || null,
      seo_robots: formData.seo_robots?.trim() || null,
      seo_publisher: formData.seo_publisher?.trim() || null,
    } as Partial<Product> & { offer_terms?: string | null };

    await onSave(payload, [], notifyOnSave);
    if (isMounted.current) setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] sm:bg-black/20"
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
                <div>
                  <label
                    htmlFor="product-short-description"
                    className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    Descripción Corta{" "}
                    <span className="ml-1 font-normal text-slate-400">
                      (aparece debajo del título en la ficha del producto)
                    </span>
                  </label>
                  <input
                    id="product-short-description"
                    name="short_description"
                    value={formData.short_description}
                    onChange={handleChange}
                    placeholder="Ej: Uniforme hospitalario de alta durabilidad, disponible a la medida."
                    maxLength={200}
                    className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <p className="mt-0.5 text-right text-[10px] text-slate-400">
                    {(formData.short_description || "").length}/200 caracteres
                  </p>
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
                      local_offer
                    </span>
                    <h4 className="text-sm font-bold">
                      Configuración de Oferta
                    </h4>
                  </div>

                  {/* Términos de la oferta — texto libre */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
                      Describe los términos de la oferta
                      <span className="ml-1 font-normal text-slate-400">
                        (condiciones, restricciones, etc.)
                      </span>
                    </p>
                    <textarea
                      name="offer_terms"
                      id="offer-terms"
                      value={formData.offer_terms}
                      onChange={handleChange}
                      rows={3}
                      maxLength={500}
                      placeholder="Ej: Solo válido para clientes nuevos. Presenta este descuento al momento del pedido. No acumulable con otras promociones."
                      className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition-all outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-white/30"
                    />
                    <p className="text-[10px] text-slate-400">
                      {(formData.offer_terms || "").length}/500 caracteres
                    </p>
                  </div>

                  {/* Toggle oferta indefinida */}
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.offer_indefinida}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          offer_indefinida: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 rounded border-slate-300 accent-amber-600"
                    />
                    <span className="text-xs font-medium text-slate-700 dark:text-slate-300">
                      Oferta indefinida (sin fecha de vencimiento)
                    </span>
                  </label>

                  {/* Duración — solo si no es indefinida */}
                  {!formData.offer_indefinida && (
                    <div>
                      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                        Duración de la oferta (desde el inicio)
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          {
                            name: "offer_days",
                            label: "Días",
                            max: undefined,
                          },
                          { name: "offer_hours", label: "Horas", max: 23 },
                          {
                            name: "offer_minutes",
                            label: "Minutos",
                            max: 59,
                          },
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
                        Si dejas todo en 0, la oferta no expirará
                        automáticamente.
                      </p>
                    </div>
                  )}

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

              {/* Precios Avanzados */}
              <div className="space-y-4 rounded-xl border border-blue-200 bg-blue-50 p-4 md:col-span-2 dark:border-blue-500/20 dark:bg-blue-500/5">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    payments
                  </span>
                  <h4 className="text-sm font-bold">Precios Especiales</h4>
                  <span className="ml-auto text-[10px] font-normal text-slate-400">
                    Opcional
                  </span>
                </div>

                {/* Precio mayoreo */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="product-wholesale-price"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Precio Mayoreo ($)
                    </label>
                    <input
                      id="product-wholesale-price"
                      type="number"
                      step="0.01"
                      min="0"
                      name="wholesale_price"
                      value={formData.wholesale_price}
                      onChange={handleChange}
                      placeholder="Ej: 8.00"
                      onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="product-wholesale-min-qty"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Cantidad mínima (unidades)
                    </label>
                    <input
                      id="product-wholesale-min-qty"
                      type="number"
                      step="1"
                      min="2"
                      name="wholesale_min_qty"
                      value={formData.wholesale_min_qty}
                      onChange={handleChange}
                      placeholder="Ej: 6"
                      onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  <p className="col-span-2 text-[10px] text-slate-500 dark:text-slate-400">
                    El precio de mayoreo debe ser menor al precio regular. Se
                    aplica al pedir la cantidad mínima o más.
                  </p>
                </div>

                {/* Precio mano de obra */}
                <div>
                  <label
                    htmlFor="product-labor-price"
                    className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Precio Solo Mano de Obra ($)
                  </label>
                  <input
                    id="product-labor-price"
                    type="number"
                    step="0.01"
                    min="0"
                    name="labor_price"
                    value={formData.labor_price}
                    onChange={handleChange}
                    placeholder="Dejar vacío si no aplica"
                    onWheel={(e) => (e.target as HTMLInputElement).blur()}
                    className="focus:ring-primary/20 focus:border-primary w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-900 transition-all outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <p className="mt-1 text-[10px] text-slate-500 dark:text-slate-400">
                    Para cuando el cliente trae su propia tela y solo paga la
                    confección.
                  </p>
                </div>
              </div>

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

              {/* Catalog display fields */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 md:col-span-2 dark:border-white/5 dark:bg-white/5">
                <p className="mb-3 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Datos del Catálogo Público
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {/* Badge text */}
                  <div>
                    <label
                      htmlFor="product-badge-text"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Badge / Etiqueta Visual
                    </label>
                    <input
                      id="product-badge-text"
                      name="badge_text"
                      value={formData.badge_text}
                      onChange={handleChange}
                      placeholder="Ej: Nuevo, Popular, Premium"
                      maxLength={30}
                      className="focus:ring-primary/20 focus:border-primary w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  {/* Price suffix */}
                  <div>
                    <label
                      htmlFor="product-price-suffix"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Sufijo de Precio
                    </label>
                    <input
                      id="product-price-suffix"
                      name="price_suffix"
                      value={formData.price_suffix}
                      onChange={handleChange}
                      placeholder="Ej: /unidad, /set, c/u"
                      maxLength={20}
                      className="focus:ring-primary/20 focus:border-primary w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  {/* Material */}
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="product-material"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Material / Tela
                    </label>
                    <input
                      id="product-material"
                      name="material"
                      value={formData.material}
                      onChange={handleChange}
                      placeholder="Ej: Sincatex, Lino Oxford, Poliéster..."
                      maxLength={100}
                      className="focus:ring-primary/20 focus:border-primary w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                  </div>
                  {/* Tallas */}
                  <div className="sm:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Tallas Disponibles
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "XS",
                        "S",
                        "M",
                        "L",
                        "XL",
                        "XXL",
                        "3XL",
                        "Única",
                        "A la medida",
                      ].map((talla) => (
                        <button
                          key={talla}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              tallas: prev.tallas.includes(talla)
                                ? prev.tallas.filter((t) => t !== talla)
                                : [...prev.tallas, talla],
                            }));
                          }}
                          className={`rounded-lg border px-3 py-1 text-xs font-semibold transition-colors ${
                            formData.tallas.includes(talla)
                              ? "bg-primary border-primary text-white"
                              : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
                          }`}
                        >
                          {talla}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Características (bullets con check en la vista pública) */}
                  <div className="sm:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Características del Producto{" "}
                      <span className="font-normal text-slate-400">
                        (se muestran como lista con ✔ en la ficha)
                      </span>
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        id="caracteristica-input"
                        value={caracteristicaInput}
                        onChange={(e) => setCaracteristicaInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && caracteristicaInput.trim()) {
                            e.preventDefault();
                            const item = caracteristicaInput.trim();
                            if (!formData.caracteristicas.includes(item)) {
                              setFormData((prev) => ({
                                ...prev,
                                caracteristicas: [
                                  ...prev.caracteristicas,
                                  item,
                                ],
                              }));
                            }
                            setCaracteristicaInput("");
                          }
                        }}
                        placeholder="Ej: Tela anti-ácida, bolsillos funcionales... (Enter para agregar)"
                        className="focus:ring-primary/20 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const item = caracteristicaInput.trim();
                          if (
                            item &&
                            !formData.caracteristicas.includes(item)
                          ) {
                            setFormData((prev) => ({
                              ...prev,
                              caracteristicas: [...prev.caracteristicas, item],
                            }));
                            setCaracteristicaInput("");
                          }
                        }}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20"
                      >
                        Agregar
                      </button>
                    </div>
                    {formData.caracteristicas.length > 0 && (
                      <ul className="mt-2 flex flex-col gap-1">
                        {formData.caracteristicas.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-center justify-between gap-2 rounded-lg bg-white px-3 py-1.5 text-xs text-slate-700 shadow-sm dark:bg-white/5 dark:text-slate-300"
                          >
                            <span className="flex items-center gap-1.5">
                              <span
                                className="material-symbols-outlined text-primary"
                                style={{ fontSize: "14px" }}
                              >
                                check_circle
                              </span>
                              {item}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  caracteristicas: prev.caracteristicas.filter(
                                    (_, i) => i !== idx
                                  ),
                                }))
                              }
                              className="text-slate-400 hover:text-red-500"
                              aria-label={`Eliminar característica: ${item}`}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "14px" }}
                              >
                                close
                              </span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  {/* Colores disponibles */}
                  <div className="sm:col-span-2">
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Colores Disponibles{" "}
                      <span className="font-normal text-slate-400">
                        (se muestran como círculos de color en la ficha)
                      </span>
                    </span>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={colorInput.name}
                        onChange={(e) =>
                          setColorInput((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Nombre del color (ej: Azul marino)"
                        className="focus:ring-primary/20 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        id="color-name-input"
                      />
                      <input
                        type="color"
                        value={colorInput.hex}
                        onChange={(e) =>
                          setColorInput((prev) => ({
                            ...prev,
                            hex: e.target.value,
                          }))
                        }
                        aria-label="Seleccionar color"
                        className="h-10 w-12 cursor-pointer rounded-lg border border-slate-200 bg-white p-1 dark:border-white/10"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (
                            colorInput.name.trim() &&
                            !formData.colores.some(
                              (c) => c.name === colorInput.name.trim()
                            )
                          ) {
                            setFormData((prev) => ({
                              ...prev,
                              colores: [
                                ...prev.colores,
                                {
                                  name: colorInput.name.trim(),
                                  hex: colorInput.hex,
                                },
                              ],
                            }));
                            setColorInput({ name: "", hex: "#000000" });
                          }
                        }}
                        className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20"
                      >
                        Agregar
                      </button>
                    </div>
                    {formData.colores.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {formData.colores.map((color, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700 shadow-sm dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
                          >
                            <span
                              className="h-4 w-4 rounded-full border border-slate-200 shadow-sm"
                              style={{ backgroundColor: color.hex }}
                            />
                            {color.name}
                            <button
                              type="button"
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  colores: prev.colores.filter(
                                    (_, i) => i !== idx
                                  ),
                                }))
                              }
                              className="text-slate-400 hover:text-red-500"
                              aria-label={`Eliminar color: ${color.name}`}
                            >
                              <span
                                className="material-symbols-outlined"
                                style={{ fontSize: "12px" }}
                              >
                                close
                              </span>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
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

              {/* ─── SEO Manual ─────────────────────────────────────────── */}
              <div className="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4 md:col-span-2 dark:border-emerald-500/20 dark:bg-emerald-500/5">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontSize: "20px" }}
                  >
                    manage_search
                  </span>
                  <h4 className="text-sm font-bold">SEO del Producto</h4>
                  <span className="ml-auto text-[10px] font-normal text-slate-400">
                    Opcional
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Si dejas un campo vacío, el sistema usará automáticamente el
                  valor generado desde el nombre y descripción del producto.
                </p>

                {/* SEO Title */}
                <div>
                  <label
                    htmlFor="product-seo-title"
                    className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Título SEO
                  </label>
                  <input
                    id="product-seo-title"
                    name="seo_title"
                    value={formData.seo_title}
                    onChange={handleChange}
                    placeholder="Dejar vacío para usar el título automático"
                    maxLength={70}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <p className="mt-0.5 text-right text-[10px] text-slate-400">
                    {(formData.seo_title || "").length}/70 caracteres
                  </p>
                </div>

                {/* SEO Description */}
                <div>
                  <label
                    htmlFor="product-seo-description"
                    className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Meta Descripción
                  </label>
                  <textarea
                    id="product-seo-description"
                    name="seo_description"
                    value={formData.seo_description}
                    onChange={handleChange}
                    rows={2}
                    maxLength={160}
                    placeholder="Dejar vacío para usar la descripción corta del producto"
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                  <p className="mt-0.5 text-right text-[10px] text-slate-400">
                    {(formData.seo_description || "").length}/160 caracteres
                  </p>
                </div>

                {/* Keywords */}
                <div>
                  <label
                    htmlFor="product-seo-keywords"
                    className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Palabras Clave{" "}
                    <span className="font-normal text-slate-400">
                      (separadas por coma)
                    </span>
                  </label>
                  <input
                    id="product-seo-keywords"
                    name="seo_keywords"
                    value={formData.seo_keywords}
                    onChange={handleChange}
                    placeholder="Dejar vacío si no aplica. Ej: scrubs médicos, uniformes San Miguel"
                    maxLength={300}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                {/* Publisher */}
                <div>
                  <label
                    htmlFor="product-seo-publisher"
                    className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                  >
                    Publisher{" "}
                    <span className="font-normal text-slate-400">
                      (nombre de la marca/publicador)
                    </span>
                  </label>
                  <input
                    id="product-seo-publisher"
                    name="seo_publisher"
                    value={formData.seo_publisher}
                    onChange={handleChange}
                    placeholder="Dejar vacío para usar: Confecciones Liss"
                    maxLength={100}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 transition-all outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40 dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>

                {/* X-Robots-Tag — botones seleccionables (mismo patrón que Tallas) */}
                <div>
                  <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                    Indexación (X-Robots-Tag){" "}
                    <span className="font-normal text-slate-400">
                      (por defecto: index, follow)
                    </span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: "", label: "Auto (index, follow)" },
                      { value: "index, follow", label: "index, follow" },
                      {
                        value: "noindex, follow",
                        label: "noindex, follow",
                      },
                      {
                        value: "index, nofollow",
                        label: "index, nofollow",
                      },
                      {
                        value: "noindex, nofollow",
                        label: "noindex, nofollow",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.value || "auto"}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            seo_robots: opt.value,
                          }))
                        }
                        className={`rounded-lg border px-3 py-1 text-xs font-semibold transition-colors ${
                          formData.seo_robots === opt.value
                            ? "border-emerald-500 bg-emerald-600 text-white"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-white/10 dark:bg-white/5 dark:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="mt-1 text-[10px] text-slate-400">
                    &ldquo;Auto&rdquo; aplica el comportamiento predeterminado
                    del sitio (index, follow).
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div
          className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4 dark:border-white/5 dark:bg-white/5"
          aria-live="polite"
        >
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl px-4 py-2 font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"
          >
            Cancelar
          </button>

          {/* Notification toggle — visible for both create and edit */}
          <label
            className={`flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              notifyOnSave
                ? formData.old_price
                  ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                  : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10"
            }`}
          >
            <input
              type="checkbox"
              checked={notifyOnSave}
              onChange={(e) => setNotifyOnSave(e.target.checked)}
              className="sr-only"
              aria-label="Notificar a suscriptores"
            />
            <span
              className="material-symbols-outlined text-[18px]"
              aria-hidden="true"
            >
              {formData.old_price ? "local_offer" : "campaign"}
            </span>
            {formData.old_price
              ? "Notificar como oferta"
              : "Notificar a suscriptores"}
          </label>

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
