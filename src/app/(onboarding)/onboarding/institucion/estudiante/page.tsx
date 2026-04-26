"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/context/useAppStore";

const universities = [
  {
    id: "ues",
    name: "Universidad de El Salvador — FMO-UES",
    city: "San Miguel",
  },
  {
    id: "ugb",
    name: "Universidad Gerardo Barrios (UGB)",
    city: "San Miguel",
  },
  {
    id: "udab",
    name: "Universidad Dr. Andrés Bello — Sede San Miguel",
    city: "San Miguel",
  },
  {
    id: "univo",
    name: "Universidad de Oriente (UNIVO)",
    city: "San Miguel",
  },
  {
    id: "uma",
    name: "Universidad Modular Abierta (UMA) — Sede San Miguel",
    city: "San Miguel",
  },
  {
    id: "ieproes",
    name: "Instituto Especializado de Prof. de la Salud (IEPROES)",
    city: "San Miguel",
  },
];

export default function StudentInstitutionPage() {
  const router = useRouter();
  const { user, setUser } = useAppStore();
  const [selectedUni, setSelectedUni] = useState<string>("");

  const [customUni, setCustomUni] = useState("");

  const handleContinue = useCallback(() => {
    const institution =
      customUni.trim() ||
      universities.find((u) => u.id === selectedUni)?.name ||
      selectedUni;

    if (user && institution) {
      setUser({ ...user, institucion: institution });
    }
    router.push("/onboarding/preferencias");
  }, [user, setUser, router, selectedUni, customUni]);

  return (
    <div className="space-y-8">
      {/* Content Header */}
      <div className="text-center md:text-left">
        <h1 className="font-headline text-primary mb-3 text-3xl leading-tight font-extrabold tracking-tight md:text-4xl">
          ¿En qué universidad estudias?
        </h1>
        <p className="font-body text-on-surface-variant text-base leading-relaxed md:text-lg">
          Mostraremos los uniformes aprobados y precios especiales para
          estudiantes.
        </p>
      </div>

      {/* University Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {universities.map((uni) => (
          <button
            key={uni.id}
            type="button"
            onClick={() => {
              setSelectedUni(uni.id);
              setCustomUni("");
            }}
            className={`flex flex-col rounded-xl p-5 text-left transition-colors duration-200 ${selectedUni === uni.id ? "border-primary-container bg-primary-fixed relative border-2" : "border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low border"}`}
          >
            {selectedUni === uni.id && (
              <div className="text-primary-container absolute top-4 right-4">
                <span
                  className="material-symbols-outlined"
                  aria-hidden="true"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
              </div>
            )}
            <span
              className={`material-symbols-outlined mb-3 ${selectedUni === uni.id ? "text-primary-container" : "text-secondary"}`}
              aria-hidden="true"
              style={{
                fontVariationSettings:
                  selectedUni === uni.id ? "'FILL' 1" : "'FILL' 0",
              }}
            >
              school
            </span>
            <h3
              className={`font-headline mb-1 text-sm leading-snug font-bold ${selectedUni === uni.id ? "text-on-primary-fixed" : "text-on-surface"}`}
            >
              {uni.name}
            </h3>
            <p
              className={`font-body mb-3 text-xs ${selectedUni === uni.id ? "text-on-primary-fixed-variant" : "text-secondary"}`}
            >
              {uni.city}
            </p>
            <div className="mt-auto inline-flex items-center rounded-md bg-[#e6f4ea] px-2 py-1 text-[10px] font-semibold tracking-wide text-[#137333] uppercase">
              <span
                className="material-symbols-outlined mr-1 text-[12px]"
                aria-hidden="true"
              >
                check_circle
              </span>
              Uniformes disponibles
            </div>
          </button>
        ))}
      </div>

      {/* Special Card for custom entry */}
      <div className="border-outline-variant bg-surface-container col-span-full rounded-xl border-2 border-dashed p-5">
        <h3 className="font-headline text-on-surface mb-3 text-sm font-bold">
          Mi universidad no está en la lista
        </h3>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span
              className="material-symbols-outlined text-secondary text-sm"
              aria-hidden="true"
            >
              search
            </span>
          </div>
          <input
            className="border-outline-variant/30 bg-surface-container-lowest font-body text-on-surface placeholder-secondary focus:border-primary focus:ring-primary block w-full rounded-lg border py-2.5 pr-3 pl-10 text-sm transition-all focus:ring-2"
            placeholder="Escribe el nombre de tu universidad"
            type="text"
            value={customUni}
            onChange={(e) => {
              setCustomUni(e.target.value);
              if (e.target.value.trim()) setSelectedUni("");
            }}
          />
        </div>
      </div>

      {/* Career Selector */}
      <div className="border-outline-variant/15 bg-surface-container-lowest rounded-xl border p-6">
        <h3 className="font-headline text-on-surface mb-4 text-lg font-bold">
          ¿Qué carrera estudias?
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Medicina",
            "Enfermería",
            "Odontología",
            "Fisioterapia",
            "Laboratorio Clínico",
            "Nutrición",
          ].map((career) => (
            <button
              key={career}
              type="button"
              className="bg-surface-container-low font-label text-on-surface-variant hover:bg-surface-container rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {career}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex w-full flex-col gap-4">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedUni && !customUni.trim()}
          className="font-headline text-on-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#143067] to-[#001b4a] px-6 py-4 font-bold shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar
          <span
            className="material-symbols-outlined text-sm"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </button>
        <Link
          href="/onboarding/rol"
          className="font-label text-primary hover:bg-surface-container flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-colors duration-200"
        >
          <span
            className="material-symbols-outlined text-sm"
            aria-hidden="true"
          >
            arrow_back
          </span>
          Atrás
        </Link>
      </div>
    </div>
  );
}
