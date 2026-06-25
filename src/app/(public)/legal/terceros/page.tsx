import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import { Section, Hr, P, LegalFootnote } from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Logos y de Identidad de Terceros",
  description:
    "Política de Confecciones Liss sobre el uso de logotipos de terceros: descargo de responsabilidad, propiedad intelectual, marcas registradas y permisos.",
  keywords:
    "logotipos de terceros, marcas registradas, descargo de responsabilidad, propiedad intelectual, uniformes personalizados, logos institucionales El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/terceros` },
  openGraph: {
    title: "Política de Logos y de Identidad de Terceros | Confecciones Liss",
    description:
      "Política de Confecciones Liss sobre el uso de logotipos de terceros: descargo de responsabilidad, propiedad intelectual, marcas registradas y permisos.",
    url: `${siteConfig.url}/legal/terceros`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Logos y de Identidad de Terceros | Confecciones Liss",
    description:
      "Política de Confecciones Liss sobre el uso de logotipos de terceros: descargo de responsabilidad, propiedad intelectual, marcas registradas y permisos.",
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

export default function PoliticaTercerosPage() {
  const PAGE_URL = `${siteConfig.url}/legal/terceros`;
  const PAGE_TITLE = "Política de Logos de Terceros";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Logos y de Identidad de Terceros | Confecciones Liss",
          description:
            "Política de Confecciones Liss sobre el uso de logotipos de terceros: descargo de responsabilidad, propiedad intelectual, marcas registradas y permisos.",
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
        title="Política de Descargo de Responsabilidad por Uso de Logotipos, Imágenes e Identidad Visual Institucional de Terceros en Servicios de Confección y Canales Digitales Oficiales"
        category="Descargo de responsabilidad por el uso de logotipos, marcas registradas e identidad institucional de terceros."
        date="24 Jun, 2026"
        readingTime={20}
      >
        <P>
          La presente Política de Descargo de Responsabilidad por Uso de
          Logotipos, Imágenes e Identidad Visual Institucional de Terceros (en
          adelante &quot;la Política&quot;) regula de manera integral,
          exhaustiva y vinculante la posición oficial de Confecciones Liss (en
          adelante &quot;el Taller&quot;) respecto al uso, la reproducción, la
          publicación y la aplicación de marcas, logotipos, colores
          institucionales, denominaciones, escudos, emblemas y cualquier otro
          elemento de identidad visual (en adelante &quot;Elementos de Identidad
          Institucional&quot;) que correspondan a instituciones educativas,
          universidades, centros de salud, empresas, entidades públicas o
          privadas, o cualquier otra organización (en adelante &quot;las
          Instituciones&quot;), tanto sobre las prendas, uniformes y productos
          textiles que el Taller confecciona a solicitud de sus clientes, como
          en el contenido publicado en la plataforma web oficial del Taller (
          <Link
            href="https://www.confeccionesliss.com/"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/
          </Link>
          ), sus redes sociales y cualquier otro canal digital oficial.
        </P>
        <P>
          Toda persona natural que contrate, solicite, adquiera o encargue
          servicios de confección al Taller que impliquen la reproducción de
          Elementos de Identidad Institucional de terceros (en adelante &quot;el
          Cliente&quot;), y toda persona que acceda, navegue o interactúe con
          cualquier contenido del Taller en sus canales digitales (en adelante
          &quot;el Usuario&quot;), declara haber leído, comprendido y aceptado
          en su integridad, de forma libre, voluntaria e informada, la totalidad
          de los términos aquí establecidos. El desconocimiento de esta Política
          no exime al Cliente ni al Usuario de su cumplimiento, no les otorga
          derechos adicionales a los expresamente reconocidos en este documento,
          y no les confiere fundamento válido para reclamación alguna contra el
          Taller.
        </P>
        <Hr />

        <Section
          n={1}
          title="Objeto y naturaleza del servicio de confección institucional"
        >
          <P>
            1.1 Confecciones Liss es un taller de confección de prendas y
            uniformes que presta, entre otros, el servicio de confección de
            uniformes institucionales, entendidos como prendas que incorporan
            Elementos de Identidad Institucional de terceras entidades, tales
            como universidades, institutos técnicos, clínicas, hospitales,
            empresas u otras organizaciones, a solicitud expresa e iniciativa
            exclusiva del Cliente.
          </P>
          <P>
            1.2 El Taller actúa en todo momento en calidad de ejecutor técnico
            del pedido del Cliente. El servicio que presta el Taller es la
            confección física de la prenda: el corte, la costura, el acabado
            textil y la aplicación técnica de los elementos de personalización
            en el soporte físico. El Taller no es diseñador institucional, no es
            representante de ninguna institución, no actúa como agente
            autorizado de ninguna entidad, y no tiene vínculo comercial,
            contractual ni institucional alguno con las entidades cuyas marcas o
            logotipos el Cliente solicita reproducir.
          </P>
          <P>
            1.3 La iniciativa de encargar uniformes que incorporen Elementos de
            Identidad Institucional de terceros corresponde en todos los casos
            al Cliente, quien actúa de forma autónoma e independiente al
            solicitar dicho servicio. El Taller no promueve, no incentiva ni
            toma iniciativa propia en el uso de marcas institucionales de
            terceros, limitándose a ejecutar técnicamente el encargo del Cliente
            conforme a las especificaciones que este proporciona.
          </P>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Titularidad de los elementos de identidad institucional"
        >
          <P>
            2.1 Confecciones Liss reconoce expresamente que los logotipos,
            escudos, emblemas, colores institucionales, denominaciones
            protegidas, marcas registradas y cualquier otro Elemento de
            Identidad Institucional —ya sea reproducido sobre prendas
            confeccionadas a solicitud del Cliente o publicado en los canales
            digitales del Taller— pertenece a sus respectivos titulares, es
            decir, a las Instituciones correspondientes, y no a Confecciones
            Liss.
          </P>
          <P>
            2.2 El Taller no reclama, no ha reclamado ni reclamará titularidad
            alguna, derecho de propiedad, licencia exclusiva ni ningún otro
            derecho de propiedad intelectual sobre los Elementos de Identidad
            Institucional de terceros. El uso de dichos elementos en el proceso
            de confección o su publicación en canales digitales no implica
            reivindicación de derechos por parte del Taller, ni autorización
            tácita de ningún tipo.
          </P>
          <P>
            2.3 El Taller no comercializa ni lucra directamente con los
            Elementos de Identidad Institucional como tales. El objeto de la
            contraprestación económica recibida por el Taller es exclusivamente
            el servicio de confección física de la prenda: la mano de obra, los
            materiales textiles y los procesos de personalización aplicados. Los
            Elementos de Identidad Institucional no son el producto que el
            Taller vende; son el contenido que el Cliente solicita aplicar sobre
            la prenda que el Taller confecciona, y que el Taller puede mostrar
            en sus canales digitales únicamente como referencia visual del
            trabajo de confección realizado.
          </P>
          <P>
            2.4 En consecuencia, el Taller no asume ni puede asumir
            responsabilidad alguna por la titularidad, la vigencia, el alcance
            ni las restricciones de uso de los Elementos de Identidad
            Institucional, toda vez que dichos derechos pertenecen en exclusiva
            a las Instituciones correspondientes y no están bajo el control del
            Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Origen y fuente de los elementos de identidad institucional"
        >
          <P>
            3.1 Los Elementos de Identidad Institucional que el Taller aplica
            sobre las prendas confeccionadas o que aparecen en su contenido
            digital son proporcionados directa y exclusivamente por el propio
            Cliente, o son obtenidos por el Taller de fuentes de acceso público
            disponibles en Internet, tales como sitios web oficiales de las
            Instituciones, plataformas públicas de descarga de activos
            institucionales, repositorios de uso compartido y cualquier otro
            medio de acceso libre y público disponible en la red.
          </P>
          <P>
            3.2 El Taller no obtiene, no adquiere ni accede a los Elementos de
            Identidad Institucional mediante métodos ilegales, ilícitos,
            engañosos ni contrarios a derecho. El Taller obra de buena fe al
            utilizar información disponible en el dominio público de Internet,
            entendiendo que su acceso no está restringido ni condicionado a
            autorización previa individual.
          </P>
          <P>
            3.3 El Taller no verifica ni está en posición de verificar, para
            cada pedido o publicación individual, si el uso específico de un
            Elemento de Identidad Institucional cuenta con autorización expresa
            de la Institución titular. Dicha verificación no es una obligación
            que corresponda al Taller como prestador de un servicio de
            confección.
          </P>
          <P>
            3.4 El Taller presume de buena fe que el Cliente que solicita la
            reproducción de un Elemento de Identidad Institucional es el
            destinatario legítimo de la prenda en cuestión —estudiante,
            trabajador o miembro de la institución correspondiente— y que su
            solicitud obedece al uso personal y legítimo del uniforme de la
            organización a la que pertenece.
          </P>
        </Section>
        <Hr />

        <Section
          n={4}
          title="Uso de elementos de identidad institucional en canales digitales oficiales del Taller"
        >
          <P>
            4.1 NATURALEZA DEL USO DIGITAL. Con el propósito de mostrar el
            portafolio de trabajo del Taller, comunicar sus capacidades de
            confección y facilitar a los clientes la identificación de los
            diseños disponibles, Confecciones Liss publica y puede publicar en
            sus canales digitales oficiales — incluyendo su sitio web (
            <Link
              href="https://www.confeccionesliss.com/"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/
            </Link>
            ), sus perfiles en redes sociales (Facebook, Instagram, TikTok,
            YouTube y cualquier otra plataforma en la que el Taller tenga
            presencia verificada) y cualquier otro canal de comunicación oficial
            — fotografías, imágenes, renders, referencias visuales y
            descripciones de prendas confeccionadas que contengan o hagan
            referencia a Elementos de Identidad Institucional de terceros,
            incluyendo logotipos, escudos, nombres, denominaciones y colores
            institucionales de universidades, institutos y otras entidades.
          </P>
          <P>
            4.2 FINALIDAD EXCLUSIVAMENTE REFERENCIAL. El uso de Elementos de
            Identidad Institucional en los canales digitales del Taller tiene un
            propósito exclusivamente referencial, informativo y de portafolio.
            Su función es ilustrar el tipo de trabajo de confección que el
            Taller es capaz de realizar y los diseños que ha ejecutado
            previamente a solicitud de sus clientes. Bajo ninguna circunstancia
            la publicación de dichos elementos implica:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Afiliación, asociación, patrocinio, aval ni respaldo por parte
              de ninguna Institución cuya identidad visual aparezca en el
              contenido.
            </P>
            <P>
              b) Representación oficial del Taller como proveedor autorizado,
              exclusivo ni preferente de ninguna Institución.
            </P>
            <P>
              c) Uso comercial de la marca institucional como activo propio del
              Taller.
            </P>
            <P>
              d) Apropiación, cesión ni sublicencia de ningún derecho de
              propiedad intelectual sobre los Elementos de Identidad
              Institucional publicados.
            </P>
            <P>
              e) Ningún vínculo contractual, institucional ni de ninguna otra
              naturaleza entre el Taller y las Instituciones cuyos elementos
              aparecen en el contenido.
            </P>
          </div>
          <P>
            4.3 AUSENCIA DE LUCRO DIRECTO SOBRE LA MARCA. Los Elementos de
            Identidad Institucional publicados en los canales digitales del
            Taller no son objeto de venta, licenciamiento, cesión ni explotación
            comercial como activos en sí mismos. El Taller no cobra por mostrar
            una marca institucional en su portafolio, no obtiene ingresos
            derivados del reconocimiento o prestigio de la marca publicada, y no
            utiliza dichos elementos para atraer clientes bajo la promesa de ser
            un proveedor institucional oficial o autorizado.
          </P>
          <P>
            4.4 CARÁCTER ILUSTRATIVO DE LAS PRENDAS CONFECCIONADAS. Todo
            Elemento de Identidad Institucional que aparezca en los canales
            digitales del Taller forma parte de la imagen de una prenda real,
            confeccionada a solicitud de un cliente real, en el marco de la
            prestación del servicio de confección. La publicación de dicha
            imagen es el reflejo natural del trabajo técnico realizado por el
            Taller y no constituye un acto de apropiación de la identidad
            institucional de ninguna entidad.
          </P>
          <P>
            4.5 EXENCIÓN DE RESPONSABILIDAD POR CONTENIDO DIGITAL INSTITUCIONAL.
            En la máxima medida permitida por la legislación de la República de
            El Salvador, Confecciones Liss queda expresamente eximido de toda
            responsabilidad civil, comercial, de propiedad intelectual o de
            cualquier otra naturaleza, derivada de los siguientes supuestos
            relacionados con la publicación en canales digitales de Elementos de
            Identidad Institucional, sin que esta enumeración tenga carácter
            limitativo:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Reclamaciones de Instituciones por la aparición de sus
              logotipos, nombres, denominaciones, colores u otros elementos de
              identidad visual en fotografías o contenido que muestre prendas
              confeccionadas a solicitud de clientes del Taller.
            </P>
            <P>
              b) Reclamaciones basadas en la confusión de terceros respecto a si
              el Taller es proveedor oficial, autorizado o patrocinado por
              alguna Institución cuya identidad visual aparezca en el contenido
              digital del Taller, dado que la presente Política establece
              expresamente que no existe dicho vínculo.
            </P>
            <P>
              c) Reclamaciones derivadas de la indexación o compartición del
              contenido digital del Taller por parte de terceros en plataformas
              o canales distintos a los oficiales del Taller, situación sobre la
              cual el Taller no tiene control.
            </P>
            <P>
              d) Reclamaciones por diferencias entre el diseño institucional
              publicado en el portafolio digital y las versiones actualizadas,
              modificadas o discontinuadas de la identidad visual de una
              Institución, dado que el Taller publica el diseño tal como fue
              aplicado a la prenda confeccionada en el momento del encargo.
            </P>
            <P>
              e) Reclamaciones de terceros que, al visualizar el contenido
              digital del Taller, infieran erróneamente la existencia de una
              relación oficial entre el Taller y alguna Institución cuya
              identidad visual aparezca en dicho contenido.
            </P>
          </div>
          <P>
            4.6 AVISO IMPLÍCITO DE NO AFILIACIÓN. La mera publicación de
            cualquier Elemento de Identidad Institucional en los canales
            digitales del Taller no implica afiliación con la Institución
            titular. Todo Usuario que acceda al contenido digital de
            Confecciones Liss, al hacerlo, declara conocer y aceptar que el
            Taller es un prestador de servicios de confección independiente, sin
            relación de afiliación, autorización ni patrocinio con ninguna de
            las Instituciones cuyos elementos de identidad visual pudieran
            aparecer en dicho contenido.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Descargo de responsabilidad general del Taller">
          <P>
            5.1 En la máxima medida permitida por la legislación de la República
            de El Salvador, Confecciones Liss queda expresamente eximido y
            descargado de toda responsabilidad civil, comercial, de propiedad
            intelectual o de cualquier otra naturaleza, derivada de los
            siguientes supuestos, sin que esta enumeración tenga carácter
            limitativo:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Reclamaciones por infracción de derechos de marca, propiedad
              intelectual o industrial derivadas del uso de Elementos de
              Identidad Institucional aplicados sobre prendas confeccionadas a
              solicitud expresa del Cliente.
            </P>
            <P>
              b) Disputas surgidas entre el Cliente y las Instituciones
              titulares de los Elementos de Identidad Institucional, relativas
              al uso, la reproducción o la aplicación de dichos elementos sobre
              prendas confeccionadas por el Taller.
            </P>
            <P>
              c) Reclamaciones de las Instituciones frente al uso que el Cliente
              haga de su marca, logotipo, denominación, colores o cualquier otro
              elemento de su identidad visual reproducido sobre la prenda
              confeccionada.
            </P>
            <P>
              d) La obtención, posesión o uso de los archivos digitales de
              Elementos de Identidad Institucional que el Cliente proporciona al
              Taller para la producción, siendo el Cliente el único responsable
              de la procedencia y legitimidad de dichos archivos.
            </P>
            <P>
              e) Cualquier consecuencia legal, administrativa o patrimonial que
              se derive del uso que el Cliente haga de la prenda confeccionada
              con Elementos de Identidad Institucional, incluyendo el uso fuera
              de los límites permitidos por la Institución correspondiente.
            </P>
            <P>
              f) La elección del Cliente de contratar los servicios del Taller
              para la confección de uniformes institucionales, decisión que
              corresponde en exclusiva al Cliente y que el Taller no promueve ni
              condiciona.
            </P>
            <P>
              g) El uso posterior que el Cliente dé a la marca, logotipo o
              denominación de la Institución, una vez entregada la prenda
              confeccionada, el cual es responsabilidad única y exclusiva del
              Cliente.
            </P>
            <P>
              h) La publicación en canales digitales del Taller de imágenes de
              prendas confeccionadas que contengan Elementos de Identidad
              Institucional, en los términos y con los alcances establecidos en
              el Artículo 4 de la presente Política.
            </P>
            <P>
              i) Las interpretaciones, inferencias o conclusiones que terceros,
              Usuarios o Instituciones extraigan del contenido digital del
              Taller en relación con posibles vínculos de afiliación,
              autorización o patrocinio institucional que no existen ni han sido
              declarados por el Taller.
            </P>
          </div>
          <P>
            5.2 El descargo de responsabilidad establecido en el numeral
            anterior opera de pleno derecho desde el momento en que el Cliente
            solicita la confección de una prenda con Elementos de Identidad
            Institucional de terceros, y desde el momento en que cualquier
            Usuario accede a los canales digitales del Taller, sin necesidad de
            declaración judicial ni de notificación individual.
          </P>
          <P>
            5.3 Confecciones Liss actúa en todo momento como un prestador de
            servicios de confección textil neutral y de buena fe. El Taller no
            es parte en ninguna relación jurídica entre el Cliente y la
            Institución cuya identidad visual se reproduce en la prenda o
            aparece en el contenido digital, y no puede ser vinculado a los
            derechos, obligaciones ni disputas que de dicha relación puedan
            derivarse.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Responsabilidad exclusiva del Cliente">
          <P>
            6.1 El Cliente, al solicitar al Taller la confección de una prenda
            que incorpore Elementos de Identidad Institucional de terceros,
            asume de forma expresa, libre, voluntaria e irrevocable la
            responsabilidad exclusiva e integral respecto a:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) La legitimidad y el alcance de su derecho a utilizar los
              Elementos de Identidad Institucional solicitados, ya sea por ser
              estudiante, trabajador, afiliado o miembro de la Institución
              correspondiente, o por contar con autorización expresa de la
              misma.
            </P>
            <P>
              b) La verificación de que el uso de los Elementos de Identidad
              Institucional en la prenda solicitada es conforme a las políticas
              de identidad visual, reglamentos internos y normativas de la
              Institución correspondiente.
            </P>
            <P>
              c) La procedencia y legitimidad de los archivos digitales,
              diseños, vectores o referencias visuales de Elementos de Identidad
              Institucional que proporciona al Taller para la producción.
            </P>
            <P>
              d) Las consecuencias de cualquier uso de la prenda confeccionada
              que exceda los límites autorizados por la Institución titular,
              incluyendo la portación de la prenda por personas no autorizadas,
              la reproducción adicional de los elementos aplicados, o cualquier
              otro uso no permitido.
            </P>
            <P>
              e) La resolución de cualquier controversia, reclamación o
              procedimiento que la Institución titular inicie contra el Cliente
              por el uso de sus Elementos de Identidad Institucional.
            </P>
          </div>
          <P>
            6.2 El Cliente acepta expresamente que, en caso de que cualquier
            Institución titular de Elementos de Identidad Institucional ejercite
            acciones legales o administrativas relacionadas con el uso de su
            identidad visual, el Taller queda completamente al margen de dicho
            proceso, y el Cliente no podrá involucrar al Taller en el mismo ni
            atribuirle responsabilidad derivada de la confección técnica del
            producto.
          </P>
          <P>
            6.3 El Cliente acepta asimismo que el Taller podrá invocar la
            presente Política como descargo frente a cualquier reclamación que
            terceros — incluyendo las Instituciones— dirijan contra el Taller
            con base en la confección de prendas o la publicación digital de
            contenido con Elementos de Identidad Institucional solicitada o
            generada por el Cliente.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Procedimiento para solicitudes de baja o retiro de contenido"
        >
          <P>
            7.1 Confecciones Liss actúa de buena fe y se compromete a atender,
            con disposición colaborativa y dentro de un plazo razonable, las
            solicitudes legítimas y debidamente fundamentadas que cualquier
            Institución titular de Elementos de Identidad Institucional formule
            con el propósito de requerir la suspensión, modificación o baja del
            uso de sus elementos, ya sea en los servicios de confección del
            Taller o en su contenido digital publicado en canales oficiales.
          </P>
          <P>
            7.2 Para que una solicitud de baja o retiro de contenido
            institucional sea válida, admisible y procesable por el Taller, esta
            deberá cumplir de forma estricta e ineludible con los siguientes
            requisitos formales:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Ser formulada exclusivamente por un representante debidamente
              autorizado de la Institución titular, en nombre y por cuenta de
              dicha Institución.
            </P>
            <P>
              b) Constar en un escrito formal, redactado en idioma español, que
              especifique con claridad los Elementos de Identidad Institucional
              cuya baja o restricción de uso se solicita —incluyendo, si
              procede, las publicaciones digitales específicas en las que
              aparecen—, los fundamentos jurídicos y factuales de la solicitud,
              y la acción concreta que la Institución requiere del Taller.
            </P>
            <P>
              c) Estar firmada de forma autógrafa por el representante de la
              Institución con facultades suficientes para formular dicha
              solicitud.
            </P>
            <P>
              d) Estar sellada con el sello oficial de la Institución, a fin de
              acreditar su autenticidad institucional.
            </P>
            <P>
              e) Ser remitida al Taller a través de los canales oficiales de
              Confecciones Liss, disponibles en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
          </div>
          <P>
            7.3 El Taller no atenderá ni reconocerá solicitudes de baja o retiro
            de contenido institucional que no cumplan con la totalidad de los
            requisitos formales establecidos en el numeral anterior. En
            particular, el Taller no dará curso a solicitudes formuladas
            verbalmente, a través de terceros no autorizados, mediante redes
            sociales u otras plataformas informales, sin firma autógrafa, sin
            sello institucional, o mediante comunicaciones que no provengan de
            un representante formalmente identificado y acreditado de la
            Institución.
          </P>
          <P>
            7.4 Una vez recibida una solicitud que cumpla con todos los
            requisitos del numeral 7.2, el Taller:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Acusará recibo de la solicitud dentro de los plazos operativos
              habituales del Taller.
            </P>
            <P>
              b) Evaluará la solicitud de buena fe y en diálogo con el
              representante de la Institución.
            </P>
            <P>
              c) Adoptará las medidas que, a juicio del Taller y conforme a sus
              posibilidades operativas, sean razonablemente aplicables, las
              cuales podrán incluir la retirada o modificación del contenido
              digital específico señalado en la solicitud, la suspensión de la
              oferta del diseño específico para nuevos pedidos, u otras medidas
              acordadas de mutuo acuerdo.
            </P>
          </div>
          <P>
            7.5 El cumplimiento de los requisitos formales de la solicitud no
            garantiza automáticamente que el Taller realizará la acción
            específica solicitada por la Institución. La respuesta del Taller
            será proporcional a su naturaleza y posibilidades como taller de
            confección, orientada a la resolución pacífica del conflicto y al
            principio de buena fe comercial.
          </P>
          <P>
            7.6 El Taller no tiene control sobre los pedidos ya entregados al
            Cliente con anterioridad a la recepción de una solicitud de baja
            válida, ni sobre la compartición o indexación de contenido digital
            por parte de terceros ajenos al Taller. La responsabilidad sobre el
            uso posterior de la prenda corresponde exclusivamente al Cliente
            conforme al Artículo 6 de la presente Política.
          </P>
        </Section>
        <Hr />

        <Section
          n={8}
          title="Principio de buena fe y resolución pacífica de conflictos"
        >
          <P>
            8.1 Confecciones Liss actúa bajo el principio de buena fe en todas
            sus relaciones comerciales y en su interacción con terceros,
            incluyendo las Instituciones cuyos Elementos de Identidad
            Institucional puedan verse involucrados en los servicios de
            confección o en el contenido digital del Taller.
          </P>
          <P>
            8.2 El Taller declara su genuina disposición al diálogo, la
            colaboración y la resolución pacífica de cualquier conflicto que
            pudiera surgir en relación con el uso de Elementos de Identidad
            Institucional. La presente Política ha sido redactada con ese
            espíritu y bajo ese principio.
          </P>
          <P>
            8.3 En ningún caso la formulación de una solicitud por parte de una
            Institución, ni el inicio de un diálogo con el Taller para la
            resolución de una controversia, implica reconocimiento de
            responsabilidad por parte del Taller respecto a las reclamaciones
            formuladas. El Taller actúa de buena fe como expresión de
            colaboración institucional, sin que ello suponga admisión de culpa,
            negligencia ni infracción alguna.
          </P>
          <P>
            8.4 El Taller privilegia en todo momento la resolución directa y
            amistosa de cualquier conflicto, conforme a los mecanismos
            establecidos en el Artículo 7 de la presente Política, antes de que
            dicho conflicto sea escalado a instancias legales, administrativas o
            de otra naturaleza.
          </P>
        </Section>
        <Hr />

        <Section
          n={9}
          title="Alcance del servicio: el Taller como ejecutor técnico"
        >
          <P>
            9.1 Para mayor certeza, se declara expresamente que el servicio de
            confección de uniformes institucionales prestado por el Taller tiene
            un alcance estrictamente técnico y material, limitado a:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) La confección física de la prenda, incluyendo corte, costura y
              acabados textiles.
            </P>
            <P>
              b) La aplicación técnica de los Elementos de Identidad
              Institucional sobre la prenda, mediante bordado, sublimación u
              otros métodos de personalización textil disponibles en el Taller.
            </P>
            <P>
              c) La entrega del producto terminado al Cliente que lo encargó.
            </P>
            <P>
              d) La publicación de imágenes de las prendas confeccionadas en los
              canales digitales del Taller con fines de portafolio e información
              comercial, conforme a lo establecido en el Artículo 4.
            </P>
          </div>
          <P>
            9.2 El servicio de confección no incluye ni implica, bajo ninguna
            circunstancia:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) La promoción, representación ni portavocía de ninguna
              Institución.
            </P>
            <P>
              b) La verificación de la titularidad, vigencia ni alcance de los
              derechos de propiedad intelectual sobre los Elementos de Identidad
              Institucional solicitados.
            </P>
            <P>
              c) La asesoría jurídica al Cliente sobre los derechos y
              restricciones de uso de los Elementos de Identidad Institucional.
            </P>
            <P>
              d) La autorización del uso de los Elementos de Identidad
              Institucional por parte del Cliente, facultad que corresponde
              exclusivamente a las Instituciones titulares.
            </P>
            <P>
              e) La gestión, custodia ni control del uso que el Cliente haga de
              la prenda con posterioridad a su entrega.
            </P>
          </div>
          <P>
            9.3 El Taller es un prestador de servicios de confección textil. Su
            función es transformar tela, hilo y otros insumos en una prenda
            terminada conforme a las especificaciones del Cliente. Más allá de
            esta función técnica y de la comunicación de su portafolio de
            trabajo, el Taller no tiene, no asume ni puede asumir
            responsabilidades de ninguna otra naturaleza respecto a los
            Elementos de Identidad Institucional.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Indemnización por parte del Cliente">
          <P>
            10.1 El Cliente se compromete a indemnizar y a mantener indemne a
            Confecciones Liss, su personal y sus representantes, frente a
            cualquier reclamación, demanda, acción legal, pérdida, daño, costo,
            gasto o responsabilidad de cualquier naturaleza que surja de, o esté
            relacionada con:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) La solicitud del Cliente de confeccionar prendas con Elementos
              de Identidad Institucional de terceros, cuando dicho uso no cuente
              con la autorización correspondiente de la Institución titular.
            </P>
            <P>
              b) El uso que el Cliente haga de la prenda confeccionada con
              Elementos de Identidad Institucional, incluyendo el uso fuera de
              los límites autorizados por la Institución.
            </P>
            <P>
              c) La provisión por parte del Cliente de archivos, diseños o
              referencias de Elementos de Identidad Institucional cuya obtención
              o uso no sea legítimo.
            </P>
            <P>
              d) Cualquier acción legal que una Institución inicie como
              consecuencia directa o indirecta del encargo del Cliente al
              Taller, incluyendo reclamaciones relacionadas con la publicación
              digital de imágenes de la prenda confeccionada.
            </P>
          </div>
          <P>
            10.2 La obligación de indemnización establecida en el numeral
            anterior incluye los honorarios razonables de representación legal
            en que el Taller pueda incurrir como consecuencia de reclamaciones
            relacionadas con los supuestos descritos.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Relación con otras políticas del Taller">
          <P>
            11.1 La presente Política forma parte integral del marco jurídico y
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
            <div>
              — Términos y Condiciones de Uso:{" "}
              <Link
                href="/legal/terminos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/terminos
              </Link>
            </div>
            <div>
              — Política de Privacidad:{" "}
              <Link
                href="/legal/privacidad"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/privacidad
              </Link>
            </div>
            <div>
              — Política de Confección:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/confeccion
              </Link>
            </div>
            <div>
              — Política de Devoluciones:{" "}
              <Link
                href="/legal/devoluciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/devoluciones
              </Link>
            </div>
            <div>
              — Política de Deberes del Usuario:{" "}
              <Link
                href="/legal/deberes"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </div>
            <div>
              — Política de Derechos del Usuario:{" "}
              <Link
                href="/legal/derechos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/derechos
              </Link>
            </div>
            <div>
              — Política de Uso de Inteligencia Artificial:{" "}
              <Link
                href="/legal/ia"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/ia
              </Link>
            </div>
          </div>
          <P>
            11.2 En caso de aparente conflicto entre la presente Política y
            cualquier otra política del Taller respecto a los supuestos
            regulados en este documento, prevalecerán las disposiciones de la
            presente Política, por ser el instrumento específico que rige la
            materia de Elementos de Identidad Institucional de terceros.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Canales oficiales de comunicación">
          <P>
            12.1 Toda comunicación relacionada con la presente Política,
            incluyendo solicitudes de información, consultas sobre pedidos o
            publicaciones específicas, solicitudes de baja de contenido
            institucional o cualquier otra gestión vinculada a los supuestos
            aquí regulados, deberá realizarse exclusivamente a través de los
            canales oficiales de Confecciones Liss, disponibles en:
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
            12.2 El Taller no reconocerá reclamaciones, solicitudes ni
            comunicaciones realizadas a través de canales no oficiales, personas
            no autorizadas, plataformas no verificadas o medios distintos a los
            establecidos en el numeral anterior.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Resolución de disputas y jurisdicción aplicable">
          <P>
            13.1 Toda controversia que surja de la aplicación, interpretación o
            incumplimiento de la presente Política —ya sea entre el Taller y el
            Cliente, o entre el Taller y cualquier Institución— se resolverá en
            primera instancia mediante negociación directa de buena fe, conforme
            al principio establecido en el Artículo 8.
          </P>
          <P>
            13.2 De no alcanzarse un acuerdo en un plazo razonable, la
            controversia se someterá a la jurisdicción exclusiva de los
            tribunales competentes de la República de El Salvador, aplicando la
            legislación salvadoreña vigente.
          </P>
          <P>
            13.3 La legislación de la República de El Salvador es la única
            aplicable a la presente Política y a todas las relaciones jurídicas
            que de ella deriven, con exclusión de cualquier normativa
            extranjera.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Modificaciones a la Política">
          <P>
            14.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en los canales
            oficiales del Taller, disponibles en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/links
            </Link>
          </P>
          <P>
            14.2 Las modificaciones entrarán en vigencia de forma inmediata
            desde su publicación. La solicitud de cualquier servicio de
            confección o el acceso a cualquier canal digital del Taller con
            posterioridad a la publicación de cualquier modificación constituirá
            aceptación automática e irrevocable de la versión actualizada de la
            Política.
          </P>
          <P>
            14.3 El Taller no está obligado a notificar individualmente al
            Cliente ni a las Instituciones sobre modificaciones a la presente
            Política. Es responsabilidad exclusiva del Cliente y del Usuario
            verificar periódicamente la versión vigente.
          </P>
        </Section>
        <Hr />

        <Section n={15} title="Divisibilidad">
          <P>
            15.1 Si alguna disposición de la presente Política fuera declarada
            inválida, ilegal o inaplicable por un tribunal competente, las
            restantes disposiciones continuarán en plena vigencia y efecto, sin
            que la invalidez parcial afecte la validez del conjunto del
            documento.
          </P>
        </Section>
        <Hr />

        <LegalFootnote>
          <strong>CONFECCIONES LISS — CONTACTO OFICIAL</strong>
          <br />
          Toda gestión exclusivamente a través de:{" "}
          <Link href="/links" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/links
          </Link>
          <br />
          Política de Privacidad:{" "}
          <Link
            href="/legal/privacidad"
            className="text-blue-600 hover:underline"
          >
            /legal/privacidad
          </Link>{" "}
          · Términos y Condiciones:{" "}
          <Link
            href="/legal/terminos"
            className="text-blue-600 hover:underline"
          >
            /legal/terminos
          </Link>{" "}
          · Política de Confección:{" "}
          <Link
            href="/legal/confeccion"
            className="text-blue-600 hover:underline"
          >
            /legal/confeccion
          </Link>
          <br />
          Política de Devoluciones:{" "}
          <Link
            href="/legal/devoluciones"
            className="text-blue-600 hover:underline"
          >
            /legal/devoluciones
          </Link>{" "}
          · Política de Deberes:{" "}
          <Link href="/legal/deberes" className="text-blue-600 hover:underline">
            /legal/deberes
          </Link>{" "}
          · Política de Derechos:{" "}
          <Link
            href="/legal/derechos"
            className="text-blue-600 hover:underline"
          >
            /legal/derechos
          </Link>
          <br />
          Política de IA:{" "}
          <Link href="/legal/ia" className="text-blue-600 hover:underline">
            /legal/ia
          </Link>{" "}
          · Logos e Identidad de Terceros:{" "}
          <Link
            href="/legal/terceros"
            className="text-blue-600 hover:underline"
          >
            /legal/terceros
          </Link>
          <br />
          Dirección: Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur, Casa
          #402, San Miguel, El Salvador.
          <br />
          Horario: Lunes a Sábado, 8:00 AM – 5:00 PM
          <br />
          Encargado de Comunicaciones: Carlos José Molina Villacorta
          <br />
          Vigente desde su publicación — Versión: Junio 2026
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
