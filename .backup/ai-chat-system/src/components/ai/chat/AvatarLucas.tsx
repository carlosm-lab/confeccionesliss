"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/icons/Icon";

interface AvatarLucasProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showOnlineStatus?: boolean;
}

export function AvatarLucas({
  className,
  size = "md",
  showOnlineStatus = false,
}: AvatarLucasProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const statusSize = {
    sm: "w-2.5 h-2.5 ring-2",
    md: "w-3 h-3 ring-2",
    lg: "w-3.5 h-3.5 ring-2",
  };

  return (
    <div className="relative inline-flex shrink-0 items-center justify-center">
      <div
        className={cn(
          "bg-primary text-on-primary flex items-center justify-center rounded-full font-sans shadow-md",
          sizeClasses[size],
          className
        )}
        aria-label="Avatar de Lucas"
      >
        <Icon
          name="support_agent"
          size={size === "sm" ? 18 : size === "lg" ? 26 : 22}
        />
      </div>
      {showOnlineStatus && (
        <span
          className={cn(
            "absolute right-0 bottom-0 animate-pulse rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900",
            statusSize[size]
          )}
          title="Lucas en línea"
        />
      )}
    </div>
  );
}
