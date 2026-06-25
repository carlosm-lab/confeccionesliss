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
  title: "Política de Derechos del Usuario y Cliente",
  description:
    "Política de derechos de Confecciones Liss: transparencia, atención al cliente, reclamaciones, rectificación de datos personales y protección del usuario.",
  keywords:
    "derechos usuario, derechos cliente, protección consumidor, reclamaciones, transparencia, Confecciones Liss, derechos El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/derechos` },
  openGraph: {
    title: "Política de Derechos del Usuario y Cliente | Confecciones Liss",
    description:
      "Política de derechos de Confecciones Liss: transparencia, atención al cliente, reclamaciones, rectificación de datos personales y protección del usuario.",
    url: `${siteConfig.url}/legal/derechos`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Derechos del Usuario y Cliente | Confecciones Liss",
    description:
      "Política de derechos de Confecciones Liss: transparencia, atención al cliente, reclamaciones, rectificación de datos personales y protección del usuario.",
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

export default function PoliticaDerechosPage() {
  const PAGE_URL = `${siteConfig.url}/legal/derechos`;
  const PAGE_TITLE = "Política de Derechos";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Derechos del Usuario y Cliente — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de derechos de Confecciones Liss: transparencia, atención al cliente, reclamaciones, rectificación de datos personales y protección del usuario.",
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
        title="Política de Derechos del Usuario y Cliente"
        category="Catálogo taxativo de derechos reconocidos al usuario y cliente de la plataforma digital de Confecciones Liss."
        date="24 Jun, 2026"
        readingTime={22}
      >
        <P>
          El presente documento establece de manera integral, taxativa y
          vinculante el catálogo de derechos que Confecciones Liss (en adelante
          &quot;el Taller&quot;) reconoce a toda persona natural que acceda,
          navegue, consulte, interactúe, solicite servicios o adquiera productos
          del Taller, ya sea en calidad de visitante, usuario de la plataforma o
          cliente con pedido en curso o completado (en adelante &quot;el
          Cliente&quot; o &quot;el Usuario&quot;, utilizados de forma indistinta
          según el contexto).
        </P>
        <P>
          Los derechos aquí reconocidos son los únicos que el Taller está
          obligado a garantizar. Ningún derecho adicional podrá ser invocado por
          el Cliente con base en usos, costumbres, expectativas, estándares de
          otros comercios, normativas de otras jurisdicciones o interpretaciones
          subjetivas que excedan lo expresamente establecido en el presente
          documento.
        </P>
        <P>
          Los derechos aquí reconocidos están condicionados al cumplimiento
          previo y concurrente de los deberes del Cliente, establecidos en la
          Política de Deberes del Usuario, disponible en:
        </P>
        <div
          style={{
            paddingLeft: "1.5rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          <Link href="/legal/deberes" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/legal/deberes
          </Link>
        </div>
        <P>
          El Cliente que no haya cumplido el deber correlativo al derecho que
          pretende ejercer no podrá invocar dicho derecho como si lo hubiera
          cumplido. El incumplimiento de deberes suspende o extingue el derecho
          correlativo, según la naturaleza y gravedad del incumplimiento.
        </P>
        <P>
          El desconocimiento de la presente Política no amplía los derechos del
          Cliente más allá de lo aquí establecido, ni le exime de los deberes
          que los condicionan.
        </P>
        <Hr />

        <Section n={1} title="Derecho a la información previa y transparente">
          <P>
            1.1 El Cliente tiene derecho a acceder de forma libre, gratuita y
            permanente a la información general sobre los productos, servicios,
            condiciones comerciales y políticas del Taller, publicada en la
            Plataforma oficial y en los Canales Oficiales disponibles en:
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
          <P>1.2 Este derecho comprende el acceso a:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) La descripción general de los productos y servicios disponibles
              en el Catálogo Digital del Taller.
            </P>
            <P>
              b) Los precios base y condiciones generales de cotización,
              conforme a la Política de Cotizaciones disponible en:{" "}
              <Link
                href="/legal/cotizaciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/cotizaciones
              </Link>
            </P>
            <P>
              c) Las políticas comerciales vigentes del Taller en su totalidad,
              disponibles en:{" "}
              <Link
                href="/legal"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal
              </Link>
            </P>
            <P>
              d) La información sobre el uso de inteligencia artificial en los
              contenidos visuales del Taller, conforme a la Política de Uso de
              Inteligencia Artificial disponible en:{" "}
              <Link
                href="/legal/ia"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/ia
              </Link>
            </P>
            <P>
              e) El directorio de Canales Oficiales a través de los cuales puede
              contactar al Taller.
            </P>
          </div>
          <P>
            1.3 El ejercicio de este derecho está condicionado al cumplimiento
            del deber de informarse establecido en el Artículo 2 de la Política
            de Deberes. El Cliente que no consulte la información disponible no
            podrá invocar la falta de información como fundamento de
            reclamación, toda vez que la información es de acceso público y
            permanente.
          </P>
          <P>
            1.4 El derecho a la información previa no obliga al Taller a
            proporcionar información personalizada, detallada o a demanda sobre
            aspectos no publicados en sus canales oficiales, salvo en los
            supuestos expresamente contemplados en la presente Política.
          </P>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Derecho a la transparencia en confección, materiales y procesos"
        >
          <P>
            2.1 El Cliente tiene derecho a recibir información veraz, suficiente
            y comprensible sobre los materiales, telas, técnicas de confección,
            métodos de personalización y procesos productivos que el Taller
            utiliza en la elaboración de sus productos, en la medida en que
            dicha información sea relevante para su pedido concreto y sea
            solicitada a través de los canales oficiales antes del inicio de la
            producción.
          </P>
          <P>
            2.2 En ejercicio de este derecho, el Cliente podrá solicitar al
            Taller:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Información sobre los tipos de tela o material disponibles para
              la confección de su prenda, incluyendo características generales
              de cada material (textura, composición aproximada, resistencia y
              cuidados básicos), dentro del conocimiento técnico que el Taller
              maneja y comunica habitualmente.
            </P>
            <P>
              b) Información sobre las técnicas de personalización disponibles
              (bordado, sublimación u otras), incluyendo sus alcances y
              limitaciones técnicas para el pedido específico.
            </P>
            <P>
              c) Información sobre las modalidades de confección disponibles
              (por talla o a la medida) y las condiciones aplicables a cada una,
              conforme a la Política de Confección disponible en:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/confeccion
              </Link>
            </P>
            <P>
              d) Muestras visuales reales sin edición de una prenda o material,
              cuando el Taller disponga de ellas y su provisión sea factible
              dentro del flujo operativo del Taller.
            </P>
          </div>
          <P>2.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) No obliga al Taller a revelar información de carácter
              confidencial, fórmulas productivas, costos de insumos, márgenes
              comerciales, relaciones con proveedores ni ningún otro dato que
              constituya secreto comercial o industrial del Taller.
            </P>
            <P>
              b) No obliga al Taller a proporcionar información técnica de nivel
              especializado que exceda el conocimiento práctico que el Taller
              comunica habitualmente a sus clientes.
            </P>
            <P>
              c) Solo es exigible con anterioridad al inicio de la producción.
              Una vez iniciado el proceso de confección sobre la base de
              especificaciones aprobadas por el Cliente, la transparencia en
              materiales y procesos no genera derecho a modificaciones gratuitas
              ni a devoluciones.
            </P>
            <P>
              d) Está condicionado al cumplimiento del deber de información
              previa y contraste establecido en los Artículos 2 y 3 de la
              Política de Deberes. El Cliente que no haya solicitado esta
              información antes de aprobar su pedido no podrá invocarla como
              fundamento de reclamación posterior.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Derecho a recibir información sobre el estado del pedido"
        >
          <P>
            3.1 El Cliente tiene derecho a solicitar información sobre el estado
            de avance de su pedido, ya sea en proceso de confección, pendiente
            de entrega o en gestión de envío, a través de los canales oficiales
            del Taller disponibles en{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/links
            </Link>
          </P>
          <P>3.2 El ejercicio de este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Solicitar al Taller una actualización razonable sobre la etapa
              productiva en la que se encuentra su pedido, una vez que haya
              transcurrido el tiempo mínimo de producción establecido conforme a
              la Política de Confección.
            </P>
            <P>
              b) Recibir confirmación del Taller cuando el pedido esté listo
              para entrega o despacho, dentro de los plazos habituales de
              comunicación del Taller.
            </P>
            <P>
              c) Ser informado, con la antelación razonable que las
              circunstancias permitan, sobre cualquier demora atribuible al
              Taller que afecte significativamente el plazo de entrega
              originalmente estimado.
            </P>
          </div>
          <P>3.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) No obliga al Taller a proporcionar actualizaciones automáticas,
              periódicas ni en tiempo real sobre el avance del pedido. El Taller
              responderá las consultas del Cliente dentro de sus horarios y
              capacidad operativa habituales.
            </P>
            <P>
              b) No genera derecho a exigir fecha exacta de entrega como
              obligación contractual, dado que los tiempos de producción son
              estimados y pueden variar por razones operativas, conforme a lo
              establecido en la Política de Confección.
            </P>
            <P>
              c) Solo es exigible si el Cliente ha cumplido sus obligaciones de
              pago y provisión de información en los términos acordados. El
              Cliente con pagos pendientes o información incompleta no podrá
              exigir actualización de estado como si hubiera cumplido.
            </P>
            <P>
              d) No obliga al Taller a responder consultas formuladas fuera de
              los canales oficiales ni fuera del horario de atención habitual.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={4}
          title="Derecho a recibir el producto conforme a lo acordado"
        >
          <P>
            4.1 El Cliente tiene derecho a recibir el producto o servicio
            confeccionado conforme a las especificaciones que fueron
            expresamente acordadas y aprobadas entre las partes con anterioridad
            al inicio de la producción.
          </P>
          <P>4.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Recibir la prenda en el modelo, color base, tipo de tela y
              modalidad de confección acordados y aprobados.
            </P>
            <P>
              b) Recibir las personalizaciones (bordados, sublimaciones u otras)
              conforme a los diseños aprobados por el Cliente antes de la
              producción.
            </P>
            <P>
              c) En la modalidad de confección a la medida, recibir una prenda
              con ajuste adecuado conforme a las medidas tomadas por el personal
              autorizado del Taller, con derecho a corrección gratuita en los
              términos establecidos en el Artículo 3 de la Política de
              Confección.
            </P>
          </div>
          <P>4.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Se circunscribe estrictamente a las especificaciones aprobadas
              por el Cliente. No ampara expectativas, preferencias ni
              interpretaciones subjetivas que excedan lo documentado y aprobado.
            </P>
            <P>
              b) No garantiza identidad exacta entre la imagen del Catálogo
              Digital y el producto físico, dado el uso de edición con IA en el
              contenido visual del Taller, conforme a lo declarado en la
              Política de Uso de Inteligencia Artificial.
            </P>
            <P>
              c) No ampara inconformidades derivadas de variaciones menores de
              tono, textura o acabado propias de la industria textil, conforme a
              lo establecido en la Política de Confección.
            </P>
            <P>
              d) No aplica en supuestos de especificaciones incorrectas,
              incompletas o no verificadas proporcionadas por el propio Cliente.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={5} title="Derecho a formular consultas y recibir atención">
          <P>
            5.1 El Cliente tiene derecho a formular consultas razonables al
            Taller sobre sus productos, servicios, políticas y condiciones
            comerciales, y a recibir atención por parte del Taller a través de
            sus canales oficiales, dentro de los horarios y capacidades
            operativas habituales.
          </P>
          <P>5.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Recibir orientación general sobre el catálogo de productos y
              servicios disponibles.
            </P>
            <P>
              b) Recibir orientación sobre las políticas del Taller aplicables a
              su caso particular.
            </P>
            <P>
              c) Recibir confirmación sobre el proceso de cotización, conforme a
              la Política de Cotizaciones del Taller.
            </P>
            <P>
              d) Ser atendido con respeto y buena fe en toda interacción con el
              Taller.
            </P>
          </div>
          <P>5.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) No obliga al Taller a garantizar tiempos de respuesta
              inmediatos. La atención se brindará dentro del horario habitual
              del Taller (Lunes a Sábado, 8:00 AM – 5:00 PM) y en orden de
              recepción.
            </P>
            <P>
              b) No obliga al Taller a proporcionar asesoría personalizada
              gratuita e ilimitada como servicio autónomo.
            </P>
            <P>
              c) Solo opera a través de los canales oficiales. Las consultas
              formuladas fuera de dichos canales no generan obligación de
              atención ni de respuesta por parte del Taller.
            </P>
            <P>
              d) No obliga al Taller a mantener abierta una negociación
              indefinida ni a modificar sus condiciones comerciales en función
              de la consulta del Cliente.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={6} title="Derecho a formular reclamaciones fundadas">
          <P>
            6.1 El Cliente tiene derecho a formular reclamaciones ante el Taller
            cuando considere que el producto o servicio recibido no se ajusta a
            las especificaciones expresamente acordadas y aprobadas entre las
            partes, siempre que dicha reclamación sea formulada dentro de los
            plazos, con la evidencia y a través de los canales establecidos en
            las políticas aplicables.
          </P>
          <P>6.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Presentar la reclamación a través de los canales oficiales del
              Taller disponibles en{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              b) Que la reclamación sea evaluada de buena fe por el Taller,
              conforme a lo establecido en sus políticas vigentes.
            </P>
            <P>
              c) Recibir una respuesta del Taller sobre el resultado de la
              evaluación dentro de un plazo razonable.
            </P>
            <P>
              d) En la modalidad de confección a la medida, exigir la corrección
              gratuita del ajuste cuando la inconformidad sea atribuible al
              proceso de toma de medidas del Taller, conforme al Artículo 3 de
              la Política de Confección.
            </P>
          </div>
          <P>6.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) No garantiza resolución favorable. El Taller evaluará la
              reclamación conforme a sus políticas y su decisión será comunicada
              al Cliente. La evaluación favorable es discrecional en los
              supuestos no cubiertos por una garantía expresa.
            </P>
            <P>
              b) No aplica a reclamaciones extemporáneas, es decir, formuladas
              fuera de los plazos establecidos en las políticas aplicables.
            </P>
            <P>
              c) No aplica a reclamaciones sin evidencia suficiente que sustente
              los argumentos expuestos.
            </P>
            <P>
              d) No aplica cuando la causa de la inconformidad es atribuible al
              propio Cliente, incluyendo especificaciones incorrectas, tallas
              mal proporcionadas, diseños mal entregados, o cualquier otro
              incumplimiento de los deberes del Cliente.
            </P>
            <P>
              e) No ampara reclamaciones basadas en diferencias entre imágenes
              del catálogo editadas con IA y el producto físico, conforme a lo
              establecido en la Política de Uso de Inteligencia Artificial.
            </P>
            <P>
              f) No genera derecho automático a devolución, reembolso ni cambio,
              los cuales se rigen exclusivamente por la Política de Devoluciones
              disponible en:{" "}
              <Link
                href="/legal/devoluciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/devoluciones
              </Link>
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={7} title="Derecho a recibir una cotización clara">
          <P>
            7.1 El Cliente tiene derecho a recibir una cotización clara que
            detalle el precio del producto o servicio solicitado, las
            condiciones de pago aplicables y los plazos estimados de producción,
            conforme a lo establecido en la Política de Cotizaciones disponible
            en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/cotizaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/cotizaciones
            </Link>
          </div>
          <P>7.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Conocer el precio total del pedido antes de confirmar la
              producción y efectuar el pago del anticipo.
            </P>
            <P>
              b) Conocer el monto del anticipo requerido para el inicio de la
              producción.
            </P>
            <P>
              c) Conocer el plazo estimado de producción y entrega para el
              pedido específico.
            </P>
          </div>
          <P>7.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) La cotización es una estimación basada en la información
              proporcionada por el Cliente al momento de solicitarla. Cambios
              posteriores en las especificaciones del pedido pueden modificar el
              precio cotizado.
            </P>
            <P>
              b) La cotización tiene vigencia limitada conforme a lo establecido
              en la Política de Cotizaciones. Transcurrido dicho plazo, el
              Cliente deberá solicitar una nueva cotización.
            </P>
            <P>
              c) El Taller no está obligado a mantener el precio cotizado ante
              variaciones significativas en el costo de materiales o por demoras
              en la confirmación atribuibles al Cliente.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={8} title="Derecho a conocer las condiciones de envío">
          <P>
            8.1 El Cliente tiene derecho a conocer, antes de confirmar su
            pedido, las condiciones, cobertura, plazos estimados y costos del
            servicio de envío aplicables a su pedido, conforme a la Política de
            Envíos disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/envios"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/envios
            </Link>
          </div>
          <P>8.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Conocer si su zona geográfica está cubierta por el servicio de
              envío del Taller.
            </P>
            <P>
              b) Conocer el costo del envío correspondiente a su pedido y
              ubicación.
            </P>
            <P>
              c) Conocer el plazo estimado de entrega desde que el pedido esté
              listo para despacho.
            </P>
          </div>
          <P>8.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Los plazos de envío son estimaciones sujetas a la
              disponibilidad y condiciones de los servicios de transporte
              utilizados por el Taller, y no constituyen garantías de entrega en
              fecha exacta.
            </P>
            <P>
              b) El Taller no asume responsabilidad por demoras atribuibles a
              terceros prestadores del servicio de transporte, conforme a lo
              establecido en la Política de Envíos.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={9}
          title="Derecho a conocer y participar en programas de beneficios"
        >
          <P>
            9.1 El Cliente tiene derecho a conocer los programas de beneficios,
            descuentos y fidelización que el Taller ofrezca de forma pública,
            incluyendo el Programa de Referidos y las Promociones Vigentes, y a
            participar en ellos conforme a las condiciones establecidas en las
            políticas específicas de cada programa.
          </P>
          <P>9.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Acceder a la información sobre el Programa de Referidos
              disponible en:{" "}
              <Link
                href="/legal/referidos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/referidos
              </Link>
            </P>
            <P>
              b) Acceder a la información sobre Promociones Vigentes disponible
              en:{" "}
              <Link
                href="/legal/promociones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/promociones
              </Link>
            </P>
            <P>
              c) Participar en dichos programas conforme a sus condiciones,
              siempre que el Cliente cumpla los requisitos establecidos.
            </P>
          </div>
          <P>9.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Los beneficios, descuentos y promociones del Taller son
              otorgados a discreción del Taller y no constituyen derechos
              adquiridos del Cliente, salvo los expresamente generados por el
              cumplimiento de los requisitos específicos del programa.
            </P>
            <P>
              b) El Taller puede modificar, suspender o cancelar cualquier
              programa de beneficios conforme a lo establecido en las políticas
              específicas de cada uno.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={10} title="Derecho a la protección de sus datos personales">
          <P>
            10.1 El Cliente tiene derecho a que sus datos personales
            proporcionados al Taller sean tratados conforme a lo establecido en
            la Política de Privacidad del Taller, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/privacidad
            </Link>
          </div>
          <P>10.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Que sus datos sean utilizados exclusivamente para los fines
              establecidos en la Política de Privacidad.
            </P>
            <P>
              b) Solicitar acceso, corrección o eliminación de sus datos
              personales conforme a los procedimientos establecidos en dicha
              Política.
            </P>
            <P>
              c) Que el Taller no comparta sus datos con terceros no
              autorizados, salvo en los supuestos establecidos en la Política de
              Privacidad.
            </P>
          </div>
          <P>
            10.3 Para el ejercicio de los derechos sobre datos personales, el
            Cliente deberá dirigirse al Taller a través de los canales oficiales
            disponibles en{" "}
            <Link
              href="/links"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/links
            </Link>
            , conforme al procedimiento detallado en la Política de Privacidad.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Derecho a un trato digno y respetuoso">
          <P>
            11.1 El Cliente tiene derecho a ser tratado con respeto, buena fe y
            consideración en toda interacción con el Taller y su personal,
            independientemente del canal utilizado.
          </P>
          <P>11.2 Este derecho comprende:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Ser atendido sin discriminación por razón de origen, género,
              condición económica u cualquier otra circunstancia ajena a la
              relación comercial.
            </P>
            <P>
              b) Recibir información sobre sus pedidos y consultas sin ser
              descalificado ni menospreciado.
            </P>
            <P>
              c) Que sus reclamaciones fundadas sean evaluadas con buena fe, con
              independencia del resultado de dicha evaluación.
            </P>
          </div>
          <P>
            11.3 Este derecho es recíproco: su ejercicio está condicionado a que
            el Cliente, a su vez, cumpla el deber de conducta diligente y buena
            fe establecido en el Artículo 12 de la Política de Deberes. El
            Cliente que incurra en conductas abusivas, amenazantes o
            irrespetuosas hacia el Taller o su personal pierde el derecho a
            invocar este artículo como fundamento de reclamación.
          </P>
        </Section>
        <Hr />

        <Section
          n={12}
          title="Derecho a conocer la naturaleza del contenido visual"
        >
          <P>
            12.1 El Cliente tiene derecho a conocer, de forma transparente, si
            el contenido visual publicado por el Taller ha sido editado mediante
            inteligencia artificial, si corresponde a un modelo humano real o al
            personaje sintético Liam Alejandro, y si el producto fotografiado es
            real y confeccionable por el Taller.
          </P>
          <P>
            12.2 Este derecho se ejerce mediante la consulta de la Política de
            Uso de Inteligencia Artificial, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/legal/ia" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal/ia
            </Link>
          </div>
          <P>
            y mediante consulta directa al Taller a través de sus canales
            oficiales.
          </P>
          <P>12.3 Este derecho tiene los siguientes límites expresos:</P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El Taller no está obligado a incluir aviso individualizado en
              cada imagen específica sobre el uso de IA, dado que la Política de
              Uso de Inteligencia Artificial constituye la divulgación general y
              suficiente al respecto.
            </P>
            <P>
              b) El ejercicio de este derecho no genera, por sí mismo, derechos
              de devolución, reembolso ni modificación del pedido, salvo que la
              consulta revele una discrepancia esencial entre el producto
              publicado y el producto confeccionable por el Taller.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={13} title="Naturaleza taxativa de los derechos reconocidos">
          <P>
            13.1 El catálogo de derechos establecido en la presente Política es
            taxativo. El Cliente no podrá invocar derechos que no estén
            expresamente reconocidos en el presente documento o en alguna otra
            política vigente del Taller, con independencia de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Derechos reconocidos por legislación de protección al
              consumidor de otras jurisdicciones distintas a El Salvador.
            </P>
            <P>
              b) Estándares, prácticas o condiciones ofrecidas por otros
              comercios o talleres del sector.
            </P>
            <P>
              c) Compromisos verbales, informales o extraoficiales que no hayan
              sido confirmados por escrito a través de los canales oficiales del
              Taller.
            </P>
            <P>
              d) Expectativas subjetivas del Cliente no documentadas en el
              pedido.
            </P>
            <P>
              e) Versiones anteriores de las políticas del Taller ya
              actualizadas.
            </P>
          </div>
          <P>
            13.2 La presente Política no crea ni amplía derechos más allá de lo
            expresamente establecido en ella. Cualquier interpretación extensiva
            o analógica de los derechos aquí reconocidos, que pretenda ampliar
            su alcance más allá del texto expreso, es inválida e inoponible al
            Taller.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Vínculo indisoluble con la Política de Deberes">
          <P>
            14.1 Los derechos reconocidos en la presente Política y los deberes
            establecidos en la Política de Deberes del Usuario constituyen un
            sistema normativo unitario e indivisible. Ningún derecho puede ser
            ejercido de forma aislada del cumplimiento del deber que lo
            condiciona.
          </P>
          <P>
            14.2 El siguiente cuadro ilustra, de forma no limitativa, la
            correspondencia entre derechos y deberes:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              marginBottom: "0.75rem",
              fontFamily: "monospace",
              fontSize: "0.85em",
              display: "flex",
              flexDirection: "column",
              gap: "0.3rem",
            }}
          >
            <div
              style={{
                borderBottom: "1px solid #ccc",
                paddingBottom: "0.3rem",
                fontWeight: "bold",
              }}
            >
              DERECHO — DEBER CORRELATIVO
            </div>
            <div>
              Derecho a la información previa — Deber de informarse (Art. 2)
            </div>
            <div>
              Derecho a transparencia en materiales — Deber de contraste (Art.
              3)
            </div>
            <div>
              Derecho al estado del pedido — Deber de pago oportuno (Art. 5)
            </div>
            <div>
              Derecho a recibir lo acordado — Deber de información exacta (Art.
              4)
            </div>
            <div>
              Derecho a formular reclamaciones — Deber de reclamar con base en
              las políticas (Art. 7)
            </div>
            <div>Derecho a trato digno — Deber de buena fe (Art. 12)</div>
            <div>
              Derecho a cotización clara — Deber de proporcionar información
              completa (Art. 4)
            </div>
          </div>
          <P>
            14.3 Para consultar la totalidad de los deberes del Cliente, el
            Usuario deberá dirigirse a:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/deberes"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/deberes
            </Link>
          </div>
        </Section>
        <Hr />

        <Section n={15} title="Resolución de disputas y jurisdicción aplicable">
          <P>
            15.1 Toda controversia sobre el reconocimiento, alcance o ejercicio
            de los derechos establecidos en la presente Política se resolverá en
            primera instancia mediante comunicación directa de buena fe entre el
            Cliente y el Taller, a través de los canales oficiales disponibles
            en:
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
            15.2 De no alcanzarse un acuerdo, la controversia se someterá a la
            jurisdicción exclusiva de los tribunales competentes de la República
            de El Salvador, aplicando la legislación salvadoreña vigente.
          </P>
          <P>
            15.3 El Cliente renuncia expresamente a cualquier otro fuero o
            jurisdicción que pudiera corresponderle, con independencia de su
            lugar de residencia o domicilio.
          </P>
        </Section>
        <Hr />

        <Section n={16} title="Modificaciones a la Política">
          <P>
            16.1 Confecciones Liss se reserva el derecho de modificar,
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
            16.2 Las modificaciones entrarán en vigencia de forma inmediata
            desde su publicación. El acceso continuado a cualquier canal oficial
            del Taller con posterioridad a la publicación de cualquier
            modificación constituirá aceptación automática e irrevocable de la
            versión actualizada.
          </P>
          <P>
            16.3 Las modificaciones no afectarán los derechos ya generados y en
            curso de ejercicio al momento de la modificación, siempre que el
            Cliente haya iniciado oportunamente el procedimiento
            correspondiente.
          </P>
        </Section>
        <Hr />

        <LegalFootnote>
          <strong>CONFECCIONES LISS — CONTACTO OFICIAL</strong>
          <br />
          Toda gestión exclusivamente a través de:{" "}
          <Link href="/links" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/links
          </Link>
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
          </Link>
          <br />
          Política de Confección:{" "}
          <Link
            href="/legal/confeccion"
            className="text-blue-600 hover:underline"
          >
            /legal/confeccion
          </Link>{" "}
          · Política de Cotizaciones:{" "}
          <Link
            href="/legal/cotizaciones"
            className="text-blue-600 hover:underline"
          >
            /legal/cotizaciones
          </Link>{" "}
          · Política de Envíos:{" "}
          <Link href="/legal/envios" className="text-blue-600 hover:underline">
            /legal/envios
          </Link>
          <br />
          Política de Deberes:{" "}
          <Link href="/legal/deberes" className="text-blue-600 hover:underline">
            /legal/deberes
          </Link>{" "}
          · Política de IA:{" "}
          <Link href="/legal/ia" className="text-blue-600 hover:underline">
            /legal/ia
          </Link>
          <br />
          Dirección: Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur, Casa
          #402, San Miguel, El Salvador.
          <br />
          Horario: Lunes a Sábado, 8:00 AM – 5:00 PM
          <br />
          Encargado de Comunicaciones: Carlos José Molina Villacorta
          <br />
          Vigente desde su publicación — Versión: Junio 2026
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
