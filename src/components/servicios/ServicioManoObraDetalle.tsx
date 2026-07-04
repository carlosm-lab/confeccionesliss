"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ServicePage } from "@/data/services";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Background texture for the entire page
const pageWovenTextureStyle = {
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/woven-light.png')",
  backgroundRepeat: "repeat",
};

// Texture for the CTA Banner (Pinstriped suit)
const ctaPinstripeTextureStyle = {
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')",
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

interface ServicioManoObraDetalleProps {
  service: ServicePage;
}

export function ServicioManoObraDetalle({
  service,
}: ServicioManoObraDetalleProps) {
  const whatsappUrl =
    service.ctaBanner?.ctaHref || siteConfig.links.whatsappDirect;

  // Features combinadas con fallback para asegurar 4 badges en la cuadrícula hero
  const heroFeatures = [
    ...(service.heroFeatures || []),
    { icon: "verified", text: "Acabado profesional" },
  ].slice(0, 4);

  // Mapeo de secciones por conveniencia
  const secComoFunciona = service.sections?.[0];
  const secTuEligesTela = service.sections?.[1];
  const secCuantaTela = service.sections?.[2];
  const secParaQuien = service.sections?.[3];
  const secQueIncluye = service.sections?.[4];
  const secPrecioVolumen = service.sections?.[5];

  return (
    <div className="min-h-screen w-full" style={pageWovenTextureStyle}>
      <div className="w-full">
        {/* ── HERO HOME TEMPLATE ── */}
        <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
          <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row-reverse lg:items-center lg:gap-16">
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
                        alt="Manos costurando a máquina en taller"
                        className="rounded-xl object-cover object-center"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOK8UY5TesvxqjgC-Hwzg1ChKEulzHNqCG0kzVs_ttKJCHxUqdEdMLD9L6yLQY_4CZ3SpSURhaA-teMGZlRDHSf54LpLg09zvPPvI3G17Qv2B3ha0XpAczn8Z9ePBV_aU1qq0iOLby22hSdzlVYdDOHJJ79fZECSwenAOvf12ZViI69T3CxsPQ1PlsKOShnHhZk4WRDodUOsCknVFOqWsxCcv4SUiMv-8Wl0u-q-p2XxtTP3wMOohB9ndCnWWERpi7f7fa4dO2RR3"
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
                    alt="Manos costurando a máquina en taller"
                    className="rounded-xl object-cover object-center"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOK8UY5TesvxqjgC-Hwzg1ChKEulzHNqCG0kzVs_ttKJCHxUqdEdMLD9L6yLQY_4CZ3SpSURhaA-teMGZlRDHSf54LpLg09zvPPvI3G17Qv2B3ha0XpAczn8Z9ePBV_aU1qq0iOLby22hSdzlVYdDOHJJ79fZECSwenAOvf12ZViI69T3CxsPQ1PlsKOShnHhZk4WRDodUOsCknVFOqWsxCcv4SUiMv-8Wl0u-q-p2XxtTP3wMOohB9ndCnWWERpi7f7fa4dO2RR3"
                    sizes="40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works (Asymmetric Flow) */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-12 text-center">
              <h2 className="text-primary mb-4 font-serif text-2xl font-bold md:text-3xl">
                {secComoFunciona?.heading || "¿Cómo funciona?"}
              </h2>
              <p className="text-on-surface-variant mx-auto max-w-2xl font-sans text-base leading-relaxed">
                {secComoFunciona?.body ||
                  "Es simple: tú traes la tela que elegiste, y nosotros nos encargamos de cortarla, coserla y entregarla como una prenda terminada."}
              </p>
            </div>
            <div className="relative grid grid-cols-1 items-stretch gap-8 md:grid-cols-3">
              {/* Connectors (Hidden on mobile) */}
              <div className="bg-primary/10 absolute top-1/2 right-[15%] left-[15%] -z-10 hidden h-0.5 -translate-y-1/2 md:block" />
              <div className="border-primary/10 text-secondary absolute top-1/2 left-[30%] z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-sm md:flex">
                <span
                  className="material-symbols-outlined text-sm font-bold"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </div>
              <div className="border-primary/10 text-secondary absolute top-1/2 right-[30%] z-20 hidden h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border bg-white shadow-sm md:flex">
                <span
                  className="material-symbols-outlined text-sm font-bold"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </div>

              {/* Step 1 */}
              <div className="border-primary/12 relative z-10 flex flex-col items-center rounded-xl border bg-white p-6 text-center shadow-sm md:translate-y-4">
                <div className="bg-surface-container-low text-primary border-primary/5 mb-4 flex h-16 w-16 items-center justify-center rounded-full border shadow-inner">
                  <span className="material-symbols-outlined text-secondary text-[32px]">
                    texture
                  </span>
                </div>
                <span className="text-secondary mb-2 font-sans text-[10px] font-semibold tracking-wider">
                  PASO 1
                </span>
                <h3 className="text-primary mb-2 font-sans text-lg font-bold">
                  Trae tu tela
                </h3>
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                  Cualquier material de tu elección (algodón, seda, poliéster,
                  etc.).
                </p>
              </div>

              {/* Step 2 (Prominent) */}
              <div className="border-primary/20 relative z-10 flex transform flex-col items-center rounded-xl border-2 bg-white p-8 text-center shadow-md md:-translate-y-4 md:scale-105">
                <div className="bg-primary mb-6 flex h-20 w-20 items-center justify-center rounded-full text-white shadow-md">
                  <span className="material-symbols-outlined text-[40px]">
                    content_cut
                  </span>
                </div>
                <span className="text-secondary mb-2 font-sans text-[10px] font-semibold tracking-wider">
                  PASO 2
                </span>
                <h3 className="text-primary mb-3 font-serif text-xl font-bold">
                  Nosotros confeccionamos
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  Trazado de patrón, corte profesional, costura industrial y
                  planchado.
                </p>
              </div>

              {/* Step 3 */}
              <div className="border-primary/12 relative z-10 flex flex-col items-center rounded-xl border bg-white p-6 text-center shadow-sm md:translate-y-4">
                <div className="bg-surface-container-low text-primary border-primary/5 mb-4 flex h-16 w-16 items-center justify-center rounded-full border shadow-inner">
                  <span className="material-symbols-outlined text-secondary text-[32px]">
                    checkroom
                  </span>
                </div>
                <span className="text-secondary mb-2 font-sans text-[10px] font-semibold tracking-wider">
                  PASO 3
                </span>
                <h3 className="text-primary mb-2 font-sans text-lg font-bold">
                  Retiras tu prenda
                </h3>
                <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                  Lista para usar con acabado impecable y empaque industrial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fabric Choice Section (Replacing closed fabric list with client choice message) */}
        <section className="w-full px-5 py-10 md:px-8 md:py-16">
          <div className="mx-auto max-w-screen-2xl">
            <div className="bg-surface-container-low border-primary/10 rounded-2xl border p-8 shadow-sm md:p-12">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="max-w-3xl space-y-4">
                  <div className="bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm">
                      category
                    </span>
                    Flexibilidad total de materiales
                  </div>
                  <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                    {secTuEligesTela?.heading || "Tú eliges la tela"}
                  </h2>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {secTuEligesTela?.body}
                  </p>
                </div>
                <div className="border-primary/10 text-primary flex shrink-0 items-center justify-center rounded-xl border bg-white p-6 shadow-xs">
                  <span className="material-symbols-outlined text-secondary text-5xl">
                    stitch
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quantities & Article Sections */}
        <section className="w-full px-5 py-10 md:px-8 md:py-16">
          <div className="mx-auto max-w-screen-2xl space-y-16">
            {/* Fabric Quantity Needed (New Section) */}
            {secCuantaTela && (
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className="border-primary/12 relative aspect-[4/3] w-full overflow-hidden rounded-xl border shadow-sm">
                  <Image
                    alt="Medición y patrones en taller"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD_SWjOmXDFSUx5KtdPujQxD0sZhdDccWkPILtdFuRfKoLZ0VY2gHFBmyRwc3acfvtZZugyjnFZvKwok6F20GW0qqv3xwPP2LAH382Ts20N1QhlfoumB-LH52ct8zeDKsoPtCcsadn37l8-tV9cruww5Q-Fo-f1iZGN9inaEpzY-Up74d3FHlt_jGB2XV6kaiBTvWXbjJniY2uy6HxjGGHuWpyPxe16-BINZ5yhhUXAcs7Ne2MnNfbnXaiPDAeVDTjBVUDu8QdJSDI"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <div className="bg-secondary/10 text-secondary inline-flex items-center gap-2 rounded-full px-3 py-1 font-sans text-xs font-semibold">
                    <span className="material-symbols-outlined text-sm">
                      straighten
                    </span>
                    Confirmación de metraje
                  </div>
                  <h2 className="text-primary font-serif text-xl font-bold md:text-2xl">
                    {secCuantaTela.heading}
                  </h2>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {secCuantaTela.body}
                  </p>
                </div>
              </div>
            )}

            {/* Block A: Ideal For */}
            {secParaQuien && (
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className="order-2 space-y-4 md:order-1">
                  <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                    {secParaQuien.heading}
                  </h3>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {secParaQuien.body}
                  </p>
                </div>
                <div className="border-primary/12 relative order-1 aspect-[4/3] w-full overflow-hidden rounded-xl border shadow-sm md:order-2">
                  <Image
                    alt="Mesa de taller con patrones y corte"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_v6uvPdvBr72T31ypBxldO0Blt-kmkqGj6smZJcX-wlXeIbtObJU9u8LEbRpFAsGQHE7JjuLFzHlOaonpivh8uQGaW9CKFJEwUvIk6w7NiOWuQO8iMBfl7V6DDfH747RoudJap9JbqWOrpW-bpKskFgPgXUYVUlRxRJqQTWfuvOG6Ju5nsyOv2UnCZ4HAmTP_pOPooJ4eO9CIdXIcsMAC2XMmhzaX_hmUou96YtODyZzbb-xHRYJ3pOjRVgu2t5MXkCvHVVS18SQH"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            )}

            {/* Block B: What is Included */}
            {secQueIncluye && (
              <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
                <div className="space-y-6">
                  <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                    {secQueIncluye.heading}
                  </h3>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {secQueIncluye.body}
                  </p>
                  <ul className="text-on-surface space-y-3 font-sans text-base">
                    {[
                      {
                        title: "Trazado",
                        desc: "Diseño y estructuración del patrón según la prenda.",
                      },
                      {
                        title: "Corte",
                        desc: "Corte preciso del material para optimizar la tela.",
                      },
                      {
                        title: "Costura industrial",
                        desc: "Costura con máquinas rectas, overlock y de acabado.",
                      },
                      {
                        title: "Planchado",
                        desc: "Vaporizado industrial para un acabado listo para usar.",
                      },
                      {
                        title: "Empaque",
                        desc: "Empaque cuidadoso e insumos menores (hilos) incluidos.",
                      },
                    ].map((item, idx) => (
                      <li
                        key={idx}
                        className="border-primary/5 flex items-start gap-3 rounded-lg border bg-white p-3 shadow-sm"
                      >
                        <span
                          className="material-symbols-outlined text-primary text-lg font-bold"
                          aria-hidden="true"
                        >
                          check_circle
                        </span>
                        <span>
                          <strong>{item.title}:</strong> {item.desc}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border-primary/10 rounded-2xl border bg-white p-8 shadow-sm">
                  {/* Volume Pricing block if present */}
                  {secPrecioVolumen ? (
                    <div className="space-y-4">
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 font-sans text-xs font-semibold text-amber-900">
                        <span className="material-symbols-outlined text-sm">
                          groups
                        </span>
                        Condiciones de Mayoreo
                      </div>
                      <h3 className="text-primary font-serif text-xl font-bold">
                        {secPrecioVolumen.heading}
                      </h3>
                      <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                        {secPrecioVolumen.body}
                      </p>
                      <div className="border-primary/10 mt-4 space-y-3 border-t pt-4 font-sans text-sm">
                        <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-3">
                          <span className="text-primary font-medium">
                            Colegios / Estudiantes
                          </span>
                          <span className="text-secondary font-bold">
                            Desde 6 uniformes
                          </span>
                        </div>
                        <div className="bg-surface-container-low flex items-center justify-between rounded-lg p-3">
                          <span className="text-primary font-medium">
                            Empresas e Instituciones
                          </span>
                          <span className="text-secondary font-bold">
                            Desde 12 piezas/modelo
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-on-surface-variant font-sans text-sm">
                      Aceptamos desde una sola prenda con atención
                      personalizada.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="w-full px-5 py-14 md:px-8 md:py-20">
            <div className="mx-auto max-w-screen-2xl">
              <h2 className="text-primary mb-8 text-center font-serif text-2xl font-bold md:text-3xl">
                Preguntas Frecuentes
              </h2>
              <div className="mx-auto max-w-3xl space-y-4">
                {service.faqs.map((faq, idx) => (
                  <FAQItem
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA Banner – full width background */}
      <section className="bg-primary relative w-full overflow-hidden px-5 py-14 text-white shadow-inner md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={ctaPinstripeTextureStyle}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col items-center space-y-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            {service.ctaBanner?.title || "¿Ya tienes tu tela?"}
          </h2>
          <p className="max-w-xl font-sans text-lg leading-relaxed text-white/80">
            {service.ctaBanner?.description ||
              "Cuéntanos qué prenda deseas confeccionar y cuánta tela tienes disponible. Te cotizamos solo la mano de obra."}
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-8 py-4 font-sans text-base font-semibold text-[#143067] shadow-lg transition-colors hover:bg-white/90"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              chat
            </span>
            {service.ctaBanner?.ctaText || "Cotizar Costura"}
          </a>
        </div>
      </section>
    </div>
  );
}
