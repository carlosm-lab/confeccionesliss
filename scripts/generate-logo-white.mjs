// scripts/generate-logo-white.mjs
// Genera /public/logo-white.png: equivalente a CSS `brightness(0) invert(1)`
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputPath  = path.join(__dirname, "../public/logo.png");
const outputPath = path.join(__dirname, "../public/logo-white.png");

const { data, info } = await sharp(inputPath)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const pixels = new Uint8Array(data);
for (let i = 0; i < pixels.length; i += 4) {
  pixels[i]     = 255;
  pixels[i + 1] = 255;
  pixels[i + 2] = 255;
  // pixels[i + 3] queda intacto
}

await sharp(Buffer.from(pixels), {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .png()
  .toFile(outputPath);

console.log(`✅  logo-white.png generado en /public (${info.width}x${info.height}px)`);
