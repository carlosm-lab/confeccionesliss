"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "light";
}

export function Breadcrumb({
  items,
  className,
  variant = "default",
}: BreadcrumbProps) {
  const isLight = variant === "light";
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "font-body flex text-sm",
        isLight ? "text-white/70" : "text-gray-500",
        className
      )}
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center">
            {index > 0 && (
              <span
                className={cn(
                  "material-symbols-outlined mx-1 text-sm",
                  isLight ? "text-white/40" : "text-gray-400"
                )}
                aria-hidden="true"
              >
                chevron_right
              </span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "transition-colors",
                  isLight ? "hover:text-white" : "hover:text-primary",
                  index === items.length - 1
                    ? isLight
                      ? "font-medium text-white"
                      : "text-primary font-medium"
                    : ""
                )}
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  index === items.length - 1
                    ? isLight
                      ? "font-medium text-white"
                      : "text-primary font-medium"
                    : isLight
                      ? "text-white/70"
                      : "text-gray-500"
                )}
                aria-current={index === items.length - 1 ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
