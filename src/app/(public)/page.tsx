import Image from "next/image";
import { schemaLocalBusiness, schemaFAQ } from "@/lib/schemas";
import {
  heroTrustBadges,
  whyItems,
  processSteps,
  testimonials,
} from "@/lib/seo-data";
import { ServiciosPrincipales } from "@/components/seo/ServiciosPrincipales";
import { UniversidadesCoverage } from "@/components/seo/UniversidadesCoverage";
import { FaqSection } from "@/components/seo/FaqSection";
import { CoberturaNacional } from "@/components/seo/CoberturaNacional";
import { ProfesionesMedicas } from "@/components/seo/ProfesionesMedicas";
import { NapContacto } from "@/components/seo/NapContacto";
import { KeywordsSeoFooter } from "@/components/seo/KeywordsSeoFooter";
import { ProductCard } from "@/components/ui/ProductCard";

export default function HomePage() {
  return (
    <>
      {/* ═══ JSON-LD STRUCTURED DATA ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaLocalBusiness).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaFAQ).replace(/</g, "\\u003c"),
        }}
      />

      {/* ═══ HERO ═══ */}
      <section className="bg-surface-container-low relative overflow-hidden px-5 pt-5 pb-14 md:px-8 lg:pb-28">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-16 lg:flex-row lg:pr-24 lg:pl-12">
          <div className="z-10 flex w-full flex-col items-start lg:w-[55%]">
            <div className="bg-tertiary/10 text-tertiary mb-4 flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase lg:mb-6">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              Confección profesional a la medida
            </div>
            <h1 className="text-primary mb-4 font-serif text-[2rem] leading-[1.15] tracking-tight md:text-5xl lg:mb-6 lg:text-7xl lg:leading-[1.1]">
              Scrubs y Uniformes
              <br className="hidden lg:inline" /> a la Medida{" "}
              <br className="hidden lg:inline" />
              <span className="text-secondary">en San Miguel</span>
            </h1>
            <p className="text-on-surface-variant font-body mb-6 max-w-lg text-base leading-relaxed md:text-lg lg:mb-8 lg:text-xl">
              Confección profesional de scrubs médicos en tela Sincatex y Lino
              Oxford. Uniformes para UNIVO, UNAB, UGB, colegios y empresas.
              Bordados, sublimación y envío a todo El Salvador.{" "}
              <strong>Desde $35 USD.</strong>
            </p>
            <div className="mb-10 grid grid-cols-2 gap-x-4 gap-y-3 md:flex md:flex-wrap md:gap-4">
              {heroTrustBadges.map((b) => (
                <div
                  key={b.text}
                  className="text-secondary flex items-center gap-2 text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-primary">
                    {b.icon}
                  </span>
                  {b.text}
                </div>
              ))}
            </div>
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
              <a
                href="https://confeccionesliss.axkar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient font-body ambient-shadow flex-1 rounded-md py-4 text-center font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90"
              >
                Comprar
              </a>
              <a
                href="https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="border-outline text-primary hover:bg-surface-variant/50 flex-1 rounded-md border bg-transparent py-4 text-center font-serif font-medium whitespace-nowrap transition-colors"
              >
                Cómo llegar
              </a>
            </div>
          </div>
          <div className="relative w-full lg:w-[45%]">
            <div className="bg-primary-container absolute inset-0 translate-x-6 translate-y-6 transform rounded-tr-[100px] rounded-bl-[100px] opacity-20" />
            <div className="ambient-shadow bg-surface-container-highest relative z-10 aspect-[4/5] overflow-hidden rounded-tl-xl rounded-br-xl">
              <Image
                width={800}
                height={800}
                alt="Scrubs médicos a la medida confeccionados en San Miguel El Salvador por Confecciones Liss"
                className="h-full w-full object-contain object-center"
                src="/images/uniformes/portada.webp"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NOVEDADES (using shared ProductCard) ═══ */}
      <section className="bg-surface px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between lg:pr-12">
            <h2 className="text-primary font-serif text-4xl">
              Novedades en Uniformes y Scrubs
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 md:gap-8 lg:grid-cols-4">
            {[
              {
                id: "scrub-ues",
                categoria: "UES",
                nombre: "Uniformes de la UES",
                precio: 39.5,
                tallas: ["S", "M", "L", "XL", "XXL"],
                imagen: "/images/uniformes/ues.webp",
                showBadge: true,
                badgeText: "Nuevo",
              },
              {
                id: "scrub-ieproes",
                categoria: "IEPROES",
                nombre: "Uniformes de IEPROES",
                precio: 39.5,
                tallas: ["S", "M", "L", "XL", "XXL"],
                imagen: "/images/uniformes/ieproes.webp",
                showBadge: true,
                badgeText: "Nuevo",
              },
              {
                id: "scrub-ugb",
                categoria: "UGB",
                nombre: "Uniformes de la UGB",
                precio: 39.5,
                tallas: ["S", "M", "L", "XL", "XXL"],
                imagen: "/images/uniformes/ugb.webp",
                showBadge: true,
                badgeText: "Nuevo",
              },
              {
                id: "scrub-uma",
                categoria: "UMA",
                nombre: "Uniformes de la UMA",
                precio: 39.5,
                tallas: ["S", "M", "L", "XL", "XXL"],
                imagen: "/images/uniformes/uma.webp",
                showBadge: true,
                badgeText: "Nuevo",
              },
              {
                id: "scrub-unab",
                categoria: "UNAB",
                nombre: "Uniformes de la UNAB",
                precio: 39.5,
                tallas: ["S", "M", "L", "XL", "XXL"],
                imagen: "/images/uniformes/unab.webp",
                showBadge: true,
                badgeText: "Nuevo",
              },
              {
                id: "scrub-univo",
                categoria: "UNIVO",
                nombre: "Uniformes de la UNIVO",
                precio: 39.5,
                tallas: ["S", "M", "L", "XL", "XXL"],
                imagen: "/images/uniformes/univo.webp",
                showBadge: true,
                badgeText: "Nuevo",
              },
            ].map((p) => (
              <ProductCard
                key={p.id}
                id={p.id}
                sector="universitario"
                nombre={p.nombre}
                precio={p.precio}
                categoria={p.categoria}
                imagen={p.imagen}
                tallas={p.tallas}
                showBadge={p.showBadge}
                badgeText={p.badgeText}
                showFavorite
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICIOS PRINCIPALES (NEW) ═══ */}
      <ServiciosPrincipales />

      {/* ═══ ¿POR QUÉ ELEGIRNOS? (updated content) ═══ */}
      <section className="bg-surface-container-low border-surface-variant/50 border-t border-b px-5 py-14 md:px-8 md:py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="section-title">
              ¿Por qué elegir Confecciones Liss en San Miguel?
            </h2>
            <div className="bg-tertiary mt-6 h-1 w-16 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12 lg:grid-cols-4 lg:gap-8">
            {whyItems.map((w) => (
              <div
                key={w.title}
                className="flex flex-col items-start text-left md:items-center md:text-center"
              >
                <div className="bg-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white md:mb-6 md:h-16 md:w-16">
                  <span className="material-symbols-outlined text-3xl">
                    {w.icon}
                  </span>
                </div>
                <h3 className="text-primary mb-3 font-serif text-xl">
                  {w.title}
                </h3>
                <p className="text-on-surface-variant font-body text-sm">
                  {w.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ UNIVERSIDADES (NEW) ═══ */}
      <UniversidadesCoverage />

      {/* ═══ PROCESO DE PEDIDO (updated content) ═══ */}
      <section className="bg-primary px-5 py-14 text-white md:px-8 md:py-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="section-title mb-4 text-white">
              ¿Cómo pedir tus uniformes en Confecciones Liss?
            </h2>
            <div className="bg-primary-container mt-2 mb-6 h-1 w-16 rounded-full"></div>
            <p className="text-primary-container w-full text-left text-base leading-relaxed md:mx-auto md:text-center md:text-lg">
              Un proceso sencillo para que recibas tu uniforme perfecto sin
              complicaciones.
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
            <div className="bg-primary-container/30 absolute top-12 right-[10%] left-[10%] z-0 hidden h-0.5 md:block" />
            {processSteps.map((s) => (
              <div
                key={s.n}
                className="relative z-10 flex flex-row items-center gap-4 text-left md:flex-col md:gap-0 md:text-center"
              >
                <div className="text-primary ambient-shadow flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white font-serif text-2xl font-bold md:mb-6 md:h-24 md:w-24 md:text-3xl">
                  {s.n}
                </div>
                <div>
                  <h3 className="mb-1 font-serif text-xl md:mb-2">{s.title}</h3>
                  <p className="text-primary-container text-sm">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ (NEW) ═══ */}
      <FaqSection />

      {/* ═══ TESTIMONIOS (updated content) ═══ */}
      <section
        aria-labelledby="testimonios-heading"
        className="bg-[#f4f5f7] px-5 py-14 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex flex-col items-center">
            <h2 id="testimonios-heading" className="section-title">
              Lo que dicen nuestros clientes en San Miguel y todo El Salvador
            </h2>
            <div className="bg-tertiary mt-6 h-1 w-16 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <article
                key={t.nombre}
                className="ambient-shadow rounded-xl bg-white p-5 md:p-8"
              >
                <div
                  className="text-tertiary mb-4 flex gap-1"
                  aria-label={`${t.stars} estrellas`}
                >
                  {Array(t.stars)
                    .fill(null)
                    .map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                </div>
                <blockquote className="text-on-surface-variant font-body mb-6 text-sm leading-relaxed italic">
                  &quot;{t.texto}&quot;
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="bg-surface-container text-secondary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                    {t.nombre.charAt(0)}
                  </div>
                  <div>
                    <div className="text-on-surface font-serif text-sm font-bold">
                      {t.nombre}
                    </div>
                    <div className="text-secondary text-xs">{t.cargo}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ COBERTURA NACIONAL (NEW) ═══ */}
      <CoberturaNacional />

      {/* ═══ PROFESIONES MÉDICAS (NEW) ═══ */}
      <ProfesionesMedicas />

      {/* ═══ CTA INSTITUCIONAL (updated content) ═══ */}
      <section
        aria-labelledby="institucional-heading"
        className="bg-primary px-5 py-14 text-white md:px-8 md:py-20"
      >
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="md:w-2/3">
            <h2
              id="institucional-heading"
              className="mb-4 font-serif text-2xl leading-tight md:text-3xl lg:text-4xl"
            >
              ¿Necesitas uniformes para tu clínica, hospital, colegio o empresa?
            </h2>
            <p className="text-primary-container text-lg">
              Atendemos pedidos institucionales para todo El Salvador. Precios
              especiales por volumen, bordado de logo institucional y entrega en
              tu sede. Clínicas privadas, hospitales, colegios, empresas y más.
            </p>
          </div>
          <div className="flex md:w-1/3 md:justify-end">
            <a
              href="https://confeccionesliss.axkar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-body hover:bg-surface-container w-full rounded-md bg-white px-8 py-4 text-center font-bold transition-colors md:w-auto"
            >
              Solicitar cotización institucional
            </a>
          </div>
        </div>
      </section>

      {/* ═══ NAP + CONTACTO (NEW) ═══ */}
      <NapContacto />

      {/* ═══ KEYWORDS SEO FOOTER (NEW) ═══ */}
      <KeywordsSeoFooter />
    </>
  );
}
