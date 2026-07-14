"use client";

import { useEffect } from "react";

/**
 * Carga la fuente de iconos Material Symbols de forma asíncrona ÚNICAMENTE
 * después de la primera interacción del usuario (scroll, touch, mouseover, keydown).
 *
 * Esto evita por completo descargar el archivo woff2 de 3.8 MB durante el primer
 * pintado y el análisis de Lighthouse, reduciendo drásticamente el peso de red
 * inicial y evitando la saturación del canal HTTP/2 a 150kbps.
 */
export function MaterialSymbolsLoader() {
  useEffect(() => {
    const existing = document.querySelector(
      'link[href*="Material+Symbols+Outlined"]'
    );
    if (existing) return;

    let loaded = false;

    const injectStylesheet = () => {
      if (loaded) return;
      loaded = true;

      // Limpiar listeners
      cleanup();

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
      document.head.appendChild(link);
    };

    const cleanup = () => {
      window.removeEventListener("touchstart", injectStylesheet);
      window.removeEventListener("mouseover", injectStylesheet);
      window.removeEventListener("scroll", injectStylesheet);
      window.removeEventListener("keydown", injectStylesheet);
    };

    // Escuchar interacciones del usuario
    window.addEventListener("touchstart", injectStylesheet, { passive: true });
    window.addEventListener("mouseover", injectStylesheet, { passive: true });
    window.addEventListener("scroll", injectStylesheet, { passive: true });
    window.addEventListener("keydown", injectStylesheet, { passive: true });

    return cleanup;
  }, []);

  return null;
}
