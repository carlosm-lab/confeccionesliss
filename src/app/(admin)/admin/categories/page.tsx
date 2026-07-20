"use client";
import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { generateSlug } from "@/lib/slug";
import { useConfirm } from "@/context/ConfirmContext";
import { invalidateCategoryCache } from "@/hooks/useCategories";
import { revalidateAfterCategorySave } from "@/actions/categories";
import {
  CATALOGS,
  CATALOGS_GENERAL,
  CATALOGS_UNIVERSITY,
} from "@/config/catalogs";
import { CustomSelect } from "@/components/ui/CustomSelect";

interface Category {
  id: string;
  name: string;
  slug: string;
  catalog: string | null;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);
  const [filterCatalog, setFilterCatalog] = useState<string>("");

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3500);
  };

  const [isEditing, setIsEditing] = useState(false);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
  const [currentCat, setCurrentCat] = useState<Category>({
    id: "",
    name: "",
    slug: "",
    catalog: null,
  });

  const confirm = useConfirm();

  // Determina si el catalogo seleccionado es una universidad
  const isUniversityCatalog =
    currentCat.catalog != null &&
    CATALOGS_UNIVERSITY.some((u) => u.value === currentCat.catalog);

  // ── Fetch ───────────────────────────────────────────────────────────────────
  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("categories")
        .select("id, name, slug, catalog")
        .order("catalog", { ascending: true, nullsFirst: false })
        .order("name");
      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      logger.error("Error:", error);
      showToast("Error cargando categorias", false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    if (isEditing || slugManuallyEdited) {
      setCurrentCat((prev) => ({ ...prev, name }));
      return;
    }
    const slugBase = generateSlug(name);
    const isUniv =
      currentCat.catalog &&
      CATALOGS_UNIVERSITY.some((u) => u.value === currentCat.catalog);
    const slug =
      isUniv && !slugBase.startsWith(`${currentCat.catalog}-`)
        ? `${currentCat.catalog}-${slugBase}`
        : slugBase;
    setCurrentCat((prev) => ({ ...prev, name, slug }));
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlugManuallyEdited(true);
    setCurrentCat((prev) => ({ ...prev, slug: e.target.value }));
  };

  const handleCatalogChange = (value: string) => {
    setCurrentCat((prev) => {
      const catalog = value || null;
      let slug = prev.slug;
      if (!isEditing && !slugManuallyEdited && prev.name) {
        const slugBase = generateSlug(prev.name);
        const isUniv =
          catalog && CATALOGS_UNIVERSITY.some((u) => u.value === catalog);
        slug = isUniv ? `${catalog}-${slugBase}` : slugBase;
      }
      return { ...prev, catalog, slug };
    });
  };

  const handleEdit = (cat: Category) => {
    setCurrentCat(cat);
    setIsEditing(true);
    setSlugManuallyEdited(false);
  };

  const handleCancelEdit = () => {
    setCurrentCat({ id: "", name: "", slug: "", catalog: null });
    setSlugManuallyEdited(false);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentCat.name || !currentCat.slug) {
      showToast("Por favor completa nombre y slug", false);
      return;
    }
    if (!currentCat.catalog) {
      showToast("Por favor selecciona un catalogo", false);
      return;
    }

    setIsSaving(true);
    try {
      const supabase = getSupabaseClient();
      const payload = {
        name: currentCat.name,
        slug: currentCat.slug,
        catalog: currentCat.catalog || null,
      };

      if (isEditing) {
        const { error } = await supabase
          .from("categories")
          .update(payload)
          .eq("id", currentCat.id);
        if (error) throw error;
        showToast("Categoria actualizada");
      } else {
        const { error } = await supabase.from("categories").insert([payload]);
        if (error) throw error;
        showToast("Categoria creada");
      }

      setCurrentCat({ id: "", name: "", slug: "", catalog: null });
      setSlugManuallyEdited(false);
      setIsEditing(false);
      invalidateCategoryCache();
      await revalidateAfterCategorySave();
      fetchCategories();
    } catch (error: unknown) {
      logger.error("Error saving:", error);
      const msg = (error as { message?: string })?.message || "";
      showToast(
        msg.includes("unique constraint")
          ? "El slug ya existe."
          : "Error al guardar.",
        false
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = await confirm({
      title: "Eliminar categoria",
      message:
        "Estas seguro de eliminar esta categoria? Si hay productos asociados no se mostraran correctamente.",
      confirmText: "Si, eliminar",
      cancelText: "Cancelar",
      type: "danger",
    });
    if (!isConfirmed) return;

    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.from("categories").delete().eq("id", id);
      if (error) throw error;
      showToast("Categoria eliminada");
      invalidateCategoryCache();
      await revalidateAfterCategorySave();
      fetchCategories();
    } catch (error) {
      logger.error("Error delete:", error);
      showToast("Error al eliminar", false);
    }
  };

  // ── Derived state ────────────────────────────────────────────────────────────
  const inputClass =
    "w-full px-4 py-2.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary text-slate-900 dark:text-white outline-none transition-all";

  const presentCatalogs = Array.from(
    new Set(categories.map((c) => c.catalog || "__none__"))
  );

  const filteredCategories = filterCatalog
    ? filterCatalog === "__none__"
      ? categories.filter((c) => !c.catalog)
      : categories.filter((c) => c.catalog === filterCatalog)
    : categories;

  // Resolver la info del catalogo para mostrar en la lista
  const getCatalogInfo = (catalogValue: string | null) => {
    if (!catalogValue) return null;
    return CATALOGS.find((c) => c.value === catalogValue) ?? null;
  };

  return (
    <div className="flex h-full w-full max-w-[1400px] flex-col">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[300] flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold shadow-lg ${toast.ok ? "bg-green-600 text-white" : "bg-red-600 text-white"}`}
        >
          <span className="material-symbols-outlined text-[18px]">
            {toast.ok ? "check_circle" : "error"}
          </span>
          {toast.msg}
        </div>
      )}

      <div className="mb-6 shrink-0">
        <h1 className="mb-1 text-3xl font-bold text-slate-900 dark:text-white">
          Categorias
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Administra las subcategorias dentro de cada catalogo de Confecciones
          Liss.
        </p>
      </div>

      <div className="bg-primary/5 border-primary/20 mb-6 flex shrink-0 gap-3 rounded-2xl border p-4">
        <span className="material-symbols-outlined text-primary mt-0.5 shrink-0 text-[22px]">
          info
        </span>
        <div className="text-primary/90 dark:text-primary/70 text-sm">
          <p className="mb-1 font-bold">Arquitectura de catalogos</p>
          <p>
            Los <strong>catalogos generales</strong> (Scrubs, Escolar…) usan la
            ruta{" "}
            <code className="bg-primary/10 rounded px-1 text-xs">
              /catalogo/[sector]/[producto]
            </code>
            . Los <strong>catalogos universitarios</strong> (UNIVO, UGB…) usan{" "}
            <code className="bg-primary/10 rounded px-1 text-xs">
              /catalogo/universidades/[universidad]/[producto]
            </code>
            . Selecciona la universidad directamente como catalogo — cada una es
            su propio catalogo en la base de datos.
          </p>
        </div>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 md:grid-cols-3">
        {/* Form */}
        <div className="flex min-h-0 flex-col md:col-span-1 md:h-full">
          <div className="border-primary/30 dark:border-primary/20 flex flex-1 flex-col rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
            <h2 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
              {isEditing ? "Editar Categoria" : "Nueva Categoria"}
            </h2>
            <form
              onSubmit={handleSubmit}
              className="flex flex-1 flex-col gap-4"
            >
              {/* Catalogo */}
              <div>
                <label
                  htmlFor="cat-catalog"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Catalogo <span className="text-red-500">*</span>
                </label>
                <CustomSelect
                  id="cat-catalog"
                  options={[
                    {
                      value: "__group_general__",
                      label: "── Catalogos generales ──",
                    },
                    ...CATALOGS_GENERAL.map((c) => ({
                      value: c.value,
                      label: c.label,
                    })),
                    { value: "__group_univ__", label: "── Universidades ──" },
                    ...CATALOGS_UNIVERSITY.map((c) => ({
                      value: c.value,
                      label: c.label,
                    })),
                  ].filter((o) => !o.value.startsWith("__group_"))}
                  value={currentCat.catalog || ""}
                  onChange={handleCatalogChange}
                  placeholder="Seleccionar catalogo..."
                />
                {isUniversityCatalog && (
                  <p className="mt-1 text-xs text-violet-600 dark:text-violet-400">
                    <span className="material-symbols-outlined align-middle text-[13px]">
                      school
                    </span>{" "}
                    Catalogo universitario — las categorias creadas aqui
                    apareceran como carreras en la pagina de esa universidad.
                  </p>
                )}
              </div>

              {/* Nombre */}
              <div>
                <label
                  htmlFor="cat-name"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {isUniversityCatalog ? "Carrera / Subcategoria" : "Nombre"}
                </label>
                <input
                  id="cat-name"
                  type="text"
                  required
                  value={currentCat.name}
                  onChange={handleNameChange}
                  placeholder={
                    isUniversityCatalog ? "Ej. Enfermeria" : "Ej. Scrubs Azules"
                  }
                  className={inputClass}
                />
              </div>

              {/* Slug */}
              <div>
                <label
                  htmlFor="cat-slug"
                  className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Slug (URL amigable)
                </label>
                <input
                  id="cat-slug"
                  type="text"
                  required
                  value={currentCat.slug}
                  onChange={handleSlugChange}
                  placeholder={
                    isUniversityCatalog ? "enfermeria" : "scrubs-azules"
                  }
                  className={inputClass}
                />
                <p className="mt-1 text-xs text-slate-500">
                  Unico. Minusculas, numeros y guiones.
                </p>
                {slugManuallyEdited && !isEditing && (
                  <button
                    type="button"
                    className="text-primary mt-1 text-xs underline"
                    onClick={() => {
                      setCurrentCat((prev) => ({
                        ...prev,
                        slug: generateSlug(prev.name),
                      }));
                      setSlugManuallyEdited(false);
                    }}
                  >
                    Volver a auto-generar
                  </button>
                )}
              </div>

              <div className="flex-1" />

              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-xl py-2 font-bold text-white shadow-sm transition-colors disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/20 border-t-white"></span>
                      Guardando...
                    </>
                  ) : isEditing ? (
                    "Guardar Cambios"
                  ) : (
                    "Crear Categoria"
                  )}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="w-full rounded-xl bg-slate-100 py-2 font-medium text-slate-700 transition-colors hover:bg-slate-200 dark:bg-white/10 dark:text-slate-200 dark:hover:bg-white/20"
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="flex min-h-0 flex-col gap-4 md:col-span-2 md:h-full">
          {/* Catalog filter tabs */}
          <div className="flex shrink-0 flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterCatalog("")}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${!filterCatalog ? "bg-primary text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"}`}
            >
              Todos ({categories.length})
            </button>

            {/* Tabs de catalogos generales */}
            {CATALOGS_GENERAL.filter((c) =>
              presentCatalogs.includes(c.value)
            ).map((c) => {
              const count = categories.filter(
                (cat) => cat.catalog === c.value
              ).length;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setFilterCatalog(c.value)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${filterCatalog === c.value ? "bg-primary text-white shadow-sm" : "border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10"}`}
                >
                  {c.label} ({count})
                </button>
              );
            })}

            {/* Tabs de universidades */}
            {CATALOGS_UNIVERSITY.filter((c) =>
              presentCatalogs.includes(c.value)
            ).map((c) => {
              const count = categories.filter(
                (cat) => cat.catalog === c.value
              ).length;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setFilterCatalog(c.value)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold uppercase transition-colors ${filterCatalog === c.value ? "bg-violet-600 text-white shadow-sm" : "border border-violet-200 bg-white text-violet-600 hover:bg-violet-50 dark:border-violet-700 dark:bg-white/5 dark:text-violet-300 dark:hover:bg-violet-900/20"}`}
                >
                  {c.value} ({count})
                </button>
              );
            })}

            {presentCatalogs.includes("__none__") && (
              <button
                type="button"
                onClick={() => setFilterCatalog("__none__")}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-colors ${filterCatalog === "__none__" ? "bg-amber-500 text-white" : "bg-amber-50 text-amber-700 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:hover:bg-amber-500/20"}`}
              >
                Sin catalogo ({categories.filter((c) => !c.catalog).length})
              </button>
            )}
          </div>

          {/* Category list */}
          <div className="custom-scrollbar border-primary/30 dark:border-primary/20 min-h-0 flex-1 overflow-y-auto rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
            {isLoading ? (
              <div className="flex justify-center p-8">
                <div className="border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border-4"></div>
              </div>
            ) : filteredCategories.length === 0 ? (
              <div className="p-12 text-center">
                <span className="material-symbols-outlined mb-3 block text-4xl text-slate-300">
                  category
                </span>
                <p className="text-slate-500">
                  {filterCatalog
                    ? "No hay categorias en este catalogo."
                    : "No hay categorias. Crea una primera."}
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-100 dark:divide-white/5">
                {filteredCategories.map((cat) => {
                  const catalogInfo = getCatalogInfo(cat.catalog);
                  const isUniv = CATALOGS_UNIVERSITY.some(
                    (u) => u.value === cat.catalog
                  );
                  return (
                    <li
                      key={cat.id}
                      className="flex items-center justify-between gap-3 p-4 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {catalogInfo ? (
                            <span
                              className={`inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase ${isUniv ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" : "bg-primary/10 text-primary"}`}
                            >
                              <span className="material-symbols-outlined text-[12px]">
                                {catalogInfo.icon}
                              </span>
                              {cat.catalog}
                            </span>
                          ) : (
                            <span className="inline-flex shrink-0 items-center gap-1 rounded-lg bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                              Sin catalogo
                            </span>
                          )}
                          <p className="truncate font-bold text-slate-900 dark:text-white">
                            {cat.name}
                          </p>
                        </div>
                        <p className="mt-0.5 font-mono text-sm text-slate-500">
                          {cat.slug}
                        </p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        <button
                          onClick={() => handleEdit(cat)}
                          aria-label={`Editar ${cat.name}`}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            edit
                          </span>
                        </button>
                        <button
                          onClick={() => handleDelete(cat.id)}
                          aria-label={`Eliminar ${cat.name}`}
                          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        >
                          <span className="material-symbols-outlined text-[20px]">
                            delete
                          </span>
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
