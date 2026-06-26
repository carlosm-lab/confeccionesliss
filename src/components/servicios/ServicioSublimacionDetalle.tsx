"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { heroTrustBadges } from "@/lib/seo-data";

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

export function ServicioSublimacionDetalle() {
  const whatsappUrl = siteConfig.links.whatsappDirect;

  return (
    <div className="w-full">
      {/* ── HERO HOME TEMPLATE ── */}
      <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
        <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row-reverse lg:items-center lg:gap-16">
          <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
            <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-[28px] leading-tight font-bold md:mb-10 md:flex md:flex-col md:items-center md:text-[48px] lg:mb-6 lg:block lg:text-left">
              <span className="block w-full text-center lg:text-left">
                Sublimación Textil Full Color
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
                      alt="Jerseys deportivos sublimados"
                      className="rounded-xl object-cover object-center"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNzJF5IzFnwusc6jtqateTbIc--otqFEfsklVo_8Xei5-kdJ3mLBZ_qLys7bfIWvFXb3e4_1Sk_TUFuY5fit9zyhp3vA7caH7WozRMxPeFZ0tXIu24See7ZoqLnYBi1U0SIZO7hq14ivadINWG2sEn2CE-la0R5IMiad57i0CuHnZL2Y9gMn9uNfgeBYF-2wYieiB43CYKmGOsoCNSFjEcHRJACpVWLyj8W3_VQs9-k651kMJ69PQtggPzo1MXYRFV8lE3Kn-PtRxo"
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
                  Impresión textil mediante calor para prendas deportivas. Tinta
                  permanente que se funde con la fibra y nunca se cuartea ni
                  pierde color.
                </p>
                <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2">
                  {[
                    { icon: "palette", text: "Colores vibrantes" },
                    { icon: "water_drop", text: "No se decolora" },
                    { icon: "touch_app", text: "Textura invisible" },
                    { icon: "verified", text: "Alta resolución" },
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
                  alt="Jerseys deportivos sublimados"
                  className="rounded-xl object-cover object-center"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNzJF5IzFnwusc6jtqateTbIc--otqFEfsklVo_8Xei5-kdJ3mLBZ_qLys7bfIWvFXb3e4_1Sk_TUFuY5fit9zyhp3vA7caH7WozRMxPeFZ0tXIu24See7ZoqLnYBi1U0SIZO7hq14ivadINWG2sEn2CE-la0R5IMiad57i0CuHnZL2Y9gMn9uNfgeBYF-2wYieiB43CYKmGOsoCNSFjEcHRJACpVWLyj8W3_VQs9-k651kMJ69PQtggPzo1MXYRFV8lE3Kn-PtRxo"
                  sizes="40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Editorial Blocks */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
            {/* Main Content Column */}
            <div className="space-y-16 md:col-span-7">
              {/* What is it? */}
              <div className="space-y-6">
                <div className="mb-4 flex items-center gap-4">
                  <div className="border-primary/12 text-primary flex h-12 w-12 items-center justify-center rounded-full border bg-white">
                    <span className="material-symbols-outlined">layers</span>
                  </div>
                  <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                    ¿Qué es la sublimación textil?
                  </h2>
                </div>
                <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                  Es un proceso físico mediante el cual la tinta pasa de estado
                  sólido a gaseoso mediante la aplicación de altas temperaturas
                  (alrededor de 200°C), penetrando directamente en las fibras de
                  poliéster de la tela. A diferencia de otras técnicas, la tinta
                  no queda sobre la superficie, sino que forma parte estructural
                  del tejido.
                </p>
              </div>

              {/* Ideal for */}
              <div className="border-primary/12 space-y-6 rounded-2xl border bg-white p-8 shadow-sm">
                <h3 className="text-primary mb-2 font-serif text-xl font-bold md:text-2xl">
                  ¿Para qué tipo de prendas es ideal?
                </h3>
                <p className="text-on-surface-variant mb-6 font-sans text-base leading-relaxed">
                  La sublimación requiere un alto porcentaje de poliéster para
                  que la tinta se fije correctamente. Es la técnica por
                  excelencia para ropa deportiva, uniformes de alto rendimiento
                  y prendas técnicas.
                </p>
                <div className="space-y-2">
                  <div className="text-on-surface-variant mb-1 flex justify-between font-sans text-xs font-semibold tracking-wider uppercase">
                    <span>Poliéster requerido</span>
                    <span>100% Ideal</span>
                  </div>
                  <div className="bg-surface-container-low flex h-3 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-tertiary/20 h-full w-1/4"
                      title="No recomendado (0-40%)"
                    />
                    <div
                      className="bg-secondary/60 h-full w-[35%]"
                      title="Aceptable, colores opacos (40-75%)"
                    />
                    <div
                      className="bg-primary h-full w-[40%]"
                      title="Ideal, colores vibrantes (75-100%)"
                    />
                  </div>
                  <div className="text-outline mt-1 flex justify-between font-sans text-[10px] font-semibold tracking-wider uppercase">
                    <span>0%</span>
                    <span>75% Mínimo recomendado</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Column (Comparison Card) */}
            <div className="relative md:col-span-5">
              <div className="border-primary/12 sticky top-[100px] overflow-hidden rounded-2xl border bg-white shadow-[0_8px_24px_rgba(20,48,103,0.04)]">
                {/* Card Header */}
                <div className="border-primary/12 grid grid-cols-2 border-b">
                  <div className="bg-primary/5 border-primary/12 border-r p-4 text-center">
                    <span className="text-primary flex items-center justify-center gap-2 font-sans text-sm font-bold">
                      Sublimación{" "}
                      <span
                        className="material-symbols-outlined text-[18px] font-bold text-green-600"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    </span>
                  </div>
                  <div className="bg-surface-container-lowest p-4 text-center">
                    <span className="text-on-surface-variant flex items-center justify-center gap-2 font-sans text-sm font-bold">
                      Tradicional{" "}
                      <span
                        className="material-symbols-outlined text-tertiary text-[18px] font-bold"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        cancel
                      </span>
                    </span>
                  </div>
                </div>
                {/* Card Body (Rows) */}
                <div className="divide-primary/5 divide-y">
                  {/* Row 1 */}
                  <div className="grid grid-cols-1 gap-2 p-4">
                    <div className="text-outline mb-1 text-center font-sans text-[10px] font-semibold tracking-wider uppercase">
                      Permanencia del color
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-primary text-center text-sm font-bold">
                        Eterna (se funde con la tela)
                      </div>
                      <div className="text-on-surface-variant text-center text-sm">
                        Se desgasta y cuartea
                      </div>
                    </div>
                  </div>
                  {/* Row 2 */}
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
                  {/* Row 3 */}
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
                  {/* Row 4 */}
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
            </div>
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="border-primary/5 relative overflow-hidden border-y bg-white px-5 py-14 md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.03]"
          style={dotTextureStyle}
        />
        <div className="relative z-10 mx-auto max-w-screen-2xl">
          <div className="mb-12 text-center">
            <h2 className="text-primary mb-4 font-serif text-2xl font-bold md:text-3xl">
              Nuestro proceso de sublimación
            </h2>
            <p className="text-on-surface-variant mx-auto max-w-2xl font-sans text-base">
              Precisión técnica en cada paso para garantizar acabados impecables
              y duraderos.
            </p>
          </div>
          <div className="relative flex flex-col items-center justify-between gap-6 md:flex-row md:gap-4">
            {/* Connector Line (Desktop) */}
            <div className="bg-primary/12 absolute top-1/2 right-[12.5%] left-[12.5%] z-0 hidden h-[1px] -translate-y-1/2 md:block" />

            {/* Step 1 */}
            <div className="border-primary/12 relative z-10 flex w-full flex-col items-center rounded-xl border bg-white p-6 shadow-sm md:w-1/4 md:border-none md:shadow-none">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-white shadow-md">
                <span className="material-symbols-outlined text-[28px]">
                  design_services
                </span>
              </div>
              <h4 className="text-primary mb-2 font-serif text-lg font-bold">
                1. Diseño
              </h4>
              <p className="text-on-surface-variant text-center text-sm">
                Preparación digital del arte en alta resolución.
              </p>
              <span className="material-symbols-outlined text-secondary mt-4 md:hidden">
                arrow_downward
              </span>
            </div>

            {/* Arrow Desktop */}
            <div className="text-secondary border-primary/5 relative z-10 hidden rounded-full border bg-white p-1 shadow-sm md:flex">
              <span className="material-symbols-outlined text-[24px]">
                arrow_forward
              </span>
            </div>

            {/* Step 2 */}
            <div className="border-primary/12 relative z-10 flex w-full flex-col items-center rounded-xl border bg-white p-6 shadow-sm md:w-1/4 md:border-none md:shadow-none">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-white shadow-md">
                <span className="material-symbols-outlined text-[28px]">
                  print
                </span>
              </div>
              <h4 className="text-primary mb-2 font-serif text-lg font-bold">
                2. Impresión
              </h4>
              <p className="text-on-surface-variant text-center text-sm">
                Ploteo con tintas especiales sobre papel transfer.
              </p>
              <span className="material-symbols-outlined text-secondary mt-4 md:hidden">
                arrow_downward
              </span>
            </div>

            {/* Arrow Desktop */}
            <div className="text-secondary border-primary/5 relative z-10 hidden rounded-full border bg-white p-1 shadow-sm md:flex">
              <span className="material-symbols-outlined text-[24px]">
                arrow_forward
              </span>
            </div>

            {/* Step 3 */}
            <div className="border-primary/12 relative z-10 flex w-full flex-col items-center rounded-xl border bg-white p-6 shadow-sm md:w-1/4 md:border-none md:shadow-none">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-white shadow-md">
                <span className="material-symbols-outlined text-[28px]">
                  heat_pump
                </span>
              </div>
              <h4 className="text-primary mb-2 font-serif text-lg font-bold">
                3. Prensado
              </h4>
              <p className="text-on-surface-variant text-center text-sm">
                Transferencia térmica a 200°C con presión uniforme.
              </p>
              <span className="material-symbols-outlined text-secondary mt-4 md:hidden">
                arrow_downward
              </span>
            </div>

            {/* Arrow Desktop */}
            <div className="text-secondary border-primary/5 relative z-10 hidden rounded-full border bg-white p-1 shadow-sm md:flex">
              <span className="material-symbols-outlined text-[24px]">
                arrow_forward
              </span>
            </div>

            {/* Step 4 */}
            <div className="border-primary/12 relative z-10 flex w-full flex-col items-center rounded-xl border bg-white p-6 shadow-sm md:w-1/4 md:border-none md:shadow-none">
              <div className="bg-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-white text-white shadow-md">
                <span className="material-symbols-outlined text-[28px]">
                  checkroom
                </span>
              </div>
              <h4 className="text-primary mb-2 font-serif text-lg font-bold">
                4. Terminado
              </h4>
              <p className="text-on-surface-variant text-center text-sm">
                Enfriamiento y control de calidad de la prenda.
              </p>
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
              question="¿Se puede sublimar sobre algodón?"
              answer="No. La tinta de sublimación solo reacciona y se fija en polímeros (plásticos). Si se aplica sobre 100% algodón, la tinta se caerá con la primera lavada. Recomendamos prendas con al menos 75% de poliéster para resultados vibrantes y duraderos."
            />
            <FAQItem
              question="¿Se decolora con el lavado?"
              answer="No. Al convertirse en un gas durante el prensado, la tinta penetra en la estructura de la fibra del poliéster. Esto significa que el diseño es tan duradero como la prenda misma; no se cuarteará, pelará ni desvanecerá con los lavados normales."
            />
            <FAQItem
              question="¿Cuántas prendas mínimo puedo pedir?"
              answer="Gracias a nuestra tecnología digital, podemos realizar trabajos desde una sola prenda. Sin embargo, ofrecemos precios preferenciales para pedidos por volumen, ideales para equipos deportivos o empresas."
            />
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative flex min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl bg-[#143067] p-10 text-center shadow-lg md:p-16">
            {/* Texture overlay */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.05]"
              style={BORDADOS_CTA_TEXTURE}
            />
            <div className="relative z-10 max-w-2xl">
              <h2 className="mb-6 font-serif text-2xl font-bold text-white md:text-3xl">
                ¿Tienes un diseño llamativo en mente?
              </h2>
              <p className="mb-8 font-sans text-lg leading-relaxed text-white/80">
                Hazlo realidad con la mejor técnica de impresión para prendas de
                alto rendimiento. Cotiza sin compromiso.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 font-sans text-base font-bold text-[#143067] shadow-sm transition-colors duration-300 hover:bg-white/90"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  chat
                </span>
                Escribir al WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
