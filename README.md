# Plantilla React + Next.js para Agentes de IA

Bienvenido a la plantilla base optimizada para el desarrollo acelerado utilizando Agentes de Inteligencia Artificial.

## Propósito de la Plantilla

Esta plantilla ha sido diseñada específicamente para servir como una base reutilizable en proyectos React con Next.js (App Router) construidos de principio a fin con apoyo de agentes de IA. Incluye configuraciones pre-optimizadas, herramientas de formato estrictas y dependencias esenciales modernas.

## Filosofía de Trabajo

El principio fundamental de este proyecto para los agentes de IA se resume así:

> **Cero libertad de diseño, Total libertad técnica.**

Los diseños no se inventan ni se improvisan. Se respetan estrictamente los mockups proporcionados. Sin embargo, para la implementación de lógica (gestión de estado, hooks, componentes atómicos, arquitectura de datos), existe total libertad para aplicar los patrones más óptimos de React.

## Flujo de Trabajo

1. **Punto de partida (Google Stitch):** El proceso comienza exportando diseños estáticos (HTML/CSS) desde herramientas como Google Stitch.
2. **Ubicación:** Todos los archivos de diseño en crudo y prototipos visuales se depositan en la carpeta `prototypes/`.
3. **Conversión Estricta:** El Agente de IA lee estos archivos en la carpeta `prototypes/` y su trabajo es fragmentarlos, refactorizarlos visualmente "píxel por píxel", y convertirlos en componentes React funcionales e interactivos en `src/components/` y las rutas en `src/app/`.

## Estructura del Proyecto

- `prototypes/` -> El origen del diseño. Aquí se colocan los HTMLs exportados o templates estáticos. Los agentes IA tomarán esto como la única fuente de verdad visual.
- `src/app/` -> Rutas, páginas, templates y layouts manejados por el App Router de Next.js.
- `src/components/` -> Todos los componentes de React, funcionales y modulares basados en los prototipos.
- `src/context/` -> Gestores de estado global (ej. Zustand integrado, u otros providers necesarios).
- `src/hooks/` -> Custom hooks tipados en TS.
- `src/lib/` -> Funciones de utilidad pura (como utilidades de formato, funciones combinadoras `cn` de Tailwind, clientes de API, etc).
- `.husky/` -> Hooks de git (pre-commit) que garantizan que el código pase el linter e integre mejoras de formato mediante `lint-staged`.

## Cómo iniciar un proyecto nuevo desde esta plantilla

Para comenzar un nuevo proyecto usando esta base, debes seguir este orden lógico y comunicarlo al Agente:

1. **Configurar el Diseño Base:**
   Llena la carpeta `prototypes/` con los archivos HTML y recursos visuales a replicar.
2. **Definir Variables Globales y Entorno:**
   Revisa y actualiza el archivo `.env.example` con las variables que el proyecto necesite. Edita `src/app/globals.css` si necesitas definir tokens raíz de Tailwind.
3. **Adaptar Rutas Base (src/app/):**
   Comienza estructurando las páginas estáticas y envoltorios (layouts).
4. **Implementar Componentes (src/components/):**
   Traduce fragmentos de HTML de `prototypes/` a componentes de React reutilizables, respetando los píxeles.
5. **Añadir Interactividad (src/hooks/ & src/context/):**
   Finaliza implementando la lógica de negocio, integración con APIs externas y control de estado global con Zustand a los componentes construidos.
