import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { SECTOR_SLUGS } from "@/data/categories";
import { ALL_PRODUCTS } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/catalogo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Páginas de categoría (dinámico)
  const categoryPages: MetadataRoute.Sitemap = SECTOR_SLUGS.map((sector) => ({
    url: `${siteConfig.url}/catalogo/${sector}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Páginas de producto (dinámico)
  const productPages: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: `${siteConfig.url}/catalogo/${product.sector}/${product.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
