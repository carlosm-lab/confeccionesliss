import { getRecentProducts } from "@/lib/catalogService";

export const dynamic = "force-dynamic"; // Esta ruta siempre es dinámica para testing en vivo

export default async function TestCachePage() {
  const products = await getRecentProducts(10);

  return (
    <div style={{ padding: "40px", fontFamily: "monospace" }}>
      <h1>Debug de Productos del Home</h1>
      <p>Esta página consulta la misma función que el home page.</p>
      <hr />
      <pre>
        {JSON.stringify(
          products.map((p) => ({
            id: p.id,
            name: p.name,
            is_featured: p.is_featured,
            updated_at: p.updated_at,
          })),
          null,
          2
        )}
      </pre>
    </div>
  );
}
