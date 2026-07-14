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
    // Definición de las URLs de Google Fonts
    const FULL_FONT_URL =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap";

    // Subconjunto optimizado de 13 iconos exactos utilizados en la homepage (~6.2 KB)
    const HOMEPAGE_SUBSET_URL =
      "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:FILL,wght@0..1,400..700&icon_names=arrow_right_alt,checkroom,cookie,expand_more,favorite,location_on,mail,open_in_new,phone,schedule,star,star_half,verified&display=swap";

    const loadStyles = (url: string, id: string) => {
      const existing = document.getElementById(id);
      if (existing) return;

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = url;
      document.head.appendChild(link);
    };

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const isHomepage = window.location.pathname === "/";

    if (isMobile && isHomepage) {
      // 1. Cargar el subconjunto de 6KB inmediatamente tras 1s
      const loadInitial = () => {
        loadStyles(HOMEPAGE_SUBSET_URL, "material-symbols-subset");
      };

      let initialTimer: ReturnType<typeof setTimeout> | undefined;
      const handleLoad = () => {
        initialTimer = setTimeout(loadInitial, 1000);
      };

      if (document.readyState === "complete") {
        initialTimer = setTimeout(loadInitial, 1000);
      } else {
        window.addEventListener("load", handleLoad);
      }

      // 2. Cargar la fuente completa de fondo de forma diferida tras la primera interacción del usuario
      // o después de 4 segundos de inactividad (para no romper otras páginas)
      let loadedFull = false;
      const loadFullDeferred = () => {
        if (loadedFull) return;
        loadedFull = true;

        // Removemos los event listeners
        removeInteractionListeners();

        // Carga la fuente completa
        loadStyles(FULL_FONT_URL, "material-symbols-full");
      };

      const interactionEvents = [
        "touchstart",
        "scroll",
        "mousemove",
        "keydown",
      ];
      const removeInteractionListeners = () => {
        interactionEvents.forEach((event) => {
          window.removeEventListener(event, loadFullDeferred);
        });
      };

      interactionEvents.forEach((event) => {
        window.addEventListener(event, loadFullDeferred, { passive: true });
      });

      // Temporizador de inactividad de 4 segundos como fallback
      const idleTimer = setTimeout(loadFullDeferred, 4000);

      return () => {
        if (initialTimer) clearTimeout(initialTimer);
        clearTimeout(idleTimer);
        removeInteractionListeners();
        window.removeEventListener("load", handleLoad);
      };
    } else {
      // En desktop o páginas internas, cargamos la fuente completa inmediatamente tras 1s (comportamiento original)
      const loadDefault = () => {
        loadStyles(FULL_FONT_URL, "material-symbols-full");
      };

      const handleLoadDefault = () => {
        setTimeout(loadDefault, 1000);
      };

      if (document.readyState === "complete") {
        const timer = setTimeout(loadDefault, 1000);
        return () => clearTimeout(timer);
      } else {
        window.addEventListener("load", handleLoadDefault);
        return () => window.removeEventListener("load", handleLoadDefault);
      }
    }
  }, []);

  return null;
}
