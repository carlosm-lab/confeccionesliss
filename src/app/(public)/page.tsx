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

export default function HomePage() {
  return (
    <>
      {/* ═══ JSON-LD STRUCTURED DATA ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaLocalBusiness),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemaFAQ),
        }}
      />

      {/* ═══ HERO ═══ */}
      <section className="bg-surface-container-low relative overflow-hidden px-8 pt-20 pb-28">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-16 lg:flex-row lg:pr-24 lg:pl-12">
          <div className="z-10 flex w-full flex-col items-start lg:w-[55%]">
            <div className="bg-tertiary/10 text-tertiary mb-6 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              Confección profesional a la medida
            </div>
            <h1 className="text-primary mb-6 font-serif text-5xl leading-[1.1] tracking-tight lg:text-7xl">
              Scrubs y Uniformes
              <br />a la Medida
              <br />
              <span className="text-secondary">en San Miguel</span>
            </h1>
            <p className="text-on-surface-variant font-body mb-8 max-w-lg text-lg leading-relaxed lg:text-xl">
              Confección profesional de scrubs médicos en tela Sincatex y Lino
              Oxford. Uniformes para UNIVO, UNAB, UGB, colegios y empresas.
              Bordados, sublimación y envío a todo El Salvador.{" "}
              <strong>Desde $35 USD.</strong>
            </p>
            <div className="mb-10 flex flex-wrap gap-4">
              {heroTrustBadges.map((b) => (
                <div
                  key={b.text}
                  className="text-secondary flex items-center gap-2 text-sm font-medium"
                >
                  <span className="material-symbols-outlined text-primary-container">
                    {b.icon}
                  </span>
                  {b.text}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://confeccionesliss.axkar.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gradient font-body ambient-shadow rounded-md px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Pedir por WhatsApp — 7331-7181
              </a>
              <a
                href="https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="border-outline text-primary hover:bg-surface-variant/50 rounded-md border bg-transparent px-8 py-4 font-serif font-medium transition-colors"
              >
                Cómo llegar al taller
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
                className="h-full w-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMIor4NQU8ZY6h6n53wLwP1PPv_4IfEVDlrdkQiVgvWOiidIyGatWukXX7ZzVsdzRcz71fAfJcvi2HELZG7UhjbUqAz3THePqzcXwVEFSXMa0_8RlkF37VvPCxi3qVma_OFXo80Xv6Ys_4iZKHWxLrn6BbTqt1WpiNtaLbAYB3k3U3CFLZ7Ir1kw-e3SwltcGqBC7zr1jVmabzJpJr_0Dxdp4gnvhAIm_RseUm_lKpMpO80Ncg0AwJ3Uyzgkf0sjKg62CnPdOG4qWK"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ NOVEDADES (existing design) ═══ */}
      <section className="bg-surface px-8 py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between lg:pr-12">
            <h2 className="text-primary font-serif text-4xl">Novedades</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                cat: "IEPROES",
                name: "Uniformes de la IEPROES",
                price: "$39.50",
                sizes: ["S", "M", "L", "XL", "XXL"],
                img: "/images/uniformes/ieproes.webp",
                alt: "Uniformes de la IEPROES",
              },
              {
                cat: "UGB",
                name: "Uniformes de la UGB",
                price: "$39.50",
                sizes: ["S", "M", "L", "XL", "XXL"],
                img: "/images/uniformes/ugb.webp",
                alt: "Uniformes de la UGB",
              },
              {
                cat: "UMA",
                name: "Uniformes de la UMA",
                price: "$39.50",
                sizes: ["S", "M", "L", "XL", "XXL"],
                img: "/images/uniformes/uma.webp",
                alt: "Uniformes de la UMA",
              },
              {
                cat: "UNAB",
                name: "Uniformes de la UNAB",
                price: "$39.50",
                sizes: ["S", "M", "L", "XL", "XXL"],
                img: "/images/uniformes/unab.webp",
                alt: "Uniformes de la UNAB",
              },
              {
                cat: "UNIVO",
                name: "Uniformes de la UNIVO",
                price: "$39.50",
                sizes: ["S", "M", "L", "XL", "XXL"],
                img: "/images/uniformes/univo.webp",
                alt: "Uniformes de la UNIVO",
              },
            ].map((p) => (
              <div
                key={p.name}
                className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="bg-surface-container relative flex aspect-square items-center justify-center p-6">
                  <span className="bg-tertiary absolute top-4 left-4 rounded px-2 py-1 text-xs font-bold text-white">
                    Nuevo
                  </span>
                  {p.img ? (
                    <Image
                      width={800}
                      height={800}
                      alt={p.alt ?? p.name}
                      className="h-full w-full rounded object-contain"
                      src={p.img}
                    />
                  ) : (
                    <div className="bg-surface-container-low border-outline-variant/30 flex h-full w-full items-center justify-center rounded-xl border">
                      <span className="material-symbols-outlined text-outline text-4xl">
                        image
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex flex-grow flex-col p-6">
                  <span className="font-label text-secondary mb-2 text-xs tracking-wider uppercase">
                    {p.cat}
                  </span>
                  <h3 className="text-on-surface mb-1 font-serif text-lg">
                    {p.name}
                  </h3>
                  <p className="text-on-surface-variant font-body mb-4 font-semibold">
                    {p.price}
                  </p>
                  <div className="mb-6 flex gap-2">
                    {p.sizes.map((s) => (
                      <span
                        key={s}
                        className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://confeccionesliss.axkar.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary font-body mt-auto flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100"
                  >
                    <span className="material-symbols-outlined text-sm">
                      chat
                    </span>{" "}
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICIOS PRINCIPALES (NEW) ═══ */}
      <ServiciosPrincipales />

      {/* ═══ ¿POR QUÉ ELEGIRNOS? (updated content) ═══ */}
      <section className="bg-surface-container-low border-surface-variant/50 border-t border-b px-8 py-24">
        <div className="mx-auto max-w-screen-xl">
          <h2 className="text-primary mb-16 text-center font-serif text-3xl">
            ¿Por qué elegir Confecciones Liss en San Miguel?
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {whyItems.map((w) => (
              <div
                key={w.title}
                className="flex flex-col items-center text-center"
              >
                <div className="bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white">
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
      <section className="bg-primary px-8 py-24 text-white">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl">
              ¿Cómo pedir tus uniformes en Confecciones Liss?
            </h2>
            <p className="text-primary-container mx-auto max-w-2xl text-lg">
              Un proceso sencillo para que recibas tu uniforme perfecto sin
              complicaciones.
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="bg-primary-container/30 absolute top-12 right-[10%] left-[10%] z-0 hidden h-0.5 md:block" />
            {processSteps.map((s) => (
              <div
                key={s.n}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div className="text-primary ambient-shadow mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white font-serif text-3xl font-bold">
                  {s.n}
                </div>
                <h3 className="mb-2 font-serif text-xl">{s.title}</h3>
                <p className="text-primary-container text-sm">{s.desc}</p>
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
        className="bg-[#f4f5f7] px-8 py-24"
      >
        <div className="mx-auto max-w-screen-2xl">
          <h2
            id="testimonios-heading"
            className="text-primary mb-16 text-center font-serif text-3xl"
          >
            Lo que dicen nuestros clientes en San Miguel y todo El Salvador
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {testimonials.map((t) => (
              <article
                key={t.nombre}
                className="ambient-shadow rounded-xl bg-white p-8"
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
        className="bg-primary px-8 py-20 text-white"
      >
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="md:w-2/3">
            <h2
              id="institucional-heading"
              className="mb-4 font-serif text-3xl md:text-4xl"
            >
              ¿Necesitas uniformes para tu clínica, hospital, colegio o empresa?
            </h2>
            <p className="text-primary-container text-lg">
              Atendemos pedidos institucionales para todo El Salvador. Precios
              especiales por volumen, bordado de logo institucional y entrega en
              tu sede. Clínicas privadas, hospitales, colegios, empresas y más.
            </p>
          </div>
          <div className="justify-md-end flex md:w-1/3">
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
