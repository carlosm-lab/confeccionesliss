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
  title: "Política de Uso de Inteligencia Artificial",
  description:
    "Política de Inteligencia Artificial de Confecciones Liss: uso de imágenes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
  keywords:
    "inteligencia artificial uniformes, modelo IA Confecciones Liss, Liam Alejandro modelo, imágenes IA moda, transparencia IA, Confecciones Liss",
  alternates: { canonical: `${siteConfig.url}/legal/ia` },
  openGraph: {
    title: "Política de Uso de Inteligencia Artificial | Confecciones Liss",
    description:
      "Política de Inteligencia Artificial de Confecciones Liss: uso de imágenes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
    url: `${siteConfig.url}/legal/ia`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Uso de Inteligencia Artificial | Confecciones Liss",
    description:
      "Política de Inteligencia Artificial de Confecciones Liss: uso de imágenes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
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

export default function PoliticaIAPage() {
  const PAGE_URL = `${siteConfig.url}/legal/ia`;
  const PAGE_TITLE = "Política de Inteligencia Artificial";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Uso de Inteligencia Artificial — Políticas Oficiales | Confecciones Liss",
          description:
            "Política de Inteligencia Artificial de Confecciones Liss: uso de imágenes IA, modelo Liam Alejandro, transparencia en contenidos y derechos de imagen.",
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
        title="Política de Uso de Inteligencia Artificial en Contenidos Visuales y Comerciales"
        category="Aviso legal y políticas sobre el uso transparente de inteligencia artificial y modelos generativos en el Taller."
        date="24 Jun, 2026"
        readingTime={20}
      >
        <P>
          El presente documento regula de manera integral, exhaustiva y
          vinculante el uso de tecnologías de inteligencia artificial (en
          adelante &quot;IA&quot;) por parte de Confecciones Liss (en adelante
          &quot;el Taller&quot;) en la producción, edición y publicación de
          contenido visual de carácter comercial, incluyendo fotografías de
          productos, imágenes de catálogo, materiales publicitarios y cualquier
          otro contenido difundido a través de la plataforma web{" "}
          <Link
            href="/"
            className="font-semibold text-blue-600 hover:underline"
          >
            https://www.confeccionesliss.com/
          </Link>{" "}
          (en adelante &quot;la Plataforma&quot;), así como en todas las redes
          sociales y canales de comunicación oficiales del Taller.
        </P>
        <P>
          Cualquier persona natural que acceda, navegue, visualice o interactúe
          con el contenido del Taller en cualquiera de sus canales digitales (en
          adelante &quot;el Usuario&quot;), declara haber leído, comprendido y
          aceptado de forma libre, voluntaria e informada la totalidad de los
          términos aquí establecidos. El desconocimiento de esta Política no
          exime al Usuario de su cumplimiento, no le otorga derechos adicionales
          a los expresamente reconocidos en este documento, y no constituye
          fundamento válido para reclamación alguna.
        </P>
        <Hr />

        <Section n={1} title="Declaración de transparencia y propósito">
          <P>
            1.1 Confecciones Liss adopta la presente Política con el propósito
            de comunicar de forma transparente, clara e inequívoca el uso de
            herramientas de inteligencia artificial en la producción de
            contenido visual comercial, a fin de garantizar que el Usuario
            disponga de información suficiente para interpretar correctamente
            los materiales publicados por el Taller.
          </P>
          <P>
            1.2 El uso de IA por parte del Taller responde exclusivamente a
            finalidades de mejora estética, optimización visual y presentación
            comercial de productos reales y tangibles. En ningún caso el Taller
            utiliza IA para crear, inventar ni publicitar productos que no pueda
            confeccionar o que no existan en su repertorio de fabricación.
          </P>
          <P>
            1.3 Confecciones Liss opera bajo el principio de que la realidad
            antecede a la representación: todo producto que aparece en el
            catálogo digital, redes sociales o cualquier material comercial del
            Taller tiene como origen un artículo físico real, confeccionado o
            confeccionable por el Taller, cuya existencia material precede en
            todos los casos a cualquier tratamiento o edición mediante IA.
          </P>
        </Section>
        <Hr />

        <Section n={2} title="Definiciones">
          <P>2.1 A los efectos de la presente Política, se entenderá por:</P>
          <div className="mb-3 space-y-4 pl-6">
            <P>
              <strong>
                a) &quot;Inteligencia Artificial&quot; o &quot;IA&quot;:
              </strong>{" "}
              cualquier sistema, herramienta, software o algoritmo de
              aprendizaje automático o generación asistida por computadora
              utilizado por el Taller para la edición, mejora, recreación o
              generación de elementos visuales en imágenes, fotografías o
              contenido multimedia de carácter comercial.
            </P>
            <P>
              <strong>
                b) &quot;Modelo IA&quot; o &quot;Liam Alejandro&quot;:
              </strong>{" "}
              personaje masculino de naturaleza artística y origen irreal, que
              responde al nombre de Liam Alejandro, creado íntegramente mediante
              herramientas de inteligencia artificial, utilizado como soporte
              visual para la presentación de prendas del Taller. El Modelo IA no
              corresponde a ninguna persona natural real, identificable o
              existente; ha sido generado de cero mediante tecnología
              computacional y no constituye la representación digitalizada de
              ningún ser humano. No obstante lo anterior, Liam Alejandro posee
              una ficha de identidad propia, con rasgos, denominación y carácter
              definidos, y cuenta con presencia oficial en Facebook bajo el
              perfil:{" "}
              <a
                href="https://www.facebook.com/confeccionliss.admin"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.facebook.com/confeccionliss.admin
              </a>{" "}
              donde se le atribuye el rol de modelo comercial del Taller. La
              gestión de dicho perfil, al igual que la de todos los Canales
              Oficiales del Taller listados en{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
              , está a cargo exclusivo del Encargado de Comunicaciones Carlos
              José Molina Villacorta. En ningún momento el Taller ha ocultado el
              origen artístico e irreal de Liam Alejandro; su naturaleza
              sintética es pública, declarada y de conocimiento general a través
              de la presente Política.
            </P>
            <P>
              <strong>c) &quot;Modelo Femenino Humano&quot;:</strong> persona
              natural real que ha participado en sesiones fotográficas para el
              Catálogo Digital del Taller, portando las prendas de la colección.
              Las imágenes del Modelo Femenino Humano pueden haber sido
              sometidas a edición con IA con fines de mejora estética
              (iluminación, fondo, detalles), pero la persona fotografiada es en
              todos los casos un ser humano real que otorgó su consentimiento
              para la sesión y cuya identidad no se oculta. El Modelo Femenino
              Humano no es una construcción computacional ni una figura generada
              artificialmente.
            </P>
            <P>
              <strong>d) &quot;Encargado de Comunicaciones&quot;:</strong>{" "}
              Carlos José Molina Villacorta, persona natural responsable de la
              gestión de todos los Canales Oficiales del Taller. El Encargado de
              Comunicaciones ha realizado apariciones en el Catálogo Digital del
              Taller en calidad de colaborador visual, cuyas imágenes han sido
              editadas con IA conforme a los procedimientos establecidos en la
              presente Política. Dichas apariciones son de conocimiento público
              y no constituyen uso no autorizado de imagen ni infracción de
              derecho alguno.
            </P>
            <P>
              <strong>e) &quot;Prenda Real&quot;:</strong> todo artículo textil
              confeccionado o confeccionable por el Taller, cuya existencia
              material, física y verificable es previa e independiente de
              cualquier tratamiento con IA. Una Prenda Real puede tocarse,
              medirse, fotografiarse y entregarse físicamente.
            </P>
            <P>
              <strong>f) &quot;Imagen Editada con IA&quot;:</strong> toda
              fotografía, render o composición visual en la que la IA ha
              intervenido para mejorar aspectos tales como iluminación, textura,
              color, fondo, presentación del producto, montaje sobre el Modelo
              IA u otros elementos estéticos, partiendo siempre de una Prenda
              Real como insumo base.
            </P>
            <P>
              <strong>g) &quot;Imagen Real sin Edición&quot;:</strong> toda
              fotografía publicada por el Taller en la que la prenda o el
              producto aparece en su estado visual original, sin intervención de
              herramientas de IA. El Taller publica este tipo de imágenes de
              forma periódica y reconoce el derecho del Usuario a recibirlas
              como referencia directa del producto físico.
            </P>
            <P>
              <strong>h) &quot;Catálogo Digital&quot;:</strong> el conjunto de
              imágenes, fichas y descripciones de productos publicadas en la
              Plataforma y en los canales oficiales del Taller, disponibles en{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
            <P>
              <strong>i) &quot;Canales Oficiales&quot;:</strong> la Plataforma
              web, las páginas y perfiles de redes sociales del Taller
              (Facebook, Instagram, TikTok y cualquier otra plataforma en la que
              el Taller tenga presencia oficial verificada), todos gestionados
              por el Encargado de Comunicaciones.
            </P>
          </div>
        </Section>
        <Hr />

        <Section
          n={3}
          title="Naturaleza y alcance del uso de IA en contenido visual"
        >
          <P>
            3.1{" "}
            <strong>
              TIPOLOGÍA DE MODELOS UTILIZADOS EN EL CATÁLOGO DIGITAL.
            </strong>{" "}
            El Taller emplea dos categorías distintas de soporte visual humano
            para la presentación de sus prendas, cuya naturaleza difiere
            sustancialmente y se declara de forma expresa en la presente
            Política:
          </P>
          <div className="mb-4 pl-6">
            <P>
              <strong>
                A) MODELO IA — LIAM ALEJANDRO — PERSONAJE ARTÍSTICO SINTÉTICO.
              </strong>
            </P>
            <P>
              Liam Alejandro, definido en el Artículo 2.1(b), es un personaje
              masculino de origen completamente irreal, creado mediante IA. El
              Usuario reconoce y acepta expresamente que:
            </P>
            <Ul
              items={[
                "a) Liam Alejandro es una construcción computacional completa. No es la imagen de ninguna persona natural real, ningún individuo identificable, ningún modelo fotográfico ni ninguna persona cuya identidad haya sido digitalizada, modificada o alterada.",
                "b) Liam Alejandro ha sido creado de cero mediante tecnología de generación por IA, sin partir de la fotografía, imagen, rostro, cuerpo ni identidad de ningún ser humano existente.",
                "c) A pesar de su origen irreal, Liam Alejandro posee rasgos visuales consistentes, una identidad artística propia y presencia en redes sociales. Esta construcción de identidad responde a una decisión artística y comercial del Taller. En ningún momento el Taller ha presentado a Liam Alejandro como una persona humana real, y su naturaleza irreal ha sido siempre pública y declarada.",
                "d) Cualquier semejanza visual de Liam Alejandro con personas naturales reales es puramente incidental, fortuita e involuntaria, y no implica representación, endorsement, autorización ni vinculación de ningún tipo con persona real alguna.",
                "e) Liam Alejandro no reemplaza, desplaza ni está vinculado a ninguna persona natural que haya prestado sus derechos de imagen al Taller.",
              ]}
            />
          </div>
          <div className="mb-4 pl-6">
            <P>
              <strong>B) MODELO FEMENINO HUMANO — PERSONA NATURAL REAL.</strong>
            </P>
            <P>
              El Catálogo Digital del Taller incluye asimismo imágenes de una
              persona natural real, definida en el Artículo 2.1(c) como
              &quot;Modelo Femenino Humano&quot;. El Usuario reconoce y acepta
              expresamente que:
            </P>
            <Ul
              items={[
                "a) El Modelo Femenino Humano es una persona real cuya participación en las sesiones fotográficas del Taller fue libre, voluntaria y consentida. No es una figura generada por IA ni una simulación computacional de ningún tipo.",
                "b) Las imágenes del Modelo Femenino Humano pueden haber sido sometidas a edición con IA con fines exclusivamente estéticos (mejora de iluminación, ajuste de fondo, nitidez de detalles del producto), pero la persona fotografiada es en todos los casos un ser humano real. La edición no altera la identidad ni la naturaleza humana del sujeto fotografiado.",
                "c) El hecho de que las imágenes del Modelo Femenino Humano sean editadas con IA no convierte a dicho modelo en una figura sintética ni elimina su condición de persona natural real. La edición es un tratamiento de la imagen, no una sustitución del sujeto.",
                "d) El Usuario no podrá reclamar engaño ni falta de transparencia con base en la coexistencia de ambas categorías de modelo en el Catálogo Digital, dado que ambas quedan expresamente definidas y distinguidas en la presente Política.",
              ]}
            />
          </div>
          <P>
            3.2{" "}
            <strong>
              USO DE IA EN LA PRESENTACIÓN DE PRENDAS E IMÁGENES SIN EDICIÓN.
            </strong>
            El Taller aplica herramientas de inteligencia artificial sobre
            imágenes de sus Prendas Reales con el exclusivo propósito de mejorar
            su presentación visual comercial. Adicionalmente, el Taller publica
            de forma periódica Imágenes Reales sin Edición, conforme a lo
            definido en el Artículo 2.1(g). El Usuario reconoce y acepta
            expresamente que:
          </P>
          <Ul
            items={[
              "a) El punto de partida de toda imagen publicada en el Catálogo Digital es siempre una Prenda Real. La IA no crea la prenda; recrea su presentación visual a partir del artículo físico existente.",
              "b) Las intervenciones de IA sobre la imagen de una prenda pueden incluir, sin limitarse a ello: mejora de iluminación, ajuste de color y tono, mejora de textura y acabado visual, eliminación o sustitución de fondo, montaje o composición de la prenda sobre el Modelo IA, corrección de perspectiva o pliegues, y cualquier otro tratamiento estético que optimice la presentación comercial del producto.",
              "c) Ninguna de las intervenciones descritas en el literal anterior altera la naturaleza esencial de la prenda publicada, sus características funcionales, su composición de materiales, su método de confección ni su disponibilidad real para fabricación y entrega.",
              "d) Las mejoras visuales aplicadas mediante IA pueden generar diferencias de percepción entre la imagen publicada y el producto físico entregado, particularmente en lo referente a brillo, saturación de color, textura aparente o nitidez de detalles. Dichas diferencias son inherentes al proceso de edición y no constituyen publicidad engañosa, defecto del producto, incumplimiento contractual ni fundamento válido para devolución o reclamación.",
            ]}
          />
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            <P>
              e) El Catálogo Digital del Taller no está compuesto exclusivamente
              por Imágenes Editadas con IA. El Taller publica también Imágenes
              Reales sin Edición de sus productos, las cuales reflejan fielmente
              el aspecto físico de la prenda sin ningún tratamiento de mejora
              artificial. El Usuario tiene derecho a solicitar Imágenes Reales
              sin Edición de cualquier producto antes de efectuar su pedido, a
              través de los canales oficiales disponibles en:{" "}
              <Link
                href="/links"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/links
              </Link>
            </P>
          </div>
          <P>
            3.3 <strong>DIRECCIÓN DEL PROCESO DE PRODUCCIÓN.</strong> El flujo
            de trabajo del Taller es invariablemente el siguiente, en el orden
            aquí establecido y en ningún otro:
          </P>
          <div className="mb-3 space-y-2 pl-6 font-semibold text-slate-700">
            <P>PRIMERO: El Taller confecciona o dispone de la Prenda Real.</P>
            <P>
              SEGUNDO: La Prenda Real es fotografiada o documentada en su estado
              físico.
            </P>
            <P>
              TERCERO: La imagen de la Prenda Real es procesada mediante IA para
              mejorar su presentación visual.
            </P>
            <P>
              CUARTO: La imagen resultante es publicada en el Catálogo Digital.
            </P>
          </div>
          <P>
            Bajo ninguna circunstancia el Taller invierte este proceso
            publicando imágenes de prendas cuya existencia física dependa de la
            imagen generada o sugerida por IA. La IA es exclusivamente una
            herramienta de presentación, no una herramienta de diseño de
            productos nuevos ni de invención de artículos inexistentes.
          </P>
        </Section>
        <Hr />

        <Section n={4} title="Garantía de autenticidad y veracidad comercial">
          <P>
            4.1 El Taller garantiza de forma expresa e irrevocable que todo
            producto publicado en su Catálogo Digital, en sus redes sociales y
            en cualquier material de comunicación comercial es un producto real
            que el Taller puede confeccionar y entregar. Esta garantía se
            extiende a todos los artículos publicados, sin excepción.
          </P>
          <P>
            4.2 El Taller no publica bajo ninguna circunstancia imágenes de
            productos ficticios, de artículos que no puede confeccionar, de
            prendas diseñadas exclusivamente por IA sin correlato físico real,
            ni de productos que existan únicamente como imagen digital.
          </P>
          <P>
            4.3 El Usuario puede verificar la autenticidad y disponibilidad de
            cualquier prenda publicada comunicándose con el Taller a través de
            los canales oficiales disponibles en:
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
            4.4 La existencia de mejoras visuales mediante IA en las imágenes
            del Catálogo Digital no desvirtúa ni invalida la garantía de
            autenticidad establecida en el numeral 4.1. La presentación visual
            mejorada no altera la realidad del producto, sino únicamente su
            representación fotográfica.
          </P>
        </Section>
        <Hr />

        <Section
          n={5}
          title="Diferencias visuales entre imagen publicada y producto físico"
        >
          <P>
            5.1 El Usuario reconoce y acepta expresamente que las imágenes
            publicadas por el Taller en su Catálogo Digital y canales de
            comunicación han sido sometidas a tratamiento de edición mediante IA
            con fines de presentación comercial y que, en consecuencia, pueden
            existir diferencias perceptibles entre la imagen publicada y el
            producto físico entregado.
          </P>
          <P>
            5.2 Las posibles diferencias entre la imagen publicada y el producto
            físico pueden incluir, sin limitarse a ello: variaciones en la
            saturación, brillo o tono del color; diferencias en la percepción de
            textura o grosor del tejido; variaciones en la nitidez o definición
            visual de costuras y detalles; diferencias en el contexto de
            presentación o fondo de la imagen.
          </P>
          <P>
            5.3 Las diferencias descritas en el numeral anterior son
            consecuencia directa e inevitable del proceso de edición y mejora
            visual mediante IA, y son de conocimiento expreso del Usuario desde
            el momento en que accede al contenido del Taller. En consecuencia,
            dichas diferencias:
          </P>
          <Ul
            items={[
              "a) No constituyen publicidad engañosa ni falsa representación del producto.",
              "b) No constituyen incumplimiento de ninguna obligación contractual del Taller.",
              "c) No fundamentan reclamo alguno por diferencia entre lo ofrecido y lo entregado, siempre que el producto físico corresponda en sus características esenciales (tipo de prenda, modelo, talla y color base) a lo acordado entre las partes.",
              "d) No fundamentan solicitud de devolución, cambio ni reembolso con base exclusiva en la diferencia visual entre imagen editada y producto físico.",
            ]}
          />
          <P>
            5.4 Para cualquier consulta sobre el aspecto o características
            reales de una prenda antes de efectuar un pedido, el Usuario deberá
            comunicarse con el Taller a través de sus canales oficiales. El
            Taller hará sus mejores esfuerzos por proporcionar información
            adicional, incluyendo fotografías sin edición cuando sea posible.
          </P>
          <P>
            5.5 Toda diferencia visual entre la imagen publicada y el producto
            físico deberá haberse comunicado al Taller dentro de los plazos
            establecidos en la Política de Devoluciones, disponible en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              marginBottom: "0.75rem",
            }}
          >
            <Link
              href="/legal/devoluciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/devoluciones
            </Link>
          </div>
          <P>
            Transcurridos dichos plazos, el Taller no estará obligado a atender
            ninguna reclamación de esta naturaleza.
          </P>
        </Section>
        <Hr />

        <Section
          n={6}
          title="Naturaleza jurídica de los modelos: derechos de imagen y protección de identidad"
        >
          <P>
            6.1 <strong>LIAM ALEJANDRO (MODELO IA) — RÉGIMEN JURÍDICO.</strong>{" "}
            Liam Alejandro, el Modelo IA utilizado por el Taller en sus
            contenidos visuales, es una construcción sintética masculina
            generada mediante inteligencia artificial. No tiene identidad civil
            reconocible en el ordenamiento jurídico salvadoreño como persona
            natural, no tiene derechos de imagen atribuibles a ninguna persona
            física, y no ha sido creado a partir de fotografías, datos
            biométricos ni imagen de ningún ser humano real. Su perfil en
            Facebook ({" "}
            <a
              href="https://www.facebook.com/confeccionliss.admin"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-blue-600 hover:underline"
            >
              https://www.facebook.com/confeccionliss.admin
            </a>{" "}
            ) constituye una extensión artística y comercial de su identidad
            ficticia, gestionada en todo momento por el Encargado de
            Comunicaciones, sin que dicha presencia digital implique atribución
            de personalidad jurídica ni derechos civiles al personaje.
          </P>
          <P>
            6.2 Dado que Liam Alejandro no representa a ninguna persona natural,
            el Usuario queda expresamente impedido de:
          </P>
          <Ul
            items={[
              "a) Reclamar al Taller por supuesta utilización no autorizada de la imagen de una persona concreta, con base en el parecido visual de Liam Alejandro con algún individuo real.",
              "b) Exigir la retirada de contenido bajo el argumento de que Liam Alejandro reproduce o se asemeja a su propia imagen o la de un tercero.",
              "c) Atribuir al Taller responsabilidad civil o de cualquier otra índole derivada del parecido casual de Liam Alejandro con personas reales.",
              "d) Cuestionar la transparencia del Taller respecto a Liam Alejandro, dado que su naturaleza irreal ha sido pública y declarada en todo momento a través de la presente Política, disponible en los Canales Oficiales.",
            ]}
          />
          <P>
            6.3 El Taller, en el diseño y selección de Liam Alejandro, ha
            actuado de buena fe y con la debida diligencia para que la figura
            generada no constituya representación identificable de ninguna
            persona natural existente. Cualquier semejanza visual involuntaria
            de Liam Alejandro con persona real alguna no genera derecho a
            indemnización ni a reclamo de ningún tipo en contra del Taller.
          </P>
          <P>
            6.4 <strong>MODELO FEMENINO HUMANO — RÉGIMEN JURÍDICO.</strong> Las
            imágenes del Modelo Femenino Humano publicadas en el Catálogo
            Digital del Taller fueron obtenidas con el pleno consentimiento de
            la persona fotografiada. El Taller garantiza que:
          </P>
          <Ul
            items={[
              "a) La participación del Modelo Femenino Humano fue libre y voluntaria.",
              "b) El tratamiento de edición con IA aplicado sobre dichas imágenes se limitó a mejoras estéticas del entorno visual y de la presentación del producto, sin alterar la identidad ni la apariencia esencial de la persona fotografiada de manera que pudiera considerarse engañosa o lesiva para su imagen.",
              "c) El Taller asume plena responsabilidad por el uso adecuado de las imágenes del Modelo Femenino Humano dentro de los términos acordados.",
            ]}
          />
          <P>
            6.5 <strong>APARICIONES DEL ENCARGADO DE COMUNICACIONES.</strong> El
            Encargado de Comunicaciones, Carlos José Molina Villacorta, ha
            realizado apariciones en el Catálogo Digital del Taller en calidad
            de colaborador visual, con su propio consentimiento expreso. Dichas
            apariciones han sido editadas con IA conforme a los procedimientos
            establecidos en la presente Política. El Usuario reconoce que estas
            apariciones son de carácter público y comercial, y que no
            constituyen uso no autorizado de imagen ni infracción de derecho
            alguno.
          </P>
          <P>
            6.6 Liam Alejandro, los parámetros utilizados para su generación,
            las imágenes resultantes, su identidad artística y el proceso
            creativo que los rodea constituyen activos comerciales del Taller,
            protegidos por los principios generales de propiedad intelectual
            aplicables en El Salvador. Queda expresamente prohibida su
            reproducción, copia, alteración o uso comercial sin autorización
            escrita del Taller.
          </P>
        </Section>
        <Hr />

        <Section
          n={7}
          title="Propiedad intelectual del contenido generado con IA"
        >
          <P>
            7.1 Todo el contenido visual publicado por el Taller, incluyendo las
            imágenes de productos editadas con IA, las composiciones del Modelo
            IA portando prendas del Taller, los materiales de campaña y
            cualquier otro elemento gráfico de carácter comercial, es propiedad
            exclusiva del Taller o ha sido utilizado bajo licencia válida.
          </P>
          <P>
            7.2 El Usuario obtiene únicamente una licencia limitada, personal,
            no exclusiva, intransferible y revocable para visualizar el
            contenido del Taller con el exclusivo propósito de explorar el
            catálogo y evaluar la adquisición de productos. Esta licencia no
            autoriza la descarga, copia, reproducción, distribución,
            modificación, uso comercial ni publicación del contenido en ningún
            medio o plataforma.
          </P>
          <P>
            7.3 El uso no autorizado del contenido visual del Taller, incluyendo
            las imágenes editadas con IA, el Modelo IA, o cualquier material de
            campaña, faculta al Taller para ejercer las acciones legales que
            correspondan conforme a la legislación salvadoreña aplicable.
          </P>
        </Section>
        <Hr />

        <Section
          n={8}
          title="Exención de responsabilidad del taller por el uso de IA"
        >
          <P>
            8.1 En la máxima medida permitida por la legislación salvadoreña
            aplicable, Confecciones Liss queda expresamente eximido de toda
            responsabilidad derivada de los siguientes supuestos, sin que esta
            lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) Diferencias visuales entre las imágenes del catálogo, procesadas con IA, y el producto físico real entregado al Usuario, siempre que dichas diferencias sean consecuencia del proceso de edición y no correspondan a un cambio sustancial en las características esenciales del producto acordadas entre las partes.",
              "b) Expectativas estéticas del Usuario formadas a partir de las imágenes editadas del Catálogo Digital que no se vean satisfechas por el producto físico, cuando dicha insatisfacción de-rive exclusivamente de la mejora visual aplicada por IA y no de un defecto de fabricación real o de un incumplimiento del Taller en las especificaciones acordadas.",
              "c) Confusión o error del Usuario respecto a si el contenido visual del Taller ha sido edi-tado con IA, dado que la presente Política declara dicho uso de forma expresa, pública y accesible, y es vinculante desde el momento en que el Usuario accede a cualquier canal oficial del Taller.",
              "d) Reclamaciones basadas en la apariencia del Modelo IA, incluyendo su parecido casual con personas reales, su tamaño o proporciones corporales, o cualquier característica estética de la figura generada.",
              "e) Decisiones de compra adoptadas por el Usuario basándose exclusiva o principalmente en las imágenes del catálogo sin haber consultado previamente con el Taller sobre las características específicas de la prenda.",
              "f) Interpretaciones incorrectas del contenido visual del Taller derivadas del desconoci-miento de la presente Política por parte del Usuario.",
              "g) Cualquier controversia, reclamo o responsabilidad legal que el Usuario intente derivar del uso de IA en los contenidos comerciales del Taller, siempre que dicho uso sea conforme a lo establecido en la presente Política.",
            ]}
          />
          <P>
            8.2 La exención de responsabilidad establecida en el numeral
            anterior no opera en caso de que el Taller publique imágenes de
            productos que no puede confeccionar ni entregar, supuesto que el
            Taller declara de forma expresa que no ocurrirá en ningún caso
            conforme al Artículo 4.
          </P>
        </Section>
        <Hr />

        <Section
          n={9}
          title="Divulgación obligatoria, consentimiento informado y derecho a la información del usuario"
        >
          <P>
            9.1 La presente Política constituye la divulgación oficial y
            suficiente del Taller respecto a su uso de inteligencia artificial
            en la producción de contenido visual. Su publicación en
            https://www.confeccionesliss.com/legal y su inclusión en el
            repositorio de políticas del Taller hacen presumir de pleno derecho
            el conocimiento de la presente Política por parte de todo Usuario
            que acceda a cualquier contenido del Taller.
          </P>
          <P>
            9.2 Al visualizar, compartir, comentar, guardar en favoritos,
            consultar o interactuar de cualquier modo con el contenido comercial
            del Taller — ya sea en la Plataforma, en redes sociales, en
            aplicaciones de mensajería o en cualquier otro canal — el Usuario
            declara de forma tácita e irrevocable haber tomado conocimiento de
            la presente Política y haber aceptado en su integridad sus términos
            y condiciones.
          </P>
          <P>
            9.3 El Taller no está obligado a incluir avisos, etiquetas, marcas
            de agua ni notas específicas en cada imagen individual que indiquen
            el uso de IA, dado que la presente Política establece dicho uso de
            manera general y aplicable a la totalidad del contenido visual del
            Taller. La ausencia de aviso individualizado en una imagen concreta
            no desvirtúa la aplicabilidad de la presente Política a dicha
            imagen.
          </P>
          <P>
            9.4 <strong>DERECHO A LA INFORMACIÓN.</strong> El Usuario tiene el
            derecho expreso e irrenunciable de recibir información clara sobre
            la naturaleza del contenido visual publicado por el Taller. En
            ejercicio de dicho derecho, el Usuario podrá en todo momento:
          </P>
          <Ul
            items={[
              "a) Solicitar al Taller la aclaración sobre si una imagen específica del Catálogo Digital corresponde a una Imagen Editada con IA, a una Imagen Real sin Edición, o a una imagen del Modelo Femenino Humano o del Encargado de Comunicaciones.",
              "b) Solicitar Imágenes Reales sin Edición de cualquier producto de interés antes de efec-tuar su pedido, a través de los canales oficiales disponibles en https://www.confeccionesliss.com/links",
            ]}
          />
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            <P>
              c) Consultar la totalidad de sus derechos como Usuario del Taller
              en:{" "}
              <Link
                href="/legal/derecho"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/derecho
              </Link>
            </P>
          </div>
          <div style={{ paddingLeft: "1.5rem", marginBottom: "0.75rem" }}>
            <P>
              d) Consultar la totalidad de sus deberes como Usuario del Taller
              en:{" "}
              <Link
                href="/legal/deberes"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </P>
          </div>
          <P>
            9.5 El ejercicio de los derechos establecidos en el numeral anterior
            no suspende ni modifica las condiciones comerciales aplicables al
            pedido del Usuario, ni otorga derechos adicionales de devolución o
            reembolso más allá de los establecidos en la Política de
            Devoluciones del Taller.
          </P>
        </Section>
        <Hr />

        <Section n={10} title="Relación con otras políticas del taller">
          <P>
            10.1 La presente Política forma parte integral del marco jurídico
            comercial de Confecciones Liss y debe interpretarse de forma
            complementaria y consistente con las demás políticas del Taller, en
            particular:
          </P>
          <div className="mb-3 space-y-2 pl-6">
            <P>
              — Términos y Condiciones de Uso:{" "}
              <Link
                href="/legal/terminos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/terminos
              </Link>
            </P>
            <P>
              — Política de Privacidad:{" "}
              <Link
                href="/legal/privacidad"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/privacidad
              </Link>
            </P>
            <P>
              — Política de Devoluciones:{" "}
              <Link
                href="/legal/devoluciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/devoluciones
              </Link>
            </P>
            <P>
              — Política de Confección:{" "}
              <Link
                href="/legal/confeccion"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/confeccion
              </Link>
            </P>
            <P>
              — Política de Envíos:{" "}
              <Link
                href="/legal/envios"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/envios
              </Link>
            </P>
            <P>
              — Política de Cotizaciones:{" "}
              <Link
                href="/legal/cotizaciones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/cotizaciones
              </Link>
            </P>
            <P>
              — Política de Promociones:{" "}
              <Link
                href="/legal/promociones"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/promociones
              </Link>
            </P>
            <P>
              — Programa de Referidos:{" "}
              <Link
                href="/legal/referidos"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/referidos
              </Link>
            </P>
            <P>
              — Derechos del Usuario:{" "}
              <Link
                href="/legal/derecho"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/derecho
              </Link>
            </P>
            <P>
              — Deberes del Usuario:{" "}
              <Link
                href="/legal/deberes"
                className="font-semibold text-blue-600 hover:underline"
              >
                https://www.confeccionesliss.com/legal/deberes
              </Link>
            </P>
          </div>
          <P>
            10.2 En caso de aparente conflicto entre la presente Política y
            cualquier otra política del Taller, prevalecerá la interpretación
            más favorable al principio de transparencia comercial y a la
            garantía de autenticidad de los productos establecida en el Artículo
            4.
          </P>
          <P>
            10.3 La Política de Devoluciones es el instrumento específico que
            rige los plazos, condiciones y procedimientos aplicables a cualquier
            reclamación por diferencias entre la imagen del producto y el
            producto físico. Toda reclamación de esta naturaleza deberá
            gestionarse conforme a dicha Política, sin que la presente Política
            amplíe los derechos de devolución o reembolso del Usuario más allá
            de lo establecido en ella.
          </P>
        </Section>
        <Hr />

        <Section n={11} title="Canales oficiales de consulta y comunicación">
          <P>
            11.1 Toda consulta, solicitud de aclaración o comunicación
            relacionada con el uso de inteligencia artificial en el contenido
            del Taller, con la autenticidad de un producto publicado, o con
            cualquier aspecto regulado por la presente Política, deberá
            gestionarse exclusivamente a través de los canales oficiales de
            Confecciones Liss, disponibles en:
          </P>
          <div
            style={{
              paddingLeft: "1.5rem",
              fontWeight: "600",
              color: "#334155",
              marginBottom: "0.75rem",
            }}
          >
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
          </div>
          <P>
            11.2 El Taller no reconocerá reclamaciones, consultas ni
            comunicaciones gestionadas fuera de los canales oficiales. Cualquier
            promesa, aclaración o compromiso comunicado a través de canales no
            oficiales, personas no autorizadas o plataformas no verificadas es
            inválido e inoponible al Taller.
          </P>
          <P>
            11.3 El Taller atenderá las consultas relacionadas con esta Política
            dentro de sus horarios de atención habituales (Lunes a Sábado, 8:00
            AM – 5:00 PM) y a través del número de WhatsApp habilitado para
            comunicación comercial.
          </P>
        </Section>
        <Hr />

        <Section n={12} title="Resolución de disputas y jurisdicción aplicable">
          <P>
            12.1 Toda controversia que surja de la aplicación, interpretación o
            incumplimiento de la presente Política se resolverá en primera
            instancia mediante negociación directa de buena fe entre el Usuario
            y el Taller, a través de los canales oficiales establecidos en el
            Artículo 11.
          </P>
          <P>
            12.2 De no alcanzarse un acuerdo en un plazo razonable, la
            controversia se someterá a la jurisdicción exclusiva de los
            tribunales competentes de la República de El Salvador, aplicando la
            legislación salvadoreña vigente. El Usuario renuncia expresamente a
            cualquier otro fuero o jurisdicción que pudiera corresponderle.
          </P>
          <P>
            12.3 La legislación de la República de El Salvador es la única
            aplicable a la presente Política y a todas las relaciones jurídicas
            que de ella deriven, con exclusión de cualquier normativa
            extranjera, independientemente del lugar de residencia o domicilio
            del Usuario.
          </P>
        </Section>
        <Hr />

        <Section n={13} title="Modificaciones a la política">
          <P>
            13.1 Confecciones Liss se reserva el derecho de modificar,
            actualizar o ampliar la presente Política en cualquier momento,
            publicando la versión actualizada en los canales oficiales del
            Taller disponibles en:
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
            13.2 Las modificaciones entrarán en vigencia inmediatamente después
            de su publicación. El acceso continuado al contenido del Taller con
            posterioridad a la publicación de cualquier modificación constituirá
            aceptación automática e irrevocable de la versión actualizada de la
            Política.
          </P>
          <P>
            13.3 El Taller no está obligado a notificar individualmente a cada
            Usuario sobre las modificaciones a la presente Política. Es
            responsabilidad exclusiva del Usuario consultar periódicamente la
            versión vigente.
          </P>
        </Section>
        <Hr />

        <Section n={14} title="Divisibilidad">
          <P>
            14.1 Si alguna disposición de la presente Política fuera declarada
            inválida, ilegal o inaplicable por un tribunal competente, las
            restantes disposiciones continuarán en plena vigencia y efecto, sin
            que la invalidez parcial afecte la validez del conjunto del
            documento.
          </P>
          <P>
            14.2 En caso de que una disposición sea declarada inválida, el
            Taller y el Usuario realizarán sus mejores esfuerzos para acordar
            una disposición sustituta que, siendo legalmente válida, refleje en
            la mayor medida posible la intención original de la disposición
            inválida.
          </P>
        </Section>

        <LegalFootnote>
          CONFECCIONES LISS — CONTACTO OFICIAL
          <br />
          Toda gestión exclusivamente a través de:{" "}
          <Link href="/links" className="text-blue-600 hover:underline">
            https://www.confeccionesliss.com/links
          </Link>
          <br />
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
          </Link>{" "}
          · Derechos del Usuario:{" "}
          <Link href="/legal/derecho" className="text-blue-600 hover:underline">
            /legal/derecho
          </Link>{" "}
          · Deberes del Usuario:{" "}
          <Link href="/legal/deberes" className="text-blue-600 hover:underline">
            /legal/deberes
          </Link>
          <br />
          Perfil Modelo IA:{" "}
          <a
            href="https://www.facebook.com/confeccionliss.admin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            https://www.facebook.com/confeccionliss.admin
          </a>
          <br />
          <br />
          <strong>Dirección:</strong> Barrio La Merced, 5ª Calle Poniente y 1ª
          Avenida Sur, Casa #402, San Miguel, El Salvador.
          <br />
          <strong>Horario:</strong> Lunes a Sábado, 8:00 AM – 5:00 PM
          <br />
          <strong>Encargado de Comunicaciones:</strong> Carlos José Molina
          Villacorta
          <br />
          <br />
          Vigente desde su publicación — Versión: Junio 2026
        </LegalFootnote>
      </LegalArticleReader>
    </>
  );
}
