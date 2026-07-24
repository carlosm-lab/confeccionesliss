import { Icon } from "@/components/ui/icons/Icon";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/* ── Data ─────────────────────────────────────────────────────────────────── */

interface LegalDoc {
  slug: string;
  title: string;
  tagline: string;
  icon: string;
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
    slug: "cotizaciones",
    title: "COTIZACIONES",
    tagline: "Proceso, tiempos y condiciones de nuestras cotizaciones.",
    icon: "request_quote",
    available: true,
    readingTime: 18,
  },
  {
    slug: "envios",
    title: "ENVÍOS",
    tagline: "Cobertura, plazos y condiciones de envío de pedidos.",
    icon: "local_shipping",
    available: true,
    readingTime: 15,
  },
  {
    slug: "devoluciones",
    title: "DEVOLUCIONES",
    tagline: "Condiciones y procedimiento para devolución de productos.",
    icon: "replay",
    available: true,
    readingTime: 12,
  },
  {
    slug: "confeccion",
    title: "CONFECCIÓN",
    tagline: "Estándares de calidad y proceso de confección de prendas.",
    icon: "straighten",
    available: true,
    readingTime: 17,
  },
  {
    slug: "promociones",
    title: "PROMOCIONES",
    tagline: "Términos, condiciones y validez de descuentos y promociones.",
    icon: "sell",
    available: true,
    readingTime: 16,
  },
  {
    slug: "referidos",
    title: "REFERIDOS",
    tagline: "Reglas, beneficios y condiciones del programa de referidos.",
    icon: "group_add",
    available: true,
    readingTime: 18,
  },
  {
    slug: "ia",
    title: "INT... ARTIFICIAL",
    tagline: "Politica y aviso sobre el uso de inteligencia artificial",
    icon: "psychology",
    available: true,
    readingTime: 20,
  },
  {
    slug: "deberes",
    title: "DEBERES",
    tagline:
      "El catálogo de deberes y obligaciones que rigen la relación comercial.",
    icon: "task_alt",
    available: true,
    readingTime: 20,
  },
  {
    slug: "derechos",
    title: "DERECHOS",
    tagline:
      "Catálogo taxativo de derechos reconocidos al usuario y cliente del Taller.",
    icon: "verified_user",
    available: true,
    readingTime: 22,
  },
  {
    slug: "terceros",
    title: "LOGOS INSTITUCIONALES",
    tagline:
      "Descargo por uso de logotipos e identidad visual institucional de terceros.",
    icon: "account_balance",
    available: true,
    readingTime: 20,
  },
  {
    slug: "cookies",
    title: "COOKIES",
    tagline:
      "Uso de cookies y almacenamiento local de forma transparente y funcional.",
    icon: "cookie",
    available: true,
    readingTime: 10,
  },
  {
    slug: "ugc",
    title: "CONTENIDO UGC",
    tagline:
      "Condiciones de tratamiento, republicación y moderación de contenido generado por usuarios.",
    icon: "forum",
    available: true,
    readingTime: 12,
  },
  {
    slug: "comunicaciones",
    title: "COMUNICACIONES",
    tagline:
      "Condiciones de uso de WhatsApp, redes sociales oficiales y canales de atención.",
    icon: "chat",
    available: true,
    readingTime: 12,
  },
  {
    slug: "accesibilidad",
    title: "ACCESIBILIDAD",
    tagline:
      "Declaración de accesibilidad web, nivel WCAG, medidas implementadas y limitaciones técnicas.",
    icon: "accessibility_new",
    available: true,
    readingTime: 12,
  },
  {
    slug: "mayoreo",
    title: "MAYOREO & GRUPOS",
    tagline:
      "Condiciones para compras grupales, corporativas y estudiantiles, anticipos, mínimos y entregas.",
    icon: "groups",
    available: true,
    readingTime: 10,
  },
  {
    slug: "fotografia",
    title: "FOTOGRAFÍA E IMAGEN",
    tagline:
      "Regulación sobre captación, uso y derechos de imagen de clientes y modelos para nuestro portafolio comercial.",
    icon: "photo_camera",
    available: true,
    readingTime: 15,
  },
  {
    slug: "disputas",
    title: "RESOLUCIÓN & DISPUTAS",
    tagline:
      "Procedimiento centralizado de mediación, plazos de reclamación y resolución amigable de diferencias.",
    icon: "gavel",
    available: true,
    readingTime: 18,
  },
  {
    slug: "garantia",
    title: "GARANTÍA & PRODUCTO",
    tagline:
      "Condiciones de cobertura, plazos de reclamo por defectos de fábrica y soporte de calidad.",
    icon: "verified",
    available: true,
    readingTime: 15,
  },
  {
    slug: "contratacion",
    title: "CONTRATACIÓN",
    tagline:
      "Modalidades de vinculación, requisitos técnicos, remuneración y condiciones del trabajo en el Taller.",
    icon: "handshake",
    available: true,
    readingTime: 12,
  },
];

/* ── LegalHubBackground ───────────────────────────────────────────────────── */
/**
 * Pure-visual rendering of the /legal hub.
 *
 * `animated` (default true): when false, all animate-fade-in-up classes and
 * animationDelay styles are stripped so the hub renders instantly.
 *
 * Use cases where animated=false:
 *  • As a non-interactive background in article reader pages (always static).
 *  • When the user returns from reading an article (via LegalHubClient which
 *    reads a sessionStorage flag set by LegalArticleReader.handleClose).
 */
export default function LegalHubBackground({
  animated = true,
}: {
  animated?: boolean;
}) {
  const available = LEGAL_DOCS.filter((d) => d.available).length;
  /* Helper — returns animation class only when animated=true */
  const anim = animated ? "animate-fade-in-up" : "";
  const delay = (ms: string) => (animated ? { animationDelay: ms } : {});

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-surface px-5 pt-6 pb-0 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Legal", href: "/legal" },
            ]}
            className={cn(anim, "mb-6")}
          />
          <h1
            className={cn(anim, "section-title")}
            style={{ ...delay("100ms"), textAlign: "left" }}
          >
            Políticas & Documentación Legal
          </h1>
          <h2
            className={cn(
              anim,
              "mt-2 text-left text-sm font-semibold tracking-wide text-slate-500 uppercase md:text-base"
            )}
            style={delay("150ms")}
          >
            Marco Regulatorio, Reglamentos & Conexos de Confecciones Liss
          </h2>
          <div
            className={cn(
              anim,
              "relative mt-6 w-full rounded-2xl border border-[rgba(20,48,103,0.35)] bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:p-8"
            )}
            style={delay("200ms")}
          >
            {/* Marco de bordes punteados (estilo /links) */}
            <div className="border-primary pointer-events-none absolute inset-3 z-10 rounded-[12px] border-[2px] border-dashed opacity-50" />

            <div className="relative z-20">
              <p className="text-justify text-sm leading-relaxed text-slate-700 md:text-left md:text-base">
                En esta sección recopilamos el marco regulatorio oficial y las
                políticas comerciales de Confecciones Liss para garantizar total
                transparencia en tu experiencia de compra. Aquí encontrarás
                detalladas nuestras condiciones de envío, políticas de
                devoluciones, términos de uso de la plataforma y el resguardo de
                tu privacidad y datos personales. Te invitamos a leer
                detenidamente estos documentos para conocer tus derechos y
                deberes como cliente.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <Icon
                    name="check_circle"
                    size={14}
                    className="text-emerald-600"
                    aria-hidden="true"
                  />
                  <span className="text-emerald-700">
                    {available} disponibles
                  </span>
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1">
                  <Icon
                    name="pending"
                    size={14}
                    className="text-amber-600"
                    aria-hidden="true"
                  />
                  <span className="text-amber-700">
                    {LEGAL_DOCS.length - available} próximamente
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cards Grid ── */}
      <section className="bg-surface px-5 pt-12 pb-16 md:px-8 md:pb-24">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-6 min-[480px]:grid-cols-2 md:grid-cols-3 md:gap-8 xl:grid-cols-4">
            {LEGAL_DOCS.map((doc, index) => (
              <div
                key={doc.slug}
                className={cn(anim, "h-full w-full")}
                style={delay(`${index * 50 + 300}ms`)}
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

/* ── DocCard ─────────────────────────────────────────────────────────────── */

function DocCard({ doc }: { doc: LegalDoc }) {
  const cardClass = cn(
    "group border-primary/35 @container mx-auto flex w-full max-w-md flex-col overflow-hidden rounded-2xl border bg-white transition-all duration-300 lg:max-w-none",
    "shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]",
    doc.available
      ? "hover:border-primary/55 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] focus-visible:ring-primary focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none cursor-pointer"
      : "opacity-60 cursor-not-allowed"
  );

  const banner = (
    <div
      className={cn(
        "relative flex aspect-[32/15] max-h-[150px] w-full items-center justify-center overflow-hidden sm:max-h-none",
        doc.available
          ? "bg-gradient-to-br from-[#143067] to-[#1e4d9e]"
          : "bg-gradient-to-br from-slate-500 to-slate-600"
      )}
    >
      {doc.available ? (
        <div className="bg-primary absolute top-3 right-3 z-20 flex items-center gap-1 rounded-full px-2 py-0.5 text-white shadow-md">
          <Icon name="schedule" size={12} aria-hidden="true" />
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
      <Icon
        name={doc.icon}
        size={80}
        className={cn(
          "text-white/80 transition-transform duration-300",
          doc.available && "group-hover:scale-110"
        )}
        aria-hidden="true"
      />
    </div>
  );

  const infoPanel = (
    <div className="flex h-[88px] flex-col justify-center p-3 @[280px]:p-3.5 @[320px]:p-4">
      <div className="mb-1.5 flex items-center gap-2">
        <div className="flex items-center">
          <h2 className="text-primary group-hover:text-tertiary text-[11px] font-extrabold tracking-wider uppercase transition-colors duration-300 @[280px]:text-[12.5px] @[320px]:text-[14px] @[360px]:text-[15px]">
            {doc.title}
          </h2>
        </div>
      </div>
      <p className="text-on-surface-variant line-clamp-2 text-[9px] leading-snug transition-all @[280px]:text-[10px] @[320px]:text-[11px] @[360px]:text-[12px]">
        {doc.tagline}
      </p>
    </div>
  );

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
