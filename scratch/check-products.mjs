import fetch from 'node-fetch';
import fs from 'fs';

const SUPABASE_URL = 'https://cvbdqsxjfrbwovzpydng.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YmRxc3hqZnJid292enB5ZG5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY4ODc5MDQsImV4cCI6MjA5MjQ2MzkwNH0.UesSE_PRrkYK5n4nrwzS_k7HDO7TVFHOMJcF2zzRnzo';

async function checkProducts() {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
      headers: {
        'apikey': ANON_KEY,
        'Authorization': `Bearer ${ANON_KEY}`
      }
    });

    if (!response.ok) {
      throw new Error(`Error en fetch: ${response.statusText}`);
    }

    const products = await response.json();
    const matching = [];

    for (const p of products) {
      let matches = false;
      const reasons = [];

      // Caso 1: precio base es 35 y tiene talla "L" en el array de tallas
      if (Number(p.price) === 35 && p.tallas && p.tallas.includes('L')) {
        matches = true;
        reasons.push(`Precio base es 35 y tiene talla L en lista`);
      }

      // Caso 2: price_by_size tiene la talla L con precio 35
      if (p.price_by_size && p.price_by_size['L'] !== undefined && Number(p.price_by_size['L']) === 35) {
        matches = true;
        reasons.push(`price_by_size['L'] es 35`);
      }

      // Caso 3: offer_by_size tiene la talla L con precio 35
      if (p.offer_by_size && p.offer_by_size['L'] !== undefined && Number(p.offer_by_size['L']) === 35) {
        matches = true;
        reasons.push(`offer_by_size['L'] es 35`);
      }

      if (matches) {
        matching.push({
          id: p.id,
          name: p.name,
          price: p.price,
          tallas: p.tallas,
          price_by_size: p.price_by_size,
          offer_by_size: p.offer_by_size,
          reasons
        });
      }
    }

    fs.writeFileSync('scratch/matching-products.json', JSON.stringify(matching, null, 2));
    console.log(`Guardados ${matching.length} productos coincidentes en scratch/matching-products.json`);
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProducts();
