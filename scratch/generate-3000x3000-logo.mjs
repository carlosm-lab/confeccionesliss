import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

async function generateImages() {
  console.log("🎨 Iniciando generación de imágenes 3000x3000px...");

  // 1. Cargar logo.webp (512x512) o logo.png y convertirlo a blanco con canal alfa preservado
  const inputLogoPath = path.join(projectRoot, "public", "logo.webp");
  const { data, info } = await sharp(inputLogoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = 255;
    pixels[i + 1] = 255;
    pixels[i + 2] = 255;
  }

  // Escalado de alta calidad del logo blanco a 1800x1800 px
  const whiteLogo1800Buf = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .resize(1800, 1800, { fit: "contain", kernel: "lanczos3" })
    .toBuffer();

  const whiteLogo1800Base64 = `data:image/png;base64,${whiteLogo1800Buf.toString("base64")}`;

  // Escalado del logo para la versión tarjeta (1500x1500 px)
  const whiteLogo1500Buf = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .resize(1500, 1500, { fit: "contain", kernel: "lanczos3" })
    .toBuffer();

  const whiteLogo1500Base64 = `data:image/png;base64,${whiteLogo1500Buf.toString("base64")}`;

  // ─────────────────────────────────────────────────────────────────
  // Opción 1: Logo Negativo Limpio en fondo Azul (#143067) - 3000x3000px
  // ─────────────────────────────────────────────────────────────────
  const svgOption1 = `<svg width="3000" height="3000" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <rect width="3000" height="3000" fill="#143067" />
    <image href="${whiteLogo1800Base64}" x="600" y="600" width="1800" height="1800" />
  </svg>`;

  const option1PathPublic = path.join(projectRoot, "public", "logo-negativo-azul-3000x3000.png");
  const option1PathMediaKit = path.join(projectRoot, "public", "images", "media-kit", "logo-negativo-azul-3000x3000.png");

  await sharp(Buffer.from(svgOption1))
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(option1PathPublic);

  await fs.copyFile(option1PathPublic, option1PathMediaKit);
  console.log("✅ Opción 1 creada:", option1PathPublic);

  // ─────────────────────────────────────────────────────────────────
  // Opción 2: Replicación idéntica de la Tarjeta del Media Kit - 3000x3000px
  // ─────────────────────────────────────────────────────────────────
  // En MediaKitClient.tsx:
  // - Top: 03 // NEGATIVO (font-mono text-[9px] text-white/60)
  // - Center: Logo blanco (w-[80%] max-h-[80%])
  // - Bottom: FONDO OSCURO (font-mono text-[9px] text-white/80)
  // Escala en 3000px: Padding ~160px, font sizes ~64px y ~68px.
  const svgOption2 = `<svg width="3000" height="3000" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <!-- Fondo Azul Primario #143067 -->
    <rect width="3000" height="3000" fill="#143067" />
    
    <!-- Borde interior sutil y esquinas redondeadas tipo tarjeta -->
    <rect x="80" y="80" width="2840" height="2840" rx="60" fill="none" stroke="rgba(255, 255, 255, 0.15)" stroke-width="6" />

    <!-- Texto Superior: 03 // NEGATIVO -->
    <text x="160" y="240" font-family="monospace, Courier, sans-serif" font-size="64" font-weight="700" fill="rgba(255, 255, 255, 0.65)" letter-spacing="4">03 // NEGATIVO</text>

    <!-- Logo Blanco Centrado -->
    <image href="${whiteLogo1500Base64}" x="750" y="750" width="1500" height="1500" />

    <!-- Texto Inferior Centrado: FONDO OSCURO -->
    <text x="1500" y="2780" font-family="monospace, Courier, sans-serif" font-size="68" font-weight="700" fill="rgba(255, 255, 255, 0.85)" letter-spacing="6" text-anchor="middle">FONDO OSCURO</text>
  </svg>`;

  const option2PathPublic = path.join(projectRoot, "public", "tarjeta-logo-negativo-azul-3000x3000.png");
  const option2PathMediaKit = path.join(projectRoot, "public", "images", "media-kit", "tarjeta-logo-negativo-azul-3000x3000.png");

  await sharp(Buffer.from(svgOption2))
    .png({ compressionLevel: 9, quality: 100 })
    .toFile(option2PathPublic);

  await fs.copyFile(option2PathPublic, option2PathMediaKit);
  console.log("✅ Opción 2 creada:", option2PathPublic);
}

generateImages().catch(console.error);
