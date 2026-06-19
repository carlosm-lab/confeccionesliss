"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";

// Nota: metadata debe ir en un Server Component wrapper o en el layout.
// Esta página es un Client Component, por lo que usa el metadata de layout.

export default function CarritoPage() {
  const { cartItems, cartTotal, setIsCartOpen, removeFromCart } = useCart();

  // Guard de hidratación: cartItems viene de localStorage.
  // En SSR el servidor siempre ve [] (ver CartContext línea 151).
  // Sin este guard, React lanza hydration mismatch cuando el carrito
  // tiene items (el servidor renderiza la rama "vacío", el cliente la
  // rama "con items"). Patrón idéntico al usado en Navbar.tsx L110-114.
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional hydration guard (same pattern as Navbar.tsx L112)
    setIsMounted(true);
  }, []);

  if (!isMounted || cartItems.length === 0) {
    return (
      <section className="px-5 pt-16 pb-20 md:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-screen-2xl flex-col items-center justify-center text-center">
          {/* Icon */}
          <div
            className="animate-fade-in-up bg-primary/10 mb-8 flex h-24 w-24 items-center justify-center rounded-full"
            style={{ animationDelay: "100ms" }}
          >
            <span
              className="material-symbols-outlined text-primary text-5xl"
              style={{ fontVariationSettings: "'FILL' 0" }}
              aria-hidden="true"
            >
              shopping_cart
            </span>
          </div>

          <h1
            className="animate-fade-in-up text-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl"
            style={{ animationDelay: "200ms" }}
          >
            Tu carrito está vacío
          </h1>
          <p
            className="animate-fade-in-up text-on-surface-variant mb-10 max-w-md text-base leading-relaxed"
            style={{ animationDelay: "300ms" }}
          >
            Explora el catálogo y agrega los productos que te gusten.
          </p>

          <div
            className="animate-fade-in-up flex w-full max-w-xs flex-col gap-4 sm:max-w-sm"
            style={{ animationDelay: "350ms" }}
          >
            <Link
              href="/catalogo"
              className="border-primary text-primary hover:bg-primary/5 flex items-center justify-center gap-2 rounded-xl border-2 px-8 py-4 text-base font-semibold transition active:scale-[0.97]"
            >
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                storefront
              </span>
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 pt-8 pb-24 md:px-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-primary mb-6 font-serif text-3xl font-bold">
          Tu Carrito
        </h1>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <Link
                href={
                  item.product.slug ? `/catalogo/${item.product.slug}` : "#"
                }
                className="aspect-square w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50"
              >
                <Image
                  src={
                    item.product.image_path ||
                    item.product.images?.[0] ||
                    "https://placehold.co/80x80?text=?"
                  }
                  alt={item.product.name}
                  width={64}
                  height={64}
                  className="h-full w-full object-cover"
                  unoptimized
                />
              </Link>
              <div className="flex flex-1 flex-col">
                <p className="line-clamp-1 font-bold text-slate-900">
                  {item.product.name}
                </p>
                <p className="text-primary text-sm font-semibold">
                  {formatPrice(item.product.price)} × {item.quantity}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 transition-colors hover:text-red-500"
                aria-label="Eliminar"
              >
                <span className="material-symbols-outlined text-[20px]">
                  delete
                </span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-semibold text-slate-700">
              Total estimado:
            </span>
            <span className="text-primary text-2xl font-black">
              {formatPrice(cartTotal)}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(true)}
            className="bg-primary flex w-full items-center justify-center gap-2 rounded-xl py-4 font-bold text-white shadow-md transition hover:opacity-90 active:scale-[0.97]"
          >
            <span className="material-symbols-outlined">chat</span>
            Pedir por WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
}
