import { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CATALOG_PAGES } from "@/data/catalog-pages";
import { SERVICE_PAGES } from "@/data/services";
import { ALL_PRODUCTS } from "@/data/products";
import { env } from "@/env";

export default function sitemap(): MetadataRoute.Sitemap {
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

  // Páginas estáticas (para desarrollo/pruebas)
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
    {
      url: `${siteConfig.url}/servicios`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/links`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/updates`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  // Páginas de categoría del catálogo
  const categoryPages: MetadataRoute.Sitemap = CATALOG_PAGES.map((page) => {
    const priority = page.slug === page.parentSector ? 0.85 : 0.7;
    return {
      url: `${siteConfig.url}/catalogo/${page.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority,
    };
  });

  // Artículos de servicios (blog)
  const servicePages: MetadataRoute.Sitemap = SERVICE_PAGES.map((page) => ({
    url: `${siteConfig.url}/servicios/${page.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Páginas de producto bajo catálogo (únicas, usando el sector principal del producto para evitar duplicados)
  const productPages: MetadataRoute.Sitemap = ALL_PRODUCTS.map((product) => ({
    url: `${siteConfig.url}/catalogo/${product.sector}/${product.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...servicePages, ...productPages];
}
