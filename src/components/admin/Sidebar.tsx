"use client";

import { Icon } from "@/components/ui/icons/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { to: "/admin", icon: "dashboard", label: "Dashboard", exact: true },
  { to: "/admin/products", icon: "inventory_2", label: "Productos" },
  { to: "/admin/categories", icon: "category", label: "Categorías" },
  { to: "/admin/notificaciones", icon: "campaign", label: "Notificaciones" },
  { to: "/admin/messages", icon: "mail", label: "Mensajes" },
  { to: "/admin/usuarios", icon: "group", label: "Usuarios" },
  { to: "/admin/settings", icon: "security", label: "Seguridad" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return pathname === to;
    return pathname.startsWith(to);
  };

  return (
    <aside className="sticky top-0 z-40 hidden h-screen w-64 shrink-0 flex-col border-r border-slate-200 bg-white text-slate-700 shadow-sm transition-colors md:flex dark:border-white/5 dark:bg-slate-950 dark:text-slate-300">
      {/* Header / Logo */}
      <div className="flex h-[var(--navbar-height)] shrink-0 items-center gap-3 border-b border-slate-200 px-5 dark:border-white/5">
        <div className="relative h-8 w-8 shrink-0">
          <Image
            src="/icon.png"
            alt="Confecciones Liss"
            fill
            sizes="32px"
            className="object-contain"
          />
        </div>
        <div>
          <p className="text-primary text-sm leading-tight font-bold">
            Confecciones Liss
          </p>
          <p className="text-[10px] text-slate-500">Panel de Admin</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
        {navItems.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 font-medium transition-colors",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "hover:text-primary text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              )}
            >
              <Icon name={item.icon} size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Footer + Sign Out */}
      <div className="shrink-0 border-t border-slate-200 p-3 dark:border-white/5">
        <div className="mb-1 flex items-center gap-3 px-2 py-2">
          <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full">
            {user?.user_metadata?.avatar_url ? (
              <Image
                src={user.user_metadata.avatar_url as string}
                alt={user.user_metadata?.full_name ?? "Admin"}
                width={32}
                height={32}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              <Icon name="person" size={16} className="text-primary" />
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-slate-700 dark:text-slate-300">
              {(user?.user_metadata?.full_name as string | undefined) ??
                user?.email ??
                "Admin"}
            </p>
            <p className="text-[10px] text-slate-400">Administrador</p>
          </div>
        </div>
        <Link
          href="/"
          className="mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Icon name="storefront" size={20} />
          Ir a la tienda
        </Link>
        <button
          onClick={signOut}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-500 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
        >
          <Icon name="logout" size={20} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
