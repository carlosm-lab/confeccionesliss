"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfessionalInstitutionPage() {
  const [selectedInst, setSelectedInst] = useState<string>(
    "Hospital Nacional San Juan de Dios de San Miguel"
  );
  const [filter, setFilter] = useState<string>("Todos");

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
    <div className="bg-surface font-body text-on-surface flex min-h-screen flex-col antialiased">
      {/* TopAppBar */}
      <header className="bg-surface-container-lowest/90 fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between px-6 shadow-sm backdrop-blur-md md:px-12">
        <div className="font-headline text-2xl font-black tracking-tighter text-[#001b4a] uppercase">
          Confecciones Liss
        </div>
        <Link
          href="/onboarding/preferencias"
          className="font-label hover:text-primary hidden text-sm font-bold tracking-widest text-[#001b4a] uppercase transition-all md:block"
        >
          Saltar paso
        </Link>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-4xl flex-grow flex-col px-6 pt-28 pb-20">
        {/* Progress Tracker */}
        <div className="mb-12">
          <div className="font-label text-on-surface-variant mb-4 flex items-center justify-between text-sm font-medium">
            <div className="text-primary flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              <span className="hidden sm:inline">Perfil</span>
            </div>
            <div className="text-primary flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-base">
                check_circle
              </span>
              <span className="hidden sm:inline">Rol</span>
            </div>
            <div className="text-primary flex flex-col items-center gap-1 font-bold">
              <span
                className="material-symbols-outlined text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                radio_button_checked
              </span>
              <span className="hidden sm:inline">Institución</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-base">
                radio_button_unchecked
              </span>
              <span className="text-outline hidden sm:inline">
                Preferencias
              </span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <span className="material-symbols-outlined text-base">
                radio_button_unchecked
              </span>
              <span className="text-outline hidden sm:inline">¡Listo!</span>
            </div>
          </div>
          <div className="bg-surface-variant h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary-container h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: "60%" }}
            ></div>
          </div>
        </div>

        {/* Content Header */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="font-headline text-primary mb-4 text-4xl font-bold tracking-tight">
            ¿En qué institución trabajas?
          </h1>
          <p className="font-body text-on-surface-variant text-lg">
            Te mostraremos los uniformes con los colores, logotipos y normas
            aprobadas por tu centro de trabajo.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 w-full max-w-2xl">
          <span className="material-symbols-outlined text-on-surface-variant absolute top-1/2 left-4 -translate-y-1/2">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar hospital, clínica o unidad de salud..."
            className="border-outline-variant/30 bg-surface-container-lowest font-body text-on-surface placeholder:text-outline focus:border-primary focus:ring-primary/10 w-full rounded-xl border-2 py-4 pr-4 pl-12 text-base transition-all focus:ring-4 focus:outline-none"
          />
        </div>

        {/* Categories / Filters */}
        <div className="no-scrollbar mb-8 flex w-full gap-3 overflow-x-auto pb-2">
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
              className={`font-label min-w-[100px] flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${filter === f ? "bg-primary-container text-on-primary" : "bg-surface hover:bg-surface-container-low text-on-surface-variant"}`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Institution Grid */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {institutions.map((inst) => (
            <button
              key={inst.id}
              type="button"
              onClick={() => setSelectedInst(inst.id)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl p-5 text-left transition-colors ${selectedInst === inst.id ? "bg-surface-container-lowest ring-primary shadow-[0_4px_40px_rgba(25,28,30,0.06)] ring-2" : "bg-surface-container-lowest border-outline-variant/15 hover:bg-surface border"}`}
            >
              {selectedInst === inst.id && (
                <div className="bg-primary absolute top-0 right-0 flex h-16 w-16 items-start justify-end rounded-bl-full p-3">
                  <span
                    className="material-symbols-outlined text-on-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
              )}

              <div className="flex flex-col gap-2 pr-12">
                <div className="flex items-center gap-2">
                  <span
                    className={`rounded px-2 py-1 text-xs font-bold tracking-wider uppercase ${selectedInst === inst.id ? "bg-primary-fixed text-on-primary-fixed" : "bg-surface-container-high text-on-surface-variant"}`}
                  >
                    {inst.type}
                  </span>
                </div>
                <h3
                  className={`font-headline text-lg leading-tight font-bold transition-colors ${selectedInst === inst.id ? "text-primary" : "text-on-surface group-hover:text-primary"}`}
                >
                  {inst.name}
                </h3>
                <div className="text-on-surface-variant mt-1 flex items-start gap-1">
                  <span className="material-symbols-outlined mt-0.5 text-sm">
                    location_on
                  </span>
                  <p className="font-body text-sm">{inst.location}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Dotted Card for manual entry */}
        <div className="border-outline-variant/50 bg-surface-container-low mt-2 flex flex-col gap-4 rounded-xl border-2 border-dashed p-6">
          <div className="flex items-center gap-3">
            <div className="bg-secondary-container text-on-secondary-container flex h-10 w-10 items-center justify-center rounded-full">
              <span className="material-symbols-outlined text-lg">
                add_location_alt
              </span>
            </div>
            <h3 className="font-headline text-on-surface text-lg font-bold">
              Mi lugar de trabajo no está en la lista
            </h3>
          </div>
          <p className="font-body text-on-surface-variant text-sm">
            Puedes agregar el nombre de tu clínica o consultorio privado para
            que tu pedido salga correctamente facturado o rotulado.
          </p>
          <div className="mt-2">
            <input
              type="text"
              placeholder="Nombre de tu clínica, hospital o consultorio"
              className="border-outline-variant/30 bg-surface-container-lowest font-body text-on-surface focus:border-primary focus:ring-primary/20 w-full max-w-md rounded-lg border px-4 py-3 text-sm transition-colors focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Actions Bottom Bar */}
        <div className="mt-12 flex w-full flex-col gap-4">
          <Link
            href="/onboarding/preferencias"
            className="bg-primary font-headline text-on-primary flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-lg font-bold shadow-[0_10px_30px_rgba(0,27,74,0.15)] transition-all hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(0,27,74,0.25)] active:translate-y-0"
          >
            Continuar
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
          <Link
            href="/onboarding/roles"
            className="font-headline text-primary hover:bg-surface-container-low flex items-center justify-center gap-2 rounded-xl bg-transparent px-8 py-4 font-bold transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              arrow_back
            </span>
            Volver
          </Link>
        </div>
      </main>
    </div>
  );
}
