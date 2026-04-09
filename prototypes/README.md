# Prototipos / Diseños Estáticos

Esta carpeta contiene los archivos HTML exportados desde Google Stitch.

## Instrucciones para el Agente IA

Antes de portar cualquier archivo de esta carpeta, lee y sigue el
**Protocolo de Migración** definido en `AGENTS.md` (Sección 10):

1. Extrae colores a variables CSS en `src/app/globals.css`
2. Extrae SVGs a `public/icons/` o `src/components/ui/icons/`
3. Ejecuta `npm run dead-code` al finalizar

**NUNCA** modifiques los archivos de esta carpeta. Son la fuente
de verdad visual — solo lectura.
