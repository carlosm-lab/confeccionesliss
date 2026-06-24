-- ============================================================
-- MIGRATION: Categorías universitarias para el catálogo público
-- Archivo: 20260623_university_categories.sql
-- ============================================================
-- Propósito: Agrega las 6 universidades como categorías en la tabla
-- `categories` con catalog = 'universitario'. Esto permite que el
-- admin panel las muestre en el selector de categoría cuando el
-- catálogo seleccionado es "Uniformes Universitarios".
--
-- Schema real de categories: id (uuid), name, slug, catalog, created_at
-- NOTA: created_at es auto-generado por Supabase (no se incluye en INSERT).
--
-- Estado: APLICADA el 2026-06-24 via Supabase MCP.
-- ============================================================

INSERT INTO categories (name, slug, catalog)
VALUES
  ('UNIVO — Universidad de Oriente',            'univo',    'universitario'),
  ('IEPROES — Inst. Especializado de la Salud', 'ieproes',  'universitario'),
  ('UGB — Universidad Gerardo Barrios',          'ugb',      'universitario'),
  ('UNAB — Universidad Andrés Bello',            'unab',     'universitario'),
  ('UES — Universidad de El Salvador',           'ues',      'universitario'),
  ('UMA — Universidad Modular Abierta',          'uma',      'universitario')
ON CONFLICT (slug) DO UPDATE SET
  name    = EXCLUDED.name,
  catalog = EXCLUDED.catalog;

-- Verificar resultado
SELECT id, name, slug, catalog FROM categories WHERE catalog = 'universitario' ORDER BY slug;
