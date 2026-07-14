---
name: preservacion
description: Directiva inviolable de preservación de diseño, interfaz y seguridad para Confecciones Liss.
---

# Directiva Inviolable de Preservación de Diseño, Interfaz y Seguridad

Esta directiva establece límites absolutos e infranqueables para cualquier tarea de optimización, refactorización o cambio técnico en este repositorio:

- **CERO CAMBIOS VISUALES O DE COMPORTAMIENTO**: Bajo NINGUNA circunstancia se puede alterar la interfaz visual, el diseño, los colores, fuentes, espaciados, bordes, elementos gráficos o animaciones que el usuario ve en pantalla.
- **PROHIBIDO MODIFICAR SEGURIDAD**: Las directivas de seguridad (CSP, encabezados de respuesta, etc.) deben respetarse al máximo y no se deben desactivar o vulnerar bajo pretexto de optimización de rendimiento o velocidad.
- **PRESERVACIÓN DE FUNCIONALIDAD**: Toda animación, interacción, efecto de transición visual o lógica funcional existente (como menús desplegables, carruseles, carga de iconos, sliders, etc.) se debe mantener exactamente idéntica y prístina en su comportamiento original.
- **LIBERTAD DE IMPLEMENTACIÓN TÉCNICA**: Los agentes tienen total libertad para cambiar la tecnología de fondo, la arquitectura de estados, proxies, optimizar recursos (ej. convertir imágenes de PNG a WebP manteniendo dimensiones y proporciones originales), usar SSR/SSG dinámico, modularizar componentes React/Next.js, etc. Pero el render final resultante de cara al usuario debe ser **pixel-perfect y funcionalmente idéntico**.
- **CERO ALTERACIÓN DE PIXELES/ANIMACIONES**: No se permite remover animaciones (ej. fade-ins), modificar comportamientos de scroll, o quitar interactividades para mejorar puntajes en análisis automáticos como Lighthouse / PageSpeed. La estética y la experiencia de usuario originales son prioritarias e inalterables.
