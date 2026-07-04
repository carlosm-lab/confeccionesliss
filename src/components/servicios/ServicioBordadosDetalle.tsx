"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ServicePage } from "@/data/services";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

interface ServicioBordadosDetalleProps {
  service: ServicePage;
}

const fabricTextureStyle = {
  backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="none"/%3E%3Cpath d="M0 0h1v20H0zm2 0h1v20H2zm2 0h1v20H4zm2 0h1v20H6zm2 0h1v20H8zm2 0h1v20h-1zm2 0h1v20h-1zm2 0h1v20h-1zm2 0h1v20h-1zm2 0h1v20h-1zM0 0v1h20V0zm0 2v1h20V2zm0 2v1h20V4zm0 2v1h20V6zm0 2v1h20V8zm0 2v1h20v-1zm0 2v1h20v-1zm0 2v1h20v-1zm0 2v1h20v-1zm0 2v1h20v-1z" fill="%23143067" fill-opacity="0.03"/%3E%3C/svg%3E')`,
};

// ------------ FAQItem ------------
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-primary/12 overflow-hidden rounded-[16px] border bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-primary font-serif text-lg font-bold">{q}</span>
        <span
          className={`material-symbols-outlined text-[#143067] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden px-6 transition-all duration-300 ease-out ${open ? "max-h-[300px] pb-5" : "max-h-0"}`}
      >
        <p className="border-primary/10 text-on-surface-variant border-t pt-4 font-sans text-base leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

// ------------ main component ------------
export function ServicioBordadosDetalle({
  service,
}: ServicioBordadosDetalleProps) {
  const whatsapp = siteConfig.links.whatsappDirect;

  // Extraer las secciones opcionales con valores por defecto para evitar errores
  const sections = service.sections || [];
  const garmentGallery = service.garmentGallery || [];
  const institutionLogos = service.institutionLogos || [];
  const processSteps = service.processSteps || [];
  const pricingCards = service.pricingCards || [];

  return (
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

            <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-[28px] leading-tight font-bold md:mb-10 md:flex md:flex-col md:items-center md:text-[48px] lg:mb-6 lg:block lg:text-left">
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
                      alt={service.title}
                      className="rounded-xl object-cover object-center"
                      src={service.cardImage}
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
                  {service.heroFeatures.map((f, index) => (
                    <div
                      key={f.text}
                      className="border-primary/12 text-primary animate-fade-in-up flex w-full items-center gap-2 rounded-full border bg-white px-4 py-2 font-sans text-sm font-medium shadow-xs"
                      style={{ animationDelay: `${index * 50 + 200}ms` }}
                    >
                      <span
                        className="material-symbols-outlined text-secondary mr-2 shrink-0 text-[16px]"
                        aria-hidden="true"
                      >
                        {f.icon}
                      </span>
                      <span className="leading-tight">{f.text}</span>
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
                  alt={service.title}
                  className="rounded-xl object-cover object-center"
                  src={service.cardImage}
                  sizes="40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ── */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-24">
          {/* Sección A - ¿Qué es el bordado computarizado? (sections[0]) */}
          {sections[0] && (
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              {/* Imagen izquierda */}
              <div className="border-primary/12 bg-surface-container-lowest relative order-2 aspect-[4/3] overflow-hidden rounded-[16px] border md:order-1">
                <div
                  className="absolute inset-0 opacity-50"
                  style={fabricTextureStyle}
                />
                <Image
                  src={service.cardImage}
                  alt={sections[0].heading}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="absolute inset-0 z-0 object-cover"
                />
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <div className="rounded-full bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                    <span
                      className="material-symbols-outlined text-primary text-[48px]"
                      aria-hidden="true"
                    >
                      strikethrough_s
                    </span>
                  </div>
                </div>
              </div>

              {/* Texto derecha */}
              <div className="order-1 flex flex-col gap-4 md:order-2">
                <h2 className="text-primary flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    aria-hidden="true"
                  >
                    info
                  </span>
                  {sections[0].heading}
                </h2>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sections[0].body}
                </p>
              </div>
            </div>
          )}

          {/* Sección B - Bordamos para hospitales... (sections[1]) + cuadrícula 2×2 de prendas */}
          {sections[1] && (
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                  {sections[1].heading}
                </h2>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sections[1].body}
                </p>
              </div>

              {/* Grid 2×2 de prendas */}
              {garmentGallery.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {garmentGallery.map((item) => (
                    <div
                      key={item.label}
                      className="border-primary/12 bg-surface-container-lowest flex flex-col items-center gap-2 rounded-[16px] border p-4 text-center"
                    >
                      <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-lg">
                        <Image
                          src={item.image}
                          alt={item.label}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover"
                        />
                      </div>
                      <span className="text-primary font-sans text-xs font-semibold tracking-wider uppercase">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Nueva cuadrícula de logos universitarios ── */}
          {institutionLogos.length > 0 && (
            <div className="border-primary/12 bg-surface-container-lowest rounded-[16px] border p-8 md:p-12">
              <h2 className="text-primary mb-8 text-center font-serif text-2xl font-bold md:text-3xl">
                Universidades e instituciones que bordamos
              </h2>
              <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
                {institutionLogos.map((logo) => (
                  <div
                    key={logo.label}
                    className="border-primary/10 flex flex-col items-center gap-2 rounded-[12px] border bg-white p-3 text-center shadow-sm"
                  >
                    <div className="relative h-16 w-full">
                      <Image
                        src={logo.image}
                        alt={logo.label}
                        fill
                        sizes="(max-width: 640px) 30vw, 10vw"
                        className="object-contain"
                      />
                    </div>
                    <span className="text-primary font-sans text-[10px] font-semibold tracking-wider uppercase">
                      {logo.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sección C - ¿Bordado, sublimación o estampado? (sections[2]) */}
          {sections[2] && (
            <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
              <div className="order-1 flex flex-col gap-4 md:order-2">
                <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                  {sections[2].heading}
                </h2>
                {/* Renderizar el body con internal link en "sublimación textil" */}
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sections[2].body
                    .split("sublimación textil")
                    .map((part, i, arr) =>
                      i < arr.length - 1 ? (
                        <span key={i}>
                          {part}
                          <Link
                            href="/servicios/sublimacion"
                            className="text-primary font-semibold underline underline-offset-2 hover:opacity-75"
                          >
                            sublimación textil
                          </Link>
                        </span>
                      ) : (
                        <span key={i}>{part}</span>
                      )
                    )}
                </p>
              </div>
              <div className="border-primary/12 bg-surface-container-lowest relative order-2 aspect-[4/3] overflow-hidden rounded-[16px] border md:order-1">
                <div
                  className="absolute inset-0 opacity-30"
                  style={fabricTextureStyle}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-3 p-6">
                    {["draw", "palette", "local_laundry_service"].map(
                      (icon) => (
                        <div
                          key={icon}
                          className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-full"
                        >
                          <span
                            className="material-symbols-outlined text-primary text-[28px]"
                            aria-hidden="true"
                          >
                            {icon}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Sección D - Proceso de digitalización (sections[3]) + 3 pasos */}
          {sections[3] && (
            <div className="border-primary/12 bg-surface-container-lowest relative flex flex-col gap-12 overflow-hidden rounded-[16px] border p-8 md:p-12">
              <div className="bg-primary/5 absolute top-0 right-0 -z-10 h-64 w-64 rounded-bl-full" />
              <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
                <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                  {sections[3].heading}
                </h2>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sections[3].body}
                </p>
              </div>
              {processSteps.length > 0 && (
                <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
                  <div className="absolute top-1/2 right-[16.666%] left-[16.666%] z-0 hidden h-[2px] -translate-y-1/2 bg-[#143067]/35 md:block" />
                  {processSteps.map((step) => (
                    <div
                      key={step.step}
                      className="border-primary/12 relative z-10 flex flex-col items-center gap-4 rounded-[16px] border bg-white p-6 text-center shadow-sm"
                    >
                      <div className="bg-primary flex h-16 w-16 items-center justify-center rounded-full font-serif text-2xl font-bold text-white shadow-md">
                        {step.step}
                      </div>
                      <h3 className="text-primary font-sans text-lg font-semibold">
                        {step.title}
                      </h3>
                      <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Sección E - Precios y pedidos (sections[4]) + pricing cards */}
          {sections[4] && (
            <div className="border-primary/12 bg-surface grid grid-cols-1 items-center gap-12 rounded-[16px] border p-8 md:grid-cols-2">
              <div className="flex flex-col gap-4">
                <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                  {sections[4].heading}
                </h2>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sections[4].body}
                </p>
              </div>
              {pricingCards.length > 0 && (
                <div className="flex flex-col gap-6">
                  {pricingCards.map((item) => (
                    <div
                      key={item.label}
                      className="border-primary/12 flex items-center gap-4 rounded-[12px] border bg-white p-4 shadow-sm"
                    >
                      <span
                        className="material-symbols-outlined text-primary text-3xl"
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <div>
                        <p className="text-on-surface-variant font-sans text-[10px] font-semibold tracking-wider uppercase md:text-xs">
                          {item.label}
                        </p>
                        <p className="text-primary font-sans text-lg font-bold">
                          {item.value}
                        </p>
                        {item.note && (
                          <p className="text-on-surface-variant mt-1 font-sans text-xs">
                            {item.note}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 text-center">
            <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
              Preguntas Frecuentes
            </h2>
            <p className="text-on-surface-variant mt-4 font-sans text-base">
              Resolvemos sus dudas sobre el proceso de bordado.
            </p>
          </div>
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {service.faqs.map((faq) => (
              <FAQItem key={faq.question} q={faq.question} a={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden rounded-[24px] bg-[#143067] px-8 py-16 text-center shadow-lg md:py-24">
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/woven.png')",
              }}
            />
            <h2 className="z-10 font-serif text-[28px] leading-tight font-bold text-white md:text-[48px]">
              {service.ctaBanner.title}
            </h2>
            <p className="z-10 max-w-2xl font-sans text-lg leading-relaxed text-white/90">
              {service.ctaBanner.description}
            </p>
            <a
              href={service.ctaBanner.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 mt-4 inline-flex cursor-pointer items-center gap-2 rounded-[12px] bg-white px-8 py-4 font-sans text-base font-bold text-[#143067] shadow-md transition-colors hover:bg-white/90"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                chat
              </span>
              {service.ctaBanner.ctaText}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
