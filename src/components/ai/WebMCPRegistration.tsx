"use client";

import { useEffect } from "react";

/**
 * Herramientas de WebMCP (Web Model Context Protocol) registradas para Confecciones Liss.
 * Permiten a los agentes de IA (Chrome AI, PageSpeed Insights, LLMs de navegación web)
 * descubrir y ejecutar acciones estructuradas sobre la plataforma.
 */
const WEBMCP_TOOLS_SCHEMA = [
  {
    name: "search_catalog",
    description:
      "Busca prendas y uniformes en el catálogo de Confecciones Liss por palabra clave, sector o universidad.",
    parameters: {
      type: "object",
      properties: {
        query: {
          type: "string",
          description:
            "Término de búsqueda (ej: 'scrub azul', 'gabacha univo', 'polo corporativa').",
        },
        sector: {
          type: "string",
          enum: [
            "medico",
            "universidades",
            "corporativo",
            "industrial",
            "escolar",
          ],
          description: "Sector o categoría principal de la prenda.",
        },
        universidad: {
          type: "string",
          enum: ["univo", "ieproes", "ugb", "ues", "unab"],
          description:
            "Slug de la universidad (requerido si el sector es 'universidades').",
        },
      },
      required: ["query"],
    },
  },
  {
    name: "request_quote",
    description:
      "Envía una solicitud formal de cotización para confección de uniformes o scrubs a la medida.",
    parameters: {
      type: "object",
      properties: {
        nombre: {
          type: "string",
          description: "Nombre completo del solicitante o contacto principal.",
        },
        email: {
          type: "string",
          format: "email",
          description: "Correo electrónico para recibir la cotización.",
        },
        telefono: {
          type: "string",
          description: "Número telefónico o WhatsApp de contacto.",
        },
        empresa_o_institucion: {
          type: "string",
          description: "Nombre de la clínica, empresa, hospital o universidad.",
        },
        tipo_prenda: {
          type: "string",
          description:
            "Tipo de prenda requerida (ej: 'Scrub Médico Sincatex', 'Polo Corporativa').",
        },
        cantidad: {
          type: "integer",
          minimum: 1,
          description: "Cantidad total de prendas requeridas.",
        },
        detalles: {
          type: "string",
          description:
            "Especificaciones adicionales (tallas, colores, tipo de bordado).",
        },
      },
      required: ["nombre", "email", "telefono", "tipo_prenda", "cantidad"],
    },
  },
  {
    name: "contact_support",
    description:
      "Envía una consulta directa de soporte o información general a Confecciones Liss.",
    parameters: {
      type: "object",
      properties: {
        nombre: {
          type: "string",
          description: "Nombre del remitente.",
        },
        email: {
          type: "string",
          format: "email",
          description: "Correo electrónico del remitente.",
        },
        mensaje: {
          type: "string",
          description: "Mensaje o consulta detallada.",
        },
      },
      required: ["nombre", "email", "mensaje"],
    },
  },
  {
    name: "get_university_uniforms",
    description:
      "Obtiene los uniformes y scrubs autorizados por universidad en El Salvador.",
    parameters: {
      type: "object",
      properties: {
        universidad: {
          type: "string",
          enum: ["univo", "ieproes", "ugb", "ues", "unab"],
          description:
            "Identificador de la universidad (univo, ieproes, ugb, ues, unab).",
        },
      },
      required: ["universidad"],
    },
  },
  {
    name: "calculate_size_recommendation",
    description:
      "Calcula la talla de uniformes recomendada (XS, S, M, L, XL, XXL) basada en medidas corporales en centímetros.",
    parameters: {
      type: "object",
      properties: {
        bust_chest_cm: {
          type: "number",
          description: "Medida de tórax o busto en centímetros.",
        },
        waist_cm: {
          type: "number",
          description: "Medida de cintura en centímetros.",
        },
        hip_cm: {
          type: "number",
          description: "Medida de cadera en centímetros.",
        },
      },
      required: ["bust_chest_cm", "waist_cm"],
    },
  },
];

export function WebMCPRegistration() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Registrar herramientas en el objeto global del navegador para agentes de IA / WebMCP
    const win = window as unknown as {
      webmcp?: {
        registerTool?: (tool: (typeof WEBMCP_TOOLS_SCHEMA)[number]) => void;
        tools?: (typeof WEBMCP_TOOLS_SCHEMA)[number][];
      };
      __WEBMCP_TOOLS__?: typeof WEBMCP_TOOLS_SCHEMA;
    };

    win.__WEBMCP_TOOLS__ = WEBMCP_TOOLS_SCHEMA;

    if (!win.webmcp) {
      win.webmcp = {
        tools: WEBMCP_TOOLS_SCHEMA,
      };
    } else if (Array.isArray(win.webmcp.tools)) {
      win.webmcp.tools = WEBMCP_TOOLS_SCHEMA;
    }

    if (win.webmcp && typeof win.webmcp.registerTool === "function") {
      WEBMCP_TOOLS_SCHEMA.forEach((tool) => {
        try {
          win.webmcp?.registerTool?.(tool);
        } catch {
          // Ignorar fallos de reinicialización en hot reload
        }
      });
    }
  }, []);

  return (
    <>
      <script
        type="application/webmcp+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            $schema: "https://json-schema.org/draft/2020-12/schema",
            title: "ConfeccionesLissWebMCPTools",
            description:
              "Esquemas y herramientas de interacción de IA para Confecciones Liss",
            tools: WEBMCP_TOOLS_SCHEMA,
          }),
        }}
      />
      <script
        type="application/json"
        id="webmcp-tools-registry"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(WEBMCP_TOOLS_SCHEMA),
        }}
      />
    </>
  );
}
