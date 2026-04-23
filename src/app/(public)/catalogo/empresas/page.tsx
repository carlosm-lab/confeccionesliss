import Link from "next/link";
import { ProductCard } from "@/components/ui/ProductCard";

const PRODUCTS = [
  {
    id: "19",
    nombre: "Camisa Corporativa Azul",
    precio: 24.0,
    precioAnterior: null,
    categoria: "Corporativo",
    tallas: ["S", "M", "L", "XL", "2XL"],
    showBadge: false,
  },
  {
    id: "20",
    nombre: "Polo Empresarial Bordado",
    precio: 22.0,
    precioAnterior: 26.0,
    categoria: "Corporativo",
    tallas: ["S", "M", "L", "XL"],
    showBadge: true,
    badgeText: "Popular",
  },
  {
    id: "21",
    nombre: "Chaleco de Trabajo",
    precio: 28.0,
    precioAnterior: null,
    categoria: "Corporativo",
    tallas: ["M", "L", "XL", "2XL"],
    showBadge: true,
    badgeText: "Nuevo",
  },
  {
    id: "22",
    nombre: "Uniforme Chef",
    precio: 35.0,
    precioAnterior: null,
    categoria: "Corporativo",
    tallas: ["S", "M", "L", "XL"],
    showBadge: false,
  },
];

export default function EmpresasCatalogPage() {
  return (
    <div>
      <div className="relative bg-purple-900 px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl">
          <span className="text-xs font-semibold tracking-wider text-purple-300 uppercase">
            Catálogo
          </span>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight">
            Empresas
          </h1>
          <p className="mt-2 text-purple-100/70">
            Uniformes corporativos y de servicio
          </p>
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
