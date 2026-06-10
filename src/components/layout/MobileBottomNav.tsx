"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { env } from "@/env";

/* ─────────────────────────────────────────────
   Geometry (all values in px)
   The nav container is SVG_H tall and fixed at
   the bottom. The bar occupies the lower BAR_H
   portion; the upper OVERFLOW portion holds the
   floating bubble above the bar.
───────────────────────────────────────────── */
const BAR_H = 58; // visible dark bar height
const OVERFLOW = 52; // space above bar (for bubble)
const SVG_H = BAR_H + OVERFLOW; // 110 – total nav container height
const BAR_Y = OVERFLOW; // y of bar top in SVG space

const BUBBLE_D = 50; // bubble diameter
const BUBBLE_R = BUBBLE_D / 2; // 25

// Notch geometry (concave dip in bar top at active tab)
const NOTCH_DEPTH = 12; // how far notch dips into bar (aesthetic)
const CURVE_HW = 60; // half-width of the smooth curve zone
const BEZIER = CURVE_HW * 0.55; // cubic bezier tangent length

const NUM_TABS = 5;

/* Build the SVG <path d="…"> for the bar with the curved notch. */
function buildPath(w: number, cx: number): string {
  const notchY = BAR_Y + NOTCH_DEPTH;
  const lx = cx - CURVE_HW; // left edge of curve
  const rx = cx + CURVE_HW; // right edge of curve

  return [
    `M 0 ${SVG_H}`,
    `L 0 ${BAR_Y}`,
    `L ${lx} ${BAR_Y}`,
    // left arc into notch
    `C ${lx + BEZIER} ${BAR_Y} ${cx - BUBBLE_R - 4} ${notchY} ${cx} ${notchY}`,
    // right arc out of notch
    `C ${cx + BUBBLE_R + 4} ${notchY} ${rx - BEZIER} ${BAR_Y} ${rx} ${BAR_Y}`,
    `L ${w} ${BAR_Y}`,
    `L ${w} ${SVG_H}`,
    `Z`,
  ].join(" ");
}

const ITEMS = [
  { href: "/", icon: "home", label: "Inicio" },
  { href: "/catalogo", icon: "storefront", label: "Catálogo" },
  { href: "/buscar", icon: "search", label: "Buscar", isSearch: true },
  { href: "/contacto", icon: "mail", label: "Contacto" },
  { href: "/carrito", icon: "shopping_cart", label: "Carrito" },
];

interface MobileBottomNavProps {
  onSearchOpen?: () => void;
}

export function MobileBottomNav({ onSearchOpen }: MobileBottomNavProps) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLElement>(null);
  const [navW, setNavW] = useState(0);
  const [ready, setReady] = useState(false);
  const isHomeOnly = env.NEXT_PUBLIC_HOME_ONLY === "true";

  /* Measure container width on mount & resize */
  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setNavW(entry.contentRect.width);
      setReady(true);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  if (isHomeOnly) return null;

  /* Determine active tab index */
  let activeIdx = ITEMS.findIndex((item) => {
    if (item.isSearch) return false;
    return item.href === "/"
      ? pathname === "/"
      : pathname.startsWith(item.href);
  });
  if (activeIdx === -1) activeIdx = 0;

  const tabW = navW / NUM_TABS;
  const cx = (activeIdx + 0.5) * tabW; // center x of active tab
  const pathD = ready ? buildPath(navW, cx) : "";

  /* Bubble CSS position inside the nav container */
  const bubbleTop = OVERFLOW - BUBBLE_D - 2; // 2px margin above bar
  const bubbleLeft = cx - BUBBLE_R;

  return (
    <nav
      ref={containerRef}
      className="fixed right-0 bottom-0 left-0 z-50 overflow-visible sm:hidden"
      style={{ height: SVG_H }}
      aria-label="Navegación principal"
    >
      {/* ── SVG bar with animated curved notch ── */}
      {ready && (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          width={navW}
          height={SVG_H}
          viewBox={`0 0 ${navW} ${SVG_H}`}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            filter:
              "drop-shadow(0 -3px 10px rgba(20,48,103,0.18)) drop-shadow(0 -1px 4px rgba(20,48,103,0.12))",
          }}
        >
          <path
            d={pathD}
            fill="hsl(var(--primary))"
            style={{
              /* CSS `d` transitions work in Chrome/Firefox ≥ v100 */
              transition: "d 0.35s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
      )}

      {/* ── Floating bubble (active icon) ── */}
      {ready && (
        <span
          aria-hidden="true"
          className="bg-primary pointer-events-none absolute flex items-center justify-center rounded-full"
          style={{
            width: BUBBLE_D,
            height: BUBBLE_D,
            top: bubbleTop,
            left: bubbleLeft,
            transition: "left 0.35s cubic-bezier(0.4,0,0.2,1)",
            boxShadow:
              "0 6px 20px rgba(20,48,103,0.5), 0 2px 8px rgba(20,48,103,0.3)",
          }}
        >
          <span
            className="material-symbols-outlined text-white"
            style={{ fontSize: 22, fontVariationSettings: "'FILL' 1" }}
          >
            {ITEMS[activeIdx].icon}
          </span>
        </span>
      )}

      {/* ── Clickable tab areas (bottom BAR_H slice) ── */}
      <ul
        className="absolute right-0 bottom-0 left-0 flex"
        style={{ height: BAR_H }}
      >
        {ITEMS.map((item, idx) => {
          const isActive = idx === activeIdx;
          const sharedCls = cn(
            "flex flex-1 items-center justify-center h-full transition-opacity duration-200",
            isActive ? "opacity-0 pointer-events-none" : "opacity-100"
          );

          return (
            <li key={item.href} className="flex flex-1">
              {item.isSearch ? (
                <button
                  type="button"
                  onClick={onSearchOpen}
                  aria-label={item.label}
                  className={cn(sharedCls, "w-full")}
                  tabIndex={isActive ? -1 : 0}
                >
                  <span
                    className="material-symbols-outlined text-white/65"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                </button>
              ) : (
                <Link
                  href={item.href}
                  aria-label={item.label}
                  aria-current={isActive ? "page" : undefined}
                  tabIndex={isActive ? -1 : 0}
                  className={sharedCls}
                >
                  <span
                    className="material-symbols-outlined text-white/65"
                    style={{ fontSize: 22 }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
