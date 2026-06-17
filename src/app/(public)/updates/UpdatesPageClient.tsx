"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

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
    version: "v1.1",
    label: "SEO Avanzado · Consolidación de Schemas · Lector Legal Responsivo",
    dateRange: "17 de junio de 2026",
    entries: [
      {
        id: "e-119",
        date: "2026-06-17",
        category: "seo",
        title: "Nueva descripción home con universidades (IEPROES, UES, UMA…)",
        description:
          "Se actualizó la meta-description de la página de inicio a exactamente 150 caracteres, integrando el listado completo de universidades atendidas: IEPROES, UNIVO, UNAB, UGB, UES, UMA y más. Se actualizaron en paralelo los keywords de site.ts y los arrays de universidades en seo-data.ts y schemas.ts para mantener coherencia total.",
        commit: "21591b5",
        note: "Agrupa también commit a06d164 (auditoría y sincronización de todos los metadatos y schemas).",
      },
      {
        id: "e-120",
        date: "2026-06-17",
        category: "refactor",
        title: "Consolidación JSON-LD en patrón @graph global por página",
        description:
          "Se reestructuró la arquitectura de schemas JSON-LD siguiendo las guías oficiales de Google Search Central. Se eliminó la duplicidad de LocalBusiness/ClothingStore que existía simultáneamente en layout.tsx, home/page.tsx y contacto/page.tsx. Se estableció un único @graph global en layout.tsx con ClothingStore + WebSite (habilita Google Sitelinks). Cada página ahora emite solo sus schemas específicos: WebPage, BreadcrumbList, FAQPage, ContactPage, etc. Se crearon los helpers buildWebPageSchema() y buildBreadcrumbSchema() en schemas.ts para uso consistente en todo el proyecto.",
        commit: "cd48b80",
        note: "Agrupa también commit a06d164 (schemas sync). Elimina ~230 líneas de código duplicado.",
      },
      {
        id: "e-121",
        date: "2026-06-17",
        category: "style",
        title:
          "Lector legal responsivo: modal en desktop, página directa en móvil",
        description:
          "Se rediseñó LegalArticleReader.tsx para ofrecer dos experiencias distintas según el dispositivo. En desktop (lg+) se conserva el lector modal con overlay oscuro, reduciendo el padding vertical en un 75% (de 20px a 5px) y agregando migas de pan en la misma posición que todas las demás páginas. En móvil y tablet (< lg) se elimina el overlay y se renderiza el contenido directamente como una página normal con: barra de navegación superior sticky (botón de regreso + título + enlace 'Ver todos'), migas de pan, y estructura semántica completa article > header + sections. Se agregaron también schemas JSON-LD Article + BreadcrumbList en las páginas de privacidad y términos.",
        note: "Commit de esta sesión, incluye cambios en 5 archivos.",
      },
      {
        id: "e-122",
        date: "2026-06-17",
        category: "fix",
        title:
          "Lector legal desktop: reducción correcta del espacio externo vertical",
        description:
          "Se corrigió la implementación errónea del pedido anterior: el ajuste del 75% debía reducir el gap EXTERNO (entre la pantalla y el paper), no el padding interno. Se cambió maxHeight de 92vh a 98vh (gap externo: 4vh → 1vh cada lado), se restauró el padding interno a 20px 40px y se eliminó la barra de navegación móvil residual. El layout móvil ahora va directamente de div.lg:hidden al article con migas de pan.",
        commit: "643c231",
        note: "Corrección de regresión introducida en e-121. Solo afecta LegalArticleReader.tsx.",
      },
      {
        id: "e-123",
        date: "2026-06-17",
        category: "fix",
        title:
          "Migas de pan sin página actual · Numeración romana en secciones",
        description:
          "Las migas de pan ahora muestran solo el camino hasta el padre (Inicio › Legal), sin incluir la página actual. Los BreadcrumbList JSON-LD conservan los 3 niveles para SEO. Se reemplazaron los números arábigos por romanos (I–XVII) y se corrigió la alineación del badge: height cambiado de 2rem a 1.35em (= lineHeight del h2) para alineación perfecta independientemente del wrapping del título.",
        commit: "2803f08",
        note: "Afecta LegalContent.tsx y LegalArticleReader.tsx.",
      },
      {
        id: "e-124",
        date: "2026-06-17",
        category: "chore",
        title: "Términos: eliminación de secciones de precios y pagos",
        description:
          "Se eliminaron las Secciones 4 ('Precios, disponibilidad y naturaleza informativa del catálogo') y 5 ('Pagos y modalidades de pago') en preparación para una política exclusiva de pagos. Se limpiaron referencias a precios/pagos en las Secciones 2 y 11. Las secciones 6–17 se renumeraron a 4–15. La meta-description se actualizó a 150 caracteres. El tiempo de lectura se ajustó de 18 a 16 minutos.",
        commit: "pendiente",
        note: "Afecta únicamente terminos/page.tsx.",
      },
      {
        id: "e-125",
        date: "2026-06-17",
        category: "fix",
        title: "Botón cerrar: márgenes simétricos en esquina superior derecha",
        description:
          "El botón X de cierre tenía margen insuficiente respecto al texto y margen superior asimétrico. Cambios: top-2.5 → top-2 (8px, coincide con el gap ~8px al scrollbar), eliminado -mt-1, agregado ml-3 (12px de separación entre botón y texto adyacente), eliminado sm:-mr-10 que posicionaba el botón sobre el scrollbar.",
        commit: "d4945a5",
        note: "Agrupa también e-124 (eliminación secciones precios/pagos terminos).",
      },
      {
        id: "e-126",
        date: "2026-06-17",
        category: "fix",
        title: "Numeración romana: corrección de altura del badge (em→rem)",
        description:
          "Raíz del bug: height:'1.35em' se resolvía relativo al fontSize del propio badge (0.7rem), dando 0.945rem, mucho menor que el lineHeight del h2 (1.485rem). El centro del badge quedaba 0.27rem por encima del centro de la primera línea del título. Fix: height cambiado a '1.485rem' (valor explícito = 1.35 × fontSize del h2 1.1rem), eliminando toda ambigüedad de contexto em. Aplica en todas las versiones (desktop, tablet, móvil). Solo afecta LegalContent.tsx.",
        commit: "pendiente",
        note: "Fix definitivo de alineación badge. Sin impacto en ninguna otra página.",
      },
      {
        id: "e-127",
        date: "2026-06-17",
        category: "style",
        title:
          "Lector móvil/tablet: header centrado (pildora, h1, fecha, tiempo)",
        description:
          "En la vista de lectura móvil/tablet, el header del artículo legal (pildora de categoría 'Documentos Legales', h1 título, fecha y tiempo de lectura) estaba alineado a la izquierda. Se añadió text-center al header y justify-center al flex de fecha/tiempo. El cambio está estrictamente dentro del bloque lg:hidden y no afecta el layout desktop que ya tenía centrado el header. Solo afecta LegalArticleReader.tsx.",
        commit: "pendiente",
        note: "Sin impacto en ninguna otra página ni sección.",
      },
      {
        id: "e-128",
        date: "2026-06-17",
        category: "fix",
        title:
          "Lector tablet: márgenes laterales igualados al estándar de la app",
        description:
          "En tablet (sm–lg), el article de lectura legal tenía max-w-2xl centrado, generando márgenes de hasta 48–176px por lado versus el estándar de 20–32px del resto de la app. Fix: se agregó sm:max-w-none sm:px-5 md:px-8 para suprimir la restricción de ancho solo en tablet y aplicar el padding estándar. El comportamiento móvil (<640px) y desktop (>lg) no cambia. Solo afecta LegalArticleReader.tsx.",
        commit: "pendiente",
        note: "Sin impacto en ninguna otra página ni sección.",
      },
      {
        id: "e-129",
        date: "2026-06-17",
        category: "fix",
        title:
          "Botón cerrar desktop: solución definitiva con layout flex-column",
        description:
          "Root cause: float:right + position:sticky son incompatibles. Al activarse sticky, el elemento pierde el efecto float, causando que el texto se renderice encima del botón. Solución: el papel del lector desktop se reestructuró como display:flex; flex-direction:column. Una franja superior no-scrolleable contiene el botón con padding:'12px 12px 0' (12px desde el borde superior Y 12px desde el borde derecho del papel, simétrico). El cuerpo con overflow-y:auto ocupa el flex:1 restante. El botón nunca más toca el texto. Se eliminaron float-right, sticky, -mr-8, ml-3 del botón. Solo afecta LegalArticleReader.tsx.",
        commit: "pendiente",
        note: "Solución definitiva. Elimina 4 iteraciones previas de parches sobre el mismo bug.",
      },
    ],
  },
  {
    version: "v1.0",
    label:
      "Integración de Animaciones · Grid de Novedades · Ajuste de Imágenes",
    dateRange: "13 – 14 de junio de 2026",
    entries: [
      {
        id: "e-109",
        date: "2026-06-13",
        category: "style",
        title: "Integración de animaciones fadeInUp y retrasos de carga",
        description:
          "Se añadieron animaciones de entrada fadeInUp con retrasos progresivos en los elementos principales de las páginas de Inicio, Contacto, Carrito, Mi Cuenta, Enlaces y componentes SEO.",
      },
      {
        id: "e-110",
        date: "2026-06-13",
        category: "style",
        title: "Feedback táctil active:scale en botones y tarjetas",
        description:
          "Se añadieron clases CSS de active:scale-95 y active:scale-[0.97] para dar respuesta visual al presionar botones, enlaces y tarjetas de productos.",
      },
      {
        id: "e-111",
        date: "2026-06-13",
        category: "style",
        title: "Homologación del grid de novedades y unificación de tarjetas",
        description:
          "Se modificó la sección de Novedades de la página de Inicio para adoptar el mismo sistema de cuadrícula responsivo de 2 a 5 columnas y los mismos márgenes y espaciados que la sección de recomendados del detalle de producto. Se migró el listado para utilizar CatalogProductCard, eliminando la antigua versión redundante ProductCard.tsx.",
      },
      {
        id: "e-112",
        date: "2026-06-13",
        category: "style",
        title:
          "Ajuste de imágenes a pantalla completa en tarjetas (object-cover)",
        description:
          "Se cambió el escalado de imagen de las tarjetas de productos de object-contain a object-cover a nivel global. De esta forma, las fotos llenan completamente el contenedor cuadrado disponible en cualquier vista o página, suprimiendo los márgenes y vacíos blancos laterales.",
      },
      {
        id: "e-113",
        date: "2026-06-13",
        category: "fix",
        title: "Resolución de error de compilación en la página de Contacto",
        description:
          "Se corrigió un fallo de tipo TypeScript ('Cannot find name ch') originado por una condición ternaria incorrecta en el mapeo de los canales de información en contacto/page.tsx.",
      },
      {
        id: "e-118",
        date: "2026-06-13",
        category: "fix",
        title: "Corrección de salto de línea en el toast de confirmación",
        description:
          "Se agregó la propiedad CSS 'white-space: nowrap' al contenedor de notificaciones en ShareButton y ProductDetailClient para evitar saltos de línea y garantizar la presentación en una sola línea de la confirmación de copia del enlace.",
      },
    ],
  },
  {
    version: "v0.9.5",
    label:
      "Lanzamiento de Catálogo Completo · Filtros Multi-Select · Vista de Detalle",
    dateRange: "12 – 13 de junio de 2026",
    entries: [
      {
        id: "e-114",
        date: "2026-06-13",
        category: "feat",
        title: "Estructura del catálogo y vista de detalle de producto",
        description:
          "Se crearon las páginas del catálogo (/catalogo, /catalogo/[sector]) y la vista detallada del producto (/catalogo/[sector]/[id]). Se implementó la galería de imágenes interactiva en proporción 4:5, el panel de personalización de compra (talla, color, bordado y cantidad) y la integración de envío de pedido directo a WhatsApp. Se añadió una sección de productos relacionados que muestra hasta 5 tarjetas en pantallas grandes.",
        commit: "48f02d0",
        note: "Agrupa commits 48f02d0, 8de00fd, 2344a7a, 353c919 y 06ae62f.",
      },
      {
        id: "e-115",
        date: "2026-06-13",
        category: "feat",
        title:
          "Filtros con soporte multi-select y menú de ordenamiento personalizado",
        description:
          "Se implementó un sistema de filtrado con soporte para selección múltiple en el panel lateral (FilterSidebar) y en el panel desplegable móvil (MobileFilterDrawer). Se integraron opciones de combinación lógica de filtros, un botón para limpiar selecciones y la opción unificada de filtro 'Todos'. Asimismo, se reemplazó el selector de ordenamiento nativo por un menú desplegable personalizado para ordenar por precio y nombre.",
        commit: "f3eabb1",
        note: "Agrupa commits f3eabb1, f09009b, e38a9b1 y 887ed4b.",
      },
      {
        id: "e-116",
        date: "2026-06-13",
        category: "style",
        title:
          "Ajuste de relaciones de aspecto y alineación de galería en catálogo",
        description:
          "Se optimizaron los anchos y espaciados de las miniaturas en la galería del detalle de producto. Se implementó una fórmula de proporción de columnas para alinear la altura de la galería con la información del producto y se eliminó la restricción de altura máxima en las miniaturas.",
        commit: "b17a382",
        note: "Agrupa commits b17a382, ff25ea8, be2a259, d8639e9 y ee7cecd.",
      },
      {
        id: "e-117",
        date: "2026-06-12",
        category: "chore",
        title: "Eliminación de rutas inactivas y componentes obsoletos",
        description:
          "Se removieron las antiguas subrutas y componentes estáticos de filtros del catálogo y servicios que quedaron sin uso tras la reestructuración. Se vació la lista global de productos para prepararla para la base de datos de producción y se unificó la alineación móvil de la cabecera en Contacto.",
        commit: "9e98e0d",
        note: "Agrupa commits 9e98e0d, fa50fa7, 931cc26 y cdfa4cc.",
      },
    ],
  },
  {
    version: "v0.9",
    label: "Página de Updates · Rediseño 404 · Refinamiento Servicios",
    dateRange: "10 – 12 de junio de 2026",
    entries: [
      {
        id: "e-108",
        date: "2026-06-12",
        category: "chore",
        title: "Lanzamiento oficial a producción (v0.9)",
        description:
          "Publicación oficial en el dominio principal de Confecciones Liss. Se habilitaron las páginas de Inicio, Contacto, Enlaces (/links) y la nueva sección de Novedades (/updates). Las páginas de Catálogo y Servicios se configuraron como inactivas (redirección a la Home) mediante el proxy middleware para esta fase.",
        commit: "4a4d426",
      },
      {
        id: "e-100",
        date: "2026-06-12",
        category: "seo",
        title: "Corrección de la página 404 para Google Search Console",
        description:
          "Se convirtió not-found.tsx de Client Component a Server Component para permitir la exportación de metadata SEO. Anteriormente, GSC reportaba que la página 404 no se encontraba porque Next.js emitía HTTP 200 (en vez de 404) y no incluía meta tags. Se agregó metadata con título y robots, se actualizaron canonicals autorreferenciadas en todas las páginas, y se bloquearon rutas inactivas en robots.txt y sitemap.",
        commit: "4a4d426",
      },
      {
        id: "e-101",
        date: "2026-06-10",
        category: "feat",
        title: "Página de Updates y componente ShareButton",
        description:
          "Se implementó la página pública /updates con un timeline interactivo que documenta todos los cambios del proyecto. Se creó el componente ShareButton reutilizable para compartir páginas por WhatsApp, copiar enlace, y redes sociales.",
        commit: "4e41089",
      },
      {
        id: "e-102",
        date: "2026-06-10",
        category: "fix",
        title: "Homologación de breadcrumbs y estandarización de márgenes",
        description:
          "Se unificaron los breadcrumbs en todas las páginas con el mismo diseño y animación. Se estandarizaron los márgenes laterales a px-8 en desktop y se restauró el layout de la página de updates.",
        commit: "2c4e630",
        note: "Este commit agrupa correcciones de e23248c (márgenes) y 2c4e630 (breadcrumbs y animación ShareButton).",
      },
      {
        id: "e-103",
        date: "2026-06-11",
        category: "style",
        title: "Unificación visual de tarjetas de servicios con catálogo",
        description:
          "Las tarjetas de la página /servicios ahora comparten el mismo sistema de cuadrícula responsive que el catálogo: grid de 1 columna en móvil, 2 en ≥480px, 3 en tablet y 4 en desktop. Se añadió el indicador de navegación siempre visible y se cambió el fondo del banner a blanco.",
        commit: "61d2676",
        note: "Agrupa commits 61d2676, b86c90f y 00166da.",
      },
      {
        id: "e-104",
        date: "2026-06-11",
        category: "style",
        title: "Simplificación de tarjetas de servicios — menos es más",
        description:
          "Se eliminó la tarjeta CTA de proyecto especial, el botón de 'leer más' de cada tarjeta, y se ajustaron las descripciones a exactamente 132 caracteres. Se redujo el tamaño de las imágenes con aspect-ratio 2:1 y se comprimió la altura de la cabecera de las tarjetas.",
        commit: "0535439",
        note: "Agrupa commits 0535439, 14420d6, d3df668, 4a83c6b y ed93689.",
      },
      {
        id: "e-105",
        date: "2026-06-11",
        category: "style",
        title: "Actualización de fotos y bordes de contraste en servicios",
        description:
          "Se reemplazaron las fotos de las tarjetas de servicios con imágenes más representativas y se añadió un borde de contraste negro. El overlay de servicios se cambió a tono azul y se restauró el contorno decorativo del 404.",
        commit: "1ee9bfc",
        note: "Agrupa commits 1ee9bfc y ca96ad9.",
      },
      {
        id: "e-106",
        date: "2026-06-12",
        category: "style",
        title: "Rediseño completo de la página 404",
        description:
          "Se rediseñó la página 404 desde cero: números outline gigantes centrados con el título, layout responsivo side-by-side en desktop, eliminación del botón de inicio para un diseño minimalista, altura fija de 100dvh-56px y contraste mejorado. Se homologaron header y footer con el resto del sitio.",
        commit: "fbe08cd",
        note: "Agrupa commits fbe08cd, 40b5494, d967772, 244d423, 6ced7fb y 81ddb8b. Se iteraron 6 versiones del diseño.",
      },
      {
        id: "e-107",
        date: "2026-06-10",
        category: "style",
        title: "Indicador de navegación siempre visible en tarjetas",
        description:
          "Los indicadores visuales de navegación (flechas e íconos de enlace) en las tarjetas de catálogo y servicios ahora son siempre visibles en vez de aparecer solo al hacer hover, mejorando la affordance en móvil.",
        commit: "b86c90f",
      },
    ],
  },
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
          "Se portó la geometría de curva del notch del proyecto de referencia 'susonthapa'. Se añadió la burbuja blanca FAB y la página /mi-cuenta como destino.",
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
          "Se implementó un MobileBottomNav con forma SVG curva en la parte inferior, notch central para el botón de acción flotante y una burbuja indicadora de pestaña activa con animación de deslizamiento entre los tabs.",
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
        title: "Botón de menú rediseñado en desktop y mobile",
        description:
          "Se rediseñó el control de navegación con animación en la transición de icono y etiqueta de texto en el Navbar.",
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
        id: "e-033",
        date: "2026-06-08",
        category: "chore",
        title: "Primer despliegue a producción (v0.6)",
        description:
          "Se realizó la puesta en producción inicial del sitio web en el dominio oficial con el modo HOME_ONLY_MODE activo, restringiendo el acceso de los usuarios a las sub-páginas en desarrollo y permitiendo solo la visualización de la landing de Inicio.",
        commit: "db33241",
      },
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
    const rafId = requestAnimationFrame(() => {
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
    });

    return () => {
      cancelAnimationFrame(rafId);
      observerRef.current?.disconnect();
    };
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

      {/* ── HEADER ── */}
      <section className="bg-surface px-5 pt-6 pb-0 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[{ label: "Inicio", href: "/" }, { label: "Updates" }]}
            className="animate-fade-in-up mb-6"
          />

          {/* Title */}
          <h1
            className="animate-fade-in-up text-primary mb-3 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-headline)",
              animationDelay: "100ms",
            }}
          >
            Historial de cambios
          </h1>
          {/* Static intro — mirrors meta description so Google uses it as snippet */}
          <p
            className="animate-fade-in-up mb-1 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            Registro público de mejoras, correcciones y nuevas funcionalidades
            del sitio de Confecciones Liss. Transparencia total del proyecto.
          </p>
          <p
            className="animate-fade-in-up max-w-2xl text-sm leading-relaxed text-gray-400"
            style={{ animationDelay: "200ms" }}
          >
            <strong className="text-gray-800">{totalEntries} cambios</strong>{" "}
            documentados desde el primer commit.
          </p>
        </div>
      </section>

      {/* ── CONTENT BODY ── */}
      <section className="bg-surface px-5 pt-12 pb-20 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* 📌 LEFT SIDEBAR (Stats + Filters) 📌 */}
            <aside className="w-full shrink-0 lg:sticky lg:top-20 lg:w-72 lg:self-start xl:w-80">
              {/* Stats Card */}
              <div
                className="animate-fade-in-up mb-6 rounded-2xl border p-5"
                style={{
                  background: "var(--color-surface-container-low)",
                  borderColor: "var(--color-outline-variant)",
                  animationDelay: "300ms",
                }}
              >
                <h3
                  className="mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Resumen del proyecto
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Versiones",
                      value: CHANGELOG.length,
                      icon: "rocket_launch",
                      colorClass:
                        "bg-[#143067]/5 text-[#143067] border-[#143067]/10",
                    },
                    {
                      label: "Commits",
                      value: "160+",
                      icon: "terminal",
                      colorClass:
                        "bg-[#143067]/5 text-[#143067] border-[#143067]/10",
                    },
                    {
                      label: "Desde",
                      value: "Abr 2026",
                      icon: "calendar_today",
                      colorClass:
                        "bg-[#b43024]/5 text-[#b43024] border-[#b43024]/10",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white/60 p-3 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background:
                            s.colorClass.split(" ")[0].split("/")[0] ===
                            "bg-[#143067]"
                              ? "rgba(20, 48, 103, 0.05)"
                              : "rgba(180, 48, 36, 0.05)",
                        }}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] ${s.colorClass.split(" ")[1]}`}
                          aria-hidden="true"
                        >
                          {s.icon}
                        </span>
                      </div>
                      <div>
                        <div
                          className="text-lg leading-none font-bold text-gray-800"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {s.value}
                        </div>
                        <div className="text-gray-505 mt-0.5 text-xs font-semibold">
                          {s.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters Card */}
              <div
                className="animate-fade-in-up rounded-2xl border p-5"
                style={{
                  background: "var(--color-surface-container-lowest)",
                  borderColor: "var(--color-outline-variant)",
                  animationDelay: "400ms",
                }}
              >
                <h3
                  className="mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Filtrar por categoría
                </h3>

                <div className="flex flex-wrap gap-2">
                  {activeFilters.size > 0 && (
                    <button
                      onClick={clearFilters}
                      className="rounded-full border border-dashed border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-95"
                      aria-label="Limpiar todos los filtros"
                    >
                      ✕ Limpiar ({filteredCount})
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
                        className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: isActive ? b.bg : "transparent",
                          color: isActive
                            ? b.color
                            : "var(--color-on-surface-variant)",
                          borderColor: isActive
                            ? b.bg
                            : "var(--color-outline-variant)",
                          boxShadow: isActive
                            ? "0 1px 4px rgba(0,0,0,0.12)"
                            : "none",
                        }}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ── TIMELINE COLUMN ── */}
            <div className="flex-1" id="timeline">
              {filtered.length === 0 && (
                <div
                  className="rounded-2xl border py-20 text-center"
                  style={{
                    background: "var(--color-surface-container-low)",
                    borderColor: "var(--color-outline-variant)",
                  }}
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
                  className="mb-14 last:mb-0"
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
                              background:
                                "var(--color-surface-container-lowest)",
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
                                style={{
                                  color: "var(--color-on-surface-variant)",
                                }}
                              >
                                {formatDate(entry.date)}
                              </time>
                              {/* Commit hash */}
                              {entry.commit && (
                                <code
                                  className="rounded px-1.5 py-0.5 font-mono text-xs"
                                  style={{
                                    background:
                                      "var(--color-surface-container)",
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
                              style={{
                                color: "var(--color-on-surface-variant)",
                              }}
                            >
                              {entry.description}
                            </p>

                            {/* Clarification note */}
                            {entry.note && (
                              <div
                                className="mt-3 rounded-lg border-l-2 px-3 py-2 text-xs leading-relaxed"
                                style={{
                                  background:
                                    "var(--color-surface-container-low)",
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
          </div>
        </div>
      </section>
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
