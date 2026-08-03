export type BlogPilar =
  | "Universidad"
  | "Carrera"
  | "Normativa MINSAL"
  | "Guías de compra y cuidado"
  | "Local y negocio"
  | "Estacional"
  | "Comparativas";

export type Universidad =
  | "UNIVO"
  | "IEPROES"
  | "UGB"
  | "UNAB"
  | "UES"
  | "UMA"
  | "UEES"
  | null;

export interface BlogPost {
  slug: string;
  titulo: string;
  metaTitulo: string;
  metaDescripcion: string;
  keywordPrincipal: string;
  pilar: BlogPilar;
  universidad: Universidad;
  carrera: string | null;
  enlaceInterno: string[];
  prioridad: "Alta" | "Media" | "Baja";
  status: "draft" | "published";
  publishedAt: string | null; // ISO date; null mientras esté en draft
  imagen: string;
  destacado?: boolean;
}

const blogPostsSeed: BlogPost[] = [
  {
    slug: "uniforme-enfermeria-univo",
    titulo:
      "Uniforme de Enfermería UNIVO: colores oficiales y guía de compra en San Miguel",
    metaTitulo: "Uniforme de Enfermería UNIVO | Guía San Miguel",
    metaDescripcion:
      "Guía del uniforme de Enfermería de la UNIVO: tela antifluidos, tallas, bordado incluido y envío a todo El Salvador desde San Miguel.",
    keywordPrincipal: "uniforme de enfermería UNIVO",
    pilar: "Universidad",
    universidad: "UNIVO",
    carrera: "Enfermería",
    enlaceInterno: ["/catalogo/universidades/univo"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-16T10:00:00.000Z",
    imagen: "/images/blog/uniforme-enfermeria-univo.png",
    destacado: true,
  },
  {
    slug: "uniforme-enfermeria-ugb",
    titulo:
      "Uniforme de Enfermería UGB: colores oficiales y guía de compra en San Miguel",
    metaTitulo: "Uniforme de Enfermería UGB | Guía San Miguel",
    metaDescripcion:
      "Guía del uniforme de Enfermería de la UGB: tela antifluidos, tallas, bordado incluido y envío a todo El Salvador desde San Miguel.",
    keywordPrincipal: "uniforme de enfermería UGB",
    pilar: "Universidad",
    universidad: "UGB",
    carrera: "Enfermería",
    enlaceInterno: ["/catalogo/universidades/ugb"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-15T10:00:00.000Z",
    imagen: "/images/blog/uniforme-enfermeria-ugb.png",
  },
  {
    slug: "uniforme-enfermeria-unab",
    titulo: "Uniforme de Enfermería UNAB: blanco y azul marino, guía completa",
    metaTitulo: "Uniforme de Enfermería UNAB | Blanco y Azul Marino",
    metaDescripcion:
      "Guía oficial con colores, telas antifluidos, tallas y dónde comprarlo en San Miguel para la carrera de Enfermería UNAB.",
    keywordPrincipal: "uniforme de enfermería UNAB",
    pilar: "Universidad",
    universidad: "UNAB",
    carrera: "Enfermería",
    enlaceInterno: ["/catalogo/universidades/unab"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-14T10:00:00.000Z",
    imagen: "/images/blog/uniforme-enfermeria-unab.png",
  },
  {
    slug: "uniforme-enfermeria-ieproes",
    titulo:
      "Uniforme de Enfermería IEPROES: colores oficiales y guía de compra en San Miguel",
    metaTitulo: "Uniforme de Enfermería IEPROES | Guía San Miguel",
    metaDescripcion:
      "Guía del uniforme oficial de Enfermería del IEPROES en San Miguel: tela, tallas, bordado incluido y envío a todo El Salvador.",
    keywordPrincipal: "uniforme de enfermería IEPROES",
    pilar: "Universidad",
    universidad: "IEPROES",
    carrera: "Enfermería",
    enlaceInterno: ["/catalogo/universidades/ieproes"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-14T10:00:00.000Z",
    imagen: "/images/blog/uniforme-enfermeria-ieproes.png",
  },
  {
    slug: "uniforme-enfermeria-ues",
    titulo: "Uniforme de Enfermería UES: colores oficiales y guía completa",
    metaTitulo: "Uniforme de Enfermería UES | Guía Completa San Miguel",
    metaDescripcion:
      "Guía oficial con colores, tallas, bordado incluido y envío a todo El Salvador para estudiantes de la UES.",
    keywordPrincipal: "uniforme de enfermería UES",
    pilar: "Universidad",
    universidad: "UES",
    carrera: "Enfermería",
    enlaceInterno: ["/catalogo/universidades/ues"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-13T10:00:00.000Z",
    imagen: "/images/blog/uniforme-enfermeria-ues.png",
  },
  {
    slug: "uniforme-medicina-univo",
    titulo: "Uniforme de Doctorado en Medicina UNIVO: guía para nuevo ingreso",
    metaTitulo: "Uniforme de Medicina UNIVO | Guía Nuevo Ingreso",
    metaDescripcion:
      "Guía con colores, tela antifluidos y dónde conseguirlo en San Miguel para Medicina UNIVO.",
    keywordPrincipal: "uniforme de medicina UNIVO",
    pilar: "Universidad",
    universidad: "UNIVO",
    carrera: "Medicina",
    enlaceInterno: ["/catalogo/universidades/univo"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-12T10:00:00.000Z",
    imagen: "/images/blog/uniforme-medicina-univo.png",
  },
  {
    slug: "uniforme-medicina-ugb",
    titulo: "Uniforme de Doctorado en Medicina UGB: guía para nuevo ingreso",
    metaTitulo: "Uniforme de Medicina UGB | Guía Nuevo Ingreso",
    metaDescripcion:
      "Guía con colores, tela antifluidos y dónde conseguirlo en San Miguel para Medicina UGB.",
    keywordPrincipal: "uniforme de medicina UGB",
    pilar: "Universidad",
    universidad: "UGB",
    carrera: "Medicina",
    enlaceInterno: ["/catalogo/universidades/ugb"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-12T10:00:00.000Z",
    imagen: "/images/blog/uniforme-medicina-ugb.png",
  },
  {
    slug: "uniforme-laboratorio-clinico-unab",
    titulo: "Uniforme de Laboratorio Clínico UNAB: guía completa",
    metaTitulo: "Uniforme de Laboratorio Clínico UNAB | Guía",
    metaDescripcion:
      "Guía con colores, tela antifluidos, tallas, bordado incluido y envío nacional.",
    keywordPrincipal: "uniforme laboratorio clínico UNAB",
    pilar: "Universidad",
    universidad: "UNAB",
    carrera: "Laboratorio Clínico",
    enlaceInterno: ["/catalogo/universidades/unab"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-11T10:00:00.000Z",
    imagen: "/images/blog/uniforme-laboratorio-clinico-unab.png",
  },
  {
    slug: "donde-comprar-uniformes-medicos-san-miguel",
    titulo: "¿Dónde comprar uniformes médicos en San Miguel, El Salvador?",
    metaTitulo: "Uniformes Médicos San Miguel | Dónde Comprar",
    metaDescripcion:
      "Dónde comprar uniformes médicos, scrubs y uniformes universitarios de salud en San Miguel, El Salvador, con atención directa y envío nacional.",
    keywordPrincipal: "uniformes médicos San Miguel",
    pilar: "Local y negocio",
    universidad: null,
    carrera: null,
    enlaceInterno: ["/", "/catalogo"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-10T10:00:00.000Z",
    imagen: "/images/blog/donde-comprar-uniformes-medicos-san-miguel.png",
    destacado: true,
  },
  {
    slug: "colores-uniforme-enfermeria-minsal",
    titulo:
      "Colores de uniforme de enfermería según el MINSAL El Salvador: guía actualizada",
    metaTitulo: "Colores Uniforme Enfermería MINSAL | Guía",
    metaDescripcion:
      "Qué dicen los lineamientos oficiales del MINSAL sobre el color del uniforme de enfermería en El Salvador, según cargo y nivel de atención.",
    keywordPrincipal: "colores uniforme enfermería MINSAL",
    pilar: "Normativa MINSAL",
    universidad: null,
    carrera: null,
    enlaceInterno: ["/catalogo/scrubs", "/catalogo/universidades"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-09T10:00:00.000Z",
    imagen: "/images/blog/colores-uniforme-enfermeria-minsal.png",
    destacado: true,
  },
  {
    slug: "guia-de-tallas-uniforme-medico",
    titulo:
      "Guía de tallas para uniformes médicos: cómo tomar medidas correctamente",
    metaTitulo: "Guía de Tallas Uniforme Médico | Cómo Medir",
    metaDescripcion:
      "Cómo medir la talla correcta de un uniforme médico o scrub en casa: qué medir, cómo interpretar los resultados y qué hacer entre tallas.",
    keywordPrincipal: "guía de tallas uniforme médico",
    pilar: "Guías de compra y cuidado",
    universidad: null,
    carrera: null,
    enlaceInterno: ["/catalogo"],
    prioridad: "Alta",
    status: "published",
    publishedAt: "2026-08-08T10:00:00.000Z",
    imagen: "/images/blog/guia-de-tallas-uniforme-medico.png",
  },
  {
    slug: "uniformes-ues-san-miguel-guia-completa",
    titulo:
      "Guía completa de uniformes para todas las carreras de salud de la UES en San Miguel",
    metaTitulo: "Uniformes UES San Miguel | Guía de Todas las Carreras",
    metaDescripcion:
      "Guía completa de uniformes para las carreras de salud de la Facultad Multidisciplinaria Oriental de la UES: enfermería, medicina y más.",
    keywordPrincipal: "uniformes UES San Miguel",
    pilar: "Universidad",
    universidad: "UES",
    carrera: "Todas (artículo hub)",
    enlaceInterno: ["/catalogo/universidades/ues"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen: "/images/blog/uniformes-ues-san-miguel-guia-completa.png",
  },
  {
    slug: "uniforme-enfermeria-uma",
    titulo:
      "Uniforme de Enfermería UMA: colores oficiales y guía de compra en San Miguel",
    metaTitulo: "Uniforme de Enfermería UMA | Guía San Miguel",
    metaDescripcion:
      "Guía del uniforme de Enfermería de la UMA en San Miguel: tela antifluidos, tallas, bordado incluido y envío a todo El Salvador.",
    keywordPrincipal: "uniforme de enfermería UMA",
    pilar: "Universidad",
    universidad: "UMA",
    carrera: "Enfermería",
    enlaceInterno: ["/catalogo/universidades/uma"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen: "/images/blog/uniforme-enfermeria-uma.png",
  },
  {
    slug: "uniforme-de-enfermeria-guia-completa",
    titulo:
      "Uniforme de enfermería: guía completa de colores, cortes y tallas en El Salvador",
    metaTitulo: "Uniforme de Enfermería El Salvador | Guía Completa",
    metaDescripcion:
      "Guía completa del uniforme de enfermería en El Salvador: colores, telas, cortes, tallas y dónde comprarlo con envío a todo el país.",
    keywordPrincipal: "uniforme de enfermería El Salvador",
    pilar: "Carrera",
    universidad: null,
    carrera: "Enfermería",
    enlaceInterno: ["/catalogo/scrubs"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen:
      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "uniforme-medico-como-elegirlo",
    titulo: "Uniforme médico para doctores y doctoras: cómo elegirlo bien",
    metaTitulo: "Uniforme Médico El Salvador | Cómo Elegirlo Bien",
    metaDescripcion:
      "Guía para elegir uniforme médico en El Salvador: bata o scrub, tela antifluidos, tallas y dónde comprarlo con envío a todo el país.",
    keywordPrincipal: "uniforme médico El Salvador",
    pilar: "Carrera",
    universidad: null,
    carrera: "Medicina",
    enlaceInterno: ["/catalogo/scrubs"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "que-es-la-tela-sincatex",
    titulo:
      "Qué es la tela Sincatex y por qué se usa en uniformes médicos antifluidos",
    metaTitulo: "Qué es la Tela Sincatex | Uniformes Antifluidos",
    metaDescripcion:
      "Qué es la tela Sincatex, por qué se usa en uniformes médicos antifluidos y en qué se diferencia de otras telas como el Lino Oxford.",
    keywordPrincipal: "tela Sincatex",
    pilar: "Guías de compra y cuidado",
    universidad: null,
    carrera: null,
    enlaceInterno: ["/catalogo/scrubs"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "uniformes-universitarios-zona-oriental",
    titulo:
      "Uniformes universitarios en la zona oriental de El Salvador: qué universidades cubrimos",
    metaTitulo: "Uniformes Universitarios Zona Oriental | Guía",
    metaDescripcion:
      "Qué universidades de la zona oriental de El Salvador tienen uniforme oficial disponible: UNIVO, IEPROES, UGB, UNAB, UES y UMA.",
    keywordPrincipal: "uniformes universitarios zona oriental",
    pilar: "Local y negocio",
    universidad: null,
    carrera: null,
    enlaceInterno: ["/catalogo/universidades"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "lista-nuevo-ingreso-ciencias-de-la-salud",
    titulo:
      "Lista de uniformes y útiles para nuevo ingreso a Ciencias de la Salud",
    metaTitulo: "Uniforme Nuevo Ingreso Ciencias de la Salud | Lista",
    metaDescripcion:
      "Checklist de uniforme y accesorios para nuevo ingreso a carreras de salud en El Salvador: cuántos uniformes llevar y qué más se necesita.",
    keywordPrincipal: "uniforme nuevo ingreso ciencias de la salud",
    pilar: "Estacional",
    universidad: null,
    carrera: null,
    enlaceInterno: ["/catalogo/universidades"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen:
      "https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "precio-uniforme-medico-el-salvador",
    titulo: "Cuánto cuesta un uniforme médico en El Salvador: guía de precios",
    metaTitulo: "Precio Uniforme Médico El Salvador | Guía",
    metaDescripcion:
      "Cuánto cuesta un uniforme médico o scrub en El Salvador: qué factores afectan el precio y qué debe incluir un uniforme bien cotizado.",
    keywordPrincipal: "precio uniforme médico El Salvador",
    pilar: "Comparativas",
    universidad: null,
    carrera: null,
    enlaceInterno: ["/catalogo"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen:
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "uniforme-medicina-ues",
    titulo: "Uniforme de Doctorado en Medicina UES: guía para nuevo ingreso",
    metaTitulo: "Uniforme de Medicina UES | Guía Nuevo Ingreso",
    metaDescripcion:
      "Qué uniforme usar en el Doctorado en Medicina de la UES en San Miguel: bata, scrub clínico, tela antifluidos y dónde conseguirlo.",
    keywordPrincipal: "uniforme de medicina UES",
    pilar: "Universidad",
    universidad: "UES",
    carrera: "Medicina",
    enlaceInterno: ["/catalogo/universidades/ues"],
    prioridad: "Alta",
    status: "draft",
    publishedAt: null,
    imagen:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=80",
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...blogPostsSeed].sort((a, b) => {
    if (a.status === "published" && b.status === "draft") return -1;
    if (a.status === "draft" && b.status === "published") return 1;
    const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
    const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
    return dateB - dateA;
  });
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPostsSeed.filter((post) => post.destacado);
}

export function getPublishedBlogPosts(): BlogPost[] {
  return blogPostsSeed
    .filter((post) => post.status === "published")
    .sort((a, b) => {
      const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
      const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
      return dateB - dateA;
    });
}

export function filterBlogPosts(
  posts: BlogPost[],
  pilar: BlogPilar | "Todos",
  universidad: Universidad | "Todas",
  searchQuery?: string
): BlogPost[] {
  const normQuery = searchQuery
    ? searchQuery
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\w\s]/gi, " ")
        .trim()
    : "";

  return posts.filter((post) => {
    const matchesPilar = pilar === "Todos" || post.pilar === pilar;
    const matchesUni =
      universidad === "Todas" || post.universidad === universidad;

    if (!normQuery) return matchesPilar && matchesUni;

    const normTarget =
      `${post.titulo} ${post.metaDescripcion} ${post.pilar} ${post.carrera || ""} ${post.universidad || ""} ${post.keywordPrincipal}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\w\s]/gi, " ");

    const tokens = normQuery.split(/\s+/).filter(Boolean);
    const matchesText = tokens.every((token) => normTarget.includes(token));

    return matchesPilar && matchesUni && matchesText;
  });
}
