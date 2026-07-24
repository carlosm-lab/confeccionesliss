"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ServicePage } from "@/data/types";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const dotTextureStyle = {
  backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="%23143067" fill-opacity="1" fill-rule="evenodd"%3E%3Ccircle cx="3" cy="3" r="3"/%3E%3Ccircle cx="13" cy="13" r="3"/%3E%3C/g%3E%3C/svg%3E')`,
};

const BORDADOS_CTA_TEXTURE = {
  backgroundImage:
    "url('https://www.transparenttextures.com/patterns/woven.png')",
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
        <Icon
          name="expand_more"
          className="transition-transform duration-300"
          aria-hidden="true"
        />
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

interface ServicioSublimacionDetalleProps {
  service: ServicePage;
}

export function ServicioSublimacionDetalle({
  service,
}: ServicioSublimacionDetalleProps) {
  const whatsappUrl =
    service.ctaBanner.ctaHref || siteConfig.links.whatsappDirect;
  const sec = (i: number) => service.sections?.[i];

  return (
    <div className="w-full">
      {/* HERO */}
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

            <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-[28px] leading-tight font-bold md:mb-10 md:flex md:flex-col md:items-center md:text-[48px] lg:mb-6 lg:block lg:text-left">
              <span className="block w-full text-center lg:text-left">
                {service.title}
              </span>
            </h1>
            <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 md:items-stretch md:gap-12 lg:flex lg:flex-col lg:gap-0">
              {/* IMAGE HERO - MOBILE */}
              <div
                className="animate-fade-in-up relative w-full max-w-sm self-center md:order-2 md:h-full md:max-w-none md:self-stretch lg:hidden"
                style={{ animationDelay: "300ms" }}
              >
                <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
                  <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:aspect-auto md:h-full md:w-full">
                    <Image
                      fill
                      alt={service.seoTitle || service.title}
                      className="rounded-xl object-cover object-center"
                      src={service.cardImage}
                      sizes="(max-width:768px) 80vw, 40vw"
                      priority
                    />
                  </div>
                </div>
              </div>
              {/* TEXT COLUMN */}
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
                      <Icon
                        name={b.icon}
                        size={16}
                        className="text-secondary mr-2 shrink-0"
                      />
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
          {/* IMAGE HERO - DESKTOP */}
          <div
            className="animate-fade-in-up hidden h-full lg:flex lg:w-[40%] lg:items-center"
            style={{ animationDelay: "300ms" }}
          >
            <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  fill
                  alt={service.seoTitle || service.title}
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

      {/* APPLICATION CATEGORIES QUICK GRID */}
      {service.applicationCategories &&
        service.applicationCategories.length > 0 && (
          <section className="border-primary/5 border-y bg-white px-5 py-10 md:px-8 md:py-14">
            <div className="mx-auto max-w-screen-2xl">
              <p className="text-outline mb-6 text-center font-sans text-xs font-semibold tracking-widest uppercase">
                ¿Qué sublimamos?
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {service.applicationCategories.map((cat) => (
                  <a
                    key={cat.anchorId ?? cat.title}
                    href={cat.anchorId ? `#${cat.anchorId}` : undefined}
                    className="border-primary/12 group flex flex-col items-center gap-2 rounded-2xl border bg-white p-4 text-center shadow-sm transition hover:shadow-md"
                  >
                    <div className="bg-primary/5 text-primary group-hover:bg-primary/10 flex h-11 w-11 items-center justify-center rounded-full transition">
                      <Icon name={cat.icon} size={22} />
                    </div>
                    <span className="text-primary font-sans text-xs leading-tight font-semibold">
                      {cat.title}
                    </span>
                    <span className="text-on-surface-variant font-sans text-[11px] leading-snug">
                      {cat.examples}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

      {/* EDITORIAL BLOCKS */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            {/* Main Content */}
            <div className="space-y-16 md:col-span-7">
              {/* Sec 0 */}
              {sec(0) && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="border-primary/12 text-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                      <Icon name="layers" />
                    </div>
                    <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                      {sec(0)!.heading}
                    </h2>
                  </div>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {sec(0)!.body}
                  </p>
                </div>
              )}
              {/* Sec 1 */}
              {sec(1) && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="border-primary/12 text-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                      <Icon name="category" />
                    </div>
                    <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                      {sec(1)!.heading}
                    </h2>
                  </div>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {sec(1)!.body}
                  </p>
                </div>
              )}
              {/* Sec 2 */}
              {sec(2) && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="border-primary/12 text-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                      <Icon name="sports" />
                    </div>
                    <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                      {sec(2)!.heading}
                    </h2>
                  </div>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {sec(2)!.body}
                  </p>
                </div>
              )}
              {/* Sec 3 */}
              {sec(3) && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="border-primary/12 text-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                      <Icon name="shopping_bag" />
                    </div>
                    <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                      {sec(3)!.heading}
                    </h2>
                  </div>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {sec(3)!.body}
                  </p>
                </div>
              )}
              {/* Sec 4 – Cuidado y durabilidad */}
              {sec(4) && (
                <div className="space-y-6">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="border-primary/12 text-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                      <Icon name="shield" />
                    </div>
                    <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                      {sec(4)!.heading}
                    </h2>
                  </div>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    {sec(4)!.body}
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="relative space-y-6 md:col-span-5">
              {/* Comparison card */}
              <div className="border-primary/12 overflow-hidden rounded-2xl border bg-white shadow-[0_8px_24px_rgba(20,48,103,0.04)]">
                <div className="border-primary/12 grid grid-cols-2 border-b">
                  <div className="bg-primary/5 border-primary/12 border-r p-4 text-center">
                    <span className="text-primary flex items-center justify-center gap-2 font-sans text-sm font-bold">
                      Sublimación{" "}
                      <Icon
                        name="check_circle"
                        size={18}
                        fill
                        className="font-bold text-green-600"
                      />
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 text-center">
                    <span className="text-on-surface-variant flex items-center justify-center gap-2 font-sans text-sm font-bold">
                      Tradicional{" "}
                      <Icon
                        name="cancel"
                        size={18}
                        fill
                        className="text-primary font-bold"
                      />
                    </span>
                  </div>
                </div>
                <div className="divide-primary/5 divide-y">
                  <div className="grid grid-cols-1 gap-2 p-4">
                    <div className="text-outline mb-1 text-center font-sans text-[10px] font-semibold tracking-wider uppercase">
                      Permanencia del color
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-primary text-center text-sm font-bold">
                        Alta durabilidad (según cuidado)
                      </div>
                      <div className="text-on-surface-variant text-center text-sm">
                        Se desgasta y cuartea
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest grid grid-cols-1 gap-2 p-4">
                    <div className="text-outline mb-1 text-center font-sans text-[10px] font-semibold tracking-wider uppercase">
                      Textura al tacto
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-primary text-center text-sm font-bold">
                        Imperceptible (0 relieve)
                      </div>
                      <div className="text-on-surface-variant text-center text-sm">
                        Capa plástica palpable
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-2 p-4">
                    <div className="text-outline mb-1 text-center font-sans text-[10px] font-semibold tracking-wider uppercase">
                      Diseños degradados
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-primary text-center text-sm font-bold">
                        Fotográfico, sin límite
                      </div>
                      <div className="text-on-surface-variant text-center text-sm">
                        Colores planos, limitados
                      </div>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest grid grid-cols-1 gap-2 p-4">
                    <div className="text-outline mb-1 text-center font-sans text-[10px] font-semibold tracking-wider uppercase">
                      Transpirabilidad
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-primary text-center text-sm font-bold">
                        Alta (poros abiertos)
                      </div>
                      <div className="text-on-surface-variant text-center text-sm">
                        Baja (poros tapados)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Pricing Cards */}
              {service.pricingCards?.map((card, idx) => (
                <div
                  key={idx}
                  className="border-primary/12 rounded-2xl border bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-4">
                    <div className="bg-primary/5 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Icon name={card.icon} />
                    </div>
                    <div>
                      <div className="text-outline text-xs font-semibold tracking-wider uppercase">
                        {card.label}
                      </div>
                      <div className="text-primary font-serif text-xl font-bold">
                        {card.value}
                      </div>
                    </div>
                  </div>
                  {card.note && (
                    <p className="text-on-surface-variant border-primary/5 border-t pt-3 font-sans text-sm leading-relaxed">
                      {card.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY DETAILS */}
      {service.categoryDetails && service.categoryDetails.length > 0 && (
        <section className="border-primary/5 border-t bg-[#f7f8fc] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-12 text-center">
              <p className="text-outline mb-2 font-sans text-xs font-semibold tracking-widest uppercase">
                Por producto
              </p>
              <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                ¿Qué podemos personalizar para ti?
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {service.categoryDetails.map((detail) => (
                <div
                  key={detail.id}
                  id={detail.id}
                  className="border-primary/12 flex flex-col rounded-2xl border bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="bg-primary/5 text-primary flex h-11 w-11 shrink-0 items-center justify-center rounded-full">
                      <Icon name={detail.icon} size={22} />
                    </div>
                    <h3 className="text-primary font-serif text-lg leading-tight font-bold">
                      {detail.title}
                    </h3>
                  </div>
                  <p className="text-on-surface-variant mb-4 font-sans text-sm leading-relaxed">
                    {detail.body}
                  </p>
                  {detail.bulletPoints && detail.bulletPoints.length > 0 && (
                    <ul className="mt-auto space-y-1.5">
                      {detail.bulletPoints.map((point, pi) => (
                        <li
                          key={pi}
                          className="text-on-surface-variant flex items-start gap-2 font-sans text-sm"
                        >
                          <Icon
                            name="check_circle"
                            size={16}
                            fill
                            className="text-secondary mt-0.5 shrink-0"
                          />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS FLOW */}
      <section className="border-primary/5 relative overflow-hidden border-y bg-white px-5 py-14 md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={dotTextureStyle}
        />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          {sec(5) && (
            <div className="mb-12 text-center">
              <h2 className="text-primary mb-4 font-serif text-2xl font-bold md:text-3xl">
                {sec(5)!.heading}
              </h2>
              <p className="text-on-surface-variant mx-auto max-w-2xl font-sans text-base">
                {sec(5)!.body}
              </p>
            </div>
          )}
          <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
            <div className="bg-primary/12 absolute top-1/2 right-[12.5%] left-[12.5%] z-0 hidden h-[1px] -translate-y-1/2 md:block" />
            {service.processSteps?.map((step, idx) => (
              <div key={idx} className="contents">
                <div className="border-primary/12 relative z-10 flex w-full flex-col items-center rounded-xl border bg-white p-6 shadow-sm md:w-1/4 md:border-none md:shadow-none">
                  <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-white shadow-md">
                    <Icon
                      name={
                        idx === 0
                          ? "design_services"
                          : idx === 1
                            ? "print"
                            : idx === 2
                              ? "layers"
                              : "checkroom"
                      }
                      size={28}
                    />
                  </div>
                  <h4 className="text-primary mb-2 font-serif text-lg font-bold">
                    {step.step}. {step.title}
                  </h4>
                  <p className="text-on-surface-variant text-center text-sm">
                    {step.description}
                  </p>
                  {idx < (service.processSteps?.length ?? 0) - 1 && (
                    <div className="md:hidden">
                      <Icon
                        name="arrow_downward"
                        className="text-secondary mt-4"
                      />
                    </div>
                  )}
                </div>
                {idx < (service.processSteps?.length ?? 0) - 1 && (
                  <div className="text-secondary border-primary/5 relative z-10 hidden rounded-full border bg-white p-1 shadow-sm md:flex">
                    <Icon name="arrow_forward" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUBLIMACION VS BORDADO GUIDE */}
      {sec(6) && (
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="mb-10 text-center">
              <p className="text-outline mb-2 font-sans text-xs font-semibold tracking-widest uppercase">
                Guía de decisión
              </p>
              <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                {sec(6)!.heading}
              </h2>
              <p className="text-on-surface-variant mx-auto mt-4 max-w-2xl font-sans text-base">
                {sec(6)!.body}
              </p>
            </div>
            <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="grid grid-cols-3 border-b border-gray-100 bg-gray-50">
                <div className="p-4 font-sans text-xs font-bold tracking-wider text-gray-500 uppercase">
                  Criterio
                </div>
                <div className="border-x border-gray-100 p-4 text-center font-sans text-xs font-bold tracking-wider text-purple-700 uppercase">
                  Sublimación
                </div>
                <div className="p-4 text-center font-sans text-xs font-bold tracking-wider text-blue-700 uppercase">
                  Bordado
                </div>
              </div>
              {[
                {
                  criteria: "Colores en diseño",
                  sub: "Full color, degradados, fotos",
                  bor: "Colores limitados por hilo",
                },
                {
                  criteria: "Material ideal",
                  sub: "Poliéster y materiales con recubrimiento",
                  bor: "Cualquier tela, incluido algodón",
                },
                {
                  criteria: "Textura visual",
                  sub: "Plano, sin relieve",
                  bor: "Relieve de hilo, tridimensional",
                },
                {
                  criteria: "Ideal para",
                  sub: "Jerseys deportivos, tazas, regalos",
                  bor: "Logos institucionales, scrubs, uniformes",
                },
                {
                  criteria: "Pedido mínimo",
                  sub: "Desde 1 pieza",
                  bor: "Desde 1 pieza",
                },
              ].map((row, i) => (
                <div
                  key={i}
                  className={cn(
                    "grid grid-cols-3 border-b border-gray-100 last:border-0",
                    i % 2 === 1 && "bg-gray-50/60"
                  )}
                >
                  <div className="p-4 font-sans text-sm font-semibold text-gray-700">
                    {row.criteria}
                  </div>
                  <div className="border-x border-gray-100 p-4 text-center font-sans text-sm text-gray-600">
                    {row.sub}
                  </div>
                  <div className="p-4 text-center font-sans text-sm text-gray-600">
                    {row.bor}
                  </div>
                </div>
              ))}
            </div>
            {service.ctaBanner.secondaryCtaHref && (
              <div className="mt-8 flex justify-center">
                <Link
                  href={service.ctaBanner.secondaryCtaHref}
                  className="border-primary text-primary hover:bg-primary/5 inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-sans text-sm font-semibold transition"
                >
                  <Icon name="arrow_forward" size={18} />
                  {service.ctaBanner.secondaryCtaText ??
                    "Ver servicio de bordado"}
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TRUST / AUTHORITY */}
      {sec(7) && (
        <section className="border-primary/5 border-y bg-[#f7f8fc] px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:gap-16">
              <div>
                <p className="text-outline mb-2 font-sans text-xs font-semibold tracking-widest uppercase">
                  Trayectoria
                </p>
                <h2 className="text-primary mb-6 font-serif text-2xl font-bold md:text-3xl">
                  {sec(7)!.heading}
                </h2>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sec(7)!.body}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["UNIVO", "UNAB", "UGB", "UES", "UMA", "IEPROES"].map(
                  (inst) => (
                    <div
                      key={inst}
                      className="border-primary/12 flex items-center gap-3 rounded-xl border bg-white p-4 shadow-sm"
                    >
                      <Icon name="school" size={20} className="text-primary" />
                      <span className="text-primary font-sans text-sm font-semibold">
                        {inst}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ENVIOS */}
      {sec(8) && (
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="border-primary/12 flex flex-col gap-6 rounded-2xl border bg-white p-8 shadow-sm md:flex-row md:items-center md:gap-10">
              <div className="bg-primary/5 text-primary flex h-16 w-16 shrink-0 items-center justify-center rounded-full">
                <Icon name="local_shipping" size={32} />
              </div>
              <div>
                <h2 className="text-primary mb-2 font-serif text-xl font-bold md:text-2xl">
                  {sec(8)!.heading}
                </h2>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  {sec(8)!.body}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="border-primary/5 border-t bg-[#f7f8fc] px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="text-primary mb-10 text-center font-serif text-2xl font-bold md:text-3xl">
            Preguntas Frecuentes
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
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

      {/* CTA BANNER */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#143067] p-10 text-center shadow-lg md:p-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={BORDADOS_CTA_TEXTURE}
            />
            <div className="relative z-10 max-w-2xl">
              <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                {service.ctaBanner.title}
              </h2>
              <p className="mb-8 font-sans text-lg leading-relaxed text-white/80">
                {service.ctaBanner.description}
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-sans text-base font-bold text-[#143067] shadow-sm transition-colors duration-300 hover:bg-white/90"
                >
                  <Icon name="chat" aria-hidden="true" />
                  {service.ctaBanner.ctaText}
                </a>
                {service.ctaBanner.secondaryCtaHref && (
                  <Link
                    href={service.ctaBanner.secondaryCtaHref}
                    className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/40 px-8 py-4 font-sans text-base font-semibold text-white transition-colors duration-300 hover:bg-white/10"
                  >
                    {service.ctaBanner.secondaryCtaText ??
                      "Comparar con bordado"}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
