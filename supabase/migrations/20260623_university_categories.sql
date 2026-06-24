-- ============================================================
-- MIGRATION: Categorías universitarias para el catálogo público
-- Archivo: 20260623_university_categories.sql
-- ============================================================
-- Propósito: Agrega las 6 universidades como categorías en la tabla
-- `categories` con catalog = 'universitario'. Esto permite que el
-- admin panel las muestre en el selector de categoría cuando el
-- catálogo seleccionado es "Uniformes Universitarios".
--
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================

-- Insertar categorías universitarias (upsert por slug para idempotencia)
INSERT INTO categories (name, slug, catalog, description, created_at)
VALUES
  (
    'UNIVO — Universidad de Oriente',
    'univo',
    'universitario',
    'Scrubs clínicos con colores oficiales de la Universidad de Oriente. Enfermería, Medicina, Odontología, Fisioterapia.',
    NOW()
  ),
  (
    'IEPROES — Inst. Especializado de la Salud',
    'ieproes',
    'universitario',
    'Uniformes clínicos con colores oficiales del Instituto Especializado de Profesionales de la Salud.',
    NOW()
  ),
  (
    'UGB — Universidad Gerardo Barrios',
    'ugb',
    'universitario',
    'Uniformes clínicos con colores oficiales de la Universidad Gerardo Barrios.',
    NOW()
  ),
  (
    'UNAB — Universidad Andrés Bello',
    'unab',
    'universitario',
    'Scrubs universitarios con colores oficiales de la Universidad Andrés Bello.',
    NOW()
  ),
  (
    'UES — Universidad de El Salvador',
    'ues',
    'universitario',
    'Uniformes clínicos oficiales de la Universidad de El Salvador. Medicina, Enfermería, Farmacia, Odontología.',
    NOW()
  ),
  (
    'UMA — Universidad Modular Abierta',
    'uma',
    'universitario',
    'Uniformes clínicos con colores oficiales de la Universidad Modular Abierta.',
    NOW()
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  catalog = EXCLUDED.catalog,
  description = EXCLUDED.description;

-- Verificar resultado
SELECT id, name, slug, catalog FROM categories WHERE catalog = 'universitario' ORDER BY slug;
