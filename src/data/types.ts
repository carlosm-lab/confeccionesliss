// ──────────────────────────────────────────────
// Fuente de verdad: Tipos del sistema de catálogo
// ──────────────────────────────────────────────

/** Sectores/categorías del catálogo */
export type Sector =
  | "salud"
  | "universitario"
  | "escolar"
  | "corporativo"
  | "deportivo"
  | "accesorios";

/** Color disponible para un producto */
export interface ProductColor {
  name: string;
  hex: string;
}

/** Producto individual */
export interface Product {
  /** Slug URL-safe, ej: "scrub-san-miguel" */
  id: string;
  /** Nombre visible del producto */
  nombre: string;
  /** Precio actual en USD */
  precio: number;
  /** Precio anterior (tachado) – null si no hay descuento */
  precioAnterior?: number | null;
  /** Etiqueta de subcategoría visible, ej: "Scrubs Médicos" */
  categoria: string;
  /** Clave interna para filtros, ej: "scrubs" */
  tipo: string;
  /** Sector padre al que pertenece */
  sector: Sector;
  /** URL de imagen principal – null si no hay imagen */
  imagen: string | null;
  /** Texto alternativo para la imagen */
  imageAlt?: string;
  /** Tallas disponibles */
  tallas: string[];
  /** Si se muestra badge de estado */
  showBadge?: boolean;
  /** Texto del badge: "Nuevo", "Popular", "Oferta" */
  badgeText?: string;
  /** Sufijo de precio: "/unid." */
  priceSuffix?: string;
  /** Descripción completa para la página de detalle */
  descripcion?: string;
  /** Descripción corta para meta description */
  descripcionCorta?: string;
  /** Colores disponibles */
  colores?: ProductColor[];
  /** Lista de características / bullet points */
  caracteristicas?: string[];
  /** Material / tela */
  material?: string;
}

/** Chip de filtro rápido (sticky bar) */
export interface CategoryChip {
  label: string;
  icon: string;
}

/** Opción individual dentro de un grupo de filtro */
export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

/** Grupo de filtros en el sidebar */
export interface FilterGroup {
  label: string;
  icon?: string;
  options: FilterOption[];
}

/** Feature de confianza (trust strip) */
export interface TrustFeature {
  icon: string;
  text: string;
}

/** Feature del hero (badges informativas) */
export interface HeroFeature {
  icon: string;
  text: string;
}

/** Banner CTA al final de la página */
export interface CtaBanner {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
}

/** Configuración completa de una categoría/sector */
export interface CategoryConfig {
  sector: Sector;
  title: string;
  subtitle: string;
  description: string;
  seoDescription: string;
  icon: string;
  heroGradient: string;
  heroFeatures: HeroFeature[];
  trustFeatures: TrustFeature[];
  ctaBanner: CtaBanner;
  filterGroups: FilterGroup[];
  categoryChips: CategoryChip[];
}
