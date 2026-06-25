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
  title: "Política de Pedidos en Grupo y Mayoreo | Confecciones Liss",
  description:
    "Condiciones completas de pedidos grupales y al mayoreo de Confecciones Liss: volúmenes mínimos, anticipos (Modalidad A/B), retención y abandono de prendas, responsabilidad del representante y jurisdicción.",
  keywords:
    "pedidos mayoreo, uniformes grupales, colectivos estudiantes, anticipo uniformes, política mayoreo, pedidos en grupo, Confecciones Liss, uniformes El Salvador",
  alternates: {
    canonical: `${siteConfig.url}/legal/mayoreo`,
  },
  openGraph: {
    title: "Política de Pedidos en Grupo y Mayoreo | Confecciones Liss",
    description:
      "Condiciones completas de pedidos grupales y al mayoreo de Confecciones Liss: volúmenes mínimos, anticipos (Modalidad A/B), retención y abandono de prendas, responsabilidad del representante y jurisdicción.",
    url: `${siteConfig.url}/legal/mayoreo`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Pedidos en Grupo y Mayoreo | Confecciones Liss",
    description:
      "Condiciones completas de pedidos grupales y al mayoreo de Confecciones Liss: volúmenes mínimos, anticipos (Modalidad A/B), retención y abandono de prendas, responsabilidad del representante y jurisdicción.",
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

export default function MayoreoPage() {
  const PAGE_URL = `${siteConfig.url}/legal/mayoreo`;
  const PAGE_TITLE = "Política de Pedidos en Grupo y Mayoreo";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Pedidos en Grupo y Mayoreo | Confecciones Liss",
          description:
            "Condiciones completas de pedidos grupales y al mayoreo de Confecciones Liss: volúmenes mínimos, anticipos (Modalidad A/B), retención y abandono de prendas, responsabilidad del representante y jurisdicción.",
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
        title="Política de Pedidos en Grupo y Mayoreo"
        category="Regulación integral de compras corporativas, colectivos de estudiantes y pedidos a gran escala fabricados por Confecciones Liss. Vigente desde su publicación — Junio 2026."
        date="25 Jun, 2026"
        readingTime={14}
      >
        {/* ── Preámbulo ────────────────────────────────────────────────────── */}
        <Section n={0} title="">
          <P>
            La presente Política de Pedidos en Grupo y Mayoreo (en adelante
            &quot;la Política&quot;) regula de manera integral, exhaustiva y
            vinculante los términos, condiciones, obligaciones y
            responsabilidades bajo las cuales Confecciones Liss (en adelante
            &quot;el Taller&quot;) recibe, procesa, fabrica, gestiona y entrega
            pedidos a gran escala solicitados por grupos organizados de personas
            naturales, colectivos estudiantiles, promociones académicas,
            empresas, instituciones educativas, centros de salud u otras
            organizaciones de cualquier índole (en adelante &quot;el
            Grupo&quot;).
          </P>
          <P>
            La persona natural que actúe como representante, delegado o
            coordinador del Grupo ante el Taller (en adelante &quot;el
            Representante&quot;) y cada uno de los integrantes individuales del
            Grupo que participen en el pedido (en adelante &quot;los
            Integrantes&quot;) declaran haber leído, comprendido y aceptado en
            su integridad, de forma libre, voluntaria e informada, la totalidad
            de los términos aquí establecidos. La formulación de una consulta,
            la solicitud de cotización, el pago de cualquier anticipo o el
            inicio del proceso de producción constituyen aceptación tácita,
            libre e irrevocable de la presente Política.
          </P>
          <P>
            El Representante garantiza de forma expresa al Taller que tiene la
            autoridad suficiente para comprometer al Grupo en los términos de la
            presente Política y que ha informado a todos los Integrantes sobre
            la existencia y el contenido de la misma. El desconocimiento de la
            presente Política no exime a ningún Integrante ni al Representante
            de su cumplimiento.
          </P>
          <P>
            La presente Política debe leerse y aplicarse de forma complementaria
            y consistente con el marco normativo comercial completo del Taller,
            disponible en{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── Art. 1 ───────────────────────────────────────────────────────── */}
        <Section n={1} title="Definición de Pedido en Grupo y Mayoreo">
          <P>
            <strong>1.1</strong> A efectos de la presente Política, se entenderá
            por &quot;Pedido en Grupo y Mayoreo&quot; toda solicitud de
            confección de prendas, uniformes o productos textiles que cumpla
            simultáneamente con los siguientes criterios:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Involucra a dos o más personas naturales como beneficiarias
              finales de las prendas, o a una persona jurídica que adquiere las
              prendas para uso de su personal o estudiantes.
            </P>
            <P>
              b) Cumple con los volúmenes mínimos establecidos en el Artículo 2
              de la presente Política.
            </P>
            <P>
              c) Se tramita bajo un mismo requerimiento de confección, con
              unidad de diseño, modelo o referencia, dentro de un mismo proceso
              productivo.
            </P>
          </div>
          <P>
            <strong>1.2</strong> Los pedidos que no cumplan todos los criterios
            del numeral anterior serán clasificados como pedidos individuales o
            al detalle y se regirán por la{" "}
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              Política de Cotizaciones
            </Link>{" "}
            y por la{" "}
            <Link
              href="/legal/confeccion"
              className="text-blue-600 hover:underline"
            >
              Política de Confección
            </Link>{" "}
            del Taller.
          </P>
          <P>
            <strong>1.3</strong> El Taller se reserva el derecho de clasificar
            un pedido como individual o en grupo conforme a los criterios
            técnicos y operativos establecidos en la presente Política, con
            independencia de la denominación que el Cliente asigne a su
            solicitud.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 2 ───────────────────────────────────────────────────────── */}
        <Section
          n={2}
          title="Volúmenes Mínimos y Condiciones de Acceso a Tarifas Preferenciales"
        >
          <P>
            <strong>2.1</strong> Para que un pedido sea clasificado bajo la
            modalidad de Mayoreo y pueda acceder a tarifas preferenciales,
            condiciones específicas de diseño y esquemas de facturación grupal,
            debe cumplir los siguientes volúmenes mínimos:
          </P>
          <Ul
            items={[
              "EMPRESAS, INSTITUCIONES Y PERSONAS JURÍDICAS: Volumen mínimo de doce (12) conjuntos completos de uniforme o prendas individuales equivalentes por modelo o referencia.",
              "ESTUDIANTES, COLECTIVOS Y PERSONAS NATURALES ORGANIZADAS: Volumen mínimo de ocho (8) conjuntos completos de uniforme por modelo o referencia, tramitados bajo un mismo requerimiento colectivo.",
            ]}
          />
          <P>
            <strong>2.2 REQUISITO DE COLECTIVIDAD ACTIVA.</strong> Para la
            aplicación de las tarifas de mayoreo, el Grupo debe presentar y
            tramitar el pedido de forma conjunta y organizada. Queda
            expresamente prohibido:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Consolidar pedidos individuales realizados en fechas distintas
              para reclamar tarifas mayoristas de forma retroactiva.
            </P>
            <P>
              b) Fraccionar un pedido único en múltiples solicitudes
              individuales para luego reclamar condiciones de grupo.
            </P>
            <P>
              c) Invocar el volumen de compras anteriores o acumuladas en
              diferentes períodos como fundamento para acceder a tarifas
              mayoristas en un pedido nuevo, salvo acuerdo escrito expreso del
              Taller.
            </P>
          </div>
          <P>
            <strong>2.3</strong> Las cantidades mínimas establecidas son por
            modelo o referencia y no son transferibles entre modelos distintos.
            Cada modelo se contabiliza de forma independiente para efectos del
            cumplimiento del volumen mínimo.
          </P>
          <P>
            <strong>2.4</strong> El Taller se reserva el derecho de revisar y
            negociar, a su entera discreción, los volúmenes mínimos requeridos,
            atendiendo a condiciones específicas del pedido, temporalidad, tipo
            de prenda o relación comercial con el Cliente. Cualquier
            flexibilización debe constar por escrito a través de los canales
            oficiales y no constituye precedente ni derecho adquirido para
            pedidos futuros.
          </P>
          <P>
            <strong>2.5</strong> El acceso a tarifas preferenciales de mayoreo
            no implica gratuidad de servicios adicionales (bordados extra,
            sublimaciones especiales, materiales no estándar) ni exime al Grupo
            del pago de los recargos por tallas especiales establecidos en la{" "}
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              Política de Cotizaciones
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── Art. 3 ───────────────────────────────────────────────────────── */}
        <Section n={3} title="Gestión del Pedido y Canales Oficiales">
          <P>
            <strong>3.1</strong> Todo proceso de cotización, toma de medidas,
            aprobación de fichas técnicas, confirmación de diseños y seguimiento
            de producción para pedidos de mayoreo se gestiona directamente por
            el Taller a través de sus canales oficiales, disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            <strong>3.2</strong> El Taller no reconocerá gestiones, acuerdos,
            compromisos, modificaciones ni confirmaciones realizadas fuera de
            los canales oficiales indicados. Cualquier comunicación a través de
            canales no oficiales es inválida e inoponible al Taller, con
            independencia de que dichos canales utilicen el nombre, logo u otros
            elementos de identidad del Taller.
          </P>
          <P>
            <strong>3.3 INTERLOCUTOR ÚNICO.</strong> El Taller reconoce como
            único interlocutor oficial ante el Grupo al Representante registrado
            al momento de la solicitud de cotización. Toda comunicación,
            consulta, modificación, aprobación y gestión de pago se realizará a
            través del Representante. El Taller no está obligado a atender
            comunicaciones individuales de Integrantes del Grupo que no hayan
            sido designados como Representante.
          </P>
          <P>
            <strong>3.4 CANAL PRINCIPAL DE VENTAS.</strong> Toda coordinación
            operativa del pedido debe iniciarse e instrumentarse a través del
            canal oficial de WhatsApp del Taller (+503 7331-7181), disponible en
            el directorio oficial.
          </P>
          <P>
            <strong>3.5 ESCALAMIENTO E INTERVENCIÓN DIRECTA.</strong> Para la
            mediación de contratos colectivos, resolución de inconformidades
            institucionales o coordinación de grandes cuentas, el Representante
            puede contactar al Encargado de Comunicaciones Oficial: Carlos José
            Molina Villacorta, número de mediación +503 7329-4499. Este canal es
            de uso exclusivo para situaciones que requieran intervención de
            nivel superior y no sustituye el canal principal de ventas para
            gestiones operativas del pedido.
          </P>
          <P>
            <strong>3.6</strong> El Taller no asume responsabilidad alguna por
            conflictos internos, desavenencias, malversación de fondos,
            incumplimientos de pago entre Integrantes, ni por cualquier
            controversia que ocurra en el seno del Grupo. La dinámica interna
            del Grupo es un asunto de exclusiva responsabilidad de sus
            integrantes.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 4 ───────────────────────────────────────────────────────── */}
        <Section n={4} title="Proceso de Cotización y Vigencia">
          <P>
            <strong>4.1</strong> La cotización de pedidos en grupo se rige por
            las disposiciones de la{" "}
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              Política General de Cotizaciones del Taller
            </Link>
            , aplicadas en forma conjunta con las disposiciones específicas de
            la presente Política.
          </P>
          <P>
            <strong>4.2</strong> La vigencia de la cotización para pedidos en
            grupo es de <strong>quince (15) días calendario</strong> contados
            desde la fecha de emisión. Transcurrido dicho plazo sin que el
            Representante haya formalizado la aceptación mediante el pago del
            anticipo correspondiente, la cotización quedará automáticamente sin
            efecto y los precios, condiciones, disponibilidad de materiales y
            tiempos de entrega quedarán sujetos a revisión sin derecho a
            reclamación.
          </P>
          <P>
            <strong>4.3</strong> La cotización grupal se elabora sobre la base
            de la información proporcionada por el Representante al momento de
            la solicitud. Cualquier variación posterior en el número de
            integrantes, tallas, modelos o personalizaciones podrá implicar
            ajuste del precio cotizado, el cual será comunicado al Representante
            antes de proceder.
          </P>
          <P>
            <strong>4.4</strong> El Representante es el único responsable de
            verificar que la cotización recibida refleja correctamente las
            necesidades del Grupo antes de proceder con el pago del anticipo.
            Una vez pagado el anticipo, se entiende que el Representante ha
            revisado y aprobado la cotización en todos sus términos.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 5 ───────────────────────────────────────────────────────── */}
        <Section n={5} title="Esquema de Anticipos y Condiciones de Pago">
          <P>
            <strong>5.1 PRINCIPIO GENERAL.</strong> Ningún pedido de mayoreo
            ingresará a la cola de programación de diseño, al área de corte ni a
            la mesa de confección sin la acreditación previa del anticipo
            correspondiente. El Taller no reserva materiales, no asigna tiempo
            de producción ni inicia ningún proceso operativo sin el anticipo
            debidamente recibido y verificado.
          </P>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                5.2 MODALIDAD A — ANTICIPO CONSOLIDADO (PAGO A TRAVÉS DEL
                REPRESENTANTE).
              </strong>
            </P>
            <P>
              Cuando el Grupo designa a un único Representante para coordinar y
              realizar el recaudo total del dinero, y este efectúa un único
              desembolso unificado al Taller, aplican las siguientes
              condiciones:
            </P>
            <div style={{ paddingLeft: "1.5rem" }}>
              <P>
                a) Anticipo obligatorio equivalente al{" "}
                <strong>cincuenta por ciento (50%)</strong> del valor total
                presupuestado, pagadero en un único desembolso antes del inicio
                de la producción.
              </P>
              <P>
                b) El cincuenta por ciento (50%) restante debe liquidarse en una
                única transacción consolidada antes o en el momento exacto de la
                entrega de la producción.
              </P>
              <P>
                c) El Taller no entregará ninguna prenda si el saldo final no ha
                sido cancelado en su totalidad.
              </P>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                5.3 MODALIDAD B — ANTICIPO INDIVIDUALIZADO (PAGOS POR CUENTA
                SEPARADA).
              </strong>
            </P>
            <P>
              Cuando el Grupo solicita que el recaudo se realice de manera
              individual, donde cada Integrante realiza su pago directamente al
              Taller, aplican las siguientes condiciones:
            </P>
            <div style={{ paddingLeft: "1.5rem" }}>
              <P>
                a) Anticipo individual de entre el{" "}
                <strong>
                  veinticinco por ciento (25%) y el cincuenta por ciento (50%)
                </strong>{" "}
                del valor del uniforme de cada Integrante, según lo determine el
                Taller en la cotización.
              </P>
              <P>
                b) El porcentaje exacto dentro de dicho rango dependerá de la
                complejidad del diseño, personalización e insumos especiales
                requeridos, y será determinado por el Taller al momento de
                formalizar la cotización.
              </P>
              <P>
                c) Cada Integrante es responsable exclusivo de sus propios
                pagos. El Taller no gestionará cobros de un Integrante para
                cubrir la deuda de otro ni asumirá responsabilidad por la falta
                de pago de Integrantes individuales.
              </P>
            </div>
          </div>

          <P>
            <strong>5.4</strong> El pago del anticipo en cualquiera de sus
            modalidades implica la aceptación expresa, voluntaria e irrevocable
            de todos los términos de la presente Política.
          </P>
          <P>
            <strong>5.5</strong> El Representante tiene el deber de informar a
            todos los Integrantes sobre las condiciones de pago, plazos y
            consecuencias del incumplimiento establecidas en la presente
            Política, antes de iniciar cualquier proceso de recaudo interno. El
            Taller no asume responsabilidad por la falta de información interna
            entre el Representante y los Integrantes.
          </P>
          <P>
            <strong>5.6</strong> Los pagos deben realizarse exclusivamente a
            través de los medios habilitados y comunicados por el Taller a
            través de sus canales oficiales. El Taller no reconocerá pagos
            realizados a personas, cuentas o plataformas no autorizadas, ni
            asumirá responsabilidad por fondos entregados a canales no
            oficiales.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 6 ───────────────────────────────────────────────────────── */}
        <Section n={6} title="Condiciones de Entrega y Responsabilidad de Pago">
          <P>
            <strong>6.1 PRINCIPIO DE INTEGRIDAD FINANCIERA DEL PEDIDO.</strong>{" "}
            La entrega de prendas confeccionadas bajo la modalidad de mayoreo
            está condicionada en todos los casos a la liquidación completa del
            saldo pendiente. El Taller no entregará parcialidades de un pedido
            cuando el motivo de la entrega parcial sea la falta de pago, salvo
            en los casos expresamente contemplados en la presente Política.
          </P>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                6.2 ENTREGA CONDICIONADA A LA LIQUIDACIÓN TOTAL — MODALIDAD
                CONSOLIDADA.
              </strong>
            </P>
            <div style={{ paddingLeft: "1.5rem" }}>
              <P>
                a) El Taller no entregará ninguna prenda si el saldo final de la
                orden de compra no ha sido cancelado en su totalidad por el
                Representante.
              </P>
              <P>
                b) Si al momento acordado para la entrega el Representante
                presenta un faltante equivalente al valor de uno o más
                uniformes, el Taller retendrá las prendas correspondientes al
                faltante hasta la cancelación total.
              </P>
              <P>
                c) La selección de qué prendas se entregan y cuáles quedan
                retenidas por falta de pago es responsabilidad exclusiva del
                Representante y del Grupo. El Taller no mediará en conflictos
                internos derivados de dicha selección.
              </P>
              <P>
                d) El Taller entregará única y exclusivamente la cantidad de
                uniformes que queden completamente cubiertos por el monto
                efectivamente cancelado hasta el momento de la entrega.
              </P>
            </div>
          </div>

          <div style={{ marginTop: "1.5rem" }}>
            <P>
              <strong>
                6.3 RETENCIÓN EN MODALIDAD INDIVIDUALIZADA — MODALIDAD B.
              </strong>
            </P>
            <div style={{ paddingLeft: "1.5rem" }}>
              <P>
                a) Cada prenda se entregará únicamente al Integrante que haya
                cancelado el <strong>cien por ciento (100%)</strong> de su saldo
                personal.
              </P>
              <P>
                b) El Integrante que no haya cancelado su saldo total no
                recibirá su uniforme, el cual permanecerá retenido en las
                instalaciones del Taller conforme a los plazos y condiciones
                establecidos en el Artículo 7 de la presente Política.
              </P>
              <P>
                c) El Taller no asumirá responsabilidad alguna por los
                conflictos que puedan surgir entre los Integrantes del Grupo
                derivados de la retención selectiva de prendas.
              </P>
            </div>
          </div>

          <P>
            <strong>6.4 PLAZO DE RETIRO.</strong> Las prendas listas para
            entrega deben ser retiradas por el Representante o el Integrante
            correspondiente dentro del plazo establecido en la{" "}
            <Link
              href="/legal/confeccion"
              className="text-blue-600 hover:underline"
            >
              Política de Confección
            </Link>
            . El vencimiento del plazo de retiro activa las consecuencias
            establecidas en el Artículo 7 de la presente Política.
          </P>
          <P>
            <strong>6.5</strong> El Taller no asume responsabilidad por retrasos
            en la entrega atribuibles a la falta de pago oportuno por parte del
            Representante o de los Integrantes, ni por los perjuicios que dichos
            retrasos puedan causar al Grupo en su conjunto o a sus miembros
            individualmente.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 7 ───────────────────────────────────────────────────────── */}
        <Section n={7} title="Retención, Abandono y Liquidación de Prendas">
          <P>
            <strong>7.1</strong> Las prendas que permanezcan retenidas en las
            instalaciones del Taller por falta de pago o por falta de retiro,
            transcurridos <strong>treinta (30) días calendario</strong> contados
            desde la fecha de notificación de disponibilidad para entrega,
            quedarán a entera disposición del Taller.
          </P>
          <P>
            <strong>7.2</strong> Transcurrido el plazo establecido en el numeral
            anterior sin que el Representante o el Integrante haya cancelado el
            saldo pendiente ni retirado la prenda, el Taller declarará la prenda
            en estado de abandono y procederá a su comercialización conforme a
            las condiciones establecidas en la{" "}
            <Link
              href="/legal/promociones"
              className="text-blue-600 hover:underline"
            >
              Política de Promociones
            </Link>
            .
          </P>
          <P>
            <strong>7.3</strong> La comercialización de prendas en estado de
            abandono se realizará bajo precio promocional calculado de la
            siguiente manera:
          </P>
          <div
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "0.5rem",
              padding: "1rem 1.5rem",
              marginBottom: "0.75rem",
              fontFamily: "monospace",
              fontSize: "0.95rem",
            }}
          >
            <div>
              Precio promocional = Precio total del pedido − Anticipo pagado
            </div>
            <div
              style={{ marginTop: "0.5rem", fontSize: "0.85rem", opacity: 0.7 }}
            >
              Ejemplo: si el valor total es USD $35.00 y el anticipo pagado fue
              USD $15.00, la prenda se ofertará a USD $20.00 para recuperar la
              inversión en materiales y mano de obra.
            </div>
          </div>
          <P>
            <strong>7.4</strong> El Representante o el Integrante original podrá
            adquirir su prenda bajo el precio promocional descrito, en igualdad
            de condiciones que cualquier otro comprador interesado, durante el
            período en que la prenda esté disponible. El Taller no garantiza la
            reserva de la prenda una vez vencido el plazo de retiro.
          </P>
          <P>
            <strong>7.5</strong> El anticipo pagado por el Representante o el
            Integrante cuya prenda haya sido declarada en estado de abandono{" "}
            <strong>no será reembolsado bajo ninguna circunstancia</strong>. El
            Taller se reserva el derecho total e irrevocable sobre dicho monto
            como compensación por los costos de producción, almacenamiento y
            gestión administrativa incurridos.
          </P>
          <P>
            <strong>7.6</strong> El Representante tiene el deber de notificar al
            Taller, con la debida antelación y a través de los canales
            oficiales, cualquier dificultad previsible para retirar las prendas
            dentro del plazo establecido. La falta de notificación oportuna no
            suspende el inicio del plazo de abandono ni genera derecho a
            prórroga automática.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 8 ───────────────────────────────────────────────────────── */}
        <Section n={8} title="Tallas, Medidas y Personalización">
          <P>
            <strong>8.1</strong> El Representante es el único responsable de
            proporcionar al Taller la tabla de tallas correcta, validada y
            confirmada por todos los Integrantes beneficiarios, antes del inicio
            de la producción. Una vez iniciada la producción con la información
            de tallas confirmada, cualquier solicitud de modificación de talla
            será considerada un nuevo servicio sujeto a cotización adicional.
          </P>
          <P>
            <strong>8.2</strong> El Taller no asume responsabilidad por
            inconformidades de talla derivadas de información incorrecta,
            incompleta o no validada proporcionada por el Representante o los
            Integrantes. El Taller ejecutará la producción estrictamente
            conforme a las especificaciones recibidas y aprobadas.
          </P>
          <P>
            <strong>8.3</strong> Los recargos por tallas especiales (a partir de
            XL) se aplican conforme a lo establecido en la{" "}
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              Política de Cotizaciones
            </Link>
            . El Representante es responsable de comunicar dichos recargos a los
            Integrantes afectados antes de la confirmación del pedido.
          </P>
          <P>
            <strong>8.4</strong> Para pedidos con confección a la medida, el
            Integrante que requiera esta modalidad deberá asistir de forma
            presencial a las instalaciones del Taller para la toma de medidas
            por el personal autorizado. Las medidas tomadas de forma remota o
            proporcionadas por el Representante en lugar del Integrante son
            responsabilidad exclusiva del Representante.
          </P>
          <P>
            <strong>8.5</strong> Las personalizaciones (bordados, sublimaciones,
            logos, textos) deben ser aprobadas por el Representante antes del
            inicio de la producción. La aprobación del Representante sobre
            cualquier diseño o ficha técnica es irrevocable y vincula a todos
            los Integrantes del Grupo. No se admiten reclamaciones posteriores
            por aspectos aprobados por el Representante en nombre del Grupo.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 9 ───────────────────────────────────────────────────────── */}
        <Section
          n={9}
          title="Cancelaciones, Retiros y Desistimientos de Integrantes"
        >
          <P>
            <strong>9.1</strong> Dada la naturaleza personalizada y de
            producción en cadena que caracteriza los pedidos por mayoreo, la
            cancelación de la participación de un Integrante o el desistimiento
            del pedido completo por parte del Grupo se rige por las siguientes
            condiciones, sin excepción.
          </P>
          <P>
            <strong>9.2 NO EXISTENCIA DE DEVOLUCIONES POR CANCELACIÓN.</strong>{" "}
            Si algún Integrante decide cancelar su participación o el Grupo
            desiste del pedido completo después de haberse pagado el anticipo e
            iniciado el proceso de producción, se aplicará estrictamente la{" "}
            <Link
              href="/legal/devoluciones"
              className="text-blue-600 hover:underline"
            >
              Política de Devoluciones
            </Link>
            . En consecuencia, no procederá devolución del dinero abonado en
            concepto de anticipo bajo ninguna circunstancia, el cual quedará en
            beneficio del Taller para cubrir los gastos de corte de tela,
            adquisición de insumos y reserva de capacidad de producción ya
            incurridos.
          </P>
          <P>
            <strong>
              9.3 CANCELACIÓN PARCIAL — IMPACTO EN EL VOLUMEN MÍNIMO.
            </strong>{" "}
            Si la cancelación de la participación de uno o más Integrantes
            reduce el volumen total del pedido por debajo del mínimo establecido
            en el Artículo 2, el Taller se reserva el derecho de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Recalcular el precio de las prendas restantes conforme a las
              tarifas de pedido individual vigentes, generando un ajuste en el
              saldo pendiente a cargo del Grupo.
            </P>
            <P>
              b) Continuar con la producción a las tarifas de mayoreo originales
              si el Taller lo considera conveniente, lo cual no constituirá
              precedente ni derecho adquirido.
            </P>
          </div>
          <P>
            <strong>9.4 MODIFICACIONES AL PEDIDO.</strong> Las modificaciones al
            diseño, modelo, tallas o personalizaciones solicitadas después de la
            aprobación de la ficha técnica e inicio de producción generarán
            costos adicionales que el Grupo deberá cubrir íntegramente antes de
            que el Taller proceda con los cambios solicitados.
          </P>
          <P>
            <strong>9.5</strong> El Representante es responsable de gestionar
            internamente las cancelaciones y modificaciones individuales de los
            Integrantes, así como de asumir frente al Taller las consecuencias
            económicas de dichas situaciones. El Taller no gestionará reclamos
            internos entre Integrantes del Grupo ni mediará en disputas sobre la
            distribución de anticipos entre ellos.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 10 ──────────────────────────────────────────────────────── */}
        <Section n={10} title="Tiempos de Producción y Entrega">
          <P>
            <strong>10.1</strong> Los tiempos de producción para pedidos en
            grupo y mayoreo son estimaciones que dependen del volumen del
            pedido, la complejidad del diseño, la disponibilidad de materiales y
            la carga operativa del Taller en el momento del pedido. Dichos
            tiempos serán comunicados al Representante al momento de la
            cotización y no constituyen garantías de entrega en fecha exacta.
          </P>
          <P>
            <strong>10.2</strong> El tiempo de producción comenzará a contarse
            únicamente desde el momento en que el Taller haya recibido y
            verificado el anticipo correspondiente y haya recibido aprobación
            sobre todos los elementos de diseño y personalización del pedido.
            Retrasos en el pago del anticipo o en la aprobación de diseños son
            responsabilidad exclusiva del Representante y extenderán
            proporcionalmente el plazo de entrega estimado.
          </P>
          <P>
            <strong>10.3</strong> El Taller no asumirá responsabilidad por
            retrasos en la entrega derivados de: demoras en el pago del
            anticipo; demoras en la provisión de información completa sobre
            tallas o diseños; cambios solicitados por el Representante durante
            la producción; casos fortuitos o de fuerza mayor; o cualquier otra
            causa atribuible al Representante, al Grupo o a terceros.
          </P>
          <P>
            <strong>10.4</strong> Si el Representante requiere una fecha de
            entrega específica, debe comunicarlo al Taller al momento de la
            solicitud de cotización. El Taller evaluará la viabilidad de la
            fecha solicitada y la confirmará o propondrá una alternativa. La
            confirmación de una fecha específica de entrega requiere constar por
            escrito a través de los canales oficiales.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 11 ──────────────────────────────────────────────────────── */}
        <Section
          n={11}
          title="Responsabilidad del Representante y sus Consecuencias"
        >
          <P>
            <strong>11.1</strong> El Representante actúa en nombre y
            representación del Grupo ante el Taller. En consecuencia, el
            Representante es solidariamente responsable frente al Taller por:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>a) El pago oportuno del anticipo consolidado (Modalidad A).</P>
            <P>
              b) La exactitud y completitud de toda la información de tallas,
              diseños y personalizaciones proporcionada al Taller.
            </P>
            <P>
              c) La aprobación oportuna de fichas técnicas, muestras y diseños
              que el Taller remita para validación.
            </P>
            <P>
              d) La recepción y distribución de las prendas entre los
              Integrantes.
            </P>
            <P>
              e) La comunicación oportuna al Taller de cualquier cambio,
              cancelación o dificultad que afecte el desarrollo normal del
              pedido.
            </P>
          </div>
          <P>
            <strong>11.2</strong> Las instrucciones, aprobaciones y
            confirmaciones del Representante son vinculantes para todos los
            Integrantes del Grupo, sin que el Taller deba verificar el
            consentimiento individual de cada uno.
          </P>
          <P>
            <strong>11.3</strong> Las consecuencias del incumplimiento de los
            deberes del Representante recaen integralmente sobre el Grupo en su
            conjunto. El Taller no asumirá ninguna responsabilidad derivada de
            la negligencia, dolo, error u omisión del Representante en el
            ejercicio de sus funciones frente al Grupo.
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
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Conflictos internos entre los Integrantes del Grupo, incluyendo
              disputas sobre distribución de anticipos, selección de tallas,
              diseños, cancelaciones individuales o cualquier otra desavenencia
              interna.
            </P>
            <P>
              b) Malversación, pérdida, apropiación indebida o mala gestión de
              los fondos recaudados entre los Integrantes por parte del
              Representante o de cualquier miembro del Grupo.
            </P>
            <P>
              c) Inconformidades de talla derivadas de información incorrecta,
              incompleta o no validada proporcionada por el Representante o los
              Integrantes.
            </P>
            <P>
              d) Retrasos en la entrega atribuibles a la falta de pago oportuno,
              provisión tardía de información o cambios solicitados durante la
              producción.
            </P>
            <P>
              e) Prendas no retiradas dentro del plazo establecido, que queden
              en estado de abandono y sean comercializadas conforme al Artículo
              7.
            </P>
            <P>
              f) Pérdida del anticipo por cancelaciones o desistimientos del
              Representante o de los Integrantes.
            </P>
            <P>
              g) Discrepancias entre las expectativas del Grupo y el producto
              confeccionado conforme a las especificaciones aprobadas por el
              Representante.
            </P>
            <P>
              h) Inconformidades de Integrantes individuales sobre aspectos
              aprobados por el Representante en nombre del Grupo.
            </P>
            <P>
              i) Cualquier perjuicio que el Grupo o sus Integrantes sufran como
              consecuencia del incumplimiento de sus propios deberes
              establecidos en la presente Política.
            </P>
          </div>
          <P>
            <strong>12.2</strong> La responsabilidad máxima del Taller frente al
            Grupo o a cualquier Integrante individual, por cualquier causa
            directamente atribuible al Taller, se limitará al valor de la prenda
            específica objeto de la reclamación, resolviéndose exclusivamente
            mediante corrección, reelaboración o acuerdo especial a discreción
            del Taller, sin que proceda reembolso en efectivo salvo en los
            supuestos expresamente contemplados en la{" "}
            <Link
              href="/legal/devoluciones"
              className="text-blue-600 hover:underline"
            >
              Política de Devoluciones
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── Art. 13 ──────────────────────────────────────────────────────── */}
        <Section
          n={13}
          title="Propiedad Intelectual y Responsabilidad sobre Diseños"
        >
          <P>
            <strong>13.1</strong> Los patrones, moldes, fichas técnicas y
            desarrollos de diseño elaborados por el Taller para el pedido en
            grupo son propiedad intelectual exclusiva del Taller y no podrán ser
            reproducidos, compartidos ni utilizados por el Representante ni los
            Integrantes sin autorización escrita del Taller.
          </P>
          <P>
            <strong>13.2</strong> Los logotipos, marcas, imágenes e identidad
            visual institucional proporcionados por el Representante o los
            Integrantes para efectos de bordado, sublimación o estampado son de
            responsabilidad exclusiva del Grupo en cuanto a derechos de autor,
            propiedad intelectual y licencias de uso. La presente Política debe
            leerse en conjunto con la{" "}
            <Link
              href="/legal/terceros"
              className="text-blue-600 hover:underline"
            >
              Política de Logos e Identidad Institucional de Terceros
            </Link>
            .
          </P>
          <P>
            <strong>13.3</strong> El Representante garantiza al Taller que los
            diseños, logos y textos proporcionados no infringen derechos de
            terceros. En caso de reclamación de terceros, el Representante
            asumirá plena responsabilidad y mantendrá indemne al Taller frente a
            cualquier acción legal, costo o perjuicio derivado.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 14 ──────────────────────────────────────────────────────── */}
        <Section n={14} title="Relación con Otras Políticas del Taller">
          <P>
            <strong>14.1</strong> La presente Política forma parte integral del
            marco jurídico y comercial de Confecciones Liss y debe interpretarse
            de forma complementaria y consistente con las demás políticas del
            Taller:
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
                label: "Política General de Cotizaciones:",
                href: "/legal/cotizaciones",
              },
              { label: "Política de Confección:", href: "/legal/confeccion" },
              {
                label: "Política de Devoluciones:",
                href: "/legal/devoluciones",
              },
              { label: "Política de Envíos:", href: "/legal/envios" },
              { label: "Política de Promociones:", href: "/legal/promociones" },
              {
                label:
                  "Política de Logos e Identidad Institucional de Terceros:",
                href: "/legal/terceros",
              },
              {
                label: "Política de Comunicaciones Comerciales:",
                href: "/legal/comunicaciones",
              },
              {
                label: "Política de Deberes del Usuario:",
                href: "/legal/deberes",
              },
              {
                label: "Política de Derechos del Usuario:",
                href: "/legal/derechos",
              },
              {
                label: "Términos y Condiciones de Uso:",
                href: "/legal/terminos",
              },
              { label: "Directorio de canales oficiales:", href: "/links" },
            ].map(({ label, href }) => (
              <div key={href} style={{ display: "flex", gap: "0.5rem" }}>
                <span>—</span>
                <div>
                  <strong>{label}</strong>{" "}
                  <Link href={href} className="text-blue-600 hover:underline">
                    https://www.confeccionesliss.com{href}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <P>
            <strong>14.2</strong> En caso de aparente conflicto entre la
            presente Política y cualquier otra política del Taller respecto a
            los supuestos específicamente regulados en este documento —pedidos
            en grupo, volúmenes mínimos, anticipos grupales, retención y
            abandono de prendas en contexto grupal— prevalecerán las
            disposiciones de la presente Política como instrumento específico de
            la materia.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 15 ──────────────────────────────────────────────────────── */}
        <Section n={15} title="Resolución de Disputas y Jurisdicción Aplicable">
          <P>
            <strong>15.1</strong> Toda controversia derivada de la aplicación,
            interpretación o incumplimiento de la presente Política será
            resuelta en primera instancia mediante comunicación directa de buena
            fe entre el Representante y el Taller, a través de los canales
            oficiales disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            <strong>15.2</strong> De no alcanzarse un acuerdo en un plazo
            razonable, la controversia se someterá a la jurisdicción exclusiva
            de los tribunales competentes del departamento de San Miguel,
            República de El Salvador, aplicando la legislación salvadoreña
            vigente, incluyendo sin limitarse al Código de Comercio, el Código
            Civil y la Ley de Protección al Consumidor.
          </P>
          <P>
            <strong>15.3</strong> El Representante, en nombre propio y en
            representación del Grupo, renuncia expresamente a cualquier otro
            fuero o jurisdicción que pudiera corresponderle por razón de
            domicilio, nacionalidad o cualquier otra causa. La legislación
            salvadoreña es la única aplicable a todas las relaciones jurídicas
            derivadas de la presente Política.
          </P>
          <P>
            <strong>15.4</strong> Las disputas internas entre Integrantes del
            Grupo no son competencia del Taller ni de los tribunales ante los
            cuales el Taller sea parte. El Taller comparece ante los tribunales
            salvadoreños exclusivamente en su calidad de prestador del servicio
            de confección, no como árbitro ni como parte en conflictos internos
            del Grupo.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 16 ──────────────────────────────────────────────────────── */}
        <Section n={16} title="Modificaciones a la Política">
          <P>
            <strong>16.1</strong> El Taller se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
          <P>
            <strong>16.2</strong> Las modificaciones entrarán en vigencia de
            forma inmediata desde su publicación. La versión vigente al momento
            de la formalización del pedido —entendida como el pago del primer
            anticipo— será la aplicable a dicho pedido en su totalidad.
          </P>
          <P>
            <strong>16.3</strong> La solicitud de cotización, el pago del
            anticipo o cualquier otra gestión realizada con posterioridad a la
            publicación de cualquier modificación implica la aceptación
            automática e irrevocable de la versión actualizada de la Política,
            tanto por parte del Representante como de los Integrantes.
          </P>
          <P>
            <strong>16.4</strong> El Taller no está obligado a notificar
            individualmente al Representante ni a los Integrantes sobre
            modificaciones a la presente Política. Es responsabilidad exclusiva
            del Representante verificar periódicamente la versión vigente y
            comunicar los cambios relevantes a los Integrantes.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 17 ──────────────────────────────────────────────────────── */}
        <Section n={17} title="Divisibilidad">
          <P>
            <strong>17.1</strong> Si alguna disposición de la presente Política
            fuera declarada inválida, ilegal o inaplicable por un tribunal
            competente de la República de El Salvador, las restantes
            disposiciones continuarán en plena vigencia y efecto, sin que la
            invalidez parcial afecte la validez del conjunto del documento.
          </P>
          <P>
            <strong>17.2</strong> La disposición declarada inválida será
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

            <span style={{ fontWeight: "600" }}>Política de Cotizaciones:</span>
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cotizaciones
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Confección:</span>
            <Link
              href="/legal/confeccion"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/confeccion
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Devoluciones:</span>
            <Link
              href="/legal/devoluciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/devoluciones
            </Link>

            <span style={{ fontWeight: "600" }}>Política de Promociones:</span>
            <Link
              href="/legal/promociones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/promociones
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
