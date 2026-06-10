import Image from "next/image";
import Link from "next/link";
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
import { siteConfig } from "@/config/site";

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
      <section className="bg-surface-container-low relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
        <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
          <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
            <div className="bg-tertiary/10 text-tertiary mb-2 flex w-fit items-center gap-2 self-center rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase lg:mb-3 lg:self-start">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              Confección profesional a la medida
            </div>
            <h1 className="text-primary mb-6 w-full text-center font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl md:mb-10 md:flex md:flex-col md:items-center md:text-5xl lg:mb-6 lg:block lg:text-left lg:text-5xl xl:text-6xl xl:leading-[1.1]">
              <span className="text-center lg:text-left">
                Scrubs y Uniformes a la Medida{" "}
              </span>
              <span className="text-secondary font-serif md:mt-2 md:flex md:w-full md:items-center md:justify-center md:gap-4 lg:mt-0 lg:inline lg:gap-0">
                {/* LÍNEA DECORATIVA IZQUIERDA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="to-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r from-transparent" />
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                </span>

                <span className="shrink-0">en San Miguel</span>

                {/* LÍNEA DECORATIVA DERECHA (Solo Tablet) */}
                <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                  <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                  <span className="from-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r to-transparent" />
                </span>
              </span>
            </h1>

            {/* Contenedor inferior de contenido (Móvil / Tablet) */}
            <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 md:items-stretch md:gap-12 lg:flex lg:flex-col lg:gap-0">
              {/* IMAGEN HERO - VERSIÓN MÓVIL */}
              <div className="relative w-full max-w-sm self-center md:order-2 md:h-full md:max-w-none md:self-stretch lg:hidden">
                <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
                  <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:aspect-auto md:h-full md:w-full">
                    <Image
                      fill
                      alt="Scrubs médicos a la medida confeccionados en San Miguel El Salvador por Confecciones Liss"
                      className="rounded-xl object-cover object-center"
                      src="/images/uniformes/portada.webp"
                      sizes="(max-width:768px) 80vw, 40vw"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* COLUMNA DE TEXTO Y ACCIONES */}
              <div className="flex w-full flex-col items-start md:order-1 md:justify-center">
                <p className="text-on-surface-variant font-body mb-6 w-full text-base leading-relaxed md:text-lg lg:mb-6 lg:text-xl">
                  Confección profesional de scrubs médicos en tela Sincatex y
                  Lino Oxford. Uniformes para UNIVO, UNAB, UGB, colegios y
                  empresas. Bordados, sublimación y envío a todo El Salvador.{" "}
                  <strong>Desde $35 USD.</strong>
                </p>
                <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2">
                  {heroTrustBadges.map((b) => (
                    <div
                      key={b.text}
                      className="border-primary/5 text-secondary flex w-full items-center gap-2 rounded-full border bg-white/60 px-2.5 py-1.5 text-xs font-medium shadow-xs backdrop-blur-xs sm:text-sm"
                    >
                      <span className="bg-primary/10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-primary text-[14px] font-bold">
                          {b.icon}
                        </span>
                      </span>
                      <span className="leading-tight font-semibold text-gray-700">
                        {b.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link
                    href="/catalogo"
                    className="btn-gradient font-body ambient-shadow flex h-12 w-full items-center justify-center rounded-md px-12 text-center text-base font-semibold whitespace-nowrap text-white transition-opacity hover:opacity-90 sm:flex-1"
                  >
                    Comprar
                  </Link>
                  <a
                    href="https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-outline text-primary hover:bg-surface-variant/50 flex h-12 w-full items-center justify-center rounded-md border bg-transparent px-12 text-center font-serif text-base font-medium whitespace-nowrap transition-colors sm:flex-1"
                  >
                    Cómo llegar
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* IMAGEN HERO - VERSIÓN DESKTOP */}
          {/* Imagen desktop: h-full llena el alto del hero, aspect-ratio preservado */}
          <div className="hidden h-full lg:flex lg:w-[40%] lg:items-center">
            <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <Image
                  fill
                  alt="Scrubs médicos a la medida confeccionados en San Miguel El Salvador por Confecciones Liss"
                  className="rounded-xl object-cover object-center"
                  src="/images/uniformes/portada.webp"
                  sizes="40vw"
                  priority
                />
              </div>
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
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
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
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex flex-col items-center">
            <h2 className="section-title">
              ¿Por qué elegir Confecciones Liss en San Miguel?
            </h2>
            <div className="bg-tertiary mt-6 h-1 w-16 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-4 lg:gap-6">
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
                <div className="text-primary ambient-shadow flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white font-serif text-xl font-bold md:mb-4 md:h-20 md:w-20 md:text-2xl">
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
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-between gap-8 md:flex-row">
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
              href={siteConfig.links.whatsappDirect}
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
