"use client";

import { useEffect, useState } from "react";

/**
 * Modal que bloquea el acceso al sitio indicando que está en construcción.
 * Este componente debe ser importado en el layout raíz para asegurar que cubra todas las páginas.
 */
export function ConstructionModal() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    // Bloquear el scroll del cuerpo mientras el modal está activo
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#143067]/95 backdrop-blur-md transition-opacity duration-500"
      role="dialog"
      aria-modal="true"
      aria-labelledby="construction-title"
    >
      <div className="animate-in fade-in zoom-in relative mx-4 w-full max-w-md space-y-8 overflow-hidden rounded-2xl bg-white px-8 py-12 text-center shadow-2xl duration-300">
        {/* Barra superior decorativa */}
        <div className="absolute top-0 left-0 h-2 w-full bg-gradient-to-r from-blue-400 via-[#143067] to-blue-800"></div>

        {/* Icono central */}
        <div className="mb-2 inline-flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-[#143067] shadow-inner">
          <span
            className="material-symbols-outlined text-6xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            construction
          </span>
        </div>

        {/* Textos */}
        <div className="space-y-4">
          <h2
            id="construction-title"
            className="font-headline text-4xl font-extrabold tracking-tight text-[#143067]"
          >
            Sitio en Construcción
          </h2>
          <p className="font-body text-lg leading-relaxed text-slate-600">
            Estamos afinando los últimos detalles para brindarte la mejor
            experiencia en confección de uniformes profesionales.
          </p>
        </div>

        {/* Footer/Info */}
        <div className="border-t border-slate-100 pt-6">
          <div className="inline-block rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="flex items-center gap-2 text-sm font-semibold text-[#143067]">
              <span className="material-symbols-outlined text-lg">
                location_on
              </span>
              Confecciones Liss — San Miguel, El Salvador
            </p>
          </div>
        </div>

        {/* Mensaje sutil de espera */}
        <p className="pt-2 text-xs font-medium tracking-widest text-slate-400 uppercase">
          Lanzamiento Próximamente
        </p>
      </div>
    </div>
  );
}
