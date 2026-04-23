"use client";

import Link from "next/link";
import { useState } from "react";

export default function OnboardingRolesPage() {
  const [selectedRole, setSelectedRole] = useState<string>("");

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen flex-col antialiased">
      {/* TopAppBar */}
      <header className="fixed top-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-white/80 px-8 py-4 backdrop-blur-xl dark:bg-slate-900/80">
        <div className="font-headline text-2xl font-bold tracking-tighter text-blue-900 dark:text-white">
          Confecciones Liss
        </div>
        <Link
          href="/"
          className="font-label text-sm font-medium tracking-wide text-slate-500 uppercase transition-colors hover:text-red-700 dark:text-slate-400 dark:hover:text-red-400"
        >
          Skip
        </Link>
      </header>

      {/* Progress Bar Section */}
      <div className="border-outline-variant/10 bg-surface-container-lowest mt-16 w-full border-b-2 px-4 py-6">
        <div className="relative mx-auto flex max-w-3xl items-center justify-between">
          <div className="bg-surface-container-high absolute top-1/2 left-0 z-0 h-0.5 w-full -translate-y-1/2"></div>
          <div className="bg-primary-container absolute top-1/2 left-0 z-0 h-0.5 w-[25%] -translate-y-1/2"></div>

          <div className="bg-surface-container-lowest relative z-10 flex flex-col items-center gap-2 px-2">
            <div className="bg-primary-container text-on-primary flex h-8 w-8 items-center justify-center rounded-full">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check
              </span>
            </div>
            <span className="font-label text-on-surface-variant text-xs font-medium">
              Perfil
            </span>
          </div>

          <div className="bg-surface-container-lowest relative z-10 flex flex-col items-center gap-2 px-2">
            <div className="border-primary-container bg-surface-container-lowest font-headline text-primary-container flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold">
              2
            </div>
            <span className="font-label text-primary-container text-xs font-bold">
              Rol
            </span>
          </div>

          <div className="bg-surface-container-lowest relative z-10 flex flex-col items-center gap-2 px-2">
            <div className="border-outline-variant/30 bg-surface-container-lowest font-headline text-outline-variant flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold">
              3
            </div>
            <span className="font-label text-outline-variant text-xs font-medium">
              Institución
            </span>
          </div>

          <div className="bg-surface-container-lowest relative z-10 flex flex-col items-center gap-2 px-2">
            <div className="border-outline-variant/30 bg-surface-container-lowest font-headline text-outline-variant flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold">
              4
            </div>
            <span className="font-label text-outline-variant text-xs font-medium">
              Preferencias
            </span>
          </div>

          <div className="bg-surface-container-lowest relative z-10 flex flex-col items-center gap-2 px-2">
            <div className="border-outline-variant/30 bg-surface-container-lowest font-headline text-outline-variant flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold">
              5
            </div>
            <span className="font-label text-outline-variant text-xs font-medium">
              ¡Listo!
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-[720px] flex-grow flex-col px-6 py-16">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-primary mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            ¿Cuál es tu rol en el sector salud?
          </h2>
          <p className="font-body text-on-surface-variant text-base md:text-lg">
            Esto nos ayuda a mostrarte los productos y precios más adecuados
            para tu práctica diaria.
          </p>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card: Estudiante */}
          <label
            htmlFor="role-estudiante"
            className={`group hover:bg-surface-container-low relative cursor-pointer rounded-xl border-2 p-8 transition-all duration-300 ${selectedRole === "Estudiante" ? "border-primary-container bg-surface-container-low shadow-sm" : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary-container/40"}`}
          >
            <input
              id="role-estudiante"
              aria-label="Estudiante"
              className="absolute h-0 w-0 opacity-0"
              name="role"
              type="radio"
              value="Estudiante"
              checked={selectedRole === "Estudiante"}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            <span
              className="material-symbols-outlined text-primary-container mb-6 block text-4xl"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              school
            </span>
            <h3 className="font-headline text-primary mb-2 text-xl font-bold">
              Estudiante
            </h3>
            <p className="font-label text-on-surface-variant mb-6 h-10 text-sm">
              Uniformes resistentes para prácticas universitarias.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-container mt-0.5 text-sm">
                  check_circle
                </span>
                <span className="font-label text-on-surface-variant text-xs">
                  Precios estudiantiles
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-container mt-0.5 text-sm">
                  check_circle
                </span>
                <span className="font-label text-on-surface-variant text-xs">
                  Descuentos por sección
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-container mt-0.5 text-sm">
                  check_circle
                </span>
                <span className="font-label text-on-surface-variant text-xs">
                  Modelos aprobados
                </span>
              </li>
            </ul>
          </label>

          {/* Card: Docente */}
          <label
            htmlFor="role-docente"
            className={`group hover:bg-surface-container-low relative cursor-pointer rounded-xl border-2 p-8 transition-all duration-300 ${selectedRole === "Docente" ? "border-primary-container bg-surface-container-low shadow-sm" : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary-container/40"}`}
          >
            <input
              id="role-docente"
              aria-label="Docente"
              className="absolute h-0 w-0 opacity-0"
              name="role"
              type="radio"
              value="Docente"
              checked={selectedRole === "Docente"}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            <span
              className="material-symbols-outlined text-primary-container mb-6 block text-4xl"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              menu_book
            </span>
            <h3 className="font-headline text-primary mb-2 text-xl font-bold">
              Docente
            </h3>
            <p className="font-label text-on-surface-variant mb-6 h-10 text-sm">
              Docente universitario o instructor clínico.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-container mt-0.5 text-sm">
                  check_circle
                </span>
                <span className="font-label text-on-surface-variant text-xs">
                  Modelos profesionales
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-container mt-0.5 text-sm">
                  check_circle
                </span>
                <span className="font-label text-on-surface-variant text-xs">
                  Personalización institucional
                </span>
              </li>
            </ul>
          </label>

          {/* Card: Profesional */}
          <label
            htmlFor="role-profesional"
            className={`group hover:bg-surface-container-low relative cursor-pointer rounded-xl border-2 p-8 transition-all duration-300 md:col-span-2 lg:col-span-1 ${selectedRole === "Profesional" ? "border-primary-container bg-surface-container-low shadow-sm" : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary-container/40"}`}
          >
            <input
              id="role-profesional"
              aria-label="Profesional de la salud"
              className="absolute h-0 w-0 opacity-0"
              name="role"
              type="radio"
              value="Profesional"
              checked={selectedRole === "Profesional"}
              onChange={(e) => setSelectedRole(e.target.value)}
            />
            <span
              className="material-symbols-outlined text-primary-container mb-6 block text-4xl"
              style={{ fontVariationSettings: "'wght' 200" }}
            >
              stethoscope
            </span>
            <h3 className="font-headline text-primary mb-2 text-xl font-bold">
              Profesional de la salud
            </h3>
            <p className="font-label text-on-surface-variant mb-6 h-10 text-sm">
              Médico, enfermera u odontólogo en ejercicio.
            </p>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-container mt-0.5 text-sm">
                  check_circle
                </span>
                <span className="font-label text-on-surface-variant text-xs">
                  Scrubs técnicos
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary-container mt-0.5 text-sm">
                  check_circle
                </span>
                <span className="font-label text-on-surface-variant text-xs">
                  Uso diario clínico
                </span>
              </li>
            </ul>
          </label>
        </div>

        {/* Card: Institución */}
        <label
          htmlFor="role-institucion"
          className={`group hover:bg-surface-container-low relative mb-10 flex w-full cursor-pointer flex-col items-start justify-between gap-6 rounded-xl border-2 p-8 transition-all duration-300 md:flex-row md:items-center ${selectedRole === "Institución" ? "border-primary-container bg-surface-container-low shadow-sm" : "border-outline-variant/20 bg-surface-container-lowest hover:border-primary-container/40"}`}
        >
          <input
            id="role-institucion"
            aria-label="Institución / Empresa"
            className="absolute h-0 w-0 opacity-0"
            name="role"
            type="radio"
            value="Institución"
            checked={selectedRole === "Institución"}
            onChange={(e) => setSelectedRole(e.target.value)}
          />
          <div className="flex items-start gap-6 md:items-center">
            <div className="bg-surface-container rounded-full p-4">
              <span
                className="material-symbols-outlined text-primary-container block text-3xl"
                style={{ fontVariationSettings: "'wght' 200" }}
              >
                domain
              </span>
            </div>
            <div>
              <div className="mb-1 flex items-center gap-4">
                <h3 className="font-headline text-primary text-xl font-bold">
                  Institución / Empresa
                </h3>
                <span className="bg-secondary text-on-secondary rounded-full px-3 py-1 text-[10px] leading-none font-bold tracking-widest uppercase">
                  Mayoreo disponible
                </span>
              </div>
              <p className="font-label text-on-surface-variant text-sm">
                Compras volumétricas para clínica, hospital o empresa privada.
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <span className="material-symbols-outlined text-outline-variant group-hover:text-primary-container transition-colors">
              chevron_right
            </span>
          </div>
        </label>

        <div className="mb-10 text-center">
          <Link
            href="/onboarding/institucion"
            className="font-label text-primary-container decoration-primary-container/30 hover:text-primary text-sm underline underline-offset-4 transition-all"
          >
            ¿Prefieres no especificar? Ir al catálogo general.
          </Link>
        </div>

        <div className="mt-auto flex flex-col items-center gap-6">
          <Link
            href={
              selectedRole === "Estudiante"
                ? "/onboarding/institucion/estudiante"
                : selectedRole === "Docente"
                  ? "/onboarding/institucion/docente"
                  : "/onboarding/institucion"
            }
            className={`font-label flex w-full items-center justify-center rounded-full py-4 text-sm font-bold tracking-widest uppercase transition-all ${selectedRole ? "bg-primary-container text-on-primary hover:bg-primary shadow-md" : "bg-surface-container-high text-on-surface/30 cursor-not-allowed"}`}
            aria-disabled={!selectedRole}
            onClick={(e) => !selectedRole && e.preventDefault()}
          >
            Continuar{" "}
            <span className="material-symbols-outlined ml-2 align-middle text-sm">
              arrow_forward
            </span>
          </Link>
          <Link
            href="/onboarding"
            className="font-label text-outline-variant hover:text-on-surface flex items-center gap-1 text-xs tracking-widest uppercase transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>{" "}
            Atrás
          </Link>
        </div>
      </main>

      {/* Basic Footer */}
      <footer className="mt-auto w-full border-t-0 bg-slate-50 dark:bg-slate-950">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-8 px-12 py-16 md:grid-cols-4">
          <div className="col-span-1 flex flex-col gap-4">
            <span className="font-headline text-xl font-bold text-blue-900 dark:text-blue-200">
              Confecciones Liss
            </span>
            <p className="font-body mt-4 text-xs tracking-widest text-slate-600 uppercase dark:text-slate-400">
              Crafted with Surgical Precision.
            </p>
          </div>
          {/* ... keeping footer light for brevity in code ... */}
        </div>
      </footer>
    </div>
  );
}
