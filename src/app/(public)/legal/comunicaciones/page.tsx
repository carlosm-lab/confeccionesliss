import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import { Section, Hr, P, LegalFootnote } from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title:
    "Política de Comunicaciones Comerciales (WhatsApp, Redes Sociales y Canales Digitales)",
  description:
    "Política de Comunicaciones Comerciales de Confecciones Liss: canales oficiales, WhatsApp, redes sociales, horario de atención, conductas prohibidas, privacidad y validez de acuerdos.",
  keywords:
    "comunicaciones comerciales, WhatsApp oficial, canales oficiales, redes sociales, horario atención, conductas prohibidas, Confecciones Liss El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/comunicaciones` },
  openGraph: {
    title: "Política de Comunicaciones Comerciales | Confecciones Liss",
    description:
      "Política de Comunicaciones Comerciales de Confecciones Liss: canales oficiales, WhatsApp, redes sociales, horario de atención, conductas prohibidas, privacidad y validez de acuerdos.",
    url: `${siteConfig.url}/legal/comunicaciones`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Comunicaciones Comerciales | Confecciones Liss",
    description:
      "Política de Comunicaciones Comerciales de Confecciones Liss: canales oficiales, WhatsApp, redes sociales, horario de atención, conductas prohibidas, privacidad y validez de acuerdos.",
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

export default function PoliticaComunicacionesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/comunicaciones`;
  const PAGE_TITLE = "Política de Comunicaciones";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Comunicaciones Comerciales — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de Comunicaciones Comerciales de Confecciones Liss: canales oficiales, WhatsApp, redes sociales, horario de atención, conductas prohibidas, privacidad y validez de acuerdos.",
        }),
        "@type": "Article",
        author: { "@id": `${siteConfig.url}/#business` },
        datePublished: "2026-06-24",
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
      {/* Hub background — only shown on desktop where the blur overlay exists. */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden select-none lg:block"
      >
        <LegalHubBackground animated={false} />
      </div>

      <LegalArticleReader
        title="Política de Comunicaciones Comerciales (WhatsApp, Redes Sociales y Canales Digitales Oficiales)"
        category="Condiciones, límites, derechos y responsabilidades que rigen toda comunicación entre Confecciones Liss y sus usuarios a través de canales oficiales."
        date="24 Jun, 2026"
        readingTime={18}
      >
        <P>
          La presente Política de Comunicaciones Comerciales (en adelante
          &quot;la Política&quot;) regula de manera integral, exhaustiva y
          vinculante las condiciones, límites, derechos y responsabilidades que
          rigen toda comunicación entre Confecciones Liss (en adelante &quot;el
          Taller&quot;) y cualquier persona natural que interactúe con el Taller
          a través de cualquiera de sus canales de comunicación oficiales,
          incluyendo sin limitarse a: WhatsApp, redes sociales, formularios web,
          correo electrónico, mensajería directa en plataformas digitales y
          cualquier otro canal declarado oficial por el Taller en el directorio
          disponible en{" "}
          <Link href="/links" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/links
          </Link>
          .
        </P>
        <P>
          Toda persona natural que contacte, consulte, gestione, interactúe o se
          comunique con el Taller a través de cualquier canal —ya sea en calidad
          de visitante, prospecto, cliente con pedido en curso o completado, o
          cualquier otra condición— (en adelante &quot;el Usuario&quot; o
          &quot;el Cliente&quot;, utilizados de forma indistinta según el
          contexto) declara haber leído, comprendido y aceptado en su
          integridad, de forma libre, voluntaria e informada, la totalidad de
          los términos aquí establecidos. El inicio de cualquier comunicación
          con el Taller a través de cualquier canal constituye aceptación
          tácita, libre, voluntaria e irrevocable de la presente Política, aun
          cuando el Usuario no haya completado ningún pedido ni realizado
          transacción alguna.
        </P>
        <P>
          El desconocimiento de la presente Política no exime al Usuario de su
          cumplimiento, no le otorga derechos adicionales a los expresamente
          reconocidos en este documento, y no le confiere fundamento válido para
          reclamación alguna contra el Taller derivada de la aplicación de sus
          disposiciones.
        </P>
        <P>
          La presente Política debe leerse en conjunto con la{" "}
          <Link href="/legal/deberes" className="text-blue-600 hover:underline">
            Política de Deberes del Usuario
          </Link>
          , la{" "}
          <Link
            href="/legal/derechos"
            className="text-blue-600 hover:underline"
          >
            Política de Derechos del Usuario
          </Link>
          , la{" "}
          <Link
            href="/legal/privacidad"
            className="text-blue-600 hover:underline"
          >
            Política de Privacidad
          </Link>{" "}
          y los{" "}
          <Link
            href="/legal/terminos"
            className="text-blue-600 hover:underline"
          >
            Términos y Condiciones de Uso
          </Link>
          , con los cuales forma un marco jurídico integral y coherente que rige
          la relación entre el Taller y el Usuario.
        </P>
        <Hr />

        <Section n={1} title="Definiciones específicas de esta Política">
          <P>
            1.1 A efectos de la presente Política, y sin perjuicio de las
            definiciones establecidas en otras políticas del Taller, se
            entenderá por:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>&quot;Canales oficiales&quot;:</strong> la totalidad de
              perfiles, páginas, números de teléfono, cuentas, formularios y
              plataformas de comunicación declaradas como oficiales por el
              Taller en el directorio hub disponible en{" "}
              <Link href="/links" className="text-blue-600 hover:underline">
                https://www.confeccionesliss.com/links
              </Link>{" "}
              en la versión vigente al momento de cada interacción. Solo lo que
              figure en dicho directorio es oficial.
            </P>
            <P>
              b){" "}
              <strong>
                &quot;Hub de canales&quot; o &quot;directorio central&quot;:
              </strong>{" "}
              la página{" "}
              <Link href="/links" className="text-blue-600 hover:underline">
                https://www.confeccionesliss.com/links
              </Link>
              , que constituye el único punto de referencia válido, actualizado
              y oficial para verificar la autenticidad de cualquier canal que
              afirme representar al Taller.
            </P>
            <P>
              c) <strong>&quot;Canal no oficial&quot;:</strong> todo perfil,
              número de teléfono, cuenta en redes sociales, correo electrónico,
              sitio web o cualquier otro medio de comunicación que afirme ser o
              representar a Confecciones Liss y que no figure en el hub de
              canales vigente. Los canales no oficiales no son reconocidos por
              el Taller y pueden corresponder a perfiles fraudulentos que
              suplanten la identidad del Taller.
            </P>
            <P>
              d) <strong>&quot;WhatsApp oficial&quot;:</strong> el número de
              WhatsApp declarado como canal oficial de atención al cliente y
              recepción de pedidos del Taller, identificado en el Artículo 3 de
              la presente Política y confirmable en el hub de canales.
            </P>
            <P>
              e) <strong>&quot;Encargado de Comunicaciones&quot;:</strong> la
              persona designada por el Taller como responsable oficial de la
              gestión de comunicaciones institucionales, mediación de conflictos
              y representación del Taller ante terceros en materia
              comunicacional, identificada en el Artículo 3 de la presente
              Política.
            </P>
            <P>
              f){" "}
              <strong>
                &quot;Mensaje pre-formateado&quot; o &quot;plantilla de
                contacto&quot;:
              </strong>{" "}
              estructura de mensaje generada automáticamente por la plataforma
              web del Taller (
              <Link
                href="https://www.confeccionesliss.com/"
                className="text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/
              </Link>
              ) cuando el Usuario inicia un pedido desde la Plataforma, diseñada
              para facilitar la transmisión estructurada y eficiente de la
              información mínima necesaria para gestionar el pedido a través de
              WhatsApp.
            </P>
            <P>
              g) <strong>&quot;Horario de atención&quot;:</strong> el período
              dentro del cual el Taller atiende activamente las comunicaciones
              recibidas a través de sus canales oficiales, establecido en el
              Artículo 5 de la presente Política.
            </P>
            <P>
              h) <strong>&quot;Terminación de la comunicación&quot;:</strong>{" "}
              acto por el cual el Taller, en ejercicio del derecho establecido
              en el Artículo 8, pone fin de forma unilateral e inmediata a una
              comunicación en curso con el Usuario, por incurrir este en las
              causales establecidas en dicho artículo.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Hub central de canales oficiales: única fuente de verdad"
        >
          <P>
            2.1 El directorio centralizado, actualizado, verificado y oficial de
            todos los canales de comunicación de Confecciones Liss se encuentra
            disponible de forma permanente y de acceso libre en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <P>
            Este enlace constituye la única fuente de verdad para verificar la
            autenticidad de cualquier canal que afirme representar al Taller. Es
            responsabilidad exclusiva e indelegable del Usuario consultar este
            directorio antes de iniciar cualquier comunicación, gestión de
            pedido, pago o transacción vinculada al Taller.
          </P>
          <P>
            2.2{" "}
            <strong>
              CANALES NO OFICIALES: NO RECONOCIDOS, NO RESPONSABILIDAD DEL
              TALLER.
            </strong>{" "}
            Cualquier perfil en redes sociales, número de teléfono, cuenta de
            mensajería, correo electrónico, sitio web, grupo, canal de difusión,
            comunidad o cualquier otro medio de comunicación digital o análogo
            que afirme ser, representar o estar asociado a Confecciones Liss y
            que NO figure en el directorio disponible en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>{" "}
            debe considerarse categórica e inequívocamente NO OFICIAL y
            potencialmente fraudulento.
          </P>
          <P>
            2.3 El Taller no asume responsabilidad alguna —de ningún tipo, grado
            ni naturaleza— por comunicaciones, acuerdos, instrucciones de pago,
            pedidos, compromisos, promesas, descuentos, condiciones especiales
            ni cualquier otra gestión realizada a través de canales no
            oficiales, con independencia de que dichos canales utilicen el
            nombre, logo, fotografías, colores, tipografía o cualquier otro
            elemento de identidad del Taller. La similitud visual o nominal
            entre un canal no oficial y los canales del Taller no genera
            responsabilidad del Taller ni obliga al Taller a reconocer, honrar
            ni responder por las gestiones realizadas en dicho canal.
          </P>
          <P>
            2.4 El Usuario que realice pagos, depósitos, transferencias,
            entregas de anticipos o cualquier otro tipo de transacción económica
            a través de canales no oficiales asume exclusiva, íntegra e
            irrevocablemente el riesgo y todas las consecuencias de dicha
            actuación, incluyendo sin limitarse a: la pérdida total de los
            fondos entregados, la imposibilidad de exigir al Taller la entrega
            de ningún producto, y la responsabilidad de iniciar por su cuenta
            las acciones que correspondan contra los terceros que operaron el
            canal no oficial.
          </P>
          <P>
            2.5 El Taller no reconocerá como válidos, ejecutables ni vinculantes
            los pedidos, cotizaciones, pagos, acuerdos, descuentos prometidos,
            condiciones especiales pactadas ni compromisos de ningún tipo
            gestionados o recibidos a través de canales no oficiales, con
            independencia de la buena fe del Usuario al haber utilizado dicho
            canal.
          </P>
          <P>
            2.6 El Taller reportará activamente ante las plataformas digitales
            correspondientes, y ante las autoridades competentes cuando proceda,
            los perfiles, cuentas o canales que suplanten su identidad o que
            utilicen su nombre, logo o identidad visual sin autorización. Sin
            embargo, el Taller no garantiza la eliminación inmediata de dichos
            canales, dado que su gestión depende de las decisiones de las
            plataformas respectivas y de los procesos de las autoridades
            competentes, sobre los cuales el Taller no tiene control.
          </P>
          <P>
            2.7 Ante cualquier duda sobre la autenticidad de un canal, número,
            perfil o cualquier otro medio que afirme ser Confecciones Liss, el
            Usuario debe verificar en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>{" "}
            ANTES de proceder con cualquier comunicación, pago o transacción. La
            omisión de esta verificación es responsabilidad exclusiva del
            Usuario.
          </P>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Canal oficial de WhatsApp y Encargado de Comunicaciones"
        >
          <P>
            3.1 <strong>WHATSAPP OFICIAL DE ATENCIÓN AL CLIENTE.</strong> El
            número de WhatsApp oficial y único de Confecciones Liss habilitado
            para la atención de clientes, recepción de consultas, gestión de
            cotizaciones, confirmación de pedidos y comunicaciones comerciales
            en general es:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "700",
              color: "#16a34a",
              marginBottom: "0.75rem",
            }}
          >
            +503 7331-7181
          </div>
          <P>
            Este número corresponde al canal de atención comercial oficial del
            Taller. Es el único número autorizado para gestionar comunicaciones
            comerciales ordinarias en nombre de Confecciones Liss a través de la
            plataforma WhatsApp. Su autenticidad puede confirmarse en el hub de
            canales disponible en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            3.2 El Taller no reconocerá, no asumirá responsabilidad ni estará
            obligado a honrar comunicaciones, instrucciones de pago, acuerdos,
            cotizaciones ni compromisos transmitidos a través de números de
            WhatsApp distintos al indicado en el numeral anterior, con
            independencia de que dichos números afirmen pertenecer al Taller, a
            alguno de sus colaboradores, o a alguna persona que afirme actuar en
            nombre del Taller sin estar expresamente autorizada en el directorio
            oficial.
          </P>
          <P>
            3.3 <strong>ENCARGADO DE COMUNICACIONES.</strong> El encargado
            oficial de comunicaciones institucionales, mediación de conflictos,
            representación del Taller ante terceros y escalamiento de
            reclamaciones que no hayan podido resolverse a través del canal de
            atención ordinario es:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              lineHeight: "1.6",
              marginBottom: "0.75rem",
            }}
          >
            <strong>Carlos José Molina Villacorta</strong>
            <br />
            Encargado de Comunicaciones — Confecciones Liss
            <br />
            Número de contacto directo: <strong>+503 7329-4499</strong>
          </div>
          <P>
            3.4 El número personal del Encargado de Comunicaciones (+503
            7329-4499) es un canal de gestión interna, mediación institucional y
            atención de conflictos escalados. No es un canal de ventas, no está
            habilitado para la recepción de pedidos ordinarios, no procesa
            cotizaciones de primera línea, y su uso por parte del Usuario está
            reservado a los siguientes supuestos:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Mediación de conflictos que no hayan podido resolverse a través
              del canal de atención oficial (+503 7331-7181).
            </P>
            <P>
              b) Escalamiento de reclamaciones formales que requieran
              intervención directa del representante del Taller.
            </P>
            <P>
              c) Comunicaciones institucionales de carácter formal provenientes
              de terceras instituciones, representantes legales, organismos
              públicos u otras entidades que requieran interlocución a nivel
              representativo.
            </P>
            <P>
              d) Cualquier otro supuesto de naturaleza institucional, legal o
              representativa que el Encargado de Comunicaciones haya autorizado
              expresamente.
            </P>
          </div>
          <P>
            3.5 El Encargado de Comunicaciones no está obligado a atender
            consultas ordinarias de pedidos, cotizaciones, disponibilidad de
            materiales ni gestiones comerciales de primera línea a través de su
            número personal. Dichas gestiones deben canalizarse a través del
            WhatsApp oficial de atención al cliente indicado en el numeral 3.1.
          </P>
          <P>
            3.6 Las comunicaciones dirigidas al Encargado de Comunicaciones a
            través de su número personal (+503 7329-4499) están sujetas a todas
            las condiciones de la presente Política, incluyendo el horario de
            atención, las conductas prohibidas y las causales de terminación de
            la comunicación establecidas en los artículos correspondientes.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Redes sociales oficiales">
          <P>
            4.1 Las redes sociales, plataformas de contenido y canales digitales
            oficiales de Confecciones Liss son exclusivamente los que figuran,
            en la versión vigente al momento de cada interacción, en el
            directorio central disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <P>
            4.2 Todo perfil, página, grupo, canal, comunidad, cuenta de difusión
            o cualquier otro espacio digital en cualquier red social o
            plataforma —incluyendo sin limitarse a Facebook, Instagram, TikTok,
            YouTube, X (Twitter), Pinterest, Threads, LinkedIn o cualquier otra
            plataforma existente o futura— que utilice el nombre
            &quot;Confecciones Liss&quot;, variaciones del mismo, o la identidad
            visual del Taller, y que NO esté listado en el directorio oficial
            indicado en el numeral anterior, debe considerarse categórica e
            inequívocamente NO OFICIAL. El Taller no se hace responsable por el
            contenido publicado, los acuerdos realizados ni las consecuencias
            derivadas de la interacción de los Usuarios con perfiles no
            oficiales.
          </P>
          <P>
            4.3 La verificación de la oficialidad de un perfil en redes sociales
            no depende exclusivamente de la verificación o insignia de cuenta
            verificada que otorgue la plataforma. La única fuente de
            verificación válida para Confecciones Liss es el hub de canales
            disponible en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            . La ausencia de un perfil en dicho directorio lo convierte en no
            oficial, con independencia de su estado de verificación en la
            plataforma.
          </P>
          <P>
            4.4 El contenido publicado en los perfiles de redes sociales
            oficiales del Taller está sujeto a la presente Política, a las
            políticas de contenido del Taller disponibles en{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            , y a las condiciones de uso de cada plataforma. En caso de
            conflicto entre las condiciones de uso de la plataforma y las
            políticas del Taller, las condiciones de uso de la plataforma
            prevalecerán en los aspectos técnicos y de uso de la plataforma,
            mientras que las políticas del Taller prevalecerán en los aspectos
            comerciales y de relación con el Usuario.
          </P>
          <P>
            4.5 El Taller ejerce moderación activa sobre sus canales de redes
            sociales oficiales. Los comentarios, mensajes, publicaciones o
            cualquier otro tipo de interacción que contenga conductas prohibidas
            conforme al Artículo 7 de la presente Política, o que infrinja las
            condiciones de uso de la plataforma correspondiente, serán
            eliminados, ocultados o reportados, y el Usuario podrá ser bloqueado
            o reportado ante la plataforma, sin que ello genere responsabilidad
            alguna para el Taller ni derecho de reclamación para el Usuario.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Horario de atención y tiempos de respuesta">
          <P>
            5.1 El Taller atiende de forma activa las comunicaciones recibidas a
            través de sus canales oficiales dentro del siguiente horario:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            Lunes a Sábado: 8:00 AM – 5:00 PM (hora oficial de El Salvador,
            UTC-6)
          </div>
          <P>
            5.2 Los mensajes recibidos fuera del horario de atención establecido
            en el numeral anterior —incluyendo mensajes recibidos durante la
            noche, madrugada, domingos y días festivos oficiales de la República
            de El Salvador— serán atendidos durante el siguiente período hábil
            de atención, en orden de recepción y conforme a la capacidad
            operativa del Taller al momento de la atención.
          </P>
          <P>
            5.3 El Taller realizará esfuerzos razonables y de buena fe por
            responder las comunicaciones de los Usuarios dentro de los plazos
            operativos habituales. Sin embargo, el Taller no garantiza ni puede
            garantizar tiempos de respuesta exactos, inmediatos ni fijos, dado
            que la capacidad de respuesta depende del volumen de consultas, la
            complejidad de cada gestión y las condiciones operativas del Taller
            en cada momento.
          </P>
          <P>
            5.4 Los tiempos de respuesta pueden extenderse significativamente
            durante los períodos de alta demanda estacional, incluyendo sin
            limitarse a: los períodos de inicio de ciclo académico
            universitario, los meses de reingreso escolar, las semanas previas a
            fechas de entrega de uniformes institucionales masivos, las
            temporadas de eventos deportivos o actos de graduación, y cualquier
            otro período que genere un volumen de consultas superior al
            habitual. El Usuario reconoce esta condición inherente al negocio
            del Taller y renuncia expresamente a formular reclamaciones basadas
            exclusivamente en demoras de respuesta durante dichos períodos.
          </P>
          <P>
            5.5 El Taller comunicará, cuando sea operativamente posible y a
            través de sus canales oficiales, los períodos de cierre por
            vacaciones, mantenimiento, emergencias u otras causas que impliquen
            la suspensión temporal de la atención. Sin embargo, la imposibilidad
            de comunicar dichos cierres con anticipación —por razones de
            urgencia, fuerza mayor u otras causas fuera del control del Taller—
            no generará responsabilidad del Taller por demoras en la atención
            durante dichos períodos.
          </P>
          <P>
            5.6 La recepción de un mensaje por el sistema de WhatsApp u otras
            plataformas de mensajería no implica lectura inmediata ni compromiso
            de respuesta fuera del horario de atención. Los indicadores de
            &quot;mensaje entregado&quot; o &quot;mensaje leído&quot; propios de
            las plataformas de mensajería no constituyen confirmación de
            atención activa por parte del Taller ni generan obligación de
            respuesta inmediata.
          </P>
        </Section>
        <Hr />

        <Section
          n={6}
          title="Mensajes pre-formateados y plantillas de contacto"
        >
          <P>
            6.1 <strong>NATURALEZA Y PROPÓSITO.</strong> La plataforma web de
            Confecciones Liss (
            <Link
              href="https://www.confeccionesliss.com/"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/
            </Link>
            ) genera de forma automática mensajes pre-formateados o plantillas
            de contacto que se abren en la aplicación de WhatsApp del
            dispositivo del Usuario cuando este selecciona la opción de iniciar
            un pedido desde la Plataforma. Estos mensajes constituyen una
            herramienta de facilitación de la comunicación, diseñada para:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Orientar al Usuario sobre la información mínima necesaria para
              gestionar su pedido de forma eficiente.
            </P>
            <P>
              b) Estructurar la comunicación inicial de manera que el Taller
              pueda identificar rápidamente el tipo de producto, las
              especificaciones y los datos de contacto del Usuario.
            </P>
            <P>
              c) Reducir los tiempos de gestión al eliminar la necesidad de
              solicitar información básica de forma sucesiva durante la
              conversación.
            </P>
          </div>
          <P>
            6.2 <strong>CARÁCTER DE PLANTILLA, NO DE CONTRATO.</strong> Los
            mensajes pre-formateados son plantillas de inicio de conversación.
            No constituyen, en ningún caso, un contrato de compraventa, una
            cotización definitiva, una confirmación de pedido, un compromiso de
            precio, una promesa de disponibilidad ni ningún otro documento
            jurídicamente vinculante para el Taller. El pedido se formaliza
            únicamente cuando el Taller confirma por escrito, a través de los
            canales oficiales, la aceptación del pedido y se recibe el anticipo
            correspondiente, conforme a la{" "}
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              Política de Cotizaciones
            </Link>
            .
          </P>
          <P>
            6.3{" "}
            <strong>LIBERTAD DE EDICIÓN Y RESPONSABILIDAD DEL USUARIO.</strong>{" "}
            El Usuario puede editar libremente el contenido del mensaje
            pre-formateado antes de enviarlo, adecuándolo a sus necesidades
            particulares o añadiendo información adicional que considere
            relevante. El Taller no impone el uso del mensaje en su forma
            original ni sanciona al Usuario por modificarlo.
          </P>
          <P>
            6.4 Sin embargo, el Usuario asume plena, exclusiva e irrevocable
            responsabilidad por todas las consecuencias derivadas de cualquier
            modificación, supresión, omisión o alteración que realice sobre el
            mensaje pre-formateado, en particular respecto a las siguientes
            situaciones:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Si el Usuario elimina, modifica o no completa campos de
              información relevante del mensaje pre-formateado —incluyendo sin
              limitarse a: tipo de prenda, modelo, cantidad, talla, diseño,
              color, datos de contacto, institución u otros datos específicos
              del pedido— el Taller no podrá gestionar el pedido de forma
              completa ni eficiente, y no asumirá responsabilidad por la demora,
              gestión incorrecta o imposibilidad de atención derivada de dicha
              omisión.
            </P>
            <P>
              b) Si la información transmitida en el mensaje es incompleta o
              insuficiente, el Taller solicitará los datos faltantes antes de
              proceder. El cómputo del tiempo de producción no se iniciará hasta
              recibir la totalidad de la información necesaria, conforme a la{" "}
              <Link
                href="/legal/confeccion"
                className="text-blue-600 hover:underline"
              >
                Política de Confección
              </Link>
              .
            </P>
            <P>
              c) Si el Usuario modifica el mensaje de forma tal que la
              información transmitida sea incorrecta, contradictoria o ambigua,
              el Taller gestionará el pedido con base en la información recibida
              tal como fue enviada, sin responsabilidad por los errores
              derivados de dicha modificación.
            </P>
            <P>
              d) El Usuario no podrá invocar el contenido del mensaje
              pre-formateado original —es decir, en su versión sin modificar,
              tal como fue generado por la Plataforma— como compromiso del
              Taller sobre un pedido que el Usuario modificó de forma tal que
              alteró los términos originales del mensaje.
            </P>
          </div>
          <P>
            6.5 <strong>INFORMACIÓN INCOMPLETA POR OMISIÓN DEL USUARIO.</strong>{" "}
            Cuando el mensaje enviado por el Usuario carezca de información
            esencial para la gestión del pedido, independientemente de si el
            Usuario editó o no el mensaje pre-formateado, el Taller solicitará
            la información faltante. El Usuario tiene el deber de proporcionar
            dicha información de forma oportuna y completa, conforme a la{" "}
            <Link
              href="/legal/deberes"
              className="text-blue-600 hover:underline"
            >
              Política de Deberes del Usuario
            </Link>
            . La demora en proporcionar la información solicitada es de
            responsabilidad exclusiva del Usuario y no genera obligación de
            compensación por parte del Taller.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Conductas prohibidas en los canales oficiales">
          <P>
            7.1 El Usuario se compromete a utilizar los canales de comunicación
            oficiales del Taller de forma respetuosa, leal, diligente y conforme
            a las presentes condiciones y a la legislación de la República de El
            Salvador. Están expresamente prohibidas, sin que esta enumeración
            sea limitativa, las siguientes conductas en cualquier canal oficial
            del Taller:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>LENGUAJE OFENSIVO E IRRESPETUOSO:</strong> el envío de
              mensajes, comentarios o cualquier otra forma de comunicación que
              contenga insultos, groserías, descalificaciones personales,
              expresiones degradantes, lenguaje obsceno, discriminatorio,
              sexista, racista o de cualquier otra naturaleza contraria a la
              dignidad de las personas, dirigidos al Taller, a su personal, a
              otros Usuarios o a cualquier tercero.
            </P>
            <P>
              b) <strong>AMENAZAS:</strong> cualquier manifestación que
              implique, de forma expresa, velada, condicional o implícita, la
              intención de causar daño de cualquier naturaleza —físico,
              económico, reputacional, legal o de cualquier otro tipo— al
              Taller, a su personal, a sus colaboradores, a su propiedad o a sus
              intereses, como instrumento de presión para obtener resultados
              comerciales, resolución de conflictos o cualquier otro fin.
            </P>
            <P>
              c) <strong>HOSTIGAMIENTO Y ACOSO:</strong> conductas de
              hostigamiento sostenido, acoso reiterado, presión indebida o
              intimidación hacia el Taller o su personal a través de los canales
              oficiales, incluyendo el envío masivo, repetitivo o sistemático de
              mensajes con el propósito de saturar, presionar o coaccionar al
              Taller.
            </P>
            <P>
              d) <strong>INFORMACIÓN FALSA O ENGAÑOSA:</strong> el suministro
              deliberado de información falsa, falsificada, modificada o
              engañosa al Taller, con el propósito de obtener beneficios,
              descuentos, condiciones o tratos a los que el Usuario no tendría
              derecho conforme a las políticas vigentes.
            </P>
            <P>
              e) <strong>SUPLANTACIÓN DE IDENTIDAD:</strong> hacerse pasar por
              otra persona, cliente, representante del Taller o cualquier otra
              identidad distinta a la real del Usuario al comunicarse con el
              Taller.
            </P>
            <P>
              f) <strong>DIFUSIÓN DE CONTENIDO ILEGAL O DAÑINO:</strong> el
              envío a través de los canales del Taller de contenido ilícito,
              malware, enlaces maliciosos, spam, material de naturaleza sexual
              no solicitada, contenido que incite al odio o a la violencia, o
              cualquier otro contenido contrario a la legislación salvadoreña o
              a las condiciones de uso de la plataforma de comunicación
              utilizada.
            </P>
            <P>
              g) <strong>INTERFERENCIA CON LOS SISTEMAS:</strong> cualquier
              intento de vulnerar, interferir, sobrecargar, acceder sin
              autorización o manipular los sistemas, plataformas o canales de
              comunicación del Taller.
            </P>
            <P>
              h) <strong>NEGOCIACIÓN DE MALA FE:</strong> el inicio reiterado de
              procesos de cotización, consulta o negociación sin intención real
              de concretar un pedido, o la utilización de la información
              proporcionada por el Taller con fines distintos a la gestión de un
              pedido legítimo.
            </P>
            <P>
              i) <strong>EXTORSIÓN COMERCIAL:</strong> la exigencia al Taller,
              bajo amenaza de publicación de reseñas negativas, denuncias ante
              organismos públicos, difusión de información perjudicial u otro
              tipo de presión, de condiciones, devoluciones, compensaciones o
              beneficios a los que el Usuario no tiene derecho conforme a las
              políticas vigentes.
            </P>
          </div>
          <P>
            7.2 El incumplimiento de cualquiera de las prohibiciones
            establecidas en el numeral anterior faculta al Taller para ejercer,
            de forma inmediata, simultánea o sucesiva y a su entera discreción,
            todos o cualquiera de los siguientes derechos:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Dar por terminada la comunicación conforme al Artículo 8 de la
              presente Política.
            </P>
            <P>
              b) Bloquear al Usuario en el canal en el que incurrió en la
              conducta prohibida.
            </P>
            <P>
              c) Reportar al Usuario ante la plataforma digital correspondiente.
            </P>
            <P>
              d) Reportar al Usuario ante las autoridades competentes de la
              República de El Salvador cuando su conducta constituya un ilícito
              penal o administrativo, incluyendo las amenazas, la extorsión y el
              acoso.
            </P>
            <P>
              e) Iniciar las acciones legales civiles y/o penales que
              correspondan para la protección de los derechos e intereses del
              Taller y su personal.
            </P>
            <P>
              f) Cancelar cualquier pedido en curso del Usuario, con retención
              de los anticipos pagados conforme a la Política de Devoluciones.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={8} title="Derecho del Taller a terminar la comunicación">
          <P>
            8.1 Confecciones Liss se reserva el derecho irrevocable, amplio e
            incondicionado de dar por terminada cualquier comunicación en curso
            —a través de cualquier canal oficial y en cualquier etapa de la
            conversación— de forma unilateral, inmediata y sin necesidad de
            justificación adicional, notificación previa ni compensación al
            Usuario, ante la ocurrencia de cualquiera de las siguientes
            causales, sin que esta enumeración sea limitativa:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El Usuario profiere amenazas de cualquier naturaleza, ya sea de
              forma directa, velada, condicional o implícita, dirigidas contra
              el Taller, su personal, sus colaboradores, su propiedad o sus
              intereses.
            </P>
            <P>
              b) El Usuario utiliza lenguaje insultante, ofensivo, degradante,
              discriminatorio o irrespetuoso de cualquier tipo durante la
              comunicación, con independencia de si dicho lenguaje está dirigido
              al Taller, a su personal, a otros Usuarios o a cualquier tercero.
            </P>
            <P>
              c) El Usuario incurre en conductas de hostigamiento, acoso o
              presión indebida sobre el Taller o su personal a través del canal
              de comunicación.
            </P>
            <P>
              d) El Usuario persiste, de forma reiterada y de mala fe, en
              solicitudes que han sido clara y fundamentadamente rechazadas por
              el Taller conforme a sus políticas vigentes, sin aportar
              fundamentos nuevos ni admisibles para el replanteamiento de su
              solicitud.
            </P>
            <P>
              e) El Usuario suministra información deliberadamente falsa o
              engañosa durante la comunicación.
            </P>
            <P>
              f) El Usuario incurre en extorsión comercial en los términos
              descritos en el Artículo 7.1, literal i) de la presente Política.
            </P>
            <P>
              g) Cualquier otra conducta del Usuario que, a juicio del Taller,
              resulte contraria a los principios de buena fe, respeto mutuo y
              lealtad comercial establecidos en la{" "}
              <Link
                href="/legal/deberes"
                className="text-blue-600 hover:underline"
              >
                Política de Deberes del Usuario
              </Link>
              .
            </P>
          </div>
          <P>
            8.2 La terminación de la comunicación por las causales descritas en
            el numeral anterior tiene los siguientes efectos inmediatos e
            irrevocables:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El Taller no tiene obligación de retomar la comunicación con el
              Usuario ni de atender nuevas comunicaciones del mismo si las
              causales que motivaron la terminación persisten o si el Usuario no
              ha reconocido la conducta inadecuada de forma expresa y de buena
              fe.
            </P>
            <P>
              b) La terminación de la comunicación no genera para el Usuario
              derecho a compensación económica, devolución de anticipos pagados,
              continuación del servicio ni ningún otro beneficio, salvo lo que
              corresponda expresamente conforme a las políticas específicas del
              Taller.
            </P>
            <P>
              c) El Taller puede bloquear al Usuario en el canal afectado y en
              cualquier otro canal oficial del Taller, a su discreción.
            </P>
          </div>
          <P>
            8.3 <strong>POTENCIAL REPORTE A AUTORIDADES.</strong> Cuando la
            conducta del Usuario durante la comunicación constituya, a juicio
            del Taller, un posible ilícito penal o administrativo conforme a la
            legislación de la República de El Salvador —incluyendo sin limitarse
            a amenazas, extorsión, acoso, injuria o calumnia—, el Taller podrá
            reportar dicha conducta ante las autoridades competentes, incluyendo
            la Policía Nacional Civil y la Fiscalía General de la República,
            aportando los registros de comunicación correspondientes como
            evidencia. El Usuario, al comunicarse con el Taller a través de sus
            canales oficiales, declara conocer y aceptar esta posibilidad.
          </P>
          <P>
            8.4{" "}
            <strong>
              LAS COMUNICACIONES PUEDEN SER CONSERVADAS COMO EVIDENCIA.
            </strong>{" "}
            El Taller puede conservar los registros de las comunicaciones
            mantenidas con el Usuario a través de sus canales oficiales,
            incluyendo mensajes de WhatsApp, comentarios en redes sociales,
            mensajes directos y cualquier otro registro, con el propósito de
            documentar el historial comercial, gestionar reclamaciones,
            evidenciar acuerdos o compromisos, y, cuando sea necesario,
            presentarlos ante autoridades competentes en el marco de las
            acciones legales que el Taller pudiera iniciar. El Usuario, al
            comunicarse con el Taller, acepta expresamente esta condición.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Privacidad de las comunicaciones">
          <P>
            9.1 Las comunicaciones intercambiadas entre el Usuario y el Taller a
            través de sus canales oficiales son tratadas como información
            confidencial de la relación comercial. El Taller no comparte el
            contenido de dichas comunicaciones con terceros ajenos a la gestión
            del pedido, salvo en los siguientes supuestos:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Cuando sea estrictamente necesario para la prestación del
              servicio, incluyendo la coordinación con proveedores,
              transportistas u otros colaboradores directamente involucrados en
              la ejecución del pedido.
            </P>
            <P>
              b) Cuando sea requerido por autoridad competente conforme a la
              legislación salvadoreña vigente, mediante orden o requerimiento
              oficial.
            </P>
            <P>
              c) Cuando el contenido de la comunicación constituya evidencia en
              el marco de acciones legales que el Taller haya iniciado en
              defensa de sus derechos e intereses, conforme a lo establecido en
              el Artículo 8.4.
            </P>
          </div>
          <P>
            9.2 El tratamiento de los datos personales del Usuario
            proporcionados durante las comunicaciones con el Taller está sujeto
            a la{" "}
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              Política de Privacidad del Taller
            </Link>
            .
          </P>
          <P>
            9.3 Las comunicaciones realizadas a través de WhatsApp están sujetas
            a las políticas de privacidad y términos de servicio de Meta
            Platforms, Inc., empresa propietaria de WhatsApp, sobre cuyas
            prácticas de tratamiento de datos el Taller no tiene control ni
            responsabilidad. Las comunicaciones realizadas a través de otras
            plataformas están sujetas a las políticas de privacidad de las
            plataformas correspondientes.
          </P>
          <P>
            9.4 El Taller advierte al Usuario que WhatsApp aplica cifrado de
            extremo a extremo a las comunicaciones. Sin embargo, los mensajes
            son visibles en el dispositivo del remitente y del receptor, y
            pueden ser objeto de capturas de pantalla, reenvíos u otras acciones
            por parte de cualquiera de las partes. El Taller no asume
            responsabilidad por la difusión de comunicaciones privadas realizada
            por terceros ajenos al Taller ni por el propio Usuario.
          </P>
        </Section>
        <Hr />

        <Section
          n={10}
          title="Validez de los acuerdos comunicados por canales oficiales"
        >
          <P>
            10.1 Solo tienen validez, son reconocidos por el Taller y son
            oponibles al Taller los acuerdos, compromisos, cotizaciones,
            confirmaciones, descuentos, condiciones especiales, plazos de
            entrega y cualquier otro término comercial que hayan sido
            comunicados por el Taller de forma expresa y por escrito a través de
            sus canales oficiales, en la versión vigente del directorio
            disponible en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            10.2 Los acuerdos, compromisos o condiciones comunicados verbalmente
            —ya sea en persona o a través de llamadas telefónicas no
            documentadas— no son reconocidos por el Taller como vinculantes, a
            menos que hayan sido confirmados posteriormente por escrito a través
            de los canales oficiales del Taller.
          </P>
          <P>
            10.3 Los acuerdos, compromisos o condiciones comunicados por
            personas que afirmen representar al Taller sin figurar en el
            directorio oficial disponible en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>{" "}
            no son reconocidos por el Taller como vinculantes, con independencia
            de la buena fe del Usuario al haber confiado en dichas
            comunicaciones.
          </P>
          <P>
            10.4 Los compromisos generados por mensajes pre-formateados,
            conforme a lo establecido en el Artículo 6, se rigen por las
            condiciones establecidas en dicho artículo y no constituyen acuerdos
            comerciales definitivos sino el inicio de un proceso de gestión del
            pedido.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Exención de responsabilidad del Taller">
          <P>
            11.1 En la máxima medida permitida por la legislación de la
            República de El Salvador, Confecciones Liss queda expresamente
            eximido de toda responsabilidad civil, comercial o de cualquier otra
            naturaleza, derivada de los siguientes supuestos, sin que esta
            enumeración sea limitativa:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Comunicaciones, acuerdos, pagos, depósitos o transacciones de
              cualquier tipo realizadas por el Usuario a través de canales no
              oficiales del Taller, incluyendo perfiles, números y plataformas
              que suplanten la identidad del Taller, dado que el Usuario tiene
              el deber de verificar la oficialidad del canal antes de
              interactuar.
            </P>
            <P>
              b) Pérdida de fondos, fraudes o estafas sufridos por el Usuario
              como consecuencia de haber interactuado con canales no oficiales
              que suplanten la identidad del Taller, dado que el Taller no tiene
              control sobre las acciones de terceros que operan dichos canales
              fraudulentos.
            </P>
            <P>
              c) Demoras en la respuesta o en la atención de consultas derivadas
              de alta demanda estacional, mensajes recibidos fuera del horario
              de atención, fuerza mayor, interrupciones técnicas en las
              plataformas de comunicación o cualquier otra causa fuera del
              control razonable del Taller.
            </P>
            <P>
              d) Malentendidos, gestiones incorrectas o imposibilidad de
              atención derivadas de mensajes pre-formateados editados por el
              propio Usuario de forma tal que resultaron en información
              incompleta, incorrecta o ambigua transmitida al Taller.
            </P>
            <P>
              e) Interrupciones, caídas, fallos técnicos o períodos de
              inactividad en los servicios de WhatsApp, redes sociales u otras
              plataformas de comunicación de terceros que impidan temporalmente
              la recepción o envío de mensajes a través de dichas plataformas,
              dado que el Taller no tiene control sobre la disponibilidad de
              servicios de plataformas externas.
            </P>
            <P>
              f) Pérdida de mensajes, historial de conversaciones o información
              compartida a través de plataformas de comunicación de terceros,
              derivada de fallos técnicos, eliminación de cuentas, restricciones
              de las plataformas o cualquier otra causa ajena al Taller.
            </P>
            <P>
              g) Las consecuencias de la terminación de la comunicación ejercida
              conforme al Artículo 8, cuando dicha terminación fue motivada por
              conductas del propio Usuario prohibidas en el Artículo 7.
            </P>
            <P>
              h) El contenido de las comunicaciones mantenidas entre el Usuario
              y el Taller que sea difundido por el propio Usuario o por terceros
              ajenos al Taller sin el consentimiento del Taller.
            </P>
            <P>
              i) Los daños o perjuicios que el Usuario pueda sufrir como
              consecuencia del bloqueo en los canales del Taller, cuando dicho
              bloqueo se haya realizado conforme a las causales establecidas en
              la presente Política.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={12} title="Relación con otras políticas del Taller">
          <P>
            12.1 La presente Política forma parte integral del marco jurídico y
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
                label: "Política de Privacidad:",
                href: "/legal/privacidad",
                url: "https://www.confeccionesliss.com/legal/privacidad",
              },
              {
                label: "Términos y Condiciones de Uso:",
                href: "/legal/terminos",
                url: "https://www.confeccionesliss.com/legal/terminos",
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
                label: "Política de Cotizaciones:",
                href: "/legal/cotizaciones",
                url: "https://www.confeccionesliss.com/legal/cotizaciones",
              },
              {
                label: "Política de Confección:",
                href: "/legal/confeccion",
                url: "https://www.confeccionesliss.com/legal/confeccion",
              },
              {
                label: "Política de UGC:",
                href: "/legal/ugc",
                url: "https://www.confeccionesliss.com/legal/ugc",
              },
              {
                label: "Política de Resolución de Disputas:",
                href: "/legal/disputas",
                url: "https://www.confeccionesliss.com/legal/disputas",
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
          <P>
            12.2 En caso de aparente conflicto entre la presente Política y
            cualquier otra política del Taller respecto a los supuestos
            regulados en este documento —concretamente, las condiciones de uso
            de los canales de comunicación oficiales— prevalecerán las
            disposiciones de la presente Política como instrumento específico en
            la materia.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Modificaciones a la Política">
          <P>
            13.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en los canales
            oficiales del Taller disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            13.2 Las modificaciones entrarán en vigencia de forma inmediata
            desde su publicación. El inicio o la continuación de cualquier
            comunicación con el Taller a través de sus canales oficiales con
            posterioridad a la publicación de cualquier modificación constituirá
            aceptación automática e irrevocable de la versión actualizada de la
            Política.
          </P>
          <P>
            13.3 El Taller no está obligado a notificar individualmente al
            Usuario sobre modificaciones a la presente Política. Es
            responsabilidad exclusiva del Usuario verificar periódicamente la
            versión vigente disponible en{" "}
            <Link
              href="/legal/comunicaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/comunicaciones
            </Link>
            .
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Resolución de disputas y jurisdicción aplicable">
          <P>
            14.1 Toda controversia que surja de la aplicación, interpretación o
            incumplimiento de la presente Política se resolverá en primera
            instancia mediante negociación directa de buena fe entre las partes,
            a través del Encargado de Comunicaciones del Taller, conforme al
            procedimiento establecido en la{" "}
            <Link
              href="/legal/disputas"
              className="text-blue-600 hover:underline"
            >
              Política de Resolución de Disputas
            </Link>
            .
          </P>
          <P>
            14.2 De no alcanzarse un acuerdo en un plazo razonable, la
            controversia se someterá a la jurisdicción exclusiva de los
            tribunales competentes del departamento de San Miguel, República de
            El Salvador, aplicando la legislación salvadoreña vigente.
          </P>
          <P>
            14.3 La legislación de la República de El Salvador es la única
            aplicable a la presente Política y a todas las relaciones jurídicas
            que de ella deriven. El Usuario renuncia expresamente a cualquier
            otro fuero o jurisdicción que pudiera corresponderle por razón de su
            domicilio, nacionalidad o lugar de comunicación.
          </P>
        </Section>
        <Hr />

        <Section n={15} title="Divisibilidad">
          <P>
            15.1 Si alguna disposición de la presente Política fuera declarada
            inválida, ilegal o inaplicable por un tribunal competente de la
            República de El Salvador, las restantes disposiciones continuarán en
            plena vigencia y efecto, sin que la invalidez parcial afecte la
            validez del conjunto del documento.
          </P>
          <P>
            15.2 En tal caso, la disposición declarada inválida será
            reemplazada, en la medida de lo posible, por una disposición válida
            que se aproxime al máximo a la intención original de la disposición
            invalidada.
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
              Política de Comunicaciones:
            </span>
            <Link
              href="/legal/comunicaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/comunicaciones
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

            <span style={{ fontWeight: "600" }}>Política de Cotizaciones:</span>
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cotizaciones
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Disputas:</span>
            <Link
              href="/legal/disputas"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/disputas
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
            <strong>Vigente desde su publicación — Versión:</strong> Junio 2026
          </div>
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
