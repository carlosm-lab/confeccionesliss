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
  title: "Política del Programa de Referidos Oficiales",
  description:
    "Programa de referidos de Confecciones Liss: acumula descuentos recomendando clientes, condiciones de validez, vigencia de saldo y reglas del programa.",
  keywords:
    "programa referidos, descuento por referir, saldo referidos, Confecciones Liss, referidos uniformes El Salvador, recompensas clientes",
  alternates: { canonical: `${siteConfig.url}/legal/referidos` },
  openGraph: {
    title: "Política del Programa de Referidos Oficiales | Confecciones Liss",
    description:
      "Programa de referidos de Confecciones Liss: acumula descuentos recomendando clientes, condiciones de validez, vigencia de saldo y reglas del programa.",
    url: `${siteConfig.url}/legal/referidos`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política del Programa de Referidos Oficiales | Confecciones Liss",
    description:
      "Programa de referidos de Confecciones Liss: acumula descuentos recomendando clientes, condiciones de validez, vigencia de saldo y reglas del programa.",
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

export default function ProgramaReferidosPage() {
  const PAGE_URL = `${siteConfig.url}/legal/referidos`;
  const PAGE_TITLE = "Programa de Referidos";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Programa de Referidos — Políticas Oficiales | Confecciones Liss",
          description:
            "Programa de referidos de Confecciones Liss: acumula descuentos recomendando clientes, condiciones de validez, vigencia de saldo y reglas del programa.",
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
        title="Programa de Referidos — Políticas Oficiales y Condiciones de Participación"
        category="Condiciones, beneficios, validez de saldos y reglas de participación del programa de referidos oficiales."
        date="24 Jun, 2026"
        readingTime={18}
      >
        <P>
          El presente documento regula de manera integral y vinculante las
          condiciones de participación en el Programa de Referidos de
          Confecciones Liss (en adelante &quot;el Programa&quot;), operado por
          Confecciones Liss (en adelante &quot;el Taller&quot;), con domicilio
          en Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur, Casa #402,
          San Miguel, El Salvador. Cualquier persona natural que participe en el
          Programa, ya sea en calidad de referidor o referido (en adelante
          &quot;el Participante&quot;), declara haber leído, comprendido y
          aceptado de forma libre, voluntaria e informada la totalidad de los
          términos aquí establecidos. El desconocimiento de estas políticas no
          exime al Participante de su cumplimiento ni le otorga derechos
          adicionales a los expresamente reconocidos en este documento.
        </P>
        <Hr />

        <Section n={1} title="Descripción del programa">
          <P>
            1.1 El Programa de Referidos de Confecciones Liss es un mecanismo de
            fidelización comercial mediante el cual el Taller otorga al cliente
            referidor un descuento de un dólar exacto (USD $1.00) por cada
            persona que este refiera y que efectúe una compra válida conforme a
            las condiciones establecidas en la presente Política.
          </P>
          <P>
            1.2 El descuento acumulado es aplicable exclusivamente sobre el
            precio del artículo o servicio que el referidor adquiera en el
            Taller, y no sobre ningún otro concepto, cargo, servicio adicional
            ni costo complementario.
          </P>
          <P>
            1.3 El código de identificación personal de cada referidor dentro
            del Programa es su número de Documento Único de Identidad (DUI). El
            Participante acepta expresamente que el uso de su DUI como código de
            referido constituye su identificación oficial dentro del Programa y
            que es responsable exclusivo de su correcto uso y custodia.
          </P>
          <P>
            1.4 La participación en el Programa implica la aceptación plena e
            incondicional de la totalidad de las condiciones aquí establecidas,
            así como de las demás políticas comerciales del Taller, disponibles
            en:{" "}
            <Link
              href="/legal"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal
            </Link>
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Condiciones para que una referencia sea válida">
          <P>
            2.1 Para que una referencia sea acreditada como válida y genere el
            descuento correspondiente al referidor, deberán cumplirse
            simultáneamente todas las siguientes condiciones:
          </P>
          <Ul
            items={[
              "a) El referido debe ser una persona natural distinta al referidor, con identidad verificable y no registrada previamente en el Programa bajo ningún código de referido.",
              "b) El referido debe efectuar una compra real, completa y pagada en el Taller, que no sea posteriormente cancelada, revertida ni declarada inválida por el Taller.",
              "c) El referido debe indicar de forma expresa, al momento de su primera compra, el número de DUI del referidor que lo recomendó. No se acreditarán referencias reportadas con posterioridad a la compra del referido.",
              "d) El artículo o servicio adquirido por el referido debe tener un precio de venta igual o superior al precio del artículo que el referidor adquirió originalmente en el Taller. Las compras de artículos o servicios de valor inferior al del referidor no generarán acreditación de descuento.",
            ]}
          />
          <InfoBox type="blue" title="Ejemplo ilustrativo:">
            <span>
              Si el referidor adquirió su prenda a un precio de treinta y cinco
              dólares (USD $35.00), sus referidos deberán adquirir artículos o
              servicios con un valor igual o superior a treinta y cinco dólares
              (USD $35.00) para que la referencia sea acreditada. Compras de
              referidos por valores inferiores quedan excluidas de toda
              acreditación, sin excepción.
            </span>
          </InfoBox>
          <P>
            2.2 El Taller se reserva el derecho exclusivo e inapelable de
            determinar si una referencia cumple con todas las condiciones
            establecidas en el numeral anterior. En caso de duda o controversia
            sobre la validez de una referencia, la decisión del Taller es final,
            definitiva e inapelable, sin que el Participante pueda exigir
            revisión, reconsideración ni compensación alguna.
          </P>
          <P>
            2.3 El Taller no está obligado a acreditar retroactivamente
            referencias que, al momento de la compra del referido, no hayan sido
            reportadas conforme al procedimiento establecido. La responsabilidad
            de reportar oportunamente cada referencia recae exclusiva e
            integralmente en el referidor.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Acumulación del beneficio y su vigencia">
          <P>
            3.1 El saldo de descuento acumulado por el referidor es ilimitado en
            cuanto a la cantidad de referidos que puede incorporar al Programa.
            No existe tope máximo en el número de personas que un referidor
            puede referir.
          </P>
          <P>
            3.2 A título ilustrativo y no limitativo: un cliente que logre
            referir a treinta y cinco (35) o más compradores válidos podrá
            acumular un saldo de descuento suficiente para obtener una prenda o
            servicio de manera completamente gratuita, sujeto al cumplimiento de
            todas las condiciones establecidas en la presente Política.
          </P>
          <P>
            3.3 El saldo de descuento se acumula a partir de la fecha en que se
            acredita la primera referencia válida. El Participante dispone de un
            plazo máximo de doce (12) meses calendario, contados desde la fecha
            de acreditación de la primera referencia, para hacer uso de la
            totalidad o parte del saldo acumulado.
          </P>
          <P>
            3.4 Transcurrido el plazo de doce (12) meses indicado en el numeral
            anterior sin que el Participante haya hecho uso de su saldo
            acumulado, dicho saldo expirará automáticamente y de pleno derecho,
            sin notificación previa, sin posibilidad de recuperación ni derecho
            a compensación alguna.
          </P>
          <P>
            3.5 Es responsabilidad exclusiva e indelegable del Participante
            llevar el control del saldo acumulado y gestionar oportunamente su
            uso dentro del plazo de vigencia establecido. El Taller no está
            obligado a emitir recordatorios, notificaciones de vencimiento ni
            alertas de saldo a los Participantes.
          </P>
          <P>
            3.6 La expiración del saldo por vencimiento del plazo no genera
            derecho a reembolso, compensación, extensión del plazo ni ningún
            otro beneficio alternativo a favor del Participante.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Naturaleza e intransferibilidad del beneficio">
          <P>
            4.1 El beneficio acumulado dentro del Programa es estrictamente
            personal e intransferible. No podrá cederse, transferirse,
            delegarse, endosarse, heredarse ni compartirse con ninguna otra
            persona bajo ningún concepto, modalidad ni circunstancia.
          </P>
          <P>
            4.2 El descuento acumulado únicamente podrá ser utilizado por el
            titular original del DUI registrado como código de referido,
            debidamente identificado al momento del canje. El Taller podrá
            requerir la presentación del DUI físico del titular para autorizar
            el uso del beneficio.
          </P>
          <P>
            4.3 El beneficio acumulado únicamente podrá canjearse como descuento
            directo sobre el precio de compra de un artículo o servicio en el
            Taller. Bajo ninguna circunstancia podrá convertirse en efectivo,
            transferencia bancaria, crédito monetario, nota de crédito, vale,
            bono, regalo ni ningún otro tipo de compensación monetaria o en
            especie.
          </P>
          <P>
            4.4 El intento de transferencia, cesión o uso del beneficio por
            persona distinta al titular registrado faculta al Taller para
            cancelar de forma inmediata e irrevocable la totalidad del saldo
            acumulado, sin obligación de notificación previa ni derecho a
            compensación alguna por parte del Participante afectado.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Participación universal y efecto en cadena">
          <P>
            5.1 Toda persona que realice una compra válida en el Taller adquiere
            automáticamente el derecho de participar como referidor dentro del
            Programa, sin necesidad de inscripción previa ni trámite adicional,
            bastando con que indique su número de DUI como código de referido en
            sus futuras recomendaciones.
          </P>
          <P>
            5.2 Los referidos que realicen su primera compra válida en el Taller
            podrán, a su vez, participar como referidores y generar su propio
            saldo de descuentos al incorporar nuevos compradores al Programa. No
            existe restricción de nivel ni profundidad dentro de la cadena de
            referidos.
          </P>
          <P>
            5.3 Cada Participante opera de forma independiente dentro del
            Programa. El saldo de descuento de un Participante no se ve afectado
            por las acciones, omisiones ni incumplimientos de otros
            Participantes en la cadena.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Revocación por uso fraudulento o malicioso">
          <P>
            6.1 El Taller se reserva el derecho absoluto de revocar, total o
            parcialmente, el beneficio acumulado por cualquier Participante en
            cualquier momento, si detecta o sospecha razonablemente la
            existencia de uso fraudulento, malicioso, abusivo o contrario al
            espíritu comercial del Programa.
          </P>
          <P>
            6.2 Se consideran, sin limitación, conductas constitutivas de uso
            fraudulento o malicioso las siguientes:
          </P>
          <Ul
            items={[
              "a) Compras ficticias o simuladas realizadas con el único propósito de generar crédito de referido sin una transacción comercial real.",
              "b) Uso de identidades falsas, documentos de identidad ajenos o datos de terceros sin su consentimiento.",
              "c) Manipulación, alteración o falsificación del sistema de seguimiento de referidos del Taller.",
              "d) Colusión entre dos o más personas para generar créditos de referido sin transacciones reales o mediante transacciones circulares.",
              "e) Registro de un mismo individuo como referido de múltiples referidores en la misma o distintas compras.",
              "f) Cualquier otra conducta que el Taller, a su exclusivo criterio, considere contraria a la finalidad y espíritu del Programa.",
            ]}
          />
          <P>
            6.3 La revocación del beneficio podrá realizarse de forma
            retroactiva sobre la totalidad del saldo acumulado desde el inicio
            de la participación del Participante, sin derecho a compensación,
            reembolso ni reclamación alguna por parte de este.
          </P>
          <P>
            6.4 El Taller no está obligado a comunicar al Participante las
            razones específicas de la revocación ni a someter su decisión a
            proceso de revisión, apelación ni controversia de ningún tipo. La
            decisión del Taller es final e inapelable.
          </P>
          <P>
            6.5 El Participante cuyo beneficio sea revocado por uso fraudulento
            podrá ser excluido de forma permanente del Programa, sin posibilidad
            de reingreso ni de participación futura bajo ninguna modalidad.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="No combinabilidad con otras promociones">
          <P>
            7.1 El beneficio acumulado dentro del Programa de Referidos no es
            combinable con ningún otro descuento, promoción, oferta especial ni
            beneficio vigente en el Taller, salvo que el Taller lo autorice de
            forma expresa y por escrito en casos particulares.
          </P>
          <P>
            7.2 En caso de que el Participante sea elegible para más de un
            beneficio o descuento en el mismo pedido, el Taller determinará
            unilateralmente cuál aplica, sin obligación de aplicar el más
            beneficioso para el Participante ni de combinar ambos beneficios.
          </P>
          <P>
            7.3 Para consultar las demás promociones y descuentos vigentes del
            Taller, el Participante deberá dirigirse a:{" "}
            <Link
              href="/legal/promociones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/promociones
            </Link>
          </P>
        </Section>
        <Hr />

        <Section
          n={8}
          title="Modificación, suspensión o cancelación del programa"
        >
          <P>
            8.1 El Taller se reserva el derecho de modificar, suspender
            temporalmente o cancelar de forma definitiva el Programa en
            cualquier momento, notificando a los Participantes activos con al
            menos diez (10) días calendario de anticipación a través de los
            canales oficiales del Taller, disponibles en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
          </P>
          <P>
            8.2 En caso de cancelación definitiva del Programa, los saldos
            acumulados vigentes al momento de la notificación serán respetados
            durante el período de diez (10) días establecido en el numeral
            anterior. Transcurrido dicho período, los saldos no utilizados
            expirarán sin derecho a compensación, reembolso ni reconocimiento
            alternativo.
          </P>
          <P>
            8.3 Las modificaciones a las condiciones del Programa, incluyendo
            cambios en el valor del descuento por referido, requisitos de
            validación, plazo de vigencia del saldo u otras condiciones,
            aplicarán a las referencias acreditadas con posterioridad a la fecha
            de entrada en vigor de la modificación. Los saldos acumulados con
            anterioridad a dicha fecha se regirán por las condiciones vigentes
            al momento de su acreditación, salvo que el Taller indique
            expresamente lo contrario.
          </P>
          <P>
            8.4 La continuación de la participación en el Programa con
            posterioridad a la publicación de cualquier modificación implica la
            aceptación automática de las nuevas condiciones por parte del
            Participante.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Exención de responsabilidad del taller">
          <P>
            9.1 Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de los siguientes supuestos, sin que esta
            lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) Pérdida o expiración del saldo acumulado por falta de uso oportuno dentro del plazo de vigencia.",
              "b) Referencias no acreditadas por incumplimiento de cualquiera de las condiciones establecidas en el Artículo 2.",
              "c) Cancelación del Programa con el preaviso establecido.",
              "d) Revocación del beneficio por uso fraudulento o malicioso.",
              "e) Imposibilidad de canje del beneficio por falta de identificación del titular al momento del uso.",
              "f) Diferencias entre el saldo que el Participante cree haber acumulado y el saldo registrado por el Taller, en caso de discrepancia.",
              "g) Pérdida, robo o uso no autorizado del código de referido (DUI) del Participante por parte de terceros.",
              "h) Cualquier daño directo o indirecto derivado de la participación o no participación en el Programa.",
            ]}
          />
          <P>
            9.2 En caso de discrepancia entre el saldo que el Participante
            reporta haber acumulado y el saldo registrado internamente por el
            Taller, prevalecerá el registro del Taller de forma inapelable. El
            Participante no podrá invocar capturas de pantalla, comunicaciones
            informales ni testimonios de terceros como prueba de saldo diferente
            al registrado oficialmente.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Protección de datos personales">
          <P>
            10.1 Al proporcionar su número de DUI como código de referido, el
            Participante autoriza de forma expresa al Taller a registrar,
            almacenar y utilizar dicho dato con el único fin de gestionar su
            participación en el Programa. El Taller no compartirá dicha
            información con terceros ajenos a la operación interna del Programa,
            salvo requerimiento de autoridad competente.
          </P>
          <P>
            10.2 El Participante garantiza que el DUI proporcionado es el suyo
            propio y que está autorizado para utilizarlo. El uso de DUI ajeno es
            responsabilidad exclusiva de quien lo utilice, quedando el Taller
            eximido de toda responsabilidad al respecto.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Canales oficiales de comunicación">
          <P>
            11.1 Toda consulta, reporte de referido, solicitud de canje o
            reclamación relacionada con el Programa deberá gestionarse
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
            11.2 El Taller no reconocerá gestiones realizadas fuera de los
            canales oficiales. Cualquier acuerdo, promesa o confirmación de
            saldo comunicada a través de canales no oficiales, personas no
            autorizadas o plataformas no verificadas es inválida e inoponible al
            Taller.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Otras políticas aplicables">
          <P>
            12.1 El Programa de Referidos se aplica de forma complementaria con
            las demás políticas comerciales del Taller. El Participante deberá
            conocerlas en su totalidad:
          </P>
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            •{" "}
            <Link
              href="/legal/confeccion"
              className="font-semibold text-blue-600 hover:underline"
            >
              Política de Confección
            </Link>
            <br />•{" "}
            <Link
              href="/legal/devoluciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              Política de Devoluciones
            </Link>
            <br />•{" "}
            <Link
              href="/legal/envios"
              className="font-semibold text-blue-600 hover:underline"
            >
              Política de Envíos
            </Link>
            <br />•{" "}
            <Link
              href="/legal/cotizaciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              Política de Cotizaciones
            </Link>
            <br />•{" "}
            <Link
              href="/legal/promociones"
              className="font-semibold text-blue-600 hover:underline"
            >
              Política de Promociones
            </Link>
            <br />•{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              Directorio de Canales Oficiales
            </Link>
          </div>
        </Section>
        <Hr />

        <Section n={13} title="Modificaciones a la política">
          <P>
            13.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento,
            publicando la versión actualizada en{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
            . La versión vigente al momento de cada referencia acreditada será
            la aplicable a dicha referencia.
          </P>
          <P>
            13.2 La continuación de la participación en el Programa con
            posterioridad a la publicación de cualquier modificación implica la
            aceptación automática de la versión actualizada de la Política.
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
          Política de Devoluciones:{" "}
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
          </Link>
          <br />
          <br />
          Este programa de referidos está vigente desde su publicación y refleja
          las prácticas comerciales oficiales de Confecciones Liss. Última
          actualización: Junio 2026.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
