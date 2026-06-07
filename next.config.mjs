/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["192.168.1.189"],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { 
            key: 'Content-Security-Policy', 
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://lh3.googleusercontent.com; font-src 'self' data:; connect-src 'self' ws: wss: https://cvbdqsxjfrbwovzpydng.supabase.co https://cvbdqsxjfrbwovzpydng.supabase.in; frame-src 'self' https://challenges.cloudflare.com https://www.google.com;" 
          },
          { 
            key: 'Permissions-Policy', 
            value: 'camera=(), microphone=(), geolocation=(), interesting-features=()' 
          }
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
        destination: "/catalogo/scrubs/:id",
        permanent: true,
      },
      {
        source: "/catalogo/salud/:path*",
        destination: "/catalogo/scrubs/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;
