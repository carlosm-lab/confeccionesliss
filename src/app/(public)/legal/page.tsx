import type { Metadata } from "next";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

const PAGE_URL = `${siteConfig.url}/legal`;

export const metadata: Metadata = {
  title: "Documentos Legales: Privacidad y Términos",
  description:
    "Accede a todos los documentos legales de Confecciones Liss: política de privacidad, términos y condiciones de uso, y más documentos regulatorios vigentes en El Salvador.",
  alternates: { canonical: PAGE_URL },
};

// ── Data ────────────────────────────────────────────────────────────────────

interface LegalDoc {
  slug: string;
  title: string;
  tagline: string;
  icon: string; // Material Symbol name
  available: boolean;
  readingTime: number;
}

const LEGAL_DOCS: LegalDoc[] = [
  {
    slug: "privacidad",
    title: "PRIVACIDAD",
    tagline: "Cómo recopilamos, usamos y protegemos tus datos personales.",
    icon: "shield",
    available: true,
    readingTime: 14,
  },
  {
    slug: "terminos",
    title: "TÉRMINOS",
    tagline: "Las reglas que rigen el uso de nuestra plataforma y servicios.",
    icon: "description",
    available: true,
    readingTime: 22,
  },
  {
    slug: "politica-de-cotizaciones",
    title: "COTIZACIONES",
    tagline: "Proceso, tiempos y condiciones de nuestras cotizaciones.",
    icon: "request_quote",
    available: false,
    readingTime: 8,
  },
  {
    slug: "politica-de-envios",
    title: "ENVÍOS",
    tagline: "Cobertura, plazos y condiciones de envío de pedidos.",
    icon: "local_shipping",
    available: false,
    readingTime: 7,
  },
  {
    slug: "politica-de-devoluciones",
    title: "DEVOLUCIONES",
    tagline: "Condiciones y procedimiento para devolución de productos.",
    icon: "replay",
    available: false,
    readingTime: 6,
  },
  {
    slug: "politica-de-confeccion",
    title: "CONFECCIÓN",
    tagline: "Estándares de calidad y proceso de confección de prendas.",
    icon: "straighten",
    available: false,
    readingTime: 10,
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function LegalHubPage() {
  const available = LEGAL_DOCS.filter((d) => d.available).length;

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-surface px-5 pt-6 pb-0 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: "Legal" }]}
            className="animate-fade-in-up mb-6"
          />
          <h1
            className="animate-fade-in-up section-title"
            style={{ animationDelay: "100ms", textAlign: "left" }}
          >
            Documentos Legales
          </h1>
          <p
            className="animate-fade-in-up text-on-surface-variant mt-4 max-w-xl text-left text-sm leading-relaxed md:text-base"
            style={{ animationDelay: "200ms" }}
          >
            Transparencia y protección — accede a todas nuestras políticas y
            términos.{" "}
            <span className="font-medium text-emerald-600">
              {available} disponibles
            </span>{" "}
            · {LEGAL_DOCS.length - available} próximamente
          </p>
        </div>
      </section>

      {/* ── Cards Grid ── */}
      <section className="bg-surface px-5 pt-12 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
            {LEGAL_DOCS.map((doc, index) => (
              <div
                key={doc.slug}
                className="animate-fade-in-up h-full w-full"
                style={{ animationDelay: `${index * 50 + 300}ms` }}
              >
                <DocCard doc={doc} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// ── DocCard ──────────────────────────────────────────────────────────────────

function DocCard({ doc }: { doc: LegalDoc }) {
  const cardClass = cn(
    // Base — identical to CategoryCard in CategoryHubClient.tsx
    "group border-primary/35 @container mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 lg:max-w-none",
    "shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]",
    doc.available
      ? "hover:border-primary/55 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer"
      : "opacity-60 cursor-not-allowed"
  );

  // ── Banner ────────────────────────────────────────────────────────────────
  // Gradient banner replaces the photo used in catalog (legal docs have no image)
  const banner = (
    <div
      className={cn(
        "relative flex aspect-[32/15] max-h-[150px] w-full items-center justify-center overflow-hidden sm:max-h-none",
        doc.available
          ? "bg-gradient-to-br from-[#143067] to-[#1e4d9e]"
          : "bg-gradient-to-br from-slate-500 to-slate-600"
      )}
    >
      {/* Reading time badge — top-left (mimics open_in_new button position) */}
      {doc.available ? (
        <div className="bg-primary absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full px-2 py-0.5 text-white shadow-md">
          <span
            className="material-symbols-outlined text-[12px]"
            aria-hidden="true"
          >
            schedule
          </span>
          <span className="text-[10px] font-semibold">
            {doc.readingTime} min
          </span>
        </div>
      ) : (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5">
          <span className="text-[10px] font-semibold tracking-wider text-white/60 uppercase">
            Próximamente
          </span>
        </div>
      )}

      {/* Center icon — restored */}
      <span
        className={cn(
          "material-symbols-outlined text-[48px] text-white/80 transition-transform duration-300",
          doc.available && "group-hover:scale-110"
        )}
        aria-hidden="true"
      >
        {doc.icon}
      </span>
    </div>
  );

  // ── Info panel ────────────────────────────────────────────────────────────
  const infoPanel = (
    <div className="p-3 @[280px]:p-3.5 @[320px]:p-4">
      {/* Title + badge */}
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className="material-symbols-outlined text-primary group-hover:text-tertiary text-[13px] transition-colors duration-300 @[280px]:text-[15px] @[320px]:text-[17px]"
            aria-hidden="true"
          >
            {doc.icon}
          </span>
          <h2 className="text-primary group-hover:text-tertiary text-[11px] font-extrabold tracking-wider uppercase transition-colors duration-300 @[280px]:text-[12.5px] @[320px]:text-[14px] @[360px]:text-[15px]">
            {doc.title}
          </h2>
        </div>
        {doc.available ? (
          <span className="bg-surface-container text-primary rounded-full px-1.5 py-0.5 text-[8px] font-semibold @[280px]:px-2 @[280px]:text-[9px] @[320px]:text-[10px]">
            Leer →
          </span>
        ) : (
          <span className="bg-surface-container rounded-full px-1.5 py-0.5 text-[8px] font-semibold text-slate-400 @[280px]:px-2 @[280px]:text-[9px] @[320px]:text-[10px]">
            Próx.
          </span>
        )}
      </div>

      {/* Description / tagline */}
      <p className="text-on-surface-variant mt-1 line-clamp-2 text-[9px] leading-snug transition-all @[280px]:text-[10px] @[320px]:text-[11px] @[360px]:text-[12px]">
        {doc.tagline}
      </p>
    </div>
  );

  // ── Render ────────────────────────────────────────────────────────────────
  if (doc.available) {
    return (
      <Link
        href={`/legal/${doc.slug}`}
        className={cardClass}
        aria-label={`Leer: ${doc.title} — ${doc.tagline}`}
      >
        {banner}
        {infoPanel}
      </Link>
    );
  }

  return (
    <div aria-disabled="true" className={cardClass}>
      {banner}
      {infoPanel}
    </div>
  );
}
