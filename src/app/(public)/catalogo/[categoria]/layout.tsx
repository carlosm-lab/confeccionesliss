import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CATEGORIES, SECTOR_SLUGS } from "@/data/categories";
import type { Sector } from "@/data/types";
import { siteConfig } from "@/config/site";

type LayoutParams = { categoria: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<LayoutParams>;
}): Promise<Metadata> {
  const { categoria } = await params;

  if (!SECTOR_SLUGS.includes(categoria as Sector)) return {};

  const config = CATEGORIES[categoria as Sector];

  return {
    title: `${config.title} | Confecciones Liss`,
    description: config.seoDescription,
    alternates: { canonical: `/catalogo/${categoria}` },
    openGraph: {
      title: `${config.title} | Confecciones Liss`,
      description: config.seoDescription,
      url: `${siteConfig.url}/catalogo/${categoria}`,
    },
  };
}

export default async function CategoriaLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { categoria } = await params;

  if (!SECTOR_SLUGS.includes(categoria as Sector)) notFound();

  return children;
}
