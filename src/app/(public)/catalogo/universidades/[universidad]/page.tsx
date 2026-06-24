import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogPageClient } from "@/components/catalogo/CatalogPageClient";
import { siteConfig } from "@/config/site";
import {
  getProductsByUniversity,
  getCategoriesForUniversity,
} from "@/lib/catalogService";
import { OffersReadTracker } from "@/components/ui/OffersReadTracker";
import type { CategoryConfig } from "@/data/types";

// ── SSG puro + On-Demand Revalidation ──────────────────────────────────────
// No ISR por tiempo. Revalidación on-demand vía src/actions/catalog.ts.

// ── Configuración estática de cada universidad ─────────────────────────────────
// Datos de presentación. Los productos reales vienen de Supabase en tiempo de build.
// Las `carreras` sirven como fallback del sidebar si Supabase no devuelve categorías.
const UNIVERSITY_CONFIG: Record<
  string,
  {
    sigla: string;
    nombre: string;
    carreras: string[];
    seoTitle: string;
    seoDescription: string;
  }
> = {
  univo: {
    sigla: "UNIVO",
    nombre: "Universidad de Oriente",
    carreras: ["Enfermería", "Medicina", "Odontología", "Fisioterapia"],
    seoTitle: "Uniformes UNIVO — Universidad de Oriente | Confecciones Liss",
    seoDescription:
      "Scrubs clínicos con los colores oficiales de UNIVO (Universidad de Oriente). Enfermería, Medicina y Odontología. Tela Sincatex, bordado de carrera incluido. San Miguel, El Salvador.",
  },
  ieproes: {
    sigla: "IEPROES",
    nombre: "Instituto Especializado de Profesionales de la Salud",
    carreras: ["Enfermería", "Fisioterapia", "Laboratorio Clínico"],
    seoTitle: "Uniformes IEPROES | Confecciones Liss",
    seoDescription:
      "Scrubs clínicos con colores oficiales para estudiantes de IEPROES. Enfermería, Fisioterapia y Laboratorio Clínico. Tela Sincatex. San Miguel, El Salvador.",
  },
  ugb: {
    sigla: "UGB",
    nombre: "Universidad Gerardo Barrios",
    carreras: ["Enfermería", "Laboratorio Clínico", "Fisioterapia"],
    seoTitle: "Uniformes UGB — Universidad Gerardo Barrios | Confecciones Liss",
    seoDescription:
      "Uniformes clínicos con colores oficiales para UGB. Enfermería y Laboratorio Clínico. Confeccionados en San Miguel, El Salvador. Bordado incluido.",
  },
  unab: {
    sigla: "UNAB",
    nombre: "Universidad Andrés Bello",
    carreras: ["Enfermería", "Ciencias de la Salud", "Medicina"],
    seoTitle: "Uniformes UNAB — Universidad Andrés Bello | Confecciones Liss",
    seoDescription:
      "Scrubs universitarios con colores oficiales para UNAB. Enfermería y Ciencias de la Salud. Tela Sincatex, entrega en San Miguel, El Salvador.",
  },
  ues: {
    sigla: "UES",
    nombre: "Universidad de El Salvador",
    carreras: ["Medicina", "Enfermería", "Farmacia", "Odontología"],
    seoTitle: "Uniformes UES — Universidad de El Salvador | Confecciones Liss",
    seoDescription:
      "Uniformes clínicos con colores oficiales para la Universidad de El Salvador (UES). Medicina, Enfermería y Farmacia. Bordado de carrera incluido. San Miguel.",
  },
  uma: {
    sigla: "UMA",
    nombre: "Universidad Modular Abierta",
    carreras: ["Enfermería", "Salud Pública", "Trabajo Social"],
    seoTitle: "Uniformes UMA — Universidad Modular Abierta | Confecciones Liss",
    seoDescription:
      "Uniformes clínicos con colores oficiales para la UMA (Universidad Modular Abierta). Confeccionados a la medida en San Miguel, El Salvador.",
  },
};

// ── Slugs válidos ─────────────────────────────────────────────────────────────
const VALID_SLUGS = Object.keys(UNIVERSITY_CONFIG);

// ── Static params — Next.js genera una página por universidad en build time ───
export function generateStaticParams() {
  return VALID_SLUGS.map((universidad) => ({ universidad }));
}

// ── Metadata dinámica ─────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ universidad: string }>;
}): Promise<Metadata> {
  const { universidad } = await params;
  const config = UNIVERSITY_CONFIG[universidad];

  if (!config) return { title: "Universidad no encontrada" };

  const PAGE_URL = `${siteConfig.url}/catalogo/universidades/${universidad}`;

  return {
    title: config.seoTitle,
    description: config.seoDescription,
    alternates: { canonical: PAGE_URL },
    openGraph: {
      title: `Uniformes ${config.sigla} | Confecciones Liss`,
      description: config.seoDescription,
      url: PAGE_URL,
      siteName: siteConfig.name,
      locale: "es_SV",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: config.seoTitle,
      description: config.seoDescription,
      creator: siteConfig.twitterHandle,
    },
    robots: { index: true, follow: true },
  };
}

// ── Página ────────────────────────────────────────────────────────────────────
export default async function UniversidadPage({
  params,
}: {
  params: Promise<{ universidad: string }>;
}) {
  const { universidad } = await params;
  const univConfig = UNIVERSITY_CONFIG[universidad];

  // 404 para slugs no reconocidos
  if (!univConfig) notFound();

  // Fetch productos y categorías en paralelo desde Supabase (SSG)
  const [products, dbCategories] = await Promise.all([
    getProductsByUniversity(universidad),
    getCategoriesForUniversity(universidad),
  ]);

  // Construir CategoryConfig dinámico compatible con CatalogPageClient.
  // Las categorías de DB (carreras de esa universidad) reemplazan el hardcode.
  // Si DB no devuelve categorías, se usan las carreras hardcodeadas como fallback.
  const carreraOptions =
    dbCategories.length > 0
      ? dbCategories.map((cat) => ({
          value: cat.slug,
          label: cat.name,
        }))
      : univConfig.carreras.map((c) => ({
          value: c.toLowerCase().replace(/\s+/g, "-"),
          label: c,
        }));

  const carreraChips =
    dbCategories.length > 0
      ? [
          { label: "Todo", icon: "grid_view" },
          ...dbCategories.map((cat) => ({
            label: cat.name,
            icon: "medical_services",
          })),
        ]
      : [
          { label: "Todo", icon: "grid_view" },
          ...univConfig.carreras.map((c) => ({
            label: c,
            icon: "medical_services",
          })),
        ];

  const catalogConfig: CategoryConfig = {
    // sector = "universitario" es CRÍTICO: los links a producto detail apuntan
    // a /catalogo/universitario/[slug], que es la ruta existente de detalle.
    sector: "universitario",
    title: `Uniformes ${univConfig.sigla}`,
    subtitle: univConfig.sigla,
    description: `Scrubs clínicos con colores oficiales para ${univConfig.sigla} — ${univConfig.nombre}.`,
    seoDescription: univConfig.seoDescription,
    icon: "school",
    heroGradient:
      "bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white",
    heroFeatures: [
      { icon: "school", text: "Colores oficiales" },
      { icon: "verified", text: "Tela Sincatex" },
      { icon: "draw", text: "Bordado de carrera" },
    ],
    trustFeatures: [
      { icon: "school", text: `Colores oficiales ${univConfig.sigla}` },
      { icon: "draw", text: "Bordado de carrera incluido" },
      { icon: "local_shipping", text: "Envío nacional" },
      { icon: "groups", text: "Precios grupales" },
    ],
    ctaBanner: {
      title: `¿Eres delegado de carrera en ${univConfig.sigla}?`,
      description:
        "Ofrecemos precios especiales para grupos de más de 10 unidades. Incluye bordado de carrera.",
      ctaText: "Cotizar para mi grupo",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Carrera",
        icon: "school",
        filterField: "tipo",
        options: carreraOptions,
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
          { value: "XXL", label: "XXL" },
        ],
      },
    ],
    categoryChips: carreraChips,
    hubImage: "/images/categorias/universitarios.webp",
    hubTagline: `Scrubs clínicos con colores oficiales de ${univConfig.sigla}`,
  };

  const PAGE_URL = `${siteConfig.url}/catalogo/universidades/${universidad}`;

  return (
    <>
      <OffersReadTracker />
      <CatalogPageClient
        sector="universitario"
        config={catalogConfig}
        initialProducts={products}
        breadcrumbExtra={{
          label: "Universidades",
          href: "/catalogo/universidades",
        }}
      />

      {/* JSON-LD: CollectionPage específico de universidad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: `Uniformes ${univConfig.sigla} | Confecciones Liss`,
            description: univConfig.seoDescription,
            url: PAGE_URL,
            numberOfItems: products.length,
            provider: {
              "@type": "LocalBusiness",
              name: siteConfig.name,
              url: siteConfig.url,
            },
          }).replace(/</g, "\\u003c"),
        }}
      />

      {/* JSON-LD: BreadcrumbList — Inicio › Catálogo › Universidades › [Sigla] */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
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
                name: "Catálogo",
                item: `${siteConfig.url}/catalogo`,
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Universidades",
                item: `${siteConfig.url}/catalogo/universidades`,
              },
              {
                "@type": "ListItem",
                position: 4,
                name: univConfig.sigla,
                item: PAGE_URL,
              },
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
