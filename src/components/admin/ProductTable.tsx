"use client";
import { useState } from "react";
import Image from "next/image";
import { formatPrice } from "@/lib/formatPrice";
import type { Product } from "@/lib/productUtils";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => Promise<void>;
  isLoading: boolean;
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
  onBulkDelete,
  isLoading,
}: ProductTableProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(products.map((p) => p.id!).filter(Boolean) as string[]);
    } else {
      setSelectedIds([]);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  if (isLoading) {
    return (
      <div className="border-primary/30 dark:border-primary/20 flex w-full animate-pulse flex-col items-center justify-center rounded-2xl border bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <div className="border-primary/20 border-t-primary mb-4 h-12 w-12 animate-spin rounded-full border-4"></div>
        <p className="text-slate-500 dark:text-slate-400">
          Cargando productos...
        </p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="border-primary/30 dark:border-primary/20 flex w-full flex-col items-center justify-center rounded-2xl border bg-white p-12 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 dark:bg-transparent">
          <span className="material-symbols-outlined text-[32px]">
            inventory_2
          </span>
        </div>
        <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
          No hay productos
        </h3>
        <p className="max-w-sm text-center text-slate-500">
          Aún no has agregado productos o ninguno coincide con tu búsqueda.
        </p>
      </div>
    );
  }

  return (
    <div className="border-primary/30 dark:border-primary/20 flex w-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
      {selectedIds.length > 0 && (
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/5 dark:bg-white/5">
          <span className="text-primary text-sm font-medium">
            {selectedIds.length} seleccionado(s)
          </span>
          <button
            onClick={() => {
              onBulkDelete(selectedIds).then(() => setSelectedIds([]));
            }}
            className="flex items-center gap-1 text-sm font-bold text-red-600 hover:text-red-700 dark:text-red-400"
          >
            <span className="material-symbols-outlined text-[18px]">
              delete
            </span>
            Eliminar seleccionados
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50 text-slate-500 dark:bg-transparent dark:text-slate-400">
            <tr>
              <th scope="col" className="w-12 px-6 py-4 text-center">
                <input
                  type="checkbox"
                  checked={
                    products.length > 0 &&
                    selectedIds.length === products.length
                  }
                  onChange={toggleSelectAll}
                  className="text-primary focus:ring-primary/20 rounded border-slate-300 dark:border-white/5"
                  aria-label="Seleccionar todos los productos"
                />
              </th>
              <th scope="col" className="w-24 px-6 py-4 font-semibold">
                Imagen
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Producto
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Precio
              </th>
              <th scope="col" className="px-6 py-4 font-semibold">
                Categoría / Etiquetas
              </th>
              <th
                scope="col"
                className="w-24 px-6 py-4 text-center font-semibold"
              >
                Estado
              </th>
              <th
                scope="col"
                className="w-24 px-6 py-4 text-right font-semibold"
              >
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-white/5">
            {products.map((product) => (
              <tr
                key={product.id}
                className="transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(product.id || "")}
                    onChange={() => toggleSelect(product.id || "")}
                    className="text-primary focus:ring-primary/20 rounded border-slate-300 dark:border-white/5"
                    aria-label={`Seleccionar producto ${product.name}`}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-white/5 dark:bg-transparent">
                    {product.image_path ? (
                      <Image
                        src={product.image_path}
                        alt={product.name || ""}
                        fill
                        className="object-cover"
                        sizes="48px"
                        unoptimized={
                          product.image_path.startsWith("blob:") ||
                          (!product.image_path.includes(".supabase.co") &&
                            !product.image_path.includes(
                              "lh3.googleusercontent.com"
                            ) &&
                            !product.image_path.startsWith("/"))
                        }
                      />
                    ) : (
                      <span className="material-symbols-outlined text-slate-400">
                        image
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="max-w-[200px] truncate font-bold text-slate-900 dark:text-white">
                    {product.name}
                  </p>
                  <p className="max-w-[200px] truncate text-xs text-slate-500">
                    {product.description || "Sin descripción"}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="font-bold text-slate-900 dark:text-white">
                      {formatPrice(product.price)}
                    </span>
                    {product.old_price && (
                      <span className="text-xs text-slate-400 line-through">
                        {formatPrice(product.old_price)}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {(product.categories as { name: string } | null)?.name ||
                      product.category ||
                      "Sin categoría"}
                  </p>
                  <div className="flex max-w-[150px] flex-wrap gap-1">
                    {product.tags &&
                      product.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    {product.tags && product.tags.length > 2 && (
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300">
                        +{product.tags.length - 2}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  {product.is_active ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-bold text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2 py-1 text-xs font-bold text-slate-600 dark:bg-white/5 dark:text-slate-400">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/20"
                      title="Editar"
                      aria-label={`Editar producto ${product.name}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        edit
                      </span>
                    </button>
                    <button
                      onClick={() => onDelete(product.id || "")}
                      className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                      title="Eliminar"
                      aria-label={`Eliminar producto ${product.name}`}
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        delete
                      </span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
