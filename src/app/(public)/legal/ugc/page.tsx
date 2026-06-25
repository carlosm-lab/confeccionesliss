import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import { Section, Hr, P, LegalFootnote } from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Contenido Generado por el Usuario (UGC)",
  description:
    "Política de Contenido Generado por el Usuario de Confecciones Liss: condiciones de republicación, derechos, moderación, contenido prohibido, reseñas y garantías del usuario.",
  keywords:
    "contenido generado por usuarios, UGC, republicación contenido, reseñas productos, licencias contenido, moderación reseñas, Confecciones Liss El Salvador",
  alternates: { canonical: `${siteConfig.url}/legal/ugc` },
  openGraph: {
    title:
      "Política de Contenido Generado por el Usuario (UGC) | Confecciones Liss",
    description:
      "Política de Contenido Generado por el Usuario de Confecciones Liss: condiciones de republicación, derechos, moderación, contenido prohibido, reseñas y garantías del usuario.",
    url: `${siteConfig.url}/legal/ugc`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Política de Contenido Generado por el Usuario (UGC) | Confecciones Liss",
    description:
      "Política de Contenido Generado por el Usuario de Confecciones Liss: condiciones de republicación, derechos, moderación, contenido prohibido, reseñas y garantías del usuario.",
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

export default function PoliticaUgcPage() {
  const PAGE_URL = `${siteConfig.url}/legal/ugc`;
  const PAGE_TITLE = "Política de UGC";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Contenido Generado por el Usuario (UGC) — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de Contenido Generado por el Usuario de Confecciones Liss: condiciones de republicación, derechos, moderación, contenido prohibido, reseñas y garantías del usuario.",
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
        title="Política de Contenido Generado por el Usuario (UGC)"
        category="Uso, republicación, derechos y moderación de contenido de terceros en relación con Confecciones Liss."
        date="24 Jun, 2026"
        readingTime={16}
      >
        <P>
          La presente Política de Contenido Generado por el Usuario (en adelante
          &quot;la Política&quot; o &quot;Política de UGC&quot;) regula de
          manera integral, exhaustiva y vinculante las condiciones bajo las
          cuales Confecciones Liss (en adelante &quot;el Taller&quot;) trata,
          utiliza, republica, explota, modera, retira y gestiona el contenido
          publicado, compartido o difundido por personas naturales ajenas al
          Taller (en adelante &quot;el Usuario&quot; o &quot;el Creador&quot;)
          que haga referencia, alusión directa o indirecta, mención, etiqueta,
          identificación o cualquier otra forma de vinculación al Taller, a sus
          productos, a sus servicios, a su identidad comercial o visual, a su
          personal, o a las prendas que el Taller confecciona, a través de redes
          sociales, plataformas de contenido digital, sistemas de reseñas,
          aplicaciones de mensajería, sitios web, blogs, foros u cualquier otro
          medio digital o análogo de difusión pública o semipública.
        </P>
        <P>
          Se entiende por &quot;Contenido Generado por el Usuario&quot; o
          &quot;UGC&quot; (por sus siglas en inglés: User Generated Content), a
          efectos de la presente Política, todo material en cualquier formato
          —incluyendo sin limitarse a: fotografías, imágenes estáticas, videos,
          reels, stories, clips cortos, transmisiones en vivo, audios, textos,
          comentarios, reseñas escritas, calificaciones con puntuación,
          publicaciones en feed, publicaciones en historias, mensajes difundidos
          públicamente, etiquetas, menciones de perfil, hashtags, citas,
          capturas de pantalla difundidas públicamente y cualquier otro formato
          de expresión digital— que un Usuario cree, publique, comparta o
          distribuya de forma voluntaria y haciendo referencia al Taller de
          cualquiera de las formas descritas en el párrafo anterior, en
          cualquier plataforma digital pública, semipública o de acceso
          restringido a un grupo de personas.
        </P>
        <P>
          Toda persona que genere, publique, comparta, distribuya o difunda
          contenido UGC que haga referencia al Taller en cualquiera de las
          formas descritas en la presente Política declara haber leído,
          comprendido y aceptado en su integridad, de forma libre, voluntaria e
          informada, la totalidad de los términos aquí establecidos. La
          publicación de contenido UGC que mencione, etiquete o aluda al Taller
          implica aceptación irrevocable, automática e incondicional de la
          presente Política desde el momento de dicha publicación, sin necesidad
          de acto adicional de aceptación ni de notificación individual por
          parte del Taller.
        </P>
        <P>
          El desconocimiento de la presente Política no exime al Usuario de su
          cumplimiento, no restringe los derechos del Taller aquí establecidos,
          no le otorga al Usuario derechos adicionales a los expresamente
          reconocidos en este documento, y no le confiere fundamento válido para
          reclamación alguna contra el Taller derivada de la aplicación de esta
          Política.
        </P>
        <Hr />

        <Section n={1} title="Definiciones específicas de esta Política">
          <P>
            1.1 A efectos de la presente Política, y sin perjuicio de las
            definiciones establecidas en otras políticas del Taller, se
            entenderá por:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>&quot;Contenido UGC&quot; o &quot;UGC&quot;:</strong>{" "}
              todo material en cualquier formato creado y publicado por un
              Usuario que haga referencia al Taller, conforme a la definición
              del preámbulo de la presente Política.
            </P>
            <P>
              b) <strong>&quot;Alusión al Taller&quot;:</strong> toda forma de
              referencia —directa o indirecta, explícita o implícita— que
              permita a un observador razonable vincular el contenido UGC con
              Confecciones Liss, sus productos, sus servicios o sus prendas,
              incluyendo sin limitarse a: la mención del nombre
              &quot;Confecciones Liss&quot; o cualquier variación del mismo, la
              etiqueta de un perfil oficial del Taller en redes sociales, el uso
              de hashtags asociados al Taller, la exhibición visible de una
              prenda confeccionada por el Taller con elementos identificables
              como propios del Taller, la inclusión de referencias textuales o
              visuales que identifiquen al Taller como proveedor del producto
              mostrado, o cualquier otro elemento que establezca dicha
              vinculación de forma razonablemente perceptible para el público.
            </P>
            <P>
              c){" "}
              <strong>&quot;Republicación&quot; o &quot;reposteo&quot;:</strong>{" "}
              acto mediante el cual el Taller toma contenido UGC originalmente
              publicado por el Usuario en un canal de este y lo publica,
              comparte o redistribuye en uno o más de sus propios canales
              oficiales, con o sin modificaciones de formato, recorte o
              adaptación, y con o sin acreditación al Usuario.
            </P>
            <P>
              d) <strong>&quot;Canales oficiales del Taller&quot;:</strong> la
              totalidad de los perfiles, páginas, cuentas, sitio web y
              plataformas declaradas como oficiales por el Taller en el
              directorio disponible en:{" "}
              <Link href="/links" className="text-blue-600 hover:underline">
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              e){" "}
              <strong>
                &quot;Derechos sobre el contenido UGC republicado&quot;:
              </strong>{" "}
              el conjunto de facultades que el Taller adquiere sobre el
              contenido UGC publicado con alusión al Taller, conforme a lo
              establecido en el Artículo 3 de la presente Política.
            </P>
            <P>
              f) <strong>&quot;Creador&quot; o &quot;Usuario&quot;:</strong>{" "}
              persona natural que publica contenido UGC con alusión al Taller,
              con independencia de su relación con el Taller (cliente,
              excliente, visitante, tercero, seguidor u otro).
            </P>
            <P>
              g) <strong>&quot;Contenido UGC nocivo&quot;:</strong> contenido
              UGC que cause o sea susceptible de causar perjuicio a la
              reputación, imagen comercial, operación o intereses del Taller,
              conforme a los criterios establecidos en el Artículo 7 de la
              presente Política.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={2}
          title="Fundamento: la alusión como acto voluntario que genera derechos"
        >
          <P>
            2.1 El Taller declara y el Usuario reconoce que la publicación de
            contenido UGC con alusión al Taller es un acto voluntario, libre y
            autónomo del Usuario, que este realiza en ejercicio de su libertad
            de expresión y de su propia iniciativa, sin que el Taller lo haya
            solicitado, inducido ni contratado para ello, salvo que exista un
            acuerdo escrito específico en sentido contrario suscrito a través de
            los canales oficiales del Taller.
          </P>
          <P>
            2.2 El Taller reconoce que la libertad de expresión del Usuario es
            un valor fundamental. Sin embargo, cuando el ejercicio de dicha
            libertad genera contenido UGC que hace alusión al Taller —con lo que
            vincula públicamente la imagen del Taller a dicho contenido—, se
            activa de pleno derecho el marco jurídico establecido en la presente
            Política, que equilibra dicha libertad con los derechos e intereses
            legítimos del Taller.
          </P>
          <P>
            2.3 La alusión al Taller en contenido UGC, cualquiera sea su forma,
            constituye el hecho generador que activa automáticamente todos los
            derechos del Taller establecidos en la presente Política, sin
            necesidad de acto adicional, sin límite de tiempo para su ejercicio
            —salvo los plazos expresamente indicados— y sin necesidad de
            notificación al Usuario.
          </P>
          <P>
            2.4 En consecuencia, el Usuario que publica contenido UGC con
            alusión al Taller no puede posteriormente alegar ignorancia, error
            ni falta de intención como fundamento para limitar, cuestionar o
            exigir la renuncia de los derechos que la presente Política otorga
            al Taller sobre dicho contenido.
          </P>
        </Section>
        <Hr />

        <Section n={3} title="Derechos del Taller sobre el contenido UGC">
          <P>
            3.1 <strong>DERECHO DE REPUBLICACIÓN Y USO.</strong> Desde el
            momento en que el Usuario publica contenido UGC con alusión al
            Taller, conforme a lo definido en el Artículo 1, el Taller adquiere
            automática e irrevocablemente el derecho amplio e irrestricto de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Repostear, republicar, compartir, redistribuir, difundir o
              comunicar públicamente el contenido UGC en cualquiera de sus
              canales oficiales, sin necesidad de solicitar autorización
              adicional al Usuario, sin plazo de caducidad, y sin que el Usuario
              pueda oponerse válidamente a dicha republicación invocando la
              falta de consentimiento expreso posterior, toda vez que el
              consentimiento es irrevocablemente otorgado desde el momento de la
              publicación del contenido UGC con alusión al Taller.
            </P>
            <P>
              b) Utilizar el contenido UGC para la construcción y exhibición del
              portafolio de trabajo del Taller, tanto en sus canales digitales
              como en presentaciones, materiales de ventas, catálogos y
              cualquier otro soporte de comunicación comercial del Taller.
            </P>
            <P>
              c) Utilizar el contenido UGC como testimonio, evidencia de
              satisfacción, referencia de cliente o material de comunicación en
              cualquiera de las plataformas y canales oficiales del Taller.
            </P>
            <P>
              d) Utilizar el contenido UGC en campañas de difusión, comunicación
              de marca, anuncios pagados en plataformas digitales, materiales
              impresos y cualquier otro formato de comunicación del Taller, con
              o sin contraprestación para el Usuario, salvo que el Taller haya
              acordado lo contrario expresamente y por escrito con el Usuario.
            </P>
            <P>
              e) Editar, recortar, adaptar, redimensionar, ajustar el formato,
              superponer texto o elementos gráficos, o modificar el contenido
              UGC en la medida necesaria para su integración óptima en los
              canales y formatos del Taller, siempre que dichas modificaciones
              no alteren de forma sustancial el sentido original del contenido
              ni perjudiquen la imagen del Usuario de forma evidente y
              desproporcionada.
            </P>
            <P>
              f) Archivar, almacenar y conservar el contenido UGC en los
              sistemas del Taller por el tiempo que el Taller considere
              pertinente para sus fines comerciales, de portafolio o
              documentales, sin obligación de eliminarlo transcurrido plazo
              alguno, salvo en los supuestos previstos en el Artículo 5 de la
              presente Política.
            </P>
          </div>
          <P>
            3.2 <strong>GRATUIDAD.</strong> La adquisición y el ejercicio de los
            derechos establecidos en el numeral anterior por parte del Taller
            son gratuitos de pleno derecho. El Usuario no tiene derecho a
            recibir compensación económica, comisión, regalo, descuento, prenda
            gratuita ni beneficio de ningún tipo a cambio de la republicación o
            el uso de su contenido UGC, a menos que el Taller haya acordado
            expresamente una contraprestación específica mediante acuerdo
            escrito y a través de los canales oficiales del Taller con
            anterioridad a la publicación del contenido.
          </P>
          <P>
            3.3 <strong>ACREDITACIÓN.</strong> El Taller realizará un esfuerzo
            razonable y de buena fe por acreditar al Usuario como autor del
            contenido UGC al republicarlo, mediante la mención de su nombre de
            perfil, usuario o nombre completo según lo que sea convencionalmente
            apropiado en la plataforma de republicación. No obstante, la
            acreditación no es una obligación absoluta del Taller, y su omisión
            no genera responsabilidad para el Taller ni derecho de reclamación
            para el Usuario, cuando dicha omisión se deba a: a) características
            del formato de publicación que no permitan la acreditación sin
            afectar la presentación del contenido; b) solicitud expresa del
            propio Usuario de no ser mencionado; c) imposibilidad técnica de
            identificar con certeza al Creador original; o d) contenido que fue
            difundido por terceros distintos al Creador original antes de llegar
            al Taller.
          </P>
          <P>
            3.4 <strong>SIN EXCLUSIVIDAD NI TRANSFERENCIA INVERSA.</strong> Los
            derechos que el Taller adquiere sobre el contenido UGC conforme a la
            presente Política no son exclusivos: el Usuario conserva el derecho
            de continuar publicando, compartiendo o utilizando su propio
            contenido UGC en sus propios canales. Asimismo, la presente Política
            no transfiere al Taller los derechos de autor originales del Usuario
            sobre su creación, sino únicamente la licencia de uso descrita en el
            numeral 3.1, con el alcance ahí establecido.
          </P>
        </Section>
        <Hr />

        <Section
          n={4}
          title="Titularidad y conservación de derechos por el Taller"
        >
          <P>
            4.1 Confecciones Liss conserva de forma íntegra, exclusiva e
            inalterable todos los derechos sobre su propia identidad comercial y
            visual, los cuales no son afectados ni cedidos al Usuario por
            ninguna circunstancia derivada del contenido UGC que este publique.
            Dichos derechos incluyen, sin limitarse a:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El nombre comercial &quot;Confecciones Liss&quot; y cualquier
              variación, abreviación o denominación asociada al mismo.
            </P>
            <P>
              b) El logotipo, isotipo, imagotipo o cualquier otro elemento
              gráfico que forme parte de la identidad visual del Taller.
            </P>
            <P>
              c) Los colores institucionales, la tipografía, el estilo visual y
              cualquier otro elemento de diseño propio del Taller.
            </P>
            <P>
              d) Las fotografías, videos, renders e imágenes del catálogo del
              Taller, incluyendo tanto las imágenes editadas con inteligencia
              artificial como las fotografías reales de prendas publicadas por
              el Taller.
            </P>
            <P>
              e) Los patrones, moldes, diseños de prendas y cualquier otro
              desarrollo creativo o técnico del Taller.
            </P>
            <P>
              f) El contenido textual, las descripciones de productos, las
              fichas técnicas y cualquier otro texto publicado por el Taller en
              sus canales oficiales.
            </P>
          </div>
          <P>
            4.2 Ninguna acción del Usuario —incluyendo la publicación de
            contenido UGC con alusión al Taller, la republicación de imágenes
            del catálogo del Taller, la mención reiterada del nombre del Taller
            o cualquier otra conducta— transfiere, limita, condiciona ni afecta
            los derechos del Taller sobre los elementos listados en el numeral
            anterior.
          </P>
          <P>
            4.3 El contenido UGC republicado por el Taller en sus canales puede
            incluir simultáneamente elementos de autoría del Usuario y elementos
            de titularidad del Taller (como la imagen de una prenda
            confeccionada por el Taller). En estos casos, los derechos sobre
            cada elemento pertenecen a su respectivo titular, conforme a lo
            establecido en el numeral 3.4 y en el presente artículo.
          </P>
          <P>
            4.4 El Usuario no adquiere derecho alguno sobre la identidad visual,
            el nombre comercial ni ningún otro activo del Taller como
            consecuencia de publicar contenido UGC con alusión al Taller, de
            recibir mención o acreditación por parte del Taller, ni de cualquier
            otra interacción entre el Usuario y el Taller derivada de la
            aplicación de la presente Política.
          </P>
        </Section>
        <Hr />

        <Section
          n={5}
          title="Derecho del Taller a retirar contenido y a solicitar su baja"
        >
          <P>
            5.1 <strong>RETIRO DE CONTENIDO REPUBLICADO.</strong> Confecciones
            Liss se reserva el derecho irrevocable, absoluto e incondicionado de
            retirar, eliminar, archivar o dejar de difundir, en cualquier
            momento y sin necesidad de justificación, notificación previa ni
            compensación al Usuario, cualquier contenido UGC que haya sido
            previamente republicado en sus canales oficiales. Este derecho puede
            ejercerse por cualquier razón, incluyendo sin limitarse a: a)
            decisión editorial o estética del Taller; b) cambio en la estrategia
            de comunicación; c) actualización del catálogo o portafolio; d)
            solicitud del propio Usuario formulada conforme al numeral 5.3; e)
            instrucción de una plataforma digital; o f) cualquier otra razón que
            el Taller estime conveniente.
          </P>
          <P>
            5.2 <strong>SOLICITUD DE BAJA EN CANAL DEL USUARIO.</strong> Cuando
            el Taller considere que un contenido UGC publicado por el Usuario en
            los canales propios de este —aunque no haya sido republicado por el
            Taller— resulta perjudicial para la reputación, la imagen comercial,
            los intereses o el correcto funcionamiento del Taller, el Taller
            podrá: a) solicitar formalmente al Usuario la retirada, modificación
            o corrección del contenido; b) reportar el contenido ante la
            plataforma digital correspondiente; c) exigir rectificación pública
            cuando el contenido contenga información comprobablemente falsa; y
            d) ejercer las acciones legales que correspondan conforme a la
            legislación salvadoreña vigente.
          </P>
          <P>
            5.3{" "}
            <strong>
              PROCEDIMIENTO PARA SOLICITUD DE BAJA POR EL USUARIO.
            </strong>{" "}
            El Usuario que desee solicitar la retirada de contenido UGC propio
            republicado en canales del Taller deberá: a) formular su solicitud
            por escrito, de forma clara y específica, identificando el contenido
            cuya retirada solicita, la plataforma y canal del Taller en que fue
            publicado, y el fundamento de su solicitud; y b) remitirla
            exclusivamente a través de los canales oficiales disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            . El Taller evaluará la solicitud de buena fe dentro de un plazo
            razonable. El retiro es discrecional cuando la solicitud no se
            sustente en un fundamento legal válido; la solicitud de retirada por
            sí sola no es fundamento suficiente.
          </P>
          <P>
            5.4 <strong>IMPROCEDENCIA DE SOLICITUDES INFORMALES.</strong> El
            Taller no reconocerá ni procesará solicitudes de retirada formuladas
            verbalmente, mediante comentarios públicos en redes sociales, por
            mensajes directos en plataformas no oficiales, por interpósita
            persona no autorizada, ni por cualquier medio distinto a los canales
            oficiales establecidos en el numeral 5.3.
          </P>
        </Section>
        <Hr />

        <Section n={6} title="Garantías del Usuario sobre el contenido UGC">
          <P>
            6.1 El Usuario que publica contenido UGC con alusión al Taller
            declara, garantiza e irrevocablemente asegura al Taller, desde el
            momento de la publicación, que:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El contenido UGC es de su autoría original o que el Usuario
              cuenta con todos los derechos, licencias o autorizaciones
              necesarias para publicarlo, redistribuirlo y permitir su
              republicación por parte del Taller en los términos de la presente
              Política.
            </P>
            <P>
              b) El contenido UGC no infringe derechos de propiedad intelectual
              de terceros, incluyendo derechos de autor, derechos de imagen,
              derechos de marca ni ningún otro derecho de propiedad de terceros.
            </P>
            <P>
              c) El contenido UGC no incluye la imagen identificable de terceras
              personas sin el consentimiento de estas, o que, de incluirla, el
              Usuario cuenta con el consentimiento correspondiente conforme a la
              legislación aplicable.
            </P>
            <P>
              d) El contenido UGC no contiene información falsa, engañosa,
              difamatoria, injuriosa ni calumniosa sobre el Taller, su personal,
              sus productos o sus servicios.
            </P>
            <P>
              e) El contenido UGC no contiene material ilegal, violento,
              obsceno, discriminatorio, de odio, ni cualquier otro contenido
              contrario al orden público o a la legislación de la República de
              El Salvador.
            </P>
            <P>
              f) El Usuario tiene capacidad legal plena para publicar el
              contenido UGC y para otorgar al Taller los derechos establecidos
              en la presente Política.
            </P>
          </div>
          <P>
            6.2 En caso de que cualquiera de las garantías establecidas en el
            numeral anterior resulte ser falsa, inexacta o incumplida, el
            Usuario asumirá responsabilidad exclusiva e integral frente al
            Taller y frente a los terceros afectados, y quedará obligado a
            indemnizar al Taller conforme a lo establecido en el Artículo 8 de
            la presente Política.
          </P>
        </Section>
        <Hr />

        <Section n={7} title="Contenido UGC prohibido y conductas sancionables">
          <P>
            7.1 Queda expresamente prohibido publicar, difundir, compartir o
            hacer accesible en cualquier medio o plataforma contenido UGC que,
            haciendo referencia al Taller en cualquiera de las formas previstas
            en esta Política, contenga cualquiera de los siguientes elementos o
            características, sin que esta enumeración sea limitativa:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) <strong>INFORMACIÓN FALSA O ENGAÑOSA:</strong> afirmaciones,
              datos, estadísticas, citas textuales atribuidas al Taller o
              cualquier otra información sobre el Taller, sus productos, sus
              servicios, sus precios, sus condiciones comerciales o su personal
              que sea objetivamente falsa, no respaldada en hechos verificables,
              o que esté presentada de forma tal que induzca a error a los
              lectores sobre la realidad del Taller.
            </P>
            <P>
              b) <strong>DIFAMACIÓN E INJURIA:</strong> contenido que ataque,
              desprecie, desacredite, ridiculice o perjudique la reputación, el
              honor o la imagen comercial del Taller o de su personal, sin
              fundamento factual verificable y con el propósito de causar daño
              reputacional o comercial al Taller.
            </P>
            <P>
              c) <strong>ACUSACIONES NO FUNDADAS:</strong> imputación al Taller
              de prácticas ilegales, fraudulentas, deshonestas o contrarias a la
              ética comercial, que no estén respaldadas en evidencia objetiva,
              verificable y suficiente.
            </P>
            <P>
              d) <strong>AMENAZAS:</strong> cualquier manifestación que
              implique, de forma expresa o velada, la intención de causar daño
              al Taller, a su personal o a sus intereses, ya sea de naturaleza
              física, económica, reputacional o de cualquier otra índole.
            </P>
            <P>
              e) <strong>HOSTIGAMIENTO Y ACOSO:</strong> campaña coordinada o
              individual destinada a saturar, desacreditar, atacar repetidamente
              o ejercer presión indebida sobre el Taller o su personal a través
              del contenido UGC, ya sea de forma directa o mediante la
              incitación a terceros.
            </P>
            <P>
              f) <strong>SUPLANTACIÓN DE IDENTIDAD:</strong> contenido que,
              haciendo referencia al Taller, induzca a creer que el Usuario
              actúa en nombre, con la autorización o con el respaldo del Taller,
              cuando no existe tal autorización o respaldo.
            </P>
            <P>
              g) <strong>VIOLACIÓN DE PRIVACIDAD:</strong> contenido que exponga
              datos personales de empleados, colaboradores o clientes del Taller
              sin el consentimiento de estos, obtenidos en el contexto de la
              relación con el Taller.
            </P>
            <P>
              h) <strong>CONTENIDO ILEGAL:</strong> cualquier contenido
              contrario a la legislación de la República de El Salvador,
              incluyendo contenido discriminatorio, de odio, que incite a la
              violencia, o de naturaleza sexual no consentida.
            </P>
          </div>
          <P>
            7.2 La publicación de contenido UGC prohibido conforme al numeral
            anterior faculta al Taller para ejercer, de forma simultánea o
            sucesiva y a su entera discreción, todos o cualquiera de los
            siguientes derechos: a) solicitar formalmente al Usuario la retirada
            inmediata del contenido; b) reportar el contenido ante la plataforma
            digital correspondiente; c) reportar el contenido ante las
            autoridades competentes cuando constituya un ilícito penal o
            administrativo; d) exigir rectificación pública; e) iniciar las
            acciones legales civiles y/o penales que correspondan; y f) exigir
            indemnización por los daños y perjuicios causados conforme al
            Artículo 8.
          </P>
          <P>
            7.3 El ejercicio de los derechos enumerados en el numeral anterior
            no está condicionado a la comunicación previa al Usuario, no
            requiere haber agotado una instancia de diálogo previo, y puede
            iniciarse de forma inmediata desde el momento en que el Taller tome
            conocimiento del contenido UGC prohibido.
          </P>
        </Section>
        <Hr />

        <Section n={8} title="Indemnización a cargo del Usuario">
          <P>
            8.1 El Usuario se compromete, de forma expresa, irrevocable e
            incondicional, a indemnizar y a mantener completamente indemne a
            Confecciones Liss, a su personal, colaboradores y representantes,
            frente a cualquier reclamación, demanda, acción legal, procedimiento
            administrativo, pérdida, daño patrimonial, daño moral, daño
            reputacional, costo, gasto o responsabilidad de cualquier naturaleza
            que surja de, esté relacionada con, o sea consecuencia de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) La publicación de contenido UGC que incumpla cualquiera de las
              garantías establecidas en el Artículo 6 de la presente Política.
            </P>
            <P>
              b) La publicación de contenido UGC prohibido conforme al Artículo
              7.
            </P>
            <P>
              c) Reclamaciones de terceros que se deriven de la imagen, el
              contenido o las afirmaciones incluidas en el contenido UGC
              publicado por el Usuario.
            </P>
            <P>
              d) La infracción de derechos de terceros —incluyendo derechos de
              autor, derechos de imagen, derechos de marca u otros— incluida en
              el contenido UGC que haya sido republicado por el Taller de buena
              fe, creyendo que el Usuario tenía los derechos necesarios.
            </P>
            <P>
              e) Las consecuencias legales, económicas o reputacionales que se
              deriven para el Taller de haber republicado contenido UGC cuya
              publicación original por el Usuario incumplía los términos de la
              presente Política.
            </P>
          </div>
          <P>
            8.2 La obligación de indemnización establecida en el numeral
            anterior incluye, sin limitarse a: los honorarios razonables de
            representación legal en que el Taller incurra, los costos procesales
            de cualquier procedimiento derivado, el valor de las multas o
            sanciones impuestas al Taller como consecuencia del contenido UGC
            del Usuario, y cualquier otro gasto directo o indirecto
            razonablemente atribuible al contenido UGC del Usuario.
          </P>
          <P>
            8.3 La obligación de indemnización opera incluso cuando el Taller
            haya actuado de buena fe al republicar el contenido UGC del Usuario,
            creyendo razonablemente que dicho contenido cumplía con todos los
            requisitos de la presente Política. La buena fe del Taller no
            extingue la obligación de indemnización del Usuario.
          </P>
        </Section>
        <Hr />

        <Section n={9} title="Exención de responsabilidad del Taller">
          <P>
            9.1 En la máxima medida permitida por la legislación de la República
            de El Salvador, Confecciones Liss queda expresamente eximido de toda
            responsabilidad civil, comercial, de propiedad intelectual o de
            cualquier otra naturaleza, derivada de los siguientes supuestos, sin
            que esta enumeración tenga carácter limitativo:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) El contenido UGC publicado por terceros en plataformas ajenas
              al Taller, incluyendo reseñas, comentarios y publicaciones en
              redes sociales, cuya creación y publicación son actos exclusivos
              del Usuario y están fuera del control del Taller.
            </P>
            <P>
              b) Las consecuencias que la republicación del contenido UGC pueda
              tener para el Usuario —incluyendo la mayor visibilidad de su
              contenido, la interacción de terceros con el mismo, o cualquier
              otra consecuencia derivada de la distribución adicional—, toda vez
              que el contenido fue publicado originalmente de forma voluntaria y
              pública por el Usuario.
            </P>
            <P>
              c) La eliminación o modificación de contenido UGC en plataformas
              de terceros por decisión autónoma de dichas plataformas, situación
              completamente fuera del control del Taller.
            </P>
            <P>
              d) El contenido UGC que terceros distintos al Taller compartan,
              redistribuyan, modifiquen o distorsionen sin intervención ni
              conocimiento del Taller.
            </P>
            <P>
              e) La veracidad, exactitud, actualidad o completitud de las
              afirmaciones contenidas en el contenido UGC publicado por
              Usuarios, cuya responsabilidad corresponde íntegramente a sus
              autores.
            </P>
            <P>
              f) Reclamaciones de terceros derivadas del contenido UGC de un
              Usuario que el Taller republicó de buena fe, sin conocimiento de
              que dicho contenido infringía derechos de terceros o incumplía las
              garantías del Artículo 6, siempre que el Taller retire el
              contenido en un plazo razonable desde que toma conocimiento de la
              infracción.
            </P>
            <P>
              g) La imposibilidad de identificar con certeza al Creador original
              de contenido UGC que ha sido compartido, modificado o
              redistribuido por múltiples usuarios antes de llegar al
              conocimiento del Taller, lo que pudiera resultar en republicación
              sin acreditación correcta al Creador.
            </P>
            <P>
              h) Diferencias de expectativa del Usuario respecto al alcance de
              la difusión de su contenido UGC tras la republicación por el
              Taller, toda vez que el Taller no garantiza ni puede controlar el
              alcance orgánico de sus publicaciones en plataformas de terceros.
            </P>
            <P>
              i) La percepción subjetiva del Usuario de que la republicación de
              su contenido UGC por el Taller, realizada de buena fe y conforme a
              la presente Política, constituye una apropiación indebida de su
              trabajo, cuando dicha percepción no está sustentada en una
              vulneración jurídica efectiva y comprobable.
            </P>
          </div>
        </Section>
        <Hr />

        <Section n={10} title="Reseñas y calificaciones públicas">
          <P>
            10.1 El Taller valora las reseñas y calificaciones auténticas,
            fundadas en experiencias reales, como herramienta de mejora continua
            de su servicio y como información útil y legítima para futuros
            clientes. El Taller no manipula, no elimina ni censura reseñas
            verídicas, debidamente fundamentadas y publicadas de buena fe.
          </P>
          <P>
            10.2 Sin perjuicio de lo anterior, el Taller se reserva expresamente
            el derecho de:
          </P>
          <div style={{ paddingLeft: "1.5rem" }}>
            <P>
              a) Responder pública y formalmente a cualquier reseña o
              calificación, exponiendo la posición oficial del Taller sobre los
              hechos descritos, citando las políticas vigentes aplicables, y
              ejerciendo su derecho a la defensa de su reputación comercial.
            </P>
            <P>
              b) Reportar y solicitar la eliminación ante la plataforma
              correspondiente de reseñas que contengan información
              comprobablemente falsa, que incumplan las políticas de la
              plataforma, que sean anónimas y maliciosas, que provengan de
              personas que nunca tuvieron relación comercial con el Taller, o
              que constituyan contenido UGC prohibido conforme al Artículo 7 de
              la presente Política.
            </P>
            <P>
              c) Ejercer las acciones legales que correspondan cuando una reseña
              negativa constituya difamación, injuria, calumnia o competencia
              desleal conforme a la legislación salvadoreña vigente.
            </P>
          </div>
          <P>
            10.3 El Usuario que publique una reseña sobre el Taller declara que
            esta se basa en una experiencia real y directa con el Taller, que no
            ha sido motivada por presión, incentivo económico de un tercero
            competidor, o cualquier otro factor externo a su experiencia
            personal, y que refleja de forma honesta y fundada su opinión sobre
            el servicio recibido.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Responsabilidad exclusiva del Usuario">
          <P>
            11.1 El Usuario es el único y exclusivo responsable del contenido
            UGC que publique en relación con el Taller, incluyendo sin limitarse
            a: la veracidad de sus afirmaciones, la titularidad de los derechos
            sobre el contenido, el respeto de los derechos de terceros, el
            cumplimiento de las condiciones de uso de la plataforma en la que
            publica, y la conformidad del contenido con la legislación
            aplicable.
          </P>
          <P>
            11.2 La publicación de contenido UGC con alusión al Taller implica
            la declaración implícita, irrevocable e incondicional del Usuario de
            que asume plena responsabilidad sobre dicho contenido en todos los
            términos descritos en el numeral anterior.
          </P>
          <P>
            11.3 El Taller no asume responsabilidad alguna derivada del
            contenido UGC creado por terceros, incluyendo el contenido que haya
            sido republicado en los canales del Taller de buena fe y conforme a
            la presente Política, en lo que respecta a las afirmaciones,
            imágenes, datos y cualquier otro elemento de autoría del Usuario
            contenido en dicho material.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Relación con otras políticas del Taller">
          <P>
            12.1 La presente Política forma parte integral del marco jurídico y
            comercial de Confecciones Liss y debe interpretarse de forma
            complementaria y consistente con las demás políticas del Taller, en
            particular:
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
                label: "Términos y Condiciones de Uso:",
                href: "/legal/terminos",
                url: "https://www.confeccionesliss.com/legal/terminos",
              },
              {
                label: "Política de Privacidad:",
                href: "/legal/privacidad",
                url: "https://www.confeccionesliss.com/legal/privacidad",
              },
              {
                label: "Política de Comunicaciones Comerciales:",
                href: "/legal/comunicaciones",
                url: "https://www.confeccionesliss.com/legal/comunicaciones",
              },
              {
                label: "Política de Deberes del Usuario:",
                href: "/legal/deberes",
                url: "https://www.confeccionesliss.com/legal/deberes",
              },
              {
                label: "Política de Derechos del Usuario:",
                href: "/legal/derechos",
                url: "https://www.confeccionesliss.com/legal/derechos",
              },
              {
                label:
                  "Política de Descargo por Uso de Logos e Identidad Institucional:",
                href: "/legal/terceros",
                url: "https://www.confeccionesliss.com/legal/terceros",
              },
            ].map(({ label, href, url }) => (
              <div key={href} style={{ display: "flex", gap: "0.5rem" }}>
                <span>—</span>
                <div>
                  <strong>{label}</strong>{" "}
                  <Link href={href} className="text-blue-600 hover:underline">
                    {url}
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <P>
            12.2 En caso de aparente conflicto entre la presente Política y
            cualquier otra política del Taller respecto a los supuestos
            regulados en este documento, prevalecerán las disposiciones de la
            presente Política como instrumento específico en la materia de
            contenido generado por el Usuario.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Canales oficiales de comunicación">
          <P>
            13.1 Toda consulta, solicitud, notificación o reclamación
            relacionada con la presente Política —incluyendo solicitudes de no
            republicación, solicitudes de retiro de contenido, notificaciones de
            infracción de derechos de terceros, consultas sobre el uso de
            contenido UGC específico, y cualquier otra gestión vinculada a los
            supuestos aquí regulados— deberá realizarse exclusivamente a través
            de los canales oficiales de Confecciones Liss, disponibles en:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </P>
          <P>
            13.2 El Taller no reconocerá solicitudes, reclamaciones ni
            notificaciones realizadas a través de canales no oficiales, personas
            no autorizadas, comentarios públicos en redes sociales ni medios
            distintos a los establecidos en el numeral anterior.
          </P>
          <P>
            13.3 El encargado de gestionar las comunicaciones derivadas de la
            presente Política es Carlos José Molina Villacorta, Encargado de
            Comunicaciones — Confecciones Liss. Canales disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Resolución de disputas y jurisdicción aplicable">
          <P>
            14.1 Toda controversia que surja de la aplicación, interpretación o
            incumplimiento de la presente Política se resolverá en primera
            instancia mediante negociación directa de buena fe entre las partes,
            a través de los canales oficiales del Taller disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            14.2 De no alcanzarse un acuerdo en un plazo razonable, la
            controversia se someterá a la jurisdicción exclusiva de los
            tribunales competentes del departamento de San Miguel, República de
            El Salvador, aplicando la legislación salvadoreña vigente.
          </P>
          <P>
            14.3 La legislación de la República de El Salvador es la única
            aplicable a la presente Política y a todas las relaciones jurídicas
            que de ella deriven. El Usuario renuncia expresamente a cualquier
            otro fuero o jurisdicción que pudiera corresponderle por razón de su
            domicilio, nacionalidad o lugar de publicación del contenido UGC.
          </P>
        </Section>
        <Hr />

        <Section n={15} title="Modificaciones a la Política y divisibilidad">
          <P>
            15.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento y sin
            previo aviso, publicando la versión actualizada en los canales
            oficiales del Taller disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
          <P>
            15.2 Las modificaciones entrarán en vigencia de forma inmediata
            desde su publicación. La publicación de cualquier contenido UGC con
            alusión al Taller con posterioridad a la publicación de cualquier
            modificación constituirá aceptación automática e irrevocable de la
            versión actualizada de la Política. El contenido UGC publicado con
            anterioridad a una modificación continuará rigiéndose por la versión
            vigente al momento de su publicación, salvo en los aspectos que el
            Taller declare expresamente aplicables de forma retroactiva.
          </P>
          <P>
            15.3 El Taller no está obligado a notificar individualmente al
            Usuario sobre modificaciones a la presente Política. Es
            responsabilidad exclusiva del Usuario verificar periódicamente la
            versión vigente antes de publicar contenido UGC con alusión al
            Taller.
          </P>
          <P>
            15.4 Si alguna disposición de la presente Política fuera declarada
            inválida, ilegal o inaplicable por un tribunal competente, las
            restantes disposiciones continuarán en plena vigencia y efecto, sin
            que la invalidez parcial afecte la validez del conjunto del
            documento.
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
            <span style={{ fontWeight: "600" }}>Política de Privacidad:</span>
            <Link
              href="/legal/privacidad"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/privacidad
            </Link>

            <span style={{ fontWeight: "600" }}>Términos y Condiciones:</span>
            <Link
              href="/legal/terminos"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/terminos
            </Link>

            <span style={{ fontWeight: "600" }}>Política de UGC:</span>
            <Link href="/legal/ugc" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal/ugc
            </Link>

            <span style={{ fontWeight: "600" }}>
              Política de Comunicaciones:
            </span>
            <Link
              href="/legal/comunicaciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/comunicaciones
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
            <strong>Encargado de Comunicaciones:</strong> Carlos José Molina
            Villacorta
            <br />
            <strong>Vigente desde su publicación — Versión:</strong> Junio 2026
          </div>
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
