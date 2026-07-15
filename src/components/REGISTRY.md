# Catálogo de Componentes (Registry)

Este archivo documenta los componentes UI disponibles en el proyecto, sus props y ejemplos de uso.

## Layout Components

### Navbar

- **Ruta:** `src/components/layout/Navbar.tsx`
- **Descripción:** Barra de navegación principal con logo, enlaces de catálogo (Salud, Universitario, Escolar, Corporativo), búsqueda y menú hamburguesa para mobile.
- **Props:** No recibe props.

### MobileBottomNav

- **Ruta:** `src/components/layout/MobileBottomNav.tsx`
- **Descripción:** Barra de navegación inferior móvil con notch cóncavo animado (inspirado en `CurvedBottomNavigationView` de Android). 5 tabs fijos. Arquitectura limpia basada en: ① burbuja FAB flotante con animación sink/rise, ② path SVG principal con notch cóncavo animado, ③ path SVG superior con borde 3D blanco y sombra/brillo blanco para garantizar un contraste perfecto y evitar que desaparezca en fondos del mismo color. `activeIdx` se deriva directamente del pathname.
- **Props:** No recibe props.
- **Tabs:** Catálogo `/catalogo`, Carrito `/carrito`, Inicio `/`, Contacto `/contacto`, Perfil `/cuenta`
- **Animación bubble:** sink (top REST→SUNK, primeros 50%) + slide horizontal (duración completa) + rise (SUNK→REST, últimos 50%). Icono FAB aparece al inicio de la fase rise (delay = ANIM_DURATION × 0.5).
- **Animación tabs:** icono activo `opacity 0, y +8`, inactivo `opacity 1, y 0` — Framer Motion transiciona entre estados automáticamente (efecto rise/sink del source/destination).
- **Geometría notch:** `CURVE_HALF=56` (mínimo geométrico para no cortar la burbuja), `NOTCH_Y=62` (2px bajo el borde inferior de la burbuja). `CTRL_X_SPREAD=34`.
- **Mejoras de contraste:** Utiliza un trazado de borde superior SVG (`stroke="rgba(255,255,255,0.4)"`) y sombra blanca (`drop-shadow` de brillo blanco) que brinda separación visual 3D sobre cualquier color de fondo, más un borde blanco semitransparente en la burbuja.
- **Ejemplo:** `<MobileBottomNav />`

### Footer

- **Ruta:** `src/components/layout/Footer.tsx`
- **Descripción:** Pie de página principal que incluye información de contacto, logo optimizado, y enlaces a recursos legales.
- **Props:** No recibe props.

## UI Components

### Breadcrumb

- **Ruta:** `src/components/ui/Breadcrumb.tsx`
- **Descripción:** Navegación jerárquica reutilizable con soporte para ítems dinámicos. Cada ítem puede ser un enlace o el elemento activo actual. Soporta variante clara para fondos oscuros (cumpliendo con la relación de contraste WCAG 2.2 AA).
- **Props:**
  - `items: { label: string; href?: string }[]` — Lista de ítems del breadcrumb.
  - `className?: string` — Clases CSS adicionales.
  - `variant?: "default" | "light"` — Variante de estilo visual ("default" para fondo claro, "light" con colores blancos/semitransparentes para fondos oscuros).
- **Ejemplo:** `<Breadcrumb items={[{ label: "Inicio", href: "/" }, { label: "Catálogo" }]} variant="default" />`

### Badge

- **Ruta:** `src/components/ui/Badge.tsx`
- **Descripción:** Insignia con variantes visuales para indicar estados de productos (nuevo, popular, oferta, etc.).
- **Props:**
  - `children: ReactNode` — Contenido del badge.
  - `variant?: "primary" | "accent" | "success" | "warning" | "neutral" | "outline"` — Variante visual.
  - `className?: string` — Clases CSS adicionales.
- **Ejemplo:** `<Badge variant="accent">Nuevo</Badge>`

### CategoryChip

- **Ruta:** `src/components/ui/CategoryChip.tsx`
- **Descripción:** Chip de filtro de categoría con estado activo y soporte para íconos Lucide.
- **Props:**
  - `label: string` — Texto del chip.
  - `icon?: LucideIcon` — Ícono de Lucide React.
  - `isActive?: boolean` — Estado activo.
  - `onClick?: () => void` — Callback al hacer clic.
  - `className?: string` — Clases CSS adicionales.
- **Ejemplo:** `<CategoryChip label="Scrubs" isActive={true} onClick={() => {}} />`

### ProductCard

- **Ruta:** `src/components/ui/ProductCard.tsx`
- **Descripción:** Tarjeta de producto reutilizable con imagen, badge, precio (con prefijo/sufijo), tallas, botón de favorito y botón agregar al carrito.
- **Props:**
  - `id: string` — Identificador único del producto.
  - `nombre: string` — Nombre del producto.
  - `precio: number` — Precio del producto.
  - `precioAnterior?: number | null` — Precio anterior (tachado).
  - `categoria: string` — Categoría del producto.
  - `imagen?: string | null` — URL de la imagen.
  - `imageAlt?: string` — Texto alternativo de la imagen.
  - `tallas?: string[]` — Lista de tallas disponibles.
  - `showBadge?: boolean` — Mostrar badge.
  - `badgeText?: string` — Texto del badge.
  - `showFavorite?: boolean` — Mostrar botón de favorito.
  - `pricePrefix?: string` — Prefijo del precio.
  - `priceSuffix?: string` — Sufijo del precio (ej: "/unid.").
  - `onAddToCart?: () => void` — Callback agregar al carrito.
  - `onToggleFavorite?: () => void` — Callback favorito.
  - `className?: string` — Clases CSS adicionales.

### ShareButton

- **Ruta:** `src/components/ui/ShareButton.tsx`
- **Descripción:** Botón de compartir interactivo ("use client") que utiliza la API nativa de Web Share (navigator.share) en dispositivos compatibles, y copia el enlace al portapapeles con confirmación visual como fallback.
- **Props:** No recibe props.
- **Ejemplo:** `<ShareButton />`

### HeroImageCarousel

- **Ruta:** `src/components/ui/HeroImageCarousel.tsx`
- **Descripción:** Componente de carrusel de imágenes para el hero principal. Muestra 6 imágenes en una secuencia infinita (intervalo: 2s) con transición suave de desvanecimiento (cross-fade). Incluye flechas izquierda/derecha como burbujas flotantes con backdrop-blur para navegación manual, e indicadores de progreso en la parte inferior: puntito `●` para las inactivas y línea larga `━` para la imagen activa. El auto-avance se pausa al hacer hover sobre cualquier control.
- **Props:**
  - `sizes: string` — Definición de tamaños responsivos para Next.js Image.
  - `priority?: boolean` — Si se debe priorizar la carga de la primera imagen.
- **Ejemplo:** `<HeroImageCarousel sizes="40vw" priority />`

## Catálogo Components

### FilterSidebar

- **Ruta:** `src/components/catalogo/FilterSidebar.tsx`
- **Descripción:** Sidebar de filtros desktop, sticky, copia fiel del FilterSidebar de Padilla Store. Renderiza grupos de filtros dinámicos desde `CategoryConfig.filterGroups` y un checkbox "Solo Ofertas".
- **Props:**
  - `categoriesGroup: FilterGroup` — Grupo de categorías de la sección.
  - `categoryChips?: { label: string; icon: string }[]` — Chips de categorías con iconos.
  - `activeFilters: ActiveFilters` — Mapa `{ campo: string[] }` de filtros activos.
  - `onFilterToggle: (field, value) => void` — Toggle de un valor de filtro.
  - `onSaleOnly: boolean` — Estado del checkbox "Solo Ofertas".
  - `setOnSaleOnly: (v: boolean) => void` — Setter del checkbox.
  - `isMultiSelect: boolean` — Si está activo el modo selección múltiple.
  - `setIsMultiSelect: (v: boolean) => void` — Setter del modo selección múltiple.
- **Ejemplo:** `<FilterSidebar categoriesGroup={config.filterGroups[0]} activeFilters={{}} onFilterToggle={() => {}} onSaleOnly={false} setOnSaleOnly={() => {}} isMultiSelect={false} setIsMultiSelect={() => {}} />`

### MobileFilterDrawer

- **Ruta:** `src/components/catalogo/MobileFilterDrawer.tsx`
- **Descripción:** Drawer mobile de filtros, deslizable desde la derecha. Copia fiel del MobileFilterDrawer de Padilla Store. Incluye Sort, FilterGroups, Promociones y footer con "Limpiar todo" / "Ver N prendas". Bloquea el scroll del body cuando está abierto.
- **Props:**
  - `isOpen: boolean` — Si el drawer está visible.
  - `onClose: () => void` — Callback para cerrar.
  - `categoriesGroup: FilterGroup` — Grupo de categorías.
  - `categoryChips?: { label: string; icon: string }[]` — Chips de categorías.
  - `activeFilters: ActiveFilters` — Filtros activos.
  - `onFilterToggle: (field, value) => void` — Toggle de filtro.
  - `onSaleOnly: boolean` — Estado "Solo Ofertas".
  - `setOnSaleOnly: (v: boolean) => void` — Setter.
  - `sortBy: SortOption` — Orden activo.
  - `setSortBy: (v: SortOption) => void` — Setter de orden.
  - `hasActiveFilters: boolean` — Si hay filtros activos (muestra "Limpiar todo").
  - `onClearFilters: () => void` — Limpiar todos los filtros.
  - `totalCount: number` — Total de prendas para el botón footer.
  - `isMultiSelect: boolean` — Si está activo el modo selección múltiple.
  - `setIsMultiSelect: (v: boolean) => void` — Setter del modo selección múltiple.

### CatalogProductCard

- **Ruta:** `src/components/catalogo/CatalogProductCard.tsx`
- **Descripción:** Tarjeta de producto estilo Padilla Store Tech Catalog: rounded-2xl, imagen aspect-square con object-contain, badges de oferta/estado, botón favorito overlay, precio + precio anterior tachado, botón CTA que abre WhatsApp.
- **Props:**
  - `product: Product` — Objeto producto completo.
  - `isFavorited?: boolean` — Estado de favorito.
  - `onToggleFavorite?: (id: string) => void` — Callback favorito.
- **Ejemplo:** `<CatalogProductCard product={p} />`

### CatalogPageClient

- **Ruta:** `src/components/catalogo/CatalogPageClient.tsx`
- **Descripción:** Orquestador del listado de catálogo. Layout 2 columnas (sidebar + grid), filtrado/paginación client-side sobre `initialProducts`, estado vacío elegante. Copia pixel a pixel el TechCatalogPage de Padilla Store. Soporta breadcrumb de 3 o 4 niveles mediante `breadcrumbExtra`.
- **Props:**
  - `sector: Sector` — Identificador del sector (usado para links de producto detail).
  - `config: CategoryConfig` — Configuración de la categoría (título H1, filtros, chips, CTA).
  - `initialProducts: DbProduct[]` — Productos cargados en servidor (SSR/SSG).
  - `breadcrumbExtra?: { label: string; href: string }` — (Opcional) Ítem de breadcrumb extra entre "Catálogo" y el nivel actual. Uso: páginas `/catalogo/universidades/[slug]`.
- **Ejemplo sector normal:** `<CatalogPageClient sector="scrubs" config={CATEGORIES.scrubs} initialProducts={products} />`
- **Ejemplo universidad:** `<CatalogPageClient sector="universitario" config={univConfig} initialProducts={products} breadcrumbExtra={{ label: "Universidades", href: "/catalogo/universidades" }} />`

### UniversidadesHub (página)

- **Ruta:** `src/app/(public)/catalogo/universidades/page.tsx`
- **Descripción:** Hub visual del catálogo universitario. Hero con collage animado de logos universitarios (3 variantes: desktop hexagonal 10×7, tablet 8×10, mobile 7×10), sección de 6 tarjetas de universidad (grid asimétrico tipo bento), strip de garantías y CTA final oscuro. Cada tarjeta enlaza a `/catalogo/universidades/[slug]`. Layout completamente estático (generado en build) gracias a la semilla LCG fija en los builders de collage.
- **Metadata:** Provista por `src/app/(public)/catalogo/universidades/layout.tsx` (la página es "use client").
- **Props:** No recibe props.

### UniversidadCatalogPage (página SSG)

- **Ruta:** `src/app/(public)/catalogo/universidades/[universidad]/page.tsx`
- **Descripción:** Página SSG generada estáticamente para cada una de las 6 universidades: univo, ieproes, ugb, unab, ues, uma. Fetch de productos desde Supabase en build time (`getProductsByUniversity`), categorías (carreras) desde `getCategoriesForUniversity`. Reutiliza `CatalogPageClient` con `breadcrumbExtra` para mostrar Inicio › Catálogo › Universidades › [Sigla]. Incluye JSON-LD CollectionPage y BreadcrumbList (4 niveles). SEO title y description únicos por universidad. ISR con `revalidate = 3600`.
- **Props:** `params: Promise<{ universidad: string }>` (Next.js App Router)
- **Datos:** `UNIVERSITY_CONFIG` record (hardcoded) con sigla, nombre, carreras, seoTitle, seoDescription.

### ProductDetailClient

- **Ruta:** `src/components/catalogo/ProductDetailClient.tsx`
- **Descripción:** Vista de detalle de producto. Grid 45%/55% con galería sticky (thumbnails + imagen principal 4:5), lightbox modal, selector interactivo de tallas (botones con estado `selectedSize`), buy box con acordeón de personalización, y sección de productos relacionados. El contenedor izquierdo usa `isolate` para crear un nuevo stacking context y evitar conflictos de z-index con los botones del panel derecho.
- **Estado interno:** `mainImg`, `isImageModalOpen`, `customNote`, `showToast`, `selectedSize: string | null`
- **Validaciones:** Si el producto tiene tallas (`tallas.length > 0`), se requiere `selectedSize` antes de agregar al carrito (muestra toast de error si no).
- **Props:**
  - `product: DbProduct` — Producto a mostrar (schema de Supabase).
  - `config: CategoryConfig` — Configuración del sector.
  - `relatedProducts: DbProduct[]` — Productos relacionados (hasta 5).
  - `initialReviews: DbReview[]` — Reseñas iniciales cargadas en servidor (SSR).
  - `averageRating: number` — Promedio de calificaciones (0 si no hay reseñas).
  - `totalCount: number` — Total de reseñas del producto.
- **Ejemplo:** `<ProductDetailClient product={product} config={config} relatedProducts={related} initialReviews={reviews} averageRating={4.8} totalCount={5} />`

### ProductReviews

- **Ruta:** `src/components/catalogo/ProductReviews.tsx`
- **Descripción:** Sección de reseñas de producto. Aparece debajo de "También te puede gustar". Permite a usuarios autenticados agregar, editar y eliminar UNA reseña por producto. Usuarios no autenticados ven un CTA de login. El estado local se actualiza optimistamente tras cada mutación (sin refetch). Las mutaciones van directamente a Supabase `product_reviews` usando `getSupabaseClient()`.
- **Sub-componentes internos:**
  - `StarDisplay` — Muestra estrellas en modo lectura con `fontVariationSettings` FILL.
  - `StarInput` — Selector de estrellas interactivo con hover state.
  - `ReviewCard` — Tarjeta de reseña con avatar, nombre, rating, fecha, comentario, y acciones edit/delete para el owner.
  - `ReviewForm` — Formulario validado con Zod (`reviewSchema`) para crear/editar reseñas.
- **Props:**
  - `productId: string` — UUID del producto en Supabase.
  - `initialReviews: DbReview[]` — Reseñas cargadas en servidor.
  - `averageRating: number` — Rating promedio inicial.
  - `totalCount: number` — Conteo inicial de reseñas.
- **Comportamiento:**
  - Un usuario puede tener máximo 1 reseña por producto (constraint `unique_user_product_review` en DB).
  - Login con Google requerido para escribir reseñas.
  - Eliminar: DELETE directo a Supabase + actualización optimista del estado.
  - Editar: UPDATE con `eq("user_id", user.id)` para seguridad extra en cliente.
- **Dependencias:** `AuthContext`, `getSupabaseClient`, `reviewSchema`, `DbReview` type, `react-hot-toast`, Material Symbols icons.
- **Ejemplo:** `<ProductReviews productId={product.id} initialReviews={[]} averageRating={0} totalCount={0} />`

## SEO Components

### ServiciosPrincipales

- **Ruta:** `src/components/seo/ServiciosPrincipales.tsx`
- **Descripción:** Componente que expone los servicios clave mediante Schema.org validado para SEO. Utiliza `isomorphic-dompurify` para inyectar JSON-LD de manera segura previniendo XSS.
- **Props:** No recibe props.

### CategoryHubClient

- **Ruta:** `src/components/catalogo/CategoryHubClient.tsx`
- **Descripción:** Página principal del catálogo estilo "Category Hub". Renderiza una cuadrícula visual de 6 tarjetas de categoría (Scrubs, Universitario, Escolar, Corporativo, Deportivo, Accesorios) con imágenes, taglines, conteo de productos y trust strip + CTA banner.
- **Props:** No recibe props (consume `CATEGORIES` y `ALL_PRODUCTS` directamente).
- **Ejemplo:** `<CategoryHubClient />`

### SearchModal

- **Ruta:** `src/components/layout/SearchModal.tsx`
- **Descripción:** Modal de búsqueda global a pantalla completa con backdrop blur. Muestra chips de categoría cuando el input está vacío, y filtra `ALL_PRODUCTS` en tiempo real cuando el usuario escribe ≥2 caracteres. Resultados horizontales con thumbnail, nombre, categoría, precio y flecha. Incluye "Ver todos los resultados" si hay más de 6 coincidencias. Bloqueo de scroll del body, auto-focus, cierre con Escape o click fuera.
- **Props:**
  - `isOpen: boolean` — Si el modal está visible.
  - `onClose: () => void` — Callback para cerrar el modal.
- **Ejemplo:** `<SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />`

### LinksPageClient

- **Ruta:** `src/app/(public)/links/LinksPageClient.tsx`
- **Descripción:** Componente contenedor para la página de enlaces ("link in bio"). Muestra la información de perfil, avatar del logo y una lista responsiva de 13 botones que apuntan a WhatsApp y redes sociales. Está optimizado para evitar el crasheo por falta de memoria en dispositivos móviles al no poseer el atributo `target="_blank"`.
- **Props:** No recibe props.
- **Ejemplo:** `<LinksPageClient />`

## Legal Components

### LegalArticleReader

- **Ruta:** `src/components/legal/LegalArticleReader.tsx`
- **Descripción:** Modal de lectura de documentos legales. En desktop (`lg+`) muestra un overlay `position:fixed` sobre la página con blur de fondo, papel blanco scrollable y botón de cierre absoluto. En mobile muestra el artículo como página normal sin overlay. Bloquea el scroll del body en mobile. Cierra con ESC o clic en el overlay.
- **Props:**
  - `title: string` — Título del artículo.
  - `category?: string` — Etiqueta de categoría (default: `"DOCUMENTOS LEGALES"`).
  - `date: string` — Fecha de publicación formateada.
  - `readingTime: number` — Tiempo estimado de lectura en minutos.
  - `children: ReactNode` — Contenido del artículo (secciones de `LegalContent`).
- **Layout desktop:** `position:relative` paper → botón `position:absolute top:20 right:20` → div scrollable `overflow-y:auto` con `paddingLeft:72px paddingRight:72px`.
- **Ejemplo:** `<LegalArticleReader title="Política de Privacidad" date="15 Jun, 2025" readingTime={14}>{children}</LegalArticleReader>`

### LegalHubBackground

- **Ruta:** `src/components/legal/LegalHubBackground.tsx`
- **Descripción:** Renderizado visual puro del hub `/legal` (hero + grid de tarjetas de documentos). Usado como fondo estático en las páginas de artículos legales para que el blur-overlay del `LegalArticleReader` muestre el hub detrás, creando la ilusión de un modal flotante. En las páginas de artículos se usa con `aria-hidden="true"` y `pointer-events-none hidden lg:block` para que solo sea visible en desktop (donde existe el overlay) y sea invisible para lectores de pantalla.
- **Props:** No recibe props.
- **Ejemplo:** `<div aria-hidden="true" className="pointer-events-none hidden select-none lg:block"><LegalHubBackground /></div>`

---

## Cart, Favorites & Login Components

> Migrados desde `C:\Users\usuar\Desktop\pages` (Vite SPA) el 2026-06-17.
> Toda la lógica de negocio vive en los contextos. Los componentes solo consumen los contextos.

### CartDrawer

- **Ruta:** `src/components/cart/CartDrawer.tsx`
- **Descripción:** Drawer deslizante desde la derecha con flujo de checkout de 4 pasos: `cart` → `shipping` → `confirm` → `sent`. Revalida precios al abrirse. Integra selección de departamento/municipio de El Salvador con cálculo de costo de envío por zona. Genera mensaje de WhatsApp en párrafo natural mediante la RPC `generate_whatsapp_message` (SECURITY DEFINER, anti-tampering) con fallback resiliente client-side (`buildCartWhatsAppMessage`). Usa `react-focus-lock` para accesibilidad.
- **Props:** No recibe props (todo el estado viene de `useCart()`).
- **Estado interno:** `step: DrawerStep`, `isGeneratingMessage`, `selectedDept`, `selectedMunicipality`
- **Hooks usados:** `useCart`, `useBodyScrollLock`, `useCallback`, `useMemo`
- **Dependencias:** `CartContext`, `shipping.ts`, `whatsapp.ts`, `formatPrice`, `react-focus-lock`, `react-hot-toast`
- **Ejemplo:** `<CartDrawer />` (montado en `GlobalModals`, se monta una sola vez por layout)

### FavoritesModal

- **Ruta:** `src/components/cart/FavoritesModal.tsx`
- **Descripción:** Modal centrado que muestra la lista de productos favoritos del usuario. Carga los datos de Supabase `products` filtrando por los IDs en `favorites`. Muestra spinner, estado vacío y lista de productos con link directo al detalle.
- **Props:**
  - `isOpen: boolean` — Controla visibilidad
  - `onClose: () => void` — Callback al cerrar
- **Hooks usados:** `useFavorites`, `useAuth`, `useBodyScrollLock`, `useModal`
- **Dependencias:** `FavoritesContext`, `AuthContext`, `getSupabaseClient`, `formatPrice`, `react-focus-lock`
- **Ejemplo:** `<FavoritesModal isOpen={isFavoritesOpen} onClose={() => setIsFavoritesOpen(false)} />`

### LoginModal

- **Ruta:** `src/components/cart/LoginModal.tsx`
- **Descripción:** Modal de login con Google OAuth. El mensaje e icono cambian según el contexto que disparó el modal. Soporta 4 contextos: `cart`, `favorites`, `contact`, `generic`.
- **Props:**
  - `isOpen: boolean` — Controla visibilidad
  - `onClose: () => void` — Callback al cerrar
  - `context?: string` — Contexto que disparó el modal (default: `"generic"`)
- **Hooks usados:** `useAuth`, `useBodyScrollLock`, `useModal`
- **Dependencias:** `AuthContext`, `react-focus-lock`
- **Ejemplo:** `<LoginModal isOpen={authModalContext !== null} onClose={hideAuthModal} context={authModalContext ?? "generic"} />`

### GlobalModals

- **Ruta:** `src/components/layout/GlobalModals.tsx`
- **Descripción:** Client Component wrapper que renderiza `CartDrawer` y `LoginModal` en un solo lugar. Se monta en `(public)/layout.tsx` para que estén disponibles en todas las páginas.
- **Props:** No recibe props.
- **Ejemplo:** `<GlobalModals />` (montado en `(public)/layout.tsx`)

---

## Context Providers

### CartContext / CartProvider

- **Ruta:** `src/context/CartContext.tsx`
- **Descripción:** Contexto del carrito con estrategia guest-first. Persistencia en localStorage con expiración de 7 días. Sincronización con Supabase `user_carts`. Revalidación de precios cada 60s. Sync multi-pestaña.
- **Hook:** `useCart()` — Retorna `{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount, isCartOpen, setIsCartOpen, refreshCartPrices, isRefreshingPrices, arePricesStale }`
- **Tipos exportados:** `CartProduct`, `CartItem`
- **Registro en:** `src/providers/index.tsx`

### FavoritesContext / FavoritesProvider

- **Ruta:** `src/context/FavoritesContext.tsx`
- **Descripción:** Contexto de favoritos con persistencia dual localStorage + Supabase. Merge al login. Optimistic updates con rollback. O(1) lookup via `Set`.
- **Hook:** `useFavorites()` — Retorna `{ favorites, toggleFavorite, isFavorite }`
- **Registro en:** `src/providers/index.tsx`

---

## Security Components

### AdminSettingsPage (Panel de Seguridad)

- **Ruta:** `src/app/(admin)/admin/settings/page.tsx`
- **Descripcion:** Panel de control de seguridad para administradores. Permite activar/desactivar el killswitch del sitio (requiere doble confirmacion), y muestra el log en tiempo real de eventos de seguridad (violaciones CSP, activaciones del killswitch). El toggle del killswitch llama a la RPC `toggle_killswitch` (SECURITY DEFINER) que registra el uid del admin que actuo.
- **Estado interno:** `killswitchActive`, `events: SecurityEvent[]`, `loadingKS`, `togglingKS`, `confirmActive`, `toast`
- **Acceso:** `/admin/settings` (protegido por middleware proxy.ts)

### MantenimientoPage

- **Ruta:** `src/app/(public)/mantenimiento/page.tsx`
- **Descripcion:** Pagina de marca mostrada cuando el killswitch esta activo. Incluye logo, icono animado con `animate-pulse`, mensaje de mantenimiento y boton de WhatsApp. `robots: noindex` durante el mantenimiento.
- **Activacion:** Automatica, el middleware redirige todo el trafico a `/mantenimiento` cuando `site_config.killswitch_active = 'true'` en Supabase.

### Route Handler: /api/csp-report

- **Ruta:** `src/app/api/csp-report/route.ts`
- **Descripcion:** Receptor de violaciones CSP. Los navegadores lo invocan automaticamente cuando el CSP bloquea un recurso. Rate limiting en memoria (10 req/IP/min), ignora extensiones de navegador, persiste en `security_events` con tipo `csp_violation`.
- **Metodo:** POST, no requiere auth. Responde siempre 204 No Content.

---

## Notification Components

### GuestBell

- **Ruta:** `src/components/ui/GuestBell.tsx`
- **Descripción:** Centro de notificaciones completo montado en la Navbar. Renderiza mediante portal sobre `document.body`. Gestiona notificaciones locales (hints) y de BD en tiempo real. Arquitectura de 3 vistas: lista con tabs, detalle sub-panel, y modales de confirmación/bloqueo.
- **Props:** No recibe props. Consume `useNotifications()`, `useAuth()`, `useRouter()`.
- **Sub-componentes internos:**
  - `NotifRow` — Fila de lista con ícono, title truncado, timestamp, dot unread y botón papelera.
  - `DetailView` — Sub-panel de detalle con ícono grande, badge de tipo, fecha completa, mensaje completo y botón CTA.
  - `ConfirmModal` — Modal de confirmación/explicación superpuesto al panel.
- **Estado interno:** `isOpen`, `activeTab: "all"|"unread"|"read"`, `expandedNotif`, `deleteTarget`, `blockMessage`, `dragY/isDragging` (swipe mobile)
- **Tabs:** Todas | No leídas | Leídas — filtran `notifications` del contexto.
- **Click en fila:** Abre `DetailView`; marca notif como leída (excepto hint types).
- **Papelera:**
  - Hint sin condición cumplida → muestra `ConfirmModal` con explicación (no elimina).
  - Hint con condición cumplida / DB notif → muestra confirmación → llama `dismissNotification(id)`.
- **CTA en detalle:**
  - `push_permission` → "Activar alertas" (si no granted/denied).
  - `auth_hint|favorites_hint|cart_hint` sin login → "Iniciar sesión".
  - Notif con `target_url` → "Ver contenido" + router.push + markRead.
- **Swipe-to-dismiss:** Solo mobile. Umbral 100px hacia abajo cierra el panel.
- **Ejemplo:** `<GuestBell />` (montado en `Navbar.tsx`)

---

## Admin Components

### ProductModal

- **Ruta:** `src/components/admin/ProductModal.tsx`
- **Descripción:** Modal único de creación y edición de productos (mismo componente, detecta modo por prop `product`). Contiene todas las secciones del formulario: Nombre, URL/Slug, Descripción, Descripción Corta, Precio, Precio Anterior, Configuración de Oferta, Precios Especiales, Catálogo, Categoría, Imágenes, Datos del Catálogo Público (Badge, Sufijo Precio, Material, Tallas, **Características**, **Colores**), Etiquetas, Producto Activo, **SEO del Producto**.
- **Props:**
  - `isOpen: boolean` — Controla visibilidad del modal.
  - `onClose: () => void` — Callback para cerrar.
  - `product?: Product | null` — Si se pasa, activa el modo edición con los valores pre-cargados.
  - `onSave: (payload, offerRules, notify) => Promise<void>` — Callback de guardado.
  - `categories: Category[]` — Lista de categorías disponibles para los selects.
- **Campos Datos del Catálogo Público** (actualizados 2026-06-21):
  - `short_description` (200 chars) — aparece debajo del título en la ficha pública.
  - `caracteristicas` (lista de strings, add/remove con Enter) — se muestran como bullets con ✔ en la ficha.
  - `colores` (array de `{name, hex}`, input texto + color picker nativo) — se muestran como círculos de color en la ficha.
- **Sección SEO del Producto** (añadida 2026-06-21, puramente aditiva):
  - Posición: última sección, después de "Producto Activo".
  - Campos: `seo_title` (70 chars), `seo_description` (160 chars), `seo_keywords` (300 chars), `seo_publisher` (100 chars), `seo_robots` (botones: Auto / index,follow / noindex,follow / index,nofollow / noindex,nofollow).
  - Todos opcionales: vacíos → fallback automático en `generateMetadata`.
- **Ejemplo:** `<ProductModal isOpen={isOpen} onClose={handleClose} product={selectedProduct} onSave={handleSave} categories={categories} />`

---

## Skeleton Loaders (phantom-ui)

> Implementado: 2026-06-22 — Librería: `@aejkatappaja/phantom-ui`

### Patrón de inicialización phantom-ui

Cada `loading.tsx` carga el Web Component directamente con `useEffect` al montarse en el cliente:

```tsx
"use client";
import { useEffect } from "react";

export default function MyLoading() {
  useEffect(() => {
    import("@aejkatappaja/phantom-ui");
  }, []);
  // ...
}
```

### Sistema de Skeleton Loaders por ruta

Cada ruta del proyecto tiene un `loading.tsx` propio que Next.js muestra automáticamente durante la navegación (via `<Suspense>`). Todos son `"use client"` y cargan phantom-ui via `useEffect`.

| Ruta                      | Archivo                                               |
| ------------------------- | ----------------------------------------------------- |
| `/` (home)                | `src/app/(public)/loading.tsx`                        |
| `/catalogo`               | `src/app/(public)/catalogo/loading.tsx`               |
| `/catalogo/[sector]`      | `src/app/(public)/catalogo/[sector]/loading.tsx`      |
| `/catalogo/[sector]/[id]` | `src/app/(public)/catalogo/[sector]/[id]/loading.tsx` |
| `/servicios`              | `src/app/(public)/servicios/loading.tsx`              |
| `/contacto`               | `src/app/(public)/contacto/loading.tsx`               |
| `/cuenta`                 | `src/app/(public)/cuenta/loading.tsx`                 |
| `/links`                  | `src/app/(public)/links/loading.tsx`                  |
| `/updates`                | `src/app/(public)/updates/loading.tsx`                |
| `/ayuda`                  | `src/app/(public)/ayuda/page.tsx`                     |
| `/legal`                  | `src/app/(public)/legal/loading.tsx`                  |
| `/legal/privacidad`       | `src/app/(public)/legal/privacidad/loading.tsx`       |
| `/legal/terminos`         | `src/app/(public)/legal/terminos/loading.tsx`         |
| `/mantenimiento`          | `src/app/(public)/mantenimiento/loading.tsx`          |
| `/admin`                  | `src/app/(admin)/admin/loading.tsx`                   |
| `/admin/products`         | `src/app/(admin)/admin/products/loading.tsx`          |
| `/admin/categories`       | `src/app/(admin)/admin/categories/loading.tsx`        |
| `/admin/messages`         | `src/app/(admin)/admin/messages/loading.tsx`          |
| `/admin/settings`         | `src/app/(admin)/admin/settings/loading.tsx`          |
| `/admin/notificaciones`   | `src/app/(admin)/admin/notificaciones/loading.tsx`    |
| `/admin/usuarios`         | `src/app/(admin)/admin/usuarios/loading.tsx`          |
| `/admin/login`            | `src/app/(admin)/admin/login/loading.tsx`             |

- `src/phantom-ui.d.ts` declara los tipos JSX de `<phantom-ui>` para TypeScript

## Servicios Components

### ServicioDetallePage

- **Ruta:** `src/components/servicios/ServicioDetallePage.tsx`
- **Descripción:** Coordinador principal de la página de detalles de servicios. Muestra la página de bordado computarizado personalizada o una plantilla genérica para otros servicios.
- **Props:**
  - `service: ServicePage` — Datos del servicio a renderizar.

### ServicioBordadosDetalle

- **Ruta:** `src/components/servicios/ServicioBordadosDetalle.tsx`
- **Descripción:** Vista detallada y específica del servicio de Bordado Computarizado. Ensambla el Hero, Editorial, FAQ y CTABanner con los datos precisos del prototipo.
- **Props:** No recibe props.

### ServicioSublimacionDetalle

- **Ruta:** `src/components/servicios/ServicioSublimacionDetalle.tsx`
- **Descripción:** Vista detallada y específica del servicio de Sublimación Textil Full Color. Ensambla la estructura del prototipo: Hero invertido (imagen izquierda), bloques editoriales con indicador de poliéster requerido, tabla comparativa con técnica tradicional, flujo de proceso de 4 pasos y banner final.
- **Props:** No recibe props.

### ServicioSastreriaDetalle

- **Ruta:** `src/components/servicios/ServicioSastreriaDetalle.tsx`
- **Descripción:** Vista detallada y específica del servicio de Confección y Sastrería a la Medida. Ensambla el Hero asimétrico con fondo texturizado y caja sombreada, vitrina de las 12 medidas anatómicas requeridas, listado de tallas con destaque visual, grilla de artículos informativos (con flujo en 3 pasos y listado de prendas) y el acordeón de FAQs.
- **Props:** No recibe props.

### ServicioManoObraDetalle

- **Ruta:** `src/components/servicios/ServicioManoObraDetalle.tsx`
- **Descripción:** Componente de vista detallada para el servicio de Solo Mano de Obra (`/servicios/mano-de-obra`). Consume datos dinámicos centralizados de `ServicePage` (`services.ts`), renderizando hero con badges, flujo de 3 pasos ("¿Cómo funciona?"), sección "Tú eliges la tela" (comunicando elección abierta de tela y variación de precio), confirmación de metraje por patrón de prenda, sección para quién es ideal, checklist de lo que incluye la mano de obra, reglas reales de precios por volumen (colegios desde 6 uniformes, empresas desde 12 piezas/modelo) y acordeón de FAQs.
- **Props:**
  - `service: ServicePage` — Datos completos de la página de servicio cargados desde `src/data/services.ts`.
- **Ejemplo:** `<ServicioManoObraDetalle service={service} />`

### ServicioRopaCasualDetalle

- **Ruta:** `src/components/servicios/ServicioRopaCasualDetalle.tsx`
- **Descripción:** Componente de vista detallada para el servicio de Confección de Ropa Casual y de Vestir (`/servicios/ropa-general`). Consume datos dinámicos centralizados de `ServicePage` (`services.ts`), renderizando hero con badges, sección "Más que uniformes: moda personalizada", muestra bento visual acompañada del catálogo completo de 10 categorías reales de prendas (vestidos, faldas, pantalones de vestir, blusas, crop tops, enterizos, conjuntos, ropa infantil, camisas de hombre y pijamas), flujo secuencial de 4 pasos ("De tu foto a tu prenda"), tarjeta destacada con tiempos de entrega (5 a 12 días hábiles con salvedades por temporada y feriados), sección de evaluación individual para marcas de ropa, acordeón interactivo de 5 FAQs y banner de CTA.
- **Props:**
  - `service: ServicePage` — Datos completos de la página de servicio cargados desde `src/data/services.ts`.
- **Ejemplo:** `<ServicioRopaCasualDetalle service={service} />`

### ServicioHero

- **Ruta:** `src/components/servicios/ServicioHero.tsx`
- **Descripción:** Hero section asimétrica que incluye un badge vertical de color, título en Serif, chips de características y enlace CTA directo a WhatsApp.
- **Props:**
  - `title: string` — Título principal.
  - `description: string` — Descripción.
  - `features: { icon: string; text: string }[]` — Chips de características.
  - `ctaText: string` — Texto del botón de acción.
  - `heroImage: string` — Imagen de fondo o lateral del Hero.

### ServicioEditorial

- **Ruta:** `src/components/servicios/ServicioEditorial.tsx`
- **Descripción:** Secciones editoriales estructuradas. Incluye un visual con textura de tela, cuadrícula 2x2 para muestras de prendas, infografía del proceso de digitalización y tarjetas informativas de pedidos mínimos.
- **Props:**
  - `sectionAImage: string` — URL de la imagen principal.
  - `garmentImages: { polos: string; camisas: string; industrial: string; gorras: string }` — URLs de imágenes para las tarjetas de prendas.

### ServicioFAQ

- **Ruta:** `src/components/servicios/ServicioFAQ.tsx`
- **Descripción:** Acordeón interactivo para resolver las dudas frecuentes del servicio con animaciones fluidas basadas en estado de React.
- **Props:**
  - `faqs: { question: string; answer: string }[]` — Listado de preguntas y respuestas.

### ServicioCTABanner

- **Ruta:** `src/components/servicios/ServicioCTABanner.tsx`
- **Descripción:** Banner destacado con textura tejida al 6% de opacidad y botón de WhatsApp centrado.
- **Props:**
  - `title: string` — Título del banner.
  - `description: string` — Descripción secundaria.
  - `ctaText: string` — Texto del botón.

## Empresa Components

### SobreNosotrosClient

- **Ruta:** `src/components/empresa/SobreNosotrosClient.tsx`
- **Descripción:** Componente cliente que implementa el storytelling interactivo continuo (9 escenas/capítulos) con animaciones detalladas mediante Framer Motion, visualizaciones SVG de recomendación y barras de progreso.
- **Props:** No recibe props.

### FilosofiaClient

- **Ruta:** `src/components/empresa/FilosofiaClient.tsx`
- **Descripción:** Experiencia editorial inmersiva que explica la filosofía y el oficio artesanal de Confecciones Liss. Cuenta con un lienzo de cabecera con la palabra "FILOSOFÍA" a gran escala y un lienzo de patronaje técnico abstracto (`TextilePatternCanvas`) con capas animadas mediante parallax; una sección con desplazamiento vertical de imagen y texto de alta legibilidad; una secuencia de oraciones cinéticas reveladas al hacer scroll sobre fondo azul institucional; un acordeón horizontal tipo museo con 7 paneles animados en flex-grow interactivo (para desktop) y snap-scroll táctil (para mobile); un manifiesto con 8 afirmaciones tipográficas de ancho completo; un Bento grid asimétrico de 5 módulos combinando Misión, Visión, cita destacada, estadísticas e imágenes del taller; y una galería de lookbook con 3 fotografías gigantes de gran impacto visual.
- **Props:** No recibe props.

### TextilePatternCanvas

- **Ruta:** `src/components/empresa/TextilePatternCanvas.tsx`
- **Descripción:** Composición visual técnica abstracta en SVG que representa líneas de patronaje, curvas francesas, guías de corte y anotaciones de sastrería. Las capas individuales están conectadas a una `MotionValue` de scroll para moverse de forma independiente y asíncrona creando un efecto parallax de profundidad.
- **Props:**
  - `scrollYProgress: MotionValue<number>` — Valor de movimiento de scroll para el control del parallax de las capas.

### EquipoClient

- **Ruta:** `src/components/empresa/EquipoClient.tsx`
- **Descripción:** Componente cliente que organiza el equipo de Confecciones Liss en capas asimétricas no uniformes por roles funcionales con enlaces interactivos.
- **Props:** No recibe props.

### PerfilDetalleClient

- **Ruta:** `src/components/empresa/PerfilDetalleClient.tsx`
- **Descripción:** Componente cliente que detalla el perfil profesional, biografía ampliada y áreas técnicas de cada especialista del taller.
- **Props:**
  - `member: TeamMember` — Los datos del miembro del equipo a visualizar.

### InstalacionesClient

- **Ruta:** `src/components/empresa/InstalacionesClient.tsx`
- **Descripción:** Experiencia de visita guiada inmersiva por las 5 estaciones del taller de Confecciones Liss. Cada estación tiene un layout editorial único y distinto: (1) dark navy full-bleed con parallax, (2) film-strip 3-panel con acento lateral rojo, (3) imagen full-bleed centrada con barra de specs oscura, (4) split asimétrico panel azul/imagen, (5) hero oscuro + timeline horizontal de proceso. Incluye navegación flotante lateral con puntos de progreso y plano SVG esquemático del taller.
- **Props:** No recibe props.
- **Sub-componentes internos:** `StationCorte`, `StationConfeccion`, `StationBordado`, `StationCalidad`, `StationAlmacen`, `TourProgressNav`

### CalidadClient

- **Ruta:** `src/components/empresa/CalidadClient.tsx`
- **Descripción:** Componente de cliente estilo manual de control de calidad técnico e industrial para Confecciones Liss. Cada sección cuenta con un diseño de maquetación y ritmo asimétrico propio, animaciones fluidas de Framer Motion, e interactivos como un diagrama de flujo de trabajo en equipo.
- **Props:** No recibe props.

### CertificacionesClient

- **Ruta:** `src/components/empresa/CertificacionesClient.tsx`
- **Descripción:** Componente de cliente diseñado como un Centro de Credenciales y expediente profesional técnico para Confecciones Liss. Incluye secciones asimétricas de trayectoria, organigrama técnico de equipo, biblioteca de capacitaciones continuas, línea de tiempo e hitos históricos de la empresa.
- **Props:** No recibe props.

### ResponsabilidadSocialClient

- **Ruta:** `src/components/empresa/ResponsabilidadSocialClient.tsx`
- **Descripción:** Componente de cliente diseñado como un Informe Público de Impacto y memoria anual editorial para Confecciones Liss. Presenta capítulos asimétricos alternando imágenes documentales, hitos históricos de empleo, interfaces de diagramas de planos digitales y manifiestos de compromiso social.
- **Props:** No recibe props.

### TransparenciaClient

- **Ruta:** `src/components/empresa/TransparenciaClient.tsx`
- **Descripción:** Componente de cliente diseñado como un Centro de Transparencia interactivo de paneles divididos para Confecciones Liss. Organiza cabeceras documentales, flujogramas de toma de decisiones, actas legales de compromiso, archivadores de carpetas activas, notas adhesivas asimétricas para preguntas frecuentes, y un panel de control lateral con consolas de logs en tiempo real.
- **Props:** No recibe props.

### MediaKitClient

- **Ruta:** `src/components/empresa/MediaKitClient.tsx`
- **Descripción:** Componente de cliente diseñado como un Media Kit oficial y guía de recursos de marca en una cuadrícula de 12 columnas para Confecciones Liss. Contiene cabeceras compactas de descarga de logotipos, tableros de especificaciones de identidad visual (8 módulos únicos), guías de uso correcto/incorrecto de logotipo, tablas de información institucional de auditoría, filas de integrantes del equipo para prensa, tablas de descargas disponibles y bandas finales de contacto.
- **Props:** No recibe props.

### ProcesoDeConfeccionClient

- **Ruta:** `src/components/empresa/ProcesoDeConfeccionClient.tsx`
- **Descripción:** Experiencia de usuario inmersiva para descubrir el flujo de trabajo del taller de Confecciones Liss a lo largo de 10 etapas asimétricas. Cuenta con una cabecera con ilustración abstracta vectorial SVG, barra superior flotante interactiva sincronizada con el scroll para marcar el progreso, cuadrículas Bento para el análisis del proyecto, bloques editoriales alternantes, y una Mesa de Trabajo técnica conectada interactivamente al equipo de costura.
- **Props:** No recibe props.

### ServicioSastreriaDetalle

- **Ruta:** `src/components/servicios/ServicioSastreriaDetalle.tsx`
- **Descripción:** Componente de vista detallada para el servicio de Confección y Sastrería a la Medida (`/servicios/confeccion-a-medida`). Consume datos dinámicos centralizados de `ServicePage` (`services.ts`), renderizando hero with badges, lista de 12 medidas anatómicas, sección inclusiva de tallas (sin límite fijo), cuadrícula de artículos de valor SEO, tabla comparativa de confección a la medida vs. tabla de tallas estándar, proceso en 3 pasos, categorías de aplicaciones y acordeón de FAQs.
- **Props:**
  - `service: ServicePage` — Datos completos de la página de servicio cargados desde `src/data/services.ts`.
- **Ejemplo:** `<ServicioSastreriaDetalle service={service} />`

---

## Analytics Components

### GoogleAnalytics

- **Ruta:** `src/components/analytics/GoogleAnalytics.tsx`
- **Descripción:** Componente cliente que inyecta la etiqueta de Google Analytics 4 (gtag.js) usando `next/script` con `strategy="afterInteractive"`.
- **Props:**
  - `gaId?: string` — Measurement ID de GA4 (ej. `G-XXXXXXXXXX`). Si no se provee, no renderiza nada.
- **Ejemplo:** `<GoogleAnalytics gaId="G-XXXXXXXXXX" />`

### MetaPixel

- **Ruta:** `src/components/analytics/MetaPixel.tsx`
- **Descripción:** Componente cliente que inyecta el script oficial de Meta Pixel (fbevents.js) e inicializa el evento `PageView` usando `next/script` con `strategy="afterInteractive"`.
- **Props:**
  - `pixelId?: string` — Pixel ID de Meta (ej. `1234567890`). Si no se provee, no renderiza nada.
- **Ejemplo:** `<MetaPixel pixelId="1234567890" />`

### AnalyticsScripts

- **Ruta:** `src/components/analytics/AnalyticsScripts.tsx`
- **Descripción:** Gestor cliente que envuelve `GoogleAnalytics` y `MetaPixel`. Condiciona la inyección de ambos scripts al consentimiento explícito otorgado en el banner de cookies (`localStorage.__liss_cookie_consent__ === "accepted"`). Escucha el evento en tiempo real `liss_cookie_consent_updated` para cargar los scripts inmediatamente tras la aceptación sin recargar la página.
- **Props:**
  - `gaId?: string` — Measurement ID opcional de Google Analytics.
  - `pixelId?: string` — Pixel ID opcional de Meta.
- **Ejemplo:** `<AnalyticsScripts gaId={env.NEXT_PUBLIC_GA_MEASUREMENT_ID} pixelId={env.NEXT_PUBLIC_META_PIXEL_ID} />`

---

## Contacto Components

### LazyMap

- **Ruta:** `src/components/contacto/LazyMap.tsx`
- **Descripción:** Componente cliente que difiere la carga de `iframe` de Google Maps para evitar el bloqueo del hilo principal de JavaScript durante el renderizado inicial y mejorar el score de PageSpeed. Muestra un esqueleto de carga temporal.
- **Props:**
  - `src: string` — URL de inserción del mapa de Google Maps.
  - `title: string` — Título descriptivo para accesibilidad.
- **Ejemplo:** `<LazyMap title="Mapa de Google Maps" src="https://www.google.com/maps/embed..." />`

### ContactForm

- **Ruta:** `src/components/contacto/ContactForm.tsx`
- **Descripción:** Formulario interactivo de contacto. Realiza validaciones en el cliente con Zod y envía los datos mediante un Server Action (`sendContactMessage`).
- **Props:** No recibe props.
- **Ejemplo:** `<ContactForm />`
