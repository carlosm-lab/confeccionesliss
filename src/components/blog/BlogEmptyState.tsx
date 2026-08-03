"use client";

import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/icons/Icon";

interface BlogEmptyStateProps {
  onResetFilters: () => void;
  selectedPilar?: string;
  selectedUniversity?: string | null;
}

export function BlogEmptyState({
  onResetFilters,
  selectedPilar,
  selectedUniversity,
}: BlogEmptyStateProps) {
  const whatsappUrl = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(
    `Hola Confecciones Liss, estaba buscando información en el blog sobre uniformes (${selectedPilar || "general"}${
      selectedUniversity ? ` - ${selectedUniversity}` : ""
    }) y me gustaría hacerles una consulta directamente.`
  )}`;

  return (
    <div className="border-primary/20 bg-primary/5 my-8 rounded-3xl border border-dashed p-8 text-center sm:p-12">
      <div className="bg-primary/10 text-primary mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl">
        <Icon name="search_off" size={28} />
      </div>

      <h3 className="text-primary font-serif text-xl font-bold sm:text-2xl">
        Artículo en preparación para esta categoría
      </h3>

      <p className="text-primary/80 mx-auto mt-2 max-w-md text-sm leading-relaxed">
        Actualmente estamos redactando y confirmando la información oficial para{" "}
        {selectedPilar && selectedPilar !== "Todos" ? (
          <span className="text-primary font-semibold">
            &quot;{selectedPilar}&quot;
          </span>
        ) : (
          "esta selección"
        )}
        {selectedUniversity && selectedUniversity !== "Todas" ? (
          <span>
            {" "}
            para la{" "}
            <strong className="text-primary">{selectedUniversity}</strong>
          </span>
        ) : null}
        . Nuestro plan editorial incluye 83 guías detalladas en constante
        publicación.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={onResetFilters}
          className="bg-primary hover:bg-primary/90 focus-visible:ring-primary inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-xs font-semibold text-white transition-all focus:outline-none focus-visible:ring-2"
        >
          <Icon name="refresh" size={14} />
          Ver todas las guías disponibles
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="border-primary/30 text-primary hover:bg-primary/5 focus-visible:ring-primary inline-flex items-center gap-2 rounded-xl border bg-white px-5 py-2.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2"
        >
          <Icon name="chat" size={14} className="text-primary" />
          Consultar dudas por WhatsApp
        </a>
      </div>
    </div>
  );
}
