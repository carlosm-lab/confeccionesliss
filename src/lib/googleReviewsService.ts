import { createClient } from "@supabase/supabase-js";
import { logger } from "@/lib/logger";
import { env } from "@/env";

export interface GoogleReview {
  id: string;
  author_name: string;
  comment: string | null;
  rating: number;
  author_avatar: string | null;
  created_at: string;
}

// Fallbacks de reseñas reales de Google Maps compartidas por el usuario
const REAL_GOOGLE_REVIEWS_FALLBACK: GoogleReview[] = [
  {
    id: "f8b056e3-5dc2-482a-bb34-8c8872e411b0",
    author_name: "Iris M.",
    comment: "Uniformes confeccionados a la perfección",
    rating: 5,
    author_avatar: null,
    created_at: "2026-05-15T16:00:00.000Z",
  },
  {
    id: "e6f7df2b-c8c3-4d4b-a19c-9c7d8e2d4e60",
    author_name: "RUTH MEJIA",
    comment:
      "Excelente calidad, me encanta su trabajo y sobre todo la responsabilisad",
    rating: 5,
    author_avatar: null,
    created_at: "2026-06-10T20:30:00.000Z",
  },
  {
    id: "d9e8f7a6-b5c4-4a3b-9a2c-8d1e0f9a8b7c",
    author_name: "Erick Salvador",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-06-20T15:15:00.000Z",
  },
  {
    id: "a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d",
    author_name: "Carlitos",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    author_name: "Gerardo Vargas",
    comment: "buena atención y exelente trabajo.",
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f",
    author_name: "Manuel Godoy",
    comment:
      "Excelente , uniformes a la medida confecciones segun los gustos personalizados y tela de alta calidad y confeccion",
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a",
    author_name: "Damaris Navarrete",
    comment: "Excelente atención y calidad en las confecciones",
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "e5f6a7b8-c9d0-1e2f-3a4b-5c6d7e8f9a0b",
    author_name: "ツツ",
    comment:
      "¡Excelente servicio en Confección Liss! El trabajo que hacen es de primera calidad, con acabados impecables y mucha atención al detalle. Además, la atención al cliente es muy amable y cumplen con los tiempos de entrega. Totalmente recomendados.",
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "f6a7b8c9-d0e1-2f3a-4b5c-6d7e8f9a0b1c",
    author_name: "Erick Josue fuentes",
    comment: "Buenos trabajos",
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "777c8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Antonio Guzmán",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-03T12:00:00.000Z",
  },
  {
    id: "888c8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "José Menéndez",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "999c8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Jackelline Lisseth Molina Villacorta",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-02T12:00:00.000Z",
  },
  {
    id: "000c8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Carlos Molina",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "111d8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Karla Vanessa Perla Blanco",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "222d8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Isaac Padilla",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "333d8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Mauricio Guzman",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "444d8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "pepa pig",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "555d8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Kenia Yaritza Pérez Martínez",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-01T12:00:00.000Z",
  },
  {
    id: "666d8d29-7498-454f-b859-8be5c17f7b9e",
    author_name: "Melisa López",
    comment: null,
    rating: 1,
    author_avatar: null,
    created_at: "2026-07-03T12:00:00.000Z",
  },
  {
    id: "eee1d8d2-7498-454f-b859-8be5c17f7b9e",
    author_name: "Enmanuel Mejía",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-03T12:00:00.000Z",
  },
  {
    id: "fff2d8d2-7498-454f-b859-8be5c17f7b9e",
    author_name: "Jeffry Anselmo Guzmán Robles",
    comment: null,
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-03T12:00:00.000Z",
  },
  {
    id: "aaa3d8d2-7498-454f-b859-8be5c17f7b9e",
    author_name: "Marlyn Antonio Palacio Reyes",
    comment:
      "Una confección 10/10, muy recomendable me ha ayudado demasiado para mis uniformes de la universidad",
    rating: 5,
    author_avatar: null,
    created_at: "2026-07-03T12:00:00.000Z",
  },
];

function createServerClient(tags: string[] = []) {
  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return createClient(url, key);
}

export async function getGoogleReviews(): Promise<GoogleReview[]> {
  try {
    const supabase = createServerClient(["reviews"]);
    const { data, error } = await supabase
      .from("google_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      logger.warn(
        "[googleReviewsService] Error querying table, using fallback:",
        error.message
      );
      return REAL_GOOGLE_REVIEWS_FALLBACK;
    }

    if (!data || data.length === 0) {
      logger.info(
        "[googleReviewsService] google_reviews table is empty, using fallback"
      );
      return REAL_GOOGLE_REVIEWS_FALLBACK;
    }

    return data as GoogleReview[];
  } catch (err: any) {
    logger.warn(
      "[googleReviewsService] Supabase offline/error, using fallback:",
      err.message || err
    );
    return REAL_GOOGLE_REVIEWS_FALLBACK;
  }
}
