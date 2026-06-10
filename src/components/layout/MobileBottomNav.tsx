"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { env } from "@/env";

/* ─────────────────────────────────────────────
   Geometry (all values in px)
   Container = SVG_H tall, fixed at bottom.
   BAR_H  = visible dark bar height
   OVERFLOW = space above bar for floating bubble
───────────────────────────────────────────── */
const BAR_H = 62;
const OVERFLOW = 56;
const SVG_H = BAR_H + OVERFLOW; // 118 — total nav container height
const BAR_Y = OVERFLOW; // y where bar starts in SVG space

const BUBBLE_D = 54; // bubble diameter
const BUBBLE_R = BUBBLE_D / 2; // 27

// Notch geometry — concave dip centered on active tab
const NOTCH_DEPTH = 30; // depth the curve dips into the bar
const CURVE_HW = 72; // half-width of the smooth curve zone
const BEZIER = CURVE_HW * 0.6; // cubic bezier tangent

const NUM_TABS = 5;

/* Build the SVG path for the bar with the concave notch */
function buildPath(w: number, cx: number): string {
  const notchY = BAR_Y + NOTCH_DEPTH;
  const lx = cx - CURVE_HW;
  const rx = cx + CURVE_HW;

  return [
    `M 0 ${SVG_H}`,
    `L 0 ${BAR_Y}`,
    `L ${lx} ${BAR_Y}`,
    // left S-curve into notch center
    `C ${lx + BEZIER} ${BAR_Y} ${cx - BUBBLE_R - 6} ${notchY} ${cx} ${notchY}`,
    // right S-curve out of notch center
    `C ${cx + BUBBLE_R + 6} ${notchY} ${rx - BEZIER} ${BAR_Y} ${rx} ${BAR_Y}`,
    `L ${w} ${BAR_Y}`,
    `L ${w} ${SVG_H}`,
    `Z`,
  ].join(" ");
}

const ITEMS = [
  { href: "/", icon: "home", label: "Inicio" },
  { href: "/catalogo", icon: "storefront", label: "Catálogo" },
  { href: "/carrito", icon: "shopping_cart", label: "Carrito" },
  { href: "/contacto", icon: "mail", label: "Contacto" },
  { href: "/mi-cuenta", icon: "person", label: "Perfil" },
];

export function MobileBottomNav() {
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
  let activeIdx = ITEMS.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  if (activeIdx === -1) activeIdx = 0;

  const tabW = navW / NUM_TABS;
  const cx = (activeIdx + 0.5) * tabW;
  const pathD = ready ? buildPath(navW, cx) : "";

  /* Bubble position inside the nav container */
  const bubbleTop = OVERFLOW - BUBBLE_D - 2; // 2px margin above bar top
  const bubbleLeft = cx - BUBBLE_R;

  return (
    <nav
      ref={containerRef}
      className="fixed right-0 bottom-0 left-0 z-50 overflow-visible sm:hidden"
      style={{ height: SVG_H }}
      aria-label="Navegación principal móvil"
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
              "drop-shadow(0 -4px 12px rgba(20,48,103,0.22)) drop-shadow(0 -1px 4px rgba(20,48,103,0.14))",
          }}
        >
          <path
            d={pathD}
            /* ⚠ Use var(--color-primary) — NOT hsl(var(--primary)) which is undefined */
            fill="var(--color-primary)"
            style={{
              /* CSS `d` transitions: Chrome ≥ v116, Firefox ≥ v117 */
              transition: "d 0.38s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
      )}

      {/* ── Floating bubble (active tab indicator) ── */}
      {ready && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute flex items-center justify-center rounded-full"
          style={{
            width: BUBBLE_D,
            height: BUBBLE_D,
            top: bubbleTop,
            left: bubbleLeft,
            background: "var(--color-primary)",
            transition: "left 0.38s cubic-bezier(0.4,0,0.2,1)",
            boxShadow:
              "0 6px 22px rgba(20,48,103,0.55), 0 2px 8px rgba(20,48,103,0.35)",
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
          const iconCls =
            "material-symbols-outlined text-white/60 transition-opacity duration-200";

          return (
            <li key={item.href} className="flex flex-1">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isActive ? -1 : 0}
                className="flex h-full w-full flex-col items-center justify-center gap-0.5"
                style={{
                  opacity: isActive ? 0 : 1,
                  pointerEvents: isActive ? "none" : "auto",
                }}
              >
                <span
                  className={iconCls}
                  style={{ fontSize: 22 }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <span className="text-[9px] font-medium tracking-wide text-white/60">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
