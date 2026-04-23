"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  Heart,
  Users,
  Settings,
  Bell,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/context/useAppStore";

const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/productos", label: "Productos", icon: Package },
  { href: "/admin/mensajes", label: "Mensajes", icon: MessageSquare },
  { href: "/admin/favoritos", label: "Favoritos", icon: Heart },
  { href: "/admin/clientes", label: "Clientes", icon: Users },
  { href: "/admin/configuracion", label: "Config", icon: Settings },
] as const;

export function NavbarAdmin() {
  const pathname = usePathname();
  const { notifCount, user } = useAppStore();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-brand-primary sticky top-0 z-40 w-full shadow-md">
      <nav className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 lg:px-6">
        {/* Logo / Marca */}
        <Link href="/admin" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-white/15 text-sm font-bold text-white">
            CL
          </span>
          <span className="text-sm font-semibold text-white/90">Admin</span>
        </Link>

        {/* Nav Links — Centro */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {ADMIN_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm transition-colors",
                  isActive(link.href)
                    ? "font-bold text-white underline underline-offset-4"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Acciones — Derecha */}
        <div className="flex items-center gap-2">
          {/* Notificaciones */}
          <button
            type="button"
            aria-label={`Notificaciones: ${notifCount}`}
            className="relative flex size-8 cursor-pointer items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <Bell className="size-4.5" />
            {notifCount > 0 && (
              <span className="bg-brand-accent absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full text-[9px] font-bold text-white">
                {notifCount}
              </span>
            )}
          </button>

          {/* Ver sitio */}
          <Link
            href="/"
            target="_blank"
            className="hidden items-center gap-1 rounded-lg border border-white/30 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/10 sm:flex"
          >
            Ver sitio
            <ExternalLink className="size-3" />
          </Link>

          {/* Avatar */}
          <Link
            href="/admin/configuracion"
            className="flex size-8 items-center justify-center rounded-full bg-white/20 text-xs font-semibold text-white"
            aria-label="Configuración"
          >
            {user?.nombre.charAt(0).toUpperCase() ?? "A"}
          </Link>
        </div>
      </nav>
    </header>
  );
}
