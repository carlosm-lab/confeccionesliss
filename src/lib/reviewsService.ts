// ──────────────────────────────────────────────────────────────
// REVIEWS SERVICE — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Capa de datos para reseñas de productos. Compatible con RSC
// (sin "use client"). NO importar en Client Components directamente
// para mutaciones — usar getSupabaseClient() en el componente.
// ──────────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";
import { env } from "@/env";

// ── Tipo de reseña proveniente de la base de datos ─────────────
export interface DbReview {
  id: string;
  product_id: string;
  user_id: string;
  rating: number;
  comment: string;
  user_name: string;
  user_avatar: string | null;
  created_at: string;
  updated_at: string;
}

// ── Datos de calificación agregada ────────────────────────────
interface ProductRatingData {
  reviews: DbReview[];
  /** Promedio redondeado a 1 decimal (ej: 4.7). 0 si no hay reseñas. */
  averageRating: number;
  /** Número total de reseñas */
  totalCount: number;
}

// ── Cliente de Supabase para el servidor (RSC) ─────────────────
function createServerClient(tags: string[] = []) {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url, key, {
    global: {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, {
          ...init,
          cache: "force-cache",
          next: { tags } as NextFetchRequestConfig,
        } as RequestInit),
    },
  });
}

// ── Obtener reseñas y calificación agregada de un producto ─────
export async function getProductReviews(
  productId: string
): Promise<ProductRatingData> {
  const supabase = createServerClient(["product-reviews"]);

  const { data, error } = await supabase
    .from("product_reviews")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", { ascending: false });

  if (error) {
    logger.error("[reviewsService] getProductReviews error:", error);
    return { reviews: [], averageRating: 0, totalCount: 0 };
  }

  const reviews = (data ?? []) as DbReview[];
  const totalCount = reviews.length;

  const averageRating =
    totalCount > 0
      ? Math.round(
          (reviews.reduce((sum, r) => sum + r.rating, 0) / totalCount) * 10
        ) / 10
      : 0;

  return { reviews, averageRating, totalCount };
}
