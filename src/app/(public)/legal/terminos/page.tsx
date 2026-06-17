import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import {
  Section,
  Hr,
  InfoBox,
  P,
  Ul,
  LegalFootnote,
} from "@/components/legal/LegalContent";

export const metadata: Metadata = {
  title: "Términos y Condiciones del Servicio en Línea",
  description:
    "Términos y condiciones de uso de Confecciones Liss. Lee sobre los derechos del usuario, responsabilidades y las reglas vigentes del servicio en línea.",
  alternates: { canonical: `${siteConfig.url}/legal/terminos` },
};

export default function TerminosPage() {
  const PAGE_URL = `${siteConfig.url}/legal/terminos`;
  const PAGE_TITLE = "Términos y Condiciones de Uso";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Términos y Condiciones del Servicio en Línea | Confecciones Liss",
          description:
            "Términos y condiciones de uso de Confecciones Liss. Lee sobre los derechos del usuario, responsabilidades y las reglas vigentes del servicio en línea.",
        }),
        "@type": "Article",
        author: { "@id": `${siteConfig.url}/#business` },
        datePublished: "2025-06-15",
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
      <LegalArticleReader
        title="Términos y Condiciones de Uso"
        date="15 Jun, 2025"
        readingTime={16}
      >
        <Section n={1} title="Aceptación de los términos">
          <P>
            Al acceder, navegar o utilizar de cualquier manera la plataforma web
            de Confecciones Liss, usted declara haber leído, comprendido y
            aceptado en su totalidad los presentes Términos y Condiciones de
            Uso. Esta aceptación es inmediata y automática desde el momento en
            que accede a cualquier página de la plataforma, independientemente
            de si ha creado una cuenta o si navega como visitante anónimo.
          </P>
          <P>
            Estos términos constituyen un acuerdo legalmente vinculante entre
            usted y Confecciones Liss, regido por la legislación de la República
            de El Salvador. Cualquier uso continuado de la plataforma después de
            la publicación de modificaciones a estos términos constituirá
            aceptación tácita de dichas modificaciones.
          </P>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Descripción del servicio y naturaleza de la plataforma"
        >
          <P>
            Confecciones Liss opera como una plataforma de catálogo y confección
            de prendas en línea cuyo propósito es exhibir productos disponibles
            y facilitar el contacto entre compradores y la administración del
            negocio. La plataforma no gestiona inventario en tiempo real, no
            garantiza disponibilidad inmediata de ningún producto, y no
            constituye por sí misma un contrato de compraventa.
          </P>
          <P>
            Todo el proceso de compra — desde la confirmación de disponibilidad
            hasta el acuerdo sobre los detalles de la transacción — se realiza
            directamente entre el comprador y la administración a través de
            WhatsApp u otros canales de comunicación directa. La plataforma web
            actúa únicamente como puente inicial que facilita ese contacto.
          </P>
          <P>
            El operador se reserva el derecho de modificar, suspender,
            interrumpir o discontinuar el servicio en cualquier momento, sin que
            esto genere obligación de compensación o responsabilidad hacia los
            usuarios.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Elegibilidad y capacidad legal">
          <P>
            Para utilizar los servicios de esta plataforma usted declara tener
            al menos dieciocho años de edad o la mayoría de edad legal en su
            jurisdicción, y tener plena capacidad legal para celebrar contratos.
            Si es menor de edad, solo puede utilizar la plataforma bajo
            supervisión directa de su padre, madre o tutor legal, quien asume
            plena responsabilidad por cualquier interacción.
          </P>
          <P>
            Al crear una cuenta mediante Google OAuth, usted garantiza que la
            cuenta de Google le pertenece y tiene autorización para acceder a
            ella. No está permitido crear cuentas ficticias ni utilizar
            mecanismos automatizados para crear múltiples cuentas.
          </P>
        </Section>
        <Hr />

        <Section
          n={4}
          title="Cuentas de usuario y responsabilidades del titular"
        >
          <P>
            Al crear una cuenta mediante Google OAuth, el usuario se convierte
            en el único responsable de toda la actividad realizada bajo su
            cuenta, incluyendo todas las comunicaciones enviadas a través del
            formulario de contacto y cualquier otra interacción con el sistema.
            Se compromete a notificar inmediatamente a la administración si
            sospecha que su cuenta ha sido accedida por un tercero no
            autorizado.
          </P>
          <P>
            El usuario se compromete a utilizar su cuenta únicamente para los
            fines legítimos previstos por la plataforma. El incumplimiento puede
            resultar en la suspensión de la cuenta sin previo aviso y sin
            derecho a compensación.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Conducta del usuario y usos prohibidos">
          <P>
            El usuario se compromete a utilizar la plataforma de conformidad con
            estos términos y con la legislación salvadoreña aplicable. Está
            expresamente prohibido:
          </P>
          <Ul
            items={[
              "Intentar acceder a áreas restringidas de la plataforma o a cuentas de otros usuarios mediante técnicas de fuerza bruta, ingeniería social o explotación de vulnerabilidades.",
              "Enviar contenido fraudulento, engañoso, abusivo, difamatorio, obsceno o inapropiado a través del formulario de contacto.",
              "Utilizar sistemas automatizados, robots, scrapers o herramientas de extracción masiva de datos del catálogo.",
              "Interferir con el funcionamiento normal de la plataforma mediante ataques de denegación de servicio, inyección de código malicioso o manipulación de solicitudes HTTP.",
              "Utilizar la plataforma para enviar comunicaciones comerciales no solicitadas o spam.",
              "Reproducir, distribuir o modificar el contenido de la plataforma sin autorización expresa y escrita del operador.",
            ]}
          />
        </Section>
        <Hr />

        <Section
          n={6}
          title="Propiedad intelectual y contenido de la plataforma"
        >
          <P>
            Todo el contenido de la plataforma — textos, fotografías de
            productos, logotipos, diseños, código fuente, estructura de
            navegación y cualquier otro elemento protegible — es propiedad del
            operador o ha sido licenciado por sus legítimos titulares. Ningún
            elemento puede ser copiado, reproducido, distribuido, publicado o
            utilizado de ninguna manera sin el consentimiento previo y expreso
            por escrito del operador.
          </P>
          <P>
            El usuario obtiene únicamente una licencia limitada, personal, no
            exclusiva, no transferible y revocable para visualizar el contenido
            de la plataforma con el único propósito de explorar el catálogo y
            generar pedidos según el flujo normal de uso previsto. Esta licencia
            no incluye ningún derecho a descargar, redistribuir ni comercializar
            el contenido.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Exoneración de responsabilidad por el contenido del catálogo"
        >
          <P>
            El operador realiza sus mejores esfuerzos para mantener la
            información del catálogo actualizada y precisa, pero no garantiza la
            exactitud, completitud o idoneidad de la información presentada. Las
            fotografías de los productos son representativas y pueden diferir
            del producto real en aspectos como el color, dimensiones o acabado.
            Las descripciones son meramente informativas y no constituyen
            especificaciones técnicas garantizadas.
          </P>
          <P>
            El usuario asume la plena responsabilidad de verificar las
            características del producto directamente con la administración
            antes de proceder con cualquier adquisición.
          </P>
        </Section>
        <Hr />

        <Section
          n={8}
          title="Limitación de responsabilidad del operador de la plataforma"
        >
          <P>
            En la máxima medida permitida por la legislación salvadoreña
            aplicable, el operador de la plataforma queda exonerado de toda
            responsabilidad por daños directos, indirectos, incidentales o
            consecuentes que resulten de: el uso o la imposibilidad de uso de la
            plataforma; errores u omisiones en el contenido del catálogo; fallos
            técnicos o interrupciones del servicio; transacciones realizadas
            entre el comprador y el negocio fuera de la plataforma; o conducta
            de otros usuarios de la plataforma.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Exoneración de responsabilidad del desarrollador">
          <P>
            El desarrollador del sistema actúa en calidad de prestador de
            servicios técnicos y no tiene participación en las decisiones
            comerciales del negocio, en la gestión del inventario, ni en ningún
            otro aspecto operativo de Confecciones Liss. El usuario reconoce que
            el desarrollador es un tercero ajeno a cualquier relación comercial
            entre el usuario y el negocio, y renuncia expresamente a cualquier
            reclamación contra el desarrollador.
          </P>
        </Section>
        <Hr />

        <Section
          n={10}
          title="Servicios de terceros e infraestructura tecnológica"
        >
          <P>
            La plataforma utiliza servicios de terceros:{" "}
            <strong>Supabase</strong> (base de datos y autenticación),{" "}
            <strong>Vercel</strong> (alojamiento y distribución de contenido),{" "}
            <strong>Google</strong> (autenticación OAuth), y{" "}
            <strong>Meta Platforms/WhatsApp</strong> (comunicación entre usuario
            y negocio). El operador no tiene control sobre estos servicios y no
            asume responsabilidad por sus interrupciones, cambios de política o
            cualquier otro aspecto de su operación.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Indemnización por parte del usuario">
          <P>
            El usuario se compromete a indemnizar y mantener indemne al operador
            de la plataforma y al desarrollador del sistema frente a cualquier
            reclamación, pérdida, costo o gasto que resulte del incumplimiento
            de estos términos, el uso indebido de la plataforma, la violación de
            leyes aplicables, la infracción de derechos de terceros, o cualquier
            contenido enviado por el usuario a través de la plataforma.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Modificaciones a los términos y condiciones">
          <P>
            El operador se reserva el derecho de modificar, actualizar o
            reemplazar los presentes términos en cualquier momento y sin
            necesidad de notificación previa individual. Las modificaciones
            entrarán en vigencia inmediatamente después de su publicación. El
            uso continuado de la plataforma después de cualquier modificación
            constituirá aceptación automática de los nuevos términos.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Suspensión y terminación del servicio">
          <P>
            El operador se reserva el derecho de suspender o terminar el acceso
            de cualquier usuario a la plataforma, con o sin previo aviso, por
            cualquier razón que considere suficiente, incluyendo el
            incumplimiento de estos términos. La suspensión o terminación no
            genera derecho a compensación o indemnización de ningún tipo.
          </P>
          <P>
            El operador también puede discontinuar permanentemente la operación
            de la plataforma en cualquier momento sin que esto genere obligación
            de compensación. Los usuarios no tienen ningún derecho adquirido
            sobre la disponibilidad continua del servicio.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Resolución de disputas y jurisdicción aplicable">
          <P>
            Cualquier disputa que surja de estos términos o del uso de la
            plataforma se resolverá en primera instancia mediante negociación
            directa de buena fe. Si no se alcanza un acuerdo en un plazo
            razonable, la disputa se someterá a la jurisdicción exclusiva de los
            tribunales competentes de la República de El Salvador, aplicando la
            legislación salvadoreña vigente.
          </P>
        </Section>
        <Hr />

        <Section n={15} title="Divisibilidad y acuerdo completo">
          <P>
            Si alguna disposición de estos términos fuera declarada inválida o
            inaplicable por un tribunal competente, las restantes disposiciones
            continuarán en plena vigencia y efecto. Estos términos constituyen
            el acuerdo completo entre el usuario y el operador con respecto al
            uso de la plataforma y sustituyen a cualquier acuerdo anterior sobre
            el mismo objeto.
          </P>
        </Section>

        <LegalFootnote>
          Estos Términos y Condiciones están vigentes desde su publicación y
          reflejan las condiciones de uso de la versión actual de la plataforma
          Confecciones Liss. Última actualización: Junio 2025.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
