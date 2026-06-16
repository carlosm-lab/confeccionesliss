import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

const PAGE_URL = `${siteConfig.url}/contacto`;
const PAGE_TITLE = "Contacto | Confecciones Liss";
const PAGE_DESCRIPTION =
  "Contáctanos en San Miguel, El Salvador. WhatsApp +503 7331-7181, correo confeccionesliss.contacto@gmail.com. Lun–Sáb 8:00 AM – 5:00 PM. Barrio La Merced.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description:
      "Ubícanos en Barrio La Merced, San Miguel. WhatsApp, correo y redes sociales. Atendemos pedidos individuales, grupales e institucionales.",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

/* ── Data ─────────────────────────────────────────────────────────── */

const SOCIAL_LINKS = [
  {
    name: "WhatsApp",
    svgPath:
      "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z",
    href: siteConfig.links.whatsappDirect,
    handle: "Info & Ventas",
    color: "#25D366",
  },
  {
    name: "Página web",
    svgPath:
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    href: "https://www.confeccionesliss.com/",
    handle: "Catálogo y Compras",
    color: "#4c55b6",
  },
  {
    name: "Página de Facebook",
    svgPath:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    href: siteConfig.links.facebook,
    handle: "confeccionliss",
    color: "#1877F2",
  },
  {
    name: "Perfil de Facebook",
    svgPath:
      "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
    href: "https://web.facebook.com/confeccionliss.admin/",
    handle: "Administración",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    svgPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
    href: siteConfig.links.instagram,
    handle: "@confeccionliss",
    color: "#E1306C",
  },
  {
    name: "TikTok",
    svgPath:
      "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
    href: siteConfig.links.tiktok,
    handle: "@confeccionliss",
    color: "#010101",
  },
  {
    name: "Threads",
    svgPath:
      "M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z",
    href: siteConfig.links.threads,
    handle: "@confeccionliss",
    color: "#010101",
  },
  {
    name: "X (Twitter)",
    svgPath:
      "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.847L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117Z",
    href: siteConfig.links.twitter,
    handle: "@confeccionliss",
    color: "#010101",
  },
  {
    name: "YouTube",
    svgPath:
      "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
    href: siteConfig.links.youtube,
    handle: "@confeccionliss",
    color: "#FF0000",
  },
  {
    name: "LinkedIn",
    svgPath:
      "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
    href: siteConfig.links.linkedin,
    handle: "confeccionliss",
    color: "#0077B5",
  },
  {
    name: "Pinterest",
    svgPath:
      "M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z",
    href: siteConfig.links.pinterest,
    handle: "confeccionliss",
    color: "#E60023",
  },
  {
    name: "MarketPlace",
    svgPath:
      "M11.985 0C5.365 0 0 5.4 0 12.064c0 6.028 4.388 11.022 10.133 11.902V15.58H7.09v-3.516h3.042v-2.68c0-3.027 1.79-4.698 4.537-4.698 1.312 0 2.684.236 2.684.236v2.971H15.83c-1.489 0-1.953.932-1.953 1.887v2.284h3.325l-.53 3.516h-2.795v8.386C19.607 23.081 24 18.088 24 12.064 24 5.4 18.602 0 11.985 0z",
    href: "https://web.facebook.com/marketplace/profile/61556619779863/",
    handle: "Catálogo Facebook",
    color: "#1877F2",
  },
  {
    name: "Ubicación",
    svgPath:
      "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
    href: siteConfig.links.googleMaps,
    handle: "Visítanos",
    color: "#EA4335",
  },
];

const CONTACT_CHANNELS = [
  {
    icon: "call",
    label: "WhatsApp",
    value: siteConfig.phone,
    href: siteConfig.links.whatsappDirect,
    description: "Respuesta inmediata",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    descIcon: "check_circle",
    descColor: "text-green-600",
  },
  {
    icon: "mail",
    label: "Correo electrónico",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    description: "Cotizaciones formales",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: "location_on",
    label: "Dirección",
    value: `${siteConfig.address.neighborhood}, ${siteConfig.address.street}, ${siteConfig.address.city}, ${siteConfig.address.country}`,
    href: siteConfig.links.googleMaps,
    description: siteConfig.address.reference,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: "schedule",
    label: "Horario",
    value: siteConfig.schedule,
    href: undefined,
    description: "Atención presencial y por WhatsApp",
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
  },
];

/* ── Page ──────────────────────────────────────────────────────────── */

export default function ContactoPage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressCountry: "SV",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.lat,
      longitude: siteConfig.geo.lng,
    },
    openingHours: "Mo-Sa 08:00-17:00",
    priceRange: "$$",
    image: `${siteConfig.url}/logo.png`,
    sameAs: [
      siteConfig.links.facebook,
      siteConfig.links.instagram,
      siteConfig.links.tiktok,
      siteConfig.links.youtube,
      siteConfig.links.threads,
      siteConfig.links.twitter,
    ],
  };

  const breadcrumbSchema = {
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
        name: "Contacto",
        item: `${siteConfig.url}/contacto`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema).replace(/</g, "\\u003c"),
        }}
      />

      <main className="relative overflow-hidden px-5 pb-20 md:px-8">
        {/* Subtle topographic background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='600' height='600' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 300c100-50 200 50 300 0s200-50 300 0' fill='none' stroke='%231e3a5f' stroke-width='1.5'/%3E%3Cpath d='M0 350c100-50 200 50 300 0s200-50 300 0' fill='none' stroke='%231e3a5f' stroke-width='1'/%3E%3Cpath d='M0 250c100-50 200 50 300 0s200-50 300 0' fill='none' stroke='%231e3a5f' stroke-width='1'/%3E%3Cpath d='M0 200c80-30 180 60 280 10s180-40 320 10' fill='none' stroke='%231e3a5f' stroke-width='.8'/%3E%3Cpath d='M0 400c80-30 180 60 280 10s180-40 320 10' fill='none' stroke='%231e3a5f' stroke-width='.8'/%3E%3C/svg%3E")`,
            backgroundSize: "600px 600px",
          }}
        />

        <div className="relative mx-auto max-w-screen-2xl">
          {/* ── Header ──────────────────────────────────────────── */}
          <section className="flex flex-col items-start pt-6 pb-0 text-left">
            <Breadcrumb
              items={[{ label: "Inicio", href: "/" }, { label: "Contacto" }]}
              className="animate-fade-in-up mb-6 justify-start"
            />

            <h1
              className="animate-fade-in-up text-primary font-serif text-3xl font-bold md:text-4xl lg:text-5xl"
              style={{ animationDelay: "100ms" }}
            >
              Contáctanos
            </h1>
            <p
              className="animate-fade-in-up mt-4 max-w-xl text-base leading-relaxed text-gray-500 md:text-lg"
              style={{ animationDelay: "200ms" }}
            >
              Estamos listos para ayudarte con tu pedido.
              <br className="hidden sm:block" />
              Escríbenos, llámanos o visítanos en nuestro taller en San Miguel.
            </p>
          </section>

          {/* ── Main content grid ──────────────────────────────── */}
          <section className="mt-12 mb-6 grid gap-6 lg:grid-cols-5">
            {/* Contact info card */}
            <div
              className="animate-fade-in-up group border-primary/35 hover:border-primary/55 relative rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] md:p-8 lg:col-span-2"
              style={{ animationDelay: "300ms" }}
            >
              <h2 className="text-primary mb-6 font-serif text-xl font-bold md:text-2xl">
                Información de contacto
              </h2>

              <div className="divide-y divide-gray-100">
                {CONTACT_CHANNELS.map((ch) => (
                  <div
                    key={ch.label}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <div
                      className={`${ch.iconBg} ${ch.iconColor} flex h-12 w-12 shrink-0 items-center justify-center rounded-full`}
                    >
                      <span
                        className="material-symbols-outlined text-xl"
                        aria-hidden="true"
                      >
                        {ch.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-gray-900">
                        {ch.label}
                      </h3>
                      {ch.href ? (
                        <a
                          href={ch.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary text-sm font-medium break-all hover:underline"
                        >
                          {ch.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-gray-700">
                          {ch.value}
                        </p>
                      )}
                      {ch.description && (
                        <p
                          className={`mt-0.5 flex items-center gap-1 text-xs ${
                            "descIcon" in ch && ch.descIcon
                              ? ch.descColor
                              : "text-gray-500"
                          }`}
                        >
                          {"descIcon" in ch && ch.descIcon && (
                            <span
                              className="material-symbols-outlined text-xs"
                              aria-hidden="true"
                            >
                              {ch.descIcon}
                            </span>
                          )}
                          {ch.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map with overlay card */}
            <div
              className="animate-fade-in-up relative lg:col-span-3"
              style={{ animationDelay: "350ms" }}
            >
              <div className="group border-primary/35 hover:border-primary/55 relative h-full min-h-[400px] overflow-hidden rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]">
                <iframe
                  title="Ubicación de Confecciones Liss en Google Maps"
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d861!2d${siteConfig.geo.lng}!3d${siteConfig.geo.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f7b2bcd05889217%3A0x9e418141663f87ef!2sConfecciones%20Liss!5e0!3m2!1ses!2ssv!4v1`}
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: "400px" }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full"
                />
              </div>
            </div>
          </section>

          {/* ── Bottom: Social + How to get there ──────────────── */}
          <section className="grid gap-x-8 gap-y-6 lg:grid-cols-2 lg:gap-y-4">
            {/* Title */}
            <div
              className="animate-fade-in-up lg:col-start-1 lg:row-start-1"
              style={{ animationDelay: "400ms" }}
            >
              <h2 className="text-primary mb-2 font-serif text-lg font-bold lg:mb-0">
                Síguenos en redes
              </h2>
            </div>

            {/* Social links grid */}
            <div className="lg:col-start-1 lg:row-start-2">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
                {SOCIAL_LINKS.map((s, index) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="animate-fade-in-up group border-primary/35 hover:border-primary/55 flex items-center gap-2.5 rounded-xl border bg-white px-3 py-2.5 text-sm shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition hover:-translate-y-1 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] active:scale-[0.97]"
                    style={{ animationDelay: `${index * 50 + 450}ms` }}
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        className="h-4 w-4"
                        style={{ fill: s.color }}
                      >
                        <path d={s.svgPath} />
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <span className="block text-xs font-semibold text-gray-900">
                        {s.name}
                      </span>
                      <span className="block truncate text-[11px] text-gray-500">
                        {s.handle}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* How to get there */}
            <div
              className="animate-fade-in-up group border-primary/35 hover:border-primary/55 relative flex gap-4 self-start rounded-2xl border bg-blue-50/30 p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)] lg:col-start-2 lg:row-start-2"
              style={{ animationDelay: "500ms" }}
            >
              <div className="text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <span
                  className="material-symbols-outlined text-2xl"
                  aria-hidden="true"
                >
                  location_on
                </span>
              </div>
              <div>
                <h3 className="text-primary mb-2 font-semibold">
                  ¿Cómo llegar?
                </h3>
                <p className="text-sm leading-relaxed text-gray-700">
                  Estamos ubicados en{" "}
                  <strong>{siteConfig.address.neighborhood}</strong>,{" "}
                  {siteConfig.address.street}, San Miguel.{" "}
                  {siteConfig.address.reference}, aproximadamente a 50 metros.
                </p>
                <a
                  href={siteConfig.links.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary mt-3 inline-flex items-center gap-1 text-sm font-medium transition-transform hover:underline active:scale-[0.98]"
                >
                  <span
                    className="material-symbols-outlined text-base"
                    aria-hidden="true"
                  >
                    near_me
                  </span>
                  Abrir en Google Maps
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
