import { cn } from "@/lib/utils";

type BadgeVariant =
  | "primary"
  | "accent"
  | "success"
  | "warning"
  | "neutral"
  | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  primary: "bg-brand-primary/10 text-brand-primary",
  accent: "bg-brand-accent/10 text-brand-accent",
  success: "bg-emerald-50 text-emerald-700",
  warning: "bg-amber-50 text-amber-700",
  neutral: "bg-gray-100 text-gray-600",
  outline: "border border-gray-200 text-gray-600 bg-white",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        VARIANT_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
