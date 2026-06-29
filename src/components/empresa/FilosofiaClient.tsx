"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import Link from "next/link";
import TextilePatternCanvas from "./TextilePatternCanvas";

interface MuseumPanel {
  num: string;
  value: string;
  description: string;
}

const MUSEUM_PANELS: MuseumPanel[] = [
  {
    num: "01",
    value: "Calidad",
    description:
      "Cada prenda representa la confianza de un cliente. Cuidamos cada acabado, costura y talle como si fuera el único.",
  },
  {
    num: "02",
    value: "Experiencia",
    description:
      "Creemos en el aprendizaje silencioso y construido trabajando durante décadas al frente de la aguja y el dedal.",
  },
  {
    num: "03",
    value: "Honestidad",
    description:
      "Preferimos comunicar la realidad técnica antes de realizar promesas artificiales. El valor real está en lo que entregamos.",
  },
  {
    num: "04",
    value: "Respeto",
    description:
      "Valoramos de forma íntegra a nuestros clientes, colaboradores y proveedores, promoviendo relaciones humanas justas.",
  },
  {
    num: "05",
    value: "Mejora continua",
    description:
      "Siempre existe una mejor forma de trazar un patrón o coser un dobladillo. El aprendizaje nunca se detiene.",
  },
  {
    num: "06",
    value: "Compromiso",
    description:
      "Cada prenda recibe la misma devoción técnica, sin importar si vestimos a una escuela local o a una gran institución.",
  },
  {
    num: "07",
    value: "Orgullo por el origen",
    description:
      "Nunca olvidamos que empezamos en 2005 con una sola máquina cosiendo para la familia, aprendiendo el valor del esfuerzo real.",
  },
];

const MANIFESTO_LINES = [
  "No prometemos lo que no podemos cumplir.",
  "La experiencia vale más que la improvisación.",
  "La calidad nunca será opcional.",
  "Escuchamos antes de confeccionar.",
  "Cada uniforme merece el mismo cuidado.",
  "La mejora continua forma parte del trabajo.",
  "El respeto se demuestra trabajando.",
  "Nunca olvidaremos nuestro origen.",
];

export default function FilosofiaClient() {
  const [hoveredPanel, setHoveredPanel] = useState<number | null>(null);

  // Cabecera Scroll Parallax Tracking
  const headerRef = useRef<HTMLElement>(null);
  const { scrollYProgress: headerScroll } = useScroll({
    target: headerRef,
    offset: ["start start", "end start"],
  });

  // Section 1 Image Parallax Shift
  const s1Ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: s1Progress } = useScroll({
    target: s1Ref,
    offset: ["start end", "end start"],
  });
  const s1ImageY = useTransform(s1Progress, [0, 1], [-40, 40]);

  // Standard smooth transition (no bounce, premium expo ease-out)
  const smoothTransition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  };

  return (
    <div className="overflow-x-hidden bg-[#f8f9fb] text-[#191c1e] antialiased">
      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. CABECERA (Lienzo Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section
        ref={headerRef}
        className="bg-surface-container-low relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4"
      >
        <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
            {/* Breadcrumb section */}
            <div className="mb-6 lg:mb-8">
              <Breadcrumb
                items={[
                  { label: "Inicio", href: "/" },
                  { label: "Empresa", href: "/empresa" },
                  { label: "Filosofía", href: "/empresa/filosofia" },
                ]}
                className="animate-fade-in-up"
              />
            </div>

            <span className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
              Filosofía y Valores
            </span>

            <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl md:mb-10 md:flex md:flex-col md:items-center md:text-5xl lg:mb-6 lg:block lg:text-left lg:text-5xl xl:text-6xl xl:leading-[1.1]">
              <span className="text-center lg:text-left">
                Nuestros Valores y{" "}
              </span>
              <span className="text-secondary font-serif md:mt-2 md:flex md:w-full md:items-center md:justify-center md:gap-4 lg:mt-0 lg:inline lg:gap-0">
                {/* LÍNEA DECORATIVA IZQUIERDA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="to-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r from-transparent" />
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                </span>

                <span className="shrink-0">Filosofía</span>

                {/* LÍNEA DECORATIVA DERECHA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                  <span className="from-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r to-transparent" />
                </span>
              </span>
            </h1>

            {/* Contenedor inferior de contenido (Móvil / Tablet) */}
            <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 md:items-stretch md:gap-12 lg:flex lg:flex-col lg:gap-0">
              {/* IMAGEN HERO - VERSIÓN MÓVIL */}
              <div
                className="animate-fade-in-up relative w-full max-w-sm self-center md:order-2 md:h-full md:max-w-none md:self-stretch lg:hidden"
                style={{ animationDelay: "300ms" }}
              >
                <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
                  <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:aspect-auto md:h-full md:w-full">
                    <Image
                      fill
                      src="/images/empresa/filosofia/vintage_sewing_machine.png"
                      alt="La primera máquina de coser en nuestro taller"
                      className="rounded-xl object-cover object-center grayscale"
                      sizes="(max-width:768px) 80vw, 40vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* COLUMNA DE TEXTO Y ACCIONES */}
              <div className="flex w-full flex-col items-start md:order-1 md:justify-center">
                <div
                  className="animate-fade-in-up text-on-surface-variant mb-6 w-full space-y-4 font-sans text-base leading-relaxed md:text-lg lg:mb-6 lg:text-xl"
                  style={{ animationDelay: "150ms" }}
                >
                  <p>
                    No comenzamos construyendo una empresa. Comenzamos
                    aprendiendo un oficio. Desde 2005, nuestra filosofía ha sido
                    entregar la máxima calidad y precisión en cada prenda,
                    respaldados por un compromiso real con cada profesional y
                    estudiante.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* IMAGEN HERO - VERSIÓN DESKTOP */}
          <div
            className="animate-fade-in-up hidden h-full lg:flex lg:w-[40%] lg:items-center"
            style={{ animationDelay: "300ms" }}
          >
            <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  fill
                  src="/images/empresa/filosofia/vintage_sewing_machine.png"
                  alt="La primera máquina de coser en nuestro taller"
                  className="rounded-xl object-cover object-center grayscale"
                  sizes="40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. SECCIÓN 1 (Confianza e Historia) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section
        ref={s1Ref}
        className="relative w-full bg-[#f8f9fb] px-5 py-24 md:px-8 md:py-36"
      >
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-24">
          {/* Left: Narrow Text */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={smoothTransition}
              className="mb-10 max-w-lg font-serif text-3xl leading-[1.1] font-bold text-[#143067] md:text-4xl lg:text-5xl"
            >
              No fabricamos prendas.
              <br />
              Construimos confianza.
            </motion.h2>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, ...smoothTransition }}
              className="max-w-[62ch] space-y-8 font-sans text-base leading-relaxed text-[#444650] md:text-lg"
            >
              <p>
                En Confecciones Liss creemos que una prenda nunca comienza en
                una máquina de coser; comienza en la confianza que una persona
                deposita en quien la confecciona. Desde nuestros inicios en 2005
                entendimos que nuestro trabajo no consiste únicamente en
                fabricar uniformes, sino en crear prendas que acompañarán el día
                a día de estudiantes, profesionales, empresas e instituciones.
              </p>
              <p>
                Nuestra forma de trabajar nació mucho antes de tener un taller.
                Nació confeccionando y reparando ropa para la familia,
                aprendiendo que cada puntada representa una responsabilidad y
                que los pequeños detalles son los que realmente marcan la
                diferencia.
              </p>
            </motion.div>
          </div>

          {/* Right: Large Vertical Image with Parallax Shift inside container */}
          <div className="flex justify-center lg:col-span-5">
            <div className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-lg border border-[#c4c6d1] bg-[#edeef0]">
              <motion.div
                style={{ y: s1ImageY }}
                className="absolute inset-x-0 -top-12 -bottom-12"
              >
                <Image
                  src="/images/empresa/filosofia/vintage_sewing_machine.png"
                  alt="La primera máquina de coser en nuestro taller"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 3. SECCIÓN 2 (Declaración de Principios - El Manifiesto del Tiempo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden bg-[#143067] px-5 py-24 text-white md:px-8 md:py-32">
        {/* Background decorative textile curves */}
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M0,50 Q25,30 50,50 T100,50"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.1"
            />
            <path
              d="M0,30 Q35,60 70,20 T100,80"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.05"
              strokeDasharray="1 1"
            />
          </svg>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-screen-2xl">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24">
            {/* Left Column: The Philosophy / Context */}
            <div className="flex flex-col justify-between lg:col-span-5">
              <div>
                <span className="mb-4 block font-mono text-xs tracking-[0.2em] text-[#e8cbb5] uppercase">
                  02 // NUESTRO TIEMPO
                </span>
                <h2 className="mb-6 font-serif text-4xl leading-tight font-bold tracking-tight text-white sm:text-5xl">
                  Por qué elegimos ir despacio.
                </h2>
                <p className="mb-6 font-sans text-base leading-relaxed text-[#dae2ff] sm:text-lg">
                  En una industria obsesionada con la rapidez y la producción en
                  masa, nosotros creemos que el verdadero valor reside en la
                  pausa, la precisión y la dedicación.
                </p>
                <p className="font-sans text-sm leading-relaxed text-[#a2b4df]">
                  No cortamos esquinas. Cada costura, cada ojal y cada
                  terminación se realiza respetando el tiempo que requiere la
                  materia prima para convertirse en una pieza duradera.
                </p>
              </div>
            </div>

            {/* Right Column: The 4 Statements */}
            <div className="space-y-10 lg:col-span-7">
              {[
                {
                  num: "01",
                  label: "VELOCIDAD",
                  statement: "No perseguimos velocidad.",
                  desc: "La prisa compromete la precisión. Preferimos tardar más y asegurar que cada puntada sea perfecta.",
                },
                {
                  num: "02",
                  label: "VOLUMEN",
                  statement: "No perseguimos volumen.",
                  desc: "No somos una maquila masiva. Producimos en lotes controlados para mantener un estándar de calidad insuperable.",
                },
                {
                  num: "03",
                  label: "EXCELENCIA",
                  statement: "Perseguimos excelencia.",
                  desc: "La perfection técnica es nuestro único norte. Cada detalle cuenta, desde el hilo hasta el botón.",
                },
                {
                  num: "04",
                  label: "PROPÓSITO",
                  statement:
                    "Hacer bien las cosas siempre será más importante.",
                  desc: "El orgullo del trabajo bien hecho es el pilar sobre el cual construimos nuestra reputación.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="border-t border-[#dae2ff]/20 pt-6"
                >
                  <span className="mb-2 block font-mono text-xs tracking-wider text-[#e8cbb5]">
                    {item.num} / {item.label}
                  </span>
                  <h3 className="mb-2 font-serif text-2xl font-bold text-white sm:text-3xl">
                    &ldquo;{item.statement}&rdquo;
                  </h3>
                  <p className="max-w-2xl font-sans text-sm leading-relaxed text-[#dae2ff]/80 sm:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 4. SECCIÓN 3 (Museum Horizontal Panels) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-[#e1e2e4] bg-[#f8f9fb] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto mb-16 w-full max-w-screen-2xl">
          <span className="mb-3 block font-mono text-xs tracking-[0.2em] text-[#b43024] uppercase">
            03 // NUESTROS PILARES
          </span>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#143067] md:text-4xl">
            Valores redactados como compromisos.
          </h2>
        </div>

        {/* Desktop Accordion / Mobile Scroll */}
        <div className="mx-auto w-full max-w-screen-2xl">
          {/* Desktop Version: Hover Accordion */}
          <div className="hidden h-[450px] w-full items-stretch gap-4 lg:flex">
            {MUSEUM_PANELS.map((panel, idx) => {
              const isHovered = hoveredPanel === idx;
              const isAnyHovered = hoveredPanel !== null;

              return (
                <motion.div
                  key={panel.num}
                  layout
                  transition={smoothTransition}
                  onMouseEnter={() => setHoveredPanel(idx)}
                  onMouseLeave={() => setHoveredPanel(null)}
                  className={`relative flex flex-col justify-between overflow-hidden rounded-lg border border-[#c4c6d1] bg-white p-8 transition-shadow duration-300 ${
                    isHovered ? "border-[#143067] shadow-md" : "shadow-none"
                  }`}
                  style={{
                    flex: isHovered ? "2.8" : isAnyHovered ? "0.6" : "1",
                  }}
                >
                  {/* Panel Number */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-lg font-bold text-[#b43024]">
                      {panel.num}
                    </span>
                    {isHovered && (
                      <span className="animate-fade-in font-mono text-[9px] tracking-wider text-[#757781] uppercase">
                        PRINCIPLE IN ACTION
                      </span>
                    )}
                  </div>

                  {/* Panel Title & Paragraph */}
                  <div className="mt-12 flex flex-1 flex-col justify-end">
                    <h3 className="font-serif text-2xl leading-tight font-bold text-[#143067]">
                      {panel.value}
                    </h3>

                    {/* Show description only if expanded */}
                    <div className="overflow-hidden">
                      <AnimatePresence initial={false}>
                        {isHovered && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-[#444650] md:text-base"
                          >
                            {panel.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile/Tablet Version: Horizontal Scroll Snap Track */}
          <div className="relative lg:hidden">
            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-8">
              {MUSEUM_PANELS.map((panel) => (
                <div
                  key={panel.num}
                  className="flex min-h-[320px] w-[85vw] shrink-0 snap-center flex-col justify-between rounded-lg border border-[#c4c6d1] bg-white p-8 md:w-[45vw]"
                >
                  <div>
                    <span className="font-mono text-lg font-bold text-[#b43024]">
                      {panel.num}
                    </span>
                    <h3 className="mt-6 mb-4 font-serif text-2xl font-bold text-[#143067]">
                      {panel.value}
                    </h3>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-[#444650]">
                    {panel.description}
                  </p>
                </div>
              ))}
            </div>
            {/* Subtle swipe indicator */}
            <div className="mt-2 flex items-center justify-center gap-2 font-mono text-xs text-[#757781]">
              <span>Desliza para ver más</span>
              <span className="animate-pulse">→</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 5. SECCIÓN 4 (Manifiesto) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-[#e1e2e4] bg-white px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={smoothTransition}
            className="mb-20 text-center"
          >
            <span className="mb-3 block font-mono text-xs tracking-[0.2em] text-[#b43024] uppercase">
              04 // CÓDIGO INALTERABLE
            </span>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-[#143067] md:text-5xl">
              Nunca vamos a negociar estos principios.
            </h2>
          </motion.div>

          <div className="border-t border-[#e1e2e4]">
            {MANIFESTO_LINES.map((line, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: idx * 0.05, ...smoothTransition }}
                className="group flex items-baseline justify-between gap-6 border-b border-[#e1e2e4] py-6 transition-all duration-300 hover:pl-2 md:py-8"
              >
                <div className="flex items-baseline gap-6 md:gap-10">
                  <span className="font-mono text-xs text-[#b43024] select-none">
                    {(idx + 1).toString().padStart(2, "0")}
                  </span>
                  <span className="font-serif text-xl font-medium tracking-tight text-[#143067] transition-colors duration-300 group-hover:text-[#b43024] sm:text-2xl md:text-3xl">
                    {line}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 6. SECCIÓN 5 (Bento Grid) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-[#e1e2e4] bg-[#f8f9fb] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto w-full max-w-screen-2xl">
          <div className="mb-16">
            <span className="mb-3 block font-mono text-xs tracking-[0.2em] text-[#b43024] uppercase">
              05 // PERSPECTIVA DE NUESTRO PROPÓSITO
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#143067] md:text-4xl">
              Misión, Visión e Impacto Técnico
            </h2>
          </div>

          <div className="grid auto-rows-auto grid-cols-1 gap-6 md:grid-cols-3">
            {/* 1. Misión (Spans 2 cols on desktop) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              className="flex min-h-[250px] flex-col justify-between rounded-2xl border border-[#c4c6d1] bg-white p-8 md:col-span-2 md:p-12"
            >
              <div>
                <span className="mb-6 block font-mono text-xs tracking-widest text-[#b43024] uppercase">
                  NUESTRA MISIÓN
                </span>
                <p className="font-serif text-xl leading-relaxed font-medium text-[#143067] md:text-2xl">
                  Diseñar, confeccionar y entregar uniformes escolares,
                  empresariales y médicos que combinen calidad, funcionalidad y
                  durabilidad, ofreciendo un servicio cercano respaldado por la
                  experiencia técnica.
                </p>
              </div>
            </motion.div>

            {/* 2. Visión (Spans 1 col) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              className="flex min-h-[250px] flex-col justify-between rounded-2xl border border-[#c4c6d1] bg-white p-8 md:col-span-1 md:p-10"
            >
              <div>
                <span className="mb-6 block font-mono text-xs tracking-widest text-[#b43024] uppercase">
                  NUESTRA VISIÓN
                </span>
                <p className="font-sans text-sm leading-relaxed text-[#444650] md:text-base">
                  Consolidarnos como el taller de confección más confiable de El
                  Salvador, destacando por la excelencia artesanal de nuestro
                  equipo, la modernización de nuestros procesos y el trato
                  humano impecable.
                </p>
              </div>
            </motion.div>

            {/* 3. Taller Photo (Spans 1 col, 2 rows height equivalent) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              className="relative min-h-[350px] overflow-hidden rounded-2xl border border-[#c4c6d1] md:col-span-1 md:row-span-2 md:min-h-full"
            >
              <Image
                src="/images/empresa/filosofia/textile_workshop.png"
                alt="Maquinaria y costura profesional en nuestro taller"
                fill
                sizes="(max-width: 768px) 100vw, 30vw"
                className="object-cover grayscale transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            {/* 4. Giant Quote (Spans 2 cols, 1 row) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              className="flex min-h-[200px] flex-col justify-center rounded-2xl border border-[#c4c6d1] bg-white p-8 md:col-span-2 md:p-12"
            >
              <blockquote className="border-l-2 border-[#b43024] pl-6 font-serif text-lg leading-relaxed text-[#444650] italic md:pl-8 md:text-xl">
                &ldquo;En Confecciones Liss, las decisiones no se toman para el
                próximo mes. Se toman para la próxima década, asegurando que
                cada puntada resista el paso del tiempo y del uso
                cotidiano.&rdquo;
              </blockquote>
            </motion.div>

            {/* 5. Statistic (Spans 2 cols, 1 row) */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={smoothTransition}
              className="flex min-h-[180px] flex-col justify-between rounded-2xl border border-[#c4c6d1] bg-white p-8 md:col-span-2 md:p-12"
            >
              <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
                <div>
                  <span className="block font-serif text-5xl font-extrabold tracking-tight text-[#143067] md:text-6xl">
                    Desde 2005
                  </span>
                  <span className="mt-2 block font-sans text-sm font-medium tracking-wide text-[#555e76] uppercase md:text-base">
                    perfeccionando un oficio de generación en generación.
                  </span>
                </div>
                <div className="h-px w-full bg-[#c4c6d1] sm:h-12 sm:w-px"></div>
                <div className="max-w-xs font-sans text-xs leading-relaxed text-[#757781]">
                  Comenzamos con una sola costurera. Hoy diseñamos, cortamos y
                  ensamblamos miles de piezas con precisión técnica e
                  industrial.
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 7. SECCIÓN 6 (Editorial Lookbook Gallery) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full border-b border-[#e1e2e4] bg-[#f8f9fb] px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto w-full max-w-screen-2xl">
          <div className="mb-16">
            <span className="mb-3 block font-mono text-xs tracking-[0.2em] text-[#b43024] uppercase">
              06 // REGISTRO VISUAL
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#143067] md:text-4xl">
              Galería Editorial de la Confección
            </h2>
          </div>

          <div className="flex flex-col gap-12 md:gap-16">
            {/* Card 1 */}
            <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#c4c6d1] md:aspect-[21/9]">
              <div className="absolute inset-0 z-10 bg-[#001946]/35 transition-colors duration-500 group-hover:bg-[#001946]/25" />
              <Image
                src="/images/empresa/filosofia/artisan_working.png"
                alt="Artesano textil trabajando en taller"
                fill
                sizes="100vw"
                className="object-cover grayscale transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                <span className="max-w-xl text-center font-serif text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  &ldquo;Las decisiones también se cosen.&rdquo;
                </span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#c4c6d1] md:aspect-[21/9]">
              <div className="absolute inset-0 z-10 bg-[#001946]/35 transition-colors duration-500 group-hover:bg-[#001946]/25" />
              <Image
                src="/images/empresa/filosofia/sewing_stitch_detail.png"
                alt="Macro detalle de costura de precisión"
                fill
                sizes="100vw"
                className="object-cover grayscale transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                <span className="max-w-xl text-center font-serif text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  &ldquo;Cada detalle importa.&rdquo;
                </span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-[#c4c6d1] md:aspect-[21/9]">
              <div className="absolute inset-0 z-10 bg-[#001946]/35 transition-colors duration-500 group-hover:bg-[#001946]/25" />
              <Image
                src="/images/empresa/filosofia/quality_control_inspection.png"
                alt="Inspección detallada de control de calidad"
                fill
                sizes="100vw"
                className="object-cover grayscale transition-transform duration-700 hover:scale-102"
              />
              <div className="absolute inset-0 z-20 flex items-center justify-center p-6">
                <span className="max-w-2xl text-center font-serif text-2xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  &ldquo;La calidad comienza mucho antes de la entrega.&rdquo;
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 8. CIERRE (Split CTA Footer) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative w-full bg-white px-5 py-24 md:px-8 md:py-36">
        <div className="mx-auto grid w-full max-w-screen-2xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left Column */}
          <div>
            <h2 className="max-w-md font-serif text-3xl leading-[1.1] font-bold text-[#143067] sm:text-4xl md:text-5xl">
              Nuestra historia explica de dónde venimos.
            </h2>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-start justify-center">
            <p className="mb-10 max-w-xl font-sans text-xl leading-relaxed text-[#555e76] md:text-2xl">
              Nuestra filosofía explica por qué seguimos haciéndolo.
            </p>
            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                href="/empresa/sobre-nosotros"
                className="inline-flex items-center justify-center rounded-lg bg-[#143067] px-8 py-4 font-sans text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-[#001b4a]"
              >
                Conocer nuestra historia
              </Link>
              <Link
                href="/empresa/proceso-de-confeccion"
                className="inline-flex items-center justify-center rounded-lg border border-[#143067] bg-transparent px-8 py-4 font-sans text-sm font-semibold text-[#143067] transition-colors duration-300 hover:bg-[#dae2ff]/20"
              >
                Descubrir nuestro proceso
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
