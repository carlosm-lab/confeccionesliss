---
name: ant
description: Unified Agent Directive combining /goal mindset, expanded /preservacion rules, and "Only SSG or SSG On Demand Revalidation Pages" guidelines.
---

# Directiva Unificada 'ant' (Goal + Preservación + SSG)

Esta directiva integra el enfoque riguroso de `/goal`, las reglas estrictas de `/preservacion` de la interfaz y la regla de rendimiento "Only SSG or SSG On Demand Revalidation Pages". Todos los agentes de IA que asistan en este repositorio deben acatar estas directrices sin excepción.

---

## 1. Enfoque de Ejecución y Auditoría (Mentalidad /goal)

Cuando un agente es invocado o se activa esta directiva, debe actuar de forma exhaustiva y persistente. El objetivo no es realizar "intentos" o dar "ejemplos", sino entregar soluciones completas y completamente validadas.

- **Cero Placeholders y Código Incompleto**: Queda estrictamente prohibido utilizar comentarios como `// TODO`, `// Aquí va la lógica`, o omitir partes del código. Todo archivo creado o modificado debe contener la implementación real, completa y tipada al 100%.
- **Proceso de Auto-Auditoría**: El agente debe inspeccionar y probar su propio código en cada paso. Esto incluye:
  - Verificar la coherencia de todos los imports.
  - Asegurar la compatibilidad estricta con TypeScript (declaración exhaustiva de interfaces y tipos).
  - Comprobar que no se introduzcan regresiones de rendimiento o lint.
- **Prueba en Sandbox**: Todo componente nuevo que se desarrolle debe registrarse y validarse primero en la ruta aislada de sandbox: `src/app/(dev)/sandbox/page.tsx` (`/sandbox`) antes de integrarse de manera definitiva en el layout general de la aplicación.
- **Paso de Sincronización Obligatorio (`npm run agent:sync`)**: Antes de finalizar cualquier tarea, se debe ejecutar este comando en la terminal. Éste corrige automáticamente imports de lint, formatea el código según `.prettierrc` y purga código huérfano.

---

## 2. Directiva Inviolable de Preservación de Diseño, Interfaz y Seguridad (/preservacion)

Cualquier cambio técnico, optimización o refactorización que se realice en este repositorio debe respetar con precisión "pixel-perfect" la experiencia original del usuario y la estabilidad del rendimiento ya alcanzado.

- **Preservación de Páginas Optimizadas (Inviolable)**: Las páginas que ya fueron optimizadas y pasaron satisfactoriamente la validación **NO se tocan bajo ninguna circunstancia** ni se realizan modificaciones sobre ellas ni sobre sus dependencias directas, a menos que el usuario lo solicite explícitamente. Cualquier refactorización o cambio en componentes globales/compartidos debe garantizar la retrocompatibilidad absoluta y no alterar el comportamiento ni las métricas de rendimiento de las páginas ya remediadas.
- **Cero Cambios Visuales**: Bajo ninguna circunstancia se alterará la interfaz visual, el diseño, la paleta de colores, la tipografía, los espaciados, los bordes, la alineación del texto o las dimensiones de los elementos gráficos que el usuario final ve en la pantalla.
- **Cero Alteración de Animaciones y Transiciones**: Efectos de animación (ej. carruseles, sliders, transiciones de desvanecimiento, efectos de scroll, hover states, dinámicas de GSAP) deben mantenerse idénticos. No se permite remover u optimizar animaciones de forma destructiva para acelerar métricas sintéticas.
- **Seguridad Intacta**: Las directivas de seguridad como CSP, encabezados HTTP de respuesta y endpoints de validación deben conservarse intactos. No se desactivará la seguridad para optimizar velocidad.
- **Estrategias Técnicas de Integración**:
  - **Conversión de Recursos**: Las imágenes pesadas (PNG/JPEG) se pueden convertir a formatos modernos como WebP, pero manteniendo estrictamente las dimensiones y proporciones originales.
  - **Organización de SVGs**: Nunca incrustar código SVG completo y pesado directamente en el JSX de los layouts principales. Se deben extraer y guardar en `/public/icons/` o como componentes especializados en `src/components/ui/icons/`.
  - **Variables de Color**: Extraer los colores hexadecimales y RGB puros que se encuentren en código duro e integrarlos como variables HSL en `src/app/globals.css` para ser consumidos mediante Tailwind CSS.
  - **Mantener Jerarquía del DOM**: Al refactorizar componentes, no alterar la anidación de elementos HTML si ésta afecta a los selectores CSS complejos de Tailwind (ej. selectores hermanos o herencia directa).

---

## 3. Regla de Rendimiento: Only SSG or SSG On Demand Revalidation Pages

Para garantizar un rendimiento sobresaliente en Core Web Vitals (FCP, LCP y TTFB) y un índice de Lighthouse óptimo en Vercel, todos los componentes de página públicos deben usar exclusivamente Static Site Generation (SSG) o Incremental Static Regeneration (ISR) bajo demanda. Se prohíbe el renderizado del lado del servidor bajo demanda (SSR) en páginas de catálogo o públicas.

### Directrices de Generación Estática (SSG)

- **Rutas con Segmentos Dinámicos**: En páginas con rutas dinámicas (como `[sector]`, `[id]`, `[universidad]`), es obligatorio utilizar `generateStaticParams()` para pre-renderizar todo el árbol de páginas HTML durante la compilación/build time.
- **Robustez de Compilación**: Dentro de `generateStaticParams()`, se debe encapsular la consulta a bases de datos o servicios externos en un bloque `try-catch`. Si ocurre un fallo en el build time, se debe retornar un arreglo vacío `[]`. Esto evita que la compilación falle y permite que Next.js intente generar la página bajo demanda en el primer hit del usuario:
  ```typescript
  export async function generateStaticParams() {
    try {
      const data = await fetchExternalData();
      return data.map((item) => ({ id: item.slug }));
    } catch (error) {
      console.error(
        "Fallo al pre-generar rutas estáticas en build time:",
        error
      );
      return []; // Fallback seguro
    }
  }
  ```
- **Fallback para Nuevos Elementos**: Declarar `export const dynamicParams = true;` (o por defecto) en páginas dinámicas. Esto permite que nuevos productos o categorías ingresados después de la compilación se generen estáticamente en el primer acceso y queden cacheados de ahí en adelante (SSG diferido).

### Configuración del Ciclo de Vida del Caché (ISR & On-Demand)

- **Configuración de Revalidate**:
  - Utilizar `export const revalidate = false;` para indicar que una página debe ser puramente estática e indefinida hasta que se fuerce su purga.
  - O utilizar un intervalo prolongado como `export const revalidate = 3600;` (1 hora) si se requiere refresco temporal de seguridad combinándolo con revalidación activa.
- **Purga bajo Demanda vía Server Actions y Endpoints**:
  - En cualquier acción de mutación del administrador (guardado de productos, eliminación de categorías, etc.), se debe invocar a `revalidatePath(path)` (o en su defecto `revalidateTag(tag)`) para purgar inmediatamente el CDN de Vercel.
  - Asegurar la purga de las páginas clave: `"/"` (Home), `"/catalogo"` (Catálogo General), y las subpáginas específicas de detalle.

### Cero APIs Dinámicas de Runtime en Páginas Públicas

- **Prohibición de `cookies()` y `headers()`**: El uso de estas APIs de Next.js en el componente de página fuerza el renderizado dinámico (SSR) en cada petición, destruyendo el caché de SSG.
- **Hidratación en Cliente**: Cualquier información sensible al usuario (estado de sesión, carrito de compras, conteo de ofertas leídas, búsqueda dinámica) debe cargarse de forma asíncrona en el cliente mediante componentes marcados con `"use client"` a través de React Context, Zustand (`CartContext`) o hooks de React (`useEffect`), manteniendo el cascarón de la página y los catálogos puramente estáticos.
