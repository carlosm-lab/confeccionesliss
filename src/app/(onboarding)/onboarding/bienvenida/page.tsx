"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/context/useAppStore";

const CONFETTI_COLORS = ["#143067", "#b43024", "#1a5c3a", "#d4a0a0", "#f4f5f7"];

function ConfettiParticle({ delay, color }: { delay: number; color: string }) {
  const [vals] = useState(() => ({
    x: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: 3 + Math.random() * 2,
  }));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      className="absolute size-2.5 rounded-sm"
      style={{ backgroundColor: color, left: `${vals.x}%`, top: -10 }}
      initial={{ y: -20, rotate: 0, opacity: 1 }}
      animate={{ y: 600, rotate: vals.rotation + 720, opacity: 0 }}
      transition={{ duration: vals.duration, delay, ease: "easeIn" }}
    />
  );
}

export default function BienvenidaPage() {
  const router = useRouter();
  const { user } = useAppStore();
  const [secondsLeft, setSecondsLeft] = useState(5);

  const redirectUrl =
    user?.institucion === "UGB"
      ? "/catalogo/universidades/ugb"
      : "/catalogo/salud";

  useEffect(() => {
    if (secondsLeft <= 0) {
      router.push(redirectUrl);
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, router, redirectUrl]);

  const handleGoNow = useCallback(
    () => router.push(redirectUrl),
    [router, redirectUrl]
  );
  const handleExplore = useCallback(() => router.push("/"), [router]);

  return (
    <div className="relative flex flex-col items-center overflow-hidden">
      {/* Confeti */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 30 }).map((_, i) => (
          <ConfettiParticle
            key={i}
            delay={i * 0.1}
            color={CONFETTI_COLORS[i % CONFETTI_COLORS.length]}
          />
        ))}
      </div>

      {/* Check animado */}
      <motion.div
        className="mb-8 flex size-24 items-center justify-center rounded-full bg-emerald-100"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
        >
          <Check className="size-12 text-emerald-600" strokeWidth={3} />
        </motion.div>
      </motion.div>

      {/* Título */}
      <motion.h1
        className="mb-2 text-center text-3xl font-extrabold tracking-tight text-gray-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        ¡Todo listo, {user?.nombre?.split(" ")[0] ?? "Usuario"}!
      </motion.h1>
      <motion.p
        className="mb-8 text-center text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Tu perfil está configurado. Ya puedes explorar tu catálogo
        personalizado.
      </motion.p>

      {/* Tarjeta de resumen */}
      <motion.div
        className="mb-8 w-full max-w-sm rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <h3 className="mb-4 text-sm font-semibold text-gray-700">Tu perfil</h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Nombre</span>
            <span className="font-medium text-gray-900">
              {user?.nombre ?? "María González"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Rol</span>
            <span className="font-medium text-gray-900 capitalize">
              {user?.rol ?? "Estudiante"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Institución</span>
            <span className="font-medium text-gray-900">
              {user?.institucion ?? "UGB"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Countdown */}
      <motion.div
        className="mb-6 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
      >
        <div className="relative flex size-14 items-center justify-center">
          <svg className="size-14 -rotate-90" viewBox="0 0 56 56">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="3"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              className="stroke-brand-primary"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 24}
              strokeDashoffset={2 * Math.PI * 24 * (1 - secondsLeft / 5)}
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <span className="text-brand-primary absolute text-lg font-bold">
            {secondsLeft}
          </span>
        </div>
        <p className="text-xs text-gray-500">Redirigiendo a tu catálogo...</p>
      </motion.div>

      {/* Botones */}
      <motion.div
        className="flex w-full max-w-sm gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        <button
          type="button"
          onClick={handleGoNow}
          className="bg-brand-primary flex-1 cursor-pointer rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Ir ahora
        </button>
        <button
          type="button"
          onClick={handleExplore}
          className="flex-1 cursor-pointer rounded-lg border border-gray-300 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Explorar primero
        </button>
      </motion.div>
    </div>
  );
}
