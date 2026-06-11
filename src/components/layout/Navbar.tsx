"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchModal } from "@/components/layout/SearchModal";
import { env } from "@/env";

interface NavLink {
  href: string;
  label: string;
  mobileIcon: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Inicio", mobileIcon: "home" },
  { href: "/catalogo", label: "Catálogo", mobileIcon: "storefront" },
  { href: "/servicios", label: "Servicios", mobileIcon: "design_services" },
  { href: "/contacto", label: "Contacto", mobileIcon: "mail" },
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
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrollVisible, setScrollVisible] = useState(true);
  /*
   * lastScrollY: initialized to window.scrollY so browser scroll-restoration
   * on fresh load doesn't falsely trigger "scrolling down" and hide the bar.
   */
  const lastScrollY = useRef(
    typeof window !== "undefined" ? window.scrollY : 0
  );

  const isHomeOnly = env.NEXT_PUBLIC_HOME_ONLY === "true";
  const navLinks = isHomeOnly
    ? NAV_LINKS.filter((link) => link.href === "/")
    : NAV_LINKS;

  const closeMenu = () => setIsMenuOpen(false);
  const openSearch = () => {
    setIsSearchOpen(true);
    closeMenu();
  };
  const closeSearch = () => setIsSearchOpen(false);

  useEffect(() => {
    // ── Hydration heartbeat ───────────────────────────────────────────────────
    // Signals to the inline watchdog script in layout.tsx that React has mounted
    // successfully. This prevents the watchdog from triggering a false-positive
    // reload on a healthy page.
    try {
      sessionStorage.setItem("__liss_alive__", "1");
      localStorage.setItem("__liss_was_alive__", "1");
    } catch (_) {}

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
    /*
     * INITIALISATION WINDOW & SCROLL HYSTERESIS
     * ─────────────────────────────────────────
     * 1. 1500 ms ready-state delay to absorb browser session restore / smooth scroll restoration
     *    and Next.js hydration completely.
     * 2. Jump guard: single-event scroll jumps > 100px reset baseline and ensure bars stay visible.
     * 3. 10px hysteresis threshold to filter out tiny adjustments & layout shift jitter.
     */
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

      // Safe bounds near the top: always keep visible
      if (currentScrollY <= 10) {
        setScrollVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      // Detect browser scroll restoration or page jumps (> 100px in one frame)
      if (Math.abs(delta) > 100) {
        lastScrollY.current = currentScrollY;
        setScrollVisible(true);
        return;
      }

      // 10px hysteresis threshold to filter out tiny adjustments & layout shift jitter
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

  return (
    <>
      <header
        className={cn(
          "nav-scroll-hide sticky top-0 z-50 bg-white/90 px-8 shadow-sm backdrop-blur-md",
          !scrollVisible && "nav-scroll-hidden-top"
        )}
      >
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between py-[2px]">
          <div className="flex items-center gap-6 lg:gap-10">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3"
              onClick={closeMenu}
            >
              <Image
                src="/logo.png"
                alt="Confecciones Liss Logo"
                width={180}
                height={180}
                className="h-12 w-auto"
                priority
              />
              <div className="hidden flex-col sm:flex">
                <span className="text-primary font-serif text-base leading-tight font-bold sm:text-lg md:text-xl">
                  Confecciones Liss
                </span>
                <span className="sr-only">Líder en tu diseño</span>
                <span
                  className="block w-full text-[8px] font-semibold text-gray-500 uppercase sm:text-[9px] md:text-[10px]"
                  style={{
                    textAlign: "justify",
                    textAlignLast: "justify",
                    textJustify: "inter-character",
                  }}
                  aria-hidden="true"
                >
                  LÍDER EN TU DISEÑO
                </span>
              </div>
            </Link>
          </div>

          {/* ── Right side: Actions ── */}
          {!isHomeOnly && (
            <div
              ref={menuRef}
              className="relative flex items-center gap-2.5 sm:gap-3"
            >
              {/* Search bar trigger — full bar (md+, 768px+) */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Abrir buscador"
                className="border-primary/10 hidden cursor-pointer items-center gap-2.5 rounded-full border bg-white px-4 py-2 shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)] md:flex"
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

              {/* Search bar trigger — icon only (all mobile up to md). Visible on mobile now that profile is in bottom nav */}
              <button
                type="button"
                onClick={openSearch}
                aria-label="Abrir buscador"
                className="border-primary/10 flex size-10 items-center justify-center rounded-xl border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)] md:hidden"
              >
                <span
                  className="material-symbols-outlined text-primary text-[22px]"
                  aria-hidden="true"
                >
                  search
                </span>
              </button>

              {/* Favorites — visible on all sizes */}
              <button
                aria-label="Favoritos"
                className="border-primary/10 text-primary flex size-10 items-center justify-center rounded-xl border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  aria-hidden="true"
                >
                  favorite_border
                </span>
              </button>

              {/* Cart — hidden on mobile (bottom nav handles it) */}
              <button
                aria-label="Carrito de compras"
                className="border-primary/10 text-primary hidden size-10 items-center justify-center rounded-xl border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)] sm:flex"
              >
                <span
                  className="material-symbols-outlined text-[22px]"
                  aria-hidden="true"
                >
                  shopping_cart
                </span>
              </button>

              {/* Avatar — hidden on mobile (profile moved to bottom nav) */}
              <button
                aria-label="Mi cuenta"
                className="border-primary/10 hidden size-10 items-center justify-center overflow-hidden rounded-xl border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)] sm:flex"
              >
                <span
                  className="material-symbols-outlined text-primary text-[24px]"
                  aria-hidden="true"
                >
                  person
                </span>
              </button>

              {/* Menu Button — visible on all sizes */}
              <button
                type="button"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="border-primary/10 text-primary flex size-10 items-center justify-center rounded-xl border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
              >
                <span
                  className="material-symbols-outlined text-[24px]"
                  aria-hidden="true"
                >
                  {isMenuOpen ? "close" : "menu"}
                </span>
              </button>

              {/* Desktop dropdown menu */}
              {isMenuOpen && (
                <div className="border-primary/10 animate-in fade-in slide-in-from-top-2 absolute top-12 right-0 z-50 w-64 rounded-2xl border bg-white/95 p-4 shadow-[0_10px_25px_-5px_rgba(20,48,103,0.15),0_8px_16px_-6px_rgba(20,48,103,0.1)] backdrop-blur-md duration-200">
                  <ul className="space-y-1">
                    {navLinks.map((link) => {
                      const isActive =
                        link.href === "/"
                          ? pathname === "/"
                          : pathname.startsWith(link.href);

                      return (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={closeMenu}
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
                        Mis Enlaces / Redes
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* ── Global Search Modal ── */}
      <SearchModal isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
