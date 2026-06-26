"use client";

import Image from "next/image";
import { siteConfig } from "@/config/site";

interface Feature {
  icon: string;
  text: string;
}

interface ServicioHeroProps {
  title: string;
  description: string;
  features: Feature[];
  ctaText: string;
  heroImage: string;
}

export function ServicioHero({
  title,
  description,
  features,
  ctaText,
  heroImage,
}: ServicioHeroProps) {
  const whatsappUrl = siteConfig.links.whatsappDirect;

  return (
    <section className="bg-surface-container-low relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
        <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
          {/* Label "SERVICIO" con barra roja — diseño original del prototipo */}
          <div className="mb-4 flex items-center gap-3">
            <div className="h-6 w-1 bg-[#B43024]" />
            <span className="text-primary font-sans text-xs font-semibold tracking-widest uppercase">
              Servicio
            </span>
          </div>

          {/* H1 */}
          <h1 className="text-primary mb-6 w-full font-serif text-[28px] leading-tight font-bold md:mb-10 md:text-[48px] lg:mb-6">
            {title}
          </h1>

          {/* Sub-contenedor responsivo: columna en móvil, 2 cols en tablet, columna de nuevo en desktop */}
          <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 md:items-stretch md:gap-12 lg:flex lg:flex-col lg:gap-0">
            {/* IMAGEN HERO — VERSIÓN MÓVIL/TABLET (oculta en lg+) */}
            <div className="relative w-full max-w-sm self-center md:order-2 md:h-full md:max-w-none md:self-stretch lg:hidden">
              <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
                <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:aspect-auto md:h-full md:w-full">
                  <Image
                    fill
                    alt={title}
                    className="rounded-xl object-cover object-center"
                    src={heroImage}
                    sizes="(max-width:768px) 80vw, 40vw"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* COLUMNA DE TEXTO Y ACCIONES */}
            <div className="flex w-full flex-col items-start md:order-1 md:justify-center">
              <p className="text-on-surface-variant mb-6 w-full font-sans text-lg leading-relaxed lg:mb-6 lg:text-xl">
                {description}
              </p>

              {/* Chips de features — diseño original del prototipo (bg-primary sólido) */}
              <div className="mt-2 mb-8 flex flex-wrap gap-3">
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="bg-primary flex items-center gap-2 rounded-full px-4 py-2 font-sans text-sm font-medium text-white"
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      aria-hidden="true"
                    >
                      {feature.icon}
                    </span>
                    {feature.text}
                  </div>
                ))}
              </div>

              {/* Botón CTA — diseño original del prototipo */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 inline-flex cursor-pointer items-center gap-2 rounded-[12px] px-8 py-4 font-sans text-base font-semibold text-white shadow-sm transition-colors"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  chat
                </span>
                {ctaText}
              </a>
            </div>
          </div>
        </div>

        {/* IMAGEN HERO — VERSIÓN DESKTOP (visible solo en lg+) */}
        <div className="hidden h-full lg:flex lg:w-[40%] lg:items-center">
          <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
            <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
            <div className="relative h-full w-full overflow-hidden rounded-xl">
              <Image
                fill
                alt={title}
                className="rounded-xl object-cover object-center"
                src={heroImage}
                sizes="40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
