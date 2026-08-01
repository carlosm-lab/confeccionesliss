import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const downloadsSvg = "C:\\Users\\usuar\\Downloads\\sdfsdf.svg";
const publicDir = path.join(root, "public");
const iconsDir = path.join(publicDir, "icons");

console.log("🚀 Generando archivos dedicados del Isotipo sin tocar public/logo.png...");

const svgContent = await fs.readFile(downloadsSvg, "utf8");

// Save isotipo SVG files
await fs.writeFile(path.join(publicDir, "logo-isotipo.svg"), svgContent, "utf8");

// Create white isotipo SVG
const whiteSvgContent = svgContent
  .replace(/fill:#19346a/g, "fill:#ffffff")
  .replace(/fill:#fbfcfc/g, "fill:#19346a");
await fs.writeFile(path.join(publicDir, "logo-isotipo-white.svg"), whiteSvgContent, "utf8");

const svgBuffer = Buffer.from(svgContent);
const whiteSvgBuffer = Buffer.from(whiteSvgContent);

// Render isotype PNGs
await sharp(svgBuffer)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "logo-isotipo.png"));

await sharp(whiteSvgBuffer)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "logo-isotipo-white.png"));

console.log("✅ Archivos de isotipo dedicados generados correctamente:");
console.log("   - public/logo-isotipo.svg");
console.log("   - public/logo-isotipo-white.svg");
console.log("   - public/logo-isotipo.png");
console.log("   - public/logo-isotipo-white.png");
