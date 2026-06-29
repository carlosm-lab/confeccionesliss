"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface TeamMember {
  name: string;
  role: string;
  year: string;
  description: string;
  specialties: string[];
  initials: string;
}

const team: TeamMember[] = [
  {
    name: "Lilian Romero",
    role: "Especialista en Confección de Uniformes",
    year: "Marzo 2021",
    description:
      "Primera colaboradora del taller. Experta en ensamblado de prendas escolares, empresariales y médicas con altos estándares de precisión y acabado.",
    specialties: [
      "Confección de uniformes",
      "Acabados textiles",
      "Producción en serie",
    ],
    initials: "LR",
  },
  {
    name: "Nubia Vázquez",
    role: "Especialista en Confección de Prendas",
    year: "Agosto 2021",
    description:
      "Aportó uniformidad y consistencia en los diferentes procesos de producción, garantizando un acabado uniforme en cada prenda.",
    specialties: [
      "Confección de prendas",
      "Detalle técnico",
      "Control de acabados",
    ],
    initials: "NV",
  },
  {
    name: "Carlos Antonio Molina",
    role: "Encargado de Logística y Atención Comercial",
    year: "2022",
    description:
      "Asumió la gestión de distribución, entregas a nivel nacional y relación directa con clientes institucionales y corporativos.",
    specialties: [
      "Logística nacional",
      "Atención al cliente",
      "Distribución eficiente",
    ],
    initials: "CM",
  },
  {
    name: "Blanca Martínez",
    role: "Operaria de Producción",
    year: "2023",
    description:
      "Fortaleció la capacidad operativa del taller para cumplir con pedidos masivos en tiempos de entrega rigurosos.",
    specialties: [
      "Ensamblado rápido",
      "Preparación de piezas",
      "Costura industrial",
    ],
    initials: "BM",
  },
  {
    name: "René Alfonso Méndez",
    role: "Responsable de Control de Calidad y Toma de Medidas",
    year: "2025",
    description:
      "Inspector de costuras y medidas personalizadas, encargado de garantizar que cada uniforme entregado quede a la medida exacta del profesional.",
    specialties: [
      "Control de calidad",
      "Toma de medidas",
      "Auditoría de costuras",
    ],
    initials: "RM",
  },
];

export default function SobreNosotrosClient() {
  // Animaciones reutilizables
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const drawLine: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { duration: 1.5, ease: "easeInOut" as const },
        opacity: { duration: 0.5 },
      },
    },
  };

  return (
    <div className="relative overflow-hidden bg-[#f8f9fb] text-[#191c1e] antialiased selection:bg-[#d7dffc] selection:text-[#143067]">
      {/* Barra de progreso de lectura superior */}
      <motion.div
        className="fixed top-0 left-0 z-50 h-[3px] bg-[#b43024]"
        style={{
          scaleX: 0,
          transformOrigin: "0%",
        }}
        animate={{ scaleX: 1 }}
        transition={{ ease: "linear" }}
      />

      {/* Escena 1: Origen (2005) */}
      <section className="bg-surface-container-low relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
        <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
            {/* Breadcrumb section */}
            <div className="mb-6 lg:mb-8">
              <Breadcrumb
                items={[
                  { label: "Inicio", href: "/" },
                  { label: "Empresa", href: "/empresa" },
                  { label: "Sobre Nosotros", href: "/empresa/sobre-nosotros" },
                ]}
                className="animate-fade-in-up"
              />
            </div>

            <span className="mb-2 font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
              Capítulo I — El Origen
            </span>

            <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl md:mb-10 md:flex md:flex-col md:items-center md:text-5xl lg:mb-6 lg:block lg:text-left lg:text-5xl xl:text-6xl xl:leading-[1.1]">
              <span className="text-center lg:text-left">
                Una historia construida{" "}
              </span>
              <span className="text-secondary font-serif md:mt-2 md:flex md:w-full md:items-center md:justify-center md:gap-4 lg:mt-0 lg:inline lg:gap-0">
                {/* LÍNEA DECORATIVA IZQUIERDA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="to-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r from-transparent" />
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                </span>

                <span className="shrink-0">puntada a puntada</span>

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
                      src="/images/servicios/mano-obra.png"
                      alt="Máquina de coser tradicional en taller familiar"
                      className="rounded-xl object-cover object-center"
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
                    Toda gran historia tiene un primer paso. En el año 2005,
                    nuestra fundadora inició un pequeño taller desde su hogar.
                    Especialista en moda y técnica certificada en Corte y
                    Confección, comenzó confeccionando y reparando ropa para su
                    propia familia.
                  </p>
                  <p>
                    No había local comercial, empleados, ni internet. Solo una
                    máquina de coser, talento, disciplina y la firme decisión de
                    perfeccionar cada costura que salía de sus manos.
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
                  src="/images/servicios/mano-obra.png"
                  alt="Máquina de coser tradicional en taller familiar"
                  className="rounded-xl object-cover object-center"
                  sizes="40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escena 2: Crecimiento Orgánico */}
      <section className="relative flex min-h-[85vh] items-center justify-center border-y border-slate-100 bg-[#ffffff] px-5 py-20 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl space-y-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              className="space-y-6 lg:col-span-5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
                Capítulo II — Reputación
              </span>
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                El valor de la palabra dada
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Lo que comenzó como un apoyo familiar pronto atrajo la atención
                del cantón. Vecinos y amigos buscaban el taller para vestidos,
                reparaciones y uniformes. Cada prenda entregada con precisión
                generaba una recomendación espontánea.
              </p>
              <blockquote className="relative border-l-4 border-[#b43024] pl-6 font-serif text-xl leading-relaxed text-[#143067] italic md:text-2xl">
                &ldquo;Su reputación no se construyó con campañas de publicidad.
                Se construyó gracias a la calidad absoluta de su trabajo.&rdquo;
              </blockquote>
            </motion.div>

            <motion.div
              className="flex justify-center lg:col-span-7 lg:justify-end"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Mapa de Recomendación - SVG interactivo/animado */}
              <div className="relative flex aspect-square w-full max-w-lg flex-col items-center justify-center rounded-3xl border border-slate-100 bg-[#f8f9fb] p-8">
                <svg
                  className="pointer-events-none absolute inset-0 h-full w-full p-4"
                  viewBox="0 0 400 400"
                  fill="none"
                >
                  {/* Hilos de recomendación */}
                  <motion.path
                    d="M200 200 L100 120 M200 200 L300 120 M200 200 L200 80 M200 200 L120 280 M200 200 L280 280"
                    stroke="#143067"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    variants={drawLine}
                  />
                  <motion.path
                    d="M100 120 L80 60 M300 120 L320 60 M120 280 L60 300 M280 280 L340 300"
                    stroke="#b43024"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                    variants={drawLine}
                  />
                </svg>

                {/* Nodos de la red */}
                <div className="relative z-10 grid grid-cols-3 gap-16 text-center">
                  <div className="col-start-2 flex flex-col items-center">
                    <motion.div
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-[#143067] font-serif text-lg font-bold text-white shadow-lg"
                      whileHover={{ scale: 1.1 }}
                    >
                      Iris
                    </motion.div>
                    <span className="mt-2 font-mono text-xs font-semibold text-[#143067]">
                      FUNDADORA
                    </span>
                  </div>

                  <div className="col-start-1 row-start-2 flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-[#d7dffc] font-sans text-xs font-bold text-[#143067]">
                      Vecino
                    </div>
                    <span className="mt-1 font-sans text-[10px] text-[#444650]">
                      Cantón
                    </span>
                  </div>

                  <div className="col-start-3 row-start-2 flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-[#d7dffc] font-sans text-xs font-bold text-[#143067]">
                      Amigo
                    </div>
                    <span className="mt-1 font-sans text-[10px] text-[#444650]">
                      Recomendación
                    </span>
                  </div>

                  <div className="col-start-1 row-start-3 flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-[#f8d7da] font-sans text-xs font-bold text-[#b43024]">
                      Colegio
                    </div>
                    <span className="mt-1 font-sans text-[10px] text-[#b43024]">
                      Hito escolar
                    </span>
                  </div>

                  <div className="col-start-3 row-start-3 flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-[#f8d7da] font-sans text-xs font-bold text-[#b43024]">
                      Maquila
                    </div>
                    <span className="mt-1 font-sans text-[10px] text-[#b43024]">
                      Industria
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Escena 3: Proyecto Institucional (CE Salomón Granados) */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-[#f8f9fb] px-5 py-20 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl rounded-[2.5rem] border border-[#143067]/10 bg-[#d7dffc] p-8 shadow-[0_30px_70px_rgba(20,48,103,0.06)] md:p-16">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              className="space-y-6 lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-[#143067]/5 bg-white px-4 py-1.5 shadow-sm">
                <span className="font-mono text-xs font-bold text-[#143067]">
                  CÓDIGO DE ESCUELA: 12855
                </span>
              </div>
              <span className="block font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
                Capítulo III — Confianza en Volumen
              </span>
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                Vistiendo a toda una institución
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                El primer gran desafío comercial llegó al asumir la elaboración
                completa de los uniformes escolares para los alumnos del{" "}
                <strong>Centro Escolar Profesor Jorge Salomón Granados</strong>.
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Este encargo representó un riguroso reto de planificación y
                cadena de confección. Demostró que el taller casero podía
                sostener la misma finura en las costuras incluso al producir en
                gran volumen.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col gap-4 rounded-3xl border border-[#143067]/10 bg-white p-8 shadow-sm lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-[#143067]">
                  check_box
                </span>
                <div>
                  <h4 className="font-sans font-bold text-[#143067]">
                    Precisión a Escala
                  </h4>
                  <p className="font-sans text-xs text-[#444650]">
                    Cientos de camisas y pantalones a medida.
                  </p>
                </div>
              </div>
              <div className="my-2 h-px bg-slate-100" />
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-[#143067]">
                  inventory_2
                </span>
                <div>
                  <h4 className="font-sans font-bold text-[#143067]">
                    Control Logístico
                  </h4>
                  <p className="font-sans text-xs text-[#444650]">
                    Distribución y entrega puntual sin un solo error de talla.
                  </p>
                </div>
              </div>
              <div className="my-2 h-px bg-slate-100" />
              <div className="flex items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-[#b43024]">
                  workspace_premium
                </span>
                <div>
                  <h4 className="font-sans font-bold text-[#b43024]">
                    Estándar de Calidad
                  </h4>
                  <p className="font-sans text-xs text-[#444650]">
                    Prendas que soportaron años de uso diario escolar.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Escena 4: Experiencia Industrial */}
      <section className="relative flex min-h-[85vh] items-center justify-center bg-[#ffffff] px-5 py-20 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl space-y-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              className="relative lg:col-span-5"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgba(20,48,103,0.05)]">
                <Image
                  src="/images/servicios/confeccion.png"
                  alt="Confección y costura en taller industrial de San Miguel"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            </motion.div>

            <motion.div
              className="space-y-6 lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
                Capítulo IV — El Aprendizaje Industrial
              </span>
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                La escuela de las maquilas
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                El reconocimiento de la calidad artesanal del taller llamó la
                atención de maquilas industriales en la ciudad de San Miguel.
                Nuestra fundadora se incorporó a estos procesos fabriles a gran
                escala.
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Allí dominó la estandarización industrial, la operación de
                maquinaria de alta especialización y los esquemas más estrictos
                de control de calidad en serie.
              </p>
              <div className="space-y-3 rounded-2xl border border-slate-100 bg-[#f8f9fb] p-6 font-mono text-xs text-[#143067]">
                <div className="flex justify-between">
                  <span>[TÉCNICA]</span>
                  <span className="font-bold">CONFECCIÓN EN SERIE</span>
                </div>
                <div className="flex justify-between">
                  <span>[MAQUINARIA]</span>
                  <span className="font-bold">MAQUINAS INDUSTRIALES</span>
                </div>
                <div className="flex justify-between">
                  <span>[MÉTODO]</span>
                  <span className="font-bold">PRECISIÓN ARTESANAL</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Escena 5: Crisis (2020) — Momento Oscuro */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-[#001b4a] px-5 py-24 text-white md:px-8">
        {/* Hilos abstractos oscuros al fondo */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />

        <div className="mx-auto w-full max-w-4xl space-y-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.25em] text-[#b43024] uppercase">
              Capítulo V — Resiliencia
            </span>
            <h2 className="font-serif text-5xl leading-tight font-bold md:text-7xl">
              Cuando el mundo <br />
              <span className="text-[#b43024] italic">se detuvo</span>
            </h2>
            <p className="mx-auto max-w-[62ch] font-sans text-lg leading-relaxed text-slate-300">
              La pandemia del COVID-19 en 2020 cerró talleres, suspendió
              actividades comerciales y nos dejó sin ingresos familiares de la
              noche a la mañana.
            </p>
            <p className="mx-auto max-w-[62ch] font-sans text-base leading-relaxed text-slate-400">
              Sostuvimos el taller a base de esfuerzo, apoyo y un modesto fondo
              de emergencia ahorrado centavo a centavo durante años. Al
              disiparse la crisis, las maquilas y el empleo tradicional habían
              desaparecido. Solo quedaba una última opción: retirarse
              definitivamente o renacer.
            </p>
            <div className="pt-4">
              <span className="inline-block border-y border-[#b43024]/40 px-8 py-3 font-serif text-xl text-slate-200 italic">
                &ldquo;Elegimos comenzar de nuevo.&rdquo;
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Escena 6: Renacimiento (2021) */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-[#ffffff] px-5 py-20 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl space-y-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              className="space-y-6 lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
                Capítulo VI — El Renacimiento
              </span>
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                20 de enero de 2021
              </h2>
              <h3 className="font-serif text-2xl text-[#b43024] italic">
                El nacimiento oficial de Confecciones Liss
              </h3>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                No nacimos con inversionistas externos ni equipos avanzados.
                Nuestra empresa nació a partir de los últimos{" "}
                <strong>dos mil dólares</strong>
                del fondo de emergencia familiar.
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Con ese capital se alquiló un pequeño local de confección y se
                compró el equipamiento base indispensable para abrir las
                puertas.
              </p>
            </motion.div>

            <motion.div
              className="rounded-[2.5rem] border border-slate-100 bg-[#f8f9fb] p-8 shadow-sm lg:col-span-5"
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-8 text-center">
                <span className="font-mono text-[10px] tracking-widest text-[#444650] uppercase">
                  Capital Fundacional
                </span>
                <div className="mt-1 font-serif text-5xl font-bold text-[#143067]">
                  $2,000 USD
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">Máquina de Coser Recta</span>
                  <span className="font-mono font-bold text-[#143067]">x1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">Bordadora de Marca</span>
                  <span className="font-mono font-bold text-[#143067]">x1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">
                    Máquina Rana (Ojaladora)
                  </span>
                  <span className="font-mono font-bold text-[#143067]">x1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">
                    Mesa de Corte y Patronaje
                  </span>
                  <span className="font-mono font-bold text-[#143067]">x1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">
                    Rollos de Tela Iniciales
                  </span>
                  <span className="font-mono font-bold text-[#143067]">x2</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Escena 7: El Crecimiento del Equipo (No cards. Timeline vertical interactivo) */}
      <section className="relative flex min-h-screen items-center justify-center border-t border-slate-100 bg-[#f8f9fb] px-5 py-24 md:px-8">
        <div className="mx-auto w-full max-w-4xl space-y-16">
          <div className="mx-auto max-w-2xl space-y-4 text-center">
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
              Capítulo VII — El Factor Humano
            </span>
            <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
              Nuestra mayor fortaleza
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#444650]">
              El crecimiento de la demanda impulsó la evolución de nuestro
              equipo. Artesanos expertos que sumaron su experiencia para
              robustecer la producción.
            </p>
          </div>

          {/* Timeline de progresión del equipo */}
          <div className="relative ml-2 space-y-12 border-l-2 border-[#143067]/10 pl-6 md:pl-12">
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
              >
                {/* Viñeta con iniciales */}
                <div className="absolute top-0 -left-[43px] flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#f8f9fb] bg-[#143067] font-serif text-xs font-bold text-white shadow-md md:-left-[67px] md:h-12 md:w-12 md:text-sm">
                  {member.initials}
                </div>

                <div className="space-y-3 rounded-3xl border border-slate-100 bg-white p-6 shadow-sm md:p-8">
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#143067]">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs font-semibold text-[#b43024]">
                        {member.role}
                      </p>
                    </div>
                    <span className="inline-block w-fit rounded-full bg-[#d7dffc] px-3 py-1 font-mono text-[11px] font-bold text-[#143067]">
                      {member.year}
                    </span>
                  </div>
                  <p className="font-sans text-sm leading-relaxed text-[#444650]">
                    {member.description}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {member.specialties.map((spec, specIdx) => (
                      <span
                        key={specIdx}
                        className="rounded border border-slate-100 bg-[#f8f9fb] px-2 py-0.5 font-mono text-[10px] text-[#444650]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-4 text-center font-serif text-lg text-[#143067] italic">
            &ldquo;Hoy entendemos que nuestro mayor activo no son las máquinas.
            Son las personas que las operan.&rdquo;
          </div>
        </div>
      </section>

      {/* Escena 8: Transformación Digital (2026) */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-[#ffffff] px-5 py-20 md:px-8">
        <div className="mx-auto w-full max-w-screen-2xl space-y-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <motion.div
              className="space-y-6 lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
                Capítulo VIII — Transformación Tecnológica
              </span>
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                La era de los datos y el SEO
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                En enero de 2026 se incorporó{" "}
                <strong>Carlos José Molina Villacorta</strong>, Técnico en
                Servicios Informáticos, especialista en Inteligencia Digital y
                estudiante avanzado de Licenciatura en Psicología en IEPROES
                (CUM 9.32).
              </p>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Con su llegada, se diseñó la plataforma web y se implementó una
                estrategia de <strong>Saturación de Canales</strong>. Esta
                metodología, basada en inteligencia competitiva y análisis
                profundo de datos, logró una presencia dominante en resultados
                de búsqueda para toda la región oriental.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6 rounded-3xl border border-blue-900/50 bg-[#001b4a] p-8 text-white shadow-[0_20px_50px_rgba(0,27,74,0.15)] lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-4xl text-[#b43024]">
                  monitoring
                </span>
                <h4 className="font-serif text-lg font-bold">
                  Saturación de Canales
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between font-mono text-xs text-slate-300">
                    <span>PRESENCIA WEB REGIONAL</span>
                    <span>DOMINANTE</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-blue-950">
                    <motion.div
                      className="h-full rounded-full bg-[#b43024]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between font-mono text-xs text-slate-300">
                    <span>RENDIMIENTO ACADÉMICO (CUM)</span>
                    <span>9.32</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-blue-950">
                    <motion.div
                      className="h-full rounded-full bg-[#d7dffc]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "93%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div className="pt-2 font-mono text-[11px] leading-relaxed text-slate-400">
                  {
                    "// Integración de tecnología y análisis del comportamiento del consumidor como motores de posicionamiento orgánico."
                  }
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Escena Final: Identidad Actual (Cierre de revista) */}
      <section className="relative flex min-h-screen items-center justify-center border-t border-slate-100 bg-[#f8f9fb] px-5 py-24 md:px-8">
        <div className="mx-auto w-full max-w-5xl space-y-12 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="space-y-6"
          >
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
              Capítulo Final — Nuestra Promesa
            </span>
            <h2 className="font-serif text-5xl leading-tight font-bold text-[#143067] md:text-7xl">
              Dos décadas construyendo <br />
              <span className="text-[#b43024] italic">confianza</span>
            </h2>
            <p className="mx-auto max-w-[36ch] font-serif text-xl leading-relaxed text-[#143067] italic md:text-2xl">
              &ldquo;Un uniforme no es simplemente una prenda de vestir. Es la
              imagen de una empresa, la identidad de una institución y la
              presentación de un profesional.&rdquo;
            </p>
            <p className="mx-auto max-w-[62ch] font-sans text-base leading-relaxed text-[#444650]">
              Por eso confeccionamos cada pieza con el mismo nivel de
              dedicación, precisión y responsabilidad con el que Iris inició
              esta historia en el año 2005. Una sola máquina y un sueño que,
              gracias a ti, sigue creciendo hoy.
            </p>
          </motion.div>

          {/* Modelos Institucionales y Cierre */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 pt-8 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <span className="material-symbols-outlined mb-2 text-4xl text-[#143067]">
                account_circle
              </span>
              <h4 className="font-serif text-base font-bold text-[#143067]">
                Jackeline Lisseth
              </h4>
              <p className="mt-1 font-sans text-xs text-[#444650]">
                Modelo Institucional
              </p>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-white p-6 text-center shadow-sm">
              <span className="material-symbols-outlined mb-2 text-4xl text-[#143067]">
                account_circle
              </span>
              <h4 className="font-serif text-base font-bold text-[#143067]">
                Liam Alejandro
              </h4>
              <p className="mt-1 font-sans text-xs text-[#444650]">
                Modelo Institucional
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link
              href="/catalogo"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#143067] px-8 py-4 font-sans font-bold text-white shadow-md transition-all duration-150 hover:bg-[#143067]/90 hover:shadow-lg active:scale-[0.98] sm:w-auto"
            >
              Explorar Catálogo
            </Link>
            <Link
              href="/contacto"
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#143067]/20 bg-white px-8 py-4 font-sans font-bold text-[#143067] shadow-sm transition-all duration-150 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              Hacer una Cotización
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
