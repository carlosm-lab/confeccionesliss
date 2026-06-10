import { Manrope, Noto_Serif } from "next/font/google";
import "./globals.css";

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
    canonical: "./",
  },
  openGraph: {
    title:
      "Scrubs y Uniformes Médicos en San Miguel Sv | Desde $35 · Confecciones Liss",
    description:
      "Confección profesional a la medida en San Miguel. Scrubs, uniformes universitarios, escolares y corporativos a la medida. Pago al recibir.",
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
      className={`${manrope.variable} ${notoSerif.variable}`}
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
                  // sessionStorage is cleared on full browser close, so every new session
                  // gets exactly one SW check. The flag is set BEFORE reload() to prevent
                  // infinite loops (reload() keeps sessionStorage alive).
                  if (!sessionStorage.getItem(SW_KEY) && 'serviceWorker' in navigator) {
                    sessionStorage.setItem(SW_KEY, '1'); // set flag FIRST to stop loops

                    navigator.serviceWorker.getRegistrations().then(function(regs) {
                      if (regs.length === 0) return; // nothing to do

                      // Unregister every SW and wipe all caches, then hard-reload.
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
                  // When Chrome restores a tab from its internal session snapshot it may
                  // serve the page from its disk cache without a network round-trip.
                  // transferSize === 0 + encodedBodySize > 0  →  served from cache.
                  // We schedule this check after load so the timing entry is populated.
                  window.addEventListener('load', function() {
                    try {
                      var nav = performance.getEntriesByType('navigation')[0];
                      if (nav && nav.transferSize === 0 && nav.encodedBodySize > 0) {
                        // Page came from disk cache — force a true network fetch.
                        window.location.reload();
                      }
                    } catch(_) {}
                  });

                  // ── 4. Hydration watchdog ────────────────────────────────────────────
                  // localStorage persists across browser close/open (unlike sessionStorage).
                  // If React mounted successfully before (__liss_was_alive__ in localStorage)
                  // but hasn't confirmed it's alive in THIS session within 5s, the page is
                  // a zombie — force a reload. The React component sets __liss_alive__ on
                  // mount via useEffect, which cancels the watchdog silently.
                  var WAS_ALIVE_KEY  = '__liss_was_alive__';
                  var ALIVE_THIS_KEY = '__liss_alive__';
                  var wasAlive = localStorage.getItem(WAS_ALIVE_KEY);
                  var isAliveNow = sessionStorage.getItem(ALIVE_THIS_KEY);

                  if (wasAlive && !isAliveNow) {
                    setTimeout(function() {
                      if (!sessionStorage.getItem(ALIVE_THIS_KEY)) {
                        // React never mounted in 5s — dead page, force reload.
                        window.location.reload();
                      }
                    }, 5000);
                  }
                  // pageshow fires with persisted=true when the browser serves the page
                  // from the back/forward cache (bfcache). React is frozen in that state.
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
              "@type": "TailoringShop",
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
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday",
                ],
                opens: "08:00",
                closes: "17:00",
              },
              sameAs: [
                siteConfig.links.facebook,
                siteConfig.links.instagram,
                siteConfig.links.tiktok,
                siteConfig.links.youtube,
                siteConfig.links.threads,
                siteConfig.links.twitter,
                siteConfig.links.linkedin,
                siteConfig.links.pinterest,
              ],
              priceRange: "$$",
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
