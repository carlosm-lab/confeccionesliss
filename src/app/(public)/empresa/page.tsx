import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { heroTrustBadges } from "@/lib/seo-data";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const PAGE_URL = `${siteConfig.url}/empresa`;
const PAGE_TITLE = "Empresa | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Información corporativa de Confecciones Liss. Explora nuestra historia, filosofía, equipo y kit de prensa oficial.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    creator: siteConfig.twitterHandle,
  },
  robots: { index: true, follow: true },
};

export default function EmpresaPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}/#business`,
        name: siteConfig.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.png`,
        foundingDate: "2005",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteConfig.address.full,
          addressLocality: siteConfig.address.city,
          addressRegion: "San Miguel",
          addressCountry: "SV",
          postalCode: "3100",
        },
        sameAs: [
          siteConfig.links.facebook,
          siteConfig.links.instagram,
          siteConfig.links.tiktok,
          siteConfig.links.youtube,
          siteConfig.links.threads,
          siteConfig.links.twitter,
          siteConfig.links.googleMaps,
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Empresa",
            item: PAGE_URL,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <style
        dangerouslySetInnerHTML={{
          __html: `
            /* Custom spacing config classes from code.html tailwind theme */
            .px-margin-mobile {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }
            @media (min-width: 768px) {
              .md\\:px-margin-desktop {
                padding-left: 64px !important;
                padding-right: 64px !important;
              }
            }
            .pb-section-gap {
              padding-bottom: 80px !important;
            }
            .py-section-gap {
              padding-top: 80px !important;
              padding-bottom: 80px !important;
            }
            .gap-gutter {
              gap: 24px !important;
            }
            .max-w-container-max {
              max-width: 1280px !important;
            }

            /* Custom font sizes and families from code.html tailwind theme */
            .font-display-lg {
              font-family: var(--font-serif), Noto Serif, serif !important;
            }
            .font-display-lg-mobile {
              font-family: var(--font-serif), Noto Serif, serif !important;
            }
            .font-headline-md {
              font-family: var(--font-serif), Noto Serif, serif !important;
            }
            .font-headline-sm {
              font-family: var(--font-serif), Noto Serif, serif !important;
            }
            .font-title-lg {
              font-family: var(--font-sans), Manrope, sans-serif !important;
            }
            .font-body-lg {
              font-family: var(--font-sans), Manrope, sans-serif !important;
            }
            .font-body-md {
              font-family: var(--font-sans), Manrope, sans-serif !important;
            }
            .font-label-md {
              font-family: var(--font-sans), Manrope, sans-serif !important;
            }
            .font-label-sm {
              font-family: var(--font-sans), Manrope, sans-serif !important;
            }

            .text-display-lg-mobile {
              font-size: 36px !important;
              line-height: 1.2 !important;
              font-weight: 700 !important;
            }
            .text-display-lg {
              font-size: 48px !important;
              line-height: 1.1 !important;
              letter-spacing: -0.02em !important;
              font-weight: 700 !important;
            }
            .text-headline-md {
              font-size: 32px !important;
              line-height: 1.3 !important;
              font-weight: 600 !important;
            }
            .text-headline-sm {
              font-size: 24px !important;
              line-height: 1.4 !important;
              font-weight: 600 !important;
            }
            .text-title-lg {
              font-size: 20px !important;
              line-height: 1.5 !important;
              letter-spacing: 0.01em !important;
              font-weight: 600 !important;
            }
            .text-body-lg {
              font-size: 18px !important;
              line-height: 1.6 !important;
              font-weight: 400 !important;
            }
            .text-body-md {
              font-size: 16px !important;
              line-height: 1.6 !important;
              font-weight: 400 !important;
            }
            .text-label-md {
              font-size: 14px !important;
              line-height: 1.4 !important;
              letter-spacing: 0.05em !important;
              font-weight: 500 !important;
            }
            .text-label-sm {
              font-size: 12px !important;
              line-height: 1.2 !important;
              font-weight: 600 !important;
            }

            .editorial-shadow {
              box-shadow: 0 10px 30px -10px rgba(0, 27, 74, 0.05);
            }
            .hover-lift {
              transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            }
            .hover-lift:hover {
              transform: translateY(-4px);
              box-shadow: 0 20px 40px -15px rgba(0, 27, 74, 0.1);
            }
            .glass-panel {
              background: rgba(255, 255, 255, 0.85);
              backdrop-filter: blur(12px);
            }
          `,
        }}
      />

      <main className="bg-[#f8f9fc] text-[#191c1e] antialiased selection:bg-[#d9e2ff] selection:text-[#001946]">
        {/* ======================================================== */}
        {/* 1. HERO COPIADO DEL INDEX EXACTAMENTE SIN CAMBIAR NADA */}
        {/* ======================================================== */}
        <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
          <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
              {/* Breadcrumb section */}
              <div className="mb-6 lg:mb-8">
                <Breadcrumb
                  items={[
                    { label: "Inicio", href: "/" },
                    { label: "Empresa", href: "/empresa" },
                  ]}
                  className="animate-fade-in-up"
                />
              </div>

              <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-4xl leading-tight tracking-tight md:mb-10 md:flex md:flex-col md:items-center md:text-5xl lg:mb-6 lg:block lg:text-left lg:text-6xl">
                <span className="text-center lg:text-left">
                  La Identidad De{" "}
                </span>
                <span className="text-secondary font-serif md:mt-2 md:flex md:w-full md:items-center md:justify-center md:gap-4 lg:mt-0 lg:inline lg:gap-0">
                  {/* LÍNEA DECORATIVA IZQUIERDA (Solo Tablet) */}
                  <span className="hidden md:flex md:flex-1 md:items-center md:gap-2 lg:hidden">
                    <span className="to-secondary/30 h-[1.5px] flex-1 bg-gradient-to-r from-transparent" />
                    <span className="bg-secondary/50 h-1.5 w-1.5 shrink-0 rotate-45" />
                  </span>

                  <span className="shrink-0">
                    &ldquo;Confecciones Liss&rdquo;
                  </span>

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
                <div
                  className="animate-fade-in-up relative w-full max-w-sm self-center md:order-2 md:h-full md:max-w-none md:self-stretch lg:hidden"
                  style={{ animationDelay: "300ms" }}
                >
                  <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl md:aspect-auto md:h-full md:w-full">
                      <Image
                        fill
                        alt="Nuestra Identidad - Confecciones Liss"
                        className="animate-fade-in rounded-xl object-cover object-center"
                        src="/images/empresa-hero.png"
                        sizes="(max-width:768px) 80vw, 40vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* COLUMNA DE TEXTO Y ACCIONES */}
                <div className="flex w-full flex-col items-start md:order-1 md:justify-center">
                  <div
                    className="animate-fade-in-up text-on-surface-variant font-body mb-6 w-full space-y-4 text-base leading-relaxed md:text-lg lg:mb-6 lg:text-xl"
                    style={{ animationDelay: "150ms" }}
                  >
                    <p>
                      Empezamos confeccionando prendas desde casa. Hoy somos una
                      empresa consolidada, especializada en la venta de
                      uniformes escolares, médicos y empresariales, con más de
                      20 años de experiencia respaldada por contratos con el
                      Ministerio de Educación e instituciones de la región.
                      Conozca el equipo, los procesos, la filosofía y la
                      infraestructura que nos permiten entregar uniformes de
                      calidad con bordado personalizado y control de calidad en
                      cada prenda.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* IMAGEN HERO - VERSIÓN DESKTOP */}
            <div
              className="animate-fade-in-up hidden h-full lg:flex lg:w-[40%] lg:items-center"
              style={{ animationDelay: "300ms" }}
            >
              <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    fill
                    alt="Nuestra Identidad - Confecciones Liss"
                    className="rounded-xl object-cover object-center"
                    src="/images/empresa-hero.png"
                    sizes="40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* 3. CONTENIDO DEL HUB (MOSAICO Y TIMELINE) */}
        {/* ======================================================== */}
        {/* Navigation Mosaic */}
        <section className="py-section-gap relative w-full px-5 md:px-8">
          <div className="mx-auto w-full max-w-screen-2xl">
            {/* Título de transición */}
            <div className="mb-12 text-center md:text-left">
              <span className="font-label-sm text-label-sm text-secondary mb-2 block font-sans tracking-widest uppercase">
                Áreas de la Empresa
              </span>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-[#001b4a] md:text-4xl">
                Conozca Confecciones Liss por Dentro
              </h2>
              <p className="text-on-surface-variant mt-3 max-w-2xl font-sans text-sm md:text-base">
                Explore nuestra historia, procesos, filosofía corporativa y la
                infraestructura tecnológica que impulsa nuestra producción
                textil.
              </p>
            </div>

            <div className="gap-gutter relative z-10 grid grid-cols-1 grid-rows-[auto] md:grid-cols-12">
              {/* Heritage Column (Span 7) */}
              <div className="gap-gutter flex flex-col md:col-span-7">
                {/* Sobre Nosotros */}
                <Link
                  className="group border-primary hover:border-primary/80 relative flex h-[400px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
                  href="/empresa/sobre-nosotros"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Liss"
                    width={80}
                    height={40}
                    className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black text-slate-900 opacity-[0.04] select-none"
                    style={{
                      fontSize: "clamp(5rem,11vw,11rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    NOSOTROS
                  </div>
                  <div className="relative">
                    <span className="font-serif text-[clamp(2.5rem,4vw,4rem)] leading-none font-black tracking-tight text-[#0d1a38]">
                      Sobre
                      <br />
                      Nosotros
                    </span>
                  </div>
                  <div className="relative mt-8">
                    <div className="mb-3 h-0.5 w-5 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-8" />
                    <p className="font-body text-sm leading-snug font-medium text-slate-500">
                      La historia y visión detrás de nuestro legacy textil.
                    </p>
                    <div className="mt-4 flex justify-end">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#143067"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="opacity-35 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </div>
                  </div>
                </Link>
                <div className="gap-gutter grid h-auto grid-cols-1 sm:h-[250px] sm:grid-cols-2">
                  {/* Filosofía */}
                  <Link
                    className="group border-primary hover:border-primary/80 relative flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
                    href="/empresa/filosofia"
                  >
                    <Image
                      src="/logo.png"
                      alt="Logo Liss"
                      width={80}
                      height={40}
                      className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black text-slate-900 opacity-[0.04] select-none"
                      style={{
                        fontSize: "clamp(3.5rem,7vw,8rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      FILOSOFÍA
                    </div>
                    <div className="relative">
                      <span className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none font-black tracking-tight text-[#0d1a38]">
                        Filosofía
                      </span>
                    </div>
                    <div className="relative mt-8">
                      <div className="mb-3 h-0.5 w-5 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-8" />
                      <p className="font-body text-sm leading-snug font-medium text-slate-500">
                        El detalle como norma, la calidad como hábito.
                      </p>
                    </div>
                  </Link>
                  {/* Equipo */}
                  <Link
                    className="group border-primary hover:border-primary/80 relative flex h-[200px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] sm:h-full"
                    href="/empresa/equipo"
                  >
                    <Image
                      src="/logo.png"
                      alt="Logo Liss"
                      width={80}
                      height={40}
                      className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black text-slate-900 opacity-[0.04] select-none"
                      style={{
                        fontSize: "clamp(4rem,9vw,9rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      EQUIPO
                    </div>
                    <div className="relative">
                      <span className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none font-black tracking-tight text-[#0d1a38]">
                        Nuestro
                        <br />
                        Equipo
                      </span>
                    </div>
                    <div className="relative mt-8">
                      <div className="mb-3 h-0.5 w-5 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-8" />
                      <p className="font-body text-sm leading-snug font-medium text-slate-500">
                        Los expertos detrás de la maquinaria.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              {/* Technical Column (Span 5) */}
              <div className="gap-gutter flex flex-col md:col-span-5">
                {/* Instalaciones */}
                <Link
                  className="group border-primary hover:border-primary/80 relative flex h-[250px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed bg-white p-8 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
                  href="/empresa/instalaciones"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Liss"
                    width={80}
                    height={40}
                    className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black text-slate-900 opacity-[0.04] select-none"
                    style={{
                      fontSize: "clamp(3.5rem,7vw,8rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    INSTALACIONES
                  </div>
                  <div className="relative">
                    <span className="font-serif text-[clamp(2rem,3vw,3rem)] leading-none font-black tracking-tight text-[#0d1a38]">
                      Instalaciones
                    </span>
                  </div>
                  <div className="relative mt-8">
                    <div className="mb-3 h-0.5 w-5 rounded-full bg-slate-300 transition-all duration-300 group-hover:w-8" />
                    <p className="font-body text-sm leading-snug font-medium text-slate-500">
                      Un recorrido por nuestro centro de producción de
                      vanguardia.
                    </p>
                  </div>
                </Link>
                {/* Icon Grid for Processes */}
                <div className="group border-primary hover:border-primary/80 relative grid flex-grow grid-cols-1 gap-4 overflow-hidden rounded-2xl border-2 border-dashed bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]">
                  <Image
                    src="/logo.png"
                    alt="Logo Liss"
                    width={80}
                    height={40}
                    className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <Link
                    className="hover:bg-surface-container-low group flex items-center gap-4 rounded p-4 transition-colors"
                    href="/empresa/proceso-de-confeccion"
                  >
                    <div className="bg-surface flex h-16 w-16 shrink-0 items-center justify-center rounded text-[#001b4a]">
                      <span className="material-symbols-outlined text-3xl">
                        factory
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-lg text-title-lg text-[#001b4a]">
                        Proceso de Confección
                      </h4>
                      <p className="font-body-sm text-on-surface-variant mt-1 font-sans text-sm">
                        Metodología paso a paso.
                      </p>
                    </div>
                  </Link>
                  <div className="bg-outline-variant/30 h-px w-full"></div>
                  <Link
                    className="hover:bg-surface-container-low group flex items-center gap-4 rounded p-4 transition-colors"
                    href="/empresa/calidad"
                  >
                    <div className="bg-surface flex h-16 w-16 shrink-0 items-center justify-center rounded text-[#001b4a]">
                      <span className="material-symbols-outlined text-3xl">
                        verified
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-lg text-title-lg text-[#001b4a]">
                        Calidad
                      </h4>
                      <p className="font-body-sm text-on-surface-variant mt-1 font-sans text-sm">
                        Estándares y protocolos.
                      </p>
                    </div>
                  </Link>
                  <div className="bg-outline-variant/30 h-px w-full"></div>
                  <Link
                    className="hover:bg-surface-container-low group flex items-center gap-4 rounded p-4 transition-colors"
                    href="/empresa/certificaciones"
                  >
                    <div className="bg-surface flex h-16 w-16 shrink-0 items-center justify-center rounded text-[#001b4a]">
                      <span className="material-symbols-outlined text-3xl">
                        workspace_premium
                      </span>
                    </div>
                    <div>
                      <h4 className="font-title-lg text-title-lg text-[#001b4a]">
                        Certificaciones
                      </h4>
                      <p className="font-body-sm text-on-surface-variant mt-1 font-sans text-sm">
                        Garantías internacionales.
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
              {/* Bottom Typography Cards (Span 12) */}
              <div className="gap-gutter grid grid-cols-1 md:col-span-12 md:grid-cols-3">
                <Link
                  className="group border-primary hover:border-primary/80 relative flex h-[160px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] md:p-8"
                  href="/empresa/responsabilidad-social"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Liss"
                    width={80}
                    height={40}
                    className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black text-slate-900 opacity-[0.04] select-none"
                    style={{
                      fontSize: "clamp(3rem,6vw,7rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    COMPROMISO
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary mb-2 block font-sans tracking-widest uppercase">
                      Compromiso
                    </span>
                    <h4 className="font-title-lg text-title-lg group-hover:text-secondary font-bold text-[#001b4a] transition-colors">
                      Responsabilidad Social
                    </h4>
                  </div>
                  <div className="flex justify-end">
                    <span className="material-symbols-outlined text-[#001b4a] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </Link>

                <Link
                  className="group border-primary hover:border-primary/80 relative flex h-[160px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] md:p-8"
                  href="/empresa/transparencia"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Liss"
                    width={80}
                    height={40}
                    className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black text-slate-900 opacity-[0.04] select-none"
                    style={{
                      fontSize: "clamp(3.5rem,7vw,8rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    ÉTICA
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary mb-2 block font-sans tracking-widest uppercase">
                      Ética
                    </span>
                    <h4 className="font-title-lg text-title-lg group-hover:text-secondary font-bold text-[#001b4a] transition-colors">
                      Transparencia
                    </h4>
                  </div>
                  <div className="flex justify-end">
                    <span className="material-symbols-outlined text-[#001b4a] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </Link>

                <Link
                  className="group border-primary hover:border-primary/80 relative flex h-[160px] flex-col justify-between overflow-hidden rounded-2xl border-2 border-dashed bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] md:p-8"
                  href="/empresa/media-kit"
                >
                  <Image
                    src="/logo.png"
                    alt="Logo Liss"
                    width={80}
                    height={40}
                    className="absolute top-6 right-6 z-10 h-auto w-16 object-contain opacity-20 grayscale transition-opacity duration-300 group-hover:opacity-40"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden font-serif leading-none font-black text-slate-900 opacity-[0.04] select-none"
                    style={{
                      fontSize: "clamp(3.5rem,7vw,8rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    PRENSA
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm text-secondary mb-2 block font-sans tracking-widest uppercase">
                      Prensa
                    </span>
                    <h4 className="font-title-lg text-title-lg group-hover:text-secondary font-bold text-[#001b4a] transition-colors">
                      Media Kit
                    </h4>
                  </div>
                  <div className="flex justify-end">
                    <span className="material-symbols-outlined text-[#001b4a] transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Brief Timeline Accent */}
        <section className="border-outline-variant/20 w-full border-t px-5 py-20 md:px-8">
          <div className="mx-auto w-full max-w-screen-2xl">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="w-full md:w-1/3">
                <h3 className="font-headline-sm text-headline-sm text-[#001b4a]">
                  Evolución Constante
                </h3>
                <p className="font-body-sm text-on-surface-variant mt-2 font-sans">
                  Hitos reales que marcan nuestro camino hacia la excelencia.
                </p>
              </div>
              <div className="flex w-full flex-wrap justify-start gap-8 md:w-2/3 md:justify-end">
                <div className="flex animate-pulse flex-col items-start gap-1">
                  <span className="font-display-lg-mobile text-4xl leading-none text-[#001b4a] opacity-20">
                    2005
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant pl-1 font-sans tracking-wider uppercase">
                    Origen
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="font-display-lg-mobile text-4xl leading-none text-[#001b4a] opacity-20">
                    2021
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant pl-1 font-sans tracking-wider uppercase">
                    Fundación
                  </span>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <span className="font-display-lg-mobile text-4xl leading-none text-[#001b4a]">
                    Hoy
                  </span>
                  <span className="font-label-md text-label-md pl-1 font-sans font-bold font-semibold tracking-wider text-[#143067] uppercase">
                    Excelencia
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
