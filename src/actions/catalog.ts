"use server";
/**
 * Server Actions para revalidación on-demand del catálogo público.
 *
 * ARQUITECTURA (SEO_ANALISIS_CATALOGO_UNIVERSITARIO.txt — Parte 5):
 * En lugar de ISR por tiempo (revalidate = 3600), usamos revalidación on-demand.
 * Cuando el admin guarda o elimina un producto, este action invalida exactamente
 * las rutas afectadas. El resultado es inmediato y no genera carga innecesaria.
 *
 * Rutas invalidadas al guardar:
 *   - /                                  (home puede mostrar destacados)
 *   - /catalogo                          (hub principal)
 *   - /catalogo/[sector]                 (listing del sector)
 *   - /catalogo/[sector]/[slug]          (detalle del producto)
 *
 *   Adicional para productos universitarios (sector = "universitario"):
 *   - /catalogo/universidades            (hub universitario)
 *   - /catalogo/universidades/[category] (listing por universidad)
 *   - /catalogo/universidades/[category]/[slug] (detalle universitario)
 */

import { revalidatePath } from "next/cache";

interface RevalidateProductParams {
  /** Sector del producto tal como está en la BD (e.g. "scrubs", "universitario") */
  sector: string;
  /** Slug del producto */
  slug: string;
  /** Categoría del producto (e.g. "univo", "enfermeria") — requerida para universitario */
  category?: string | null;
}

/**
 * Invalida las rutas de Next.js afectadas por el guardado o eliminación de un producto.
 * Llamar desde el admin después de INSERT / UPDATE / DELETE en la tabla `products`.
 */
export async function revalidateAfterProductSave({
  sector,
  slug,
  category,
}: RevalidateProductParams): Promise<void> {
  // Siempre: hub principal y home
  revalidatePath("/catalogo");
  revalidatePath("/");

  if (sector === "universitario") {
    // Hub universitario
    revalidatePath("/catalogo/universidades");

    const validUniversitySlugs = [
      "univo",
      "ieproes",
      "ugb",
      "unab",
      "ues",
      "uma",
    ];
    const prefix = category ? category.split("-")[0] : null;

    if (prefix && validUniversitySlugs.includes(prefix)) {
      revalidatePath(`/catalogo/universidades/${prefix}`);
      revalidatePath(`/catalogo/universidades/${prefix}/${slug}`);
    } else {
      // Revalidar para todas si no coincide con prefijo conocido
      for (const u of validUniversitySlugs) {
        revalidatePath(`/catalogo/universidades/${u}`);
        revalidatePath(`/catalogo/universidades/${u}/${slug}`);
      }
    }
  } else {
    // Sector estándar (scrubs, escolar, corporativo, etc.)
    revalidatePath(`/catalogo/${sector}`);
    revalidatePath(`/catalogo/${sector}/${slug}`);
  }
}
