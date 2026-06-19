/** @type {import('next').NextConfig} */
const nextConfig = {
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

    const securityHeaders = isDev ? [] : [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
      { key: 'X-XSS-Protection', value: '1; mode=block' },
      {
        key: 'Content-Security-Policy',
        value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://fonts.googleapis.com; img-src 'self' data: https://lh3.googleusercontent.com; font-src 'self' data: https://cdnjs.cloudflare.com https://fonts.gstatic.com; connect-src 'self' ws: wss: https://cvbdqsxjfrbwovzpydng.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.in; frame-src 'self' https://challenges.cloudflare.com https://www.google.com;",
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
        headers: [...commonHeaders, ...securityHeaders],
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
    ],
  },

};

export default nextConfig;
