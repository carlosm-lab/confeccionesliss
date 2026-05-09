"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";

interface NavChild {
  href: string;
  label: string;
  icon: string;
}

interface NavLink {
  href: string;
  label: string;
  mobileIcon?: string;
  children?: NavChild[];
}

const NAV_LINKS: NavLink[] = [
  {
    href: "/catalogo",
    label: "Catálogo",
    mobileIcon: "storefront",
    children: [
      {
        href: "/catalogo/salud",
        label: "Scrubs Médicos",
        icon: "health_and_safety",
      },
      {
        href: "/catalogo/universitario",
        label: "Universitarios",
        icon: "school",
      },
      { href: "/catalogo/escolar", label: "Escolares", icon: "domain" },
      {
        href: "/catalogo/corporativo",
        label: "Corporativos",
        icon: "business_center",
      },
    ],
  },
  {
    href: "/servicios",
    label: "Servicios",
    mobileIcon: "design_services",
    children: [
      {
        href: "/servicios/confeccion-a-medida",
        label: "Confección a la Medida",
        icon: "content_cut",
      },
      {
        href: "/servicios/mano-de-obra",
        label: "Mano de Obra",
        icon: "construction",
      },
      {
        href: "/servicios/bordados",
        label: "Bordados y Personalización",
        icon: "draw",
      },
      {
        href: "/servicios/sublimacion",
        label: "Sublimación Deportiva",
        icon: "palette",
      },
    ],
  },
  { href: "/contacto", label: "Contacto", mobileIcon: "mail" },
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

  const closeAll = () => {
    setIsMenuOpen(false);
    setOpenMobileSection(null);
    setOpenDropdown(null);
  };

  return (
    <header className="text-primary sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 py-[2px] md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" onClick={closeAll}>
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

          {/* WhatsApp CTA */}
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary ml-2 flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition-opacity hover:opacity-90"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Cotizar
          </a>
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
                          {link.mobileIcon}
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
                      {link.mobileIcon}
                    </span>
                    {link.label}
                  </Link>
                )}
              </li>
            ))}

            {/* Mobile WhatsApp CTA */}
            <li className="pt-3">
              <a
                href={siteConfig.links.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary flex w-full items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium shadow-sm"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Cotizar por WhatsApp
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
