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
    "Política de Fotografía, Uso de Imagen y Derechos Visuales | Confecciones Liss",
  description:
    "Regulación integral y condiciones bajo las cuales Confecciones Liss gestiona el uso, captación y publicación de fotografías e imágenes de prendas, clientes y modelos.",
  keywords:
    "política de fotografía, derechos de imagen, uso de imagen, portafolio de prendas, Confecciones Liss, uniformes El Salvador, modelos externos, uso comercial de imagen",
  alternates: {
    canonical: `${siteConfig.url}/legal/fotografia`,
  },
  openGraph: {
    title:
      "Política de Fotografía, Uso de Imagen y Derechos Visuales | Confecciones Liss",
    description:
      "Regulación integral y condiciones bajo las cuales Confecciones Liss gestiona el uso, captación y publicación de fotografías e imágenes de prendas, clientes y modelos.",
    url: `${siteConfig.url}/legal/fotografia`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Política de Fotografía, Uso de Imagen y Derechos Visuales | Confecciones Liss",
    description:
      "Regulación integral y condiciones bajo las cuales Confecciones Liss gestiona el uso, captación y publicación de fotografías e imágenes de prendas, clientes y modelos.",
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

export default function FotografiaPage() {
  const PAGE_URL = `${siteConfig.url}/legal/fotografia`;
  const PAGE_TITLE = "Política de Fotografía e Imagen";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Fotografía, Uso de Imagen y Derechos Visuales | Confecciones Liss",
          description:
            "Regulación integral y condiciones bajo las cuales Confecciones Liss gestiona el uso, captación y publicación de fotografías e imágenes de prendas, clientes y modelos.",
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
        title="Política de Fotografía, Uso de Imagen y Derechos"
        category="Regulación integral sobre captación, uso y derechos de imagen de clientes y modelos para nuestro portafolio de prendas personalizadas. Vigente desde su publicación — Junio 2026."
        date="25 Jun, 2026"
        readingTime={15}
      >
        <P>
          La presente Política de Fotografía, Uso de Imagen y Derechos sobre
          Contenido Visual (en adelante &quot;la Política&quot;) regula de
          manera integral, exhaustiva y vinculante las condiciones bajo las
          cuales Confecciones Liss (en adelante &quot;el Taller&quot;) obtiene,
          utiliza, publica, edita, distribuye y gestiona imágenes, fotografías,
          videos y cualquier otro contenido visual en el que aparezca, sea
          identificable o sea atribuible a clientes del Taller, modelos
          externos, personas naturales autorizantes o cualquier tercero cuya
          imagen o identidad quede representada en dicho contenido (en adelante
          &quot;el Titular de Imagen&quot;).
        </P>
        <P>
          La presente Política aplica exclusivamente al uso de imágenes de
          personas naturales reales —sean clientes del Taller, modelos externos
          contratados o colaboradores espontáneos— y es distinta e independiente
          de la Política de Uso de Inteligencia Artificial del Taller
          (disponible en{" "}
          <Link href="/legal/ia" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/legal/ia
          </Link>
          ), que regula el uso del personaje sintético Liam Alejandro y la
          edición de prendas mediante IA.
        </P>
        <P>
          Toda persona natural cuya imagen haya sido o vaya a ser captada,
          publicada o utilizada por el Taller en cualquiera de sus canales
          oficiales declara, al otorgar su autorización en los términos
          establecidos en la presente Política, haber leído, comprendido y
          aceptado en su integridad, de forma libre, voluntaria, informada e
          irrevocable, la totalidad de los términos aquí establecidos.
        </P>
        <P>
          El desconocimiento de la presente Política no exime al Titular de
          Imagen de los efectos de la autorización otorgada, no le otorga
          derechos adicionales a los expresamente reconocidos en este documento,
          y no le confiere fundamento válido para reclamación alguna contra el
          Taller derivada de un uso de imagen autorizado conforme a los términos
          aquí establecidos.
        </P>
        <Hr />

        {/* ── Art. 1 ───────────────────────────────────────────────────────── */}
        <Section n={1} title="Definiciones">
          <P>
            <strong>1.1</strong> A efectos de la presente Política, se entenderá
            por:
          </P>
          <Ul
            items={[
              'a) "Titular de Imagen": toda persona natural real cuya imagen, fotografía, video, nombre, apodo, voz, características físicas identificables, o cualquier elemento que permita su identificación directa o indirecta aparezca o pueda aparecer en el Contenido Visual generado por el Taller.',
              'b) "Contenido Visual": toda fotografía, video, imagen fija o en movimiento, composición gráfica, reels, stories, publicaciones, capturas de pantalla, y cualquier otro material audiovisual en el que el Titular de Imagen sea reconocible, independientemente del soporte o formato en que se presente.',
              'c) "Autorización": el consentimiento expreso, libre, voluntario, informado e irrevocable del Titular de Imagen para que el Taller utilice su imagen conforme a los términos de la presente Política, otorgado mediante cualquiera de los mecanismos válidos establecidos en el Artículo 3.',
              'd) "Elementos Identificadores": cualquier elemento contenido en el Contenido Visual que permita la identificación directa o indirecta del Titular de Imagen, incluyendo sin limitarse a: rostro, silueta, nombre completo o parcial, apodo, carné institucional, logotipo de institución, número de identificación, cargo, función o cualquier otra característica singular del Titular de Imagen o de la prenda que porte.',
              'e) "Canales Oficiales": la totalidad de perfiles, páginas, plataformas y medios de comunicación del Taller, cuyo directorio centralizado de enlaces oficiales está disponible en /links.',
              'f) "Representante Autorizado del Taller": la persona designada por el Taller con facultad de suscribir acuerdos en nombre del Taller, incluyendo acuerdos de imagen con condiciones especiales. El Encargado de Comunicaciones, Carlos José Molina Villacorta, es Representante Autorizado del Taller para los efectos de la presente Política.',
              'g) "Acuerdo Especial de Imagen": acuerdo escrito, firmado y suscrito por el Titular de Imagen y por un Representante Autorizado del Taller, que establece condiciones distintas o adicionales a las de la presente Política, incluyendo compensaciones, exclusividades, plazos específicos u otras cláusulas particulares, conforme a lo establecido en el Artículo 10.',
              'h) "Dominio Comercial del Taller": el conjunto de activos visuales y comunicacionales que el Taller puede utilizar para fines de marketing, portafolio, publicidad, catálogo y cualquier otra finalidad comercial legítima, en los canales y formatos que el Taller estime pertinentes.',
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 2 ───────────────────────────────────────────────────────── */}
        <Section
          n={2}
          title="Principio General: Autorización Previa Obligatoria"
        >
          <P>
            <strong>2.1</strong> El Taller no publicará, difundirá, utilizará ni
            explotará comercialmente ningún Contenido Visual en el que un
            Titular de Imagen sea identificable, sin haber obtenido previamente
            la Autorización expresa de dicho Titular, mediante alguno de los
            mecanismos válidos establecidos en el Artículo 3 de la presente
            Política.
          </P>
          <P>
            <strong>2.2</strong> Este principio aplica con especial énfasis
            cuando el Contenido Visual contiene Elementos Identificadores que
            permiten vincular la imagen con la identidad concreta del Titular de
            Imagen, incluyendo:
          </P>
          <Ul
            items={[
              "a) Fotografías del rostro del Titular de Imagen.",
              "b) Prendas que lleven el nombre del Titular de Imagen bordado, impreso o sublimado.",
              "c) Prendas que lleven el carné, número de identificación, cargo o función del Titular de Imagen.",
              "d) Prendas que lleven el logotipo de la institución a la que pertenece el Titular de Imagen, cuando dicha institución sea identificable y cuando el Titular de Imagen sea también identificable en la imagen.",
              "e) Cualquier otro elemento que, en conjunto con el Contenido Visual, permita la identificación directa o indirecta del Titular de Imagen.",
            ]}
          />
          <P>
            <strong>2.3</strong> El Taller actúa de buena fe en la gestión del
            Contenido Visual y adoptará las medidas razonables a su alcance para
            verificar que cuenta con Autorización válida antes de publicar
            cualquier imagen de un Titular de Imagen identificable. No obstante,
            la responsabilidad de otorgar una Autorización libre, informada y
            sin vicios de consentimiento recae exclusivamente en el Titular de
            Imagen.
          </P>
          <P>
            <strong>2.4</strong> El Taller no está obligado a publicar ningún
            Contenido Visual, aun cuando el Titular de Imagen haya otorgado su
            Autorización. La publicación es una decisión discrecional del
            Taller, adoptada conforme a criterios editoriales, estéticos y
            comerciales propios.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 3 ───────────────────────────────────────────────────────── */}
        <Section n={3} title="Mecanismos Válidos de Autorización">
          <P>
            <strong>3.1</strong> La Autorización del Titular de Imagen es válida
            cuando se otorga mediante cualquiera de los siguientes mecanismos,
            todos de igual valor y eficacia jurídica:
          </P>
          <Ul
            items={[
              "a) DOCUMENTO ESCRITO FÍSICO: Documento impreso, firmado de puño y letra por el Titular de Imagen en presencia de un representante del Taller, que exprese de forma clara el consentimiento del Titular de Imagen para el uso de su imagen en los términos de la presente Política.",
              "b) COMUNICACIÓN ESCRITA POR CANAL OFICIAL CON SERVICIO DE MENSAJERÍA: Mensaje de texto o chat enviado por el Titular de Imagen a través de cualquier Canal Oficial del Taller que cuente con servicio de mensajería (incluyendo sin limitarse a: WhatsApp, mensajería directa en Instagram o Facebook, u otro canal oficial listado en /links), en la que el Titular de Imagen exprese de forma clara, voluntaria e inequívoca su consentimiento para el uso de su imagen.",
              "c) FORMULARIO DIGITAL DE AUTORIZACIÓN: Formulario habilitado por el Taller en sus plataformas digitales oficiales, completado y enviado por el Titular de Imagen de forma voluntaria.",
            ]}
          />
          <P>
            <strong>3.2</strong> CONTENIDO MÍNIMO DE LA AUTORIZACIÓN. Para que
            una Autorización sea considerada válida e informada, debe contener
            —de forma expresa o por referencia a la presente Política— al menos
            los siguientes elementos:
          </P>
          <Ul
            items={[
              "a) Identificación del Titular de Imagen (nombre completo o identificación suficiente).",
              "b) Descripción general del tipo de Contenido Visual al que se refiere (fotografía de prenda, video de portafolio, imagen para redes sociales, etc.).",
              "c) Expresión clara y voluntaria del consentimiento para el uso de la imagen por parte del Taller.",
              "d) En el caso de comunicaciones por mensajería, la secuencia de mensajes que evidencie la solicitud del Taller y la respuesta afirmativa del Titular de Imagen constituirá Autorización válida.",
            ]}
          />
          <P>
            <strong>3.3</strong> El Taller conservará el registro de todas las
            Autorizaciones recibidas —en formato físico o digital— como respaldo
            documental del uso legítimo de las imágenes publicadas.
          </P>
          <P>
            <strong>3.4</strong> LA AUTORIZACIÓN ES PERSONAL E INTRANSFERIBLE.
            Solo el Titular de Imagen puede otorgar la Autorización sobre su
            propia imagen. Ninguna tercera persona —incluyendo representantes,
            familiares, amigos, compañeros de grupo o empleadores— puede otorgar
            Autorización en nombre del Titular de Imagen, salvo en el caso de
            menores de edad, en que la Autorización debe ser otorgada por el
            padre, madre o tutor legal, con indicación expresa de dicha
            condición.
          </P>
          <P>
            <strong>3.5</strong> MENORES DE EDAD. El Taller no publicará
            Contenido Visual en el que sea identificable un menor de edad sin la
            Autorización expresa de su padre, madre o tutor legal. La
            Autorización de un menor de edad por sí mismo, sin el respaldo de su
            representante legal, no tiene validez alguna para efectos de la
            presente Política.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 4 ───────────────────────────────────────────────────────── */}
        <Section n={4} title="Alcance y Finalidades del Uso Autorizado">
          <P>
            <strong>4.1</strong> La Autorización otorgada por el Titular de
            Imagen conforme al Artículo 3 habilita al Taller para utilizar el
            Contenido Visual con las siguientes finalidades, salvo que la
            Autorización haya limitado expresamente alguna de ellas:
          </P>
          <Ul
            items={[
              "a) Publicación en cualquier Canal Oficial del Taller (sitio web, Instagram, Facebook, TikTok y cualquier otro canal oficial listado en /links), en cualquier formato disponible en cada plataforma (publicaciones fijas, stories, reels, videos, carruseles, destacados, etc.).",
              "b) Integración en el portafolio de trabajo del Taller, ya sea en formato digital o físico.",
              "c) Uso en materiales publicitarios, campañas de marketing, catálogos, fichas de producto y cualquier otro material promocional del Taller.",
              "d) Edición, retoque, composición, mejora estética y procesamiento mediante herramientas de edición o inteligencia artificial, conforme a la Política de Uso de Inteligencia Artificial del Taller.",
              "e) Uso en presentaciones comerciales, propuestas a clientes institucionales y materiales de ventas.",
              "f) Archivo en los sistemas de almacenamiento del Taller como parte de su registro histórico de producción y portafolio.",
            ]}
          />
          <P>
            <strong>4.2</strong> La Autorización no tiene límite temporal, salvo
            disposición expresa contraria en el Acuerdo Especial de Imagen. Una
            Autorización otorgada conforme a la presente Política habilita al
            Taller para utilizar el Contenido Visual de forma indefinida,
            mientras dicho uso sea congruente con las finalidades establecidas
            en el numeral anterior.
          </P>
          <P>
            <strong>4.3</strong> La Autorización no tiene límite geográfico. El
            Taller puede publicar el Contenido Visual en plataformas de alcance
            global, con independencia del país o región desde el que sea
            accesible.
          </P>
          <P>
            <strong>4.4</strong> La Autorización no tiene límite de frecuencia
            ni de formato. El Taller puede utilizar el mismo Contenido Visual en
            múltiples publicaciones, en distintas fechas, plataformas y
            formatos, sin necesidad de solicitar una nueva Autorización cada
            vez.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 5 ───────────────────────────────────────────────────────── */}
        <Section
          n={5}
          title="Incorporación al Dominio Comercial del Taller e Irrevocabilidad"
        >
          <P>
            <strong>5.1</strong> Una vez que el Titular de Imagen otorga la
            Autorización en los términos de la presente Política y el Taller
            publica el Contenido Visual en cualquiera de sus canales oficiales,
            dicho Contenido Visual pasa a formar parte del Dominio Comercial del
            Taller de forma permanente.
          </P>
          <P>
            <strong>5.2</strong> Desde el momento de la publicación, el Titular
            de Imagen no podrá revocar unilateralmente la Autorización ya
            otorgada ni exigir la retirada inmediata del Contenido Visual
            publicado, por las siguientes razones:
          </P>
          <Ul
            items={[
              "a) La Autorización fue otorgada de forma libre, voluntaria e informada, conociendo los términos de la presente Política.",
              "b) El Taller ha invertido recursos, tiempo y esfuerzo editorial en la producción y publicación del Contenido Visual, generando un interés legítimo en su mantenimiento.",
              "c) El Contenido Visual puede haberse integrado en campañas, secuencias de contenido, portafolios y materiales cuya modificación posterior causa perjuicio al Taller.",
            ]}
          />
          <P>
            <strong>5.3</strong> RENUNCIA VOLUNTARIA A COMPENSACIÓN ECONÓMICA.
            Al otorgar la Autorización conforme a la presente Política, el
            Titular de Imagen renuncia expresa, voluntaria e irrevocablemente a
            cualquier compensación económica, remuneración, regalía, honorario,
            pago en especie o beneficio monetario de cualquier naturaleza
            derivado del uso de su imagen por el Taller, salvo que exista un
            Acuerdo Especial de Imagen suscrito conforme al Artículo 10 que
            establezca expresamente condiciones de compensación distintas.
          </P>
          <P>
            <strong>5.4</strong> El Titular de Imagen que no desee renunciar a
            compensación económica tiene la opción de no otorgar la
            Autorización. La Autorización es completamente voluntaria. Una vez
            otorgada, sin embargo, opera la renuncia establecida en el numeral
            anterior de forma plena y sin posibilidad de reclamación posterior.
          </P>
          <P>
            <strong>5.5</strong> El Titular de Imagen no podrá invocar, con
            posterioridad a la publicación del Contenido Visual, derechos a
            compensación económica basándose en: el alcance que haya tenido la
            publicación; la popularidad que haya ganado el Contenido Visual; el
            uso comercial que el Taller haya dado al material; ni ninguna otra
            circunstancia sobreviniente a la Autorización.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 6 ───────────────────────────────────────────────────────── */}
        <Section n={6} title="Proceso de Buena Fe para el Retiro de Imagen">
          <P>
            <strong>6.1</strong> Sin perjuicio de lo establecido en el Artículo
            5, el Taller reconoce que pueden existir circunstancias
            sobrevinientes o personales que motiven al Titular de Imagen a
            solicitar el retiro del Contenido Visual publicado. En respeto al
            principio de buena fe que rige todas las relaciones comerciales del
            Taller, se establece el siguiente proceso:
          </P>
          <P>
            <strong>6.2</strong> SOLICITUD DE RETIRO. El Titular de Imagen puede
            iniciar en cualquier momento un proceso de diálogo con el Taller
            solicitando el retiro del Contenido Visual, a través de los canales
            oficiales disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              /links
            </Link>
            . La solicitud debe incluir:
          </P>
          <Ul
            items={[
              "a) Identificación del Titular de Imagen.",
              "b) Identificación específica del Contenido Visual cuyo retiro se solicita (plataforma, fecha aproximada de publicación, descripción del contenido).",
              "c) Motivo de la solicitud de retiro, de forma general.",
            ]}
          />
          <P>
            <strong>6.3</strong> COMPROMISO DEL TALLER. Ante una solicitud de
            retiro presentada conforme al numeral anterior, el Taller se
            compromete a:
          </P>
          <Ul
            items={[
              "a) Acusar recibo de la solicitud dentro de los cinco (5) días hábiles siguientes a su recepción.",
              "b) Iniciar un diálogo de buena fe con el Titular de Imagen, orientado a explorar un acuerdo mutuamente beneficioso.",
              "c) Evaluar la solicitud considerando los intereses legítimos de ambas partes: la privacidad y dignidad del Titular de Imagen, y los intereses comerciales del Taller.",
            ]}
          />
          <P>
            <strong>6.4</strong> POSIBLES RESULTADOS DEL PROCESO DE DIÁLOGO. El
            proceso de diálogo puede concluir en cualquiera de los siguientes
            resultados:
          </P>
          <Ul
            items={[
              "a) ACUERDO DE RETIRO TOTAL: El Taller retira el Contenido Visual de todos sus canales oficiales activos, sin perjuicio de que el material permanezca en archivos internos del Taller o en cachés de terceros fuera del control del Taller.",
              "b) ACUERDO DE RETIRO PARCIAL: El Taller retira el Contenido Visual de determinados canales o lo modifica de forma que el Titular de Imagen deje de ser identificable, bajo condiciones acordadas entre las partes.",
              "c) ACUERDO DE MANTENIMIENTO CON MODIFICACIONES: El Taller mantiene el Contenido Visual pero aplica ajustes acordados (anonimización, pixelado de rostro, eliminación de Elementos Identificadores, etc.).",
              "d) NO ACUERDO: Si las partes no llegan a un acuerdo mutuamente satisfactorio, el Taller no estará obligado a retirar el Contenido Visual publicado con Autorización válida, sin perjuicio del derecho del Titular de Imagen de acudir a los mecanismos legales que correspondan conforme a la legislación salvadoreña vigente.",
            ]}
          />
          <P>
            <strong>6.5</strong> LIMITACIONES DEL PROCESO DE RETIRO. El Taller
            no puede garantizar el retiro de Contenido Visual de plataformas de
            terceros (redes sociales, motores de búsqueda, archivos en caché,
            plataformas de distribución) que hayan indexado, compartido o
            archivado el contenido de forma independiente. El retiro del
            contenido por parte del Taller de sus propios canales no garantiza
            la eliminación del contenido en el ecosistema digital global.
          </P>
          <P>
            <strong>6.6</strong> El proceso de diálogo establecido en el
            presente artículo no implica reconocimiento por parte del Taller de
            ningún derecho del Titular de Imagen a exigir el retiro ni de
            ninguna obligación del Taller de proceder con él. Es una
            manifestación del compromiso del Taller con la buena fe y la
            resolución pacífica de situaciones sensibles.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 7 ───────────────────────────────────────────────────────── */}
        <Section
          n={7}
          title="Ausencia de Incentivos y Compensaciones Económicas"
        >
          <P>
            <strong>7.1</strong> PRINCIPIO GENERAL DE NO COMPENSACIÓN. Salvo
            acuerdo expreso, escrito y firmado por ambas partes —el Titular de
            Imagen y un Representante Autorizado del Taller— el Taller no
            ofrece, no promete, no está obligado a proporcionar ni reconocerá
            reclamación alguna por:
          </P>
          <Ul
            items={[
              "a) Compensaciones económicas en efectivo o en especie por el uso de la imagen del Titular de Imagen.",
              "b) Remuneraciones, honorarios o pagos de cualquier naturaleza por la sesión fotográfica, la captación de imágenes o la publicación del Contenido Visual.",
              "c) Descuentos, créditos, beneficios comerciales, productos gratuitos o cualquier otra contraprestación no monetaria vinculada al uso de la imagen.",
              "d) Regalías, participaciones en beneficios ni compensaciones vinculadas al rendimiento o alcance de las publicaciones en las que aparezca el Titular de Imagen.",
            ]}
          />
          <P>
            <strong>7.2</strong> Ninguna promesa verbal, informal, enviada por
            canales no oficiales o realizada por personas no autorizadas del
            Taller obliga al Taller a proporcionar compensación económica
            alguna. Solo el Acuerdo Especial de Imagen debidamente suscrito
            conforme al Artículo 10 puede generar obligaciones económicas del
            Taller hacia el Titular de Imagen.
          </P>
          <P>
            <strong>7.3</strong> El Titular de Imagen que haya recibido promesas
            de compensación fuera de los términos del Artículo 10 tiene el deber
            de verificar dichas promesas con el Taller a través de sus canales
            oficiales antes de otorgar su Autorización. La Autorización otorgada
            sin haber verificado la promesa no generará derecho a compensación
            si dicha promesa no consta en un Acuerdo Especial de Imagen válido.
          </P>
          <P>
            <strong>7.4</strong> El Taller no reconocerá reclamaciones por
            compensación económica formuladas con posterioridad a la publicación
            del Contenido Visual, basadas en: promesas verbales no documentadas;
            expectativas subjetivas no acordadas por escrito; comparaciones con
            tarifas de modelos profesionales; el alcance o impacto de la
            publicación; ni ninguna otra circunstancia no contemplada en un
            Acuerdo Especial de Imagen válido.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 8 ───────────────────────────────────────────────────────── */}
        <Section n={8} title="Responsabilidad del Titular de Imagen">
          <P>
            <strong>8.1</strong> El Titular de Imagen es el único responsable
            de:
          </P>
          <Ul
            items={[
              "a) Haber leído, comprendido y aceptado la presente Política antes de otorgar su Autorización, independientemente de si el Taller le proporcionó un recordatorio o resumen de la misma.",
              "b) Verificar que la Autorización que otorga refleja fielmente su intención y voluntad respecto al uso de su imagen.",
              "c) Informar al Taller, antes de otorgar la Autorización, sobre cualquier restricción, condición o limitación que desee imponer al uso de su imagen, para que dichas condiciones puedan incorporarse a un Acuerdo Especial de Imagen conforme al Artículo 10.",
              "d) Verificar que dispone de plena capacidad jurídica para otorgar la Autorización, en particular si porta prendas con logotipos, nombres o identificadores de instituciones de las que forma parte.",
              "e) Asegurarse de que la prenda que porta al momento de la fotografía no contiene elementos de terceros cuyo uso en el Contenido Visual pueda generar conflictos de propiedad intelectual que el Titular de Imagen no está en posición de autorizar.",
            ]}
          />
          <P>
            <strong>8.2</strong> El Taller no asumirá responsabilidad alguna
            por:
          </P>
          <Ul
            items={[
              "a) Autorizaciones otorgadas bajo error, apresuramiento o sin lectura previa de la presente Política, cuando el error o apresuramiento sea atribuible exclusivamente al Titular de Imagen.",
              "b) El impacto personal, profesional, social o institucional que la publicación del Contenido Visual pueda tener sobre el Titular de Imagen, cuando dicha publicación haya sido autorizada conforme a la presente Política.",
              "c) Reclamaciones de terceras instituciones derivadas de la aparición en el Contenido Visual de logotipos, nombres u otros elementos institucionales que el Titular de Imagen portaba al momento de la fotografía y cuya presencia en la imagen autorizó.",
              "d) El uso que terceros ajenos al Taller puedan hacer del Contenido Visual una vez publicado en los canales oficiales del Taller, incluyendo capturas, difusión no autorizada, uso en contextos distintos o cualquier otra forma de apropiación por parte de terceros.",
            ]}
          />
          <P>
            <strong>8.3</strong> El Titular de Imagen que haya suministrado
            información falsa, incompleta o engañosa al otorgar la Autorización
            —incluyendo la ocultación de restricciones, la falsificación de su
            identidad o la representación falsa de su capacidad para autorizar—
            asume íntegramente las consecuencias jurídicas y económicas de dicha
            conducta, incluyendo la obligación de mantener indemne al Taller
            frente a cualquier reclamación de terceros derivada de dicha
            falsedad.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 9 ───────────────────────────────────────────────────────── */}
        <Section
          n={9}
          title="Prendas con Elementos Identificadores Institucionales"
        >
          <P>
            <strong>9.1</strong> Cuando el Contenido Visual incluye prendas que
            contienen Elementos Identificadores de carácter institucional —tales
            como el nombre de una universidad, logotipo de una empresa, emblema
            de una institución de salud, carné de estudiante, nombre del
            empleador u otros elementos similares— la Autorización del Titular
            de Imagen para el uso de su imagen personal no comprende ni implica
            autorización alguna por parte de la institución correspondiente para
            el uso de sus Elementos de Identidad Institucional.
          </P>
          <P>
            <strong>9.2</strong> El uso de Elementos de Identidad Institucional
            de terceros en el Contenido Visual del Taller se rige por la
            Política de Logos e Identidad Institucional de Terceros disponible
            en{" "}
            <Link
              href="/legal/terceros"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/terceros
            </Link>
            . El Titular de Imagen reconoce que la autorización que otorga
            abarca exclusivamente su propia imagen personal, y que la presencia
            de Elementos de Identidad Institucional en la prenda que porta es un
            elemento de contexto de la fotografía y no constituye autorización
            de uso de dichos elementos por parte del Taller.
          </P>
          <P>
            <strong>9.3</strong> El Titular de Imagen que porta prendas con
            Elementos Identificadores institucionales asume la responsabilidad
            de verificar que el uso de dichos elementos en el Contenido Visual
            es compatible con las políticas y regulaciones de la institución
            correspondiente. El Taller no verifica ni está en posición de
            verificar dicha compatibilidad para cada imagen individual.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 10 ──────────────────────────────────────────────────────── */}
        <Section
          n={10}
          title="Acuerdos Especiales de Imagen con Condiciones Particulares"
        >
          <P>
            <strong>10.1</strong> El Taller reconoce que pueden existir
            situaciones en las que las partes deseen establecer condiciones
            distintas o adicionales a las de la presente Política —incluyendo
            compensaciones económicas, exclusividades, límites temporales de
            uso, restricciones de plataformas, derechos de revisión previa,
            entre otras. Para dichos casos, las partes pueden suscribir un
            Acuerdo Especial de Imagen.
          </P>
          <P>
            <strong>10.2</strong> REQUISITOS DE VALIDEZ DEL ACUERDO ESPECIAL DE
            IMAGEN. Para que un Acuerdo Especial de Imagen sea válido y genere
            obligaciones para el Taller, debe cumplir todos los siguientes
            requisitos sin excepción:
          </P>
          <Ul
            items={[
              "a) Constar en documento escrito, ya sea en formato físico o digital.",
              "b) Identificar de forma clara a las partes: el Titular de Imagen y el Representante Autorizado del Taller.",
              "c) Ser firmado —ya sea con firma manuscrita, firma electrónica o cualquier mecanismo de validación equivalente reconocido por ambas partes— tanto por el Titular de Imagen como por el Representante Autorizado del Taller.",
              "d) Establecer de forma específica y detallada las condiciones especiales acordadas, incluyendo, cuando corresponda: el monto o naturaleza de la compensación, el plazo de vigencia del acuerdo, las plataformas o usos habilitados y los excluidos, los derechos de revisión o veto previo del Titular de Imagen, y cualquier otra cláusula particular.",
              "e) No contravenir las disposiciones imperativas de la legislación salvadoreña aplicable.",
            ]}
          />
          <P>
            <strong>10.3</strong> NULIDAD DE ACUERDOS INFORMALES. Cualquier
            promesa, compromiso, oferta o acuerdo que no cumpla la totalidad de
            los requisitos del numeral anterior es nulo de pleno derecho e
            inoponible al Taller. En particular:
          </P>
          <Ul
            items={[
              "a) Los acuerdos verbales, independientemente de quién los haya realizado, no generan obligaciones para el Taller.",
              "b) Los mensajes enviados por el personal del Taller a través de canales de comunicación que no sean canales oficiales no generan obligaciones.",
              "c) Los compromisos asumidos por personas del Taller que no sean Representantes Autorizados no generan obligaciones.",
              "d) Las condiciones especiales no pueden inferirse ni interpretarse a partir de conductas, precedentes o expectativas no documentadas.",
            ]}
          />
          <P>
            <strong>10.4</strong> La existencia de un Acuerdo Especial de Imagen
            no exime al Titular de Imagen de conocer y cumplir la presente
            Política en todo lo que no esté expresamente regulado por dicho
            Acuerdo.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 11 ──────────────────────────────────────────────────────── */}
        <Section
          n={11}
          title="Uso de Imágenes en Edición con Inteligencia Artificial"
        >
          <P>
            <strong>11.1</strong> Al otorgar la Autorización conforme a la
            presente Política, el Titular de Imagen acepta expresamente que el
            Taller puede aplicar herramientas de edición e inteligencia
            artificial sobre el Contenido Visual autorizado, incluyendo sin
            limitarse a: mejora de iluminación, ajuste de color y tono, mejora
            de textura, modificación de fondo, composición con otros elementos
            visuales, y cualquier otro tratamiento estético que el Taller
            considere pertinente para la presentación comercial del Contenido
            Visual.
          </P>
          <P>
            <strong>11.2</strong> La edición del Contenido Visual mediante
            inteligencia artificial no altera la naturaleza humana y real del
            Titular de Imagen ni modifica los términos de la Autorización
            otorgada. La imagen editada sigue siendo una imagen del Titular de
            Imagen para efectos de la presente Política.
          </P>
          <P>
            <strong>11.3</strong> Si el Titular de Imagen desea limitar el tipo
            de edición aplicable a su imagen, debe expresarlo al momento de
            otorgar la Autorización y formalizar dicha limitación mediante un
            Acuerdo Especial de Imagen conforme al Artículo 10. La Autorización
            otorgada sin restricciones expresas sobre el uso de IA implica la
            aceptación de su uso en los términos del presente artículo.
          </P>
          <P>
            <strong>11.4</strong> El Taller garantiza que la edición con
            inteligencia artificial aplicada a las imágenes del Titular de
            Imagen no alterará su identidad de forma que lo coloque en
            situaciones comprometedoras, ofensivas ni contrarias a su dignidad.
            La edición se limitará a mejoras estéticas y de presentación
            comercial del producto confeccionado.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 12 ──────────────────────────────────────────────────────── */}
        <Section n={12} title="Exención de Responsabilidad del Taller">
          <P>
            <strong>12.1</strong> En la máxima medida permitida por la
            legislación salvadoreña aplicable, el Taller queda expresamente
            eximido de toda responsabilidad derivada de los siguientes
            supuestos, sin que esta lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) El uso del Contenido Visual conforme a una Autorización válida otorgada por el Titular de Imagen en los términos de la presente Política, independientemente del impacto que dicho uso tenga sobre el Titular de Imagen.",
              "b) Reclamaciones del Titular de Imagen basadas en la falta de lectura previa de la presente Política al momento de otorgar la Autorización.",
              "c) Reclamaciones por compensación económica no amparadas en un Acuerdo Especial de Imagen válido conforme al Artículo 10.",
              "d) El uso que terceros ajenos al Taller puedan hacer del Contenido Visual publicado en los canales oficiales del Taller.",
              "e) La imposibilidad de retirar el Contenido Visual de plataformas de terceros, motores de búsqueda o sistemas de caché fuera del control del Taller.",
              "f) Reclamaciones de instituciones cuyos Elementos de Identidad Institucional aparezcan en el Contenido Visual portados por el Titular de Imagen, cuando el Titular de Imagen haya autorizado el uso de la imagen sin informar al Taller sobre restricciones institucionales aplicables.",
              "g) Autorizaciones otorgadas bajo circunstancias de presión interna del Grupo al que pertenece el Titular de Imagen, cuando dicha presión sea ajena al Taller y no haya sido comunicada al Taller antes de la publicación.",
              "h) Diferencias entre el resultado editorial final del Contenido Visual editado y las expectativas estéticas del Titular de Imagen, cuando dichas expectativas no hayan sido documentadas en un Acuerdo Especial de Imagen.",
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 13 ──────────────────────────────────────────────────────── */}
        <Section n={13} title="Relación con Otras Políticas del Taller">
          <P>
            <strong>13.1</strong> La presente Política forma parte integral del
            marco jurídico y comercial de Confecciones Liss y debe interpretarse
            de forma complementaria y consistente con las demás políticas del
            Taller, en particular:
          </P>
          <Ul
            items={[
              "— Política de Uso de Inteligencia Artificial: /legal/ia",
              "— Política de Logos e Identidad Institucional de Terceros: /legal/terceros",
              "— Política de Contenido Generado por Usuarios (UGC): /legal/ugc",
              "— Política de Privacidad: /legal/privacidad",
              "— Política de Deberes del Usuario: /legal/deberes",
              "— Política de Derechos del Usuario: /legal/derechos",
              "— Política de Comunicaciones Comerciales: /legal/comunicaciones",
              "— Términos y Condiciones de Uso: /legal/terminos",
            ]}
          />
          <P>
            <strong>13.2</strong> En caso de aparente conflicto entre la
            presente Política y cualquier otra política del Taller respecto al
            uso de imagen de personas naturales reales identificables,
            prevalecerán las disposiciones de la presente Política como
            instrumento específico de la materia.
          </P>
          <P>
            <strong>13.3</strong> La Política de Uso de Inteligencia Artificial
            y la presente Política son documentos complementarios y no
            superpuestos: la primera regula el Modelo IA Liam Alejandro
            (personaje sintético) y la edición de prendas sin persona
            identificable real; la presente regula las imágenes de personas
            naturales reales, sean clientes o modelos externos.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 14 ──────────────────────────────────────────────────────── */}
        <Section n={14} title="Resolución de Disputas y Jurisdicción Aplicable">
          <P>
            <strong>14.1</strong> Toda controversia derivada de la aplicación,
            interpretación o incumplimiento de la presente Política se resolverá
            en primera instancia mediante comunicación directa de buena fe entre
            el Titular de Imagen y el Taller, conforme al proceso establecido en
            el Artículo 6 de la presente Política.
          </P>
          <P>
            <strong>14.2</strong> De no alcanzarse un acuerdo, la controversia
            se someterá a la jurisdicción exclusiva de los tribunales
            competentes del departamento de San Miguel, República de El
            Salvador, aplicando la legislación salvadoreña vigente.
          </P>
          <P>
            <strong>14.3</strong> El Titular de Imagen renuncia expresamente a
            cualquier otro fuero o jurisdicción que pudiera corresponderle. La
            legislación salvadoreña es la única aplicable a todas las relaciones
            jurídicas derivadas de la presente Política.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 15 ──────────────────────────────────────────────────────── */}
        <Section n={15} title="Modificaciones a la Política">
          <P>
            <strong>15.1</strong> El Taller se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
          <P>
            <strong>15.2</strong> Las modificaciones aplicarán a las
            Autorizaciones otorgadas con posterioridad a su publicación. Las
            Autorizaciones otorgadas antes de una modificación se regirán por la
            versión de la Política vigente al momento en que fueron otorgadas,
            salvo que el Titular de Imagen acepte expresamente la versión
            actualizada.
          </P>
          <P>
            <strong>15.3</strong> El Taller no está obligado a notificar
            individualmente a los Titulares de Imagen sobre modificaciones a la
            presente Política. Es deber de quien desee otorgar una Autorización
            verificar la versión vigente en{" "}
            <Link
              href="/legal/fotografia"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/fotografia
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── Art. 16 ──────────────────────────────────────────────────────── */}
        <Section n={16} title="Divisibilidad">
          <P>
            <strong>16.1</strong> Si alguna disposición de la presente Política
            fuera declarada inválida, ilegal o inaplicable por un tribunal
            competente de la República de El Salvador, las restantes
            disposiciones continuarán en plena vigencia y efecto, sin que la
            invalidez parcial afecte la validez del conjunto.
          </P>
          <P>
            <strong>16.2</strong> La disposición declarada inválida será
            reemplazada, en la medida de lo posible, por una disposición válida
            que se aproxime al máximo a la intención original.
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
            <span>+503 7329-4499 (mediación y acuerdos)</span>

            <span style={{ fontWeight: "600" }}>
              Política de Fotografía e Imagen:
            </span>
            <Link
              href="/legal/fotografia"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/fotografia
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Privacidad:</span>
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/privacidad
            </Link>

            <span style={{ fontWeight: "600" }}>Política de IA:</span>
            <Link href="/legal/ia" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal/ia
            </Link>

            <span style={{ fontWeight: "600" }}>
              Política de Logos Institucionales:
            </span>
            <Link
              href="/legal/terceros"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/terceros
            </Link>

            <span style={{ fontWeight: "600" }}>Política de UGC:</span>
            <Link href="/legal/ugc" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal/ugc
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

            <span style={{ fontWeight: "600" }}>Términos y Condiciones:</span>
            <Link
              href="/legal/terminos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/terminos
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
            <strong>Vigente desde su publicación — Versión: Junio 2026</strong>
          </div>
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
