"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { X } from "lucide-react";

const LOBBY_STORAGE_KEY = "confliss_lobby_seen";
const OPEN_DELAY_MS = 5000;
const IDLE_TIMEOUT_MS = 60000;
const COUNTDOWN_SECONDS = 10;

export function LobbyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const scrolledRef = useRef(false);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // --- 1. Solo mostrar a NUEVOS usuarios (localStorage persiste entre sesiones) ---
  // --- 5. Retraso de 5 segundos antes de abrir ---
  useEffect(() => {
    const hasSeenLobby = localStorage.getItem(LOBBY_STORAGE_KEY);
    if (hasSeenLobby) return;

    const openTimer = setTimeout(() => {
      setIsOpen(true);
    }, OPEN_DELAY_MS);

    return () => clearTimeout(openTimer);
  }, []);

  // --- 3. Si no hace scroll en 60s, inicia countdown de 10s para cerrar ---
  const startIdleCountdown = useCallback(() => {
    setCountdown(COUNTDOWN_SECONDS);

    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          if (countdownRef.current) clearInterval(countdownRef.current);
          setIsOpen(false);
          localStorage.setItem(LOBBY_STORAGE_KEY, "true");
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const cancelCountdown = useCallback(() => {
    setCountdown(null);
    if (countdownRef.current) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Inicia el timer de inactividad al abrir
    idleTimerRef.current = setTimeout(() => {
      if (!scrolledRef.current) {
        startIdleCountdown();
      }
    }, IDLE_TIMEOUT_MS);

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [isOpen, startIdleCountdown]);

  // Detectar scroll dentro del modal
  const handleScroll = useCallback(() => {
    scrolledRef.current = true;
    // Si ya está en countdown, cancelarlo porque el usuario interactuó
    cancelCountdown();
    // Resetear el timer de inactividad
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  }, [cancelCountdown]);

  const closeLobby = () => {
    setIsOpen(false);
    localStorage.setItem(LOBBY_STORAGE_KEY, "true");
    cancelCountdown();
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm sm:p-6 md:p-8"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="selection:bg-primary selection:text-on-primary bg-surface relative flex h-[95vh] w-[80vw] max-w-[1400px] flex-col overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 antialiased"
          >
            {/* Header / Top Bar for closing */}
            <div className="bg-surface/80 absolute top-0 right-0 left-0 z-50 flex items-center justify-end p-4 backdrop-blur-md">
              {/* --- 2. Flecha animada apuntando al botón --- */}
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-primary mr-1 text-xl"
                aria-hidden="true"
              >
                →
              </motion.span>
              <button
                onClick={closeLobby}
                className="hover:bg-surface-container-high text-on-surface flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors"
                aria-label="Cerrar lobby y entrar a la tienda"
              >
                <span>Entrar a la Tienda</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* --- 3. Countdown banner --- */}
            <AnimatePresence>
              {countdown !== null && (
                <motion.div
                  initial={{ y: -40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  className="bg-primary text-on-primary absolute top-14 right-0 left-0 z-50 flex items-center justify-center gap-3 py-2 text-sm font-medium"
                >
                  <span>
                    Cerrando en {countdown}s por inactividad
                  </span>
                  <button
                    onClick={cancelCountdown}
                    className="bg-on-primary/20 rounded-full px-3 py-0.5 text-xs font-bold transition-colors hover:bg-on-primary/30"
                  >
                    Cancelar
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Scrollable Content */}
            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="font-headline flex-grow overflow-y-auto"
            >
              <main className="flex-grow pt-16">
                {/* Hero Section: Split Viewport */}
                <section className="bg-surface-container-lowest relative flex min-h-[700px] flex-col overflow-hidden md:min-h-[870px] md:flex-row">
                  {/* Geometric Accent Background */}
                  <div
                    className="pointer-events-none absolute inset-0 z-0 opacity-5"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 100% 0%, #143067 0%, transparent 50%)",
                    }}
                  />

                  <div className="z-10 flex w-full items-center justify-center p-12 md:w-1/2 lg:p-24">
                    <div className="max-w-xl">
                      <h1 className="text-primary mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-[2.75rem]">
                        ¿Qué tipo de uniforme necesitas?
                      </h1>
                      <p className="text-on-surface-variant mb-10 text-lg leading-relaxed">
                        Encuentra el catálogo perfecto para ti. Diseños de alta
                        precisión para cada profesión.
                      </p>
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <button
                          onClick={closeLobby}
                          className="from-primary to-primary-container text-on-primary rounded-md bg-gradient-to-r px-8 py-4 text-center font-medium shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-opacity hover:opacity-90"
                        >
                          Ver Catálogo General
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 flex w-full items-center justify-center p-8 md:w-1/2 md:p-12 lg:p-16">
                    <div className="relative grid h-full max-h-[700px] w-full grid-cols-2 gap-4">
                      <div className="relative col-span-1 row-span-2 h-full overflow-hidden rounded-lg shadow-sm">
                        <Image
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPHnbLu5luDAxr-SHXaYUG6Gg8RaeWWMKUXjg1cAaFc4ZI-oG_wIo2qIyzeEyVdLL0gQs_0OkxB1ee3MG_tbRJ7ZF8mwROvQLWFJfX-D9eXS1f2hXX2PfNpVkEVOjsbP20XWi8uILHtfbdsqKyUwCeYkVHToGbuimCb4VKRPGxjCd_IeOnmMc4WZGJLDhgf3iv80GLtmAGCs93gY3n2BpSvxZt8FD2vYtyZ63cx3FSyaD3CC20NWIBaTJG0oFAm0ieOnwkzqssWnc"
                          alt="Medical professionals in clean blue scrubs"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="relative h-64 overflow-hidden rounded-lg shadow-sm md:h-full">
                        <Image
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz0tnWS1HEP6JI-4ivXwWhSjKzlj7xOGzTJDTUIvm5ITRePEf_LFL_HqUsDwnBYFFn4mmWheiGiAuR1STquLF-6rcDuk8F3CZ4K9DPG1sGbhojF2Eko7LJatixb3rlILf7ns4I16PCvDIeNvDExRrq8aQ8SXfiFy6ZneoMsxT4mSXrwS8-2ACqcHBne4FOthDCCltrn0d4vEfe9aIWAZ0M7NuMsTHiQSeeM0Ov1qJUB9bMbL5iz-PyOU_3H_baI6o2l6IaNIXSkG0"
                          alt="Corporate team in formal wear"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="relative h-64 overflow-hidden rounded-lg shadow-sm md:h-full">
                        <Image
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7BWgkJIQEwNUb4FnZGP7yr27oq4bx4syUzuSDSMPTkLf_vvj-rGQhKlg0zKY8UU1zXnw1-RgHeeYsfNB7GVQKZQQTA8-AirlcV0gQkk4K734JCUJMapaJqlLr3oNOu5dZgo58WEZMnc-qAB8X9cP8Y7mXmGRmvzRkIK3wsfvMzq8ELbZM6nE1g3T9DPaRBN-y_8cTyarh_FyHkUzS9vc-ONVmkW8RWYr0I0__Kp9rFTWg0k2vmYd59WYZhCEm7OIqh7QtzBaa0vc"
                          alt="Students in uniform"
                          fill
                          className="object-cover object-center"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Purchase Type Strip */}
                <section className="bg-surface-container-low border-surface-dim/30 relative z-20 border-t border-b">
                  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-8 py-8 md:flex-row md:py-12">
                    <div className="flex-shrink-0">
                      <h2 className="text-primary text-xl font-bold tracking-tight">
                        ¿Cómo deseas comprar?
                      </h2>
                    </div>
                    <div className="bg-surface flex flex-col gap-2 rounded-lg p-2 shadow-sm sm:flex-row">
                      <button
                        onClick={closeLobby}
                        className="bg-primary text-on-primary hover:bg-primary-container flex items-center space-x-3 rounded-md px-6 py-3 font-medium transition-all"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          aria-hidden="true"
                        >
                          person
                        </span>
                        <span>Compra individual</span>
                      </button>
                      <Link
                        href="/contacto"
                        onClick={closeLobby}
                        className="text-on-surface-variant hover:bg-surface-container flex items-center space-x-3 rounded-md px-6 py-3 transition-all"
                      >
                        <span
                          className="material-symbols-outlined"
                          style={{ fontVariationSettings: "'FILL' 0" }}
                          aria-hidden="true"
                        >
                          business
                        </span>
                        <span>Compra al por mayor</span>
                      </Link>
                    </div>
                    <div className="text-on-surface-variant max-w-xs text-center text-sm leading-relaxed md:text-left">
                      La compra al por mayor aplica para instituciones, clínicas
                      y grupos de 10 o más prendas.
                    </div>
                  </div>
                </section>

                {/* Selector Cards Section */}
                <section className="bg-surface px-8 py-24">
                  <div className="mx-auto max-w-6xl">
                    <div className="mb-16 text-center">
                      <h2 className="text-primary mb-4 text-[2rem] font-extrabold tracking-tight">
                        Elige tu categoría
                      </h2>
                      <p className="text-on-surface-variant mx-auto max-w-2xl">
                        Selecciona el área para la que necesitas confecciones y
                        descubre nuestras opciones especializadas.
                      </p>
                    </div>

                    <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
                      {/* Card 1: Médico */}
                      <div className="bg-surface-container-lowest group hover:border-t-primary relative flex h-full flex-col rounded-lg border-t-4 border-transparent p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)]">
                        <div className="bg-secondary/10 text-secondary absolute top-6 right-6 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
                          Principal
                        </div>
                        <div className="bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary mb-8 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                          <span
                            className="material-symbols-outlined text-3xl"
                            style={{ fontVariationSettings: "'FILL' 0" }}
                            aria-hidden="true"
                          >
                            stethoscope
                          </span>
                        </div>
                        <h3 className="text-primary mb-4 text-2xl font-bold tracking-tight">
                          Sector Salud
                        </h3>
                        <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">
                          Médicos, enfermeras, odontología y más.
                        </p>
                        <Link
                          href="/catalogo/salud"
                          onClick={closeLobby}
                          className="bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed block w-full rounded-md py-3 text-center font-medium transition-colors"
                        >
                          Explorar
                        </Link>
                      </div>

                      {/* Card 2: Universidades */}
                      <div className="bg-surface-container-lowest group hover:border-t-primary flex h-full flex-col rounded-lg border-t-4 border-transparent p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)]">
                        <div className="bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary mb-8 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                          <span
                            className="material-symbols-outlined text-3xl"
                            style={{ fontVariationSettings: "'FILL' 0" }}
                            aria-hidden="true"
                          >
                            school
                          </span>
                        </div>
                        <h3 className="text-primary mb-4 text-2xl font-bold tracking-tight">
                          Universidades
                        </h3>
                        <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">
                          Uniformes para estudiantes del sector salud y
                          laboratorios.
                        </p>
                        <Link
                          href="/catalogo/escolar"
                          onClick={closeLobby}
                          className="bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed block w-full rounded-md py-3 text-center font-medium transition-colors"
                        >
                          Explorar
                        </Link>
                      </div>

                      {/* Card 3: Escuelas */}
                      <div className="bg-surface-container-lowest group hover:border-t-primary flex h-full flex-col rounded-lg border-t-4 border-transparent p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)]">
                        <div className="bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary mb-8 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                          <span
                            className="material-symbols-outlined text-3xl"
                            style={{ fontVariationSettings: "'FILL' 0" }}
                            aria-hidden="true"
                          >
                            domain
                          </span>
                        </div>
                        <h3 className="text-primary mb-4 text-2xl font-bold tracking-tight">
                          Escuelas y Colegios
                        </h3>
                        <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">
                          Uniformes y ropa escolar institucional.
                        </p>
                        <Link
                          href="/catalogo/escolar"
                          onClick={closeLobby}
                          className="bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed block w-full rounded-md py-3 text-center font-medium transition-colors"
                        >
                          Explorar
                        </Link>
                      </div>

                      {/* Card 4: Corporativos */}
                      <div className="bg-surface-container-lowest group hover:border-t-primary flex h-full flex-col rounded-lg border-t-4 border-transparent p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-all hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)]">
                        <div className="bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary mb-8 flex h-16 w-16 items-center justify-center rounded-full transition-colors">
                          <span
                            className="material-symbols-outlined text-3xl"
                            style={{ fontVariationSettings: "'FILL' 0" }}
                            aria-hidden="true"
                          >
                            work
                          </span>
                        </div>
                        <h3 className="text-primary mb-4 text-2xl font-bold tracking-tight">
                          Empresas y Talleres
                        </h3>
                        <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">
                          Uniformes corporativos y laborales de alta
                          durabilidad.
                        </p>
                        <Link
                          href="/catalogo/corporativo"
                          onClick={closeLobby}
                          className="bg-primary text-on-primary hover:bg-primary-fixed hover:text-on-primary-fixed block w-full rounded-md py-3 text-center font-medium transition-colors"
                        >
                          Explorar
                        </Link>
                      </div>
                    </div>

                    {/* Centered Bottom Card */}
                    <div className="mt-8 flex justify-center">
                      <div className="bg-surface-container-low hover:border-t-primary w-full rounded-lg border-t-4 border-transparent p-10 text-center shadow-sm transition-all hover:-translate-y-1 md:w-2/3 lg:w-1/2">
                        <div className="bg-surface-container-lowest text-primary mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full shadow-sm">
                          <span
                            className="material-symbols-outlined text-3xl"
                            style={{ fontVariationSettings: "'FILL' 0" }}
                            aria-hidden="true"
                          >
                            content_cut
                          </span>
                        </div>
                        <h3 className="text-primary mb-3 text-xl font-bold tracking-tight">
                          No sé qué necesito
                        </h3>
                        <p className="text-on-surface-variant mb-8 leading-relaxed">
                          Te ayudamos a encontrarlo. Asesoría personalizada para
                          tu proyecto.
                        </p>
                        <Link
                          href="/contacto"
                          onClick={closeLobby}
                          className="text-primary border-outline-variant/50 hover:bg-surface-container-lowest inline-block rounded-md border bg-transparent px-8 py-3 font-medium transition-colors"
                        >
                          Contactar
                        </Link>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Primera vez aquí Section */}
                <section className="border-outline-variant/30 border-y bg-[#f0f4ff] px-8 py-16">
                  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 lg:flex-row">
                    {/* Left Side: Steps */}
                    <div className="w-full lg:w-2/3">
                      <h2 className="text-primary mb-8 text-2xl font-bold tracking-tight">
                        ¿Primera vez aquí?
                      </h2>
                      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Step 1 */}
                        <div className="flex items-start gap-4">
                          <div className="text-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                            <span className="material-symbols-outlined" aria-hidden="true">
                              category
                            </span>
                          </div>
                          <div>
                            <h4 className="text-primary mb-1 font-bold">
                              Elige tu categoría
                            </h4>
                            <p className="text-on-surface-variant text-sm">
                              Encuentra el estilo perfecto.
                            </p>
                          </div>
                        </div>
                        {/* Step 2 */}
                        <div className="flex items-start gap-4">
                          <div className="text-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                            <span className="material-symbols-outlined" aria-hidden="true">
                              straighten
                            </span>
                          </div>
                          <div>
                            <h4 className="text-primary mb-1 font-bold">
                              Personaliza tu talla
                            </h4>
                            <p className="text-on-surface-variant text-sm">
                              Ajuste ideal para ti.
                            </p>
                          </div>
                        </div>
                        {/* Step 3 */}
                        <div className="flex items-start gap-4">
                          <div className="text-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white shadow-sm">
                            <span className="material-symbols-outlined" aria-hidden="true">
                              local_shipping
                            </span>
                          </div>
                          <div>
                            <h4 className="text-primary mb-1 font-bold">
                              Recibe en tu puerta
                            </h4>
                            <p className="text-on-surface-variant text-sm">
                              Envío rápido y seguro.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side: Call to Action */}
                    <div className="flex w-full flex-col items-start text-center lg:w-1/3 lg:items-end lg:text-right">
                      <Link
                        href="/registro"
                        onClick={closeLobby}
                        className="mb-4 block w-full rounded-md bg-[#143067] px-8 py-4 font-medium text-white shadow-[0_12px_32px_rgba(25,28,30,0.06)] transition-opacity hover:opacity-90 sm:w-auto"
                      >
                        Crea tu cuenta gratis
                      </Link>
                      <button
                        onClick={closeLobby}
                        className="text-primary hover:text-primary-container block w-full px-2 text-center text-sm font-medium hover:underline sm:w-auto lg:text-right"
                      >
                        Ver catálogo sin cuenta
                      </button>
                    </div>
                  </div>
                </section>
              </main>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
