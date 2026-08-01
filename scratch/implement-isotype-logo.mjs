import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const downloadsSvg = "C:\\Users\\usuar\\Downloads\\sdfsdf.svg";

const publicDir = path.join(root, "public");
const iconsDir = path.join(publicDir, "icons");
const appDir = path.join(root, "src", "app");

console.log("🚀 Iniciando implementación del nuevo isotipo...");

// 1. Preservar el logo original del footer en public/logo-footer.png
const logoFooterPath = path.join(publicDir, "logo-footer.png");
try {
  await fs.access(logoFooterPath);
  console.log("ℹ️ public/logo-footer.png ya existe.");
} catch {
  const origLogoPath = path.join(publicDir, "logo.png");
  await fs.copyFile(origLogoPath, logoFooterPath);
  console.log("✅ Copiado logo original a public/logo-footer.png");
}

// 2. Leer SVG descargado
const svgContent = await fs.readFile(downloadsSvg, "utf8");

// Guardar SVG en public/logo.svg y public/logo-isotipo.svg
await fs.writeFile(path.join(publicDir, "logo.svg"), svgContent, "utf8");
await fs.writeFile(path.join(publicDir, "logo-isotipo.svg"), svgContent, "utf8");
await fs.writeFile(path.join(iconsDir, "favicon.svg"), svgContent, "utf8");
console.log("✅ public/logo.svg y public/icons/favicon.svg creados desde sdfsdf.svg");

// 3. Crear versión SVG en blanco para fondos oscuros (reemplaza #19346a por #ffffff)
const whiteSvgContent = svgContent
  .replace(/fill:#19346a/g, "fill:#ffffff")
  .replace(/fill:#fbfcfc/g, "fill:#19346a");
await fs.writeFile(path.join(publicDir, "logo-white.svg"), whiteSvgContent, "utf8");

// 4. Renderizar PNGs desde sdfsdf.svg con sharp
const svgBuffer = Buffer.from(svgContent);
const whiteSvgBuffer = Buffer.from(whiteSvgContent);

// Helper para renderizar PNG desde buffer SVG
async function renderPng(svgBuf, outputPath, width, height) {
  await sharp(svgBuf)
    .resize(width, height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);
  console.log(`✅ ${path.relative(root, outputPath)} (${width}×${height})`);
}

// Helper para renderizar WebP
async function renderWebp(svgBuf, outputPath, width, height) {
  await sharp(svgBuf)
    .resize(width, height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .webp({ quality: 95 })
    .toFile(outputPath);
  console.log(`✅ ${path.relative(root, outputPath)} (${width}×${height})`);
}

// Helper para renderizar ICO 32x32
async function renderIco(svgBuf, outputPath) {
  const png32 = await sharp(svgBuf)
    .resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(1, 4);
  icoHeader.writeUInt8(32, 6);
  icoHeader.writeUInt8(32, 7);
  icoHeader.writeUInt8(0, 8);
  icoHeader.writeUInt8(0, 9);
  icoHeader.writeUInt16LE(1, 10);
  icoHeader.writeUInt16LE(32, 12);
  icoHeader.writeUInt32LE(png32.length, 14);
  icoHeader.writeUInt32LE(22, 18);

  const icoBuffer = Buffer.concat([icoHeader, png32]);
  await fs.writeFile(outputPath, icoBuffer);
  console.log(`✅ ${path.relative(root, outputPath)} (ICO 32×32)`);
}

// Renderizar todos los formatos e imágenes necesarios
await renderPng(svgBuffer, path.join(publicDir, "logo.png"), 512, 512);
await renderWebp(svgBuffer, path.join(publicDir, "logo.webp"), 512, 512);
await renderPng(whiteSvgBuffer, path.join(publicDir, "logo-white.png"), 512, 512);

await renderPng(svgBuffer, path.join(appDir, "icon.png"), 192, 192);
await renderPng(svgBuffer, path.join(appDir, "apple-icon.png"), 180, 180);

await renderIco(svgBuffer, path.join(publicDir, "favicon.ico"));
await renderIco(svgBuffer, path.join(appDir, "favicon.ico"));

await renderPng(svgBuffer, path.join(iconsDir, "favicon-light.png"), 256, 256);
await renderPng(whiteSvgBuffer, path.join(iconsDir, "favicon-dark.png"), 256, 256);
await renderPng(svgBuffer, path.join(iconsDir, "apple-icon-light.png"), 180, 180);
await renderPng(whiteSvgBuffer, path.join(iconsDir, "apple-icon-dark.png"), 180, 180);

console.log("\n🎉 Todos los activos del nuevo isotipo han sido generados exitosamente.");
