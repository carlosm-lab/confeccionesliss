"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ServicePage } from "@/data/services";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Background fabric texture (dot texture)
const fabricTextureStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23143067' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
};

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-primary/12 overflow-hidden rounded-xl border bg-white shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-surface-container-low/30 flex w-full cursor-pointer items-center justify-between p-6 text-left transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-primary font-serif text-lg font-bold">
          {question}
        </span>
        <span
          className={cn(
            "material-symbols-outlined transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden px-6 transition-all duration-300 ease-out",
          isOpen ? "max-h-[300px] pb-6" : "max-h-0"
        )}
      >
        <div className="text-on-surface-variant border-primary/5 mt-2 border-t p-6 pt-0 font-sans text-base leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface ServicioRopaCasualDetalleProps {
  service: ServicePage;
}

export function ServicioRopaCasualDetalle({
  service,
}: ServicioRopaCasualDetalleProps) {
  const whatsappUrl =
    service.ctaBanner?.ctaHref || siteConfig.links.whatsappDirect;

  // Features combinadas con fallback para asegurar 4 badges en la cuadrícula hero
  const heroFeatures = [
    ...(service.heroFeatures || []),
    { icon: "straighten", text: "Ajuste perfecto" },
  ].slice(0, 4);

  // Mapeo de secciones dinámicas de service.sections
  const secMasQueUniformes = service.sections?.[0];
  const secComoFunciona = service.sections?.[1];
  const secPrendasConfeccionamos = service.sections?.[2];
  const secTiemposEntrega = service.sections?.[3];
  const secMarcaDeRopa = service.sections?.[4];

  // Catálogo completo de prendas confeccionadas (10 categorías reales)
  const catalogoPrendas = [
    {
      icon: "styler",
      title: "Vestidos de Noche y Coctel",
      desc: "Diseños de gala y fiesta a la medida",
    },
    {
      icon: "dry_cleaning",
      title: "Faldas Elegantes y Casuales",
      desc: "Corte A, lápiz, plisadas y a la medida",
    },
    {
      icon: "checkroom",
      title: "Pantalones de Vestir",
      desc: "Corte fino para damas y caballeros",
    },
    {
      icon: "apparel",
      title: "Blusas y Tops",
      desc: "Diseños formales, ejecutivos y casuales",
    },
    {
      icon: "content_cut",
      title: "Crop Tops Personalizados",
      desc: "Ajustados a tu estilo y silueta",
    },
    {
      icon: "accessibility_new",
      title: "Enterizos y Jumpsuits",
      desc: "Elegancia completa en una sola pieza",
    },
    {
      icon: "view_agenda",
      title: "Conjuntos de Dos Piezas",
      desc: "Combinaciones coordinadas a la medida",
    },
    {
      icon: "child_care",
      title: "Ropa Infantil",
      desc: "Vestidos y prendas especiales para niños",
    },
    {
      icon: "boy",
      title: "Camisas de Hombre",
      desc: "Camisas casuales y de vestir ajustadas",
    },
    {
      icon: "bedtime",
      title: "Pijamas y Ropa de Descanso",
      desc: "Prendas cómodas de alta durabilidad",
    },
  ];

  return (
    <div className="min-h-screen w-full" style={fabricTextureStyle}>
      <div className="w-full">
        {/* ── HERO HOME TEMPLATE ── */}
        <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
          <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
              {/* Breadcrumb section */}
              <div className="mb-6 lg:mb-8">
                <Breadcrumb
                  items={[
                    { label: "Inicio", href: "/" },
                    { label: "Servicios", href: "/servicios" },
                    {
                      label: service.navLabel || service.title,
                      href: `/servicios/${service.slug}`,
                    },
                  ]}
                  className="animate-fade-in-up"
                />
              </div>

              <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-[32px] leading-tight font-bold md:mb-10 md:flex md:flex-col md:items-center md:text-[48px] lg:mb-6 lg:block lg:text-left">
                <span className="block w-full text-center lg:text-left">
                  {service.title}
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
                        alt="Studio de sastreria y confeccion de ropa"
                        className="rounded-xl object-cover object-center"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWTRZx5W-uPd8adEBbgLS5OehCkntY8Bct6jTW9MgSskNd10j1uWakL7Oo83OZdMVDjFuz1Vy_P9Q9cklYhvoXwIL3AACQ6vjMya8ncZSiVisb8lZ2BgLAp-0WEXPp6QOw4sNw9qhbgyBqp45lMV8Iyx6iyTZJM_ocAYEujXc-XGbScd_JOFP9Oxz5Iqheh6IZd8sU4M4AxLzkC2BH31Qrep2lmjWFezjyyTKnUPDnIoQtsC9BLgeQd_L_756dG-2pI-mHX-F1o1Xr"
                        sizes="(max-width:768px) 80vw, 40vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* COLUMNA DE TEXTO Y ACCIONES */}
                <div className="flex w-full flex-col items-start md:order-1 md:justify-center">
                  <p
                    className="animate-fade-in-up text-on-surface-variant mb-6 w-full font-sans text-lg leading-relaxed"
                    style={{ animationDelay: "150ms" }}
                  >
                    {service.description}
                  </p>
                  <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2">
                    {heroFeatures.map((b, index) => (
                      <div
                        key={b.text}
                        className="border-primary/12 text-primary animate-fade-in-up flex w-full items-center gap-2 rounded-full border bg-white px-4 py-2 font-sans text-sm font-medium shadow-xs"
                        style={{ animationDelay: `${index * 50 + 200}ms` }}
                      >
                        <span className="material-symbols-outlined text-secondary mr-2 shrink-0 text-[16px]">
                          {b.icon}
                        </span>
                        <span className="leading-tight">{b.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
                    <a
                      href="https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animate-fade-in-up border-outline text-primary flex h-12 w-full items-center justify-center rounded-md border bg-white px-12 text-center font-serif text-base font-medium whitespace-nowrap transition hover:bg-gray-50 active:scale-[0.97] sm:flex-1"
                      style={{ animationDelay: "400ms" }}
                    >
                      Cómo llegar
                    </a>
                    <Link
                      href="/catalogo"
                      className="animate-fade-in-up btn-gradient font-body ambient-shadow flex h-12 w-full items-center justify-center rounded-md px-12 text-center text-base font-semibold whitespace-nowrap text-white transition hover:opacity-90 active:scale-[0.97] sm:flex-1"
                      style={{ animationDelay: "450ms" }}
                    >
                      Catálogo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* IMAGEN HERO - VERSIÓN DESKTOP */}
            <div
              className="animate-fade-in-up hidden h-full lg:flex lg:w-[40%] lg:items-center"
              style={{ animationDelay: "300ms" }}
            >
              <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    fill
                    alt="Studio de sastreria y confeccion de ropa"
                    className="rounded-xl object-cover object-center"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWTRZx5W-uPd8adEBbgLS5OehCkntY8Bct6jTW9MgSskNd10j1uWakL7Oo83OZdMVDjFuz1Vy_P9Q9cklYhvoXwIL3AACQ6vjMya8ncZSiVisb8lZ2BgLAp-0WEXPp6QOw4sNw9qhbgyBqp45lMV8Iyx6iyTZJM_ocAYEujXc-XGbScd_JOFP9Oxz5Iqheh6IZd8sU4M4AxLzkC2BH31Qrep2lmjWFezjyyTKnUPDnIoQtsC9BLgeQd_L_756dG-2pI-mHX-F1o1Xr"
                    sizes="40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MÁS QUE UNIFORMES (Sección 0) ── */}
        {secMasQueUniformes && (
          <section className="w-full px-5 py-8 md:px-8 md:py-12">
            <div className="mx-auto w-full max-w-screen-2xl">
              <div className="border-primary/10 rounded-2xl border bg-white p-8 shadow-sm md:p-12">
                <div className="flex flex-col gap-4">
                  <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                    {secMasQueUniformes.heading}
                  </h2>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed md:text-lg">
                    {secMasQueUniformes.body}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── PRENDAS QUE CONFECCIONAMOS (Showcase Bento + Catálogo Completo) ── */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto w-full max-w-screen-2xl">
            <div className="mb-10">
              <h2 className="text-primary mb-3 font-serif text-2xl font-bold md:text-3xl">
                {secPrendasConfeccionamos?.heading ||
                  "Prendas que confeccionamos"}
              </h2>
              {secPrendasConfeccionamos?.body && (
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {secPrendasConfeccionamos.body}
                </p>
              )}
            </div>

            {/* Muestra Visual Destacada (3 Tarjetas Principales) */}
            <div className="mb-12 grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-3">
              {/* Tarjeta Grande (Fiesta y Coctel) */}
              <div className="group border-primary/12 relative row-span-2 overflow-hidden rounded-xl border shadow-sm md:col-span-2">
                <Image
                  alt="Vestido de coctel elegante a medida en maniqui"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2h6_Y40etDu2UCUYM9V_4xetxyO0wG5Ul76jsUPMc54cQfhK1pFjx2Q-k6L5qCP4jrlsM48xkzhiBL-lhkXPuaxmpwpUWuHcqND870uk6Z0m9YSzjTgG0PQC3O5QH3bScbplXHdRWFLcUU83VSazSgYsIMrxPgA7yYWvk2tAetm5ROrnqbwwCeLDzWl1H1EwEI3m7q0dwu-4-VmGiVw0xT-6kLw9ttdmjlNbVF55Uz6grB4_nDujZHRi5yfyPwWehHJ1-iySO4KTx"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b4a]/90 via-[#001b4a]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 z-10 p-8">
                  <h3 className="mb-2 font-serif text-xl font-bold text-white md:text-2xl">
                    Ropa de fiesta y coctel
                  </h3>
                  <p className="text-surface-container font-sans text-sm leading-relaxed text-white/90">
                    Vestidos únicos para ocasiones especiales, diseñados a tu
                    gusto.
                  </p>
                </div>
              </div>

              {/* Tarjeta 2 (Infantil) */}
              <div className="group border-primary/12 relative overflow-hidden rounded-xl border shadow-sm">
                <Image
                  alt="Ropa infantil tejida en algodon natural"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTOhNbtMYAd1keZz2Yalaki8FDh4Ovy8N6TGiMbr8DTKNqpeYDNmT4-61uL7Np9nyDwWClp9K6d1_7U1BKwuAGB33XJdBOoq55pGXqeG2sQQHtVWcOAUQpmCH8iFzrB_JPoQPAuSFB9_aLrKCuk_hyPoaRHlnVGHsYRHdkcGOiwMEx3b8sLT1KrSVJmU_rt1yWjK2lOsGI2d1RVY-_DfUcRX5Becu0gQ6XjFwhkqCovQU6r7P_tZh3vQ6PSmDeho8My2JI_Y5orw-y"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b4a]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 z-10 p-6">
                  <h3 className="font-serif text-lg font-bold text-white md:text-xl">
                    Ropa infantil
                  </h3>
                </div>
              </div>

              {/* Tarjeta 3 (Blusas y Conjuntos) */}
              <div className="group border-primary/12 relative overflow-hidden rounded-xl border shadow-sm">
                <Image
                  alt="Blusa y pantalones a medida colgados en perchero"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtxfffutYVC3ZtUp2FEG7VO7qlHNvOLa8K34BfbqBARNYiJFFqpnyCTZ9uXonNBuLRTxhFTx62bhpZ3QciCRuXL0b9vgLYlIEi6g6J002UvkuIX3IMtELvTgmU2S5mXnGpodVDd5upqKXKryaPaqmJy_0jaxUjog9jXg9qaRJuecqI7mtuNvSWByAVOHXaBJAAxX1wszc6egCINYtBVIr1psy9uNupyGRil-Rfa-xSE85iYFV-0aeZTXRx15z04fofbcEp_hJMy7ts"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b4a]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 z-10 p-6">
                  <h3 className="font-serif text-lg font-bold text-white md:text-xl">
                    Conjuntos y blusas
                  </h3>
                </div>
              </div>
            </div>

            {/* Cuadrícula Completa de Tipos de Prenda (10 categorías reales) */}
            <div className="border-primary/10 rounded-2xl border bg-white p-6 shadow-sm md:p-8">
              <h3 className="text-primary mb-6 flex items-center gap-2 font-serif text-xl font-bold">
                <span
                  className="material-symbols-outlined text-secondary"
                  aria-hidden="true"
                >
                  checklist
                </span>
                Catálogo completo de confección personalizada
              </h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                {catalogoPrendas.map((item) => (
                  <div
                    key={item.title}
                    className="border-primary/8 hover:border-primary/25 bg-surface-container-low/40 flex flex-col gap-2 rounded-xl border p-4 transition-all hover:bg-white hover:shadow-xs"
                  >
                    <div className="text-primary flex items-center gap-2 font-sans text-sm font-bold">
                      <span
                        className="material-symbols-outlined text-secondary shrink-0 text-[18px]"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="leading-tight">{item.title}</span>
                    </div>
                    <p className="text-on-surface-variant font-sans text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── PROCESO (De tu foto a tu prenda) ── */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto w-full max-w-screen-2xl">
            <div className="bg-surface-container-low border-primary/5 rounded-2xl border px-5 py-16 shadow-inner md:px-10">
              <h2 className="text-primary mb-3 text-center font-serif text-2xl font-bold md:text-3xl">
                {secComoFunciona?.heading || "De tu foto a tu prenda"}
              </h2>
              {secComoFunciona?.body && (
                <p className="text-on-surface-variant mx-auto mb-12 max-w-3xl text-center font-sans text-base leading-relaxed">
                  {secComoFunciona.body}
                </p>
              )}
              <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4">
                {/* Paso 1 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      image
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    1. Envíanos tu foto
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Muéstranos la foto o referencia del diseño que deseas
                    replicar.
                  </p>
                </div>

                <span
                  className="material-symbols-outlined text-secondary mb-12 hidden text-4xl opacity-85 md:block"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>

                {/* Paso 2 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      texture
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    2. Elegimos la tela
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Te asesoramos sobre el mejor textil o usas tu propia tela.
                  </p>
                </div>

                <span
                  className="material-symbols-outlined text-secondary mb-12 hidden text-4xl opacity-85 md:block"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>

                {/* Paso 3 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      content_cut
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    3. Confeccionamos
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Patronaje y costura personalizada con ajuste a tu silueta.
                  </p>
                </div>

                <span
                  className="material-symbols-outlined text-secondary mb-12 hidden text-4xl opacity-85 md:block"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>

                {/* Paso 4 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      checkroom
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    4. Prenda lista
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Entrega de tu prenda terminada lista para lucir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TIEMPOS DE ENTREGA (Sección 3) ── */}
        {secTiemposEntrega && (
          <section className="w-full px-5 py-10 md:px-8 md:py-14">
            <div className="mx-auto w-full max-w-screen-2xl">
              <div className="border-primary/12 relative flex flex-col gap-6 overflow-hidden rounded-2xl border bg-white p-8 shadow-sm md:flex-row md:items-center md:p-10">
                <div className="bg-primary absolute top-0 bottom-0 left-0 w-1.5" />
                <div className="border-primary/10 text-primary bg-primary/5 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl">
                  <span
                    className="material-symbols-outlined text-3xl"
                    aria-hidden="true"
                  >
                    schedule
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                    {secTiemposEntrega.heading}
                  </h2>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed md:text-lg">
                    {secTiemposEntrega.body}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── PROYECTOS PARA MARCAS DE ROPA (Sección 4) ── */}
        {secMarcaDeRopa && (
          <section className="w-full px-5 py-14 md:px-8 md:py-20">
            <div className="mx-auto w-full max-w-screen-2xl">
              <div className="border-primary/12 relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-xl border bg-white p-8 shadow-sm md:flex-row md:p-10">
                <div className="bg-secondary absolute top-0 bottom-0 left-0 w-1.5" />
                <div
                  className="pointer-events-none absolute inset-0 z-0 opacity-50"
                  style={fabricTextureStyle}
                />
                <div className="relative z-10 md:w-2/3">
                  <h2 className="text-primary mb-4 font-serif text-2xl font-bold md:text-3xl">
                    {secMarcaDeRopa.heading}
                  </h2>
                  <p className="text-on-surface-variant mb-6 font-sans text-base leading-relaxed">
                    {secMarcaDeRopa.body}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <span className="bg-primary/10 text-primary border-primary/5 inline-block rounded-md border px-3 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                      Evaluamos tu proyecto
                    </span>
                    <span className="bg-primary/10 text-primary border-primary/5 inline-block rounded-md border px-3 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                      Volumen personalizado
                    </span>
                    <span className="bg-primary/10 text-primary border-primary/5 inline-block rounded-md border px-3 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase">
                      Cotización según el caso
                    </span>
                  </div>
                </div>
                <div className="relative z-10 flex w-full justify-end md:w-1/3">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-primary text-primary hover:bg-surface-container-low w-full cursor-pointer rounded-md border bg-white px-8 py-3.5 text-center font-sans text-xs font-semibold tracking-wider uppercase shadow-sm transition-colors md:w-auto"
                  >
                    Consultar proyecto por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ACORDEÓN ── */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="w-full px-5 py-14 md:px-8 md:py-20">
            <div className="mx-auto w-full max-w-screen-2xl">
              <h2 className="text-primary mb-8 text-center font-serif text-2xl font-bold md:text-3xl">
                Preguntas frecuentes sobre ropa personalizada
              </h2>
              <div className="mx-auto flex max-w-4xl flex-col gap-4">
                {service.faqs.map((faq, index) => (
                  <FAQItem
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ── CTA BANNER ── */}
      {service.ctaBanner && (
        <section className="relative w-full overflow-hidden bg-[#143067] px-5 py-14 shadow-inner md:px-8 md:py-20">
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={fabricTextureStyle}
          />
          <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col items-center text-center">
            <h2 className="mb-6 font-serif text-[32px] leading-tight font-bold text-white md:text-[48px]">
              {service.ctaBanner.title}
            </h2>
            <p className="mb-10 max-w-2xl font-sans text-lg leading-relaxed text-white/80">
              {service.ctaBanner.description}
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:bg-surface-container-low inline-flex cursor-pointer items-center justify-center rounded-md bg-white px-10 py-4 font-sans text-xs font-bold tracking-wider text-[#143067] uppercase shadow-lg transition-all"
            >
              <span className="material-symbols-outlined mr-2">chat</span>
              {service.ctaBanner.ctaText}
            </a>
          </div>
        </section>
      )}
    </div>
  );
}
