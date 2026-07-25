"use client";

import React from "react";
import { Icon } from "@/components/ui/icons/Icon";
import { AvatarLucas } from "./AvatarLucas";
import type { QueueStep } from "@/context/ChatContext";

interface WelcomeScreenProps {
  queueStep: QueueStep;
}

export function WelcomeScreen({ queueStep }: WelcomeScreenProps) {
  return (
    <div className="flex h-full min-h-[380px] w-full flex-col items-center justify-center bg-slate-50/80 p-6 text-center backdrop-blur-xs dark:bg-slate-900/80">
      <div className="mb-6 flex flex-col items-center">
        {queueStep === "assigned" ? (
          <div className="animate-in zoom-in relative duration-300">
            <AvatarLucas size="lg" />
            <div className="absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-2 ring-white dark:ring-slate-900">
              <Icon name="check" size={14} />
            </div>
          </div>
        ) : (
          <div className="bg-primary/10 text-primary ring-primary/5 flex h-16 w-16 animate-pulse items-center justify-center rounded-full ring-8">
            <Icon name="support_agent" size={36} />
          </div>
        )}
      </div>

      <h3 className="mb-1 font-serif text-xl font-bold text-slate-900 dark:text-slate-100">
        Centro de Asistencia y Soporte
      </h3>
      <p className="mb-8 max-w-xs text-xs text-slate-500 dark:text-slate-400">
        Confecciones Liss — San Miguel, El Salvador
      </p>

      {/* Step card container */}
      <div className="w-full max-w-xs rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg transition-all duration-300 dark:border-slate-800 dark:bg-slate-800">
        {queueStep === "searching" && (
          <div className="animate-in fade-in flex flex-col items-center gap-3 duration-200">
            <Icon
              name="progress_activity"
              size={32}
              className="text-primary animate-spin"
            />
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Buscando agente disponible...
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Conectando con el servidor...
              </p>
            </div>
          </div>
        )}

        {queueStep === "queue_position_2" && (
          <div className="animate-in fade-in flex flex-col items-center gap-3 duration-200">
            <div className="text-primary flex items-center gap-2">
              <Icon name="group" size={28} />
              <span className="font-serif text-2xl font-bold">#2</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Estás en el turno #2 de la lista
              </p>
              <p className="mt-1 text-xs text-slate-500">
                1 persona delante de ti. Por favor espera un momento.
              </p>
            </div>
          </div>
        )}

        {queueStep === "queue_position_1" && (
          <div className="animate-in fade-in flex flex-col items-center gap-3 duration-200">
            <div className="text-primary flex items-center gap-2">
              <Icon name="person" size={28} />
              <span className="font-serif text-2xl font-bold">#1</span>
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                ¡Próximo en la fila! (Turno #1)
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Tu consulta será atendida en unos segundos.
              </p>
            </div>
          </div>
        )}

        {queueStep === "assigning" && (
          <div className="animate-in fade-in flex flex-col items-center gap-3 duration-200">
            <Icon
              name="person_search"
              size={32}
              className="text-primary animate-pulse"
            />
            <div>
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Asignando agente de atención...
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Verificando disponibilidad de ejecutivos...
              </p>
            </div>
          </div>
        )}

        {queueStep === "assigned" && (
          <div className="animate-in zoom-in-95 flex flex-col items-center gap-3 duration-200">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
              <Icon name="check_circle" size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                ¡Se te ha asignado a Lucas!
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Abriendo la sala de conversación...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
