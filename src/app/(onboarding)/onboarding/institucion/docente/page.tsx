"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/context/useAppStore";

export default function TeacherInstitutionPage() {
  const router = useRouter();
  const { user, setUser } = useAppStore();

  const [institutionType, setInstitutionType] = useState<
    "Universidad" | "Instituto"
  >("Universidad");
  const [selectedInst, setSelectedInst] = useState<string>("");
  const [customInst, setCustomInst] = useState("");

  const institutions = [
    "Universidad de El Salvador — FMO",
    "Universidad Gerardo Barrios (UGB)",
    "Universidad Dr. Andrés Bello — Sede San Miguel",
    "Universidad de Oriente (UNIVO)",
    "Universidad Modular Abierta (UMA) — Sede San Miguel",
    "Instituto Especializado de Profesionales de la Salud (IEPROES)",
    "Otra institución",
  ];

  const handleContinue = useCallback(() => {
    const institution =
      selectedInst === "Otra institución"
        ? customInst.trim() || "Otra institución"
        : selectedInst || customInst.trim();

    if (user && institution) {
      setUser({ ...user, institucion: institution });
    }
    router.push("/onboarding/preferencias");
  }, [user, setUser, router, selectedInst, customInst]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-headline text-on-surface text-2xl font-extrabold tracking-tight md:text-3xl">
          ¿En qué institución trabajas?
        </h1>
        <p className="font-body text-on-surface-variant mt-2 text-base">
          Te mostraremos opciones profesionales para docentes del sector salud.
        </p>
      </div>

      {/* Toggle Switch */}
      <div className="bg-surface-container-low inline-flex rounded-full p-1">
        <button
          type="button"
          onClick={() => setInstitutionType("Universidad")}
          className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${institutionType === "Universidad" ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:text-on-surface font-medium"}`}
        >
          Universidad
        </button>
        <button
          type="button"
          onClick={() => setInstitutionType("Instituto")}
          className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${institutionType === "Instituto" ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:text-on-surface font-medium"}`}
        >
          Instituto técnico o tecnológico
        </button>
      </div>

      {/* Radio List */}
      <div className="space-y-3">
        {institutions.map((inst) => (
          <label
            key={inst}
            className="bg-surface-container-lowest outline-outline-variant/15 hover:bg-surface-container-low flex cursor-pointer items-center rounded-xl p-4 outline outline-1 transition-colors"
          >
            <input
              className="form-radio border-outline-variant text-primary-container focus:ring-primary h-5 w-5"
              name="institution"
              type="radio"
              checked={selectedInst === inst}
              onChange={() => setSelectedInst(inst)}
            />
            <span className="font-body text-on-surface ml-4 font-medium">
              {inst}
            </span>
          </label>
        ))}
      </div>

      {/* Custom input when "Otra institución" */}
      {selectedInst === "Otra institución" && (
        <div>
          <label
            htmlFor="custom_institution"
            className="font-label text-on-surface mb-2 block text-sm font-bold tracking-widest uppercase"
          >
            Nombre de la institución
          </label>
          <input
            id="custom_institution"
            className="bg-surface-container-low font-body text-on-surface focus:border-primary w-full rounded-md border-0 border-b-2 border-transparent px-4 py-3 transition-colors focus:ring-0"
            placeholder="Ej: Instituto Nacional de Salud"
            type="text"
            value={customInst}
            onChange={(e) => setCustomInst(e.target.value)}
          />
        </div>
      )}

      {/* Optional: Department */}
      <div>
        <label
          htmlFor="area_departamento"
          className="font-label text-on-surface mb-2 block text-sm font-bold tracking-widest uppercase"
        >
          ¿Qué área o departamento?
        </label>
        <input
          id="area_departamento"
          className="bg-surface-container-low font-body text-on-surface focus:border-primary w-full rounded-md border-0 border-b-2 border-transparent px-4 py-3 transition-colors focus:ring-0"
          placeholder="Ej: Facultad de Ciencias de la Salud"
          type="text"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex w-full flex-col gap-4">
        <button
          type="button"
          onClick={handleContinue}
          disabled={!selectedInst && !customInst.trim()}
          className="bg-primary-container text-on-primary flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg py-4 text-lg font-semibold transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Continuar
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-on-primary text-xl"
          >
            arrow_forward
          </span>
        </button>
        <Link
          href="/onboarding/rol"
          className="text-on-surface-variant hover:text-on-surface flex items-center justify-center gap-2 text-center font-medium transition-colors"
        >
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-xl"
          >
            arrow_back
          </span>
          Atrás
        </Link>
      </div>
    </div>
  );
}
