# Migración Cart / Favorites / Login — 2026-06-17

---

## TASK-001: Instalación de dependencias

### Archivos modificados

- `package.json`: Se instalaron `react-hot-toast@^2.4.1` y `react-focus-lock@^2.13.6`

### Archivos afectados verificados

- `package-lock.json`: OK — 2 paquetes nuevos, sin conflictos

### Regresiones verificadas

- ✅ Rutas existentes: sin cambios
- ✅ Componentes existentes: sin cambios
- ✅ Estado global existente: sin cambios

### Estado: COMPLETO ✓

---

## TASK-002 / TASK-003: Archivos de infraestructura

### Archivos creados

- `src/lib/constants.ts`: Constantes de negocio (MAX_CART_QUANTITY=50, STORAGE_CART_KEY='liss_cart', columnas SELECT de productos)
- `src/lib/whatsapp.ts`: Utilidad `buildWhatsAppUrl()` con truncamiento inteligente a 1800 chars

### Archivos afectados verificados

- `src/env.ts`: OK — `NEXT_PUBLIC_WHATSAPP_NUMBER` ya existía como variable validada

### Estado: COMPLETO ✓

---

## TASK-004: CartContext.tsx

### Archivos creados

- `src/context/CartContext.tsx`: Context completo con:
  - Estrategia guest-first (localStorage siempre)
  - Hidratación desde Supabase `user_carts` al login
  - Revalidación de precios cada 60s con polling
  - Sync multi-pestaña vía StorageEvent
  - Expiración de carrito a 7 días de inactividad
  - Debounce de 1.5s en escritura a DB
  - Notificaciones via react-hot-toast

### Interfaces exportadas

- `CartProduct`, `CartItem`, `CartContextValue`
- Hook: `useCart()`

### Regresiones verificadas

- ✅ Aislado — no modifica archivos existentes
- ✅ Usa `getSupabaseClient()` singleton (no `import supabase` directo)
- ✅ Usa `useDebounce` hook ya existente

### Estado: COMPLETO ✓

---

## TASK-005: FavoritesContext.tsx

### Archivos creados

- `src/context/FavoritesContext.tsx`: Context con:
  - Persistencia dual localStorage + Supabase `user_favorites`
  - Merge al login (unión sin duplicados, favoritos locales → DB)
  - Optimistic updates con rollback
  - O(1) isFavorite lookup con `Set`
  - Validación UUID (filtra IDs corruptos)

### Interfaces exportadas

- Hook: `useFavorites()`

### Estado: COMPLETO ✓

---

## TASK-006: AuthContext.tsx — Extensión modal

### Archivos modificados

- `src/context/AuthContext.tsx`:
  - Agregado: `authModalContext: string | null`
  - Agregado: `showAuthModal(context?: string): void`
  - Agregado: `hideAuthModal(): void`
  - Preservados: todos los campos existentes (user, session, profile, isAdmin, loading, signInWithGoogle, signOut)

### Regresiones verificadas

- ✅ Interface extendida (no modificada) — retrocompatible
- ✅ `signInWithGoogle`, `signOut`, `profile` intactos

### Estado: COMPLETO ✓

---

## TASK-007: Providers/index.tsx — Cadena de providers

### Archivos modificados

- `src/providers/index.tsx`:
  - Agregado: `CartProvider` envolviendo `FavoritesProvider`
  - Agregado: `FavoritesProvider` envolviendo `ConfirmProvider`
  - Agregado: `<Toaster>` de react-hot-toast (position=bottom-center)
  - Preservado: orden `AuthProvider > CartProvider > FavoritesProvider > ConfirmProvider`

### Regresiones verificadas

- ✅ ThemeProvider, QueryClientProvider intactos
- ✅ ConfirmProvider sigue en la cadena

### Estado: COMPLETO ✓

---

## TASK-008: CartDrawer.tsx

### Archivos creados

- `src/components/cart/CartDrawer.tsx`: Drawer deslizante derecho con:
  - FocusLock para accesibilidad (react-focus-lock)
  - Vistas: carrito vacío / items / confirmación / pedido enviado
  - Auto-refresh de precios al abrir
  - Badge de stale prices con botón de reintento
  - Integración con `generate_whatsapp_message` Supabase RPC
  - Timer de expiración de 7 días visible en footer

### Identidad visual

- Colores: `bg-primary` (#143067), `text-primary`, `text-slate-900`
- Iconos: `material-symbols-outlined` (shopping_cart, delete, add, remove, close)
- Ningún color hex de la fuente (rojo #d41111) llegó al componente

### Estado: COMPLETO ✓

---

## TASK-009: FavoritesModal.tsx

### Archivos creados

- `src/components/cart/FavoritesModal.tsx`: Modal centrado con:
  - Lista de productos favoritos con imágenes
  - Spinner de carga durante fetch
  - Estado vacío con CTA al catálogo
  - Toggle de favorito con showAuthModal si no hay usuario
  - Query directa a Supabase (sin productService)

### Estado: COMPLETO ✓

---

## TASK-010: LoginModal.tsx

### Archivos creados

- `src/components/cart/LoginModal.tsx`: Modal Google OAuth con:
  - 4 contextos: cart, favorites, contact, generic
  - Mensaje e ícono dinámico según contexto
  - FocusLock para accesibilidad

### Estado: COMPLETO ✓

---

## TASK-011: Navbar.tsx — Conexión con contextos

### Archivos modificados

- `src/components/layout/Navbar.tsx`:
  - Importados: `useCart`, `useFavorites`, `useAuth`, `FavoritesModal`, `useRouter`
  - Botón favoritos: `onClick={handleFavoritesClick}`, badge de count, fill animado
  - Botón carrito: `onClick={handleCartClick}`, badge de count
  - Avatar: muestra foto de Google o icono, navega a /mi-cuenta o abre LoginModal
  - `FavoritesModal` renderizado al final del componente

### Regresiones verificadas

- ✅ SearchModal sigue funcionando
- ✅ Comportamiento scroll-hide preservado
- ✅ Menú mobile preservado
- ✅ NavLinks preservados

### Estado: COMPLETO ✓

---

## TASK-012: MobileBottomNav.tsx — Cart tab y auth

### Archivos modificados

- `src/components/layout/MobileBottomNav.tsx`:
  - Tab carrito: `e.preventDefault()` + `setIsCartOpen(true)` (no navega a /carrito)
  - Tab perfil: `showAuthModal('generic')` si no hay usuario
  - Badge blanco de cartCount en el tab de carrito

### Regresiones verificadas

- ✅ Animación SVG de ola preservada
- ✅ Todos los demás tabs funcionan igual

### Estado: COMPLETO ✓

---

## TASK-013: CatalogProductCard.tsx — Cart y Favorites reales

### Archivos modificados

- `src/components/catalogo/CatalogProductCard.tsx`:
  - Importados: `useCart`, `useFavorites`, `useAuth`
  - Botón favorito: ahora usa `toggleFavorite(id)` o `showAuthModal('favorites')`
  - Botón carrito: `addToCart()` + `setIsCartOpen(true)` (antes abría WhatsApp)
  - `isFavorited` leído de `isFavorite(id)` del context

### Identidad visual

- Colores: tokens Tailwind del proyecto (`text-primary`, `bg-primary`)
- Ningún color hex hardcodeado del fuente

### Estado: COMPLETO ✓

---

## TASK-014: ProductDetailClient.tsx — Favorites y Cart reales

### Archivos modificados

- `src/components/catalogo/ProductDetailClient.tsx`:
  - Importados: `useFavorites`, `useAuth`, `useCart`
  - `isFavorited` leído de context (antes era useState local)
  - `handleToggleFavorite`: llama a context con guard de auth
  - `handleAddToCart`: agrega al carrito con nota personalizada (antes abría WhatsApp)
  - Botón CTA cambiado: "Agregar al Carrito" con icono `shopping_cart`

### Estado: COMPLETO ✓

---

## TASK-015: GlobalModals + layout.tsx

### Archivos creados

- `src/components/layout/GlobalModals.tsx`: Client wrapper que monta `CartDrawer` + `LoginModal`

### Archivos modificados

- `src/app/(public)/layout.tsx`: Importa y renderiza `<GlobalModals />`

### Estado: COMPLETO ✓

---

## TASK-016: MiCuentaPage

### Archivos creados

- `src/app/(public)/mi-cuenta/MiCuentaPageClient.tsx`: Página completa con 3 estados

### Archivos modificados

- `src/app/(public)/mi-cuenta/page.tsx`: Reemplazado placeholder estático

### Estado: COMPLETO ✓

---

## TASK-017: CarritoPage

### Archivos modificados

- `src/app/(public)/carrito/page.tsx`: Convertida a Client Component con lista de items y CTA a drawer

### Estado: COMPLETO ✓
