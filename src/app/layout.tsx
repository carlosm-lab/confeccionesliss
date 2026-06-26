import {
  Manrope,
  Noto_Serif,
  Inter_Tight,
  Chivo_Mono,
  Public_Sans,
} from "next/font/google";
import "./globals.css";
import "@aejkatappaja/phantom-ui/ssr.css";

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

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-focal",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const chivoMono = Chivo_Mono({
  subsets: ["latin"],
  variable: "--font-chivo-mono",
  display: "swap",
  weight: ["400"],
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-publicsansrounded",
  display: "swap",
  weight: ["400", "600", "700"],
});

import { siteConfig } from "@/config/site";
import "@/env";

export const metadata = {
  title: {
    default:
      "Scrubs y Uniformes Médicos en San Miguel Sv | Desde $35 · Confecciones Liss",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title:
      "Scrubs y Uniformes Médicos en San Miguel Sv | Desde $35 · Confecciones Liss",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "website",
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
    title:
      "Scrubs y Uniformes Médicos en San Miguel Sv | Desde $35 · Confecciones Liss",
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
  },
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
      className={`${manrope.variable} ${notoSerif.variable} ${interTight.variable} ${chivoMono.variable} ${publicSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var SW_KEY   = '__liss_sw_ok__';
                  var BFKEY    = '__liss_bfc__';

                  // ── 1. Service Worker purge (once per browser session) ──────────────
                  if (!sessionStorage.getItem(SW_KEY) && 'serviceWorker' in navigator) {
                    sessionStorage.setItem(SW_KEY, '1');
                    navigator.serviceWorker.getRegistrations().then(function(regs) {
                      if (regs.length === 0) return;
                      Promise.all(regs.map(function(r) { return r.unregister(); }))
                        .then(function() {
                          if ('caches' in window) {
                            return caches.keys().then(function(keys) {
                              return Promise.all(keys.map(function(k) { return caches.delete(k); }));
                            });
                          }
                        })
                        .then(function() { window.location.reload(); });
                    });
                  }

                  // ── 2. Disk-cache detection via PerformanceNavigationTiming ─────────
                  window.addEventListener('load', function() {
                    try {
                      var nav = performance.getEntriesByType('navigation')[0];
                      if (nav && nav.transferSize === 0 && nav.encodedBodySize > 0) {
                        window.location.reload();
                      }
                    } catch(_) {}
                  });

                  // ── 3. Hydration watchdog ────────────────────────────────────────────
                  var WAS_ALIVE_KEY  = '__liss_was_alive__';
                  var ALIVE_THIS_KEY = '__liss_alive__';
                  var wasAlive = localStorage.getItem(WAS_ALIVE_KEY);
                  var isAliveNow = sessionStorage.getItem(ALIVE_THIS_KEY);

                  if (wasAlive && !isAliveNow) {
                    setTimeout(function() {
                      if (!sessionStorage.getItem(ALIVE_THIS_KEY)) {
                        window.location.reload();
                      }
                    }, 5000);
                  }

                  // ── 4. bfcache bust ──────────────────────────────────────────────────
                  window.addEventListener('pageshow', function(e) {
                    if (e.persisted) {
                      sessionStorage.removeItem(SW_KEY);
                      window.location.reload();
                    }
                  });

                } catch(e) {}
              })();
            `,
          }}
        />
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
