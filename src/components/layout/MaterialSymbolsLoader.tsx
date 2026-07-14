"use client";

import { useEffect } from "react";

/**
 * Carga la fuente de iconos Material Symbols de forma asíncrona DESPUÉS
 * de la hidratación de React. Esto elimina completamente el bloqueo de
 * render causado por el CSS de Google Fonts (3.8 MB woff2).
 *
 * Los iconos aparecerán como texto durante el tiempo de carga inicial
 * (FOUT), pero el LCP/FCP NO se verá afectado en absoluto.
 */
export function MaterialSymbolsLoader() {
  useEffect(() => {
    const loadStyles = () => {
      const existing = document.querySelector(
        'link[href*="Material+Symbols+Outlined"]'
      );
      if (existing) return; // ya existe, no duplicar

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";
      document.head.appendChild(link);
    };

    if (document.readyState === "complete") {
      const timer = setTimeout(loadStyles, 1000);
      return () => clearTimeout(timer);
    } else {
      const handleLoad = () => {
        setTimeout(loadStyles, 1000);
      };
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  return null;
}
