"use client";

import Link from "next/link";
import { useState } from "react";

export default function PreferencesPage() {
  const [purchaseType, setPurchaseType] = useState<string>("individual");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<Record<string, boolean>>({
    "Nuevos productos de mi institución": true,
    "Actualizaciones de mis pedidos": true,
    "Novedades del catálogo general": false,
    "Ofertas y descuentos": false,
  });

  const toggleColor = (colorId: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(colorId)) {
        return prev.filter((c) => c !== colorId);
      }
      if (prev.length < 3) {
        return [...prev, colorId];
      }
      return prev;
    });
  };

  const toggleNotification = (key: string) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const colors = [
    { id: "navy", name: "Azul navy", hex: "#1e3a8a" },
    { id: "celeste", name: "Azul celeste", hex: "#38bdf8" },
    { id: "gris", name: "Gris", hex: "#64748b" },
    { id: "verde_quirofano", name: "Verde quirófano", hex: "#047857" },
    { id: "blanco", name: "Blanco", hex: "#ffffff" },
    { id: "negro", name: "Negro", hex: "#000000" },
    { id: "burdeos", name: "Burdeos", hex: "#7f1d1d" },
    { id: "azul_real", name: "Azul real", hex: "#2563eb" },
    { id: "teal", name: "Teal", hex: "#0d9488" },
    { id: "verde_claro", name: "Verde claro", hex: "#86efac" },
    { id: "lila", name: "Lila", hex: "#d8b4fe" },
    { id: "rosa_palo", name: "Rosa palo", hex: "#fbcfe8" },
  ];

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen flex-col antialiased">
      {/* TopAppBar */}
      <header className="sticky top-0 z-50 w-full bg-slate-50/80 shadow-sm backdrop-blur-xl dark:bg-slate-900/80 dark:shadow-none">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="font-headline text-2xl font-black tracking-tighter text-blue-900 dark:text-blue-100">
            Confecciones Liss
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/onboarding/final"
              className="font-medium text-slate-500 transition-colors duration-300 hover:text-blue-700 dark:text-slate-400 dark:hover:text-blue-300"
            >
              Skip
            </Link>
          </div>
        </div>
        <div className="h-[2px] w-full bg-slate-200/50 dark:bg-slate-800/50"></div>
      </header>

      {/* Progress Bar Section */}
      <div className="bg-surface-container-lowest relative z-40 w-full py-6 shadow-[0_10px_40px_0_rgba(20,48,103,0.06)]">
        <div className="mx-auto max-w-3xl px-6">
          <div className="font-label mb-2 flex justify-between text-sm">
            <span className="text-primary-container flex items-center gap-1 font-semibold">
              Perfil{" "}
              <span className="material-symbols-outlined text-[16px]">
                check
              </span>
            </span>
            <span className="text-primary-container flex items-center gap-1 font-semibold">
              Rol{" "}
              <span className="material-symbols-outlined text-[16px]">
                check
              </span>
            </span>
            <span className="text-primary-container flex items-center gap-1 font-semibold">
              Institución{" "}
              <span className="material-symbols-outlined text-[16px]">
                check
              </span>
            </span>
            <span className="text-primary-container font-bold">
              Preferencias
            </span>
            <span className="text-outline">¡Listo!</span>
          </div>
          <div className="bg-surface-container-high h-2 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary-container h-full rounded-full"
              style={{ width: "80%" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-6 py-16">
        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <h2 className="font-headline text-primary mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            Personaliza tu experiencia de compra
          </h2>
          <p className="font-body text-on-surface-variant max-w-2xl text-lg">
            Estas preferencias nos ayudan a mostrarte lo más relevante para ti.
          </p>
        </div>

        {/* Purchase Type */}
        <section className="mb-12">
          <h3 className="font-headline text-primary mb-6 text-xl font-bold">
            Tipo de compra
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Card 1 (Individual) */}
            <button
              type="button"
              onClick={() => setPurchaseType("individual")}
              className={`group relative cursor-pointer rounded-xl p-6 text-left transition-colors ${purchaseType === "individual" ? "bg-surface-container-lowest border-primary-container border-2 shadow-[0_10px_40px_0_rgba(20,48,103,0.06)]" : "bg-surface-container-lowest hover:bg-surface-container-low outline-opacity-20 outline-outline-variant outline outline-1"}`}
            >
              {purchaseType === "individual" && (
                <div className="border-surface-container-lowest bg-primary-container text-on-primary absolute -top-3 -right-3 rounded-full border-4 p-1">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div
                  className={`bg-surface rounded-full p-3 transition-transform group-hover:scale-110 ${purchaseType === "individual" ? "text-primary-container" : "text-primary-container"}`}
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 0" }}
                  >
                    person
                  </span>
                </div>
                <div>
                  <h4
                    className={`font-headline mb-1 font-bold ${purchaseType === "individual" ? "text-primary-container" : "text-on-surface"}`}
                  >
                    Compra individual
                  </h4>
                  <p className="font-body text-on-surface-variant text-sm">
                    Para uso personal o de consultorio pequeño.
                  </p>
                </div>
              </div>
            </button>

            {/* Card 2 (Mayor) */}
            <button
              type="button"
              onClick={() => setPurchaseType("mayor")}
              className={`group relative cursor-pointer rounded-xl p-6 text-left transition-colors ${purchaseType === "mayor" ? "bg-surface-container-lowest border-primary-container border-2 shadow-[0_10px_40px_0_rgba(20,48,103,0.06)]" : "bg-surface-container-lowest hover:bg-surface-container-low outline-opacity-20 outline-outline-variant outline outline-1"}`}
            >
              {purchaseType === "mayor" && (
                <div className="border-surface-container-lowest bg-primary-container text-on-primary absolute -top-3 -right-3 rounded-full border-4 p-1">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </div>
              )}
              <div className="flex items-start gap-4">
                <div className="bg-surface text-primary-container rounded-full p-3">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    groups
                  </span>
                </div>
                <div>
                  <h4
                    className={`font-headline mb-1 font-bold ${purchaseType === "mayor" ? "text-primary-container" : "text-on-surface"}`}
                  >
                    Compra al por mayor
                  </h4>
                  <p className="font-body text-on-surface-variant text-sm">
                    10+ prendas con precio especial. Ideal para clínicas.
                  </p>
                </div>
              </div>
            </button>
          </div>
        </section>

        {/* Color Preferences */}
        <section className="mb-12">
          <h3 className="font-headline text-primary mb-6 text-xl font-bold">
            ¿Tienes colores favoritos para tus scrubs? (hasta 3)
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {colors.map((color) => {
              const isSelected = selectedColors.includes(color.id);
              return (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => toggleColor(color.id)}
                  className="group flex cursor-pointer flex-col items-center gap-2"
                >
                  <div
                    className={`border-surface relative flex h-16 w-16 items-center justify-center rounded-full border-4 shadow-sm transition-transform ${!isSelected ? "group-hover:scale-105" : "ring-primary-container ring-2"}`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {isSelected && (
                      <span
                        className={`material-symbols-outlined ${color.hex === "#ffffff" ? "text-primary" : "text-white"}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-label text-center text-sm ${isSelected ? "text-on-surface font-semibold" : "text-on-surface-variant"}`}
                  >
                    {color.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Notification Preferences */}
        <section className="mb-16">
          <h3 className="font-headline text-primary mb-6 text-xl font-bold">
            ¿Cuándo quieres que te avisemos?
          </h3>
          <div className="flex flex-col gap-4">
            {Object.entries(notifications).map(([label, active]) => (
              <button
                key={label}
                type="button"
                onClick={() => toggleNotification(label)}
                className={`relative flex cursor-pointer items-center justify-between overflow-hidden rounded-xl border p-4 text-left transition-colors ${active ? "border-primary-container/20 bg-surface-container-lowest shadow-[0_10px_40px_0_rgba(20,48,103,0.06)]" : "border-outline-variant bg-surface-container-lowest hover:bg-surface-container-low"}`}
              >
                {active && (
                  <div className="bg-primary-container/5 pointer-events-none absolute inset-0"></div>
                )}
                <span className="font-label text-primary-container font-bold">
                  {label}
                </span>
                <div
                  className={`relative flex h-6 w-12 items-center rounded-full transition-colors ${active ? "bg-primary-container" : "bg-slate-200"}`}
                >
                  <span
                    className={`absolute h-5 w-5 rounded-full shadow-sm transition-all ${active ? "right-0.5 bg-white" : "left-0.5 bg-slate-500"}`}
                  ></span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-col items-center gap-6">
          <Link
            href="/onboarding/final"
            className="from-primary-container font-label text-on-primary flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r to-[#2c457d] py-4 text-lg font-bold transition-all hover:shadow-lg"
          >
            Continuar{" "}
            <span className="material-symbols-outlined text-[20px]">
              arrow_forward
            </span>
          </Link>
          <div className="font-label flex w-full justify-between text-sm">
            <Link
              href="/onboarding/institucion"
              className="text-primary-container flex items-center gap-1 underline-offset-4 hover:underline"
            >
              <span className="material-symbols-outlined text-[16px]">
                arrow_back
              </span>{" "}
              Atrás
            </Link>
            <Link
              href="/onboarding/final"
              className="text-on-surface-variant hover:text-primary-container underline underline-offset-4 transition-colors"
            >
              Omitir este paso
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
