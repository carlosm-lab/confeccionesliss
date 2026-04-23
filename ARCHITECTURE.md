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
**Decision:** Implementación de Supabase SSR & Middleware
**Context:** Para garantizar la persistencia de sesión segura en un entorno Next.js 15 (App Router), se instaló `@supabase/ssr` y se implementaron clientes singleton en `src/lib/supabase.ts`. Se configuró el `middleware.ts` para usar `getUser()` asegurando que las rutas protegidas no puedan ser accedidas con tokens expirados, protegiendo las rutas `/cuenta`, `/admin`, `/pedidos`, y `/checkout`.
**Consequences:** El Auth State está fuertemente acoplado al servidor y requiere `cookies()` the `next/headers`. Server Components son la principal forma de autenticación, hidratando estados al cliente a través del hook `useAuth`.

**Date:** 2026-04-23
**Decision:** Manejo de estado del carrito con Zustand
**Context:** Se refactorizó la funcionalidad del carrito utilizando `zustand` con el middleware `persist` en `src/hooks/useCarrito.ts`.
**Consequences:** Permite que el carrito sobreviva a la recarga de página (guardado en `localStorage`). Simplifica el estado sin prop drilling y evita las cascadas de renders de React Context.

**Date:** 2026-04-23
**Decision:** Patrón Server Actions con Zod y next-safe-action
**Context:** Se usa `next-safe-action` combinado con esquemas `Zod` estrictos ubicados en `src/schemas/` para validar toda la información que entra al sistema (Auth, Profiles, Products, Orders).
**Consequences:** Las mutaciones son Type-Safe de extremo a extremo y seguras. Los esquemas Zod también se pueden reutilizar en Client Components con `react-hook-form`.
