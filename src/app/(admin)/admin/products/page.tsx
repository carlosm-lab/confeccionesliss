"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { getSupabaseClient } from "@/lib/supabaseClient";
import ProductTable from "@/components/admin/ProductTable";
import ProductModal from "@/components/admin/ProductModal";
import { useDebounce } from "@/hooks/useDebounce";
import { logger } from "@/lib/logger";
import { applyActiveOfferFilter } from "@/lib/productUtils";
import { useConfirm } from "@/context/ConfirmContext";
import { collectProductImageFiles } from "@/lib/storageUtils";
import type { Product } from "@/lib/productUtils";
import { env } from "@/env";
import { PRODUCT_SELECT } from "@/lib/catalogService";
import { revalidateAfterProductSave } from "@/actions/catalog";
import { toggleFeaturedProduct } from "@/actions/featuredProducts";

import type { Category } from "@/hooks/useCategories";
import { CATALOGS } from "@/config/catalogs";
import { CustomSelect } from "@/components/ui/CustomSelect";

const PAGE_SIZE = 25;

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [isTogglingFeatured, setIsTogglingFeatured] = useState<string | null>(
    null
  );
  const router = useRouter();

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const pageRef = useRef(0);
  const [hasMore, setHasMore] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [filterCatalog, setFilterCatalog] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterOnSale, setFilterOnSale] = useState(false);

  // Categorías filtradas por catálogo seleccionado
  const filteredCategoryOptions = filterCatalog
    ? categories.filter((c) => c.catalog === filterCatalog)
    : categories;

  const confirm = useConfirm();

  const fetchCategories = useCallback(async () => {
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, catalog, created_at")
        .order("name");
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      logger.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const fetchData = useCallback(
    async (isLoadMore = false) => {
      setIsLoading(true);
      try {
        const currentPage = isLoadMore ? pageRef.current + 1 : 0;
        const supabase = getSupabaseClient();

        let query = supabase
          .from("products")
          .select(PRODUCT_SELECT, { count: "exact" })
          .order("created_at", { ascending: false });

        if (debouncedSearchTerm) {
          const esc = debouncedSearchTerm.replace(/[%_\\]/g, "\\$&");
          query = query.ilike("name", `%${esc}%`);
        }
        // FIX B3: apply catalog filter to the actual DB query
        if (filterCatalog) {
          if (filterCatalog === "universitario") {
            query = query.or(
              `sector.eq.universitario,category.ilike.%univo%,category.ilike.%ieproes%,category.ilike.%ugb%,category.ilike.%unab%,category.ilike.%ues%,category.ilike.%uma%`
            );
          } else {
            const catalogSlugs = categories
              .filter((c) => c.catalog === filterCatalog)
              .map((c) => c.slug);
            if (catalogSlugs.length > 0) {
              query = query.or(
                `sector.eq.${filterCatalog},and(category.in.(${catalogSlugs.join(",")}),sector.is.null)`
              );
            } else {
              query = query.eq("sector", filterCatalog);
            }
          }
        }
        if (filterCategory) query = query.eq("category", filterCategory);
        if (filterOnSale) query = applyActiveOfferFilter(query);

        query = query.range(
          currentPage * PAGE_SIZE,
          (currentPage + 1) * PAGE_SIZE - 1
        );

        const { data, count, error } = await query;
        if (error) throw error;

        if (isLoadMore) {
          setProducts((prev) => [...prev, ...(data || [])]);
        } else {
          setProducts(data || []);
        }
        setTotalCount(count || 0);
        setHasMore((currentPage + 1) * PAGE_SIZE < (count || 0));
        pageRef.current = currentPage;
      } catch (error) {
        logger.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [
      debouncedSearchTerm,
      filterCategory,
      filterOnSale,
      filterCatalog,
      categories,
    ]
  );

  useEffect(() => {
    fetchData(false);
  }, [fetchData]);

  const handleOpenModal = async (product: Product | null = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (
    productData: Partial<Product>,
    _offerRules: unknown[],
    notifyFlag = false
  ) => {
    try {
      const supabase = getSupabaseClient();
      let savedProductId: string | null = null;
      let savedProductName: string = productData.name ?? "Nuevo producto";

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingProduct.id!);
        if (error) throw error;
        savedProductId = editingProduct.id!;
        showToast("Producto actualizado correctamente.");
      } else {
        const { data: inserted, error } = await supabase
          .from("products")
          .insert([productData])
          .select("id")
          .single();
        if (error) throw error;
        savedProductId = inserted?.id ?? null;
        showToast("Producto creado correctamente.");
      }

      // 📣 Publicar y notificar — prioridad: oferta > nuevo producto
      if (notifyFlag && savedProductId) {
        try {
          const hasOffer = !!(
            (
              productData as {
                offer_by_size?: Record<string, number> | null;
              }
            ).offer_by_size &&
            Object.keys(
              (productData as { offer_by_size?: Record<string, number> | null })
                .offer_by_size ?? {}
            ).length > 0
          );
          const sector = productData.sector ?? "catalogo";
          const slug = productData.slug ?? savedProductId;
          const productUrl = `/catalogo/${sector}/${slug}`;

          const notifPayload = hasOffer
            ? {
                type: "new_offer" as const,
                title: `🏷️ Oferta: ${savedProductName}`,
                message: `¡Aprovecha! Hay una oferta especial en "${savedProductName}". Entra y consulta el precio.`,
                target_url: productUrl,
                cta_label: "Ver oferta",
                product_id: savedProductId,
              }
            : {
                type: "new_product" as const,
                title: `✨ Nuevo producto: ${savedProductName}`,
                message:
                  "Hay un nuevo producto disponible en nuestro catálogo. ¡Échale un vistazo!",
                target_url: productUrl,
                cta_label: "Ver producto",
                product_id: savedProductId,
              };

          const { data: notif, error: notifError } = await supabase
            .from("notifications")
            .insert(notifPayload)
            .select("id")
            .single();

          if (notifError) throw notifError;

          if (notif?.id) {
            const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
            const session = (await supabase.auth.getSession()).data.session;
            fetch(`${supabaseUrl}/functions/v1/send-push`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.access_token ?? ""}`,
              },
              body: JSON.stringify({ notification_id: notif.id }),
            }).catch(() => {
              /* silencioso — push best-effort */
            });
          }
        } catch (notifErr) {
          logger.error("Error creando notificación de producto:", notifErr);
        }
      }

      // 🔄 On-Demand Revalidation — invalida las rutas del catálogo público al instante
      // Esto sustituye el ISR por tiempo (revalidate=3600). El admin ve cambios inmediatos.
      try {
        await revalidateAfterProductSave({
          sector: productData.sector ?? "scrubs",
          slug: productData.slug ?? savedProductId ?? "",
          category: productData.category ?? null,
        });
      } catch (revalErr) {
        // No crítico — el catálogo se actualizará en el próximo build
        logger.warn("[admin] revalidateAfterProductSave falló:", revalErr);
      }

      handleCloseModal();
      fetchData();
    } catch (error: unknown) {
      logger.error("Error saving product:", error);
      showToast(`Error guardando: ${(error as Error).message}`, false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    const isConfirmed = await confirm({
      title: "Eliminar producto",
      message:
        "¿Estás seguro de que quieres eliminar este producto de forma permanente? Esta acción no se puede deshacer.",
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      type: "danger",
    });
    if (!isConfirmed) return;

    try {
      const supabase = getSupabaseClient();
      const validFiles = collectProductImageFiles(product);
      if (validFiles.length > 0) {
        const { error: storageError } = await supabase.storage
          .from("product-images")
          .remove(validFiles);
        if (storageError) logger.error("Error deleting images:", storageError);
      }
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", product.id!);
      if (error) throw error;
      showToast("Producto eliminado permanentemente.");
      // 🔄 Revalidar rutas del catálogo al eliminar un producto
      try {
        await revalidateAfterProductSave({
          sector: product.sector ?? "scrubs",
          slug: product.slug ?? product.id ?? "",
          category: product.category ?? null,
        });
      } catch (revalErr) {
        logger.warn(
          "[admin] revalidateAfterProductSave (delete) falló:",
          revalErr
        );
      }
      fetchData(false);
    } catch (error) {
      logger.error("Error deleting product:", error);
      showToast("Error eliminando el producto.", false);
    }
  };

  const handleBulkDelete = async (ids: string[]) => {
    const isConfirmed = await confirm({
      title: "Eliminar productos masivamente",
      message: `¿Estás seguro de que quieres eliminar ${ids.length} productos de forma permanente?`,
      confirmText: "Sí, eliminar todos",
      cancelText: "Cancelar",
      type: "danger",
    });
    if (!isConfirmed) return;

    try {
      const supabase = getSupabaseClient();
      const productsToDelete = products.filter((p) => ids.includes(p.id || ""));
      const validFiles = productsToDelete.flatMap((p) =>
        collectProductImageFiles(p)
      );

      if (validFiles.length > 0) {
        const { error } = await supabase.storage
          .from("product-images")
          .remove(validFiles);
        if (error) logger.error("Error deleting images from storage:", error);
      }

      const { error } = await supabase.from("products").delete().in("id", ids);
      if (error) throw error;
      showToast(`${ids.length} productos eliminados.`);
      fetchData(false);
    } catch (error) {
      logger.error("Error deleting products:", error);
      showToast("Error eliminando los productos.", false);
    }
  };

  const handleToggleFeatured = async (product: Product) => {
    if (!product.id) return;
    setIsTogglingFeatured(product.id);

    try {
      const currentValue = product.is_featured ?? false;
      const result = await toggleFeaturedProduct(product.id, currentValue);

      if (result.success) {
        // Actualizar estado local sin recargar toda la lista
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id ? { ...p, is_featured: result.is_featured } : p
          )
        );
        // Limpiar el Router Cache del cliente para que el home refleje
        // los cambios inmediatamente sin necesidad de un hard refresh.
        router.refresh();
        showToast(
          result.is_featured
            ? "Producto fijado en el home."
            : "Producto desmarcado del home."
        );
      } else {
        showToast(
          result.error ?? "Error al cambiar el estado del producto.",
          false
        );
      }
    } catch (error) {
      logger.error("Error toggling featured product:", error);
      showToast("Error inesperado. Intenta de nuevo.", false);
    } finally {
      setIsTogglingFeatured(null);
    }
  };

  return (
    <div className="flex w-full max-w-[1400px] flex-col">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[300] flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg transition-all ${toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
        >
          <Icon name={toast.ok ? "check_circle" : "error"} size={18} />
          {toast.msg}
        </div>
      )}

      {/* Header & Actions */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">
            Productos
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Gestiona tu catálogo y ofertas.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-primary hover:bg-primary/90 flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 font-bold text-white shadow-sm transition-colors"
        >
          <Icon name="add" size={20} />
          Nuevo Producto
        </button>
      </div>

      {/* Filters Bar */}
      <div className="border-primary/30 dark:border-primary/20 mb-6 flex flex-col flex-wrap gap-3 rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] md:flex-row md:items-center dark:bg-white/5">
        {/* Search */}
        <div className="relative min-w-[220px] flex-1">
          <span className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center leading-[0] text-slate-400">
            <Icon name="search" size={20} className="leading-[0]" />
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* Catalog Filter */}
        <CustomSelect
          leadingIcon="layers"
          options={[
            { value: "", label: "Todos los catálogos" },
            ...CATALOGS.map((c) => ({ value: c.value, label: c.label })),
          ]}
          value={filterCatalog}
          onChange={(value) => {
            setFilterCatalog(value);
            setFilterCategory("");
          }}
          className="w-full md:w-56"
        />

        {/* Category Filter */}
        <CustomSelect
          leadingIcon="filter_list"
          options={[
            { value: "", label: "Todas las subcategorías" },
            ...filteredCategoryOptions.map((cat) => ({
              value: cat.slug,
              label: cat.name,
            })),
          ]}
          value={filterCategory}
          onChange={(value) => setFilterCategory(value)}
          className="w-full md:w-64"
        />

        {/* On Sale Filter */}
        <div className="flex shrink-0 items-center gap-2 px-1 md:ml-auto">
          <input
            type="checkbox"
            id="onSaleFilter"
            checked={filterOnSale}
            onChange={(e) => setFilterOnSale(e.target.checked)}
            className="text-primary focus:ring-primary/20 h-5 w-5 cursor-pointer rounded border-slate-300 outline-none dark:border-white/10"
          />
          <label
            htmlFor="onSaleFilter"
            className="cursor-pointer text-sm font-medium whitespace-nowrap text-slate-700 select-none dark:text-slate-300"
          >
            Solo ofertas activas
          </label>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable
        products={products}
        isLoading={isLoading && products.length === 0}
        onEdit={(product) => handleOpenModal(product)}
        onDelete={(id) => {
          const product = products.find((p) => p.id === id);
          if (product) handleDeleteProduct(product);
        }}
        onBulkDelete={handleBulkDelete}
        onToggleFeatured={handleToggleFeatured}
        isTogglingFeatured={isTogglingFeatured}
      />

      {/* Load More */}
      {hasMore && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => fetchData(true)}
            disabled={isLoading}
            className="flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-2.5 font-bold text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-50 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"
          >
            {isLoading ? (
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-slate-500 border-t-transparent"></span>
            ) : (
              <Icon name="expand_more" size={20} />
            )}
            Cargar más productos
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-slate-500">
        Mostrando {products.length} de {totalCount} productos
      </div>

      {/* Create/Edit Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSaveProduct}
        categories={categories}
      />
    </div>
  );
}
