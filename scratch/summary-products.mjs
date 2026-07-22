import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scratch/matching-products.json', 'utf8'));

console.log(`Resumen de productos con talla L y precio 35 (Total: ${data.length}):`);
data.forEach((p, index) => {
  const priceL = p.price_by_size ? p.price_by_size['L'] : 'N/A';
  const offerL = p.offer_by_size ? p.offer_by_size['L'] : 'N/A';
  console.log(`${index + 1}. [${p.id}] ${p.name}`);
  console.log(`   - Precio Base: ${p.price}`);
  console.log(`   - precio_by_size['L']: ${priceL}`);
  console.log(`   - offer_by_size['L']: ${offerL}`);
  console.log(`   - Coincide por: ${p.reasons.join(', ')}`);
});
