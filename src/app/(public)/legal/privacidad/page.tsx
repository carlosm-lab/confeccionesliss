import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import {
  Section,
  Hr,
  InfoBox,
  P,
  H3,
  LegalFootnote,
} from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Privacidad y Protección de Datos",
  description:
    "Política oficial de privacidad de Confecciones Liss: recopilación, uso y seguridad de datos personales, y ejercicio de derechos de acceso y rectificación.",
  keywords:
    "política de privacidad, protección de datos, datos personales, RGPD, derechos usuario, privacidad El Salvador, Confecciones Liss",
  alternates: { canonical: `${siteConfig.url}/legal/privacidad` },
  openGraph: {
    title: "Política de Privacidad y Protección de Datos | Confecciones Liss",
    description:
      "Política oficial de privacidad de Confecciones Liss: recopilación, uso y seguridad de datos personales, y ejercicio de derechos de acceso y rectificación.",
    url: `${siteConfig.url}/legal/privacidad`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Privacidad y Protección de Datos | Confecciones Liss",
    description:
      "Política oficial de privacidad de Confecciones Liss: recopilación, uso y seguridad de datos personales, y ejercicio de derechos de acceso y rectificación.",
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

export default function PrivacidadPage() {
  const PAGE_URL = `${siteConfig.url}/legal/privacidad`;
  const PAGE_TITLE = "Política de Privacidad";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Privacidad y Protección de Datos | Confecciones Liss",
          description:
            "Política oficial de privacidad de Confecciones Liss: recopilación, uso y seguridad de datos personales, y ejercicio de derechos de acceso y rectificación.",
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
      {/* Hub background — only shown on desktop where the blur overlay exists.
          aria-hidden + pointer-events-none → invisible to screen readers and
          mouse clicks; purely visual behind the LegalArticleReader modal.  */}
      <div
        aria-hidden="true"
        className="pointer-events-none hidden select-none lg:block"
      >
        <LegalHubBackground animated={false} />
      </div>

      <LegalArticleReader
        title="Política de Privacidad"
        category="Regulación sobre cómo recopilamos, usamos, almacenamos y protegemos tus datos personales y privacidad."
        date="15 Jun, 2025"
        readingTime={14}
      >
        <Section n={1} title="Introducción y ámbito de aplicación">
          <P>
            Confecciones Liss es un servicio de catálogo y confección de prendas
            en línea operado desde El Salvador, que permite a sus visitantes
            explorar productos, guardar favoritos y comunicarse con la
            administración del negocio a través del formulario de contacto
            integrado en la plataforma. Esta política describe de manera
            exhaustiva qué información recopila el servicio, cómo la utiliza,
            dónde la almacena, durante cuánto tiempo la conserva, con qué
            terceros la comparte, y qué derechos tiene usted como usuario sobre
            sus propios datos.
          </P>
          <P>
            Al utilizar este servicio usted acepta las prácticas descritas en
            este documento. Si no está de acuerdo con alguna de ellas, le
            recomendamos no utilizar las funcionalidades que impliquen la
            recopilación de datos personales. Las funcionalidades de navegación
            y visualización del catálogo están disponibles sin necesidad de
            proporcionar ningún dato personal.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Responsable del tratamiento de datos">
          <P>
            El responsable del tratamiento de los datos personales recopilados a
            través de esta plataforma es Confecciones Liss, negocio de
            confección y venta de prendas operado en El Salvador. Las consultas
            relacionadas con el tratamiento de datos personales pueden dirigirse
            a través del formulario de contacto disponible en la plataforma o
            mediante el número de WhatsApp habilitado para comunicación
            comercial.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Qué información recopilamos y cómo">
          <H3>Información que usted nos proporciona directamente</H3>
          <P>
            La plataforma recopila información en tres contextos: el proceso de
            creación de cuenta mediante Google OAuth (nombre completo, correo
            electrónico y foto de perfil), el formulario de contacto (nombre,
            correo, asunto y mensaje), y cualquier nota personalizada que
            agregue al añadir un producto al carrito.
          </P>

          <H3>Información generada por su actividad en la plataforma</H3>
          <P>
            Cuando interactúa con la plataforma, el sistema genera y almacena
            información derivada: ítems del carrito en localStorage
            sincronizados con la base de datos si hay sesión activa, favoritos
            asociados a su cuenta, y marcas de tiempo de última modificación.
          </P>

          <H3>Información técnica recopilada automáticamente</H3>
          <P>
            El servicio utiliza Supabase como proveedor de base de datos y
            autenticación. Como parte de su funcionamiento normal, se registran
            datos técnicos de conexión incluyendo direcciones IP y marcas de
            tiempo, gestionados por Supabase según sus propias políticas.
          </P>

          <H3>Información que no recopilamos</H3>
          <InfoBox type="green">
            Esta plataforma no recopila datos de pago de ningún tipo. No
            almacena números de tarjetas, datos bancarios ni información
            financiera. No realiza seguimiento del comportamiento de navegación
            con fines publicitarios. No utiliza cookies de terceros para rastreo
            entre sitios. No vende ni comercializa datos de usuarios.
          </InfoBox>
        </Section>
        <Hr />

        <Section n={4} title="Cómo utilizamos la información recopilada">
          <P>
            La información de perfil se utiliza para identificarle dentro de la
            plataforma, mostrar su avatar y determinar si su cuenta tiene
            privilegios de administración. Su correo electrónico no se utiliza
            para envío de comunicaciones comerciales. Los datos del carrito y
            favoritos se utilizan para mantener la consistencia entre sesiones.
            Los mensajes del formulario se utilizan exclusivamente para
            responder a su consulta.
          </P>
        </Section>
        <Hr />

        <Section n={5} title="Bases legales para el tratamiento de datos">
          <P>
            El tratamiento de sus datos de perfil descansa sobre la ejecución
            del contrato de prestación del servicio. El tratamiento de los datos
            del formulario de contacto descansa sobre su consentimiento
            explícito. El tratamiento de datos técnicos para el mantenimiento
            del servicio descansa sobre el interés legítimo de la plataforma.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Con quién compartimos su información">
          <P>
            La plataforma comparte información con: <strong>Supabase</strong>{" "}
            (base de datos e infraestructura), <strong>Google</strong>{" "}
            (autenticación OAuth), <strong>Vercel</strong> (alojamiento web). No
            compartimos datos con ningún otro tercero ni los vendemos a
            anunciantes.
          </P>
          <P>
            Cuando usted decide realizar un pedido y el sistema abre WhatsApp
            con el mensaje pre-formateado, ese mensaje abandona el entorno de la
            plataforma y pasa a ser procesado por WhatsApp según las políticas
            de Meta Platforms. La plataforma no tiene control sobre ese
            tratamiento.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Cómo protegemos su información">
          <P>
            Todas las comunicaciones se realizan mediante HTTPS. El acceso a los
            datos está controlado por políticas de seguridad a nivel de fila en
            la base de datos. Los formularios aplican sanitización de datos. El
            panel de administración está protegido por verificación de rol tanto
            en cliente como en servidor.
          </P>
          <P>
            A pesar de estas medidas, ningún sistema de seguridad es infalible.
            En caso de brecha de seguridad, notificaremos a los usuarios
            afectados en un plazo razonable.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Almacenamiento local en su navegador">
          <P>
            La plataforma utiliza localStorage para persistir: ítems del carrito
            de compras, marcas de tiempo de última modificación, identificadores
            de favoritos, preferencia de modo visual oscuro/claro, y registro de
            aceptación del aviso de cookies. El carrito se elimina
            automáticamente tras siete días de inactividad.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Cookies">
          <P>
            Esta plataforma no utiliza cookies de seguimiento, publicitarias ni
            de terceros para rastreo entre sitios. El único dato relacionado con
            cookies es un registro binario en localStorage que indica si usted
            ha interactuado con el aviso informativo de primera visita.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Retención de datos">
          <P>
            Los datos de perfil se conservan mientras su cuenta permanezca
            activa. Los favoritos se conservan hasta que usted los elimine o
            hasta que su cuenta sea eliminada. Los mensajes del formulario se
            conservan hasta que la administración los elimine desde el panel.
            Los registros de error técnico se conservan por el tiempo que la
            administración considere necesario.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Sus derechos sobre sus datos">
          <InfoBox type="blue">
            Tiene derecho a solicitar acceso a sus datos personales, corrección
            de datos inexactos, eliminación de su cuenta y datos asociados, y a
            revocar el acceso otorgado a través de Google OAuth. Para ejercer
            estos derechos, contáctenos a través del formulario de contacto o
            vía WhatsApp.
          </InfoBox>
          <P>
            La eliminación de su cuenta implica la eliminación de su perfil,
            historial de favoritos y carrito sincronizado, pero no afecta a los
            mensajes de contacto enviados, que pueden ser retenidos por razones
            de registro.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Menores de edad">
          <P>
            Esta plataforma no está dirigida a personas menores de dieciocho
            años y no recopila deliberadamente información personal de menores.
            Si usted es padre, madre o tutor legal y tiene conocimiento de que
            un menor ha proporcionado información a través de esta plataforma,
            contáctenos para proceder a la eliminación de esos datos.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Transferencias internacionales de datos">
          <P>
            Los datos recopilados son procesados y almacenados por Supabase,
            cuya infraestructura puede estar ubicada en servidores fuera de El
            Salvador, incluyendo potencialmente servidores en los Estados
            Unidos. Al utilizar esta plataforma usted acepta esta posibilidad.
            Confecciones Liss selecciona proveedores que ofrecen garantías
            contractuales razonables sobre la protección de los datos.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Cambios en esta política">
          <P>
            Esta política puede ser actualizada periódicamente para reflejar
            cambios en las prácticas de tratamiento de datos o en los requisitos
            legales aplicables. Cuando se realicen cambios sustanciales, lo
            comunicaremos mediante un aviso visible en la plataforma.
          </P>
        </Section>

        <LegalFootnote>
          Esta política de privacidad está vigente desde su publicación y
          refleja las prácticas de tratamiento de datos implementadas en la
          versión actual de la plataforma Confecciones Liss. Última
          actualización: Junio 2025.
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
