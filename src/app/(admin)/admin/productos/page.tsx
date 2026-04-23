"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const PRODUCTS = [
  {
    id: "1",
    name: "Filipina Quirúrgica Clásica",
    sku: "FQ-MARINO-01",
    category: "Filipinas",
    catalog: "Sector Salud",
    price: "$450.00",
    sizes: [
      { label: "XS", available: false },
      { label: "S", available: true },
      { label: "M", available: true },
      { label: "L", available: true },
      { label: "XL", available: false },
    ],
    status: "Activo" as const,
    starred: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBxAD87IX8vat5M6yx31yQDZQtsvxI5dU4zkRoj_yOAl9nFNvWTfj5LB5OqM88Nm7RS-BFgtNYQCVZPXYzgo8QfN38jhBpJwioWeuTk3rA0ZbWqCZLD9X9T1z63gfn4O9Dk9GumuMnp9WH5Q_GlsWrDn6X-_NU-5dDfvjNelluFVeUzvjy4iZYKlA2fUO95M3sRhS7f57lkRTgNe2IYVIZcOpXGsH5tab7dAsfUA-xMjbxfRWXrq7fvl7Iod6PISuvpoRDCkI_koYOr",
  },
  {
    id: "2",
    name: "Bata de Laboratorio Premium",
    sku: "BL-BLANCA-02",
    category: "Batas",
    catalog: "Universidades",
    price: "-",
    sizes: [
      { label: "S", available: false },
      { label: "M", available: false },
      { label: "L", available: false },
    ],
    status: "Borrador" as const,
    starred: false,
    image: null,
  },
  {
    id: "3",
    name: "Pantalón Cargo Médico",
    sku: "PT-VERDE-03",
    category: "Pantalones",
    catalog: "Sector Salud",
    price: "$380.00",
    sizes: [
      { label: "S", available: false },
      { label: "M", available: false },
    ],
    status: "Inactivo" as const,
    starred: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLdPioq3FocMiL06Izea8ZWtSrNCk6X2R0Rh3YtYuNFtflcbzraL9tmugVOOHYSRKNvHEpnkOLS2127CB_7pXDeEAz2Tsn9pe5zG5l0rIrMCm9lkK5gAIvb49oKNprXB0rqY8FYu2qpjMwWe3WNL2cI0D45b1MtHpBTL3BMSWueNhEW2v4LO8yoRrtMaVmqyqg6RsBdL9Y0TESWAlzbq1v4gIdHOkXJhbf6wQxgDIEBCpww_JGIiwv1I3cdlf8OuL4EC-7h81TQHvR",
  },
];

const BADGE_STYLES = {
  Activo: "bg-emerald-500/10 text-emerald-800",
  Borrador: "bg-amber-500/10 text-amber-800",
  Inactivo: "bg-surface-container-high text-on-surface-variant",
} as const;

const DOT_STYLES = {
  Activo: "bg-emerald-500",
  Borrador: "bg-amber-500",
  Inactivo: "bg-slate-400",
} as const;

export default function AdminProductosPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string[]>(["1"]);

  const toggleSelect = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );

  return (
    <main className="mx-auto max-w-7xl flex-grow space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="bg-surface-container-lowest flex flex-col justify-between gap-4 rounded-lg p-6 shadow-[0_8px_24px_rgba(20,48,103,0.04)] md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <h1 className="font-headline text-primary-container text-3xl font-bold">
            Productos
          </h1>
          <span className="bg-surface-container-low text-on-surface-variant rounded-full px-3 py-1 text-sm font-medium">
            1,248 total
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="border-outline-variant text-on-surface hover:bg-surface-container-low flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-sm">download</span>{" "}
            Exportar
          </button>
          <button
            type="button"
            className="bg-primary-container hover:bg-primary flex items-center gap-2 rounded-lg px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors"
          >
            <span className="material-symbols-outlined text-sm">add</span>{" "}
            Agregar producto
          </button>
        </div>
      </header>

      {/* Filter Bar */}
      <section className="bg-surface-container-lowest flex flex-col items-center justify-between gap-4 rounded-lg p-4 shadow-[0_8px_24px_rgba(20,48,103,0.04)] lg:flex-row">
        <div className="relative w-full lg:w-1/3">
          <span className="material-symbols-outlined text-outline absolute top-1/2 left-3 -translate-y-1/2">
            search
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por nombre o SKU..."
            className="bg-surface-container-low text-on-surface placeholder:text-outline focus:bg-surface-container-lowest focus:ring-primary w-full rounded border-none py-2 pr-4 pl-10 text-sm transition-all focus:ring-1"
          />
        </div>
        <div className="flex w-full flex-wrap items-center gap-3 lg:w-auto">
          <div className="relative min-w-[140px]">
            <select className="bg-surface-container-low text-on-surface focus:bg-surface-container-lowest focus:ring-primary w-full cursor-pointer appearance-none rounded border-none py-2 pr-8 pl-3 text-sm focus:ring-1">
              <option value="">Categoría (Todas)</option>
              <option value="filipinas">Filipinas</option>
              <option value="pantalones">Pantalones</option>
              <option value="batas">Batas</option>
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-lg">
              arrow_drop_down
            </span>
          </div>
          <div className="relative min-w-[140px]">
            <select className="bg-surface-container-low text-on-surface focus:bg-surface-container-lowest focus:ring-primary w-full cursor-pointer appearance-none rounded border-none py-2 pr-8 pl-3 text-sm focus:ring-1">
              <option value="todos">Estado: Todos</option>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
              <option value="borrador">Borrador</option>
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-lg">
              arrow_drop_down
            </span>
          </div>
          <div className="relative min-w-[160px]">
            <select className="bg-surface-container-low text-on-surface focus:bg-surface-container-lowest focus:ring-primary w-full cursor-pointer appearance-none rounded border-none py-2 pr-8 pl-3 text-sm focus:ring-1">
              <option value="">Catálogo (Todos)</option>
              <option value="salud">Sector Salud</option>
              <option value="universidades">Universidades</option>
              <option value="escuelas">Escuelas</option>
              <option value="empresas">Empresas</option>
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-lg">
              arrow_drop_down
            </span>
          </div>
        </div>
      </section>

      {/* Table */}
      <div className="relative">
        <div className="bg-surface-container-lowest overflow-x-auto rounded-lg pb-16 shadow-[0_8px_24px_rgba(20,48,103,0.04)]">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-outline-variant/15 bg-surface-container-low/50 text-on-surface-variant border-b text-xs tracking-wider uppercase">
                <th className="w-12 p-4 text-center">
                  <input
                    type="checkbox"
                    className="border-outline-variant text-primary-container cursor-pointer rounded-sm"
                  />
                </th>
                <th className="p-4 font-medium">Producto</th>
                <th className="p-4 font-medium">Categoría / Catálogo</th>
                <th className="p-4 font-medium">Precio</th>
                <th className="p-4 font-medium">Tallas</th>
                <th className="p-4 font-medium">Estado</th>
                <th className="p-4 text-center font-medium">Fav</th>
                <th className="p-4 text-right font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {PRODUCTS.map((p) => (
                <tr
                  key={p.id}
                  className={cn(
                    "group border-outline-variant/5 border-b transition-colors hover:bg-[#f0f4ff]",
                    p.status === "Inactivo" && "opacity-75 hover:opacity-100"
                  )}
                >
                  <td className="p-4 text-center">
                    <input
                      type="checkbox"
                      checked={selected.includes(p.id)}
                      onChange={() => toggleSelect(p.id)}
                      className="border-outline-variant text-primary-container cursor-pointer rounded-sm"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "border-outline-variant/20 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded border",
                          p.image
                            ? "bg-surface-container-low"
                            : "bg-surface-container-high text-outline",
                          p.status === "Inactivo" && "grayscale"
                        )}
                      >
                        {p.image ? (
                          <Image
                            src={p.image}
                            alt={p.name}
                            width={48}
                            height={48}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="material-symbols-outlined">
                            image
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="text-primary-container group-hover:text-primary cursor-pointer font-semibold transition-colors">
                          {p.name}
                        </p>
                        <p className="text-secondary mt-0.5 font-mono text-xs">
                          SKU: {p.sku}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-on-surface">{p.category}</p>
                    <p className="text-outline mt-0.5 text-xs">{p.catalog}</p>
                  </td>
                  <td className="text-on-surface p-4 font-medium">{p.price}</td>
                  <td className="p-4">
                    <div
                      className={cn(
                        "flex flex-wrap gap-1",
                        p.status === "Borrador" && "opacity-50"
                      )}
                    >
                      {p.sizes.map((s) => (
                        <span
                          key={s.label}
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded text-xs font-medium",
                            s.available
                              ? "bg-primary-container text-white"
                              : "bg-surface-container-high text-on-surface",
                            !s.available &&
                              p.status === "Activo" &&
                              "opacity-50"
                          )}
                        >
                          {s.label}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                        BADGE_STYLES[p.status]
                      )}
                    >
                      <span
                        className={cn(
                          "mr-1.5 h-1.5 w-1.5 rounded-full",
                          DOT_STYLES[p.status]
                        )}
                      ></span>{" "}
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      type="button"
                      className={cn(
                        "transition-all hover:scale-110",
                        p.starred
                          ? "text-primary-container"
                          : "text-outline hover:text-primary-container"
                      )}
                    >
                      <span
                        className="material-symbols-outlined"
                        style={
                          p.starred
                            ? { fontVariationSettings: "'FILL' 1" }
                            : undefined
                        }
                      >
                        star
                      </span>
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        className="text-primary-container rounded p-1.5 transition-colors hover:bg-white"
                        title="Editar"
                      >
                        <span className="material-symbols-outlined text-sm">
                          edit
                        </span>
                      </button>
                      <button
                        type="button"
                        className="text-secondary rounded p-1.5 transition-colors hover:bg-white"
                        title="Duplicar"
                      >
                        <span className="material-symbols-outlined text-sm">
                          content_copy
                        </span>
                      </button>
                      <button
                        type="button"
                        className="text-tertiary-container rounded p-1.5 transition-colors hover:bg-white"
                        title="Eliminar"
                      >
                        <span className="material-symbols-outlined text-sm">
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
        {/* Bulk Action Bar */}
        {selected.length > 0 && (
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-6 rounded-full border border-white/10 bg-[#143067]/85 px-6 py-3 text-white shadow-xl backdrop-blur-md">
            <span className="text-sm font-medium whitespace-nowrap">
              {selected.length} ítem{selected.length > 1 ? "s" : ""}{" "}
              seleccionado{selected.length > 1 ? "s" : ""}
            </span>
            <div className="h-5 w-px bg-white/20"></div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="text-sm font-medium transition-colors hover:text-emerald-300"
              >
                Activar
              </button>
              <button
                type="button"
                className="text-sm font-medium transition-colors hover:text-slate-300"
              >
                Desactivar
              </button>
              <button
                type="button"
                className="text-sm font-medium text-[#ffb4a9] transition-colors hover:text-white"
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="text-on-surface-variant flex flex-col items-center justify-between pt-2 text-sm sm:flex-row">
        <div className="mb-4 flex items-center gap-2 sm:mb-0">
          <span>Mostrar</span>
          <select className="bg-surface-container-lowest focus:ring-primary cursor-pointer rounded border-none px-2 py-1 text-sm shadow-sm focus:ring-1">
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>por página</span>
        </div>
        <div className="bg-surface-container-lowest flex items-center gap-1 rounded-lg p-1 shadow-[0_8px_24px_rgba(20,48,103,0.04)]">
          <button
            type="button"
            className="text-outline hover:bg-surface-container-low rounded p-1 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_left
            </span>
          </button>
          <button
            type="button"
            className="bg-primary-container flex h-8 w-8 items-center justify-center rounded text-sm font-medium text-white"
          >
            1
          </button>
          <button
            type="button"
            className="text-on-surface hover:bg-surface-container-low flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors"
          >
            2
          </button>
          <button
            type="button"
            className="text-on-surface hover:bg-surface-container-low flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors"
          >
            3
          </button>
          <span className="text-outline px-1">...</span>
          <button
            type="button"
            className="text-on-surface hover:bg-surface-container-low flex h-8 w-8 items-center justify-center rounded text-sm font-medium transition-colors"
          >
            12
          </button>
          <button
            type="button"
            className="text-on-surface hover:bg-surface-container-low rounded p-1 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
