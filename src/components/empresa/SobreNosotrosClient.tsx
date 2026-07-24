"use client";

import { Icon } from "@/components/ui/icons/Icon";
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
  image: string;
}

const team: TeamMember[] = [
  {
    name: "Lilian Romero",
    role: "Especialista en Confección de Uniformes",
    year: "Marzo 2021",
    description:
      "Primera colaboradora del taller. Especialista en confección de uniformes escolares, empresariales y médicos. Con dominio de maquinaria industrial y altos estándares de acabado, fue pieza clave en la consolidación del taller durante sus primeros meses de operación.",
    specialties: [
      "Confección de uniformes",
      "Acabados textiles",
      "Producción en serie",
    ],
    initials: "LR",
    image: "/images/equipo/lilian romero.png",
  },
  {
    name: "Nubia Vázquez",
    role: "Especialista en Confección de Prendas",
    year: "Agosto 2021",
    description:
      "Especialista en confección y ensamblaje de prendas. Su incorporación reforzó la consistencia del proceso productivo, garantizando uniformidad en acabados y rendimiento estable en producción continua.",
    specialties: ["Confección de prendas", "Ensamblaje", "Control de acabados"],
    initials: "NV",
    image: "/images/equipo/nuvia vasquez.png",
  },
  {
    name: "Carlos Antonio Molina",
    role: "Logística y Atención al Cliente",
    year: "2022",
    description:
      "Responsable de la coordinación de entregas, atención directa al cliente y distribución de pedidos. Gestiona la relación con clientes institucionales y empresariales, asegurando que cada entrega llegue en tiempo y forma.",
    specialties: ["Logística", "Atención al cliente", "Distribución"],
    initials: "CM",
    image: "/images/equipo/Carlos Antonio.jpg",
  },
  {
    name: "Blanca Martínez",
    role: "Operaria de Confección",
    year: "2023",
    description:
      "Operaria de producción especializada en costura industrial. Su incorporación amplió la capacidad del taller para absorber pedidos de mayor volumen sin comprometer los plazos de entrega.",
    specialties: ["Costura industrial", "Producción", "Preparación de piezas"],
    initials: "BM",
    image: "/images/equipo/Blanca Martinez.png",
  },
  {
    name: "René Alfonso Méndez",
    role: "Control de Calidad y Toma de Medidas",
    year: "Finales de 2025",
    description:
      "Responsable de la inspección final de cada prenda antes de su entrega. Verifica costuras, pliegues, bordados y resistencia al uso. También realiza la toma de medidas personalizada para pedidos a la medida, garantizando que cada uniforme se ajuste con precisión al cliente.",
    specialties: [
      "Control de calidad",
      "Toma de medidas",
      "Auditoría de costuras",
    ],
    initials: "RM",
    image: "/images/equipo/René Alfonso Méndez.png",
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
        className="fixed top-0 left-0 z-50 h-[3px] bg-[#143067]"
        style={{
          scaleX: 0,
          transformOrigin: "0%",
        }}
        animate={{ scaleX: 1 }}
        transition={{ ease: "linear" }}
      />

      {/* Escena 1: Origen (2005) */}
      <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
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

            <span className="mb-2 font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />

            <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-4xl leading-tight tracking-tight md:mb-10 md:flex md:flex-col md:items-center md:text-5xl lg:mb-6 lg:block lg:text-left lg:text-6xl">
              <span className="text-center lg:text-left">
                Una historia construida{" "}
              </span>
              <span className="text-secondary font-serif md:mt-2 md:flex md:w-full md:items-center md:justify-center md:gap-4 lg:mt-0 lg:inline lg:gap-0">
                {/* LÍNEA DECORATIVA IZQUIERDA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="to-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r from-transparent" />
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                </span>

                <span className="shrink-0">desde 2005</span>

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
                <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-full md:w-full">
                    <Image
                      fill
                      src="/images/sobre-nosotros/hero.jpg"
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
                  className="animate-fade-in-up text-on-surface-variant font-body mb-6 w-full space-y-4 text-base leading-relaxed md:text-lg lg:mb-6 lg:text-xl"
                  style={{ animationDelay: "150ms" }}
                >
                  <p>
                    En 2005, Iris Lisseth Villacorta de Molina comenzó
                    confeccionando prendas para su familia desde su hogar en el
                    cantón donde residía, con una sola máquina de coser mecanica
                    y formación técnica certificada en Corte y Confección. Lo
                    que nació como una solución doméstica se convirtió en un
                    taller con presencia institucional, equipo especializado y
                    más de dos décadas de experiencia verificable en el sector
                    textil de El Salvador.
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
            <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <div className="relative h-full w-full overflow-hidden rounded-2xl">
                <Image
                  fill
                  src="/images/sobre-nosotros/hero.jpg"
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
              className="flex justify-center lg:col-span-5 lg:justify-start"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="border-primary/35 relative flex aspect-square w-full max-w-lg items-center justify-center overflow-hidden rounded-3xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    fill
                    src="/images/sobre-nosotros/el valor de la palabra dada.jpg"
                    alt="Reputación y recomendación en el taller"
                    className="object-cover object-center"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-6 lg:col-span-7"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                El valor de la palabra dada
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                La reputación de Confecciones Liss no se construyó con
                publicidad. Se construyó prenda a prenda, entrega a entrega. Los
                habitantes del cantón comenzaron a solicitar el servicio después
                de ver la calidad del trabajo. Cada cliente satisfecho generó el
                siguiente, sin necesidad de intermediarios ni campañas.
              </p>
              <blockquote className="relative border-l-4 border-[#143067] pl-6 font-serif text-xl leading-relaxed text-[#143067] italic md:text-2xl">
                &ldquo;Su reputación no se construyó con campañas de publicidad.
                Se construyó gracias a la calidad absoluta de su trabajo.&rdquo;
              </blockquote>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Escena 3: Proyecto Institucional (CE Salomón Granados) */}
      <section className="relative flex min-h-[90vh] items-center justify-center bg-[#f8f9fb] px-5 py-20 md:px-8">
        <div className="border-primary/35 mx-auto w-full max-w-screen-2xl rounded-[2.5rem] border bg-[#d7dffc] p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-16">
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
              <span className="block font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                El primer contrato institucional
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                El primer gran encargo institucional llegó del Ministerio de
                Educación de El Salvador: la confección completa de los
                uniformes para los alumnos del Centro Escolar Profesor Jorge
                Salomón Granados (código 12855). Este proyecto demostró que una
                sola persona podía mantener sus estándares de calidad a escala,
                cumpliendo plazos de entrega y produciendo en volumen sin
                sacrificar el acabado.
              </p>
            </motion.div>

            <motion.div
              className="space-y-6 lg:col-span-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <Icon
                    name="check_box"
                    size={24}
                    className="mt-0.5 shrink-0 text-[#143067]"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-[#143067]">
                      Precisión a escala
                    </h4>
                    <p className="mt-1 font-sans text-sm text-[#444650]">
                      Uniformes completos para todos los estudiantes del centro
                      escolar, confeccionados y entregados según las
                      especificaciones del Ministerio de Educación.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Icon
                    name="inventory_2"
                    size={24}
                    className="mt-0.5 shrink-0 text-[#143067]"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-[#143067]">
                      Control logístico
                    </h4>
                    <p className="mt-1 font-sans text-sm text-[#444650]">
                      Coordinación de corte, confección y entrega sin errores de
                      talla ni demoras en la distribución.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Icon
                    name="workspace_premium"
                    size={24}
                    className="mt-0.5 shrink-0 font-bold text-[#143067]"
                  />
                  <div>
                    <h4 className="font-sans font-bold text-[#143067]">
                      Estándar de durabilidad
                    </h4>
                    <p className="mt-1 font-sans text-sm text-[#444650]">
                      Prendas diseñadas para soportar el uso diario escolar
                      durante todo el ciclo lectivo.
                    </p>
                  </div>
                </li>
              </ul>
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
              <div className="border-primary/35 relative aspect-[4/5] w-full overflow-hidden rounded-3xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <Image
                  src="/images/sobre-nosotros/Producción industrial la etapa de las maquilas.jpg"
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
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                Producción industrial: la etapa de las maquilas
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Entre 2012 y 2019, la calidad del trabajo de la fundadora captó
                la atención de distintos talleres de confección en San Miguel.
                Durante ese período, la fundadora trabajó y aprendió sobre
                procesos industriales de gran escala, donde adquirió dominio en
                estandarización de producción, operación de maquinaria
                industrial avanzada y sistemas rigurosos de control de calidad
                en serie. Esa experiencia industrial es la base técnica sobre la
                que opera Confecciones Liss hoy.
              </p>
              <div className="border-primary/35 space-y-3 rounded-2xl border bg-[#f8f9fb] p-6 font-mono text-xs text-[#143067] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div className="flex justify-between">
                  <span>[TÉCNICA]</span>
                  <span className="font-bold">CONFECCIÓN EN SERIE</span>
                </div>
                <div className="flex justify-between">
                  <span>[MAQUINARIA]</span>
                  <span className="font-bold">MAQUINARIA INDUSTRIAL</span>
                </div>
                <div className="flex justify-between">
                  <span>[MÉTODO]</span>
                  <span className="font-bold">CONTROL DE CALIDAD</span>
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
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-white uppercase" />
            <h2 className="font-serif text-5xl leading-tight font-bold md:text-7xl">
              Cuando el mundo <br />
              <span className="font-bold text-white italic">se detuvo</span>
            </h2>
            <p className="mx-auto max-w-[62ch] font-sans text-base leading-relaxed text-slate-300">
              La pandemia del COVID-19 en 2020 eliminó los ingresos familiares
              de un día para otro. Las maquilas cerraron. Los encargos se
              detuvieron. La familia sostuvo el período con apoyo gubernamental
              y un fondo de emergencia acumulado durante años. Cuando la crisis
              comenzó a ceder, el empleo previo ya no existía. La decisión fue
              clara: reiniciar desde cero o no reiniciar.
            </p>
            <div className="pt-4">
              <span className="inline-block border-y border-white/40 px-8 py-3 font-serif text-xl text-slate-200 italic">
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
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                20 de enero de 2021
              </h2>
              <h3 className="font-serif text-2xl font-bold text-[#143067] italic">
                El nacimiento oficial de Confecciones Liss
              </h3>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Con los últimos USD 2,000 del fondo de emergencia familiar se
                alquiló un pequeño local en San Miguel y se adquirió el
                equipamiento mínimo necesario para abrir. Sin inversores
                externos. Sin financiamiento bancario. Con lo justo para
                comenzar.
              </p>
            </motion.div>

            <motion.div
              className="border-primary/35 rounded-[2.5rem] border bg-[#f8f9fb] p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] lg:col-span-5"
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
                  <span className="text-[#444650]">
                    Máquina de coser industrial
                  </span>
                  <span className="font-mono font-bold text-[#143067]">×1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">Bordadora</span>
                  <span className="font-mono font-bold text-[#143067]">×1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">
                    Máquina rana (ojaladora)
                  </span>
                  <span className="font-mono font-bold text-[#143067]">×1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">
                    Mesa de corte y patronaje
                  </span>
                  <span className="font-mono font-bold text-[#143067]">×1</span>
                </div>
                <div className="h-px bg-slate-200" />
                <div className="flex items-center justify-between font-sans text-sm">
                  <span className="text-[#444650]">Rollos de tela</span>
                  <span className="font-mono font-bold text-[#143067]">×2</span>
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
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />
            <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
              El equipo que hace posible cada entrega
            </h2>
            <p className="font-sans text-base leading-relaxed text-[#444650]">
              El crecimiento sostenido de la demanda impulsó la formación de un
              equipo especializado. Cada integrante se incorporó en un momento
              clave del desarrollo de la empresa y aportó la capacidad necesaria
              para escalar sin perder calidad.
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
                {/* Viñeta con iniciales / foto */}
                <div className="absolute top-0 -left-[43px] flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-4 border-[#f8f9fb] bg-[#143067] font-serif text-xs font-bold text-white shadow-md md:-left-[67px] md:h-12 md:w-12 md:text-sm">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="48px"
                  />
                </div>

                <div className="border-primary/35 space-y-3 rounded-3xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-8">
                  <div className="flex flex-col justify-between gap-2 md:flex-row md:items-center">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#143067]">
                        {member.name}
                      </h3>
                      <p className="font-mono text-xs font-bold text-[#143067]">
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
            &ldquo;Nuestro mayor activo no son las máquinas. Son las personas
            que las operan.&rdquo;
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
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />
              <h2 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                Transformación digital desde 2026
              </h2>
              <p className="font-sans text-base leading-relaxed text-[#444650]">
                Carlos José Molina Villacorta es Técnico en Computación
                certificado en Técnicas de Inteligencia Recolección y Análisis
                de Datos de Fuentes Abiertas. Estudiante de Licenciatura en
                Psicología de la Salud en IEPROES (Regional San Miguel). Con su
                incorporación en enero de 2026 se diseñó la plataforma web
                institucional y se implementó una estrategia de posicionamiento
                orgánico para la región oriental de El Salvador, basada en
                inteligencia competitiva, análisis de comportamiento del usuario
                y arquitectura de contenidos bajo estándares E-E-A-T de Google.
              </p>
            </motion.div>

            <motion.div
              className="border-primary/35 space-y-6 rounded-3xl border bg-[#001b4a] p-8 text-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] lg:col-span-5"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3">
                <Icon
                  name="monitoring"
                  size={36}
                  className="font-bold text-[#143067]"
                />
                <h4 className="font-serif text-lg font-bold">
                  Presencia digital regional
                </h4>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex justify-between font-mono text-xs text-slate-300">
                    <span>COBERTURA GEOGRÁFICA</span>
                    <span>REGIÓN ORIENTAL</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-blue-950">
                    <motion.div
                      className="h-full rounded-full bg-[#143067]"
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex justify-between font-mono text-xs text-[#d7dffc]">
                    <span>ESTRATEGIA DE POSICIONAMIENTO</span>
                    <span>ORGÁNICA</span>
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
                    "// Arquitectura de contenidos estructurada bajo estándares E-E-A-T de Google."
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
            <span className="font-mono text-xs font-bold tracking-[0.2em] text-[#143067] uppercase" />
            <h2 className="font-serif text-5xl leading-tight font-bold text-[#143067] md:text-7xl">
              Dos décadas construyendo <br />
              <span className="font-bold text-[#143067] italic">confianza</span>
            </h2>
            <p className="mx-auto max-w-[36ch] font-serif text-xl leading-relaxed text-[#143067] italic md:text-2xl">
              &ldquo;Un uniforme no es simplemente una prenda de vestir. Es la
              imagen de una empresa, la identidad de una institución y la
              presentación de un profesional.&rdquo;
            </p>
            <p className="mx-auto max-w-[62ch] font-sans text-base leading-relaxed text-[#444650]">
              Desde 2005 hasta hoy, cada prenda elaborada lleva el mismo nivel
              de dedicación con el que Iris Lisseth de Molina comenzó esta
              historia. El equipo crece, los procesos mejoran y la tecnología
              avanza, pero el estándar de calidad que construyó la reputación de
              Confecciones Liss no cambia.
            </p>
          </motion.div>

          {/* Modelos Institucionales y Cierre */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 pt-8 md:grid-cols-2">
            <div className="border-primary/35 rounded-3xl border bg-white p-6 text-center shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-[#f8f9fb] shadow-md">
                <Image
                  src="/images/equipo/jackelline lisseth.jpeg"
                  alt="Jackelline Lisseth Molina"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="font-serif text-base font-bold text-[#143067]">
                Jackelline Lisseth Molina
              </h4>
              <p className="mt-1 font-sans text-xs text-[#444650]">
                Modelo institucional
              </p>
            </div>
            <div className="border-primary/35 rounded-3xl border bg-white p-6 text-center shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <div className="mx-auto mb-3 h-16 w-16 overflow-hidden rounded-full border-2 border-[#f8f9fb] shadow-md">
                <Image
                  src="/images/equipo/liam alejandro.jpg"
                  alt="Liam Alejandro"
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                />
              </div>
              <h4 className="font-serif text-base font-bold text-[#143067]">
                Liam Alejandro
              </h4>
              <p className="mt-1 font-sans text-xs text-[#444650]">
                Modelo institucional
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
            <Link
              href="/contacto"
              className="inline-flex w-full items-center justify-center rounded-xl bg-[#143067] px-8 py-4 font-sans font-bold text-white shadow-md transition-all duration-150 hover:bg-[#143067]/90 hover:shadow-lg active:scale-[0.98] sm:w-auto"
            >
              Solicitar Cotización
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#143067]/20 bg-white px-8 py-4 font-sans font-bold text-[#143067] shadow-sm transition-all duration-150 hover:bg-slate-50 hover:shadow-md active:scale-[0.98] sm:w-auto"
            >
              Explorar Catálogo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
