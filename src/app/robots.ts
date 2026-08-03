import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { env } from "@/env";

export default function robots(): MetadataRoute.Robots {
  const isBlogDisabled =
    env.NODE_ENV === "production" && env.NEXT_PUBLIC_ENABLE_BLOG !== "true";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/cuenta",
        "/login",
        "/api/",
        "/_next/",
        "/carrito",
        "/admin",
        "/sandbox",
        ...(isBlogDisabled ? ["/blog", "/blog/"] : []),
      ],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
