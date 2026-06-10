import Link from "next/link";
import { siteConfig } from "@/config/site";

/**
 * not-found.tsx dentro del route group (public) — se renderiza a través del
 * (public)/layout.tsx, por lo que incluye Navbar, Footer y MobileBottomNav.
 *
 * El root /app/not-found.tsx sigue activo para rutas completamente fuera del
 * grupo (ej: /api/*, /dashboard/*, etc.).
 */
export default function PublicNotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] flex-col items-center justify-center overflow-hidden px-6 py-16 text-center">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-[0.03] select-none"
      >
        <span
          className="text-[30vw] leading-none font-black tracking-tighter"
          style={{ WebkitTextStroke: "2px #143067", color: "transparent" }}
        >
          404
        </span>
      </div>

      {/* Icon */}
      <div className="bg-primary/10 mb-8 flex h-20 w-20 items-center justify-center rounded-full">
        <span
          className="material-symbols-outlined text-primary text-4xl"
          aria-hidden="true"
        >
          content_cut
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-primary mb-4 text-3xl font-extrabold tracking-tight md:text-4xl">
        ¡Esta página se perdió en el taller!
      </h1>
      <p className="text-on-surface-variant mb-10 max-w-md text-lg leading-relaxed">
        La página que buscas no existe o fue movida.
      </p>

      {/* CTA buttons */}
      <div className="mb-12 flex w-full max-w-xs flex-col gap-4 sm:max-w-sm sm:flex-row">
        <Link
          href="/"
          className="from-primary to-primary-container text-on-primary flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br px-6 py-3 text-sm font-semibold shadow-md transition-opacity hover:opacity-90"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            aria-hidden="true"
          >
            home
          </span>
          Inicio
        </Link>
        <a
          href={siteConfig.links.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="border-primary text-primary hover:bg-primary/5 flex flex-1 items-center justify-center gap-2 rounded-xl border-2 px-6 py-3 text-sm font-semibold transition-colors"
        >
          <span
            className="material-symbols-outlined text-[18px]"
            aria-hidden="true"
          >
            chat
          </span>
          WhatsApp
        </a>
      </div>

      {/* Quick links */}
      <nav aria-label="Páginas disponibles">
        <ul className="flex flex-wrap justify-center gap-3">
          {[
            { href: "/catalogo", label: "Catálogo", icon: "storefront" },
            { href: "/servicios", label: "Servicios", icon: "design_services" },
            { href: "/contacto", label: "Contacto", icon: "mail" },
            { href: "/mi-cuenta", label: "Mi cuenta", icon: "person" },
          ].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="bg-surface-container-lowest hover:bg-surface-container border-outline-variant/20 text-primary-container flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition-colors"
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
