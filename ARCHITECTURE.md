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

**Date:** 2026-07-06
**Decision:** Prohibición Estricta de SSR — Estrategia de SSG Puro + Revalidación Bajo Demanda (On-Demand Revalidation)
**Context:** El cliente exige que la plataforma funcione en su totalidad mediante SSG (Static Site Generation), eliminando cualquier ruta SSR (`force-dynamic`). Se realizó una auditoría completa del proyecto para garantizar que todas las páginas se generen estáticamente y se revaliden bajo demanda (`revalidatePath`).
**Decision:**

- **Todas las Páginas Públicas son SSG:** Las vistas principales (`/`, `/catalogo`, `/catalogo/[sector]`, `/catalogo/[sector]/[id]`, `/catalogo/universidades/[universidad]`, `/catalogo/universidades/[universidad]/[id]`, `/servicios/[slug]`) utilizan `generateStaticParams()` o pre-renderizado estático de RSC en build time.
- **On-Demand Revalidation:** Ante mutaciones en el panel de administración (alta, baja, modificación de productos o toggling de productos fijados), se invoca `revalidatePath(...)` desde las Server Actions para actualizar el HTML estático en caché de forma inmediata.
- **Prohibición de SSR:** Cero uso de `export const dynamic = 'force-dynamic'`. Ninguna página pública realiza lecturas dinámicas por petición en el servidor.
- **Panel Administrativo:** Utiliza Client Components (`"use client"`) cuyo shell HTML se compila de forma estática (SSG) y la interacción se realiza directamente desde el cliente.

---

**Date:** 2026-07-06
**Decision:** Auditoría 360° de Seguridad OWASP y Endurecimiento de Server Actions & Middleware
**Context:** Se realizó una auditoría exhaustiva 360° en base a OWASP Top 10 (2021/2026), OWASP API Security Top 10 (2023) y OWASP ASVS. Se identificaron vectores de riesgo en Server Actions públicas sin verificación de rol, ausencia de Rate Limiting en formularios de contacto y necesidad de verificación de convenciones de Next.js 16 para middleware (`src/proxy.ts`).
**Decision:**

- **Middleware Next.js 16 (`src/proxy.ts`):** Se confirmó que Next.js 16 adopta oficialmente `src/proxy.ts` como la convención de middleware y arroja error si coexiste con `src/middleware.ts`. Se mantiene `src/proxy.ts` garantizando la ejecución de killswitch, Supabase Auth SSR y redirección protegida de `/admin`.
- **Protección de Server Actions (`src/actions/catalog.ts`):** Se agregó la verificación de sesión y rol de administrador (`user.app_metadata.role === 'admin'`) a `revalidateAfterProductSave` para mitigar ataques de Cache Invalidation DoS.
- **Rate Limiting (`src/actions/contact.ts`):** Se implementó Rate Limiting in-memory (máx 3 envíos por 5 minutos por email) en la Server Action `sendContactMessage` para prevenir spam y agotamiento de recursos.
- **Auditoría de Acciones Administrativas (`src/actions/featuredProducts.ts`):** Se integró el registro automático de eventos en la tabla `security_events` de Supabase al alternar productos fijados.
  **Consequences:** La aplicación cumple con las normas de seguridad OWASP Top 10 y API Security 2023, protegiendo las Server Actions contra abuso y manteniendo compatibilidad total con el motor Turbopack / Next.js 16.

---

**Date:** 2026-07-04
**Decision:** Implementación de Productos Fijados ("is_featured") en Home
**Context:** El cliente solicitó la capacidad de seleccionar desde `/admin/products` qué productos específicos deben quedar fijos en la sección "Novedades" del Home en lugar de mostrar de forma estricta los más recientes creados.
**Decision:**

- Se agregó la columna `is_featured BOOLEAN NOT NULL DEFAULT FALSE` en la tabla `products` de Supabase con un índice parcial.
- Se implementó la Server Action `toggleFeaturedProduct` en `src/actions/featuredProducts.ts` que valida el límite de máximo 6 productos fijados, actualiza el estado y realiza un `revalidatePath('/')` inmediato.
- Se modificó `getRecentProducts()` en `catalogService.ts` para retornar primero los productos con `is_featured=true` (activos) y rellenar los espacios restantes (hasta 6) con los productos activos más recientes no fijados.
- Se rediseñó la columna de Acciones en la tabla `ProductTable.tsx` agregando un botón de pin (`push_pin` de Material Symbols) que se ilumina en ámbar/dorado cuando el producto está fijado.
- Se integró el handler en la página de administración de productos con toasts descriptivos en caso de éxito o superación del límite máximo.
  **Consequences:**
- El administrador ahora cuenta con control total sobre qué productos se priorizan en la página de inicio, manteniendo un flujo de autocompletado inteligente con los productos más nuevos si decide fijar menos de 6. Se preserva la consistencia de estilos y la revalidación on-demand.

---

**Date:** 2026-06-28
**Decision:** Rediseño Completo de Manifiesto Editorial e Inmersivo para `/empresa/filosofia`
**Context:** Se requería rediseñar la página de filosofía desde cero para no parecer la típica página corporativa con tarjetas repetitivas de visión/misión/valores, sino transmitir la esencia viva del oficio artesanal acumulado desde 2005. Se prohibió expresamente reutilizar cualquier sección o patrón previo del sitio, buscando una experiencia editorial premium de estudio creativo.
**Decision:**

- Se eliminó por completo el código previo de `FilosofiaClient.tsx` y se desarrolló desde cero un manifiesto editorial dinámico.
- Se modularizó la cabecera separando el lienzo de dibujo técnico SVG en `TextilePatternCanvas.tsx`, implementando 5 capas de trazados vectoriales (grilla, moldes, curvas francesas, costuras y anotaciones) animados de forma asíncrona mediante parallax con `useScroll` y `useTransform`.
- Se implementó una sección sticky de pantalla completa en fondo azul institucional donde 4 frases clave se revelan y desvanecen secuencialmente de acuerdo con el progreso de scroll vertical.
- Se diseñó un acordeón horizontal tipo museo para los 7 compromisos/valores que expande suavemente el panel enfocado (flex-grow interactivo) y comprime los demás en desktop usando `layout` de Framer Motion, con degradado a snap-scroll horizontal táctil en mobile.
- Se estructuró un Bento Grid asimétrico de 5 módulos combinando de forma armónica Misión, Visión, cita destacada de legado, estadísticas e imágenes reales del taller en blanco y negro sin iconos.
- Se incorporaron 3 lookbooks a escala gigante con frases flotantes de alto impacto y un footer de doble columna simétrica.
  **Consequences:**
- Se logra transmitir con fuerza la identidad familiar del taller mediante un diseño sofisticado y dinámico tipo revista de diseño contemporánea, con transiciones suaves basadas exclusivamente en opacidad, escala mínima y desplazamientos lentos (sin rebotes ni giros). Se mantiene una óptima experiencia responsive y altos estándares de accesibilidad visual y SEO técnico.

---

**Date:** 2026-06-28
**Decision:** Desarrollo desde Cero de la Experiencia Interactiva de Proceso de Confección (`/empresa/proceso-de-confeccion`)
**Context:** Se requería rediseñar completamente la página de Proceso de Confección para crear una experiencia inmersiva y dinámica de 10 etapas del taller que transmitiera precisión técnica y profesionalidad. Se prohibió el reuso de cualquier sección o patrón visual previo.
**Decision:**

- Se eliminó el renderizado antiguo de `InstalacionesClient` en `/empresa/proceso-de-confeccion/page.tsx` para no duplicar la vista de instalaciones.
- Se implementó `ProcesoDeConfeccionClient.tsx` desde cero como una narrativa editorial fluida que alterna estructuras visuales (Cabecera 60/40, Bento UI para análisis, columnas alternantes, bandas de materiales de ancho completo, grids asimétricos con paneles de confección flotantes y un grid rígido con líneas finas sin iconos para calidad).
- Se diseñó un indicador sticky horizontal de progreso que se sincroniza dinámicamente con la etapa visible mediante `IntersectionObserver`.
- Se desarrolló una "Mesa de Trabajo" interactiva que visualiza las conexiones de cada integrante del equipo con las etapas específicas del taller en las que colabora.
- Se agregaron las filas editoriales de diferenciales corporativos de la marca familiar.
  **Consequences:**
- Se logra una experiencia interactiva sin precedentes en la sección corporativa que ilustra detalladamente el proceso de manufactura, facilitando la comprensión del visitante y manteniendo altos índices de conversión y SEO técnico.

---

**Date:** 2026-06-28
**Decision:** Enrutamiento del Hub `/empresa` e `/empresa/instalaciones`
**Context:** Se necesitaba solucionar problemas de ruteo: (1) las tarjetas del grid Bento redirigían a rutas obsoletas de `/legal/*`, y (2) la ruta `/empresa/instalaciones` arrojaba error 404 al no existir su correspondiente archivo de página, mientras que `/empresa/proceso-de-confeccion` renderizaba incorrectamente el componente `InstalacionesClient` en vez de su propio SEO.
**Decision:**

- Se restauró la página del Hub `/empresa/page.tsx` original a su diseño inicial por rechazo del usuario de los cambios del nuevo hub.
- Se re-enlazaron las tarjetas del grid del Hub original a sus rutas correspondientes de `/empresa/*` (e.g. `/empresa/calidad`, `/empresa/certificaciones`, etc.) en lugar de las rutas legales obsoletas.
- Se creó la página `src/app/(public)/empresa/instalaciones/page.tsx` renderizando el recorrido del taller (`InstalacionesClient`) con SEO y Breadcrumbs de "Instalaciones".
- Se removió el directorio vacío redundante `src/app/empresa`.
  **Consequences:**
- Se corrigen los enlaces del Hub corporativo original, garantizando que el usuario acceda a las páginas correspondientes sin toparse con errores 404 ni redirecciones a políticas legales, manteniendo el diseño original preferido por el usuario. La página de Instalaciones opera bajo su URL limpia con SEO optimizado y JSON-LD estructurado de LocalBusiness.

---

**Date:** 2026-06-27
**Decision:** Hub de Equipo Asimétrico por Capas y Subrutas de Perfil Dinámicas (`/empresa/equipo/[slug]`)
**Context:** Se requería reestructurar `/empresa/equipo` para evitar el diseño uniforme de cards 3x3 o 4x4 y el lenguaje corporativo vacío. Se necesitaba reflejar una jerarquía real del taller y vincular a cada miembro de manera interactiva a una ficha de perfil única.
**Decision:**

- Se implementó `team.ts` como base de datos unificada del equipo.
- Se desarrolló `EquipoClient.tsx` que estructura al equipo en capas funcionales asimétricas con layouts diferenciados (Hero para la fundadora, cuadrículas de alturas variables para producción, franjas técnicas horizontales para control/logística, panel tecnológico brutalista para estrategia digital y mosaico editorial para modelos).
- Se implementó la ruta dinámica `/empresa/equipo/[slug]/page.tsx` usando SSG (`generateStaticParams`) y metadatos dinámicos para indexar la ficha técnica individual de cada empleado.
- Se configuraron los diales de diseño en `DESIGN_VARIANCE: 9`, `MOTION_INTENSITY: 7` y `VISUAL_DENSITY: 3`.
  **Consequences:**
- Se logra una experiencia de usuario sumamente personalizada y Premium que dignifica el trabajo de cada miembro de la empresa familiar, potenciando además la indexación de perfiles (SEO/E-E-A-T).

---

**Date:** 2026-06-27
**Decision:** Rediseño a Manifiesto Editorial para `/empresa/filosofia`
**Context:** Se requería diseñar la página de filosofía corporativa, misión y visión como una experiencia de lectura por bloques conceptuales (no cards de dashboard tradicionales) con el fin de transmitir la cultura organizativa y código de calidad técnico del taller.
**Decision:**

- Se implementó `FilosofiaClient.tsx` bajo un patrón de lectura fluida con espaciado amplio, contrastes tipográficos y ritmos asimétricos.
- Se mantuvo `page.tsx` para SEO, robots e inyección de datos estructurados JSON-LD.
- Se definieron los diales de diseño en `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 6` y `VISUAL_DENSITY: 3`.
- Se introdujo un bloque central en color oscuro (`#001b4a`) que destaca visualmente los tres pilares del uniforme (Funcional, Duradero, Impecable).
  **Consequences:**
- La página proyecta una imagen técnica, seria y confiable de la empresa, evitando clichés y plantillas corporativas comunes.

---

**Date:** 2026-06-27
**Decision:** Rediseño interactivo de Storytelling en Scroll Continuo para `/empresa/sobre-nosotros`
**Context:** Se requería transformar la página institucional estática en una experiencia visual de alto impacto tipo narrativa editorial/cinematográfica de scroll continuo (9 escenas secuenciales), respetando la identidad visual y los datos de `nuestrahistoria.txt`.
**Decision:**

- Se crearon componentes modulares: `SobreNosotrosClient.tsx` implementa toda la lógica de animación con `framer-motion` (entradas staggered, barras de progreso y flujos interactivos de recomendación en SVG).
- Se mantuvo `page.tsx` como Server Component para preservar los metadatos SEO, Breadcrumbs y el marcado JSON-LD estructurado de `AboutPage`.
- Se configuraron los diales de diseño en `DESIGN_VARIANCE: 8`, `MOTION_INTENSITY: 8` y `VISUAL_DENSITY: 3` para una estética de galería de arte y revista editorial de modas.
  **Consequences:**
- Se logra una experiencia inmersiva fluida en móvil y escritorio sin sacrificar la velocidad de renderizado en el servidor ni la indexación de los buscadores.

---

**Date:** 2026-06-26
**Decision:** Ruta dinámica de servicios [slug] y modularización del diseño de Stitch
**Context:** Se requería implementar la página de servicio de Bordado Computarizado utilizando el diseño exacto (pixel a pixel) generado en Google Stitch, pero manteniendo la flexibilidad de soportar los otros 4 servicios de forma dinámica en el futuro sin modificar la arquitectura de ruteo.
**Decision:**

- Se configuró la ruta dinámica `src/app/(public)/servicios/[slug]/page.tsx` con soporte para SSG puro (`generateStaticParams`).
- Se implementó un componente coordinador `ServicioDetallePage` que actúa como selector.
- Si el slug es `bordados-personalizados`, redirige al componente dedicado `ServicioBordadosDetalle` el cual ensambla las sub-secciones (`ServicioHero`, `ServicioEditorial`, `ServicioFAQ` y `ServicioCTABanner`) con datos fijos e imágenes de alta fidelidad provenientes del prototipo.
- Para el resto de los slugs, se renderiza un fallback `ServicioDetalleGeneric` que consume dinámicamente la información de `@/data/services`.
- La textura del fondo de tela y las transiciones del acordeón se modularizaron usando CSS en línea (inline styles) y clases nativas de React con estados (`useState`) respectivamente, garantizando una implementación autoportante.
  **Consequences:**
- Se asegura una réplica exacta de los prototipos de Stitch sin alterar la consistencia del resto de las páginas del sitio.
- A la fecha, se han implementado por completo los 5 componentes detallados específicos:
  1. `ServicioBordadosDetalle` (`bordados-personalizados`)
  2. `ServicioSublimacionDetalle` (`sublimacion`)
  3. `ServicioSastreriaDetalle` (`confeccion-a-medida`)
  4. `ServicioManoObraDetalle` (`mano-de-obra`)
  5. `ServicioRopaCasualDetalle` (`ropa-general`)
- El componente `ServicioDetalleGeneric` se mantiene como fallback de seguridad de la arquitectura.

---

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

---

**Date:** 2026-06-21
**Decision:** PRICE-002 — Migración de oferta global `old_price` a oferta por talla `offer_by_size` (jsonb)

**Context:**
El formulario de admin tenía dos campos globales: `Precio ($)` (`price`) y `Precio Anterior (Oferta)` (`old_price`). Con la introducción de `price_by_size` (precio distinto por talla), tener un precio de oferta global era inconsistente y confuso: la oferta aplica al producto entero, pero cada talla puede tener precio diferente. Ejemplo: talla M $35, talla XL $40 — con el modelo viejo, si la oferta era "$30", ¿a qué talla aplicaba?

**Decision:**

1. Se eliminan los inputs `Precio ($)` y `Precio Anterior (Oferta)` del formulario admin.
2. Se agrega una columna `offer_by_size jsonb DEFAULT NULL` en la tabla `products` (migración: `20260621_offer_by_size.sql`).
3. Estructura de `offer_by_size`: `{ "M": 30.00, "XL": 35.00 }` — solo aparecen las tallas con oferta activa. Si vacío/null → sin oferta.
4. El campo `price` (global, legacy) se **recalcula automáticamente** al guardar: `min(price_by_size)`.
5. El campo `old_price` (global, legacy) se **recalcula automáticamente** al guardar: `min(offer_by_size)` o `null`.
6. Esto preserva la compatibilidad con: `CartContext` (usa `price` para revalidar), `StatDetailModal` (filtra por `old_price IS NOT NULL`), y filtros de "Solo ofertas activas".
7. La temporalidad de la oferta (`offer_starts_at`, `offer_ends_at`) sigue siendo el interruptor global — aplica a todas las tallas que tienen oferta en `offer_by_size`.
8. En vista de detalle: si la talla seleccionada tiene oferta en `offer_by_size`, se muestra su precio de oferta + precio base tachado. Si no → sin precio tachado para esa talla.

**Consequences:**

- Los productos existentes con `old_price` global siguen funcionando correctamente (CatalogProductCard, ProductDetailClient tienen fallback a `product.old_price`).
- Al re-guardar un producto existente desde el admin, `old_price` global se sobreescribirá con `min(offer_by_size)` o `null`. Si se quiere preservar la oferta legacy, se debe ingresar manualmente en `offer_by_size`.
- La migración SQL en `supabase/migrations/20260621_offer_by_size.sql` debe ejecutarse manualmente en el Dashboard de Supabase SQL Editor (el Service Role Key fue removido del `.env` por seguridad).
- `isProductOnSale()` en `catalogService.ts` y `productUtils.ts` verifica ambos: `offer_by_size` (nuevo) y `old_price > price` (legacy fallback).

---

## [2026-06-22] Sistema de Notificaciones � Refactoring de Seguridad y Consistencia

**Archivo central**: `src/context/NotificationContext.tsx`

### Modelo de datos

Tres tipos de notificaciones:

- **Condicionales (HINT_TYPES)**: `push_permission`, `favorites_hint`, `cart_hint`, `auth_hint` � locales, basadas en condici�n.
- **Autom�ticas**: `new_product`, `new_offer` � BD, desde admin de productos.
- **Manuales**: `manual`, `info` � BD, desde panel de notificaciones.

### Decisiones arquitect�nicas

**Filtro por primera visita (Problema 1)**

- `fetchDbNotifs` agrega `.gte('created_at', primeraVisitaISO)` usando `LS_FIRST_VISIT_TS`.
- Los INSERTs realtime no necesitan filtro (siempre son posteriores al load).

**Re-evaluaci�n continua de condiciones (Problema 3)**

- `reevaluateConditionalHints()` es la fuente de verdad para hints condicionales.
- Se llama reactivamente en `useEffect([user, pushPermissionStatus, pushPromptDismissed, mounted])`.
- Lee `STORAGE_FAVORITES_KEY` y `STORAGE_CART_KEY` de localStorage para saber si los hints de auth deben existir.
- `addLocalNotification` genera NUEVO ID al re-activar un tipo existente ? evita que `readIds` enmascare la notificaci�n.

- `addLocalNotification` genera NUEVO ID al re-activar un tipo existente ? evita que `readIds` enmascare la notificacin.

**Deteccin de revocacin de permisos push**

- `visibilitychange` listener re-checa `Notification.permission` al recuperar foco.
- `prevPushStatusRef` detecta transicin `granted ? default` y limpia `pushPromptDismissed`.

**Guard de condición en dismissNotification (Problema 2)**

- Defensa en profundidad: si el caller intenta eliminar un HINT_TYPE con condición incumplida, la llamada es ignorada.
- La UI (`GuestBell.canDelete`) ya lo bloqueaba; esto protege la función base también.

---

**Date:** 2026-06-23
**Decision:** ROUTING-001 — Hub universitario en `/catalogo/universidades` + páginas SSG por universidad en `/catalogo/universidades/[slug]`

**Context:**
El catálogo universitario existía en `/catalogo/universitario` con filtrado **client-side** por universidad (UNIVO, IEPROES, etc.). Google llega a esa página, ejecuta el render inicial y ve TODOS los productos mezclados sin diferenciar por universidad. Las búsquedas de alta intención de compra ("uniformes UNIVO San Miguel") no encontraban ninguna página dedicada. Análisis documentado en `SEO_ANALISIS_CATALOGO_UNIVERSITARIO.txt`.

**Decisions made:**

1. **Hub visual en `/catalogo/universidades`** (ruta estática, toma prioridad sobre `[sector]`):
   - Página "use client" con hero de collage de logos animado (LCG con seed fija → sin hydration mismatch).
   - Grid bento de 6 tarjetas de universidad que enlazan a `/catalogo/universidades/[slug]`.
   - Metadata provista por `layout.tsx` (la página no puede exportar `generateMetadata` siendo "use client").

2. **Páginas SSG por universidad en `/catalogo/universidades/[universidad]`**:
   - `generateStaticParams` → 6 slugs: univo, ieproes, ugb, unab, ues, uma.
   - Fetch de productos en build time via `getProductsByUniversity(universidad)` (nueva función en `catalogService.ts`).
   - `generateMetadata` individual → `<title>Uniformes UNIVO | Confecciones Liss</title>` único por universidad.
   - Reutiliza `CatalogPageClient` con prop `breadcrumbExtra` (nueva, opcional, backward-compatible).
   - Sidebar muestra carreras de esa universidad (desde DB o fallback hardcoded en `UNIVERSITY_CONFIG`).
   - JSON-LD `CollectionPage` + `BreadcrumbList` (4 niveles) por página.

3. **Nueva función `getProductsByUniversity(universidad)` en `catalogService.ts`**:
   - Query: `sector = "universitario" AND category ILIKE "%${slug}%"`.
   - Fallback a `getProductsBySector("universitario")` si la query falla.

4. **Nueva función `getCategoriesForUniversity(universidad)` en `catalogService.ts`**:
   - Query: `catalog = "universitario" AND slug ILIKE "${slug}%"`.
   - Devuelve las carreras (categorías) de esa universidad específica para el sidebar.

5. **`CatalogPageClient` — prop `breadcrumbExtra` opcional:**
   - `{ label: string; href: string }` insertado entre "Catálogo" y el nivel actual.
   - Permite breadcrumbs de 4 niveles: Inicio › Catálogo › Universidades › UNIVO.
   - Backward-compatible — callers existentes no pasan la prop y continúan con 3 niveles.

6. **El sector `"universitario"` en `/catalogo/universitario` NO se elimina ni renombra:**
   - Sigue siendo la ruta de producto-detail para uniformes universitarios (`/catalogo/universitario/[slug]`).
   - Las tarjetas de productos en `CatalogPageClient` enlazan a `/catalogo/universitario/[slug]` (campo `sector`).
   - Renombrar el sector implicaría migrar Supabase + TypeScript Sector type + todas las funciones — costo técnico alto, beneficio SEO cero (analizado en el SEO doc).

**Consequences:**

- (1) `/catalogo/universidades` y `/catalogo/universidades/[slug]` son rutas **estáticas** que toman prioridad sobre `[sector]` y `[sector]/[id]` en Next.js App Router. No hay conflicto de routing.
- (2) Los productos de UNIVO deben tener `sector = "universitario"` y `category = "univo"` (o variante similar) en Supabase para que `getProductsByUniversity("univo")` los recupere.
- (3) Si `category` no sigue el patrón slug, las páginas de universidad aparecerán vacías. La única ruta de debug es verificar en Supabase que los productos tengan el campo `category` correcto.
- (4) ISR con `revalidate = 3600` — las páginas de universidad se regeneran cada hora. Si se implementa on-demand revalidation en las Server Actions de admin, se debe llamar `revalidatePath('/catalogo/universidades')` y `revalidatePath('/catalogo/universidades/${slug}')` al guardar un producto universitario.
- (5) `UNIVERSITY_CONFIG` en el archivo de la ruta es la fuente de verdad para slugs válidos. Para agregar una nueva universidad: agregar entrada en `UNIVERSITY_CONFIG` → el `generateStaticParams` la incluye automáticamente.

---

**Date:** 2026-07-12
**Decision:** Corrección de Rutas de Revalidación bajo Demanda (`revalidatePath`) en Next.js 16
**Context:** Se detectó que las actualizaciones de los administradores (como fijar/desfijar productos en el home) no invalidaban correctamente la caché en el perimetral de Vercel ni en el Data Cache. El problema principal residía en el uso incorrecto de `revalidatePath` con el argumento `"page"`, enviando rutas que no correspondían a la plantilla del componente físico (como `/(public)/page` en lugar de `/(public)`) o enviando rutas con segmentos dinámicos resueltos en lugar del patrón de ruta oficial (`/(public)/catalogo/[sector]` en lugar de `/catalogo/${sector}`).
**Decision:**

- **Uso de Rutas URL Literales:** Para invalidar URLs del cliente de manera inmediata y consistente en producción y desarrollo, se inyectan llamadas explícitas a `revalidatePath` con la URL final (ej. `revalidatePath("/")`, `revalidatePath("/catalogo")`, `revalidatePath("/catalogo/scrubs")`).
- **Uso de Estructura de Archivos del App Router:** Para invalidar las plantillas del componente y su árbol de renderizado a nivel de servidor, se utilizan los paths con formato de grupos de Next.js y los nombres de las variables dinámicas de carpeta en corchetes, pasándole el segundo argumento `"page"` (ej. `revalidatePath("/(public)", "page")`, `revalidatePath("/(public)/catalogo/[sector]", "page")`).
- **Compatibilidad con Next.js 16:** Se evitan fallos de tipo firma o deprecaciones de firmas antiguas al implementar la doble validación (ruta literal para el cliente + estructura del componente para el servidor).
  **Consequences:**
- Las actualizaciones de productos, productos destacados y categorías son inmediatas. Un refresco normal de página en el navegador (F5) recupera la vista actualizada instantáneamente sin requerir recargas forzadas (`Ctrl+Shift+R`). El motor de Vercel purga la caché CDN de manera óptima.
