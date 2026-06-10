"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
type ChangeCategory =
  | "feat"
  | "fix"
  | "style"
  | "refactor"
  | "chore"
  | "docs"
  | "perf"
  | "security"
  | "seo"
  | "a11y";

interface ChangeEntry {
  id: string;
  date: string; // ISO "YYYY-MM-DD"
  category: ChangeCategory;
  title: string;
  description: string;
  commit?: string;
  note?: string; // clarification when a commit grouped multiple changes
}

interface VersionGroup {
  version: string;
  label: string;
  dateRange: string;
  entries: ChangeEntry[];
}

// ─────────────────────────────────────────────────────────────────────────────
// BADGE CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const BADGE: Record<
  ChangeCategory,
  { label: string; color: string; bg: string }
> = {
  feat: { label: "Feature", color: "#0d4f2e", bg: "#d1fae5" },
  fix: { label: "Fix", color: "#7f1d1d", bg: "#fee2e2" },
  style: { label: "Diseño", color: "#4c1d95", bg: "#ede9fe" },
  refactor: { label: "Refactor", color: "#1e3a5f", bg: "#dbeafe" },
  chore: { label: "Chore", color: "#3f3f46", bg: "#f4f4f5" },
  docs: { label: "Docs", color: "#713f12", bg: "#fef9c3" },
  perf: { label: "Perf", color: "#064e3b", bg: "#d1fae5" },
  security: { label: "Seguridad", color: "#831843", bg: "#fce7f3" },
  seo: { label: "SEO", color: "#1a3a5c", bg: "#dbeafe" },
  a11y: { label: "A11y", color: "#1c1917", bg: "#f5f5f4" },
};

const ALL_CATEGORIES: ChangeCategory[] = [
  "feat",
  "fix",
  "style",
  "refactor",
  "chore",
  "docs",
  "perf",
  "security",
  "seo",
  "a11y",
];

// ─────────────────────────────────────────────────────────────────────────────
// CHANGELOG DATA
// Each group is a "version" ordered newest → oldest.
// Entries within a group are ordered newest → oldest.
// ─────────────────────────────────────────────────────────────────────────────
const CHANGELOG: VersionGroup[] = [
  {
    version: "v0.8",
    label: "Navegación móvil curva + contraste de tarjetas",
    dateRange: "10 de junio de 2026",
    entries: [
      {
        id: "e-001",
        date: "2026-06-10",
        category: "fix",
        title: "Contraste mejorado en tarjetas de la página /links",
        description:
          "Las tarjetas de redes sociales en la página /links ahora tienen la misma sombra profunda que las tarjetas del catálogo, garantizando legibilidad en cualquier fondo.",
        commit: "da33046",
      },
      {
        id: "e-002",
        date: "2026-06-10",
        category: "fix",
        title: "Corrección de lint y ruta en MobileBottomNav",
        description:
          "Se resolvió un error de lint que impedía el build y se corrigió la ruta activa detectada incorrectamente en la barra de navegación inferior.",
        commit: "79061e8",
      },
      {
        id: "e-003",
        date: "2026-06-10",
        category: "feat",
        title: "Geometría Bézier exacta en la curva SVG del MobileBottomNav",
        description:
          "Se portó la geometría precisa del proyecto de referencia 'susonthapa' para lograr una curva de notch perfectamente suave. Se añadió la burbuja blanca FAB y la página /mi-cuenta como destino.",
        commit: "894a7c6",
      },
      {
        id: "e-004",
        date: "2026-06-10",
        category: "fix",
        title: "Corrección de color de relleno SVG y profundidad del notch",
        description:
          "Se corrigió un bug de fill color en el SVG que hacía que la burbuja apareciera transparente. Se aumentó la profundidad del notch para mejor presencia visual. Se intercambiaron los iconos de Buscar y Perfil entre el Navbar y el BottomNav.",
        commit: "fac005d",
      },
      {
        id: "e-005",
        date: "2026-06-10",
        category: "feat",
        title:
          "Barra de navegación inferior curva con notch y burbuja deslizante",
        description:
          "Se implementó un MobileBottomNav con forma SVG curva en la parte inferior, notch central para el botón de acción flotante y una burbuja indicadora de pestaña activa que se desliza animadamente entre los tabs.",
        commit: "96de615",
        note: "Este commit consolida varios intentos de diseño previos (feat/nav redesign, floating bubble).",
      },
      {
        id: "e-006",
        date: "2026-06-10",
        category: "fix",
        title:
          "Corrección crítica: página zombie al restaurar sesión del navegador",
        description:
          "Se implementó una solución en 4 capas para el bug que dejaba la página completamente no interactiva al restaurar la sesión del navegador tras un cierre: (1) Headers HTTP Cache-Control en next.config.mjs, (2) purga de Service Workers residuales con prevención de loop, (3) guard de bfcache vía pageshow, (4) watchdog de hidratación de React con timeout de 5 segundos y heartbeat en Navbar.",
        commit: "da33046",
        note: "Documentado exhaustivamente en BUGFIX_SESSION_RESTORE.txt. Se intentaron 7 enfoques fallidos antes de llegar a la solución definitiva.",
      },
    ],
  },
  {
    version: "v0.7",
    label: "Página /links — Solución crash Android Chrome",
    dateRange: "9 de junio de 2026",
    entries: [
      {
        id: "e-007",
        date: "2026-06-09",
        category: "feat",
        title: "Página de links-in-bio — Fix del crash en Chrome Android",
        description:
          'Se implementó la página /links (estilo Linktree) con todas las redes sociales de Confecciones Liss. Se resolvió un crash crítico en Chrome y Brave para Android causado por target="_blank" que disparaba el OOM Killer del sistema operativo al abrir un nuevo renderer para Instagram/Facebook. La solución fue eliminar target="_blank" para que Android App Links abra las apps nativas directamente.',
        commit: "2e2231c",
        note: "Se intentaron 7 soluciones fallidas (aislar layout, eliminar handlers JS, CSP, Intent URLs, ThemeProvider, Server Component puro, HTML estático puro) antes de identificar la causa raíz.",
      },
      {
        id: "e-008",
        date: "2026-06-09",
        category: "feat",
        title: "Barra de navegación inferior añadida (primera versión)",
        description:
          "Se añadió el componente MobileBottomNav con tabs de inicio, catálogo, WhatsApp, links y perfil. Se ocultaron los iconos de carrito y búsqueda del header móvil para liberar espacio.",
        commit: "cda963e",
      },
      {
        id: "e-009",
        date: "2026-06-09",
        category: "feat",
        title: "Botón flotante de WhatsApp eliminado del layout global",
        description:
          "Se reemplazó el WhatsAppButton flotante por un acceso directo integrado en la barra de navegación inferior, limpiando el layout de elementos superpuestos.",
        commit: "2c38271",
      },
      {
        id: "e-010",
        date: "2026-06-09",
        category: "style",
        title: "Navegación: logo sin texto en móvil, dropdown unificado",
        description:
          "En móvil el logo muestra solo el isotipo (sin texto de marca) para economizar espacio en la barra de navegación. El dropdown de menú se unificó en comportamiento entre mobile y desktop.",
        commit: "db46171",
      },
      {
        id: "e-011",
        date: "2026-06-09",
        category: "style",
        title: "Actualización del SVG del logo de Threads a la versión oficial",
        description:
          "Se reemplazó el path SVG anterior del icono de Threads por el path oficial actualizado del brand kit de Meta.",
        commit: "7b4120c",
      },
      {
        id: "e-012",
        date: "2026-06-09",
        category: "fix",
        title: "Cierre del menú por click fuera limitado a viewports desktop",
        description:
          "El listener que cerraba el menú al hacer clic fuera de él se limitó a viewports ≥ 1024px. En mobile el menú se cerraba incorrectamente al tocar cualquier área táctil.",
        commit: "28cfa1e",
      },
      {
        id: "e-013",
        date: "2026-06-09",
        category: "feat",
        title: "Menús móvil y desktop homologados con /links incluido",
        description:
          "Los ítems de navegación del dropdown de mobile y desktop se sincronizaron para mostrar exactamente los mismos destinos, incluyendo el nuevo enlace a /links.",
        commit: "edd997a",
      },
      {
        id: "e-014",
        date: "2026-06-09",
        category: "style",
        title: "Eslogan del logo con letter-spacing justificado exacto",
        description:
          "El eslogan debajo del logo de marca ('UNIFORMES · SCRUBS · BORDADOS') usa ahora letter-spacing calculado dinámicamente con inter-character para alinearse pixel a pixel con el ancho del logotipo.",
        commit: "8d18b79",
      },
      {
        id: "e-015",
        date: "2026-06-09",
        category: "feat",
        title:
          "Navbar: barra de búsqueda completa desde md, hamburger desde sm",
        description:
          "Se ajustaron los breakpoints: la barra de búsqueda completa aparece desde 768px (md), y el botón hamburger se muestra por debajo de 640px (sm). En tablet se colapsa a un ícono de lupa.",
        commit: "3d9fce9",
      },
      {
        id: "e-016",
        date: "2026-06-09",
        category: "feat",
        title: "Botón de menú premium añadido a desktop y mobile",
        description:
          "Se rediseñó el control de navegación con un botón de menú con estilo premium (icono + label animados) tanto en la versión móvil como desktop del Navbar.",
        commit: "6a4e4ae",
      },
      {
        id: "e-017",
        date: "2026-06-09",
        category: "feat",
        title: "Hero: botón CTA redirige al catálogo",
        description:
          "El botón principal del hero ('Comprar' → 'Catálogo') ahora redirige correctamente a /catalogo en lugar de a una ancla interna.",
        commit: "3e87455",
      },
    ],
  },
  {
    version: "v0.6",
    label: "SEO avanzado, sitemap y middleware",
    dateRange: "7 – 8 de junio de 2026",
    entries: [
      {
        id: "e-018",
        date: "2026-06-08",
        category: "fix",
        title: "Sitemap condicional y URLs de producto sin duplicados",
        description:
          "El sitemap.xml ahora se genera condicionalmente (solo si HOME_ONLY_MODE está desactivado). Se eliminaron las URLs de productos duplicadas que aparecían al mezclar rutas estáticas y dinámicas.",
        commit: "b66fb94",
      },
      {
        id: "e-019",
        date: "2026-06-08",
        category: "fix",
        title:
          "Middleware excluye sitemap.xml y robots.txt del redirect home-only",
        description:
          "Cuando HOME_ONLY_MODE estaba activo, el middleware redirigía todas las rutas —incluyendo sitemap.xml y robots.txt— a la home, impidiendo que Google los rastreara. Se añadieron exclusiones explícitas.",
        commit: "efd6282",
      },
      {
        id: "e-020",
        date: "2026-06-08",
        category: "seo",
        title: "Mejoras globales de metadata, social links, robots y schema",
        description:
          "Se actualizó la metadata del layout raíz: título y descripción optimizados, robots meta con directivas correctas, schema Organization mejorado y se completaron los links sociales en siteConfig.",
        commit: "2fa87df",
      },
      {
        id: "e-021",
        date: "2026-06-07",
        category: "style",
        title: "Hero: imagen llena el contenedor simétricamente",
        description:
          "La imagen del hero ahora cubre simétricamente el contenedor sin espacios laterales blancos. Se corrigió el object-position y el aspect-ratio para viewport completo.",
        commit: "03c3cf9",
      },
      {
        id: "e-022",
        date: "2026-06-07",
        category: "feat",
        title: "Middleware de home-only y renderizado condicional del Navbar",
        description:
          "Se añadió un middleware que redirige todas las rutas a la home cuando HOME_ONLY_MODE=true (variable de entorno). El Navbar también renderiza condicionalmente sus links según este modo.",
        commit: "b6dd569",
      },
    ],
  },
  {
    version: "v0.5",
    label: "Catálogo Visual — Category Hub",
    dateRange: "7 de junio de 2026",
    entries: [
      {
        id: "e-023",
        date: "2026-06-07",
        category: "feat",
        title: "5 nuevas categorías de producto en el catálogo",
        description:
          "Se añadieron configuraciones y productos de muestra para Lencería, Limpiapipas, Ropa y Calzado, Sublimados y Tops. Cada categoría incluye imagen de hub, tagline y código de color.",
        commit: "b3e27c7",
      },
      {
        id: "e-024",
        date: "2026-06-07",
        category: "style",
        title:
          "Grid del catálogo: 2 columnas en móvil, 3 en tablet, 4 en desktop",
        description:
          "Se refinó el grid de la vista Category Hub con breakpoints exactos: 1 col (< 480px), 2 col (480-767px), 3 col (768-1023px) y 4 col (≥ 1024px). Alturas responsive con aspect-ratio 21/9 en móvil.",
        commit: "82e5446",
        note: "Este commit agrupa 15+ ajustes de grid y tipografía que se iteraron durante la misma jornada.",
      },
      {
        id: "e-025",
        date: "2026-06-07",
        category: "style",
        title:
          "Texto sobre imagen: sombra de contorno 8-way para máximo contraste",
        description:
          "El título flotante sobre las imágenes de categoría usa una clase .contrast-text-shadow personalizada con 8 sombras de texto más 2 capas de glow para garantizar legibilidad en cualquier fondo fotográfico.",
        commit: "6ad34de",
      },
    ],
  },
  {
    version: "v0.4",
    label: "SearchModal + Category Hub — Arquitectura de búsqueda",
    dateRange: "12 de mayo de 2026",
    entries: [
      {
        id: "e-026",
        date: "2026-05-12",
        category: "feat",
        title: "SearchModal fullscreen reemplaza el buscador inline",
        description:
          "El buscador inline dentro del Navbar se reemplazó por un modal fullscreen (SearchModal) que se activa al tocar la barra de búsqueda. Incluye chips de categoría como estado inicial y filtrado de productos en tiempo real.",
        commit: "85b4dda",
        note: "Decisión arquitectónica: TypewriterSearch → TypewriterPlaceholder (solo visual), lógica de búsqueda centralizada en SearchModal.",
      },
      {
        id: "e-027",
        date: "2026-05-12",
        category: "feat",
        title: "Category Hub: /catalogo como landing visual de categorías",
        description:
          "Se adoptó el patrón 'Category Hub' (inspirado en Nike/Apple/Amazon): /catalogo es ahora una landing con tarjetas visuales grandes que dirigen al usuario a cada departamento. Se reemplazó el catálogo unificado con filtros que generaba fricción cognitiva.",
        commit: "4e86f41",
        note: "Decisión arquitectónica registrada en ARCHITECTURE.md.",
      },
      {
        id: "e-028",
        date: "2026-05-09",
        category: "refactor",
        title: "Nomenclatura 'sector salud' migrada a 'scrubs'",
        description:
          "Se renombraron internamente todas las referencias de 'sector-salud' a 'scrubs' en rutas, datos y categorías para alinear con la terminología real del negocio.",
        commit: "41c2b62",
      },
    ],
  },
  {
    version: "v0.3",
    label: "Catálogo unificado con filtros, búsqueda y paginación",
    dateRange: "7 – 8 de mayo de 2026",
    entries: [
      {
        id: "e-029",
        date: "2026-05-08",
        category: "feat",
        title:
          "Catálogo unificado con búsqueda, filtros, ordenamiento y paginación",
        description:
          "Primera versión del catálogo funcional completo: buscador en tiempo real, filtros por categoría con lógica AND/OR, ordenamiento por precio y nombre, y paginación. El Navbar se expandió con acceso rápido al catálogo.",
        commit: "8f43ba7",
      },
      {
        id: "e-030",
        date: "2026-05-08",
        category: "a11y",
        title: "FilterDrawer móvil con touch targets WCAG 2.2 (44x44px)",
        description:
          "Se añadió un drawer de filtros deslizante para móvil. Todos los elementos interactivos cumplen el mínimo de 44×44px de área táctil definido en WCAG 2.5.5.",
        commit: "b1b1cd7",
      },
      {
        id: "e-031",
        date: "2026-05-08",
        category: "refactor",
        title: "Rutas dinámicas unificadas para categorías del catálogo",
        description:
          "Se migró de rutas estáticas por categoría a una ruta dinámica /catalogo/[slug] que renderiza el contenido correcto según el parámetro de URL.",
        commit: "83365a9",
      },
      {
        id: "e-032",
        date: "2026-05-08",
        category: "seo",
        title: "JSON-LD + sitemap dinámico",
        description:
          "Se implementó el schema JSON-LD para páginas de catálogo y producto (Product, BreadcrumbList, LocalBusiness). El sitemap se genera dinámicamente desde los datos de productos.",
        commit: "6d8c5d2",
      },
      {
        id: "e-033",
        date: "2026-05-08",
        category: "fix",
        title:
          "16 correcciones de funcionalidad y accesibilidad WCAG 2.2 en el catálogo",
        description:
          "Remediación de auditoría: contraste de color corregido en filtros, labels de formulario conectados correctamente, aria-live en resultados de búsqueda, focus visible en todos los interactivos, y correcciones de lógica de filtro AND/OR.",
        commit: "462286f",
      },
      {
        id: "e-034",
        date: "2026-05-08",
        category: "feat",
        title: "Datos centralizados de productos y rutas dinámicas",
        description:
          "Se centralizó todo el inventario de productos con tipado estricto TypeScript. Las rutas del catálogo ahora se generan dinámicamente desde este único origen de verdad.",
        commit: "3815fd3",
      },
      {
        id: "e-035",
        date: "2026-05-07",
        category: "security",
        title: "Remediación de auditoría: seguridad, SEO y rendimiento",
        description:
          "Se implementaron los hallazgos de la auditoría: CSP (Content Security Policy) restrictiva, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, variables de entorno no expuestas al cliente, y optimización de imágenes.",
        commit: "062f5b7",
      },
    ],
  },
  {
    version: "v0.2",
    label: "Página de inicio — SEO y diseño mobile-first",
    dateRange: "26 – 27 de abril de 2026",
    entries: [
      {
        id: "e-036",
        date: "2026-04-27",
        category: "seo",
        title: "Imágenes OG/Twitter reemplazadas con screenshot real del sitio",
        description:
          "Las imágenes generadas dinámicamente con ImageResponse se reemplazaron por una captura de pantalla real del sitio en producción, que ofrece mayor credibilidad y CTR en redes sociales.",
        commit: "c0ca62d",
      },
      {
        id: "e-037",
        date: "2026-04-27",
        category: "seo",
        title: "Imágenes OG y Twitter dinámicas con Next.js ImageResponse",
        description:
          "Se implementaron rutas opengraph-image.tsx y twitter-image.tsx que generan dinámicamente las imágenes de preview para redes sociales usando el API de ImageResponse de Next.js.",
        commit: "993c1c5",
      },
      {
        id: "e-038",
        date: "2026-04-27",
        category: "seo",
        title: "Fix GSC: redirect, sitemap, OG image y keyword stuffing",
        description:
          "Se corrigieron problemas reportados en Google Search Console: redirect incorrecto en la URL canónica, sitemap con URLs inaccesibles, imagen OG ausente y sobredensidad de palabras clave en la meta description.",
        commit: "ccad6e8",
      },
      {
        id: "e-039",
        date: "2026-04-27",
        category: "a11y",
        title: "Contraste de iconos mejorado en la sección hero",
        description:
          "Los iconos decorativos del hero tenían un ratio de contraste insuficiente (< 3:1 WCAG). Se ajustaron los colores para cumplir al menos WCAG AA en componentes de UI.",
        commit: "d09f1f1",
      },
      {
        id: "e-040",
        date: "2026-04-26",
        category: "feat",
        title: "Optimización completa de la página de inicio y estrategia SEO",
        description:
          "Rediseño integral del home: hero mobile-first con imagen de portada real, título H1 optimizado con palabras clave primarias, grid de fotos con descripción del proceso, sección de beneficios y schema LocalBusiness.",
        commit: "1e94dcb",
        note: "Este commit agrupa múltiples cambios de optimización realizados en la misma sesión de trabajo.",
      },
      {
        id: "e-041",
        date: "2026-04-26",
        category: "chore",
        title:
          "Limpieza profunda: eliminación de código privado, mocks y código muerto",
        description:
          "Se eliminó el directorio private/, todos los handlers de MSW mock, código de Supabase/Auth/Zustand no utilizado y archivos de basura. Solo quedó el código de producción activo.",
        commit: "e43168b",
      },
      {
        id: "e-042",
        date: "2026-04-26",
        category: "feat",
        title: "Logo SVG como favicon del sitio",
        description:
          "Se reemplazó el favicon genérico por el logo SVG de Confecciones Liss, con versiones .ico, .png y apple-touch-icon correctamente referenciadas.",
        commit: "da26da4",
      },
    ],
  },
  {
    version: "v0.1",
    label: "Prototipo inicial — Fundación del proyecto",
    dateRange: "8 – 25 de abril de 2026",
    entries: [
      {
        id: "e-043",
        date: "2026-04-25",
        category: "security",
        title:
          "Construcción de modo de seguridad y remediación de auditoría clínica",
        description:
          "Se implementó un modo de construcción (construction mode) para bloquear sub-páginas en producción. Se aplicaron las correcciones de la primera auditoría de seguridad, SEO y accesibilidad.",
        commit: "43dba41",
      },
      {
        id: "e-044",
        date: "2026-04-24",
        category: "feat",
        title: "Flujo de onboarding con modal y persistencia en localStorage",
        description:
          "Se implementó el lobby modal de bienvenida con apertura retardada, persistencia en localStorage, countdown de inactividad y hint de flecha. El storefront se fusionó en la ruta raíz.",
        commit: "42d6439",
      },
      {
        id: "e-045",
        date: "2026-04-23",
        category: "feat",
        title: "Infraestructura: Supabase, Server Actions y esquemas Zod",
        description:
          "Se configuró Supabase para base de datos y autenticación. Se implementaron los primeros Server Actions envueltos con next-safe-action y validados con esquemas Zod en src/schemas/.",
        commit: "698e263",
        note: "Decisión arquitectónica registrada en ARCHITECTURE.md: Patrón Server Actions con Zod y next-safe-action.",
      },
      {
        id: "e-046",
        date: "2026-04-23",
        category: "feat",
        title: "Prototipo UI inicial con routing resuelto",
        description:
          "Primera versión del prototipo de interfaz de usuario con el sistema de rutas del App Router de Next.js configurado y conflictos de routing resueltos.",
        commit: "ea57f83",
      },
      {
        id: "e-047",
        date: "2026-04-08",
        category: "chore",
        title: "Creación de la estructura y arquitectura del proyecto",
        description:
          "Se estableció la arquitectura completa del repositorio: Next.js 15 App Router, TypeScript estricto, Tailwind CSS, Shadcn/UI, Vitest, Commitlint con Conventional Commits, ESLint, Prettier y Husky. Se definieron las carpetas src/app, src/components, src/lib, src/config, src/schemas y src/actions como pilares de la organización del código.",
        commit: "8dfeec9",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function UpdatesPageClient() {
  const [activeFilters, setActiveFilters] = useState<Set<ChangeCategory>>(
    new Set()
  );
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleIds((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.08 }
    );

    const cards = document.querySelectorAll("[data-timeline-entry]");
    cards.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, [activeFilters]);

  const toggleFilter = (cat: ChangeCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  const filtered = CHANGELOG.map((group) => ({
    ...group,
    entries: group.entries.filter(
      (e) => activeFilters.size === 0 || activeFilters.has(e.category)
    ),
  })).filter((g) => g.entries.length > 0);

  const totalEntries = CHANGELOG.reduce((acc, g) => acc + g.entries.length, 0);
  const filteredCount = filtered.reduce((acc, g) => acc + g.entries.length, 0);

  return (
    <main
      id="updates-main"
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-on-surface)",
      }}
    >
      {/* Skip to content */}
      <a
        href="#timeline"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-blue-900 focus:shadow-lg focus:outline-2"
      >
        Saltar al historial
      </a>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <header
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary) 0%, #0d2550 60%, #1a3a6e 100%)",
        }}
      >
        {/* Background decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
        >
          <div
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full opacity-10"
            style={{ border: "60px solid #fff" }}
          />
          <div
            className="absolute -bottom-16 -left-16 h-72 w-72 rounded-full opacity-5"
            style={{ border: "40px solid #fff" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Migas de pan" className="mb-6">
            <ol
              className="flex items-center gap-2 text-sm"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <li>
                <Link
                  href="/"
                  className="underline-offset-4 transition-colors duration-150 hover:text-white hover:underline"
                >
                  Confecciones Liss
                </Link>
              </li>
              <li aria-hidden="true" className="text-white/40">
                ›
              </li>
              <li aria-current="page" className="font-medium text-white">
                Updates
              </li>
            </ol>
          </nav>

          {/* Title */}
          <h1
            className="mb-4 text-3xl leading-tight font-bold text-white sm:text-4xl lg:text-5xl"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Historial de cambios
          </h1>
          <p
            className="max-w-2xl text-lg leading-relaxed sm:text-xl"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Registro público de todas las mejoras, correcciones y decisiones
            técnicas del sitio.{" "}
            <strong className="text-white">
              {totalEntries} cambios documentados
            </strong>{" "}
            desde el primer commit.
          </p>

          {/* Stats row */}
          <div className="mt-8 flex flex-wrap gap-4">
            {[
              { label: "Versiones", value: CHANGELOG.length },
              { label: "Commits", value: "80+" },
              { label: "Desde", value: "Abr 2026" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl px-5 py-3 text-center"
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <div className="text-2xl font-bold text-white">{s.value}</div>
                <div
                  className="mt-0.5 text-xs"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── FILTER BAR ─────────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{
          backgroundColor: "var(--color-surface)",
          borderColor: "var(--color-outline-variant)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 lg:px-8">
          <div
            className="scrollbar-hide flex items-center gap-2 overflow-x-auto"
            role="group"
            aria-label="Filtrar por categoría"
          >
            <span
              className="mr-1 shrink-0 text-xs font-semibold tracking-widest uppercase"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Filtrar:
            </span>

            {activeFilters.size > 0 && (
              <button
                onClick={clearFilters}
                className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                }}
                aria-label="Limpiar todos los filtros"
              >
                ✕ Limpiar ({filteredCount}/{totalEntries})
              </button>
            )}

            {ALL_CATEGORIES.map((cat) => {
              const b = BADGE[cat];
              const isActive = activeFilters.has(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleFilter(cat)}
                  aria-pressed={isActive}
                  className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-95"
                  style={{
                    background: isActive ? b.bg : "transparent",
                    color: isActive
                      ? b.color
                      : "var(--color-on-surface-variant)",
                    borderColor: isActive
                      ? b.bg
                      : "var(--color-outline-variant)",
                    boxShadow: isActive ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                  }}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ───────────────────────────────────────────────────────── */}
      <div
        className="mx-auto max-w-4xl px-4 py-10 pb-24 sm:px-6 lg:px-8"
        id="timeline"
      >
        {filtered.length === 0 && (
          <div
            className="rounded-2xl py-20 text-center"
            style={{ background: "var(--color-surface-container-low)" }}
          >
            <p
              className="text-lg font-medium"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Sin resultados para los filtros seleccionados.
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 rounded-full px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              style={{ background: "var(--color-primary)" }}
            >
              Ver todos los cambios
            </button>
          </div>
        )}

        {filtered.map((group, gi) => (
          <section
            key={group.version}
            aria-labelledby={`version-${group.version}`}
            className="mb-14"
          >
            {/* Version header */}
            <div className="mb-6 flex items-center gap-4">
              <div
                className="shrink-0 rounded-full px-4 py-1.5 text-sm font-bold"
                style={{
                  background: "var(--color-primary)",
                  color: "#fff",
                  fontFamily: "var(--font-body)",
                }}
              >
                {group.version}
              </div>
              <div>
                <h2
                  id={`version-${group.version}`}
                  className="text-lg leading-tight font-semibold"
                  style={{
                    color: "var(--color-on-surface)",
                    fontFamily: "var(--font-headline)",
                  }}
                >
                  {group.label}
                </h2>
                <p
                  className="mt-0.5 text-xs"
                  style={{ color: "var(--color-on-surface-variant)" }}
                >
                  {group.dateRange}
                </p>
              </div>
            </div>

            {/* Entries list */}
            <ol
              className="relative"
              style={{ listStyle: "none", padding: 0, margin: 0 }}
            >
              {/* Vertical line */}
              <li
                aria-hidden="true"
                className="absolute top-0 bottom-0 left-4 w-px sm:left-5"
                style={{ background: "var(--color-outline-variant)" }}
              />

              {group.entries.map((entry, ei) => {
                const b = BADGE[entry.category];
                const isVisible = visibleIds.has(entry.id);

                return (
                  <li
                    key={entry.id}
                    id={entry.id}
                    data-timeline-entry
                    className="relative mb-5 pl-10 transition-all duration-500 last:mb-0 sm:pl-12"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateY(0)"
                        : "translateY(20px)",
                    }}
                  >
                    {/* Dot */}
                    <div
                      aria-hidden="true"
                      className="absolute top-4 left-2 h-4 w-4 rounded-full border-2 border-white shadow-sm sm:left-2.5"
                      style={{ background: b.bg, borderColor: b.color }}
                    />

                    {/* Card */}
                    <article
                      aria-labelledby={`title-${entry.id}`}
                      className="rounded-xl border p-4 transition-shadow duration-200 hover:shadow-md sm:p-5"
                      style={{
                        background: "var(--color-surface-container-lowest)",
                        borderColor: "var(--color-outline-variant)",
                      }}
                    >
                      {/* Meta row */}
                      <div className="mb-2 flex flex-wrap items-center gap-2">
                        {/* Category badge */}
                        <span
                          className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                          style={{ background: b.bg, color: b.color }}
                        >
                          {b.label}
                        </span>
                        {/* Date */}
                        <time
                          dateTime={entry.date}
                          className="text-xs"
                          style={{ color: "var(--color-on-surface-variant)" }}
                        >
                          {formatDate(entry.date)}
                        </time>
                        {/* Commit hash */}
                        {entry.commit && (
                          <code
                            className="rounded px-1.5 py-0.5 font-mono text-xs"
                            style={{
                              background: "var(--color-surface-container)",
                              color: "var(--color-on-surface-variant)",
                            }}
                          >
                            {entry.commit}
                          </code>
                        )}
                      </div>

                      {/* Title */}
                      <h3
                        id={`title-${entry.id}`}
                        className="mb-1.5 text-base leading-snug font-semibold"
                        style={{
                          color: "var(--color-on-surface)",
                          fontFamily: "var(--font-headline)",
                        }}
                      >
                        {entry.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        {entry.description}
                      </p>

                      {/* Clarification note */}
                      {entry.note && (
                        <div
                          className="mt-3 rounded-lg border-l-2 px-3 py-2 text-xs leading-relaxed"
                          style={{
                            background: "var(--color-surface-container-low)",
                            color: "var(--color-on-surface-variant)",
                            borderColor: "var(--color-outline)",
                          }}
                        >
                          <span
                            className="font-semibold"
                            style={{ color: "var(--color-on-surface)" }}
                          >
                            Nota:
                          </span>{" "}
                          {entry.note}
                        </div>
                      )}
                    </article>
                  </li>
                );
              })}
            </ol>
          </section>
        ))}

        {/* Bottom note */}
        {filtered.length > 0 && (
          <div
            className="border-t pt-6 pb-2 text-center"
            style={{ borderColor: "var(--color-outline-variant)" }}
          >
            <p
              className="text-sm"
              style={{ color: "var(--color-on-surface-variant)" }}
            >
              Mostrando{" "}
              <strong style={{ color: "var(--color-on-surface)" }}>
                {filteredCount}
              </strong>{" "}
              de{" "}
              <strong style={{ color: "var(--color-on-surface)" }}>
                {totalEntries}
              </strong>{" "}
              entradas · Orden cronológico inverso (más reciente primero)
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
