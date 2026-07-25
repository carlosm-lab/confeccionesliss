/**
 * compile-knowledge.mjs
 * ─────────────────────────────────────────────────────────────────
 * Lee todos los archivos de contenido del repositorio (políticas,
 * historia, ayuda, etc.) y los compila en un único string optimizado
 * que se inyecta como system prompt al agente de IA Lucas.
 *
 * Output: src/data/chat-knowledge.ts
 * Ejecutar: npm run compile-knowledge
 * ─────────────────────────────────────────────────────────────────
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.resolve(ROOT, "src/data/chat-knowledge.ts");

// Archivos a incluir, en orden de prioridad
const FILES = [
  // Empresa e historia
  { file: "nuestrahistoria.txt", label: "Historia de la empresa" },
  { file: "Contenido-Pagina-Ayuda-ConfeccionesLiss.txt", label: "Página de Ayuda y Preguntas Frecuentes" },
  { file: "Politica_Devoluciones_ConfeccionesLiss.txt", label: "Política de Devoluciones" },
  { file: "Politica_Envios_ConfeccionesLiss.txt", label: "Política de Envíos" },
  { file: "Politica_Garantia_ConfeccionesLiss.txt", label: "Política de Garantía" },
  { file: "Politica_Promociones_ConfeccionesLiss.txt", label: "Política de Promociones" },
  { file: "Politica_Cotizaciones_ConfeccionesLiss.txt", label: "Política de Cotizaciones" },
  { file: "Politica_Confeccion_ConfeccionesLiss.txt", label: "Política de Confección" },
];

// Límite óptimo para el Tier Gratuito de Groq (12,000 TPM max)
// ~12,000 caracteres ≈ ~3,000 tokens
const MAX_CHARS = 12_000;

function cleanText(text) {
  return text
    .replace(/[ \t]{3,}/g, "  ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[\r\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "")
    .trim();
}

function truncateSection(content, maxChars) {
  if (content.length <= maxChars) return content;
  const truncated = content.slice(0, maxChars);
  const lastNewline = truncated.lastIndexOf("\n\n");
  return lastNewline > maxChars * 0.7
    ? truncated.slice(0, lastNewline) + "\n\n[Contenido resumido]"
    : truncated + "\n\n[Contenido resumido]";
}

function buildKnowledge() {
  const sections = [];
  let totalChars = 0;
  const charsPerSection = Math.floor(MAX_CHARS / FILES.length);

  for (const { file, label } of FILES) {
    const filePath = path.resolve(ROOT, file);

    if (!fs.existsSync(filePath)) {
      continue;
    }

    try {
      const raw = fs.readFileSync(filePath, "utf-8");
      const cleaned = cleanText(raw);
      const section = truncateSection(cleaned, charsPerSection);

      sections.push(`## ${label}\n\n${section}`);
      totalChars += section.length;
    } catch (err) {
      console.error(`❌ Error leyendo ${file}:`, err.message);
    }
  }

  return sections.join("\n\n---\n\n");
}

const knowledgeContent = buildKnowledge();

const BUSINESS_STATIC = `## Información General de Confecciones Liss

**Nombre oficial**: Confecciones Liss  
**Tipo de negocio**: Taller de confección a la medida  
**Ubicación**: Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur, San Miguel, El Salvador  
**Teléfono**: +503 7331-7181  
**Email**: confeccionesliss.contacto@gmail.com  
**WhatsApp**: https://wa.me/50373317181  
**Horario**: Lunes a Sábado, 8:00 AM – 5:00 PM  
**Precio base**: Desde $35.00 USD  
**Moneda**: Dólares americanos (USD)  
**Métodos de pago**: Efectivo, Transferencia bancaria  

**Redes sociales**:
- Facebook: https://www.facebook.com/confeccionliss
- Instagram: https://www.instagram.com/confeccionliss
- TikTok: https://www.tiktok.com/@confeccionliss
- YouTube: https://www.youtube.com/@confeccionliss

**Especialidades**:
- Scrubs médicos a la medida en tela Sincatex
- Uniformes universitarios para: IEPROES, UNIVO, UNAB, UGB, UES, UMA y más instituciones
- Uniformes escolares para colegios y escuelas
- Uniformes corporativos con bordado de logo
- Bordados y sublimación en cualquier prenda

**Área de cobertura**: El Salvador — especialmente San Miguel, Usulután, La Unión, Morazán  

**Sitio web**: https://www.confeccionesliss.com

## Páginas del sitio web
- **Inicio** (/): Presentación general, productos destacados, reseñas
- **Catálogo** (/catalogo): Todos los productos disponibles con precios y tallas
- **Servicios** (/servicios): Descripción de los servicios de confección
- **Empresa** (/empresa): Historia y valores de Confecciones Liss
- **Ayuda** (/ayuda): Preguntas frecuentes y guías
- **Contacto** (/contacto): Formulario y datos de contacto
- **Cuenta** (/cuenta): Perfil del usuario, favoritos, historial
- **Legal** (/legal): Términos, condiciones y políticas
- **Actualizaciones** (/updates): Novedades y anuncios
`;

const fullKnowledge = BUSINESS_STATIC + "\n\n---\n\n" + knowledgeContent;

const tsOutput = `// ─────────────────────────────────────────────────────────────────
// ARCHIVO GENERADO AUTOMÁTICAMENTE — NO EDITAR MANUALMENTE
// Generado por: scripts/compile-knowledge.mjs
// Última compilación: ${new Date().toISOString()}
// ─────────────────────────────────────────────────────────────────

export const CHAT_KNOWLEDGE_BASE: string = ${JSON.stringify(fullKnowledge)};

export const KNOWLEDGE_STATS = {
  generatedAt: "${new Date().toISOString()}",
  charCount: ${fullKnowledge.length},
  estimatedTokens: ${Math.ceil(fullKnowledge.length / 4)},
} as const;
`;

const outputDir = path.dirname(OUTPUT);
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(OUTPUT, tsOutput, "utf-8");
console.log(`🎉 Knowledge base escrito en: src/data/chat-knowledge.ts`);
console.log(
  `   Tamaño total: ${(fullKnowledge.length / 1024).toFixed(1)}KB | ~${Math.ceil(fullKnowledge.length / 4).toLocaleString()} tokens estimados`
);
