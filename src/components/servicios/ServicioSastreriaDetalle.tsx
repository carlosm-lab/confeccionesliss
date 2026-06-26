"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { heroTrustBadges } from "@/lib/seo-data";

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

export function ServicioSastreriaDetalle() {
  const whatsappUrl = siteConfig.links.whatsappDirect;

  return (
    <div className="min-h-screen w-full" style={pageGridTextureStyle}>
      <div className="w-full">
        {/* ── HERO HOME TEMPLATE ── */}
        <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
          <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
              <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-[32px] leading-tight font-bold md:mb-10 md:flex md:flex-col md:items-center md:text-[48px] lg:mb-6 lg:block lg:text-left">
                <span className="block w-full text-center lg:text-left">
                  Confección y Sastrería a la Medida
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
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqWKImQOmvghJ9sTWz-PPSR-X6p3OJFCZ7SQy2ujL63JLQJhDVp_ao4QQikgLRZ9UI4MBKUWjF09De_7XStyh4MfrvbLSO9lR3mO9ZINHCrHZu7r-UaAxfdatm6nJFfqeFHw0jVB3VqlyVzFBV56Dt_axkoPyM-dwx8aeG4bC5j5giSjFqtHuvigtbJxcul23soXhglEB-BqZRJ5VOrMsxKpbhP_Hq1F99zIo3yEF_yl6wDObNg_q1c_H8XyUlyhl2hXyVSK4jCPfq"
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
                    Olvídate de uniformes estándar que no te favorecen. Tomamos
                    más de 12 medidas anatómicas para crear una prenda que se
                    adapta perfectamente a tu cuerpo.
                  </p>
                  <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2">
                    {[
                      { icon: "accessibility_new", text: "Tallas inclusivas" },
                      { icon: "checkroom", text: "Entalle perfecto" },
                      { icon: "auto_fix_high", text: "Realza tu figura" },
                      { icon: "content_cut", text: "Hecho a la medida" },
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
                    alt="Medición y sastrería profesional"
                    className="rounded-xl object-cover object-center"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqWKImQOmvghJ9sTWz-PPSR-X6p3OJFCZ7SQy2ujL63JLQJhDVp_ao4QQikgLRZ9UI4MBKUWjF09De_7XStyh4MfrvbLSO9lR3mO9ZINHCrHZu7r-UaAxfdatm6nJFfqeFHw0jVB3VqlyVzFBV56Dt_axkoPyM-dwx8aeG4bC5j5giSjFqtHuvigtbJxcul23soXhglEB-BqZRJ5VOrMsxKpbhP_Hq1F99zIo3yEF_yl6wDObNg_q1c_H8XyUlyhl2hXyVSK4jCPfq"
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

        {/* Inclusive Sizing */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="bg-surface-container-low border-primary/10 rounded-xl border p-12 text-center shadow-sm">
              <h2 className="text-primary mb-6 font-serif text-2xl font-bold md:text-3xl">
                Sin importar tu talla
              </h2>
              <p className="text-on-surface-variant mx-auto mb-10 max-w-2xl font-sans text-lg leading-relaxed">
                Creemos que la ropa debe adaptarse a ti, no al revés. Trabajamos
                con todo tipo de cuerpos, desde petite hasta plus size,
                asegurando comodidad y estilo en cada prenda.
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
                {["XL", "2XL", "3XL+"].map((size) => (
                  <span
                    key={size}
                    className="text-on-surface-variant border-primary/10 flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 md:grid-cols-2">
            {/* Article A */}
            <div className="space-y-4">
              <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                ¿Por qué elegir confección a la medida?
              </h3>
              <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                La ropa a medida no solo se ve mejor, sino que dura más. Al
                invertir en una prenda hecha para ti, garantizas calidad en los
                materiales y un ajuste que realza tu figura, proyectando una
                imagen profesional impecable.
              </p>
            </div>

            {/* Article B */}
            <div className="space-y-6">
              <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                Nuestro proceso de toma de medidas
              </h3>
              <div className="flex items-center gap-4 text-center">
                <div className="border-primary/10 flex-1 rounded-lg border bg-white p-4 shadow-sm">
                  <span
                    className="material-symbols-outlined text-primary mb-2 text-[28px]"
                    aria-hidden="true"
                  >
                    calendar_today
                  </span>
                  <div className="text-on-surface font-sans text-xs font-semibold tracking-wider uppercase">
                    Visita
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-secondary"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
                <div className="border-primary/10 flex-1 rounded-lg border bg-white p-4 shadow-sm">
                  <span
                    className="material-symbols-outlined text-primary mb-2 text-[28px]"
                    aria-hidden="true"
                  >
                    straighten
                  </span>
                  <div className="text-on-surface font-sans text-xs font-semibold tracking-wider uppercase">
                    Medición
                  </div>
                </div>
                <span
                  className="material-symbols-outlined text-secondary"
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
                <div className="border-primary/10 flex-1 rounded-lg border bg-white p-4 shadow-sm">
                  <span
                    className="material-symbols-outlined text-primary mb-2 text-[28px]"
                    aria-hidden="true"
                  >
                    cut
                  </span>
                  <div className="text-on-surface font-sans text-xs font-semibold tracking-wider uppercase">
                    Confección
                  </div>
                </div>
              </div>
            </div>

            {/* Article C */}
            <div className="space-y-4">
              <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                Tallas inclusivas: Plus size y petite
              </h3>
              <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                Entendemos los retos de encontrar ropa profesional adecuada en
                el mercado masivo. Nuestra sastrería resuelve problemas comunes
                como mangas largas, entalles incómodos o largos inadecuados.
              </p>
            </div>

            {/* Article D */}
            <div className="space-y-4">
              <h3 className="text-primary font-serif text-xl font-bold md:text-2xl">
                ¿Qué tipo de prendas confeccionamos?
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Scrubs",
                  "Batas",
                  "Uniformes",
                  "Vestidos",
                  "Camisas",
                  "Gabachas",
                  "Faldas",
                  "Pantalones",
                ].map((prenda) => (
                  <span
                    key={prenda}
                    className="text-on-surface border-primary/10 rounded border bg-white px-3 py-1.5 font-sans text-xs font-semibold tracking-wider uppercase shadow-sm"
                  >
                    {prenda}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <h2 className="text-primary mb-10 text-center font-serif text-2xl font-bold md:text-3xl">
              Preguntas Frecuentes
            </h2>
            <div className="mx-auto max-w-3xl space-y-4">
              <FAQItem
                question="¿Cuánto tarda la confección a medida?"
                answer="El tiempo de entrega estándar es de 2 a 3 semanas tras la toma de medidas, dependiendo de la complejidad de la prenda y nuestra carga de trabajo actual."
              />
              <FAQItem
                question="¿Tengo que ir al taller para las medidas?"
                answer="Sí, recomendamos visitar nuestro taller para una medición precisa. Sin embargo, para clientes corporativos o grupos grandes, podemos organizar visitas a sus instalaciones."
              />
              <FAQItem
                question="¿Cuesta más que la ropa de talla estándar?"
                answer="La confección a medida es una inversión en calidad y ajuste. Aunque la inversión inicial puede ser ligeramente superior a las opciones genéricas de baja calidad, la durabilidad y el entalle perfecto compensan con creces el costo."
              />
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto max-w-screen-2xl">
            <div className="border-primary/20 relative overflow-hidden rounded-2xl border bg-[#143067] p-12 text-center shadow-lg">
              <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={ctaBannerTextureStyle}
              />
              <div className="relative z-10">
                <h2 className="mx-auto mb-8 max-w-2xl font-serif text-2xl leading-tight font-bold text-white md:text-[36px]">
                  Haz tu cita para toma de medidas
                </h2>
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
                  Contactar vía WhatsApp
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
