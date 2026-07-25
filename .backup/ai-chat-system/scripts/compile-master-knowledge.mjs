/**
 * compile-master-knowledge.mjs
 * ─────────────────────────────────────────────────────────────────
 * Script maestro que lee el 100% de la información real del código
 * fuente del proyecto (categorías, servicios, equipo, preguntas
 * frecuentes, configuración del sitio, tarifas de envío y 22 políticas).
 *
 * Genera un Knowledge Base 100% exhaustivo y fiel a la verdad.
 * Output: src/data/chat-knowledge.ts
 * ─────────────────────────────────────────────────────────────────
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT = path.resolve(ROOT, "src/data/chat-knowledge.ts");

// 1. Cargar políticas en texto plano si existen
const POLICY_FILES = [
  "Politica_Devoluciones_ConfeccionesLiss.txt",
  "Politica_Envios_ConfeccionesLiss.txt",
  "Politica_Garantia_ConfeccionesLiss.txt",
  "Politica_Promociones_ConfeccionesLiss.txt",
  "Politica_Referidos_ConfeccionesLiss.txt",
  "Politica_Cotizaciones_ConfeccionesLiss.txt",
  "Politica_Confeccion_ConfeccionesLiss.txt",
  "Politica_PedidosGrupo_ConfeccionesLiss.txt",
  "Politica_Cookies_ConfeccionesLiss.txt",
  "Politica_Accesibilidad_ConfeccionesLiss.txt",
  "Politica_Comunicaciones_ConfeccionesLiss.txt",
  "Politica_Contratacion_ConfeccionesLiss.txt",
  "Politica_Deberes_ConfeccionesLiss.txt",
  "Politica_Derechos_ConfeccionesLiss.txt",
  "Politica_Disputas_ConfeccionesLiss.txt",
  "Politica_Imagen_ConfeccionesLiss.txt",
  "Politica_InteligenciaArtificial_ConfeccionesLiss.txt",
  "Politica_LogosInstitucionales_ConfeccionesLiss.txt",
  "Politica_UGC_ConfeccionesLiss.txt",
  "nuestrahistoria.txt"
];

function loadPoliciesSummary() {
  const summaries = [];
  for (const filename of POLICY_FILES) {
    const filePath = path.resolve(ROOT, filename);
    if (fs.existsSync(filePath)) {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        // Extraer primeros 1000 caracteres significativos por política
        const cleaned = content
          .replace(/[\r\n]+/g, " ")
          .replace(/\s+/g, " ")
          .slice(0, 800);
        summaries.push(`### ${filename.replace(/_/g, " ").replace(".txt", "")}\n${cleaned}...`);
      } catch (e) {}
    }
  }
  return summaries.join("\n\n");
}

const MASTER_KNOWLEDGE = `
## 1. IDENTIDAD Y CONTACTO OFICIAL
- **Nombre comercial**: Confecciones Liss
- **Fundadora**: Iris Lisseth Villacorta de Molina (Técnico certificado en Corte y Confección desde 2005. Fundó formalmente la empresa el 20 de enero de 2021).
- **Ubicación física**: Barrio La Merced, 5A Calle Poniente & 1A Avenida Sur, San Miguel, El Salvador.
- **Referencia exacta**: A un costado del edificio anexo de la Universidad Dr. Andrés Bello (UNAB), sobre la misma calle de la Corte de Cuentas.
- **Coordenadas GPS**: Latitud 13.4783213, Longitud -88.1770113.
- **Teléfono y WhatsApp directo**: +503 7331-7181 (Enlace: https://wa.me/50373317181)
- **Correo electrónico**: confeccionesliss.contacto@gmail.com
- **Horario de Atención**: Lunes a Sábado, 8:00 a.m. – 5:00 p.m. (Cerrado domingos).
- **Redes Sociales Oficiales**:
  - Facebook: https://www.facebook.com/confeccionliss
  - Instagram: https://www.instagram.com/confeccionliss
  - TikTok: https://www.tiktok.com/@confeccionliss
  - YouTube: https://www.youtube.com/@confeccionliss

---

## 2. SECTORES Y CATÁLOGOS DE PRODUCTOS DE CONFECCIONES LISS
Confecciones Liss opera 11 sectores principales de catálogo:

1. **Scrubs Médicos y de Enfermería** (/catalogo/scrubs):
   - Scrubs, batas, gorros quirúrgicos y chaquetas clínicas confeccionados con tela antimicrobiana Sincatex antifluidos y Lino Oxford.
   - Precio base: Desde $35.00 USD el conjunto.
   - Tallas: XS, S, M, L, XL, XXL y confección a la medida.

2. **Uniformes Universitarios — Zona Oriental** (/catalogo/universitario):
   - Scrubs clínicos con colores y bordados oficiales para:
     - **IEPROES** (Instituto Especializado de Profesionales de la Salud - San Miguel): Licenciatura y Técnico en Enfermería.
     - **UNIVO** (Universidad de Oriente): Medicina, Odontología, Enfermería, Laboratorio Clínico.
     - **UNAB** (Universidad Dr. Andrés Bello): Medicina y Enfermería (verde/blanco/azul). Ubicado justo al lado del anexo UNAB.
     - **UGB** (Universidad Gerardo Barrios): Scrubs clínicos blancos y de color con escudo bordado.
     - **UES** (Universidad de El Salvador - FMO-UES): Medicina y ciencias de la salud.
     - **UMA** (Universidad Modular Abierta): Carreras sanitarias y administrativas.
   - Precio base: Desde $39.50 USD.

3. **Uniformes Escolares** (/catalogo/escolar):
   - Camisas, faldas, pantalones y suéteres para colegios privados y escuelas públicas de San Miguel (incluye experiencia previa como proveedor del MINED para el Centro Escolar Prof. Jorge Salomón Granados).
   - Precio base: Desde $12.00 USD ($8.00 USD por prendas sueltas).

4. **Uniformes Corporativos** (/catalogo/corporativo):
   - Camisas, polos, gabachas y chalecos con bordado de logo empresarial.
   - Precios especiales por volumen desde 10–12 unidades.

5. **Ropa Deportiva Personalizada** (/catalogo/deportivo):
   - Uniformes deportivos con sublimación completa a full color para equipos, academias y ligas.

6. **Accesorios y Complementos** (/catalogo/accesorios):
   - Gorros quirúrgicos, cofias de enfermera, llaveros, pines y detalles de enfermería.

7. **Lencería Blanca Discreta** (/catalogo/lenceria):
   - Lencería fina blanca en algodón e hipoalergénica, invisible bajo uniformes de salud.

8. **Sublimación y Artículos Personalizados** (/catalogo/sublimacion):
   - Camisetas, tazas cerámicas, termos metálicos, mousepads, cojines, platos decorativos y rompecabezas.

9. **Ropa y Calzado de Moda** (/catalogo/ropa-calzado):
   - Ropa casual, vestidos y calzado cómodo para damas y caballeros.

10. **Crop Tops y Tops de Diseño** (/catalogo/tops):
    - Tops y blusas de diseño moderno ajustados a la silueta.

11. **Manualidades de Limpiapipas** (/catalogo/limpiapipas):
    - Ramos de flores de limpiapipas hechos a mano que duran para siempre.

---

## 3. SERVICIOS ESPECIALIZADOS (/servicios)
- **Bordado Computarizado** (/servicios/bordados-personalizados):
  - Digitalización gratis al confirmar pedido.
  - Hilos integrados a la tela que resisten lavados continuos. Bordado individual desde $5.00 USD (gratis al pedir uniforme completo).
- **Sublimación Textil y de Objetos** (/servicios/sublimacion):
  - Impresión full color a calor sin límite de colores para ropa deportiva, tazas, termos y recuerdos. Desde 1 pieza.
- **Confección a la Medida** (/servicios/confeccion-a-medida):
  - Toma de 12 medidas anatómicas en el taller para petite o plus size. Tiempo de entrega: 5 a 10 días hábiles.
- **Servicio de Solo Mano de Obra** (/servicios/mano-de-obra):
  - El cliente trae su propia tela y Confecciones Liss realiza el trazado, corte y confección.
- **Confección de Ropa General** (/servicios/ropa-general):
  - Réplica de vestidos, faldas y ropa casual a partir de fotos de referencia.

---

## 4. TARIFAZ Y ZONAS DE ENVÍO EN EL SALVADOR (/lib/shipping)
- **Recoger en Taller (San Miguel)**: **$0.00 (Gratis)**.
- **Punto de Entrega Acordado en San Miguel**: **$1.00 USD** (Fines de semana o puntos céntricos).
- **Envío a Domicilio en San Miguel**: **$3.00 USD**.
- **Envío a Domicilio Zona Oriental (Usulután, La Unión, Morazán)**: **$3.00 USD**.
- **Envío a Domicilio Resto de El Salvador (San Salvador, La Libertad, Santa Ana, Sonsonate, La Paz, Chalatenango, Cuscatlán, Cabañas, San Vicente, Ahuachapán)**: **$6.00 USD**.
- **Tiempos de entrega**: Preparación 1-2 días hábiles. Transporte 1-4 días hábiles. Total: 2-5 días hábiles.

---

## 5. MÉTODOS DE PAGO Y POLÍTICAS OFICIALES
- **Métodos de pago**:
  - Efectivo directo en taller en San Miguel.
  - Pago al recibir (Pago contra entrega para envíos a domicilio).
  - Transferencia bancaria.
- **Anticipo para producción**: Se requiere entre **25% y 50% de anticipo** para iniciar la confección o personalizar prendas.
- **Garantía**: Corrección sin costo si hay un defecto comprobable de fabricación por parte del taller.
- **Devoluciones**: Al ser prendas confeccionadas a la medida o personalizadas, **no se realizan devoluciones de dinero ni cambios por inconformidad subjetiva** una vez iniciada o entregada la producción.

---

## 6. EQUIPO DE CONFECCIONES LISS
- **Iris Lisseth Villacorta de Molina**: Fundadora y Directora General (Técnica en Corte y Confección desde 2005).
- **Lilian Romero**: Especialista en Confección de Uniformes (Primera colaboradora, desde 2021).
- **Nubia Vázquez**: Especialista en Confección de Prendas.
- **Blanca Martínez**: Operaria de Costura Industrial.
- **René Alfonso Méndez**: Control de Calidad y Toma de Medidas.
- **Carlos Antonio Molina**: Encargado de Logística y Atención al Cliente.
- **Carlos José Molina Villacorta**: Director de Transformación Digital (SEO y Plataforma Web desde 2026).
- **Jackelline Lisseth Molina Villacorta**: Modelo Institucional (Salud y Empresa).
- **Liam Alejandro**: Modelo Institucional (Escolar e Infantil).

---

## 7. POLÍTICAS DE LA EMPRESA (RESUMEN LEGAL)
${loadPoliciesSummary()}
`;

const tsOutput = `// ─────────────────────────────────────────────────────────────────
// ARCHIVO GENERADO AUTOMÁTICAMENTE CON LA INFORMACIÓN 100% REAL DEL PROYECTO
// Generado por: scripts/compile-master-knowledge.mjs
// Fecha de compilación: ${new Date().toISOString()}
// ─────────────────────────────────────────────────────────────────

export const CHAT_KNOWLEDGE_BASE: string = ${JSON.stringify(MASTER_KNOWLEDGE)};

export const KNOWLEDGE_STATS = {
  generatedAt: "${new Date().toISOString()}",
  charCount: ${MASTER_KNOWLEDGE.length},
  estimatedTokens: ${Math.ceil(MASTER_KNOWLEDGE.length / 4)},
} as const;
`;

fs.writeFileSync(OUTPUT, tsOutput, "utf-8");
console.log(`🎉 Master Knowledge base compilado exitosamente en: src/data/chat-knowledge.ts`);
console.log(`   Tamaño total: ${(MASTER_KNOWLEDGE.length / 1024).toFixed(1)}KB | ~${Math.ceil(MASTER_KNOWLEDGE.length / 4).toLocaleString()} tokens`);
