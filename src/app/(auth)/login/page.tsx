"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/context/useAppStore";

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAppStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!email.trim() || !password.trim()) return;
      setIsLoading(true);

      setTimeout(() => {
        setUser({
          id: "1",
          nombre: "María González",
          email,
          avatar: null,
          primerLogin: true,
        });
        setIsLoading(false);
        router.push("/onboarding/perfil");
      }, 800);
    },
    [email, password, setUser, router]
  );

  return (
    <div className="bg-surface text-on-surface flex min-h-screen flex-col">
      {/* Header */}
      <header className="fixed top-0 z-50 flex w-full items-center justify-between bg-white/80 px-8 py-4 shadow-sm shadow-blue-900/5 backdrop-blur-xl transition-all">
        <Link
          href="/"
          className="font-headline text-xl font-bold tracking-tighter text-[#143067]"
        >
          Confecciones Liss
        </Link>
        <Link
          className="text-sm font-medium text-slate-500 transition-colors duration-200 hover:text-[#001b4a]"
          href="/ayuda"
        >
          Need help?
        </Link>
      </header>

      <main className="flex flex-grow flex-col pt-[72px] md:flex-row">
        {/* Left Column: Branding / Image */}
        <div className="bg-primary-container text-on-primary relative hidden w-1/2 flex-col items-center justify-center overflow-hidden p-12 md:flex">
          <div className="absolute inset-0 z-0">
            <Image
              width={960}
              height={1080}
              alt="Fondo profesional médico"
              className="h-full w-full object-cover opacity-50 mix-blend-overlay grayscale"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjHsN_wz3aIYj3sR21g1taAth--ENROmlFc5e4aQcEqpn0MAWEW3Igdw3IZpCEXHFGx6s4Mohp106evFe9WI_kCtUzRXCiqlQZsZAg1fj4BgIBZyz_gD7vfkltwThLlXAfVaQzt6YqAEVuuTdjm4E2IgaXT71rqcOSJJdKhc5yjKxB07DvOwygls8MpWydxrT97e-FJ6RTqG9lrQy2_R3Nls4uBZY7i-FbRF0j4EVaL0ATZdpW7dqi0PIjfqCXhJQBKiI-WrDwrgk"
            />
            <div className="bg-primary-container/80 absolute inset-0"></div>
          </div>
          <div className="relative z-10 flex w-full max-w-md flex-col items-start space-y-8">
            <div>
              <span
                className="material-symbols-outlined mb-4 text-6xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                medical_services
              </span>
              <h1 className="font-headline text-on-primary mb-2 text-5xl leading-tight font-extrabold">
                Confecciones Liss
              </h1>
              <p className="font-body text-primary-fixed-dim text-xl font-medium">
                Tu uniforme, tu identidad profesional.
              </p>
            </div>
            <div className="border-primary-fixed-dim/30 w-full space-y-4 border-t pt-8">
              <div className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-on-primary">
                  check_circle
                </span>
                <span className="font-body text-lg">
                  Confección artesanal a medida.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-on-primary">
                  check_circle
                </span>
                <span className="font-body text-lg">
                  Entrega en San Miguel y zona oriental.
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="material-symbols-outlined text-on-primary">
                  check_circle
                </span>
                <span className="font-body text-lg">Calidad garantizada.</span>
              </div>
            </div>
            <div className="mt-auto w-full pt-16">
              <Link
                href="/registro"
                className="border-on-primary/30 text-on-primary font-body hover:bg-on-primary/10 block w-full rounded-xl border-2 px-6 py-4 text-center font-semibold transition-colors duration-200"
              >
                Crear cuenta gratis
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="bg-surface-container-lowest flex w-full flex-col items-center justify-center p-8 md:w-1/2 md:p-16">
          <div className="w-full max-w-[400px]">
            <div className="mb-8 text-right">
              <Link
                className="font-body text-primary-container hover:text-primary text-sm transition-colors"
                href="/registro"
              >
                ¿Primera vez? Regístrate
              </Link>
            </div>
            <h2 className="font-headline text-on-surface mb-8 text-3xl font-bold">
              Bienvenido de vuelta
            </h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm font-medium"
                  htmlFor="login-email"
                >
                  Correo electrónico
                </label>
                <input
                  className="bg-surface-container-low border-outline-variant/30 text-on-surface focus:border-primary-container focus:bg-surface-container-lowest w-full rounded-t-lg border-0 border-b px-4 py-3 transition-all duration-200 focus:ring-0"
                  id="login-email"
                  placeholder="tu@correo.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="font-label text-on-surface-variant mb-2 block text-sm font-medium"
                  htmlFor="login-password"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <input
                    className="bg-surface-container-low border-outline-variant/30 text-on-surface focus:border-primary-container focus:bg-surface-container-lowest w-full rounded-t-lg border-0 border-b px-4 py-3 pr-12 transition-all duration-200 focus:ring-0"
                    id="login-password"
                    placeholder="••••••••"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className="text-on-surface-variant hover:text-primary-container absolute top-1/2 right-3 -translate-y-1/2"
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
                <div className="mt-2 text-right">
                  <Link
                    className="font-body text-primary-container hover:text-primary text-sm transition-colors"
                    href="/recuperar"
                  >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>
              <button
                className="bg-primary-container text-on-primary font-body hover:bg-primary w-full rounded-xl px-6 py-4 font-semibold shadow-[0_4px_14px_0_rgba(20,48,103,0.2)] transition-all duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                type="submit"
                disabled={isLoading || !email.trim() || !password.trim()}
              >
                {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
              </button>
            </form>
            <div className="my-8 flex items-center justify-center space-x-4">
              <div className="bg-outline-variant/30 h-px w-full"></div>
              <span className="font-body text-on-surface-variant text-sm whitespace-nowrap">
                o continúa con
              </span>
              <div className="bg-outline-variant/30 h-px w-full"></div>
            </div>
            <button className="bg-surface-container-lowest border-outline-variant/30 text-on-surface font-body hover:bg-surface-container-low flex w-full items-center justify-center space-x-3 rounded-xl border px-6 py-4 font-semibold transition-colors duration-200">
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
            <div className="mt-8 text-center">
              <Link
                className="font-body text-primary-container hover:text-primary text-sm font-semibold transition-colors"
                href="/registro"
              >
                ¿No tienes cuenta? Regístrate aquí
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
