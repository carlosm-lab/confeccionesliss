import { notFound } from "next/navigation";
import { getProductsBySector } from "@/data/products";
import { CATEGORIES, SECTOR_SLUGS } from "@/data/categories";
import type { Sector } from "@/data/types";
import { CatalogClientShell } from "@/components/catalogo/CatalogClientShell";

export function generateStaticParams() {
  return SECTOR_SLUGS.map((categoria) => ({ categoria }));
}

type PageParams = { categoria: string };

export default async function CategoriaPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { categoria } = await params;

  if (!SECTOR_SLUGS.includes(categoria as Sector)) notFound();

  const config = CATEGORIES[categoria as Sector];
  const products = getProductsBySector(categoria as Sector);

  return <CatalogClientShell products={products} config={config} />;
}
