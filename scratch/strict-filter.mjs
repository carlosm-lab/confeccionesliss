import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/matching-products.json', 'utf8'));

const strictMatching = [];

for (const p of data) {
  let hasPriceL35 = false;
  let priceL = null;

  if (p.price_by_size && p.price_by_size['L'] !== undefined) {
    priceL = Number(p.price_by_size['L']);
    if (priceL === 35) {
      hasPriceL35 = true;
    }
  } else if (!p.price_by_size || Object.keys(p.price_by_size).length === 0) {
    // Si no tiene price_by_size, y el precio base es 35, y contiene la talla 'L'
    if (Number(p.price) === 35 && p.tallas && p.tallas.includes('L')) {
      hasPriceL35 = true;
      priceL = Number(p.price);
    }
  }

  if (hasPriceL35) {
    strictMatching.push({
      ...p,
      currentPriceL: priceL
    });
  }
}

fs.writeFileSync('scratch/strict-matching-products.json', JSON.stringify(strictMatching, null, 2));
console.log(`Productos que tienen precio talla L = 35 de forma estricta: ${strictMatching.length}`);
strictMatching.forEach((p, idx) => {
  console.log(`${idx + 1}. [${p.id}] ${p.name} - Base: ${p.price}, PriceBySize: ${JSON.stringify(p.price_by_size)}`);
});
