-- ================================================================
-- Migration: 20260719_update_whatsapp_rpc_delivery_method.sql
--
-- PROBLEMA:
-- La función RPC `generate_whatsapp_message` no recibía el tipo de
-- entrega seleccionado (taller | punto_medio | domicilio), por lo que
-- generaba texto de "Envío (San Miguel, San Miguel)" incluso cuando el
-- cliente elegía Retiro en Taller o Punto Medio — mostrando una dirección
-- vacía o incorrecta en el mensaje de WhatsApp.
--
-- CORRECCIÓN:
-- 1. Agregar parámetro `delivery_method text DEFAULT NULL`.
-- 2. Usar ese parámetro para generar el texto de entrega correcto:
--    - taller      → "Entrega (Retiro en taller — San Miguel): $X"
--    - punto_medio → "Entrega (Punto de entrega acordado — San Miguel): $X"
--    - domicilio   → "Envío a domicilio (Municipio, Dept): $X"
-- 3. Eliminar la versión anterior de 6 argumentos.
-- ================================================================

-- Paso 1: Eliminar la versión anterior de 6 argumentos para evitar
-- conflictos de overload en las llamadas RPC del cliente.
DROP FUNCTION IF EXISTS public.generate_whatsapp_message(jsonb, text, text, text, numeric, text);

-- Paso 2: Crear la nueva versión con soporte de delivery_method.
CREATE OR REPLACE FUNCTION public.generate_whatsapp_message(
  items jsonb,
  store_domain text DEFAULT ''::text,
  shipping_department text DEFAULT NULL::text,
  shipping_municipality text DEFAULT NULL::text,
  shipping_cost numeric DEFAULT 0,
  shipping_label text DEFAULT NULL::text,
  delivery_method text DEFAULT NULL::text
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_item jsonb;
  v_product_id uuid;
  v_quantity int;
  v_size text;
  v_color text;
  v_note text;
  v_db_product record;
  v_unit_price numeric;
  v_item_total numeric;
  v_subtotal numeric := 0;
  v_total numeric := 0;
  v_lines text[] := ARRAY[]::text[];
  v_message text;
  v_item_count int := 0;
BEGIN
  IF items IS NULL OR jsonb_array_length(items) = 0 THEN
    RAISE EXCEPTION 'El carrito está vacío';
  END IF;

  FOR v_item IN SELECT * FROM jsonb_array_elements(items)
  LOOP
    v_item_count := v_item_count + 1;
    v_product_id := (v_item->'product'->>'id')::uuid;
    v_quantity := COALESCE((v_item->>'quantity')::int, 1);
    v_size := COALESCE(v_item->'product'->>'selectedSize', NULL);
    v_color := COALESCE(v_item->>'color', NULL);
    v_note := COALESCE(v_item->>'note', NULL);

    -- Consultar producto activo en BD
    SELECT id, name, price, price_by_size, is_active
    INTO v_db_product
    FROM public.products
    WHERE id = v_product_id;

    IF NOT FOUND THEN
      CONTINUE;
    END IF;

    IF NOT COALESCE(v_db_product.is_active, true) THEN
      CONTINUE;
    END IF;

    -- Obtener precio por talla si aplica, o fallback a precio global
    v_unit_price := v_db_product.price;
    IF v_size IS NOT NULL AND v_db_product.price_by_size IS NOT NULL THEN
      IF (v_db_product.price_by_size->>v_size) IS NOT NULL THEN
        v_unit_price := (v_db_product.price_by_size->>v_size)::numeric;
      END IF;
    END IF;

    IF v_unit_price IS NULL OR v_unit_price < 0 THEN
      v_unit_price := 0;
    END IF;

    v_item_total := v_unit_price * v_quantity;
    v_subtotal := v_subtotal + v_item_total;

    -- Formatear línea del producto
    v_lines := array_append(
      v_lines,
      format(
        '• %sx *%s* ($%s c/u)%s%s%s',
        v_quantity,
        v_db_product.name,
        trim(to_char(v_unit_price, 'FM999,990.00')),
        CASE WHEN v_size IS NOT NULL AND v_size <> '' THEN format(' - Talla: %s', v_size) ELSE '' END,
        CASE WHEN v_color IS NOT NULL AND v_color <> '' THEN format(' - Color: %s', v_color) ELSE '' END,
        CASE WHEN v_note IS NOT NULL AND v_note <> '' THEN format(' (Nota: %s)', v_note) ELSE '' END
      )
    );
  END LOOP;

  v_total := v_subtotal + COALESCE(shipping_cost, 0);

  -- Construir mensaje completo
  v_message := '🛒 *NUEVO PEDIDO — Confecciones Liss*' || E'\n\n' ||
               '*Productos:*' || E'\n' ||
               array_to_string(v_lines, E'\n') || E'\n\n' ||
               format('Subtotal: $%s', trim(to_char(v_subtotal, 'FM999,990.00')));

  -- Línea de costo de entrega adaptada al método seleccionado
  IF delivery_method = 'taller' THEN
    v_message := v_message || E'\n' ||
                 format('Entrega (Retiro en taller — San Miguel): $%s',
                   trim(to_char(COALESCE(shipping_cost, 0), 'FM999,990.00')));
  ELSIF delivery_method = 'punto_medio' THEN
    v_message := v_message || E'\n' ||
                 format('Entrega (Punto de entrega acordado — San Miguel): $%s',
                   trim(to_char(COALESCE(shipping_cost, 0), 'FM999,990.00')));
  ELSIF shipping_department IS NOT NULL AND shipping_department <> '' THEN
    v_message := v_message || E'\n' ||
                 format('Envío a domicilio (%s, %s): $%s',
                   COALESCE(shipping_municipality, ''),
                   shipping_department,
                   trim(to_char(shipping_cost, 'FM999,990.00')));
  ELSIF shipping_label IS NOT NULL AND shipping_label <> '' THEN
    v_message := v_message || E'\n' ||
                 format('Envío (%s): $%s', shipping_label,
                   trim(to_char(shipping_cost, 'FM999,990.00')));
  END IF;

  v_message := v_message || E'\n' ||
               format('*Total a pagar: $%s*', trim(to_char(v_total, 'FM999,990.00')));

  RETURN v_message;
END;
$function$;
