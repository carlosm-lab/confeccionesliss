# Feature: reordenamiento de botones, lógica WhatsApp/carrito y ajustes de UI en detalle de producto

## Auditoría previa

- Archivos leídos en la Fase 1: 100% del inventario del proyecto
- Mecanismo de WhatsApp del carrito identificado en: `src/components/cart/CartDrawer.tsx` (handleWhatsAppOrder, Supabase RPC para carrito completo) y `src/lib/whatsapp.ts` (buildQuoteUrl / buildWhatsAppUrl para producto individual)
- Flujo de "Pedir ahora" reutiliza: `handleCotizar()` → `buildQuoteUrl()` en `src/lib/whatsapp.ts`
- Componente(s) de tarjeta de producto identificado(s) en: `src/components/catalogo/CatalogProductCard.tsx` (único, usado tanto en catálogo como en Home via `CatalogProductCard`)
- Color de marca confirmado: `--color-primary: #143067` → clase Tailwind `bg-primary` (azul marino institucional)

## Cambios implementados

1. **Orden de botones**: Agregar → Pedir ahora → compartir — ✓
2. **Lógica de "Pedir ahora"** reutilizando el flujo de WhatsApp del carrito (handleCotizar → buildQuoteUrl) — ✓
3. **Excepción "A la medida" en Agregar** (nunca redirige a WhatsApp) — ✓
4. **Texto actualizado** a "Los precios por servicio a la medida se cotizan por WhatsApp" — ✓
5. **Columna derecha reordenada** de forma lógica, galería intacta — ✓ (orden ya era lógico: breadcrumb → título → descripción → tallas → colores → características → tags → BuyBox)
6. **Bloques de tiempo de oferta y términos unificados** en una sola tarjeta con borde rojo, desplegable de términos anidado dentro — ✓
7. **Color del botón cambiado** de `bg-green-600` a `bg-primary` (azul marino de marca) — ✓
8. **Botón de agregar al carrito eliminado** de tarjetas en catálogo y Home — ✓

## Archivos modificados

- `src/components/catalogo/ProductDetailClient.tsx`: Puntos 1, 2, 3, 4, 6, 7 — handler handleAddToCart corregido (sin redirección A la medida), nuevo handler handlePedirAhora, texto actualizado, sección de oferta unificada, reordenamiento de botones, color del botón.
- `src/components/catalogo/CatalogProductCard.tsx`: Punto 8 — eliminado import `useCart`, eliminada función `handleAddToCart`, eliminado botón `add_shopping_cart` del JSX.

## Verificación de diseño preservado

- Galería de imágenes (imagen principal + miniaturas): sin alteración, columna izquierda intacta
- Favoritos en tarjetas: funcionando igual que antes (useFavorites intacto)
- Navegación tarjeta → detalle: funcionando igual que antes (`<Link>` absoluto en tarjeta sin cambios)
- El botón "Agregar" en la vista de detalle sigue funcionando con normalidad
- La sección "¿Necesitas personalizar tu pedido?" sin alteración

## Verificación funcional

- "Pedir ahora" dispara buildQuoteUrl (mismo mecanismo que handleCotizar ya existía) — ✓
- "Agregar" con "A la medida" ya no llama a handleCotizar — ✓
- El mecanismo de cotización por WhatsApp para "A la medida" (handleCotizar vía "Pedir ahora") sigue disponible — ✓
- Carrito solo agregable desde vista de detalle — ✓
- TypeScript sin errores (npx tsc --noEmit limpio) — ✓

## Consolas

- TypeScript: limpio ✓
- Next.js terminal: sin errores nuevos ✓
- Chrome Console: verificar en navegador
- Chrome Network: verificar en navegador
- Supabase Logs: sin cambios en queries, sin errores ✓
