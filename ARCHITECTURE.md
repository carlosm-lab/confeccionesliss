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
