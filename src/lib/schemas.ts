export const schemaLocalBusiness = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  "@id": "https://www.confeccionesliss.com/#business",
  name: "Confecciones Liss",
  alternateName: ["Confeccion Liss", "Confecciones Liss San Miguel"],
  description:
    "Confección profesional a la medida de scrubs médicos, uniformes universitarios, escolares y corporativos en San Miguel, El Salvador. Bordados, sublimación y personalización. Envíos a todo El Salvador con pago al recibir.",
  url: "https://www.confeccionesliss.com",
  logo: "https://www.confeccionesliss.com/logo.svg",
  image: "https://www.confeccionesliss.com/og.jpg",
  telephone: "+50373317181",
  email: "confeccionesliss.contacto@gmail.com",
  priceRange: "$$",
  currenciesAccepted: "USD",
  paymentAccepted: "Cash, PayPal, Bank Transfer",
  openingHours: ["Mo-Sa 08:00-17:00"],
  hasMap: "https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur",
    addressLocality: "San Miguel",
    addressRegion: "San Miguel",
    addressCountry: "SV",
    postalCode: "3100",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 13.4833,
    longitude: -88.1833,
  },
  areaServed: [
    { "@type": "Country", name: "El Salvador" },
    { "@type": "State", name: "San Miguel" },
    { "@type": "State", name: "Usulután" },
    { "@type": "State", name: "La Unión" },
    { "@type": "State", name: "Morazán" },
    { "@type": "City", name: "San Miguel" },
    { "@type": "City", name: "San Salvador" },
    { "@type": "City", name: "Santa Ana" },
    { "@type": "City", name: "Usulután" },
  ],
  sameAs: [
    "https://www.facebook.com/confeccionliss/",
    "https://www.instagram.com/confeccionliss/",
    "https://www.tiktok.com/@confeccionessliss",
    "https://twitter.com/confeccion_liss",
    "https://www.youtube.com/@confeccionliss",
    "https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7",
  ],
  offers: {
    "@type": "Offer",
    priceCurrency: "USD",
    price: "35.00",
    priceSpecification: {
      "@type": "PriceSpecification",
      minPrice: "35.00",
      priceCurrency: "USD",
    },
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Confección",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Scrubs médicos a la medida en tela Sincatex",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Uniformes universitarios para UNIVO, UNAB, UGB, UMA, IEPROES, UEES",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Uniformes escolares para colegios y escuelas",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Uniformes corporativos con bordado de logo",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ropa deportiva personalizada",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bordados sobre cualquier prenda",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sublimación y personalización de prendas",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ropa para damas, caballeros y niños",
        },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Crop tops a la medida" },
      },
    ],
  },
};

export const schemaFAQ = {
  "@context": "https://schema.org",
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
        text: "Sí, en Confecciones Liss confeccionamos uniformes oficiales para estudiantes de la Universidad de Oriente (UNIVO), así como para UNAB, UGB, UMA, IEPROES y UEES. Trabajamos a la medida con las especificaciones de cada carrera.",
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
