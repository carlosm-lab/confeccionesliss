"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { env } from "@/env";

/*
 * Geometry: exact port of CurvedBottomNavigationView.computeCurve()
 * from susonthapa/curved-bottom-navigation (Kotlin → SVG path).
 *
 * Source constants (dp, treated as px here):
 *   cbn_fab_size            = 56  → BUBBLE_D     = 56
 *   cbn_height              = 56  → BAR_H        = 56
 *   cbn_layout_height       = 80  → SVG_H        = 80
 *   cbn_fab_top_offset      = 8   → FAB_CSS_TOP  = 8
 *   cbn_bottom_curve_offset = 16  → NOTCH_Y = SVG_H - 16 = 64
 *
 * Derived (exact formulas from source):
 *   BAR_Y        = SVG_H - BAR_H = 24          ← y where bar begins
 *   BUBBLE_R     = BUBBLE_D / 2  = 28
 *   fabMargin    = 80-56-8-16    = 0
 *   CURVE_HALF_W = BUBBLE_R*2 + fabMargin = 56
 *   TOP_CTRL_X   = BUBBLE_R + BUBBLE_R/2  = 42  (topControlX)
 *   TOP_CTRL_Y   = BAR_Y + BUBBLE_R/6     ≈ 29  (absolute y, topControlY)
 *   BOT_CTRL_X   = BUBBLE_R + BUBBLE_R/2  = 42  (bottomControlX)
 *   BOT_CTRL_Y   = BUBBLE_R/4             = 7   (bottomControlY)
 */
const SVG_H = 80;
const BAR_Y = 24; // SVG_H - BAR_H
const BAR_H = 56;
const BUBBLE_D = 56;
const BUBBLE_R = 28;
const FAB_CSS_TOP = 8; // CSS top of bubble span = fabTopOffset
const NOTCH_Y = 64; // SVG_H - curveBottomOffset (16)
const CURVE_HALF = 56; // fabRadius*2 + fabMargin(0)
const TOP_CTRL_X = 42; // fabRadius * 1.5
const TOP_CTRL_Y = BAR_Y + BUBBLE_R / 6; // ≈ 28.67 absolute y
const BOT_CTRL_X = 42;
const BOT_CTRL_Y = BUBBLE_R / 4; // = 7

const NUM_TABS = 5;

/**
 * Exact SVG path from computeCurve() in CurvedBottomNavigationView.kt
 *
 * firstCurveStart  = (cx - CURVE_HALF, BAR_Y)
 * firstCurveEnd    = (cx,               NOTCH_Y)   ← notch bottom
 * secondCurveStart = firstCurveEnd
 * secondCurveEnd   = (cx + CURVE_HALF,  BAR_Y)
 *
 * Control point formulas (verbatim from Kotlin):
 *   CP1 = (fcs.x + topControlX,  topControlY)
 *   CP2 = (fce.x - bottomControlX, fce.y - bottomControlY)
 *   CP3 = (scs.x + bottomControlX, scs.y - bottomControlY)
 *   CP4 = (sce.x - topControlX,  topControlY)
 */
function buildPath(w: number, cx: number): string {
  const lx = cx - CURVE_HALF; // firstCurveStart.x
  const rx = cx + CURVE_HALF; // secondCurveEnd.x

  const cp1x = lx + TOP_CTRL_X; // fcs.x + topControlX
  const cp1y = TOP_CTRL_Y; // topControlY (absolute)
  const cp2x = cx - BOT_CTRL_X; // fce.x - bottomControlX
  const cp2y = NOTCH_Y - BOT_CTRL_Y; // fce.y - bottomControlY = 57

  const cp3x = cx + BOT_CTRL_X; // scs.x + bottomControlX
  const cp3y = NOTCH_Y - BOT_CTRL_Y; // scs.y - bottomControlY = 57
  const cp4x = rx - TOP_CTRL_X; // sce.x - topControlX
  const cp4y = TOP_CTRL_Y; // topControlY (absolute)

  return [
    `M 0 ${SVG_H}`,
    `L 0 ${BAR_Y}`,
    `L ${lx} ${BAR_Y}`,
    `C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${cx} ${NOTCH_Y}`,
    `C ${cp3x} ${cp3y} ${cp4x} ${cp4y} ${rx} ${BAR_Y}`,
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

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setNavW(entry.contentRect.width);
      setReady(true);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (isHomeOnly) return null;

  let activeIdx = ITEMS.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );
  if (activeIdx === -1) activeIdx = 0;

  const tabW = navW / NUM_TABS;
  const cx = (activeIdx + 0.5) * tabW;
  const pathD = ready ? buildPath(navW, cx) : "";
  const bubbleLeft = cx - BUBBLE_R;

  return (
    <nav
      ref={containerRef}
      className="fixed right-0 bottom-0 left-0 z-50 sm:hidden"
      style={{ height: SVG_H, overflow: "visible" }}
      aria-label="Navegación principal móvil"
    >
      {/* Bar with exact concave Bezier notch from Android source */}
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
              "drop-shadow(0 -4px 16px rgba(20,48,103,0.22)) drop-shadow(0 -1px 5px rgba(20,48,103,0.12))",
          }}
        >
          <path
            d={pathD}
            fill="var(--color-primary)"
            style={{
              /* CSS d-property transition: Chrome ≥116, Firefox ≥117 */
              transition: "d 0.38s cubic-bezier(0.4,0,0.2,1)",
            }}
          />
        </svg>
      )}

      {/* FAB bubble: WHITE circle, brand-colored icon. Slides on active tab change. */}
      {ready && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute flex items-center justify-center rounded-full bg-white"
          style={{
            width: BUBBLE_D,
            height: BUBBLE_D,
            top: FAB_CSS_TOP,
            left: bubbleLeft,
            transition: "left 0.38s cubic-bezier(0.4,0,0.2,1)",
            boxShadow:
              "0 4px 16px rgba(20,48,103,0.35), 0 1px 4px rgba(20,48,103,0.20)",
          }}
        >
          <span
            className="material-symbols-outlined"
            style={{
              fontSize: 24,
              fontVariationSettings: "'FILL' 1",
              color: "var(--color-primary)",
            }}
          >
            {ITEMS[activeIdx].icon}
          </span>
        </span>
      )}

      {/* Clickable tab zones inside the bar area */}
      <ul
        className="absolute right-0 bottom-0 left-0 flex"
        style={{ height: BAR_H }}
      >
        {ITEMS.map((item, idx) => {
          const isActive = idx === activeIdx;
          return (
            <li key={item.href + idx} className="flex flex-1">
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isActive ? -1 : 0}
                className="flex h-full w-full items-center justify-center"
                style={{
                  opacity: isActive ? 0 : 1,
                  pointerEvents: isActive ? "none" : "auto",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: 22, color: "rgba(255,255,255,0.65)" }}
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
