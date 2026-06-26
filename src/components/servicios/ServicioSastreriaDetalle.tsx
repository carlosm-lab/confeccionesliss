"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
        {/* Breadcrumb */}
        <div className="mx-auto max-w-screen-2xl px-5 py-4 md:px-8">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Servicios", href: "/servicios" },
              {
                label: "Confección a la Medida",
                href: "/servicios/confeccion-a-medida",
              },
            ]}
          />
        </div>

        {/* Hero Section */}
        <section className="w-full px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-14">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-8 lg:flex-row lg:gap-16">
            {/* Left side content */}
            <div className="flex w-full flex-col items-start lg:flex-1">
              <div className="mb-6 flex items-center gap-4">
                <span className="bg-secondary h-6 w-1"></span>
                <span className="text-on-surface-variant font-sans text-xs font-semibold tracking-widest uppercase">
                  SERVICIO
                </span>
              </div>
              <h1 className="text-primary mb-6 font-serif text-[32px] leading-tight font-bold md:text-[48px]">
                Confección y Sastrería a la Medida
              </h1>

              {/* Mobile Image (Visible on mobile, aspect-[4/3]) */}
              <div className="relative mb-6 w-full lg:hidden">
                <div className="bg-primary/5 absolute inset-0 -z-10 -m-2 rounded-t-2xl rounded-b-lg" />
                <div className="border-primary/10 relative aspect-[4/3] w-full overflow-hidden rounded-t-2xl rounded-b-lg border shadow-md">
                  <Image
                    alt="Medición y sastrería profesional"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqWKImQOmvghJ9sTWz-PPSR-X6p3OJFCZ7SQy2ujL63JLQJhDVp_ao4QQikgLRZ9UI4MBKUWjF09De_7XStyh4MfrvbLSO9lR3mO9ZINHCrHZu7r-UaAxfdatm6nJFfqeFHw0jVB3VqlyVzFBV56Dt_axkoPyM-dwx8aeG4bC5j5giSjFqtHuvigtbJxcul23soXhglEB-BqZRJ5VOrMsxKpbhP_Hq1F99zIo3yEF_yl6wDObNg_q1c_H8XyUlyhl2hXyVSK4jCPfq"
                    fill
                    sizes="(max-width: 1024px) 100vw, 0"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>

              <p className="text-on-surface-variant mb-8 max-w-lg font-sans text-lg leading-relaxed">
                Olvídate de uniformes estándar que no te favorecen. Tomamos más
                de 12 medidas anatómicas para crear una prenda que se adapta
                perfectamente a tu cuerpo.
              </p>
              <div className="mb-10 flex flex-wrap gap-3">
                <span className="text-on-surface-variant border-primary/10 rounded-full border bg-[#F0F2F5] px-4 py-2 font-sans text-xs font-semibold tracking-wider uppercase">
                  Tallas inclusivas
                </span>
                <span className="text-on-surface-variant border-primary/10 rounded-full border bg-[#F0F2F5] px-4 py-2 font-sans text-xs font-semibold tracking-wider uppercase">
                  Entalle perfecto
                </span>
                <span className="text-on-surface-variant border-primary/10 rounded-full border bg-[#F0F2F5] px-4 py-2 font-sans text-xs font-semibold tracking-wider uppercase">
                  Realza tu figura
                </span>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary inline-flex cursor-pointer items-center gap-2 rounded-lg px-6 py-3 font-sans text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  aria-hidden="true"
                >
                  chat
                </span>
                Agendar visita al taller
              </a>
            </div>

            {/* Desktop Image (Right on desktop, hidden on mobile) */}
            <div className="relative hidden w-full lg:block lg:w-[42%] lg:shrink-0">
              <div className="bg-primary/5 absolute inset-0 -z-10 -m-4 rounded-t-2xl rounded-b-lg" />
              <div className="border-primary/10 relative aspect-[4/5] w-full overflow-hidden rounded-t-2xl rounded-b-lg border shadow-md">
                <Image
                  alt="Medición y sastrería profesional"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqWKImQOmvghJ9sTWz-PPSR-X6p3OJFCZ7SQy2ujL63JLQJhDVp_ao4QQikgLRZ9UI4MBKUWjF09De_7XStyh4MfrvbLSO9lR3mO9ZINHCrHZu7r-UaAxfdatm6nJFfqeFHw0jVB3VqlyVzFBV56Dt_axkoPyM-dwx8aeG4bC5j5giSjFqtHuvigtbJxcul23soXhglEB-BqZRJ5VOrMsxKpbhP_Hq1F99zIo3yEF_yl6wDObNg_q1c_H8XyUlyhl2hXyVSK4jCPfq"
                  fill
                  sizes="42vw"
                  priority
                  className="object-cover"
                />
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
