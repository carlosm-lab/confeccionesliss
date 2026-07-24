import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icons/Icon";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  variant?: "default" | "light" | "primary";
}

export function Breadcrumb({
  items,
  className,
  variant = "default",
}: BreadcrumbProps) {
  const isLight = variant === "light";
  const isPrimary = variant === "primary";
  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        "font-body flex max-w-full min-w-0 text-sm",
        isLight
          ? "text-white/70"
          : isPrimary
            ? "text-primary/90"
            : "text-gray-500",
        className
      )}
    >
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 leading-normal">
        {items.map((item, index) => (
          <li
            key={`${item.label}-${index}`}
            className="inline-flex min-w-0 items-center"
          >
            {index > 0 && (
              <Icon
                name="chevron_right"
                size={14}
                className={cn(
                  "mx-0.5 shrink-0",
                  isLight
                    ? "text-white/40"
                    : isPrimary
                      ? "text-primary/50"
                      : "text-gray-400"
                )}
                aria-hidden="true"
              />
            )}
            {item.href ? (
              <Link
                href={item.href}
                className={cn(
                  "text-xs break-words transition-colors sm:text-sm",
                  isLight
                    ? "hover:text-white"
                    : isPrimary
                      ? "hover:text-primary font-medium"
                      : "hover:text-primary",
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
                  "text-xs break-words sm:text-sm",
                  index === items.length - 1
                    ? isLight
                      ? "font-medium text-white"
                      : "text-primary font-bold"
                    : isLight
                      ? "text-white/70"
                      : isPrimary
                        ? "text-primary font-medium"
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
