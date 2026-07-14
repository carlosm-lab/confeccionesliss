"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const SearchModal = dynamic(
  () =>
    import("@/components/layout/SearchModal").then((mod) => mod.SearchModal),
  { ssr: false }
);

const FavoritesModal = dynamic(
  () =>
    import("@/components/cart/FavoritesModal").then(
      (mod) => mod.FavoritesModal
    ),
  { ssr: false }
);
import { GuestBell } from "@/components/ui/GuestBell";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { clientEnv } from "@/lib/clientEnv";

interface NavLink {
  href: string;
  label: string;
  mobileIcon: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio", mobileIcon: "home" },
  { href: "/catalogo", label: "Catálogo", mobileIcon: "storefront" },
  { href: "/servicios", label: "Servicios", mobileIcon: "design_services" },
  { href: "/empresa", label: "Empresa", mobileIcon: "business" },
  { href: "/contacto", label: "Contacto", mobileIcon: "mail" },
  { href: "/legal", label: "Legal", mobileIcon: "gavel" },
  { href: "/ayuda", label: "Ayuda", mobileIcon: "help" },
];

const SEARCH_PHRASES = [
  "Uniformes de la univo...",
  "Scrubs médicos...",
  "Bordados personalizados...",
  "Pantalones de vestir...",
  "Sublimación deportiva...",
  "Confección a la medida...",
  "Mano de obra...",
];

/* ─── Typewriter visual placeholder (display-only, not an input) ─── */
function TypewriterPlaceholder() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleType = () => {
      const i = loopNum % SEARCH_PHRASES.length;
      const fullText = SEARCH_PHRASES[i];

      setText((current) =>
        isDeleting
          ? fullText.substring(0, current.length - 1)
          : fullText.substring(0, current.length + 1)
      );

      setTypingSpeed(isDeleting ? 30 : 60);

      if (!isDeleting && text === fullText) {
        setTypingSpeed(2000);
        setIsDeleting(true);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(500);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, mounted]);

  return (
    <div
      className="pointer-events-none flex min-w-0 items-center overflow-hidden text-sm whitespace-nowrap text-gray-400"
      aria-hidden="true"
    >
      <span className="truncate">{mounted ? text : "Buscar producto..."}</span>
      {mounted && (
        <span className="bg-primary animate-blink ml-[2px] inline-block h-[18px] w-[1.5px] shrink-0" />
      )}
    </div>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrollVisible, setScrollVisible] = useState(true);

  // Dynamic navbar links calculation for responsive overflow
  const [visibleCount, setVisibleCount] = useState(NAV_LINKS.length);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const navPillsRef = useRef<HTMLDivElement>(null);

  // Swipe-up-to-close for mobile menu
  const [menuDragY, setMenuDragY] = useState(0);
  const [isMenuDragging, setIsMenuDragging] = useState(false);
  const menuTouchStartY = useRef(0);

  const onMenuDragStart = (e: React.TouchEvent) => {
    menuTouchStartY.current = e.touches[0].clientY;
    setIsMenuDragging(true);
  };
  const onMenuDragMove = (e: React.TouchEvent) => {
    const delta = e.touches[0].clientY - menuTouchStartY.current;
    if (delta < 0) setMenuDragY(delta); // solo hacia arriba
  };
  const onMenuDragEnd = () => {
    setIsMenuDragging(false);
    if (menuDragY < -60) {
      setMenuDragY(0);
      closeMenu();
    } else {
      setMenuDragY(0);
    }
  };

  // Contexts
  const { cartCount, setIsCartOpen } = useCart();
  const { favorites } = useFavorites();
  const { user, showAuthModal } = useAuth();
  const { unreadCount } = useNotifications();

  // Guard de hidratación
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  // Valores seguros para SSR
  const safeCartCount = isMounted ? cartCount : 0;
  const safeFavoritesCount = isMounted ? favorites.length : 0;
  const safeUnreadCount = isMounted ? unreadCount : 0;
  const hasIndicator =
    !isMenuOpen &&
    (safeUnreadCount > 0 || safeFavoritesCount > 0 || safeCartCount > 0);

  const isHomeOnly = clientEnv.NEXT_PUBLIC_HOME_ONLY === "true";

  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const navLinks = isHomeOnly
    ? NAV_LINKS.filter((link) => link.href === "/")
    : NAV_LINKS;

  const closeMenu = () => setIsMenuOpen(false);
  const openSearch = () => {
    setIsSearchOpen(true);
    closeMenu();
  };
  const closeSearch = () => setIsSearchOpen(false);

  const handleCartClick = () => {
    closeMenu();
    setIsCartOpen(true);
  };

  const handleFavoritesClick = () => {
    closeMenu();
    setIsFavoritesOpen(true);
  };

  const handleAvatarClick = () => {
    closeMenu();
    if (user) {
      router.push("/cuenta");
    } else {
      showAuthModal("account");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
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
      clearTimeout(readyTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // --- Dynamic responsive navigation logic (hidden progressively from right to left) ---
  useEffect(() => {
    if (typeof window === "undefined" || isHomeOnly) return;

    const calculateVisibleLinks = () => {
      if (window.innerWidth < 768) return;

      const container = navContainerRef.current;
      const pillsContainer = navPillsRef.current;
      if (!container || !pillsContainer) return;

      // Non-negotiable: 24px on each side (double the 12px inter-pill gap)
      const SIDE_MARGIN = 24;

      // ── Batch DOM read: leer todos los anchos de una sola vez ─────────────
      // Esto evita reflows síncronos forzados (layout thrashing) que ocurren
      // cuando se intercalan lecturas y escrituras de propiedades de layout.
      const availableWidth =
        container.getBoundingClientRect().width - SIDE_MARGIN * 2;

      const pillElements = Array.from(pillsContainer.children) as HTMLElement[];

      // Leer todos los anchos en una sola pasada (sin escribir nada al DOM)
      const pillWidths = pillElements.map(
        (el) => el.getBoundingClientRect().width + 12 // +12px inter-pill gap
      );

      // ── Cálculo aritmético puro (cero accesos al DOM) ─────────────────────
      let accumulatedWidth = 0;
      let count = 0;

      for (let i = 0; i < pillWidths.length; i++) {
        if (accumulatedWidth + pillWidths[i] - 12 <= availableWidth) {
          accumulatedWidth += pillWidths[i];
          count++;
        } else {
          break;
        }
      }
      setVisibleCount(count);
    };

    const observer = new ResizeObserver(() => {
      calculateVisibleLinks();
    });

    const container = navContainerRef.current;
    if (container) {
      observer.observe(container);
    }

    // Ejecutar inicialmente
    calculateVisibleLinks();

    return () => {
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, [isHomeOnly, navLinks.length]);

  // Enlaces que se muestran como píldoras en la barra principal (md+)
  const visiblePills = navLinks.slice(0, visibleCount);

  // Enlaces que se ocultan de la barra principal y pasan al menú desplegable para desktop/tablet
  const hiddenPills = navLinks.slice(visibleCount);

  return (
    <>
      {/* Backdrop blur — visible cuando el menu esta abierto */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] sm:bg-black/20"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
      <header
        data-nosnippet
        className={cn(
          "nav-scroll-hide sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md",
          !scrollVisible && "nav-scroll-hidden-top"
        )}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-2.5 px-5 py-[5px] sm:gap-3 md:gap-0 md:px-8 lg:py-[2px]">
          <div className="flex shrink-0 items-center gap-6 lg:gap-10">
            {/* Logo */}
            <Link
              href="/"
              prefetch={false}
              className="flex items-center gap-3"
              onClick={closeMenu}
            >
              <Image
                src="/logo.png"
                alt="Confecciones Liss"
                width={96}
                height={96}
                sizes="48px"
                className="h-12 w-auto"
              />
              {/* Texto del logo — siempre en DOM para SEO; visible en sm+ */}
              <span className="sr-only">
                Confecciones Liss — Uniformes y Scrubs a la medida
              </span>
              <div className="hidden flex-col lg:flex" aria-hidden="true">
                <span className="text-primary font-serif text-base leading-tight font-bold sm:text-lg md:text-xl">
                  Confecciones Liss
                </span>
                <span
                  className="block w-full text-[8px] font-semibold text-gray-500 uppercase sm:text-[9px] md:text-[10px]"
                  style={{
                    textAlign: "justify",
                    textAlignLast: "justify",
                    textJustify: "inter-character",
                  }}
                >
                  LÍDER EN TU DISEÑO
                </span>
              </div>
            </Link>
          </div>

          {/* ── Desktop & Tablet Navigation Pill Bar (md+) ── */}
          {!isHomeOnly && (
            <div
              ref={navContainerRef}
              className="hidden min-w-0 flex-1 items-center md:flex"
            >
              {/* Invisible measure container — ResizeObserver reads pill widths from here */}
              <div
                ref={navPillsRef}
                className="pointer-events-none absolute -z-50 flex gap-3 whitespace-nowrap opacity-0"
                aria-hidden="true"
              >
                {navLinks.map((link) => (
                  <div
                    key={`measure-${link.href}`}
                    className="border-primary/10 text-primary flex h-10 items-center justify-center rounded-full border bg-white px-4 text-sm font-bold whitespace-nowrap shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)]"
                    style={{ width: "120px" }}
                  >
                    {link.label}
                  </div>
                ))}
              </div>

              {/* Non-negotiable 24px left margin (double inter-pill gap of 12px) */}
              <nav className="ml-6 flex gap-3">
                {visiblePills.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      prefetch={false}
                      className={cn(
                        "border-primary/10 text-primary flex h-10 items-center justify-center rounded-full border px-4 text-sm font-bold whitespace-nowrap shadow-[0_4px_12px_-1px_rgba(20,48,103,0.2),0_2px_6px_-1px_rgba(20,48,103,0.15)] transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-3px_rgba(20,48,103,0.3),0_4px_10px_-2px_rgba(20,48,103,0.2)]",
                        isActive
                          ? "bg-primary border-transparent text-white"
                          : "bg-white hover:bg-slate-50"
                      )}
                      style={{ width: "120px" }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          {/* ── Right side: Actions ── */}
          {!isHomeOnly && (
            <div
              ref={menuRef}
              className="relative flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3 md:ml-6 md:flex-none"
            >
              {/* Search bar — full bar (md+) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Abrir buscador"
                className="border-primary/10 hidden cursor-pointer items-center gap-2.5 rounded-full border bg-white px-4 py-2 shadow-[0_4px_12px_-1px_rgba(20,48,103,0.2),0_2px_6px_-1px_rgba(20,48,103,0.15)] transition-all hover:shadow-[0_8px_20px_-3px_rgba(20,48,103,0.3),0_4px_10px_-2px_rgba(20,48,103,0.2)] md:flex"
              >
                <span
                  className="material-symbols-outlined text-primary text-[20px]"
                  aria-hidden="true"
                >
                  search
                </span>
                <span className="w-36 min-w-0 flex-1 overflow-hidden lg:w-44 xl:w-56">
                  <TypewriterPlaceholder />
                </span>
              </button>

              {/* Search bar — full pill expanding on mobile only (below md) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Abrir buscador"
                className="border-primary/10 flex min-w-0 flex-1 cursor-pointer items-center gap-2 rounded-full border bg-white px-3 py-2 shadow-[0_4px_12px_-1px_rgba(20,48,103,0.2),0_2px_6px_-1px_rgba(20,48,103,0.15)] transition-all hover:shadow-[0_8px_20px_-3px_rgba(20,48,103,0.3),0_4px_10px_-2px_rgba(20,48,103,0.2)] md:hidden"
              >
                <span
                  className="material-symbols-outlined text-primary shrink-0 text-[20px]"
                  aria-hidden="true"
                >
                  search
                </span>
                <span className="min-w-0 flex-1 overflow-hidden">
                  <TypewriterPlaceholder />
                </span>
              </button>

              <button
                type="button"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="border-primary/10 text-primary relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-[0_4px_12px_-1px_rgba(20,48,103,0.2),0_2px_6px_-1px_rgba(20,48,103,0.15)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_8px_20px_-3px_rgba(20,48,103,0.3),0_4px_10px_-2px_rgba(20,48,103,0.2)]"
              >
                {hasIndicator && (
                  <span
                    className="bg-primary/20 absolute inset-0 animate-ping rounded-full"
                    aria-hidden="true"
                  />
                )}
                <span
                  className="material-symbols-outlined text-[24px]"
                  aria-hidden="true"
                >
                  {isMenuOpen ? "close" : "menu"}
                </span>
              </button>

              {/* Mobile dropdown menu */}
              {isMenuOpen && (
                <div
                  style={{
                    transform: `translateY(${menuDragY}px)`,
                    transition: isMenuDragging
                      ? "none"
                      : "transform 0.3s cubic-bezier(0.32,0.72,0,1), opacity 0.3s ease",
                    opacity: Math.max(0, 1 + menuDragY / 120),
                  }}
                  className="border-primary/10 animate-in fade-in slide-in-from-top-2 absolute top-[51px] right-0 z-50 w-64 rounded-2xl border bg-white/95 shadow-[0_10px_25px_-5px_rgba(20,48,103,0.15),0_8px_16px_-6px_rgba(20,48,103,0.1)] backdrop-blur-md duration-200 lg:top-12"
                >
                  {/* Dropdown Header — onMouseDown stops propagation so GuestBell and other bubbles
                      don't trigger the click-outside handler that closes the menu */}
                  {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
                  <div
                    role="group"
                    aria-label="Acciones rápidas"
                    className="flex items-center justify-around gap-2 border-b border-gray-100 p-3.5 dark:border-white/5"
                    onMouseDown={(e) => e.stopPropagation()}
                  >
                    {/* Notifications */}
                    {isMounted && <GuestBell />}

                    {/* Cart */}
                    <button
                      type="button"
                      aria-label={`Carrito de compras${safeCartCount > 0 ? ` (${safeCartCount})` : ""}`}
                      onClick={handleCartClick}
                      className="border-primary/10 text-primary relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 dark:bg-slate-800"
                    >
                      <span
                        className="material-symbols-outlined text-[22px]"
                        aria-hidden="true"
                      >
                        shopping_cart
                      </span>
                      {safeCartCount > 0 && (
                        <span className="bg-primary absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black text-white ring-2 ring-white">
                          {safeCartCount > 99 ? "99+" : safeCartCount}
                        </span>
                      )}
                    </button>

                    {/* Favorites */}
                    <button
                      type="button"
                      aria-label={`Favoritos${safeFavoritesCount > 0 ? ` (${safeFavoritesCount})` : ""}`}
                      onClick={handleFavoritesClick}
                      className="border-primary/10 text-primary relative flex size-10 cursor-pointer items-center justify-center rounded-full border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 dark:bg-slate-800"
                    >
                      <span
                        className="material-symbols-outlined text-[22px]"
                        aria-hidden="true"
                        style={{
                          fontVariationSettings:
                            safeFavoritesCount > 0 ? "'FILL' 1" : "'FILL' 0",
                        }}
                      >
                        favorite
                      </span>
                      {safeFavoritesCount > 0 && (
                        <span className="bg-primary absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[10px] font-black text-white ring-2 ring-white">
                          {safeFavoritesCount > 99 ? "99+" : safeFavoritesCount}
                        </span>
                      )}
                    </button>

                    {/* User Avatar */}
                    <button
                      type="button"
                      aria-label={
                        isMounted && user
                          ? `Mi cuenta (${user.email})`
                          : "Iniciar sesión"
                      }
                      onClick={handleAvatarClick}
                      className="border-primary/10 flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-90 dark:bg-slate-800"
                    >
                      {isMounted && user?.user_metadata?.avatar_url ? (
                        <Image
                          src={user.user_metadata.avatar_url as string}
                          alt="Avatar"
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                          referrerPolicy="no-referrer"
                          quality={70}
                        />
                      ) : (
                        <span
                          className="material-symbols-outlined text-primary text-[24px]"
                          aria-hidden="true"
                        >
                          {isMounted && user ? "account_circle" : "person"}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Nav links */}
                  <ul className="space-y-1 p-4">
                    {/* Para Mobile (< md): Muestra todos los enlaces correspondientes */}
                    <div className="space-y-1 md:hidden">
                      {navLinks.map((link) => {
                        const isActive =
                          link.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(link.href);

                        const isOnBottomBar = [
                          "/",
                          "/catalogo",
                          "/servicios",
                          "/empresa",
                          "/contacto",
                        ].includes(link.href);

                        return (
                          <li
                            key={link.href}
                            className={cn(isOnBottomBar && "hidden sm:block")}
                          >
                            <Link
                              href={link.href}
                              onClick={closeMenu}
                              prefetch={false}
                              className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                                isActive
                                  ? "bg-primary text-on-primary shadow-sm"
                                  : "hover:bg-primary/5 hover:text-primary text-gray-700"
                              )}
                            >
                              <span
                                className="material-symbols-outlined text-[18px]"
                                aria-hidden="true"
                              >
                                {link.mobileIcon}
                              </span>
                              {link.label}
                            </Link>
                          </li>
                        );
                      })}
                    </div>

                    {/* Para Tablet/Desktop (>= md): Muestra únicamente los enlaces que están ocultos del menú principal (hiddenPills) */}
                    <div className="hidden space-y-1 md:block">
                      {hiddenPills.map((link) => {
                        const isActive =
                          link.href === "/"
                            ? pathname === "/"
                            : pathname.startsWith(link.href);

                        return (
                          <li key={link.href}>
                            <Link
                              href={link.href}
                              onClick={closeMenu}
                              prefetch={false}
                              className={cn(
                                "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all",
                                isActive
                                  ? "bg-primary text-on-primary shadow-sm"
                                  : "hover:bg-primary/5 hover:text-primary text-gray-700"
                              )}
                            >
                              <span
                                className="material-symbols-outlined text-[18px]"
                                aria-hidden="true"
                              >
                                {link.mobileIcon}
                              </span>
                              {link.label}
                            </Link>
                          </li>
                        );
                      })}
                    </div>

                    {/* Divider */}
                    <li className="my-2 border-t border-gray-100" />
                    {/* Links Page */}
                    <li>
                      <Link
                        href="/links"
                        onClick={closeMenu}
                        className={cn(
                          "hover:bg-primary/5 hover:text-primary flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-all",
                          pathname === "/links" &&
                            "bg-primary text-on-primary shadow-sm"
                        )}
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          aria-hidden="true"
                        >
                          alternate_email
                        </span>
                        Redes Sociales
                      </Link>
                    </li>
                    {/* Updates Page */}
                    <li>
                      <Link
                        href="/updates"
                        onClick={closeMenu}
                        className={cn(
                          "hover:bg-primary/5 hover:text-primary flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 transition-all",
                          pathname === "/updates" &&
                            "bg-primary text-on-primary shadow-sm"
                        )}
                      >
                        <span
                          className="material-symbols-outlined text-[18px]"
                          aria-hidden="true"
                        >
                          update
                        </span>
                        Actualizaciones
                      </Link>
                    </li>
                  </ul>

                  {/* Drag handle — bottom, only mobile, touch-none prevents page scroll */}
                  <div
                    className="flex touch-none justify-center pt-1 pb-3 sm:hidden"
                    onTouchStart={onMenuDragStart}
                    onTouchMove={onMenuDragMove}
                    onTouchEnd={onMenuDragEnd}
                  >
                    <div className="h-1 w-10 rounded-full bg-slate-300" />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── Global Search Modal ── */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />

      {/* ── Favorites Modal ── */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
      />
    </>
  );
}
