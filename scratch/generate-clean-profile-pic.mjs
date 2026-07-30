import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

async function generateCleanProfilePic() {
  console.log("⚡ Generando foto de perfil limpia 3000x3000px...");

  // Cargar logo.webp (512x512) y convertir todos los píxeles visibles a blanco puro (#FFFFFF)
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
    // alfa se mantiene exactamente igual
  }

  // Escalar el logo a 1700x1700px con algoritmo Lanczos3 para máxima nitidez
  const whiteLogoBuf = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .resize(1700, 1700, { fit: "contain", kernel: "lanczos3" })
    .toBuffer();

  const whiteLogoBase64 = `data:image/png;base64,${whiteLogoBuf.toString("base64")}`;

  // SVG de 3000x3000px: SOLO el fondo azul #143067 y el logo blanco centrado en (650, 650)
  const svgContent = `<svg width="3000" height="3000" viewBox="0 0 3000 3000" xmlns="http://www.w3.org/2000/svg">
    <rect width="3000" height="3000" fill="#143067" />
    <image href="${whiteLogoBase64}" x="650" y="650" width="1700" height="1700" />
  </svg>`;

  const outputPublic1 = path.join(projectRoot, "public", "foto-perfil.png");
  const outputPublic2 = path.join(projectRoot, "public", "logo-negativo-azul-3000x3000.png");

  await sharp(Buffer.from(svgContent))
    .png({ compressionLevel: 8, quality: 100 })
    .toFile(outputPublic1);

  await fs.copyFile(outputPublic1, outputPublic2);

  // Copiar también a la carpeta de artefactos
  const artifactDir = "C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\e8f1e435-743b-4d68-9af5-c69157c59b86";
  try {
    await fs.mkdir(artifactDir, { recursive: true });
    await fs.copyFile(outputPublic1, path.join(artifactDir, "foto-perfil.png"));
    await fs.copyFile(outputPublic1, path.join(artifactDir, "logo-negativo-azul-3000x3000.png"));
  } catch (e) {
    console.error("Error al copiar a artefactos:", e);
  }

  console.log("✅ Imagen limpia generada exitosamente en /public/foto-perfil.png");
}

generateCleanProfilePic().catch(console.error);
