"use server";
/**
 * Server Actions para revalidación on-demand del catálogo al modificar categorías.
 *
 * ARQUITECTURA:
 * El admin de categorías (/admin/categories) hace CRUD directo desde un Client Component.
 * Después de cada insert/update/delete, el client llama esta action para expirar
 * los datos cacheados de categorías en el Data Cache de Next.js y regenerar las rutas
 * públicas afectadas.
 */

import { revalidatePath, revalidateTag } from "next/cache";

/**
 * Invalida las rutas de Next.js afectadas por la creación, edición o eliminación
 * de una categoría. Llamar desde el admin después de INSERT / UPDATE / DELETE
 * en la tabla `categories`.
 */
export async function revalidateAfterCategorySave(): Promise<void> {
  // 1. Expirar datos de categorías en el Data Cache (instantáneo).
  revalidateTag("categories", { expire: 0 });
  revalidateTag("product-counts", { expire: 0 });

  // 2. Invalidar Full Route Cache de las rutas que muestran categorías.
  revalidatePath("/");
  revalidatePath("/catalogo");

  // Revalidar todos los sectores conocidos y sus categorías.
  const sectors = [
    "scrubs",
    "escolar",
    "corporativo",
    "accesorios",
    "bordados",
  ];
  for (const sector of sectors) {
    revalidatePath(`/catalogo/${sector}`);
  }

  // Revalidar hub universitario y todas las universidades.
  revalidatePath("/catalogo/universidades");
  const universities = ["univo", "ieproes", "ugb", "unab", "ues", "uma"];
  for (const uni of universities) {
    revalidatePath(`/catalogo/universidades/${uni}`);
  }
}
