import { siteConfig } from "@/config/site";

/** Helper: generates a WebPage schema for any public page */
export function buildWebPageSchema({
  url,
  name,
  description,
}: {
  url: string;
  name: string;
  description: string;
}) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "es-SV",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  };
}

/** Helper: generates a WebSite schema with Sitelinks SearchBox for Google Search */
export function buildWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "es-SV",
    publisher: { "@id": `${siteConfig.url}/#business` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/catalogo?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/** Helper: generates a BreadcrumbList schema ensuring 100% absolute URLs for Google Search Console */
export function buildBreadcrumbSchema(
  items: Array<{ name: string; item?: string }>
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => {
      let itemUrl: string | undefined = undefined;
      if (crumb.item) {
        itemUrl = crumb.item.startsWith("http")
          ? crumb.item
          : `${siteConfig.url}${crumb.item.startsWith("/") ? "" : "/"}${crumb.item}`;
      }
      return {
        "@type": "ListItem",
        position: i + 1,
        name: crumb.name,
        ...(itemUrl ? { item: itemUrl } : {}),
      };
    }),
  };
}

export const schemaFAQ = {
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "¿Dónde comprar scrubs en San Miguel El Salvador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Confecciones Liss es el taller de scrubs médicos a la medida en San Miguel, ubicado en el Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur, a la par del edificio anexo de la UNAB. Fabricamos scrubs en tela Sincatex y Lino Oxford desde $35. WhatsApp: 7331-7181.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen uniformes para la UNIVO en San Miguel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, en Confecciones Liss confeccionamos uniformes oficiales para estudiantes de la Universidad de Oriente (UNIVO), así como para UNAB, UGB, UMA, IEPROES, UES y más. Trabajamos a la medida con las especificaciones de cada carrera.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen envíos de uniformes a todo El Salvador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Confecciones Liss envía uniformes por tallas a todo El Salvador con pago al recibir. Trabajamos a la medida para clientes que visitan el taller en San Miguel, y por tallas estándar para envíos a San Salvador, Santa Ana, Usulután, La Unión, Morazán y todos los departamentos del país.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto cuestan los scrubs en El Salvador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "En Confecciones Liss los scrubs médicos comienzan desde $35.00 USD. El precio varía según el modelo, tela y personalización. Ofrecemos precios especiales para pedidos grupales e institucionales. Puede pagar en efectivo al recibir o por transferencia bancaria.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen bordados en uniformes médicos en San Miguel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. En Confecciones Liss realizamos bordados de nombre, especialidad y logo institucional sobre cualquier prenda. También trabajamos sublimación para uniformes deportivos y corporativos. Atendemos pedidos individuales y grupales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Dónde están ubicados Confecciones Liss en San Miguel?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Estamos en el Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur, San Miguel, a la par del edificio anexo de la Universidad Dr. Andrés Bello (UNAB), sobre la misma calle de la Corte de Cuentas a unos 50 metros. Horario: lunes a sábado de 8:00 a.m. a 5:00 p.m.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen uniformes para enfermeras en El Salvador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. En Confecciones Liss fabricamos scrubs para enfermeras, doctores, médicos, odontólogos, laboratoristas, fisioterapeutas y todo el personal del sector salud. Usamos tela Sincatex anti-fluidos y Lino Oxford, confeccionamos a la medida para garantizar el ajuste perfecto.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen uniformes escolares en San Miguel El Salvador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí. Confecciones Liss confecciona uniformes escolares para colegios, escuelas e institutos de San Miguel y la zona oriental de El Salvador. Trabajamos con cualquier color y diseño institucional, incluyendo camisas, pantalones, faldas, blusas y sudaderas.",
      },
    },
    {
      "@type": "Question",
      name: "¿Cuánto tiempo tardan en entregar un pedido de uniformes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Los tiempos de entrega varían según el tipo de pedido. Uniformes individuales: 3-7 días hábiles. Pedidos grupales o institucionales: 7-15 días hábiles dependiendo de la cantidad. Para envíos a departamentos de El Salvador, agregue 1-2 días adicionales.",
      },
    },
    {
      "@type": "Question",
      name: "¿Hacen uniformes para hospitales y clínicas en El Salvador?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Sí, atendemos pedidos institucionales para hospitales, clínicas, laboratorios, consultorios dentales y centros médicos de todo El Salvador. Ofrecemos precios especiales por volumen y bordado del logo institucional. Contacte al WhatsApp 7331-7181 para cotizar.",
      },
    },
  ],
};

/** Tarifas de envío oficial según /legal/envios (Política de envío) */
export const SHIPPING_DETAILS_SV = {
  "@type": "OfferShippingDetails",
  name: "Política de envío",
  shippingRate: {
    "@type": "MonetaryAmount",
    value: "6.00",
    currency: "USD",
  },
  shippingDestination: {
    "@type": "DefinedRegion",
    addressCountry: "SV",
  },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 2,
      unitCode: "DAY",
    },
    transitTime: {
      "@type": "QuantitativeValue",
      minValue: 1,
      maxValue: 2,
      unitCode: "DAY",
    },
    cutoffTime: "17:00-08:00",
  },
} as const;

/** Política de devoluciones oficial según /legal/devoluciones */
export const MERCHANT_RETURN_POLICY = {
  "@type": "MerchantReturnPolicy",
  name: "Política de devoluciones",
  merchantReturnLink: "https://www.confeccionesliss.com/legal/devoluciones",
  applicableCountry: "SV",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 15,
  returnMethod: [
    "https://schema.org/ReturnInStore",
    "https://schema.org/ReturnAtKiosk",
    "https://schema.org/ReturnByMail",
  ],
  returnFees: "https://schema.org/ReturnFeesCustomerPaying",
  itemCondition: [
    "https://schema.org/NewCondition",
    "https://schema.org/UsedCondition",
  ],
  restockingFee: {
    "@type": "MonetaryAmount",
    value: "6.00",
    currency: "USD",
  },
  refundType: "https://schema.org/FullRefund",
  refundProcessingTime: {
    "@type": "QuantitativeValue",
    value: 7,
    unitCode: "DAY",
  },
} as const;
