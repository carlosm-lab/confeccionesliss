"use client";

import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryChipProps {
  label: string;
  icon?: LucideIcon;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function CategoryChip({
  label,
  icon: Icon,
  isActive = false,
  onClick,
  className,
}: CategoryChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
        isActive
          ? "border-brand-primary bg-brand-primary text-white"
          : "hover:border-brand-primary hover:text-brand-primary border-gray-200 bg-white text-gray-600",
        className
      )}
    >
      {Icon && <Icon className="size-4" />}
      {label}
    </button>
  );
}
