import sharp from "sharp";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");

async function fixBlackLinesAndGenerate() {
  console.log("🛠️ Eliminando cualquier posible borde/línea oscura...");

  const inputLogoPath = path.join(projectRoot, "public", "logo.webp");

  // 1. Obtener los píxeles RAW de logo.webp
  const { data, info } = await sharp(inputLogoPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  let minX = info.width, minY = info.height, maxX = 0, maxY = 0;

  // 2. Establecer TODOS los canales R, G, B absolutamente a 255 (Blanco Puro)
  // independientemente del canal Alfa. Esto elimina cualquier píxel negro o gris.
  for (let i = 0; i < pixels.length; i += 4) {
    const x = (i / 4) % info.width;
    const y = Math.floor((i / 4) / info.width);
    const alpha = pixels[i + 3];

    pixels[i] = 255;     // Red
    pixels[i + 1] = 255; // Green
    pixels[i + 2] = 255; // Blue
    // pixels[i + 3] (Alpha) se mantiene exacto

    if (alpha > 10) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }

  const cropW = maxX - minX + 1;
  const cropH = maxY - minY + 1;

  // 3. Crear buffer con el logo blanco sin bordes oscuros
  const whiteLogoCleanBuf = await sharp(Buffer.from(pixels), {
    raw: { width: info.width, height: info.height, channels: 4 }
  })
    .extract({ left: minX, top: minY, width: cropW, height: cropH })
    .png()
    .toBuffer();

  // 4. Escalar limpiamente a 2250x2250px (75% del tamaño de 3000px)
  const targetSize = 2250;
  const resizedWhiteLogoBuf = await sharp(whiteLogoCleanBuf)
    .resize(targetSize, targetSize, {
      fit: "contain",
      kernel: "lanczos3"
    })
    .toBuffer();

  const logoMeta = await sharp(resizedWhiteLogoBuf).metadata();

  const leftPos = Math.round((3000 - logoMeta.width) / 2);
  const topPos = Math.round((3000 - logoMeta.height) / 2);

  // 5. Crear lienzo azul #143067 de 3000x3000px y superponer el logo blanco sin bordes
  const bgBuf = await sharp({
    create: {
      width: 3000,
      height: 3000,
      channels: 3,
      background: { r: 20, g: 48, b: 103 } // #143067 (Azul institucional)
    }
  })
    .png()
    .toBuffer();

  const finalImageBuf = await sharp(bgBuf)
    .composite([
      {
        input: resizedWhiteLogoBuf,
        left: leftPos,
        top: topPos
      }
    ])
    .png({ compressionLevel: 9, quality: 100 })
    .toBuffer();

  // Guardar en public
  const outputPublic1 = path.join(projectRoot, "public", "foto-perfil.png");
  const outputPublic2 = path.join(projectRoot, "public", "logo-negativo-azul-3000x3000.png");

  await fs.writeFile(outputPublic1, finalImageBuf);
  await fs.writeFile(outputPublic2, finalImageBuf);

  // Copiar a la carpeta de artefactos
  const artifactDir = "C:\\Users\\usuar\\.gemini\\antigravity-ide\\brain\\e8f1e435-743b-4d68-9af5-c69157c59b86";
  try {
    await fs.mkdir(artifactDir, { recursive: true });
    await fs.writeFile(path.join(artifactDir, "foto-perfil.png"), finalImageBuf);
    await fs.writeFile(path.join(artifactDir, "logo-negativo-azul-3000x3000.png"), finalImageBuf);
  } catch (e) {
    console.error("Error al copiar a artefactos:", e);
  }

  console.log("✨ ¡Imagen corregida exitosamente! Cero líneas negras.");
}

fixBlackLinesAndGenerate().catch(console.error);
