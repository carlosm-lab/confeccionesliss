"use client";

import { useState } from "react";
import Image from "next/image";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
      {/* Breadcrumb */}
      <div className="mx-auto max-w-screen-2xl px-5 py-4 md:px-8">
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Servicios", href: "/servicios" },
            { label: "Sublimación", href: "/servicios/sublimacion-deportiva" },
          ]}
        />
      </div>

      {/* ── HERO ── */}
      <section className="w-full px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-14">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col items-center gap-8 lg:flex-row lg:gap-16">
          {/* Desktop Image (Left on desktop, hidden on mobile) */}
          <div className="hidden w-full lg:block lg:w-[42%] lg:shrink-0">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[16px]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNzJF5IzFnwusc6jtqateTbIc--otqFEfsklVo_8Xei5-kdJ3mLBZ_qLys7bfIWvFXb3e4_1Sk_TUFuY5fit9zyhp3vA7caH7WozRMxPeFZ0tXIu24See7ZoqLnYBi1U0SIZO7hq14ivadINWG2sEn2CE-la0R5IMiad57i0CuHnZL2Y9gMn9uNfgeBYF-2wYieiB43CYKmGOsoCNSFjEcHRJACpVWLyj8W3_VQs9-k651kMJ69PQtggPzo1MXYRFV8lE3Kn-PtRxo"
                alt="Jerseys deportivos sublimados"
                fill
                sizes="42vw"
                priority
                className="border-primary/12 rounded-[16px] border object-cover shadow-sm"
              />
            </div>
          </div>

          {/* Text/Content Column */}
          <div className="flex w-full flex-col justify-center lg:flex-1">
            <div className="mb-6 inline-flex items-center gap-3">
              <div className="bg-secondary h-4 w-1"></div>
              <span className="text-on-surface-variant font-sans text-xs font-semibold tracking-wider uppercase">
                SERVICIO
              </span>
            </div>
            <h1 className="text-primary mb-6 font-serif text-[28px] leading-tight font-bold md:text-[48px]">
              Sublimación Textil Full Color
            </h1>

            {/* Mobile Image (Visible on mobile, aspect-[4/3]) */}
            <div className="relative mb-6 w-full lg:hidden">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[16px]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNzJF5IzFnwusc6jtqateTbIc--otqFEfsklVo_8Xei5-kdJ3mLBZ_qLys7bfIWvFXb3e4_1Sk_TUFuY5fit9zyhp3vA7caH7WozRMxPeFZ0tXIu24See7ZoqLnYBi1U0SIZO7hq14ivadINWG2sEn2CE-la0R5IMiad57i0CuHnZL2Y9gMn9uNfgeBYF-2wYieiB43CYKmGOsoCNSFjEcHRJACpVWLyj8W3_VQs9-k651kMJ69PQtggPzo1MXYRFV8lE3Kn-PtRxo"
                  alt="Jerseys deportivos sublimados"
                  fill
                  sizes="(max-width: 1024px) 100vw, 0"
                  priority
                  className="border-primary/12 rounded-[16px] border object-cover shadow-sm"
                />
              </div>
            </div>

            <p className="text-on-surface-variant mb-8 max-w-xl font-sans text-lg leading-relaxed">
              Impresión textil mediante calor para prendas deportivas. Tinta
              permanente que se funde con la fibra y nunca se cuartea ni pierde
              color.
            </p>
            <div className="mb-10 flex flex-wrap gap-3">
              <span className="bg-surface-container-low border-primary/12 text-primary inline-flex items-center rounded-full border px-4 py-2 font-sans text-sm font-medium">
                <span className="material-symbols-outlined text-secondary mr-2 text-[16px]">
                  palette
                </span>
                Colores vibrantes
              </span>
              <span className="bg-surface-container-low border-primary/12 text-primary inline-flex items-center rounded-full border px-4 py-2 font-sans text-sm font-medium">
                <span className="material-symbols-outlined text-secondary mr-2 text-[16px]">
                  water_drop
                </span>
                No se decolora
              </span>
              <span className="bg-surface-container-low border-primary/12 text-primary inline-flex items-center rounded-full border px-4 py-2 font-sans text-sm font-medium">
                <span className="material-symbols-outlined text-secondary mr-2 text-[16px]">
                  touch_app
                </span>
                Textura invisible
              </span>
            </div>
            <div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/95 inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg px-8 py-4 font-sans text-base font-semibold text-white shadow-md transition-all duration-300 hover:shadow-lg"
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  chat
                </span>
                Cotizar sublimación
              </a>
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
                  <div className="bg-surface-container-low border-primary/12 text-primary flex h-12 w-12 items-center justify-center rounded-full border">
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
