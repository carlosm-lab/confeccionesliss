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
  title: "Política General de Promociones y Descuentos",
  description:
    "Política de promociones de Confecciones Liss: descuentos por reseña en Google Maps, ofertas de temporada, programa de referidos y sus reglas aplicables.",
  keywords:
    "promociones uniformes, descuentos scrubs, programa referidos, descuento reseña, ofertas temporada, Confecciones Liss El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/promociones` },
  openGraph: {
    title: "Política General de Promociones y Descuentos | Confecciones Liss",
    description:
      "Política de promociones de Confecciones Liss: descuentos por reseña en Google Maps, ofertas de temporada, programa de referidos y sus reglas aplicables.",
    url: `${siteConfig.url}/legal/promociones`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política General de Promociones y Descuentos | Confecciones Liss",
    description:
      "Política de promociones de Confecciones Liss: descuentos por reseña en Google Maps, ofertas de temporada, programa de referidos y sus reglas aplicables.",
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

export default function PoliticaPromocionesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/promociones`;
  const PAGE_TITLE = "Política General de Promociones y Descuentos";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política General de Promociones y Descuentos | Confecciones Liss",
          description:
            "Política de promociones de Confecciones Liss: descuentos por reseña en Google Maps, ofertas de temporada, programa de referidos y sus reglas aplicables.",
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
        title="Política General de Promociones y Descuentos"
        category="Términos y condiciones aplicables a descuentos, promociones de temporada y sorteos organizados por el Taller."
        date="24 Jun, 2026"
        readingTime={16}
      >
        <P>
          La presente Política General de Promociones y Descuentos (en adelante
          &quot;la Política&quot;) regula de manera integral y vinculante las
          condiciones bajo las cuales Confecciones Liss (en adelante &quot;el
          Taller&quot;) establece, aplica, modifica y extingue cualquier tipo de
          promoción, descuento, beneficio o ventaja comercial ofrecida a sus
          clientes (en adelante &quot;el Cliente&quot;). La participación en
          cualquier promoción, la solicitud de un descuento o el aprovechamiento
          de cualquier beneficio comercial ofrecido por el Taller implica el
          conocimiento pleno y la aceptación incondicional de todos los términos
          aquí establecidos, así como de las demás políticas del Taller con las
          que la presente guarda coherencia y complementariedad. El
          desconocimiento de esta Política no exime al Cliente de su
          cumplimiento ni le otorga derechos adicionales a los expresamente
          reconocidos en este documento.
        </P>
        <Hr />

        <Section n={1} title="Principio general sobre promociones y descuentos">
          <P>
            1.1 Todas las promociones, descuentos y beneficios comerciales
            ofrecidos por Confecciones Liss son otorgados a entera y exclusiva
            discreción del Taller. Ninguna promoción, descuento o beneficio
            constituye un derecho adquirido, permanente ni exigible por parte
            del Cliente, salvo que se encuentre expresamente vigente y publicado
            en los canales oficiales del Taller al momento en que el Cliente
            realice su pedido.
          </P>
          <P>
            1.2 El Taller se reserva el derecho irrestricto de crear, modificar,
            suspender, cancelar o extinguir cualquier promoción o descuento en
            cualquier momento y sin previo aviso, sin que ello genere obligación
            de compensación, indemnización ni responsabilidad alguna frente al
            Cliente.
          </P>
          <P>
            1.3 Las promociones y descuentos no son acumulables entre sí, salvo
            que el Taller lo indique expresamente por escrito en la publicación
            oficial de la promoción correspondiente. En caso de conflicto entre
            dos o más promociones aplicables a un mismo pedido, el Taller
            determinará unilateralmente cuál aplica, sin obligación de aplicar
            la más beneficiosa para el Cliente.
          </P>
          <P>
            1.4 Ninguna promoción pasada, vencida o no vigente al momento del
            pedido podrá ser invocada por el Cliente como derecho a descuento,
            compensación o tratamiento preferencial. Las promociones aplican
            exclusivamente dentro del período de vigencia establecido por el
            Taller.
          </P>
          <P>
            1.5 El Taller no está obligado a ofrecer a un Cliente las mismas
            condiciones promocionales ofrecidas a otro Cliente en el pasado o en
            el presente. Las condiciones de cada promoción aplican de forma
            individual y no constituyen precedente para pedidos futuros.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Promociones y descuentos por pedidos de grupo">
          <P>
            2.1 El Taller podrá ofrecer, a su entera discreción, condiciones
            especiales de precio para pedidos de grupo, entendiendo como tales
            aquellos que superen la cantidad mínima establecida en la Política
            de Cotizaciones, disponible en:{" "}
            <Link
              href="/legal/cotizaciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/cotizaciones
            </Link>
          </P>
          <P>
            2.2 Las condiciones específicas de precio, descuento o beneficio
            aplicables a pedidos de grupo serán determinadas por el Taller de
            forma individual para cada pedido, considerando factores como
            volumen, tipo de prenda, materiales requeridos, complejidad del
            diseño y período de entrega solicitado. Dichas condiciones serán
            comunicadas al Cliente mediante cotización formal emitida conforme a
            la Política de Cotizaciones del Taller.
          </P>
          <P>
            2.3 Los descuentos por pedidos de grupo no son exigibles por el
            Cliente como un derecho automático derivado del volumen del pedido.
            Su aplicación queda sujeta a la evaluación y aprobación expresa del
            Taller en cada caso particular.
          </P>
          <P>
            2.4 El incumplimiento por parte del Cliente de la cantidad acordada
            para acceder al descuento de grupo —ya sea por reducción del pedido,
            cancelaciones parciales o cualquier otra causa— resultará en la
            pérdida automática del descuento concedido, y el pedido será
            recalculado a los precios individuales vigentes sin derecho a
            reclamo por parte del Cliente.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Promociones de temporada">
          <P>
            3.1 El Taller podrá establecer, a su entera discreción, promociones
            de temporada asociadas a períodos específicos del año, incluyendo
            sin limitarse a: inicio de ciclo universitario, períodos de nuevo
            ingreso, temporadas festivas, aniversarios del Taller u otras fechas
            que el Taller considere pertinentes.
          </P>
          <P>
            3.2 Las promociones de temporada serán publicadas en los canales
            oficiales del Taller con las condiciones, requisitos y período de
            vigencia específicos para cada promoción. Su aplicación queda
            supeditada al cumplimiento de todos los requisitos establecidos en
            la publicación correspondiente.
          </P>
          <P>
            3.3 Las promociones de temporada tienen carácter temporal y
            limitado. Una vez vencido el período de vigencia establecido, la
            promoción queda extinguida de pleno derecho, sin posibilidad de
            extensión ni aplicación retroactiva, independientemente de que el
            Cliente haya iniciado o no un pedido durante dicho período.
          </P>
          <P>
            3.4 El Taller no garantiza la periodicidad, recurrencia ni
            repetición de promociones de temporada. La existencia de una
            promoción en un período determinado no crea expectativa ni derecho a
            que dicha promoción se repita en períodos futuros.
          </P>
          <P>
            3.5 Los pedidos realizados antes del inicio o después del
            vencimiento de una promoción de temporada no serán elegibles para
            los beneficios de dicha promoción, sin excepción.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Descuento por reseña en Google Maps">
          <P>
            4.1 El Taller ofrece un descuento de un dólar exacto (USD $1.00)
            sobre el precio total del pedido a aquellos clientes que, de forma
            voluntaria y genuina, publiquen una reseña o comentario en el perfil
            oficial de Confecciones Liss en Google Maps (Google Business
            Profile), verificable públicamente en dicha plataforma.
          </P>
          <P>4.2 Para acceder a este descuento, el Cliente deberá:</P>
          <Ul
            items={[
              "a) Publicar la reseña o comentario en el perfil oficial de Google Maps de Confecciones Liss antes del momento de pago del pedido o anticipo.",
              "b) Mostrar al personal del Taller evidencia visible de la reseña publicada, incluyendo el nombre del perfil con que fue publicada.",
              "c) Que la reseña o comentario sea verificable públicamente en la plataforma al momento de la presentación.",
            ]}
          />
          <P>
            4.3 El descuento por reseña aplica en los siguientes términos y
            condiciones:
          </P>
          <Ul
            items={[
              "a) Es válido una única vez por Cliente, independientemente del número de reseñas que este publique.",
              "b) No es acumulable con ningún otro descuento o promoción vigente, salvo indicación expresa del Taller.",
              "c) Aplica exclusivamente sobre el precio base del pedido y no sobre costos adicionales de personalización, materiales especiales, envío u otros cargos complementarios.",
              "d) No genera derecho a reembolso en efectivo de la diferencia si el saldo del pedido es inferior a un dólar.",
            ]}
          />
          <P>
            4.4 El Taller se reserva el derecho de negar este descuento en caso
            de detectar que la reseña fue publicada con el único propósito de
            obtener el beneficio sin reflejar una experiencia real con el
            Taller, o en caso de que la reseña sea eliminada o modificada con
            posterioridad a la aplicación del descuento. En tal supuesto, el
            monto del descuento aplicado podrá ser cobrado al Cliente como
            ajuste en el saldo del pedido.
          </P>
          <P>
            4.5 El Taller no solicita, condiciona ni exige el contenido,
            calificación ni tono de la reseña. El descuento se otorga por el
            acto de publicar la reseña, independientemente de su contenido, en
            reconocimiento a la participación del Cliente en la construcción de
            la reputación en línea del Taller.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Promociones por vencimiento de plazo de retiro">
          <P>
            5.1 Conforme a lo establecido en la Política de Confección del
            Taller, disponible en:{" "}
            <Link
              href="/legal/confeccion"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/confeccion
            </Link>
            , el Cliente dispone de un plazo máximo de treinta (30) días
            calendario para retirar su pedido una vez que el Taller haya
            comunicado que este se encuentra listo. Transcurrido dicho plazo sin
            que el Cliente se haya presentado a retirar la prenda y cancelar el
            saldo pendiente, la prenda será considerada abandonada y el Taller
            procederá conforme a lo establecido en el presente artículo.
          </P>
          <P>
            5.2 Las prendas no reclamadas dentro del plazo establecido serán
            puestas a la venta de forma inmediata, sin previo aviso ni
            notificación adicional al Cliente, bajo una promoción de
            recuperación de inversión calculada de la siguiente forma:
          </P>
          <InfoBox type="blue" title="Cálculo de precio promocional de saldo:">
            <span
              style={{
                display: "block",
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.9rem",
                lineHeight: "1.4",
              }}
            >
              Precio promocional = Precio total del pedido − Anticipo pagado por
              el Cliente original.
            </span>
          </InfoBox>
          <P>
            A modo ilustrativo: si el valor total de la prenda es de treinta y
            cinco dólares (USD $35.00) y el Cliente original pagó un anticipo de
            veinticinco dólares (USD $25.00), la prenda será ofertada al público
            a un precio de diez dólares (USD $10.00), con el fin de recuperar el
            costo de materiales y mano de obra no cubierto por el anticipo
            recibido.
          </P>
          <P>
            5.3 La publicación de la prenda en promoción por vencimiento de
            plazo se realizará a través de los canales oficiales del Taller y
            estará disponible para cualquier cliente interesado en adquirirla de
            forma inmediata, sin distinción ni prioridad a favor del Cliente
            original.
          </P>
          <P>
            5.4 El Cliente original podrá adquirir su prenda bajo el precio
            promocional vigente, en igualdad de condiciones con cualquier otro
            comprador. Sin embargo, el Taller no garantiza la disponibilidad de
            la prenda para el Cliente original, dado que esta podrá ser
            adquirida por un tercero en cualquier momento desde su publicación.
          </P>
          <P>
            5.5 El anticipo pagado por el Cliente original cuya prenda sea
            puesta en promoción por vencimiento del plazo de retiro no será
            reembolsado bajo ninguna circunstancia. El Taller retiene dicho
            monto como compensación por los costos de producción, materiales,
            mano de obra, almacenamiento y gestión administrativa incurridos,
            conforme a lo establecido en la Política de Devoluciones del Taller,
            disponible en:{" "}
            <Link
              href="/legal/devoluciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/devoluciones
            </Link>
          </P>
          <P>
            5.6 El Cliente reconoce y acepta de forma expresa que la
            notificación de disponibilidad del pedido constituye el inicio del
            cómputo del plazo de retiro, independientemente del medio por el
            cual dicha notificación haya sido enviada —mensaje de texto,
            WhatsApp, llamada telefónica, correo electrónico u otro medio a
            través de los canales oficiales del Taller— y con independencia de
            que el Cliente haya leído, visto o acusado recibo de dicha
            notificación.
          </P>
          <P>
            5.7 El Taller no está obligado a realizar intentos adicionales de
            notificación más allá de la comunicación inicial de disponibilidad
            del pedido. La responsabilidad de mantenerse informado sobre el
            estado del pedido recae exclusivamente en el Cliente, quien deberá
            consultar activamente el estado de su pedido a través de los canales
            oficiales del Taller.
          </P>
          <P>
            5.8 El Cliente no podrá invocar falta de notificación, problemas de
            conectividad, cambio de número telefónico, cambio de correo
            electrónico ni ninguna otra circunstancia personal como
            justificación para exigir la devolución de su anticipo o la reserva
            de la prenda fuera del plazo establecido.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Programa de referidos">
          <P>
            6.1 Confecciones Liss cuenta con un programa de fidelización
            mediante referidos, a través del cual los clientes pueden acceder a
            beneficios por recomendar los servicios del Taller a nuevos
            clientes. Las reglas, condiciones, beneficios, restricciones y
            vigencia de dicho programa se encuentran detallados en:{" "}
            <Link
              href="/legal/referidos"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/referidos
            </Link>
          </P>
          <P>
            6.2 La participación en el programa de referidos implica la
            aceptación íntegra de las condiciones publicadas en el enlace
            indicado, las cuales forman parte integral del marco normativo
            comercial de Confecciones Liss.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Limitaciones generales aplicables a todas las promociones"
        >
          <P>
            7.1 Ninguna promoción otorgada por el Taller implica, bajo ninguna
            circunstancia, el derecho del Cliente a recibir reembolso en
            efectivo, devolución de anticipos, créditos canjeables en efectivo
            ni ningún beneficio distinto al expresamente indicado en las
            condiciones de la promoción correspondiente.
          </P>
          <P>
            7.2 Las promociones no modifican ni suspenden la aplicación de la
            Política de Devoluciones del Taller. El beneficio de una promoción
            se limita exclusivamente al descuento o beneficio específico
            otorgado, sin alterar las demás condiciones comerciales y normativas
            vigentes.
          </P>
          <P>
            7.3 El Taller no está obligado a extender, replicar ni compensar
            ninguna promoción a clientes que no hayan cumplido los requisitos
            específicos de la misma dentro de su período de vigencia, con
            independencia de las razones que el Cliente invoque para justificar
            dicho incumplimiento.
          </P>
          <P>
            7.4 Cualquier intento de fraude, manipulación o aprovechamiento
            indebido de una promoción faculta al Taller a anular el beneficio
            concedido, rechazar el pedido en curso y excluir al Cliente de
            futuras promociones, sin obligación de notificación previa ni
            derecho a reclamo por parte del Cliente.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Exención de responsabilidad del taller">
          <P>
            8.1 Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de:
          </P>
          <Ul
            items={[
              "a) La modificación, suspensión o cancelación de cualquier promoción antes o durante su período de vigencia.",
              "b) La no aplicación de una promoción vencida o no vigente al momento del pedido.",
              "c) El aprovechamiento de una promoción por parte de un tercero antes de que el Cliente original pudiera hacerlo, incluyendo el caso de prendas en promoción por vencimiento de plazo de retiro.",
              "d) La pérdida del anticipo derivada del no retiro oportuno del pedido.",
              "e) Cualquier expectativa del Cliente sobre la continuidad, recurrencia o extensión de una promoción determinada.",
              "f) Diferencias de precio entre lo pagado por el Cliente y el precio promocional publicado con posterioridad a la confirmación del pedido.",
            ]}
          />
          <P>
            8.2 El Taller no otorga ajustes retroactivos de precio por
            promociones publicadas con posterioridad a la confirmación y pago de
            un pedido. El precio vigente al momento de la confirmación del
            pedido es el que aplica de forma definitiva e irrevocable.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Canales oficiales de comunicación">
          <P>
            9.1 Toda información sobre promociones vigentes, consultas sobre
            elegibilidad o reclamaciones relacionadas deberá gestionarse
            exclusivamente a través de los canales oficiales de Confecciones
            Liss, disponibles en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
          </P>
          <P>
            9.2 El Taller no reconocerá promociones comunicadas a través de
            canales no oficiales, personas no autorizadas ni plataformas no
            verificadas. Cualquier oferta o descuento recibido fuera de los
            canales oficiales es inválido e inoponible al Taller.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Modificaciones a la política">
          <P>
            10.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
            . La versión vigente al momento de cada transacción será la
            aplicable.
          </P>
          <P>
            10.2 La participación en cualquier promoción o la realización de
            cualquier pedido con posterioridad a la publicación de una
            modificación implica la aceptación automática de la versión
            actualizada de la Política.
          </P>
        </Section>

        <LegalFootnote>
          Contacto Oficial del Taller:
          <br />
          <strong>Encargado de Comunicaciones:</strong> Carlos José Molina
          Villacorta
          <br />
          <strong>Directorio Oficial de Contacto:</strong>{" "}
          <Link href="/links" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/links
          </Link>
          <br />
          <br />
          Política de Confección:{" "}
          <Link
            href="/legal/confeccion"
            className="text-blue-600 hover:underline"
          >
            /legal/confeccion
          </Link>{" "}
          · Política de Devoluciones:{" "}
          <Link
            href="/legal/devoluciones"
            className="text-blue-600 hover:underline"
          >
            /legal/devoluciones
          </Link>{" "}
          · Política de Cotizaciones:{" "}
          <Link
            href="/legal/cotizaciones"
            className="text-blue-600 hover:underline"
          >
            /legal/cotizaciones
          </Link>{" "}
          · Programa de Referidos:{" "}
          <Link
            href="/legal/referidos"
            className="text-blue-600 hover:underline"
          >
            /legal/referidos
          </Link>
          <br />
          <br />
          Esta política de promociones y descuentos está vigente desde su
          publicación y refleja las prácticas comerciales oficiales de
          Confecciones Liss. Última actualización: Junio 2026.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
