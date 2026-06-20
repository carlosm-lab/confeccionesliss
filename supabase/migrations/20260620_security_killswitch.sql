-- =============================================================
-- Migración: Sistema de Alerta y Killswitch de Seguridad
-- Fecha: 2026-06-20
-- Descripción: Tablas para el sistema de killswitch operacional
--              y log de eventos de seguridad (CSP violations).
-- =============================================================

-- 1. site_config — Configuración operacional del sitio
CREATE TABLE IF NOT EXISTS public.site_config (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

INSERT INTO public.site_config (key, value)
VALUES ('killswitch_active', 'false')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "site_config_public_read" ON public.site_config
  FOR SELECT TO public USING (true);

CREATE POLICY "site_config_admin_write" ON public.site_config
  FOR ALL TO authenticated
  USING (((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'admin'::text)
  WITH CHECK (((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'admin'::text);

-- 2. security_events — Log de incidentes de seguridad
CREATE TABLE IF NOT EXISTS public.security_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'csp_violation',
      'rate_limit_exceeded',
      'killswitch_activated',
      'killswitch_deactivated',
      'anomaly_detected'
    )
  ),
  payload JSONB,
  ip TEXT,
  user_agent TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.security_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "security_events_admin_read" ON public.security_events
  FOR SELECT TO authenticated
  USING (((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text) = 'admin'::text);

-- Permitir inserts anónimos solo de CSP violations
CREATE POLICY "security_events_public_insert" ON public.security_events
  FOR INSERT TO public
  WITH CHECK (
    event_type = 'csp_violation'
    AND payload IS NOT NULL
  );

CREATE INDEX IF NOT EXISTS idx_security_events_type_created
  ON public.security_events (event_type, created_at DESC);

-- 3. RPC toggle_killswitch — Activa/desactiva el killswitch con log
CREATE OR REPLACE FUNCTION public.toggle_killswitch(activate boolean)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role TEXT;
  v_new_value TEXT;
  v_event_type TEXT;
BEGIN
  v_role := ((auth.jwt() -> 'app_metadata'::text) ->> 'role'::text);
  IF v_role IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: admin role required';
  END IF;

  v_new_value := CASE WHEN activate THEN 'true' ELSE 'false' END;
  v_event_type := CASE WHEN activate THEN 'killswitch_activated' ELSE 'killswitch_deactivated' END;

  UPDATE public.site_config
  SET value = v_new_value, updated_at = now(), updated_by = auth.uid()
  WHERE key = 'killswitch_active';

  INSERT INTO public.security_events (event_type, payload)
  VALUES (
    v_event_type,
    jsonb_build_object(
      'activated_by', auth.uid(),
      'timestamp', now()
    )
  );

  RETURN jsonb_build_object(
    'success', true,
    'killswitch_active', activate,
    'updated_at', now()
  );
END;
$$;
