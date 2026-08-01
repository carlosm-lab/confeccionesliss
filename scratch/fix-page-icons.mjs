import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const inputPath = path.join(root, "public", "logo.png");
const iconsDir = path.join(root, "public", "icons");
const appDir = path.join(root, "src", "app");

await fs.mkdir(iconsDir, { recursive: true });

// 1. Color definitions (Institutional Blue: #143067, Pure White: #FFFFFF)
const BLUE = { r: 0x14, g: 0x30, b: 0x67 };
const WHITE = { r: 255, g: 255, b: 255 };

async function recolor(srcData, color) {
  const out = Buffer.alloc(srcData.length);
  for (let i = 0; i < srcData.length; i += 4) {
    out[i] = color.r;
    out[i + 1] = color.g;
    out[i + 2] = color.b;
    out[i + 3] = srcData[i + 3]; // preserve alpha
  }
  return out;
}

// Helper to generate a clean PNG from logo with trim & padding
async function generatePng(color, outputPath, size) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const recolored = color ? await recolor(data, color) : data;

  await sharp(recolored, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .trim()
    .resize(size, size, {
      fit: "contain",
      position: "center",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({ compressionLevel: 9 })
    .toFile(outputPath);

  console.log(`✅ ${path.relative(root, outputPath)} (${size}×${size})`);
}

// Helper to generate ICO file
async function generateIco(outputPath) {
  const png32 = await sharp(inputPath)
    .trim()
    .resize(32, 32, { fit: "contain", position: "center", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0); // Reserved
  icoHeader.writeUInt16LE(1, 2); // ICO type (1 = icon)
  icoHeader.writeUInt16LE(1, 4); // 1 image
  icoHeader.writeUInt8(32, 6); // Width
  icoHeader.writeUInt8(32, 7); // Height
  icoHeader.writeUInt8(0, 8); // Color count
  icoHeader.writeUInt8(0, 9); // Reserved
  icoHeader.writeUInt16LE(1, 10); // Color planes
  icoHeader.writeUInt16LE(32, 12); // Bits per pixel
  icoHeader.writeUInt32LE(png32.length, 14); // Image size
  icoHeader.writeUInt32LE(22, 18); // Offset

  const icoBuffer = Buffer.concat([icoHeader, png32]);
  await fs.writeFile(outputPath, icoBuffer);
  console.log(`✅ ${path.relative(root, outputPath)} (ICO 32x32)`);
}

console.log("🎨 Generando favicons e íconos de la página...");

// Generate public/favicon.ico & src/app/favicon.ico
await generateIco(path.join(root, "public", "favicon.ico"));
await generateIco(path.join(appDir, "favicon.ico"));

// Generate Next.js App Router standard files
await generatePng(BLUE, path.join(appDir, "icon.png"), 192);
await generatePng(BLUE, path.join(appDir, "apple-icon.png"), 180);

// Generate public/icons files
await generatePng(BLUE, path.join(iconsDir, "favicon-light.png"), 256);
await generatePng(WHITE, path.join(iconsDir, "favicon-dark.png"), 256);
await generatePng(BLUE, path.join(iconsDir, "apple-icon-light.png"), 180);
await generatePng(WHITE, path.join(iconsDir, "apple-icon-dark.png"), 180);

// Generate clean public/icons/favicon.svg without problematic CSS filters
const trimmedBuffer = await sharp(inputPath)
  .ensureAlpha()
  .trim()
  .resize(96, 96, {
    fit: "contain",
    position: "center",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png({ compressionLevel: 9 })
  .toBuffer();

const base64 = trimmedBuffer.toString("base64");
const dataUrl = `data:image/png;base64,${base64}`;

const cleanSvg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 96 96" width="96" height="96">
  <image href="${dataUrl}" x="0" y="0" width="96" height="96" preserveAspectRatio="xMidYMid meet"/>
</svg>`;

await fs.writeFile(path.join(iconsDir, "favicon.svg"), cleanSvg, "utf8");
console.log("✅ public/icons/favicon.svg (SVG limpio sin CSS filters incompatibles)");

console.log("\n🚀 Todos los íconos han sido generados exitosamente.");
