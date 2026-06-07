"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SearchDropdown } from "@/components/catalogo/SearchDropdown";

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

function TypewriterSearch({
  className,
  onMenuClose,
}: {
  className?: string;
  onMenuClose?: () => void;
}) {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [mounted, setMounted] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Derived state: dropdown visibility based on input length + focus
  const showDropdown = useMemo(
    () => inputValue.length >= 2 && isFocused,
    [inputValue, isFocused]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!mounted || isFocused || inputValue) return;

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
  }, [text, isDeleting, loopNum, typingSpeed, mounted, isFocused, inputValue]);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsFocused(false);
    setActiveIndex(-1);
    onMenuClose?.();
  }, [onMenuClose]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!showDropdown) {
        if (e.key === "Enter" && inputValue.trim()) {
          e.preventDefault();
          router.push(`/catalogo?q=${encodeURIComponent(inputValue.trim())}`);
          closeDropdown();
          inputRef.current?.blur();
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => prev + 1);
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) => Math.max(-1, prev - 1));
          break;
        case "Enter": {
          e.preventDefault();
          if (activeIndex >= 0) {
            // Click the active item
            const activeEl = document.getElementById(
              `search-result-${activeIndex}`
            );
            if (activeEl) {
              activeEl.click();
            }
          } else if (inputValue.trim()) {
            router.push(`/catalogo?q=${encodeURIComponent(inputValue.trim())}`);
          }
          closeDropdown();
          inputRef.current?.blur();
          break;
        }
        case "Escape":
          e.preventDefault();
          closeDropdown();
          inputRef.current?.blur();
          break;
      }
    },
    [showDropdown, activeIndex, inputValue, router, closeDropdown]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (inputValue.trim()) {
        router.push(`/catalogo?q=${encodeURIComponent(inputValue.trim())}`);
        closeDropdown();
        inputRef.current?.blur();
      }
    },
    [inputValue, router, closeDropdown]
  );

  return (
    <form
      className={cn("relative flex items-center", className)}
      ref={containerRef}
      onSubmit={handleSubmit}
      role="search"
      aria-label="Buscar productos"
    >
      <input
        ref={inputRef}
        type="search"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          setActiveIndex(-1);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // Delay to allow click on dropdown items
          setTimeout(() => setIsFocused(false), 200);
        }}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent text-sm text-gray-700 outline-none"
        aria-label="Buscar en el sitio"
        role="combobox"
        aria-expanded={showDropdown}
        aria-controls="search-results-listbox"
        aria-activedescendant={
          activeIndex >= 0 ? `search-result-${activeIndex}` : undefined
        }
        aria-autocomplete="list"
      />
      {/* Custom Placeholder */}
      {!inputValue && (
        <div
          className="pointer-events-none absolute top-1/2 left-0 flex -translate-y-1/2 items-center text-sm text-gray-400"
          aria-hidden="true"
        >
          {mounted ? text : "Buscar producto..."}
          {mounted && !isFocused && (
            <span className="bg-primary animate-blink ml-[2px] inline-block h-[18px] w-[1.5px]" />
          )}
        </div>
      )}

      {/* Search Dropdown */}
      <SearchDropdown
        query={inputValue}
        isOpen={showDropdown}
        onClose={closeDropdown}
        activeIndex={activeIndex}
      />
    </form>
  );
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 py-[2px] md:px-8">
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
            <div className="flex flex-col">
              <span className="text-primary font-serif text-lg leading-tight font-bold md:text-xl">
                Confecciones Liss
              </span>
              <span className="sr-only">Líder en tu diseño</span>
              <span
                className="text-[10px] font-medium tracking-[0.35em] text-gray-500 uppercase"
                aria-hidden="true"
              >
                LÍDER EN TU DISEÑO
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden items-center gap-1 lg:flex"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-on-primary shadow-sm"
                      : "hover:bg-primary/5 hover:text-primary text-gray-700"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* ── Right side: Actions ── */}
        <div className="hidden items-center gap-3 lg:flex">
          {/* Search bar */}
          <div className="border-primary/10 flex items-center gap-2.5 rounded-full border bg-white px-4 py-2 shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              aria-hidden="true"
            >
              search
            </span>
            <TypewriterSearch className="w-44 xl:w-56" />
          </div>

          {/* Favorites */}
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

          {/* Cart */}
          <button
            aria-label="Carrito de compras"
            className="border-primary/10 text-primary flex size-10 items-center justify-center rounded-xl border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-80 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
          >
            <span
              className="material-symbols-outlined text-[22px]"
              aria-hidden="true"
            >
              shopping_cart
            </span>
          </button>

          {/* Avatar */}
          <button
            aria-label="Mi cuenta"
            className="border-primary/10 flex size-10 items-center justify-center overflow-hidden rounded-xl border bg-white shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)] transition-all hover:-translate-y-0.5 hover:opacity-90 hover:shadow-[0_4px_12px_-2px_rgba(20,48,103,0.15),0_2px_6px_-1px_rgba(20,48,103,0.1)]"
          >
            <span
              className="material-symbols-outlined text-primary text-[24px]"
              aria-hidden="true"
            >
              person
            </span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          className="text-primary flex items-center lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            {isMenuOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          className="border-t border-gray-100 bg-white px-5 py-4 lg:hidden"
          aria-label="Navegación móvil"
        >
          {/* Search mobile */}
          <div className="border-primary/10 mb-4 flex items-center gap-2.5 rounded-full border bg-white px-4 py-2.5 shadow-[0_2px_8px_-2px_rgba(20,48,103,0.12),0_1px_4px_-1px_rgba(20,48,103,0.08)]">
            <span
              className="material-symbols-outlined text-primary text-[20px]"
              aria-hidden="true"
            >
              search
            </span>
            <TypewriterSearch className="w-full" onMenuClose={closeMenu} />
          </div>

          <ul className="space-y-1">
            {NAV_LINKS.map((link) => {
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
                      "flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition-colors",
                      isActive
                        ? "bg-primary text-on-primary shadow-sm"
                        : "text-gray-700 hover:bg-gray-50"
                    )}
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      aria-hidden="true"
                    >
                      {link.mobileIcon}
                    </span>
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile action row */}
          <div className="mt-4 flex items-center justify-around border-t border-gray-100 pt-4">
            <button
              aria-label="Favoritos"
              className="flex flex-col items-center gap-1 text-gray-500"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                aria-hidden="true"
              >
                favorite_border
              </span>
              <span className="text-[10px] font-medium">Favoritos</span>
            </button>
            <button
              aria-label="Carrito"
              className="flex flex-col items-center gap-1 text-gray-500"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                aria-hidden="true"
              >
                shopping_cart
              </span>
              <span className="text-[10px] font-medium">Carrito</span>
            </button>
            <button
              aria-label="Mi cuenta"
              className="flex flex-col items-center gap-1 text-gray-500"
            >
              <span
                className="material-symbols-outlined text-[22px]"
                aria-hidden="true"
              >
                person
              </span>
              <span className="text-[10px] font-medium">Cuenta</span>
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
