"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CertificacionesClient() {
  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="overflow-x-hidden bg-[#f8f9fb] font-sans text-[#191c1e] antialiased selection:bg-[#143067]/10 selection:text-[#143067]">
      {/* ──────────────────────────────────────────────────────── */}
      {/* 1. HERO: CENTRO DE CREDENCIALES (Ficha de Expediente) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-4 pb-16 md:px-8 md:pt-6 md:pb-24">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Texto del Hero */}
          <div className="border-primary/35 rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12 lg:col-span-7">
            <div className="space-y-6">
              <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                Formación y Experiencia
              </span>
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-6xl">
                Formación y Experiencia
              </h1>
              <p className="border-l-2 border-[#143067] pl-4 font-serif text-lg leading-relaxed text-[#444650] md:text-xl">
                La confianza se construye con hechos, experiencia y formación
                comprobable.
              </p>
              <p className="max-w-xl text-base leading-relaxed text-[#444650]">
                En Confecciones Liss creemos que la calidad comienza con el
                conocimiento. Nuestra experiencia se ha construido durante más
                de dos décadas de trabajo continuo, capacitación práctica y
                especialización en confección de uniformes. Esta página reúne la
                formación y la trayectoria que respaldan nuestro trabajo.
              </p>
            </div>
          </div>

          {/* Ilustración de Archivador Técnico (SVG Blueprint) */}
          <div className="flex justify-center lg:col-span-5">
            <div className="border-primary/35 relative flex aspect-[4/3] w-full max-w-md flex-col justify-between overflow-hidden rounded-2xl border bg-[#f8f9fb] p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    "radial-gradient(#143067 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                }}
              ></div>

              {/* SVG Folder representational */}
              <svg
                className="h-auto w-full fill-none stroke-current stroke-1 text-[#143067]/30"
                viewBox="0 0 100 70"
                aria-hidden="true"
              >
                {/* Folder Back Tab */}
                <path d="M 10,15 L 40,15 L 45,20 L 90,20 L 90,60 L 10,60 Z" />

                {/* Document Sheets slipping out */}
                <rect
                  x="18"
                  y="8"
                  width="64"
                  height="42"
                  rx="1"
                  className="fill-white text-[#143067]/10"
                />
                <rect
                  x="22"
                  y="11"
                  width="60"
                  height="38"
                  rx="1"
                  className="fill-white text-[#143067]/15"
                />

                {/* Lines representing certificate text */}
                <line
                  x1="28"
                  y1="18"
                  x2="76"
                  y2="18"
                  strokeDasharray="1,1"
                  strokeWidth="0.5"
                />
                <line
                  x1="28"
                  y1="24"
                  x2="76"
                  y2="24"
                  strokeDasharray="1,1"
                  strokeWidth="0.5"
                />
                <line
                  x1="28"
                  y1="30"
                  x2="60"
                  y2="30"
                  strokeDasharray="1,1"
                  strokeWidth="0.5"
                />

                {/* Seal circle on certificate */}
                <circle
                  cx="70"
                  cy="38"
                  r="5"
                  className="text-[#143067]/40"
                  strokeWidth="0.5"
                />

                {/* Folder Front Tab */}
                <path
                  d="M 10,23 L 38,23 L 42,28 L 90,28 L 90,62 L 10,62 Z"
                  className="fill-white/80"
                />
              </svg>

              <div className="z-10 flex items-end justify-between border-t border-[#e1e2e5] pt-4 font-mono text-[9px] text-[#444650]">
                <span>CONFECCIONES LISS // FORMACIÓN Y EXPERIENCIA</span>
                <span className="font-bold text-[#143067]">VERIFICADO</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. NUESTRA MAYOR CERTIFICACIÓN ES LA EXPERIENCIA */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Columna Izquierda: Números Grandes */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            <div className="border-primary/35 flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-serif text-5xl font-bold text-[#143067]">
                20+ Años
              </span>
              <span className="mt-2 block font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                Oficio Acumulado
              </span>
              <p className="mt-1 text-xs text-[#444650]">
                Trayectoria en costura y confección desde 2005.
              </p>
            </div>
            <div className="border-primary/35 flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-serif text-5xl font-bold text-[#143067]">
                2021
              </span>
              <span className="mt-2 block font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                Fundación Oficial
              </span>
              <p className="mt-1 text-xs text-[#444650]">
                Apertura del taller en Barrio La Merced.
              </p>
            </div>
            <div className="border-primary/35 flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-serif text-5xl font-bold text-[#143067]">
                3 Áreas
              </span>
              <span className="mt-2 block font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                Especialización
              </span>
              <p className="mt-1 text-xs text-[#444650]">
                Uniformes escolares, médicos y empresariales.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Editorial */}
          <div className="space-y-6 lg:col-span-7">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Trayectoria
            </span>
            <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
              Nuestra mayor certificación es la experiencia
            </h2>
            <div className="h-1 w-12 rounded-full bg-[#143067]"></div>

            <div className="space-y-4 text-base leading-relaxed text-[#444650]">
              <p className="font-serif text-xl leading-relaxed text-[#143067] italic">
                &ldquo;Antes de hablar de diplomas o constancias, hablamos de
                trayectoria.&rdquo;
              </p>
              <p>
                Nuestra experiencia comenzó en 2005 confeccionando prendas desde
                casa. Desde entonces, cada proyecto ha representado una
                oportunidad para perfeccionar técnicas, conocer nuevos procesos
                y elevar nuestros estándares.
              </p>
              <p>
                Hoy esa experiencia acumulada forma parte de cada uniforme que
                confeccionamos para clientes en la zona oriental de El Salvador.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 3. FORMACIÓN TÉCNICA DE LA FUNDADORA (Ficha Profesional) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-12 md:mb-16">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Formación Técnica
            </span>
            <h2 className="mt-2 font-serif text-3xl text-[#143067] md:text-4xl">
              Formación técnica de la fundadora
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-[#143067]"></div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Foto Placeholder (Ficha Identidad) */}
            <div className="border-primary/35 relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-[#f8f9fb] p-8 text-center shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] lg:col-span-4">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage:
                    "radial-gradient(#143067 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              ></div>

              <div className="relative z-10 space-y-4">
                {/* Monograma de alta costura */}
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-[#143067] font-serif text-3xl font-bold text-white shadow-md">
                  LM
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-[#143067]">
                    Lisseth Molina
                  </h3>
                  <p className="font-mono text-xs font-bold font-semibold tracking-wider text-[#143067] uppercase">
                    Directora General y Fundadora
                  </p>
                </div>
              </div>
            </div>

            {/* Listado de Acreditaciones Técnicas */}
            <div className="border-primary/35 flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-8 lg:col-span-8">
              <div className="space-y-6">
                <h4 className="border-b border-[#e1e2e5] pb-3 font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                  Formación y experiencia práctica
                </h4>

                <div className="space-y-4 font-sans text-sm text-[#444650]">
                  {/* Certificaciones formales */}
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Técnico Certificado en Corte y Confección
                      </strong>
                      <span>
                        Formación técnica base que sustenta más de 20 años de
                        práctica en patronaje y confección.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Creación de Prendas Médicas
                      </strong>
                      <span>
                        Capacitación específica en confección de uniformes para
                        el sector salud.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Confección de Ropa Interior
                      </strong>
                      <span>
                        Formación complementaria en técnicas de confección fina.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067] select-none">
                      verified_user
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Manejo de Equipo Industrial
                      </strong>
                      <span>
                        Capacitación en operación de maquinaria de confección
                        industrial.
                      </span>
                    </div>
                  </div>
                  {/* Experiencia práctica */}
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067]/60 select-none">
                      work_history
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Experiencia en Confección de Uniformes Institucionales
                      </strong>
                      <span>
                        Más de una década de práctica confeccionando uniformes
                        escolares para el Ministerio de Educación y producción
                        en talleres de San Miguel.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined font-bold text-[#143067]/60 select-none">
                      work_history
                    </span>
                    <div>
                      <strong className="block text-[#191c1e]">
                        Experiencia en Producción de Gran Volumen
                      </strong>
                      <span>
                        Trayectoria en maquilas de San Miguel entre 2012 y 2019,
                        donde adquirió práctica en estandarización de procesos y
                        producción en serie.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 4. ESPECIALIZACIÓN DEL EQUIPO (Organigrama Técnico) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto mb-12 max-w-xl space-y-4 text-center md:mb-16">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Cómo Trabajamos
          </span>
          <h2 className="font-serif text-3xl text-[#143067] md:text-4xl">
            Especialización del equipo
          </h2>
          <p className="text-sm leading-relaxed text-[#444650]">
            Cada integrante del equipo aporta conocimientos específicos dentro
            del proceso de producción. No operamos como una maquila masiva
            indiferenciada, sino como un taller con roles especializados.
          </p>
        </div>

        {/* Organigrama Técnico Asimétrico */}
        <div className="space-y-8">
          {/* Nivel 1: Dirección */}
          <div className="flex justify-center">
            <div className="w-full max-w-sm rounded-2xl border-2 border-[#143067] bg-white p-6 text-center shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="mb-1 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                Dirección General
              </span>
              <h3 className="font-serif text-lg font-bold text-[#143067]">
                Lisseth Molina
              </h3>
              <p className="mt-1 font-sans text-xs text-[#444650]">
                Patronaje, corte general y supervisión de calidad.
              </p>
            </div>
          </div>

          {/* Línea conectora */}
          <div className="mx-auto hidden h-8 w-px bg-[#143067]/30 md:block"></div>

          {/* Nivel 2: Producción & Operaciones */}
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            {/* Rama A: Confección Especializada */}
            <div className="border-primary/35 hover:border-primary/55 flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-colors duration-300">
              <div>
                <span className="mb-2 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                  Confección y Ensamblado
                </span>
                <h3 className="mb-2 font-serif text-base font-bold text-[#143067]">
                  Lilian Romero · Nubia Vázquez · Blanca Martínez
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Costura y ensamblado de uniformes escolares, médicos e
                  institucionales.
                </p>
              </div>
            </div>

            {/* Rama B: Calidad & Logística */}
            <div className="border-primary/35 hover:border-primary/55 flex flex-col justify-between rounded-2xl border bg-[#143067]/5 p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-colors duration-300">
              <div>
                <span className="mb-2 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                  Calidad, Medidas y Logística
                </span>
                <h3 className="mb-2 font-serif text-base font-bold text-[#143067]">
                  René Alfonso Méndez · Carlos Antonio Molina
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Toma de medidas, inspección de costuras y coordinación de
                  entregas.
                </p>
              </div>
            </div>

            {/* Rama C: Estrategia & Imagen */}
            <div className="border-primary/35 hover:border-primary/55 flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-colors duration-300">
              <div>
                <span className="mb-2 block font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                  Tecnología e Imagen
                </span>
                <h3 className="mb-2 font-serif text-base font-bold text-[#143067]">
                  Carlos José Molina · Jackeline · Liam
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  Desarrollo web, posicionamiento digital e imagen institucional
                  del taller.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 5. CAPACITACIÓN CONTINUA — Párrafo simplificado */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="mb-8">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Mejora Continua
            </span>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
              Capacitación continua
            </h2>
            <div className="mt-4 h-1 w-12 rounded-full bg-[#143067]"></div>
          </div>
          <p className="max-w-3xl text-base leading-relaxed text-[#444650]">
            La mejora continua en Confecciones Liss se da principalmente a
            través de la práctica constante: cada nuevo proyecto representa una
            oportunidad para perfeccionar procesos y técnicas. Cuando el equipo
            complete nuevas capacitaciones formales, esta sección se actualizará
            para reflejarlas.
          </p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 6. EXPERIENCIA COMPROBABLE (Línea de Tiempo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="mx-auto mb-16 max-w-xl space-y-4 text-center">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Trayectoria
          </span>
          <h2 className="font-serif text-3xl text-[#143067] md:text-4xl">
            Experiencia comprobable
          </h2>
          <div className="mx-auto h-1 w-12 rounded-full bg-[#143067]"></div>
        </div>

        {/* Timeline Vertical */}
        <div className="relative ml-4 space-y-12 border-l-2 border-[#143067]/20 md:ml-32">
          {/* Hito 1: 2005 */}
          <div className="relative pl-8 md:pl-12">
            {/* Dot indicator */}
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            {/* Year Label left (visible only on desktop) */}
            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2005
            </div>

            <div className="border-primary/35 space-y-2 rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2005 — Inicio del oficio
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Inicio del oficio de confección
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                Nuestra fundadora inicia un pequeño taller familiar desde el
                hogar, confeccionando y reparando prendas para la familia y,
                poco después, para vecinos del cantón.
              </p>
            </div>
          </div>

          {/* Hito 2: 2012 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2012
            </div>

            <div className="border-primary/35 space-y-2 rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2012 — Confección Institucional
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Confección institucional y experiencia en maquilas
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                El taller asume la confección completa de uniformes para el
                Centro Escolar Profesor Jorge Salomón Granados. Posteriormente,
                la fundadora trabaja en maquilas industriales de San Miguel,
                donde adquiere experiencia en producción a gran escala.
              </p>
            </div>
          </div>

          {/* Hito 3: 2021 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2021
            </div>

            <div className="border-primary/35 space-y-2 rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2021 — Fundación Oficial
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Nacimiento oficial de Confecciones Liss
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                Apertura formal del taller en Barrio La Merced, San Miguel, con
                una inversión inicial de USD 2,000 en equipamiento básico.
              </p>
            </div>
          </div>

          {/* Hito 4: 2026 */}
          <div className="relative pl-8 md:pl-12">
            <div className="absolute top-1.5 -left-[9px] h-4 w-4 rounded-full border-4 border-[#143067] bg-white"></div>

            <div className="absolute top-0 -left-36 hidden w-24 text-right font-serif text-3xl font-bold text-[#143067] md:block">
              2026
            </div>

            <div className="border-primary/35 space-y-2 rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="block font-serif text-xl font-bold text-[#143067] md:hidden">
                2026 — Transformación Digital
              </span>
              <span className="hidden font-serif text-lg font-bold text-[#143067] md:block">
                Transformación digital
              </span>
              <p className="text-sm leading-relaxed text-[#444650]">
                Desarrollo de la plataforma web institucional y una estrategia
                de posicionamiento orgánico para fortalecer la presencia digital
                del taller.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 7. FILOSOFÍA DE ACREDITACIÓN (Manifiesto) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="border-t border-b border-[#143067]/20 py-8 text-center">
          <p className="mb-4 font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Nuestra Filosofía
          </p>
          <div className="mx-auto max-w-3xl space-y-4">
            <h3 className="font-serif text-2xl leading-snug text-[#143067] md:text-3xl">
              &ldquo;Las certificaciones representan un momento específico. La
              mejora continua representa una decisión permanente.&rdquo;
            </h3>
            <p className="text-sm leading-relaxed text-[#444650]">
              Nuestro objetivo no es acumular diplomas, sino transformar cada
              nuevo conocimiento en mejores procesos, mejores acabados y una
              mejor experiencia para nuestros clientes.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 8. CIERRE: LA CONFIANZA TAMBIÉN SE CONSTRUYE CON EXPERIENCIA */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#143067] px-5 py-20 text-center text-white md:px-8 md:py-32">
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl filter"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#143067]/[0.05] blur-2xl filter"></div>

        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          <span className="font-mono text-xs font-bold tracking-widest text-white/60 uppercase">
            Nuestro Compromiso
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-white md:text-5xl">
            La confianza también se construye con experiencia.
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-white/30"></div>

          <div className="space-y-6 font-serif text-lg leading-relaxed text-[#dae2ff]">
            <p>
              Cada proyecto realizado y cada habilidad incorporada fortalecen el
              compromiso que asumimos con nuestros clientes.
            </p>
            <p className="font-sans text-sm font-bold tracking-wider text-white uppercase">
              Seguiremos aprendiendo y perfeccionando procesos para ofrecer
              uniformes que representen con orgullo a quienes los utilizan.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/contacto"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-white/20 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            >
              Contactar con el Taller
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
