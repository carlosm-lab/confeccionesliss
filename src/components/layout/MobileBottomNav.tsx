"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { env } from "@/env";

interface BottomNavItem {
  href: string;
  label: string;
  icon: string;
  isSearch?: boolean;
}

const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { href: "/", label: "Inicio", icon: "home" },
  { href: "/catalogo", label: "Catálogo", icon: "storefront" },
  { href: "/buscar", label: "Buscar", icon: "search", isSearch: true },
  { href: "/contacto", label: "Contacto", icon: "mail" },
  { href: "/carrito", label: "Carrito", icon: "shopping_cart" },
];

interface MobileBottomNavProps {
  onSearchOpen?: () => void;
}

export function MobileBottomNav({ onSearchOpen }: MobileBottomNavProps) {
  const pathname = usePathname();
  const isHomeOnly = env.NEXT_PUBLIC_HOME_ONLY === "true";

  if (isHomeOnly) return null;

  return (
    <nav
      className="fixed right-0 bottom-0 left-0 z-50 border-t border-gray-100 bg-white/95 backdrop-blur-md sm:hidden"
      aria-label="Navegación principal móvil"
    >
      <ul className="mx-auto flex max-w-screen-sm items-center justify-around px-2 py-1">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = item.isSearch
            ? false
            : item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          if (item.isSearch) {
            return (
              <li key="search" className="flex-1">
                <button
                  type="button"
                  onClick={onSearchOpen}
                  aria-label="Abrir buscador"
                  className="flex w-full flex-col items-center gap-0.5 px-2 py-2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {/* Search bubble highlight */}
                  <span className="bg-primary flex size-10 items-center justify-center rounded-full shadow-[0_4px_14px_-2px_rgba(20,48,103,0.35)]">
                    <span
                      className="material-symbols-outlined text-on-primary text-[22px]"
                      aria-hidden="true"
                    >
                      search
                    </span>
                  </span>
                  <span className="text-primary text-[10px] font-semibold">
                    {item.label}
                  </span>
                </button>
              </li>
            );
          }

          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-2 py-2 text-[10px] font-medium transition-colors",
                  isActive
                    ? "text-primary"
                    : "text-gray-400 hover:text-gray-600"
                )}
              >
                <span
                  className={cn(
                    "material-symbols-outlined text-[24px] transition-all",
                    isActive && "scale-110"
                  )}
                  aria-hidden="true"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
                {isActive && (
                  <span className="bg-primary mt-0.5 h-[3px] w-4 rounded-full" />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
