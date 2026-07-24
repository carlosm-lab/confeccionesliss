"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface DocumentFolder {
  id: string;
  name: string;
  href: string;
  description: string;
}

const documentFolders: DocumentFolder[] = [
  {
    id: "equipo",
    name: "Equipo de Trabajo",
    href: "/empresa/equipo",
    description:
      "Conoce a las personas que forman parte de Confecciones Liss y la función que cumple cada una en el proceso de confección.",
  },
  {
    id: "historia",
    name: "Historia Oficial",
    href: "/empresa/sobre-nosotros",
    description:
      "Nuestra trayectoria desde 2005 como taller familiar y nuestro crecimiento comercial.",
  },
  {
    id: "proceso",
    name: "Proceso de Confección",
    href: "/empresa/proceso-de-confeccion",
    description:
      "Las etapas detalladas de nuestro trabajo en el taller, desde el diseño inicial hasta el acabado de las prendas.",
  },
  {
    id: "calidad",
    name: "Manual de Calidad",
    href: "/empresa/calidad",
    description:
      "Nuestros estándares y controles de costura para asegurar la durabilidad de cada uniforme.",
  },
  {
    id: "politicas",
    name: "Políticas y Garantías",
    href: "/legal/garantia",
    description:
      "Términos y condiciones de compra, nuestra garantía de confección y políticas de devolución.",
  },
  {
    id: "mediakit",
    name: "Media Kit de Marca",
    href: "/empresa/media-kit",
    description:
      "Recursos visuales oficiales, logotipos, colores e identidad gráfica de Confecciones Liss.",
  },
  {
    id: "instalaciones",
    name: "Visita de Instalaciones",
    href: "/empresa/instalaciones",
    description:
      "Recorrido por la distribución física y maquinaria de nuestro taller en Barrio La Merced.",
  },
  {
    id: "responsabilidad",
    name: "Responsabilidad Social",
    href: "/empresa/responsabilidad-social",
    description:
      "Nuestros compromisos con el empleo local en San Miguel y el desarrollo sostenible de nuestro taller.",
  },
];

interface StickyNote {
  id: number;
  question: string;
  answer: React.ReactNode;
  size: string;
  rotation: string;
}

const stickyNotes: StickyNote[] = [
  {
    id: 1,
    question: "¿Tienen tienda física abierta al público?",
    answer:
      "No operamos como tienda de ropa casual. Nuestro local en Barrio La Merced, San Miguel, es un taller de diseño y confección. La toma de medidas presencial se realiza bajo cita previa coordinada.",
    size: "col-span-1 md:col-span-6",
    rotation: "rotate-[-1.5deg]",
  },
  {
    id: 2,
    question: "¿De dónde provienen los materiales?",
    answer:
      "Trabajamos con telas e hilos seleccionados según el uso de cada uniforme, priorizando resistencia y durabilidad frente al uso diario y los lavados frecuentes.",
    size: "col-span-1 md:col-span-6",
    rotation: "rotate-[2deg]",
  },
  {
    id: 3,
    question: "¿Qué pasa si la prenda a la medida no me queda bien?",
    answer: (
      <>
        Si solicitaste confección a la medida, asististe presencialmente a la
        toma de medidas y reportas la inconformidad al momento de retirar la
        prenda en el taller, aplicamos nuestra Garantía Premier de Ajuste: hasta
        3 ajustes correctivos gratuitos o la reelaboración completa de la prenda
        si es necesario. Puedes ver el detalle completo en nuestra{" "}
        <Link
          href="/legal/garantia"
          className="font-semibold text-[#143067] underline hover:text-[#143067]/80"
        >
          Política de Garantía
        </Link>
        .
      </>
    ),
    size: "col-span-1 md:col-span-7",
    rotation: "rotate-[-1deg]",
  },
  {
    id: 4,
    question: "¿Hacen envíos a nivel nacional?",
    answer: (
      <>
        Sí. Coordinamos envíos a nivel nacional en El Salvador a través de un
        servicio de transporte de terceros. El costo varía entre USD $3.00 y
        $5.00 según el destino, peso y volumen del pedido. La cobertura depende
        de la disponibilidad del proveedor de transporte en cada zona. Más
        detalles en nuestra{" "}
        <Link
          href="/legal/envios"
          className="font-semibold text-[#143067] underline hover:text-[#143067]/80"
        >
          Política de Envíos
        </Link>
        .
      </>
    ),
    size: "col-span-1 md:col-span-5",
    rotation: "rotate-[1.5deg]",
  },
];

export default function TransparenciaClient() {
  const [activeFolderId, setActiveFolderId] = useState<string>("equipo");
  const activeFolder =
    documentFolders.find((f) => f.id === activeFolderId) || documentFolders[0];

  const blockVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <div className="bg-[#f8f9fb] font-sans text-[#191c1e] antialiased selection:bg-[#143067]/10 selection:text-[#143067]">
      {/* ──────────────────────────────────────────────────────── */}
      {/* CABECERA DOCUMENTAL (Hero) */}
      {/* ──────────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-screen-2xl border-b border-[#e1e2e5] px-5 pt-4 pb-12 md:px-8 md:pt-6">
        <div className="border-primary/35 rounded border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-10">
          <div className="space-y-8">
            <h1 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight text-[#143067] md:text-5xl lg:text-6xl">
              &ldquo;La confianza no se solicita. Se construye siendo
              transparentes.&rdquo;
            </h1>

            <div className="flex flex-wrap gap-4 font-mono text-xs text-[#444650]">
              <span className="rounded border border-[#143067]/10 bg-[#143067]/5 px-3 py-1">
                Empresa: Confecciones Liss
              </span>
              <span className="rounded border border-[#143067]/10 bg-[#143067]/5 px-3 py-1 font-bold text-[#143067]">
                Estado: Información Pública
              </span>
              <span className="rounded border border-[#143067]/10 bg-[#143067]/5 px-3 py-1">
                Última actualización: Junio 2026
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────── */}
      {/* CUERPO PRINCIPAL */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-screen-2xl px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* PANEL PRINCIPAL IZQUIERDO */}
          <div className="space-y-16 md:space-y-24 lg:col-span-8">
            {/* BLOQUE 1: Quiénes somos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex items-center gap-2 border-b border-[#e1e2e5] pb-3">
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Quiénes somos
                </h2>
              </div>

              <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
                <div className="space-y-4 text-base leading-relaxed text-[#444650]">
                  <p>
                    Somos una empresa familiar dedicada a la confección de
                    uniformes escolares, empresariales y médicos.
                  </p>
                  <p>
                    Nuestra historia comenzó en 2005 confeccionando prendas
                    desde casa, y desde entonces hemos construido nuestro
                    crecimiento a partir del trabajo constante, la
                    especialización y la confianza de nuestros clientes.
                  </p>
                </div>

                {/* Caja Datos Empresa */}
                <div className="space-y-3 rounded border border-[#e1e2e5] bg-white p-5 font-mono text-xs text-[#444650]">
                  <span className="block border-b border-[#e1e2e5] pb-2 font-bold tracking-wider text-[#143067] uppercase">
                    DATOS DE LA EMPRESA
                  </span>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Año de inicio del oficio
                    </span>
                    <span>2005</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Constitución del taller
                    </span>
                    <span>2021</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Ubicación
                    </span>
                    <span>Barrio La Merced, San Miguel</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Actividad
                    </span>
                    <span>Confección de uniformes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#191c1e]">
                      Naturaleza
                    </span>
                    <span>Empresa familiar</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BLOQUE 2: Cómo trabajamos (Flujograma) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex flex-col gap-1 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Cómo trabajamos
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Cómo tomamos decisiones
                </h2>
              </div>

              <div className="relative grid grid-cols-1 items-stretch gap-4 md:grid-cols-4">
                {[
                  {
                    step: "Cliente",
                    desc: "El cliente define sus necesidades de uniformidad. Si el pedido es a la medida, se coordina la toma de medidas presencial en el taller.",
                  },
                  {
                    step: "Diseño",
                    desc: "Se traza el patrón correspondiente al tipo de uniforme solicitado, verificando que corresponda a las especificaciones del cliente.",
                  },
                  {
                    step: "Producción",
                    desc: "La confección se realiza físicamente en nuestro taller de San Miguel, con revisión de costuras durante el proceso.",
                  },
                  {
                    step: "Entrega",
                    desc: "Inspección final de calidad, planchado manual, empaque individual y coordinación de entrega o envío.",
                  },
                ].map((item, index, arr) => (
                  <div
                    key={index}
                    className="relative flex flex-col justify-between rounded border border-[#e1e2e5] bg-white p-5 transition-colors duration-300 hover:border-[#143067]/40"
                  >
                    <div className="space-y-3">
                      <span className="font-mono text-[9px] font-bold text-[#143067]">
                        PASO 0{index + 1}
                      </span>
                      <h3 className="font-serif text-base font-bold text-[#143067]">
                        {item.step}
                      </h3>
                      <p className="text-xs leading-relaxed text-[#444650]">
                        {item.desc}
                      </p>
                    </div>
                    {/* Flecha conectora (solo visible en desktop) */}
                    {index < arr.length - 1 && (
                      <div className="pointer-events-none absolute top-1/2 -right-3 z-10 hidden -translate-y-1/2 rounded-full border border-[#e1e2e5] bg-white p-1 font-bold text-[#143067] select-none md:block">
                        <Icon
                          name="arrow_forward"
                          size={12}
                          className="text-xs"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BLOQUE 3: Nuestros compromisos públicos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex flex-col gap-1 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Nuestros compromisos
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Nuestros compromisos públicos
                </h2>
              </div>

              <div className="divide-y divide-[#e1e2e5] rounded border border-[#e1e2e5] bg-white font-sans text-sm text-[#444650]">
                {[
                  {
                    num: "01",
                    text: "Nunca ofrecer información falsa sobre nuestros materiales, procesos o tiempos de producción.",
                  },
                  {
                    num: "02",
                    text: "No prometer plazos imposibles con el único fin de asegurar una venta.",
                  },
                  {
                    num: "03",
                    text: "Explicar claramente las condiciones de cada modalidad de confección y de nuestra política de garantía antes de confirmar un pedido.",
                  },
                  {
                    num: "04",
                    text: "Responder con honestidad ante reclamos, aplicando nuestra Garantía Premier de Ajuste en los pedidos a la medida que cumplan las condiciones establecidas.",
                  },
                  {
                    num: "05",
                    text: "Corregir errores de patronaje o confección atribuibles al taller, sin costo adicional, conforme a las condiciones de nuestra política de garantía.",
                  },
                  {
                    num: "06",
                    text: "Mantener comunicación directa con el cliente durante el proceso de fabricación de su pedido.",
                  },
                ].map((item) => (
                  <div key={item.num} className="flex items-center gap-6 p-5">
                    <span className="shrink-0 font-mono text-xl font-bold text-[#143067]">
                      {item.num} {"//"}
                    </span>
                    <p className="text-sm font-semibold text-[#191c1e]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BLOQUE 4: Lo que publicamos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex flex-col gap-1 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Lo que publicamos
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Lo que publicamos
                </h2>
              </div>

              <p className="text-base text-[#444650]">
                Confecciones Liss publica información pública sobre su historia,
                equipo, procesos y políticas. A continuación, los documentos y
                secciones disponibles en el sitio:
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Grid de carpetas interactivas */}
                <div className="grid grid-cols-2 gap-2">
                  {documentFolders.map((folder) => (
                    <button
                      key={folder.id}
                      onClick={() => setActiveFolderId(folder.id)}
                      className={`flex items-center gap-2 rounded border p-3 text-left transition-all duration-300 ${
                        activeFolderId === folder.id
                          ? "border-[#143067] bg-[#143067] text-white"
                          : "border-[#e1e2e5] bg-white text-[#143067] hover:bg-[#f8f9fb]"
                      }`}
                    >
                      <Icon name="folder" size={14} className="text-sm" />
                      <span className="truncate font-serif text-xs leading-none font-bold">
                        {folder.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Detalle de la carpeta seleccionada */}
                <div className="flex min-h-[200px] flex-col justify-between rounded border border-[#e1e2e5] bg-white p-6">
                  <div className="space-y-3">
                    <h3 className="font-serif text-lg font-bold text-[#143067]">
                      {activeFolder.name}
                    </h3>
                    <p className="text-xs leading-relaxed text-[#444650]">
                      {activeFolder.description}
                    </p>
                  </div>

                  <div className="mt-6 border-t border-[#e1e2e5] pt-4">
                    <Link
                      href={activeFolder.href}
                      className="flex items-center gap-1 font-mono text-xs font-bold text-[#143067] hover:underline"
                    >
                      Ver página completa →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* BLOQUE 5: Preguntas frecuentes */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex flex-col gap-1 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Preguntas frecuentes
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Preguntas que recibimos con frecuencia
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-12">
                {stickyNotes.map((note) => (
                  <div
                    key={note.id}
                    className={`space-y-3 rounded border border-[#e1e2e5] bg-white p-6 shadow-[0_4px_15px_-10px_rgba(0,0,0,0.05)] transition-transform duration-500 hover:scale-[1.01] hover:rotate-0 ${note.size} ${note.rotation}`}
                  >
                    <span className="block border-b border-[#e1e2e5] pb-2 font-mono text-[9px] font-bold tracking-wider text-[#143067] uppercase">
                      PREGUNTA FRECUENTE
                    </span>
                    <h3 className="font-serif text-sm leading-snug font-bold text-[#143067]">
                      {note.question}
                    </h3>
                    <div className="font-sans text-xs leading-relaxed text-[#444650]">
                      {note.answer}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* BLOQUE 6: Lo que nunca ocultamos */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex flex-col gap-1 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Lo que nunca ocultamos
                </span>
              </div>

              <div className="relative space-y-6 overflow-hidden rounded bg-[#143067] p-8 text-white md:space-y-8 md:p-16">
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.02]"
                  style={{
                    backgroundImage:
                      "radial-gradient(white 1px, transparent 1px)",
                    backgroundSize: "16px 16px",
                  }}
                ></div>

                <h3 className="font-serif text-3xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
                  Nuestra historia.
                </h3>
                <h3 className="pl-4 font-serif text-3xl leading-tight font-bold tracking-tight text-white/80 md:pl-8 md:text-5xl lg:text-6xl">
                  Nuestro equipo.
                </h3>
                <h3 className="pl-8 font-serif text-3xl leading-tight font-bold tracking-tight text-white/60 md:pl-16 md:text-5xl lg:text-6xl">
                  Nuestro taller.
                </h3>
                <h3 className="pl-12 font-serif text-3xl leading-tight font-bold tracking-tight text-white/50 md:pl-24 md:text-5xl lg:text-6xl">
                  Nuestros procesos.
                </h3>
                <h3 className="pl-16 font-serif text-3xl leading-tight font-bold tracking-tight text-white md:pl-32 md:text-5xl lg:text-6xl">
                  Nuestros errores cuando ocurren.
                </h3>
                <h3 className="pt-4 pl-20 font-serif text-2xl font-semibold text-[#dae2ff] italic md:pl-40 md:text-4xl">
                  Y nuestro compromiso de mejorar.
                </h3>
              </div>
            </motion.div>

            {/* BLOQUE 7: Transparencia en acción */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={blockVariants}
              className="space-y-6"
            >
              <div className="flex flex-col gap-1 border-b border-[#e1e2e5] pb-3">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  Transparencia en acción
                </span>
                <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
                  Transparencia en acción
                </h2>
              </div>

              <div className="grid grid-cols-1 items-start gap-8 text-sm leading-relaxed text-[#444650] md:grid-cols-3">
                {/* Columna 1: Foto */}
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-[#e1e2e5] bg-[#f8f9fb]">
                    <Image
                      src="/images/transparencia/preparacion-de-pedidos.jpg"
                      alt="Operario empacando prendas de calidad"
                      fill
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="object-cover object-center"
                    />
                  </div>
                  <span className="block font-mono text-[9px] text-[#444650]">
                    Preparación de pedidos en el taller.
                  </span>
                </div>

                {/* Columna 2: Cita destacada */}
                <div className="space-y-4 border-r border-l border-[#e1e2e5] px-4 md:px-6">
                  <p className="font-serif text-lg leading-relaxed text-[#143067] italic">
                    &ldquo;Creemos que publicar nuestra historia, equipo e
                    instalaciones permite que cualquier cliente conozca con
                    quién trabaja.&rdquo;
                  </p>
                  <p className="text-xs">
                    La transparencia no debe reservarse únicamente para
                    auditorías internas. Debe ser la base de la comunicación
                    comercial diaria.
                  </p>
                </div>

                {/* Columna 3: Notas editoriales */}
                <div className="space-y-4">
                  <p>
                    Confecciones Liss publica información sobre su historia,
                    equipo, procesos, instalaciones y políticas para que
                    cualquier cliente pueda conocer quién está detrás del taller
                    antes de realizar un pedido.
                  </p>
                  <p className="font-semibold text-[#143067]">
                    Costura y servicio real desde San Miguel.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* COLUMNA DERECHA STICKY */}
          <div
            className="lg:sticky lg:top-4 lg:col-span-4"
            style={{ top: "calc(56px + 1rem)" }}
          >
            <div
              className="border-primary/35 relative w-full overflow-hidden rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]"
              style={{ height: "calc(100dvh - 56px - 2rem)" }}
            >
              <Image
                fill
                src="/images/transparencia/imagen-lateral.png"
                alt="Transparencia y honestidad en el taller"
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 30vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* CIERRE */}
      <footer className="border-t border-[#e1e2e5] bg-[#f8f9fb] px-5 py-20 text-center md:px-8 md:py-32">
        <div className="mx-auto max-w-2xl space-y-6">
          <h2 className="font-serif text-2xl leading-snug text-[#143067] md:text-3xl">
            &ldquo;La transparencia no es una sección del sitio web. Es la forma
            en que decidimos construir Confecciones Liss.&rdquo;
          </h2>
          <div className="mx-auto h-0.5 w-16 bg-[#143067]"></div>

          <div className="pt-4 font-mono text-xs text-[#444650]">
            <p className="font-bold text-[#143067]">Confecciones Liss</p>
            <p>Desde 2005.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
