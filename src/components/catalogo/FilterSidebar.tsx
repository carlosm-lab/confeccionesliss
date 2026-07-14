/**
 * FilterSidebar — Confecciones Liss
 * Rediseño premium del FilterSidebar:
 * - Botones de categoría estilo píldora con micro-animaciones y sombras.
 * - Compartimento de promociones estructurado en una tarjeta con interruptor estilo switch.
 * - Banner promocional flotante al final (desktop-only) que redirige a WhatsApp y rellena el espacio vacío.
 */

import type { FilterGroup } from "@/data/types";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

export interface ActiveFilters {
  [field: string]: string[];
}

interface FilterSidebarProps {
  categoriesGroup: FilterGroup;
  categoryChips?: { label: string; icon: string }[];
  activeFilters: ActiveFilters;
  onFilterToggle: (field: string, value: string) => void;
  onSaleOnly: boolean;
  setOnSaleOnly: (v: boolean) => void;
  isMultiSelect: boolean;
  setIsMultiSelect: (v: boolean) => void;
}

function getCategoryIcon(
  optionLabel: string,
  categoryChips: { label: string; icon: string }[] = [],
  fallbackIcon: string = "checkroom"
): string {
  const cleanLabel = optionLabel.toLowerCase();
  const found = categoryChips.find(
    (chip) =>
      cleanLabel.includes(chip.label.toLowerCase()) ||
      chip.label.toLowerCase().includes(cleanLabel)
  );
  return found ? found.icon : fallbackIcon;
}

export function FilterSidebar({
  categoriesGroup,
  categoryChips = [],
  activeFilters,
  onFilterToggle,
  onSaleOnly,
  setOnSaleOnly,
  isMultiSelect,
  setIsMultiSelect,
}: FilterSidebarProps) {
  const field = categoriesGroup.filterField;
  const selected = activeFilters[field] ?? [];

  return (
    <aside className="hidden max-h-full min-w-[200px] flex-col gap-6 self-start pr-2 lg:flex lg:w-64 lg:shrink-0">
      <div className="relative flex max-h-full flex-col gap-6 overflow-hidden rounded-2xl border border-[rgba(20,48,103,0.35)] bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),_0_0_10px_2px_rgba(20,48,103,0.1)]">
        {/* Marco de bordes punteados (estilo /links) */}
        <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed opacity-60" />

        {/* Categories Section */}
        <div className="relative z-30 flex min-h-0 flex-1 flex-col">
          <h3 className="mb-3 shrink-0 font-sans text-[11px] font-bold tracking-wider text-slate-800 uppercase">
            Categorías
          </h3>

          {/* Seleccionar Varios Toggle */}
          <div className="mb-4 shrink-0 border-b border-slate-100 pb-3">
            <label className="group flex cursor-pointer items-center justify-between">
              <span className="text-[12px] font-bold text-slate-700 transition-colors select-none">
                Seleccionar Varios
              </span>
              <div
                className={cn(
                  "relative h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out",
                  isMultiSelect ? "bg-primary" : "bg-slate-200"
                )}
              >
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={isMultiSelect}
                  onChange={(e) => setIsMultiSelect(e.target.checked)}
                />
                <div
                  className={cn(
                    "h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out",
                    isMultiSelect ? "translate-x-4" : "translate-x-0"
                  )}
                />
              </div>
            </label>
          </div>

          <div className="elegant-scrollbar flex min-h-0 flex-1 flex-col gap-[0.25rem] overflow-y-auto pr-1">
            {/* Todos option */}
            <button
              type="button"
              onClick={() => onFilterToggle(field, "all")}
              className={cn(
                "flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-left transition-all",
                selected.length === 0
                  ? "bg-primary font-semibold text-white"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              )}
            >
              <span
                className="material-symbols-outlined shrink-0"
                style={{ fontSize: "var(--icon-md)" }}
                aria-hidden="true"
              >
                grid_view
              </span>
              <span className="leading-tight text-[var(--text-sm)]">Todos</span>
            </button>

            {categoriesGroup.options.map((opt, idx) => {
              const isActive = selected.includes(opt.value);
              const icon = getCategoryIcon(
                opt.label,
                categoryChips,
                categoriesGroup.icon ?? "checkroom"
              );

              return (
                <button
                  key={`${opt.value}-${idx}`}
                  type="button"
                  onClick={() => onFilterToggle(field, opt.value)}
                  className={cn(
                    "flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 text-left transition-all",
                    isActive
                      ? "bg-primary font-semibold text-white"
                      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                  )}
                >
                  <span
                    className="material-symbols-outlined shrink-0"
                    style={{ fontSize: "var(--icon-md)" }}
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  <span className="leading-tight text-[var(--text-sm)]">
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filtros Especiales */}
        <div className="relative z-30 shrink-0 border-t border-slate-100 pt-5">
          <h3 className="mb-3 font-sans text-[11px] font-bold tracking-wider text-slate-800 uppercase">
            Filtros Especiales
          </h3>
          <label className="group flex cursor-pointer items-center justify-between px-1">
            <span className="text-[12px] font-bold text-slate-700 transition-colors select-none">
              Solo Ofertas
            </span>
            <div
              className={cn(
                "relative h-5 w-9 shrink-0 cursor-pointer rounded-full p-0.5 transition-colors duration-200 ease-in-out",
                onSaleOnly ? "bg-primary" : "bg-slate-200"
              )}
            >
              <input
                type="checkbox"
                className="peer sr-only"
                checked={onSaleOnly}
                onChange={(e) => setOnSaleOnly(e.target.checked)}
              />
              <div
                className={cn(
                  "h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out",
                  onSaleOnly ? "translate-x-4" : "translate-x-0"
                )}
              />
            </div>
          </label>
        </div>
      </div>
    </aside>
  );
}
