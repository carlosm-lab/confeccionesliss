"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { resendVerificationAction } from "@/actions/auth";

function VerificarContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const typeParam = searchParams.get("type") as
    | "signup"
    | "recovery"
    | "magiclink"
    | null;
  const [countdown, setCountdown] = useState(59);

  const { execute, status, result } = useAction(resendVerificationAction, {
    onSuccess: (data) => {
      if (data.data?.success) {
        setCountdown(59);
      }
    },
  });

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const formattedTime = `00:${String(countdown).padStart(2, "0")}`;
  const isLoading = status === "executing";

  const handleResend = () => {
    if (countdown <= 0 && emailParam) {
      execute({ email: emailParam, type: typeParam || "signup" });
    }
  };

  return (
    <main className="flex flex-grow items-center justify-center p-6">
      <div
        className="bg-surface-container-lowest relative w-full max-w-[440px] rounded-lg p-8 md:p-12"
        style={{ boxShadow: "0 10px 40px -10px rgba(25, 28, 30, 0.05)" }}
      >
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="bg-secondary-container flex h-20 w-20 items-center justify-center rounded-full">
            <span
              className="material-symbols-outlined text-primary-container text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              drafts
            </span>
          </div>
        </div>

        {/* Title */}
        <h2 className="font-headline text-primary mb-4 text-center text-3xl font-bold tracking-tight">
          ¡Revisa tu correo!
        </h2>

        {/* Text */}
        <p className="font-body text-on-surface-variant mb-8 text-center text-base leading-relaxed">
          Enviamos un enlace{" "}
          {emailParam ? (
            <>
              a{" "}
              <span className="text-on-surface font-medium">{emailParam}</span>
            </>
          ) : (
            "a tu correo electrónico"
          )}
          . Válido por 30 minutos.
        </p>

        {result.serverError && (
          <div className="bg-error-container text-on-error-container mb-6 rounded-md p-4 text-sm">
            Ocurrió un error al reenviar el correo. Intenta de nuevo más tarde.
          </div>
        )}

        {/* Actions */}
        <div className="space-y-6">
          {/* Disabled Button / Countdown */}
          <button
            className="border-outline-variant text-on-surface-variant bg-surface-container-highest hover:bg-surface-container-high focus:ring-primary font-body flex w-full items-center justify-center gap-2 rounded-md border px-6 py-3 font-medium transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70"
            disabled={countdown > 0 || isLoading || !emailParam}
            onClick={handleResend}
          >
            {isLoading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">
                  schedule
                </span>
                {countdown > 0
                  ? `Reenviar correo en ${formattedTime}`
                  : "Reenviar correo"}
              </>
            )}
          </button>

          {/* Links */}
          <div className="flex flex-col items-center gap-4 pt-2">
            <Link
              className="font-body text-primary hover:text-primary-container text-sm font-medium transition-colors"
              href="/recuperar"
            >
              ¿Correo incorrecto?
            </Link>
            <Link
              className="font-body text-on-surface-variant hover:text-on-surface flex items-center gap-2 text-sm transition-colors"
              href="/login"
            >
              <span className="material-symbols-outlined text-[18px]">
                arrow_back
              </span>
              Volver al login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function VerificarPage() {
  return (
    <div className="bg-surface text-on-surface font-body flex min-h-screen flex-col antialiased">
      {/* Header */}
      <header className="bg-surface-container-lowest flex h-20 w-full items-center justify-center px-6 shadow-sm transition-all duration-300 ease-in-out">
        <Link
          className="font-headline text-primary text-2xl font-bold tracking-tighter"
          href="/"
        >
          Confecciones Liss
        </Link>
      </header>

      {/* Main Content with Suspense */}
      <Suspense
        fallback={
          <main className="flex flex-grow items-center justify-center p-6">
            <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent" />
          </main>
        }
      >
        <VerificarContent />
      </Suspense>

      {/* Footer */}
      <footer className="bg-primary-container font-body mt-auto w-full text-sm leading-relaxed text-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-3">
          <div className="flex flex-col gap-4">
            <span className="font-headline text-xl font-black text-white">
              Confecciones Liss
            </span>
            <p className="text-slate-300">
              Vestuario médico de alta precisión y calidad.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              className="text-slate-300 transition-colors duration-200 hover:text-white"
              href="/nosotros"
            >
              Nosotros
            </Link>
            <Link
              className="text-slate-300 transition-colors duration-200 hover:text-white"
              href="/contacto"
            >
              Contacto
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link
              className="text-slate-300 transition-colors duration-200 hover:text-white"
              href="/legal"
            >
              Política de Privacidad
            </Link>
            <Link
              className="text-slate-300 transition-colors duration-200 hover:text-white"
              href="/legal?tab=terminos"
            >
              Términos de Servicio
            </Link>
            <Link
              className="text-slate-300 transition-colors duration-200 hover:text-white"
              href="/legal?tab=cookies"
            >
              Cookies
            </Link>
          </div>
        </div>
        <div className="bg-[#0f2347] px-8 py-6 text-center text-slate-400">
          <p>© 2026 Confecciones Liss. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
