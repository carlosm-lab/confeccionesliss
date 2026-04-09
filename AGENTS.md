# Instrucciones para Agentes AI

Bienvenido. Estás trabajando sobre una plantilla base de React + Next.js meticulosamente pre-configurada.
Tu objetivo es construir una aplicación web a partir de prototipos de diseño. Revisa estas reglas **ANTES** de escribir código:

## 1. Organización del Proyecto

- El proyecto utiliza **Next.js (App Router)**.
- `src/app/`: Contiene la lógica de rutas, layouts, y páginas. Aquí va la arquitectura SSR/SSG.
- `src/components/`: **Deberá contener TODOS los componentes**. Mantén la modularidad. Lee `src/components/README.md`.
- `prototypes/`: **AQUÍ ESTÁN LOS DISEÑOS**. Los archivos `.html` y ficheros de componentes que se coloquen aquí dictan el aspecto visual exacto que debes replicar e integrar.

## 2. Decisiones de Diseño: CERO LIBERTAD

- Los archivos en la carpeta `prototypes/` representan el diseño **final**.
- **RESPETA PIXEL A PIXEL** el diseño.
- **NO TOMES DECISIONES DE DISEÑO**. No cambies colores, alineaciones, fuentes, ni la estructura de interfaz sin autorización explícita. Tu trabajo consiste en transformar y fragmentar ese HTML/CSS estático en una arquitectura interactiva de componentes React.

## 3. Decisiones Técnicas: LIBERTAD TOTAL

- Tienes total libertad para elegir la lógica, la arquitectura del estado, los hooks y el modelado de datos para que la app funcione eficientemente.
- Divide los HTMLs en componentes reutilizables, modulares y de bajo acoplamiento (atomic design, logical blocks).
- **Prueba en Sandbox**: Todo componente nuevo que construyas DEBE ser probado y renderizado primero en la ruta aislada `src/app/(dev)/sandbox/page.tsx` (`/sandbox`) antes de integrarlo definitivamente en las páginas o layouts principales. Esto asegura validación visual sin afectar el build o rutas en curso.
- **Verifica las dependencias**: Si notas que el prototipo requiere íconos (ej: Material Symbols, Lucide, Heroicons), librerías de componentes específicos, animaciones (ej: Framer Motion) u otras utilidades que no están instaladas, **instálalas automáticamente**.

## 4. Requerimientos Base

- **Rendering Mixto**: Utiliza SSR (Server-Side Rendering) y SSG (Static Site Generation) apropiadamente. Datos fuertemente dinámicos pueden ir por SSR, el resto por SSG para mayor performance.
- **Rendimiento y SEO**: El proyecto debe estar 100% optimizado para SEO. Usa la API de `metadata` de Next.js correctament en tus layouts/pages.
- **Mobile-First**: La web resultante siempre debe priorizar un diseño mobile-first y totalmente responsivo.

## 5. Notas Importantes de Next.js

This is NOT the Next.js you know - This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## 6. Utilidades Pre-configuradas de la Plantilla

Revisa cuidadosamente lo siguiente para NO reinventar la rueda:

- **`src/lib/utils.ts` (`cn`)**: La función `cn()` usando `clsx` y `tailwind-merge` **ya existe**. Uśala siempre para combinar clases de Tailwind.
- **`loading.tsx`, `error.tsx`, `not-found.tsx`**: Ya están ubicados en `src/app/`. Debes usarlos como base o modificarlos, **no los crees desde cero**.
- **TypeScript Estricto**: El proyecto ya usa TypeScript. Todos los **componentes nuevos deben ser creados como archivos `.tsx`** con sus respectivos Types o Interfaces bien definidos.
- **Distribución Estructural (`src/*`)**:
  - `src/hooks/` es solo para custom hooks tipados.
  - `src/context/` es solo para estados globales con Zustand.
  - `src/providers/` es EXCLUSIVO para englobar context providers de React (ThemeProvider, QueryClientProvider).
  - `src/config/` (específicamente `site.ts`) es el único lugar donde debes modificar la metadata central (Nombre, SEO, URLs) de la aplicación.
  - `src/lib/` es para funciones de utilidad pura o clientes como supabase.
- **Variables de Entorno Estrictas**: Cualquier variable nueva debe declararse en `.env.example` y obligatoriamente integrarse en `src/env.ts` para validarla con Zod y @t3-oss/env-nextjs antes de poder usarla.
- **Formateo**: El proyecto se rige por `.prettierrc`. **No cambies su configuración**.
- **Tests Automatizados**: Tienes `Vitest` y `@testing-library/react` instalados. Estás alentado a utilizar TDD (Test-Driven Development) escribiendo tests si sientes que facilita asegurar la calidad del componente.
- **Commits**: DEBES obligatoriamente usar la convención _Conventional Commits_ en tu registro de código. Commitlint lo verificará mediante Husky al guardar el git log.

## 7. Protocolos Puros de IAs (Obligatorio)

Como Inteligencia Artificial, tu memoria no es persistente entre sesiones. Para mitigar esto, debes seguir las siguientes pautas de registro:

- **Planes de Implementación**: Antes de escribir o modificar código para un feature o arquitectura compleja, DEBES documentar tu plan en un artefacto llamado `implementation_plan.md` y solicitar su aprobación.
- **Catálogo de Componentes**: Cada vez que crees o refactorices un componente nuevo, TIENES que documentarlo obligatoriamente en `src/components/REGISTRY.md` con su nombre, props y ejemplo de uso.
- **Decisiones Arquitectónicas**: Cada vez que tomes una decisión de diseño técnico importante (estructuras de estado globales, elección de patrón de API, etc.), regístralo inmediatamente en `ARCHITECTURE.md`.
- **Botón de pánico / Sync Final**: Antes de dar CUALQUIER tarea de código por concluida, DEBES obligatoriamente ejecutar el comando `npm run agent:sync` en la terminal. Esto auto-repara el formato, corrige los imports de Lint y purga el código obsoleto.

## 8. Protocolo de Mocking (Flujo UI-First)

Como trabajarás inicialmente "UI-First" basándote en los prototipos generados en Stitch sin un backend disponible:

- Define interceptores de red usando **MSW (Mock Service Worker)**.
- Todos tus mocks deben ir obligatoriamente en el archivo `src/mocks/handlers.ts`.
- MSW se inicializará **sólo** en desarrollo y se deberá desactivar (vaciando los handlers) una vez que el backend real se comisione conectando a una BD real.

## 9. Estándar de App Router (Mutaciones y Esquemas)

- **Prohibido** crear Server Actions (use server) al vuelo dentro del archivo de los Client Components o de las vistas.
- Todo Server Action debe estar **exclusivamente** dentro de `src/actions/` y ser envuelto mediante **`next-safe-action`**.
- La validación de los datos que le llegan a una Actions o las validaciones de Forms, no deben ir directamente en las vistas, se deben definir como esquemas con Zod en **`src/schemas/`**.

## 10. Protocolo de Migración Google Stitch ➡️ React

Al momento de ingerir los HTMLs ubicados en la carpeta `prototypes/`, este es el flujo absoluto que DEBES respetar paso-a-paso:

1. **Variables de Color**: Antes de portar el DOM principal de UI, extrae **todos** los colores hexadecimales puros o rgb inline que veas en el HTML estático de Stitch y promúevelos automáticamente a variables HSL en `src/app/globals.css`. Todo tu refactor a componentes deberá consumir esos colores usando clases de Tailwind.
2. **Extracción de SVGs**: Nunca, ¡JAMÁS!, dejes archivos SVG enteros inmersos estáticamente dentro del JSX de React layout. Extrae los SVGs del DOM o: a) Los descargas/guardas en archivos en `/public/icons/`. b) Si necesitan prop logic, sepáralos obligatoriamente como `<Icons.IconName />` en el directorio de `src/components/ui/icons/` y reemplaza el JSX para importarlo prolijamente.
3. **Limpieza Autómata**: Después de integrar el diseño y dar el paso de construcción por finalizado, siempre deberás invocar el comando de terminal `npm run dead-code` (mediante knip) que detectará los archivos/estilos huérfanos que hayan podido quedar atrás.
