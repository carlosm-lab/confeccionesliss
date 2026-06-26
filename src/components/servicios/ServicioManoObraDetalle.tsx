"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
        {/* Breadcrumb */}
        <div className="mx-auto max-w-screen-2xl px-5 py-4 md:px-8">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Servicios", href: "/servicios" },
              { label: "Mano de Obra", href: "/servicios/mano-de-obra" },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="w-full px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-14">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-8 lg:flex-row lg:gap-16">
            {/* Desktop Image (Left on desktop, hidden on mobile) */}
            <div className="relative hidden w-full lg:block lg:w-[42%] lg:shrink-0">
              <div className="border-primary/12 relative aspect-[4/5] w-full overflow-hidden rounded-xl border shadow-sm">
                <Image
                  alt="Manos costurando a máquina en taller"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOK8UY5TesvxqjgC-Hwzg1ChKEulzHNqCG0kzVs_ttKJCHxUqdEdMLD9L6yLQY_4CZ3SpSURhaA-teMGZlRDHSf54LpLg09zvPPvI3G17Qv2B3ha0XpAczn8Z9ePBV_aU1qq0iOLby22hSdzlVYdDOHJJ79fZECSwenAOvf12ZViI69T3CxsPQ1PlsKOShnHhZk4WRDodUOsCknVFOqWsxCcv4SUiMv-8Wl0u-q-p2XxtTP3wMOohB9ndCnWWERpi7f7fa4dO2RR3"
                  fill
                  sizes="42vw"
                  priority
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#143067]/20 to-transparent" />
              </div>
            </div>

            {/* Right: Content Column */}
            <div className="flex w-full flex-col space-y-6 lg:flex-1">
              <div className="inline-flex items-center gap-3">
                <div className="bg-secondary h-6 w-1 rounded-full" />
                <span className="text-secondary font-sans text-xs font-semibold tracking-widest uppercase">
                  Servicio
                </span>
              </div>
              <h1 className="text-primary font-serif text-[32px] leading-tight font-bold md:text-[48px]">
                Servicio de Solo Mano de Obra
              </h1>

              {/* Mobile Image (Visible on mobile, aspect-video) */}
              <div className="relative mb-6 w-full lg:hidden">
                <div className="border-primary/12 relative aspect-video w-full overflow-hidden rounded-xl border shadow-sm">
                  <Image
                    alt="Manos costurando a máquina en taller"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIOK8UY5TesvxqjgC-Hwzg1ChKEulzHNqCG0kzVs_ttKJCHxUqdEdMLD9L6yLQY_4CZ3SpSURhaA-teMGZlRDHSf54LpLg09zvPPvI3G17Qv2B3ha0XpAczn8Z9ePBV_aU1qq0iOLby22hSdzlVYdDOHJJ79fZECSwenAOvf12ZViI69T3CxsPQ1PlsKOShnHhZk4WRDodUOsCknVFOqWsxCcv4SUiMv-8Wl0u-q-p2XxtTP3wMOohB9ndCnWWERpi7f7fa4dO2RR3"
                    fill
                    sizes="(max-width: 1024px) 100vw, 0"
                    priority
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#143067]/20 to-transparent" />
                </div>
              </div>

              <p className="text-on-surface-variant max-w-prose font-sans text-lg leading-relaxed">
                Tú pones la tela, nosotros ponemos el talento. Trae tu material
                y confeccionamos tu prenda cobrando exclusivamente la mano de
                obra.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="bg-surface-container-low text-primary border-primary/5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase shadow-sm">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">
                    savings
                  </span>
                  Súper económico
                </span>
                <span className="bg-surface-container-low text-primary border-primary/5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase shadow-sm">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">
                    design_services
                  </span>
                  Tus propios diseños
                </span>
                <span className="bg-surface-container-low text-primary border-primary/5 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase shadow-sm">
                  <span className="material-symbols-outlined text-tertiary text-[16px]">
                    checkroom
                  </span>
                  Aceptamos toda tela
                </span>
              </div>
              <div className="pt-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary/12 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg border bg-[#143067] px-8 py-4 font-sans text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#143067]/90 sm:w-auto"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    chat
                  </span>
                  Cotizar costura
                </a>
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
