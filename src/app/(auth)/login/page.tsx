"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { signInAction } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorMsg = searchParams.get("error");
  const [authError, setAuthError] = useState<string | null>(
    errorMsg === "auth_callback_error"
      ? "Error al iniciar sesión con Google. Por favor, intenta de nuevo."
      : null
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    setIsLoading(true);
    setAuthError(null);

    const result = await signInAction({ email, password });

    if (result?.data) {
      // Middleware redirects properly, but just to be safe we push to root
      router.push("/");
      router.refresh();
    } else if (result?.serverError) {
      setAuthError("Credenciales incorrectas. Verifica tu email y contraseña.");
      setIsLoading(false);
    } else {
      setAuthError("Ocurrió un error inesperado.");
      setIsLoading(false);
    }
  };

  const handleOAuth = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/callback?next=/cuenta`,
      },
    });

    if (error) {
      setAuthError(error.message);
      setIsLoading(false);
    }
  };

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
          ¿Necesitas ayuda?
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
            {authError && (
              <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                {authError}
              </div>
            )}
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
            <button
              type="button"
              onClick={handleOAuth}
              disabled={isLoading}
              className="bg-surface-container-lowest border-outline-variant/30 text-on-surface font-body hover:bg-surface-container-low flex w-full items-center justify-center space-x-3 rounded-xl border px-6 py-4 font-semibold transition-colors duration-200 disabled:opacity-50"
            >
              <GoogleIcon />
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
