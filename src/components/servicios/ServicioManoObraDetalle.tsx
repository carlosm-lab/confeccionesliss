"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { heroTrustBadges } from "@/lib/seo-data";

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

export function ServicioManoObraDetalle() {
  const whatsappUrl = siteConfig.links.whatsappDirect;

  return (
    <div className="min-h-screen w-full" style={pageWovenTextureStyle}>
      <div className="w-full">
        {/* ── HERO HOME TEMPLATE ── */}
        <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
          <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row-reverse lg:items-center lg:gap-16">
            <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
              <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-[32px] leading-tight font-bold md:mb-10 md:flex md:flex-col md:items-center md:text-[48px] lg:mb-6 lg:block lg:text-left">
                <span className="block w-full text-center lg:text-left">
                  Servicio de Solo Mano de Obra
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
                    Tú pones la tela, nosotros ponemos el talento. Trae tu
                    material y confeccionamos tu prenda cobrando exclusivamente
                    la mano de obra.
                  </p>
                  <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2">
                    {[
                      { icon: "savings", text: "Súper económico" },
                      { icon: "design_services", text: "Tus propios diseños" },
                      { icon: "checkroom", text: "Aceptamos toda tela" },
                      { icon: "verified", text: "Acabado profesional" },
                    ].map((b, index) => (
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
                ¿Cómo funciona?
              </h2>
              <p className="text-on-surface-variant mx-auto max-w-2xl font-sans text-base">
                Un proceso sencillo en tres pasos para transformar tus telas en
                prendas perfectas.
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
                  Cualquier material, cualquier tienda textil.
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
                  Corte, costura, planchado y empaque industrial.
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
                  Lista para usar. Calidad garantizada.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Fabric Types Section */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="bg-surface-container-low border-primary/5 rounded-2xl border p-8 shadow-sm md:p-12">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="space-y-4 lg:col-span-5">
                  <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                    ¿Qué telas aceptamos?
                  </h2>
                  <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                    Trabajamos con una amplia variedad de materiales. Nuestro
                    equipo cuenta con maquinaria especializada para manejar
                    desde tejidos ligeros hasta telas de alta densidad con la
                    máxima precisión.
                  </p>
                </div>
                <div className="overflow-hidden lg:col-span-7">
                  {/* Scrollable pills */}
                  <div className="hide-scrollbar flex snap-x gap-3 overflow-x-auto scroll-smooth px-2 pt-2 pb-4">
                    {[
                      "Algodón",
                      "Poliéster",
                      "Lino",
                      "Gabardina",
                      "Denim",
                      "Dry-Fit",
                      "Popelina",
                      "Oxford",
                      "Twill",
                    ].map((tela) => (
                      <span
                        key={tela}
                        className="border-primary/12 text-primary hover:border-primary/40 shrink-0 cursor-default snap-start rounded-full border bg-white px-5 py-2.5 font-sans text-sm font-semibold shadow-sm transition-colors"
                      >
                        {tela}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Sections (Alternate Layout) */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl space-y-16">
            {/* Block A */}
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="border-primary/12 relative aspect-[4/3] w-full overflow-hidden rounded-xl border shadow-sm">
                <Image
                  alt="Mesa de taller con telas y rollos"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD_SWjOmXDFSUx5KtdPujQxD0sZhdDccWkPILtdFuRfKoLZ0VY2gHFBmyRwc3acfvtZZugyjnFZvKwok6F20GW0qqv3xwPP2LAH382Ts20N1QhlfoumB-LH52ct8zeDKsoPtCcsadn37l8-tV9cruww5Q-Fo-f1iZGN9inaEpzY-Up74d3FHlt_jGB2XV6kaiBTvWXbjJniY2uy6HxjGGHuWpyPxe16-BINZ5yhhUXAcs7Ne2MnNfbnXaiPDAeVDTjBVUDu8QdJSDI"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                  ¿Para quién es ideal este servicio?
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  Este servicio está diseñado para emprendedores de moda,
                  diseñadores independientes, colegios, empresas que necesitan
                  uniformes corporativos, o personas que buscan una confección a
                  medida de alta calidad aportando su propio material. Es la
                  solución perfecta para quienes tienen un proveedor de telas
                  preferido pero requieren mano de obra experta.
                </p>
              </div>
            </div>

            {/* Block B */}
            <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16">
              <div className="order-2 space-y-6 md:order-1">
                <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                  ¿Qué incluye la mano de obra?
                </h3>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  Nuestro servicio abarca el proceso completo de manufactura
                  para asegurar que recibas una prenda terminada lista para su
                  uso o comercialización.
                </p>
                <ul className="text-on-surface space-y-3 font-sans text-base">
                  {[
                    {
                      title: "Trazado",
                      desc: "Adaptación de patrones a tu tela.",
                    },
                    {
                      title: "Corte",
                      desc: "Precisión para optimizar el material.",
                    },
                    {
                      title: "Costura industrial",
                      desc: "Acabados duraderos y profesionales.",
                    },
                    {
                      title: "Planchado",
                      desc: "Vaporizado industrial para un acabado impecable.",
                    },
                    {
                      title: "Empaque",
                      desc: "Listo para entregar o vender.",
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
              <div className="border-primary/12 relative order-1 aspect-[4/3] w-full overflow-hidden rounded-xl border shadow-sm md:order-2">
                <Image
                  alt="Tailor packaging folded shirt"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD_v6uvPdvBr72T31ypBxldO0Blt-kmkqGj6smZJcX-wlXeIbtObJU9u8LEbRpFAsGQHE7JjuLFzHlOaonpivh8uQGaW9CKFJEwUvIk6w7NiOWuQO8iMBfl7V6DDfH747RoudJap9JbqWOrpW-bpKskFgPgXUYVUlRxRJqQTWfuvOG6Ju5nsyOv2UnCZ4HAmTP_pOPooJ4eO9CIdXIcsMAC2XMmhzaX_hmUou96YtODyZzbb-xHRYJ3pOjRVgu2t5MXkCvHVVS18SQH"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <h2 className="text-primary mb-8 text-center font-serif text-2xl font-bold md:text-3xl">
              Preguntas Frecuentes
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              <FAQItem
                question="¿Cuánta tela necesito para una prenda?"
                answer="La cantidad de tela depende del diseño, la talla y el ancho del rollo (generalmente de 1.10m a 1.50m). Te recomendamos contactarnos con tu diseño para darte un estimado preciso antes de que compres el material."
              />
              <FAQItem
                question="¿Puedo traer un diseño de referencia?"
                answer="¡Por supuesto! Puedes traer una prenda física que te guste para usarla como molde, o imágenes de referencia. Nuestro equipo de patronaje se encargará de interpretar tu idea."
              />
              <FAQItem
                question="¿Hay pedido mínimo?"
                answer="Trabajamos tanto pedidos individuales (desde 1 pieza) como producciones en serie para empresas. Los precios de mano de obra varían según el volumen; contáctanos para una cotización escalonada."
              />
            </div>
          </div>
        </section>
      </div>

      {/* CTA Banner – full width background */}
      <section className="bg-primary relative w-full overflow-hidden px-5 py-14 text-white shadow-inner md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={ctaPinstripeTextureStyle}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col items-center space-y-6 text-center">
          <h2 className="font-serif text-2xl font-bold text-white md:text-3xl">
            ¿Ya tienes tu tela?
          </h2>
          <p className="max-w-xl font-sans text-lg leading-relaxed text-white/80">
            Hablemos sobre tu proyecto y empecemos a confeccionar.
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
            Contactar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
