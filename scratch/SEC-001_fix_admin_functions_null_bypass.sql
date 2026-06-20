-- ============================================================
-- MIGRACIÓN: SEC-001 - Corrección de vulnerabilidad NULL bypass
-- en funciones SECURITY DEFINER admin
-- ============================================================
-- Fecha: 2026-06-20
-- Ref: Auditoría de seguridad secure.txt - Fase 3/4
--
-- VULNERABILIDAD DESCUBIERTA:
-- Las funciones admin usaban: IF (auth.jwt() -> 'app_metadata' ->> 'role') <> 'admin'
-- En PL/pgSQL, cuando auth.jwt() es NULL (usuario anónimo sin sesión),
-- la comparación NULL <> 'admin' evalúa a NULL.
-- IF NULL THEN => en PL/pgSQL se trata como FALSE — el RAISE no se ejecuta.
-- Además, las funciones tenían GRANT a PUBLIC (incluye el rol anon).
--
-- CORRECCIÓN APLICADA:
-- 1. REVOKE EXECUTE de PUBLIC y anon (el rol anon ya no puede ni llamar la función)
-- 2. GRANT EXECUTE solo a authenticated (usuarios con sesión activa)
-- 3. Chequeo cambiado a IS DISTINCT FROM (NULL-safe: NULL IS DISTINCT FROM 'admin' = TRUE)
-- 4. Añadido SET search_path = '' para prevenir ataques de search_path injection
--
-- DEFENSA EN PROFUNDIDAD (3 capas):
-- Layer 1: REVOKE de anon/PUBLIC → el rol anon no puede ejecutar
-- Layer 2: IS DISTINCT FROM → si authenticated sin rol admin intenta ejecutar, RAISE
-- Layer 3: RLS en tablas → las políticas de tablas también bloquean por rol
-- ============================================================

-- ─── Paso 1: Revocar de PUBLIC y anon ─────────────────────────────────────────
REVOKE EXECUTE ON FUNCTION public.admin_delete_user FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_delete_user FROM anon;
REVOKE EXECUTE ON FUNCTION public.admin_set_user_role FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.admin_set_user_role FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_dashboard_data FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_dashboard_data FROM anon;
REVOKE EXECUTE ON FUNCTION public.get_users_list FROM PUBLIC;
REVOKE EXECUTE ON FUNCTION public.get_users_list FROM anon;

-- ─── Paso 2: Recrear funciones con NULL-safe check y search_path seguro ───────

-- 2a. admin_delete_user
CREATE OR REPLACE FUNCTION public.admin_delete_user(target_user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- SEC-001: NULL-safe admin check
  -- IS DISTINCT FROM garantiza que NULL (anon sin JWT) también sea rechazado
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: only admins can delete users';
  END IF;

  -- No permitir eliminar al propio usuario
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot delete your own account via this function';
  END IF;

  -- Eliminar el perfil (cascada eliminará datos relacionados)
  DELETE FROM public.profiles WHERE id = target_user_id;

  -- Eliminar el usuario de auth.users
  DELETE FROM auth.users WHERE id = target_user_id;
END;
$$;

-- 2b. admin_set_user_role
CREATE OR REPLACE FUNCTION public.admin_set_user_role(target_user_id uuid, new_role text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  legacy_rol TEXT;
BEGIN
  -- SEC-001: NULL-safe admin check
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: only admins can change user roles';
  END IF;

  -- Validar el nuevo rol
  IF new_role NOT IN ('admin', 'user') THEN
    RAISE EXCEPTION 'Invalid role: must be admin or user';
  END IF;

  -- No permitir que el admin se cambie su propio rol
  IF target_user_id = auth.uid() THEN
    RAISE EXCEPTION 'Cannot change your own role via this function';
  END IF;

  -- Mapeo de rol moderno a columna legacy 'rol'
  IF new_role = 'admin' THEN
    legacy_rol := 'admin';
  ELSE
    legacy_rol := 'cliente';
  END IF;

  -- Actualizar profiles.role Y profiles.rol (ambas columnas de rol)
  UPDATE public.profiles 
  SET role = new_role, rol = legacy_rol 
  WHERE id = target_user_id;

  -- Sincronizar auth.users.raw_app_meta_data para reflejar cambio en JWT
  UPDATE auth.users
  SET raw_app_meta_data = COALESCE(raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', new_role)
  WHERE id = target_user_id;
END;
$$;

-- 2c. get_dashboard_data
CREATE OR REPLACE FUNCTION public.get_dashboard_data()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  result jsonb;
  total_products bigint;
  active_offers bigint;
  unread_messages bigint;
  total_favorites bigint;
  total_categories bigint;
  total_users bigint;
  recent_products jsonb;
  recent_messages jsonb;
  category_data jsonb;
  top_favorites jsonb;
BEGIN
  -- SEC-001: NULL-safe admin check
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: only admins can access dashboard data';
  END IF;

  SELECT COUNT(*) INTO total_products FROM public.products WHERE is_active = TRUE;
  SELECT COUNT(*) INTO active_offers FROM public.products WHERE is_active = TRUE AND old_price IS NOT NULL AND (offer_ends_at IS NULL OR offer_ends_at > NOW());
  SELECT COUNT(*) INTO unread_messages FROM public.messages WHERE is_read = FALSE;
  SELECT COUNT(*) INTO total_favorites FROM public.user_favorites;
  SELECT COUNT(*) INTO total_categories FROM public.categories;
  SELECT COUNT(*) INTO total_users FROM public.profiles;
  SELECT COALESCE(jsonb_agg(p ORDER BY p.created_at DESC), '[]'::jsonb) INTO recent_products FROM (SELECT id, name, price, old_price, image_path, images, is_active, category, created_at FROM public.products WHERE is_active = TRUE ORDER BY created_at DESC LIMIT 5) p;
  SELECT COALESCE(jsonb_agg(m ORDER BY m.created_at DESC), '[]'::jsonb) INTO recent_messages FROM (SELECT id, name, email, message, is_read, created_at FROM public.messages ORDER BY created_at DESC LIMIT 5) m;
  SELECT COALESCE(jsonb_agg(c), '[]'::jsonb) INTO category_data FROM (SELECT c.name, COUNT(p.id) as product_count FROM public.categories c LEFT JOIN public.products p ON p.category = c.slug AND p.is_active = TRUE GROUP BY c.id, c.name ORDER BY product_count DESC LIMIT 10) c;
  SELECT COALESCE(jsonb_agg(f), '[]'::jsonb) INTO top_favorites FROM (SELECT p.id, p.name, p.price, p.image_path, p.images, COUNT(uf.id) as favorite_count FROM public.products p JOIN public.user_favorites uf ON uf.product_id = p.id GROUP BY p.id, p.name, p.price, p.image_path, p.images ORDER BY favorite_count DESC LIMIT 5) f;

  result := jsonb_build_object(
    'summary', jsonb_build_object(
      'totalProducts', total_products,
      'activeOffers', active_offers,
      'unreadMessages', unread_messages,
      'totalFavorites', total_favorites,
      'totalCategories', total_categories,
      'totalUsers', total_users
    ),
    'recentProducts', recent_products,
    'recentMessages', recent_messages,
    'categoryData', category_data,
    'topFavorites', top_favorites
  );
  RETURN result;
END;
$$;

-- 2d. get_users_list
CREATE OR REPLACE FUNCTION public.get_users_list()
RETURNS TABLE(
  id uuid,
  email text,
  full_name text,
  avatar_url text,
  role text,
  created_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- SEC-001: NULL-safe admin check
  IF (auth.jwt() -> 'app_metadata' ->> 'role') IS DISTINCT FROM 'admin' THEN
    RAISE EXCEPTION 'Unauthorized: only admins can list users';
  END IF;

  RETURN QUERY
  SELECT
    p.id,
    COALESCE(p.email, u.email)::text AS email,
    COALESCE(
      NULLIF(TRIM(COALESCE(p.nombre, '') || ' ' || COALESCE(p.apellidos, '')), ''),
      u.raw_user_meta_data->>'full_name',
      u.raw_user_meta_data->>'name',
      SPLIT_PART(COALESCE(p.email, u.email), '@', 1)
    )::text AS full_name,
    (u.raw_user_meta_data->>'avatar_url')::text AS avatar_url,
    COALESCE(p.role, 'user')::text AS role,
    u.created_at
  FROM public.profiles p
  JOIN auth.users u ON u.id = p.id
  ORDER BY u.created_at DESC;
END;
$$;

-- ─── Paso 3: Re-grant solo a authenticated ────────────────────────────────────
-- CREATE OR REPLACE resetea los grants, hay que re-otorgarlos explícitamente
GRANT EXECUTE ON FUNCTION public.admin_delete_user TO authenticated;
GRANT EXECUTE ON FUNCTION public.admin_set_user_role TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_dashboard_data TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_users_list TO authenticated;
