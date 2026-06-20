# Auditoría de Seguridad Total — Confecciones Liss

**Fecha:** 2026-06-20  
**Tipo:** Caja Blanca — Acceso Total al Código Fuente y BD  
**Protocolo:** secure.txt (Auditoría Total y Enfermiza)

---

## Alcance

- **100% del código leído** con protocolo forense línea a línea (Fase 1, 8 bloques)
- **11 categorías de vulnerabilidad evaluadas** (Fase 2, A-K)
- **npm audit ejecutado y evaluado** — 14 vulnerabilidades → 2 moderadas residuales no explotables
- **RLS auditado tabla por tabla** con queries reales sobre Supabase (12 tablas)
- **Cadenas de exploits evaluadas** (Fase 2.K)
- **Historial de git rastreado** por secretos commiteados (ninguno encontrado)
- **Storage bucket auditado** — `product-images`
- **Cabeceras HTTP verificadas** — CSP en enforcement, HSTS, X-Frame-Options, etc.

---

## Inventario de Archivos Leídos (Fase 0.C)

### Bloque 1 — Configuración y superficie de entrada

- `package.json` ✓
- `next.config.mjs` ✓
- `tsconfig.json` ✓
- `src/proxy.ts` (middleware) ✓
- `src/env.ts` ✓
- `.env.local` / `.env.example` ✓

### Bloque 2 — Autenticación y sesión

- `src/context/AuthContext.tsx` ✓
- `src/lib/supabaseClient.ts` ✓
- `src/app/auth/callback/route.ts` ✓
- `src/app/(admin)/admin/login/page.tsx` ✓

### Bloque 3 — Route Handlers y Server Actions

- `src/app/auth/callback/route.ts` ✓ (único route handler del proyecto)
- `src/app/robots.ts` ✓
- `src/app/sitemap.ts` ✓

### Bloque 4 — Queries a Supabase

- `src/lib/catalogService.ts` ✓
- `src/context/CartContext.tsx` ✓
- `src/context/FavoritesContext.tsx` ✓
- `src/components/admin/ProductModal.tsx` ✓
- `src/app/(admin)/admin/products/page.tsx` ✓
- `src/app/(admin)/admin/categories/page.tsx` ✓
- `src/app/(admin)/admin/messages/page.tsx` ✓
- `src/app/(admin)/admin/usuarios/page.tsx` ✓

### Bloque 5 — Componentes y páginas

- `src/components/catalogo/ProductDetailClient.tsx` ✓
- `src/components/catalogo/CatalogPageClient.tsx` ✓
- `src/components/catalogo/CatalogProductCard.tsx` ✓
- `src/components/catalogo/CategoryHubClient.tsx` ✓
- `src/components/cart/CartDrawer.tsx` ✓
- `src/components/cart/FavoritesModal.tsx` ✓
- `src/components/cart/LoginModal.tsx` ✓
- `src/components/layout/Navbar.tsx` ✓
- `src/components/layout/Footer.tsx` ✓
- `src/components/admin/AdminFooterBar.tsx` ✓
- `src/components/admin/CategoryChart.tsx` ✓
- `src/components/admin/ImageUploader.tsx` ✓
- `src/components/admin/ProductTable.tsx` ✓
- `src/components/admin/StatDetailModal.tsx` ✓
- `src/components/admin/StatsCards.tsx` ✓
- `src/components/admin/TopFavorites.tsx` ✓
- `src/components/admin/RecentMessages.tsx` ✓
- `src/components/admin/RecentProducts.tsx` ✓
- `src/components/legal/LegalArticleReader.tsx` ✓
- `src/app/(public)/contacto/page.tsx` ✓
- `src/app/(public)/page.tsx` ✓
- `src/app/(public)/catalogo/[sector]/[id]/page.tsx` ✓

### Bloque 6 — Hooks y utilidades

- `src/lib/sanitize.ts` ✓
- `src/lib/whatsapp.ts` ✓
- `src/lib/shipping.ts` ✓
- `src/lib/schemas.ts` ✓
- `src/lib/seo-data.ts` ✓
- `src/lib/catalogService.ts` ✓
- `src/lib/constants.ts` ✓
- `src/lib/formatPrice.ts` ✓
- `src/lib/logger.ts` ✓
- `src/lib/productUtils.ts` ✓
- `src/lib/slug.ts` ✓
- `src/lib/storageUtils.ts` ✓
- `src/lib/utils.ts` ✓
- `src/hooks/useBodyScrollLock.ts` ✓
- `src/hooks/useCategories.ts` ✓
- `src/hooks/useDebounce.ts` ✓
- `src/hooks/useModal.ts` ✓

### Bloque 7 — Tipos, esquemas, constantes

- `src/data/types.ts` ✓
- `src/data/categories.ts` ✓
- `src/data/services.ts` ✓
- `src/config/site.ts` ✓
- `src/config/catalogs.ts` ✓

### Bloque 8 — Archivos restantes

- `src/mocks/handlers.ts` ✓
- `src/providers/index.tsx` ✓
- `src/providers/theme-provider.tsx` ✓
- `src/app/globals.css` ✓
- `src/context/ConfirmContext.tsx` ✓
- Todos los archivos `*.md`, `*.png`, `*.svg` públicos revisados — sin secretos

---

## Hallazgos — Registro Maestro (Fase 3)

### SEC-001

- **Categoría:** 2.J — Dependencias
- **Archivo(s):** `package.json`, `package-lock.json`
- **Vector exacto:** `npm audit` detecta Next.js 16.2.3 con CVEs críticos de middleware bypass (GHSA-267c-6grr-h53f, GHSA-492v-c6pp-mqqv, etc.), cache poisoning, XSS y DoS
- **Severidad:** ALTA
- **Evidencia:** `npm audit` output — 6 vulnerabilidades HIGH, 7 MODERATE, 1 LOW antes de corrección
- **Impacto:** Bypass de middleware `/admin`, cache poisoning de respuestas, DoS del servidor, XSS via CSP nonces
- **Estado:** ✅ **RESUELTO** — Next.js actualizado a 16.2.9. Resultado: 2 moderadas residuales (postcss interno, no corregibles sin downgrade)

### SEC-002

- **Categoría:** 2.D — RLS Supabase
- **Archivo(s):** Supabase — tablas `categorias`, `productos`, `items_pedido`, `pedidos`, `mensajes`, `product_offer_rules`
- **Vector exacto:** Políticas de escritura admin tenían `TO {public}` en lugar de `TO {authenticated}`, permitiendo que roles anónimos de BD accedieran a la evaluación del JWT check
- **Severidad:** MEDIA
- **Evidencia:** `SELECT roles FROM pg_policies` mostraba `{public}` en políticas de escritura admin
- **Impacto:** Aunque el JWT check bloqueaba correctamente (NULL JWT = fallo), la semántica era incorrecta y dependía únicamente del JWT check sin el filtro previo de PostgreSQL
- **Estado:** ✅ **RESUELTO** — Políticas actualizadas a `TO {authenticated}` en las 6 tablas

### SEC-003

- **Categoría:** 2.G / 2.A — Lógica de negocio / Inyección
- **Archivo(s):** Supabase — función `generate_whatsapp_message`
- **Vector exacto:** La función aceptaba arrays de items sin límite superior, sin validación de cantidad por ítem, y sin truncamiento de strings; un payload masivo podría causar timeout o mensaje explotablemente largo
- **Severidad:** BAJA
- **Evidencia:** Firma original `items jsonb` sin validación de `jsonb_array_length(items) > N`
- **Impacto:** Payload abusivo que genere mensajes de WhatsApp extremadamente largos o causar timeout en la RPC
- **Estado:** ✅ **RESUELTO** — Límite de 50 items, validación de qty [1,100], truncamiento de color (100 chars) y nota (200 chars), validación de shipping_cost [0, 500]

---

## Hallazgos VERIFICADOS SEGUROS — Sin Vulnerabilidad

### SAFE-001 — Autenticación: Fuerza bruta (2.B)

- **Resultado:** NO vulnerable. Login exclusivamente por Google OAuth. Sin campo de email/password en la UI. No hay endpoint de login propio para hacer fuerza bruta.

### SAFE-002 — Enumeración de usuarios (2.B)

- **Resultado:** NO vulnerable. OAuth redirige a Google — no hay respuesta diferencial de "usuario existe/no existe" desde el servidor propio.

### SAFE-003 — Session fixation (2.B)

- **Resultado:** NO vulnerable. Supabase genera nuevo token en cada login via OAuth.

### SAFE-004 — Reutilización de token post-logout (2.B)

- **Resultado:** PROTEGIDO. `signOut()` llama a `supabase.auth.signOut()` que revoca el refresh token en el servidor. El JWT expira en 1 hora máximo.

### SAFE-005 — IDOR en user_carts y user_favorites (2.C)

- **Resultado:** NO vulnerable. La política `(auth.uid() = user_id)` evalúa a NULL cuando `auth.uid()` es NULL, bloqueando correctamente al anónimo. Verificado: `NULL = NULL → NULL → FALSE` en PostgreSQL.

### SAFE-006 — Manipulación de precio desde cliente (2.G)

- **Resultado:** NO vulnerable. La RPC `generate_whatsapp_message` no acepta precio como parámetro. Lee precios directamente desde la tabla `products` con `is_active = TRUE`. El precio nunca viene del cliente.

### SAFE-007 — Productos inactivos accesibles (2.G)

- **Resultado:** NO vulnerable. RLS `products_public_read: USING (is_active = true)` bloquea completamente el acceso a productos inactivos. Verificado con `SET ROLE anon; SELECT COUNT(*) WHERE is_active = false → 0`.

### SAFE-008 — SSRF via Image Optimizer (2.J)

- **Resultado:** NO vulnerable. `images.remotePatterns` restringido a `lh3.googleusercontent.com` y `cvbdqsxjfrbwovzpydng.supabase.co`. No permite orígenes arbitrarios.

### SAFE-009 — Open Redirect en OAuth callback (2.C)

- **Resultado:** NO vulnerable. El `/auth/callback` ignora cualquier `redirectTo` de la URL. El destino post-login está hardcodeado: admin → `/admin`, usuario → `/`.

### SAFE-010 — XSS via dangerouslySetInnerHTML (2.H)

- **Resultado:** NO vulnerable. No existe ningún uso de `dangerouslySetInnerHTML` en el proyecto. Verificado con grep exhaustivo. El JSON-LD en `<script type="application/ld+json">` usa `JSON.stringify()` puro.

### SAFE-011 — Secretos en código y git (2.E)

- **Resultado:** LIMPIO. `SERVICE_ROLE_KEY` no aparece en ningún archivo. Historial completo de git escaneado — sin secretos. El cliente browser solo usa `ANON_KEY`.

### SAFE-012 — Storage: subida de archivos peligrosos (2.F)

- **Resultado:** NO vulnerable. `allowed_mime_types: ["image/jpeg","image/jpg","image/png","image/webp","image/gif","image/avif"]`, `file_size_limit: 5MB`. Extensiones `.html`, `.svg`, `.js` bloqueadas.

### SAFE-013 — Cabeceras de seguridad (2.I)

- **Resultado:** COMPLETAS. CSP enforcement activo, HSTS 1 año, X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy: strict-origin-when-cross-origin. Cookies de Supabase SSR configuradas por la librería oficial con HttpOnly y Secure en producción.

### SAFE-014 — RLS habilitado en todas las tablas (2.D)

- **Resultado:** ✅ RLS habilitado en las 12 tablas públicas sin excepción: `categorias`, `categories`, `items_pedido`, `mensajes`, `messages`, `pedidos`, `product_offer_rules`, `productos`, `products`, `profiles`, `user_carts`, `user_favorites`.

### SAFE-015 — Mass Assignment (2.C)

- **Resultado:** NO vulnerable. El payload del `ProductModal` construye el objeto explícitamente campo por campo. El RLS de admin verifica JWT en el servidor antes de aceptar cualquier INSERT/UPDATE.

### SAFE-016 — Bypass de middleware (2.C)

- **Resultado:** NO vulnerable. El middleware `proxy.ts` usa `getUser()` (valida contra Supabase Auth Server, no acepta cookies sin verificar). Las páginas de admin también verifican el rol vía layout server-side.

---

## Observaciones Sin Vulnerabilidad Activa

### OBS-001 — Rate limiting en formulario de contacto

- **Estado:** Pendiente de implementar
- **Impacto:** Sin rate limiting, un atacante puede enviar mensajes repetidos al formulario de contacto (tabla `messages`)
- **Mitigación actual:** La política de INSERT tiene validaciones de longitud y formato de email
- **Recomendación:** Implementar Upstash Redis + `@upstash/ratelimit` en middleware o en la action de contacto

### OBS-002 — Rate limiting en RPC `generate_whatsapp_message`

- **Estado:** Pendiente de implementar
- **Impacto:** La RPC puede ser invocada repetidamente — sin limitación por IP/usuario
- **Recomendación:** Rate limiting por IP usando Upstash Redis

### OBS-003 — `labor_price` no se persiste desde el admin

- **Estado:** Bug funcional (no de seguridad)
- **Detalle:** El campo `labor_price` se parsea en `ProductModal.tsx` pero no se incluye en el payload enviado a Supabase
- **Impacto:** Sin impacto de seguridad. Bug de UX/producto

### OBS-004 — Política `profiles_self_update` tiene subquery de auto-prevención de escalación

- **Estado:** CORRECTO — ya protege
- **Detalle:** La política verifica que el usuario no pueda cambiar su propio `rol` o `role` a un valor diferente del que ya tiene: `AND (rol = (SELECT profiles_1.rol FROM profiles profiles_1 WHERE (profiles_1.id = auth.uid())))`
- **Resultado:** Mass assignment de escalación de rol bloqueado a nivel de RLS

---

## Causas Raíz y Correcciones (Fase 4 y 5)

### SEC-001 — Next.js CVEs

- **Causa raíz:** Versión 16.2.3 sin parchar
- **Corrección aplicada:** `npm install next@16.2.9` via `npm audit fix --force`
- **Verificación:** `npm pkg get dependencies.next` → `"16.2.9"`
- **No reduce protección existente:** ✓ (actualización de patch, no downgrade)
- **No rompe funcionalidad legítima:** ✓ (sin breaking changes entre 16.2.3 y 16.2.9)

### SEC-002 — RLS legacy con `TO {public}`

- **Causa raíz:** Políticas creadas con rol implícito `public` en lugar de `authenticated`
- **Corrección aplicada:** `DROP POLICY ... + CREATE POLICY ... TO authenticated` en 6 tablas
- **Verificación:** `SELECT roles FROM pg_policies` → todas muestran `{authenticated}`
- **No reduce protección:** ✓ (más estricto que antes)
- **No rompe funcionalidad:** ✓ (solo usuarios autenticados eran admins de todas formas)

### SEC-003 — RPC sin límites de input

- **Causa raíz:** `generate_whatsapp_message` no validaba tamaño del array ni longitud de strings
- **Corrección aplicada:** `IF jsonb_array_length(items) > 50 THEN RAISE EXCEPTION`, validaciones de qty, truncamiento de strings, validación de shipping_cost
- **Verificación:** `SELECT pg_get_function_arguments(p.oid) FROM pg_proc` — función actualizada
- **No reduce protección:** ✓
- **No rompe funcionalidad legítima:** ✓ (límite de 50 items supera cualquier uso real esperado)

---

## Documentación Oficial Consultada

- Supabase Auth SSR: https://supabase.com/docs/guides/auth/server-side/creating-a-client
- Next.js Middleware: https://nextjs.org/docs/app/building-your-application/routing/middleware
- Supabase RLS: https://supabase.com/docs/guides/database/row-level-security
- OWASP Top 10 2021: https://owasp.org/Top10/
- npm audit advisories: GHSA-267c-6grr-h53f, GHSA-492v-c6pp-mqqv, GHSA-3g8h-86w9-wvmq

---

## Verificación "No quitar la chapa"

- ✅ Ninguna corrección redujo una protección existente
- ✅ Ninguna corrección desactivó o relajó RLS
- ✅ Ninguna corrección ocultó el problema con try/catch silencioso
- ✅ Las correcciones cubren todos los caminos de entrada identificados
- ✅ Ninguna corrección cambió el comportamiento legítimo para usuarios autorizados
- ✅ Todas las correcciones están respaldadas por documentación oficial

---

## Parches de Seguridad Preexistentes Encontrados y Verificados

- **SEC-005 (previo):** Callback OAuth ya no redirige ciegamente a `/admin` — verificado en `route.ts` línea 45-46
- **SEC-006 (previo):** Headers de seguridad ya estaban implementados en `next.config.mjs`
- **SEC-007 (previo):** Middleware usa `getUser()` no `getSession()` — verificado en `proxy.ts` línea 94
- **SEC-008 (previo):** `profiles_self_update` previene escalación de rol — verificado en pg_policies

---

## Cadenas de Exploits Identificadas (Fase 2.K)

### CHAIN-001: Analizada — No explotable

- **Componentes:** (Hipotético) XSS via input + Cookie sin HttpOnly → robo de sesión
- **Evaluación:** XSS no existe (sin `dangerouslySetInnerHTML`, sin concatenación de HTML crudo). Las cookies de sesión de Supabase SSR tienen `HttpOnly` en producción. **No explotable.**

### CHAIN-002: Analizada — No explotable

- **Componentes:** (Hipotético) IDOR en favoritos + datos de email expuestos → phishing dirigido
- **Evaluación:** IDOR no existe en favoritos (policy `auth.uid() = user_id` con NULL-safety verificada). **No explotable.**

### CHAIN-003: Analizada — No explotable

- **Componentes:** SEC-001 (Next.js CVEs) + middleware bypass → acceso no autorizado a `/admin`
- **Evaluación:** Con Next.js 16.2.9, los CVEs de middleware bypass están parchados. **No explotable post-corrección.**

---

## Segunda Pasada — Re-Auditoría Completa (Fase 6)

**Hallazgos nuevos:** 0  
**Hallazgos persistentes tras correcciones:** 0  
**Regresiones funcionales detectadas:** 0  
**Iteraciones totales:** 2

La segunda pasada confirmó que las correcciones aplicadas no introdujeron nuevas vulnerabilidades ni regresiones.

---

## Estado Final (Checklist Fase 7.A)

- ✅ 100% de los archivos del inventario leído con protocolo forense
- ✅ RLS verificado tabla por tabla con queries reales (12/12 tablas)
- ✅ Sin claves secretas expuestas (código actual + historial git)
- ✅ Lógica de negocio crítica (precio, stock) validada en servidor (RPC + RLS)
- ✅ Storage auditado — bucket `product-images` con tipo MIME restringido y tamaño limitado
- ✅ `npm audit` ejecutado y evaluado — 14 → 2 moderadas residuales no explotables
- ✅ Cabeceras y cookies de seguridad revisadas — completas en producción
- ✅ Cadenas de exploits evaluadas explícitamente — ninguna viable
- ✅ Ningún parche de seguridad preexistente quedó sin verificar
- ✅ Diseño visual intacto — cero cambios estéticos
- ✅ Ningún flujo legítimo perdió funcionalidad
- ✅ Consolas limpias (agente:sync: 0 errores)
- ✅ Commit `d49ef89` en rama `desarrollo`

---

_Auditoría ejecutada bajo protocolo secure.txt — Caja Blanca Total — 2026-06-20_
