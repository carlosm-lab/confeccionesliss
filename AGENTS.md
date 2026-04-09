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
  - `src/context/` es solo para estados globales (Context/Redux/etc).
  - `src/lib/` es para funciones de utilidad pura o clientes como supabase.
- **Variables de Entorno**: Registra cualquier nueva key requerida en `.env.example` antes o a la vez de instanciarla en el código para asegurar la portabilidad.
- **Formateo**: El proyecto se rige por `.prettierrc`. **No cambies su configuración**, confía en ella para estandarizar todo tu output.
