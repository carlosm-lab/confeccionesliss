"use client";

import Link from "next/link";
import { useState } from "react";

export default function TeacherInstitutionPage() {
  const [institutionType, setInstitutionType] = useState<
    "Universidad" | "Instituto"
  >("Universidad");
  const [selectedInst, setSelectedInst] = useState<string>("");

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen flex-col antialiased">
      {/* TopAppBar */}
      <header className="fixed top-0 z-50 w-full bg-white/80 backdrop-blur-xl dark:bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-8 py-4">
          <div className="font-headline text-xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            Confecciones Liss
          </div>
          <Link
            href="/onboarding/preferencias"
            className="font-headline scale-95 font-bold tracking-tight text-blue-900 transition-all duration-300 hover:text-blue-800 active:scale-90 dark:text-blue-400 dark:hover:text-blue-300"
          >
            Saltar
          </Link>
        </div>
        <div className="h-[1px] w-full bg-slate-100/50 dark:bg-slate-800/50"></div>
      </header>

      {/* Progress Section */}
      <div className="bg-surface-container-lowest mt-8 w-full py-6">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">
              Paso 3 de 5
            </span>
            <span className="text-primary text-xs font-semibold tracking-wider uppercase">
              60%
            </span>
          </div>
          <div className="bg-surface-container-high mb-6 h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary-container h-2 rounded-full"
              style={{ width: "60%" }}
            ></div>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <div className="flex flex-col items-center">
              <span
                className="material-symbols-outlined text-primary-container mb-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="text-on-surface-variant">Perfil</span>
            </div>
            <div className="flex flex-col items-center">
              <span
                className="material-symbols-outlined text-primary-container mb-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
              <span className="text-on-surface-variant">Rol</span>
            </div>
            <div className="flex flex-col items-center">
              <span
                className="material-symbols-outlined text-primary-container mb-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                radio_button_checked
              </span>
              <span className="text-primary-container font-bold">
                Institución
              </span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <span className="material-symbols-outlined text-outline mb-1">
                radio_button_unchecked
              </span>
              <span className="text-outline">Preferencias</span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <span className="material-symbols-outlined text-outline mb-1">
                radio_button_unchecked
              </span>
              <span className="text-outline">¡Listo!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center px-6 py-16">
        <div className="w-full max-w-[680px]">
          <h2 className="font-headline text-on-surface mb-3 text-3xl font-extrabold tracking-tight">
            ¿En qué institución trabajas?
          </h2>
          <p className="font-body text-on-surface-variant mb-10 text-base">
            Te mostraremos opciones profesionales para docentes del sector
            salud.
          </p>

          {/* Toggle Switch */}
          <div className="bg-surface-container-low mb-8 inline-flex rounded-full p-1">
            <button
              onClick={() => setInstitutionType("Universidad")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${institutionType === "Universidad" ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:text-on-surface font-medium"}`}
            >
              Universidad
            </button>
            <button
              onClick={() => setInstitutionType("Instituto")}
              className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all ${institutionType === "Instituto" ? "bg-primary-container text-on-primary" : "text-on-surface-variant hover:text-on-surface font-medium"}`}
            >
              Instituto técnico o tecnológico
            </button>
          </div>

          {/* Radio List */}
          <div className="mb-8 space-y-3">
            {[
              "Universidad de El Salvador — FMO",
              "Universidad Gerardo Barrios (UGB)",
              "Universidad Dr. Andrés Bello — Sede San Miguel",
              "Universidad de Oriente (UNIVO)",
              "Universidad Modular Abierta (UMA) — Sede San Miguel",
              "Instituto Especializado de Profesionales de la Salud (IEPROES)",
              "Otra institución",
            ].map((inst) => (
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

          {/* Optional Input */}
          <div className="mb-12">
            <label
              htmlFor="area_departamento"
              className="font-label text-on-surface mb-2 block text-sm font-bold tracking-widest uppercase"
            >
              ¿Qué área o departamento?
            </label>
            <input
              id="area_departamento"
              className="bg-surface-container-low font-body text-on-surface focus:border-primary w-full rounded-t-md border-0 border-b-2 border-transparent px-4 py-3 transition-colors focus:ring-0"
              placeholder="Ej: Facultad de Ciencias de la Salud"
              type="text"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex w-full flex-col gap-6">
            <Link
              href="/onboarding/preferencias"
              className="bg-primary-container text-on-primary flex w-full items-center justify-center gap-2 rounded-lg py-4 text-lg font-semibold transition-opacity hover:opacity-90"
            >
              Continuar
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-on-primary text-xl"
              >
                arrow_forward
              </span>
            </Link>
            <Link
              href="/onboarding/roles"
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
      </main>
    </div>
  );
}
