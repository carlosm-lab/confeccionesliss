"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { updatePasswordAction } from "@/actions/auth";

export default function ActualizarPasswordPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { execute, status, result } = useAction(updatePasswordAction, {
    onSuccess: (data) => {
      if (data.data?.success) {
        // Middleware decides: /cuenta if onboarding done, /onboarding/perfil otherwise
        router.push("/cuenta");
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return;
    execute({ password });
  };

  const isLoading = status === "executing";

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen flex-col antialiased">
      {/* Header */}
      <header className="bg-surface-container-lowest sticky top-0 z-50 mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-6 shadow-sm">
        <Link
          href="/"
          className="font-headline text-primary text-2xl font-bold tracking-tighter"
        >
          Confecciones Liss
        </Link>
      </header>

      {/* Main Content */}
      <main className="bg-surface-container-low relative flex flex-grow items-center justify-center overflow-hidden px-4 py-12">
        {/* Decorative background */}
        <div className="from-primary-fixed/20 pointer-events-none absolute top-0 left-0 -z-10 h-96 w-full bg-gradient-to-b to-transparent"></div>
        <div className="bg-secondary-container/30 pointer-events-none absolute -top-40 -right-40 -z-10 h-96 w-96 rounded-full blur-3xl"></div>

        {/* Card */}
        <div className="bg-surface-container-lowest border-outline-variant/15 relative z-10 w-full max-w-[440px] rounded-xl border p-8 shadow-sm md:p-10">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="bg-primary-fixed mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <span
                className="material-symbols-outlined text-primary text-3xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                key
              </span>
            </div>
            <h2 className="font-headline text-on-surface mb-3 text-2xl font-bold tracking-tight md:text-3xl">
              Crea una nueva contraseña
            </h2>
            <p className="font-body text-on-surface-variant text-base leading-relaxed">
              Ingresa tu nueva contraseña para tu cuenta.
            </p>
          </div>

          {result.serverError && (
            <div className="bg-error-container text-on-error-container mb-6 rounded-md p-4 text-sm">
              Ocurrió un error al actualizar la contraseña. Intenta nuevamente.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                className="font-label text-on-surface mb-2 block text-sm font-medium"
                htmlFor="new-password"
              >
                Nueva contraseña
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="material-symbols-outlined text-outline">
                    lock
                  </span>
                </div>
                <input
                  className="bg-surface-container-high text-on-surface focus:ring-primary font-body block w-full rounded-lg border-0 py-3 pr-3 pl-10 text-base transition-shadow focus:ring-2 focus:outline-none"
                  id="new-password"
                  placeholder="Mínimo 6 caracteres"
                  required
                  type="password"
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <button
              className="font-headline text-on-primary bg-primary hover:bg-primary-container focus:ring-primary flex w-full items-center justify-center rounded-lg border border-transparent px-4 py-3 text-base font-semibold shadow-sm transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isLoading || password.length < 6}
            >
              {isLoading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                "Guardar nueva contraseña"
              )}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-primary-container mt-auto w-full">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-3">
          <div className="flex flex-col space-y-4">
            <span className="font-headline text-on-primary text-xl font-black tracking-tighter">
              Confecciones Liss
            </span>
            <p className="font-body text-surface-variant/80 max-w-xs text-sm leading-relaxed">
              Diseño y calidad en indumentaria médica profesional.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-headline text-on-primary text-sm font-bold tracking-wider uppercase">
              Enlaces
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                className="font-body text-surface-variant hover:text-on-primary text-sm transition-colors duration-200"
                href="/nosotros"
              >
                Nosotros
              </Link>
              <Link
                className="font-body text-surface-variant hover:text-on-primary text-sm transition-colors duration-200"
                href="/contacto"
              >
                Contacto
              </Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-4">
            <h3 className="font-headline text-on-primary text-sm font-bold tracking-wider uppercase">
              Legal
            </h3>
            <nav className="flex flex-col space-y-3">
              <Link
                className="font-body text-surface-variant hover:text-on-primary text-sm transition-colors duration-200"
                href="/legal"
              >
                Política de Privacidad
              </Link>
              <Link
                className="font-body text-surface-variant hover:text-on-primary text-sm transition-colors duration-200"
                href="/legal?tab=terminos"
              >
                Términos de Servicio
              </Link>
              <Link
                className="font-body text-surface-variant hover:text-on-primary text-sm transition-colors duration-200"
                href="/legal?tab=cookies"
              >
                Cookies
              </Link>
            </nav>
          </div>
        </div>
        <div className="bg-primary border-primary-fixed/10 w-full border-t px-8 py-6">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
            <span className="font-body text-surface-variant/60 text-sm">
              © 2026 Confecciones Liss. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
