import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import { Section, Hr, P, Ul } from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Resolución de Disputas y Conflictos | Confecciones Liss",
  description:
    "Política y procedimiento centralizado de resolución de disputas de Confecciones Liss. Conoce las etapas de mediación, plazos de reclamación, y jurisdicción aplicable en El Salvador.",
  keywords:
    "resolucion de disputas, mediacion, reclamos, canales oficiales, Confecciones Liss, El Salvador, terminos legales, arbitraje comercial",
  alternates: {
    canonical: `${siteConfig.url}/legal/disputas`,
  },
  openGraph: {
    title:
      "Política de Resolución de Disputas y Conflictos | Confecciones Liss",
    description:
      "Política y procedimiento centralizado de resolución de disputas de Confecciones Liss. Conoce las etapas de mediación, plazos de reclamación, y jurisdicción aplicable en El Salvador.",
    url: `${siteConfig.url}/legal/disputas`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Política de Resolución de Disputas y Conflictos | Confecciones Liss",
    description:
      "Política y procedimiento centralizado de resolución de disputas de Confecciones Liss. Conoce las etapas de mediación, plazos de reclamación, y jurisdicción aplicable en El Salvador.",
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

export default function DisputasPage() {
  const PAGE_URL = `${siteConfig.url}/legal/disputas`;
  const PAGE_TITLE = "Política de Resolución de Disputas y Conflictos";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Resolución de Disputas y Conflictos | Confecciones Liss",
          description:
            "Política y procedimiento centralizado de resolución de disputas de Confecciones Liss. Conoce las etapas de mediación, plazos de reclamación, y jurisdicción aplicable en El Salvador.",
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
        title="Política de Resolución de Disputas"
        category="Procedimiento centralizado de mediación, plazos de reclamación y resolución amigable de diferencias. Vigente desde su publicación — Junio 2026."
        date="25 Jun, 2026"
        readingTime={18}
      >
        {/* ── Preámbulo ────────────────────────────────────────────────────── */}
        <Section n={0} title="">
          <P>
            La presente Política de Resolución de Disputas y Conflictos (en
            adelante &quot;la Política&quot;) establece de manera integral,
            exhaustiva y vinculante el marco de principios, etapas, condiciones
            y mecanismos bajo los cuales Confecciones Liss (en adelante &quot;el
            Taller&quot;) gestiona, atiende y procura la resolución de toda
            controversia, inconformidad, reclamación, queja o disputa que surja
            en el contexto de cualquier relación comercial, de servicio o de
            interacción entre el Taller y cualquier persona natural que acceda,
            consulte, interactúe o adquiera productos y servicios del Taller (en
            adelante &quot;el Cliente&quot; o &quot;el Usuario&quot;).
          </P>
          <P>
            La presente Política es el instrumento central y unificador del
            sistema de resolución de conflictos del Taller. Recoge y sistematiza
            las disposiciones dispersas en el marco normativo completo del
            Taller, disponible en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>{" "}
            y debe interpretarse de forma conjunta, complementaria y consistente
            con la totalidad de dicho marco. Ninguna disposición de la presente
            Política puede interpretarse de forma aislada ni en contradicción
            con el resto del marco normativo del Taller.
          </P>
          <P>
            La relación entre el Taller y el Cliente se rige, en su integridad,
            por los valores de la buena fe, la transparencia, el diálogo y la
            resolución pacífica de diferencias. El Taller cree que la mayor
            parte de los conflictos son evitables con información adecuada y
            comunicación oportuna, y que los que no pueden evitarse pueden
            resolverse de forma justa, razonada y mutuamente satisfactoria
            cuando ambas partes actúan con honestidad y diligencia.
          </P>
          <P>
            El desconocimiento de la presente Política no exime al Cliente de su
            cumplimiento, no le otorga derechos adicionales a los expresamente
            reconocidos en el marco normativo del Taller, y no constituye
            fundamento válido para reclamación alguna ni para la admisión de
            disputas que no cumplan los requisitos aquí establecidos.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 1 ───────────────────────────────────────────────────────── */}
        <Section n={1} title="Principios Rectores">
          <P>
            <strong>1.1</strong> La gestión de disputas y conflictos por parte
            del Taller se rige por los siguientes principios, los cuales son de
            aplicación transversal a todas las etapas del proceso establecido en
            la presente Política:
          </P>
          <Ul
            items={[
              "a) BUENA FE: El Taller asume que toda comunicación y reclamación del Cliente es formulada de forma honesta y con la intención genuina de resolver una situación concreta. El Taller responderá a toda disputa con la misma disposición, siempre que la reclamación sea fundada, oportuna y formulada conforme al marco normativo aplicable.",
              "b) DIÁLOGO DIRECTO: El Taller prioriza la comunicación directa entre las partes como primer y principal mecanismo de resolución. Antes de escalar cualquier disputa a instancias externas, el Cliente tiene el deber de agotar el diálogo directo con el Taller.",
              "c) RESOLUCIÓN PACÍFICA: El Taller rechaza toda forma de presión indebida, coacción, amenaza de publicidad negativa o cualquier otro mecanismo de intimidación como medio de resolución de conflictos. Los acuerdos alcanzados bajo presión no son vinculantes para el Taller.",
              "d) PROPORCIONALIDAD: La respuesta del Taller ante una disputa será proporcional a la naturaleza, fundamento y evidencia de la reclamación presentada. No toda inconformidad genera una obligación de compensación; solo las causas expresamente reconocidas en el marco normativo del Taller generan obligaciones concretas.",
              "e) CUMPLIMIENTO PREVIO: La admisibilidad de toda disputa está condicionada al cumplimiento previo y concurrente por parte del Cliente de la totalidad de sus deberes, obligaciones y responsabilidades establecidos en el marco normativo del Taller. El Cliente que no ha cumplido sus propias obligaciones no puede invocar incumplimientos del Taller como si las hubiera cumplido.",
              "f) TRANSPARENCIA: El Taller se compromete a comunicar al Cliente, de forma clara y en un plazo razonable, el resultado de la evaluación de su reclamación, los fundamentos de dicha evaluación y, en su caso, las condiciones de cualquier acuerdo que estime procedente.",
              "g) IGUALDAD DE TRATO: El Taller aplicará el mismo marco normativo a todos los Clientes en situaciones equivalentes, sin discriminación por razón de origen, identidad, condición o cualquier otra circunstancia personal.",
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 2 ───────────────────────────────────────────────────────── */}
        <Section
          n={2}
          title="Condición Previa Indispensable: Cumplimiento del Marco Normativo"
        >
          <P>
            <strong>2.1</strong> Para que una disputa o reclamación sea
            admisible y reciba atención por parte del Taller, el Cliente debe
            haber cumplido, en su totalidad y de forma verificable, con el
            catálogo de reglas, derechos, deberes, obligaciones y disposiciones
            establecidas en el marco normativo completo del Taller, disponible
            en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
          <P>
            <strong>2.2</strong> En particular, el Cliente debe haber cumplido
            los siguientes requisitos previos, sin excepción:
          </P>
          <Ul
            items={[
              "a) Haber leído y conocido las políticas del Taller aplicables a la operación objeto de la disputa, conforme al deber establecido en el Artículo 1 de la Política de Deberes del Usuario disponible en: https://www.confeccionesliss.com/legal/deberes",
              "b) Haber proporcionado al Taller información oportuna, exacta y completa conforme al deber establecido en el Artículo 4 de la Política de Deberes del Usuario.",
              "c) Haber efectuado todos los pagos correspondientes en tiempo y forma, conforme al Artículo 5 de la Política de Deberes del Usuario y a la Política de Cotizaciones del Taller disponible en: https://www.confeccionesliss.com/legal/cotizaciones",
              "d) Haber comunicado oportunamente al Taller cualquier inconformidad observada al momento de la recepción del producto o dentro de los plazos establecidos en la Política de Devoluciones disponible en: https://www.confeccionesliss.com/legal/devoluciones",
              "e) Haber formulado la reclamación a través de los canales oficiales del Taller, disponibles en https://www.confeccionesliss.com/links, conforme al deber establecido en el Artículo 6 de la Política de Deberes del Usuario.",
              "f) Haber aportado evidencia suficiente que sustente los argumentos de la reclamación, conforme al Artículo 7 de la Política de Deberes del Usuario.",
            ]}
          />
          <P>
            <strong>2.3</strong> El incumplimiento de cualquiera de los
            requisitos previos establecidos en el numeral anterior tiene como
            consecuencia directa e inmediata la inadmisibilidad de la disputa,
            sin que el Taller esté obligado a evaluarla, responderla ni
            procesarla. La inadmisibilidad opera de pleno derecho, sin necesidad
            de declaración previa del Taller.
          </P>
          <P>
            <strong>2.4</strong> El Cliente que pretenda invocar un derecho
            reconocido en la Política de Derechos del Usuario (disponible en{" "}
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/derechos
            </Link>
            ) como fundamento de su reclamación, debe demostrar haber cumplido
            el deber correlativo establecido en la Política de Deberes del
            Usuario, conforme a la tabla de correspondencia establecida en el
            Artículo 14 de dicha Política de Derechos. El derecho no ejercible
            sin el deber previo correspondiente no puede servir de fundamento a
            una disputa.
          </P>
          <P>
            <strong>2.5</strong> El Taller verificará el cumplimiento de los
            requisitos previos como primera acción ante cualquier reclamación
            recibida. La evaluación de admisibilidad precede y es independiente
            de la evaluación de fondo de la disputa.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 3 ───────────────────────────────────────────────────────── */}
        <Section n={3} title="Etapa I: Prevención y Comunicación Oportuna">
          <P>
            <strong>3.1</strong> El mejor mecanismo de resolución de disputas es
            la prevención. El Taller pone a disposición del Cliente, antes de
            cualquier transacción, toda la información necesaria para adoptar
            decisiones de compra informadas, incluyendo el marco normativo
            completo disponible en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
          <P>
            <strong>3.2</strong> El Cliente tiene el deber de informarse,
            consultar y verificar antes de comprometerse con cualquier pedido.
            La falta de consulta previa ante dudas razonables no es una
            circunstancia que el Taller deba remediar a posteriori.
          </P>
          <P>
            <strong>3.3</strong> Cuando durante el proceso de producción surja
            cualquier circunstancia que pudiera derivar en una inconformidad —
            incluyendo cambios en materiales, plazos o especificaciones — el
            Taller tiene el deber de comunicarlo al Cliente con la antelación
            razonable que las circunstancias permitan, y el Cliente tiene el
            deber recíproco de responder a dichas comunicaciones de forma
            oportuna y constructiva.
          </P>
          <P>
            <strong>3.4</strong> La comunicación oportuna entre las partes
            durante el proceso de producción es el mecanismo más eficaz para
            prevenir disputas. El silencio de cualquiera de las partes ante una
            comunicación relevante de la otra puede ser interpretado, conforme a
            la política aplicable, como aceptación tácita de las condiciones
            sobre las que no se formuló objeción.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 4 ───────────────────────────────────────────────────────── */}
        <Section n={4} title="Etapa II: Reclamación Directa por Canal Oficial">
          <P>
            <strong>4.1</strong> Cuando, a pesar de los mecanismos de
            prevención, surja una inconformidad o disputa, el primer mecanismo
            de resolución es la reclamación directa del Cliente al Taller,
            presentada exclusivamente a través de los canales oficiales
            disponibles en:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            <strong>4.2</strong> CANAL PRINCIPAL. El canal de atención primaria
            del Taller para la gestión de reclamaciones es:
          </P>
          <div className="my-4 rounded-xl border border-blue-100 bg-blue-50/30 p-4 dark:border-blue-900/30 dark:bg-blue-950/10">
            <P>
              <strong>WhatsApp oficial:</strong>{" "}
              <a
                href="https://wa.me/50373317181"
                className="text-blue-600 hover:underline"
              >
                +503 7331-7181
              </a>
              <br />
              <strong>Disponible:</strong> Lunes a Sábado, 8:00 AM – 5:00 PM
            </P>
          </div>
          <P>
            <strong>4.3</strong> CONTENIDO MÍNIMO DE LA RECLAMACIÓN. Para que
            una reclamación sea admitida y procesada, el Cliente debe
            presentarla con la siguiente información mínima, sin que su ausencia
            total o parcial pueda ser subsanada por el Taller de oficio:
          </P>
          <Ul
            items={[
              "a) Identificación del Cliente (nombre completo).",
              "b) Identificación del pedido (referencia, fecha aproximada, descripción del producto o servicio objeto de la reclamación).",
              "c) Descripción clara, específica y objetiva del motivo de la reclamación, con indicación de la política o disposición del Taller que el Cliente considera incumplida.",
              "d) Evidencia documental, fotográfica o de cualquier otro tipo que sustente los argumentos de la reclamación. Sin evidencia verificable, la reclamación no puede ser evaluada objetivamente.",
              "e) Pretensión concreta del Cliente: qué espera específicamente del Taller como resolución.",
            ]}
          />
          <P>
            <strong>4.4</strong> PLAZOS DE PRESENTACIÓN. La reclamación debe
            presentarse dentro de los plazos establecidos en la política
            específica aplicable al caso concreto. En particular:
          </P>
          <Ul
            items={[
              "a) Inconformidades con el producto recibido: conforme a los plazos establecidos en la Política de Devoluciones disponible en: https://www.confeccionesliss.com/legal/devoluciones",
              "b) Inconformidades con el ajuste de prendas a la medida: conforme a los plazos establecidos en la Política de Confección disponible en: https://www.confeccionesliss.com/legal/confeccion",
              "c) Inconformidades relacionadas con envíos: conforme a los plazos establecidos en la Política de Envíos disponible en: https://www.confeccionesliss.com/legal/envios",
              "d) Cualquier otra reclamación: dentro de los tres (3) días hábiles siguientes al momento en que el Cliente tuvo o debió tener conocimiento del hecho que la motiva.",
            ]}
          />
          <P>
            <strong>4.5</strong> Las reclamaciones presentadas fuera de los
            plazos establecidos serán declaradas inadmisibles sin evaluación de
            fondo, con independencia de la gravedad o fundamento del motivo
            alegado.
          </P>
          <P>
            <strong>4.6</strong> El Taller acusará recibo de la reclamación
            dentro de los dos (2) días hábiles siguientes a su recepción a
            través de los canales oficiales, siempre que la reclamación contenga
            la información mínima establecida en el numeral 4.3.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 5 ───────────────────────────────────────────────────────── */}
        <Section n={5} title="Etapa III: Evaluación de la Reclamación">
          <P>
            <strong>5.1</strong> Una vez recibida y declarada admisible la
            reclamación, el Taller procederá a su evaluación conforme al
            siguiente procedimiento:
          </P>
          <Ul
            items={[
              "a) VERIFICACIÓN DE ADMISIBILIDAD (hasta 2 días hábiles desde la recepción): El Taller verificará que la reclamación cumple todos los requisitos previos establecidos en el Artículo 2 y los requisitos de forma establecidos en el Artículo 4. Si la reclamación no es admisible, el Taller comunicará al Cliente los motivos de inadmisibilidad.",
              "b) EVALUACIÓN DE FONDO (hasta 5 días hábiles desde la declaración de admisibilidad): El Taller evaluará el mérito de la reclamación contrastándola con las políticas aplicables, las especificaciones documentadas del pedido, la evidencia aportada por el Cliente y el registro interno del Taller sobre la operación en cuestión.",
              "c) COMUNICACIÓN DEL RESULTADO (hasta 2 días hábiles desde la conclusión de la evaluación): El Taller comunicará al Cliente el resultado de la evaluación, incluyendo: la posición del Taller respecto a la reclamación; los fundamentos normativos de dicha posición; y, cuando corresponda, las condiciones de cualquier solución que el Taller estime procedente.",
            ]}
          />
          <P>
            <strong>5.2</strong> Los plazos establecidos en el numeral anterior
            son estimaciones operativas sujetas a la complejidad de la
            reclamación y la carga de trabajo del Taller. Su incumplimiento no
            genera derecho a resolución favorable automática ni a compensación
            alguna.
          </P>
          <P>
            <strong>5.3</strong> El Taller puede solicitar al Cliente
            información adicional durante el proceso de evaluación. El Cliente
            tiene el deber de responder a dicha solicitud dentro de los dos (2)
            días hábiles siguientes. La falta de respuesta oportuna del Cliente
            suspende el plazo de evaluación del Taller y puede resultar en el
            cierre de la reclamación por falta de colaboración.
          </P>
          <P>
            <strong>5.4</strong> La evaluación del Taller se basa exclusivamente
            en:
          </P>
          <Ul
            items={[
              "a) Las políticas vigentes del Taller al momento del pedido.",
              "b) Las especificaciones documentadas y aprobadas del pedido.",
              "c) La evidencia objetiva y verificable aportada por el Cliente.",
              "d) El registro interno del Taller sobre la operación.",
            ]}
          />
          <P>
            El Taller no considerará argumentos basados en expectativas
            subjetivas, promesas no documentadas, referencias a prácticas de
            otros comercios, ni en la situación personal del Cliente que no
            guarde relación directa con el cumplimiento de las obligaciones del
            Taller.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 6 ───────────────────────────────────────────────────────── */}
        <Section n={6} title="Etapa IV: Diálogo y Negociación de Buena Fe">
          <P>
            <strong>6.1</strong> Cuando la evaluación de la reclamación no
            conduzca a una resolución inmediata y definitiva, o cuando
            cualquiera de las partes considere que existe espacio para una
            solución negociada, se procederá a la etapa de diálogo y negociación
            de buena fe entre el Cliente y el Taller.
          </P>
          <P>
            <strong>6.2</strong> El diálogo de buena fe se desarrollará
            exclusivamente a través de los canales oficiales del Taller o,
            cuando la complejidad de la disputa lo requiera, mediante reunión
            presencial acordada entre las partes.
          </P>
          <P>
            <strong>6.3</strong> El Taller designará como interlocutor para el
            diálogo al Encargado de Comunicaciones, Carlos José Molina
            Villacorta, o a quien este designe. El Cliente puede contactar
            directamente al Encargado de Comunicaciones en casos que requieran
            escalamiento, al número:
          </P>
          <div className="my-4 rounded-xl border border-amber-100 bg-amber-50/30 p-4 dark:border-amber-900/30 dark:bg-amber-950/10">
            <P>
              <strong>Contacto de Escalamiento / Mediación:</strong>{" "}
              <a
                href="https://wa.me/50373294499"
                className="text-amber-700 hover:underline"
              >
                +503 7329-4499
              </a>
            </P>
          </div>
          <P>
            <strong>6.4</strong> CONTENIDO DEL DIÁLOGO. El proceso de diálogo
            tiene como objetivo explorar soluciones que sean:
          </P>
          <Ul
            items={[
              "a) Fundadas en el marco normativo del Taller.",
              "b) Proporcionales a la naturaleza y dimensión real del conflicto.",
              "c) Mutuamente beneficiosas o, al menos, equitativas para ambas partes.",
              "d) Ejecutables dentro de las capacidades operativas y financieras del Taller.",
            ]}
          />
          <P>
            <strong>6.5</strong> POSIBLES RESULTADOS DEL DIÁLOGO:
          </P>
          <Ul
            items={[
              "a) ACUERDO TOTAL: Las partes alcanzan un acuerdo que resuelve la disputa en su integridad. El acuerdo debe constar por escrito — ya sea en documento físico o en comunicación a través de canal oficial — para ser oponible al Taller.",
              "b) ACUERDO PARCIAL: Las partes alcanzan un acuerdo sobre algunos aspectos de la disputa, quedando otros pendientes de resolución.",
              "c) NO ACUERDO: Las partes no logran un acuerdo mutuamente satisfactorio, agotando la etapa de diálogo y habilitando el acceso a la Etapa V establecida en el Artículo 7.",
            ]}
          />
          <P>
            <strong>6.6</strong> El diálogo de buena fe no implica
            reconocimiento por parte del Taller de ninguna responsabilidad ni de
            ningún derecho del Cliente que no esté expresamente reconocido en el
            marco normativo del Taller. Es una manifestación del compromiso del
            Taller con la resolución pacífica de diferencias, y no una concesión
            de validez a reclamaciones que no la tienen conforme a las políticas
            aplicables.
          </P>
          <P>
            <strong>6.7</strong> El Cliente que, durante el proceso de diálogo,
            recurra a la presión indebida, la amenaza de publicidad negativa, la
            difusión de información falsa o cualquier otra forma de coacción,
            perderá el derecho a continuar el proceso de diálogo y el Taller
            quedará habilitado para declarar cerrada la disputa, sin perjuicio
            de las acciones legales que correspondan.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 7 ───────────────────────────────────────────────────────── */}
        <Section
          n={7}
          title="Etapa V: Escalamiento al Encargado de Comunicaciones"
        >
          <P>
            <strong>7.1</strong> Cuando la reclamación directa y el diálogo de
            buena fe no hayan producido un acuerdo satisfactorio, el Cliente
            puede solicitar el escalamiento de la disputa al Encargado de
            Comunicaciones del Taller, como instancia interna superior de
            resolución.
          </P>
          <P>
            <strong>7.2</strong> El escalamiento se realiza exclusivamente a
            través de los canales oficiales disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>{" "}
            o directamente al número de mediación del Encargado de
            Comunicaciones:
          </P>
          <div className="my-4 rounded-xl border border-blue-100 bg-blue-50/30 p-4 dark:border-blue-900/30 dark:bg-blue-950/10">
            <P>
              <strong>Carlos José Molina Villacorta —</strong>{" "}
              <a
                href="https://wa.me/50373294499"
                className="text-blue-600 hover:underline"
              >
                +503 7329-4499
              </a>
            </P>
          </div>
          <P>
            <strong>7.3</strong> El escalamiento solo procede si:
          </P>
          <Ul
            items={[
              "a) El Cliente ha agotado las etapas previas (reclamación directa y diálogo de buena fe) sin haber alcanzado un acuerdo.",
              "b) La disputa involucra un monto, una situación o una complejidad que justifica la intervención de una instancia superior.",
              "c) El Cliente presenta un resumen escrito de la disputa, incluyendo la cronología de las gestiones previas realizadas y la evidencia correspondiente.",
            ]}
          />
          <P>
            <strong>7.4</strong> El Encargado de Comunicaciones evaluará la
            disputa de forma imparcial, considerando los argumentos de ambas
            partes y el marco normativo del Taller, y emitirá una posición
            definitiva del Taller en un plazo razonable.
          </P>
          <P>
            <strong>7.5</strong> La posición del Encargado de Comunicaciones
            representa la posición final del Taller en la instancia interna de
            resolución. Agotada esta instancia, sin acuerdo entre las partes, el
            Cliente queda habilitado para acceder a los mecanismos externos
            establecidos en el Artículo 8.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 8 ───────────────────────────────────────────────────────── */}
        <Section n={8} title="Etapa VI: Mecanismos Externos de Resolución">
          <P>
            <strong>8.1</strong> Solo cuando el Cliente haya agotado todas las
            etapas internas de resolución establecidas en los Artículos 3 a 7 de
            la presente Política, sin haber alcanzado un acuerdo con el Taller,
            podrá acceder a los mecanismos externos de resolución aquí
            establecidos.
          </P>
          <P>
            <strong>8.2</strong> CONDICIÓN PREVIA AL ACCESO A INSTANCIAS
            EXTERNAS. Antes de acudir a cualquier instancia externa, el Cliente
            debe poder demostrar, mediante documentación suficiente, que:
          </P>
          <Ul
            items={[
              "a) Formuló su reclamación dentro de los plazos establecidos.",
              "b) Lo hizo a través de los canales oficiales del Taller.",
              "c) Aportó la evidencia necesaria para sustentar su reclamación.",
              "d) Participó de buena fe en el proceso de diálogo con el Taller.",
              "e) Agotó el escalamiento interno conforme al Artículo 7.",
            ]}
          />
          <P>
            El incumplimiento de cualquiera de estos requisitos puede ser
            alegado por el Taller como defensa ante cualquier instancia externa.
          </P>
          <P>
            <strong>8.3</strong> MEDIACIÓN VOLUNTARIA. Las partes pueden acordar
            someter la disputa a mediación ante un tercero neutral, conforme a
            los mecanismos de mediación disponibles en El Salvador. La mediación
            es voluntaria y requiere el consentimiento expreso de ambas partes.
            El Taller está abierto a explorar esta opción cuando la mediación
            sea propuesta de buena fe y la disputa tenga un fundamento serio y
            documentado.
          </P>
          <P>
            <strong>8.4</strong> JURISDICCIÓN Y LEGISLACIÓN APLICABLE. De no
            alcanzarse resolución por los mecanismos previos, toda controversia
            derivada de la relación entre el Cliente y el Taller se someterá a
            la jurisdicción exclusiva de los tribunales competentes del
            departamento de San Miguel, República de El Salvador, aplicando
            exclusivamente la legislación salvadoreña vigente, incluyendo sin
            limitarse al Código de Comercio, el Código Civil y la Ley de
            Protección al Consumidor de El Salvador.
          </P>
          <P>
            <strong>8.5</strong> RENUNCIA A OTRAS JURISDICCIONES. El Cliente
            renuncia expresamente a cualquier otro fuero, jurisdicción o
            legislación que pudiera corresponderle por razón de domicilio,
            nacionalidad o cualquier otra causa, con independencia del país o
            región desde el que haya accedido a los productos o servicios del
            Taller.
          </P>
          <P>
            <strong>8.6</strong> CONTRACARGOS Y REVERSIONES FINANCIERAS. El
            inicio de procesos de contracargo, reversión de transacción o
            reclamación ante entidades financieras de forma unilateral, sin
            haber agotado previamente las etapas internas de resolución
            establecidas en la presente Política, constituye incumplimiento
            grave de los deberes del Cliente y faculta al Taller para:
          </P>
          <Ul
            items={[
              "a) Declarar inadmisible cualquier reclamación posterior del mismo Cliente.",
              "b) Ejercer las acciones legales correspondientes para la recuperación de los montos retenidos o revertidos, más los costos, intereses y honorarios que dicha gestión genere.",
              "c) Dar por terminada la relación comercial con el Cliente sin obligación de compensación.",
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 9 ───────────────────────────────────────────────────────── */}
        <Section n={9} title="Causas de Inadmisibilidad de Disputas">
          <P>
            <strong>9.1</strong> Una disputa es inadmisible y no recibirá
            atención del Taller en los siguientes supuestos, sin que esta lista
            sea limitativa:
          </P>
          <Ul
            items={[
              "a) Fue presentada fuera de los plazos establecidos en la política específica aplicable al caso.",
              "b) Fue presentada a través de canales no oficiales del Taller.",
              "c) No contiene la información mínima establecida en el Artículo 4.3 de la presente Política.",
              "d) Se basa en expectativas subjetivas, promesas verbales no documentadas o especificaciones no acordadas por escrito.",
              "e) Su causa es atribuible al incumplimiento de los propios deberes del Cliente, incluyendo la provisión de información incorrecta, la falta de pago oportuno, la falta de validación de especificaciones o la falta de comunicación oportuna.",
              "f) Se refiere a diferencias entre el Contenido Visual del Catálogo Digital del Taller (editado con IA) y el producto físico, conforme a lo establecido en la Política de Uso de Inteligencia Artificial disponible en: https://www.confeccionesliss.com/legal/ia",
              "g) Se basa en variaciones menores de tonalidad, textura o acabado propias de los procesos de producción textil, conforme a lo establecido en la Política de Devoluciones.",
              "h) Se refiere a inconformidades con aspectos del pedido que el Cliente o su Representante aprobó expresamente antes del inicio de la producción.",
              "i) Se refiere a inconformidades con tallas o medidas proporcionadas por el propio Cliente, conforme a lo establecido en la Política de Confección.",
              "j) Ha sido formulada de mala fe, con información falsa o con el propósito de obtener compensaciones a las que el Cliente no tiene derecho conforme al marco normativo del Taller.",
              "k) Involucra un contracargo o reversión financiera ya iniciado de forma unilateral por el Cliente.",
              "l) El Cliente no ha cumplido la totalidad de sus obligaciones de pago al Taller en el marco de la operación objeto de la disputa.",
            ]}
          />
          <P>
            <strong>9.2</strong> La declaración de inadmisibilidad de una
            disputa por parte del Taller se comunicará al Cliente a través de
            los canales oficiales, con indicación del motivo de inadmisibilidad.
            El Cliente puede subsanar los defectos de forma dentro de los dos
            (2) días hábiles siguientes a la notificación de inadmisibilidad,
            cuando dichos defectos sean subsanables. Los defectos de fondo — en
            particular la extemporaneidad y el incumplimiento previo de deberes
            — no son subsanables.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 10 ──────────────────────────────────────────────────────── */}
        <Section
          n={10}
          title="Límites de la Responsabilidad del Taller en Disputas"
        >
          <P>
            <strong>10.1</strong> En la máxima medida permitida por la
            legislación salvadoreña aplicable, la responsabilidad máxima del
            Taller frente al Cliente, por cualquier causa directamente
            atribuible al Taller y debidamente acreditada, se limita a lo
            siguiente:
          </P>
          <Ul
            items={[
              "a) Para inconformidades por defecto de fabricación comprobable: la reelaboración de la prenda defectuosa o, a discreción del Taller, un acuerdo especial conforme a lo establecido en la Política de Devoluciones.",
              "b) Para inconformidades por error en el ajuste de prendas a la medida atribuible al Taller: la corrección gratuita conforme a la Política de Confección.",
              "c) Para demoras en la entrega atribuibles exclusivamente al Taller: la reprogramación de la entrega en el plazo más breve posible, sin que dicha demora genere derecho a descuentos, compensaciones económicas ni devoluciones salvo acuerdo expreso.",
            ]}
          />
          <P>
            <strong>10.2</strong> En ningún caso la responsabilidad del Taller
            incluirá:
          </P>
          <Ul
            items={[
              "a) Daños indirectos, daño emergente, lucro cesante ni daño moral.",
              "b) Compensaciones por el impacto personal, profesional o institucional que el Cliente alegue haber sufrido como consecuencia del conflicto.",
              "c) Reembolsos en efectivo, salvo en los supuestos expresamente establecidos en la Política de Devoluciones.",
              "d) Compensaciones derivadas de reclamaciones no fundamentadas en el marco normativo del Taller.",
            ]}
          />
          <P>
            <strong>10.3</strong> Ningún acuerdo de resolución de disputa puede
            generar para el Taller obligaciones que excedan el valor total de la
            operación comercial objeto de la disputa.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 11 ──────────────────────────────────────────────────────── */}
        <Section n={11} title="Acuerdos de Resolución: Forma y Validez">
          <P>
            <strong>11.1</strong> Todo acuerdo de resolución de disputa
            alcanzado entre el Cliente y el Taller debe constar por escrito, ya
            sea mediante documento físico firmado por ambas partes, o mediante
            comunicación escrita a través de los canales oficiales del Taller,
            donde quede documentada la aceptación expresa de ambas partes sobre
            los términos del acuerdo.
          </P>
          <P>
            <strong>11.2</strong> Los acuerdos verbales, incluso los alcanzados
            en reuniones presenciales, no son oponibles al Taller salvo que sean
            posteriormente confirmados por escrito a través de los canales
            oficiales.
          </P>
          <P>
            <strong>11.3</strong> Un acuerdo de resolución de disputa es
            definitivo y cierra la disputa en los términos acordados. El Cliente
            no podrá reabrir la misma disputa ni formular nuevas reclamaciones
            basadas en los mismos hechos una vez que el acuerdo haya sido
            suscrito y ejecutado.
          </P>
          <P>
            <strong>11.4</strong> Los acuerdos de resolución de disputa que
            impliquen condiciones especiales — compensaciones económicas,
            descuentos, servicios adicionales u otros beneficios distintos a los
            establecidos en el marco normativo del Taller — deben ser suscritos
            por el Encargado de Comunicaciones o por quien el Taller designe
            expresamente como representante autorizado para el caso concreto.
            Los acuerdos suscritos por personas sin autorización expresa no
            obligan al Taller.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 12 ──────────────────────────────────────────────────────── */}
        <Section n={12} title="Conducta Durante el Proceso de Resolución">
          <P>
            <strong>12.1</strong> Durante todo el proceso de resolución de
            disputas, ambas partes tienen el deber de mantener una conducta
            respetuosa, honesta y orientada a la solución. En particular, el
            Cliente tiene el deber de:
          </P>
          <Ul
            items={[
              "a) Comunicarse con el Taller de forma respetuosa, sin lenguaje ofensivo, amenazante ni intimidatorio.",
              "b) Proporcionar únicamente información veraz y verificable como sustento de su reclamación.",
              "c) Abstenerse de publicar, difundir o compartir información falsa, parcial o descontextualizada sobre el Taller, sus productos o su personal, durante el proceso de resolución.",
              "d) Abstenerse de utilizar la amenaza de publicidad negativa, reseñas negativas, denuncias públicas o cualquier otra forma de presión mediática o social como mecanismo de negociación.",
              "e) Colaborar activamente con el Taller en la aportación de información y evidencia necesaria para la evaluación de la reclamación.",
            ]}
          />
          <P>
            <strong>12.2</strong> El incumplimiento de los deberes establecidos
            en el numeral anterior por parte del Cliente tiene las siguientes
            consecuencias:
          </P>
          <Ul
            items={[
              "a) La suspensión inmediata del proceso de resolución hasta que el Cliente restablezca una conducta adecuada.",
              "b) La posibilidad de que el Taller declare cerrada la disputa sin acuerdo, con pérdida del derecho del Cliente a reabrirla.",
              "c) El ejercicio por parte del Taller de las acciones legales que correspondan por los perjuicios causados por la conducta del Cliente, incluyendo acciones por daño a la reputación comercial del Taller.",
            ]}
          />
          <P>
            <strong>12.3</strong> El Taller, por su parte, se compromete a
            tratar al Cliente con respeto y buena fe durante todo el proceso, a
            no adoptar represalias comerciales injustificadas por el ejercicio
            legítimo del derecho a reclamar, y a evaluar todas las reclamaciones
            con la objetividad que el marco normativo del Taller permite.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 13 ──────────────────────────────────────────────────────── */}
        <Section n={13} title="Registro y Confidencialidad de Disputas">
          <P>
            <strong>13.1</strong> El Taller registrará internamente todas las
            disputas recibidas, su proceso de evaluación y el resultado
            alcanzado, como parte de su sistema de gestión de calidad y mejora
            continua.
          </P>
          <P>
            <strong>13.2</strong> El contenido de las disputas y los acuerdos
            alcanzados es confidencial entre las partes. Ninguna de las partes
            divulgará los términos de un acuerdo de resolución de disputa a
            terceros, salvo requerimiento legal expreso.
          </P>
          <P>
            <strong>13.3</strong> El Taller puede utilizar la información
            agregada y anonimizada de las disputas recibidas para identificar
            oportunidades de mejora en sus procesos, políticas y productos,
            conforme a lo establecido en la Política de Privacidad disponible
            en:{" "}
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/privacidad
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── Art. 14 ──────────────────────────────────────────────────────── */}
        <Section
          n={14}
          title="Relación con el Marco Normativo Completo del Taller"
        >
          <P>
            <strong>14.1</strong> La presente Política es el instrumento central
            del sistema de resolución de conflictos del Taller y debe leerse e
            interpretarse siempre en conjunto con el marco normativo completo
            del Taller disponible en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            . En particular, con las siguientes políticas que regulan supuestos
            específicos de disputa:
          </P>
          <Ul
            items={[
              "— Política de Devoluciones: https://www.confeccionesliss.com/legal/devoluciones",
              "— Política de Confección: https://www.confeccionesliss.com/legal/confeccion",
              "— Política de Envíos: https://www.confeccionesliss.com/legal/envios",
              "— Política de Cotizaciones: https://www.confeccionesliss.com/legal/cotizaciones",
              "— Política de Deberes del Usuario: https://www.confeccionesliss.com/legal/deberes",
              "— Política de Derechos del Usuario: https://www.confeccionesliss.com/legal/derechos",
              "— Política de Uso de Inteligencia Artificial: https://www.confeccionesliss.com/legal/ia",
              "— Política de Fotografía y Uso de Imagen: https://www.confeccionesliss.com/legal/imagen",
              "— Política de Pedidos en Grupo y Mayoreo: https://www.confeccionesliss.com/legal/mayoreo",
              "— Política de Promociones: https://www.confeccionesliss.com/legal/promociones",
              "— Política de Logos e Identidad Institucional de Terceros: https://www.confeccionesliss.com/legal/terceros",
              "— Política de Comunicaciones Comerciales: https://www.confeccionesliss.com/legal/comunicaciones",
              "— Política de Contenido Generado por Usuarios (UGC): https://www.confeccionesliss.com/legal/ugc",
              "— Política de Privacidad: https://www.confeccionesliss.com/legal/privacidad",
              "— Términos y Condiciones de Uso: https://www.confeccionesliss.com/legal/terminos",
              "— Directorio de canales oficiales: https://www.confeccionesliss.com/links",
            ]}
          />
          <P>
            <strong>14.2</strong> En caso de aparente conflicto entre la
            presente Política y alguna política específica del Taller respecto a
            un supuesto concreto de disputa, prevalece la política específica en
            lo que regule de forma particular, y la presente Política en todo lo
            que no esté específicamente regulado por aquella.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 15 ──────────────────────────────────────────────────────── */}
        <Section n={15} title="Modificaciones a la Política">
          <P>
            <strong>15.1</strong> El Taller se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
          <P>
            <strong>15.2</strong> Las modificaciones entrarán en vigencia de
            forma inmediata desde su publicación. El acceso continuado a
            cualquier canal oficial del Taller con posterioridad a cualquier
            modificación constituirá aceptación automática e irrevocable de la
            versión actualizada.
          </P>
          <P>
            <strong>15.3</strong> La versión vigente de la presente Política al
            momento en que surge la causa de la disputa será la aplicable a
            dicha disputa. El Taller no está obligado a notificar
            individualmente a los Clientes sobre modificaciones. Es deber
            exclusivo del Cliente verificar la versión vigente en:{" "}
            <Link
              href="/legal/disputas"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/disputas
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
            disposiciones continuarán en plena vigencia y efecto. La disposición
            inválida será reemplazada, en la medida de lo posible, por una
            disposición válida que se aproxime al máximo a la intención
            original.
          </P>
        </Section>
        <Hr />

        {/* ── Resumen ──────────────────────────────────────────────────────── */}
        <Section
          n={17}
          title="Resumen del Proceso — Guía Rápida para el Cliente"
        >
          <P>
            Antes de iniciar cualquier proceso de disputa, el Cliente debe
            verificar:
          </P>
          <Ul
            items={[
              "✓ ¿Leí la política aplicable a mi caso? (disponibles en https://www.confeccionesliss.com/legal)",
              "✓ ¿Cumplí todos mis deberes como cliente? (disponibles en https://www.confeccionesliss.com/legal/deberes)",
              "✓ ¿Tengo evidencia objetiva y verificable que sustenta mi reclamación?",
              "✓ ¿Estoy dentro del plazo para reclamar?",
              "✓ ¿Voy a usar los canales oficiales del Taller? (disponibles en https://www.confeccionesliss.com/links)",
            ]}
          />
          <P>
            Si la respuesta a todas las preguntas anteriores es{" "}
            <strong>SÍ</strong>, el proceso estructurado es:
          </P>
          <div className="my-6 space-y-4">
            <div className="flex gap-4 rounded-lg bg-slate-50 p-3.5 dark:bg-slate-900/50">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                1
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  Reclamación Directa
                </strong>
                <p className="mt-0.5 text-sm text-slate-500">
                  Presentación formal por canal oficial (+503 7331-7181) con
                  toda la información y pruebas requeridas.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-slate-50 p-3.5 dark:bg-slate-900/50">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                2
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  Diálogo y Negociación
                </strong>
                <p className="mt-0.5 text-sm text-slate-500">
                  Búsqueda amigable y directa de una solución fundada en el
                  marco normativo.
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-slate-50 p-3.5 dark:bg-slate-900/50">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                3
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  Escalamiento
                </strong>
                <p className="mt-0.5 text-sm text-slate-500">
                  Mediación interna directa ante el Encargado de Comunicaciones
                  (+503 7329-4499).
                </p>
              </div>
            </div>
            <div className="flex gap-4 rounded-lg bg-slate-50 p-3.5 dark:bg-slate-900/50">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                4
              </span>
              <div>
                <strong className="text-slate-900 dark:text-white">
                  Mecanismos Externos
                </strong>
                <p className="mt-0.5 text-sm text-slate-500">
                  Mediación de consumo o sometimiento a los tribunales de San
                  Miguel, El Salvador (solo si se agotaron las instancias
                  internas).
                </p>
              </div>
            </div>
          </div>
        </Section>
        <Hr />

        {/* ── Contacto ─────────────────────────────────────────────────────── */}
        <Section n={18} title="Canales Oficiales de Contacto y Enlaces">
          <P>
            Toda gestión relacionada con la presente Política debe realizarse
            exclusivamente a través de:
          </P>
          <Ul
            items={[
              "— Directorio de canales: https://www.confeccionesliss.com/links",
              "— WhatsApp oficial de atención: +503 7331-7181",
              "— Encargado de Comunicaciones: Carlos José Molina Villacorta",
              "— Canal de Escalamiento del Encargado: +503 7329-4499",
              "— Marco normativo completo: https://www.confeccionesliss.com/legal",
            ]}
          />
        </Section>
      </LegalArticleReader>
    </>
  );
}
