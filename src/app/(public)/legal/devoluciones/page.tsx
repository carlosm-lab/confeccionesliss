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
  title: "Política de Devoluciones y Reclamaciones Liss",
  description:
    "Política oficial de devoluciones de Confecciones Liss: reglas de anticipos, reclamaciones y reembolsos. Sin devolución ni cambio en prendas personalizadas.",
  keywords:
    "política devoluciones, no devolución prendas, anticipos uniformes, reclamaciones, política cambios, Confecciones Liss El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/devoluciones` },
  openGraph: {
    title: "Política de Devoluciones y Reclamaciones Liss | Confecciones Liss",
    description:
      "Política oficial de devoluciones de Confecciones Liss: reglas de anticipos, reclamaciones y reembolsos. Sin devolución ni cambio en prendas personalizadas.",
    url: `${siteConfig.url}/legal/devoluciones`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Devoluciones y Reclamaciones Liss | Confecciones Liss",
    description:
      "Política oficial de devoluciones de Confecciones Liss: reglas de anticipos, reclamaciones y reembolsos. Sin devolución ni cambio en prendas personalizadas.",
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

export default function PoliticaDevolucionesPage() {
  const PAGE_URL = `${siteConfig.url}/legal/devoluciones`;
  const PAGE_TITLE = "Política de Devoluciones";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Devoluciones y Reclamaciones Liss | Confecciones Liss",
          description:
            "Política oficial de devoluciones de Confecciones Liss: reglas de anticipos, reclamaciones y reembolsos. Sin devolución ni cambio en prendas personalizadas.",
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
        title="Política de Devoluciones"
        category="Regulación de anticipos, cancelaciones y condiciones de reembolso aplicables a la confección de prendas."
        date="24 Jun, 2026"
        readingTime={12}
      >
        <P>
          La presente Política de Devoluciones (en adelante &quot;la
          Política&quot;) regula de manera integral, clara y vinculante la
          posición oficial de Confecciones Liss (en adelante &quot;el
          Taller&quot;) respecto a solicitudes de devolución, reembolso o
          reversión de pagos por parte de cualquier persona natural o jurídica
          (en adelante &quot;el Cliente&quot;) que haya adquirido, reservado o
          encargado productos o servicios al Taller. La solicitud de cualquier
          producto o servicio al Taller, así como la realización de cualquier
          pago, anticipo o depósito, implica el conocimiento pleno y la
          aceptación incondicional e irrevocable de todos los términos aquí
          establecidos. El desconocimiento de esta Política no exime al Cliente
          de su cumplimiento ni le otorga derecho a devolución alguna.
        </P>
        <Hr />

        <Section n={1} title="Principio general: no devoluciones ni cambios">
          <P>
            1.1 Confecciones Liss opera bajo una política de NO DEVOLUCIÓN ni de
            CAMBIO de carácter absoluto, general e irrestricto. El Taller no
            realiza devoluciones ni cambios de ningún tipo, bajo ninguna
            circunstancia, modalidad, argumento ni excepción, salvo lo dispuesto
            expresamente en el Artículo 6 de la presente Política.
          </P>
          <P>
            1.2 Esta política aplica a la totalidad de productos, servicios y
            procesos ofrecidos por el Taller, incluyendo sin limitarse a:
            confección de prendas a medida, uniformes institucionales, prendas
            corporativas, ropa deportiva, bordados, sublimación, personalización
            de prendas, y cualquier otro producto o servicio disponible en el
            catálogo de Confecciones Liss.
          </P>
          <P>
            1.3 La naturaleza personalizada, a pedido y a medida de los
            productos confeccionados por el Taller hace imposible su devolución,
            reventa o reutilización para otros clientes, lo que justifica plena
            y razonablemente la aplicación de esta política sin excepciones.
          </P>
          <P>
            1.4 El Cliente, al realizar cualquier pago, anticipo, depósito o
            confirmación de pedido, declara haber leído, comprendido y aceptado
            de forma libre, voluntaria e informada la presente Política,
            renunciando expresamente a cualquier reclamación de devolución,
            reembolso o reversión de pago posterior a dicha aceptación.
          </P>
          <InfoBox
            type="amber"
            title="Cláusula especial sobre cambios de prenda:"
          >
            1.5 De la misma manera, Confecciones Liss no acepta cambios de
            prendas, modelos, diseños ni tallas una vez que la producción ha
            sido iniciada o que el producto ha sido entregado, debido a la
            naturaleza personalizada y a la medida de la confección. El Cliente
            asume la responsabilidad de validar todas las especificaciones
            (incluyendo tallas y colores) antes de autorizar la producción.
          </InfoBox>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Naturaleza del anticipo y su carácter no reembolsable"
        >
          <P>
            2.1 Para reservar, apartar o iniciar la confección de cualquier
            prenda o producto, el Taller requiere el pago de un anticipo
            equivalente al veinticinco por ciento (25%) como mínimo y hasta el
            cincuenta por ciento (50%) del valor total del pedido, conforme a lo
            que el Taller determine según el tipo, complejidad y volumen del
            encargo.
          </P>
          <P>
            2.2 El anticipo podrá ser cancelado a través de los siguientes
            medios de pago:
          </P>
          <Ul
            items={[
              "a) Transferencia bancaria a la cuenta del encargado de comunicaciones.",
              "b) Depósito bancario a la cuenta del encargado de comunicaciones.",
              "c) Pago en efectivo directamente en las instalaciones del Taller o ante el encargado autorizado.",
            ]}
          />
          <P>
            2.3 El anticipo pagado por el Cliente tiene carácter de pago parcial
            por el servicio contratado y no constituye en ningún caso un
            depósito en garantía ni un pago sujeto a condición resolutoria.
            Desde el momento en que el anticipo es recibido por el Taller, este
            se integra al valor total del servicio prestado y se considera
            devengado de forma inmediata e irrevocable.
          </P>
          <P>
            2.4 En consecuencia, el anticipo pagado no es reembolsable bajo
            ninguna circunstancia, incluyendo sin limitarse a: desistimiento
            voluntario del Cliente, cambio de parecer, inconformidad con el
            diseño previamente aprobado, modificaciones solicitadas por el
            Cliente, o cualquier otra causa atribuible al Cliente o a terceros
            ajenos al Taller.
          </P>
          <P>
            2.5 El Cliente es el único y exclusivo responsable de completar el
            pago total del pedido conforme a las condiciones acordadas. La falta
            de pago del saldo restante no otorga al Cliente derecho alguno sobre
            el anticipo ya entregado, ni genera obligación para el Taller de
            devolver dicho monto.
          </P>
          <P>
            2.6 Para información detallada sobre las condiciones de confección,
            reserva de pedidos, procesos de aprobación y acuerdos especiales, el
            Cliente deberá consultar la Política de Confección del Taller
            disponible en:{" "}
            <Link
              href="/legal/confeccion"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/confeccion
            </Link>
          </P>
        </Section>
        <Hr />

        <Section n={3} title="No reembolso por inconformidad">
          <P>
            3.1 En caso de que el Cliente manifieste inconformidad con el
            producto recibido por razones subjetivas, estéticas o de preferencia
            personal, el Taller no realizará devolución alguna del valor pagado,
            ni total ni parcial. La conformidad con el diseño, color, modelo,
            tela y especificaciones es responsabilidad del Cliente, quien debió
            validarlas y aprobarlas antes del inicio de la producción.
          </P>
          <P>
            3.2 Toda inconformidad derivada de especificaciones incorrectas,
            incompletas o no validadas oportunamente por el Cliente es de
            responsabilidad exclusiva de este último y no genera derecho a
            devolución ni compensación por parte del Taller.
          </P>
          <P>
            3.3 Las variaciones menores de tonalidad, textura o acabado de
            materiales propias de los procesos de producción textil no
            constituyen defecto de fabricación y, en consecuencia, no generan
            derecho a devolución ni reclamación alguna.
          </P>
          <P>
            3.4 Confecciones Liss queda expresamente eximido de toda
            responsabilidad económica frente al Cliente por conceptos de
            inconformidad subjetiva, expectativas no documentadas, o cualquier
            percepción del Cliente que no esté respaldada en especificaciones
            escritas y aprobadas previamente.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="No reembolso por pagos ya realizados">
          <P>
            4.1 Todo pago realizado al Taller, ya sea anticipo, abono parcial o
            pago total, se considera definitivo, firme e irrevocable desde el
            momento de su recepción. Ningún pago realizado al Taller está sujeto
            a devolución, reversión, contracargo ni reembolso bajo ningún
            concepto.
          </P>
          <P>
            4.2 El Cliente renuncia expresamente, desde el momento en que
            realiza cualquier pago al Taller, a iniciar procesos de contracargo,
            reversión de transacción o reclamación ante entidades financieras o
            bancarias, basados en argumentos de disconformidad con el servicio o
            desistimiento voluntario. En caso de que el Cliente inicie dichos
            procesos de manera unilateral e infundada, el Taller se reserva el
            derecho de ejercer las acciones legales correspondientes para la
            recuperación de los montos retenidos o revertidos.
          </P>
          <P>
            4.3 El pago de un anticipo no garantiza al Cliente el derecho de
            cancelar el pedido con reembolso. La cancelación del pedido por
            cualquier causa atribuible al Cliente resulta en la pérdida total
            del anticipo pagado, el cual queda en beneficio del Taller como
            compensación por los costos administrativos, de materiales y de mano
            de obra ya incurridos.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Exención de responsabilidad del taller">
          <P>
            5.1 Confecciones Liss queda expresamente eximido de cualquier
            responsabilidad civil, comercial o de cualquier otra naturaleza,
            derivada de reclamaciones de devolución presentadas por el Cliente,
            en los siguientes supuestos, sin que esta lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) Desistimiento voluntario del Cliente en cualquier etapa del proceso.",
              "b) Inconformidad con el producto derivada de especificaciones no validadas.",
              "c) Cambios de diseño, modelo o talla solicitados por el Cliente después de iniciada la producción.",
              "d) Tallas incorrectas proporcionadas por el Cliente.",
              "e) Errores en diseños, logos o textos proporcionados por el Cliente.",
              "f) Demoras en la entrega atribuibles a terceros o causas de fuerza mayor.",
              "g) Variaciones menores de materiales propias de la industria textil.",
              "h) Cualquier causa no atribuible directamente a un defecto de fabricación comprobable del Taller.",
            ]}
          />
          <P>
            5.2 La responsabilidad máxima de Confecciones Liss frente al
            Cliente, por cualquier causa, queda limitada exclusivamente a lo
            estipulado en el Artículo 6 de la presente Política, y en ningún
            caso incluirá daños indirectos, lucro cesante, daño emergente, daño
            moral ni cualquier otro perjuicio consecuencial.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Único supuesto de atención especial">
          <P>
            6.1 Sin perjuicio del principio general establecido en el Artículo
            1, Confecciones Liss podrá, a su entera discreción y como acto de
            buena voluntad comercial, evaluar casos específicos que el Cliente
            considere excepcionales, relacionados únicamente con defectos de
            fabricación directamente atribuibles al Taller y debidamente
            comprobados mediante evidencia documental suficiente.
          </P>
          <P>
            6.2 La evaluación de dichos casos no implica obligación alguna de
            resolución favorable para el Cliente, ni constituye reconocimiento
            de responsabilidad por parte del Taller. La decisión final sobre
            cualquier acuerdo especial corresponde exclusivamente a Confecciones
            Liss.
          </P>
          <P>
            6.3 Las condiciones, alcances y procedimientos aplicables a
            cualquier acuerdo especial que pudiera derivarse de dicha evaluación
            se encuentran detallados en la Política de Confección del Taller,
            disponible en:{" "}
            <Link
              href="/legal/confeccion"
              className="font-semibold text-blue-600 hover:underline"
            >
              /legal/confeccion
            </Link>
          </P>
          <P>
            6.4 El Cliente interesado en explorar un acuerdo especial deberá
            comunicarse a través de los canales oficiales del Taller,
            disponibles en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>{" "}
            presentando evidencia clara, objetiva y verificable que sustente su
            solicitud. Sin dicha evidencia, ninguna solicitud será admitida ni
            evaluada.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Canales oficiales de comunicación">
          <P>
            7.1 Toda comunicación relacionada con esta Política, incluyendo
            consultas, reclamaciones o solicitudes de evaluación especial,
            deberá realizarse exclusivamente a través de los canales oficiales
            de Confecciones Liss, disponibles en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>
          </P>
          <P>
            7.2 Cualquier gestión o reclamación realizada fuera de los canales
            oficiales será considerada inválida e inoponible al Taller.
            Confecciones Liss no asume responsabilidad por comunicaciones
            realizadas a través de canales no oficiales, personas no autorizadas
            o plataformas no verificadas.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Modificaciones a la política">
          <P>
            8.1 Confecciones Liss se reserva el derecho de modificar, actualizar
            o ampliar la presente Política en cualquier momento y sin previo
            aviso, publicando la versión actualizada en:{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              /links
            </Link>{" "}
            La versión vigente al momento de cada transacción será la aplicable.
          </P>
          <P>
            8.2 La realización de cualquier pago o confirmación de pedido con
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
          Esta política de devoluciones y cambios está vigente desde su
          publicación y refleja las prácticas comerciales oficiales de
          Confecciones Liss. Última actualización: Junio 2026.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
