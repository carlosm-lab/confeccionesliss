import type { Product } from "./types";

// ═══════════════════════════════════════════════
// SALUD — 6 productos
// ═══════════════════════════════════════════════
const SALUD_PRODUCTS: Product[] = [
  {
    id: "scrub-san-miguel",
    nombre: "Scrub Médico Premium 'San Miguel'",
    precio: 45.0,
    precioAnterior: 55.0,
    categoria: "Scrubs Médicos",
    tipo: "scrubs",
    sector: "salud",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHxaJ3wC7_Tyv2qoS2x-JxEIKirXQbF3Oa93ux9PxpkeDL7PxP9HgLzvuK4PXKFpUyQIEazDIMFGi-ippZhPkDRGzV0_DgjDlpq1lvYtUEKv6MM_9SCEIjG9hv1Kuj25-a2myQC0CLzn4fEvE0DFt2kbgC_jM_U-I-1a5mo6eKrFB-IUhmbhCp2sfLYyoGpdjIhZHsgiWX3J4kkrsjmCwv49dPUsoa-VXowlnCp231nVGXqhuBRF3wCeAivhPWKCJ4QLH2jr6oNBXo",
    tallas: ["XS", "S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Nuevo",
    descripcionCorta:
      "Scrub Médico Premium confeccionado con tejido antimicrobiano Sincatex. Repelente a fluidos, estiramiento en 4 direcciones.",
    descripcion:
      "El Scrub Médico Premium 'San Miguel' representa el pináculo de la comodidad clínica. Diseñado específicamente para profesionales de la salud que exigen funcionalidad sin comprometer la apariencia.",
    caracteristicas: [
      "Tejido antimicrobiano y repelente a líquidos.",
      "Corte moderno y favorecedor con pinzas traseras.",
      "6 bolsillos funcionales incluyendo ranura para bolígrafos.",
      "Cintura elástica con cordón ajustable interno.",
      "Resistencia excepcional a la decoloración.",
    ],
    colores: [
      { name: "Azul Naval", hex: "#143067" },
      { name: "Verde Bosque", hex: "#1b4332" },
      { name: "Guinda", hex: "#4a0000" },
      { name: "Gris Oscuro", hex: "#2b2d42" },
      { name: "Blanco", hex: "#ffffff" },
    ],
    material: "Sincatex antimicrobiano",
  },
  {
    id: "scrub-sincatex-clasico",
    nombre: "Scrub Sincatex Clásico",
    precio: 35.0,
    precioAnterior: null,
    categoria: "Scrubs Médicos",
    tipo: "scrubs",
    sector: "salud",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO",
    tallas: ["S", "M", "L", "XL"],
    showBadge: false,
  },
  {
    id: "gorro-quirurgico-premium",
    nombre: "Gorro Quirúrgico Premium",
    precio: 12.0,
    precioAnterior: null,
    categoria: "Gorros",
    tipo: "gorros",
    sector: "salud",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJrG7ywGURCgxGpPBAAxum4EmcC_Ho7DeJYfkcDI1HZLbfrOwjxr84oTYIAz6pJDmYCubgLMXEu2F6OidCmmzN5zFRZRxwQ222Y0aygqOfBOYVJahJFWuX1ePwZ70pzkqqTns9WnbaMFcG5KdIxznIxMA88-3K0vSoYKbvHDe4mMUaQL0c7sboJLYopKKEkMRVQKJkyE-lYKgm8CKMjDe4Hx0thfhqjjJQzYH7PffT9wI0yDesJPkDx8eTyFVeai0jSXh9nfgbPMTI",
    tallas: [],
    showBadge: false,
  },
  {
    id: "bata-medica-clasica",
    nombre: "Bata Médica Clásica",
    precio: 35.0,
    precioAnterior: null,
    categoria: "Batas",
    tipo: "batas",
    sector: "salud",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YwV1ovoyjSwwiIBSXICjSK7t1NRCrORLAJ_WG-VlxLKegY62cdSW0kO4i3RxDxHeOqFaTkKljC8uUBjX8XSP244WgBQ8bv4mqN4XAi-Z3lze5iprsJy74iA97nN7xLG5T9DBh4P0VEV695KAJVFJrMjA6g4-7UnCczo95wFOeSaQEwmOur-gRTwnqJw5YmdyL-yRztA_ycYcCO6hlBmQgXtwurLLPdd7k6oBBIlTI68PQeL9OeeJZoTLCf6r-BJF1EXy2TeD_qa9",
    tallas: ["S", "M", "L", "XL"],
    showBadge: false,
  },
  {
    id: "scrub-premium-verde",
    nombre: "Scrub Premium Verde Quirófano",
    precio: 45.0,
    precioAnterior: null,
    categoria: "Scrubs Médicos",
    tipo: "scrubs",
    sector: "salud",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV",
    tallas: ["XS", "S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Popular",
  },
  {
    id: "chaqueta-clinica",
    nombre: "Chaqueta Clínica",
    precio: 40.0,
    precioAnterior: null,
    categoria: "Chaquetas",
    tipo: "chaquetas",
    sector: "salud",
    imagen: null,
    tallas: ["M", "L", "XL"],
    showBadge: false,
  },
];

// ═══════════════════════════════════════════════
// CORPORATIVO — 6 productos
// ═══════════════════════════════════════════════
const CORPORATIVO_PRODUCTS: Product[] = [
  {
    id: "camisa-oxford",
    nombre: "Camisa Oxford Corporativa",
    precio: 28,
    categoria: "Camisas",
    tipo: "camisas",
    sector: "corporativo",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcr4ELZM-dIaG8Xlo-cMiT9GWGeLLSQJr14Wj5SoifRJb-MfWHST3w8Y2nfP7TnJlwvZTEPbcSM1OZhZWQFm5jjy8HYGG9_h-HN9pWiqn1swCfKVYyeVBsKHkM0nBUlXMPg9Yj7K64B69i90aGdPEQs7pPFyYKbWl2hN4TafZgCFVnJd2O5P9GUh9Ht6fW8J2X5fQIB-g3j1FgGGk8QC4uh2LMQMK7PmT-jUhYnBCk48KIqSR1SZYEP0iY68jkzKjzYx5HI3zMt",
    tallas: ["S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Más vendido",
    priceSuffix: "/unid.",
  },
  {
    id: "polo-dri-fit",
    nombre: "Polo Dri-Fit Empresarial",
    precio: 22,
    categoria: "Polos",
    tipo: "polos",
    sector: "corporativo",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO",
    tallas: ["S", "M", "L", "XL"],
    priceSuffix: "/unid.",
  },
  {
    id: "gabacha-industrial",
    nombre: "Gabacha Industrial",
    precio: 25,
    categoria: "Gabachas",
    tipo: "gabachas",
    sector: "corporativo",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YwV1ovoyjSwwiIBSXICjSK7t1NRCrORLAJ_WG-VlxLKegY62cdSW0kO4i3RxDxHeOqFaTkKljC8uUBjX8XSP244WgBQ8bv4mqN4XAi-Z3lze5iprsJy74iA97nN7xLG5T9DBh4P0VEV695KAJVFJrMjA6g4-7UnCczo95wFOeSaQEwmOur-gRTwnqJw5YmdyL-yRztA_ycYcCO6hlBmQgXtwurLLPdd7k6oBBIlTI68PQeL9OeeJZoTLCf6r-BJF1EXy2TeD_qa9",
    tallas: ["M", "L", "XL"],
    priceSuffix: "/unid.",
  },
  {
    id: "chaleco-seguridad",
    nombre: "Chaleco de Seguridad",
    precio: 18,
    categoria: "Chalecos",
    tipo: "chalecos",
    sector: "corporativo",
    imagen: null,
    tallas: ["M", "L", "XL", "XXL"],
    priceSuffix: "/unid.",
  },
  {
    id: "camisa-manga-corta",
    nombre: "Camisa Manga Corta Ejecutiva",
    precio: 24,
    precioAnterior: 28,
    categoria: "Camisas",
    tipo: "camisas",
    sector: "corporativo",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV",
    tallas: ["S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Oferta",
    priceSuffix: "/unid.",
  },
  {
    id: "polo-pique",
    nombre: "Polo Piqué Premium",
    precio: 26,
    categoria: "Polos",
    tipo: "polos",
    sector: "corporativo",
    imagen: null,
    tallas: ["S", "M", "L", "XL"],
    priceSuffix: "/unid.",
  },
];

// ═══════════════════════════════════════════════
// ESCOLAR — 6 productos
// ═══════════════════════════════════════════════
const ESCOLAR_PRODUCTS: Product[] = [
  {
    id: "camisa-escolar-blanca",
    nombre: "Camisa Escolar Blanca",
    precio: 12,
    categoria: "Camisas",
    tipo: "camisas",
    sector: "escolar",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJPYa3I9MInD_1_NRQIb3_4yvlHu9SPGOEd9N-x7eE5Gz7D0K6n4PQaW_2P_h6yIniP1Sd3nfEBLGDKfXurQKUkCJfF5RLBI8xKXz_3cKnLJlQqnABuF21DpaxBkKBK8nw2-WKhRMeRxq-X9hslzwTqV4Q3wHwqNPg-PxVG7yE_qJidGp3H_qR7VRUQMTwbSRqN4kpB2h-gxNdXHCCr9lCcLBZ-v_z_9dbbJBIrCaH3q_9uBOKfJvyPEf3qvUxLM14t38DqAZlsxI",
    tallas: ["4", "6", "8", "10", "12", "14", "16"],
    showBadge: true,
    badgeText: "Popular",
  },
  {
    id: "falda-escolar-plisada",
    nombre: "Falda Escolar Plisada",
    precio: 15,
    categoria: "Faldas",
    tipo: "faldas",
    sector: "escolar",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO",
    tallas: ["4", "6", "8", "10", "12", "14"],
  },
  {
    id: "pantalon-escolar-azul",
    nombre: "Pantalón Escolar Azul",
    precio: 14,
    categoria: "Pantalones",
    tipo: "pantalones",
    sector: "escolar",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC_YwV1ovoyjSwwiIBSXICjSK7t1NRCrORLAJ_WG-VlxLKegY62cdSW0kO4i3RxDxHeOqFaTkKljC8uUBjX8XSP244WgBQ8bv4mqN4XAi-Z3lze5iprsJy74iA97nN7xLG5T9DBh4P0VEV695KAJVFJrMjA6g4-7UnCczo95wFOeSaQEwmOur-gRTwnqJw5YmdyL-yRztA_ycYcCO6hlBmQgXtwurLLPdd7k6oBBIlTI68PQeL9OeeJZoTLCf6r-BJF1EXy2TeD_qa9",
    tallas: ["4", "6", "8", "10", "12", "14", "16"],
  },
  {
    id: "sueter-escolar",
    nombre: "Suéter Escolar V-Neck",
    precio: 18,
    categoria: "Suéteres",
    tipo: "sueteres",
    sector: "escolar",
    imagen:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV",
    tallas: ["S", "M", "L"],
  },
  {
    id: "camisa-polo-escolar",
    nombre: "Camisa Polo Escolar",
    precio: 14,
    categoria: "Camisas",
    tipo: "camisas",
    sector: "escolar",
    imagen: null,
    tallas: ["4", "6", "8", "10", "12", "14", "16"],
  },
  {
    id: "corbata-escolar",
    nombre: "Corbata Escolar",
    precio: 8,
    categoria: "Corbatas",
    tipo: "corbatas",
    sector: "escolar",
    imagen: null,
    tallas: [],
  },
];

// ═══════════════════════════════════════════════
// UNIVERSITARIO — 6 productos
// ═══════════════════════════════════════════════
const UNIVERSITARIO_PRODUCTS: Product[] = [
  {
    id: "scrub-univo",
    nombre: "Scrub Clínico UNIVO",
    precio: 39.5,
    categoria: "UNIVO",
    tipo: "UNIVO",
    sector: "universitario",
    imagen: "/images/uniformes/univo.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Nuevo",
  },
  {
    id: "scrub-unab",
    nombre: "Scrub Clínico UNAB",
    precio: 39.5,
    categoria: "UNAB",
    tipo: "UNAB",
    sector: "universitario",
    imagen: "/images/uniformes/unab.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
    showBadge: true,
    badgeText: "Nuevo",
  },
  {
    id: "scrub-ugb",
    nombre: "Scrub Clínico UGB",
    precio: 39.5,
    categoria: "UGB",
    tipo: "UGB",
    sector: "universitario",
    imagen: "/images/uniformes/ugb.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "scrub-uma",
    nombre: "Scrub Clínico UMA",
    precio: 39.5,
    categoria: "UMA",
    tipo: "UMA",
    sector: "universitario",
    imagen: "/images/uniformes/uma.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "scrub-ieproes",
    nombre: "Scrub Clínico IEPROES",
    precio: 39.5,
    categoria: "IEPROES",
    tipo: "IEPROES",
    sector: "universitario",
    imagen: "/images/uniformes/ieproes.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "scrub-ues",
    nombre: "Scrub Clínico UES",
    precio: 39.5,
    categoria: "UES",
    tipo: "UES",
    sector: "universitario",
    imagen: "/images/uniformes/ues.webp",
    tallas: ["S", "M", "L", "XL", "XXL"],
  },
];

// ═══════════════════════════════════════════════
// Exportación combinada y helpers
// ═══════════════════════════════════════════════

import type { Sector } from "./types";

export const ALL_PRODUCTS: Product[] = [
  ...SALUD_PRODUCTS,
  ...CORPORATIVO_PRODUCTS,
  ...ESCOLAR_PRODUCTS,
  ...UNIVERSITARIO_PRODUCTS,
];

/** Obtener productos filtrados por sector */
export function getProductsBySector(sector: Sector): Product[] {
  return ALL_PRODUCTS.filter((p) => p.sector === sector);
}

/** Buscar un producto por su slug (id) globalmente */
export function getProductBySlug(slug: string): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.id === slug);
}

/** Buscar un producto por sector + slug */
export function getProductBySectorAndSlug(
  sector: Sector,
  slug: string
): Product | undefined {
  return ALL_PRODUCTS.find((p) => p.sector === sector && p.id === slug);
}
