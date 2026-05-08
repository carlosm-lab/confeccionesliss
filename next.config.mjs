/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'X-XSS-Protection', value: '1; mode=block' }
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
        destination: "/catalogo/salud/:id",
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
