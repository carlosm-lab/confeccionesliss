"use client";

import { useState, useEffect } from "react";
import { Icon } from "@/components/ui/icons/Icon";

export function UnabWarningModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Retraso de 5 segundos antes de desplegar el modal al ingresar, recargar o regresar
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  // Cerrar con la tecla Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unab-warning-title"
    >
      {/* Backdrop idéntico al modal de Favoritos: bg-black/30 backdrop-blur-[2px] sm:bg-black/20 */}
      <div
        className="animate-in fade-in fixed inset-0 z-[100] cursor-default bg-black/30 backdrop-blur-[2px] duration-200 sm:bg-black/20"
        onClick={() => setIsOpen(false)}
        aria-hidden="true"
      />

      {/* Tarjeta Modal Principal */}
      <div className="relative z-[101] w-full max-w-xl overflow-hidden rounded-2xl border border-amber-200/80 bg-white p-6 shadow-2xl transition-all sm:p-8 animate-scale-up">
        {/* Cabecera y Badge de Alerta */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800 shadow-inner">
            <Icon name="warning" className="h-6 w-6" />
          </div>
          <div>
            <span className="font-sans text-xs font-bold tracking-widest text-amber-800 uppercase">
              Notificación Oficial
            </span>
            <h2
              id="unab-warning-title"
              className="text-primary font-serif text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Aviso importante
            </h2>
          </div>
        </div>

        {/* Cuerpo de Texto con el Formato Requerido */}
        <div className="border-primary/10 text-on-surface-variant space-y-4 border-t pt-4 font-sans text-sm leading-relaxed sm:text-base">
          <p>
            En atención a las disposiciones comunicadas por la{" "}
            <strong className="font-semibold text-slate-900">
              Universidad Dr. Andrés Bello (UNAB)
            </strong>{" "}
            y en respeto a su{" "}
            <strong className="font-semibold text-slate-900">autonomía</strong>,{" "}
            <strong className="font-semibold text-slate-900">
              identidad institucional
            </strong>
            ,{" "}
            <strong className="font-semibold text-slate-900">
              imagen institucional
            </strong>{" "}
            y{" "}
            <strong className="font-semibold text-slate-900">
              signos distintivos
            </strong>
            ,{" "}
            <strong className="font-semibold text-slate-900">
              Confecciones Liss
            </strong>{" "}
            informa que, por el momento,{" "}
            <strong className="font-semibold text-slate-900">
              no elaborará, bordará, sublimará, estampará ni incorporará el
              logotipo oficial de la UNAB en ninguna prenda o uniforme
            </strong>
            , independientemente del servicio solicitado.
          </p>
          <p className="text-slate-600">
            Agradecemos su comprensión y reiteramos nuestro compromiso con el
            respeto a las disposiciones y derechos que protegen la identidad
            institucional de cada entidad educativa.
          </p>
        </div>

        {/* Botón de Acción / Confirmación */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={() => setIsOpen(false)}
            className="btn-gradient font-body ambient-shadow flex h-11 w-full items-center justify-center rounded-xl px-8 text-center text-sm font-semibold text-white transition hover:opacity-95 active:scale-[0.98] sm:w-auto"
          >
            Entendido y Aceptar
          </button>
        </div>
      </div>
    </div>
  );
}
