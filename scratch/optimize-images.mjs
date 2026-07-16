import sharp from "sharp";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const inputImage = join(__dirname, "..", "public", "images", "uniformes", "portada.webp");
const outputDir = join(__dirname, "..", "public", "images", "uniformes");

const widths = [640, 750, 1080, 1200];

async function main() {
  console.log(`⏳ Starting optimization of ${inputImage}...`);
  for (const w of widths) {
    const targetFile = join(outputDir, `portada-${w}.webp`);
    await sharp(inputImage)
      .resize({ width: w })
      .webp({ quality: 80 })
      .toFile(targetFile);
    console.log(`✅ Generated: ${targetFile}`);
  }
  console.log("🎉 Image optimization complete!");
}

main().catch(console.error);
