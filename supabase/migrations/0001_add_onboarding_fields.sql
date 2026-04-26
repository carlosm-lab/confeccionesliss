-- Migration: Add onboarding fields to profiles table
-- This synchronizes the migration files with the actual database schema.

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS institucion text,
  ADD COLUMN IF NOT EXISTS tipo_compra text,
  ADD COLUMN IF NOT EXISTS colores_favoritos jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS notificaciones jsonb DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS tipo_perfil text,
  ADD COLUMN IF NOT EXISTS talla text,
  ADD COLUMN IF NOT EXISTS genero text,
  ADD COLUMN IF NOT EXISTS departamento text,
  ADD COLUMN IF NOT EXISTS municipio text;

-- Allow users to insert their own profile row (needed for OAuth flows without trigger)
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);
