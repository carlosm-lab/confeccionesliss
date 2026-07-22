"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clientEnv } from "@/lib/clientEnv";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const ITEMS = [
  { href: "/", icon: "home", label: "Inicio" },
  { href: "/catalogo", icon: "storefront", label: "Catálogo" },
  { href: "/servicios", icon: "design_services", label: "Servicios" },
  { href: "/empresa", icon: "business", label: "Empresa" },
  { href: "/contacto", icon: "mail", label: "Contacto" },
] as const;

export function MobileBottomNav() {
  const pathname = usePathname();
  const [scrollVisible, setScrollVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isMounted, setIsMounted] = useState(false);
  const isHomeOnly = clientEnv.NEXT_PUBLIC_HOME_ONLY === "true";

  const { cartCount, setIsCartOpen } = useCart();
  const { user, showAuthModal } = useAuth();

  const visibleItems = ITEMS;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    let ready = false;
    lastScrollY.current = window.scrollY;

    const readyTimer = setTimeout(() => {
      lastScrollY.current = window.scrollY;
      ready = true;
    }, 1500);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ready) {
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY <= 10) {
        setScrollVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      if (Math.abs(delta) > 100) {
        lastScrollY.current = currentScrollY;
        setScrollVisible(true);
        return;
      }

      if (delta > 10) {
        setScrollVisible(false);
        lastScrollY.current = currentScrollY;
      } else if (delta < -10) {
        setScrollVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      readyTimer && clearTimeout(readyTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isHomeOnly) return null;

  return (
    <nav
      data-mobile-bottom-nav
      className={cn(
        "nav-scroll-hide pb-safe fixed right-0 bottom-0 left-0 z-50 border-t border-slate-200 bg-white/90 shadow-[0_-1px_3px_rgba(0,0,0,0.05)] backdrop-blur-md select-none sm:hidden dark:border-white/5 dark:bg-slate-900/85",
        !scrollVisible && "nav-scroll-hidden-bottom"
      )}
      aria-label="Navegación principal móvil"
    >
      <div className="flex h-16 items-center justify-around">
        {visibleItems.map((item) => {
          const isActive =
            item.href === "/"
              ? !pathname || pathname === "/" || pathname === ""
              : pathname?.startsWith(item.href);

          const isCartTab = (item.href as string) === "/carrito";
          const isProfileTab = (item.href as string) === "/cuenta";

          const handleTabClick = (e: React.MouseEvent) => {
            if (isCartTab) {
              e.preventDefault();
              setIsCartOpen(true);
            } else if (isProfileTab && !user) {
              e.preventDefault();
              showAuthModal("account");
            }
          };

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleTabClick}
              prefetch={false}
              className={cn(
                "relative flex h-full w-full flex-col items-center justify-center gap-0.5 transition-colors",
                isActive
                  ? "text-primary font-bold"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              )}
            >
              <span
                className="material-symbols-outlined"
                style={{
                  fontSize: "24px",
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {item.icon}
              </span>
              {isCartTab && isMounted && cartCount > 0 && (
                <span className="bg-primary absolute top-1.5 right-1/2 flex h-4 w-4 translate-x-4 items-center justify-center rounded-full text-[8px] font-bold text-white">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
