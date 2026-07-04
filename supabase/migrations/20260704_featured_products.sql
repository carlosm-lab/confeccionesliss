-- ────────────────────────────────────────────────────────────
-- Migration: 20260704_featured_products
-- Agrega columna is_featured a la tabla products para permitir
-- al admin fijar productos específicos en la sección de
-- Novedades del home en lugar de mostrar solo los más recientes.
-- ────────────────────────────────────────────────────────────

-- 1. Agregar la columna con valor por defecto false
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN NOT NULL DEFAULT FALSE;

-- 2. Índice parcial para consultas rápidas de productos fijados
CREATE INDEX IF NOT EXISTS idx_products_featured
  ON public.products (created_at DESC)
  WHERE is_featured = TRUE;

-- 3. Comentario descriptivo para el esquema
COMMENT ON COLUMN public.products.is_featured
  IS 'Si TRUE, el producto aparece fijado en la sección Novedades del home. Máximo 6 productos pueden estar fijados simultáneamente (aplicado en capa de aplicación).';
