"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  BookOpen,
  Stethoscope,
  Building2,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/context/useAppStore";

const ROLES = [
  {
    id: "estudiante",
    label: "Estudiante",
    desc: "Estudio en una universidad o instituto técnico",
    icon: GraduationCap,
    nextPath: "/onboarding/institucion",
  },
  {
    id: "docente",
    label: "Docente",
    desc: "Soy profesor o instructor en una institución educativa",
    icon: BookOpen,
    nextPath: "/onboarding/institucion",
  },
  {
    id: "profesional",
    label: "Profesional de la salud",
    desc: "Trabajo en un hospital, clínica o consultorio",
    icon: Stethoscope,
    nextPath: "/onboarding/institucion",
  },
  {
    id: "institucion",
    label: "Institución / Empresa",
    desc: "Represento una organización que necesita uniformes",
    icon: Building2,
    nextPath: "/onboarding/preferencias",
  },
] as const;

export default function RolPage() {
  const router = useRouter();
  const { setUser, user } = useAppStore();
  const [selected, setSelected] = useState<string>("");

  const handleContinue = useCallback(() => {
    if (!selected) return;
    const role = ROLES.find((r) => r.id === selected);
    if (!role) return;

    if (user) {
      setUser({ ...user, rol: selected });
    }

    router.push(role.nextPath as any);
  }, [selected, user, setUser, router]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          ¿Cuál es tu rol?
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Esto nos ayudará a mostrarte el catálogo más relevante.
        </p>
      </div>

      {/* Grid de roles */}
      <div className="grid gap-4 sm:grid-cols-2">
        {ROLES.map((role) => {
          const isSelected = selected === role.id;
          return (
            <button
              key={role.id}
              type="button"
              onClick={() => setSelected(role.id)}
              className={cn(
                "relative flex cursor-pointer flex-col items-start gap-3 rounded-xl border-2 p-6 text-left transition-all",
                isSelected
                  ? "border-brand-primary bg-brand-primary-light"
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              {/* Check en esquina */}
              {isSelected && (
                <div className="bg-brand-primary absolute top-3 right-3 flex size-6 items-center justify-center rounded-full">
                  <Check className="size-3.5 text-white" />
                </div>
              )}

              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-xl transition-colors",
                  isSelected ? "bg-brand-primary/10" : "bg-gray-100"
                )}
              >
                <role.icon
                  className={cn(
                    "size-6",
                    isSelected ? "text-brand-primary" : "text-gray-500"
                  )}
                />
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">{role.label}</h3>
                <p className="mt-1 text-sm text-gray-500">{role.desc}</p>
              </div>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleContinue}
        disabled={!selected}
        className={cn(
          "bg-brand-primary w-full cursor-pointer rounded-lg py-3 text-sm font-semibold text-white transition-opacity",
          selected ? "hover:opacity-90" : "cursor-not-allowed opacity-50"
        )}
      >
        Continuar →
      </button>
    </div>
  );
}
