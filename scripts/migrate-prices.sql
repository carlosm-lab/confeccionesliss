-- ============================================================
-- MIGRACIÓN DE PRECIOS PARA TALLA L (35 -> 38)
-- ============================================================
-- Esta consulta actualiza todos los productos que tienen configurado
-- un precio de 35 para la talla "L" en el campo price_by_size,
-- cambiándolo a 38. El precio base y las demás tallas se mantienen intactos.

UPDATE products
SET price_by_size = jsonb_set(price_by_size, '{L}', '38')
WHERE (price_by_size->>'L')::numeric = 35;

-- Comprobación (puedes ejecutar esto después para verificar los cambios)
-- SELECT id, name, price, price_by_size->>'L' as precio_talla_l
-- FROM products
-- WHERE price_by_size->>'L' = '38';
