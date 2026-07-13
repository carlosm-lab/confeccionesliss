"use server";
/**
 * Server Actions para gestionar los productos fijados en el home.
 *
 * ARQUITECTURA:
 * - Solo el admin puede llamar estos actions (protección por RLS en Supabase).
 * - Al fijar/desfijar se invalida el home (/) inmediatamente via revalidatePath.
 * - Límite de 6 productos fijados simultáneamente, aplicado en esta capa.
 */

import { createServerClient } from "@supabase/ssr";
import { revalidatePath, revalidateTag, refresh } from "next/cache";
import { cookies } from "next/headers";

const MAX_FEATURED = 10;

/** Cliente Supabase server-side autenticado mediante cookies del admin */
async function createClientWithSession() {
  const cookieStore = await cookies();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Missing Supabase env variables");
  }

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          );
        } catch {
          // Las Server Actions pueden ignorar fallos de escritura de cookies seguras si no modifican la sesión
        }
      },
    },
  });
}

interface ToggleResult {
  success: boolean;
  error?: string;
  is_featured?: boolean;
}

/**
 * Alterna el estado "fijado en home" de un producto.
 *
 * @param productId - ID del producto a fijar/desfijar
 * @param currentValue - Valor actual de is_featured (para calcular el nuevo valor)
 * @returns Resultado de la operación con el nuevo valor de is_featured
 */
export async function toggleFeaturedProduct(
  productId: string,
  currentValue: boolean
): Promise<ToggleResult> {
  if (!productId) {
    return { success: false, error: "ID de producto inválido." };
  }

  const supabase = await createClientWithSession();

  // Validar rol de administrador en el servidor
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { success: false, error: "No autorizado." };
  }

  // Verificar app_metadata.role
  const userRole = user.app_metadata?.role;
  if (userRole !== "admin") {
    return { success: false, error: "No autorizado. Permisos insuficientes." };
  }

  const newValue = !currentValue;

  // Si se intenta fijar (pasar a true), verificar el límite
  if (newValue === true) {
    const { count, error: countError } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true })
      .eq("is_featured", true);

    if (countError) {
      return {
        success: false,
        error: "Error al verificar el límite de productos fijados.",
      };
    }

    if ((count ?? 0) >= MAX_FEATURED) {
      return {
        success: false,
        error: `Máximo ${MAX_FEATURED} productos pueden estar fijados en el home. Desfija uno primero.`,
      };
    }
  }

  // Actualizar el campo is_featured y updated_at
  const { error: updateError } = await supabase
    .from("products")
    .update({
      is_featured: newValue,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (updateError) {
    return {
      success: false,
      error: "Error al actualizar el producto. Intenta de nuevo.",
    };
  }

  // Auditoría OWASP A09: Registrar acción administrativa en security_events
  try {
    await supabase.from("security_events").insert({
      event_type: "admin_featured_product_toggle",
      payload: {
        product_id: productId,
        new_is_featured: newValue,
        user_id: user.id,
        user_email: user.email,
      },
      url: "/admin/products",
    });
  } catch (auditErr) {
    // Si falla el log de auditoría, no bloquear la operación de negocio
    console.error("[toggleFeaturedProduct] Audit log warning:", auditErr);
  }

  // Paso 1: Expirar inmediatamente los datos en el Data Cache (Next.js 16 revalidateTag).
  // Esto hace que la siguiente request espere datos frescos en vez de servir caché viejo.
  revalidateTag("products", { expire: 0 });
  revalidateTag("product-counts", { expire: 0 });

  // Paso 2: Invalidar el Full Route Cache (HTML pre-renderizado) de las rutas afectadas.
  revalidatePath("/");
  revalidatePath("/catalogo");

  // Paso 3: Invalidar el Client Router Cache del browser.
  // Sin esto, el usuario ve el HTML viejo si navega via <Link> sin recargar.
  refresh();
  revalidatePath("/admin/products");

  return { success: true, is_featured: newValue };
}
