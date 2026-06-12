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
- **Tabs:** Catálogo `/catalogo`, Carrito `/carrito`, Inicio `/`, Contacto `/contacto`, Perfil `/mi-cuenta`
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

## Catálogo Components

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

## Servicios Components

### SublimacionPageClient

- **Ruta:** `src/components/servicios/SublimacionPageClient.tsx`
- **Descripción:** Componente de servicio de sublimación premium 180° que presenta de forma interactiva e inmersiva el servicio de sublimación textil de Confecciones Liss. Incluye un simulador de camisetas en SVG/CSS, timeline del proceso técnico de 4 pasos, acordeones FAQ fluidos y banners CTA integrados, respetando estrictamente los colores oficiales de la marca.
- **Props:**
  - `otherServices: { slug: string; title: string; navLabel: string; navIcon: string }[]` — Lista de los otros servicios para mostrar enlaces de navegación al pie de página.
- **Ejemplo:** `<SublimacionPageClient otherServices={otherServices} />`
