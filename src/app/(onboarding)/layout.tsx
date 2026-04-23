"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Perfil", path: "/onboarding/perfil" },
  { id: 2, label: "Rol", path: "/onboarding/rol" },
  { id: 3, label: "Institución", path: "/onboarding/institucion" },
  { id: 4, label: "Preferencias", path: "/onboarding/preferencias" },
  { id: 5, label: "¡Listo!", path: "/onboarding/bienvenida" },
] as const;

function getActiveStep(pathname: string): number {
  if (pathname.includes("/perfil")) return 1;
  if (pathname.includes("/rol")) return 2;
  if (pathname.includes("/institucion")) return 3;
  if (pathname.includes("/preferencias")) return 4;
  if (pathname.includes("/bienvenida")) return 5;
  return 1;
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const activeStep = getActiveStep(pathname);

  return (
    <div className="bg-brand-bg flex min-h-screen flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Confecciones Liss"
            width={140}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>
        <Link
          href="/"
          className="hover:text-brand-primary text-sm font-medium text-gray-500 transition-colors"
        >
          Completar más tarde
        </Link>
      </header>

      {/* Barra de Progreso */}
      <div className="border-b border-gray-200 bg-white px-4 py-5">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          {STEPS.map((step, index) => {
            const isCompleted = step.id < activeStep;
            const isActive = step.id === activeStep;

            return (
              <div key={step.id} className="flex items-center">
                {/* Paso */}
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-sm font-semibold transition-colors",
                      isCompleted && "bg-emerald-500 text-white",
                      isActive && "bg-brand-primary text-white",
                      !isCompleted && !isActive && "bg-gray-200 text-gray-500"
                    )}
                  >
                    {isCompleted ? <Check className="size-4.5" /> : step.id}
                  </div>
                  <span
                    className={cn(
                      "hidden text-xs font-medium sm:block",
                      isActive ? "text-brand-primary" : "text-gray-500"
                    )}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Línea de conexión */}
                {index < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "mx-2 h-0.5 w-8 rounded-full sm:w-16 md:w-24",
                      step.id < activeStep ? "bg-emerald-500" : "bg-gray-200"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Contenido */}
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8">
        {children}
      </main>
    </div>
  );
}
