import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";
// phantom-ui/ssr.css eliminado: el Web Component <phantom-ui> nunca se usa en JSX
// (los loading.tsx usan Shimmer propio con animate-pulse de Tailwind).
// Este import añadía un chunk CSS render-blocking innecesario.

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

import { siteConfig } from "@/config/site";
import { env } from "@/env";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";
import { MaterialSymbolsLoader } from "@/components/layout/MaterialSymbolsLoader";

export const metadata = {
  title: {
    default: "Scrubs y Uniformes Médicos en San Miguel, El Salvador | Liss",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: "Scrubs y Uniformes Médicos en San Miguel, El Salvador | Liss",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        secureUrl: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Confecciones Liss — Scrubs y Uniformes Médicos en San Miguel, El Salvador",
        type: "image/png",
      },
    ],
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
  twitter: {
    card: "summary_large_image",
    title: "Scrubs y Uniformes Médicos en San Miguel, El Salvador | Liss",
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    site: siteConfig.twitterHandle,
    images: [`${siteConfig.url}/opengraph-image`],
  },
  ...(siteConfig.facebookAppId && {
    facebook: {
      appId: siteConfig.facebookAppId,
    },
  }),
};

export const viewport = {
  themeColor: "#055e38",
  width: "device-width",
  initialScale: 1,
};

import { Providers } from "@/providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${manrope.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://cvbdqsxjfrbwovzpydng.supabase.co"
          crossOrigin="anonymous"
        />
        {/*
         * Preload explícito del hero image (LCP) — emitido desde StaticHeroImage.tsx
         * (Server Component) usando ReactDOM.preload() para evitar aplicarlo globalmente.
         */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "ClothingStore",
                  "@id": `${siteConfig.url}/#business`,
                  name: siteConfig.name,
                  alternateName: [
                    "Confeccion Liss",
                    "Confecciones Liss San Miguel",
                  ],
                  description: siteConfig.description,
                  url: siteConfig.url,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteConfig.url}/logo.svg`,
                  },
                  image: `${siteConfig.url}/opengraph-image`,
                  telephone: siteConfig.phone,
                  email: siteConfig.email,
                  priceRange: "$$",
                  currenciesAccepted: "USD",
                  paymentAccepted: "Cash, Bank Transfer",
                  openingHours: ["Mo-Sa 08:00-17:00"],
                  hasMap: siteConfig.links.googleMaps,
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: siteConfig.address.full,
                    addressLocality: siteConfig.address.city,
                    addressRegion: "San Miguel",
                    addressCountry: "SV",
                    postalCode: "3100",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: siteConfig.geo.lat,
                    longitude: siteConfig.geo.lng,
                  },
                  areaServed: [
                    { "@type": "Country", name: "El Salvador" },
                    { "@type": "AdministrativeArea", name: "San Miguel" },
                    { "@type": "AdministrativeArea", name: "Usulután" },
                    { "@type": "AdministrativeArea", name: "La Unión" },
                    { "@type": "AdministrativeArea", name: "Morazán" },
                  ],
                  sameAs: [
                    siteConfig.links.facebook,
                    siteConfig.links.instagram,
                    siteConfig.links.tiktok,
                    siteConfig.links.youtube,
                    siteConfig.links.threads,
                    siteConfig.links.twitter,
                    siteConfig.links.googleMaps,
                  ],
                  offers: {
                    "@type": "Offer",
                    priceCurrency: "USD",
                    price: "35.00",
                    priceSpecification: {
                      "@type": "PriceSpecification",
                      minPrice: "35.00",
                      priceCurrency: "USD",
                    },
                  },
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Servicios de Confección",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Scrubs médicos a la medida en tela Sincatex",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Uniformes universitarios para IEPROES, UNIVO, UNAB, UGB, UES, UMA y más",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Uniformes escolares para colegios y escuelas",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Uniformes corporativos con bordado de logo",
                        },
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Bordados y sublimación en cualquier prenda",
                        },
                      },
                    ],
                  },
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}/#website`,
                  url: siteConfig.url,
                  name: siteConfig.name,
                  description: siteConfig.description,
                  inLanguage: "es-SV",
                  publisher: { "@id": `${siteConfig.url}/#business` },
                },
              ],
            }).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        {/* Material Symbols: carga async post-hidratación, no bloquea LCP/FCP */}
        <MaterialSymbolsLoader />
        <Providers>{children}</Providers>
        <AnalyticsScripts
          gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
          pixelId={env.NEXT_PUBLIC_META_PIXEL_ID}
        />
      </body>
    </html>
  );
}
