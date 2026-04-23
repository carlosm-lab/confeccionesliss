"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function OnboardingStep1Page() {
  const [sizeFav, setSizeFav] = useState<string>("M");
  const [genderFav, setGenderFav] = useState<string>("Femenino");
  const [department, setDepartment] = useState<string>("");

  return (
    <div className="bg-background font-body text-on-background flex min-h-screen flex-col">
      {/* TopAppBar */}
      <header className="bg-surface-container-low/80 border-surface-variant sticky top-0 z-50 w-full border-b px-6 py-4 shadow-sm backdrop-blur-lg">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="font-headline text-primary text-xl font-extrabold tracking-tighter">
            Confecciones Liss
          </div>
          <Link
            href="/"
            className="font-headline text-primary hover:text-error text-lg font-bold tracking-tight transition-colors active:scale-95"
          >
            Completar más tarde
          </Link>
        </div>
      </header>

      <main className="flex-grow px-4 py-12 sm:px-6 lg:px-8">
        {/* Progress Tracker */}
        <div className="mx-auto mb-10 w-full max-w-4xl">
          <div className="border-outline-variant/15 bg-surface-container-lowest rounded-xl border p-6 shadow-sm">
            <div className="relative">
              <div className="bg-surface-container mb-4 flex h-2 overflow-hidden rounded text-xs">
                <div
                  className="bg-primary-container flex flex-col justify-center text-center whitespace-nowrap text-white shadow-none transition-all"
                  style={{ width: "20%" }}
                ></div>
              </div>
              <div className="font-label text-outline flex w-full justify-between text-xs">
                <div className="text-primary-container flex flex-col items-center font-semibold">
                  <span className="bg-primary-container text-on-primary mb-1 flex h-6 w-6 items-center justify-center rounded-full">
                    1
                  </span>
                  Perfil
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-surface-container text-on-surface-variant mb-1 flex h-6 w-6 items-center justify-center rounded-full">
                    2
                  </span>
                  Rol
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-surface-container text-on-surface-variant mb-1 flex h-6 w-6 items-center justify-center rounded-full">
                    3
                  </span>
                  Institución
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-surface-container text-on-surface-variant mb-1 flex h-6 w-6 items-center justify-center rounded-full">
                    4
                  </span>
                  Preferencias
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-surface-container text-on-surface-variant mb-1 flex h-6 w-6 items-center justify-center rounded-full">
                    5
                  </span>
                  ¡Listo!
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h2 className="font-headline text-primary mb-3 text-3xl font-extrabold tracking-tight md:text-4xl">
            ¡Bienvenido/a a Confecciones Liss!
          </h2>
          <p className="font-body text-on-surface-variant text-lg">
            Solo necesitamos algunos datos. Toma menos de 2 minutos.
          </p>
        </div>

        {/* Form Card */}
        <div className="border-outline-variant/15 bg-surface-container-lowest mx-auto max-w-3xl rounded-xl border p-8 shadow-sm md:p-10">
          <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
            <h3 className="border-surface-container-high font-headline text-primary-container border-b pb-4 text-2xl font-bold">
              Cuéntanos sobre ti
            </h3>

            {/* Photo Section */}
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
              <label
                htmlFor="avatar-upload"
                className="border-primary-container bg-surface-container-low text-primary-container hover:bg-surface-container relative flex h-24 w-24 cursor-pointer items-center justify-center rounded-full border-2 border-dashed transition-colors"
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  photo_camera
                </span>
                <input
                  id="avatar-upload"
                  type="file"
                  className="sr-only"
                  accept="image/png, image/jpeg"
                />
              </label>
              <div className="pt-2 text-center sm:text-left">
                <label
                  htmlFor="avatar-upload"
                  className="font-label text-primary-container mb-1 block cursor-pointer font-semibold underline-offset-4 hover:underline"
                >
                  Subir foto de perfil
                </label>
                <p className="text-outline text-sm">JPG o PNG, máx. 2MB</p>
              </div>
            </div>

            {/* Personal Data */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="username"
                  className="font-label text-on-surface mb-2 block text-sm font-medium"
                >
                  Nombre de usuario
                </label>
                <div className="relative">
                  <input
                    id="username"
                    type="text"
                    placeholder="ej. dra_martinez"
                    className="border-outline-variant/20 bg-surface-container-lowest focus:border-primary focus:ring-primary w-full rounded-lg shadow-sm focus:ring-1"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="material-symbols-outlined text-lg text-green-600">
                      check_circle
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="display_name"
                  className="font-label text-on-surface mb-2 block text-sm font-medium"
                >
                  Nombre a mostrar
                </label>
                <input
                  id="display_name"
                  type="text"
                  placeholder="Dra. Martínez"
                  className="border-outline-variant/20 bg-surface-container-lowest focus:border-primary focus:ring-primary w-full rounded-lg shadow-sm focus:ring-1"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="phone"
                  className="font-label text-on-surface mb-2 block text-sm font-medium"
                >
                  Teléfono móvil
                </label>
                <div className="flex rounded-lg shadow-sm">
                  <span className="border-outline-variant/20 bg-surface-container-low text-on-surface-variant inline-flex items-center rounded-l-lg border border-r-0 px-4 text-sm">
                    +503
                  </span>
                  <input
                    id="phone"
                    type="tel"
                    placeholder="7000 0000"
                    className="border-outline-variant/20 bg-surface-container-lowest focus:border-primary focus:ring-primary block w-full min-w-0 flex-1 rounded-none rounded-r-lg px-3 py-2 shadow-sm focus:ring-1"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="secondary_email"
                  className="font-label text-on-surface mb-2 block text-sm font-medium"
                >
                  Correo secundario{" "}
                  <span className="text-outline text-xs font-normal">
                    (opcional)
                  </span>
                </label>
                <input
                  id="secondary_email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className="border-outline-variant/20 bg-surface-container-lowest focus:border-primary focus:ring-primary w-full rounded-lg shadow-sm focus:ring-1"
                />
              </div>
            </div>

            {/* Sizes Section */}
            <div className="border-surface-container-high space-y-6 border-t pt-6">
              <div>
                <div className="mb-3 flex items-end justify-between">
                  <div className="font-label text-on-surface block text-sm font-medium">
                    Tu talla habitual para scrubs
                  </div>
                  <Link
                    href="#"
                    className="text-primary hover:text-error text-xs font-medium underline-offset-4 transition-colors hover:underline"
                  >
                    No sé mi talla — ver guía
                  </Link>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSizeFav(size)}
                      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${sizeFav === size ? "bg-primary-container text-on-primary shadow-sm" : "border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border"}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-label text-on-surface mb-3 block text-sm font-medium">
                  Género preferido para el corte
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Femenino", "Masculino", "Prefiero no indicar"].map(
                    (gender) => (
                      <button
                        key={gender}
                        type="button"
                        onClick={() => setGenderFav(gender)}
                        className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${genderFav === gender ? "bg-primary-fixed text-on-primary-fixed ring-primary border-transparent ring-2" : "border-outline-variant/20 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container border"}`}
                      >
                        {gender}
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="border-surface-container-high space-y-6 border-t pt-6">
              <h4 className="font-label text-primary text-base font-semibold">
                Dirección de entrega{" "}
                <span className="text-outline text-sm font-normal">
                  (opcional)
                </span>
              </h4>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="departamento"
                    className="font-label text-on-surface mb-2 block text-sm font-medium"
                  >
                    Departamento
                  </label>
                  <select
                    id="departamento"
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="border-outline-variant/20 bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-primary w-full rounded-lg shadow-sm focus:ring-1"
                  >
                    <option value="">Seleccione...</option>
                    <option value="San Miguel">San Miguel</option>
                    <option value="La Unión">La Unión</option>
                    <option value="Morazán">Morazán</option>
                    <option value="Usulután">Usulután</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="municipio"
                    className="font-label text-on-surface mb-2 block text-sm font-medium"
                  >
                    Municipio
                  </label>
                  <select
                    id="municipio"
                    disabled={!department}
                    className="border-outline-variant/20 bg-surface-container-lowest text-on-surface focus:border-primary focus:ring-primary w-full rounded-lg shadow-sm focus:ring-1 disabled:opacity-50"
                  >
                    <option value="">Seleccione...</option>
                    {department === "San Miguel" && (
                      <option value="San Miguel Centro">
                        San Miguel Centro
                      </option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="direccion_exacta"
                  className="font-label text-on-surface mb-2 block text-sm font-medium"
                >
                  Dirección exacta
                </label>
                <textarea
                  id="direccion_exacta"
                  rows={3}
                  placeholder="Colonia, calle, número de casa..."
                  className="border-outline-variant/20 bg-surface-container-lowest focus:border-primary focus:ring-primary w-full rounded-lg shadow-sm focus:ring-1"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="referencia"
                  className="font-label text-on-surface mb-2 block text-sm font-medium"
                >
                  Punto de referencia
                </label>
                <input
                  id="referencia"
                  type="text"
                  placeholder="Ej. Frente a farmacia X"
                  className="border-outline-variant/20 bg-surface-container-lowest focus:border-primary focus:ring-primary w-full rounded-lg shadow-sm focus:ring-1"
                />
              </div>

              <div
                className="border-outline-variant/20 bg-surface-container-low relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-xl border"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1KIVRr7pUsangA0_Er4y_mzPCv1sIjRfE3kn0IFq9-Qydwd54-iKvRYVOgDS_647h4NSN81OHPyru4AY7yfqSsMsUDcvtV-K2wxPfNr34eFmYArbYOY36UZKClYp_yVHRBVO4TcR_0s29O0xvhK-FVKTiSzd6EPaXGE3eosf5_MrTgdqwSSZJ2ob0VYmp9jP2c-EKy-JTIiD1UX2Ql1ChKUpjvWSXinOi1mYOw9SIYP3YBQ1T_LyInitkPnCRfrbfCiZf2-q_VjM')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
                <button
                  type="button"
                  className="text-primary hover:bg-surface-bright relative z-10 flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-semibold shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    location_on
                  </span>
                  Marcar mi ubicación exacta
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center gap-4 pt-8">
              <Link
                href="/onboarding/roles"
                className="group bg-primary-container text-on-primary hover:bg-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 text-lg font-semibold shadow-md transition-colors"
              >
                Continuar
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="#"
                className="text-outline hover:text-primary text-sm font-medium transition-colors"
              >
                Completar más tarde
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
