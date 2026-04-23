import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";

const PRODUCTS = [
  {
    id: "15",
    nombre: "Uniforme Escolar Niño",
    precio: 18.0,
    precioAnterior: null,
    categoria: "Escolar",
    tallas: ["4", "6", "8", "10", "12"],
    showBadge: false,
  },
  {
    id: "16",
    nombre: "Uniforme Escolar Niña",
    precio: 18.0,
    precioAnterior: null,
    categoria: "Escolar",
    tallas: ["4", "6", "8", "10", "12"],
    showBadge: false,
  },
  {
    id: "17",
    nombre: "Camiseta Deportiva Escolar",
    precio: 12.0,
    precioAnterior: 15.0,
    categoria: "Escolar",
    tallas: ["4", "6", "8", "10", "12"],
    showBadge: true,
    badgeText: "Oferta",
  },
  {
    id: "18",
    nombre: "Sueter Escolar Azul",
    precio: 16.5,
    precioAnterior: null,
    categoria: "Escolar",
    tallas: ["6", "8", "10", "12", "14"],
    showBadge: true,
    badgeText: "Nuevo",
  },
];

export default function EscuelasCatalogPage() {
  return (
    <div>
      <div className="relative bg-amber-800 px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold tracking-wider text-amber-300 uppercase">
            Catálogo
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Escuelas y Colegios
          </h1>
          <p className="mt-2 text-amber-100/70">Uniformes escolares a medida</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRODUCTS.map((p) => (
            <Link key={p.id} href={`/producto/${p.id}` as any}>
              <ProductCard {...p} showFavorite />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
