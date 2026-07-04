"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ServicePage } from "@/data/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// Background grid texture for the entire page
const pageGridTextureStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm20 20h20v20H20V20zM0 20h20v20H0V20z' fill='%23143067' fill-opacity='0.02' fill-rule='evenodd'/%3E%3C/svg%3E")`,
};

// Texture for the CTA Banner
const ctaBannerTextureStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm10 10h10v10H10V10zM0 10h10v10H0V10z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
};

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-primary/10 rounded-lg border bg-white p-6 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between text-left transition-opacity hover:opacity-95 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-primary font-serif text-lg font-bold">
          {question}
        </span>
        <span
          className={cn(
            "material-symbols-outlined text-secondary transition-transform duration-300",
            isOpen && "rotate-180"
          )}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          isOpen ? "mt-4 max-h-[300px]" : "max-h-0"
        )}
      >
        <div className="border-primary/5 text-on-surface-variant border-t pt-4 font-sans text-base leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
}

interface ServicioSastreriaDetalleProps {
  service: ServicePage;
}

export function ServicioSastreriaDetalle({
  service,
}: ServicioSastreriaDetalleProps) {
  const whatsappUrl =
    service.ctaBanner.ctaHref || siteConfig.links.whatsappDirect;
  const sec = (i: number) => service.sections?.[i];

  return (
    <div className="min-h-screen w-full" style={pageGridTextureStyle}>
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
                        alt="Medición y sastrería profesional"
                        className="rounded-xl object-cover object-center"
                        src={
                          service.cardImage ||
                          "/images/servicios/confeccion.png"
                        }
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
                  <div className="mb-8 grid w-full grid-cols-1 gap-x-3 gap-y-2.5 sm:grid-cols-3">
                    {service.heroFeatures.map((b, index) => (
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
                    alt="Medición y sastrería profesional"
                    className="rounded-xl object-cover object-center"
                    src={
                      service.cardImage || "/images/servicios/confeccion.png"
                    }
                    sizes="40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Measurements Showcase */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="border-primary/10 group relative overflow-hidden rounded-xl border bg-white p-8 shadow-sm">
              <div className="bg-secondary absolute top-0 bottom-0 left-0 w-1" />
              <div className="mb-8">
                <h2 className="text-primary mb-2 font-serif text-2xl font-bold md:text-3xl">
                  12 medidas anatómicas
                </h2>
                <p className="text-on-surface-variant font-sans text-base italic">
                  Con estas medidas construimos un patrón único para ti.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {[
                  "Pecho",
                  "Cintura",
                  "Cadera",
                  "Manga",
                  "Torso",
                  "Espalda",
                  "Cuello",
                  "Pantalón",
                  "Entrepierna",
                  "Muslo",
                  "Rodilla",
                  "Tobillo",
                ].map((medida) => (
                  <div key={medida} className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-outline-variant text-sm"
                      aria-hidden="true"
                    >
                      straighten
                    </span>
                    <span className="text-on-surface font-sans text-base">
                      {medida}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sin límite fijo de talla */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="bg-surface-container-low border-primary/10 rounded-xl border p-12 text-center shadow-sm">
              <h2 className="text-primary mb-6 font-serif text-2xl font-bold md:text-3xl">
                {sec(3)?.heading || "Sin límite fijo de talla"}
              </h2>
              <p className="text-on-surface-variant mx-auto mb-10 max-w-2xl font-sans text-lg leading-relaxed">
                {sec(3)?.body}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 font-sans text-xs font-semibold tracking-wider uppercase md:gap-4">
                {["XS", "S", "M"].map((size) => (
                  <span
                    key={size}
                    className="text-on-surface-variant border-primary/10 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm"
                  >
                    {size}
                  </span>
                ))}
                {/* Highlighted L size */}
                <span className="bg-primary border-primary/30 flex h-12 w-12 scale-110 items-center justify-center rounded-full border font-bold text-white shadow-md">
                  L
                </span>
                {["XL", "2XL"].map((size) => (
                  <span
                    key={size}
                    className="text-on-surface-variant border-primary/10 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm"
                  >
                    {size}
                  </span>
                ))}
                <span className="border-secondary text-primary flex h-10 items-center justify-center rounded-full border bg-white px-4 font-bold shadow-sm">
                  y más...
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid (2 Columnas) */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 md:grid-cols-2">
            {/* Section 0: ¿Por qué elegir confección a la medida? */}
            {sec(0) && (
              <div className="space-y-4">
                <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                  {sec(0)?.heading}
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sec(0)?.body}
                </p>
              </div>
            )}

            {/* Section 1: Uniformes de trabajo y ropa personal, ambos a la medida */}
            {sec(1) && (
              <div className="space-y-4">
                <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                  {sec(1)?.heading}
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sec(1)?.body}
                </p>
              </div>
            )}

            {/* Section 2: Nuestro proceso de toma de medidas */}
            {sec(2) && (
              <div className="space-y-6">
                <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                  {sec(2)?.heading}
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sec(2)?.body}
                </p>
              </div>
            )}

            {/* Section 4: Confección a la medida vs. tabla de tallas */}
            {sec(4) && (
              <div className="space-y-4">
                <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                  {sec(4)?.heading}
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sec(4)?.body}
                </p>
              </div>
            )}

            {/* Section 5: Tiempos de entrega */}
            {sec(5) && (
              <div className="space-y-4 md:col-span-2">
                <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                  {sec(5)?.heading}
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sec(5)?.body}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Tabla Comparativa: Confección a la medida vs. Talla estándar */}
        {service.sizeComparison && service.sizeComparison.length > 0 && (
          <section className="w-full px-5 py-14 md:px-8 md:py-20">
            <div className="mx-auto max-w-screen-2xl">
              <h2 className="text-primary mb-8 text-center font-serif text-2xl font-bold md:text-3xl">
                Confección a la medida vs. Tabla de tallas estándar
              </h2>
              <div className="border-primary/10 overflow-hidden rounded-xl border bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-sans text-sm md:text-base">
                    <thead>
                      <tr className="bg-primary font-serif text-white">
                        <th className="px-6 py-4 font-bold">Característica</th>
                        <th className="px-6 py-4 font-bold">
                          Tabla de Tallas Estándar
                        </th>
                        <th className="px-6 py-4 font-bold">
                          Confección a la Medida
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-primary/10 divide-y">
                      {service.sizeComparison.map((row, index) => (
                        <tr
                          key={row.garment}
                          className={
                            index % 2 === 0
                              ? "bg-white"
                              : "bg-surface-container-low/40"
                          }
                        >
                          <td className="text-primary px-6 py-4 font-medium">
                            {row.garment}
                          </td>
                          <td className="text-on-surface-variant px-6 py-4">
                            {row.standard}
                          </td>
                          <td className="text-primary px-6 py-4 font-semibold">
                            {row.medida}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Process Steps Section (Visita -> Medición -> Confección) */}
        {service.processSteps && service.processSteps.length > 0 && (
          <section className="w-full px-5 py-14 md:px-8 md:py-20">
            <div className="mx-auto max-w-screen-2xl">
              <h2 className="text-primary mb-10 text-center font-serif text-2xl font-bold md:text-3xl">
                Nuestro proceso en 3 pasos
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {service.processSteps.map((step) => (
                  <div
                    key={step.step}
                    className="border-primary/10 relative flex flex-col items-center rounded-xl border bg-white p-8 text-center shadow-sm"
                  >
                    <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full font-serif text-xl font-bold text-white shadow-md">
                      {step.step}
                    </div>
                    <h3 className="text-primary mb-2 font-serif text-xl font-bold">
                      {step.title}
                    </h3>
                    <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Application Categories / Categorías de Prendas */}
        {service.applicationCategories &&
          service.applicationCategories.length > 0 && (
            <section className="w-full px-5 py-14 md:px-8 md:py-20">
              <div className="mx-auto max-w-screen-2xl">
                <h2 className="text-primary mb-10 text-center font-serif text-2xl font-bold md:text-3xl">
                  ¿Qué tipo de prendas confeccionamos a la medida?
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {service.applicationCategories.map((cat) => (
                    <div
                      key={cat.title}
                      className="border-primary/10 flex flex-col rounded-xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <span className="material-symbols-outlined text-primary mb-4 text-[36px]">
                        {cat.icon}
                      </span>
                      <h3 className="text-primary mb-2 font-serif text-lg font-bold">
                        {cat.title}
                      </h3>
                      <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                        {cat.examples}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* FAQ Section */}
        {service.faqs && service.faqs.length > 0 && (
          <section className="w-full px-5 py-14 md:px-8 md:py-20">
            <div className="mx-auto max-w-screen-2xl">
              <h2 className="text-primary mb-10 text-center font-serif text-2xl font-bold md:text-3xl">
                Preguntas Frecuentes
              </h2>
              <div className="mx-auto max-w-3xl space-y-4">
                {service.faqs.map((faq) => (
                  <FAQItem
                    key={faq.question}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Banner */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="border-primary/20 relative overflow-hidden rounded-2xl border bg-[#143067] p-12 text-center shadow-lg">
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={ctaBannerTextureStyle}
              />
              <div className="relative z-10">
                <h2 className="mx-auto mb-4 max-w-2xl font-serif text-2xl leading-tight font-bold text-white md:text-[36px]">
                  {service.ctaBanner.title}
                </h2>
                <p className="mx-auto mb-8 max-w-xl font-sans text-base leading-relaxed text-white/90">
                  {service.ctaBanner.description}
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-white px-8 py-4 font-sans text-xs font-bold tracking-wider text-[#143067] uppercase shadow-md transition-colors hover:bg-white/90"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    aria-hidden="true"
                  >
                    chat
                  </span>
                  {service.ctaBanner.ctaText}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
