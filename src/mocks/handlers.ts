import { http, HttpResponse } from "msw";

/* ─── Tipos Mock ─── */
interface MockProduct {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAnterior: number | null;
  categoria: string;
  catalogo: string;
  tallas: string[];
  tallasAgotadas: string[];
  colores: string[];
  imagen: null;
  badge: string | null;
  favoritos: number;
  valoracion: number;
  resenas: number;
  sku: string;
  estado: "activo" | "agotado" | "borrador";
  fechaCreacion: string;
}

/* ─── Datos Mock ─── */
const productos: MockProduct[] = [
  {
    id: "1",
    nombre: "Scrub Clásico Azul Marino",
    descripcion:
      "Scrub médico de corte clásico confeccionado en tela antifluidos. Ideal para jornadas extensas.",
    precio: 28.99,
    precioAnterior: 34.99,
    categoria: "Médicos",
    catalogo: "salud",
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    tallasAgotadas: ["2XL"],
    colores: ["#143067", "#1a5c3a", "#ffffff"],
    imagen: null,
    badge: "Oferta",
    favoritos: 42,
    valoracion: 4.8,
    resenas: 15,
    sku: "SCR-CLA-001",
    estado: "activo",
    fechaCreacion: "2026-01-15",
  },
  {
    id: "2",
    nombre: "Scrub Enfermería Rosa Palo",
    descripcion:
      "Diseño femenino con bolsillos funcionales y tela stretch para máxima comodidad.",
    precio: 32.5,
    precioAnterior: null,
    categoria: "Enfermería",
    catalogo: "salud",
    tallas: ["XS", "S", "M", "L", "XL"],
    tallasAgotadas: [],
    colores: ["#d4a0a0", "#ffffff", "#143067"],
    imagen: null,
    badge: "Nuevo",
    favoritos: 38,
    valoracion: 4.9,
    resenas: 8,
    sku: "SCR-ENF-002",
    estado: "activo",
    fechaCreacion: "2026-02-01",
  },
  {
    id: "3",
    nombre: "Filipina Odontología UGB",
    descripcion:
      "Filipina oficial para estudiantes de Odontología de la Universidad Gerardo Barrios.",
    precio: 25.0,
    precioAnterior: null,
    categoria: "Odontología",
    catalogo: "universidades",
    tallas: ["S", "M", "L", "XL"],
    tallasAgotadas: [],
    colores: ["#ffffff", "#143067"],
    imagen: null,
    badge: "UGB",
    favoritos: 65,
    valoracion: 4.7,
    resenas: 22,
    sku: "FIL-ODO-003",
    estado: "activo",
    fechaCreacion: "2026-01-20",
  },
  {
    id: "4",
    nombre: "Conjunto Quirúrgico Verde",
    descripcion:
      "Conjunto de pantalón y camisa quirúrgica en verde quirófano con ajuste elástico.",
    precio: 45.0,
    precioAnterior: 52.0,
    categoria: "Médicos",
    catalogo: "salud",
    tallas: ["S", "M", "L", "XL", "2XL"],
    tallasAgotadas: ["XS"],
    colores: ["#1a5c3a", "#2d8a5e"],
    imagen: null,
    badge: null,
    favoritos: 29,
    valoracion: 4.6,
    resenas: 11,
    sku: "CON-QUI-004",
    estado: "activo",
    fechaCreacion: "2026-02-10",
  },
  {
    id: "5",
    nombre: "Camisa Escolar Blanca",
    descripcion:
      "Camisa escolar de manga corta/larga confeccionada en tela Oxford de alta durabilidad.",
    precio: 12.5,
    precioAnterior: null,
    categoria: "Camisas",
    catalogo: "escuelas",
    tallas: ["6", "8", "10", "12", "14", "16"],
    tallasAgotadas: [],
    colores: ["#ffffff"],
    imagen: null,
    badge: null,
    favoritos: 18,
    valoracion: 4.5,
    resenas: 30,
    sku: "CAM-ESC-005",
    estado: "activo",
    fechaCreacion: "2026-01-05",
  },
  {
    id: "6",
    nombre: "Polo Corporativo Logo Bordado",
    descripcion:
      "Polo empresarial con opción de bordado de logo institucional. Tela piqué premium.",
    precio: 18.99,
    precioAnterior: null,
    categoria: "Polos",
    catalogo: "empresas",
    tallas: ["S", "M", "L", "XL", "2XL", "3XL"],
    tallasAgotadas: [],
    colores: ["#143067", "#000000", "#ffffff", "#8b0000"],
    imagen: null,
    badge: "Logo bordado disponible",
    favoritos: 55,
    valoracion: 4.8,
    resenas: 19,
    sku: "POL-COR-006",
    estado: "activo",
    fechaCreacion: "2026-03-01",
  },
  {
    id: "7",
    nombre: "Scrub Fisioterapia Teal",
    descripcion:
      "Scrub especializado para fisioterapeutas con tejido elástico de alta movilidad.",
    precio: 30.0,
    precioAnterior: null,
    categoria: "Fisioterapia",
    catalogo: "salud",
    tallas: ["XS", "S", "M", "L", "XL"],
    tallasAgotadas: [],
    colores: ["#008080", "#143067"],
    imagen: null,
    badge: null,
    favoritos: 21,
    valoracion: 4.4,
    resenas: 6,
    sku: "SCR-FIS-007",
    estado: "activo",
    fechaCreacion: "2026-03-12",
  },
  {
    id: "8",
    nombre: "Bata Laboratorio Clínico",
    descripcion:
      "Bata blanca de laboratorio clínico con cierre frontal y bolsillos amplios.",
    precio: 22.0,
    precioAnterior: 26.0,
    categoria: "Lab. Clínico",
    catalogo: "salud",
    tallas: ["S", "M", "L", "XL"],
    tallasAgotadas: ["XS"],
    colores: ["#ffffff"],
    imagen: null,
    badge: "Oferta",
    favoritos: 33,
    valoracion: 4.7,
    resenas: 14,
    sku: "BAT-LAB-008",
    estado: "activo",
    fechaCreacion: "2026-02-20",
  },
  {
    id: "9",
    nombre: "Uniforme Medicina UES-FMO",
    descripcion:
      "Uniforme completo para estudiantes de Medicina de la Universidad de El Salvador - FMO.",
    precio: 35.0,
    precioAnterior: null,
    categoria: "Medicina",
    catalogo: "universidades",
    tallas: ["S", "M", "L", "XL"],
    tallasAgotadas: [],
    colores: ["#143067", "#ffffff"],
    imagen: null,
    badge: "UES",
    favoritos: 72,
    valoracion: 4.9,
    resenas: 28,
    sku: "UNI-MED-009",
    estado: "activo",
    fechaCreacion: "2026-01-10",
  },
  {
    id: "10",
    nombre: "Pantalón Escolar Azul Navy",
    descripcion:
      "Pantalón escolar de tela gabardina resistente con pretina ajustable.",
    precio: 14.0,
    precioAnterior: null,
    categoria: "Pantalones",
    catalogo: "escuelas",
    tallas: ["6", "8", "10", "12", "14", "16"],
    tallasAgotadas: [],
    colores: ["#143067", "#000000"],
    imagen: null,
    badge: null,
    favoritos: 15,
    valoracion: 4.3,
    resenas: 25,
    sku: "PAN-ESC-010",
    estado: "activo",
    fechaCreacion: "2026-01-08",
  },
  {
    id: "11",
    nombre: "Scrub Quirófano Burdeos",
    descripcion:
      "Scrub premium en tono burdeos con detalles contrastantes y tela antifluidos.",
    precio: 36.5,
    precioAnterior: 42.0,
    categoria: "Médicos",
    catalogo: "salud",
    tallas: ["XS", "S", "M", "L", "XL", "2XL"],
    tallasAgotadas: [],
    colores: ["#800020", "#143067"],
    imagen: null,
    badge: "Popular",
    favoritos: 48,
    valoracion: 4.8,
    resenas: 17,
    sku: "SCR-QUI-011",
    estado: "activo",
    fechaCreacion: "2026-03-05",
  },
  {
    id: "12",
    nombre: "Chaqueta Médica Blanca Premium",
    descripcion:
      "Chaqueta médica profesional con cuello mandarín y cierre oculto. Corte slim.",
    precio: 55.0,
    precioAnterior: null,
    categoria: "Médicos",
    catalogo: "salud",
    tallas: ["S", "M", "L", "XL"],
    tallasAgotadas: ["2XL", "3XL"],
    colores: ["#ffffff"],
    imagen: null,
    badge: "Premium",
    favoritos: 61,
    valoracion: 5.0,
    resenas: 9,
    sku: "CHA-MED-012",
    estado: "activo",
    fechaCreacion: "2026-03-15",
  },
];

const pedidos = [
  {
    id: "ORD-2026-001",
    fecha: "2026-04-10",
    estado: "en_confeccion",
    estadoLabel: "En confección",
    items: [
      {
        productoId: "1",
        nombre: "Scrub Clásico Azul Marino",
        talla: "M",
        color: "#143067",
        cantidad: 2,
        precio: 28.99,
      },
      {
        productoId: "3",
        nombre: "Filipina Odontología UGB",
        talla: "L",
        color: "#ffffff",
        cantidad: 1,
        precio: 25.0,
      },
    ],
    subtotal: 82.98,
    envio: 5.0,
    total: 87.98,
    direccion: "Col. Belén, San Miguel, El Salvador",
    metodoEnvio: "Envío a domicilio",
    metodoPago: "PayPal",
  },
  {
    id: "ORD-2026-002",
    fecha: "2026-03-28",
    estado: "entregado",
    estadoLabel: "Entregado",
    items: [
      {
        productoId: "9",
        nombre: "Uniforme Medicina UES-FMO",
        talla: "S",
        color: "#143067",
        cantidad: 1,
        precio: 35.0,
      },
    ],
    subtotal: 35.0,
    envio: 0,
    total: 35.0,
    direccion: "Bo. El Centro, San Miguel",
    metodoEnvio: "Retiro en taller",
    metodoPago: "Contra entrega",
  },
  {
    id: "ORD-2026-003",
    fecha: "2026-04-15",
    estado: "recibido",
    estadoLabel: "Recibido",
    items: [
      {
        productoId: "6",
        nombre: "Polo Corporativo Logo Bordado",
        talla: "L",
        color: "#143067",
        cantidad: 10,
        precio: 18.99,
      },
    ],
    subtotal: 189.9,
    envio: 0,
    total: 189.9,
    direccion: "Zona Industrial, San Miguel",
    metodoEnvio: "Envío a domicilio",
    metodoPago: "Transferencia bancaria",
  },
];

const mensajes = [
  {
    id: "msg-1",
    contacto: "Confecciones Liss",
    avatar: null,
    ultimoMensaje: "¡Hola! Tu pedido ORD-2026-001 ya está en confección.",
    fecha: "2026-04-16T10:30:00",
    noLeido: true,
    tipo: "pedido",
    hilo: [
      {
        id: "h1",
        emisor: "sistema",
        texto: "Tu pedido ORD-2026-001 ha sido recibido.",
        fecha: "2026-04-10T14:00:00",
      },
      {
        id: "h2",
        emisor: "admin",
        texto:
          "¡Hola! Tu pedido ya está en confección. Te avisamos cuando esté listo.",
        fecha: "2026-04-16T10:30:00",
      },
    ],
  },
  {
    id: "msg-2",
    contacto: "Soporte Liss",
    avatar: null,
    ultimoMensaje:
      "Claro, podemos hacer el ajuste de talla sin costo adicional.",
    fecha: "2026-04-14T16:45:00",
    noLeido: false,
    tipo: "soporte",
    hilo: [
      {
        id: "h3",
        emisor: "usuario",
        texto:
          "Hola, ¿es posible hacer un ajuste de talla después de la compra?",
        fecha: "2026-04-14T15:00:00",
      },
      {
        id: "h4",
        emisor: "admin",
        texto: "Claro, podemos hacer el ajuste de talla sin costo adicional.",
        fecha: "2026-04-14T16:45:00",
      },
    ],
  },
];

/* ─── Handlers MSW ─── */
export const handlers = [
  // ── Productos ──
  http.get("/api/productos", ({ request }) => {
    const url = new URL(request.url);
    const catalogo = url.searchParams.get("catalogo");
    const categoria = url.searchParams.get("categoria");

    let filtered = [...productos];
    if (catalogo) filtered = filtered.filter((p) => p.catalogo === catalogo);
    if (categoria) filtered = filtered.filter((p) => p.categoria === categoria);

    return HttpResponse.json({ productos: filtered, total: filtered.length });
  }),

  http.get("/api/productos/:id", ({ params }) => {
    const producto = productos.find((p) => p.id === params.id);
    if (!producto)
      return HttpResponse.json(
        { error: "Producto no encontrado" },
        { status: 404 }
      );
    return HttpResponse.json({ producto });
  }),

  // ── Auth ──
  http.post("/api/auth/login", () => {
    return HttpResponse.json({
      user: {
        id: "1",
        nombre: "María González",
        email: "maria@test.com",
        avatar: null,
        primerLogin: true,
        rol: "estudiante",
        institucion: "UGB",
      },
      token: "mock-jwt-token",
    });
  }),

  http.post("/api/auth/registro", () => {
    return HttpResponse.json({
      success: true,
      message: "Cuenta creada exitosamente",
    });
  }),

  http.post("/api/auth/recuperar", () => {
    return HttpResponse.json({
      success: true,
      message: "Email de recuperación enviado",
    });
  }),

  // ── Pedidos ──
  http.get("/api/pedidos", () => {
    return HttpResponse.json({ pedidos, total: pedidos.length });
  }),

  http.get("/api/pedidos/:id", ({ params }) => {
    const pedido = pedidos.find((p) => p.id === params.id);
    if (!pedido)
      return HttpResponse.json(
        { error: "Pedido no encontrado" },
        { status: 404 }
      );
    return HttpResponse.json({ pedido });
  }),

  // ── Favoritos ──
  http.get("/api/favoritos", () => {
    return HttpResponse.json({
      favoritos: productos
        .slice(0, 4)
        .map((p) => ({ ...p, favoritedAt: "2026-04-10" })),
    });
  }),

  http.post("/api/favoritos/:id", () => {
    return HttpResponse.json({ success: true });
  }),

  http.delete("/api/favoritos/:id", () => {
    return HttpResponse.json({ success: true });
  }),

  // ── Mensajes ──
  http.get("/api/mensajes", () => {
    return HttpResponse.json({ mensajes, total: mensajes.length });
  }),

  http.post("/api/mensajes/:id/responder", () => {
    return HttpResponse.json({ success: true, message: "Mensaje enviado" });
  }),

  // ── Admin: Clientes ──
  http.get("/api/admin/clientes", () => {
    return HttpResponse.json({
      clientes: [
        {
          id: "1",
          nombre: "María González",
          email: "maria@test.com",
          institucion: "UGB",
          rol: "Estudiante",
          pedidos: 3,
          estado: "activo",
          fechaRegistro: "2026-01-15",
        },
        {
          id: "2",
          nombre: "Carlos Ramírez",
          email: "carlos@test.com",
          institucion: "UES-FMO",
          rol: "Docente",
          pedidos: 1,
          estado: "activo",
          fechaRegistro: "2026-02-20",
        },
        {
          id: "3",
          nombre: "Ana López",
          email: "ana@test.com",
          institucion: "Hospital San Juan de Dios",
          rol: "Profesional",
          pedidos: 5,
          estado: "activo",
          fechaRegistro: "2025-11-10",
        },
        {
          id: "4",
          nombre: "Roberto Martínez",
          email: "roberto@test.com",
          institucion: "Empresa ABC",
          rol: "Institución",
          pedidos: 12,
          estado: "activo",
          fechaRegistro: "2025-09-05",
        },
        {
          id: "5",
          nombre: "Lucía Hernández",
          email: "lucia@test.com",
          institucion: "UNIVO",
          rol: "Estudiante",
          pedidos: 0,
          estado: "inactivo",
          fechaRegistro: "2026-03-01",
        },
      ],
      total: 5,
    });
  }),

  // ── Admin: Estadísticas ──
  http.get("/api/admin/stats", () => {
    return HttpResponse.json({
      totalPedidos: 156,
      ingresos: 4520.5,
      clientesActivos: 89,
      productosFavoritos: 342,
    });
  }),
];
