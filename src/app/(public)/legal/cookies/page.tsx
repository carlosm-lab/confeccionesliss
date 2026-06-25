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
  title: "Política de Cookies y Tecnologías de Rastreo",
  description:
    "Política de Cookies de Confecciones Liss: uso de cookies funcionales, localStorage, tecnologías de rastreo, gestión y derechos del usuario sobre su uso.",
  keywords:
    "política cookies, cookies funcionales, localStorage, tecnologías rastreo, privacidad cookies, Confecciones Liss El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/cookies` },
  openGraph: {
    title: "Política de Cookies y Tecnologías de Rastreo | Confecciones Liss",
    description:
      "Política de Cookies de Confecciones Liss: uso de cookies funcionales, localStorage, tecnologías de rastreo, gestión y derechos del usuario sobre su uso.",
    url: `${siteConfig.url}/legal/cookies`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Cookies y Tecnologías de Rastreo | Confecciones Liss",
    description:
      "Política de Cookies de Confecciones Liss: uso de cookies funcionales, localStorage, tecnologías de rastreo, gestión y derechos del usuario sobre su uso.",
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

export default function PoliticaCookiesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/cookies`;
  const PAGE_TITLE = "Política de Cookies";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Uso de Cookies y Tecnologías de Rastreo — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de Cookies de Confecciones Liss: uso de cookies funcionales, localStorage, tecnologías de rastreo, gestión y derechos del usuario sobre su uso.",
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
        title="Política de Uso de Cookies y Tecnologías de Rastreo"
        category="Políticas de uso de cookies funcionales, almacenamiento local y tecnologías de rastreo en nuestro sitio web."
        date="24 Jun, 2026"
        readingTime={14}
      >
        <P>
          La presente Política de Uso de Cookies y Tecnologías de Rastreo (en
          adelante &quot;la Política&quot;) regula de manera integral,
          exhaustiva y vinculante la forma en que Confecciones Liss (en adelante
          &quot;el Taller&quot;) utiliza, gestiona e informa sobre el uso de
          cookies, almacenamiento local del navegador, tokens de sesión y
          cualquier otra tecnología de almacenamiento o acceso a información en
          el dispositivo del usuario en el marco del funcionamiento de su
          plataforma web oficial (
          <Link
            href="https://www.confeccionesliss.com/"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/
          </Link>
          , en adelante &quot;la Plataforma&quot;).
        </P>
        <P>
          Toda persona natural que acceda, navegue, consulte o utilice de
          cualquier forma la Plataforma (en adelante &quot;el Usuario&quot;)
          declara haber leído, comprendido y aceptado en su integridad, de forma
          libre, voluntaria e informada, la totalidad de los términos aquí
          establecidos. La mera navegación o acceso a la Plataforma constituye
          aceptación tácita, libre e irrevocable de la presente Política, aun
          cuando el Usuario no haya completado el registro de una cuenta ni
          realizado transacción alguna.
        </P>
        <P>
          El desconocimiento de esta Política no exime al Usuario de su
          cumplimiento, no le otorga derechos adicionales a los expresamente
          reconocidos en este documento, y no le confiere fundamento válido para
          reclamación alguna contra el Taller derivada del uso de las
          tecnologías aquí descritas.
        </P>
        <P>
          La presente Política debe leerse en conjunto con la Política de
          Privacidad del Taller, disponible en{" "}
          <Link
            href="/legal/privacidad"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/legal/privacidad
          </Link>
          , y con los Términos y Condiciones de Uso, disponibles en{" "}
          <Link
            href="/legal/terminos"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/legal/terminos
          </Link>
          , con los cuales forma un marco jurídico integral y coherente que rige
          la relación entre el Taller y el Usuario.
        </P>
        <Hr />

        <Section n={1} title="Definiciones">
          <P>
            1.1 A los efectos de la presente Política, y sin perjuicio de otras
            definiciones que puedan establecerse en las demás políticas del
            Taller, se entenderá por:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>&quot;Cookie&quot;:</strong> archivo de texto de
              pequeño tamaño que un sitio web deposita y almacena en el
              navegador del dispositivo del Usuario cuando este visita dicho
              sitio, con el propósito de recordar información sobre su visita,
              sus preferencias, su sesión o su comportamiento de navegación,
              para facilitar su experiencia en visitas posteriores o para
              habilitar determinadas funcionalidades del sitio.
            </P>
            <P>
              b){" "}
              <strong>
                &quot;Almacenamiento local&quot; o &quot;localStorage&quot;:
              </strong>{" "}
              mecanismo de almacenamiento de datos del navegador web que permite
              a las aplicaciones web guardar información directamente en el
              dispositivo del Usuario de forma persistente, sin fecha de
              expiración automática, de manera que los datos persistan entre
              distintas sesiones de navegación hasta que sean eliminados de
              forma manual por el Usuario o por la propia Plataforma mediante
              instrucción programática. A diferencia de las cookies
              tradicionales, los datos en localStorage no se transmiten
              automáticamente al servidor en cada solicitud HTTP, sino que
              permanecen en el dispositivo y son accedidos únicamente por el
              código de la propia Plataforma que los generó.
            </P>
            <P>
              c) <strong>&quot;Token de sesión&quot;:</strong> cadena de
              caracteres cifrada, generada de forma automática por el sistema de
              autenticación de la Plataforma cuando el Usuario inicia sesión,
              que permite al sistema verificar la identidad del Usuario durante
              el tiempo que dure su sesión activa, sin necesidad de que el
              Usuario ingrese sus credenciales repetidamente en cada página. Los
              tokens de sesión son de naturaleza estrictamente funcional y
              temporal, y expiran automáticamente al cerrar la sesión o
              transcurrido el período de vigencia establecido por el sistema.
            </P>
            <P>
              d) <strong>&quot;Tecnologías de rastreo&quot;:</strong> término
              genérico que comprende el conjunto de mecanismos técnicos
              utilizados para identificar, registrar, seguir o recordar
              información sobre el Usuario o su comportamiento en la Plataforma,
              incluyendo cookies, localStorage, tokens de sesión, píxeles de
              rastreo y cualquier otro mecanismo análogo.
            </P>
            <P>
              e){" "}
              <strong>
                &quot;Proveedores terceros&quot; o &quot;terceros&quot;:
              </strong>{" "}
              empresas y organizaciones externas al Taller cuyos servicios
              tecnológicos son utilizados por la Plataforma para funciones
              específicas, tales como alojamiento, base de datos, autenticación
              o distribución de contenido, y que como consecuencia de dicha
              integración pueden acceder a o generar datos técnicos en el
              dispositivo del Usuario o en sus propios sistemas.
            </P>
            <P>
              f) <strong>&quot;Cookie de primera parte&quot;:</strong> cookie o
              mecanismo de almacenamiento generado y gestionado directamente por
              la Plataforma del Taller, sin intervención de terceros.
            </P>
            <P>
              g) <strong>&quot;Cookie de terceros&quot;:</strong> cookie o
              mecanismo de almacenamiento generado por un dominio distinto al de
              la Plataforma del Taller, normalmente asociado a servicios
              externos integrados en la Plataforma.
            </P>
            <P>
              h){" "}
              <strong>
                &quot;Cookie funcional&quot; o &quot;cookie estrictamente
                necesaria&quot;:
              </strong>{" "}
              mecanismo de almacenamiento cuyo uso es imprescindible para el
              correcto funcionamiento de las funcionalidades básicas de la
              Plataforma, sin el cual ciertas características esenciales del
              servicio no podrían operar.
            </P>
            <P>
              i){" "}
              <strong>
                &quot;Cookie analítica&quot; o &quot;cookie de rastreo de
                comportamiento&quot;:
              </strong>{" "}
              mecanismo destinado a registrar y analizar el comportamiento del
              Usuario dentro de la Plataforma, con el fin de obtener
              estadísticas de uso, rendimiento o patrones de navegación.
            </P>
            <P>
              j){" "}
              <strong>
                &quot;Cookie publicitaria&quot; o &quot;cookie de
                segmentación&quot;:
              </strong>{" "}
              mecanismo destinado a rastrear los intereses del Usuario con el
              propósito de mostrarle publicidad personalizada dentro o fuera de
              la Plataforma.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={2} title="Principio general: mínima recopilación de datos">
          <P>
            2.1 Confecciones Liss opera la Plataforma bajo el principio de
            mínima recopilación de datos, entendido como el compromiso de no
            recopilar, almacenar ni procesar más información del Usuario que la
            estrictamente necesaria para el funcionamiento correcto de las
            funcionalidades de la Plataforma y para la prestación del servicio
            de confección que el Taller ofrece.
          </P>
          <P>
            2.2 En coherencia con este principio, la Plataforma no implementa,
            no integra ni utiliza ninguna de las siguientes tecnologías, de
            forma expresa y declarada:
          </P>
          <Ul
            items={[
              "Cookies publicitarias o de segmentación de ningún tipo, ya sea de primera parte o de terceros.",
              "Píxeles de seguimiento de redes publicitarias, incluyendo sin limitarse a Meta Pixel (Facebook/Instagram Ads), Google Ads Tag, TikTok Pixel, Snap Pixel, Pinterest Tag ni ningún otro píxel de retargeting o seguimiento publicitario.",
              "Herramientas de análisis de comportamiento del Usuario dentro de la Plataforma, tales como Google Analytics, Google Tag Manager, Hotjar, Clarity, Mixpanel, Segment, Amplitude ni ninguna herramienta analítica similar que registre sesiones, mapas de calor, grabaciones de pantalla o flujos de navegación individualizados.",
              "Cookies de terceros con fines de seguimiento entre sitios web o de construcción de perfiles de Usuario fuera de la Plataforma.",
              'Scripts de carga de redes sociales que impliquen seguimiento del Usuario, tales como botones de "Me gusta" o widgets de feed social que recopilen datos de comportamiento.',
            ]}
          />
          <P>
            2.3 El Taller declara que la ausencia de las tecnologías enumeradas
            en el numeral anterior no limita la funcionalidad esencial de la
            Plataforma, la cual ha sido diseñada para operar correctamente sin
            depender de mecanismos de rastreo publicitario o analítico externo.
          </P>
          <P>
            2.4 Si en el futuro el Taller considerara la incorporación de
            cualquiera de las tecnologías descritas en el numeral 2.2, la
            presente Política será actualizada de forma previa a su
            implementación, y el Usuario será informado mediante el aviso
            visible en la Plataforma. La continuación del uso de la Plataforma
            tras dicha actualización implicará aceptación de los nuevos
            términos.
          </P>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Tecnologías de almacenamiento efectivamente utilizadas"
        >
          <P>
            3.1 Las únicas tecnologías de almacenamiento local que la Plataforma
            de Confecciones Liss utiliza actualmente son las siguientes,
            descritas en detalle a continuación:
          </P>

          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              <strong>
                A) ALMACENAMIENTO LOCAL (localStorage) — CARRITO DE COMPRAS:
              </strong>
            </P>
            <P>
              La Plataforma almacena en el localStorage del navegador del
              Usuario los datos asociados a su carrito de compras, incluyendo
              los identificadores de los productos añadidos, las cantidades
              seleccionadas y una marca de tiempo de última modificación del
              carrito. Este almacenamiento permite que los productos añadidos al
              carrito persistan entre recargas de página y entre distintas
              sesiones de navegación, sin que el Usuario deba añadir nuevamente
              los productos cada vez que ingresa a la Plataforma.
            </P>
            <P>
              Los datos del carrito almacenados en localStorage son eliminados
              automáticamente por la Plataforma transcurridos siete (7) días
              calendario desde la última modificación del carrito, o cuando el
              Usuario vacía el carrito de forma manual. Dichos datos no se
              transmiten a ningún servidor del Taller ni de terceros mientras el
              Usuario no realice una acción activa de pedido o contacto.
            </P>
            <P>
              Este almacenamiento es estrictamente funcional. Sin él, el carrito
              de la Plataforma no podría conservar los productos seleccionados
              entre páginas ni entre sesiones, lo que haría imposible el uso
              básico de esta funcionalidad.
            </P>

            <P>
              <strong>
                B) ALMACENAMIENTO LOCAL (localStorage) — PRODUCTOS FAVORITOS:
              </strong>
            </P>
            <P>
              La Plataforma almacena en localStorage los identificadores de los
              productos que el Usuario ha marcado como favoritos, de forma que
              dicha selección persista entre sesiones sin necesidad de que el
              Usuario haya iniciado sesión con una cuenta registrada. Para
              Usuarios con cuenta registrada, los favoritos pueden sincronizarse
              con la base de datos del Taller, en cuyo caso el dato abandona el
              dispositivo y queda vinculado al perfil del Usuario conforme a la
              Política de Privacidad del Taller.
            </P>
            <P>
              Este almacenamiento es estrictamente funcional. Sin él, la lista
              de favoritos del Usuario desaparecería al cerrar el navegador o al
              recargar la Plataforma.
            </P>

            <P>
              <strong>
                C) ALMACENAMIENTO LOCAL (localStorage) — PREFERENCIA DE MODO
                VISUAL:
              </strong>
            </P>
            <P>
              La Plataforma almacena en localStorage la preferencia del Usuario
              respecto al modo visual de la interfaz: modo claro (light mode) o
              modo oscuro (dark mode). Este dato es de naturaleza completamente
              local, no se transmite a ningún servidor y persiste en el
              dispositivo indefinidamente hasta que el Usuario cambia su
              preferencia o elimina manualmente el localStorage de la
              Plataforma.
            </P>
            <P>
              Este almacenamiento es estrictamente funcional. Sin él, la
              Plataforma presentaría siempre la interfaz en su modo visual
              predeterminado, ignorando la preferencia previamente expresada por
              el Usuario.
            </P>

            <P>
              <strong>
                D) ALMACENAMIENTO LOCAL (localStorage) — REGISTRO DE ACEPTACIÓN
                DEL AVISO INFORMATIVO DE COOKIES:
              </strong>
            </P>
            <P>
              La Plataforma almacena en localStorage un valor lógico
              (verdadero/falso) que registra si el Usuario ha interactuado con
              el aviso informativo de cookies que se muestra en la primera
              visita a la Plataforma. Este valor permite que el aviso no se
              muestre repetidamente en visitas posteriores a Usuarios que ya lo
              han reconocido.
            </P>
            <P>
              Este dato es completamente local, no se transmite al servidor del
              Taller ni a ningún tercero, y no identifica al Usuario de forma
              individual. Su única función es suprimir el aviso ya reconocido,
              en beneficio de la experiencia de navegación del Usuario.
            </P>

            <P>
              <strong>
                E) TOKENS DE SESIÓN — AUTENTICACIÓN MEDIANTE GOOGLE OAUTH Y
                SUPABASE:
              </strong>
            </P>
            <P>
              Cuando el Usuario decide de forma voluntaria y activa iniciar
              sesión en la Plataforma mediante su cuenta de Google (Google
              OAuth), el sistema de autenticación gestionado por Supabase genera
              y almacena en el navegador un token de sesión cifrado. Este token
              permite al sistema verificar que el Usuario está autenticado
              mientras navega por las distintas páginas de la Plataforma, sin
              necesidad de que ingrese sus credenciales repetidamente.
            </P>
            <P>
              El token de sesión expira automáticamente al cerrar la sesión
              activa del Usuario o transcurrido el tiempo de vigencia definido
              por el sistema de autenticación. No se utiliza para rastrear al
              Usuario fuera de la Plataforma, no se comparte con terceros
              distintos a Supabase en su función de proveedor de autenticación,
              y no contiene información sensible del Usuario en texto legible.
            </P>
            <P>
              El uso de esta tecnología es estrictamente funcional y
              condicional: únicamente opera cuando el Usuario decide iniciar
              sesión. Los Usuarios que navegan la Plataforma sin iniciar sesión
              no son afectados por este mecanismo.
            </P>
          </div>

          <P>
            3.2 Para mayor claridad, se confirma que los únicos datos que se
            almacenan localmente en el dispositivo del Usuario son los descritos
            en el numeral anterior. La Plataforma no deposita ningún otro tipo
            de información en el dispositivo del Usuario que no haya sido
            expresamente declarado en este artículo.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Finalidad del uso de cada tecnología">
          <P>
            4.1 Todas las tecnologías de almacenamiento descritas en el Artículo
            3 tienen finalidad exclusivamente funcional. Ninguna de ellas tiene
            finalidad publicitaria, de elaboración de perfiles, de monetización
            de datos del Usuario, de seguimiento entre sitios web ni de
            identificación del Usuario fuera de la Plataforma. La finalidad
            específica de cada tecnología es la siguiente:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              <strong>localStorage — Carrito:</strong> persistir la selección de
              productos entre páginas y sesiones.
            </P>
            <P>
              <strong>localStorage — Favoritos:</strong> conservar la lista de
              favoritos sin necesidad de cuenta registrada.
            </P>
            <P>
              <strong>localStorage — Modo visual:</strong> recordar la
              preferencia de interfaz (claro/oscuro) del Usuario.
            </P>
            <P>
              <strong>localStorage — Aviso de cookies:</strong> suprimir el
              aviso de cookies para Usuarios que ya lo han reconocido.
            </P>
            <P>
              <strong>Token de sesión (OAuth/Supabase):</strong> mantener la
              sesión activa del Usuario autenticado sin requerir inicio de
              sesión repetido.
            </P>
          </div>
          <P>
            4.2 Ninguna de las tecnologías descritas genera ingresos directos ni
            indirectos para el Taller derivados del procesamiento de datos del
            Usuario. El Taller no vende, no cede, no arrienda ni comercializa en
            forma alguna la información almacenada mediante dichas tecnologías.
          </P>
          <P>
            4.3 Los datos almacenados en localStorage son accesibles únicamente
            desde el código de la propia Plataforma, en el dominio{" "}
            <Link
              href="https://www.confeccionesliss.com/"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/
            </Link>
            . Otros sitios web no pueden acceder a los datos almacenados en
            localStorage por la Plataforma, por diseño inherente del estándar de
            seguridad del navegador conocido como Same-Origin Policy.
          </P>
        </Section>
        <Hr />

        <Section
          n={5}
          title="Proveedores terceros: tecnologías e implicaciones"
        >
          <P>
            5.1 La Plataforma integra servicios de terceros que, como parte de
            su funcionamiento técnico, pueden generar o acceder a datos de
            conexión del Usuario en sus propios sistemas. El Taller no tiene
            control directo sobre el tratamiento de datos que dichos terceros
            realicen en sus propias infraestructuras, los cuales se rigen por
            sus respectivas políticas de privacidad. A continuación se detalla
            cada proveedor:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              <strong>A) SUPABASE:</strong> proveedor de base de datos
              relacional y sistema de autenticación de la Plataforma. Cuando el
              Usuario crea una cuenta, inicia sesión o realiza operaciones que
              requieren persistencia de datos (como la sincronización de
              favoritos o el historial de pedidos), los datos son almacenados en
              la base de datos gestionada por Supabase. Como parte del
              funcionamiento normal de su servicio, Supabase puede registrar
              datos técnicos de conexión tales como dirección IP, marcas de
              tiempo de las solicitudes y metadatos de las operaciones
              realizadas. Política de privacidad:{" "}
              <Link
                href="https://supabase.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://supabase.com/privacy
              </Link>
              . Categoría de uso: funcional. Finalidad publicitaria: no aplica.
            </P>
            <P>
              <strong>B) GOOGLE — OAUTH 2.0:</strong> la Plataforma ofrece al
              Usuario la opción de iniciar sesión mediante su cuenta de Google a
              través del protocolo OAuth 2.0. Cuando el Usuario elige esta
              opción, Google procesa los datos de autenticación necesarios para
              verificar la identidad del Usuario y devolver al sistema de la
              Plataforma el identificador único y el correo electrónico
              vinculado a la cuenta de Google del Usuario. Este proceso es
              voluntario y condicional. Política de privacidad:{" "}
              <Link
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://policies.google.com/privacy
              </Link>
              . Categoría de uso: funcional — autenticación. Finalidad
              publicitaria: el Taller no contrata servicios publicitarios de
              Google ni transfiere datos de sus Usuarios a Google Ads.
            </P>
            <P>
              <strong>C) VERCEL:</strong> proveedor de servicios de hosting y
              red de distribución de contenido (CDN) de la Plataforma. Vercel
              registra automáticamente datos técnicos de cada solicitud
              realizada a la Plataforma, incluyendo la dirección IP, el tipo y
              versión del navegador (user agent), las rutas o páginas
              solicitadas, los tiempos de respuesta del servidor y los códigos
              de estado HTTP. Estos datos se utilizan con fines operativos, de
              seguridad y de rendimiento de la infraestructura, y no son
              compartidos con el Taller en forma individual ni identificada.
              Política de privacidad:{" "}
              <Link
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://vercel.com/legal/privacy-policy
              </Link>
              . Categoría de uso: infraestructura. Finalidad publicitaria: no
              aplica.
            </P>
          </div>
          <P>
            5.2 El Taller selecciona sus proveedores tecnológicos evaluando,
            entre otros criterios, las garantías que ofrecen en materia de
            protección de datos y privacidad. Sin embargo, el Taller no asume
            responsabilidad por el tratamiento de datos que dichos terceros
            realicen en sus propias infraestructuras conforme a sus propias
            políticas, más allá del rol del Taller como responsable del
            tratamiento de los datos que gestiona directamente a través de la
            Plataforma.
          </P>
          <P>
            5.3 El Usuario que tenga dudas o inquietudes sobre el tratamiento de
            sus datos por parte de los proveedores terceros mencionados en este
            artículo puede dirigirse directamente a dichos proveedores a través
            de los canales indicados en sus respectivas políticas de privacidad.
          </P>
        </Section>
        <Hr />

        <Section
          n={6}
          title="Base jurídica del uso de tecnologías de almacenamiento"
        >
          <P>
            6.1 La base jurídica que fundamenta el uso de las tecnologías de
            almacenamiento descritas en el Artículo 3 de la presente Política es
            el interés legítimo del Taller en mantener el funcionamiento
            correcto y la usabilidad adecuada de la Plataforma, combinado con la
            necesidad técnica de dichas tecnologías para la prestación del
            servicio.
          </P>
          <P>
            6.2 Dado que todas las tecnologías utilizadas son de naturaleza
            estrictamente funcional —es decir, son necesarias para el correcto
            funcionamiento de las características básicas de la Plataforma—, su
            uso no requiere, bajo los estándares generales aplicables, el
            consentimiento previo explícito del Usuario en los mismos términos
            que se exige para cookies analíticas o publicitarias. Sin perjuicio
            de lo anterior, el Taller informa proactivamente al Usuario sobre su
            uso mediante el aviso visible en la primera visita y mediante la
            presente Política, en cumplimiento del principio de transparencia
            que rige el tratamiento de datos del Taller.
          </P>
          <P>
            6.3 El token de sesión descrito en el Artículo 3, literal E, se
            genera exclusivamente como consecuencia de una acción activa y
            voluntaria del Usuario (iniciar sesión), por lo que su base jurídica
            es el consentimiento expreso derivado de dicha acción.
          </P>
          <P>
            6.4 En todos los casos, el tratamiento se limita al mínimo necesario
            para cumplir la finalidad declarada, conforme al principio de
            minimización de datos que el Taller aplica en toda su operación
            digital.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Gestión de preferencias y eliminación de datos locales"
        >
          <P>
            7.1 El Usuario puede en todo momento gestionar, limitar o eliminar
            los datos almacenados en su dispositivo por la Plataforma, mediante
            las siguientes acciones disponibles directamente desde su navegador
            o desde la Plataforma:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              <strong>
                A) ELIMINACIÓN DEL LOCALSTORAGE DESDE EL NAVEGADOR:
              </strong>{" "}
              el Usuario puede eliminar todos los datos almacenados por la
              Plataforma en el localStorage de su navegador accediendo a las
              herramientas de desarrollo del navegador (habitualmente mediante
              la tecla F12 o la combinación Ctrl+Shift+I en navegadores de
              escritorio), navegando a la sección &quot;Aplicación&quot;
              (Application) y seleccionando &quot;Almacenamiento local&quot;
              (Local Storage) para el dominio{" "}
              <Link
                href="https://www.confeccionesliss.com/"
                className="text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/
              </Link>
              . Alternativamente, el Usuario puede limpiar todos los datos de
              sitios web desde la configuración de privacidad de su navegador.
              Esta eliminación tendrá los siguientes efectos: pérdida del
              carrito no sincronizado, pérdida de la lista de favoritos no
              sincronizada, restablecimiento al modo visual predeterminado y
              reaparición del aviso informativo de cookies en la siguiente
              visita.
            </P>
            <P>
              <strong>B) CIERRE DE SESIÓN Y REVOCACIÓN DEL TOKEN:</strong> el
              Usuario puede revocar el token de sesión activo cerrando sesión en
              la Plataforma a través de la opción correspondiente disponible en
              su perfil. El cierre de sesión invalida el token de Supabase y
              elimina cualquier dato de autenticación almacenado localmente.
              Tras cerrar sesión, el Usuario deberá autenticarse nuevamente para
              acceder a las funcionalidades que requieran cuenta registrada.
            </P>
            <P>
              <strong>C) REVOCACIÓN DEL ACCESO DE GOOGLE OAUTH:</strong> el
              Usuario puede revocar el acceso que otorgó a la Plataforma sobre
              su cuenta de Google accediendo a la configuración de seguridad de
              su cuenta en{" "}
              <Link
                href="https://myaccount.google.com/permissions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://myaccount.google.com/permissions
              </Link>{" "}
              y eliminando el acceso correspondiente a Confecciones Liss. Esta
              acción desvincula la autenticación OAuth sin afectar los datos
              almacenados en la base de datos del Taller asociados a la cuenta
              del Usuario, los cuales están sujetos a la Política de Privacidad
              del Taller.
            </P>
            <P>
              <strong>D) NAVEGACIÓN EN MODO INCÓGNITO O PRIVADO:</strong> el
              Usuario que prefiera que ningún dato sea almacenado de forma
              persistente en su dispositivo puede navegar la Plataforma en modo
              incógnito o privado de su navegador. En este modo, todos los datos
              de localStorage y tokens de sesión son eliminados automáticamente
              al cerrar la ventana de navegación privada, sin dejar rastro en el
              dispositivo. El Taller advierte que este modo limita el
              funcionamiento del carrito y los favoritos.
            </P>
          </div>
          <P>
            7.2 El Taller no asume responsabilidad por pérdida de datos del
            carrito, favoritos, preferencias u otra información almacenada en
            localStorage que sea consecuencia directa de acciones de limpieza
            realizadas por el propio Usuario, de la configuración de su
            navegador o de la utilización del modo incógnito.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Aviso informativo de cookies en la Plataforma">
          <P>
            8.1 La Plataforma muestra al Usuario, en su primera visita, un aviso
            informativo visible sobre el uso de tecnologías de almacenamiento.
            Este aviso tiene como propósito informar al Usuario, de forma
            concisa y accesible, sobre el tipo de datos que se almacenan en su
            dispositivo, conforme al principio de transparencia que rige la
            operación del Taller.
          </P>
          <P>
            8.2 El aviso informativo contiene un enlace a la presente Política
            para que el Usuario pueda consultar la información completa y
            detallada.
          </P>
          <P>
            8.3 La interacción del Usuario con el aviso informativo —ya sea
            cerrándolo, dando clic en el botón de aceptación o simplemente
            continuando la navegación— registra el valor de aceptación en el
            localStorage del dispositivo, tal como se describe en el Artículo 3,
            literal D, de forma que el aviso no se muestre nuevamente en visitas
            posteriores desde el mismo dispositivo y navegador.
          </P>
          <P>
            8.4 El aviso informativo no tiene como finalidad solicitar
            consentimiento para el uso de tecnologías publicitarias, dado que la
            Plataforma no utiliza ninguna, según lo declarado en el Artículo 2.
            Su propósito es exclusivamente informativo y de transparencia.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Exención de responsabilidad del Taller">
          <P>
            9.1 En la máxima medida permitida por la legislación de la República
            de El Salvador, Confecciones Liss queda expresamente eximido de toda
            responsabilidad civil, comercial o de cualquier otra naturaleza,
            derivada de los siguientes supuestos, sin que esta enumeración sea
            limitativa:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El procesamiento de datos técnicos de conexión realizado de
              forma autónoma por los proveedores terceros descritos en el
              Artículo 5 (Supabase, Google, Vercel), conforme a sus propias
              políticas de privacidad y fuera del control directo del Taller.
            </P>
            <P>
              b) La pérdida de datos del carrito, favoritos, preferencias u otra
              información almacenada en localStorage, derivada de la limpieza
              manual del localStorage por parte del Usuario, del uso del modo
              incógnito o privado del navegador, de la configuración de
              privacidad del navegador del Usuario, o de la expiración
              automática de los datos conforme a los plazos establecidos por la
              Plataforma.
            </P>
            <P>
              c) Incompatibilidades entre la Plataforma y determinados
              navegadores, versiones de navegador, sistemas operativos,
              extensiones de privacidad, bloqueadores de scripts o
              configuraciones de seguridad que impidan el correcto
              almacenamiento o recuperación de datos en el localStorage,
              afectando el funcionamiento de las funcionalidades dependientes de
              dicho almacenamiento.
            </P>
            <P>
              d) El uso de extensiones de bloqueo de cookies o de almacenamiento
              local por parte del Usuario, y las consecuencias funcionales que
              dicho bloqueo pueda tener sobre la experiencia de uso de la
              Plataforma, incluyendo la imposibilidad de usar el carrito de
              compras, la lista de favoritos o la persistencia de la preferencia
              visual.
            </P>
            <P>
              e) Interrupciones, caídas o fallos técnicos en los servicios de
              Supabase, Google o Vercel que impidan temporalmente el acceso a la
              Plataforma o el funcionamiento de sus funcionalidades, dado que
              dichos servicios dependen de la disponibilidad de plataformas
              externas sobre las que el Taller no tiene control.
            </P>
            <P>
              f) La pérdida o el acceso no autorizado a datos almacenados en el
              dispositivo del Usuario como consecuencia de vulnerabilidades de
              seguridad en el propio dispositivo, navegador o sistema operativo
              del Usuario, situaciones que son ajenas al ámbito de control del
              Taller.
            </P>
            <P>
              g) Cualquier interpretación errónea del Usuario sobre el alcance
              del aviso informativo de cookies como consentimiento para
              tecnologías publicitarias, dado que la Plataforma no utiliza
              ninguna y la presente Política lo declara expresamente.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={10} title="Relación con otras políticas del Taller">
          <P>
            10.1 La presente Política forma parte integral del marco jurídico y
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
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Privacidad:</strong>{" "}
                <Link
                  href="/legal/privacidad"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/privacidad
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Términos y Condiciones de Uso:</strong>{" "}
                <Link
                  href="/legal/terminos"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/terminos
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Deberes del Usuario:</strong>{" "}
                <Link
                  href="/legal/deberes"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/deberes
                </Link>
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span>—</span>
              <div>
                <strong>Política de Derechos del Usuario:</strong>{" "}
                <Link
                  href="/legal/derechos"
                  className="text-blue-600 hover:underline"
                >
                  https://www.confeccionesliss.com/legal/derechos
                </Link>
              </div>
            </div>
          </div>
          <P>
            10.2 En caso de aparente conflicto entre la presente Política y la
            Política de Privacidad del Taller respecto a los supuestos regulados
            en este documento —concretamente, el uso de tecnologías de
            almacenamiento local—, prevalecerán las disposiciones de la presente
            Política como instrumento específico en la materia.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Canales oficiales de comunicación">
          <P>
            11.1 Toda consulta, duda o reclamación relacionada con la presente
            Política, incluyendo solicitudes de información sobre los datos
            almacenados en el dispositivo del Usuario o sobre el funcionamiento
            de las tecnologías descritas, deberá realizarse exclusivamente a
            través de los canales oficiales de Confecciones Liss, disponibles
            en:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </P>
          <P>
            11.2 El Taller no reconocerá consultas ni reclamaciones realizadas a
            través de canales no oficiales, personas no autorizadas ni medios
            distintos a los establecidos en el numeral anterior.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Modificaciones a la Política">
          <P>
            12.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en:{" "}
            <Link
              href="/legal/cookies"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cookies
            </Link>
          </P>
          <P>
            12.2 Las modificaciones entrarán en vigencia de forma inmediata
            desde su publicación. El acceso continuado a la Plataforma con
            posterioridad a la publicación de cualquier modificación constituirá
            aceptación automática e irrevocable de la versión actualizada de la
            Política.
          </P>
          <P>
            12.3 El Taller no está obligado a notificar individualmente al
            Usuario sobre modificaciones a la presente Política. Es
            responsabilidad exclusiva del Usuario verificar periódicamente la
            versión vigente. No obstante, el Taller realizará esfuerzos
            razonables por comunicar cambios significativos mediante un aviso
            visible en la Plataforma durante un período prudencial tras la
            actualización.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Divisibilidad">
          <P>
            13.1 Si alguna disposición de la presente Política fuera declarada
            inválida, ilegal o inaplicable por un tribunal competente de la
            República de El Salvador, las restantes disposiciones continuarán en
            plena vigencia y efecto, sin que la invalidez parcial afecte la
            validez del conjunto del documento.
          </P>
          <P>
            13.2 En tal caso, la disposición declarada inválida será
            interpretada o sustituida, en la medida de lo posible, por una
            disposición válida que se aproxime al máximo a la intención original
            de la disposición invalidada.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Jurisdicción aplicable">
          <P>
            14.1 La presente Política se rige e interpreta de conformidad con
            las leyes vigentes de la República de El Salvador. Toda controversia
            que surja de su aplicación, interpretación o incumplimiento se
            someterá a la jurisdicción exclusiva de los tribunales competentes
            del departamento de San Miguel, República de El Salvador.
          </P>
          <P>
            14.2 La legislación salvadoreña vigente es la única aplicable a la
            presente Política, con exclusión de cualquier normativa extranjera,
            salvo los compromisos contractuales que el Taller mantenga con sus
            proveedores tecnológicos terceros conforme a los términos de dichos
            proveedores.
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

            <span style={{ fontWeight: "600" }}>Política de Cookies:</span>
            <Link
              href="/legal/cookies"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cookies
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
            <strong>Encargado de Comunicaciones:</strong> Carlos José Molina
            Villacorta
            <br />
            <strong>Vigente desde su publicación — Versión:</strong> Junio 2026
          </div>
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
