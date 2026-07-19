import fs from 'fs';
import path from 'path';

// Función sencilla para cargar variables del archivo .env
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  if (!fs.existsSync(envPath)) return;
  const content = fs.readFileSync(envPath, 'utf8');
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const parts = trimmed.split('=');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key] = val;
    }
  });
}

loadEnv();

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://cvbdqsxjfrbwovzpydng.supabase.co';
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function runMigration() {
  console.log('=== INICIANDO MIGRACIÓN DE PRECIOS TALLA L ===');
  
  if (!SERVICE_KEY) {
    console.error('ERROR: No se encontró la variable SUPABASE_SERVICE_ROLE_KEY en el archivo .env o en el entorno.');
    console.error('Por favor, agrega temporalmente la clave SUPABASE_SERVICE_ROLE_KEY a tu archivo .env local para poder ejecutar la actualización.');
    process.exit(1);
  }

  // Leer productos coincidentes previamente guardados
  const strictMatchingPath = path.resolve(process.cwd(), 'scratch/strict-matching-products.json');
  if (!fs.existsSync(strictMatchingPath)) {
    console.error('ERROR: No se encontró el archivo scratch/strict-matching-products.json. Ejecuta primero scratch/strict-filter.mjs para generar la lista.');
    process.exit(1);
  }

  const matchingProducts = JSON.parse(fs.readFileSync(strictMatchingPath, 'utf8'));
  console.log(`Cargados ${matchingProducts.length} productos para actualizar.`);

  let successCount = 0;
  let failCount = 0;

  for (const p of matchingProducts) {
    console.log(`\nActualizando [${p.id}] ${p.name}...`);
    
    // Preparar el nuevo price_by_size
    const newPriceBySize = { ...p.price_by_size };
    newPriceBySize['L'] = 38;

    const payload = {
      price_by_size: newPriceBySize
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/products?id=eq.${p.id}`, {
        method: 'PATCH',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(`  -> ¡ÉXITO! Precio de talla L cambiado a 38.`);
        successCount++;
      } else {
        const errText = await response.text();
        console.error(`  -> ERROR (Código ${response.status}): ${errText}`);
        failCount++;
      }
    } catch (err) {
      console.error(`  -> ERROR de conexión:`, err);
      failCount++;
    }
  }

  console.log('\n=== MIGRACIÓN FINALIZADA ===');
  console.log(`Exitosos: ${successCount}`);
  console.log(`Fallidos: ${failCount}`);
}

runMigration();
