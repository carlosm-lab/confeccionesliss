/**
 * Genera icon.png y apple-icon.png con el logo en negro puro sobre fondo blanco.
 * Equivalente visual a CSS filter: brightness(0) — logo monocromático negro total.
 * Fondo blanco, sin transparencia.
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "public", "logo.png");

async function makeBlackLogoOnWhite(outputPath, size) {
  // 1. Leer imagen original y obtener buffer crudo con alpha
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // 2. Pixel-by-pixel: mantener alpha, forzar RGB a negro puro (0,0,0)
  const blackData = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    blackData[i] = 0;       // R → 0
    blackData[i + 1] = 0;   // G → 0
    blackData[i + 2] = 0;   // B → 0
    blackData[i + 3] = data[i + 3]; // Alpha original
  }

  // 3. Reconstruir imagen raw → aplanar contra blanco → resize → guardar
  await sharp(blackData, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .flatten({ background: { r: 255, g: 255, b: 255 } }) // fondo blanco
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255 },
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`✅ Generado: ${outputPath} (${size}×${size})`);
}

// icon.png: 64×64 (favicon, Google search snippet)
await makeBlackLogoOnWhite(path.join(root, "src", "app", "icon.png"), 64);

// apple-icon.png: 180×180 (Apple touch icon)
await makeBlackLogoOnWhite(
  path.join(root, "src", "app", "apple-icon.png"),
  180
);

console.log("\n✅ Ambos íconos generados con logo negro puro sobre blanco.");
