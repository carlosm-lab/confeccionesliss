import sharp from 'sharp';
import path from 'path';
import fs from 'fs';

const inputPath = 'C:/Users/usuar/Desktop/hero/hero.png';
const outputDir = 'c:/Users/usuar/Desktop/confecciones liss/public/images/hero';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convert() {
  console.log('Processing hero.png...');
  
  // Full size WebP (1122x1402)
  const fullWebp = path.join(outputDir, 'hero-home.webp');
  await sharp(inputPath)
    .webp({ quality: 85, effort: 6 })
    .toFile(fullWebp);
  const fullStat = fs.statSync(fullWebp);
  console.log(`hero-home.webp created: ${(fullStat.size / 1024).toFixed(1)} KB`);

  // 800px WebP
  const w800 = path.join(outputDir, 'hero-home-800.webp');
  await sharp(inputPath)
    .resize(800)
    .webp({ quality: 85, effort: 6 })
    .toFile(w800);
  const stat800 = fs.statSync(w800);
  console.log(`hero-home-800.webp created: ${(stat800.size / 1024).toFixed(1)} KB`);

  // 640px WebP
  const w640 = path.join(outputDir, 'hero-home-640.webp');
  await sharp(inputPath)
    .resize(640)
    .webp({ quality: 85, effort: 6 })
    .toFile(w640);
  const stat640 = fs.statSync(w640);
  console.log(`hero-home-640.webp created: ${(stat640.size / 1024).toFixed(1)} KB`);
}

convert().catch(err => {
  console.error(err);
  process.exit(1);
});
