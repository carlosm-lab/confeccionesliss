"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavChild {
  href: string;
  label: string;
  icon: string;
}

interface NavLink {
  href: string;
  label: string;
  children?: NavChild[];
}

const NAV_LINKS: NavLink[] = [
  {
    href: "/catalogo",
    label: "Catálogo",
    children: [
      {
        href: "/catalogo/salud",
        label: "Sector Salud",
        icon: "health_and_safety",
      },
      {
        href: "/catalogo/universitario",
        label: "Universitario",
        icon: "school",
      },
      { href: "/catalogo/escolar", label: "Escolar", icon: "domain" },
      {
        href: "/catalogo/corporativo",
        label: "Corporativo",
        icon: "business_center",
      },
    ],
  },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(
    null
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close all menus when navigating
  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenMobileSection(null);
    setOpenDropdown(null);
  };

  return (
    <header className="text-primary sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 py-[2px] md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Confecciones Liss Logo"
            width={180}
            height={180}
            className="h-12 w-auto"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Navegación principal"
          ref={dropdownRef}
        >
          {NAV_LINKS.map((link) =>
            link.children ? (
              <div key={link.href} className="relative">
                <button
                  type="button"
                  onClick={() =>
                    setOpenDropdown(
                      openDropdown === link.label ? null : link.label
                    )
                  }
                  aria-expanded={openDropdown === link.label}
                  aria-haspopup="true"
                  className={cn(
                    "hover:bg-primary/5 hover:text-primary flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    pathname.startsWith(link.href)
                      ? "text-primary bg-primary/5"
                      : "text-gray-700"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "material-symbols-outlined text-xs transition-transform",
                      openDropdown === link.label && "rotate-180"
                    )}
                    aria-hidden="true"
                  >
                    expand_more
                  </span>
                </button>
                {openDropdown === link.label && (
                  <div
                    className="absolute top-full left-0 mt-1 w-56 rounded-xl border border-gray-100 bg-white py-2 shadow-lg"
                    role="menu"
                  >
                    <Link
                      href={link.href}
                      className="hover:bg-primary/5 hover:text-primary flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 transition-colors"
                      role="menuitem"
                      onClick={closeAll}
                    >
                      <span
                        className="material-symbols-outlined text-primary text-lg"
                        aria-hidden="true"
                      >
                        grid_view
                      </span>
                      Ver todo
                    </Link>
                    <div className="mx-4 my-1 border-t border-gray-100" />
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={cn(
                          "hover:bg-primary/5 hover:text-primary flex items-center gap-3 px-4 py-2.5 text-sm transition-colors",
                          pathname === child.href
                            ? "text-primary bg-primary/5 font-medium"
                            : "text-gray-700"
                        )}
                        role="menuitem"
                        onClick={closeAll}
                      >
                        <span
                          className="material-symbols-outlined text-primary text-lg"
                          aria-hidden="true"
                        >
                          {child.icon}
                        </span>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "hover:bg-primary/5 hover:text-primary rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-primary bg-primary/5"
                    : "text-gray-700"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        {/* Trailing Icons */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Buscar productos"
            className="hidden transition-opacity hover:opacity-80 md:block"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
            className="flex items-center md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {isMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav
          className="border-t border-gray-100 bg-white px-5 py-4 md:hidden"
          aria-label="Navegación móvil"
        >
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                {link.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMobileSection(
                          openMobileSection === link.label ? null : link.label
                        )
                      }
                      aria-expanded={openMobileSection === link.label}
                      className="text-primary flex w-full items-center justify-between rounded-md px-3 py-3 text-sm font-semibold"
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-sm"
                          aria-hidden="true"
                        >
                          storefront
                        </span>
                        {link.label}
                      </span>
                      <span
                        className={cn(
                          "material-symbols-outlined text-sm transition-transform",
                          openMobileSection === link.label && "rotate-180"
                        )}
                        aria-hidden="true"
                      >
                        expand_more
                      </span>
                    </button>
                    {openMobileSection === link.label && (
                      <ul className="ml-6 space-y-1 border-l-2 border-gray-100 pl-3">
                        <li>
                          <Link
                            href={link.href}
                            onClick={closeAll}
                            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:text-gray-900"
                          >
                            <span
                              className="material-symbols-outlined text-sm"
                              aria-hidden="true"
                            >
                              grid_view
                            </span>
                            Ver todo
                          </Link>
                        </li>
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={closeAll}
                              className={cn(
                                "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
                                pathname === child.href
                                  ? "text-primary font-medium"
                                  : "text-gray-600 hover:text-gray-900"
                              )}
                            >
                              <span
                                className="material-symbols-outlined text-sm"
                                aria-hidden="true"
                              >
                                {child.icon}
                              </span>
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    onClick={closeAll}
                    className="text-primary flex items-center gap-2 rounded-md px-3 py-3 text-sm font-semibold"
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      aria-hidden="true"
                    >
                      mail
                    </span>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
