"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegistroPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push("/verificar");
    }, 800);
  };

  return (
    <div className="bg-surface text-on-surface font-body flex min-h-screen flex-col antialiased">
      {/* Header */}
      <header className="bg-surface-container-lowest/85 font-headline sticky top-0 z-50 flex w-full items-center justify-between px-8 py-4 font-bold tracking-tight shadow-sm backdrop-blur-md">
        <Link
          href="/"
          className="text-primary-container text-xl font-extrabold"
        >
          Confecciones Liss
        </Link>
        <Link
          className="text-on-surface-variant hover:text-primary-container font-label text-sm transition-colors"
          href="/login"
        >
          ¿Ya tienes cuenta? Inicia sesión
        </Link>
      </header>

      <main className="flex flex-grow flex-col md:flex-row">
        {/* Left Column (Image & Benefits) */}
        <div className="bg-primary-container text-on-primary relative hidden flex-col justify-between p-12 md:flex md:w-1/2">
          <div className="absolute inset-0 z-0">
            <Image
              width={960}
              height={1080}
              alt="Taller de confección"
              className="h-full w-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM_1z8gnFt1XKoT38O4NANaFLBop6NTOQOrY_lu3TJtAO9JM5v8MyKszb2lP3yq54PKKG3Q1oWHYW8wOPuoBQXlIskTOl8a6nVwNLNErCuufnNRuSGCUnoEuReUfvYIP107drc1iZ8qohja0_uz7xf3F3xViSlwUajbuRFiMNXkzIjkGqPr7LKriWJAVgUMGtIfDDOB4Ny6e_pCTu_Q9pRGLiq9wTRYoQZGA_8ZV56Id6EeJNDs0qP_M6vxON8wGuarZiyvzBYzJ-t"
            />
            <div className="bg-primary-container/65 absolute inset-0"></div>
          </div>
          <div className="relative z-10 flex h-full flex-col justify-center">
            <div className="mb-12">
              <h1 className="font-headline mb-4 text-4xl font-extrabold tracking-tight">
                Confecciones Liss
              </h1>
              <p className="font-body text-secondary-fixed-dim text-lg">
                Precisión en cada puntada. Calidad para el profesional de la
                salud.
              </p>
            </div>
            <ul className="font-body mb-12 space-y-6">
              <li className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  favorite
                </span>
                <span className="text-lg">Guarda tus favoritos</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  local_shipping
                </span>
                <span className="text-lg">Seguimiento de pedidos</span>
              </li>
              <li className="flex items-center space-x-4">
                <span className="material-symbols-outlined text-3xl">
                  styler
                </span>
                <span className="text-lg">
                  Catálogo personalizado según tu institución
                </span>
              </li>
            </ul>
            <div className="mt-auto">
              <p className="text-secondary-fixed-dim mb-4 text-sm">
                ¿Ya tienes cuenta?
              </p>
              <Link
                href="/login"
                className="border-on-primary text-on-primary hover:bg-on-primary hover:text-primary-container font-label inline-block rounded border-2 px-8 py-3 text-sm font-bold tracking-wider uppercase transition-colors"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (Registration Form) */}
        <div className="bg-surface-bright flex w-full items-center justify-center p-8 md:w-1/2 md:p-12">
          <div className="w-full max-w-[400px]">
            <h2 className="font-headline text-primary-container mb-2 text-3xl font-bold tracking-tight">
              Crea tu cuenta
            </h2>
            <p className="font-body text-on-surface-variant mb-8">
              Es rápido y completamente gratis.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm"
                  htmlFor="reg-fullName"
                >
                  Nombre completo
                </label>
                <input
                  className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                  id="reg-fullName"
                  required
                  type="text"
                />
              </div>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm"
                  htmlFor="reg-email"
                >
                  Correo electrónico
                </label>
                <input
                  className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                  id="reg-email"
                  required
                  type="email"
                />
              </div>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm"
                  htmlFor="reg-password"
                >
                  Contraseña
                </label>
                <input
                  className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface mb-2 w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                  id="reg-password"
                  required
                  type="password"
                />
                <div className="flex h-1 w-full space-x-1">
                  <div className="bg-error w-1/3 rounded-l"></div>
                  <div className="bg-surface-variant w-1/3"></div>
                  <div className="bg-surface-variant w-1/3 rounded-r"></div>
                </div>
                <p className="text-on-surface-variant mt-1 text-right text-xs">
                  Débil
                </p>
              </div>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm"
                  htmlFor="reg-confirmPassword"
                >
                  Confirmar contraseña
                </label>
                <input
                  className="bg-surface-container-low focus:bg-surface-container-highest focus:border-primary text-on-surface w-full rounded border-b-2 border-none border-transparent p-3 transition-all focus:ring-0"
                  id="reg-confirmPassword"
                  required
                  type="password"
                />
              </div>
              <div className="space-y-3">
                <label className="group flex cursor-pointer items-start space-x-3">
                  <input
                    className="form-checkbox text-primary-container border-outline-variant focus:ring-primary-container mt-1 h-5 w-5 rounded"
                    required
                    type="checkbox"
                  />
                  <span className="font-body text-on-surface-variant group-hover:text-on-surface text-sm transition-colors">
                    Acepto los{" "}
                    <Link
                      className="text-primary-container hover:underline"
                      href="/legal?tab=terminos"
                    >
                      Términos de uso
                    </Link>{" "}
                    y{" "}
                    <Link
                      className="text-primary-container hover:underline"
                      href="/legal"
                    >
                      Política de privacidad
                    </Link>
                  </span>
                </label>
                <label className="group flex cursor-pointer items-start space-x-3">
                  <input
                    className="form-checkbox text-primary-container border-outline-variant focus:ring-primary-container mt-1 h-5 w-5 rounded"
                    type="checkbox"
                  />
                  <span className="font-body text-on-surface-variant group-hover:text-on-surface text-sm transition-colors">
                    Quiero recibir novedades y promociones
                  </span>
                </label>
              </div>
              <button
                className="bg-primary-container text-on-primary font-label hover:bg-primary mt-4 w-full rounded py-3 text-center text-sm font-bold tracking-wider uppercase transition-colors disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Creando cuenta..." : "Crear cuenta"}
              </button>
              <div className="relative flex items-center py-5">
                <div className="border-surface-variant flex-grow border-t"></div>
                <span className="text-on-surface-variant font-body mx-4 flex-shrink-0 text-sm">
                  o continúa con
                </span>
                <div className="border-surface-variant flex-grow border-t"></div>
              </div>
              <button
                className="bg-surface-container-lowest border-outline-variant text-on-surface font-label hover:bg-surface-container-low flex w-full items-center justify-center space-x-3 rounded border py-3 font-bold transition-colors"
                type="button"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  ></path>
                </svg>
                <span>Continuar con Google</span>
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
