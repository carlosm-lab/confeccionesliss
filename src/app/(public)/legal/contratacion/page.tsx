import { Icon } from "@/components/ui/icons/Icon";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildWebPageSchema, buildBreadcrumbSchema } from "@/lib/schemas";
import LegalArticleReader from "@/components/legal/LegalArticleReader";
import LegalHubBackground from "@/components/legal/LegalHubBackground";
import Link from "next/link";
import { Section, Hr, P, Ul } from "@/components/legal/LegalContent";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Vinculación y Contratación Liss",
  description:
    "Requisitos, derechos y condiciones de contratación en Confecciones Liss: trabajo a destajo por temporada y toda la colaboración profesional independiente.",
  keywords:
    "contratación de personal en confecciones liss, empleo en confecciones liss, trabajo a destajo de confecciones liss, talento confecciones liss",
  alternates: {
    canonical: `${siteConfig.url}/legal/contratacion`,
  },
  openGraph: {
    title: "Política de Vinculación y Contratación Liss | Confecciones Liss",
    description:
      "Requisitos, derechos y condiciones de contratación en Confecciones Liss: trabajo a destajo por temporada y toda la colaboración profesional independiente.",
    url: `${siteConfig.url}/legal/contratacion`,
    siteName: siteConfig.name,
    locale: "es_SV",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Política de Vinculación y Contratación Liss | Confecciones Liss",
    description:
      "Requisitos, derechos y condiciones de contratación en Confecciones Liss: trabajo a destajo por temporada y toda la colaboración profesional independiente.",
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

export default function ContratacionPage() {
  const PAGE_URL = `${siteConfig.url}/legal/contratacion`;
  const PAGE_TITLE = "Política de Contratación y Vinculación de Talento";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        ...buildWebPageSchema({
          url: PAGE_URL,
          name: "Política de Vinculación y Contratación Liss | Confecciones Liss",
          description:
            "Requisitos, derechos y condiciones de contratación en Confecciones Liss: trabajo a destajo por temporada y toda la colaboración profesional independiente.",
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
        title="Contratación y Vinculación de Talento"
        category="Modalidades de vinculación, requisitos, remuneración y condiciones del trabajo en Confecciones Liss. Vigente desde su publicación — Junio 2026."
        date="25 Jun, 2026"
        readingTime={12}
      >
        {/* ── Preámbulo ────────────────────────────────────────────────────── */}
        <Section n={0} title="">
          <P>
            La presente Política de Contratación y Vinculación de Talento (en
            adelante &quot;la Política&quot;) establece de manera integral,
            clara y vinculante las condiciones, modalidades, requisitos,
            derechos y límites bajo los cuales Confecciones Liss (en adelante
            &quot;el Taller&quot;) incorpora, vincula y gestiona a las personas
            naturales que prestan servicios de confección, producción textil y
            actividades relacionadas en favor del Taller, bajo cualquiera de las
            modalidades establecidas en el Artículo 3 de la presente Política.
          </P>
          <P>
            El presente documento es de carácter público e informativo. Toda
            persona natural que participe en un proceso de selección del Taller,
            preste servicios al Taller bajo cualquier modalidad, o manifieste
            interés en hacerlo (en adelante &quot;el Aspirante&quot; o &quot;el
            Colaborador&quot;, según la etapa del proceso), declara haber leído,
            comprendido y aceptado en su integridad, de forma libre, voluntaria
            e informada, los términos aquí establecidos.
          </P>
          <P>
            El Taller opera bajo los principios de transparencia, respeto a la
            dignidad del trabajo y cumplimiento de la legislación salvadoreña
            aplicable. La presente Política refleja la naturaleza real de las
            modalidades de vinculación del Taller y no pretende ocultar,
            disimular ni malinterpretar las condiciones de la relación entre el
            Taller y sus Colaboradores.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 1 ───────────────────────────────────────────────────────── */}
        <Section n={1} title="Filosofía de Vinculación del Taller">
          <P>
            <strong>1.1</strong> El Taller es un taller artesanal de confección
            a pequeña escala, especializado en la producción de uniformes
            médicos, institucionales y prendas personalizadas. Su modelo de
            operación es de naturaleza flexible, estacional y orientada a la
            demanda, lo que determina las modalidades de vinculación
            disponibles.
          </P>
          <P>
            <strong>1.2</strong> El Taller valora profundamente el oficio de la
            confección y reconoce en sus Colaboradores la fuente principal de su
            capacidad productiva. En consecuencia, el Taller se compromete a
            tratar a todo Aspirante y Colaborador con respeto, transparencia y
            buena fe en todas las etapas de la relación.
          </P>
          <P>
            <strong>1.3</strong> El Taller privilegia la calidad sobre el
            volumen en la selección de sus Colaboradores. Un equipo pequeño,
            competente y comprometido es preferible a un equipo numeroso pero
            heterogéneo en términos de habilidades y responsabilidad.
          </P>
          <P>
            <strong>1.4</strong> La flexibilidad que ofrecen las modalidades de
            vinculación del Taller es una característica intencional y
            mutuamente beneficiosa: permite al Colaborador gestionar su propio
            ritmo de producción y determinar en gran medida sus propios
            ingresos, y permite al Taller ajustar su capacidad productiva
            conforme a la demanda estacional.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 2 ───────────────────────────────────────────────────────── */}
        <Section n={2} title="Convocatoria y Proceso de Selección">
          <P>
            <strong>2.1</strong> PUBLICACIÓN DE CONVOCATORIAS. Las convocatorias
            de vinculación del Taller son publicadas de forma abierta y pública
            a través de los canales oficiales disponibles en:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            , incluyendo las redes sociales oficiales del Taller (Facebook,
            Instagram, TikTok y cualquier otro canal oficial listado en dicho
            directorio). Las convocatorias son de acceso libre y cualquier
            persona que cumpla los requisitos establecidos en el Artículo 4
            puede postularse.
          </P>
          <P>
            <strong>2.2</strong> PROCESO DE POSTULACIÓN. El Aspirante interesado
            puede iniciar su postulación contactando al Taller a través de los
            canales oficiales disponibles en{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            , manifestando su interés y proporcionando la información básica
            solicitada en la convocatoria. No existe un formulario de
            postulación único ni un proceso burocrático extenso: el Taller
            valora la iniciativa directa.
          </P>
          <P>
            <strong>2.3</strong> EVALUACIÓN PRÁCTICA. El proceso de selección es
            eminentemente práctico. El Aspirante que cumpla los requisitos
            básicos será invitado a realizar una prueba técnica presencial en
            las instalaciones del Taller, donde demostrará sus habilidades
            reales de confección. No se evalúa únicamente el currículum ni la
            experiencia declarada: se evalúa la capacidad técnica real del
            Aspirante mediante la ejecución de tareas de confección en
            condiciones similares a las del trabajo ordinario del Taller.
          </P>
          <P>
            <strong>2.4</strong> COMUNICACIÓN DEL RESULTADO. El Taller
            comunicará al Aspirante el resultado de su evaluación a través de
            los canales oficiales, sin demoras innecesarias. El Taller no está
            obligado a justificar la no selección de ningún Aspirante ni a
            proporcionar retroalimentación detallada sobre el proceso de
            evaluación, salvo que lo estime conveniente.
          </P>
          <P>
            <strong>2.5</strong> El proceso de selección no genera ningún
            derecho laboral ni económico para el Aspirante, independientemente
            de las etapas que haya completado. La participación en el proceso de
            selección es completamente voluntaria y no implica ningún compromiso
            de vinculación por parte del Taller.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 3 ───────────────────────────────────────────────────────── */}
        <Section n={3} title="Modalidades de Vinculación Disponibles">
          <P>
            <strong>3.1</strong> El Taller ofrece dos modalidades de
            vinculación, claramente diferenciadas en su naturaleza jurídica,
            condiciones y alcance. Ninguna de las dos modalidades es equivalente
            a la otra, y el Colaborador tiene pleno conocimiento de cuál aplica
            a su situación desde el inicio de la relación:
          </P>
          <Ul
            items={[
              "a) TRABAJO A DESTAJO POR TEMPORADA: Modalidad regulada por el Código de Trabajo de la República de El Salvador en su figura de trabajo a destajo o por obra, aplicable a personas naturales que prestan servicios de confección directamente en las instalaciones del Taller, bajo las condiciones establecidas en el Artículo 5 de la presente Política.",
              "b) COLABORACIÓN INDEPENDIENTE POR PROYECTO: Modalidad aplicable a personas naturales que prestan servicios especializados de forma autónoma, sin subordinación continuada al Taller, bajo las condiciones establecidas en el Artículo 6 de la presente Política.",
            ]}
          />
          <P>
            <strong>3.2</strong> El Taller determinará, conforme a las
            necesidades operativas de cada momento, cuál modalidad es aplicable
            a cada vinculación. El Aspirante será informado de la modalidad
            aplicable antes del inicio de cualquier prestación de servicios.
          </P>
          <P>
            <strong>3.3</strong> La modalidad de vinculación aplicable a cada
            Colaborador queda establecida desde el inicio de la relación y
            determina el marco de condiciones, derechos y límites aplicables
            conforme a los artículos correspondientes de la presente Política.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 4 ───────────────────────────────────────────────────────── */}
        <Section n={4} title="Perfil y Requisitos del Colaborador">
          <P>
            <strong>4.1</strong> PERFIL GENERAL. El Taller busca personas con
            vocación real por el oficio de la confección, disposición para el
            trabajo bajo presión de producción, responsabilidad personal sobre
            la calidad de su trabajo, disponibilidad efectiva durante las
            temporadas de mayor demanda, y lealtad hacia los compromisos
            adquiridos con el Taller.
          </P>
          <P>
            <strong>4.2</strong> REQUISITOS TÉCNICOS INDISPENSABLES. Para ser
            considerado en cualquier proceso de selección del Taller, el
            Aspirante debe acreditar, mediante demostración práctica durante la
            evaluación, el dominio de las siguientes competencias técnicas,
            todas ellas indispensables e irrenunciables:
          </P>
          <Ul
            items={[
              "a) EXPERIENCIA EN CONFECCIÓN DE UNIFORMES MÉDICOS O SCRUBS: Mínimo un (1) año de experiencia comprobable en la confección y elaboración de uniformes médicos (conocidos en el sector como «scrubs») en todos sus tipos, tallas y variantes. La experiencia debe ser real y verificable mediante demostración práctica; el Taller no acepta experiencia meramente declarada sin respaldo en la prueba técnica.",
              "b) MANEJO DE TELAS DIVERSAS: Capacidad demostrada para trabajar con los tipos de tela utilizados por el Taller en su producción habitual, incluyendo sin limitarse a: Sincatex, Lino Oxford, Stretch, Antifluido y otras telas de uso común en la confección de uniformes institucionales. El Colaborador debe conocer el comportamiento, las propiedades y las técnicas específicas de manejo de cada tipo de tela.",
              "c) MANEJO DE MÁQUINA DE COSER: Dominio técnico comprobado de máquina de coser industrial o doméstica de alta producción, incluyendo regulación de tensión, cambio de aguja, enhebrado y resolución de fallas técnicas básicas durante la jornada de trabajo.",
              "d) DOMINIO DE CORTE: Habilidad para el corte preciso de tela conforme a patrones y moldes, tanto en corte individual como en corte de múltiples capas para producción en serie.",
              "e) MANEJO DE BORDADORA O MÁQUINA RANA (OVERLOCK): Conocimiento y dominio del uso de máquina rana (overlock) para la unión y acabado de piezas. Esta competencia es indispensable para la elaboración de uniformes terminados con la calidad que el Taller exige. El manejo de bordadora es igualmente valorado como competencia complementaria.",
            ]}
          />
          <P>
            <strong>4.3</strong> REQUISITOS DE ACTITUD Y DISPOSICIÓN.
            Adicionalmente a los requisitos técnicos, el Taller valora y
            requiere en sus Colaboradores:
          </P>
          <Ul
            items={[
              "a) Responsabilidad: cumplimiento de los compromisos de producción acordados sin necesidad de supervisión constante.",
              "b) Disponibilidad: capacidad real de participar activamente durante las temporadas de mayor demanda, que pueden requerir jornadas de mayor intensidad.",
              "c) Lealtad: discreción sobre los procesos, clientes, diseños y operaciones del Taller; compromiso con la calidad del trabajo como representación del nombre del Taller.",
              "d) Tolerancia al trabajo bajo presión: capacidad para mantener la calidad del trabajo en contextos de alta demanda y plazos ajustados, propios de la naturaleza estacional del negocio de confección de uniformes.",
            ]}
          />
          <P>
            <strong>4.4</strong> El incumplimiento de cualquiera de los
            requisitos técnicos establecidos en el numeral 4.2 es causa
            suficiente para la no selección del Aspirante o para la terminación
            de la vinculación del Colaborador, sin que ello genere derecho a
            compensación alguna.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 5 ───────────────────────────────────────────────────────── */}
        <Section n={5} title="Modalidad A: Trabajo a Destajo por Temporada">
          <P>
            <strong>5.1</strong> NATURALEZA JURÍDICA. El trabajo a destajo es
            una modalidad reconocida y regulada por el Código de Trabajo de la
            República de El Salvador, conforme a la cual la remuneración del
            trabajador se determina en función de la cantidad de obra o piezas
            producidas, y no en función del tiempo trabajado. Esta modalidad es
            de uso extendido en el sector textil y de confección salvadoreño.
          </P>
          <P>
            <strong>5.2</strong> CARÁCTER ESTACIONAL. Las vinculaciones bajo
            esta modalidad son de carácter estacional y temporal, sujetas a la
            demanda de producción del Taller en cada período. El Taller no
            garantiza continuidad de trabajo entre temporadas ni volumen mínimo
            de producción en ningún período.
          </P>
          <P>
            <strong>5.3</strong> REMUNERACIÓN POR PIEZA. La remuneración del
            Colaborador bajo esta modalidad se calcula conforme al siguiente
            esquema:
          </P>
          <Ul
            items={[
              "Valor por uniforme completo terminado: cinco dólares (USD $5.00) por unidad. Los precios por otras piezas pueden variar y se acordarán con la persona autorizada.",
              "Producción habitual de un Colaborador experimentado: entre tres (3) y siete (7) uniformes por jornada, lo que representa un ingreso diario estimado de entre USD $15.00 y USD $35.00, superando el salario mínimo vigente para el sector textil en El Salvador (USD $12.00 por jornada ordinaria a la fecha de publicación).",
            ]}
          />
          <P>
            El ingreso real del Colaborador depende exclusivamente de su propia
            productividad, habilidad y tiempo efectivo dedicado al trabajo. El
            Taller no garantiza un ingreso mínimo diario, semanal ni mensual
            bajo esta modalidad.
          </P>
          <P>
            <strong>5.4</strong> AUTONOMÍA EN LA JORNADA. El Colaborador bajo
            esta modalidad tiene plena autonomía para determinar el momento de
            inicio de su jornada dentro del horario de operación del Taller:
          </P>
          <Ul
            items={[
              "Lunes a Viernes: 8:00 AM a 5:00 PM",
              "Sábados: 8:00 AM a 12:00 PM (mediodía)",
            ]}
          />
          <P>
            No existe marcaje de entrada obligatorio ni penalización por inicio
            tardío. Sin embargo, el Colaborador asume que las horas no
            trabajadas dentro del horario disponible impactan directamente en su
            producción y, en consecuencia, en su remuneración.
          </P>
          <P>
            <strong>5.5</strong> INSTALACIONES Y HERRAMIENTAS. El trabajo bajo
            esta modalidad se presta en las instalaciones del Taller, ubicadas
            en Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur, Casa #402,
            San Miguel, El Salvador. El Taller pone a disposición del
            Colaborador el espacio de trabajo y los equipos necesarios para la
            confección. El Colaborador es responsable del cuidado y uso adecuado
            de los equipos, materiales e instalaciones del Taller.
          </P>
          <P>
            <strong>5.6</strong> CALIDAD DE LA PRODUCCIÓN. El Colaborador es
            responsable de la calidad del trabajo que produce. Las prendas que
            presenten defectos de confección atribuibles al Colaborador —
            costuras defectuosas, cortes imprecisos, acabados inadecuados —
            serán señaladas por el Taller para su corrección. Las correcciones
            requeridas por defectos propios del Colaborador no generan
            remuneración adicional y son responsabilidad exclusiva del
            Colaborador.
          </P>
          <P>
            <strong>5.7</strong> PAGO DE LA REMUNERACIÓN. El pago de la
            remuneración a destajo se realizará conforme a la periodicidad y
            modalidad acordada entre el Taller y el Colaborador al inicio de la
            vinculación, a través de los medios de pago habilitados por el
            Taller. El Colaborador recibirá información sobre la periodicidad de
            pago al inicio de cada temporada de trabajo.
          </P>
          <P>
            <strong>5.8</strong> TERMINACIÓN DE LA VINCULACIÓN. La vinculación
            bajo esta modalidad puede ser terminada por cualquiera de las
            partes, con o sin expresión de causa, conforme a la naturaleza
            estacional y temporal de la relación. La terminación de la
            vinculación por parte del Taller al final de una temporada no genera
            derecho a compensación adicional más allá de la remuneración por
            piezas efectivamente producidas y no pagadas hasta la fecha de
            terminación.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 6 ───────────────────────────────────────────────────────── */}
        <Section
          n={6}
          title="Modalidad B: Colaboración Independiente por Proyecto"
        >
          <P>
            <strong>6.1</strong> NATURALEZA JURÍDICA. La colaboración
            independiente es una modalidad en la que el Colaborador presta
            servicios especializados al Taller de forma autónoma, sin
            subordinación continuada, sin integración permanente al proceso
            productivo del Taller, y con plena independencia en cuanto a sus
            métodos, tiempos y lugar de trabajo, conforme a los términos
            específicos de cada proyecto o encargo.
          </P>
          <P>
            <strong>6.2</strong> CARACTERÍSTICAS DISTINTIVAS. La colaboración
            independiente se distingue del trabajo a destajo en los siguientes
            aspectos:
          </P>
          <Ul
            items={[
              "a) El Colaborador independiente no está obligado a prestar sus servicios en las instalaciones del Taller, salvo que el proyecto específico así lo requiera y sea acordado expresamente.",
              "b) El Colaborador independiente determina sus propios métodos de trabajo, herramientas y procesos, siempre que el resultado final cumpla los estándares de calidad del Taller.",
              "c) La relación está definida por proyecto o encargo específico, con inicio y fin determinados, sin continuidad automática entre proyectos.",
              "d) El Colaborador independiente puede prestar servicios simultáneos a otros talleres, marcas o clientes, salvo acuerdo de exclusividad expresamente suscrito.",
            ]}
          />
          <P>
            <strong>6.3</strong> CONDICIONES ESPECÍFICAS. Las condiciones de
            remuneración, plazos, entregables, estándares de calidad y cualquier
            otro aspecto relevante de cada proyecto de colaboración
            independiente serán acordados entre el Taller y el Colaborador
            independiente de forma específica para cada encargo, y constarán por
            escrito a través de los canales oficiales del Taller o mediante
            documento suscrito por ambas partes.
          </P>
          <P>
            <strong>6.4</strong> CONFIDENCIALIDAD. El Colaborador independiente
            se compromete a mantener estricta confidencialidad sobre los
            diseños, patrones, clientes, procesos y cualquier otra información
            comercial del Taller a la que tenga acceso en el marco de la
            colaboración. Este compromiso de confidencialidad se extiende
            indefinidamente más allá de la terminación del proyecto.
          </P>
          <P>
            <strong>6.5</strong> PROPIEDAD INTELECTUAL. Los diseños, patrones,
            fichas técnicas y cualquier otro desarrollo intelectual generado por
            el Colaborador independiente en el marco de un encargo del Taller
            son propiedad exclusiva del Taller, salvo acuerdo expreso contrario.
            El Colaborador independiente renuncia expresamente a cualquier
            derecho patrimonial sobre dichos desarrollos desde el momento en que
            los genera en el marco de la colaboración.
          </P>
          <P>
            <strong>6.6</strong> TERMINACIÓN. La colaboración independiente
            termina automáticamente al completarse el proyecto o encargo para el
            que fue establecida, sin que ello genere ningún derecho a
            continuidad, indemnización ni compensación adicional más allá de la
            remuneración acordada para el proyecto específico.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 7 ───────────────────────────────────────────────────────── */}
        <Section n={7} title="Condiciones Comunes a Ambas Modalidades">
          <P>
            <strong>7.1</strong> CONDUCTA Y ÉTICA. Todo Colaborador, bajo
            cualquier modalidad, tiene el deber de:
          </P>
          <Ul
            items={[
              "a) Tratar con respeto a los demás Colaboradores, al personal del Taller y a los clientes con quienes pudiera tener contacto en el marco de su trabajo.",
              "b) Mantener confidencialidad sobre la información comercial, los diseños, los clientes y los procesos del Taller.",
              "c) Cuidar los equipos, materiales e instalaciones del Taller con la misma diligencia con que cuidaría los propios.",
              "d) Comunicar al Taller de forma oportuna cualquier situación que pudiera afectar su disponibilidad, la calidad de su trabajo o el cumplimiento de los compromisos adquiridos.",
              "e) Abstenerse de divulgar, reproducir, vender ni transferir a terceros ningún diseño, patrón, ficha técnica ni información comercial del Taller.",
            ]}
          />
          <P>
            <strong>7.2</strong> PROPIEDAD DE LOS MATERIALES. Los materiales,
            telas e insumos proporcionados por el Taller para la producción son
            propiedad exclusiva del Taller. El Colaborador no puede utilizar
            dichos materiales para fines distintos a los asignados por el
            Taller, ni retirarlos de las instalaciones sin autorización expresa.
          </P>
          <P>
            <strong>7.3</strong> USO DE IMAGEN. El Taller puede fotografiar o
            registrar en video el trabajo realizado en sus instalaciones con
            fines de portafolio, publicidad y documentación, conforme a la{" "}
            <Link
              href="/legal/fotografia"
              className="text-blue-600 hover:underline"
            >
              Política de Fotografía y Uso de Imagen
            </Link>
            . El Colaborador que no desee ser incluido en dicho material tiene
            el deber de comunicarlo al Taller de forma expresa y por escrito.
          </P>
          <P>
            <strong>7.4</strong> CANALES DE COMUNICACIÓN. Toda comunicación
            entre el Colaborador y el Taller relacionada con la vinculación —
            incluyendo consultas, acuerdos, reportes de producción e
            inconformidades — debe realizarse a través de los canales oficiales
            disponibles en:{" "}
            <Link href="/links" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/links
            </Link>
            .
          </P>
        </Section>
        <Hr />

        {/* ── Art. 8 ───────────────────────────────────────────────────────── */}
        <Section
          n={8}
          title="Declaración sobre Beneficios y Condiciones Adicionales"
        >
          <P>
            <strong>8.1</strong> El Taller opera como un taller artesanal de
            confección de pequeña escala, con un modelo de producción flexible y
            estacional. Las modalidades de vinculación establecidas en la
            presente Política reflejan fielmente la naturaleza real de la
            operación del Taller y las posibilidades reales dentro de su
            estructura.
          </P>
          <P>
            <strong>8.2</strong> El Taller no ofrece, en el marco de las
            modalidades de vinculación establecidas en la presente Política, los
            siguientes beneficios, salvo que sean expresamente acordados por
            escrito y de forma específica con el Colaborador mediante
            instrumento suscrito por el Taller:
          </P>
          <Ul
            items={[
              "— Salario fijo mensual o quincenal garantizado.",
              "— Vacaciones remuneradas periódicas garantizadas.",
              "— Aguinaldo garantizado.",
            ]}
          />
          <P>
            <strong>8.3</strong> Lo que el Taller sí ofrece, como condiciones
            propias de las modalidades de vinculación establecidas en la
            presente Política:
          </P>
          <Ul
            items={[
              "a) Remuneración directa y oportuna por la producción efectivamente realizada, conforme a las tarifas acordadas.",
              "b) Autonomía real sobre la jornada y el ritmo de trabajo, que permite al Colaborador determinar en gran medida sus propios ingresos.",
              "c) Ambiente de trabajo en instalaciones del Taller con los equipos necesarios para la producción.",
              "d) Trato respetuoso, digno y de buena fe en todas las interacciones.",
              "e) Posibilidad de ingresos diarios que, conforme a la productividad del Colaborador, superan el salario mínimo sectorial vigente.",
            ]}
          />
          <P>
            <strong>8.4</strong> El Aspirante que considere que las condiciones
            de las modalidades de vinculación disponibles no se ajustan a sus
            expectativas o necesidades tiene plena libertad de no postularse o
            de no aceptar la vinculación. La vinculación es completamente
            voluntaria y ninguna persona está obligada a aceptarla. La
            aceptación de la vinculación implica la comprensión y aceptación
            plena de las condiciones aquí establecidas.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 9 ───────────────────────────────────────────────────────── */}
        <Section n={9} title="No Discriminación en el Proceso de Selección">
          <P>
            <strong>9.1</strong> El Taller no discrimina en sus procesos de
            selección por razón de sexo, género, edad, origen étnico, condición
            de salud, estado civil, religión, opinión política ni ninguna otra
            condición personal ajena a las competencias técnicas y actitudinales
            requeridas para el desempeño del trabajo.
          </P>
          <P>
            <strong>9.2</strong> El único criterio determinante para la
            selección o no selección de un Aspirante es su capacidad técnica
            demostrada conforme a los requisitos del Artículo 4, su disposición
            y actitud conforme al perfil descrito, y la disponibilidad de
            oportunidades de vinculación en el momento de la postulación.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 10 ──────────────────────────────────────────────────────── */}
        <Section n={10} title="Exención de Responsabilidad del Taller">
          <P>
            <strong>10.1</strong> El Taller queda expresamente eximido de
            responsabilidad en los siguientes supuestos, sin que esta lista sea
            limitativa:
          </P>
          <Ul
            items={[
              "a) Ingresos no alcanzados por el Colaborador derivados de su propio ritmo de producción, ausencias, llegadas tardías o cualquier otra causa atribuible al Colaborador bajo la modalidad a destajo.",
              "b) Accidentes o incidentes ocurridos en las instalaciones del Taller derivados del incumplimiento por parte del Colaborador de las normas básicas de seguridad y cuidado en el uso de equipos.",
              "c) Inconformidades del Colaborador con las condiciones de vinculación que fueron de su pleno conocimiento antes del inicio de la relación, conforme a la presente Política.",
              "d) Terminación de la vinculación al concluir la temporada o el proyecto para el que fue establecida, conforme a la naturaleza temporal y estacional de las modalidades de vinculación.",
              "e) Expectativas del Colaborador sobre condiciones de vinculación que no estén expresamente reconocidas en la presente Política o en el acuerdo específico de vinculación.",
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 11 ──────────────────────────────────────────────────────── */}
        <Section n={11} title="Relación con Otras Políticas del Taller">
          <P>
            <strong>11.1</strong> La presente Política forma parte integral del
            marco normativo de Confecciones Liss y debe leerse en conjunto con:
          </P>
          <Ul
            items={[
              "— Política de Fotografía y Uso de Imagen: https://www.confeccionesliss.com/legal/fotografia",
              "— Política de Comunicaciones Comerciales: https://www.confeccionesliss.com/legal/comunicaciones",
              "— Política de Deberes del Usuario: https://www.confeccionesliss.com/legal/deberes",
              "— Política de Resolución de Disputas: https://www.confeccionesliss.com/legal/disputas",
              "— Términos y Condiciones de Uso: https://www.confeccionesliss.com/legal/terminos",
              "— Directorio de canales oficiales: https://www.confeccionesliss.com/links",
            ]}
          />
        </Section>
        <Hr />

        {/* ── Art. 12 ──────────────────────────────────────────────────────── */}
        <Section n={12} title="Jurisdicción y Legislación Aplicable">
          <P>
            <strong>12.1</strong> La presente Política se rige por la
            legislación de la República de El Salvador, incluyendo el Código de
            Trabajo, el Código Civil y el Código de Comercio, en lo que sea
            aplicable a cada modalidad de vinculación.
          </P>
          <P>
            <strong>12.2</strong> Toda controversia derivada de la aplicación,
            interpretación o incumplimiento de la presente Política se resolverá
            en primera instancia mediante diálogo directo de buena fe entre el
            Colaborador y el Taller, conforme al principio establecido en el
            Artículo 1 de la presente Política.
          </P>
          <P>
            <strong>12.3</strong> De no alcanzarse un acuerdo, la controversia
            se someterá a los organismos e instancias competentes de la
            República de El Salvador conforme a la naturaleza de la disputa y la
            legislación aplicable.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 13 ──────────────────────────────────────────────────────── */}
        <Section n={13} title="Modificaciones a la Política">
          <P>
            <strong>13.1</strong> El Taller se reserva el derecho de modificar
            la presente Política en cualquier momento, publicando la versión
            actualizada en:{" "}
            <Link href="/legal" className="text-blue-600 hover:underline">
              https://www.confeccionesliss.com/legal
            </Link>
            .
          </P>
          <P>
            <strong>13.2</strong> Las modificaciones aplicarán a las
            vinculaciones iniciadas con posterioridad a su publicación. Las
            vinculaciones en curso se regirán por la versión vigente al momento
            de su inicio, salvo acuerdo expreso entre las partes.
          </P>
        </Section>
        <Hr />

        {/* ── Art. 14 ──────────────────────────────────────────────────────── */}
        <Section n={14} title="Divisibilidad">
          <P>
            <strong>14.1</strong> Si alguna disposición de la presente Política
            fuera declarada inválida o inaplicable por autoridad competente, las
            restantes disposiciones continuarán en plena vigencia. La
            disposición inválida será reemplazada por una válida que se aproxime
            al máximo a la intención original.
          </P>
        </Section>
        <Hr />

        {/* ── Resumen ──────────────────────────────────────────────────────── */}
        <Section n={15} title="Resumen para el Aspirante — Guía Rápida">
          <div className="my-6 space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Icon
                  name="person_search"
                  className="text-primary"
                  aria-hidden="true"
                />
                ¿Qué buscamos?
              </h3>
              <Ul
                items={[
                  "Confeccionistas con mínimo 1 año de experiencia en scrubs/uniformes médicos.",
                  "Dominio de máquina de coser, corte y máquina rana (overlock).",
                  "Responsables, disponibles y con tolerancia al trabajo bajo presión de producción.",
                ]}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Icon name="send" className="text-primary" aria-hidden="true" />
                ¿Cómo aplicar?
              </h3>
              <P>
                A través de los canales oficiales:{" "}
                <Link href="/links" className="text-blue-600 hover:underline">
                  https://www.confeccionesliss.com/links
                </Link>
              </P>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Icon
                  name="payments"
                  className="text-primary"
                  aria-hidden="true"
                />
                ¿Cuánto se gana?
              </h3>
              <Ul
                items={[
                  "USD $5.00 por uniforme completo terminado (scrub).",
                  "Producción habitual: 3 a 7 uniformes por día.",
                  "Ingreso estimado: USD $15 a $35 por día trabajado.",
                  "Por encima del salario mínimo sectorial de USD $12.00/día.",
                  "Precio exclusivo para scrubs completos; otras piezas (pantalón, filipina) se acuerdan con la persona autorizada.",
                ]}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Icon
                  name="schedule"
                  className="text-primary"
                  aria-hidden="true"
                />
                Horario de referencia
              </h3>
              <Ul
                items={[
                  "Lunes a Viernes: 8:00 AM – 5:00 PM",
                  "Sábados: 8:00 AM – 12:00 PM",
                  "Ingresa en el horario que mejor te acomode, sin marcaje obligatorio.",
                ]}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <h3 className="flex items-center gap-2 text-base font-bold text-slate-900 dark:text-white">
                <Icon name="work" className="text-primary" aria-hidden="true" />
                Modalidades disponibles
              </h3>
              <Ul
                items={[
                  "A) Trabajo a destajo por temporada — en instalaciones del Taller.",
                  "B) Colaboración independiente por proyecto — de forma autónoma.",
                ]}
              />
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            <p className="font-semibold text-slate-900 dark:text-white">
              Confecciones Liss — Contacto Oficial
            </p>
            <p>
              WhatsApp oficial: +503 7331-7181 &nbsp;|&nbsp; Encargado de
              Comunicaciones: Carlos José Molina Villacorta (+503 7329-4499)
            </p>
            <p>
              Dirección: Barrio La Merced, 5ª Calle Poniente y 1ª Avenida Sur,
              Casa #402, San Miguel, El Salvador.
            </p>
            <p>Horario: Lunes a Sábado, 8:00 AM – 5:00 PM</p>
            <p className="mt-2">
              Toda gestión exclusivamente a través de:{" "}
              <Link href="/links" className="text-blue-600 hover:underline">
                https://www.confeccionesliss.com/links
              </Link>
            </p>
          </div>
        </Section>
      </LegalArticleReader>
    </>
  );
}
