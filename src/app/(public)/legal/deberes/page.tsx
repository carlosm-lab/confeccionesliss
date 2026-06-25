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
  title: "Política de Deberes de Usuarios y Clientes",
  description:
    "Política de deberes de Confecciones Liss: obligaciones de pago, información oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
  keywords:
    "deberes usuario, obligaciones cliente, conducta aceptable, marco legal, política cliente, Confecciones Liss El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/deberes` },
  openGraph: {
    title: "Política de Deberes de Usuarios y Clientes | Confecciones Liss",
    description:
      "Política de deberes de Confecciones Liss: obligaciones de pago, información oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
    url: `${siteConfig.url}/legal/deberes`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Deberes de Usuarios y Clientes | Confecciones Liss",
    description:
      "Política de deberes de Confecciones Liss: obligaciones de pago, información oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
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

export default function PoliticaDeberesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/deberes`;
  const PAGE_TITLE = "Política de Deberes";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Deberes de Usuarios y Clientes | Confecciones Liss",
          description:
            "Política de deberes de Confecciones Liss: obligaciones de pago, información oportuna, conducta diligente y uso aceptable de toda nuestra plataforma web.",
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
        title="Política de Deberes del Usuario y Cliente"
        category="Catálogo de deberes, obligaciones de pago y normas de conducta que rigen la relación comercial."
        date="24 Jun, 2026"
        readingTime={20}
      >
        <P>
          El presente documento establece de manera integral, exhaustiva y
          vinculante el catálogo de deberes que corresponden a toda persona
          natural que acceda, navegue, consulte, interactúe, solicite servicios
          o adquiera productos de Confecciones Liss (en adelante &quot;el
          Taller&quot;), ya sea en calidad de visitante, usuario de la
          plataforma o cliente con pedido en curso o completado (en adelante
          &quot;el Cliente&quot; o &quot;el Usuario&quot;, utilizados de forma
          indistinta según el contexto).
        </P>
        <P>
          La relación entre el Cliente y el Taller no genera únicamente derechos
          a favor del primero: genera también deberes cuyo cumplimiento es
          condición indispensable para que el Taller pueda prestar su servicio
          de forma óptima, para que el Cliente pueda ejercer sus derechos
          válidamente, y para que cualquier reclamación sea admisible. El
          incumplimiento de los deberes aquí establecidos tiene consecuencias
          directas sobre la validez de las reclamaciones, la exigibilidad de
          compromisos del Taller, y la posibilidad de ejercer los derechos
          reconocidos en la Política de Derechos disponible en:
        </P>
        <div
          style={{
            paddingLeft: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          <Link
            href="/legal/derechos"
            className="text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/legal/derechos
          </Link>
        </div>
        <P>
          El desconocimiento de los deberes aquí establecidos no exime al
          Cliente de su cumplimiento, no le otorga derechos adicionales, y no
          constituye fundamento válido para reclamación ni para exoneración de
          responsabilidad. La interacción con cualquier canal oficial del Taller
          implica la aceptación plena, libre, voluntaria e informada de la
          totalidad de los deberes aquí descritos.
        </P>
        <Hr />

        <Section n={1} title="Deber de conocimiento de las políticas">
          <P>
            1.1 El Cliente tiene el deber ineludible de leer, comprender y
            conocer en su totalidad la política o políticas del Taller
            aplicables a la operación que pretende realizar, antes de iniciarla.
            Este deber es previo a cualquier consulta, solicitud, pago o
            reclamación.
          </P>
          <P>
            1.2 El conjunto de políticas vigentes del Taller se encuentra
            disponible públicamente y de forma permanente en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
          </div>
          <P>
            El acceso a dichas políticas es libre, gratuito y no requiere
            registro previo. El Cliente no podrá alegar ignorancia, confusión ni
            falta de acceso como justificación para el incumplimiento de ninguna
            de ellas.
          </P>
          <P>
            1.3 El deber de conocimiento comprende, sin limitarse a ello, las
            siguientes políticas, en la versión vigente al momento de cada
            interacción:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              marginBottom: "0.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.25rem",
            }}
          >
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
              — Términos y Condiciones de Uso:{" "}
              <Link
                href="/legal/terminos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/terminos
              </Link>
            </div>
            <div>
              — Política de Cotizaciones:{" "}
              <Link
                href="/legal/cotizaciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/cotizaciones
              </Link>
            </div>
            <div>
              — Política de Envíos:{" "}
              <Link
                href="/legal/envios"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/envios
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
              — Política de Confección:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/confeccion
              </Link>
            </div>
            <div>
              — Política de Promociones:{" "}
              <Link
                href="/legal/promociones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/promociones
              </Link>
            </div>
            <div>
              — Programa de Referidos:{" "}
              <Link
                href="/legal/referidos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/referidos
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
            <div>
              — Política de Derechos del Usuario:{" "}
              <Link
                href="/legal/derecho"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/derecho
              </Link>
            </div>
            <div>
              — La presente Política de Deberes:{" "}
              <Link
                href="/legal/deberes"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </div>
            <div>
              — La política del uso de imágenes y marcas de terceros:{" "}
              <Link
                href="/legal/terceros"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/terceros
              </Link>
            </div>
          </div>
          <P>
            1.4 Las políticas del Taller pueden ser actualizadas en cualquier
            momento. Es deber exclusivo e indelegable del Cliente verificar que
            está consultando la versión vigente al momento de cada interacción.
            El Taller no está obligado a notificar individualmente al Cliente
            sobre modificaciones a sus políticas.
          </P>
          <P>
            1.5 El incumplimiento del deber establecido en el presente artículo
            tiene como consecuencia directa que cualquier reclamación formulada
            por el Cliente al margen de las políticas vigentes será inadmisible,
            inválida e inoponible al Taller.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Deber de informarse previamente">
          <P>
            2.1 El Cliente tiene el deber de informarse de manera suficiente,
            oportuna y diligente sobre los productos, servicios, condiciones,
            características, precios, tiempos y procedimientos del Taller antes
            de iniciar cualquier proceso de compra, cotización, reserva o pago.
          </P>
          <P>
            2.2 El deber de información previa comprende, sin limitarse a ello:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Conocer las características reales de la prenda o servicio que
              desea adquirir, incluyendo materiales, tallas, colores y métodos
              de confección disponibles.
            </P>
            <P>
              b) Verificar que el producto o servicio deseado se ajusta a sus
              necesidades reales antes de confirmar el pedido.
            </P>
            <P>
              c) Consultar con el Taller cualquier duda sobre el producto antes
              de efectuar cualquier pago o reserva, a través de los canales
              oficiales disponibles en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              d) Informarse sobre los tiempos de producción y entrega antes de
              comprometer el pedido, de forma que dichos tiempos sean
              compatibles con sus necesidades particulares.
            </P>
            <P>
              e) Verificar la viabilidad técnica y logística del pedido con el
              Taller antes de confirmarlo formalmente.
            </P>
          </div>
          <P>
            2.3 Las decisiones de compra adoptadas por el Cliente sin haber
            cumplido el deber de información previa establecido en el presente
            artículo son de responsabilidad exclusiva del Cliente. El Taller no
            asumirá responsabilidad alguna derivada de expectativas no
            consultadas, necesidades no comunicadas o supuestos no verificados
            previamente por el Cliente.
          </P>
          <P>
            2.4 La disponibilidad de imágenes del Catálogo Digital no exime al
            Cliente del deber de informarse sobre las características reales de
            la prenda. El contenido visual del catálogo es de carácter
            referencial y puede haber sido editado mediante herramientas de
            inteligencia artificial, conforme a lo declarado en la Política de
            Uso de Inteligencia Artificial del Taller. El Cliente que proceda a
            efectuar un pedido sin haber consultado las características reales
            del producto, asume exclusivamente las consecuencias de dicha
            omisión.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Deber de contraste y verificación de información">
          <P>
            3.1 El Cliente tiene el deber de contrastar, verificar y validar
            toda información que reciba o consulte sobre los productos y
            servicios del Taller, con independencia del canal o fuente de la que
            provenga.
          </P>
          <P>3.2 El deber de contraste comprende, sin limitarse a ello:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Verificar que la información consultada proviene de un Canal
              Oficial del Taller, conforme al directorio disponible en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>{" "}
              El Taller no reconoce información proporcionada a través de
              canales no oficiales, terceros no autorizados ni plataformas no
              verificadas.
            </P>
            <P>
              b) Contrastar cualquier información recibida verbalmente, por
              mensaje informal o fuera de los canales oficiales, con la
              información publicada en la Plataforma o confirmada directamente
              por el Taller a través de sus canales oficiales.
            </P>
            <P>
              c) Verificar personalmente, antes de confirmar cualquier pedido,
              que las especificaciones del producto — incluyendo talla, color,
              modelo, diseño, materiales y precio — coinciden con lo que el
              Cliente efectivamente requiere.
            </P>
            <P>
              d) Solicitar aclaración expresa al Taller en caso de duda o
              discrepancia entre distintas fuentes de información, antes de
              proceder con cualquier pago o confirmación.
            </P>
          </div>
          <P>
            3.3 El Cliente que actúe sobre la base de información no verificada,
            proveniente de fuentes no oficiales o no contrastada con el Taller,
            asume exclusiva e integralmente las consecuencias de dicha
            actuación. El Taller no estará obligado a corregir, compensar ni
            asumir los perjuicios derivados de información que el Cliente no
            verificó con la debida diligencia.
          </P>
          <P>
            3.4 En particular, el Cliente tiene el deber de contrastar el
            contenido visual del Catálogo Digital con la realidad del producto
            físico antes de confirmar su pedido, solicitando al Taller, si lo
            considera necesario, imágenes sin edición, muestras de material o
            cualquier otra referencia que le permita tomar una decisión de
            compra informada.
          </P>
        </Section>
        <Hr />

        <Section
          n={4}
          title="Deber de proporcionar información oportuna, exacta y completa"
        >
          <P>
            4.1 El Cliente tiene el deber de proporcionar al Taller, de forma
            oportuna, exacta, completa y verificable, toda la información
            necesaria para la correcta ejecución del pedido, la prestación del
            servicio y la gestión de la relación comercial.
          </P>
          <P>
            4.2 El deber de información oportuna comprende, sin limitarse a
            ello:
          </P>
          <Ul
            items={[
              "a) Proporcionar las medidas corporales correctas y actualizadas al momento de solicitar la cotización o confirmación del pedido. El Cliente es el único responsable de la exactitud de las medidas que proporciona, y el Taller confeccionará estrictamente con base en ellas.",
              "b) Especificar con claridad y precisión el modelo, color, diseño, tipo de tela, logotipo, texto o cualquier otro elemento de personalización que forme parte del pedido, antes del inicio de la producción.",
              "c) Proporcionar los archivos, diseños, logotipos o referencias visuales en la calidad, formato y resolución adecuados para la producción, dentro del plazo acordado con el Taller.",
              "d) Informar al Taller, de forma inmediata y a través de los canales oficiales, sobre cualquier cambio en las especificaciones del pedido, siempre que dicho cambio sea factible dentro del proceso de producción en curso.",
              "e) Proporcionar los datos de contacto, dirección de entrega y cualquier otra logística de forma correcta y actualizada al momento de confirmar el pedido.",
              "f) Confirmar la recepción de proformas, muestras o aprobaciones que el Taller remita al Cliente para su validación, dentro del plazo establecido por el Taller.",
            ]}
          />
          <P>
            4.3 Los errores, omisiones, inexactitudes o demoras en la provisión
            de información por parte del Cliente son de responsabilidad
            exclusiva de este último. El Taller no asumirá responsabilidad
            alguna derivada de la información incorrecta, incompleta o
            tardíamente proporcionada por el Cliente, incluyendo sin limitarse
            a: prendas confeccionadas en talla incorrecta, diseños erróneos
            basados en especificaciones del Cliente, demoras en la entrega
            atribuibles a la falta de información oportuna, o cualquier otro
            perjuicio derivado de dicha omisión.
          </P>
          <P>
            4.4 Once iniciada la producción sobre la base de la información
            proporcionada por el Cliente, cualquier cambio que requiera
            reiniciar o modificar el proceso de confección será evaluado por el
            Taller a su entera discreción y podrá implicar costos adicionales
            que el Cliente deberá asumir íntegramente, sin derecho a reclamación
            ni reembolso de los montos ya pagados.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Deber de pago en tiempo y forma">
          <P>
            5.1 El Cliente tiene el deber de efectuar todos los pagos que
            correspondan al Taller en los montos, plazos, modalidades y
            condiciones acordadas al momento de la cotización o confirmación del
            pedido.
          </P>
          <P>5.2 El deber de pago comprende, sin limitarse a ello:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Cancelar el anticipo requerido dentro del plazo establecido por
              el Taller para reservar o iniciar la producción del pedido. El
              Taller no está obligado a iniciar ningún proceso de confección,
              reserva de materiales ni asignación de tiempo de producción sin
              haber recibido el anticipo correspondiente.
            </P>
            <P>
              b) Cancelar el saldo restante en el plazo acordado, conforme a las
              condiciones establecidas en la Política de Cotizaciones disponible
              en:{" "}
              <Link
                href="/legal/cotizaciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                /legal/cotizaciones
              </Link>{" "}
              y en la Política de Confección disponible en:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                /legal/confeccion
              </Link>
            </P>
            <P>
              c) Cancelar el valor total del pedido antes de la entrega física
              del mismo, salvo que el Taller haya acordado expresamente
              condiciones de pago distintas por escrito y a través de los
              canales oficiales.
            </P>
            <P>
              d) Efectuar los pagos únicamente a través de los medios de pago
              habilitados y comunicados por el Taller a través de sus canales
              oficiales. El Taller no reconoce pagos realizados a personas,
              cuentas o plataformas no autorizadas expresamente.
            </P>
            <P>
              e) Conservar el comprobante de pago correspondiente y presentarlo
              al Taller cuando sea requerido para verificación.
            </P>
          </div>
          <P>
            5.3 La demora o incumplimiento en el pago faculta al Taller para:
          </P>
          <Ul
            items={[
              "a) Suspender el proceso de producción del pedido sin obligación de notificación previa y sin responsabilidad por demoras derivadas de dicha suspensión.",
              "b) Renegociar los plazos de entrega en función del tiempo perdido por la falta de pago oportuno.",
              "c) Cancelar el pedido con pérdida total del anticipo ya recibido, el cual quedará en beneficio del Taller como compensación por los costos incurridos.",
              "d) Requerir el pago del saldo pendiente por los medios legales que correspondan.",
            ]}
          />
          <P>
            5.4 El Cliente no podrá invocar la demora en la entrega como causa
            de incumplimiento de pago si dicha demora es, total o parcialmente,
            consecuencia de la falta de pago oportuno, de la provisión tardía de
            información, o de cualquier otra causa atribuible al propio Cliente.
          </P>
          <P>
            5.5 Bajo ninguna circunstancia el Cliente podrá efectuar
            contracargos, reversiones de pago o reclamaciones ante entidades
            financieras de forma unilateral e injustificada. En caso de hacerlo,
            el Taller se reserva el derecho de ejercer las acciones legales
            correspondientes para la recuperación de los montos retenidos, más
            los costos y honorarios que dicha gestión genere.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Deber de comunicación oportuna con el taller">
          <P>
            6.1 El Cliente tiene el deber de comunicarse con el Taller de manera
            oportuna, directa y a través de los canales oficiales disponibles
            en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/links
            </Link>
            , ante cualquiera de las siguientes circunstancias, sin limitarse a
            ellas:
          </P>
          <Ul
            items={[
              "a) Inconformidad con algún aspecto del pedido, ya sea durante el proceso de producción o al momento de la recepción del producto.",
              "b) Duda, consulta o solicitud de aclaración sobre cualquier aspecto del producto, servicio o política del Taller.",
              "c) Incapacidad para recibir el pedido en la fecha o condiciones acordadas.",
              "d) Cambio en los datos de contacto o dirección de entrega.",
              "e) Cualquier circunstancia que pudiera afectar el normal desarrollo del pedido o de la relación comercial.",
            ]}
          />
          <P>
            6.2 El deber de comunicación oportuna implica que el Cliente deberá
            contactar al Taller dentro de los plazos razonables y específicos
            establecidos en las políticas aplicables. La comunicación tardía, la
            falta de comunicación o la comunicación a través de canales no
            oficiales tendrá como consecuencia directa la inadmisibilidad de la
            reclamación o solicitud que el Cliente pretenda formular.
          </P>
          <P>
            6.3 El Cliente no podrá invocar circunstancias que debió comunicar
            oportunamente al Taller, como fundamento de una reclamación
            posterior. La omisión de comunicación en el momento oportuno
            equivale a la aceptación tácita de las condiciones sobre las que el
            Cliente no formuló objeción alguna.
          </P>
          <P>
            6.4 Toda comunicación debe realizarse exclusivamente a través de los
            canales oficiales del Taller. El Taller no reconocerá reclamaciones,
            solicitudes ni comunicaciones realizadas a través de terceros no
            autorizados, plataformas no verificadas, o canales informales no
            oficiales, incluso si el contenido de dichas comunicaciones llegara
            a conocimiento del Taller por otras vías.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Deber de reclamar con base en las políticas vigentes"
        >
          <P>
            7.1 El Cliente tiene el deber de formular cualquier reclamación,
            queja o solicitud de atención conforme a las condiciones, plazos y
            procedimientos establecidos en las políticas vigentes del Taller
            aplicables al caso concreto. Ninguna reclamación formulada al margen
            de dichas políticas será admisible ni obligará al Taller a su
            atención.
          </P>
          <P>
            7.2 El deber de reclamar con base en las políticas comprende, sin
            limitarse a ello:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Formular la reclamación dentro de los plazos específicamente
              establecidos en la política aplicable. Las reclamaciones
              extemporáneas serán declaradas inadmisibles sin más trámite.
            </P>
            <P>
              b) Fundamentar la reclamación en hechos concretos, objetivos y
              verificables, acompañados de la evidencia documental, fotográfica
              o de cualquier otro tipo que sustente los argumentos expuestos.
            </P>
            <P>
              c) Identificarse plenamente como Cliente del Taller al formular la
              reclamación, proporcionando los datos del pedido sobre el que
              recae la misma.
            </P>
            <P>
              d) Canalizar la reclamación exclusivamente a través de los canales
              oficiales establecidos en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              e) Abstenerse de formular reclamaciones cuyo fundamento sea la
              falta de cumplimiento de deberes propios del Cliente, incluyendo
              la falta de información previa, la provisión de datos incorrectos,
              o la omisión de comunicación oportuna.
            </P>
          </div>
          <P>
            7.3 Las reclamaciones formuladas con base en argumentos subjetivos,
            expectativas no documentadas, percepciones personales no respaldadas
            en especificaciones escritas y aprobadas, o discrepancias derivadas
            del incumplimiento de los propios deberes del Cliente, no serán
            admitidas ni procesadas por el Taller.
          </P>
          <P>
            7.4 El Cliente que formule reclamaciones reiteradas, infundadas, de
            mala fe, o que utilice los mecanismos de reclamación del Taller de
            forma abusiva, faculta al Taller para declarar inadmisibles futuras
            reclamaciones del mismo Cliente y para ejercer las acciones que
            correspondan en caso de que dicha conducta cause perjuicio al
            Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={8}
          title="Deber de actuar e interactuar con base en las políticas"
        >
          <P>
            8.1 El Cliente tiene el deber de ajustar toda su conducta,
            interacción y actuación frente al Taller a lo establecido en el
            marco de políticas vigente, disponible en:{" "}
            <Link
              href="/legal"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal
            </Link>
            . Ninguna actuación del Cliente que contradiga dicho marco le
            generará derechos ni le eximirá de las consecuencias de dicha
            contradicción.
          </P>
          <P>
            8.2 El deber de actuar con base en las políticas implica que el
            Cliente:
          </P>
          <Ul
            items={[
              "a) No podrá exigir condiciones, plazos, garantías, devoluciones ni beneficios que no estén expresamente reconocidos en las políticas vigentes del Taller.",
              "b) No podrá invocar compromisos verbales, informales o extraoficiales que contradigan lo establecido en las políticas del Taller, salvo que dichos compromisos consten por escrito y sean confirmados por el Taller a través de sus canales oficiales.",
              "c) No podrá pretender aplicar condiciones de políticas anteriores o versiones ya actualizadas del marco legal del Taller, a operaciones realizadas bajo la vigencia de versiones posteriores.",
              "d) Deberá aceptar que las políticas del Taller constituyen el marco normativo exclusivo y excluyente que rige la relación entre las partes, con independencia de usos, costumbres, expectativas o estándares de otros comercios o talleres.",
            ]}
          />
          <P>
            8.3 El incumplimiento del deber establecido en el presente artículo
            no genera obligación alguna de atención especial por parte del
            Taller, y la decisión de atender o no la solicitud del Cliente queda
            a la entera discreción del Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={9}
          title="Deber de someterse al marco legal de Confecciones Liss"
        >
          <P>
            9.1 El Cliente declara y acepta expresamente que toda relación
            comercial con Confecciones Liss se rige de forma exclusiva e
            irrenunciable por:
          </P>
          <Ul
            items={[
              "a) Las políticas comerciales vigentes del Taller, en la versión aplicable al momento de cada operación.",
              "b) La legislación de la República de El Salvador, aplicable a la relación entre las partes.",
              "c) La jurisdicción exclusiva de los tribunales competentes de la República de El Salvador, para cualquier controversia que no sea resuelta mediante acuerdo directo entre las partes.",
            ]}
          />
          <P>
            9.2 El Cliente renuncia expresamente a invocar legislación
            extranjera, estándares internacionales de protección al consumidor
            de otras jurisdicciones, o normativas aplicables en países distintos
            a El Salvador, como fundamento de reclamaciones contra el Taller.
          </P>
          <P>
            9.3 El sometimiento al marco legal del Taller implica que el
            Cliente:
          </P>
          <Ul
            items={[
              "a) Acepta que las políticas del Taller son vinculantes desde el momento en que accede a cualquier canal oficial, con independencia de si ha firmado un contrato, dado un clic de aceptación o leído formalmente los documentos.",
              "b) Acepta que el Taller es el intérprete primario de sus propias políticas, y que en caso de duda sobre el alcance de una disposición, la interpretación del Taller prevalece, sin perjuicio del derecho del Cliente a someter la controversia a los tribunales competentes conforme al literal c) del numeral 9.1.",
              "c) Acepta que la relación comercial con el Taller no genera derechos adquiridos sobre condiciones futuras, disponibilidad de productos, precios ni modalidades de servicio más allá de lo acordado en cada operación concreta.",
            ]}
          />
        </Section>
        <Hr />

        <Section n={10} title="Deber de uso adecuado de los canales oficiales">
          <P>
            10.1 El Cliente tiene el deber de utilizar exclusivamente los
            canales oficiales del Taller para toda comunicación, consulta,
            solicitud, reclamación o gestión vinculada a su relación con
            Confecciones Liss. El directorio de canales oficiales vigentes está
            disponible en:
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
            10.2 El deber de uso adecuado de los canales oficiales comprende,
            sin limitarse a ello:
          </P>
          <Ul
            items={[
              "a) No utilizar los canales del Taller para el envío de contenido ofensivo, difamatorio, amenazante, abusivo o contrario a la ley salvadoreña.",
              "b) No utilizar los canales del Taller para la difusión de información falsa sobre sus productos, servicios o personal.",
              "c) No contactar al Taller a través de perfiles, cuentas o plataformas distintas a las listadas en el directorio oficial.",
              "d) No intentar eludir, saturar ni interferir con los canales oficiales del Taller mediante mensajes masivos, automatizados o de carácter inapropiado.",
              "e) Identificarse correctamente al momento de contactar al Taller, proporcionando los datos necesarios para la atención de su consulta o reclamación.",
            ]}
          />
          <P>
            10.3 El incumplimiento del presente artículo faculta al Taller para
            ignorar, bloquear o denunciar las comunicaciones del Cliente
            realizadas fuera de los parámetros establecidos, sin que ello genere
            responsabilidad alguna para el Taller ni derecho de reclamación para
            el Cliente.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Deber de validación y aprobación oportuna">
          <P>
            11.1 El Cliente tiene el deber de revisar, validar y aprobar de
            forma expresa, oportuna y dentro del plazo establecido por el
            Taller, toda proforma, diseño, muestra, cotización, confirmación de
            especificaciones o cualquier otro documento que el Taller le remita
            para su aprobación previa al inicio o continuación de la producción.
          </P>
          <P>
            11.2 La aprobación del Cliente sobre cualquier documento, diseño o
            especificación remitido por el Taller constituye confirmación
            irrevocable de que el Cliente ha revisado, comprendido y aceptado el
            contenido aprobado. Una vez aprobado, el Cliente no podrá invocar
            discrepancias sobre los elementos que aprobó como fundamento de
            reclamación posterior.
          </P>
          <P>
            11.3 El silencio del Cliente ante una solicitud de aprobación,
            transcurrido el plazo establecido por el Taller, podrá ser
            interpretado por el Taller como aprobación tácita o como abandono
            del pedido, a discreción del Taller, sin generar obligación de
            compensación ni responsabilidad alguna para el Taller por los
            retrasos o consecuencias derivadas.
          </P>
          <P>
            11.4 El Cliente es el único responsable de verificar que los
            archivos, diseños y referencias que proporciona al Taller son los
            definitivos y correctos antes de su aprobación. Los errores
            contenidos en materiales aprobados por el Cliente son
            responsabilidad exclusiva de este último.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Deber de conducta diligente y buena fe">
          <P>
            12.1 El Cliente tiene el deber de actuar en todo momento con buena
            fe, diligencia razonable y respeto mutuo en su relación con el
            Taller, su personal y sus representantes.
          </P>
          <P>
            12.2 El deber de conducta diligente comprende, sin limitarse a ello:
          </P>
          <Ul
            items={[
              "a) No proporcionar información falsa, incompleta o engañosa al Taller con el propósito de obtener beneficios, descuentos o condiciones a las que no tendría derecho conforme a las políticas vigentes.",
              "b) No intentar manipular los procesos del Taller mediante presión indebida, amenazas de publicidad negativa, reseñas falsas o cualquier otro mecanismo de coacción.",
              "c) No difundir información falsa o malintencionada sobre el Taller, sus productos o su personal, ya sea en medios digitales, redes sociales o cualquier otro canal.",
              "d) Tratar con respeto al personal del Taller en toda interacción, independientemente del medio o canal utilizado.",
              "e) Abstenerse de realizar comparaciones, atribuciones o declaraciones públicas sobre el Taller que no se sustenten en hechos verificables y que puedan causar perjuicio a su reputación comercial.",
            ]}
          />
          <P>
            12.3 El incumplimiento de este deber faculta al Taller para
            suspender la atención del Cliente, cancelar pedidos en curso y
            ejercer las acciones legales que correspondan por los perjuicios
            causados.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Deber de recepción oportuna del pedido">
          <P>
            13.1 El Cliente tiene el deber de recibir el pedido en las
            condiciones, plazos y modalidades acordadas con el Taller. La
            disponibilidad del Cliente para la recepción es una condición
            necesaria para el cumplimiento de la obligación de entrega del
            Taller.
          </P>
          <P>13.2 El Cliente deberá:</P>
          <Ul
            items={[
              "a) Estar disponible o garantizar la disponibilidad de una persona autorizada para la recepción del pedido en la fecha y lugar acordados.",
              "b) Informar al Taller con la debida antelación y a través de los canales oficiales sobre cualquier cambio en la disponibilidad de recepción.",
              "c) Revisar el pedido al momento de la recepción y comunicar al Taller, de forma inmediata y dentro de los plazos establecidos en la Política de Devoluciones, cualquier inconformidad observable en ese momento.",
            ]}
          />
          <P>
            13.3 La falta de disponibilidad del Cliente para la recepción, o la
            de-mora en coordinar la entrega por causas atribuibles al Cliente,
            no genera responsabilidad alguna para el Taller por los retrasos
            resultantes, ni exime al Cliente de su deber de pago en los términos
            acordados.
          </P>
          <P>
            13.4 La recepción del pedido por parte del Cliente sin formular
            objeción expresa e inmediata ante el Taller constituye aceptación
            tácita e irrevocable de la conformidad del producto recibido, en los
            términos establecidos en la Política de Devoluciones.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Deber de autogestión y responsabilidad personal">
          <P>
            14.1 El Cliente es el único e irrenunciable responsable de las
            decisiones que adopte en el marco de su relación comercial con el
            Taller. El Taller presta sus servicios sobre la base de la
            información que el Cliente proporciona, y no puede asumir
            responsabilidad por las consecuencias de decisiones adoptadas de
            forma autónoma por el Cliente sin la debida consulta previa.
          </P>
          <P>
            14.2 El deber de autogestión y responsabilidad personal comprende,
            sin limitarse a ello:
          </P>
          <Ul
            items={[
              "a) La responsabilidad exclusiva sobre las tallas, medidas y especificaciones que el Cliente proporciona al Taller.",
              "b) La responsabilidad exclusiva sobre los diseños, textos, logotipos y referencias visuales que el Cliente entrega para la producción.",
              "c) La responsabilidad exclusiva sobre las decisiones de compra adoptadas sin haber consultado previamente con el Taller.",
              "d) La responsabilidad exclusiva sobre el uso posterior que el Cliente haga del producto adquirido.",
              "e) La responsabilidad sobre la correcta elección del producto en función de las necesidades reales del Cliente, sin que el Taller sea garante de la idoneidad del producto para un uso específico no comunicado al Taller con anterioridad al pedido.",
            ]}
          />
          <P>
            14.3 El Taller actúa como ejecutor técnico de las especificaciones
            aprobadas por el Cliente. La responsabilidad del Taller se limita a
            confeccionar el producto conforme a las especificaciones aprobadas.
            Todo lo que exceda de dicho alcance es responsabilidad exclusiva del
            Cliente.
          </P>
        </Section>
        <Hr />

        <Section n={15} title="Consecuencias del incumplimiento de deberes">
          <P>
            15.1 El incumplimiento por parte del Cliente de cualquiera de los
            deberes establecidos en la presente Política tendrá, según la
            naturaleza y gravedad del incumplimiento, las siguientes
            consecuencias, sin que esta lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) Inadmisibilidad de la reclamación formulada, si el incumplimiento del deber es determinante para la procedencia de la misma.",
              "b) Pérdida del derecho a invocar la protección de las políticas del Taller respecto al aspecto específico sobre el que el Cliente incumplió su deber.",
              "c) Traslado íntegro de la responsabilidad al Cliente por los perjuicios que su incumplimiento haya causado, tanto al Taller como al propio Cliente.",
              "d) Facultad del Taller para suspender, cancelar o dar por terminada la relación comercial con el Cliente, con o sin previo aviso.",
              "e) Ejercicio por parte del Taller de las acciones legales que correspondan para la recuperación de perjuicios causados por el incumplimiento del Cliente.",
            ]}
          />
          <P>
            15.2 La traslación de responsabilidad al Cliente como consecuencia
            del incumplimiento de sus deberes opera de pleno derecho, sin
            necesidad de declaración judicial previa, y es oponible al Cliente
            desde el momento en que el incumplimiento se produce.
          </P>
        </Section>
        <Hr />

        <Section
          n={16}
          title="Relación con otras políticas y derechos del cliente"
        >
          <P>
            16.1 La presente Política de Deberes debe interpretarse de forma
            conjunta y complementaria con la totalidad del marco legal de
            Confecciones Liss. Los deberes aquí establecidos son la contraparte
            necesaria de los derechos reconocidos al Cliente en la Política de
            Derechos, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/derechos
            </Link>
          </div>
          <P>
            16.2 El ejercicio válido de los derechos reconocidos al Cliente está
            condicionado al previo cumplimiento de los deberes que corresponden
            al caso concreto. El Cliente que no ha cumplido sus deberes no podrá
            invocar los derechos correlacionados como si los hubiera cumplido.
          </P>
          <P>
            16.3 La presente Política no establece ni modifica los derechos del
            Cliente. Los derechos del Cliente se encuentran exclusivamente en la
            Política de Derechos del Usuario, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/derechos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/derechos
            </Link>
          </div>
        </Section>
        <Hr />

        <Section n={17} title="Modificaciones a la política">
          <P>
            17.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento,
            publicando la versión actualizada en los canales oficiales del
            Taller, disponibles en:
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
            17.2 Las modificaciones entrarán en vigencia de forma inmediata
            desde su publicación. El acceso continuado a cualquier canal oficial
            del Taller con posterioridad a la publicación de cualquier
            modificación constituirá aceptación automática e irrevocable de la
            versión actualizada.
          </P>
          <P>
            17.3 Es deber exclusivo del Cliente verificar periódicamente la
            versión vigente de la presente Política. El Taller no está obligado
            a notificar individualmente a los Clientes sobre modificaciones a
            sus políticas.
          </P>
        </Section>

        <LegalFootnote>
          CONFECCIONES LISS — CONTACTO OFICIAL
          <br />
          Toda gestión exclusivamente a través de:{" "}
          <Link href="/links" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/links
          </Link>
          <br />
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
          · Política de Devoluciones:{" "}
          <Link
            href="/legal/devoluciones"
            className="text-blue-600 hover:underline"
          >
            /legal/devoluciones
          </Link>{" "}
          · Política de Confección:{" "}
          <Link
            href="/legal/confeccion"
            className="text-blue-600 hover:underline"
          >
            /legal/confeccion
          </Link>{" "}
          · Política de Promociones:{" "}
          <Link
            href="/legal/promociones"
            className="text-blue-600 hover:underline"
          >
            /legal/promociones
          </Link>{" "}
          · Política de IA:{" "}
          <Link href="/legal/ia" className="text-blue-600 hover:underline">
            /legal/ia
          </Link>{" "}
          · Derechos del Usuario:{" "}
          <Link href="/legal/derecho" className="text-blue-600 hover:underline">
            /legal/derecho
          </Link>
          <br />
          <br />
          <strong>Dirección:</strong> Barrio La Merced, 5ª Calle Poniente y 1ª
          Avenida Sur, Casa #402, San Miguel, El Salvador.
          <br />
          <strong>Horario:</strong> Lunes a Sábado, 8:00 AM – 5:00 PM
          <br />
          <strong>Encargado de Comunicaciones:</strong> Carlos José Molina
          Villacorta
          <br />
          <br />
          Vigente desde su publicación — Versión: Junio 2026
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
