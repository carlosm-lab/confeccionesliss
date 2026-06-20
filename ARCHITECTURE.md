# Architecture Decision Records (ADR)

This document tracks important architectural decisions made during the project lifecycle.
**CRITICAL RULE:** Whenever you (the AI agent) decide on a significant technical approach (e.g., state management structure, API integration pattern, routing changes), you MUST document it here.

## Template for new decisions:

### Format

**Date:** YYYY-MM-DD
**Decision:** [What was decided?]
**Context:** [Why was this decided? What problem does it solve?]
**Consequences:** [What are the trade-offs or things to keep in mind moving forward?]

---

## Logged Decisions

_ (Add new decisions below this line)_

**Date:** 2026-06-20
**Decision:** SEC-001 — NULL-safe authorization check en funciones SECURITY DEFINER
**Context:** Las funciones `admin_delete_user`, `admin_set_user_role`, `get_dashboard_data`, `get_users_list` usaban el operador `<>` para verificar el rol de admin. En PL/pgSQL, `IF NULL <> 'admin' THEN` evalúa la condición como NULL (no TRUE ni FALSE), lo que hace que el bloque `RAISE EXCEPTION` no se ejecute. Combinado con un GRANT a `PUBLIC`, esto significaba que un usuario anónimo podía ejecutar funciones de admin privilegiadas.
**Decision:** (1) REVOKE EXECUTE de `PUBLIC` y `anon` en las 4 funciones admin. (2) GRANT EXECUTE solo a `authenticated`. (3) Cambiar todos los chequeos de autorización de `<> 'admin'` a `IS DISTINCT FROM 'admin'` — el operador `IS DISTINCT FROM` es NULL-safe: `NULL IS DISTINCT FROM 'admin' = TRUE`. (4) Agregar `SET search_path = ''` a cada función para prevenir search_path injection.
**Consequences:** (1) Los usuarios anónimos ya no pueden llamar a ninguna función admin aunque conozcan la URL del endpoint RPC. (2) Los usuarios autenticados sin rol admin son rechazados correctamente (antes podían pasar el chequeo). (3) Siempre usar `IS DISTINCT FROM` en lugar de `<>` cuando se compara con valores que podrían ser NULL en funciones PL/pgSQL de Supabase. (4) Después de `CREATE OR REPLACE FUNCTION`, los grants se resetean — siempre re-otorgar explícitamente.

---

**Date:** 2026-06-20
**Decision:** SEC-002 — Middleware server-side para protección de rutas `/admin/*`
**Context:** Las rutas del panel admin (`/admin/*`) estaban protegidas únicamente por client-side guards en el layout (`useAuth()` + `useEffect`), lo que producía: (1) un "flash" de UI del admin antes del redirect, (2) entrega del bundle JS de admin a todos los visitantes, y (3) ninguna validación antes de que los Server Components iniciaran peticiones de datos.
**Decision:** Crear `src/middleware.ts` usando el patrón oficial de Supabase SSR (`createServerClient` con gestión de cookies). El middleware llama `supabase.auth.getUser()` (validado en el servidor de Auth, NO `getSession()` que solo verifica cookies sin validar con el servidor) y redirige a `/admin/login` si no hay sesión, o a `/` si hay sesión pero el `app_metadata.role` no es `'admin'`. El `app_metadata` es inmutable por el usuario final — solo puede modificarlo el servidor mediante `admin_set_user_role`.
**Consequences:** (1) Cualquier acceso a `/admin/*` sin sesión válida de admin resulta en redirect 307 instantáneo, sin ejecutar ningún Server Component. (2) No usar `process.env` via `@/env` (t3-oss) en el middleware — el Edge Runtime no soporta ese módulo. Usar `process.env.NEXT_PUBLIC_*` directamente. (3) El middleware también maneja el refresh automático de tokens expirados via `setAll` cookies — es crítico retornar siempre `supabaseResponse` (no `NextResponse.next()`) para propagar las cookies actualizadas.

**Date:** 2026-04-23
**Decision:** Patrón Server Actions con Zod y next-safe-action
**Context:** Se usa `next-safe-action` combinado con esquemas `Zod` estrictos ubicados en `src/schemas/` para validar toda la información que entra al sistema (Auth, Profiles, Products, Orders).
**Consequences:** Las mutaciones son Type-Safe de extremo a extremo y seguras. Los esquemas Zod también se pueden reutilizar en Client Components con `react-hook-form`.

---

**Date:** 2026-05-12
**Decision:** Category Hub + Búsqueda Inteligente para `/catalogo`
**Context:** El catálogo mostraba todos los productos con filtros excesivos (UnifiedCatalogClient), generando fricción cognitiva. Se adoptó el patrón "Category Hub" (inspirado en Nike, Apple, Amazon) donde `/catalogo` es una landing visual con 6 tarjetas de categoría que dirigen al usuario a su departamento específico. Se complementó con un buscador inteligente con dropdown de resultados en tiempo real (categorías + productos) integrado en el Navbar global.
**Consequences:** (1) El componente UnifiedCatalogClient queda huérfano — puede eliminarse o reutilizarse. (2) Las sub-páginas `/catalogo/[slug]` siguen funcionando sin cambios. (3) La búsqueda inteligente requiere importar ALL_PRODUCTS en el bundle del Navbar (impacto menor dado el inventario actual ~30 productos). (4) Se extendió CategoryConfig con `hubImage` y `hubTagline` en types.ts/categories.ts.

---

**Date:** 2026-05-12
**Decision:** SearchModal fullscreen reemplaza SearchDropdown inline
**Context:** El buscador inline (SearchDropdown dentro del Navbar) generaba problemas de usabilidad en mobile y limitaba el espacio para mostrar resultados. Se migró a un modal fullscreen (`SearchModal.tsx`) que se abre al hacer clic en la barra de búsqueda (que conserva su apariencia y animación typewriter). El modal incluye chips de categoría como estado inicial, filtrado de productos en tiempo real, y navegación a productos/catálogo.
**Consequences:** (1) `SearchDropdown.tsx` queda huérfano — puede eliminarse. (2) `TypewriterSearch` se reemplazó por `TypewriterPlaceholder` (solo visual, sin input real). (3) La lógica de búsqueda se movió de Navbar a SearchModal. (4) Body scroll se bloquea mientras el modal está activo.

---

**Date:** 2026-06-09
**Decision:** Reintegración de `/links` en `(public)` y remoción de `target="_blank"`
**Context:** La página `/links` (tipo Linktree) sufría crasheos recurrentes del renderizador de pestañas ("¡Oh, no!") en Google Chrome y otros navegadores Chromium en Android al presionar los enlaces a redes sociales. La causa raíz fue identificada como la combinación del atributo `target="_blank"` abriendo procesos renderer adicionales en combinación con la escasez de memoria RAM del dispositivo móvil, que gatillaba el Out-Of-Memory (OOM) Killer del sistema. Adicionalmente, el usuario requirió que `/links` formara parte de la navegación del sitio (Navbar, Footer, WhatsAppButton), en lugar de renderizarse aislada o como un archivo HTML estático.
**Consequences:** (1) La ruta se reubicó en `src/app/(public)/links/` para heredar el layout global. (2) Se removió por completo el atributo `target="_blank"` y `rel="noopener noreferrer"` de todos los enlaces de redes sociales dentro de `LinksPageClient.tsx`. (3) El sistema operativo móvil intercepta y abre las apps nativas (Instagram, Facebook, etc.) de forma directa mediante App Links / Intent, previniendo el crasheo y optimizando la experiencia del usuario. (4) El archivo estático de respaldo `public/links.html` fue eliminado.

---

**Date:** 2026-06-16
**Decision:** Corrección completa del sistema Open Graph — eliminación de `sharp`, imágenes OG dinámicas por producto y categoría, y helper híbrido Edge/Node para carga de assets.
**Context:** El sistema OG tenía 5 problemas críticos identificados en `og.txt`: (1) `opengraph-image.tsx` y `twitter-image.tsx` usaban `sharp` y `node:fs/promises` directamente, incompatibles con Vercel Edge Runtime. (2) Productos y categorías heredaban la imagen genérica de la home. (3) Las URLs de `og:image` en `generateMetadata` del producto eran relativas. (4) Las páginas estáticas no tenían `images` en su metadata openGraph. (5) Satori requiere `display: "flex"` explícito en todo elemento con más de un hijo.
**Consequences:** (1) **`src/lib/og-helper.ts`** es el único punto de carga de assets para OG images — detecta el runtime y usa `fs` en Node o `fetch` en Edge. Nunca usar `readFile` ni `sharp` directamente en archivos `opengraph-image.tsx`. (2) Las imágenes `.webp` de categorías/uniformes tienen versiones `.png` pre-convertidas en `public/`; al agregar nuevas, se deben convertir manualmente. (3) Productos con imagen en CDN externo (Google) usan el logo como fallback en el OG card durante build SSG. (4) Patrón Satori: usar `<div style={{ display: "none" }} />` como rama alternativa de ternarios, nunca `{condition && <div/>}`. (5) Para invalidar caché post-deploy: Meta Sharing Debugger, LinkedIn Post Inspector, Twitter Card Validator.

---

**Date:** 2026-06-17
**Decision:** LegalArticleReader — fondo hub real detrás del overlay de blur
**Context:** Las páginas `/legal/privacidad` y `/legal/terminos` son rutas separadas (no un modal real dentro de `/legal`). El `LegalArticleReader` mostraba un overlay `position:fixed` con `background: rgba(10,17,40,X)` y `backdropFilter: blur(8px)`, pero el fondo que se veía a través del blur era el del layout general (oscuro / vacío), no el hub de `/legal`. Esto rompía la ilusión de modal flotante sobre el hub.
**Decision:** Se extrae el contenido visual del hub (`LegalHubBackground.tsx`) y se renderiza detrás del overlay en cada página de artículo, envuelto con `aria-hidden="true" pointer-events-none hidden lg:block`. La opacidad del overlay bajó de 0.93 a 0.82 para que el hub sea visible. En mobile no hay overlay, por lo que el `LegalHubBackground` se oculta (`hidden`).
**Consequences:** (1) `LegalHubBackground` duplica los datos de `LEGAL_DOCS` de forma intencional — es un componente de presentación puro, no una fuente de verdad. (2) `legal/page.tsx` delega a `LegalHubBackground` para evitar duplicar el JSX. (3) Si se añaden nuevos documentos legales, se debe actualizar `LEGAL_DOCS` en `LegalHubBackground.tsx` (única fuente). (4) El botón de cierre usa `position:absolute top:20 right:20` con `scrollbarWidth:thin` (`+8px` de compensación para que la burbuja tenga 12px de gap con el scrollbar y 12px entre texto y burbuja).

---

**Date:** 2026-06-17
**Decision:** Migración completa del catálogo de datos hardcodeados → Supabase (fuente dinámica de verdad)
**Context:** El catálogo público usaba `src/data/products.ts` con un array estático `ALL_PRODUCTS` de ~30 productos hardcodeados. Esto impedía que el panel de administración tuviera efecto real sobre lo que se mostraba en el catálogo público. La tabla `products` en Supabase existía pero estaba vacía (0 rows). Se realizó una auditoría completa del proyecto para identificar y eliminar TODOS los datos hardcodeados.
**Decision:**

- Se creó `src/lib/catalogService.ts` con funciones SSR para consultar Supabase desde Server Components: `getProductsBySector()`, `getProductBySlug()`, `getRecentProducts()`, `getRelatedProducts()`, `getProductCountsBySector()`.
- Se migró `DbProduct` como tipo canónico de producto (campos: `name, price, old_price, image_path, images, slug, sector, category, tallas, colores, material, badge_text, price_suffix, caracteristicas, short_description`).
- Las páginas del catálogo (`/catalogo`, `/catalogo/[sector]`, `/catalogo/[sector]/[id]`) son ahora async Server Components que hacen fetch directo a Supabase y pasan datos como props a los Client Components.
- `CatalogProductCard`, `ProductDetailClient`, `CatalogPageClient`, `CategoryHubClient`, `SearchModal` fueron reescritos para usar `DbProduct`.
- `SearchModal` ahora busca en tiempo real contra Supabase con debounce de 300ms.
- La Home page (`/`) carga los últimos 6 productos activos desde Supabase server-side.
- Se vaciaron `src/data/products.ts` (solo export `ALL_PRODUCTS = []` para compatibilidad residual).
- Se agregaron columnas a la tabla `products` en Supabase: `sector, badge_text, price_suffix, tallas, colores, material, caracteristicas, short_description`.
- El `ProductModal` del admin fue extendido con campos visuales para `badge_text`, `price_suffix`, `material` y `tallas` (toggle buttons).
- El middleware eliminó `/catalogo` y `/carrito` de `BLOCKED_ROUTES` en producción.
- RLS de Supabase: público puede leer `is_active=true`, solo admins pueden escribir.
  **Consequences:**
  (1) El catálogo está VACÍO hasta que el admin cree productos desde `/admin/products`.
  (2) `src/data/products.ts` es un archivo zombie — puede eliminarse cuando no quede ningún import residual.
  (3) Las páginas `/catalogo/[sector]` usan `generateStaticParams()` basado en `CATEGORIES` (no en DB) — si se agrega un nuevo sector, debe agregarse primero a `src/data/categories.ts`.
  (4) Las páginas de producto usan rutas dinámicas (no SSG fijo) porque el catálogo puede crecer sin rebuild.
  (5) La búsqueda del `SearchModal` usa el campo `name` con `ilike` — para búsqueda por tags/descripción se puede extender en el futuro.
  (6) El `sector` de un producto se guarda tanto en `products.sector` (explícito) como se puede derivar de `categories.catalog` (join). Siempre priorizar `products.sector`.

---

**Date:** 2026-06-17
**Decision:** Implementación de Google Product Rich Results — aggregateRating, review, Merchant Listing completo y Sitemap dinámico
**Context:** Los productos del catálogo tenían JSON-LD básico (`Product` con `name`, `offers`, `brand`, `sku`) pero le faltaban los campos necesarios para que Google muestre rich snippets (estrellas, precio, disponibilidad, envío). Sin `aggregateRating` Google no puede mostrar estrellas en los resultados. Sin `shippingDetails`, los productos no califican para Merchant Listings.
**Decision:**

- Se enriqueció el JSON-LD en `src/app/(public)/catalogo/[sector]/[id]/page.tsx` con:
  - `aggregateRating` (ratingValue: 5.0, ratingCount: 3) basado en 3 reseñas reales de Google Maps.
  - `review` array con los 3 testimonios reales de `src/lib/seo-data.ts` (Juan Carlos Garcia, José Antonio Dias, Kairo Boutique). NO son reviews auto-generadas — son enlaces verificados a Google Maps.
  - `offers.availability` dinámico — InStock/OutOfStock según `product.is_active`.
  - `offers.itemCondition` → `schema.org/NewCondition`.
  - `offers.priceValidUntil` → fin del año corriente (se recalcula automáticamente).
  - `offers.shippingDetails` → envío a El Salvador, 1-3 días hábiles, $0.
  - `offers.hasMerchantReturnPolicy` → 7 días, devolución en tienda, sin costo.
  - `category` y `material` condicionales (solo si el producto los tiene).
  - `image` como array `[url]` (formato recomendado schema.org).
- El sitemap (`src/app/sitemap.ts`) se convirtió a `async` para hacer fetch a Supabase en tiempo de build y generar URLs para todos los productos activos (`/catalogo/[sector]/[slug]`). Usa `getAllProductsForSitemap()` (nueva función en `catalogService.ts`).
  **Consequences:**
  (1) `PRODUCT_AGGREGATE_RATING` y `PRODUCT_REVIEWS` son constantes de módulo — se cargan una sola vez por request del servidor (no por producto). Si en el futuro se crean reseñas por-producto en BD, se deberá pasar el dato como prop.
  (2) Si se agregan nuevas reseñas a `seo-data.ts`, se refleja automáticamente en todos los productos.
  (3) El sitemap ahora es `async` — Next.js soporta esto nativamente. Si Supabase no está disponible en build time, el sitemap omite productos con un `console.warn` (no rompe el build).
  (4) Los datos de `aggregateRating` deben actualizarse manualmente si el número de reseñas crece significativamente. Referencia: `src/app/(public)/catalogo/[sector]/[id]/page.tsx` líneas `PRODUCT_AGGREGATE_RATING`.
  (5) Google puede tardar días o semanas en reindexar y mostrar los rich snippets tras el deploy.

---

**Date:** 2026-06-17
**Decision:** Sistema de Precios Avanzados + Checkout por Pasos + WhatsApp RPC con Anti-Tampering

**Context:**
El usuario requirió precios especiales (ofertas, mayoreo, mano de obra), envíos regionalizados para El Salvador, y un mensaje de WhatsApp en lenguaje natural. La lógica de precios en el cliente era vulnerable a manipulación.

**Decisions made:**

1. **`src/lib/shipping.ts`** — Módulo puro que define `ShippingZone` ("LOCAL" | "ORIENTAL" | "NACIONAL"), los 14 departamentos con sus municipios, costos fijos por zona, y la función `getShippingInfo(dept, muni)` que retorna `ShippingInfo { zone, cost, label, department, municipality }`.

2. **`CartContext.tsx`** — Agrega `shippingInfo: ShippingInfo | null` y `setShippingInfo` al contexto. El info de envío persiste en memoria durante la sesión pero se limpia al cerrar el drawer. **No** se persiste en `localStorage` para evitar datos desactualizados (si el usuario regresa días después con una ubicación seleccionada, debería reseleccionar).

3. **`CartDrawer.tsx` — Flujo de 4 pasos:** El estado `DrawerStep` (`"cart" | "shipping" | "confirm" | "sent"`) reemplaza los booleans `showConfirm` y `orderSent` anteriores. El paso `"shipping"` es obligatorio — el usuario no puede ir a confirmar sin seleccionar departamento + municipio.

4. **`generate_whatsapp_message` RPC (Supabase SECURITY DEFINER):** Toda la generación del mensaje ocurre en el servidor de Supabase. La función recibe el carrito del cliente, **revalida cada precio contra la base de datos** (anti-tampering), aplica precio mayoreo si aplica, y genera un párrafo natural en español. El cliente NO puede enviar precios manipulados porque la función los ignora y toma los precios reales de `products`.

5. **`ProductModal.tsx` — 5 tipos de oferta:** `temporal`, `indefinida`, `nuevos_clientes`, `clientes_frecuentes`, `por_talla`. La validación garantiza: precio anterior > precio actual, precio mayoreo < precio regular, cantidad mínima mayoreo ≥ 2.

**Consequences:**

- Si la RPC falla (red, Supabase caído), el pedido NO se envía — se muestra toast de error. Esto es preferible a enviar un mensaje con precios potencialmente manipulados.
- El costo de envío es estimado (se usa el costo fijo de la zona). Si en el futuro se integra con un API de courier, `getShippingInfo` es el único punto a cambiar.
- `offer_type` se guarda en BD pero la lógica de visibilidad de la oferta (e.g., solo para nuevos clientes) **no está implementada en el front-end público todavía** — es un campo informativo para el admin y el mensaje de WhatsApp. La implementación de reglas de negocio por tipo de cliente queda pendiente para cuando exista un sistema de cuentas de usuario.
