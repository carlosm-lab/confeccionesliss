/**
 * Genera public/icons/favicon.svg — un SVG que contiene el logo PNG en base64
 * y usa @media (prefers-color-scheme) para cambiar de color según el tema:
 *   - Modo claro  → azul #143067 (mediante CSS filter)
 *   - Modo oscuro → blanco puro  (mediante CSS filter)
 *
 * Los navegadores modernos (Chrome 80+, Firefox 32+) leen el CSS interno del SVG
 * y muestran el color correcto automáticamente. Safari usa el PNG de respaldo.
 */
import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "public", "logo.png");
const iconsDir = path.join(root, "public", "icons");

await fs.mkdir(iconsDir, { recursive: true });

// 1. Recortar el logo original (sin recolorear) y exportar como PNG compacto
//    El SVG aplicará los filtros de color por CSS → no necesitamos múltiples variantes
const trimmedBuffer = await sharp(inputPath)
  .ensureAlpha()
  .trim()                              // elimina padding transparente
  .resize(96, 96, {                    // 96px es suficiente para favicons
    fit: "cover",
    position: "center",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toBuffer();

const base64 = trimmedBuffer.toString("base64");
const dataUrl = `data:image/png;base64,${base64}`;

console.log(`📦 PNG embebido: ${Math.round(base64.length / 1024)}KB (base64)`);

// 2. Construir el SVG con @media prefers-color-scheme interno
const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 96" width="96" height="96">
  <defs>
    <style>
      .logo {
        /* Modo claro: azul institucional #143067 */
        filter: brightness(0) saturate(100%) invert(17%) sepia(63%) saturate(763%) hue-rotate(193deg) brightness(91%) contrast(103%);
      }
      @media (prefers-color-scheme: dark) {
        .logo {
          /* Modo oscuro: blanco puro */
          filter: brightness(0) invert(1);
        }
      }
    </style>
  </defs>
  <image class="logo" href="${dataUrl}" x="0" y="0" width="96" height="96" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

const outputPath = path.join(iconsDir, "favicon.svg");
await fs.writeFile(outputPath, svg, "utf8");

const svgSize = (await fs.stat(outputPath)).size;
console.log(`✅ favicon.svg generado (${Math.round(svgSize / 1024)}KB)`);
console.log("   Light mode → azul #143067");
console.log("   Dark mode  → blanco puro");
console.log("\nCompatibilidad:");
console.log("   ✅ Chrome 80+    — SVG favicon con @media support");
console.log("   ✅ Firefox 32+   — SVG favicon con @media support");
console.log("   ⚠️  Safari       — usa PNG de respaldo (apple-icon)");
