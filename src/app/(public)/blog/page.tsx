import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/config/site";
import { env } from "@/env";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Icon } from "@/components/ui/icons/Icon";
import {
  getAllBlogPosts,
  getPublishedBlogPosts,
  getFeaturedBlogPosts,
} from "@/data/blog-posts";
import { BlogIndexClient } from "@/components/blog/BlogIndexClient";

export const metadata: Metadata = {
  title: "Blog de Uniformes Médicos y Universitarios | Confecciones Liss",
  description:
    "Guías oficiales sobre uniformes de salud, requerimientos por universidad (UNIVO, IEPROES, UGB, UNAB, UES, UMA), normativas MINSAL y consejos de confección en San Miguel, El Salvador.",
  keywords: [
    "blog uniformes médicos El Salvador",
    "uniformes UNIVO San Miguel",
    "uniforme enfermería IEPROES",
    "uniforme UGB medicina",
    "uniformes UES San Miguel",
    "lineamientos MINSAL uniforme enfermería",
    "tela Sincatex antifluidos",
  ],
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Blog de Uniformes Médicos y Universitarios | Confecciones Liss",
    description:
      "Guías oficiales sobre uniformes de salud, requerimientos por universidad y normativas del MINSAL en San Miguel, El Salvador.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Uniformes Médicos y Universitarios | Confecciones Liss",
    description:
      "Guías oficiales sobre uniformes de salud, requerimientos por universidad y normativas del MINSAL en El Salvador.",
  },
};

export default function BlogIndexPage() {
  if (
    process.env.NODE_ENV === "production" &&
    env.NEXT_PUBLIC_ENABLE_BLOG !== "true"
  ) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const publishedPosts = getPublishedBlogPosts();
  const featuredPosts = getFeaturedBlogPosts();

  const whatsappUrl = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(
    "Hola Confecciones Liss, estuve leyendo el blog y necesito información sobre uniformes / asesoría de talla y color."
  )}`;

  const blogPostEntities = publishedPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.metaDescripcion,
    url: `${siteConfig.url}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteConfig.url}/blog#webpage`,
        url: `${siteConfig.url}/blog`,
        name: "Blog de Uniformes Médicos y Universitarios",
        description: metadata.description,
        breadcrumb: {
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
              name: "Blog",
              item: `${siteConfig.url}/blog`,
            },
          ],
        },
      },
      {
        "@type": "Blog",
        "@id": `${siteConfig.url}/blog#blog`,
        url: `${siteConfig.url}/blog`,
        name: "Blog de Confecciones Liss",
        description: metadata.description,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
        blogPost: blogPostEntities,
      },
    ],
  };

  return (
    <main
      id="blog-main"
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-on-surface)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* ── HERO SECTION (Compact spacing, Desktop 2-col, Tablet/Mobile 1-col) ── */}
      <section className="bg-surface px-5 pt-6 pb-4 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <div className="lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
            {/* Left Content (Full width on mobile/tablet, 7-cols on desktop) */}
            <div className="space-y-3 lg:col-span-7">
              <Breadcrumb
                items={[{ label: "Inicio", href: "/" }, { label: "Blog" }]}
                className="animate-fade-in-up mb-4"
              />

              <h1 className="animate-fade-in-up text-primary font-serif text-3xl leading-tight font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Blog de Confecciones Liss
              </h1>

              <p className="animate-fade-in-up max-w-2xl text-sm leading-relaxed text-gray-600 sm:text-base">
                Guías oficiales sobre uniformes de salud, requerimientos por
                universidad (UNIVO, IEPROES, UGB, UNAB, UES, UMA), normativas
                MINSAL y consejos de confección en San Miguel y la zona oriental
                de El Salvador.
              </p>

              {/* Stat Indicators Cards Below Description */}
              <div className="animate-fade-in-up flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-4 py-3 shadow-2xs">
                  <span className="text-primary font-serif text-2xl font-bold">
                    20
                  </span>
                  <div className="text-xs">
                    <strong className="block font-bold text-gray-900">
                      20 Guías disponibles
                    </strong>
                    <span className="text-gray-400">
                      Actualizado semanalmente
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white px-4 py-3 shadow-2xs">
                  <span className="text-primary font-serif text-2xl font-bold">
                    8
                  </span>
                  <div className="text-xs">
                    <strong className="block font-bold text-gray-900">
                      Próximas publicaciones
                    </strong>
                    <span className="text-gray-400">
                      Nuevas guías en preparación
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Desktop CTA Card (DESKTOP ONLY: hidden lg:block lg:col-span-5) */}
            <div className="hidden lg:col-span-5 lg:block">
              <div className="bg-primary relative space-y-3 overflow-hidden rounded-2xl border border-white/10 p-5 text-white shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15 text-white backdrop-blur-xs">
                    <Icon name="chat" size={16} />
                  </div>
                  <span className="text-xs font-semibold text-blue-100">
                    ¿Necesitas ayuda?
                  </span>
                </div>

                <h2 className="font-serif text-base leading-snug font-bold text-white">
                  ¿Tienes dudas sobre los colores oficiales de tu carrera o
                  necesitas medir tu talla?
                </h2>

                <p className="text-xs leading-relaxed text-blue-100/90">
                  Confeccionamos uniformes médicos y universitarios de salud
                  desde 2005. Te ayudamos a elegir la tela antifluidos ideal
                  (Sincatex, Lino Oxford), la talla correcta e incluimos bordado
                  personalizado.
                </p>

                <div className="flex flex-col gap-2 pt-1 sm:flex-row">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary flex items-center justify-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold shadow-xs transition hover:bg-blue-50 focus:outline-none"
                  >
                    <Icon name="chat" size={14} />
                    Escríbenos por WhatsApp
                  </a>

                  <Link
                    href="/catalogo"
                    className="flex items-center justify-center gap-1.5 rounded-xl border border-white/30 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white backdrop-blur-xs transition hover:bg-white/20 focus:outline-none"
                  >
                    Explorar catálogo
                    <Icon name="arrow_forward" size={13} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTENT BODY (Featured Articles + Sidebar + Main Grid) ── */}
      <section className="bg-surface px-5 pt-6 pb-20 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <BlogIndexClient
            publishedPosts={allPosts}
            featuredPosts={featuredPosts}
          />
        </div>
      </section>
    </main>
  );
}
