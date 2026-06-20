"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/admin", icon: "dashboard", label: "Inicio", exact: true },
  { to: "/admin/products", icon: "inventory_2", label: "Productos" },
  { to: "/admin/categories", icon: "category", label: "Categorías" },
  { to: "/admin/messages", icon: "mail", label: "Mensajes" },
  { to: "/admin/usuarios", icon: "group", label: "Usuarios" },
  { to: "/admin/settings", icon: "security", label: "Seguridad" },
];

export default function AdminFooterBar() {
  const pathname = usePathname();

  const isActive = (to: string, exact?: boolean) => {
    if (exact) return pathname === to;
    return pathname.startsWith(to);
  };

  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-slate-200 bg-white/90 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] backdrop-blur-md md:hidden dark:border-white/5 dark:bg-slate-950/90">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const active = isActive(item.to, item.exact);
          return (
            <Link
              key={item.to}
              href={item.to}
              className={cn(
                "flex h-full w-full flex-col items-center justify-center gap-0.5 transition-colors",
                active
                  ? "text-primary"
                  : "text-slate-400 dark:text-slate-400/70"
              )}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "24px" }}
              >
                {item.icon}
              </span>
              <span className="text-[10px] font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
