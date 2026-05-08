import type { CategoryConfig, Sector } from "./types";

export const SECTOR_SLUGS: Sector[] = [
  "salud",
  "universitario",
  "escolar",
  "corporativo",
];

export const CATEGORIES: Record<Sector, CategoryConfig> = {
  salud: {
    sector: "salud",
    title: "Uniformes Médicos de Alta Calidad",
    subtitle: "Sector Salud",
    description:
      "Scrubs, batas, gorros quirúrgicos y chaquetas clínicas confeccionados con tela antimicrobiana Sincatex.",
    seoDescription:
      "Scrubs médicos, batas, gorros quirúrgicos y chaquetas clínicas confeccionados con tela antimicrobiana Sincatex. Bordado personalizado. Desde $35 en San Miguel, El Salvador.",
    icon: "health_and_safety",
    heroGradient: "bg-primary text-white",
    heroFeatures: [
      { icon: "verified", text: "Tela Sincatex" },
      { icon: "dry_cleaning", text: "Anti-fluidos" },
      { icon: "palette", text: "Bordado incluido" },
    ],
    trustFeatures: [
      { icon: "verified", text: "Tela Sincatex antimicrobiana" },
      { icon: "palette", text: "Bordado personalizado incluido" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "payments", text: "Pago al recibir" },
    ],
    ctaBanner: {
      title: "¿Necesitas uniformes para tu equipo médico?",
      description:
        "Ofrecemos precios especiales para hospitales, clínicas y grupos de estudiantes. Bordado de logo institucional incluido.",
      ctaText: "Solicitar Cotización Grupal",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        options: [
          { value: "scrubs", label: "Scrubs" },
          { value: "gorros", label: "Gorros Quirúrgicos" },
          { value: "batas", label: "Batas" },
          { value: "chaquetas", label: "Chaquetas Clínicas" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Scrubs", icon: "medical_services" },
      { label: "Gorros", icon: "checkroom" },
      { label: "Batas", icon: "dry_cleaning" },
      { label: "Chaquetas", icon: "styler" },
    ],
  },
  universitario: {
    sector: "universitario",
    title: "Uniformes Universitarios — Zona Oriental",
    subtitle: "Universitario",
    description:
      "Scrubs clínicos con colores oficiales para UNIVO, UNAB, UGB, UMA, IEPROES, UES y más universidades de la zona oriental.",
    seoDescription:
      "Scrubs clínicos universitarios con colores oficiales para UNIVO, UNAB, UGB, UMA, IEPROES. Confeccionados a la medida en San Miguel, El Salvador. Desde $39.50.",
    icon: "school",
    heroGradient:
      "bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900 text-white",
    heroFeatures: [
      { icon: "school", text: "Colores oficiales" },
      { icon: "verified", text: "Tela Sincatex" },
      { icon: "draw", text: "Bordado de carrera" },
    ],
    trustFeatures: [
      { icon: "school", text: "Colores oficiales por universidad" },
      { icon: "draw", text: "Bordado de carrera incluido" },
      { icon: "local_shipping", text: "Envío nacional" },
      { icon: "groups", text: "Precios grupales" },
    ],
    ctaBanner: {
      title: "¿Eres delegado de carrera?",
      description:
        "Ofrecemos precios especiales para grupos de más de 10 unidades. Incluye bordado de carrera.",
      ctaText: "Cotizar para mi grupo",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Universidad",
        icon: "school",
        options: [
          { value: "UNIVO", label: "UNIVO" },
          { value: "UNAB", label: "UNAB" },
          { value: "UGB", label: "UGB" },
          { value: "UMA", label: "UMA" },
          { value: "IEPROES", label: "IEPROES" },
          { value: "UES", label: "UES" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "UNIVO", icon: "school" },
      { label: "UNAB", icon: "school" },
      { label: "UGB", icon: "school" },
      { label: "UMA", icon: "school" },
      { label: "IEPROES", icon: "school" },
      { label: "UES", icon: "school" },
    ],
  },
  escolar: {
    sector: "escolar",
    title: "Uniformes Escolares a la Medida",
    subtitle: "Escolar",
    description:
      "Camisas, faldas, pantalones y suéteres escolares para colegios de San Miguel y zona oriental.",
    seoDescription:
      "Uniformes escolares para colegios y escuelas de San Miguel, El Salvador. Camisas, faldas, pantalones con colores institucionales. Desde $12.",
    icon: "domain",
    heroGradient: "bg-emerald-900 text-white",
    heroFeatures: [
      { icon: "checkroom", text: "Tela durable" },
      { icon: "palette", text: "Colores institucionales" },
      { icon: "straighten", text: "A la medida" },
    ],
    trustFeatures: [
      { icon: "checkroom", text: "Tela resistente al uso diario" },
      { icon: "palette", text: "Colores institucionales exactos" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "payments", text: "Precios desde $8" },
    ],
    ctaBanner: {
      title: "¿Uniformes para tu colegio?",
      description:
        "Producimos uniformes en volumen para instituciones educativas con precios especiales y bordado incluido.",
      ctaText: "Solicitar cotización institucional",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        options: [
          { value: "camisas", label: "Camisas" },
          { value: "faldas", label: "Faldas" },
          { value: "pantalones", label: "Pantalones" },
          { value: "sueteres", label: "Suéteres" },
          { value: "corbatas", label: "Corbatas" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Camisas", icon: "checkroom" },
      { label: "Faldas", icon: "dry_cleaning" },
      { label: "Pantalones", icon: "styler" },
      { label: "Suéteres", icon: "warm" },
    ],
  },
  corporativo: {
    sector: "corporativo",
    title: "Uniformes Corporativos Profesionales",
    subtitle: "Corporativo",
    description:
      "Camisas, polos, gabachas y chalecos con bordado de logo y colores institucionales para empresas.",
    seoDescription:
      "Camisas, polos, gabachas y chalecos corporativos con bordado de logo y colores institucionales. Precios por volumen desde 10 unidades. San Miguel, El Salvador.",
    icon: "business_center",
    heroGradient: "relative bg-[#1a1a2e] text-white",
    heroFeatures: [
      { icon: "business_center", text: "Imagen empresarial" },
      { icon: "draw", text: "Bordado de logo" },
      { icon: "groups", text: "Desde 10 unidades" },
    ],
    trustFeatures: [
      { icon: "verified", text: "Telas premium de larga duración" },
      { icon: "draw", text: "Bordado de logo incluido" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "groups", text: "Precios por volumen" },
    ],
    ctaBanner: {
      title: "¿Uniformes para tu empresa?",
      description:
        "Cotiza uniformes con tu logo bordado. Precios especiales desde 10 unidades.",
      ctaText: "Solicitar cotización corporativa",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        options: [
          { value: "camisas", label: "Camisas" },
          { value: "polos", label: "Polos" },
          { value: "gabachas", label: "Gabachas" },
          { value: "chalecos", label: "Chalecos" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Camisas", icon: "checkroom" },
      { label: "Polos", icon: "dry_cleaning" },
      { label: "Gabachas", icon: "styler" },
      { label: "Chalecos", icon: "warm" },
    ],
  },
  // Placeholders para futuras categorías
  deportivo: {
    sector: "deportivo",
    title: "Ropa Deportiva Personalizada",
    subtitle: "Deportivo",
    description:
      "Uniformes deportivos con sublimación completa para equipos y academias.",
    seoDescription:
      "Ropa deportiva personalizada con sublimación. Uniformes para equipos de fútbol, basketball y más. San Miguel, El Salvador.",
    icon: "sports",
    heroGradient: "bg-orange-900 text-white",
    heroFeatures: [
      { icon: "palette", text: "Sublimación total" },
      { icon: "sports", text: "Todas las disciplinas" },
      { icon: "groups", text: "Equipos completos" },
    ],
    trustFeatures: [],
    ctaBanner: {
      title: "¿Uniformes para tu equipo?",
      description: "Sublimación completa con diseño personalizado.",
      ctaText: "Cotizar uniformes deportivos",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [],
    categoryChips: [{ label: "Todo", icon: "grid_view" }],
  },
  accesorios: {
    sector: "accesorios",
    title: "Accesorios y Complementos",
    subtitle: "Accesorios",
    description:
      "Gorros quirúrgicos, corbatas, cinturones y complementos para uniformes.",
    seoDescription:
      "Accesorios para uniformes: gorros quirúrgicos, corbatas, y complementos. Confecciones Liss, San Miguel.",
    icon: "medical_services",
    heroGradient: "bg-teal-900 text-white",
    heroFeatures: [
      { icon: "checkroom", text: "Complementos" },
      { icon: "palette", text: "Personalización" },
    ],
    trustFeatures: [],
    ctaBanner: {
      title: "¿Necesitas complementos?",
      description: "Todos los accesorios para completar tu uniforme.",
      ctaText: "Ver accesorios",
      ctaHref: "https://confeccionesliss.axkar.com/",
    },
    filterGroups: [],
    categoryChips: [{ label: "Todo", icon: "grid_view" }],
  },
};
