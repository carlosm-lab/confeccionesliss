"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/context/useAppStore";

export function Navbar() {
  const pathname = usePathname();
  const cartItems = useAppStore((state) => state.cartItems);
  const cartCount = cartItems.reduce((acc, item) => acc + item.cantidad, 0);

  // A helper to apply active state styling correctly
  const getNavClasses = (path: string) => {
    // Exact match for Home, startsWith for others
    const isActive =
      path === "/" ? pathname === "/" : pathname.startsWith(path);

    if (isActive) {
      return "font-bold border-b-2 border-primary pb-1 text-xs uppercase tracking-widest hover:opacity-80 transition-opacity";
    }
    return "text-secondary font-medium hover:text-primary text-xs uppercase tracking-widest hover:opacity-80 transition-opacity";
  };

  return (
    <header className="text-primary sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            data-icon="content_cut"
          >
            content_cut
          </span>
          <span className="font-serif text-2xl font-bold italic">
            Confecciones Liss
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden gap-8 md:flex">
          <Link
            href="/"
            className={getNavClasses("/")}
            aria-current={pathname === "/" ? "page" : undefined}
          >
            Inicio
          </Link>
          <Link
            href="/catalogo/salud"
            className={getNavClasses("/catalogo")}
            aria-current={pathname.startsWith("/catalogo") ? "page" : undefined}
          >
            Catálogo
          </Link>
          <Link
            href="/novedades"
            className={getNavClasses("/novedades")}
            aria-current={
              pathname.startsWith("/novedades") ? "page" : undefined
            }
          >
            Novedades
          </Link>
          <Link
            href="/blog"
            className={getNavClasses("/blog")}
            aria-current={pathname.startsWith("/blog") ? "page" : undefined}
          >
            Blog
          </Link>
          <Link
            href="/nosotros"
            className={getNavClasses("/nosotros")}
            aria-current={pathname.startsWith("/nosotros") ? "page" : undefined}
          >
            Nosotros
          </Link>
          <Link
            href="/contacto"
            className={getNavClasses("/contacto")}
            aria-current={pathname.startsWith("/contacto") ? "page" : undefined}
          >
            Contacto
          </Link>
        </nav>

        {/* Trailing Icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Buscar productos"
            className="transition-opacity hover:opacity-80"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
          <Link
            href="/carrito"
            aria-label={`Ver carrito de compras, ${cartCount} productos`}
            className="relative transition-opacity hover:opacity-80"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              shopping_cart
            </span>
            {cartCount > 0 && (
              <span className="bg-tertiary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            aria-label="Ver notificaciones"
            className="relative transition-opacity hover:opacity-80"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              notifications
            </span>
            <span className="bg-tertiary absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] text-white">
              3
            </span>
          </button>
          <Link
            href="/cuenta"
            aria-label="Ver mi cuenta"
            className="transition-opacity hover:opacity-80"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              account_circle
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
