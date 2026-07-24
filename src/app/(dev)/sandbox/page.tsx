"use client";

import { useState } from "react";
import { HeroImageCarousel } from "@/components/ui/HeroImageCarousel";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { DeliveryForm } from "@/components/cart/DeliveryFormModal";
import { getSupabaseClient } from "@/lib/supabaseClient";

import { Icon } from "@/components/ui/icons/Icon";

interface MatchingProduct {
  id: string;
  name: string;
  price: number;
  price_by_size: Record<string, number> | null;
}

export default function SandboxPage() {
  const [matchingProducts, setMatchingProducts] = useState<MatchingProduct[]>(
    []
  );
  const [isSearching, setIsSearching] = useState(false);
  const [isMigrating, setIsMigrating] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  };

  const handleSearch = async () => {
    setIsSearching(true);
    setLogs([]);
    addLog("Buscando productos en Supabase...");
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("products")
        .select("id, name, price, price_by_size")
        .order("name");

      if (error) throw error;

      const matched: MatchingProduct[] = [];
      for (const p of data || []) {
        if (
          p.price_by_size &&
          p.price_by_size["L"] !== undefined &&
          Number(p.price_by_size["L"]) === 35
        ) {
          matched.push(p);
        } else if (
          (!p.price_by_size || Object.keys(p.price_by_size).length === 0) &&
          Number(p.price) === 35
        ) {
          // Caso borde por si no tiene price_by_size pero tiene precio 35
          matched.push(p);
        }
      }

      setMatchingProducts(matched);
      addLog(
        `Búsqueda finalizada. Se encontraron ${matched.length} productos con precio talla L = 35.`
      );
    } catch (err: any) {
      addLog(`Error al buscar: ${err.message || err}`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleMigrate = async () => {
    if (matchingProducts.length === 0) return;
    setIsMigrating(true);
    addLog(`Iniciando migración de ${matchingProducts.length} productos...`);

    const supabase = getSupabaseClient();
    let success = 0;
    let failed = 0;

    for (const p of matchingProducts) {
      addLog(`Actualizando [${p.name}]...`);
      const newPriceBySize = { ...(p.price_by_size || {}) };
      newPriceBySize["L"] = 38;

      try {
        const { error } = await supabase
          .from("products")
          .update({ price_by_size: newPriceBySize })
          .eq("id", p.id);

        if (error) throw error;
        addLog(`  -> ¡Éxito! Talla L actualizada a 38.`);
        success++;
      } catch (err: any) {
        addLog(`  -> Error: ${err.message || err}`);
        failed++;
      }
    }

    addLog(`Migración completada. Éxito: ${success}, Fallidos: ${failed}.`);
    setIsMigrating(false);
    // Limpiar lista de coincidentes tras migración
    if (success > 0) {
      setMatchingProducts([]);
    }
  };

  return (
    <div className="py-10">
      <Navbar />
      <div className="mx-auto my-6 max-w-screen-2xl px-5 md:px-8">
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 font-mono text-xs text-amber-900">
          <strong>ENTORNO DE SANDBOX DE DESARROLLO</strong>
          <br />
          Esta ruta se utiliza exclusivamente para validar visualmente y probar
          los componentes del proyecto.
        </div>

        {/* Panel de prueba de Componente Icon.tsx */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-800">
            Prueba de Componente Icon (Lucide React - Zero FOUT)
          </h2>
          <div className="flex flex-wrap gap-4 text-slate-700">
            {[
              "home",
              "storefront",
              "design_services",
              "business",
              "mail",
              "location_on",
              "phone",
              "schedule",
              "shopping_bag",
              "shopping_cart",
              "favorite",
              "star",
              "verified",
              "local_shipping",
              "payments",
              "security",
              "eco",
              "checkroom",
              "cookie",
              "gavel",
              "help",
            ].map((iconName) => (
              <div
                key={iconName}
                className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs font-semibold"
              >
                <Icon name={iconName} className="text-primary h-5 w-5" />
                <span>{iconName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Panel de Migración de Base de Datos */}
        <div className="mb-8 rounded-2xl border border-blue-200 bg-blue-50 p-6 shadow-sm">
          <h2 className="mb-2 text-xl font-bold tracking-tight text-blue-900">
            Herramienta de Migración de Precios (Talla L: 35 ➔ 38)
          </h2>
          <p className="mb-4 text-sm text-blue-700">
            Esta herramienta busca y actualiza los uniformes/scrubs que tienen
            el precio de la talla L en 35, cambiándolo a 38 en Supabase
            utilizando la sesión actual del navegador (requiere estar logueado
            como administrador en el sitio).
          </p>
          <div className="flex gap-4">
            <button
              onClick={handleSearch}
              disabled={isSearching || isMigrating}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isSearching ? "Buscando..." : "Buscar productos afectados"}
            </button>
            <button
              onClick={handleMigrate}
              disabled={isMigrating || matchingProducts.length === 0}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-emerald-700 disabled:opacity-50"
            >
              {isMigrating
                ? "Migrando..."
                : `Migrar ${matchingProducts.length} productos a 38`}
            </button>
          </div>

          {logs.length > 0 && (
            <div className="mt-4 max-h-60 overflow-y-auto rounded-lg bg-slate-900 p-4 font-mono text-xs text-slate-100">
              <div className="mb-2 border-b border-slate-700 pb-1 font-bold text-slate-400">
                Consola de Ejecución:
              </div>
              {logs.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Lado Izquierdo: Formulario de entrega */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold tracking-tight text-slate-800">
              Prueba de Formulario de Entrega
            </h2>
            <DeliveryForm
              initialState={{
                department: "San Miguel",
                municipality: "San Miguel",
              }}
              hasALaMedidaItem={true}
              onConfirm={(info) => {
                console.log("Confirmado en Sandbox:", info);
              }}
            />
          </div>

          {/* Lado Derecho: Carrusel original */}
          <div className="flex flex-col items-center justify-center gap-6">
            <h3 className="text-sm font-semibold text-slate-500 uppercase">
              Carrusel de Prueba
            </h3>
            <div className="border-primary/35 relative flex h-[400px] w-[320px] flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-[500px] md:w-[400px]">
              <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
              <div className="relative h-full w-full overflow-hidden rounded-xl">
                <HeroImageCarousel
                  sizes="(max-width:768px) 80vw, 40vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
