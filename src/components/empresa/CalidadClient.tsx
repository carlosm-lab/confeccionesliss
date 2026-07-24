"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

// Estructura de datos para el flujo interactivo de trabajo en equipo
interface TeamRole {
  id: string;
  name: string;
  responsible: string;
  focus: string;
  description: string;
  spec: string;
}

const teamRoles: TeamRole[] = [
  {
    id: "medidas",
    name: "Toma de Medidas",
    responsible: "Control de Calidad",
    focus: "Registro de medidas",
    description:
      "Verificación de las medidas registradas del pedido para asegurar que cada pieza corresponda a la talla solicitada o a las medidas tomadas directamente al cliente.",
    spec: "Ancho de hombros · Contorno de pecho · Largo total · Largo de manga",
  },
  {
    id: "corte",
    name: "Mesa de Corte",
    responsible: "Patronista / Cortador",
    focus: "Alineación del patrón",
    description:
      "Revisión de las piezas cortadas para comprobar alineación y precisión respecto al patrón. Un corte correcto garantiza que todas las piezas encajen durante la confección.",
    spec: "Verificación visual del sentido de la tela antes del corte.",
  },
  {
    id: "confeccion",
    name: "Línea de Confección",
    responsible: "Especialista de Costura",
    focus: "Resistencia e integridad",
    description:
      "Inspección de costuras para comprobar resistencia, continuidad, alineación y acabado. Se verifica que no existan hilos sueltos ni uniones débiles.",
    spec: "Cada costura se revisa individualmente para confirmar que el entrelazado sea uniforme.",
  },
  {
    id: "bordado",
    name: "Área de Bordado",
    responsible: "Operario de Bordado",
    focus: "Posición y acabado",
    description:
      "Revisión de posición, tamaño, alineación y acabado del bordado. Se verifica que no se deshilache ni se desgaste con el uso, el roce o el lavado frecuente.",
    spec: "Verificación de que el bordado quede fijo y sin hilos sueltos antes de coserlo a la prenda.",
  },
  {
    id: "calidad",
    name: "Revisión Técnica",
    responsible: "René Alfonso Méndez",
    focus: "Cumplimiento del estándar",
    description:
      "Inspección visual de costuras, pliegues y bordados antes de continuar con el planchado y empaque.",
    spec: "Revisión individual de cada prenda antes de autorizar su entrega.",
  },
  {
    id: "almacen",
    name: "Preparación y Empaque",
    responsible: "Preparación de Pedidos",
    focus: "Presentación final",
    description:
      "Revisión final, organización y empaque individual de cada uniforme para que llegue al cliente en las mejores condiciones, listo para su retiro o envío.",
    spec: "Cada prenda se revisa antes de salir del taller.",
  },
];

export default function CalidadClient() {
  const [activeRoleId, setActiveRoleId] = useState<string>("calidad");
  const activeRole =
    teamRoles.find((r) => r.id === activeRoleId) || teamRoles[4];

  // Variantes de animación
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
      {/* 1. HERO: MANUAL DE CONTROL DE CALIDAD (Ficha Técnica) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-4 pb-16 md:px-8 md:pt-6 md:pb-24">
        <div className="border-primary/35 rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Texto del Hero */}
            <div className="space-y-6 lg:col-span-7">
              <h1 className="font-serif text-4xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-6xl">
                Control de Calidad
              </h1>
              <p className="border-l-2 border-[#143067] pl-4 font-serif text-lg leading-relaxed text-[#444650] md:text-xl">
                La calidad no se evalúa únicamente al finalizar una prenda. Está
                presente desde el corte de la tela hasta el momento en que el
                uniforme llega a manos del cliente.
              </p>
              <div className="max-w-xl space-y-4 text-base leading-relaxed text-[#444650]">
                <p>
                  En Confecciones Liss entendemos que un uniforme representa la
                  imagen de una institución, una empresa o un profesional. Por
                  esa razón, cada prenda pasa por un proceso de revisión donde
                  se verifican costuras, acabados, bordados y resistencia antes
                  de autorizar su entrega.
                </p>
                <p className="font-semibold text-[#143067]">
                  No revisamos únicamente el resultado final. Controlamos la
                  calidad durante todo el proceso de confección.
                </p>
              </div>
            </div>

            {/* Lado Derecho: Imagen de Control de Calidad */}
            <div className="flex justify-center lg:col-span-5 lg:justify-end">
              <div className="border-primary/35 relative flex aspect-square w-full max-w-md items-center justify-center overflow-hidden rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    fill
                    src="/images/calidad/hero.jpg"
                    alt="Control de Calidad - Confecciones Liss"
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 2. FILOSOFÍA: NUESTRA FILOSOFÍA DE CALIDAD (Editorial) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Eyebrow and Title */}
          <div className="space-y-4 lg:col-span-4">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Nuestro enfoque
            </span>
            <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
              Nuestra filosofía de calidad
            </h2>
            <div className="h-1 w-12 rounded-full bg-[#143067]"></div>
          </div>

          {/* Large Quote and descriptive text */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:col-span-8">
            <div className="space-y-4 border-l-2 border-[#143067] pl-6">
              <p className="font-serif text-2xl leading-snug text-[#143067]">
                &ldquo;Nuestra prioridad no es producir más rápido. Nuestra
                prioridad es producir correctamente.&rdquo;
              </p>
            </div>

            <div className="space-y-4 text-base leading-relaxed text-[#444650]">
              <p>
                La calidad no depende de una sola persona; es el resultado del
                compromiso de todo el equipo. Cada integrante del taller revisa
                cuidadosamente su trabajo antes de pasar la prenda a la
                siguiente etapa, lo que permite detectar cualquier detalle a
                tiempo y mantener un estándar uniforme en toda la producción.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 3. LOS SEIS CONTROLES DE CALIDAD (Recorrido Asimétrico) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="mx-auto mb-16 max-w-xl space-y-4 text-center md:mb-24">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Nuestro Proceso de Revisión
            </span>
            <h2 className="font-serif text-3xl text-[#143067] md:text-4xl lg:text-5xl">
              Los controles que realiza cada uniforme
            </h2>
            <p className="font-sans text-sm leading-relaxed text-[#444650]">
              Cada uniforme confeccionado en nuestro taller del Barrio La Merced
              pasa por un proceso de revisión antes de su entrega.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {/* CONTROL 1: VERIFICACIÓN DE MEDIDAS (Split 50/50, Texto-Tabla / Foto) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className="space-y-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#143067] md:text-6xl">
                    01.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Verificación de medidas
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Antes de iniciar la confección, verificamos las medidas
                    registradas del pedido para asegurar que cada pieza
                    corresponda a la talla solicitada o a las medidas tomadas
                    directamente al cliente. Cada corte debe respetar las
                    dimensiones establecidas para evitar diferencias durante el
                    ensamblaje.
                  </p>
                </div>

                {/* Puntos de medida verificados */}
                <div className="border-primary/35 overflow-hidden rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                  <div className="border-b border-[#e1e2e5] bg-[#f8f9fb] p-3">
                    <p className="font-mono text-xs font-bold text-[#143067] uppercase">
                      Puntos de medida verificados
                    </p>
                  </div>
                  <div className="divide-y divide-[#e1e2e5] font-mono text-xs text-[#444650]">
                    {[
                      "Ancho de hombros",
                      "Contorno de pecho",
                      "Largo total",
                      "Largo de manga",
                    ].map((punto) => (
                      <div key={punto} className="p-3">
                        {punto}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-primary/35 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-[#f8f9fb] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <Image
                  src="/images/calidad/verificacion-de-medidas.jpg"
                  alt="Verificación de medidas de patrones"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            {/* CONTROL 2: INSPECCIÓN DEL CORTE (Split 40/60, Foto / Tolerancias Técnicas) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className="order-2 lg:order-1 lg:col-span-5">
                <div className="border-primary/35 relative aspect-square w-full overflow-hidden rounded-2xl border bg-[#f8f9fb] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                  <Image
                    src="/images/calidad/inspeccion-del-corte.jpg"
                    alt="Inspección detallada del corte textil"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="order-1 space-y-6 lg:order-2 lg:col-span-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#143067] md:text-6xl">
                    02.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Inspección del corte
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Cada pieza cortada se revisa para comprobar alineación y
                    precisión respecto al patrón. Un corte correcto garantiza
                    que todas las piezas encajen correctamente durante la
                    confección, evitando deformaciones después del uso y el
                    lavado.
                  </p>
                </div>

                {/* Lista técnica */}
                <div className="grid grid-cols-1 gap-4 border-t border-[#e1e2e5] pt-4 sm:grid-cols-2">
                  <div className="border-primary/35 rounded-2xl border bg-[#f8f9fb] p-4">
                    <span className="mb-1 block font-mono text-[10px] font-bold tracking-wider text-[#143067] uppercase">
                      Método
                    </span>
                    <h4 className="mb-1 font-serif text-sm font-bold text-[#143067]">
                      Alineación al hilo de la tela
                    </h4>
                    <p className="text-xs text-[#444650]">
                      Verificación visual del sentido de la tela antes del
                      corte.
                    </p>
                  </div>
                  <div className="border-primary/35 rounded-2xl border bg-[#f8f9fb] p-4">
                    <span className="mb-1 block font-mono text-[10px] font-bold tracking-wider text-[#143067] uppercase">
                      Estándar
                    </span>
                    <h4 className="mb-1 font-serif text-sm font-bold text-[#143067]">
                      Precisión del patrón
                    </h4>
                    <p className="text-xs text-[#444650]">
                      Revisión de que cada pieza respete el patrón original sin
                      desviaciones visibles.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CONTROL 3: REVISIÓN DE COSTURAS (Horizontal Bloque Oscuro - Diagrama Técnico) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 rounded-2xl bg-[#143067] p-8 text-white md:p-12 lg:grid-cols-12 lg:gap-12"
            >
              <div className="space-y-6 lg:col-span-7">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#143067] md:text-6xl">
                    03.
                  </span>
                  <h3 className="font-serif text-2xl text-white md:text-3xl">
                    Revisión de costuras
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#dae2ff]">
                  <p>
                    Las costuras se inspeccionan para comprobar resistencia,
                    continuidad, alineación y acabado. Se verifica que no
                    existan hilos sueltos, uniones débiles ni diferencias
                    visibles entre piezas.
                  </p>
                  <p>
                    Utilizamos hilo resistente, adecuado para soportar el uso
                    diario de uniformes médicos y escolares.
                  </p>
                </div>
              </div>

              {/* Bloque descriptivo de costura */}
              <div className="flex flex-col justify-between rounded-2xl border border-white/20 bg-white/5 p-6 lg:col-span-5">
                <div className="mb-4 font-mono text-[10px] tracking-wider text-[#dae2ff] uppercase">
                  <span>Revisión de costura</span>
                </div>

                <div className="relative my-2 aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10">
                  <Image
                    src="/images/calidad/revision-de-costuras.jpg"
                    alt="Revisión de costuras"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-center"
                  />
                </div>

                <p className="mt-4 font-mono text-[9px] leading-normal text-[#dae2ff]">
                  Cada costura se revisa de forma individual para confirmar que
                  el entrelazado del hilo sea uniforme y sin fruncidos.
                </p>
              </div>
            </motion.div>

            {/* CONTROL 4: CONTROL DEL BORDADO (Split 50/50, Blueprint / Foto) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className="space-y-6 lg:order-2">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#143067] md:text-6xl">
                    04.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Control del bordado
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Cuando el uniforme incorpora logotipos o bordados
                    institucionales, revisamos cuidadosamente su posición,
                    tamaño, alineación y acabado para asegurar una presentación
                    profesional.
                  </p>
                  <p>
                    Se verifica que el bordado no se deshilache ni se desgaste
                    con el uso, el roce o el lavado frecuente.
                  </p>
                </div>
              </div>

              <div className="border-primary/35 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-[#f8f9fb] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] lg:order-1">
                <Image
                  src="/images/calidad/control-del-bordado.jpg"
                  alt="Control de calidad del bordado computarizado"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </motion.div>

            {/* CONTROL 5: ACABADOS FINALES (Clipboard Notepad) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className="space-y-6 lg:col-span-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#143067] md:text-6xl">
                    05.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Acabados finales
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Antes de considerar terminada una prenda revisamos
                    nuevamente todos los detalles visibles.
                  </p>
                  <p>
                    Cada elemento contribuye a la percepción final de calidad.
                    Un uniforme no solo debe ser fuerte estructuralmente, sino
                    verse limpio, simétrico y profesional.
                  </p>
                </div>
              </div>

              {/* Clipboard QA Checklist */}
              <div className="border-primary/35 relative rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] lg:col-span-7">
                {/* Clipboard Clip style decoration */}
                <div className="mx-auto -mt-8 mb-6 h-4 w-24 rounded-full border border-[#143067]/30 bg-[#143067]/20"></div>

                <h4 className="mb-4 border-b border-[#e1e2e5] pb-3 font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                  Revisión final antes de entrega
                </h4>

                <div className="space-y-4 font-sans text-sm text-[#444650]">
                  <div className="flex items-start gap-4">
                    <Icon
                      name="check_box"
                      className="font-bold text-[#143067] select-none"
                    />
                    <div>
                      <strong className="block text-[#191c1e]">
                        Costuras estructurales
                      </strong>
                      <span>
                        Ausencia de hilos sueltos y costura pareja sin
                        deformaciones.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon
                      name="check_box"
                      className="font-bold text-[#143067] select-none"
                    />
                    <div>
                      <strong className="block text-[#191c1e]">
                        Terminaciones
                      </strong>
                      <span>
                        Remate limpio en cuello, mangas, bastillas y ojales, sin
                        deshilachado.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon
                      name="check_box"
                      className="font-bold text-[#143067] select-none"
                    />
                    <div>
                      <strong className="block text-[#191c1e]">
                        Limpieza del tejido
                      </strong>
                      <span>
                        Remoción de hilos sobrantes y residuos de marcado.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon
                      name="check_box"
                      className="font-bold text-[#143067] select-none"
                    />
                    <div>
                      <strong className="block text-[#191c1e]">
                        Planchado
                      </strong>
                      <span>
                        Alineación correcta de pliegues y acabado limpio.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Icon
                      name="check_box"
                      className="font-bold text-[#143067] select-none"
                    />
                    <div>
                      <strong className="block text-[#191c1e]">
                        Presentación e insumos
                      </strong>
                      <span>Botones y cierres bien cosidos y alineados.</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[#e1e2e5] pt-4 font-mono text-xs text-[#444650]">
                  <span>RESPONSABLE: René A. Méndez</span>
                  <span className="border-b border-[#e1e2e5] px-4 pb-1 italic">
                    R.Méndez
                  </span>
                </div>
              </div>
            </motion.div>

            {/* CONTROL 6: PREPARACIÓN PARA ENTREGA (Split 60/40, Foto / Box) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16"
            >
              <div className="border-primary/35 relative order-2 aspect-[16/10] w-full overflow-hidden rounded-2xl border bg-[#f8f9fb] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] lg:order-1 lg:col-span-7">
                <Image
                  src="/images/calidad/preparacion-para-entrega.jpg"
                  alt="Preparación final y empaque de uniformes"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="order-1 space-y-6 lg:order-2 lg:col-span-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-5xl font-bold text-[#143067] md:text-6xl">
                    06.
                  </span>
                  <h3 className="font-serif text-2xl text-[#143067] md:text-3xl">
                    Preparación para entrega
                  </h3>
                </div>
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Antes de salir del taller, cada uniforme recibe una revisión
                    final. Posteriormente se organiza, se empaca individualmente
                    y se prepara para que llegue al cliente en las mejores
                    condiciones, listo para su retiro o envío a domicilio.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 4. LO QUE NUNCA PERMITIMOS (Checklist Industrial Red) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="border-primary/35 relative overflow-hidden rounded-2xl border-2 border-[#143067] bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12">
          {/* Warning stamp decoration */}
          <div className="pointer-events-none absolute -top-8 -right-8 flex h-32 w-32 rotate-12 items-center justify-center rounded-full border-4 border-[#143067]/10 select-none">
            <span className="font-mono text-[9px] font-bold tracking-widest text-[#143067]/30 uppercase">
              TOLERANCIA CERO
            </span>
          </div>

          <div className="relative z-10 grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
            {/* Title & Badge */}
            <div className="space-y-4 lg:col-span-4">
              <span className="inline-block rounded bg-[#143067]/10 px-3 py-1 font-mono text-xs font-bold text-[#143067] uppercase">
                Estándares mínimos
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
                Lo que nunca permitimos
              </h2>
              <p className="text-sm leading-relaxed text-[#444650]">
                Cualquier defecto detectado en estas áreas se corrige antes de
                continuar o de autorizar la entrega del pedido.
              </p>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:col-span-8">
              {[
                {
                  title: "Una costura abierta",
                  desc: "Cualquier defecto de costura se detecta y corrige antes de continuar.",
                },
                {
                  title: "Una talla incorrecta",
                  desc: "Las medidas se confirman contra el pedido antes de avanzar a la siguiente etapa.",
                },
                {
                  title: "Un bordado deshilachado",
                  desc: "El bordado se revisa antes de coserlo a la prenda.",
                },
                {
                  title: "Una prenda sin revisar",
                  desc: "Ninguna prenda avanza sin pasar por control de calidad.",
                },
                {
                  title: "Una terminación descuidada",
                  desc: "Los detalles finales se verifican uno por uno.",
                },
                {
                  title: "Una entrega sin inspección final",
                  desc: "El pedido completo se revisa antes de ser entregado.",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="border-primary/35 flex gap-4 rounded-2xl border bg-[#f8f9fb] p-4 transition-colors duration-300 hover:border-[#143067]/40 hover:shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]"
                >
                  <Icon
                    name="cancel"
                    className="shrink-0 font-bold text-[#143067] select-none"
                  />
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-bold text-[#143067]">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#444650]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 5. TRABAJO EN EQUIPO (Diagrama de Sinergia Interactivo) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="border-t border-b border-[#e1e2e5] bg-white">
        <div className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
            {/* Story */}
            <div className="space-y-6 lg:col-span-5">
              <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
                Trabajo en equipo
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#143067] md:text-4xl">
                La calidad es un trabajo en equipo
              </h2>
              <div className="h-1 w-12 rounded-full bg-[#143067]"></div>
              <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                <p>
                  Cada integrante del taller participa en el control de calidad.
                  La confección, el bordado, la revisión, la toma de medidas y
                  la preparación de pedidos forman parte de un mismo proceso.
                </p>
                <p className="font-semibold text-[#143067]">
                  La calidad no depende únicamente de quien confecciona una
                  prenda. Es el resultado del trabajo coordinado de todas las
                  personas involucradas.
                </p>
              </div>
            </div>

            {/* Interactive Flow Chart Diagram */}
            <div className="space-y-6 lg:col-span-7">
              <div className="border-primary/35 rounded-2xl border bg-[#f8f9fb] p-4">
                <p className="mb-4 font-mono text-[10px] tracking-wider text-[#444650] uppercase">
                  Selecciona una etapa para ver más detalle.
                </p>

                {/* SVG Flow diagram */}
                <div className="flex flex-wrap gap-2 md:grid md:grid-cols-3 md:gap-3">
                  {teamRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => setActiveRoleId(role.id)}
                      className={`rounded border p-3 text-left transition-all duration-300 ${
                        activeRoleId === role.id
                          ? "border-[#143067] bg-[#143067] text-white"
                          : "border-[#e1e2e5] bg-white text-[#143067] hover:bg-[#f8f9fb]"
                      }`}
                    >
                      <div className="mb-1 font-mono text-[9px] tracking-wider uppercase opacity-75">
                        {role.focus}
                      </div>
                      <div className="truncate font-serif text-sm font-bold">
                        {role.name}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Dynamic technical card based on selection */}
              <div className="relative min-h-[160px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRole.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-3 rounded border border-[#143067]/10 bg-[#143067]/5 p-6"
                  >
                    <div className="flex items-baseline justify-between gap-2 border-b border-[#143067]/10 pb-2">
                      <span className="font-mono text-xs font-bold tracking-wider text-[#143067] uppercase">
                        ESTACIÓN: {activeRole.name}
                      </span>
                      <span className="font-mono text-[10px] text-[#444650]">
                        RESPONSABLE: {activeRole.responsible}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#191c1e]">
                      {activeRole.description}
                    </p>
                    <div className="rounded border border-[#e1e2e5] bg-white p-2 font-mono text-[11px] text-[#143067]">
                      {activeRole.spec}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 6. NUESTRO COMPROMISO (Declaración Firmada) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-16 md:px-8 md:py-24">
        <div className="border-primary/35 mx-auto max-w-4xl rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-12">
          <div className="mb-8 space-y-2 border-b border-[#e1e2e5] pb-6 text-center">
            <span className="font-mono text-[10px] font-bold tracking-widest text-[#143067] uppercase">
              Nuestro compromiso
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Lo que prometemos a cada cliente
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {[
              {
                num: "01",
                title: "Materiales seleccionados",
                text: "Trabajamos con telas e hilos adecuados para el uso de cada tipo de uniforme.",
              },
              {
                num: "02",
                title: "Respeto a especificaciones",
                text: "Respetamos los moldes, logotipos y colores institucionales acordados en cada pedido.",
              },
              {
                num: "03",
                title: "Proceso ordenado",
                text: "Mantenemos un taller organizado y un flujo de producción definido en cada etapa.",
              },
              {
                num: "04",
                title: "Revisión individual",
                text: "Revisamos cada uniforme antes de empacarlo y autorizar su entrega.",
              },
              {
                num: "05",
                title: "Escucha activa",
                text: "Escuchamos al cliente y realizamos ajustes de entalle cuando es técnicamente necesario.",
              },
              {
                num: "06",
                title: "Mejora continua",
                text: "Buscamos constantemente formas de mejorar nuestros procesos de confección.",
              },
            ].map((promise, index) => (
              <div key={index} className="flex gap-4">
                <span className="pt-1 font-mono text-xs font-bold text-[#143067]">
                  {promise.num} {"//"}
                </span>
                <div className="space-y-1">
                  <h3 className="font-serif text-base font-bold text-[#191c1e]">
                    {promise.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-[#444650]">
                    {promise.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bloque de cierre */}
          <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#e1e2e5] pt-8 text-center sm:flex-row sm:text-left">
            <div className="space-y-1 font-mono text-xs text-[#444650]">
              <p className="font-bold text-[#143067]">
                Taller Confecciones Liss
              </p>
              <p>Barrio La Merced, San Miguel, El Salvador</p>
            </div>

            {/* Dos columnas informativas */}
            <div className="flex items-center gap-6">
              <div className="text-center font-mono text-xs text-[#444650]">
                <p className="font-bold text-[#143067]">Atención directa</p>
                <p>Trato personalizado en cada pedido.</p>
              </div>
              <div className="text-center font-mono text-xs text-[#444650]">
                <p className="font-bold text-[#143067]">Revisión en taller</p>
                <p>Cada prenda se revisa antes de salir del taller.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* 7. CIERRE (Conclusión del Estándar en Navy Full Bleed) */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#143067] px-5 py-20 text-center text-white md:px-8 md:py-32">
        {/* Accent diagonal stripes representation (subtle background accent) */}
        <div className="pointer-events-none absolute top-0 right-0 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl filter"></div>
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[#143067]/[0.05] blur-2xl filter"></div>

        <div className="relative z-10 mx-auto max-w-2xl space-y-8">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Inspección de Calidad
          </span>
          <h2 className="font-serif text-3xl leading-tight tracking-tight text-white md:text-5xl">
            La confianza también se confecciona.
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-[#143067]"></div>

          <div className="space-y-6 font-serif text-lg leading-relaxed text-[#dae2ff]">
            <p>
              Cada uniforme que sale de nuestro taller representa el trabajo, la
              experiencia y el compromiso de todo el equipo.
            </p>
            <p>
              Nuestro proceso de calidad no termina cuando una prenda está
              cosida. Termina cuando confirmamos que cumple con el estándar que
              nosotros mismos esperamos entregar.
            </p>
            <p className="pt-4 font-sans text-sm font-bold tracking-wider text-white uppercase">
              Para Confecciones Liss, la calidad no es una etapa del proceso. Es
              el proceso completo.
            </p>
          </div>

          <div className="pt-8">
            <Link
              href="/contacto"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-[#143067] px-6 py-3.5 font-sans text-[14px] font-semibold text-white shadow-sm transition-all hover:bg-[#0f2550] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#143067]"
            >
              Agendar Toma de Medidas
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
