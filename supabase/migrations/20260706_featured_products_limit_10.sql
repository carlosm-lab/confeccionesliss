-- ────────────────────────────────────────────────────────────
-- Migration: 20260706_featured_products_limit_10.sql
-- Actualiza comentario descriptivo en la columna is_featured
-- para reflejar el nuevo límite de 10 productos fijados en home.
-- ────────────────────────────────────────────────────────────

COMMENT ON COLUMN public.products.is_featured
  IS 'Si TRUE, el producto aparece fijado en la sección Novedades del home. Máximo 10 productos pueden estar fijados simultáneamente (aplicado en capa de aplicación).';
