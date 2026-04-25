"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/context/useAppStore";

export default function ProfessionalInstitutionPage() {
  const [selectedInst, setSelectedInst] = useState<string>(
    "Hospital Nacional San Juan de Dios de San Miguel"
  );
  const [filter, setFilter] = useState<string>("Todos");

  const router = useRouter();
  const { user, setUser } = useAppStore();

  const handleContinue = () => {
    if (user) {
      setUser({ ...user, institucion: selectedInst });
    }
    router.push("/onboarding/preferencias");
  };

  const institutions = [
    {
      id: "Hospital Nacional San Juan de Dios de San Miguel",
      type: "Público",
      name: "Hospital Nacional San Juan de Dios de San Miguel",
      location: "San Miguel, El Salvador",
    },
    {
      id: "Hospital Nacional de la Mujer — San Miguel",
      type: "Público",
      name: "Hospital Nacional de la Mujer — San Miguel",
      location: "San Miguel, El Salvador",
    },
    {
      id: "Hospital San Francisco",
      type: "Privado",
      name: "Hospital San Francisco",
      location: "Av. Roosevelt Norte, San Miguel",
    },
    {
      id: "Hospital de Especialidades Nuestra Señora de la Paz",
      type: "Privado",
      name: "Hospital de Especialidades Nuestra Señora de la Paz",
      location: "San Miguel",
    },
    {
      id: "Hospital Regional ISSS San Miguel",
      type: "ISSS",
      name: "Hospital Regional ISSS San Miguel",
      location: "San Miguel",
    },
    {
      id: "UCSF San Miguel",
      type: "Unidad",
      name: "UCSF San Miguel",
      location: "San Miguel",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Content Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          ¿En qué institución trabajas?
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Te mostraremos los uniformes con los colores, logotipos y normas
          aprobadas por tu centro de trabajo.
        </p>
      </div>

      {/* Search */}
      <div className="relative w-full">
        <span className="material-symbols-outlined absolute top-1/2 left-4 -translate-y-1/2 text-gray-400">
          search
        </span>
        <input
          type="text"
          placeholder="Buscar hospital, clínica o unidad de salud..."
          className="focus:border-brand-primary focus:ring-brand-primary/10 w-full rounded-xl border-2 border-gray-200 bg-white py-3 pr-4 pl-12 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:ring-4 focus:outline-none"
        />
      </div>

      {/* Categories / Filters */}
      <div className="no-scrollbar flex w-full gap-2 overflow-x-auto pb-2">
        {[
          "Todos",
          "Hospital Nacional",
          "Hospital Privado",
          "Centro ISSS",
          "Unidad de Salud",
          "Clínica Privada",
          "Práctica Indep.",
        ].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              filter === f
                ? "bg-brand-primary text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Institution Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {institutions.map((inst) => {
          const isSelected = selectedInst === inst.id;
          return (
            <button
              key={inst.id}
              type="button"
              onClick={() => setSelectedInst(inst.id)}
              className={cn(
                "relative cursor-pointer overflow-hidden rounded-xl border-2 p-5 text-left transition-colors",
                isSelected
                  ? "border-brand-primary bg-brand-primary-light"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              {isSelected && (
                <div className="bg-brand-primary absolute top-0 right-0 flex h-12 w-12 items-start justify-end rounded-bl-full p-2">
                  <span
                    className="material-symbols-outlined text-lg text-white"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2 pr-8">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "rounded px-2 py-1 text-xs font-bold tracking-wider uppercase",
                      isSelected
                        ? "bg-brand-primary text-white"
                        : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {inst.type}
                  </span>
                </div>
                <h3
                  className={cn(
                    "text-base leading-tight font-bold transition-colors",
                    isSelected ? "text-brand-primary" : "text-gray-900"
                  )}
                >
                  {inst.name}
                </h3>
                <div className="mt-1 flex items-start gap-1 text-gray-500">
                  <span className="material-symbols-outlined mt-0.5 text-sm">
                    location_on
                  </span>
                  <p className="text-sm">{inst.location}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dotted Card for manual entry */}
      <div className="flex flex-col gap-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-600">
            <span className="material-symbols-outlined text-lg">
              add_location_alt
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Mi lugar de trabajo no está en la lista
          </h3>
        </div>
        <p className="text-sm text-gray-500">
          Puedes agregar el nombre de tu clínica o consultorio privado para que
          tu pedido salga correctamente facturado o rotulado.
        </p>
        <div className="mt-2">
          <input
            type="text"
            placeholder="Nombre de tu clínica, hospital o consultorio"
            className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-colors focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Actions Bottom Bar */}
      <div className="flex w-full flex-col gap-3">
        <button
          onClick={handleContinue}
          className="bg-brand-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Continuar
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </button>
        <Link
          href="/onboarding/rol"
          className="flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium text-gray-500 transition-colors hover:bg-gray-100"
        >
          <span className="material-symbols-outlined text-[18px]">
            arrow_back
          </span>
          Volver
        </Link>
      </div>
    </div>
  );
}
