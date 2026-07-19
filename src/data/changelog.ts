// ─────────────────────────────────────────────────────────────────────────────
// CHANGELOG DATA — src/data/changelog.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fuente única de verdad del historial de cambios públicos del proyecto.
// Importado en updates/page.tsx (Server Component) y pasado como prop a
// UpdatesPageClient para garantizar SSG real — Google indexa el HTML completo.
//
// ⚠ REGLA DE CONTENIDO — LEER ANTES DE AGREGAR ENTRADAS:
// Este changelog es público, indexado por Google, y accesible para cualquier
// visitante. Las descripciones deben ser generales, limpias y enfocadas en la
// funcionalidad y experiencia de usuario.
// ─────────────────────────────────────────────────────────────────────────────

export type ChangeCategory =
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

export interface ChangeEntry {
  id: string;
  date: string; // ISO "YYYY-MM-DD"
  category: ChangeCategory;
  title: string;
  description: string;
  commit?: string;
  note?: string;
}

export interface VersionGroup {
  version: string;
  label: string;
  dateRange: string;
  entries: ChangeEntry[];
}

export const CHANGELOG: VersionGroup[] = [
  {
    version: "v1.4.2",
    label:
      "Optimización de Datos de Entrega · Bloqueo de Desplazamiento en Modales",
    dateRange: "19 de julio de 2026",
    entries: [
      {
        id: "e-165",
        date: "2026-07-19",
        category: "fix",
        title: "Optimización lógica de la animación de tarifas",
        description:
          "Se ajustó el comportamiento de la animación de cálculo de tarifa de envío a domicilio para que no se dispare de forma prematura ni ilógica antes de seleccionar un departamento de destino.",
      },
      {
        id: "e-166",
        date: "2026-07-19",
        category: "fix",
        title: "Actualización de advertencia de variación de precios",
        description:
          "Se modificó el texto de advertencia sobre la vigencia de precios para mayor claridad y seriedad: 'Los precios se actualizan periódicamente. En caso de alguna variación, confirmaremos el precio antes de procesar tu pedido.'",
      },
      {
        id: "e-167",
        date: "2026-07-19",
        category: "a11y",
        title: "Bloqueo de scroll detrás de modales abiertos",
        description:
          "Se integró el hook useBodyScrollLock en los modales de visualización de imágenes, formularios de entrega y diálogos de confirmación del panel de administración para evitar el desplazamiento no deseado del fondo al interactuar con ellos.",
      },
      {
        id: "e-168",
        date: "2026-07-19",
        category: "style",
        title: "Método de entrega sin selección por defecto",
        description:
          "Se configuró el modal de entrega del carrito para que se inicie sin ningún método de entrega preseleccionado por defecto, alineándose con el comportamiento del flujo de compra directa.",
      },
    ],
  },
  {
    version: "v1.4.1",
    label:
      "Rendimiento Móvil PageSpeed 95+ · Carga Paralela · HTTP Link Preload",
    dateRange: "14 de julio de 2026",
    entries: [
      {
        id: "e-160",
        date: "2026-07-14",
        category: "perf",
        title:
          "Optimización integral de carga y renderizado móvil (PageSpeed 95+)",
        description:
          "Se resolvió la variabilidad en los análisis de rendimiento móvil retrasando el procesamiento de eventos interactivos no críticos y eliminando llamadas redundantes en el hilo principal.",
      },
      {
        id: "e-161",
        date: "2026-07-14",
        category: "perf",
        title:
          "Paralelización de consultas asíncronas en el servidor (TTFB mínimo)",
        description:
          "Se optimizó la obtención de datos en la página de inicio agrupando las consultas a la base de datos de productos destacados y las reseñas de clientes a través de solicitudes concurrentes, reduciendo el tiempo de respuesta inicial del servidor (TTFB) a solo 10ms.",
      },
      {
        id: "e-162",
        date: "2026-07-14",
        category: "perf",
        title: "Montaje perezoso y asíncrono para el carrusel de imágenes",
        description:
          "Se rediseñó el carrusel del Hero para posponer su inicialización y carga de imágenes secundarias hasta que se detecte una interacción directa (hover o toque) por parte del usuario, evitando transferencias innecesarias de datos al cargar la página.",
      },
      {
        id: "e-163",
        date: "2026-07-14",
        category: "perf",
        title: "Remoción de dependencias CSS estáticas bloqueantes",
        description:
          "Se retiró la hoja de estilos sintonizada para pre-hidratación de esqueletos de carga que bloqueaba el renderizado inicial, migrando todo el estilo de carga a transiciones fluidas de Tailwind CSS nativas.",
      },
      {
        id: "e-164",
        date: "2026-07-14",
        category: "perf",
        title: "Precarga acelerada por cabeceras HTTP Link",
        description:
          "Se configuró el servidor para enviar instrucciones de precarga de la imagen de portada móvil en los primeros bytes de la conexión TCP, logrando que el navegador descargue el recurso LCP de inmediato sin esperar a procesar el HTML completo.",
      },
    ],
  },
  {
    version: "v1.4.0",
    label:
      "Imagen Hero SSR · Carga de Contextos Diferida · Reducción de Peso HTML",
    dateRange: "13 de julio de 2026",
    entries: [
      {
        id: "e-155",
        date: "2026-07-13",
        category: "perf",
        title: "Visualización instantánea con imagen hero estática en SSR",
        description:
          "Se incorporó un contenedor de imagen estático optimizado en el servidor para el primer renderizado, asegurando que el contenido principal del Hero se pinte de inmediato en pantalla antes de que el JavaScript de cliente sea descargado.",
      },
      {
        id: "e-156",
        date: "2026-07-13",
        category: "perf",
        title: "Inicialización asíncrona de proveedores de contexto globales",
        description:
          "Se movió la carga de dependencias de conexión a bases de datos y utilidades de alertas visuales fuera del flujo inicial, montándolas después de que la interfaz de usuario se haya renderizado por completo.",
      },
      {
        id: "e-157",
        date: "2026-07-13",
        category: "perf",
        title: "Compresión y reducción de payload HTML de inicio",
        description:
          "Se limitó la entrega de testimonios de Google a las 8 entradas más relevantes y se depuraron campos no utilizados en el catálogo destacado, disminuyendo el peso del HTML de inicio en 66KB para acelerar la velocidad de carga en dispositivos móviles.",
      },
    ],
  },
  {
    version: "v1.3.5",
    label:
      "Caché de Datos ISR · API de Revalidación Bajo Demanda · Seguridad OWASP 360",
    dateRange: "6 – 12 de julio de 2026",
    entries: [
      {
        id: "e-150",
        date: "2026-07-12",
        category: "perf",
        title: "Estrategia avanzada de caché para el catálogo y reseñas",
        description:
          "Se implementó el almacenamiento en caché del servidor mediante etiquetas en las consultas de catálogo y reseñas de Google Maps, minimizando la latencia y la cantidad de lecturas directas a la base de datos.",
      },
      {
        id: "e-151",
        date: "2026-07-12",
        category: "feat",
        title: "API segura de revalidación de caché bajo demanda",
        description:
          "Se creó un endpoint de revalidación seguro en la ruta `/api/revalidate` que permite forzar la actualización selectiva de páginas específicas (como portada y catálogo) en los servidores del CDN de forma instantánea al actualizar el inventario.",
      },
      {
        id: "e-152",
        date: "2026-07-06",
        category: "seo",
        title:
          "Metadata de servidor y datos estructurados para el Hub de Universidades",
        description:
          "Se integraron descripciones automáticas, títulos de búsqueda amigables y esquemas estructurados de catalogación en las secciones de uniformes universitarios para mejorar el posicionamiento en buscadores.",
      },
      {
        id: "e-153",
        date: "2026-07-05",
        category: "security",
        title: "Remediación e inmunización de seguridad OWASP de 360 grados",
        description:
          "Se fortalecieron las directivas de seguridad CSP en las cabeceras HTTP, se restringieron accesos en el cargador de imágenes y se limpiaron tokens fallbacks estáticos de la configuración del entorno para garantizar una plataforma robusta.",
      },
    ],
  },
  {
    version: "v1.3.0",
    label:
      "Catálogo Universitario · Multicarreras · Analíticas · Rendimiento LCP",
    dateRange: "4 – 5 de julio de 2026",
    entries: [
      {
        id: "e-140",
        date: "2026-07-05",
        category: "feat",
        title: "Estructura dedicada de catálogo por universidad",
        description:
          "Se lanzó el nuevo centro de exploración universitario con vistas independientes para cada institución educativa (UNIVO, IEPROES, UGB, UNAB, UES, UMA). Permite filtrar scrubs clínicos y uniformes oficiales según los colores y bordados requeridos por cada facultad.",
      },
      {
        id: "e-141",
        date: "2026-07-05",
        category: "feat",
        title: "Soporte para carreras homónimas en múltiples universidades",
        description:
          "Se optimizó la gestión de categorías en el panel de administración, permitiendo crear la misma carrera (como Enfermería, Medicina u Odontología) en diferentes universidades con nombres de catálogo y URLs independientes.",
      },
      {
        id: "e-142",
        date: "2026-07-05",
        category: "perf",
        title:
          "Optimización de velocidad y carga de imágenes principales (LCP)",
        description:
          "Se mejoró la prioridad de carga en las portadas e imágenes superiores del catálogo y fichas de producto. Esto acelera el tiempo de despliegue visual de la página y mejora la velocidad en conexiones móviles.",
      },
      {
        id: "e-143",
        date: "2026-07-05",
        category: "seo",
        title: "Integración de métricas de analítica y píxeles de conversión",
        description:
          "Se habilitó el seguimiento de métricas y rendimiento del sitio para comprender el comportamiento de los visitantes, optimizar la experiencia de navegación y garantizar el cumplimiento de normativas de privacidad.",
      },
      {
        id: "e-144",
        date: "2026-07-05",
        category: "style",
        title: "Galería de portada continua e imágenes institucionales",
        description:
          "Se renovó la secuencia visual del carrusel principal en la página de inicio y se actualizaron las fotografías de las secciones sobre filosofía de trabajo, instalaciones y proceso de confección.",
      },
      {
        id: "e-145",
        date: "2026-07-05",
        category: "fix",
        title: "Estabilidad en componentes de filtrado y paneles de control",
        description:
          "Se corrigió la asignación de identificadores en los selectores desplegables, barras laterales de filtrado y gráficas del panel administrativo para garantizar una navegación fluida.",
      },
    ],
  },
  {
    version: "v1.2.5",
    label: "Páginas de Empresa · Buscador de Ayuda · Rediseño de Cabeceras",
    dateRange: "21 – 29 de junio de 2026",
    entries: [
      {
        id: "e-136",
        date: "2026-06-29",
        category: "feat",
        title:
          "Lanzamiento del directorio de páginas corporativas de la empresa",
        description:
          "Se crearon y organizaron las secciones de Sobre nosotros, Equipo de trabajo, Instalaciones, Proceso de Confección, Filosofía corporativa, Transparencia, Calidad y Certificaciones para detallar la experiencia e infraestructura del taller.",
      },
      {
        id: "e-137",
        date: "2026-06-23",
        category: "feat",
        title: "Página de ayuda interactiva con motor de búsqueda y filtros",
        description:
          "Se diseñó una nueva página de Ayuda y FAQs en `/ayuda` con un motor de búsqueda instantáneo con normalización de caracteres, junto a un panel dinámico de categorías y cajón de filtros para celulares.",
      },
      {
        id: "e-138",
        date: "2026-06-29",
        category: "style",
        title: "Unificación y estandarización visual de cabeceras de sección",
        description:
          "Se rediseñaron los componentes de encabezado de todas las páginas de servicios y empresa para reflejar la misma estructura visual, tipografías fluidas y espaciados simétricos de la portada principal.",
      },
      {
        id: "e-139",
        date: "2026-06-23",
        category: "refactor",
        title:
          "Migración de la ruta del perfil de usuario y control de accesos",
        description:
          "Se trasladó de forma segura la gestión de cuenta de `/mi-cuenta` a `/cuenta` y se implementaron redirecciones en el servidor para evitar enlaces rotos.",
      },
    ],
  },
  {
    version: "v1.2.1",
    label:
      "Notificaciones GuestBell · Gestos Táctiles Móviles · Killswitch de Seguridad",
    dateRange: "19 – 20 de junio de 2026",
    entries: [
      {
        id: "e-134",
        date: "2026-06-20",
        category: "feat",
        title:
          "Buzón de notificaciones en tiempo real para visitantes (GuestBell)",
        description:
          "Se implementó el sistema GuestBell en la barra de navegación superior, permitiendo a los usuarios no registrados ver notificaciones, guardar el estado de su carrito y favoritos de forma local y recibir alertas animadas.",
      },
      {
        id: "e-135",
        date: "2026-06-20",
        category: "a11y",
        title:
          "Gestos de deslizamiento táctil (Swipe-to-dismiss) para cerrar paneles",
        description:
          "Se programó el soporte para cerrar mediante deslizamiento el CartDrawer, el modal de Favoritos, las notificaciones y el menú desplegable en celulares, con controladores de inercia y prevención de desplazamiento de fondo.",
      },
      {
        id: "e-136",
        date: "2026-06-19",
        category: "security",
        title: "Sistema de killswitch y auditoría de alertas de seguridad",
        description:
          "Se implementó un interruptor de emergencia y registro de incidentes en el panel de administrador, conectado mediante funciones RPC seguras a Supabase, para mitigar intentos de intrusión y vigilar el estado del sitio.",
      },
    ],
  },
  {
    version: "v1.2.0",
    label:
      "Gestión de Admins · Ofertas Simplificadas · Vista de Producto Mejorada",
    dateRange: "18 de junio de 2026",
    entries: [
      {
        id: "e-130",
        date: "2026-06-18",
        category: "feat",
        title: "Gestión de administradores en el panel de usuarios",
        description:
          "El panel administrativo permite gestionar los roles de usuario y administradores, asegurando la protección de la cuenta principal mediante diálogos de confirmación y notificaciones visuales.",
      },
      {
        id: "e-131",
        date: "2026-06-18",
        category: "refactor",
        title: "Sistema de ofertas simplificado",
        description:
          "Se simplificó la configuración de descuentos en los productos. El administrador indica directamente el precio promocional y las condiciones del descuento en la vista del producto.",
      },
      {
        id: "e-132",
        date: "2026-06-18",
        category: "feat",
        title: "Calculadora de envíos y cotización por WhatsApp",
        description:
          "Se incorporó una herramienta para estimar costos de entrega según la zona del país y un sistema de cotización directa por WhatsApp con detalles de prenda, talla y ubicación.",
      },
      {
        id: "e-133",
        date: "2026-06-18",
        category: "feat",
        title: "Opción de confección a la medida",
        description:
          "Se habilitó la opción 'A la medida' en el selector de tallas para prendas que requieren medidas exactas antes de confeccionarse.",
      },
      {
        id: "e-134",
        date: "2026-06-18",
        category: "feat",
        title: "Asistente de compra rápida para visitantes",
        description:
          "Al agregar productos al carrito sin iniciar sesión, la plataforma ofrece opciones para ingresar a la cuenta o enviar el pedido por WhatsApp de forma directa.",
      },
      {
        id: "e-135",
        date: "2026-06-18",
        category: "a11y",
        title: "Mejoras de accesibilidad en formularios de envío",
        description:
          "Se optimizaron los campos de selección de ubicación para facilitar la navegación con lectores de pantalla y teclados.",
      },
    ],
  },
  {
    version: "v1.1.0",
    label: "SEO Avanzado · Estructura de Datos · Lector Legal Responsivo",
    dateRange: "17 de junio de 2026",
    entries: [
      {
        id: "e-118",
        date: "2026-06-17",
        category: "feat",
        title: "Hub central de documentos legales con lector adaptativo",
        description:
          "Se programó una sección unificada para las 16 políticas de privacidad, garantía y términos del sitio web, la cual presenta un visor de lectura cómodo y flotante en computadoras y un layout secuencial en móviles.",
      },
      {
        id: "e-119",
        date: "2026-06-17",
        category: "seo",
        title: "Optimización de metadatos de búsqueda por universidades",
        description:
          "Se actualizaron las descripciones y palabras clave principales para posicionar el catálogo en búsquedas de uniformes para instituciones de educación superior de El Salvador.",
      },
      {
        id: "e-120",
        date: "2026-06-17",
        category: "refactor",
        title: "Estandarización de datos estructurados para Google",
        description:
          "Se unificó la información de tienda física, catálogo y navegación para presentar a los buscadores datos detallados de ubicación, horarios y productos.",
      },
      {
        id: "e-121",
        date: "2026-06-17",
        category: "style",
        title: "Lector de documentos legales adaptativo",
        description:
          "Se diseñó una vista de lectura optimizada que ofrece una ventana modal en computadoras de escritorio y una vista de lectura fluida en teléfonos móviles.",
      },
      {
        id: "e-122",
        date: "2026-06-17",
        category: "fix",
        title: "Ajuste de espaciado en la vista de lectura legal",
        description:
          "Se mejoraron los márgenes y espacios de los documentos legales para evitar superposiciones con los bordes de la pantalla.",
      },
      {
        id: "e-123",
        date: "2026-06-17",
        category: "fix",
        title: "Navegación de migas de pan y numeración formal de secciones",
        description:
          "Se simplificó la ruta de navegación en la cabecera y se adoptó numeración romana para la presentación de cláusulas en los términos del sitio.",
      },
      {
        id: "e-124",
        date: "2026-06-17",
        category: "chore",
        title: "Actualización de contenido en la sección de términos",
        description:
          "Se reorganizaron los apartados de condiciones generales para ofrecer información más clara y directa a los clientes.",
      },
      {
        id: "e-125",
        date: "2026-06-17",
        category: "fix",
        title: "Alineación de controles de cierre en modales",
        description:
          "Se ajustó el posicionamiento de los botones de cierre para evitar interferencias con barras de desplazamiento o texto largo.",
      },
      {
        id: "e-126",
        date: "2026-06-17",
        category: "fix",
        title: "Alineación de indicadores numéricos en títulos de sección",
        description:
          "Se corrigió la altura de los distintivos de numeración para garantizar su centrado perfecto con los encabezados.",
      },
      {
        id: "e-127",
        date: "2026-06-17",
        category: "style",
        title: "Encabezado centrado para lectura en dispositivos móviles",
        description:
          "Se alinearon los títulos, fechas y tiempos estimados de lectura en la cabecera de artículos para pantallas pequeñas.",
      },
      {
        id: "e-128",
        date: "2026-06-17",
        category: "fix",
        title: "Adaptación de anchos de lectura en tabletas",
        description:
          "Se ajustó el ancho del contenedor de texto en pantallas medianas para aprovechar mejor el área de visualización.",
      },
      {
        id: "e-129",
        date: "2026-06-17",
        category: "fix",
        title: "Control de desplazamiento independiente en modales",
        description:
          "Se separó el control de cierre de la franja de desplazamiento para asegurar que permanezca accesible durante la lectura.",
      },
      {
        id: "e-133",
        date: "2026-06-17",
        category: "fix",
        title: "Enlaces interactivos en barra de migas de pan",
        description:
          "Se aseguró que todos los niveles de la ruta de navegación secundaria sean clickeables en todas las páginas públicas.",
      },
    ],
  },
  {
    version: "v1.0.0",
    label:
      "Animaciones de Interfaz · Cuadrícula de Novedades · Presentación de Imágenes",
    dateRange: "13 – 14 de junio de 2026",
    entries: [
      {
        id: "e-109",
        date: "2026-06-13",
        category: "style",
        title: "Animaciones suaves de entrada en la navegación",
        description:
          "Se incorporaron transiciones de entrada progresivas en las secciones principales para dar una sensación de fluidez al cargar la página.",
      },
      {
        id: "e-110",
        date: "2026-06-13",
        category: "style",
        title: "Respuesta táctil al presionar controles y tarjetas",
        description:
          "Se agregaron microanimaciones de presión al interactuar con botones y productos para confirmar la acción de forma visual.",
      },
      {
        id: "e-111",
        date: "2026-06-13",
        category: "style",
        title: "Cuadrícula unificada para productos destacados",
        description:
          "Se homologó la presentación visual de la sección de novedades en la portada con el formato de tarjetas del catálogo principal.",
      },
      {
        id: "e-112",
        date: "2026-06-13",
        category: "style",
        title: "Encuadre completo de imágenes de producto",
        description:
          "Se ajustó el escalado de fotografías para cubrir uniformemente el marco de las tarjetas, eliminando franjas o espacios vacíos.",
      },
      {
        id: "e-113",
        date: "2026-06-13",
        category: "fix",
        title: "Estabilidad en la sección de contacto",
        description:
          "Se corrigió la validación lógica en el mapeo de canales de atención al cliente en la página de contacto.",
      },
      {
        id: "e-118",
        date: "2026-06-13",
        category: "fix",
        title: "Presentación en una sola línea para mensajes de confirmación",
        description:
          "Se aseguró que los avisos emergentes al copiar enlaces o compartir productos no realicen saltos de línea desalineados.",
      },
    ],
  },
  {
    version: "v0.9.5",
    label: "Catálogo Completo · Filtros Múltiples · Detalle de Producto",
    dateRange: "12 – 13 de junio de 2026",
    entries: [
      {
        id: "e-114",
        date: "2026-06-13",
        category: "feat",
        title: "Navegación por catálogo y vista detallada de producto",
        description:
          "Se lanzaron las vistas completas de producto con galería fotográfica en proporción 4:5, opciones de personalización (talla, color, bordado) y recomendados del mismo sector.",
      },
      {
        id: "e-115",
        date: "2026-06-13",
        category: "feat",
        title: "Filtros de búsqueda múltiple y menú de ordenamiento",
        description:
          "Se implementó el sistema de filtrado con selección de múltiples criterios tanto en computadoras como en teléfonos móviles, junto a opciones para ordenar por precio y relevancia.",
      },
      {
        id: "e-116",
        date: "2026-06-13",
        category: "style",
        title: "Optimización de proporciones en galerías de imágenes",
        description:
          "Se ajustó la relación de aspecto de las miniaturas para alinear la altura de las fotografías con la información del producto.",
      },
      {
        id: "e-117",
        date: "2026-06-12",
        category: "chore",
        title: "Limpieza de componentes de filtrado anteriores",
        description:
          "Se retiraron módulos antiguos de filtrado para adoptar la arquitectura unificada conectada a la base de datos.",
      },
    ],
  },
  {
    version: "v0.9.0",
    label: "Lanzamiento · Página de Novedades · Rediseño 404",
    dateRange: "10 – 12 de junio de 2026",
    entries: [
      {
        id: "e-108",
        date: "2026-06-12",
        category: "chore",
        title: "Apertura oficial de la plataforma web",
        description:
          "Publicación oficial del sitio web de Confecciones Liss en su dominio principal con catálogo y canales directos de atención.",
      },
      {
        id: "e-100",
        date: "2026-06-12",
        category: "seo",
        title: "Optimización de respuesta en página de enlace no encontrado",
        description:
          "Se aseguró el envío de códigos de estado correctos a los motores de búsqueda para páginas no encontradas, incluyendo metadatos de ayuda al usuario.",
      },
      {
        id: "e-101",
        date: "2026-06-10",
        category: "feat",
        title: "Sección de novedades y botón para compartir",
        description:
          "Se creó la página de historial de actualizaciones con la bitácora del sitio y la función para compartir productos en redes sociales.",
      },
      {
        id: "e-102",
        date: "2026-06-10",
        category: "fix",
        title: "Estandarización visual de rutas de navegación y márgenes",
        description:
          "Se unificó el diseño de las migas de pan y los márgenes laterales en todas las secciones del sitio.",
      },
      {
        id: "e-103",
        date: "2026-06-11",
        category: "style",
        title: "Presentación en cuadrícula para servicios",
        description:
          "Las tarjetas de la sección de servicios adoptaron el formato responsivo en cuadrícula idéntico al catálogo principal.",
      },
      {
        id: "e-104",
        date: "2026-06-11",
        category: "style",
        title: "Diseño compacto en tarjetas de servicios",
        description:
          "Se simplificaron los resúmenes informativos y se ajustó la relación de aspecto de las imágenes de servicios.",
      },
      {
        id: "e-105",
        date: "2026-06-11",
        category: "style",
        title: "Renovación de imágenes descriptivas de servicios",
        description:
          "Se actualizaron las fotos ilustrativas en las opciones de confección a la medida, bordados y sublimados.",
      },
      {
        id: "e-106",
        date: "2026-06-12",
        category: "style",
        title: "Rediseño completo de la página de error 404",
        description:
          "Se implementó una nueva pantalla de enlace no encontrado con tipografía limpia, opciones de retorno rápido y diseño minimalista.",
      },
      {
        id: "e-107",
        date: "2026-06-10",
        category: "style",
        title: "Indicadores visuales permanentes en tarjetas",
        description:
          "Los enlaces e íconos de interacción en tarjetas permanecen visibles constantemente para facilitar la navegación en dispositivos móviles.",
      },
    ],
  },
  {
    version: "v0.8.0",
    label: "Navegación Móvil Curva · Ajustes Visuales",
    dateRange: "10 de junio de 2026",
    entries: [
      {
        id: "e-001",
        date: "2026-06-10",
        category: "fix",
        title: "Mejora de contraste en tarjetas de redes sociales",
        description:
          "Se añadieron sombras de elevación en los accesos rápidos de la página de enlaces para mejorar la visibilidad sobre cualquier fondo.",
      },
      {
        id: "e-002",
        date: "2026-06-10",
        category: "fix",
        title: "Detección de ruta activa en barra inferior",
        description:
          "Se corrigió la indicación resaltada de la sección actual en la barra de navegación para teléfonos móviles.",
      },
      {
        id: "e-003",
        date: "2026-06-10",
        category: "feat",
        title: "Diseño curvo con botón flotante en navegación móvil",
        description:
          "Se incorporó un contorno curvo para el botón central de acceso rápido en la barra inferior de navegación.",
      },
      {
        id: "e-004",
        date: "2026-06-10",
        category: "fix",
        title: "Ajuste de profundidad y contraste en barra inferior",
        description:
          "Se afinó la opacidad y sombreado del fondo de la navegación móvil para integrarse limpiamente con la pantalla.",
      },
      {
        id: "e-005",
        date: "2026-06-10",
        category: "feat",
        title: "Burbuja indicadora animada en menú inferior",
        description:
          "Se añadió un indicador con transición suave que se desplaza hacia la pestaña seleccionada al navegar.",
      },
      {
        id: "e-006",
        date: "2026-06-10",
        category: "fix",
        title:
          "Protección de interactividad al reanudar la sesión del navegador",
        description:
          "Se implementó un mecanismo de verificación que asegura que la página responda al instante si el usuario regresa tras haber dejado la pestaña en segundo plano.",
      },
    ],
  },
  {
    version: "v0.7.0",
    label: "Página de Enlaces Directos · Accesos Rápidos",
    dateRange: "9 de junio de 2026",
    entries: [
      {
        id: "e-007",
        date: "2026-06-09",
        category: "feat",
        title: "Página de enlaces directos a redes sociales y atención",
        description:
          "Se lanzó la sección de enlaces centralizados para acceder a las cuentas oficiales de la empresa y abrir aplicaciones nativas al hacer clic.",
      },
      {
        id: "e-008",
        date: "2026-06-09",
        category: "feat",
        title: "Barra de navegación inferior para teléfonos móviles",
        description:
          "Se incorporó la barra fija en el borde inferior para cambiar rápidamente entre la portada, el catálogo y las opciones de contacto.",
      },
      {
        id: "e-009",
        date: "2026-06-09",
        category: "feat",
        title: "Integración de atención por WhatsApp en navegación",
        description:
          "Se integró el botón directo de consulta a la barra de menú inferior para mantener la pantalla limpia de elementos flotantes superpuestos.",
      },
      {
        id: "e-010",
        date: "2026-06-09",
        category: "style",
        title: "Isotipo compacto de marca en encabezado móvil",
        description:
          "En pantallas pequeñas, la cabecera muestra una versión compacta del logotipo para otorgar mayor espacio a los controles principales.",
      },
      {
        id: "e-011",
        date: "2026-06-09",
        category: "style",
        title: "Actualización de ícono oficial de Threads",
        description:
          "Se renovó el gráfico del enlace de Threads con la versión oficial de la marca.",
      },
      {
        id: "e-012",
        date: "2026-06-09",
        category: "fix",
        title: "Control de cierre de menús táctiles",
        description:
          "Se ajustó el comportamiento de cierre al tocar fuera del menú desplegable para evitar cierres involuntarios al desplazarse en móviles.",
      },
      {
        id: "e-013",
        date: "2026-06-09",
        category: "feat",
        title: "Sincronización de opciones en menú desplegable",
        description:
          "Se unificaron los enlaces presentados en el menú principal para ofrecer los mismos destinos en computadoras y móviles.",
      },
      {
        id: "e-014",
        date: "2026-06-09",
        category: "style",
        title: "Alineación justificada del eslogan corporativo",
        description:
          "Se calculó el espaciado de letras del subtítulo del logo para alinearse de forma precisa con el ancho del isotipo.",
      },
      {
        id: "e-015",
        date: "2026-06-09",
        category: "feat",
        title: "Adaptación del buscador según tamaño de pantalla",
        description:
          "El buscador muestra su caja de texto completa en pantallas medianas y se colapsa en un ícono discreto en dispositivos pequeños.",
      },
      {
        id: "e-016",
        date: "2026-06-09",
        category: "feat",
        title: "Rediseño de botón de menú principal",
        description:
          "Se implementó una animación de cambio de estado en el botón de navegación del encabezado.",
      },
      {
        id: "e-017",
        date: "2026-06-09",
        category: "feat",
        title: "Redirección directa a catálogo desde la portada",
        description:
          "El botón principal de llamado a la acción en la imagen de portada redirige al catálogo de productos.",
      },
    ],
  },
  {
    version: "v0.6.0",
    label: "Optimización SEO · Configuración de Servidor",
    dateRange: "7 – 8 de junio de 2026",
    entries: [
      {
        id: "e-033",
        date: "2026-06-08",
        category: "chore",
        title: "Despliegue inicial de la versión web",
        description:
          "Puesta en marcha inicial del sitio web en servidor con acceso a la landing de presentación.",
      },
      {
        id: "e-018",
        date: "2026-06-08",
        category: "fix",
        title: "Generación limpia de mapa del sitio (sitemap)",
        description:
          "Se aseguró que el mapa del sitio entregue únicamente URLs públicas únicas sin duplicados ni fragmentos vacíos.",
      },
      {
        id: "e-019",
        date: "2026-06-08",
        category: "fix",
        title: "Acceso libre para buscadores a archivos de rastreo",
        description:
          "Se configuraron excepciones para permitir que los motores de búsqueda lean las instrucciones de rastreo sin bloqueos.",
      },
      {
        id: "e-020",
        date: "2026-06-08",
        category: "seo",
        title: "Mejoras de metadatos globales y presencia social",
        description:
          "Se complementó la información de título, descripción y enlaces institucionales para mejorar la vista previa al compartir en redes sociales.",
      },
      {
        id: "e-021",
        date: "2026-06-07",
        category: "style",
        title: "Ajuste simétrico en foto de portada principal",
        description:
          "La imagen del encabezado se adaptó para cubrir el ancho de pantalla de forma equilibrada sin franjas laterales.",
      },
      {
        id: "e-022",
        date: "2026-06-07",
        category: "feat",
        title: "Navegación adaptativa según estado de publicación",
        description:
          "El menú superior adapta sus enlaces dinámicamente según la disponibilidad de secciones habilitadas.",
      },
    ],
  },
  {
    version: "v0.5.0",
    label: "Exploración Visual de Categorías",
    dateRange: "7 de junio de 2026",
    entries: [
      {
        id: "e-023",
        date: "2026-06-07",
        category: "feat",
        title: "Nuevas secciones en el centro de categorías",
        description:
          "Se agregaron tarjetas descriptivas y fotografías para los sectores de Lencería, Detallado, Ropa Casual, Sublimados y Tops.",
      },
      {
        id: "e-024",
        date: "2026-06-07",
        category: "style",
        title: "Cuadrícula responsiva de categorías",
        description:
          "Se definieron las proporciones de visualización del catálogo: 1 columna en teléfonos, 2 en pantallas medianas y hasta 4 en computadoras.",
      },
      {
        id: "e-025",
        date: "2026-06-07",
        category: "style",
        title: "Legibilidad de títulos sobre fondos fotográficos",
        description:
          "Se aplicaron sombras de contraste sobre las descripciones flotantes para garantizar lectura clara sobre cualquier fotografía.",
      },
    ],
  },
  {
    version: "v0.4.0",
    label: "Modal de Búsqueda · Centro de Categorías",
    dateRange: "12 de mayo de 2026",
    entries: [
      {
        id: "e-026",
        date: "2026-05-12",
        category: "feat",
        title: "Pantalla completa para búsqueda rápida de productos",
        description:
          "Se implementó la ventana de búsqueda a pantalla completa con sugerencias directas de categoría e interacción instantánea.",
      },
      {
        id: "e-027",
        date: "2026-05-12",
        category: "feat",
        title: "Página principal del catálogo como centro de departamentos",
        description:
          "Se transformó la portada del catálogo en una vista de portadas por departamento para una navegación más rápida e intuitiva.",
      },
      {
        id: "e-028",
        date: "2026-05-09",
        category: "refactor",
        title: "Estandarización de terminología médica a 'Scrubs'",
        description:
          "Se actualizó la denominación de uniformes médicos a la terminología comúnmente utilizada por clientes y estudiantes.",
      },
    ],
  },
  {
    version: "v0.3.0",
    label: "Búsqueda, Filtros y Paginación",
    dateRange: "7 – 8 de mayo de 2026",
    entries: [
      {
        id: "e-029",
        date: "2026-05-08",
        category: "feat",
        title: "Buscador de productos con filtros y paginación",
        description:
          "Se habilitó la búsqueda en tiempo real con filtros por categoría, ordenamiento por precio y división de resultados en páginas.",
      },
      {
        id: "e-030",
        date: "2026-05-08",
        category: "a11y",
        title: "Panel lateral de filtros adaptable para pantallas táctiles",
        description:
          "Los botones de filtrado en dispositivos móviles se ajustaron al tamaño mínimo recomendado para facilitar la selección con los dedos.",
      },
      {
        id: "e-031",
        date: "2026-05-08",
        category: "refactor",
        title: "Rutas dinámicas para la visualización del catálogo",
        description:
          "Se unificó la estructura de direcciones web para presentar automáticamente el contenido según el departamento seleccionado.",
      },
      {
        id: "e-032",
        date: "2026-05-08",
        category: "seo",
        title: "Estructura de datos y mapa de sitio dinámico",
        description:
          "Se agregaron formatos de lectura para motores de búsqueda y generación automática del mapa de productos.",
      },
      {
        id: "e-033",
        date: "2026-05-08",
        category: "fix",
        title: "Mejoras de contraste y navegación por teclado",
        description:
          "Se optimizaron los colores de texto y el enfoque visual de los botones en las listas de productos.",
      },
      {
        id: "e-034",
        date: "2026-05-08",
        category: "feat",
        title: "Centralización del inventario de productos",
        description:
          "Se organizó la estructura de datos del catálogo para gestionar la información de prendas desde un único origen.",
      },
      {
        id: "e-035",
        date: "2026-05-07",
        category: "security",
        title: "Políticas de protección de datos y velocidad",
        description:
          "Se implementaron configuraciones de protección en la entrega de contenidos y optimización en la carga de imágenes.",
      },
    ],
  },
  {
    version: "v0.2.0",
    label: "Diseño Mobile-First · Presencia en Motores de Búsqueda",
    dateRange: "26 – 27 de abril de 2026",
    entries: [
      {
        id: "e-036",
        date: "2026-04-27",
        category: "seo",
        title: "Vistas previas optimizadas para redes sociales",
        description:
          "Se incorporaron fotografías oficiales del sitio para generar tarjetas descriptivas al compartir enlaces.",
      },
      {
        id: "e-037",
        date: "2026-04-27",
        category: "seo",
        title: "Generación dinámica de portadas para compartición de enlaces",
        description:
          "Se configuró la creación automática de imágenes de vista previa adaptadas para cada red social.",
      },
      {
        id: "e-038",
        date: "2026-04-27",
        category: "seo",
        title: "Ajuste de descripciones para buscadores",
        description:
          "Se refinaron los textos resumen de la tienda para ofrecer información concisa y útil a los usuarios en Google.",
      },
      {
        id: "e-039",
        date: "2026-04-27",
        category: "a11y",
        title: "Mejora de contraste de íconos informativos",
        description:
          "Se aumentaron las diferencias de tono en los íconos del encabezado para facilitar su visibilidad.",
      },
      {
        id: "e-040",
        date: "2026-04-26",
        category: "feat",
        title: "Diseño centrado en teléfonos móviles de la portada",
        description:
          "Rediseño completo de la página de inicio priorizando la velocidad, usabilidad táctil e información sobre servicios de confección.",
      },
      {
        id: "e-041",
        date: "2026-04-26",
        category: "chore",
        title: "Depuración del proyecto de archivos no requeridos",
        description:
          "Se retiraron elementos temporales de prueba dejando únicamente los componentes activos de la plataforma.",
      },
      {
        id: "e-042",
        date: "2026-04-26",
        category: "feat",
        title: "Ícono oficial de la marca en pestañas del navegador",
        description:
          "Se incorporó el isotipo oficial de Confecciones Liss como distintivo en las pestañas y marcadores.",
      },
    ],
  },
  {
    version: "v0.1.0",
    label: "Fundación de la Plataforma Web",
    dateRange: "8 – 25 de abril de 2026",
    entries: [
      {
        id: "e-043",
        date: "2026-04-25",
        category: "security",
        title: "Configuración inicial de protección y estructura",
        description:
          "Se establecieron las bases de seguridad e infraestructura para el despliegue del sitio.",
      },
      {
        id: "e-044",
        date: "2026-04-24",
        category: "feat",
        title: "Mensaje de bienvenida al visitante",
        description:
          "Se añadió una pantalla de presentación inicial para informar sobre la tienda y recordar las vías de atención directas.",
      },
      {
        id: "e-045",
        date: "2026-04-23",
        category: "feat",
        title: "Conexión a base de datos e infraestructura",
        description:
          "Se configuraron los servicios de almacenamiento de datos para catálogo y sincronización de información.",
      },
      {
        id: "e-046",
        date: "2026-04-23",
        category: "feat",
        title: "Estructura inicial de páginas y navegación",
        description:
          "Se organizó el mapa de rutas y secciones de la aplicación web.",
      },
      {
        id: "e-047",
        date: "2026-04-08",
        category: "chore",
        title: "Creación y arquitectura del proyecto",
        description:
          "Se estableció la base técnica, librerías visuales, estándares de código y diseño del proyecto.",
      },
    ],
  },
];
