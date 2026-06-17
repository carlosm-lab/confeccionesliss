"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { env } from "@/env";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

/* ─── Layout constants ──────────────────────────────────────────────────────
 *  Y values are CSS pixels (viewBox height = SVG_H px → no Y distortion).
 *  X values are NORMALISED [0, NORMALISED_W] so no JS width measurement is
 *  needed. The SVG uses width="100%" + preserveAspectRatio="none".
 *  vector-effect="non-scaling-stroke" keeps the 1 px border crisp.
 * ────────────────────────────────────────────────────────────────────────── */
const SVG_H = 80;
const BAR_Y = 24;
const BAR_H = 56;
const BUBBLE_D = 56;
const BUBBLE_R = BUBBLE_D / 2; // 28
const BUBBLE_REST_TOP = 4;
const NOTCH_Y = 62;

const NORMALISED_W = 1000;

// Geometric constants scaled from 390 px reference to 1 000-unit space
const NORM_CURVE_HALF = 144; // 56 px × (1000/390) ≈ 144
const NORM_CTRL_SPREAD = 87; // 34 px × (1000/390) ≈  87

const ANIM_DURATION = 0.35;

// ─── Normalised path builders ─────────────────────────────────────────────

function buildNormPath(cx: number): string {
  const lx = cx - NORM_CURVE_HALF;
  const rx = cx + NORM_CURVE_HALF;
  return [
    `M 0 ${SVG_H}`,
    `L 0 ${BAR_Y}`,
    `L ${lx} ${BAR_Y}`,
    `C ${lx + NORM_CTRL_SPREAD} ${BAR_Y} ${cx - NORM_CTRL_SPREAD} ${NOTCH_Y} ${cx} ${NOTCH_Y}`,
    `C ${cx + NORM_CTRL_SPREAD} ${NOTCH_Y} ${rx - NORM_CTRL_SPREAD} ${BAR_Y} ${rx} ${BAR_Y}`,
    `L ${NORMALISED_W} ${BAR_Y}`,
    `L ${NORMALISED_W} ${SVG_H}`,
    `Z`,
  ].join(" ");
}

function buildNormFlatPath(): string {
  return [
    `M 0 ${SVG_H}`,
    `L 0 ${BAR_Y}`,
    `L ${NORMALISED_W} ${BAR_Y}`,
    `L ${NORMALISED_W} ${SVG_H}`,
    `Z`,
  ].join(" ");
}

function buildNormTopBorderPath(cx: number): string {
  const lx = cx - NORM_CURVE_HALF;
  const rx = cx + NORM_CURVE_HALF;
  const sy = BAR_Y + 0.5;
  const ny = NOTCH_Y + 0.5;
  return [
    `M 0 ${sy}`,
    `L ${lx} ${sy}`,
    `C ${lx + NORM_CTRL_SPREAD} ${sy} ${cx - NORM_CTRL_SPREAD} ${ny} ${cx} ${ny}`,
    `C ${cx + NORM_CTRL_SPREAD} ${ny} ${rx - NORM_CTRL_SPREAD} ${sy} ${rx} ${sy}`,
    `L ${NORMALISED_W} ${sy}`,
  ].join(" ");
}

function buildNormFlatTopBorderPath(): string {
  return `M 0 ${BAR_Y + 0.5} L ${NORMALISED_W} ${BAR_Y + 0.5}`;
}

// ─── Navigation items ─────────────────────────────────────────────────────────

const ITEMS = [
  { href: "/catalogo", icon: "storefront", label: "Catálogo" },
  { href: "/carrito", icon: "shopping_cart", label: "Carrito" },
  { href: "/", icon: "home", label: "Inicio" },
  { href: "/contacto", icon: "mail", label: "Contacto" },
  { href: "/mi-cuenta", icon: "person", label: "Perfil" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrollVisible, setScrollVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [isMounted, setIsMounted] = useState(false);
  const isHomeOnly = env.NEXT_PUBLIC_HOME_ONLY === "true";

  const { cartCount, setIsCartOpen } = useCart();
  const { user, showAuthModal } = useAuth();

  /* In production, these routes are blocked by middleware — hide from nav */
  const PROD_BLOCKED = ["/catalogo", "/servicios", "/carrito", "/mi-cuenta"];
  const visibleItems = ITEMS.filter(
    (item) =>
      process.env.NODE_ENV !== "production" || !PROD_BLOCKED.includes(item.href)
  );
  const numTabs = visibleItems.length;
  const normTabW = NORMALISED_W / numTabs;

  const activeIdx = visibleItems.findIndex((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)
  );

  // Derived state initializer matches the current path on the first render to avoid hydration mismatch
  const [lastActiveIdx, setLastActiveIdx] = useState<number>(() => {
    return activeIdx !== -1 ? activeIdx : 0;
  });

  // ── Scroll visibility & Hydration Mount ───────────────────────────────────────
  useEffect(() => {
    const mountTimer = setTimeout(() => {
      setIsMounted(true);
    }, 0);

    /*
     * INITIALISATION WINDOW & SCROLL HYSTERESIS
     * ─────────────────────────────────────────
     * 1. 1500 ms ready-state delay to absorb browser session restore / smooth scroll restoration
     *    and Next.js hydration completely.
     * 2. Jump guard: single-event scroll jumps > 100px reset baseline and ensure bars stay visible.
     * 3. 10px hysteresis threshold to filter out tiny adjustments & layout shift jitter.
     */
    let ready = false;
    lastScrollY.current = window.scrollY;

    const readyTimer = setTimeout(() => {
      lastScrollY.current = window.scrollY;
      ready = true;
    }, 1500);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!ready) {
        lastScrollY.current = currentScrollY;
        return;
      }

      // Safe bounds near the top: always keep visible
      if (currentScrollY <= 10) {
        setScrollVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      // Detect browser scroll restoration or page jumps (> 100px in one frame)
      if (Math.abs(delta) > 100) {
        lastScrollY.current = currentScrollY;
        setScrollVisible(true);
        return;
      }

      // 10px hysteresis threshold to filter out tiny adjustments & layout shift jitter
      if (delta > 10) {
        setScrollVisible(false);
        lastScrollY.current = currentScrollY;
      } else if (delta < -10) {
        setScrollVisible(true);
        lastScrollY.current = currentScrollY;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(mountTimer);
      clearTimeout(readyTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (isHomeOnly) return null;

  // Notch centre in normalised X units
  const normCx = activeIdx !== -1 ? (activeIdx + 0.5) * normTabW : 0;

  /*
   * Keep track of the last active index using React state (derived state) to prevent
   * the bubble from jumping back to the initial position (0%) when deactivated (activeIdx === -1).
   */
  if (activeIdx !== -1 && activeIdx !== lastActiveIdx) {
    setLastActiveIdx(activeIdx);
  }

  const displayIdx = activeIdx !== -1 ? activeIdx : lastActiveIdx;
  const bubblePct = ((displayIdx + 0.5) / numTabs) * 100;

  // The active tab notch & bubble are client-side dynamic visual enhancements.
  // We only enable them after hydration (isMounted) to ensure a 100% flat mismatch-free initial paint.
  const hasActiveTab = activeIdx !== -1 && isMounted;

  const pathD = hasActiveTab ? buildNormPath(normCx) : buildNormFlatPath();
  const topBorderPathD = hasActiveTab
    ? buildNormTopBorderPath(normCx)
    : buildNormFlatTopBorderPath();

  return (
    <nav
      className={cn(
        "nav-scroll-hide fixed right-0 bottom-0 left-0 z-50 sm:hidden",
        !scrollVisible && "nav-scroll-hidden-bottom"
      )}
      style={{ height: SVG_H, overflow: "visible" }}
      aria-label="Navegación principal móvil"
    >
      {/*
       * ── FAB BUBBLE ─────────────────────────────────────────────────────────
       * We keep the bubble mounted at all times to avoid layout jumps. Its
       * visibility (scale & opacity) is controlled by hasActiveTab.
       * ──────────────────────────────────────────────────────────────────── */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute flex items-center justify-center rounded-full"
        style={{
          width: BUBBLE_D,
          height: BUBBLE_D,
          background: "var(--color-primary)",
          border: "1px solid #ffffff",
          boxSizing: "border-box",
          top: BUBBLE_REST_TOP,
          marginLeft: -BUBBLE_R,
        }}
        initial={{ left: `${bubblePct}%`, scale: 0, opacity: 0 }}
        animate={{
          left: `${bubblePct}%`,
          scale: hasActiveTab ? 1 : 0,
          opacity: hasActiveTab ? 1 : 0,
        }}
        transition={{
          left: { duration: ANIM_DURATION, ease: [0.4, 0, 0.2, 1] },
          scale: { duration: 0.25, ease: "easeOut" },
          opacity: { duration: 0.25 },
        }}
      >
        {/*
         * FAB icon — key={displayIdx} causes ONLY the icon to remount on
         * tab change, triggering the scale-in animation for the new icon.
         */}
        <motion.span
          key={displayIdx}
          className="material-symbols-outlined text-white"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{
            scale: hasActiveTab ? 1 : 0,
            opacity: hasActiveTab ? 1 : 0,
          }}
          transition={{ duration: ANIM_DURATION * 0.6, ease: "easeOut" }}
          style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
        >
          {ITEMS[displayIdx].icon}
        </motion.span>
      </motion.span>

      {/*
       * ── SVG BAR WITH ANIMATED NOTCH ────────────────────────────────────────
       * Normalised X (0…1 000) + width="100%" + preserveAspectRatio="none".
       * vector-effect="non-scaling-stroke" keeps the 1 px border pixel-perfect.
       * No `key` — Framer Motion morphs the path smoothly on tab change.
       * ──────────────────────────────────────────────────────────────────── */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        width="100%"
        height={SVG_H}
        viewBox={`0 0 ${NORMALISED_W} ${SVG_H}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d={pathD}
          fill="var(--color-primary)"
          initial={{ d: pathD }}
          animate={{ d: pathD }}
          transition={{ duration: ANIM_DURATION, ease: [0.4, 0, 0.2, 1] }}
        />
        <motion.path
          d={topBorderPathD}
          fill="none"
          stroke="#ffffff"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          initial={{ d: topBorderPathD }}
          animate={{ d: topBorderPathD }}
          transition={{ duration: ANIM_DURATION, ease: [0.4, 0, 0.2, 1] }}
        />
      </svg>

      {/*
       * ── TAB ZONES ──────────────────────────────────────────────────────────
       * Active  → opacity 0, y +8  (hidden; bubble shows the icon)
       * Inactive → opacity 1, y  0  (visible in bar)
       * ──────────────────────────────────────────────────────────────────── */}
      <ul
        className="absolute right-0 bottom-0 left-0 flex items-center justify-around px-2"
        style={{ height: BAR_H }}
      >
        {visibleItems.map((item, idx) => {
          const isActive = idx === activeIdx;
          const isCartTab = item.href === "/carrito";
          const isProfileTab = item.href === "/mi-cuenta";

          // El tab de carrito abre el drawer; el de perfil requiere auth
          const handleTabClick = (e: React.MouseEvent) => {
            if (isCartTab) {
              e.preventDefault();
              setIsCartOpen(true);
            } else if (isProfileTab && !user) {
              e.preventDefault();
              showAuthModal("generic");
            }
          };

          return (
            <li
              key={item.href}
              className="flex flex-1 items-center justify-center"
            >
              <Link
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                tabIndex={isActive ? -1 : 0}
                onClick={handleTabClick}
                className="group relative flex h-12 w-14 flex-col items-center justify-center rounded-xl transition-all duration-300 active:scale-95"
              >
                <span className="absolute inset-0 -z-10 rounded-xl bg-white/0 transition-all duration-200 group-hover:bg-white/10 group-active:bg-white/15" />
                <span className="relative">
                  <motion.span
                    className="material-symbols-outlined text-white"
                    animate={{ opacity: isActive ? 0 : 1, y: isActive ? 8 : 0 }}
                    transition={{
                      duration: ANIM_DURATION * 0.75,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      fontSize: 21,
                      lineHeight: 1,
                      fontVariationSettings: "'FILL' 0, 'wght' 300",
                    }}
                    aria-hidden="true"
                  >
                    {item.icon}
                  </motion.span>
                  {/* Badge de count del carrito */}
                  {isCartTab && cartCount > 0 && (
                    <span className="text-primary absolute -top-2 -right-3 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-[3px] text-[9px] font-black">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </span>
                <motion.span
                  className="text-[8px] font-bold tracking-widest uppercase"
                  animate={{ opacity: isActive ? 0 : 1, y: isActive ? 8 : 0 }}
                  transition={{
                    duration: ANIM_DURATION * 0.75,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  style={{ color: "#ffffff", marginTop: "2px" }}
                >
                  {item.label}
                </motion.span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
