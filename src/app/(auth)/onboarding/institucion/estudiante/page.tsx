"use client";

import Link from "next/link";
import { useState } from "react";

export default function StudentInstitutionPage() {
  const [selectedUni, setSelectedUni] = useState<string>("");

  return (
    <div className="bg-background font-body text-on-background flex min-h-screen flex-col antialiased">
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest sticky top-0 z-50 w-full shadow-sm transition-all">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="font-headline text-primary-container text-xl font-black tracking-tight">
            Confecciones Liss
          </div>
          <Link
            href="/onboarding/preferencias"
            className="font-body text-secondary hover:text-primary font-medium transition-colors duration-200"
          >
            Omitir
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-grow flex-col items-center px-4 pt-8 pb-16 md:px-8">
        <div className="w-full max-w-[760px]">
          {/* Progress Bar Section */}
          <div className="bg-surface-container-lowest mb-10 rounded-xl p-6">
            <div className="relative flex items-center justify-between">
              <div className="bg-secondary-container absolute top-1/2 left-0 z-0 h-2 w-full -translate-y-1/2 rounded-full">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-primary text-on-primary ring-surface-container-lowest flex h-8 w-8 items-center justify-center rounded-full ring-2">
                  <span className="material-symbols-outlined text-sm">
                    check
                  </span>
                </div>
                <span className="font-label text-secondary mt-2 text-xs font-medium">
                  Perfil
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-primary text-on-primary ring-surface-container-lowest flex h-8 w-8 items-center justify-center rounded-full ring-2">
                  <span className="material-symbols-outlined text-sm">
                    check
                  </span>
                </div>
                <span className="font-label text-secondary mt-2 text-xs font-medium">
                  Rol
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-primary-container text-on-primary ring-surface-container-lowest flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-4">
                  <span className="text-sm font-bold">3</span>
                </div>
                <span className="font-label text-primary mt-2 text-xs font-bold">
                  Institución
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-secondary-container text-on-surface-variant ring-surface-container-lowest flex h-8 w-8 items-center justify-center rounded-full ring-4">
                  <span className="text-sm font-bold">4</span>
                </div>
                <span className="font-label text-secondary mt-2 text-xs font-medium">
                  Preferencias
                </span>
              </div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="bg-secondary-container text-on-surface-variant ring-surface-container-lowest flex h-8 w-8 items-center justify-center rounded-full ring-4">
                  <span className="text-sm font-bold">5</span>
                </div>
                <span className="font-label text-secondary mt-2 text-xs font-medium">
                  ¡Listo!
                </span>
              </div>
            </div>
          </div>

          {/* Content Header */}
          <div className="mb-10 text-center md:text-left">
            <h2 className="font-headline text-primary mb-3 text-3xl leading-tight font-extrabold tracking-tight md:text-4xl">
              ¿En qué universidad estudias?
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed md:text-lg">
              Mostraremos los uniformes aprobados y precios especiales para
              estudiantes.
            </p>
          </div>

          {/* University Grid */}
          <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
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
            ].map((uni) => (
              <button
                key={uni.id}
                onClick={() => setSelectedUni(uni.id)}
                className={`flex flex-col rounded-xl p-5 text-left transition-colors duration-200 ${selectedUni === uni.id ? "border-primary-container bg-primary-fixed relative border-2" : "border-outline-variant/30 bg-surface-container-lowest hover:bg-surface-container-low border"}`}
              >
                {selectedUni === uni.id && (
                  <div className="text-primary-container absolute top-4 right-4">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                )}
                <span
                  className={`material-symbols-outlined mb-3 ${selectedUni === uni.id ? "text-primary-container" : "text-secondary"}`}
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
                  <span className="material-symbols-outlined mr-1 text-[12px]">
                    check_circle
                  </span>
                  Uniformes disponibles
                </div>
              </button>
            ))}

            {/* Special Card */}
            <div className="border-outline-variant bg-surface-container col-span-1 mt-2 rounded-xl border-2 border-dashed p-5 md:col-span-2 lg:col-span-3">
              <h3 className="font-headline text-on-surface mb-3 text-sm font-bold">
                Mi universidad no está en la lista
              </h3>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-secondary text-sm">
                    search
                  </span>
                </div>
                <input
                  className="border-outline-variant/30 bg-surface-container-lowest font-body text-on-surface placeholder-secondary focus:border-primary focus:ring-primary block w-full rounded-lg border py-2.5 pr-3 pl-10 text-sm transition-all focus:ring-2"
                  placeholder="Escribe el nombre de tu universidad"
                  type="text"
                />
              </div>
            </div>
          </div>

          {/* Career Selector */}
          <div className="border-outline-variant/15 bg-surface-container-lowest mb-12 rounded-xl border p-6">
            <h3 className="font-headline text-on-surface mb-4 text-lg font-bold">
              ¿Qué carrera estudias?
            </h3>
            <div className="flex flex-wrap gap-2">
              <button className="bg-primary-container font-label text-on-primary rounded-full px-4 py-2 text-sm font-medium shadow-sm transition-transform hover:-translate-y-0.5 active:translate-y-0">
                Medicina
              </button>
              <button className="bg-surface-container-low font-label text-on-surface-variant hover:bg-surface-container rounded-full px-4 py-2 text-sm font-medium transition-colors">
                Enfermería
              </button>
              <button className="bg-surface-container-low font-label text-on-surface-variant hover:bg-surface-container rounded-full px-4 py-2 text-sm font-medium transition-colors">
                Odontología
              </button>
              <button className="bg-surface-container-low font-label text-on-surface-variant hover:bg-surface-container rounded-full px-4 py-2 text-sm font-medium transition-colors">
                Fisioterapia
              </button>
              <button className="bg-surface-container-low font-label text-on-surface-variant hover:bg-surface-container rounded-full px-4 py-2 text-sm font-medium transition-colors">
                Laboratorio Clínico
              </button>
              <button className="bg-surface-container-low font-label text-on-surface-variant hover:bg-surface-container rounded-full px-4 py-2 text-sm font-medium transition-colors">
                Nutrición
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-4">
            <Link
              href="/onboarding/preferencias"
              className="font-headline text-on-primary flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#143067] to-[#001b4a] px-6 py-4 font-bold shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            >
              Continuar
              <span className="material-symbols-outlined text-sm">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/onboarding/roles"
              className="font-label text-primary hover:bg-surface-container flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-colors duration-200"
            >
              <span className="material-symbols-outlined text-sm">
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
