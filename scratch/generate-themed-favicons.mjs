/**
 * Genera favicons temáticos con fondo TRANSPARENTE y sin padding.
 * Usa .trim() para eliminar el espacio transparente del logo antes de redimensionar,
 * así el sello llena toda la imagen sin verse como una mancha pequeña.
 */
import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "public", "logo.png");

async function recolor(srcData, color) {
  const out = Buffer.alloc(srcData.length);
  for (let i = 0; i < srcData.length; i += 4) {
    out[i]     = color.r;
    out[i + 1] = color.g;
    out[i + 2] = color.b;
    out[i + 3] = srcData[i + 3]; // conservar alpha original
  }
  return out;
}

async function generate(color, outputPath, size) {
  // 1. Leer imagen fuente en crudo (RGBA)
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 2. Recolorear manteniendo transparencia
  const recolored = await recolor(data, color);

  // 3. Reconstruir PNG → trim (elimina padding transparente) → resize sin padding
  await sharp(recolored, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()                       // ← elimina bordes transparentes → logo llena el frame
    .resize(size, size, {
      fit: "cover",               // ← recorta para llenar el cuadrado completamente
      position: "center",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`✅ ${path.basename(outputPath)} (${size}×${size})`);
}

const BLUE  = { r: 0x14, g: 0x30, b: 0x67 }; // #143067
const WHITE = { r: 255,  g: 255,  b: 255  };

const iconsDir = path.join(root, "public", "icons");
await fs.mkdir(iconsDir, { recursive: true });

// Favicon 256×256 — los navegadores modernos usan esta resolución
await generate(BLUE,  path.join(iconsDir, "favicon-light.png"),      256);
await generate(WHITE, path.join(iconsDir, "favicon-dark.png"),       256);

// Apple Touch Icon 180×180
await generate(BLUE,  path.join(iconsDir, "apple-icon-light.png"),   180);
await generate(WHITE, path.join(iconsDir, "apple-icon-dark.png"),    180);

console.log("\n✅ Favicons regenerados con trim + cover (sin padding, sin mancha).");
