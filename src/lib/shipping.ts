// ──────────────────────────────────────────────────────────────
// ZONAS DE ENVÍO — Confecciones Liss / El Salvador
// ──────────────────────────────────────────────────────────────
// Lógica de cálculo de costos de envío por zona geográfica.
//
// Zonas y precios actualizados:
//   LOCAL    → San Miguel ($3.00 — taller o punto medio)
//   ORIENTAL → Usulután, La Unión, Morazán ($3.00 fijo)
//   NACIONAL → Resto del país ($6.00 fijo)
//
// Tipos de entrega disponibles:
//   taller      → Recoger en el taller (solo LOCAL, $3.00)
//   punto_medio → Punto de entrega acordado en San Miguel (solo LOCAL, $3.00)
//   domicilio   → Envío a domicilio (ORIENTAL y NACIONAL)
// ──────────────────────────────────────────────────────────────

export type ShippingZone = "LOCAL" | "ORIENTAL" | "NACIONAL";

/** Tipo de entrega que el cliente puede seleccionar */
type DeliveryType = "taller" | "punto_medio" | "domicilio";

export interface ShippingInfo {
  department: string;
  municipality: string;
  zone: ShippingZone;
  /** Costo exacto en USD */
  cost: number;
  /** Texto de precio mostrado al usuario */
  label: string;
  /** Descripción del método de entrega */
  method: string;

  // ── Datos del destinatario (llenados en el formulario de entrega) ──
  /** Nombre completo del destinatario */
  recipientName?: string;
  /** Teléfono principal del destinatario */
  recipientPhone?: string;
  /** Teléfono o WhatsApp de contacto alterno */
  alternatePhone?: string;

  // ── Dirección completa ──────────────────────────────────────────────
  /** Colonia o Residencial */
  addressColonia?: string;
  /** Calle o Avenida */
  addressStreet?: string;
  /** Polígono (opcional) */
  addressPolygon?: string;
  /** Número de casa o apartamento */
  addressNumber?: string;
  /** Punto de referencia descriptivo */
  addressReference?: string;

  /** Si el usuario aceptó los términos de envío y devoluciones */
  termsAccepted?: boolean;
  /** Método de entrega seleccionado */
  deliveryMethod?: "taller" | "punto_medio" | "domicilio";
}

/** Labels amigables para mostrar en la UI */
const DELIVERY_TYPE_LABEL: Record<DeliveryType, string> = {
  taller: "Recoger en el taller (San Miguel)",
  punto_medio: "Punto de entrega acordado (San Miguel)",
  domicilio: "Envío a domicilio",
};

/** Tipos de entrega disponibles por zona */
const DELIVERY_TYPES_BY_ZONE: Record<ShippingZone, DeliveryType[]> = {
  LOCAL: ["taller", "punto_medio"],
  ORIENTAL: ["domicilio"],
  NACIONAL: ["domicilio"],
};

// ── Definición de departamentos ───────────────────────────────

interface Department {
  name: string;
  zone: ShippingZone;
  municipalities: string[];
}

/** Costo exacto por zona en USD */
const SHIPPING_ZONE_COST: Record<ShippingZone, number> = {
  LOCAL: 3,
  ORIENTAL: 3,
  NACIONAL: 6,
};

const SHIPPING_ZONE_LABEL: Record<ShippingZone, string> = {
  LOCAL: "$3.00",
  ORIENTAL: "$3.00",
  NACIONAL: "$6.00",
};

const SHIPPING_ZONE_METHOD: Record<ShippingZone, string> = {
  LOCAL: "Entrega en punto acordado — San Miguel",
  ORIENTAL: "Envío a domicilio — Zona Oriental",
  NACIONAL: "Envío a domicilio — Nacional",
};

export const DEPARTMENTS: Department[] = [
  {
    name: "San Miguel",
    zone: "LOCAL",
    municipalities: [
      "San Miguel",
      "Moncagua",
      "San Jorge",
      "Nueva Guadalupe",
      "Ciudad Barrios",
      "Sesori",
      "Chinameca",
      "El Tránsito",
      "Uluazapa",
      "Comacarán",
      "Lolotique",
      "San Luis de la Reina",
      "San Gerardo",
      "Quelepa",
      "Chirilagua",
      "San Rafael Oriente",
      "San Antonio",
      "Carolina",
      "Nuevo Edén de San Juan",
    ],
  },
  {
    name: "Usulután",
    zone: "ORIENTAL",
    municipalities: [
      "Usulután",
      "Santiago de María",
      "Jiquilisco",
      "Berlín",
      "Alegría",
      "Jucuapa",
      "Puerto El Triunfo",
      "Mercedes Umaña",
      "Santa Elena",
      "San Agustín",
      "Nueva Granada",
      "El Triunfo",
      "California",
      "Ereguayquín",
      "Estanzuelas",
      "Ozatlán",
      "Concepción Batres",
      "Tecapán",
      "Jucuarán",
      "San Buenaventura",
      "San Francisco Javier",
    ],
  },
  {
    name: "La Unión",
    zone: "ORIENTAL",
    municipalities: [
      "La Unión",
      "Santa Rosa de Lima",
      "El Carmen",
      "Pasaquina",
      "Anamorós",
      "Conchagua",
      "Intipucá",
      "San Alejo",
      "Bolívar",
      "El Sauce",
      "Lislique",
      "Nueva Esparta",
      "Polorós",
      "San José",
      "Yayantique",
      "Yucuaiquín",
      "Meanguera del Golfo",
    ],
  },
  {
    name: "Morazán",
    zone: "ORIENTAL",
    municipalities: [
      "San Francisco Gotera",
      "Jocoro",
      "Osicala",
      "Cacaopera",
      "Sensembra",
      "Jocoaitique",
      "Perquín",
      "Meanguera",
      "Sociedad",
      "Torola",
      "San Simón",
      "El Divisadero",
      "Corinto",
      "Arambala",
      "Chilanga",
      "Guatajiagua",
      "Gualococti",
      "Joateca",
      "Lolotiquillo",
      "San Carlos",
      "San Fernando",
      "San Isidro",
      "Yamabal",
      "Yoloaiquín",
      "Delicias de Concepción",
    ],
  },
  {
    name: "San Salvador",
    zone: "NACIONAL",
    municipalities: [
      "San Salvador",
      "Soyapango",
      "Mejicanos",
      "Apopa",
      "Ilopango",
      "San Marcos",
      "Cuscatancingo",
      "San Martín",
      "Tonacatepeque",
      "Aguilares",
      "Guazapa",
      "Nejapa",
      "Panchimalco",
      "Rosario de Mora",
      "Santiago Texacuangos",
      "Santo Tomás",
      "El Paisnal",
      "Ayutuxtepeque",
    ],
  },
  {
    name: "La Libertad",
    zone: "NACIONAL",
    municipalities: [
      "Santa Tecla",
      "Antiguo Cuscatlán",
      "Nuevo Cuscatlán",
      "Colón",
      "La Libertad",
      "Quezaltepeque",
      "San José Villanueva",
      "Opico",
      "Zaragoza",
      "Jayaque",
      "Jicalapa",
      "Tamanique",
      "Comasagua",
      "Sacacoyo",
      "San Matías",
      "Talnique",
      "Teotepeque",
      "Tepecoyo",
    ],
  },
  {
    name: "Santa Ana",
    zone: "NACIONAL",
    municipalities: [
      "Santa Ana",
      "Chalchuapa",
      "Metapán",
      "Coatepeque",
      "El Congo",
      "Candelaria de la Frontera",
      "Texistepeque",
      "Santiago de la Frontera",
      "Masahuat",
      "El Porvenir",
      "San Sebastián Salitrillo",
      "Santa Rosa Guachipilín",
      "San Antonio Pajonal",
    ],
  },
  {
    name: "Sonsonate",
    zone: "NACIONAL",
    municipalities: [
      "Sonsonate",
      "Acajutla",
      "Izalco",
      "Juayúa",
      "Nahuizalco",
      "Armenia",
      "Caluco",
      "Cuisnahuat",
      "Nahulingo",
      "Salcoatitán",
      "San Antonio del Monte",
      "San Julián",
      "Santa Catarina Masahuat",
      "Santa Isabel Ishuatán",
      "Santo Domingo de Guzmán",
      "Sonzacate",
    ],
  },
  {
    name: "La Paz",
    zone: "NACIONAL",
    municipalities: [
      "Zacatecoluca",
      "Olocuilta",
      "San Luis La Herradura",
      "San Luis Talpa",
      "San Juan Nonualco",
      "Santiago Nonualco",
      "Cuyultitán",
      "El Rosario",
      "Jerusalén",
      "Mercedes La Ceiba",
      "Paraíso de Osorio",
      "San Antonio Masahuat",
      "San emigdio",
      "San Francisco Chinameca",
      "San Juan Tepezontes",
      "San Miguel Tepezontes",
      "San Pedro Masahuat",
      "San Pedro Nonualco",
      "Santa María Ostuma",
      "Tapalhuaca",
    ],
  },
  {
    name: "Chalatenango",
    zone: "NACIONAL",
    municipalities: [
      "Chalatenango",
      "La Palma",
      "San Ignacio",
      "Agua Caliente",
      "Arcatao",
      "Azacualpa",
      "Citalá",
      "Comalapa",
      "Concepción Quezaltepeque",
      "Dulce Nombre de María",
      "El Carrizal",
      "El Paraíso",
      "La Laguna",
      "La Reina",
      "Las Vueltas",
      "Nombre de Jesús",
      "Nueva Concepción",
      "Nueva Trinidad",
      "Ojos de Agua",
      "Potonico",
      "San Antonio Los Ranchos",
      "San Fernando",
      "San Francisco Lempa",
      "San Francisco Morazán",
      "San Isidro Labrador",
      "San Luis del Carmen",
      "San Miguel de Mercedes",
      "San Rafael",
      "Santa Rita",
      "Tejutla",
    ],
  },
  {
    name: "Cuscatlán",
    zone: "NACIONAL",
    municipalities: [
      "Cojutepeque",
      "Suchitoto",
      "San Pedro Perulapán",
      "El Carmen",
      "Monte San Juan",
      "Oratorio de Concepción",
      "San Bartolomé Perulapía",
      "San Cristóbal",
      "San José Guayabal",
      "San Ramón",
      "Santa Cruz Analquito",
      "Santa Cruz Michapa",
      "Tejutepeque",
    ],
  },
  {
    name: "Cabañas",
    zone: "NACIONAL",
    municipalities: [
      "Sensuntepeque",
      "Ilobasco",
      "San Isidro",
      "Cinquera",
      "Dolores",
      "Guacotecti",
      "Jutiapa",
      "San José Las Flores",
      "Tejutepeque",
      "Victoria",
    ],
  },
  {
    name: "San Vicente",
    zone: "NACIONAL",
    municipalities: [
      "San Vicente",
      "Apastepeque",
      "Guadalupe",
      "San Cayetano Istepeque",
      "San Esteban Catarina",
      "San Ildefonso",
      "San Lorenzo",
      "San Sebastián",
      "Santa Clara",
      "Santo Domingo",
      "Tecoluca",
      "Tepetitán",
      "Verapaz",
    ],
  },
  {
    name: "Ahuachapán",
    zone: "NACIONAL",
    municipalities: [
      "Ahuachapán",
      "Atiquizaya",
      "Concepción de Ataco",
      "Apaneca",
      "El Refugio",
      "Guaymango",
      "Jujutla",
      "San Francisco Menéndez",
      "San Lorenzo",
      "San Pedro Puxtla",
      "Tacuba",
      "Turín",
    ],
  },
];

/**
 * Obtiene la información de envío dado un departamento, municipio y método de entrega.
 */
export function getShippingInfo(
  department: string,
  municipality: string,
  deliveryMethod: "taller" | "punto_medio" | "domicilio" = "domicilio"
): ShippingInfo {
  const dept = DEPARTMENTS.find((d) => d.name === department);
  const zone: ShippingZone = dept?.zone ?? "NACIONAL";

  let cost = 6;
  let label = "$6.00";
  let method = "Envío a domicilio";

  if (department === "San Miguel") {
    if (deliveryMethod === "taller") {
      cost = 0;
      label = "Gratis";
      method = "Recoger en el taller (San Miguel)";
    } else if (deliveryMethod === "punto_medio") {
      cost = 1;
      label = "$1.00";
      method =
        "Punto de entrega en San Miguel (Fines de semana, centros comerciales/lugares céntricos a acordar)";
    } else {
      cost = 3;
      label = "$3.00";
      method = "Envío a domicilio en San Miguel";
    }
  } else {
    cost = 6;
    label = "$6.00";
    method = `Envío a domicilio a ${department}`;
  }

  return {
    department,
    municipality,
    zone,
    cost,
    label,
    method,
    deliveryMethod,
  };
}
