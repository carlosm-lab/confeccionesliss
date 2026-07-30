import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

async function generate75PercentProfilePic() {
  console.log("⚡ Ajustando logo exactamente al 75% (2250px) en canvas 3000x3000px...");

  // 1. Cargar logo.webp y recortar exactamente a su caja contenedora visible (sin márgenes transparentes internos)
  const inputLogoPath = path.join(projectRoot, "public", "logo.webp");
  
  // Convertir a blanco manteniendo transparencia
  const { data, info } = await sharp(inputLogoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;

  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const idx = (y * info.width + x) * 4;
      const alpha = pixels[idx + 3];

      if (alpha > 10) {
        pixels[idx] = 255;     // R
        pixels[idx + 1] = 255; // G
        pixels[idx + 2] = 255; // B
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  const cropWidth = maxX - minX + 1;
  const cropHeight = maxY - minY + 1;

  // Crear la imagen recortada del logo blanco
  const croppedWhiteLogoBuf = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .extract({ left: minX, top: minY, width: cropWidth, height: cropHeight })
    .png()
    .toBuffer();

  // Escalar el logo recortado para que su dimensión mayor ocupe exactamente el 75% de 3000px = 2250px
  const targetSize = 2250;
  const resizedLogoBuf = await sharp(croppedWhiteLogoBuf)
    .resize(targetSize, targetSize, { fit: "contain", kernel: "lanczos3" })
    .toBuffer();

  const logoMetadata = await sharp(resizedLogoBuf).metadata();
  console.log(`Dimensiones del logo redimensionado: ${logoMetadata.width}x${logoMetadata.height}px`);

  // Calcular posición para centrado exacto en canvas 3000x3000px
  const leftPos = Math.round((3000 - logoMetadata.width) / 2);
  const topPos = Math.round((3000 - logoMetadata.height) / 2);

  // Crear fondo #143067 de 3000x3000px y superponer el logo
  const backgroundBuf = await sharp({
    create: {
      width: 3000,
      height: 3000,
      channels: 3,
      background: { r: 20, g: 48, b: 103 } // #143067
    }
  })
    .png()
    .toBuffer();

  const finalImageBuf = await sharp(backgroundBuf)
    .composite([
      {
        input: resizedLogoBuf,
        left: leftPos,
        top: topPos,
      }
    ])
    .png({ compressionLevel: 8, quality: 100 })
    .toBuffer();

  // Guardar en todas las ubicaciones principales
  const outputPublic1 = path.join(projectRoot, "public", "foto-perfil.png");
  const outputPublic2 = path.join(projectRoot, "public", "logo-negativo-azul-3000x3000.png");

  await fs.writeFile(outputPublic1, finalImageBuf);
  await fs.writeFile(outputPublic2, finalImageBuf);

  // Copiar también a la carpeta de artefactos
  const artifactDir = "C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\e8f1e435-743b-4d68-9af5-c69157c59b86";
  try {
    await fs.mkdir(artifactDir, { recursive: true });
    await fs.writeFile(path.join(artifactDir, "foto-perfil.png"), finalImageBuf);
    await fs.writeFile(path.join(artifactDir, "logo-negativo-azul-3000x3000.png"), finalImageBuf);
  } catch (e) {
    console.error("Error al copiar a artefactos:", e);
  }

  console.log(`✅ Imagen 3000x3000px generada. Logo centrado en (${leftPos}, ${topPos}) ocupando ${logoMetadata.width}x${logoMetadata.height}px (75% del espacio).`);
}

generate75PercentProfilePic().catch(console.error);
