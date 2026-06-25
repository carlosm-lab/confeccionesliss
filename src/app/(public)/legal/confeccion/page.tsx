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
  title: "Política de Confección de Prendas y Uniformes",
  description:
    "Política de confección de Confecciones Liss: modalidades por talla y medida, toma de medidas, garantías, anticipos de pago y plazos de entrega vigentes.",
  keywords:
    "política confección, uniformes a la medida, toma de medidas, scrubs El Salvador, garantía ajuste, Confecciones Liss San Miguel",
  alternates: { canonical: `${siteConfig.url}/legal/confeccion` },
  openGraph: {
    title: "Política de Confección de Prendas y Uniformes | Confecciones Liss",
    description:
      "Política de confección de Confecciones Liss: modalidades por talla y medida, toma de medidas, garantías, anticipos de pago y plazos de entrega vigentes.",
    url: `${siteConfig.url}/legal/confeccion`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Confección de Prendas y Uniformes | Confecciones Liss",
    description:
      "Política de confección de Confecciones Liss: modalidades por talla y medida, toma de medidas, garantías, anticipos de pago y plazos de entrega vigentes.",
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

export default function PoliticaConfeccionPage() {
  const PAGE_URL = `${siteConfig.url}/legal/confeccion`;
  const PAGE_TITLE = "Política de Confección";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Confección | Confecciones Liss",
          description:
            "Política de confección de Confecciones Liss: modalidades por talla y medida, toma de medidas, garantías, anticipos de pago y plazos de entrega vigentes.",
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
        title="Política de Confección"
        category="Estándares de calidad, toma de medidas, plazos de confección y garantías aplicables a nuestras prendas."
        date="24 Jun, 2026"
        readingTime={17}
      >
        <P>
          La presente Política de Confección (en adelante &quot;la
          Política&quot;) regula de manera integral y vinculante las condiciones
          bajo las cuales Confecciones Liss (en adelante &quot;el Taller&quot;)
          presta sus servicios de confección a cualquier persona natural o
          jurídica (en adelante &quot;el Cliente&quot;) que solicite la
          elaboración de prendas, uniformes o cualquier producto textil. La
          solicitud de un servicio de confección, así como la realización de
          cualquier pago o anticipo, implica el conocimiento pleno y la
          aceptación incondicional de todos los términos aquí establecidos. El
          desconocimiento de esta Política no exime al Cliente de su
          cumplimiento ni le otorga derechos adicionales a los aquí descritos.
        </P>
        <Hr />

        <Section n={1} title="Modalidades de confección">
          <P>
            1.1 El Taller ofrece dos modalidades de confección, claramente
            diferenciadas en cuanto a condiciones, garantías y
            responsabilidades:
          </P>
          <Ul
            items={[
              "a) CONFECCIÓN POR TALLA: El Cliente selecciona la talla de su preferencia conforme a la tabla de tallas oficial del Taller. La prenda es confeccionada bajo las medidas estándar correspondientes a dicha talla.",
              "b) CONFECCIÓN A LA MEDIDA: La prenda es elaborada conforme a las medidas personalizadas del Cliente, tomadas de forma presencial en las instalaciones del Taller por el personal autorizado.",
            ]}
          />
          <P>
            1.2 Ambas modalidades requieren ser solicitadas con anticipación. El
            Taller no elabora prendas de forma inmediata ni bajo demanda
            instantánea. Todo pedido está sujeto a los tiempos de producción
            establecidos en el Artículo 6 de la presente Política.
          </P>
          <P>
            1.3 La modalidad seleccionada por el Cliente determina el alcance de
            las garantías aplicables conforme a lo dispuesto en el Artículo 3 y
            Artículo 4 de la presente Política.
          </P>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Confección por talla: condiciones y responsabilidad"
        >
          <P>
            2.1 Para la modalidad de confección por talla, el Cliente es el
            único y exclusivo responsable de seleccionar la talla correcta
            conforme a sus medidas corporales. El Taller no asume
            responsabilidad alguna por inconformidades de ajuste derivadas de
            una selección de talla incorrecta por parte del Cliente.
          </P>
          <P>
            2.2 A efectos de orientar al Cliente en la selección correcta de
            talla, el Taller pone a disposición una guía de tabla de tallas
            oficial, disponible en el sitio web del Taller y en la sección
            destacada de las redes sociales oficiales en Facebook e Instagram.
            El Cliente tiene la obligación de consultar dicha guía antes de
            realizar su pedido.
          </P>
          <P>
            2.3 La consulta de la guía de tallas es responsabilidad exclusiva
            del Cliente. El Taller no se hace responsable por la falta de
            consulta de dicha guía, ni por selecciones de talla realizadas sin
            haberla considerado.
          </P>
          <P>
            2.4 En los casos en que el Cliente proporcione sus propias medidas
            de forma remota para un pedido por talla, dichas medidas son de
            responsabilidad exclusiva del Cliente. El Taller confeccionará la
            prenda estrictamente conforme a la información recibida, sin que
            ello genere garantía de ajuste ni derecho a correcciones gratuitas
            posteriores.
          </P>
          <P>
            2.5 Las inconformidades de talla en pedidos bajo esta modalidad no
            generan derecho a devolución, reembolso ni corrección gratuita. Para
            consultar la Política de Devoluciones vigente, el Cliente deberá
            dirigirse a:{" "}
            <Link
              href="/legal/devoluciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/devoluciones
            </Link>
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Confección a la medida: condiciones y garantía">
          <P>
            3.1 Para acceder al servicio de confección a la medida, el Cliente
            deberá asistir de forma presencial a las instalaciones del Taller,
            ubicadas en Barrio La Merced, 5A Calle Poniente y 1A Avenida Sur,
            San Miguel, El Salvador, a fin de que el personal autorizado tome
            las medidas requeridas para la elaboración de la prenda.
          </P>
          <P>
            3.2 No se admiten medidas tomadas por el Cliente de forma autónoma
            ni proporcionadas de forma remota para la modalidad de confección a
            la medida. El proceso de toma de medidas debe realizarse
            exclusivamente en las instalaciones del Taller con intervención del
            personal autorizado.
          </P>
          <P>
            3.3 La confección a la medida es la única modalidad bajo la cual el
            Taller otorga garantía de ajuste. En consecuencia, si una prenda
            confeccionada bajo esta modalidad no queda con el ajuste adecuado
            —ya sea por resultar excesivamente ajustada, apretada o holgada en
            relación con las medidas tomadas por el personal del Taller— el
            Taller realizará todas las correcciones necesarias sin costo
            adicional para el Cliente.
          </P>
          <P>
            3.4 La garantía de ajuste establecida en el numeral anterior aplica
            exclusivamente sobre inconformidades atribuibles al proceso de toma
            de medidas o de confección por parte del Taller. No aplica en los
            siguientes supuestos:
          </P>
          <Ul
            items={[
              "a) Cambios en las medidas corporales del Cliente ocurridos con posterioridad a la toma de medidas.",
              "b) Solicitudes de modificación de diseño, modelo o estilo distintas a las acordadas al momento de la toma de medidas.",
              "c) Inconformidades de carácter estético o subjetivo no relacionadas con el ajuste de la prenda.",
            ]}
          />
          <P>
            3.5 Esta garantía es exclusiva de la modalidad de confección a la
            medida y no es extensible a ninguna otra modalidad de servicio
            ofrecida por el Taller.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Materiales, telas y personalizaciones">
          <P>
            4.1 El Taller trabaja con una variedad de telas y materiales de
            calidad comprobada, incluyendo sin limitarse a: Sincatex, Lino
            Oxford, Stretch, y otras telas disponibles en el catálogo del
            Taller. La disponibilidad de materiales está sujeta a existencia en
            inventario y puede variar sin previo aviso.
          </P>
          <P>
            4.2 El Cliente tiene la facultad de solicitar telas o materiales
            específicos para su confección. No obstante, la utilización de
            materiales distintos a los estándar del Taller puede implicar un
            ajuste en el precio base del servicio, el cual será comunicado al
            Cliente previo al inicio de la producción.
          </P>
          <P>
            4.3 El precio base de un uniforme universitario estándar es de
            treinta y cinco dólares (USD $35.00) e incluye, sin costo adicional:
          </P>
          <Ul
            items={[
              "a) Dos (2) bordados grandes, O",
              "b) Tres (3) bordados pequeños, O",
              "c) Una (1) sublimación de tamaño mediano.",
            ]}
          />
          <P>
            Estas inclusiones están sujetas al tipo de prenda y al diseño
            específico acordado con el Cliente.
          </P>
          <P>
            4.4 Cualquier personalización adicional fuera de lo incluido en el
            precio base —incluyendo bordados extra, sublimaciones adicionales,
            aplicación de materiales reflectivos, parches, accesorios especiales
            u otros acabados— está sujeta a evaluación y cotización por
            separado, en función del costo de los materiales y la complejidad
            del proceso requerido.
          </P>
          <P>
            4.5 El Cliente reconoce y acepta que las telas y materiales pueden
            presentar variaciones menores de tono, textura o acabado entre
            distintos lotes de producción, situación inherente a la industria
            textil que no constituye defecto de fabricación ni genera derecho a
            reclamación alguna.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Anticipo y condiciones de pago">
          <P>
            5.1 Para dar inicio a cualquier proceso de confección, es requisito
            indispensable el pago de un anticipo equivalente al veinticinco por
            ciento (25%) como mínimo y hasta el cincuenta por ciento (50%) del
            valor total del pedido, conforme lo determine el Taller según la
            naturaleza del encargo. Sin la recepción del anticipo
            correspondiente, el Taller no iniciará ningún proceso productivo
            bajo ninguna circunstancia.
          </P>
          <P>
            5.2 El anticipo podrá ser cancelado mediante transferencia bancaria,
            depósito bancario a la cuenta que se ponga a disposición, o pago en
            efectivo directamente en las instalaciones del Taller o ante el
            encargado autorizado.
          </P>
          <P>
            5.3 El anticipo pagado tiene carácter de pago parcial irrevocable y
            no reembolsable desde el momento de su recepción, conforme a lo
            establecido en la Política de Devoluciones del Taller, disponible
            en:{" "}
            <Link
              href="/legal/devoluciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/devoluciones
            </Link>
          </P>
          <P>
            5.4 El saldo restante del valor total del pedido deberá ser
            cancelado en su totalidad al momento de retirar la prenda. El Taller
            no entregará ningún producto con saldo pendiente.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Tiempos de confección y entrega">
          <P>
            6.1 El tiempo de confección es de carácter indefinido y variable. A
            modo referencial, una confección puede estar lista en un plazo de
            tres (3) a siete (7) días hábiles, pudiendo extenderse hasta
            veintidós (22) días hábiles o más, dependiendo del volumen de
            pedidos en curso, la complejidad de la prenda y la saturación
            operativa del Taller al momento del encargo.
          </P>
          <P>
            6.2 El Taller no se compromete ni garantiza un tiempo exacto de
            entrega. Todos los plazos comunicados al Cliente son de carácter
            tentativo y están sujetos a cambios sin previo aviso. El Cliente
            acepta expresamente esta condición al momento de realizar su pedido.
          </P>
          <P>
            6.3 Los períodos de mayor saturación operativa del Taller, en los
            que los tiempos de entrega pueden extenderse de forma significativa,
            corresponden a los períodos de vacaciones de interciclo
            universitario y los períodos de nuevo ingreso en las instituciones
            educativas de la región. El Cliente reconoce estas condiciones y
            acepta que durante dichos períodos los tiempos de entrega pueden
            superar los plazos referenciales indicados.
          </P>
          <P>
            6.4 El Taller no realizará devoluciones, reembolsos ni
            compensaciones por presunción de un tiempo de entrega específico, ni
            por demoras en la entrega atribuibles al volumen de producción,
            saturación operativa o cualquier otra causa no imputable a
            negligencia manifiesta del Taller. Para consultar la Política de
            Devoluciones, el Cliente deberá dirigirse a:{" "}
            <Link
              href="/legal/devoluciones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/devoluciones
            </Link>
          </P>
          <P>
            6.5 El cómputo del tiempo de confección inicia únicamente a partir
            de la recepción del anticipo correspondiente y la confirmación
            completa de todos los detalles del pedido: talla o medidas, tela,
            diseño, colores y personalizaciones. La falta de cualquiera de estos
            elementos suspende el cómputo hasta su subsanación por parte del
            Cliente.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Retiro del pedido y prendas no reclamadas">
          <P>
            7.1 Una vez que el Taller comunique al Cliente que su pedido se
            encuentra listo para retiro, el Cliente dispondrá de un plazo máximo
            e improrrogable de treinta (30) días calendario para presentarse a
            retirar la prenda y cancelar el saldo pendiente.
          </P>
          <P>
            7.2 Transcurrido el plazo de treinta (30) días calendario sin que el
            Cliente haya retirado su pedido, el Taller dará por finalizado el
            servicio y la prenda quedará disponible para su comercialización
            inmediata a terceros, sin obligación de reserva ni notificación
            adicional al Cliente.
          </P>
          <P>
            7.3 En el supuesto descrito en el numeral anterior, la prenda será
            puesta a la venta bajo precio promocional, calculado de la siguiente
            manera:
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
            A modo ilustrativo: si el valor total del uniforme es de treinta y
            cinco dólares (USD $35.00) y el Cliente pagó un anticipo de quince
            dólares (USD $15.00), la prenda será ofertada al público a un precio
            de veinte dólares (USD $20.00), a fin de recuperar la inversión en
            materiales y mano de obra realizada por el Taller.
          </P>
          <P>
            7.4 El Cliente original podrá adquirir su prenda bajo el precio
            promocional descrito, en igualdad de condiciones que cualquier otro
            comprador interesado. El Taller no garantiza la reserva de la prenda
            para el Cliente original una vez vencido el plazo de retiro.
          </P>
          <P>
            7.5 El anticipo pagado por el Cliente cuya prenda sea puesta a la
            venta por vencimiento del plazo de retiro no será reembolsado bajo
            ninguna circunstancia. El Taller se reserva el derecho total e
            irrevocable sobre dicho monto como compensación por los costos de
            producción, almacenamiento y gestión administrativa incurridos.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Descuentos, promociones y programa de referidos">
          <P>
            8.1 Los descuentos y promociones ofrecidos por Confecciones Liss son
            otorgados a entera discreción del Taller y no constituyen un derecho
            adquirido del Cliente. El Taller se reserva el derecho de modificar,
            suspender o eliminar cualquier descuento o promoción en cualquier
            momento y sin previo aviso.
          </P>
          <P>
            8.2 Las condiciones, requisitos, alcances y limitaciones de las
            promociones vigentes se encuentran detallados en la Política de
            Promociones del Taller, disponible en:{" "}
            <Link
              href="/legal/promociones"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/promociones
            </Link>
          </P>
          <P>
            8.3 Confecciones Liss cuenta con un programa de fidelización
            mediante referidos, el cual permite al Cliente acceder a beneficios
            por recomendar los servicios del Taller a nuevos clientes. Las
            reglas, condiciones, beneficios y restricciones de dicho programa se
            encuentran disponibles en:{" "}
            <Link
              href="/legal/referidos"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/referidos
            </Link>
          </P>
          <P>
            8.4 La participación en cualquier programa de descuentos,
            promociones o referidos implica la aceptación de las condiciones
            específicas publicadas en los enlaces indicados, los cuales forman
            parte integral del marco normativo comercial de Confecciones Liss.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Otras políticas aplicables">
          <P>
            9.1 La presente Política de Confección forma parte de un marco
            normativo comercial que el Cliente debe conocer en su totalidad. Las
            siguientes políticas complementan y se aplican de forma conjunta con
            la presente:
          </P>
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            •{" "}
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
              href="/legal/referidos"
              className="font-semibold text-blue-600 hover:underline"
            >
              Programa de Referidos
            </Link>
            <br />•{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              Directorio de Canales Oficiales
            </Link>
          </div>
          <P>
            9.2 El desconocimiento de cualquiera de las políticas listadas en el
            numeral anterior no exime al Cliente de su cumplimiento ni le otorga
            derechos adicionales a los expresamente reconocidos en dichas
            políticas.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Exención de responsabilidad del taller">
          <P>
            10.1 Confecciones Liss queda expresamente eximido de toda
            responsabilidad civil, comercial o de cualquier otra naturaleza,
            derivada de los siguientes supuestos, sin que esta lista sea
            limitativa:
          </P>
          <Ul
            items={[
              "a) Selección incorrecta de talla por parte del Cliente en la modalidad de confección por talla.",
              "b) Medidas incorrectas o imprecisas proporcionadas de forma remota por el Cliente.",
              "c) Demoras en la entrega derivadas del volumen de producción, saturación operativa o causas de fuerza mayor.",
              "d) Inconformidades estéticas o subjetivas sobre diseños previamente aprobados por el Cliente.",
              "e) Variaciones menores de materiales propias de la industria textil.",
              "f) Prendas no reclamadas dentro del plazo establecido en el Artículo 7.",
              "g) Pérdida del anticipo por causas atribuibles al Cliente.",
              "h) Cualquier daño directo o indirecto derivado del incumplimiento por parte del Cliente de sus obligaciones establecidas en la presente Política.",
            ]}
          />
          <P>
            10.2 La responsabilidad máxima del Taller frente al Cliente, por
            cualquier causa atribuible directamente al Taller, se limitará al
            valor de la prenda en cuestión y se resolverá exclusivamente
            mediante corrección, reelaboración o acuerdo especial a discreción
            del Taller, sin que proceda en ningún caso reembolso en efectivo.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Canales oficiales de comunicación">
          <P>
            11.1 Toda comunicación relacionada con pedidos, consultas,
            seguimiento de confección, aprobaciones de diseño o cualquier
            gestión asociada al servicio deberá realizarse exclusivamente a
            través de los canales oficiales de Confecciones Liss, disponibles
            en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
          </P>
          <P>
            11.2 Cualquier acuerdo, compromiso o gestión realizada fuera de los
            canales oficiales será considerada inválida e inoponible al Taller.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Modificaciones a la política">
          <P>
            12.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>{" "}
            La versión vigente al momento de cada pedido será la aplicable.
          </P>
          <P>
            12.2 La realización de cualquier pago o confirmación de pedido con
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
          Esta política de confección está vigente desde su publicación y
          refleja las prácticas comerciales oficiales de Confecciones Liss.
          Última actualización: Junio 2026.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
