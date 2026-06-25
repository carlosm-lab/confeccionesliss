import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import { Section, Hr, P, Ul } from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Garantía y Calidad del Producto | Confecciones Liss",
  description:
    "Condiciones completas de garantía y calidad del producto de Confecciones Liss: Garantía Premier de Ajuste (medida), garantía de fabricación y cobertura en El Salvador.",
  keywords:
    "garantia uniformes, calidad de producto, confeccion a la medida, garantia liss, telas uniformes, Confecciones Liss, El Salvador",
  alternates: {
    canonical: `${siteConfig.url}/legal/garantia`,
  },
  openGraph: {
    title: "Política de Garantía y Calidad del Producto | Confecciones Liss",
    description:
      "Condiciones completas de garantía y calidad del producto de Confecciones Liss: Garantía Premier de Ajuste (medida), garantía de fabricación y cobertura en El Salvador.",
    url: `${siteConfig.url}/legal/garantia`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Garantía y Calidad del Producto | Confecciones Liss",
    description:
      "Condiciones completas de garantía y calidad del producto de Confecciones Liss: Garantía Premier de Ajuste (medida), garantía de fabricación y cobertura en El Salvador.",
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

export default function GarantiaPage() {
  const PAGE_URL = `${siteConfig.url}/legal/garantia`;
  const PAGE_TITLE = "Política de Garantía y Calidad del Producto";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Garantía y Calidad del Producto | Confecciones Liss",
          description:
            "Condiciones completas de garantía y calidad del producto de Confecciones Liss: Garantía Premier de Ajuste (medida), garantía de fabricación y cobertura en El Salvador.",
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
        title="Garantía de Producto"
        category="Condiciones de cobertura, plazos de reclamo por defectos de fábrica y soporte de calidad. Vigente desde su publicación — Junio 2026."
        date="25 Jun, 2026"
        readingTime={15}
      >
        {/* ── Preámbulo ────────────────────────────────────────────────────── */}
        <Section n={0} title="">
          <P>
            La presente Política de Garantía y Calidad del Producto (en adelante
            &quot;la Política&quot;) establece de manera integral, exhaustiva y
            vinculante el alcance, las condiciones, los límites y los
            procedimientos de las garantías que Confecciones Liss (en adelante
            &quot;el Taller&quot;) reconoce sobre los productos y servicios de
            confección que ofrece, así como las declaraciones de calidad de los
            materiales e insumos utilizados en su producción.
          </P>
          <P>
            Toda persona natural o jurídica que solicite, adquiera, reserve o
            encargue productos o servicios al Taller (en adelante &quot;el
            Cliente&quot;) declara, al formular dicha solicitud o efectuar
            cualquier pago, haber leído, comprendido y aceptado en su
            integridad, de forma libre, voluntaria e informada, la totalidad de
            los términos aquí establecidos.
          </P>
          <P>
            La garantía reconocida en la presente Política es la única a la que
            el Cliente tiene derecho. Ninguna garantía adicional, implícita,
            verbal o derivada de usos y costumbres del sector puede ser invocada
            por el Cliente contra el Taller. El desconocimiento de la presente
            Política no amplía los derechos del Cliente más allá de lo
            expresamente aquí establecido, y no le exime de los deberes cuyo
            cumplimiento es condición previa para el ejercicio de la garantía.
          </P>
          <P>
            La presente Política debe leerse e interpretarse de forma conjunta y
            complementaria con el marco normativo completo del Taller,
            disponible en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>{" "}
            y en particular con la Política de Confección disponible en:{" "}
            <Link
              href="/legal/confeccion"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/confeccion
            </Link>{" "}
            y con la Política de Devoluciones disponible en:{" "}
            <Link
              href="/legal/devoluciones"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/devoluciones
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── Art. 1 ───────────────────────────────────────────────────────── */}
        <Section n={1} title="Estructura del Sistema de Garantías">
          <P>
            <strong>1.1</strong> El sistema de garantías de Confecciones Liss
            comprende dos modalidades claramente diferenciadas, con condiciones,
            requisitos y alcances propios, que se excluyen mutuamente en función
            del tipo de producto y de la modalidad de confección contratada:
          </P>
          <Ul
            items={[
              "a) GARANTÍA PREMIER DE AJUSTE: aplicable exclusivamente a prendas confeccionadas bajo la modalidad de confección a la medida, conforme a los requisitos y condiciones establecidos en el Artículo 2 de la presente Política.",
              "b) GARANTÍA POR DEFECTO DE CONFECCIÓN O FABRICACIÓN: aplicable a cualquier prenda o producto confeccionado por el Taller, bajo cualquier modalidad, cuando el defecto sea objetivamente atribuible al proceso de confección del Taller, conforme a las condiciones establecidas en el Artículo 3 de la presente Política.",
            ]}
          />
          <P>
            <strong>1.2</strong> Los productos genéricos, complementarios y
            accesorios no confeccionados directamente por el Taller no están
            amparados por ninguna de las garantías anteriores, conforme a lo
            establecido en el Artículo 5 de la presente Política.
          </P>
          <P>
            <strong>1.3</strong> Ambas garantías tienen en común que no cubren
            inconformidades de carácter subjetivo del Cliente, conforme a lo
            establecido en el Artículo 4 de la presente Política. La distinción
            entre defecto objetivo de confección e inconformidad subjetiva del
            Cliente es el eje central del sistema de garantías del Taller.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 2 ───────────────────────────────────────────────────────── */}
        <Section
          n={2}
          title="Garantía Premier de Ajuste (Confección a la Medida)"
        >
          <P>
            <strong>2.1</strong> NATURALEZA Y ALCANCE. La Garantía Premier de
            Ajuste es la garantía de mayor alcance ofrecida por el Taller. Cubre
            el ajuste físico de la prenda al cuerpo del Cliente cuando la
            inconformidad sea objetivamente atribuible al proceso de toma de
            medidas o de confección realizado por el personal del Taller. Bajo
            esta garantía, el Taller se compromete a corregir el ajuste de la
            prenda sin costo adicional para el Cliente, incluyendo la
            reelaboración completa de la prenda desde cero si fuera necesario.
          </P>
          <P>
            <strong>2.2</strong> REQUISITOS DE ACCESO. La Garantía Premier de
            Ajuste es de acceso condicionado. Para que el Cliente pueda
            invocarla válidamente, deben cumplirse simultánea e ineludiblemente
            los tres requisitos siguientes, sin excepción ni flexibilización:
          </P>
          <Ul
            items={[
              "a) SOLICITUD EXPRESA Y PREVIA: El Cliente debe haber solicitado de forma explícita y documentada la modalidad de confección a la medida al momento de iniciar el proceso de cotización o pedido. La modalidad de confección a la medida no se aplica de oficio ni por defecto. El Cliente que no haya solicitado expresamente esta modalidad no puede invocar la garantía asociada a ella.",
              "b) ASISTENCIA PRESENCIAL OBLIGATORIA: El Cliente debe haber asistido de forma presencial a las instalaciones del Taller, ubicadas en Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur, Casa #402, San Miguel, El Salvador, para que el personal autorizado del Taller tome sus medidas corporales directamente. No se aceptan medidas tomadas por el Cliente de forma autónoma, proporcionadas de forma remota, enviadas por fotografía, video o cualquier otro medio indirecto. La toma de medidas realizada fuera de las instalaciones del Taller por personal no autorizado no genera derecho a esta garantía.",
              "c) PAGO DEL ANTICIPO CORRESPONDIENTE: El Cliente debe haber pagado el anticipo establecido en las condiciones de la Política de Confección del Taller, disponible en https://www.confeccionesliss.com/legal/confeccion, antes del inicio del proceso de producción. El Taller no inicia la confección a la medida sin anticipo previo, y la garantía no opera sobre pedidos cuyo anticipo no haya sido debidamente recibido y verificado.",
            ]}
          />
          <P>
            <strong>2.3</strong> COBERTURA DE LA GARANTÍA. Cumplidos los tres
            requisitos del numeral anterior, la Garantía Premier de Ajuste cubre
            lo siguiente:
          </P>
          <Ul
            items={[
              "a) AJUSTES CORRECTIVOS: El Taller realizará hasta un máximo de tres (3) ajustes correctivos gratuitos sobre la prenda, cuando el Cliente manifieste inconformidad objetiva con el ajuste y dicha inconformidad sea atribuible al proceso de toma de medidas o de confección del Taller.",
              "b) REELABORACIÓN COMPLETA: Si tras los ajustes correctivos la prenda no alcanza un ajuste adecuado por causas atribuibles al Taller — incluyendo errores en la toma de medidas, errores de corte o errores de costura que no sean subsanables mediante ajuste parcial — el Taller procederá a reelaborar la prenda desde cero, sin costo adicional para el Cliente.",
              "c) DETERMINACIÓN DEL MÉTODO. La decisión sobre si una inconformidad se resuelve mediante ajuste parcial o reelaboración completa corresponde exclusivamente al Taller, conforme a criterios técnicos objetivos.",
            ]}
          />
          <P>
            <strong>2.4</strong> PROCEDIMIENTO PARA INVOCAR LA GARANTÍA.
          </P>
          <Ul
            items={[
              "a) El Cliente debe comunicar la inconformidad de ajuste al Taller a través de los canales oficiales disponibles en https://www.confeccionesliss.com/links, dentro de los cinco (5) días hábiles siguientes a la recepción de la prenda.",
              "b) El Cliente debe presentar la prenda en las instalaciones del Taller portándola puesta, a fin de que el personal autorizado pueda evaluar objetivamente la inconformidad de ajuste.",
              "c) No se evaluarán inconformidades de ajuste reportadas únicamente por fotografía, video o descripción verbal sin presentación presencial de la prenda.",
              "d) El Taller evaluará la inconformidad y determinará si está cubierta por la garantía, comunicando al Cliente el resultado de dicha evaluación y el plazo estimado para la corrección.",
            ]}
          />
          <P>
            <strong>2.5</strong> LÍMITES DE LA GARANTÍA PREMIER DE AJUSTE. La
            Garantía Premier de Ajuste no cubre los siguientes supuestos, los
            cuales son de responsabilidad exclusiva del Cliente:
          </P>
          <Ul
            items={[
              "a) Cambios en las medidas corporales del Cliente ocurridos con posterioridad a la toma de medidas por el personal del Taller, incluyendo sin limitarse a: variaciones de peso, cambios posturales, embarazo u otras modificaciones corporales sobrevinientes.",
              "b) Inconformidades derivadas de la selección por parte del Cliente de un modelo, diseño o silueta de prenda que, por su naturaleza técnica, implica un ajuste determinado que el Cliente no conocía o no comprendía al momento de seleccionarlo. El Taller confecciona conforme al modelo solicitado; si el Cliente no comprendió cómo quedaría dicho modelo en su cuerpo, ello no constituye defecto del Taller.",
              "c) Solicitudes de modificación de diseño, modelo, tipo de prenda, largo, apertura o cualquier otro aspecto estructural distinto al ajuste corporal, cuando dichas modificaciones no fueron parte del acuerdo original.",
              "d) Inconformidades estéticas o subjetivas sobre aspectos aprobados por el Cliente antes del inicio de la producción, conforme al Artículo 4 de la presente Política.",
              "e) Desgaste, encogimiento, deformación o cualquier alteración de la prenda derivada del uso, el lavado o el cuidado inadecuado de la misma con posterioridad a su entrega.",
              "f) Inconformidades reportadas fuera del plazo de cinco (5) días hábiles establecido en el numeral 2.4(a).",
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 3 ───────────────────────────────────────────────────────── */}
        <Section n={3} title="Garantía por Defecto de Confección o Fabricación">
          <P>
            <strong>3.1</strong> NATURALEZA Y ALCANCE. La Garantía por Defecto
            de Confección o Fabricación aplica a cualquier prenda o producto
            confeccionado por el Taller, bajo cualquier modalidad de confección
            (por talla o a la medida), cuando se verifique la existencia de un
            defecto objetivo, visible y atribuible directamente al proceso de
            producción del Taller. Esta garantía cubre la corrección o
            reelaboración de la prenda defectuosa sin costo adicional para el
            Cliente.
          </P>
          <P>
            <strong>3.2</strong> SUPUESTOS CUBIERTOS. Se consideran defectos de
            confección o fabricación cubiertos por esta garantía, entre otros:
          </P>
          <Ul
            items={[
              "a) Costuras rotas, abiertas o mal ejecutadas que comprometan la integridad estructural de la prenda, presentes desde el momento de la entrega y no causadas por el uso posterior.",
              "b) Diferencias objetivas y medibles entre las especificaciones de diseño aprobadas por el Cliente y el producto efectivamente entregado, en aspectos atribuibles al proceso de confección del Taller.",
              "c) Defectos en la aplicación de bordados, sublimaciones u otras personalizaciones directamente atribuibles al proceso técnico del Taller — como desalineación severa, corte incorrecto o falla de fijación — y no al diseño proporcionado por el Cliente.",
              "d) Cualquier otro defecto objetivamente verificable, comprobable mediante evidencia física, y directamente atribuible a un error del proceso productivo del Taller.",
            ]}
          />
          <P>
            <strong>3.3</strong> PROCEDIMIENTO PARA INVOCAR LA GARANTÍA.
          </P>
          <Ul
            items={[
              "a) El Cliente debe comunicar el defecto al Taller a través de los canales oficiales disponibles en https://www.confeccionesliss.com/links, dentro de los cinco (5) días hábiles siguientes a la recepción de la prenda.",
              "b) La comunicación debe incluir evidencia fotográfica o de video clara y específica del defecto, con indicación de la ubicación exacta del mismo en la prenda.",
              "c) El Taller evaluará la evidencia presentada y determinará si el defecto reportado está cubierto por la garantía, comunicando al Cliente su decisión en un plazo razonable.",
              "d) Si el Taller confirma la existencia del defecto cubierto, procederá a la corrección o reelaboración de la prenda en el menor plazo posible, sujeto a su carga operativa.",
            ]}
          />
          <P>
            <strong>3.4</strong> LÍMITES DE LA GARANTÍA POR DEFECTO. La Garantía
            por Defecto de Confección no cubre los siguientes supuestos:
          </P>
          <Ul
            items={[
              "a) Inconformidades de carácter subjetivo del Cliente, conforme al Artículo 4 de la presente Política.",
              "b) Defectos derivados de la calidad de la tela o material cuando dicha tela o material haya sido elegida o proporcionada por el Cliente, conforme al Artículo 6.3 de la presente Política.",
              "c) Variaciones menores de tonalidad, textura o acabado propias de los procesos de producción textil e inherentes a la industria, que no comprometan la funcionalidad ni la integridad de la prenda.",
              "d) Daños, desgaste o defectos causados por el uso, el lavado, el planchado o el cuidado inadecuado de la prenda con posterioridad a su entrega.",
              "e) Defectos reportados fuera del plazo de cinco (5) días hábiles establecido en el numeral 3.3(a).",
              "f) Defectos atribuibles a diseños, archivos o especificaciones incorrectos proporcionados por el Cliente.",
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 4 ───────────────────────────────────────────────────────── */}
        <Section
          n={4}
          title="Exclusión Expresa: Inconformidades Subjetivas del Cliente"
        >
          <P>
            <strong>4.1</strong> PRINCIPIO GENERAL. Ninguna de las garantías
            establecidas en la presente Política ampara inconformidades de
            carácter subjetivo del Cliente. Se entiende por inconformidad
            subjetiva toda insatisfacción del Cliente que tenga su origen en
            preferencias personales, cambios de opinión, expectativas no
            documentadas, apreciaciones estéticas o cualquier otra circunstancia
            atribuible al propio Cliente y no a un defecto objetivo del proceso
            de confección del Taller.
          </P>
          <P>
            <strong>4.2</strong> SUPUESTOS EXPRESOS DE INCONFORMIDAD SUBJETIVA
            NO CUBIERTA. Sin que esta lista sea limitativa, los siguientes
            supuestos constituyen inconformidades subjetivas expresamente
            excluidas de toda garantía:
          </P>
          <Ul
            items={[
              "a) EL PROBLEMA ES EL CUERPO DEL CLIENTE, NO LA COSTURA. Cuando la prenda ha sido confeccionada correctamente conforme a las medidas tomadas o la talla seleccionada, pero el Cliente experimenta inconformidad porque el resultado no es el que esperaba en términos de cómo le sienta el modelo en su cuerpo, el volumen de determinadas zonas corporales, la percepción visual del ajuste o cualquier otra causa relacionada con la morfología o las expectativas corporales del Cliente, ello no constituye defecto del Taller ni activa garantía alguna. La prenda ha sido confeccionada correctamente; la inconformidad es con el propio cuerpo del Cliente, lo cual está fuera del alcance de la garantía.",
              "b) CAMBIO DE PARECER. El Cliente que aprobó un diseño, modelo, color, tipo de tela o cualquier otra especificación antes del inicio de la producción, y que con posterioridad a la entrega experimenta insatisfacción por haber cambiado de preferencia o criterio estético, no tiene derecho a invocar garantía alguna sobre dicha insatisfacción.",
              "c) EXPECTATIVAS NO DOCUMENTADAS. El Cliente que esperaba un resultado distinto al que se desprende de las especificaciones aprobadas — ya sea porque tenía en mente una imagen mental diferente, porque vio algo similar en otro lugar, o por cualquier otra expectativa no comunicada ni documentada al Taller antes del inicio de la producción — no puede invocar garantía sobre la diferencia entre su expectativa y el producto confeccionado conforme a lo acordado.",
              "d) INCONFORMIDAD CON LA IMAGEN EN CATÁLOGO. El Cliente que manifieste inconformidad basándose exclusivamente en que el producto físico luce diferente a las imágenes del Catálogo Digital del Taller, el cual utiliza edición con inteligencia artificial conforme a lo declarado en la Política de Uso de IA disponible en https://www.confeccionesliss.com/legal/ia, no tiene fundamento para invocar garantía alguna por dicha diferencia visual.",
              "e) INCONFORMIDAD CON MODELOS ESTÁNDAR DE TALLA. En la modalidad de confección por talla, el Cliente asume la responsabilidad de seleccionar la talla que corresponde a sus medidas. La inconformidad con el ajuste de una talla correctamente confeccionada conforme a las medidas estándar de dicha talla no activa ninguna garantía.",
            ]}
          />
          <P>
            <strong>4.3</strong> El Taller reconoce el derecho del Cliente a
            expresar inconformidades y se compromete a escucharlas con respeto y
            buena fe. Sin embargo, la obligación del Taller es confeccionar
            correctamente conforme a las especificaciones acordadas, no
            garantizar que el resultado satisfaga preferencias subjetivas no
            documentadas. La garantía cubre la calidad objetiva del trabajo del
            Taller, no la satisfacción personal del Cliente en términos
            subjetivos.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 5 ───────────────────────────────────────────────────────── */}
        <Section
          n={5}
          title="Productos Genéricos, Complementarios y Accesorios: Ausencia de Garantía"
        >
          <P>
            <strong>5.1</strong> Los productos genéricos, complementarios y
            accesorios que el Taller comercializa como parte de su oferta
            general — incluyendo sin limitarse a: calzado, artículos
            decorativos, flores de limpiapipas u otros elementos complementarios
            de precio menor — no son confeccionados directamente por el Taller
            y, en consecuencia, no están amparados por ninguna de las garantías
            establecidas en la presente Política.
          </P>
          <P>
            <strong>5.2</strong> IDENTIFICACIÓN POR RANGO DE PRECIO. El Taller
            maneja una escala de precios que refleja la naturaleza y origen de
            cada producto:
          </P>
          <Ul
            items={[
              "a) PRODUCTOS DE CONFECCIÓN PROPIA: Los uniformes, prendas y productos textiles confeccionados directamente por el Taller tienen un precio base de treinta dólares (USD $30.00) en adelante para prendas de confección estándar, y de treinta y cinco dólares (USD $35.00) para uniformes universitarios con personalización incluida. Estos productos están sujetos a las garantías establecidas en los Artículos 2 y 3 de la presente Política, según corresponda.",
              "b) PRODUCTOS GENÉRICOS Y ACCESORIOS: Los artículos cuyo precio es inferior a treinta dólares (USD $30.00) corresponden a productos genéricos, complementarios o accesorios que no son de fabricación propia del Taller. Dado su origen y naturaleza, se presume que no son artículos originales de confección propia, y por lo tanto no aplica ninguna clase de garantía sobre ellos.",
            ]}
          />
          <P>
            <strong>5.3</strong> RESPONSABILIDAD DEL CLIENTE EN PRODUCTOS
            GENÉRICOS. El Cliente que adquiera un producto genérico o accesorio
            del Taller tiene el deber de:
          </P>
          <Ul
            items={[
              "a) Verificar presencialmente, antes de adquirir el producto, que su calidad, acabado y características son de su satisfacción, dado que no existe posibilidad de garantía posterior.",
              "b) No inferir que la calidad, durabilidad ni características de los productos genéricos son equivalentes a las de los productos de confección propia del Taller.",
              "c) Aceptar el producto en el estado en que se encuentra al momento de la adquisición, sin derecho a reclamación posterior por calidad, acabado ni durabilidad.",
            ]}
          />
          <P>
            <strong>5.4</strong> El Taller no asume responsabilidad alguna por
            la calidad, durabilidad, funcionamiento ni características de los
            productos genéricos y accesorios que comercializa. La adquisición de
            dichos productos es de exclusiva responsabilidad del Cliente, quien
            los acepta en las condiciones en que se presentan al momento de la
            compra.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 6 ───────────────────────────────────────────────────────── */}
        <Section n={6} title="Declaración de Calidad de Materiales y Telas">
          <P>
            <strong>6.1</strong> El Taller utiliza en sus productos de
            confección propia telas e insumos de calidad comprobada,
            seleccionados conforme a los estándares técnicos del sector de la
            confección de uniformes y prendas institucionales. Los materiales
            estándar del Taller incluyen, sin limitarse a: Sincatex, Lino
            Oxford, Stretch, Antifluido y otras telas disponibles en el catálogo
            vigente del Taller. La disponibilidad de materiales está sujeta a
            existencia en inventario y puede variar sin previo aviso.
          </P>
          <P>
            <strong>6.2</strong> La selección de materiales por parte del Taller
            se basa en criterios de durabilidad, comodidad, presentación y
            adecuación al uso institucional. El Taller respalda la calidad de
            los materiales que selecciona de su propio catálogo e inventario.
          </P>
          <P>
            <strong>6.3</strong> MATERIALES ELEGIDOS O PROPORCIONADOS POR EL
            CLIENTE. Cuando el Cliente solicite la utilización de una tela,
            material o insumo específico que no forme parte del catálogo
            estándar del Taller — ya sea porque el Cliente lo elige de una lista
            de opciones externas, porque lo proporciona físicamente, o porque lo
            indica como requisito del pedido — aplican las siguientes
            condiciones sin excepción:
          </P>
          <Ul
            items={[
              "a) El Taller no asume responsabilidad alguna por los defectos, la calidad, la durabilidad, el comportamiento al lavado, el encogimiento, la decoloración ni ninguna otra característica negativa de la tela o material elegido o proporcionado por el Cliente.",
              "b) El uso de material elegido por el Cliente exime al Taller de la Garantía por Defecto de Confección establecida en el Artículo 3 en todo lo que sea atribuible a la calidad del material y no al proceso de costura del Taller.",
              "c) La calidad de confección del Taller — es decir, la ejecución técnica de la costura, el corte y el ensamblaje — sigue siendo responsabilidad del Taller con independencia del material utilizado. Solo los defectos atribuibles al material elegido por el Cliente quedan excluidos de la garantía.",
              "d) El Taller informará al Cliente, antes del inicio de la producción, sobre cualquier limitación técnica que el material elegido por el Cliente pueda implicar para el proceso de confección o el resultado final de la prenda.",
            ]}
          />
          <P>
            <strong>6.4</strong> Las telas y materiales de confección propia del
            Taller pueden presentar variaciones menores de tonalidad, textura o
            acabado entre distintos lotes de producción, situación inherente a
            la industria textil que no constituye defecto de fabricación ni
            genera derecho a reclamación, conforme a lo establecido en la
            Política de Confección del Taller.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 7 ───────────────────────────────────────────────────────── */}
        <Section
          n={7}
          title="Condiciones Generales de Ejercicio de la Garantía"
        >
          <P>
            <strong>7.1</strong> CUMPLIMIENTO PREVIO COMO CONDICIÓN. El Cliente
            solo puede invocar válidamente cualquiera de las garantías
            establecidas en la presente Política si ha cumplido previamente la
            totalidad de sus obligaciones con el Taller, incluyendo sin
            limitarse a:
          </P>
          <Ul
            items={[
              "a) Haber pagado el total del pedido conforme a las condiciones acordadas.",
              "b) Haber proporcionado información correcta, completa y verificada al Taller antes del inicio de la producción.",
              "c) Haber aprobado las especificaciones del pedido conforme al proceso establecido en la Política de Confección.",
              "d) Haber comunicado la inconformidad dentro de los plazos establecidos.",
              "e) Haber utilizado los canales oficiales para comunicar la inconformidad.",
            ]}
          />
          <P>
            El Cliente con pagos pendientes, información incorrecta no
            comunicada oportunamente, o que no haya cumplido cualquier otro
            deber establecido en la Política de Deberes del Usuario (disponible
            en{" "}
            <Link
              href="/legal/deberes"
              className="text-blue-600 hover:underline"
            >
              https://www.confeccionesliss.com/legal/deberes
            </Link>
            ), no puede invocar garantía alguna como si hubiera cumplido.
          </P>
          <P>
            <strong>7.2</strong> PRESENTACIÓN DE EVIDENCIA. El ejercicio de
            cualquier garantía requiere que el Cliente aporte evidencia objetiva
            y verificable que sustente la inconformidad reportada. Sin evidencia
            suficiente, el Taller no puede evaluar la procedencia de la garantía
            ni está obligado a atenderla.
          </P>
          <P>
            <strong>7.3</strong> PLAZO DE REPORTE. Las inconformidades objeto de
            garantía deben reportarse dentro de los cinco (5) días hábiles
            siguientes a la recepción de la prenda. El plazo se computa desde el
            momento en que el Cliente recibe físicamente la prenda,
            independientemente de si la ha probado o no. La expiración del plazo
            sin reporte extingue el derecho a invocar la garantía, con
            independencia de la causa o gravedad del defecto.
          </P>
          <P>
            <strong>7.4</strong> CANAL DE REPORTE. Todo reporte de garantía debe
            realizarse exclusivamente a través de los canales oficiales del
            Taller disponibles en:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            . Los reportes realizados fuera de los canales oficiales, o
            comunicados a personas no autorizadas del Taller, no generan
            obligación alguna para el Taller y no interrumpen el plazo de
            reporte.
          </P>
          <P>
            <strong>7.5</strong> La garantía se ejerce mediante corrección o
            reelaboración de la prenda. En ningún caso la garantía genera
            derecho a reembolso en efectivo, a cambio de producto diferente ni a
            compensación económica de ninguna clase, salvo disposición expresa
            contraria en la Política de Devoluciones del Taller o en acuerdo
            especial debidamente suscrito por las partes.
          </P>
          <P>
            <strong>7.6</strong> La garantía es personal e intransferible. Solo
            puede ser invocada por el Cliente que adquirió originalmente el
            producto y cuya información de pedido consta en los registros del
            Taller.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 8 ───────────────────────────────────────────────────────── */}
        <Section
          n={8}
          title="Responsabilidad del Cliente en Materia de Garantía"
        >
          <P>
            <strong>8.1</strong> El Cliente asume plena e irrevocable
            responsabilidad por:
          </P>
          <Ul
            items={[
              "a) La selección de la modalidad de confección: el Cliente que no solicitó confección a la medida no puede invocar la Garantía Premier de Ajuste.",
              "b) La exactitud de la información proporcionada al Taller: tallas, medidas, diseños, archivos y cualquier otro dato relevante para la confección.",
              "c) La validación oportuna de las especificaciones antes del inicio de la producción.",
              "d) La inspección de la prenda al momento de la entrega y la comunicación oportuna de cualquier inconformidad.",
              "e) El cuidado adecuado de la prenda con posterioridad a su entrega.",
              "f) La elección de materiales externos al catálogo estándar del Taller.",
            ]}
          />
          <P>
            <strong>8.2</strong> El Cliente que no cumpla con los requisitos de
            acceso específicos de cada garantía, conforme a los Artículos 2.2 y
            3.3, no puede invocar la garantía correspondiente como si los
            hubiera cumplido.
          </P>
          <P>
            <strong>8.3</strong> El Taller no puede garantizar resultados en
            situaciones que dependen de variables que el Cliente controla o que
            están fuera del control del Taller. La garantía es sobre la calidad
            objetiva del trabajo del Taller, no sobre factores externos.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 9 ───────────────────────────────────────────────────────── */}
        <Section n={9} title="Exención de Responsabilidad del Taller">
          <P>
            <strong>9.1</strong> En la máxima medida permitida por la
            legislación salvadoreña aplicable, el Taller queda expresamente
            eximido de toda responsabilidad en los siguientes supuestos, sin que
            esta lista sea limitativa:
          </P>
          <Ul
            items={[
              "a) Inconformidades de ajuste en prendas confeccionadas por talla, cuando el ajuste corresponde correctamente a la talla seleccionada por el Cliente.",
              "b) Inconformidades de ajuste en prendas confeccionadas a la medida, cuando la causa sea un cambio en las medidas corporales del Cliente posterior a la toma de medidas.",
              "c) Inconformidades de cualquier naturaleza de carácter subjetivo del Cliente, conforme al Artículo 4.",
              "d) Defectos de calidad o comportamiento de telas o materiales elegidos o proporcionados por el Cliente.",
              "e) Inconformidades reportadas fuera del plazo de cinco (5) días hábiles.",
              "f) Inconformidades reportadas fuera de los canales oficiales del Taller.",
              "g) Inconformidades sobre aspectos aprobados por el Cliente antes del inicio de la producción.",
              "h) Daños causados por el uso, lavado, planchado o cuidado inadecuado de la prenda.",
              "i) Cualquier inconformidad sobre productos genéricos o accesorios no confeccionados directamente por el Taller.",
              "j) Expectativas del Cliente no documentadas ni acordadas con el Taller.",
              "k) Daños indirectos, lucro cesante, daño emergente, daño moral o cualquier otro perjuicio consecuencial derivado de la inconformidad con el producto.",
            ]}
          />
          <P>
            <strong>9.2</strong> La responsabilidad máxima del Taller frente al
            Cliente, por cualquier causa directamente atribuible al Taller y
            debidamente acreditada, se limita a la corrección o reelaboración
            del producto específico objeto de la reclamación. En ningún caso la
            responsabilidad del Taller excederá el valor total de la prenda
            objeto de la reclamación, y en ningún caso incluirá reembolso en
            efectivo salvo en los supuestos expresamente establecidos en la
            Política de Devoluciones.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 10 ──────────────────────────────────────────────────────── */}
        <Section n={10} title="Relación con Otras Políticas del Taller">
          <P>
            <strong>10.1</strong> La presente Política forma parte integral del
            marco normativo de Confecciones Liss y debe leerse de forma
            complementaria con:
          </P>
          <Ul
            items={[
              "— Política de Confección: https://www.confeccionesliss.com/legal/confeccion",
              "— Política de Devoluciones: https://www.confeccionesliss.com/legal/devoluciones",
              "— Política de Cotizaciones: https://www.confeccionesliss.com/legal/cotizaciones",
              "— Política de Deberes del Usuario: https://www.confeccionesliss.com/legal/deberes",
              "— Política de Derechos del Usuario: https://www.confeccionesliss.com/legal/derechos",
              "— Política de Resolución de Disputas: https://www.confeccionesliss.com/legal/disputas",
              "— Política de Pedidos en Grupo y Mayoreo: https://www.confeccionesliss.com/legal/mayoreo",
              "— Política de Uso de Inteligencia Artificial: https://www.confeccionesliss.com/legal/ia",
              "— Directorio de canales oficiales: https://www.confeccionesliss.com/links",
            ]}
          />
          <P>
            <strong>10.2</strong> En caso de aparente conflicto entre la
            presente Política y la Política de Confección respecto a garantías
            de ajuste, prevalece la presente Política como instrumento
            específico de la materia. En todo lo no regulado por la presente
            Política, aplica el marco normativo general del Taller.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 11 ──────────────────────────────────────────────────────── */}
        <Section n={11} title="Modificaciones a la Política">
          <P>
            <strong>11.1</strong> El Taller se reserva el derecho de modificar
            la presente Política en cualquier momento y sin previo aviso,
            publicando la versión actualizada en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
          <P>
            <strong>11.2</strong> La versión vigente al momento del pago del
            anticipo del pedido será la aplicable a la garantía de dicho pedido.
            Las modificaciones no afectan retroactivamente las garantías ya
            activas sobre pedidos en producción o entregados bajo versiones
            anteriores de la Política.
          </P>
          <P>
            <strong>11.3</strong> El acceso continuado a los canales del Taller
            y la realización de nuevos pedidos con posterioridad a cualquier
            modificación constituye aceptación automática de la versión
            actualizada.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 12 ──────────────────────────────────────────────────────── */}
        <Section n={12} title="Divisibilidad">
          <P>
            <strong>12.1</strong> Si alguna disposición de la presente Política
            fuera declarada inválida o inaplicable por un tribunal competente de
            la República de El Salvador, las restantes disposiciones continuarán
            en plena vigencia. La disposición inválida será reemplazada por una
            válida que se aproxime al máximo a la intención original.
          </P>
        </Section>
        <Hr />

        {/* ── Resumen ──────────────────────────────────────────────────────── */}
        <Section n={13} title="Resumen de Garantías — Guía Rápida">
          <div className="my-6 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <span
                  className="material-symbols-outlined text-primary"
                  aria-hidden="true"
                >
                  workspace_premium
                </span>
                Garantía Premier de Ajuste
              </h3>
              <Ul
                items={[
                  "¿Quién accede?: Solo quien solicitó confección a la medida, asistió presencialmente y realizó el anticipo correspondiente.",
                  "¿Qué cubre?: Hasta 3 ajustes correctivos gratuitos o reelaboración completa desde cero si la causa es del Taller.",
                  "¿Qué NO cubre?: Cambios en las medidas corporales del cliente, selección de siluetas inapropiadas o inconformidad estética.",
                  "Plazo de reporte: 5 días hábiles a partir de la entrega de la prenda.",
                ]}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <span
                  className="material-symbols-outlined text-primary"
                  aria-hidden="true"
                >
                  verified
                </span>
                Garantía por Defecto de Fabricación
              </h3>
              <Ul
                items={[
                  "¿Quién accede?: Cualquier cliente de producto de confección propia del Taller (precios mayores o iguales a USD $30.00).",
                  "¿Qué cubre?: Defectos objetivos de costura, roturas de hilos, desalineación severa de bordados o sublimaciones del Taller.",
                  "¿Qué NO cubre?: Defectos del material exterior elegido por el cliente, variaciones normales de tono, daños por uso.",
                  "Plazo de reporte: 5 días hábiles a partir de la entrega de la prenda.",
                ]}
              />
            </div>

            <div className="rounded-xl border border-red-100 bg-red-50/20 p-5 shadow-sm dark:border-red-950/20 dark:bg-red-950/5">
              <h3 className="flex items-center gap-2 text-base font-bold text-red-800 dark:text-red-400">
                <span className="material-symbols-outlined" aria-hidden="true">
                  block
                </span>
                Sin Cobertura de Garantía
              </h3>
              <Ul
                items={[
                  "Productos genéricos y accesorios complementarios de reventa (precios inferiores a USD $30.00).",
                  "Inconformidades basadas en percepciones estéticas o cambios de parecer subjetivos del cliente.",
                  "Prendas de tallaje estándar con inconformidades de ajuste corporal general.",
                ]}
              />
            </div>
          </div>
        </Section>
        <Hr />

        {/* ── Contacto ─────────────────────────────────────────────────────── */}
        <Section n={14} title="Canales Oficiales y Datos de Contacto">
          <P>
            Toda gestión de garantía debe realizarse exclusivamente a través de:
          </P>
          <Ul
            items={[
              "— Directorio oficial: https://www.confeccionesliss.com/links",
              "— WhatsApp de atención: +503 7331-7181",
              "— Encargado de Comunicaciones: Carlos José Molina Villacorta",
              "— Teléfono de Escalamiento / Mediación: +503 7329-4499",
              "— Dirección física: Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur, Casa #402, San Miguel, El Salvador.",
              "— Horario: Lunes a Sábado, 8:00 AM – 5:00 PM",
            ]}
          />
        </Section>
      </LegalArticleReader>
    </>
  );
}
