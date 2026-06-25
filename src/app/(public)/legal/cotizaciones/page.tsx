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
  title: "Política General de Cotizaciones Comerciales",
  description:
    "Política de cotizaciones de Confecciones Liss: vigencia de precios, tallas especiales, tiempos de entrega, condiciones de pago y anticipos requeridos.",
  keywords:
    "cotizaciones uniformes, presupuesto uniformes, precios scrubs El Salvador, cotización taller, Confecciones Liss, anticipos uniformes",
  alternates: { canonical: `${siteConfig.url}/legal/cotizaciones` },
  openGraph: {
    title: "Política General de Cotizaciones Comerciales | Confecciones Liss",
    description:
      "Política de cotizaciones de Confecciones Liss: vigencia de precios, tallas especiales, tiempos de entrega, condiciones de pago y anticipos requeridos.",
    url: `${siteConfig.url}/legal/cotizaciones`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política General de Cotizaciones Comerciales | Confecciones Liss",
    description:
      "Política de cotizaciones de Confecciones Liss: vigencia de precios, tallas especiales, tiempos de entrega, condiciones de pago y anticipos requeridos.",
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

export default function PoliticaCotizacionesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/cotizaciones`;
  const PAGE_TITLE = "Política de Cotizaciones";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política General de Cotizaciones | Confecciones Liss",
          description:
            "Política de cotizaciones de Confecciones Liss: vigencia de precios, tallas especiales, tiempos de entrega, condiciones de pago y anticipos requeridos.",
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
        title="Política General de Cotizaciones"
        category="Regulación del proceso, tiempos de entrega, validez de precios y condiciones de nuestras cotizaciones comerciales."
        date="24 Jun, 2026"
        readingTime={18}
      >
        <P>
          La presente Política General de Cotizaciones (en adelante &quot;la
          Política&quot;) regula de manera integral y vinculante las condiciones
          bajo las cuales Confecciones Liss (en adelante &quot;el Taller&quot;)
          emite, gestiona y ejecuta cotizaciones comerciales frente a cualquier
          persona natural o jurídica interesada en adquirir sus productos o
          servicios (en adelante &quot;el Cliente&quot;). La aceptación de una
          cotización, ya sea de forma expresa o tácita, implica el conocimiento
          pleno y la aceptación incondicional de todos los términos aquí
          establecidos. El desconocimiento de esta Política no exime al Cliente
          de su cumplimiento.
        </P>
        <Hr />

        <Section n={1} title="Vigencia de las cotizaciones">
          <P>
            1.1 Toda cotización emitida por Confecciones Liss tendrá una
            vigencia improrrogable de quince (15) días calendario, contados a
            partir de la fecha de emisión consignada en el documento.
          </P>
          <P>
            1.2 Transcurrido dicho plazo sin que el Cliente haya formalizado su
            aceptación mediante los mecanismos establecidos en el Artículo 8 de
            la presente Política, la cotización quedará automáticamente sin
            efecto, y los precios, condiciones, disponibilidad de materiales y
            tiempos de entrega quedarán sujetos a revisión y modificación
            unilateral por parte del Taller, sin que ello genere obligación de
            compensación o responsabilidad alguna.
          </P>
          <P>
            1.3 Confecciones Liss se reserva el derecho de reemitir la
            cotización con valores y condiciones actualizadas, sin que la
            cotización vencida constituya precedente ni obligación de mantener
            los precios previamente ofertados.
          </P>
          <P>
            1.4 La vigencia de una cotización no garantiza la disponibilidad de
            materiales, telas ni insumos específicos. En caso de variación en el
            costo o disponibilidad de los mismos durante el período de vigencia,
            el Taller notificará al Cliente de forma oportuna y podrá ajustar la
            cotización correspondiente.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Cantidad mínima de pedido">
          <P>
            2.1 Para que un pedido sea clasificado como pedido por mayoreo y
            acceda a los precios y condiciones preferenciales indicados en la
            cotización, se requiere una cantidad mínima de doce (12) unidades
            por modelo o referencia.
          </P>
          <P>
            2.2 Los pedidos que no alcancen la cantidad mínima establecida en el
            numeral anterior serán clasificados como pedidos individuales o al
            detalle y estarán sujetos a cotización independiente, con precios
            distintos a los de mayoreo.
          </P>
          <P>
            2.3 El Taller se reserva el derecho de revisar y negociar, a su
            entera discreción, la cantidad mínima requerida por modelo,
            atendiendo a condiciones específicas del pedido, temporalidad, tipo
            de prenda o relación comercial con el Cliente. Dicha flexibilización
            deberá constar por escrito y no constituye precedente para pedidos
            futuros.
          </P>
          <P>
            2.4 Las cantidades ofertadas en una cotización no son transferibles
            entre modelos distintos. Cada referencia o modelo se contabiliza de
            forma independiente para efectos del cumplimiento de la cantidad
            mínima.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Política de precios y tallas">
          <P>
            3.1 Los precios indicados en toda cotización emitida por
            Confecciones Liss son fijos para las tallas comprendidas entre XS y
            XL (extra large), inclusive, siempre que se cumpla con la cantidad
            mínima establecida por modelo.
          </P>
          <P>
            3.2 A partir de la talla XL (Extra large) y en adelante, se aplicará
            un recargo adicional de cinco dólares exactos (USD $5.00) por cada
            talla que incremente sobre la talla XL. Este recargo es acumulativo
            y se aplica por unidad confeccionada en talla especial.
          </P>
          <InfoBox
            type="blue"
            title="Ejemplo ilustrativo (no limitativo) de recargos de talla:"
          >
            <span
              style={{
                display: "block",
                fontFamily: "'Courier New', Courier, monospace",
                fontSize: "0.9rem",
                lineHeight: "1.4",
              }}
            >
              • Talla XS a L: precio base sin recargo
              <br />
              • Talla XL: precio base + $5.00
              <br />
              • Talla XXL: precio base + $10.00
              <br />
              • Talla 3XL: precio base + $15.00
              <br />
              • Talla 4XL: precio base + $20.00
              <br />
              (y así sucesivamente incrementando $5.00 USD por talla adicional).
            </span>
          </InfoBox>
          <P>
            3.3 Los precios no incluyen costos adicionales derivados de
            personalizaciones especiales, bordados fuera del estándar,
            sublimación, aplicación de materiales reflectivos, parches, o
            cualquier otro proceso de acabado no especificado expresamente en la
            cotización. Dichos servicios serán cotizados de forma separada.
          </P>
          <P>
            3.4 Confecciones Liss no garantiza la estabilidad de precios en
            cotizaciones no aceptadas dentro del plazo de vigencia establecido
            en el Artículo 1. Los precios están sujetos a variaciones en el
            costo de materiales, mano de obra e insumos del mercado textil.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Ajustes de talla y confección a medida">
          <P>
            4.1 Confecciones Liss no realizará ajustes de talla sin costo
            adicional bajo ninguna circunstancia, salvo en los casos en que las
            prendas hayan sido cotizadas y confeccionadas a la medida
            personalizada del cliente desde el inicio del proceso productivo, lo
            cual deberá estar expresamente especificado en la cotización
            aceptada.
          </P>
          <P>
            4.2 El Cliente es responsable de proporcionar la tabla de tallas
            correcta, validada y confirmada por los beneficiarios finales o el
            cotizante, antes del inicio de la producción. Una vez iniciada la
            producción con la información de tallas confirmada, cualquier
            solicitud de modificación de talla será considerada un nuevo
            servicio y generará costos adicionales que serán cotizados por
            separado.
          </P>
          <P>
            4.3 Confecciones Liss no asume responsabilidad por inconformidades
            de talla derivadas de información incorrecta, incompleta o no
            validada proporcionada por el Cliente. El Taller ejecutará la
            producción estrictamente conforme a las especificaciones recibidas y
            aprobadas.
          </P>
          <P>
            4.4 Para pedidos confeccionados a la medida, el Cliente deberá
            asistir o designar a la persona a medir en el local del Taller, o
            proporcionar las medidas exactas mediante el formulario
            correspondiente facilitado por Confecciones Liss. Las medidas
            proporcionadas de forma remota son responsabilidad exclusiva del
            Cliente y aplica la misma política de la confección por tallas.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Política de devoluciones">
          <P>
            5.1 Para consultar de forma completa y detallada la Política de
            Devoluciones vigente de Confecciones Liss, el Cliente deberá
            dirigirse al siguiente enlace oficial:{" "}
            <Link
              href="/legal/devoluciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/devoluciones
            </Link>
          </P>
          <P>
            5.2 La Política de Devoluciones publicada en dicho enlace forma
            parte integral de la presente Política General de Cotizaciones y se
            considera incorporada a ella por referencia. El Cliente declara
            conocerla y aceptarla al momento de formalizar cualquier pedido con
            el Taller.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Tiempo de entrega">
          <P>
            6.1 El tiempo estimado de entrega para pedidos por mayoreo es de
            quince (15) a veintiún (21) días hábiles, contados a partir del
            cumplimiento simultáneo de las siguientes condiciones:
          </P>
          <Ul
            items={[
              "a) Aprobación formal de la cotización por parte del Cliente.",
              "b) Recepción del anticipo de pago conforme al Artículo 7.",
              "c) Confirmación escrita de tallas, colores y diseños definitivos.",
            ]}
          />
          <P>
            6.2 El plazo de entrega comenzará a computarse únicamente cuando se
            hayan cumplido todas las condiciones enumeradas en el numeral
            anterior. El incumplimiento de cualquiera de ellas por parte del
            Cliente suspenderá el cómputo del plazo hasta su subsanación.
          </P>
          <P>
            6.3 Confecciones Liss no asume responsabilidad por retrasos en la
            entrega derivados de:
          </P>
          <Ul
            items={[
              "a) Demora en la aprobación de diseños, artes o muestras por parte del Cliente.",
              "b) Suministro tardío de información necesaria (tallas, logos, textos).",
              "c) Cambios solicitados durante el proceso productivo.",
              "d) Casos de fuerza mayor o eventos fuera del control del Taller.",
            ]}
          />
          <P>
            6.4 En caso de retraso imputable al Taller, Confecciones Liss
            notificará al Cliente con anticipación razonable, indicando el nuevo
            plazo estimado de entrega. Dicho retraso no faculta al Cliente para
            cancelar el pedido ni exigir devolución de anticipos ya pagados.
          </P>
          <P>
            6.5 Los pedidos al detalle o de cantidad inferior al mínimo
            establecido tendrán tiempos de entrega diferenciados, los cuales
            serán comunicados al Cliente al momento de emitir la cotización
            correspondiente.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Condiciones de pago y anticipo">
          <P>
            7.1 Para el inicio formal del proceso productivo de cualquier
            pedido, el Cliente deberá cancelar un anticipo equivalente al
            veinticinco por ciento (25%) como mínimo y hasta el cincuenta por
            ciento (50%) del valor total del pedido, conforme lo determine el
            Taller según el tipo, complejidad y volumen del pedido.
          </P>
          <P>
            7.2 El saldo restante deberá ser cancelado en su totalidad de forma
            previa a la entrega de las prendas. Confecciones Liss no entregará
            mercadería con saldo pendiente bajo ninguna circunstancia,
            independientemente del plazo de entrega acordado.
          </P>
          <P>
            7.3 Los pagos deberán realizarse en efectivo, directamente en las
            instalaciones del Taller o ante el encargado autorizado. No se
            aceptan pagos en cheques al portador, transferencias no verificadas
            ni ningún otro medio de pago no coordinado previamente con el
            Taller.
          </P>
          <P>
            7.4 El anticipo pagado no es reembolsable una vez iniciada la
            producción. En caso de cancelación del pedido por parte del Cliente
            después del inicio productivo, el anticipo será retenido en su
            totalidad como compensación por los costos incurridos en materiales,
            mano de obra y gestión administrativa.
          </P>
          <P>
            7.5 Los materiales adquiridos de forma específica para un pedido
            determinado, incluyendo telas especiales, insumos importados o
            accesorios personalizados, serán cobrados en su totalidad al
            Cliente, independientemente de la etapa del proceso en que se
            encuentre la producción al momento de una eventual cancelación.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Aceptación de la cotización">
          <P>
            8.1 Una cotización emitida por Confecciones Liss se considerará
            formalmente aceptada cuando concurra cualquiera de las siguientes
            circunstancias:
          </P>
          <Ul
            items={[
              "a) El Cliente otorgue por escrito el aval expreso para iniciar el proceso productivo, mediante comunicación enviada a través de los canales oficiales del Taller.",
              "b) El Cliente realice el pago total o parcial del anticipo correspondiente.",
              "c) El Cliente proporcione información de producción (tallas, artes, diseños) en respuesta directa a la cotización emitida.",
            ]}
          />
          <P>
            8.2 La aceptación de la cotización por cualquiera de los medios
            descritos en el numeral anterior implica el conocimiento pleno y la
            aceptación incondicional de la totalidad de los términos,
            condiciones, precios y políticas contenidos en la presente Política
            y en el documento de cotización correspondiente.
          </P>
          <P>
            8.3 La aceptación parcial de una cotización no es válida. El Cliente
            no podrá aceptar únicamente algunos ítems o condiciones de la
            cotización y rechazar otros. En tal caso, el Taller emitirá una
            nueva cotización ajustada.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Cambios de diseño, modelo o especificaciones">
          <P>
            9.1 Cualquier modificación en diseño, modelo, color, tela, bordado,
            talla, cantidad u otras especificaciones solicitada por el Cliente
            con posterioridad a la aceptación formal de la cotización será
            clasificada como un nuevo trabajo, quedando sujeta a una nueva
            cotización con los precios vigentes al momento de la solicitud.
          </P>
          <P>
            9.2 Si el cambio es solicitado una vez iniciada la producción, este
            generará costos adicionales que incluirán, sin limitarse a:
            materiales ya cortados o procesados, horas de mano de obra
            invertidas, insumos utilizados y costos administrativos de
            reprogramación. Dichos costos serán comunicados al Cliente previo a
            la ejecución del cambio y deberán ser aprobados y pagados por el
            Cliente antes de proceder.
          </P>
          <P>
            9.3 Confecciones Liss no ejecutará cambios sobre prendas en
            producción sin la aprobación expresa y por escrito del Cliente, ni
            sin el pago correspondiente al costo adicional generado.
          </P>
          <P>
            9.4 La solicitud de un cambio no suspende la obligación de pago del
            pedido original ni los términos de entrega previamente acordados,
            salvo acuerdo escrito en contrario.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Canales oficiales de comunicación">
          <P>
            10.1 Toda comunicación relacionada con cotizaciones, confirmaciones
            de pedido, aprobaciones de diseño, modificaciones, reclamos o
            cualquier gestión comercial deberá realizarse exclusivamente a
            través de los canales oficiales de Confecciones Liss, los cuales se
            encuentran publicados y actualizados en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
          </P>
          <P>
            10.2 Los canales oficiales incluyen, sin limitarse a: correo
            electrónico institucional, redes sociales verificadas y número de
            WhatsApp registrado bajo el nombre de Confecciones Liss, todos
            accesibles desde la dirección indicada en el numeral anterior.
          </P>
          <P>
            10.3 Cualquier acuerdo, compromiso, cotización o transacción
            realizada fuera de los canales oficiales descritos en el numeral
            10.1 será considerado inválido e inoponible a Confecciones Liss. El
            Taller no asume responsabilidad alguna por acuerdos, pagos o
            compromisos gestionados a través de plataformas, números
            telefónicos, cuentas en redes sociales o personas no autorizadas que
            no figuren en el directorio oficial indicado.
          </P>
          <P>
            10.4 El Cliente que realice pagos, depósitos o acuerdos a través de
            canales no oficiales asume exclusivamente el riesgo y
            responsabilidad derivados de dicha acción, sin que Confecciones Liss
            tenga obligación de reconocer, honrar ni responder por tales
            gestiones.
          </P>
          <InfoBox type="blue" title="Contacto Oficial del Taller:">
            <strong>Encargado de Cotizaciones y Comunicaciones:</strong> Carlos
            José Molina Villacorta
            <br />
            <strong>Directorio Oficial de Contacto:</strong>{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </InfoBox>
        </Section>
        <Hr />

        <Section
          n={11}
          title="Propiedad intelectual y responsabilidad sobre diseños"
        >
          <P>
            11.1 Los patrones, moldes, fichas técnicas y desarrollos de diseño
            elaborados internamente por Confecciones Liss son propiedad
            intelectual exclusiva del Taller y no podrán ser reproducidos,
            compartidos ni utilizados por el Cliente sin autorización expresa y
            escrita.
          </P>
          <P>
            11.2 Los logotipos, marcas, imágenes e identidad visual
            proporcionados por el Cliente para efectos de bordado, sublimación o
            estampado son de responsabilidad exclusiva del Cliente en cuanto a
            derechos de autor, propiedad intelectual y licencias de uso.
            Confecciones Liss queda expresamente eximido de cualquier
            responsabilidad legal derivada de la reproducción de dichos
            elementos sobre las prendas confeccionadas.
          </P>
          <P>
            11.3 El Cliente garantiza que los diseños, logos y textos
            proporcionados al Taller no infringen derechos de terceros. En caso
            de reclamación por parte de terceros relacionada con la reproducción
            de dichos elementos, el Cliente asumirá plena responsabilidad y
            mantendrá indemne a Confecciones Liss frente a cualquier acción
            legal, costo o perjuicio derivado.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Variaciones de materiales y tonalidad">
          <P>
            12.1 El Cliente reconoce y acepta que las telas, hilos y demás
            materiales utilizados en la confección pueden presentar variaciones
            menores de tono, textura, brillo o acabado entre distintos lotes de
            producción textil, situación inherente a la industria y que no
            constituye defecto de fabricación imputable al Taller.
          </P>
          <P>
            12.2 Confecciones Liss realizará el mayor esfuerzo razonable para
            mantener la uniformidad de materiales en un mismo pedido. En caso de
            detectarse variación significativa de lote, el Taller lo comunicará
            previamente al Cliente para su aprobación o ajuste.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Limitación de responsabilidad">
          <P>
            13.1 La responsabilidad máxima de Confecciones Liss frente al
            Cliente, por cualquier causa derivada de la ejecución de un pedido,
            se limitará al valor total pagado por el Cliente por las prendas
            objeto de la reclamación. En ningún caso el Taller responderá por
            daños indirectos, lucro cesante, daño emergente, pérdida de imagen
            comercial ni cualquier otro daño consecuencial.
          </P>
          <P>
            13.2 Confecciones Liss no será responsable por retrasos,
            incumplimientos o deficiencias derivadas de casos fortuitos o de
            fuerza mayor, incluyendo sin limitarse a: desabastecimiento de
            materiales, cortes de energía eléctrica, desastres naturales,
            emergencias de salud pública u otras circunstancias fuera del
            control razonable del Taller.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Solución de controversias y jurisdicción">
          <P>
            14.1 Cualquier desacuerdo, controversia o reclamación derivada de la
            aplicación de la presente Política o de cualquier cotización emitida
            por Confecciones Liss será resuelta, en primera instancia, mediante
            comunicación directa entre las partes a través de los canales
            oficiales establecidos en el Artículo 10.
          </P>
          <P>
            14.2 De no llegarse a un acuerdo en la instancia anterior, las
            partes se someten expresamente a la jurisdicción y competencia de
            los tribunales competentes del departamento de San Miguel, República
            de El Salvador, renunciando a cualquier otro fuero que pudiera
            corresponderles por razón de domicilio o cualquier otra causa.
          </P>
          <P>
            14.3 La presente Política se rige e interpreta de conformidad con
            las leyes vigentes de la República de El Salvador, incluyendo sin
            limitarse al Código de Comercio, el Código Civil y la Ley de
            Protección al Consumidor.
          </P>
        </Section>
        <Hr />

        <Section n={15} title="Modificaciones a la política">
          <P>
            15.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en
            https://www.confeccionesliss.com/legal. La versión vigente al
            momento de la emisión de cada cotización será la aplicable a dicha
            cotización.
          </P>
          <P>
            15.2 El uso de los servicios del Taller y la solicitud de
            cotizaciones con posterioridad a la publicación de cualquier
            modificación implicará la aceptación automática de la versión
            actualizada de la Política.
          </P>
        </Section>

        <LegalFootnote>
          Esta política general de cotizaciones está vigente desde su
          publicación y refleja las prácticas comerciales implementadas por
          Confecciones Liss. Última actualización: Junio 2026.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
