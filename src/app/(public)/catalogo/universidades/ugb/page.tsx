import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";

const PRODUCTS = [
  {
    id: "9",
    nombre: "Uniforme Medicina UGB",
    precio: 35.0,
    precioAnterior: null,
    categoria: "UGB",
    tallas: ["S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "UGB",
  },
  {
    id: "10",
    nombre: "Bata Odontología UGB",
    precio: 28.0,
    precioAnterior: 32.0,
    categoria: "UGB",
    tallas: ["S", "M", "L"],
    showBadge: true,
    badgeText: "Oferta",
  },
  {
    id: "13",
    nombre: "Uniforme Enfermería UGB",
    precio: 33.0,
    precioAnterior: null,
    categoria: "UGB",
    tallas: ["XS", "S", "M", "L"],
    showBadge: false,
  },
  {
    id: "14",
    nombre: "Uniforme Fisioterapia UGB",
    precio: 34.5,
    precioAnterior: null,
    categoria: "UGB",
    tallas: ["S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Nuevo",
  },
];

export default function UGBCatalogPage() {
  return (
    <div>
      <div className="relative bg-blue-900 px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold tracking-wider text-blue-300 uppercase">
            Catálogo
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Universidad Gerardo Barrios
          </h1>
          <p className="mt-2 text-blue-100/70">
            Uniformes oficiales por carrera
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 py-10">
        <p className="mb-6 text-sm text-gray-500">
          {PRODUCTS.length} productos
        </p>
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
