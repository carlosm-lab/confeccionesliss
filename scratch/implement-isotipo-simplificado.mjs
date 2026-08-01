import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const downloadsSvg = "C:\\Users\\usuar\\Downloads\\isotipo-simplificado.svg";
const publicDir = path.join(root, "public");
const iconsDir = path.join(publicDir, "icons");
const srcAppDir = path.join(root, "src", "app");

console.log("🚀 Procesando isotipo-simplificado.svg (Blanco para pestañas, Color para Google)...");

// 1. Read SVG from downloads
const svgContent = await fs.readFile(downloadsSvg, "utf8");

// Save public/isotipo-simplificado.svg (Vectorial Navegador / Google Search)
await fs.writeFile(path.join(publicDir, "isotipo-simplificado.svg"), svgContent, "utf8");

// Save white version of isotipo-simplificado.svg (Negativo Blanco para pestañas del navegador)
const whiteSvgContent = svgContent
  .replace(/fill:#0b2c6a/g, "fill:#ffffff")
  .replace(/fill:#19346a/g, "fill:#ffffff")
  .replace(/fill:#f7f8fa/g, "fill:#0b2c6a")
  .replace(/fill:#fbfcfc/g, "fill:#0b2c6a");
await fs.writeFile(path.join(publicDir, "isotipo-simplificado-white.svg"), whiteSvgContent, "utf8");

// Save public/icons/favicon.svg with WHITE NEGATIVE version for browser tabs
await fs.writeFile(path.join(iconsDir, "favicon.svg"), whiteSvgContent, "utf8");

const svgBuffer = Buffer.from(svgContent);
const whiteSvgBuffer = Buffer.from(whiteSvgContent);

// Render high-res PNG for public/isotipo-simplificado.png & white
await sharp(svgBuffer)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "isotipo-simplificado.png"));

await sharp(whiteSvgBuffer)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "isotipo-simplificado-white.png"));

// App Router Icons:
// 1. Google Search / Mobile Apple Touch uses Vectorial Navegador (Color)
await sharp(svgBuffer)
  .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(srcAppDir, "icon.png"));

await sharp(svgBuffer)
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(srcAppDir, "apple-icon.png"));

// Helper function to build a valid single-image ICO container from a PNG buffer
function createIcoFromPng(pngBuffer, width = 32, height = 32) {
  const icoHeader = Buffer.alloc(6);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // Type 1 = ICO
  icoHeader.writeUInt16LE(1, 4); // 1 image

  const directoryEntry = Buffer.alloc(16);
  directoryEntry.writeUInt8(width === 256 ? 0 : width, 0);
  directoryEntry.writeUInt8(height === 256 ? 0 : height, 1);
  directoryEntry.writeUInt8(0, 2); // Colors (0 = >=256)
  directoryEntry.writeUInt8(0, 3); // Reserved
  directoryEntry.writeUInt16LE(1, 4); // Color planes
  directoryEntry.writeUInt16LE(32, 6); // Bits per pixel
  directoryEntry.writeUInt32LE(pngBuffer.length, 8); // Image size in bytes
  directoryEntry.writeUInt32LE(22, 12); // Offset (6 + 16 = 22)

  return Buffer.concat([icoHeader, directoryEntry, pngBuffer]);
}

// 2. Browser Tab Favicon uses White Negative version (03 Negativo Blanco)
const whitePng32Buffer = await sharp(whiteSvgBuffer)
  .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toBuffer();

const whiteIcoBuffer = createIcoFromPng(whitePng32Buffer, 32, 32);
await fs.writeFile(path.join(publicDir, "favicon.ico"), whiteIcoBuffer);
await fs.writeFile(path.join(srcAppDir, "favicon.ico"), whiteIcoBuffer);

// Light & Dark variant favicons
await sharp(whiteSvgBuffer)
  .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(iconsDir, "favicon-light.png"));

await sharp(whiteSvgBuffer)
  .resize(256, 256, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(iconsDir, "favicon-dark.png"));

await sharp(svgBuffer)
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(iconsDir, "apple-icon-light.png"));

await sharp(svgBuffer)
  .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png()
  .toFile(path.join(iconsDir, "apple-icon-dark.png"));

console.log("🎉 Favicons de pestaña actualizados con la versión 03 // NEGATIVO (BLANCO) y Google Search con la versión 01 // VECTORIAL NAVEGADOR.");
