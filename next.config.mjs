/** @type {import('next').NextConfig} */
// fileURLToPath + URL reemplazan __dirname en ESM (.mjs)
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  turbopack: {
    // Fija el workspace root explícitamente para evitar que Turbopack
    // detecte erróneamente .next/dev/ como root (los package.json que
    // Next.js genera ahí confunden la detección automática).
    // Documentación: https://nextjs.org/docs/app/api-reference/config/next-config-js/turbopack#root-directory
    root: __dirname,

    // FIX: "Lit is in dev mode" warning en `next dev`.
    // Causa raíz: Turbopack activa la condición "development" del exports map
    // de @lit/reactive-element y lit-html durante dev, seleccionando los
    // archivos en ./development/ donde const DEV_MODE = true está hardcoded.
    // lit/index.js (dep de @aejkatappaja/phantom-ui) hace bare imports de
    // estos paquetes, que Turbopack resuelve via exports map → dev build.
    // El alias apunta directamente a los builds de producción, saltando la
    // resolución de export conditions. Fix real, no supresión.
    resolveAlias: {
      '@lit/reactive-element': path.resolve(
        __dirname,
        'node_modules/@lit/reactive-element/reactive-element.js'
      ),
      'lit-html': path.resolve(
        __dirname,
        'node_modules/lit-html/lit-html.js'
      ),
    },
  },
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.189"],
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    const commonHeaders = [
      // Prevent ALL caching of HTML documents so the browser always fetches fresh
      // from the server when restoring a session — this is the root cause of the
      // "dead page" problem on browser reopen.
      { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
      { key: 'Pragma', value: 'no-cache' },
      { key: 'Expires', value: '0' },
      { key: 'Surrogate-Control', value: 'no-store' },
    ];

    // SEC-006 fix: headers aplicados SIEMPRE (dev + prod)
    // X-Frame-Options, X-Content-Type-Options y Referrer-Policy son seguros en dev.
    // X-XSS-Protection es heredado pero inofensivo.
    // HSTS excluido de dev (HSTS en localhost rompe el ambiente local).
    // CSP excluido de dev (interferencia con HMR de Next.js).
    const alwaysOnHeaders = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
    ];

    const securityHeaders = isDev ? [] : [
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      {
        key: 'Content-Security-Policy',
        // report-uri: los navegadores envían automáticamente un POST a /api/csp-report
        // cuando bloquean un recurso — crea un log de auditoría de intentos de XSS.
        // report-to es el estándar moderno, report-uri es el legacy con mayor soporte.
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data: https://lh3.googleusercontent.com; font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com; connect-src 'self' ws: wss: https://cvbdqsxjfrbwovzpydng.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.in; frame-src 'self' https://challenges.cloudflare.com https://www.google.com; report-uri /api/csp-report;",
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interesting-features=()',
      },
    ];

    return [
      {
        // Apply no-cache headers to all HTML page routes (not static assets)
        source: '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|otf|css|js|map)).*)',
        headers: [...commonHeaders, ...alwaysOnHeaders, ...securityHeaders],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/(.*)",
        destination: "https://www.confeccionesliss.com/$1",
        permanent: true,
        has: [{ type: "host", value: "confeccionesliss.com" }],
      },
      {
        source: "/producto/:id",
        destination: "/catalogo",
        permanent: true,
      },
      {
        source: "/servicios/:slug((?!opengraph-image|twitter-image)[^/]+)/:rest*",
        destination: "/servicios",
        permanent: true,
      },
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cvbdqsxjfrbwovzpydng.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },

};

export default nextConfig;
