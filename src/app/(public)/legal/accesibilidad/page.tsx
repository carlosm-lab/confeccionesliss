import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import {
  Section,
  Hr,
  P,
  Ul,
  LegalFootnote,
} from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "Política de Accesibilidad del Sitio Web — Declaración WCAG 2.1 AA | Confecciones Liss",
  description:
    "Declaración oficial de accesibilidad digital de Confecciones Liss v2.0: compromiso WCAG 2.1 AA, medidas implementadas, limitaciones conocidas, canal de reporte y alternativas de acceso.",
  keywords:
    "accesibilidad web, WCAG 2.1 AA, WCAG 2.2, declaración accesibilidad, lectores de pantalla, navegación teclado, Confecciones Liss El Salvador",
  alternates: {
    canonical: `${siteConfig.url}/legal/accesibilidad`,
  },
  openGraph: {
    title:
      "Política de Accesibilidad — Declaración WCAG 2.1 AA | Confecciones Liss",
    description:
      "Declaración oficial de accesibilidad digital de Confecciones Liss v2.0: compromiso WCAG 2.1 AA, medidas implementadas, limitaciones conocidas, canal de reporte y alternativas de acceso.",
    url: `${siteConfig.url}/legal/accesibilidad`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Política de Accesibilidad — Declaración WCAG 2.1 AA | Confecciones Liss",
    description:
      "Declaración oficial de accesibilidad digital de Confecciones Liss v2.0: compromiso WCAG 2.1 AA, medidas implementadas, limitaciones conocidas, canal de reporte y alternativas de acceso.",
    creator: siteConfig.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    publisher: siteConfig.name,
  },
};

export default function AccesibilidadPage() {
  const PAGE_URL = `${siteConfig.url}/legal/accesibilidad`;
  const PAGE_TITLE = "Política de Accesibilidad";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Accesibilidad del Sitio Web — Declaración WCAG 2.1 AA | Confecciones Liss",
          description:
            "Declaración oficial de accesibilidad digital de Confecciones Liss v2.0: compromiso WCAG 2.1 AA, medidas implementadas, limitaciones conocidas, canal de reporte y alternativas de acceso.",
        }),
        "@type": "Article",
        author: { "@id": `${siteConfig.url}/#business` },
        datePublished: "2026-06-25",
        dateModified: "2026-06-25",
      },
      buildBreadcrumbSchema([
        { name: "Inicio", item: siteConfig.url },
        { name: "Legal", item: `${siteConfig.url}/legal` },
        { name: PAGE_TITLE, item: PAGE_URL },
      ]),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none hidden select-none lg:block"
      >
        <LegalHubBackground animated={false} />
      </div>

      <LegalArticleReader
        title="Política de Accesibilidad del Sitio Web — Declaración Oficial de Accesibilidad Digital"
        category="Declaración de conformidad WCAG 2.1 AA, medidas implementadas, limitaciones técnicas conocidas y canales de reporte. Versión 2.0 — 25 de junio de 2026."
        date="25 Jun, 2026"
        readingTime={18}
      >
        {/* ── I. Introducción ───────────────────────────────────────────────── */}
        <Section n={1} title="Introducción, Compromiso y Ámbito de Aplicación">
          <P>
            Confecciones Liss (en adelante &quot;el Taller&quot;), taller de
            confección dedicado a la fabricación y comercialización de
            uniformes, dotaciones y prendas personalizadas con sede en Barrio La
            Merced, San Miguel, El Salvador, entiende la accesibilidad web como
            una dimensión fundamental de su calidad de servicio, su ética
            empresarial y su respeto por la diversidad humana. El presente
            documento constituye la Declaración Oficial de Accesibilidad del
            Taller, conforme a los estándares internacionales aplicables y en
            armonía con el marco jurídico comercial del Taller establecido en la
            República de El Salvador.
          </P>
          <P>
            El Taller cree firmemente que todas las personas, independientemente
            de sus capacidades físicas, sensoriales, cognitivas o tecnológicas,
            tienen el mismo derecho a acceder a la información, los productos y
            los servicios que ofrece. La accesibilidad no es un favor: es una
            obligación moral, técnica y de calidad que el Taller asume de manera
            consciente, progresiva y documentada.
          </P>
          <P>
            El presente sitio web, accesible a través del dominio oficial{" "}
            <Link
              href="https://www.confeccionesliss.com/"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/
            </Link>
            , está diseñado con el objetivo de alcanzar y mantener el nivel de
            conformidad <strong>WCAG 2.1 nivel AA</strong> (Web Content
            Accessibility Guidelines, versión 2.1, nivel de adecuación AA),
            definido por el World Wide Web Consortium (W3C) como estándar de
            referencia global en materia de accesibilidad web.
          </P>
          <P>
            <strong>ÁMBITO DE APLICACIÓN.</strong> La presente Política se
            aplica a:
          </P>
          <Ul
            items={[
              "El sitio web principal y todas sus subpáginas.",
              "El catálogo de productos publicado en la Plataforma.",
              "Los módulos de cotización y contacto.",
              "El blog institucional y contenidos editoriales.",
              "Todos los contenidos digitales publicados bajo el dominio oficial.",
            ]}
          />
          <P>
            <strong>EXCLUSIONES EXPRESAS.</strong> Quedan expresamente excluidas
            del ámbito de esta Política, sin que ello genere responsabilidad del
            Taller:
          </P>
          <Ul
            items={[
              "Los perfiles del Taller en redes sociales de terceros (Facebook, Instagram, TikTok y otras), los cuales se rigen por las políticas de accesibilidad de sus respectivos proveedores.",
              "Las aplicaciones de terceros integradas (plataformas de pago, sistemas de envío, widgets externos), cuya accesibilidad es responsabilidad de sus propios proveedores.",
              "El contenido archivado de fechas anteriores a la implementación de esta Política, el cual se revisa y actualiza progresivamente.",
              "Las comunicaciones y documentos personalizados generados para cada cliente (cotizaciones, facturas, propuestas comerciales), disponibles en formato alternativo a solicitud del interesado.",
              "Los canales de comunicación externos (WhatsApp, correo electrónico), cuya accesibilidad depende de las plataformas que los soportan.",
            ]}
          />
          <P>
            <strong>RESPONSABILIDAD DEL USUARIO.</strong> El acceso al contenido
            del sitio web en condiciones de accesibilidad óptimas requiere que
            el Usuario disponga de un dispositivo, navegador y tecnología de
            apoyo compatibles con los estándares declarados en la Sección VI de
            este documento. El Taller no puede garantizar la accesibilidad total
            del sitio cuando el problema de acceso sea atribuible a
            configuraciones del dispositivo del Usuario, versiones obsoletas de
            navegadores o tecnologías de apoyo incompatibles con las
            especificaciones técnicas declaradas. En tales casos, el Taller pone
            a disposición los canales alternativos establecidos en la Sección X.
          </P>
        </Section>
        <Hr />

        {/* ── II. Público Objetivo ──────────────────────────────────────────── */}
        <Section n={2} title="Público Objetivo y Naturaleza del Contenido">
          <P>
            El uso activo del sitio web —entendido como la creación de cuentas,
            la realización de pedidos, la solicitud de cotizaciones y la
            contratación de servicios— está reservado para personas mayores de
            18 años, en pleno ejercicio de su capacidad jurídica, conforme a lo
            establecido en la{" "}
            <Link
              href="/legal/terminos"
              className="text-blue-600 hover:underline"
            >
              Política de Términos y Condiciones del Taller
            </Link>
            .
          </P>
          <P>
            Sin embargo, el contenido informativo del sitio —incluyendo el
            catálogo de productos, los artículos del blog, las guías de tallas,
            el portafolio de diseños y los materiales sobre confección y moda—
            es de naturaleza apta para todo público. El sitio no contiene
            imágenes sugerentes ni de contenido sexual, lenguaje violento o
            discriminatorio, ni material diseñado para manipular a usuarios
            vulnerables.
          </P>
          <P>
            <strong>CONTENIDO GENERADO CON INTELIGENCIA ARTIFICIAL.</strong> El
            sitio incluye contenido visual procesado con herramientas de
            inteligencia artificial, incluyendo imágenes de prendas editadas
            digitalmente y el personaje sintético masculino denominado Liam
            Alejandro, utilizado como modelo comercial. La naturaleza de dicho
            contenido está íntegramente declarada en la{" "}
            <Link href="/legal/ia" className="text-blue-600 hover:underline">
              Política de Uso de Inteligencia Artificial del Taller
            </Link>
            .
          </P>
          <P>
            Ningún aspecto del contenido generado con IA representa una barrera
            de accesibilidad intencional. Todo contenido visual publicado por el
            Taller cuenta con texto alternativo descriptivo, conforme a los
            estándares de accesibilidad aplicables.
          </P>
        </Section>
        <Hr />

        {/* ── III. Marco Normativo ─────────────────────────────────────────── */}
        <Section n={3} title="Marco Normativo y Estándares Técnicos Aplicables">
          <P>
            La presente Política se enmarca en los siguientes estándares e
            instrumentos:
          </P>
          <Ul
            items={[
              "WCAG 2.1 — W3C (2018): Pautas de Accesibilidad para el Contenido Web, versión 2.1. Estándar técnico internacional de referencia. Meta declarada: nivel AA de conformidad.",
              "WCAG 2.2 — W3C (2023): Actualización de las pautas de accesibilidad con nuevos criterios de éxito. El Taller evalúa progresivamente su implementación.",
              "WAI-ARIA 1.2 — W3C: Especificación de Aplicaciones de Internet Enriquecidas Accesibles, utilizada para complementar la semántica HTML en componentes dinámicos de interfaz.",
              "Convención sobre los Derechos de las Personas con Discapacidad — ONU (2006): El Taller adopta voluntariamente sus principios de igualdad de acceso a la información y las comunicaciones como estándar ético aplicable a su operación.",
            ]}
          />
          <P>
            <strong>JURISDICCIÓN Y MARCO LEGAL APLICABLE.</strong> La presente
            Política se rige exclusivamente por la legislación de la República
            de El Salvador. El Taller opera conforme a las leyes salvadoreñas
            vigentes. Ninguna normativa extranjera de accesibilidad web es
            vinculante para el Taller ni puede ser invocada por el Usuario como
            fundamento de reclamación. El Usuario que acceda al sitio desde
            fuera del territorio salvadoreño lo hace bajo su propia
            responsabilidad y no puede exigir el cumplimiento de legislaciones
            de otras jurisdicciones.
          </P>
          <P>
            La adopción de los estándares técnicos internacionales (WCAG) es
            voluntaria y refleja el compromiso genuino del Taller con la calidad
            y la inclusión digital, no la sujeción a normativas de países
            distintos a El Salvador.
          </P>
        </Section>
        <Hr />

        {/* ── IV. Nivel de Conformidad ─────────────────────────────────────── */}
        <Section n={4} title="Nivel de Conformidad Declarado">
          <P>
            Confecciones Liss declara su compromiso de alcanzar el nivel de
            conformidad <strong>WCAG 2.1 nivel AA</strong> en su sitio web
            oficial. Este nivel implica el cumplimiento de todos los criterios
            de éxito de nivel A (básicos) y nivel AA (intermedios),
            estructurados en torno a los cuatro principios fundamentales:
          </P>
          <Ul
            items={[
              "PERCEPTIBLE: La información y los componentes de la interfaz se presentan de manera que los usuarios puedan percibirlos con independencia de sus capacidades sensoriales.",
              "OPERABLE: Los componentes de la interfaz y la navegación son operables sin requerir necesariamente el uso del mouse o dispositivo señalador.",
              "COMPRENSIBLE: La información y el funcionamiento de la interfaz son comprensibles para el mayor rango posible de usuarios.",
              "ROBUSTO: El contenido es suficientemente robusto para ser interpretado por una amplia variedad de agentes de usuario, incluidas las tecnologías de apoyo.",
            ]}
          />
          <P>
            El sitio se encuentra en proceso activo de mejora continua hacia la
            conformidad total con WCAG 2.1 AA. Las brechas actualmente
            identificadas se documentan en la Sección IX. El Taller no declara
            conformidad plena con el nivel AAA de WCAG 2.1, dado que varios de
            sus criterios son de aplicación especializada y pueden entrar en
            conflicto con requisitos de diseño, funcionalidad o recursos
            técnicos. No obstante, se implementan criterios AAA cuando son
            razonablemente alcanzables sin comprometer otros aspectos del sitio.
          </P>
          <P>
            <strong>LIMITACIÓN DE RESPONSABILIDAD DECLARATIVA.</strong> La
            presente declaración de conformidad refleja el estado actual
            conocido del sitio y el compromiso del Taller con la mejora
            continua. No constituye garantía absoluta de accesibilidad universal
            en todos los dispositivos, navegadores y tecnologías de apoyo
            existentes. El Usuario que encuentre una barrera de accesibilidad no
            documentada en la Sección IX tiene el deber de reportarla conforme
            al procedimiento establecido en la Sección XI antes de formular
            cualquier reclamación.
          </P>
        </Section>
        <Hr />

        {/* ── V. Medidas Implementadas ─────────────────────────────────────── */}
        <Section n={5} title="Medidas de Accesibilidad Implementadas">
          <P>
            A continuación se describen las medidas técnicas, editoriales y
            organizativas implementadas:
          </P>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.1 ESTRUCTURA SEMÁNTICA DEL HTML.</strong>
            </P>
            <P>
              El sitio está construido con HTML5 semántico. Se utilizan
              correctamente elementos como <code>&lt;header&gt;</code>,{" "}
              <code>&lt;main&gt;</code>, <code>&lt;nav&gt;</code>,{" "}
              <code>&lt;footer&gt;</code>, <code>&lt;article&gt;</code>,{" "}
              <code>&lt;section&gt;</code>, <code>&lt;aside&gt;</code> y{" "}
              <code>&lt;figure&gt;</code> para estructurar el contenido de
              manera significativa, facilitando la navegación eficiente mediante
              lectores de pantalla y la correcta indexación del contenido.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.2 JERARQUÍA DE ENCABEZADOS.</strong>
            </P>
            <P>
              Cada página contiene un único encabezado de nivel 1 (
              <code>&lt;h1&gt;</code>) que describe el propósito principal. Los
              encabezados de niveles inferiores estructuran el contenido en
              secciones lógicas sin saltarse niveles de jerarquía.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.3 TEXTO ALTERNATIVO PARA IMÁGENES.</strong>
            </P>
            <P>
              Todas las imágenes con contenido informativo incluyen atributo{" "}
              <code>alt</code> descriptivo. Las imágenes decorativas incluyen{" "}
              <code>alt=&quot;&quot;</code> vacío. Los iconos SVG interactivos o
              informativos incluyen etiquetas <code>&lt;title&gt;</code> o
              atributos <code>aria-label</code> apropiados.
            </P>
            <P>
              <strong>IMÁGENES EDITADAS CON IA.</strong> Dado que el Taller
              utiliza herramientas de inteligencia artificial en la edición de
              imágenes de sus productos y en la generación del Modelo IA Liam
              Alejandro, el texto alternativo de dichas imágenes describe el
              contenido visual real de la prenda presentada, sin hacer
              referencia a la naturaleza real o sintética del modelo. La
              descripción de accesibilidad se enfoca en el producto, conforme al
              propósito comercial de la imagen.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.4 CONTRASTE DE COLOR.</strong>
            </P>
            <P>
              La paleta del sitio cumple los requisitos mínimos de contraste
              WCAG 2.1 AA: relación mínima de 4.5:1 para texto normal y 3:1 para
              texto grande. Los elementos interactivos cuentan con indicadores
              visuales con contraste suficiente en todos sus estados.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.5 NAVEGACIÓN POR TECLADO.</strong>
            </P>
            <P>
              Todos los elementos interactivos son operables mediante teclado.
              Se garantiza orden de tabulación lógico y predecible. Se
              implementan atajos de teclado para saltar al contenido principal
              (skip-to-content) y a la navegación principal.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.6 INDICADORES DE FOCO VISIBLES.</strong>
            </P>
            <P>
              El indicador de foco del teclado es visible en todos los elementos
              interactivos, con contraste suficiente y tamaño adecuado. No se
              suprime el indicador de foco nativo sin reemplazarlo por un
              equivalente al menos tan visible.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.7 ROLES Y ATRIBUTOS ARIA.</strong>
            </P>
            <P>
              Se utilizan atributos ARIA de manera estratégica y conservadora
              para complementar la semántica HTML. Se implementan roles (
              <code>navigation</code>, <code>dialog</code>, <code>alert</code>,{" "}
              <code>status</code>) y propiedades (<code>aria-label</code>,{" "}
              <code>aria-labelledby</code>, <code>aria-describedby</code>,{" "}
              <code>aria-expanded</code>, <code>aria-controls</code>,{" "}
              <code>aria-live</code>, <code>aria-hidden</code>) para enriquecer
              la experiencia de usuarios de tecnologías de asistencia.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.8 FORMULARIOS ACCESIBLES.</strong>
            </P>
            <P>
              Todos los formularios del sitio —cotización, contacto,
              suscripción— cuentan con: etiquetas visibles o ARIA asociadas
              programáticamente; instrucciones claras sobre el formato esperado;
              mensajes de error descriptivos independientes del color;
              agrupación lógica de campos mediante <code>&lt;fieldset&gt;</code>{" "}
              y <code>&lt;legend&gt;</code>; y atributos de autocompletado (
              <code>autocomplete</code>) donde corresponda.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.9 DISEÑO RESPONSIVO Y ADAPTABLE.</strong>
            </P>
            <P>
              El sitio adopta un enfoque mobile-first que se adapta a pantallas
              de 320px hasta monitores de alta resolución. El contenido no
              requiere desplazamiento horizontal en 320px de ancho vertical. El
              zoom del navegador puede escalarse hasta el 200% sin pérdida de
              contenido ni funcionalidad.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.10 IDIOMA DE LA PÁGINA.</strong>
            </P>
            <P>
              El atributo <code>lang=&quot;es&quot;</code> está correctamente
              declarado en el elemento raíz <code>&lt;html&gt;</code> de todas
              las páginas, permitiendo a los lectores de pantalla aplicar las
              reglas lingüísticas correctas.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                5.11 CONTENIDO SIN PARPADEO NI DESTELLO PELIGROSO.
              </strong>
            </P>
            <P>
              El sitio no contiene animaciones, videos ni elementos que
              parpadeen más de tres veces por segundo, conforme al criterio WCAG
              2.1 2.3.1. Las animaciones decorativas son de baja frecuencia y
              diseñadas para no representar riesgo para usuarios con
              fotosensibilidad.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.12 PREFERENCIA DE MOVIMIENTO REDUCIDO.</strong>
            </P>
            <P>
              El sitio respeta la preferencia del sistema operativo mediante la
              media query <code>prefers-reduced-motion</code>. Cuando el usuario
              ha indicado preferencia de movimiento reducido, las animaciones y
              efectos cinéticos se reducen o eliminan automáticamente.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.13 PREFERENCIA DE ESQUEMA DE COLOR.</strong>
            </P>
            <P>
              El sitio detecta y respeta la preferencia de esquema de color del
              sistema operativo (modo claro / modo oscuro) a través de la media
              query <code>prefers-color-scheme</code>, garantizando contraste y
              legibilidad en todos los modos disponibles.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.14 DESCRIPCIONES DE VÍNCULOS Y BOTONES.</strong>
            </P>
            <P>
              Todos los enlaces y botones tienen propósito claro y descriptivo
              determinable desde el texto o el contexto inmediato. Se evitan
              textos genéricos sin contexto. Los iconos como únicos elementos
              visuales de un botón incluyen nombre accesible descriptivo
              mediante <code>aria-label</code> o texto visualmente oculto.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.15 TABLAS DE DATOS ACCESIBLES.</strong>
            </P>
            <P>
              Las tablas de datos (comparativos de productos, guías de tallas,
              tarifas de envío) incluyen encabezados de fila y columna
              correctamente marcados con <code>&lt;th&gt;</code> y atributo{" "}
              <code>scope</code>. Las tablas complejas incluyen{" "}
              <code>&lt;caption&gt;</code> descriptivo.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.16 CONTENIDO MULTIMEDIA.</strong>
            </P>
            <P>
              Los videos publicados incluyen subtítulos sincronizados para
              usuarios con discapacidad auditiva. Las presentaciones de solo
              audio incluyen transcripciones textuales. El contenido puramente
              decorativo de video o audio no transmite información indispensable
              no disponible en otra forma.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.17 GESTIÓN DE ERRORES Y RECUPERACIÓN.</strong>
            </P>
            <P>
              Los procesos críticos del sitio —envío de formularios, cotización,
              creación de cuenta— incluyen mecanismos de confirmación, revisión
              y corrección antes de que las acciones sean definitivas. Los
              errores se notifican de forma clara, descriptiva y accesible, sin
              depender del color como único indicador.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.18 TIEMPO SUFICIENTE PARA COMPLETAR TAREAS.</strong>
            </P>
            <P>
              El sitio no impone límites de tiempo estrictos para completar
              formularios o procesos. Si en el futuro se implementan sesiones
              con tiempo límite, se notificará al usuario con antelación
              suficiente y se ofrecerá la posibilidad de extender el tiempo o
              guardar el progreso.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.19 NAVEGACIÓN CONSISTENTE.</strong>
            </P>
            <P>
              Los componentes de navegación —menú principal, menú de pie de
              página, migas de pan (breadcrumbs), botones de acción— se
              presentan en el mismo orden y con la misma apariencia en todas las
              páginas. Este patrón consistente reduce la carga cognitiva y
              permite construir un modelo mental predecible del sitio.
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.20 ACCESIBILIDAD DEL CONTENIDO LEGAL.</strong>
            </P>
            <P>
              Todas las políticas del Taller publicadas bajo el directorio{" "}
              <code>/legal/</code> del sitio están redactadas en formato de
              texto plano estructurado, compatible con lectores de pantalla y
              herramientas de apoyo, y accesibles sin necesidad de plugins ni
              software especializado. El directorio completo de políticas está
              disponible en{" "}
              <Link href="/legal" className="text-blue-600 hover:underline">
                https://www.confeccionesliss.com/legal
              </Link>
              .
            </P>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>5.21 ACCESIBILIDAD DEL DIRECTORIO DE CANALES.</strong>
            </P>
            <P>
              El hub centralizado de canales oficiales del Taller, disponible en{" "}
              <Link href="/links" className="text-blue-600 hover:underline">
                https://www.confeccionesliss.com/links
              </Link>
              , está diseñado conforme a los mismos estándares de accesibilidad
              del sitio principal, garantizando que el Usuario pueda acceder y
              verificar los canales oficiales independientemente de la
              tecnología de apoyo que utilice.
            </P>
          </div>
        </Section>
        <Hr />

        {/* ── VI. Tecnologías de Apoyo ─────────────────────────────────────── */}
        <Section n={6} title="Tecnologías de Apoyo Compatibles">
          <P>
            El sitio web del Taller ha sido probado y optimizado para funcionar
            con las siguientes tecnologías de apoyo y configuraciones:
          </P>
          <Ul
            items={[
              "LECTORES DE PANTALLA: NVDA con Firefox y Chrome en Windows; JAWS con Chrome en Windows; VoiceOver con Safari en macOS e iOS; TalkBack en Android con Chrome.",
              "NAVEGACIÓN POR TECLADO: Compatible con navegación completa mediante teclado estándar (Tab, Shift+Tab, Enter, Espacio, flechas de dirección) en todos los navegadores principales modernos.",
              "ZOOM DEL NAVEGADOR: Soporta zoom hasta el 400% sin pérdida de contenido ni superposición de elementos en orientación vertical (pantalla de 1280px).",
              "CONTRASTE ALTO: Compatible con el modo de alto contraste de Windows y con extensiones de navegador que ajustan el contraste de color.",
              "TAMAÑO DE TEXTO DEL SISTEMA: El sitio respeta las configuraciones de tamaño de fuente del sistema operativo y del navegador, utilizando unidades relativas (rem, em, %) en lugar de unidades absolutas para los tamaños de fuente.",
              "DISPOSITIVOS APUNTADORES ALTERNATIVOS: El sitio es operable con ratones especializados, joysticks, trackpads y otros dispositivos señaladores alternativos que emulan la funcionalidad del mouse.",
              "CONTROL POR VOZ: El sitio es compatible con Dragon NaturallySpeaking y con las funcionalidades de control por voz integradas en sistemas operativos modernos (Voice Control en macOS/iOS, Voice Access en Android).",
            ]}
          />
          <P>
            <strong>LIMITACIÓN DE COMPATIBILIDAD.</strong> El Taller reconoce
            que la compatibilidad perfecta con todas las versiones y
            configuraciones posibles de tecnologías de apoyo está fuera de su
            alcance. La lista anterior refleja las configuraciones probadas a la
            fecha de publicación de esta versión de la Política. El Taller se
            compromete a atender con prioridad los reportes de incompatibilidad
            recibidos a través de los canales establecidos en la Sección XI.
          </P>
          <P>
            El Usuario que utilice tecnologías de apoyo no incluidas en la lista
            anterior tiene el deber de verificar la compatibilidad de su
            tecnología con el sitio antes de iniciar cualquier gestión
            comercial. El Taller no asumirá responsabilidad por problemas de
            acceso atribuibles al uso de tecnologías de apoyo no probadas ni
            declaradas en la presente sección.
          </P>
        </Section>
        <Hr />

        {/* ── VII. Evaluación ──────────────────────────────────────────────── */}
        <Section n={7} title="Proceso de Evaluación y Auditoría">
          <P>
            El Taller adopta un enfoque estructurado para la evaluación continua
            de la accesibilidad de su sitio web:
          </P>
          <Ul
            items={[
              "AUTOEVALUACIÓN CONTINUA: El equipo técnico realiza revisiones de accesibilidad como parte del proceso de desarrollo de nuevas funcionalidades, utilizando herramientas automatizadas como axe-core, Lighthouse, WAVE y Accessibility Insights.",
              "PRUEBAS MANUALES PERIÓDICAS: Adicionalmente a las herramientas automatizadas, se realizan pruebas manuales con tecnologías de apoyo reales (lectores de pantalla, navegación por teclado) para identificar problemas no detectados por herramientas automatizadas.",
              "AUDITORÍAS FORMALES: Se planifican auditorías de accesibilidad formales con una periodicidad mínima anual, o cuando se realicen cambios significativos en la arquitectura o diseño del sitio.",
              "MONITOREO DE RETROALIMENTACIÓN: Se revisan periódicamente los reportes de accesibilidad recibidos y se priorizan las correcciones según su impacto.",
            ]}
          />
          <P>
            Los resultados de las evaluaciones son documentados internamente y
            utilizados para planificar mejoras en las iteraciones sucesivas del
            sitio.
          </P>
        </Section>
        <Hr />

        {/* ── VIII. Responsabilidad ────────────────────────────────────────── */}
        <Section n={8} title="Responsabilidad Organizacional y del Usuario">
          <P>
            <strong>RESPONSABILIDADES INTERNAS DEL TALLER:</strong>
          </P>
          <Ul
            items={[
              "Encargado de Comunicaciones (Carlos José Molina Villacorta): Responsable de la recepción, registro y escalamiento de reportes de accesibilidad, y de garantizar que existan canales alternativos de atención para usuarios que no puedan utilizar el sitio web.",
              "Equipo de Desarrollo y Tecnología: Responsable de implementar las medidas técnicas de accesibilidad, realizar pruebas automatizadas y manuales, y mantener el código conforme a los estándares WCAG 2.1 AA.",
              "Equipo de Diseño: Responsable de garantizar que los diseños visuales cumplan los requisitos de contraste, tamaño de fuente, espaciado y jerarquía visual.",
              "Equipo de Contenido: Responsable de crear y publicar contenido accesible: textos claros, imágenes con texto alternativo adecuado, videos con subtítulos y documentos en formatos accesibles.",
            ]}
          />
          <P>
            <strong>RESPONSABILIDADES DEL USUARIO.</strong> La accesibilidad
            óptima del sitio depende también de que el Usuario cumpla los
            siguientes deberes, cuyo incumplimiento limita la capacidad del
            Taller de garantizar la experiencia de acceso:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Utilizar navegadores y tecnologías de apoyo en versiones
              actualizadas y compatibles con los estándares declarados en la
              Sección VI.
            </P>
            <P>
              b) Mantener configurado correctamente su dispositivo, sistema
              operativo y herramientas de apoyo conforme a sus propias
              necesidades de accesibilidad.
            </P>
            <P>
              c) Reportar las barreras de accesibilidad que encuentre, conforme
              al procedimiento establecido en la Sección XI, antes de formular
              cualquier reclamación derivada de problemas de acceso.
            </P>
            <P>
              d) Consultar los canales alternativos de acceso establecidos en la
              Sección X cuando no pueda completar una gestión a través del sitio
              web.
            </P>
            <P>
              e) Verificar que los problemas de acceso que experimenta no son
              atribuibles a su dispositivo, configuración o tecnología de apoyo,
              antes de atribuirlos al sitio web del Taller.
            </P>
          </div>
          <P>
            El Taller no asumirá responsabilidad alguna derivada de problemas de
            acceso atribuibles al incumplimiento de los deberes del Usuario
            establecidos en los literales anteriores, ni de problemas originados
            en el dispositivo, la conectividad, el sistema operativo o la
            tecnología de apoyo del Usuario.
          </P>
          <P>
            Para la totalidad de los deberes del Usuario, consúltese la{" "}
            <Link
              href="/legal/deberes"
              className="text-blue-600 hover:underline"
            >
              Política de Deberes del Usuario
            </Link>
            . Para la totalidad de los derechos del Usuario, consúltese la{" "}
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              Política de Derechos del Usuario
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── IX. Limitaciones Conocidas ───────────────────────────────────── */}
        <Section n={9} title="Limitaciones Técnicas Conocidas">
          <P>
            El Taller opera bajo el principio de transparencia. A continuación
            se documentan las limitaciones de accesibilidad actualmente
            identificadas, junto con el estado de las acciones correctivas. Esta
            sección es de conocimiento expreso del Usuario desde el momento en
            que accede al sitio, y no constituye fundamento autónomo de
            reclamación.
          </P>
          <Ul
            items={[
              "CONTENIDO GENERADO POR USUARIOS (reseñas y comentarios): Los comentarios y reseñas publicados por clientes pueden no incluir siempre texto alternativo en imágenes adjuntas. El Taller está desarrollando guías de moderación y herramientas de apoyo para facilitar la creación de contenido accesible. Estado: en proceso de mejora.",
              "DOCUMENTOS PDF: Algunos documentos en formato PDF (fichas técnicas, catálogos descargables) pueden no cumplir plenamente los requisitos de accesibilidad para documentos PDF (PDF/UA). Estado: en proceso de conversión y corrección progresiva. Disponible en formato alternativo a solicitud.",
              "CONTENIDO DE TERCEROS INTEGRADO: El sitio puede integrar contenido de terceros (mapas, widgets de redes sociales, herramientas de chat) cuya accesibilidad depende de los proveedores externos y está fuera del control directo del Taller. Estado: monitoreo continuo.",
              "IMÁGENES EDITADAS CON IA: Las imágenes de prendas procesadas con inteligencia artificial y las imágenes del Modelo IA Liam Alejandro cuentan con texto alternativo descriptivo del producto. No obstante, el proceso de generación de texto alternativo para contenido generado con IA es un área en mejora continua. Estado: mejora progresiva.",
              "COMPONENTES DE INTERFAZ COMPLEJOS: Algunos componentes avanzados (configurador de productos personalizados) pueden presentar experiencias subóptimas con determinadas configuraciones de tecnologías de apoyo. Cumplen criterios básicos de accesibilidad pero la experiencia puede no ser equivalente. Estado: mejoras específicas en planificación.",
              "VIDEOS HEREDADOS: Algunos videos publicados antes de la implementación de esta Política pueden no contar con subtítulos o transcripciones completas. Estado: revisión y actualización progresiva.",
              "CONTENIDO EN REDES SOCIALES: El contenido publicado en los canales oficiales del Taller en redes sociales (Facebook, Instagram, TikTok) sigue las buenas prácticas de accesibilidad disponibles en cada plataforma, pero su accesibilidad está condicionada a las capacidades técnicas de dichas plataformas, sobre las que el Taller no tiene control total.",
            ]}
          />
          <P>
            Si el Usuario identifica una barrera de accesibilidad no documentada
            en esta sección, tiene el deber de reportarla conforme al
            procedimiento establecido en la Sección XI. La formulación de
            reclamaciones sin haber cumplido previamente el deber de reporte
            establecido en la Sección XI será considerada inadmisible.
          </P>
        </Section>
        <Hr />

        {/* ── X. Alternativas de Acceso ────────────────────────────────────── */}
        <Section n={10} title="Alternativas de Acceso y Asistencia">
          <P>
            El Taller reconoce que, a pesar de sus esfuerzos, el sitio web puede
            no ser completamente accesible para todos los usuarios en todas las
            situaciones. Por esta razón, garantiza la disponibilidad de los
            siguientes canales alternativos de acceso, disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            :
          </P>
          <Ul
            items={[
              "ATENCIÓN POR WHATSAPP: Canal de atención por mensajería disponible durante el horario oficial del Taller (Lunes a Sábado, 8:00 AM – 5:00 PM). Las funciones de accesibilidad integradas en WhatsApp (mensajes de voz, lectura de texto, ajuste de tamaño de fuente) pueden complementar la experiencia. Número oficial: +503 7331-7181.",
              "ATENCIÓN PRESENCIAL: Las instalaciones físicas del Taller están disponibles durante el horario de atención publicado, para usuarios que prefieran o requieran atención presencial. Dirección: Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur, Casa #402, San Miguel, El Salvador.",
              "FORMATOS ALTERNATIVOS: A solicitud del Usuario, el Taller puede proporcionar información específica (catálogos, fichas técnicas, presupuestos) en formatos alternativos más accesibles, como texto plano o audio, dentro de sus capacidades operativas.",
            ]}
          />
          <P>
            <strong>LIMITACIÓN DEL DERECHO A CANALES ALTERNATIVOS.</strong> La
            disponibilidad de canales alternativos no exime al Usuario de su
            deber de agotar primero el canal de reporte de accesibilidad
            establecido en la Sección XI cuando el problema sea atribuible al
            sitio web. Los canales alternativos son un complemento de acceso, no
            un mecanismo de reclamación. Las reclamaciones comerciales derivadas
            de pedidos, cotizaciones, devoluciones u otras gestiones se rigen
            exclusivamente por las políticas comerciales correspondientes del
            Taller, disponibles en{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── XI. Canal de Reporte ─────────────────────────────────────────── */}
        <Section
          n={11}
          title="Canal de Reporte de Accesibilidad: Procedimiento y Plazos"
        >
          <P>
            <strong>DEBER DE REPORTE PREVIO.</strong> El Usuario que experimente
            una barrera de accesibilidad en el sitio web tiene el deber de
            reportarla al Taller antes de formular cualquier reclamación
            derivada de dicha barrera. El incumplimiento de este deber previo de
            reporte convierte cualquier reclamación posterior en inadmisible,
            toda vez que el Taller no tuvo la oportunidad de conocer y corregir
            el problema.
          </P>
          <P>
            <strong>CÓMO REPORTAR.</strong> El Usuario puede reportar barreras
            de accesibilidad a través de los canales oficiales del Taller,
            disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            . Al realizar el reporte, el Usuario deberá proporcionar:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Descripción precisa de la barrera de accesibilidad encontrada.
            </P>
            <P>
              b) URL específica de la página o sección donde se produce el
              problema.
            </P>
            <P>c) Dispositivo, sistema operativo y navegador utilizados.</P>
            <P>
              d) Tecnología de apoyo utilizada (si aplica), incluyendo nombre y
              versión.
            </P>
            <P>e) Pasos para reproducir el problema, si es posible.</P>
          </div>
          <P>
            El Taller no está obligado a procesar reportes que no contengan la
            información mínima necesaria para identificar y evaluar la barrera
            reportada.
          </P>
          <P>
            <strong>PROCEDIMIENTO DE ATENCIÓN:</strong>
          </P>
          <Ul
            items={[
              "Confirmación de recepción del reporte: hasta 2 días hábiles.",
              "Evaluación del problema y determinación de si constituye una barrera WCAG 2.1 AA: hasta 5 días hábiles.",
              "Si se confirma la barrera: planificación de corrección e información al Usuario del plazo estimado de resolución.",
              "Ofrecimiento de solución alternativa inmediata mientras se trabaja en la corrección definitiva, cuando sea posible.",
              "Notificación al Usuario cuando la corrección haya sido implementada.",
            ]}
          />
          <P>
            <strong>LIMITACIÓN DE PLAZOS.</strong> Los plazos indicados son
            estimaciones operativas sujetas a la carga de trabajo del equipo
            técnico y a la complejidad del problema reportado. Su incumplimiento
            no genera derecho a indemnización ni a ninguna compensación por
            parte del Taller.
          </P>
        </Section>
        <Hr />

        {/* ── XII. Mejora Continua ─────────────────────────────────────────── */}
        <Section n={12} title="Compromiso de Mejora Continua">
          <P>
            La accesibilidad web es un proceso continuo. El Taller se compromete
            a:
          </P>
          <Ul
            items={[
              "Integrar la accesibilidad como criterio de aceptación en todos los ciclos de desarrollo y actualización del sitio.",
              "Capacitar al equipo de desarrollo, diseño y contenido en buenas prácticas de accesibilidad web, con actualizaciones periódicas.",
              "Mantenerse al día con las actualizaciones de las WCAG (incluyendo WCAG 2.2 y futuras WCAG 3.0) y evaluar su implementación.",
              "Revisar y actualizar esta declaración al menos una vez al año, o cada vez que se realicen cambios significativos en el sitio.",
              "Considerar la retroalimentación de usuarios con discapacidad como fuente privilegiada de información para priorizar mejoras.",
              "Evaluar proactivamente nuevas tecnologías que puedan mejorar la experiencia de accesibilidad de los usuarios.",
            ]}
          />
          <P>
            Este compromiso es genuino y refleja los valores del Taller, sin que
            su declaración genere derechos adicionales para el Usuario más allá
            de los expresamente establecidos en la presente Política y en la{" "}
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              Política de Derechos del Usuario
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── XIII. Exención de Responsabilidad ───────────────────────────── */}
        <Section n={13} title="Exención de Responsabilidad">
          <P>
            En la máxima medida permitida por la legislación salvadoreña
            aplicable, Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de los siguientes supuestos, sin que esta
            lista sea limitativa:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Barreras de accesibilidad atribuibles al dispositivo, sistema
              operativo, navegador o tecnología de apoyo del Usuario, y no al
              sitio web del Taller.
            </P>
            <P>
              b) Problemas de acceso derivados del uso de navegadores o
              tecnologías de apoyo en versiones no probadas ni declaradas en la
              Sección VI.
            </P>
            <P>
              c) Barreras de accesibilidad conocidas y documentadas en la
              Sección IX, cuya existencia es de conocimiento expreso del Usuario
              desde el momento en que accede al sitio.
            </P>
            <P>
              d) Barreras de accesibilidad en contenido de terceros integrado en
              el sitio (mapas, widgets de redes sociales, herramientas de chat),
              cuya accesibilidad es responsabilidad de los proveedores externos.
            </P>
            <P>
              e) Barreras de accesibilidad en los perfiles del Taller en redes
              sociales de terceros, que se rigen por las políticas de sus
              propias plataformas.
            </P>
            <P>
              f) Problemas de acceso reportados fuera de los canales oficiales o
              sin haber cumplido el procedimiento de reporte establecido en la
              Sección XI.
            </P>
            <P>
              g) Decisiones comerciales adoptadas por el Usuario afectadas por
              barreras de accesibilidad no previamente reportadas al Taller.
            </P>
            <P>
              h) Incompatibilidades derivadas de la correcta implementación de
              los estándares WCAG con configuraciones atípicas o minoritarias de
              tecnologías de apoyo no probadas por el Taller.
            </P>
            <P>
              i) Cualquier daño, perjuicio o inconveniente derivado del período
              de corrección de barreras de accesibilidad reportadas, conforme a
              los plazos establecidos en la Sección XI.
            </P>
          </div>
        </Section>
        <Hr />

        {/* ── XIV. Relación con otras políticas ───────────────────────────── */}
        <Section n={14} title="Relación con Otras Políticas del Taller">
          <P>
            La presente Política forma parte integral del marco jurídico y
            comercial de Confecciones Liss y debe interpretarse de forma
            complementaria y consistente con las demás políticas del Taller, en
            particular:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.4rem",
              marginBottom: "0.75rem",
            }}
          >
            {[
              {
                label: "Términos y Condiciones de Uso:",
                href: "/legal/terminos",
                url: "https://www.confeccionesliss.com/legal/terminos",
              },
              {
                label: "Política de Privacidad:",
                href: "/legal/privacidad",
                url: "https://www.confeccionesliss.com/legal/privacidad",
              },
              {
                label: "Política de Deberes del Usuario:",
                href: "/legal/deberes",
                url: "https://www.confeccionesliss.com/legal/deberes",
              },
              {
                label: "Política de Derechos del Usuario:",
                href: "/legal/derechos",
                url: "https://www.confeccionesliss.com/legal/derechos",
              },
              {
                label: "Política de Uso de Inteligencia Artificial:",
                href: "/legal/ia",
                url: "https://www.confeccionesliss.com/legal/ia",
              },
              {
                label: "Política de Cookies:",
                href: "/legal/cookies",
                url: "https://www.confeccionesliss.com/legal/cookies",
              },
              {
                label: "Política de Comunicaciones Comerciales:",
                href: "/legal/comunicaciones",
                url: "https://www.confeccionesliss.com/legal/comunicaciones",
              },
              {
                label: "Política de Contenido Generado por Usuarios (UGC):",
                href: "/legal/ugc",
                url: "https://www.confeccionesliss.com/legal/ugc",
              },
              {
                label:
                  "Política de Logos e Identidad Institucional de Terceros:",
                href: "/legal/terceros",
                url: "https://www.confeccionesliss.com/legal/terceros",
              },
              {
                label: "Directorio de canales oficiales:",
                href: "/links",
                url: "https://www.confeccionesliss.com/links",
              },
            ].map(({ label, href, url }) => (
              <div key={href} style={{ display: "flex", gap: "0.5rem" }}>
                <span>—</span>
                <div>
                  <strong>{label}</strong>{" "}
                  <Link href={href} className="text-blue-600 hover:underline">
                    {url}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Hr />

        {/* ── XV. Exclusiones y Alcance ────────────────────────────────────── */}
        <Section n={15} title="Exclusiones y Alcance de la Declaración">
          <P>
            La presente declaración cubre exclusivamente el sitio web oficial
            del Taller bajo el dominio{" "}
            <Link
              href="https://www.confeccionesliss.com/"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/
            </Link>
            . Las siguientes áreas quedan expresamente excluidas:
          </P>
          <Ul
            items={[
              "PERFILES EN REDES SOCIALES: Las páginas del Taller en Instagram, Facebook, TikTok y otras plataformas se rigen por las políticas de accesibilidad de sus respectivas plataformas. El Taller adopta buenas prácticas de accesibilidad en la publicación de contenido (texto alternativo en imágenes, subtítulos en videos) en la medida en que cada plataforma lo permite, sin que esto le genere obligaciones adicionales de accesibilidad más allá de las declaradas en la presente Política.",
              "APLICACIONES DE TERCEROS INTEGRADAS: Herramientas de pago, sistemas de envío y widgets externos tienen su propia declaración de accesibilidad y son responsabilidad de sus respectivos proveedores.",
              "CONTENIDO ARCHIVADO: El contenido histórico puede no cumplir todos los criterios WCAG 2.1 AA, dado que fue creado antes de la implementación de esta Política. Se revisa y actualiza progresivamente.",
              "COMUNICACIONES DIRECTAS PERSONALIZADAS: Las cotizaciones, facturas y propuestas comerciales generadas para cada cliente pueden no cumplir todos los criterios de accesibilidad de documentos. El Cliente puede solicitar estos documentos en formato alternativo accesible a través de los canales oficiales del Taller.",
            ]}
          />
        </Section>
        <Hr />

        {/* ── XVI. Jurisdicción ────────────────────────────────────────────── */}
        <Section
          n={16}
          title="Jurisdicción, Resolución de Disputas y Legislación Aplicable"
        >
          <P>
            Toda controversia derivada de la interpretación, aplicación o
            incumplimiento de la presente Política se resolverá en primera
            instancia mediante comunicación directa de buena fe entre el Usuario
            y el Taller, a través de los canales oficiales disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            De no alcanzarse un acuerdo, la controversia se someterá a la
            jurisdicción exclusiva de los tribunales competentes de la República
            de El Salvador, aplicando la legislación salvadoreña vigente. El
            Usuario renuncia expresamente a cualquier otro fuero o jurisdicción
            que pudiera corresponderle, con independencia de su lugar de
            residencia o domicilio.
          </P>
          <P>
            La legislación salvadoreña es la única aplicable a la presente
            Política y a todas las relaciones jurídicas que de ella deriven.
            Ninguna normativa de accesibilidad extranjera es vinculante para el
            Taller ni puede ser invocada por el Usuario como fundamento de
            reclamación.
          </P>
        </Section>
        <Hr />

        {/* ── XVII. Versión y Vigencia ─────────────────────────────────────── */}
        <Section n={17} title="Versión, Vigencia y Modificaciones">
          <P>
            Esta declaración corresponde a la <strong>Versión 2.0</strong>,
            publicada el 25 de junio de 2026. Será revisada y actualizada en las
            siguientes circunstancias:
          </P>
          <Ul
            items={[
              "Anualmente, como mínimo.",
              "Cuando se realicen cambios significativos en la arquitectura, el diseño o las funcionalidades del sitio.",
              "Cuando se completen correcciones de las limitaciones documentadas en la Sección IX.",
              "Cuando entren en vigor nuevos estándares de accesibilidad cuya adopción el Taller decida incorporar.",
            ]}
          />
          <P>
            El Taller se reserva el derecho de modificar la presente Política en
            cualquier momento y sin previo aviso. Las modificaciones entran en
            vigencia desde su publicación. El acceso continuado al sitio con
            posterioridad a cualquier modificación constituye aceptación
            automática e irrevocable de la versión actualizada. El Taller no
            está obligado a notificar individualmente a los Usuarios sobre
            modificaciones. Es deber exclusivo del Usuario verificar
            periódicamente la versión vigente, siempre disponible en{" "}
            <Link
              href="/legal/accesibilidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/accesibilidad
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── XVIII. Divisibilidad ─────────────────────────────────────────── */}
        <Section n={18} title="Divisibilidad">
          <P>
            Si alguna disposición de la presente Política fuera declarada
            inválida, ilegal o inaplicable por un tribunal competente de la
            República de El Salvador, las restantes disposiciones continuarán en
            plena vigencia y efecto. La disposición declarada inválida será
            reemplazada, en la medida de lo posible, por una disposición válida
            que refleje la intención original.
          </P>
        </Section>
        <Hr />

        {/* ── XIX. Disposición Final ───────────────────────────────────────── */}
        <Section n={19} title="Disposición Final">
          <P>
            Confecciones Liss cree que un negocio verdaderamente responsable es
            aquel que garantiza a todas las personas el acceso a sus productos y
            servicios en condiciones de igualdad y dignidad. La accesibilidad
            web es una dimensión concreta y medible de esa responsabilidad, y el
            Taller la asume con la misma seriedad con la que gestiona cada
            pedido de confección.
          </P>
          <P>
            El camino hacia una accesibilidad plena es continuo. El Taller
            agradece la retroalimentación de todos los usuarios que encuentren
            barreras en el sitio y los invita a utilizar el canal de reporte
            establecido en la Sección XI. Cada reporte recibido es una
            oportunidad de mejora para el beneficio de todos.
          </P>
          <P>
            La presente Política es un documento vivo que evoluciona con el
            Taller, con la tecnología y con los estándares de la industria. Su
            existencia y publicación reflejan el compromiso genuino de
            Confecciones Liss con la inclusión digital, la diversidad y la
            igualdad de oportunidades, en el marco de la legislación salvadoreña
            aplicable y con absoluta independencia de normativas extranjeras.
          </P>
        </Section>

        <LegalFootnote>
          <div style={{ fontWeight: "700", marginBottom: "0.5rem" }}>
            CONFECCIONES LISS — CONTACTO OFICIAL
          </div>
          <div style={{ marginBottom: "0.5rem" }}>
            Toda gestión exclusivamente a través de:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: "0.25rem 1rem",
              marginBottom: "0.5rem",
            }}
          >
            <span style={{ fontWeight: "600" }}>
              WhatsApp oficial de atención:
            </span>
            <span style={{ color: "#16a34a", fontWeight: "600" }}>
              +503 7331-7181
            </span>

            <span style={{ fontWeight: "600" }}>
              Encargado de Comunicaciones:
            </span>
            <span>Carlos José Molina Villacorta</span>

            <span style={{ fontWeight: "600" }}>Contacto del Encargado:</span>
            <span>+503 7329-4499 (mediación y conflictos)</span>

            <span style={{ fontWeight: "600" }}>
              Política de Accesibilidad:
            </span>
            <Link
              href="/legal/accesibilidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/accesibilidad
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Privacidad:</span>
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/privacidad
            </Link>

            <span style={{ fontWeight: "600" }}>Términos y Condiciones:</span>
            <Link
              href="/legal/terminos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/terminos
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Deberes:</span>
            <Link
              href="/legal/deberes"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/deberes
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Derechos:</span>
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/derechos
            </Link>

            <span style={{ fontWeight: "600" }}>Política de IA:</span>
            <Link href="/legal/ia" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal/ia
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Cookies:</span>
            <Link
              href="/legal/cookies"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cookies
            </Link>

            <span style={{ fontWeight: "600" }}>
              Política de Comunicaciones:
            </span>
            <Link
              href="/legal/comunicaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/comunicaciones
            </Link>

            <span style={{ fontWeight: "600" }}>Política UGC:</span>
            <Link href="/legal/ugc" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal/ugc
            </Link>

            <span style={{ fontWeight: "600" }}>
              Política Logos Institucionales:
            </span>
            <Link
              href="/legal/terceros"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/terceros
            </Link>
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              marginTop: "0.5rem",
              lineHeight: "1.4",
            }}
          >
            <strong>Dirección:</strong> Barrio La Merced, 5ª Calle Poniente y 1ª
            Avenida Sur, Casa #402, San Miguel, El Salvador.
            <br />
            <strong>Horario:</strong> Lunes a Sábado, 8:00 AM – 5:00 PM
            <br />
            <strong>Versión 2.0 — Vigente desde el 25 de junio de 2026</strong>
          </div>
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
