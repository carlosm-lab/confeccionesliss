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

import { createServerClient } from "@supabase/ssr";
import { revalidatePath, revalidateTag, refresh } from "next/cache";
import { cookies } from "next/headers";

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
  // SEC-005 Fix: Verificar autenticación de admin antes de revalidar caché
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    const supabase = createServerClient(url, key, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {},
      },
    });

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user || user.app_metadata?.role !== "admin") {
      console.warn(
        "[revalidateAfterProductSave] Intento de revalidación no autorizado."
      );
      return;
    }
  }

  // 1. Expirar inmediatamente los datos en el Data Cache via cache tags (Next.js 16 revalidateTag).
  revalidateTag("products", { expire: 0 });
  revalidateTag("product-counts", { expire: 0 });

  // 2. Invalidar Full Route Cache de las páginas principales de catálogo e inicio (SSG).
  revalidatePath("/");
  revalidatePath("/catalogo");
  refresh();

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
    // Revalidar TODAS las universidades para garantizar que si un producto fue movido
    // de una universidad a otra (ej. de UNAB a UNIVO), la página de la universidad anterior
    // se limpie y no muestre duplicados en la caché de Next.js.
    for (const u of validUniversitySlugs) {
      revalidatePath(`/catalogo/universidades/${u}`);
      revalidatePath(`/catalogo/universidades/${u}/${slug}`);
    }
  } else {
    // Sector estándar (scrubs, escolar, corporativo, etc.)
    revalidatePath(`/catalogo/${sector}`);
    revalidatePath(`/catalogo/${sector}/${slug}`);
  }
}
