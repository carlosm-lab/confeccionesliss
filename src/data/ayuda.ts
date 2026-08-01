export interface QuestionItem {
  id: string;
  n: number;
  question: string;
  answer: string;
}

export interface AyudaCategory {
  id: string;
  title: string;
  icon: string;
  questions: QuestionItem[];
}

export const AYUDA_CATEGORIES: AyudaCategory[] = [
  {
    id: "sobre-confecciones-liss",
    title: "Sobre Confecciones Liss",
    icon: "store",
    questions: [
      {
        id: "faq-1",
        n: 1,
        question: "¿Qué es Confecciones Liss?",
        answer:
          "Confecciones Liss es un taller de confección a la medida en San Miguel, El Salvador, especializado en scrubs médicos y uniformes universitarios, escolares y corporativos. No revendemos ropa importada: cada prenda se corta y cose en nuestro propio taller.",
      },
      {
        id: "faq-2",
        n: 2,
        question:
          "¿Confecciones Liss es una fábrica, un taller, una tienda o un proveedor?",
        answer:
          "Las cuatro cosas a la vez, según lo que necesites: somos el taller donde se confecciona cada prenda, la tienda donde puedes comprar directo, y el proveedor oficial de uniformes de varios hospitales, universidades, colegios y empresas de la zona oriental de El Salvador.",
      },
      {
        id: "faq-3",
        n: 3,
        question: "¿Dónde está ubicado Confecciones Liss?",
        answer:
          "Estamos en el Barrio La Merced, 5A Calle Poniente y 1A Avenida Sur, San Miguel, El Salvador — a la par del edificio anexo de la Universidad Dr. Andrés Bello (UNAB), sobre la misma calle de la Corte de Cuentas.",
      },
      {
        id: "faq-4",
        n: 4,
        question: "¿Cuál es el horario de atención?",
        answer:
          "Lunes a sábado, de 8:00 a.m. a 5:00 p.m. Fuera de ese horario puedes escribirnos por WhatsApp y respondemos en cuanto abrimos.",
      },
      {
        id: "faq-5",
        n: 5,
        question: "¿Quién fundó Confecciones Liss?",
        answer:
          "La fundadora es Iris Lisseth de Molina, técnico en corte y confección. El taller nació formalmente el 20 de enero de 2021, aunque ella confecciona prendas desde 2005.",
      },
      {
        id: "faq-6",
        n: 6,
        question: "¿Desde cuándo existe Confecciones Liss?",
        answer:
          "Como marca formal, desde el 20 de enero de 2021. La experiencia detrás del taller viene de más de dos décadas: la fundadora también confeccionó uniformes para el Ministerio de Educación y trabajó con maquilas de San Miguel antes de abrir su propio local.",
      },
      {
        id: "faq-7",
        n: 7,
        question: "¿Tienen tienda física donde pueda probarme el uniforme?",
        answer:
          "Sí, el taller en Barrio La Merced, San Miguel, atiende al público. Puedes llegar a que te tomen medidas, probarte modelos y recoger tu pedido en persona.",
      },
      {
        id: "faq-8",
        n: 8,
        question:
          'He visto el nombre escrito como "Confeccion Liss" o "Cofecciones Liss", ¿es la misma empresa?',
        answer:
          'Sí. El nombre correcto es "Confecciones Liss" (con "n" y con doble "c"), pero sabemos que muchas personas lo buscan sin tilde o con alguna letra de menos, y es la misma empresa en San Miguel.',
      },
      {
        id: "faq-9",
        n: 9,
        question: '¿Qué significa el nombre "Liss"?',
        answer:
          'Viene del segundo nombre de la fundadora, "Lisseth", y también hace referencia a la flor de lis.',
      },
      {
        id: "faq-10",
        n: 10,
        question: "¿Cómo contacto a Confecciones Liss?",
        answer:
          "Por WhatsApp al +503 7331-7181 (el canal más rápido), por correo a confeccionesliss.contacto@gmail.com, o visitando el taller en San Miguel en horario de atención.",
      },
    ],
  },
  {
    id: "scrubs-y-gabachas",
    title: "Scrubs, Filipinas y Gabachas",
    icon: "medical_services",
    questions: [
      {
        id: "faq-11",
        n: 11,
        question: '¿Qué es exactamente un "scrub" médico?',
        answer:
          "Un scrub es el uniforme de dos piezas (camisola/top y pantalón) que usa el personal de salud en hospitales, clínicas y consultorios. En Confecciones Liss los confeccionamos a la medida en tela Sincatex antifluidos y Lino Oxford.",
      },
      {
        id: "faq-12",
        n: 12,
        question: '¿"Scrubs" y "uniforme médico" son lo mismo?',
        answer:
          'Sí, son sinónimos. "Scrubs" es el nombre en inglés que se usa igual en español; "uniforme médico" o "uniforme clínico" es la forma más tradicional de decirlo en El Salvador. Nosotros confeccionamos ambos con el mismo significado.',
      },
      {
        id: "faq-13",
        n: 13,
        question: '¿Qué es una "filipina" médica?',
        answer:
          '"Filipina" es como se le llama en Centroamérica al conjunto de blusa/camisola y pantalón usado por personal de salud —es básicamente otro nombre para el scrub, muy usado también en documentos oficiales del sector salud en El Salvador (por ejemplo para el uniforme de turno de odontología).',
      },
      {
        id: "faq-14",
        n: 14,
        question: '¿Qué es una "gabacha" o "gabachón" médico?',
        answer:
          "La gabacha (o gabachón, en su versión de manga larga) es la bata blanca tipo saco que usan médicos, estudiantes de medicina en servicio social y personal de laboratorio sobre su ropa o sobre el scrub. La confeccionamos en Lino, Sincatex y otras telas, manga corta o larga.",
      },
      {
        id: "faq-15",
        n: 15,
        question: '¿Qué es una "pijama quirúrgica"?',
        answer:
          "Es otro nombre común para el scrub, especialmente el que se usa dentro de quirófano. Lo confeccionamos igual que el scrub estándar, en la tela y color que necesites.",
      },
      {
        id: "faq-16",
        n: 16,
        question:
          '¿Solo confeccionan scrubs o también "ropa médica" y "vestimenta sanitaria" en general?',
        answer:
          "Confeccionamos toda la vestimenta del sector salud: scrubs, filipinas, gabachas, batas de laboratorio, chaquetas clínicas y gorros quirúrgicos —no solo el conjunto básico de dos piezas.",
      },
      {
        id: "faq-17",
        n: 17,
        question: "¿Hacen batas de laboratorio?",
        answer:
          "Sí, batas de laboratorio manga corta y manga larga, en tela Sincatex o Lino, para personal de laboratorio clínico, estudiantes y docentes de ciencias de la salud.",
      },
      {
        id: "faq-18",
        n: 18,
        question: '¿Hacen gorros quirúrgicos o "cofias" para enfermera?',
        answer:
          "Sí, hacemos gorros quirúrgicos y cofias de enfermería como accesorio complementario al uniforme, con la tela y el color que combine con tu scrub.",
      },
      {
        id: "faq-19",
        n: 19,
        question: '¿Qué es un "traje de turno"?',
        answer:
          "Es el nombre que se usa en algunos lineamientos del sector salud (por ejemplo en odontología) para referirse al uniforme completo que se usa durante el turno laboral — en la práctica, es el mismo scrub o filipina que confeccionamos.",
      },
      {
        id: "faq-20",
        n: 20,
        question: "¿La chaqueta clínica es lo mismo que la gabacha?",
        answer:
          "No exactamente: la chaqueta clínica suele ser más corta, con cierre o botones al frente, y se usa sobre el scrub en áreas frías o para dar una imagen más formal; la gabacha es más larga, tipo bata. Confeccionamos ambas.",
      },
    ],
  },
  {
    id: "profesiones-salud",
    title: "Uniformes por Profesión de Salud",
    icon: "health_and_safety",
    questions: [
      {
        id: "faq-21",
        n: 21,
        question: "¿Hacen scrubs para médicos generales y especialistas?",
        answer:
          "Sí, confeccionamos scrubs y gabachas para médicos generales, internistas, cirujanos, pediatras, ginecólogos, anestesiólogos y cualquier especialidad.",
      },
      {
        id: "faq-22",
        n: 22,
        question:
          "¿Hacen uniformes de enfermería para enfermeras y enfermeros?",
        answer:
          "Sí. Es una de nuestras líneas principales: scrubs y filipinas de enfermería a la medida, con posibilidad de bordado de nombre y especialidad.",
      },
      {
        id: "faq-23",
        n: 23,
        question: "¿Hacen uniformes para odontólogos y dentistas?",
        answer:
          "Sí, incluyendo el traje de turno/filipina para consultorio y gabachón para procedimientos, en telas resistentes a lavado frecuente.",
      },
      {
        id: "faq-24",
        n: 24,
        question:
          "¿Hacen uniformes para laboratoristas clínicos y técnicos de laboratorio?",
        answer:
          "Sí, scrubs y batas de laboratorio pensados para jornadas largas de pie y contacto con reactivos.",
      },
      {
        id: "faq-25",
        n: 25,
        question: "¿Hacen uniformes para fisioterapeutas?",
        answer:
          "Sí, scrubs cómodos y de corte más deportivo para quienes trabajan de pie y en movimiento constante durante sesiones de terapia.",
      },
      {
        id: "faq-26",
        n: 26,
        question: "¿Hacen uniformes para farmacéuticos y nutricionistas?",
        answer:
          "Sí, incluyendo gabacha o scrub según lo que use tu farmacia, clínica o programa de nutrición.",
      },
      {
        id: "faq-27",
        n: 27,
        question:
          "¿Hacen uniformes para radiólogos, cirujanos y anestesiólogos?",
        answer:
          "Sí, confeccionamos para todo el personal de sala de operaciones y áreas de diagnóstico por imágenes, respetando los colores que use tu institución.",
      },
      {
        id: "faq-28",
        n: 28,
        question:
          "¿Hacen uniformes para personal de la Cruz Roja Salvadoreña o Bomberos?",
        answer:
          "Sí, atendemos pedidos institucionales para personal de socorro y emergencias, con precio especial por volumen.",
      },
      {
        id: "faq-29",
        n: 29,
        question: "¿Hacen uniformes para veterinarios?",
        answer:
          "Sí, scrubs y gabachas para clínicas veterinarias, con la misma tela resistente que usamos en salud humana.",
      },
      {
        id: "faq-30",
        n: 30,
        question:
          "¿Hacen scrubs para estudiantes de medicina, enfermería u odontología en prácticas o servicio social?",
        answer:
          "Sí, es una de las líneas con más demanda: confeccionamos el uniforme exacto que exige cada universidad para prácticas clínicas y servicio social, incluido el gabachón blanco cerrado que piden a estudiantes de medicina.",
      },
      {
        id: "faq-31",
        n: 31,
        question: "¿Hacen uniformes para personal del ISSS o del MINSAL?",
        answer:
          "Sí, atendemos tanto a personal como a pedidos institucionales relacionados con el Instituto Salvadoreño del Seguro Social (ISSS) y el Ministerio de Salud (MINSAL), respetando los lineamientos de uniforme de cada institución.",
      },
      {
        id: "faq-32",
        n: 32,
        question: "¿Hacen uniformes para psicólogos y optometristas?",
        answer:
          "Sí, aunque su vestimenta suele ser más flexible, muchos prefieren un scrub o gabacha ligera para consulta; lo confeccionamos igual a la medida.",
      },
      {
        id: "faq-33",
        n: 33,
        question:
          "¿Hacen uniformes para auxiliares de salud y personal hospitalario en general (no solo médicos y enfermeras)?",
        answer:
          "Sí, cubrimos a todo el personal de un centro de salud: camilleros, auxiliares, personal de limpieza hospitalaria, recepción clínica, etc.",
      },
    ],
  },
  {
    id: "hospitales-y-clinicas",
    title: "Hospitales, Clínicas y Laboratorios",
    icon: "local_hospital",
    questions: [
      {
        id: "faq-34",
        n: 34,
        question:
          "¿Hacen uniformes para hospitales públicos y privados de El Salvador?",
        answer:
          "Sí. Atendemos pedidos institucionales para hospitales públicos (red MINSAL e ISSS) y hospitales y clínicas privadas, con precio especial por volumen y bordado del logo institucional.",
      },
      {
        id: "faq-35",
        n: 35,
        question:
          "¿Confeccionan uniformes para el personal del Hospital Nacional San Juan de Dios de San Miguel?",
        answer:
          "Sí, por cercanía y trayectoria en la zona oriental, trabajamos con personal y estudiantes que hacen sus prácticas en el Hospital San Juan de Dios de San Miguel.",
      },
      {
        id: "faq-36",
        n: 36,
        question:
          "¿Hacen uniformes para el Hospital Regional del ISSS en San Miguel?",
        answer:
          "Sí, confeccionamos scrubs y filipinas para personal que labora en el Hospital Regional San Miguel del ISSS y en sus unidades médicas de la zona oriental (Moncagua, Chinameca, San Francisco Gotera, Santiago de María, Berlín, Usulután, La Unión, entre otras).",
      },
      {
        id: "faq-37",
        n: 37,
        question:
          "¿Hacen uniformes para clínicas privadas y consultorios médicos?",
        answer:
          "Sí, tanto para consultorios individuales como para clínicas con varios médicos, incluyendo bordado del nombre del médico o de la clínica.",
      },
      {
        id: "faq-38",
        n: 38,
        question:
          "¿Hacen uniformes para laboratorios clínicos y centros de diagnóstico?",
        answer:
          "Sí, batas y scrubs para personal de laboratorio y centros de toma de muestras y diagnóstico por imágenes.",
      },
      {
        id: "faq-39",
        n: 39,
        question:
          "¿Hacen uniformes para consultorios y clínicas dentales/odontológicas?",
        answer:
          'Sí, incluido el "traje de turno" u overol de odontología que piden los lineamientos del sector salud.',
      },
      {
        id: "faq-40",
        n: 40,
        question:
          "¿Pueden confeccionar el uniforme completo de todo el personal de un hospital o clínica, o solo prendas sueltas para una persona?",
        answer:
          "Ambas cosas. Atendemos desde un pedido individual hasta la dotación completa de un hospital, clínica o laboratorio, coordinando tallas por persona.",
      },
      {
        id: "faq-41",
        n: 41,
        question:
          "¿Los uniformes que hacen cumplen con los lineamientos de bioseguridad del MINSAL?",
        answer:
          "Confeccionamos siguiendo el diseño, color y tipo de prenda que cada institución define en sus lineamientos (por ejemplo el gabachón cerrado para estudiantes en servicio social). Si tu hospital o universidad tiene un lineamiento específico, lo replicamos exactamente.",
      },
      {
        id: "faq-42",
        n: 42,
        question:
          "¿Hacen uniformes para clínicas comunales y unidades de salud?",
        answer:
          "Sí, trabajamos con unidades médicas y clínicas comunales de San Miguel y municipios cercanos, con precio especial por ser pedidos institucionales.",
      },
    ],
  },
  {
    id: "uniformes-universitarios",
    title: "Uniformes Universitarios",
    icon: "school",
    questions: [
      {
        id: "faq-43",
        n: 43,
        question: "¿Hacen uniformes para la UNIVO (Universidad de Oriente)?",
        answer:
          "Sí, confeccionamos el scrub clínico con los colores oficiales de UNIVO para las carreras de salud.",
      },
      {
        id: "faq-44",
        n: 44,
        question:
          "¿Hacen uniformes para la UNAB (Universidad Dr. Andrés Bello)?",
        answer:
          "Sí, con los colores y especificaciones oficiales de cada carrera de salud de la UNAB. Nuestro taller está justo a la par del edificio anexo de la UNAB en San Miguel.",
      },
      {
        id: "faq-45",
        n: 45,
        question: "¿Hacen uniformes para la UGB (Universidad Gerardo Barrios)?",
        answer: "Sí, scrubs clínicos con los colores oficiales de la UGB.",
      },
      {
        id: "faq-46",
        n: 46,
        question: "¿Hacen uniformes para la UMA (Universidad Modular Abierta)?",
        answer:
          "Sí, confeccionamos el uniforme oficial de las carreras de salud de la UMA.",
      },
      {
        id: "faq-47",
        n: 47,
        question:
          "¿Hacen uniformes para IEPROES (Instituto Especializado de Profesionales de la Salud)?",
        answer:
          "Sí, es una de las instituciones con las que más trabajamos: uniformes para Licenciatura y Técnico en Enfermería, entre otras carreras de IEPROES sede San Miguel.",
      },
      {
        id: "faq-48",
        n: 48,
        question: "¿Hacen uniformes para la UES (Universidad de El Salvador)?",
        answer:
          "Sí, confeccionamos uniformes para las carreras de salud de la UES.",
      },
      {
        id: "faq-49",
        n: 49,
        question:
          "¿Hacen uniformes para la UEES (Universidad Evangélica de El Salvador)?",
        answer: "Sí, con las especificaciones oficiales de cada carrera.",
      },
      {
        id: "faq-50",
        n: 50,
        question:
          "Mi universidad no está en la lista, ¿igual me pueden confeccionar el uniforme?",
        answer:
          "Sí. Aunque tengamos más trayectoria con UNIVO, UNAB, UGB, UMA, IEPROES, UES y UEES, confeccionamos el uniforme de cualquier universidad o instituto si nos compartes el modelo, color y especificaciones exactas de tu carrera.",
      },
      {
        id: "faq-51",
        n: 51,
        question: "¿Conocen los colores oficiales de cada carrera de salud?",
        answer:
          "Trabajamos con las especificaciones exactas de cada facultad y carrera: Medicina, Enfermería, Odontología, Laboratorio Clínico, Fisioterapia, Nutrición y Farmacia, entre otras.",
      },
      {
        id: "faq-52",
        n: 52,
        question:
          "¿Hacen descuento si somos un grupo de sección o promoción universitaria?",
        answer:
          "Sí, los pedidos de sección o promoción (grupos organizados de estudiantes) tienen precio especial y suelen incluir el bordado de la carrera.",
      },
      {
        id: "faq-53",
        n: 53,
        question:
          "Soy delegado de mi sección, ¿cómo coordino el pedido para todo el grupo?",
        answer:
          "Escríbenos al WhatsApp con la universidad, carrera y cantidad aproximada de compañeros interesados; te damos una cotización grupal y coordinamos la toma de tallas de cada persona.",
      },
    ],
  },
  {
    id: "uniformes-escolares",
    title: "Uniformes Escolares y Colegios",
    icon: "domain",
    questions: [
      {
        id: "faq-54",
        n: 54,
        question: "¿Hacen uniformes escolares para colegios privados?",
        answer:
          "Sí, camisas, blusas, pantalones, faldas y suéteres con los colores y diseño institucional exacto de tu colegio.",
      },
      {
        id: "faq-55",
        n: 55,
        question: "¿Hacen uniformes para escuelas públicas?",
        answer:
          "Sí. De hecho, el taller tiene experiencia directa con el sector público: en su trayectoria confeccionó el uniforme completo de todos los estudiantes del Centro Escolar Profesor Jorge Salomón Granados, contratado por el Ministerio de Educación.",
      },
      {
        id: "faq-56",
        n: 56,
        question: "¿Han trabajado con el Ministerio de Educación?",
        answer:
          "Sí, como proveedores de uniformes escolares para un centro educativo público en San Miguel.",
      },
      {
        id: "faq-57",
        n: 57,
        question:
          "¿Hacen uniformes de bachillerato técnico vocacional o de institutos nacionales?",
        answer:
          "Sí, incluyendo uniformes con distintivo de especialidad técnica si tu instituto lo requiere.",
      },
      {
        id: "faq-58",
        n: 58,
        question:
          "¿Hacen uniformes de educación física o deportivos para colegios?",
        answer:
          "Sí, sudaderas y uniformes deportivos escolares, con posibilidad de sublimación de logo del colegio.",
      },
      {
        id: "faq-59",
        n: 59,
        question: "¿Cuánto cuesta un uniforme escolar?",
        answer:
          "Los uniformes escolares empiezan desde precios accesibles (consultar por WhatsApp el precio exacto según prenda y colegio), y bajan de precio por pedido en volumen para todo un salón o grado.",
      },
      {
        id: "faq-60",
        n: 60,
        question:
          "¿Pueden replicar el diseño y los colores exactos del uniforme de mi colegio?",
        answer:
          "Sí, trabajamos a partir de una muestra, foto o especificación que nos envíes del uniforme actual de tu colegio.",
      },
      {
        id: "faq-61",
        n: 61,
        question:
          "¿Hacen uniformes escolares para varios hijos con distintas tallas en un mismo pedido?",
        answer:
          "Sí, sin problema. Puedes pedir varias tallas distintas en un mismo pedido familiar.",
      },
    ],
  },
  {
    id: "uniformes-corporativos",
    title: "Uniformes Corporativos",
    icon: "business_center",
    questions: [
      {
        id: "faq-62",
        n: 62,
        question: "¿Hacen uniformes corporativos con logo para empresas?",
        answer:
          "Sí, camisas, polos, gabachas y chalecos con el logo de tu empresa bordado, en los colores institucionales que definas.",
      },
      {
        id: "faq-63",
        n: 63,
        question:
          "¿Cuál es la cantidad mínima para un pedido de uniformes de empresa?",
        answer:
          "Para empresas, instituciones y personas jurídicas el volumen mínimo para acceder a tarifa preferencial es de 12 conjuntos completos (o prendas individuales equivalentes) por modelo.",
      },
      {
        id: "faq-64",
        n: 64,
        question:
          "¿Pueden replicar los colores institucionales exactos de mi marca?",
        answer:
          "Sí, trabajamos con el código de color o muestra de tela que nos compartas para que coincida con tu identidad de marca.",
      },
      {
        id: "faq-65",
        n: 65,
        question:
          "¿Trabajan con instituciones de gobierno además de hospitales y universidades?",
        answer:
          "Sí, atendemos pedidos institucionales de distintos tipos de entidades, siempre que cumplan el volumen mínimo de pedido en grupo.",
      },
      {
        id: "faq-66",
        n: 66,
        question:
          "¿Hacen chalecos, camisas polo y gabachas de trabajo para negocios?",
        answer:
          "Sí, además de uniformes médicos, escolares y universitarios, confeccionamos ropa de trabajo general para empresas: polos, camisas, chalecos y gabachas.",
      },
      {
        id: "faq-67",
        n: 67,
        question: "¿Dan factura o comprobante para pedidos institucionales?",
        answer:
          "Sí, para pedidos institucionales se coordina el comprobante correspondiente; pregúntanos por WhatsApp los detalles según el tipo de institución.",
      },
    ],
  },
  {
    id: "precios-y-pagos",
    title: "Precios y Formas de Pago",
    icon: "payments",
    questions: [
      {
        id: "faq-68",
        n: 68,
        question: "¿Cuánto cuestan los scrubs médicos?",
        answer:
          "Desde $35.00 USD. El precio final depende del modelo, la tela y si llevas personalización como bordado de nombre o logo.",
      },
      {
        id: "faq-69",
        n: 69,
        question: "¿Cuánto cuesta un uniforme universitario?",
        answer:
          "Los scrubs universitarios (con colores oficiales de tu carrera) empiezan desde $39.50 USD.",
      },
      {
        id: "faq-70",
        n: 70,
        question: "¿Cuánto cuesta un uniforme escolar?",
        answer:
          "Varía según la prenda (camisa, pantalón, falda, suéter); pídenos precio exacto por WhatsApp indicando el colegio y las prendas que necesitas.",
      },
      {
        id: "faq-71",
        n: 71,
        question: "¿Cómo puedo pagar mi pedido?",
        answer:
          "Efectivo al recoger en el taller, pago contra entrega (pago al recibir) para envíos a nivel nacional, o transferencia bancaria.",
      },
      {
        id: "faq-72",
        n: 72,
        question: "¿Piden anticipo para hacer el uniforme?",
        answer:
          "En la mayoría de pedidos individuales no se cobra anticipo. Para pedidos grandes, grupales o institucionales sí se solicita un anticipo, que se explica al momento de cotizar.",
      },
      {
        id: "faq-73",
        n: 73,
        question: "¿Aceptan tarjeta de crédito o débito?",
        answer:
          "Los medios de pago habituales son efectivo, pago contra entrega y transferencia bancaria; consulta por WhatsApp si necesitas otra alternativa para tu caso.",
      },
      {
        id: "faq-74",
        n: 74,
        question:
          "¿El precio cambia si necesito una talla especial o extra grande?",
        answer:
          'Como trabajamos a la medida, ajustamos cada prenda a tus medidas exactas sin cobrar un cargo extra "por talla difícil" en la mayoría de los casos; confírmalo directamente en tu cotización.',
      },
      {
        id: "faq-75",
        n: 75,
        question: "¿Dan descuento por pedidos grupales?",
        answer:
          "Sí. Tanto grupos de colegios/estudiantes como empresas e instituciones acceden a tarifa preferencial al cumplir el volumen mínimo (6 uniformes para colegios, 12 piezas por modelo para empresas).",
      },
      {
        id: "faq-76",
        n: 76,
        question: "¿Cómo obtengo una cotización exacta?",
        answer:
          "Escríbenos al WhatsApp +503 7331-7181 con el tipo de prenda, tela, cantidad y si llevas bordado; te respondemos con precio y tiempo de entrega en pocas horas.",
      },
      {
        id: "faq-77",
        n: 77,
        question: "¿El envío tiene costo aparte del uniforme?",
        answer:
          "Sí, el envío nacional tiene una tarifa aparte que varía según tamaño y peso del paquete; te confirmamos el costo exacto antes de cerrar el pedido.",
      },
    ],
  },
  {
    id: "tallas-y-medidas",
    title: "Tallas y Toma de Medidas",
    icon: "straighten",
    questions: [
      {
        id: "faq-78",
        n: 78,
        question: "¿Manejan tallas estándar o todo es a la medida?",
        answer:
          "Ambas opciones: puedes pedir a la medida (visitando el taller) o por tallas estándar S, M, L, XL, XXL si es un envío nacional.",
      },
      {
        id: "faq-79",
        n: 79,
        question: "¿Qué tallas manejan?",
        answer:
          "Desde S hasta XXL en la mayoría de líneas; en scrubs médicos y universitarios trabajamos S-M-L-XL-XXL.",
      },
      {
        id: "faq-80",
        n: 80,
        question: "¿Cómo me tomo las medidas si no puedo ir al taller?",
        answer:
          "Te enviamos una guía de tallas para que tomes tus propias medidas en casa, o puedes darnos tu talla habitual de referencia si prefieres pedir por talla estándar.",
      },
      {
        id: "faq-81",
        n: 81,
        question:
          "¿Tienen tallas para personas con una talla difícil de encontrar en tiendas normales (tallas grandes o fuera de lo estándar)?",
        answer:
          "Sí, justamente esa es una de las ventajas de confeccionar a la medida: no dependemos de una talla importada fija, cortamos la prenda según tus medidas reales.",
      },
      {
        id: "faq-82",
        n: 82,
        question:
          "¿Qué pasa si mi talla no queda perfecta al recibir el pedido?",
        answer:
          "Cuéntanos dentro de los primeros 5 días hábiles después de recibir la prenda para revisar tu caso según la garantía; ver la sección de Garantía y Devoluciones más abajo para conocer exactamente qué cubre y qué no.",
      },
      {
        id: "faq-83",
        n: 83,
        question:
          "¿Puedo pedir un uniforme a la medida aunque viva fuera de San Miguel?",
        answer:
          "Sí, pero para el ajuste 100% a la medida normalmente se requiere una visita al taller o el envío preciso de tus medidas; si no puedes visitarnos, la alternativa es pedir por talla estándar con envío a todo El Salvador.",
      },
      {
        id: "faq-84",
        n: 84,
        question:
          "¿Tienen guía de tallas que pueda descargar o ver antes de pedir?",
        answer:
          "Pregúntanos por WhatsApp y te la compartimos directamente para que tomes tus medidas con confianza antes de pagar.",
      },
      {
        id: "faq-85",
        n: 85,
        question:
          "¿Hacen uniformes (médicos, escolares) para niños o tallas infantiles?",
        answer:
          "Sí, confeccionamos también ropa y uniformes para niños, no solo tallas de adulto.",
      },
    ],
  },
  {
    id: "bordados-y-personalizacion",
    title: "Bordados, Sublimación y Personalización",
    icon: "palette",
    questions: [
      {
        id: "faq-86",
        n: 86,
        question: "¿Hacen bordado de nombre en los scrubs?",
        answer:
          "Sí, bordamos nombre, especialidad y/o logo institucional en scrubs, gabachas y cualquier prenda.",
      },
      {
        id: "faq-87",
        n: 87,
        question: "¿Bordan el logo de mi institución, universidad o empresa?",
        answer:
          "Sí, digitalizamos tu logo y lo bordamos con la calidad y tamaño que necesites.",
      },
      {
        id: "faq-88",
        n: 88,
        question: "¿Qué es la sublimación y para qué sirve?",
        answer:
          "Es una técnica de impresión que fija el diseño a full color directamente en la tela, ideal para uniformes deportivos, camisetas y artículos promocionales con diseños grandes o degradados que el bordado no puede lograr igual.",
      },
      {
        id: "faq-89",
        n: 89,
        question: "¿Puedo elegir el color de mi uniforme?",
        answer:
          "Sí, salvo que tu institución exija un color oficial específico (como sucede con universidades y algunos hospitales), puedes elegir el color que prefieras.",
      },
      {
        id: "faq-90",
        n: 90,
        question: "¿Puedo llevar mi propio diseño o logo para que lo apliquen?",
        answer:
          "Sí, puedes enviarnos tu logo o diseño en imagen y lo adaptamos para bordado o sublimación.",
      },
      {
        id: "faq-91",
        n: 91,
        question: "¿Cuánto cuesta agregar bordado a mi uniforme?",
        answer:
          "El costo depende del tamaño y complejidad del bordado (solo nombre, o nombre más logo, por ejemplo); te lo confirmamos junto con la cotización del uniforme.",
      },
      {
        id: "faq-92",
        n: 92,
        question:
          "¿El bordado va incluido en el precio del scrub o se cobra aparte?",
        answer:
          "Depende del modelo: varios de nuestros scrubs y uniformes universitarios ya incluyen bordado dentro del precio base; confírmalo en tu cotización específica.",
      },
      {
        id: "faq-93",
        n: 93,
        question: "Además de bordado y sublimación, ¿hacen estampado?",
        answer:
          "Sí, ofrecemos distintas técnicas de personalización según la prenda y el tipo de diseño que necesites; te recomendamos la más adecuada al cotizar.",
      },
    ],
  },
  {
    id: "como-pedir-y-tiempos",
    title: "Cómo Pedir y Tiempos de Entrega",
    icon: "schedule",
    questions: [
      {
        id: "faq-94",
        n: 94,
        question: "¿Cómo hago un pedido?",
        answer:
          "Escríbenos al WhatsApp +503 7331-7181 contándonos qué necesitas (tipo de uniforme, tela, color y cantidad), recibes tu cotización, confirmas medidas (en el taller o por guía de tallas) y coordinamos entrega y pago.",
      },
      {
        id: "faq-95",
        n: 95,
        question: "¿Cuánto tardan en entregar un uniforme individual?",
        answer: "Entre 3 y 7 días hábiles.",
      },
      {
        id: "faq-96",
        n: 96,
        question: "¿Cuánto tardan los pedidos grupales (5 a 20 prendas)?",
        answer: "Entre 7 y 15 días hábiles.",
      },
      {
        id: "faq-97",
        n: 97,
        question: "¿Cuánto tardan los pedidos institucionales grandes?",
        answer: "Entre 15 y 30 días hábiles, según la cantidad.",
      },
      {
        id: "faq-98",
        n: 98,
        question: "¿Puedo hacer todo el pedido por WhatsApp sin ir al taller?",
        answer:
          "Sí, para pedidos por talla estándar con envío nacional todo el proceso se puede coordinar por WhatsApp.",
      },
      {
        id: "faq-99",
        n: 99,
        question: "¿Necesito cita para ir al taller a que me tomen medidas?",
        answer:
          "No es obligatorio, pero te recomendamos avisar antes por WhatsApp para asegurar que te atiendan sin espera.",
      },
      {
        id: "faq-100",
        n: 100,
        question:
          "¿Los tiempos de entrega cambian en temporada alta (inicio de año escolar o universitario)?",
        answer:
          "Sí, en temporada de alta demanda (inicio de clases) los tiempos pueden extenderse un poco respecto a los rangos normales; te lo indicamos al cotizar si aplica.",
      },
      {
        id: "faq-101",
        n: 101,
        question: "¿Puedo dar seguimiento a mi pedido una vez confirmado?",
        answer:
          "Sí, por el mismo WhatsApp donde hiciste el pedido puedes preguntar el estado en cualquier momento.",
      },
    ],
  },
  {
    id: "envios-y-cobertura",
    title: "Envíos y Cobertura en El Salvador",
    icon: "local_shipping",
    questions: [
      {
        id: "faq-102",
        n: 102,
        question: "¿Envían a todo El Salvador?",
        answer:
          "Sí, enviamos por tallas a los 14 departamentos de El Salvador con pago al recibir.",
      },
      {
        id: "faq-103",
        n: 103,
        question: "¿Cuánto cuesta el envío?",
        answer:
          "La tarifa base es de $3.00 USD y puede variar según tamaño y peso del paquete; te confirmamos el costo exacto antes de despachar.",
      },
      {
        id: "faq-104",
        n: 104,
        question: "¿Cuánto tarda el envío fuera de San Miguel?",
        answer:
          "El taller prepara el pedido en 1 a 2 días hábiles y el transporte tarda de 1 a 7 días hábiles adicionales según el destino — en total, entre 2 y 9 días hábiles de punta a punta.",
      },
      {
        id: "faq-105",
        n: 105,
        question: "¿Envían a San Salvador?",
        answer:
          "Sí, cubrimos San Salvador y todos sus municipios: Soyapango, Mejicanos, Apopa, Ilopango, San Marcos, Ayutuxtepeque y el resto del área metropolitana.",
      },
      {
        id: "faq-106",
        n: 106,
        question: "¿Envían a Santa Ana, Sonsonate o La Libertad?",
        answer:
          "Sí, con pago al recibir, incluyendo Santa Tecla, Antiguo Cuscatlán, Colón, Sonsonate, Acajutla, Chalchuapa y Metapán, entre otros.",
      },
      {
        id: "faq-107",
        n: 107,
        question:
          "¿Tienen cobertura en Usulután, La Unión y Morazán (zona oriental)?",
        answer:
          "Sí, esta es nuestra zona de entrega más rápida por estar cerca de San Miguel: Usulután, Santiago de María, Jiquilisco, La Unión, Santa Rosa de Lima, San Francisco Gotera y sus municipios.",
      },
      {
        id: "faq-108",
        n: 108,
        question:
          'Busco "uniformes cerca de mí" o "scrubs cerca de mí" — ¿tienen envío a domicilio o solo venden en tienda?',
        answer:
          "Tenemos taller físico en San Miguel para atención en persona, y además enviamos con pago al recibir a cualquier municipio de El Salvador, así que no importa en qué ciudad estés.",
      },
      {
        id: "faq-109",
        n: 109,
        question:
          "¿Puedo recoger mi pedido directamente en el taller en vez de que me lo envíen?",
        answer:
          "Sí, si estás en San Miguel o puedes visitarnos, recoger en taller es la opción más rápida y sin costo de envío.",
      },
      {
        id: "faq-110",
        n: 110,
        question: "¿Envían fuera de El Salvador?",
        answer:
          "Nuestra cobertura de envío con pago al recibir está enfocada en El Salvador; si necesitas envío internacional, consúltanos directamente por WhatsApp para revisar tu caso.",
      },
      {
        id: "faq-111",
        n: 111,
        question: "¿Qué pasa si no estoy en casa cuando llega mi envío?",
        answer:
          "Es importante estar disponible el día hábil acordado para la entrega; si el paquete no puede entregarse y hay que reenviarlo, ese reenvío se coordina y cuenta como un envío aparte.",
      },
    ],
  },
  {
    id: "garantia-y-devoluciones",
    title: "Garantía, Cambios y Devoluciones",
    icon: "verified",
    questions: [
      {
        id: "faq-112",
        n: 112,
        question: "¿Tienen garantía los uniformes?",
        answer:
          "Sí, ofrecemos garantía sobre defectos de fabricación y sobre el ajuste de las medidas cuando el pedido fue a la medida.",
      },
      {
        id: "faq-113",
        n: 113,
        question: "¿Qué cubre la garantía?",
        answer:
          "Cubre defectos de fabricación (costuras, materiales con falla de origen) e inconformidades de medida cuando el uniforme fue confeccionado a la medida tomada por el taller.",
      },
      {
        id: "faq-114",
        n: 114,
        question: "¿Qué NO cubre la garantía?",
        answer:
          "No cubre cambios corporales del cliente después de la toma de medidas, defectos derivados de una tela elegida por el cliente, ni inconformidades reportadas fuera del plazo establecido.",
      },
      {
        id: "faq-115",
        n: 115,
        question:
          "¿Aceptan devoluciones si simplemente no me gustó el uniforme?",
        answer:
          "No. Como cada prenda se confecciona a pedido y a la medida, Confecciones Liss no maneja devoluciones ni cambios por cambio de parecer, gusto o inconformidad con un diseño ya aprobado — por eso es clave confirmar bien el modelo, tela, color y medidas antes de producir.",
      },
      {
        id: "faq-116",
        n: 116,
        question: "¿Puedo cambiar de talla después de recibir el pedido?",
        answer:
          "Los cambios de talla, modelo o diseño después de la confirmación del pedido no forman parte de la garantía; cualquier ajuste posterior se evalúa como un caso aparte, no como devolución.",
      },
      {
        id: "faq-117",
        n: 117,
        question:
          "¿Qué hago si mi uniforme llega con un defecto real de fábrica (costura mal hecha, tela distinta a la acordada)?",
        answer:
          "Repórtalo dentro de los primeros 5 días hábiles después de recibir la prenda, con fotos, para que lo evaluemos bajo la garantía.",
      },
      {
        id: "faq-118",
        n: 118,
        question:
          "¿Cuánto tiempo tengo exactamente para reportar un problema con mi pedido?",
        answer:
          "5 días hábiles a partir de que recibes la prenda. Pasado ese plazo, ya no aplica la garantía por inconformidad o defecto.",
      },
    ],
  },
  {
    id: "pedidos-grupales",
    title: "Pedidos Grupales, Mayoreo e Instituciones",
    icon: "groups",
    questions: [
      {
        id: "faq-119",
        n: 119,
        question:
          "¿Cuál es la cantidad mínima para un pedido grupal de estudiantes o personas organizadas?",
        answer:
          "Para colegios, el precio de mayoreo aplica desde 6 uniformes. Para empresas, el precio de volumen aplica desde 12 piezas por modelo. En ambos casos, el precio final se acuerda previamente y puede negociarse según el tamaño del pedido.",
      },
      {
        id: "faq-120",
        n: 120,
        question:
          "¿Cuál es la cantidad mínima para mayoreo de empresas o instituciones?",
        answer:
          "12 conjuntos completos de uniforme (o prendas equivalentes) por modelo.",
      },
      {
        id: "faq-121",
        n: 121,
        question:
          "¿Ofrecen precio especial para hospitales y clínicas que necesitan uniformar a todo su personal?",
        answer:
          "Sí, los pedidos institucionales de hospitales, clínicas y laboratorios acceden a precio especial por volumen y bordado de logo institucional incluido.",
      },
      {
        id: "faq-122",
        n: 122,
        question:
          "¿Cómo se coordina un pedido grupal de estudiantes de una sección universitaria?",
        answer:
          "Un representante del grupo contacta por WhatsApp con la universidad, carrera y número aproximado de integrantes; se cotiza, se recogen las medidas de cada persona y se produce como un solo pedido colectivo.",
      },
      {
        id: "faq-123",
        n: 123,
        question:
          "¿Qué pasa si alguien del grupo se retira después de confirmado el pedido?",
        answer:
          "Si el retiro hace que el pedido caiga por debajo del mínimo de unidades requerido, eso puede afectar la tarifa preferencial acordada para todo el grupo — coordínalo con anticipación con quien lleva el pedido.",
      },
      {
        id: "faq-124",
        n: 124,
        question:
          "¿Es obligatorio nombrar un representante para pedidos en grupo?",
        answer:
          "Sí, se gestiona a través de un representante del grupo, que es quien coordina cotización, pagos y entrega con el taller.",
      },
      {
        id: "faq-125",
        n: 125,
        question:
          "¿Trabajan como proveedores para licitaciones o compras institucionales formales?",
        answer:
          "Atendemos pedidos institucionales de hospitales, universidades, colegios y empresas; si tu proceso requiere algún documento específico, coméntanoslo por WhatsApp para confirmarlo caso por caso.",
      },
    ],
  },
  {
    id: "telas-y-calidad",
    title: "Telas y Calidad",
    icon: "dry_cleaning",
    questions: [
      {
        id: "faq-126",
        n: 126,
        question: "¿Qué tela usan para los scrubs?",
        answer:
          "Principalmente tela Sincatex antifluidos y Lino Oxford, dos telas pensadas para el uso médico intensivo.",
      },
      {
        id: "faq-127",
        n: 127,
        question: "¿Qué es la tela Sincatex?",
        answer:
          "Es una tela antimicrobiana/antifluidos usada ampliamente en el sector salud en El Salvador, resistente a fluidos y de fácil lavado.",
      },
      {
        id: "faq-128",
        n: 128,
        question: "¿Qué es el Lino Oxford?",
        answer:
          "Es una tela de alta calidad, fresca y duradera, que usamos como alternativa o complemento al Sincatex según el modelo de uniforme.",
      },
      {
        id: "faq-129",
        n: 129,
        question: "¿La tela es realmente antifluidos o repelente?",
        answer:
          "La tela Sincatex que usamos está certificada como antifluidos, la misma categoría de tela que usan hospitales y clínicas.",
      },
      {
        id: "faq-130",
        n: 130,
        question:
          "¿La tela pica o da calor en climas cálidos como el de San Miguel?",
        answer:
          "Estas telas se eligen justamente pensando en jornadas largas y clima caliente: son transpirables y cómodas para uso todo el día.",
      },
      {
        id: "faq-131",
        n: 131,
        question: "¿Cómo debo lavar mi scrub para que dure más?",
        answer:
          "Te recomendamos lavado regular sin usar cloro directo sobre bordados y secar a la sombra cuando sea posible para conservar mejor el color; si tienes dudas sobre un modelo en particular, pregúntanos.",
      },
      {
        id: "faq-132",
        n: 132,
        question:
          "¿Qué diferencia hay entre confeccionar a la medida y comprar tallas importadas?",
        answer:
          'A la medida, la prenda se ajusta a tu cuerpo real (sin que te quede grande, pequeña o "casi bien"); las tallas importadas son un estándar genérico que no siempre calza con el cuerpo de cada persona.',
      },
    ],
  },
  {
    id: "otras-lineas",
    title: "Otras Líneas que También Confeccionamos",
    icon: "checkroom",
    questions: [
      {
        id: "faq-133",
        n: 133,
        question: "¿Solo hacen uniformes médicos o también otro tipo de ropa?",
        answer:
          "También confeccionamos uniformes escolares, corporativos y deportivos, ropa casual, accesorios, sublimados, crop tops/tops de diseño y lencería —somos un taller de confección general, con los uniformes médicos como especialidad principal.",
      },
      {
        id: "faq-134",
        n: 134,
        question: "¿Hacen ropa deportiva o uniformes para equipos?",
        answer:
          "Sí, uniformes deportivos con sublimación completa para equipos, academias y ligas locales.",
      },
      {
        id: "faq-135",
        n: 135,
        question: "¿Hacen accesorios como cofias, llaveros o pines?",
        answer:
          "Sí, accesorios y complementos para uniformes: gorros quirúrgicos, corbatas, llaveros, pines y detalles de enfermería.",
      },
      {
        id: "faq-136",
        n: 136,
        question: "¿Hacen lencería o ropa íntima a la medida?",
        answer:
          "Sí, lencería fina y ropa íntima en algodón premium y encaje, para hombres y mujeres, confeccionada a la medida.",
      },
      {
        id: "faq-137",
        n: 137,
        question: "¿Hacen ropa casual, vestidos o crop tops?",
        answer:
          "Sí, ropa casual y de moda para damas, caballeros y niños, incluyendo crop tops y tops de diseño a la medida.",
      },
      {
        id: "faq-138",
        n: 138,
        question:
          "¿Qué son las flores y artesanías de limpiapipas que también hacen?",
        answer:
          "Son arreglos y flores hechos a mano con limpiapipas (chenilla), pensados como regalo o detalle para eventos especiales — una línea creativa aparte de la confección de ropa.",
      },
      {
        id: "faq-139",
        n: 139,
        question: "¿Hacen zapatos o solo ropa y accesorios textiles?",
        answer:
          "Nuestro enfoque es confección textil (ropa, uniformes y accesorios de tela); para calzado, consulta disponibilidad directamente por WhatsApp.",
      },
    ],
  },
  {
    id: "redes-y-contacto",
    title: "Redes Sociales y Contacto",
    icon: "share",
    questions: [
      {
        id: "faq-140",
        n: 140,
        question: "¿Cuáles son las redes sociales de Confecciones Liss?",
        answer:
          "Facebook, Instagram, TikTok, YouTube, Threads, X (Twitter), LinkedIn, Pinterest y Google Maps, todas bajo el usuario @confeccionliss.",
      },
      {
        id: "faq-141",
        n: 141,
        question: "¿Tienen Instagram?",
        answer:
          "Sí: instagram.com/confeccionliss — ahí compartimos fotos de uniformes, scrubs y trabajos recientes.",
      },
      {
        id: "faq-142",
        n: 142,
        question: "¿Tienen TikTok?",
        answer:
          "Sí: tiktok.com/@confeccionliss, con videos del proceso de confección y comparativas de telas.",
      },
      {
        id: "faq-143",
        n: 143,
        question: "¿Tienen página de Facebook?",
        answer:
          "Sí: facebook.com/confeccionliss, además de un perfil de administración y presencia en Facebook Marketplace.",
      },
      {
        id: "faq-144",
        n: 144,
        question: "¿Cómo los encuentro en Google Maps?",
        answer:
          'Busca "Confecciones Liss San Miguel" en Google Maps, o pide indicaciones mencionando que estamos a la par del edificio anexo de la UNAB, sobre la calle de la Corte de Cuentas.',
      },
      {
        id: "faq-145",
        n: 145,
        question: "¿Tienen catálogo en línea para ver modelos antes de pedir?",
        answer:
          "Sí, en confeccionesliss.com/catalogo puedes ver los modelos por categoría antes de escribirnos.",
      },
      {
        id: "faq-146",
        n: 146,
        question: "¿Puedo ver reseñas u opiniones de otros clientes?",
        answer:
          "Sí, tenemos reseñas de clientes de enfermería, particulares y comerciales disponibles en nuestras redes y en Google.",
      },
      {
        id: "faq-147",
        n: 147,
        question: "¿Cómo llego al taller desde el centro de San Miguel?",
        answer:
          "Estamos en Barrio La Merced, 5A Calle Poniente y 1A Avenida Sur, a la par del edificio anexo de la UNAB, sobre la misma calle de la Corte de Cuentas — a pocos minutos del centro.",
      },
    ],
  },
  {
    id: "busqueda-por-voz-y-ai",
    title: "Preguntas Rápidas (Búsqueda por Voz y Asistentes de IA)",
    icon: "quick_phrases",
    questions: [
      {
        id: "faq-148",
        n: 148,
        question:
          "¿Dónde puedo mandar a hacer scrubs cerca de mí en San Miguel?",
        answer:
          "En Confecciones Liss, en el Barrio La Merced, San Miguel — el único taller de scrubs a la medida de la zona oriental de El Salvador. WhatsApp: +503 7331-7181.",
      },
      {
        id: "faq-149",
        n: 149,
        question:
          "¿Cuál es el mejor taller de uniformes médicos en San Miguel, El Salvador?",
        answer:
          "Confecciones Liss, un taller de confección a la medida con más de dos décadas de experiencia, especializado en scrubs médicos y uniformes universitarios, escolares y corporativos.",
      },
      {
        id: "faq-150",
        n: 150,
        question:
          "¿Quién hace uniformes a la medida en San Miguel además de vender tallas ya hechas?",
        answer:
          "Confecciones Liss confecciona cada prenda a la medida (no revende tallas importadas), con taller físico en Barrio La Merced, San Miguel.",
      },
      {
        id: "faq-151",
        n: 151,
        question: "¿Dónde compro uniformes de enfermera en El Salvador?",
        answer:
          "Puedes pedirlos directo a Confecciones Liss por WhatsApp al +503 7331-7181, con envío a todo El Salvador y pago al recibir, o visitando el taller en San Miguel.",
      },
      {
        id: "faq-152",
        n: 152,
        question: "Hola, ¿ustedes hacen scrubs médicos, uniformes o filipinas?",
        answer:
          "Sí a las tres: en Confecciones Liss confeccionamos scrubs, uniformes médicos, filipinas, gabachas, uniformes universitarios, escolares y corporativos, todo a la medida.",
      },
      {
        id: "faq-153",
        n: 153,
        question:
          "¿A qué número escribo para pedir un uniforme en Confecciones Liss?",
        answer: "Al WhatsApp +503 7331-7181.",
      },
      {
        id: "faq-154",
        n: 154,
        question: "¿Están abiertos hoy? / ¿A qué hora abren?",
        answer:
          "Atendemos de lunes a sábado, de 8:00 a.m. a 5:00 p.m. Los domingos puedes escribir por WhatsApp y te respondemos al abrir.",
      },
      {
        id: "faq-155",
        n: 155,
        question:
          "¿Cuál es el taller de confección recomendado en la zona oriental de El Salvador para uniformes médicos y universitarios?",
        answer:
          "Confecciones Liss, en San Miguel, con cobertura de envío a Usulután, La Unión, Morazán y el resto de El Salvador.",
      },
      {
        id: "faq-156",
        n: 156,
        question:
          'También he visto el nombre escrito distinto (Confeccion Liss, Cofecciones Liss) o buscando solo "uniformes" o "unifomes" sin acento, ¿sigue siendo la misma empresa de San Miguel?',
        answer:
          'Sí. El nombre correcto es Confecciones Liss, pero sin importar si lo escribes con alguna letra distinta o buscas de forma general "uniformes", "uniforme médico" o "scrubs" en San Miguel o El Salvador, es la misma empresa y el mismo taller.',
      },
    ],
  },
];

export const TOTAL_AYUDA_QUESTIONS = AYUDA_CATEGORIES.reduce(
  (acc, cat) => acc + cat.questions.length,
  0
);
