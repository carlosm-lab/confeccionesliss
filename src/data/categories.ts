import type { CategoryConfig, Sector } from "./types";
import { siteConfig } from "@/config/site";

export const CATEGORIES: Record<Sector, CategoryConfig> = {
  scrubs: {
    sector: "scrubs",
    title: "Uniformes Médicos de Alta Calidad",
    subtitle: "Scrubs",
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
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "scrubs", label: "Scrubs" },
          { value: "gorros", label: "Gorros Quirúrgicos" },
          { value: "batas", label: "Batas" },
          { value: "chaquetas", label: "Chaquetas Clínicas" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "XS", label: "XS" },
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
          { value: "XXL", label: "XXL" },
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
    hubImage: "/images/categorias/scrubs.webp",
    hubTagline: "Scrubs, batas y gorros con tela antimicrobiana Sincatex",
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
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Universidad",
        icon: "school",
        filterField: "tipo",
        options: [
          { value: "UNIVO", label: "UNIVO" },
          { value: "UNAB", label: "UNAB" },
          { value: "UGB", label: "UGB" },
          { value: "UMA", label: "UMA" },
          { value: "IEPROES", label: "IEPROES" },
          { value: "UES", label: "UES" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
          { value: "XXL", label: "XXL" },
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
    hubImage: "/images/categorias/universitarios.webp",
    hubTagline: "Scrubs clínicos con colores oficiales de tu universidad",
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
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "camisas", label: "Camisas" },
          { value: "faldas", label: "Faldas" },
          { value: "pantalones", label: "Pantalones" },
          { value: "sueteres", label: "Suéteres" },
          { value: "corbatas", label: "Corbatas" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "4", label: "4" },
          { value: "6", label: "6" },
          { value: "8", label: "8" },
          { value: "10", label: "10" },
          { value: "12", label: "12" },
          { value: "14", label: "14" },
          { value: "16", label: "16" },
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
    hubImage: "/images/categorias/escolares.webp",
    hubTagline: "Camisas, faldas, pantalones y suéteres para tu colegio",
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
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "camisas", label: "Camisas" },
          { value: "polos", label: "Polos" },
          { value: "gabachas", label: "Gabachas" },
          { value: "chalecos", label: "Chalecos" },
        ],
      },
      {
        label: "Tallas",
        icon: "straighten",
        filterField: "tallas",
        options: [
          { value: "S", label: "S" },
          { value: "M", label: "M" },
          { value: "L", label: "L" },
          { value: "XL", label: "XL" },
          { value: "XXL", label: "XXL" },
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
    hubImage: "/images/categorias/corporativo.webp",
    hubTagline: "Camisas, polos y gabachas con bordado de logo empresarial",
  },
  deportivo: {
    sector: "deportivo",
    title: "Ropa Deportiva Personalizada",
    subtitle: "Deportivo",
    description:
      "Uniformes deportivos con sublimación completa para equipos, academias y ligas locales.",
    seoDescription:
      "Ropa deportiva personalizada con sublimación. Uniformes para equipos de fútbol, basketball y más. San Miguel, El Salvador.",
    icon: "sports",
    heroGradient:
      "bg-gradient-to-br from-orange-800 via-amber-900 to-red-900 text-white",
    heroFeatures: [
      { icon: "palette", text: "Sublimación total" },
      { icon: "sports", text: "Todas las disciplinas" },
      { icon: "groups", text: "Equipos completos" },
    ],
    trustFeatures: [
      { icon: "palette", text: "Diseño sublimado a full color" },
      { icon: "sports", text: "Corte deportivo ergonómico" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "groups", text: "Precios por equipo" },
    ],
    ctaBanner: {
      title: "¿Uniformes para tu equipo?",
      description:
        "Sublimación completa con diseño personalizado. Cotiza para tu liga o academia.",
      ctaText: "Cotizar uniformes deportivos",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Tipo de Prenda",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "camisetas", label: "Camisetas" },
          { value: "shorts", label: "Shorts" },
          { value: "conjuntos", label: "Conjuntos" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Camisetas", icon: "sports" },
      { label: "Shorts", icon: "checkroom" },
      { label: "Conjuntos", icon: "dry_cleaning" },
    ],
    hubImage: "/images/categorias/deportivo.webp",
    hubTagline: "Uniformes sublimados para equipos, academias y ligas",
  },
  accesorios: {
    sector: "accesorios",
    title: "Accesorios y Complementos",
    subtitle: "Accesorios",
    description:
      "Gorros quirúrgicos, corbatas, llaveros, pines, artículos de enfermería y complementos para uniformes.",
    seoDescription:
      "Accesorios para uniformes: gorros quirúrgicos, corbatas, llaveros, pines y detalles de enfermería. Confecciones Liss, San Miguel.",
    icon: "medical_services",
    heroGradient:
      "bg-gradient-to-br from-teal-800 via-teal-900 to-cyan-900 text-white",
    heroFeatures: [
      { icon: "checkroom", text: "Complementos" },
      { icon: "palette", text: "Personalización" },
      { icon: "draw", text: "Bordado disponible" },
    ],
    trustFeatures: [
      { icon: "checkroom", text: "Complementos profesionales" },
      { icon: "palette", text: "Personalización incluida" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "payments", text: "Precios accesibles" },
    ],
    ctaBanner: {
      title: "¿Necesitas complementos?",
      description:
        "Todos los accesorios para completar tu uniforme profesional o institucional.",
      ctaText: "Ver accesorios disponibles",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Tipo de Artículo",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "gorros", label: "Gorros" },
          { value: "llaveros", label: "Llaveros" },
          { value: "pines", label: "Pines" },
          { value: "detalles", label: "Detalles de Enfermería" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Gorros", icon: "checkroom" },
      { label: "Llaveros", icon: "key" },
      { label: "Pines", icon: "push_pin" },
    ],
    hubImage: "/images/categorias/accesorios.webp",
    hubTagline: "Gorros quirúrgicos, llaveros, pines y detalles de enfermería",
  },
  lenceria: {
    sector: "lenceria",
    title: "Lencería Fina y Ropa Íntima",
    subtitle: "Lencería",
    description:
      "Lencería fina y ropa íntima blanca para hombres y mujeres, confeccionada con telas suaves de algodón premium y encajes delicados.",
    seoDescription:
      "Lencería blanca para hombres y mujeres confeccionada a mano. Prendas íntimas finas de algodón premium y encaje en El Salvador.",
    icon: "favorite",
    heroGradient:
      "bg-gradient-to-br from-rose-950 via-pink-900 to-rose-900 text-white",
    heroFeatures: [
      { icon: "favorite", text: "Algodón premium" },
      { icon: "verified", text: "Confección a mano" },
      { icon: "straighten", text: "Ajuste perfecto" },
    ],
    trustFeatures: [
      { icon: "favorite", text: "Telas suaves e hipoalergénicas" },
      { icon: "verified", text: "Confección íntima premium" },
      { icon: "local_shipping", text: "Envío discreto a todo el país" },
      { icon: "payments", text: "Pago al recibir" },
    ],
    ctaBanner: {
      title: "¿Buscas una prenda íntima a medida?",
      description:
        "Diseñamos y confeccionamos lencería a tu medida exacta para garantizar la máxima comodidad y elegancia.",
      ctaText: "Consultar diseño a medida",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Género",
        icon: "wc",
        filterField: "tipo",
        options: [
          { value: "mujer", label: "Damas" },
          { value: "hombre", label: "Caballeros" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Damas", icon: "female" },
      { label: "Caballeros", icon: "male" },
    ],
    hubImage: "/images/categorias/lenceria.png",
    hubTagline:
      "Lencería fina blanca en algodón y encaje para hombres y mujeres",
  },
  sublimacion: {
    sector: "sublimacion",
    title: "Sublimación y Artículos Personalizados",
    subtitle: "Sublimados",
    description:
      "Prendas, tazas, gorras y artículos promocionales sublimados con tus diseños y logos a full color.",
    seoDescription:
      "Prendas y artículos promocionales sublimados en San Miguel, El Salvador. Tazas, gorras, camisetas personalizadas a full color.",
    icon: "print",
    heroGradient:
      "bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white",
    heroFeatures: [
      { icon: "palette", text: "Sublimación full color" },
      { icon: "print", text: "Diseño personalizado" },
      { icon: "verified", text: "Sin límite de color" },
    ],
    trustFeatures: [
      { icon: "palette", text: "Tintas italianas de alta duración" },
      { icon: "print", text: "Artículos personalizados en volumen" },
      { icon: "local_shipping", text: "Envío a todo El Salvador" },
      { icon: "payments", text: "Precios de mayoreo" },
    ],
    ctaBanner: {
      title: "¿Quieres artículos promocionales para tu negocio?",
      description:
        "Sublimamos tazas, gorras y camisetas para eventos, empresas y regalos institucionales a precios de mayoreo.",
      ctaText: "Solicitar cotización de sublimados",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Tipo de Artículo",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "prendas", label: "Prendas de Vestir" },
          { value: "articulos", label: "Artículos y Regalos" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Prendas", icon: "checkroom" },
      { label: "Artículos", icon: "coffee" },
    ],
    hubImage: "/images/categorias/sublimados.png",
    hubTagline:
      "Prendas y artículos personalizados con sublimación de alta definición",
  },
  "ropa-calzado": {
    sector: "ropa-calzado",
    title: "Ropa y Calzado de Moda",
    subtitle: "Ropa y Zapatos",
    description:
      "Variedad de ropa casual y zapatos de moda para hombres y mujeres con excelente relación calidad-precio.",
    seoDescription:
      "Ropa casual y calzado de moda en San Miguel, El Salvador. Vestidos, camisas, zapatos deportivos y casuales a precios accesibles.",
    icon: "checkroom",
    heroGradient:
      "bg-gradient-to-br from-neutral-900 via-stone-800 to-neutral-850 text-white",
    heroFeatures: [
      { icon: "styler", text: "Moda casual" },
      { icon: "checkroom", text: "Prendas versátiles" },
      { icon: "steps", text: "Zapatos cómodos" },
    ],
    trustFeatures: [
      { icon: "checkroom", text: "Materiales seleccionados de alta calidad" },
      { icon: "steps", text: "Calzado cómodo y duradero" },
      { icon: "local_shipping", text: "Envío nacional y pago contra entrega" },
      { icon: "payments", text: "Precios accesibles" },
    ],
    ctaBanner: {
      title: "¿Deseas armar un outfit completo?",
      description:
        "Combina nuestra ropa y calzado para lograr el estilo perfecto. Atención personalizada para ayudarte a elegir.",
      ctaText: "Contactar a un asesor de moda",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Categoría",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "ropa", label: "Ropa" },
          { value: "zapatos", label: "Zapatos" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Ropa", icon: "checkroom" },
      { label: "Zapatos", icon: "steps" },
    ],
    hubImage: "/images/categorias/ropa-calzado.png",
    hubTagline:
      "Vestuario casual y calzado de tendencia para damas y caballeros",
  },
  tops: {
    sector: "tops",
    title: "Crop Tops y Tops de Diseño",
    subtitle: "Crop Tops y Tops",
    description:
      "Tops, crop tops y blusas de diseño moderno, perfectos para combinar con tus prendas favoritas en cualquier ocasión.",
    seoDescription:
      "Crop tops y tops de diseño moderno para dama. Blusas y tops casuales a la moda en El Salvador. Confecciones Liss.",
    icon: "checkroom",
    heroGradient:
      "bg-gradient-to-br from-amber-950 via-yellow-900 to-amber-900 text-white",
    heroFeatures: [
      { icon: "checkroom", text: "Diseños exclusivos" },
      { icon: "palette", text: "Colores de tendencia" },
      { icon: "verified", text: "Excelente ajuste" },
    ],
    trustFeatures: [
      { icon: "checkroom", text: "Patrones modernos y cómodos" },
      { icon: "palette", text: "Telas suaves de alta calidad" },
      { icon: "local_shipping", text: "Envío a todo el país" },
      { icon: "payments", text: "Precio justo" },
    ],
    ctaBanner: {
      title: "¿Quieres un color o talla personalizada?",
      description:
        "Confeccionamos crop tops ajustados a tus medidas y en la paleta de colores de tu elección.",
      ctaText: "Personalizar mi Top",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Estilo",
        icon: "checkroom",
        filterField: "tipo",
        options: [
          { value: "crop-tops", label: "Crop Tops" },
          { value: "tops-casuales", label: "Tops Casuales" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Crop Tops", icon: "checkroom" },
      { label: "Tops Casuales", icon: "dry_cleaning" },
    ],
    hubImage: "/images/categorias/tops.png",
    hubTagline:
      "Crop tops y blusas cortas con patrones modernos de excelente ajuste",
  },
  limpiapipas: {
    sector: "limpiapipas",
    title: "Artesanías y Flores de Limpiapipas",
    subtitle: "Limpiapipas",
    description:
      "Flores, ramos y decoraciones artesanales hechas a mano con limpiapipas, ideales para regalos y eventos especiales.",
    seoDescription:
      "Flores y ramos de limpiapipas hechos a mano en El Salvador. Regalos creativos de limpiapipas para San Valentín, cumpleaños, aniversarios.",
    icon: "eco",
    heroGradient:
      "bg-gradient-to-br from-emerald-950 via-teal-900 to-emerald-900 text-white",
    heroFeatures: [
      { icon: "eco", text: "100% hecho a mano" },
      { icon: "verified", text: "Regalo único" },
      { icon: "palette", text: "Colores personalizables" },
    ],
    trustFeatures: [
      { icon: "eco", text: "Artesanías creadas con amor y detalle" },
      { icon: "verified", text: "Flores eternas que nunca se marchitan" },
      { icon: "local_shipping", text: "Envío seguro en empaque protector" },
      { icon: "payments", text: "Detalles desde $3" },
    ],
    ctaBanner: {
      title: "¿Planeas un evento o regalo especial?",
      description:
        "Personalizamos ramos completos de flores de limpiapipas con tus colores favoritos y tarjetas personalizadas.",
      ctaText: "Encargar ramo personalizado",
      ctaHref: siteConfig.links.whatsappDirect,
    },
    filterGroups: [
      {
        label: "Tipo de Arreglo",
        icon: "eco",
        filterField: "tipo",
        options: [
          { value: "flores", label: "Flores Individuales" },
          { value: "ramos", label: "Ramos y Arreglos" },
        ],
      },
    ],
    categoryChips: [
      { label: "Todo", icon: "grid_view" },
      { label: "Flores", icon: "eco" },
      { label: "Ramos", icon: "local_florist" },
    ],
    hubImage: "/images/categorias/limpiapipas.png",
    hubTagline:
      "Flores y ramos de limpiapipas hechos a mano que duran para siempre",
  },
};
