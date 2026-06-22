import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { env } from "@/env";
import { getAllProductsForSitemap } from "@/lib/catalogService";
import { CATEGORIES } from "@/data/categories";
import type { Sector } from "@/data/types";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // If in Home-Only mode (production initial deploy), the sitemap must ONLY contain the home page URL.
  if (env.NEXT_PUBLIC_HOME_ONLY === "true") {
    return [
      {
        url: siteConfig.url,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 1.0,
      },
    ];
  }

  // Páginas estáticas del sitio
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now, // ISR: cambia con cada nueva build/revalidación
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/catalogo`,
      lastModified: now, // ISR: se revalida cada hora
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: new Date("2025-06-15"), // Página estática — no cambia frecuentemente
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/servicios`,
      lastModified: new Date("2025-06-15"), // Página estática — no cambia frecuentemente
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/links`,
      lastModified: new Date("2025-06-15"), // Página estática — no cambia frecuentemente
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/updates`,
      lastModified: now, // Changelog — se actualiza con cada deploy
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/legal`,
      lastModified: new Date("2025-06-15"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/legal/privacidad`,
      lastModified: new Date("2025-06-15"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/legal/terminos`,
      lastModified: new Date("2025-06-15"),
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Páginas de categoría del catálogo (una por sector)
  const sectorPages: MetadataRoute.Sitemap = (
    Object.keys(CATEGORIES) as Sector[]
  ).map((sector) => ({
    url: `${siteConfig.url}/catalogo/${sector}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // Páginas de productos individuales (desde Supabase)
  let productPages: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProductsForSitemap();
    productPages = products
      .filter((p) => p.slug)
      .map((p) => ({
        url: `${siteConfig.url}/catalogo/${p.sector}/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : now,
        changeFrequency: "weekly" as const,
        priority: 0.75,
      }));
  } catch {
    // Si Supabase no está disponible en build time, omitir productos del sitemap
    console.warn("[sitemap] Could not fetch products for sitemap");
  }

  return [...staticPages, ...sectorPages, ...productPages];
}
