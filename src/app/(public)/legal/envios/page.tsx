import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import {
  Section,
  Hr,
  InfoBox,
  P,
  Ul,
  LegalFootnote,
} from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Envíos y Delivery en El Salvador",
  description:
    "Política de envíos de Confecciones Liss: tarifas de delivery en El Salvador, cobertura departamental, tiempos de preparación y condiciones de entrega.",
  keywords:
    "envíos de confecciones liss, delivery de confecciones liss, cobertura de confecciones liss, despacho confecciones liss",
  alternates: { canonical: `${siteConfig.url}/legal/envios` },
  openGraph: {
    title: "Política de Envíos y Delivery en El Salvador | Confecciones Liss",
    description:
      "Política de envíos de Confecciones Liss: tarifas de delivery en El Salvador, cobertura departamental, tiempos de preparación y condiciones de entrega.",
    url: `${siteConfig.url}/legal/envios`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Envíos y Delivery en El Salvador | Confecciones Liss",
    description:
      "Política de envíos de Confecciones Liss: tarifas de delivery en El Salvador, cobertura departamental, tiempos de preparación y condiciones de entrega.",
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

export default function PoliticaEnviosPage() {
  const PAGE_URL = `${siteConfig.url}/legal/envios`;
  const PAGE_TITLE = "Política de Envíos";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política General de Envíos | Confecciones Liss",
          description:
            "Política de envíos de Confecciones Liss: tarifas de delivery en El Salvador, cobertura departamental, tiempos de preparación y condiciones de entrega.",
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
        title="Política General de Envíos"
        category="Políticas de cobertura, plazos de entrega, tarifas de delivery y condiciones de envío de pedidos en El Salvador."
        date="24 Jun, 2026"
        readingTime={15}
      >
        <P>
          La presente Política General de Envíos (en adelante &quot;la
          Política&quot;) regula de manera integral y vinculante las condiciones
          bajo las cuales Confecciones Liss (en adelante &quot;el Taller&quot;)
          gestiona, coordina y ejecuta el servicio de envío y entrega de
          productos a sus clientes (en adelante &quot;el Cliente&quot;) dentro
          del territorio de la República de El Salvador. La solicitud de un
          envío, ya sea de forma expresa o implícita mediante la realización de
          un pedido con entrega a domicilio, constituye la aceptación plena e
          incondicional de todos los términos aquí establecidos. El
          desconocimiento de esta Política no exime al Cliente de su
          cumplimiento.
        </P>
        <Hr />

        <Section n={1} title="Ámbito de aplicación y cobertura geográfica">
          <P>
            1.1 La presente Política aplica exclusiva y únicamente para envíos
            realizados dentro del territorio de la República de El Salvador.
            Confecciones Liss no realiza envíos internacionales bajo ningún
            esquema ni modalidad.
          </P>
          <P>
            1.2 Los envíos se originan desde las instalaciones principales del
            Taller, ubicadas en Barrio La Merced, 5A Calle Poniente y 1A Avenida
            Sur, San Miguel, El Salvador.
          </P>
          <P>
            1.3 La cobertura de destinos está sujeta a la disponibilidad
            operativa del servicio de terceros contratado para la gestión del
            transporte. El Taller no garantiza cobertura en zonas de acceso
            restringido, comunidades remotas o sectores no atendidos por el
            proveedor de servicio de delivery utilizado.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Naturaleza del servicio de envío">
          <P>
            2.1 El servicio de envío ofrecido por Confecciones Liss es de origen
            manual, lo que significa que es el propio Taller quien coordina y
            entrega el paquete a un proveedor externo de servicio de delivery o
            mensajería (en adelante &quot;el Tercero&quot;), quien es el
            encargado de trasladar el producto hasta el destino indicado por el
            Cliente.
          </P>
          <P>
            2.2 Confecciones Liss actúa exclusivamente como remitente del
            paquete. Una vez que el producto es entregado físicamente al
            Tercero, la responsabilidad logística del traslado, custodia y
            entrega recae de forma exclusiva e integral sobre dicho Tercero,
            eximiendo al Taller de cualquier responsabilidad derivada del
            proceso de transporte.
          </P>
          <P>
            2.3 Confecciones Liss no asume responsabilidad alguna por demoras,
            extravíos, daños, robos o cualquier incidencia ocurrida durante el
            proceso de transporte a cargo del Tercero. Cualquier reclamación
            relacionada con el desempeño del servicio de transporte deberá ser
            gestionada directamente por el Cliente ante el proveedor de delivery
            correspondiente.
          </P>
          <P>
            2.4 El Taller documentará el estado de las prendas o productos al
            momento de su entrega al Tercero, mediante fotografía, video u otro
            medio de registro disponible, como constancia del estado en que el
            producto fue despachado. Dicha documentación constituirá prueba
            suficiente del cumplimiento de las obligaciones del Taller respecto
            al estado del producto al momento del envío.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Tiempos de procesamiento y entrega">
          <P>
            3.1 El tiempo de preparación y despacho del pedido por parte del
            Taller es de un (1) día hábil mínimo y dos (2) días hábiles máximo,
            contados a partir de la confirmación del pedido. La hora límite de
            corte diaria para recepción de pedidos es a las 17:00 (5:00 p.m.
            GMT-08:00).
          </P>
          <P>
            3.2 Los días de procesamiento y despacho por parte del Taller son de
            lunes a sábado. No se procesan ni despachan pedidos los días
            domingos ni días festivos oficiales de la República de El Salvador.
          </P>
          <P>
            3.3 El tiempo de transporte a cargo del proveedor de mensajería es
            de un (1) a tres (3) días hábiles para la Zona Oriental (San Miguel,
            Usulután, La Unión, Morazán) y de un (1) a siete (7) días hábiles
            para el Resto del País, operando de lunes a sábado.
          </P>
          <P>
            3.4 El tiempo total estimado de entrega al Cliente (preparación +
            transporte) se desglosa conforme al siguiente esquema oficial:
          </P>
          <InfoBox
            type="blue"
            title="Desglose oficial de tiempos de envío nacional:"
          >
            <span
              style={{
                display: "block",
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.9rem",
                lineHeight: "1.4",
              }}
            >
              • Hora límite de corte diaria: 17:00 (5:00 p.m. GMT-08:00)
              <br />
              • Tiempo de preparación general: 1 a 2 días hábiles (Lun-Sáb)
              <br />
              • Entrega Zona Oriental (San Miguel, Usulután, La Unión, Morazán):
              2 a 5 días hábiles total ($3.00 USD)
              <br />• Entrega Resto del País (San Salvador, Santa Ana, etc.): 2
              a 9 días hábiles total ($6.00 USD)
            </span>
          </InfoBox>
          <P>
            3.5 El cómputo del tiempo de entrega inicia desde el momento en que
            el Taller hace entrega física del producto al proveedor de
            mensajería.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Tarifas de envío y envío gratuito">
          <P>
            4.1 El costo del servicio de envío para pedidos con un valor total
            menor a trescientos cincuenta dólares (USD $350.00) se estructura de
            la siguiente manera:
          </P>
          <Ul
            items={[
              "a) Zona Oriental (San Miguel, Usulután, La Unión, Morazán): Tres dólares exactos (USD $3.00).",
              "b) Resto del País (San Salvador, Santa Ana, Sonsonate, La Libertad, etc.): Seis dólares exactos (USD $6.00).",
            ]}
          />
          <P>
            4.2 Los pedidos cuyo valor total de productos supere los trescientos
            cincuenta dólares (USD $350.00) en una sola transacción gozarán de
            envío gratuito dentro de todo el territorio nacional.
          </P>
          <P>
            4.3 Todos los precios y tarifas están expresados en Moneda de los
            Estados Unidos de América (USD $).
          </P>
          <InfoBox type="blue" title="Ejemplo ilustrativo de cobros de envío:">
            Si un producto tiene un valor de dos dólares (USD $2.00) y el costo
            de envío es de cinco dólares (USD $5.00), el Cliente deberá aprobar
            y cancelar el total de siete dólares (USD $7.00) para que el envío
            sea procesado. Confecciones Liss no procesará ningún envío sin la
            aprobación expresa del Cliente sobre el costo total a pagar.
          </InfoBox>
        </Section>
        <Hr />

        <Section
          n={5}
          title="Responsabilidad del cliente en la información de envío"
        >
          <P>
            5.1 El Cliente es el único y exclusivo responsable de proporcionar,
            de forma correcta, precisa, completa y oportuna, toda la información
            necesaria para la gestión del envío, incluyendo sin limitarse a:
          </P>
          <Ul
            items={[
              "a) Nombre completo del destinatario.",
              "b) Dirección exacta de entrega, incluyendo municipio, departamento, referencias claras y señas particulares del lugar.",
              "c) Número de teléfono principal del destinatario.",
              "d) Número de teléfono de un contacto alternativo para casos de imposibilidad de comunicación con el destinatario principal.",
              "e) Cualquier instrucción especial relevante para la localización del destino.",
            ]}
          />
          <P>
            5.2 Confecciones Liss no verificará ni validará la exactitud de la
            información proporcionada por el Cliente. El Taller trasladará al
            Tercero la información tal y como fue suministrada, sin
            responsabilidad por errores, omisiones o imprecisiones en la misma.
          </P>
          <P>
            5.3 Los envíos fallidos, retrasos o imposibilidades de entrega
            derivados de información incorrecta, incompleta o imprecisa
            proporcionada por el Cliente serán responsabilidad exclusiva de este
            último, sin que ello genere obligación de reembolso, compensación ni
            responsabilidad alguna para Confecciones Liss.
          </P>
        </Section>
        <Hr />

        <Section
          n={6}
          title="Recepción del paquete y disponibilidad del cliente"
        >
          <P>
            6.1 El servicio de delivery proporcionado por el Tercero no opera
            bajo horarios específicos ni franjas horarias garantizadas de
            entrega. El Cliente reconoce y acepta esta condición al solicitar el
            servicio de envío.
          </P>
          <P>
            6.2 Dado que el Tercero no garantiza un horario exacto de entrega,
            el Cliente tiene la obligación de garantizar la disponibilidad de
            una persona responsable en el lugar de entrega durante todo el día
            hábil en que se espera la entrega. Dicha persona podrá ser el propio
            Cliente o un contacto alternativo previamente designado e informado
            al Taller.
          </P>
          <P>
            6.3 El Cliente es el único responsable de designar y comunicar al
            Taller un contacto alternativo confiable y disponible para el caso
            en que el destinatario principal no pueda ser localizado o no se
            encuentre en el lugar de entrega al momento de la visita del
            Tercero.
          </P>
          <P>
            6.4 En caso de que el Tercero no logre contactar al destinatario
            principal ni al contacto alternativo, o que ninguno de estos se
            encuentre disponible en el lugar de entrega, el paquete será
            devuelto al Taller. Confecciones Liss notificará al Cliente sobre la
            devolución del paquete.
          </P>
          <P>
            6.5 Todo reenvío generado por imposibilidad de entrega por causas
            atribuibles al Cliente —incluyendo ausencia, número de contacto
            incorrecto, dirección errónea o falta de disponibilidad del contacto
            alternativo— será contabilizado como un nuevo envío independiente,
            cuyos costos deberán ser asumidos íntegramente por el Cliente previo
            al nuevo despacho. Confecciones Liss no realizará reenvíos sin el
            pago previo de los costos asociados.
          </P>
          <P>
            6.6 Los intentos de entrega fallidos por causas atribuibles al
            Cliente no generan derecho a reembolso de los costos de envío ya
            pagados, ni obligación por parte del Taller de asumir los costos de
            reenvíos subsiguientes.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Estado del paquete y notificación de recepción">
          <P>
            7.1 Confecciones Liss documentará el estado del producto al momento
            de su entrega al Tercero, mediante fotografía, video u otro medio de
            registro, como constancia del estado en que el paquete fue
            despachado. Esta documentación estará disponible como evidencia en
            caso de cualquier reclamación relacionada con el estado del
            producto.
          </P>
          <P>
            7.2 El Cliente tiene la obligación de verificar el estado externo e
            interno del paquete al momento de su recepción y de comunicar
            cualquier inconformidad a Confecciones Liss a través de los canales
            oficiales establecidos en el Artículo 10, dentro del plazo máximo
            improrrogable de una (1) hora contada a partir del momento de
            recepción del paquete.
          </P>
          <P>
            7.3 Toda reclamación por inconformidad en el estado del paquete o su
            contenido deberá estar respaldada por evidencia plausible,
            incluyendo fotografías, videos u otros medios documentales que
            demuestren de forma clara el daño o deficiencia reclamada. Sin dicha
            evidencia, la reclamación no será admitida ni procesada.
          </P>
          <P>
            7.4 Transcurrida la hora posterior a la recepción del paquete sin
            que el Cliente haya presentado reclamación formal con evidencia
            suficiente a través de los canales oficiales, se entenderá de pleno
            derecho que el Cliente recibió el paquete en condiciones
            satisfactorias y a su entera conformidad, renunciando expresamente a
            cualquier reclamación posterior relacionada con el estado del
            paquete o su contenido.
          </P>
          <P>
            7.5 Confecciones Liss no asume responsabilidad por daños al
            contenido del paquete ocurridos durante el proceso de transporte a
            cargo del Tercero. Las reclamaciones por daños en tránsito deberán
            ser gestionadas directamente por el Cliente ante el proveedor de
            delivery correspondiente.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Devoluciones relacionadas con envíos">
          <P>
            8.1 Para consultar de forma completa y detallada la Política de
            Devoluciones vigente de Confecciones Liss, el Cliente deberá
            dirigirse al siguiente enlace:{" "}
            <Link
              href="/legal/devoluciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/devoluciones
            </Link>
          </P>
          <P>
            8.2 La Política de Devoluciones publicada en dicho enlace forma
            parte integral del marco normativo comercial de Confecciones Liss y
            se considera incorporada por referencia a la presente Política de
            Envíos.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Limitación de responsabilidad del taller">
          <P>
            9.1 La responsabilidad de Confecciones Liss en relación con el
            servicio de envío se limita exclusivamente a:
          </P>
          <Ul
            items={[
              "a) La correcta preparación y empaque del producto conforme a las especificaciones del pedido.",
              "b) La entrega oportuna del paquete al Tercero dentro del tiempo de preparación establecido en el Artículo 3.",
              "c) La documentación del estado del producto al momento del despacho.",
            ]}
          />
          <P>
            9.2 Confecciones Liss queda expresamente eximido de toda
            responsabilidad por:
          </P>
          <Ul
            items={[
              "a) Retrasos, extravíos, daños o incidencias ocurridas durante el transporte a cargo del Tercero.",
              "b) Imposibilidad de entrega derivada de información incorrecta o incompleta proporcionada por el Cliente.",
              "c) Ausencia del destinatario o contacto alternativo en el lugar de entrega.",
              "d) Variaciones en los tiempos de entrega por causas atribuibles al Tercero, condiciones externas o fuerza mayor.",
              "e) Daños al paquete o su contenido ocurridos en tránsito.",
              "f) Cualquier consecuencia derivada del incumplimiento por parte del Cliente de sus obligaciones establecidas en la presente Política.",
            ]}
          />
          <P>
            9.3 En ningún caso la responsabilidad máxima de Confecciones Liss
            frente al Cliente por concepto de envío superará el valor del costo
            del servicio de envío pagado por el Cliente para el pedido en
            cuestión.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Canales oficiales de comunicación">
          <P>
            10.1 Toda comunicación relacionada con envíos, seguimiento de
            pedidos, reclamaciones o cualquier gestión asociada al servicio de
            entrega deberá realizarse exclusivamente a través de los canales
            oficiales de Confecciones Liss, disponibles en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
          </P>
          <P>
            10.2 Cualquier gestión, acuerdo o reclamación realizada fuera de los
            canales oficiales será considerada inválida e inoponible al Taller.
            Confecciones Liss no asume responsabilidad por comunicaciones
            gestionadas a través de canales no oficiales, personas no
            autorizadas o plataformas no verificadas.
          </P>
          <InfoBox type="blue" title="Contacto Oficial del Taller:">
            <strong>Encargado de Comunicaciones:</strong> Carlos José Molina
            Villacorta
            <br />
            <strong>Directorio Oficial de Contacto:</strong>{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </InfoBox>
        </Section>
        <Hr />

        <Section n={11} title="Modificaciones a la política">
          <P>
            11.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en
            https://www.confeccionesliss.com/legal. La versión vigente al
            momento de la solicitud de cada envío será la aplicable.
          </P>
          <P>
            11.2 La solicitud de un servicio de envío con posterioridad a la
            publicación de cualquier modificación implica la aceptación
            automática de la versión actualizada de la Política.
          </P>
        </Section>

        <LegalFootnote>
          Esta política general de envíos está vigente desde su publicación y
          refleja las prácticas logísticas implementadas por Confecciones Liss.
          Última actualización: Junio 2026.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
