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
      // '@lit/reactive-element/reactive-element.js' y 'lit-html/lit-html.js'
      // no están en los exports maps de sus paquetes, por lo que Turbopack
      // los resuelve via acceso directo al archivo (sin exports condition).
      // El archivo raíz .js es el build de producción (sin DEV_MODE = true).
      // Nota: NO usar path.resolve() — Turbopack en Windows no acepta rutas
      // absolutas con backslash ("windows imports are not implemented yet").
      '@lit/reactive-element': '@lit/reactive-element/reactive-element.js',
      'lit-html': 'lit-html/lit-html.js',
    },
  },
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.189"],
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    
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
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data: https://lh3.googleusercontent.com; font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com; connect-src 'self' ws: wss: https://cvbdqsxjfrbwovzpydng.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.in; frame-src 'self' https://challenges.cloudflare.com https://www.google.com; report-uri /api/csp-report;",
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), interesting-features=()',
      },
    ];

    return [
      {
        // 1. Rutas dinámicas / privadas / interactivas (evitar cache por completo)
        source: '/(admin|cuenta|api|auth)/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate, proxy-revalidate' },
          { key: 'Pragma', value: 'no-cache' },
          { key: 'Expires', value: '0' },
          { key: 'Surrogate-Control', value: 'no-store' },
          ...alwaysOnHeaders,
          ...securityHeaders,
        ],
      },
      {
        // 2. Rutas públicas (SSG optimizado para CDNs y navegadores)
        source: '/((?!admin|cuenta|api|auth|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf|eot|otf|css|js|map)).*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, stale-while-revalidate=86400' },
          ...alwaysOnHeaders,
          ...securityHeaders,
        ],
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
