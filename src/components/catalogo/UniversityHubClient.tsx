"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config/site";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

// ── Logos disponibles (PNG limpios) ──────────────────────────────────────────
const LOGO_SRCS = [
  "/logos/univo.png",
  "/logos/ues.png",
  "/logos/ugb-1.png",
  "/logos/unab.png",
  "/logos/ieproes.png",
  "/logos/uma.png",
  "/logos/ugb-2.png",
];

// ── LCG — Generador pseudo-aleatorio con seed fija ────────────────────────────
function seededRandom(seed: number) {
  let s = (seed ^ 0xdeadbeef) >>> 0;
  return () => {
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = Math.imul(s ^ (s >>> 16), 0x45d9f3b);
    s = (s ^ (s >>> 16)) >>> 0;
    return s / 0x100000000;
  };
}

type StickerItem = {
  src: string;
  left: number;
  top: number;
  size: number;
  rotation: number;
  key: string;
  opacity: number;
  zIndex: number;
};

function buildHexCollage(cols: number, rows: number): StickerItem[] {
  const rand = seededRandom(97);
  const items: StickerItem[] = [];

  const totalW = 110;
  const totalH = 112;
  const cellW = totalW / cols;
  const cellH = totalH / rows;

  const maxJitterX = cellW * 0.2;
  const maxJitterY = cellH * 0.2;

  for (let row = 0; row < rows; row++) {
    const isOdd = row % 2 === 1;
    const rowShift = isOdd ? cellW * 0.5 : 0;
    const effectiveCols = isOdd ? cols - 1 : cols;

    for (let col = 0; col < effectiveCols; col++) {
      const cx = -5 + col * cellW + rowShift + cellW * 0.5;
      const cy = -6 + row * cellH + cellH * 0.5;

      const jx = (rand() - 0.5) * 2 * maxJitterX;
      const jy = (rand() - 0.5) * 2 * maxJitterY;

      const size = 88 + rand() * 50;

      const left = cx + jx;
      const top = cy + jy;

      const base = (row * 3 + col * 2) % LOGO_SRCS.length;
      const extra = Math.floor(rand() * 2);
      const idx = (base + extra) % LOGO_SRCS.length;
      const src = LOGO_SRCS[idx];

      const rotation = rand() * 50 - 25;
      const opacityRaw = rand();
      const opacity =
        src === "/logos/ugb-2.png"
          ? 0.28 + opacityRaw * 0.12
          : 0.68 + opacityRaw * 0.24;

      items.push({
        src,
        left,
        top,
        size,
        rotation,
        opacity,
        zIndex: Math.floor(rand() * 6),
        key: `h-${row}-${col}`,
      });
    }
  }
  return items;
}

const COLLAGE = buildHexCollage(10, 7);

function buildTabletCollage(): StickerItem[] {
  const rand = seededRandom(73);
  const items: StickerItem[] = [];

  const COLS = 8;
  const ROWS = 10;

  const totalW = 110;
  const totalH = 100;
  const cellW = totalW / COLS;
  const cellH = totalH / ROWS;

  const maxJitterX = cellW * 0.2;
  const maxJitterY = cellH * 0.2;

  const MAX_LOGOS = 75;

  outer: for (let row = 0; row < ROWS; row++) {
    const isOdd = row % 2 === 1;
    const rowShift = isOdd ? cellW * 0.5 : 0;
    const effectiveCols = isOdd ? COLS - 1 : COLS;

    for (let col = 0; col < effectiveCols; col++) {
      if (items.length >= MAX_LOGOS) break outer;

      const cx = -5 + col * cellW + rowShift + cellW * 0.5;
      const cy = row * cellH + cellH * 0.5;

      const jx = (rand() - 0.5) * 2 * maxJitterX;
      const jy = (rand() - 0.5) * 2 * maxJitterY;

      const size = 80 + rand() * 25;

      const logoIdx = (row * 3 + col) % LOGO_SRCS.length;
      const src = LOGO_SRCS[logoIdx];

      const rotation = rand() * 50 - 25;
      const opacityRaw = rand();
      const opacity =
        src === "/logos/ugb-2.png"
          ? 0.28 + opacityRaw * 0.12
          : 0.68 + opacityRaw * 0.24;

      items.push({
        src,
        left: cx + jx,
        top: cy + jy,
        size,
        rotation,
        opacity,
        zIndex: Math.floor(rand() * 6),
        key: `t-${row}-${col}`,
      });
    }
  }
  return items;
}

const TABLET_COLLAGE = buildTabletCollage();

function buildMobileCollage(): StickerItem[] {
  const rand = seededRandom(42);
  const items: StickerItem[] = [];

  const COLS = 7;
  const ROWS = 10;

  const totalW = 110;
  const totalH = 100;
  const cellW = totalW / COLS;
  const cellH = totalH / ROWS;

  const maxJitterX = cellW * 0.2;
  const maxJitterY = cellH * 0.2;

  const MAX_LOGOS = 65;

  outer: for (let row = 0; row < ROWS; row++) {
    const isOdd = row % 2 === 1;
    const rowShift = isOdd ? cellW * 0.5 : 0;
    const effectiveCols = isOdd ? COLS - 1 : COLS;

    for (let col = 0; col < effectiveCols; col++) {
      if (items.length >= MAX_LOGOS) break outer;

      const cx = -5 + col * cellW + rowShift + cellW * 0.5;
      const cy = row * cellH + cellH * 0.5;

      const jx = (rand() - 0.5) * 2 * maxJitterX;
      const jy = (rand() - 0.5) * 2 * maxJitterY;

      const size = 110 + rand() * 30;

      const logoIdx = (row * 3 + col) % LOGO_SRCS.length;
      const src = LOGO_SRCS[logoIdx];

      const rotation = rand() * 70 - 35;
      const opacityRaw = rand();
      const opacity =
        src === "/logos/ugb-2.png"
          ? 0.25 + opacityRaw * 0.1
          : 0.65 + opacityRaw * 0.25;

      items.push({
        src,
        left: cx + jx,
        top: cy + jy,
        size,
        rotation,
        opacity,
        zIndex: Math.floor(rand() * 6),
        key: `m-${row}-${col}`,
      });
    }
  }
  return items;
}

const MOBILE_COLLAGE = buildMobileCollage();

const UNIVERSIDADES_BASE = [
  {
    slug: "univo",
    sigla: "UNIVO",
    nombre: "Universidad de Oriente",
    carreras: ["Enfermería", "Etc..."],
    logo: "/logos/univo.png",
  },
  {
    slug: "ieproes",
    sigla: "IEPROES",
    nombre: "Instituto Especializado de Profesionales de la Salud",
    carreras: ["Enfermería", "Etc..."],
    logo: "/logos/ieproes.png",
  },
  {
    slug: "ugb",
    sigla: "UGB",
    nombre: "Universidad Gerardo Barrios",
    carreras: ["Enfermería", "Etc..."],
    logo: "/logos/ugb-1.png",
  },
  {
    slug: "unab",
    sigla: "UNAB",
    nombre: "Universidad Andrés Bello",
    carreras: ["Enfermería", "Etc..."],
    logo: "/logos/unab.png",
  },
  {
    slug: "ues",
    sigla: "UES",
    nombre: "Universidad de El Salvador",
    carreras: ["Medicina", "Etc..."],
    logo: "/logos/ues.png",
  },
  {
    slug: "uma",
    sigla: "UMA",
    nombre: "Universidad Modular Abierta",
    carreras: ["Enfermería", "Etc..."],
    logo: "/logos/uma.png",
  },
] as const;

function UnivTile({
  univ,
  size,
  className = "",
}: {
  univ: (typeof UNIVERSIDADES_BASE)[number] & { modelos: number };
  size: "large" | "medium" | "small";
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  const heightClass =
    size === "large"
      ? "min-h-[320px] lg:min-h-[380px]"
      : size === "medium"
        ? "min-h-[240px] lg:min-h-[280px]"
        : "min-h-[180px] lg:min-h-[220px]";

  const siglaSize =
    size === "large"
      ? "text-[clamp(4rem,8vw,7rem)]"
      : size === "medium"
        ? "text-[clamp(3rem,5vw,5rem)]"
        : "text-[clamp(2.5rem,4vw,4rem)]";

  return (
    <Link
      href={`/catalogo/universidades/${univ.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 lg:p-8 ${heightClass} ${className} focus-visible:ring-2 focus-visible:ring-[#143067] focus-visible:ring-offset-2 focus-visible:outline-none`}
      style={{
        backgroundColor: hovered ? "#f8f9fb" : "#ffffff",
        border: "1.5px dashed #cbd5e1",
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.03)"
          : "0 1px 4px rgba(0,0,0,0.03)",
        transition:
          "transform 0.4s cubic-bezier(0.32,0.72,0,1), box-shadow 0.3s ease, background-color 0.25s ease",
        transform: hovered ? "scale(0.988)" : "scale(1)",
      }}
      aria-label={`Ver uniformes ${univ.sigla}`}
    >
      <div
        className="pointer-events-none absolute top-1/2 right-0 translate-x-1/4 -translate-y-1/2 font-serif leading-none font-black text-slate-900 select-none"
        style={{
          fontSize:
            size === "large"
              ? "clamp(8rem,18vw,18rem)"
              : "clamp(6rem,12vw,13rem)",
          letterSpacing: "-0.04em",
          opacity: hovered ? 0.05 : 0.028,
          transition: "opacity 0.4s ease",
        }}
        aria-hidden="true"
      >
        {univ.sigla}
      </div>

      <div
        className="pointer-events-none absolute top-5 right-5"
        style={{
          width: 44,
          height: 44,
          opacity: hovered ? 0.9 : 0.45,
          transition: "opacity 0.3s ease",
        }}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={univ.logo}
          alt=""
          className="h-full w-full object-contain"
          style={{ mixBlendMode: "multiply" }}
        />
      </div>

      <div className="relative">
        <span
          className={`font-serif leading-none font-black ${siglaSize}`}
          style={{ color: "#0d1a38", letterSpacing: "-0.03em" }}
        >
          {univ.sigla}
        </span>
      </div>

      <div className="relative">
        <div
          className="mb-3 h-0.5 rounded-full bg-slate-300"
          style={{
            width: hovered ? "2rem" : "1.25rem",
            transition: "width 0.4s cubic-bezier(0.32,0.72,0,1)",
          }}
          aria-hidden="true"
        />
        <p className="font-body text-xs leading-snug font-medium text-slate-500 md:text-sm">
          {univ.nombre}
        </p>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
          {univ.carreras.slice(0, size === "large" ? 3 : 2).map((c) => (
            <span key={c} className="font-body text-[11px] text-slate-400">
              {c}
            </span>
          ))}
          <div className="ml-auto flex items-center gap-1.5">
            <span className="font-body text-xs font-bold text-[#143067] tabular-nums">
              {univ.modelos} modelos
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#143067"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
                opacity: hovered ? 1 : 0.35,
              }}
              aria-hidden="true"
            >
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function UniversityHubClient() {
  const gridRef = useRef<HTMLElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [modelCounts, setModelCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    async function fetchCounts() {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase
        .from("products")
        .select("category")
        .eq("sector", "universitario")
        .eq("is_active", true);

      if (!error && data) {
        const counts: Record<string, number> = {};
        data.forEach((p: { category: string | null }) => {
          if (!p.category) return;
          const cat = p.category.toLowerCase();
          UNIVERSIDADES_BASE.forEach((u) => {
            if (cat.includes(u.slug)) {
              counts[u.slug] = (counts[u.slug] || 0) + 1;
            }
          });
        });
        setModelCounts(counts);
      }
    }
    fetchCounts();
  }, []);

  const universidades = UNIVERSIDADES_BASE.map((u) => ({
    ...u,
    modelos: modelCounts[u.slug] || 0,
  }));

  useEffect(() => {
    const fit = () => {
      const h1 = heroH1Ref.current;
      if (!h1) return;

      const spans = Array.from(
        h1.querySelectorAll<HTMLSpanElement>(
          ".hub-hero-line-1, .hub-hero-line-2"
        )
      );

      if (window.innerWidth >= 768) {
        spans.forEach((s) => {
          s.style.removeProperty("font-size");
          s.style.removeProperty("display");
          s.style.removeProperty("white-space");
        });
        return;
      }

      void h1.offsetWidth;
      const h1cs = window.getComputedStyle(h1);
      const h1PL = parseFloat(h1cs.paddingLeft);
      const h1PR = parseFloat(h1cs.paddingRight);
      const availW = h1.offsetWidth - h1PL - h1PR;

      const REF = 48;
      spans.forEach((span) => {
        span.style.display = "inline-block";
        span.style.whiteSpace = "nowrap";
        span.style.fontSize = `${REF}px`;
      });
      void h1.offsetWidth;
      const measurements = spans.map(
        (span) => span.getBoundingClientRect().width
      );

      if (measurements.some((w) => w === 0)) return;

      spans.forEach((span, i) => {
        const refW = measurements[i];
        if (!refW) return;
        span.style.fontSize = `${Math.floor((REF * availW) / refW)}px`;
        span.style.display = "block";
        span.style.removeProperty("white-space");
      });

      void h1.offsetWidth;
      const verifyW = h1.offsetWidth - h1PL - h1PR;
      spans.forEach((span) => {
        const scrollW = span.scrollWidth;
        if (scrollW > Math.ceil(verifyW)) {
          const fs = parseFloat(span.style.fontSize);
          if (!isNaN(fs) && fs > 8) {
            // Proportional scaling with safety margin to fit verifyW
            const targetFs = Math.max(
              8,
              Math.floor(fs * (verifyW / scrollW) * 0.96)
            );
            span.style.fontSize = `${targetFs}px`;
          }
        }
      });
    };

    document.fonts.ready.then(() => {
      requestAnimationFrame(fit);
    });

    const ro = new ResizeObserver(fit);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ backgroundColor: "#ffffff", overflowX: "hidden" }}>
      <svg
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id="sticker-letter"
            x="-10%"
            y="-35%"
            width="120%"
            height="170%"
            colorInterpolationFilters="sRGB"
          >
            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="5"
              result="ambientShape"
            />
            <feGaussianBlur
              in="ambientShape"
              stdDeviation="5"
              result="ambientBlur"
            />
            <feFlood floodColor="rgba(0,0,0,0.21)" result="ambientColor" />
            <feComposite
              in="ambientColor"
              in2="ambientBlur"
              operator="in"
              result="ambientShadow"
            />

            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="5"
              result="shadowShape"
            />
            <feOffset in="shadowShape" dx="4" dy="10" result="shadowOffset" />
            <feGaussianBlur
              in="shadowOffset"
              stdDeviation="4"
              result="shadowBlur"
            />
            <feFlood floodColor="rgba(0,0,0,0.66)" result="shadowColor" />
            <feComposite
              in="shadowColor"
              in2="shadowBlur"
              operator="in"
              result="shadow"
            />

            <feMorphology
              in="SourceAlpha"
              operator="dilate"
              radius="7"
              result="stickerAlpha"
            />
            <feFlood floodColor="white" result="whiteColor" />
            <feComposite
              in="whiteColor"
              in2="stickerAlpha"
              operator="in"
              result="whiteSticker"
            />

            <feMerge>
              <feMergeNode in="ambientShadow" />
              <feMergeNode in="shadow" />
              <feMergeNode in="whiteSticker" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      <section
        className="relative flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center overflow-hidden lg:h-[calc(100dvh-56px)]"
        style={{ backgroundColor: "#f0f4f8" }}
      >
        <div className="absolute top-6 right-0 left-0 z-30 mx-auto w-full max-w-screen-2xl px-5 md:px-8">
          <Breadcrumb
            variant="primary"
            items={[
              { label: "Inicio", href: "/" },
              { label: "Catálogo", href: "/catalogo" },
              { label: "Universitarios" },
            ]}
          />
        </div>

        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
          aria-hidden="true"
        >
          {COLLAGE.map((s, i) => (
            <div
              key={s.key}
              style={{
                position: "absolute",
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `calc(${s.size}px * var(--hub-sticker-scale, 1))`,
                height: `calc(${s.size}px * var(--hub-sticker-scale, 1))`,
                zIndex: s.zIndex,
                transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
              }}
            >
              <div
                className="hub-float"
                style={
                  {
                    "--float-delay": `-${((i * 0.31) % 6).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  loading={i < 18 ? "eager" : "lazy"}
                  decoding="async"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: s.opacity,
                    mixBlendMode: "multiply",
                    userSelect: "none",
                    filter:
                      "drop-shadow(0 0 4px rgba(255,255,255,1)) drop-shadow(0 0 8px rgba(255,255,255,0.7))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 hidden overflow-hidden md:block lg:hidden"
          aria-hidden="true"
        >
          {TABLET_COLLAGE.map((s, i) => (
            <div
              key={s.key}
              style={{
                position: "absolute",
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `${s.size}px`,
                height: `${s.size}px`,
                zIndex: s.zIndex,
                transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
              }}
            >
              <div
                className="hub-float"
                style={
                  {
                    "--float-delay": `-${((i * 0.31) % 6).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  loading={i < 24 ? "eager" : "lazy"}
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.visibility = "hidden";
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: s.opacity,
                    mixBlendMode: "multiply",
                    userSelect: "none",
                    filter:
                      "drop-shadow(0 0 4px rgba(255,255,255,1)) drop-shadow(0 0 8px rgba(255,255,255,0.7))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0 overflow-hidden md:hidden"
          aria-hidden="true"
        >
          {MOBILE_COLLAGE.map((s, i) => (
            <div
              key={s.key}
              style={{
                position: "absolute",
                left: `${s.left}%`,
                top: `${s.top}%`,
                width: `calc(${s.size}px * var(--hub-sticker-scale, 1))`,
                height: `calc(${s.size}px * var(--hub-sticker-scale, 1))`,
                zIndex: s.zIndex,
                transform: `translate(-50%, -50%) rotate(${s.rotation}deg)`,
              }}
            >
              <div
                className="hub-float"
                style={
                  {
                    "--float-delay": `-${((i * 0.31) % 6).toFixed(2)}s`,
                  } as React.CSSProperties
                }
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.src}
                  alt=""
                  loading="eager"
                  decoding="sync"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.visibility = "hidden";
                  }}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    opacity: s.opacity,
                    mixBlendMode: "multiply",
                    userSelect: "none",
                    filter:
                      "drop-shadow(0 0 4px rgba(255,255,255,1)) drop-shadow(0 0 8px rgba(255,255,255,0.7))",
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 52% 62% at 50% 50%, rgba(240,244,248,0.94) 0%, rgba(240,244,248,0.65) 52%, rgba(240,244,248,0.15) 100%)",
            zIndex: 10,
          }}
          aria-hidden="true"
        />

        <div
          className="relative flex w-full flex-col items-center px-5 text-center"
          style={{ zIndex: 20 }}
        >
          <h1
            ref={heroH1Ref}
            className="w-full font-serif leading-[0.9] font-black"
            style={{
              fontSize: "var(--hub-hero-font-size)",
              letterSpacing: "-0.035em",
              color: "#0d1a38",
              filter: "url(#sticker-letter)",
              padding: "0.15em 0.1em",
            }}
          >
            <span className="hub-hero-line-1 block">Tu uniforme.</span>
            <span
              className="hub-hero-line-2 block"
              style={{ color: "#143067" }}
            >
              Tu carrera.
            </span>
          </h1>

          <div
            className="mt-6 w-full max-w-2xl md:mx-auto"
            style={{
              backgroundColor: "rgba(255,255,255,0.95)",
              borderRadius: "1rem",
              overflow: "hidden",
              boxShadow:
                "0 0 8px rgba(0,0,0,0.21), 4px 5px 6px rgba(0,0,0,0.66)",
            }}
          >
            <div
              className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-b px-4 py-3 md:flex-nowrap md:gap-x-8 md:px-8"
              style={{ borderColor: "rgba(20,48,103,0.1)" }}
            >
              {[
                { num: "6", label: "Universidades atendidas" },
                { num: "55+", label: "Modelos de scrubs" },
                { num: "100%", label: "Tela Sincatex" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  {i > 0 && (
                    <span
                      className="mr-4 hidden h-4 w-px bg-slate-200 sm:block"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="font-serif text-base font-black md:text-xl"
                    style={{ color: "#143067" }}
                  >
                    {s.num}
                  </span>
                  <span className="font-body text-[10px] text-slate-500 md:text-xs">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="font-body px-4 py-4 text-center leading-relaxed md:px-8"
              style={{
                color: "#475569",
                fontSize: "clamp(0.8rem, 3.5vw, 1.05rem)",
              }}
            >
              Scrubs médicos y uniformes universitarios confeccionados en San
              Miguel, El Salvador. Bordado de carrera incluido · Tela Sincatex ·
              Enfermería, Medicina, Odontología, Laboratorio y más.
            </p>
          </div>

          <div className="mt-6 grid w-full max-w-2xl grid-cols-2 gap-3">
            <button
              onClick={() =>
                gridRef.current?.scrollIntoView({ behavior: "smooth" })
              }
              className="font-body inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] md:px-7 md:py-4 md:text-sm"
              style={{
                backgroundColor: "#143067",
                boxShadow:
                  "0 0 8px rgba(0,0,0,0.21), 4px 5px 6px rgba(0,0,0,0.66)",
              }}
            >
              Ver universidades
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
            <a
              href={siteConfig.links.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body inline-flex w-full items-center justify-center gap-2 rounded-full border px-4 py-3 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] md:px-7 md:py-4 md:text-sm"
              style={{
                backgroundColor: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(8px)",
                borderColor: "rgba(20,48,103,0.2)",
                color: "#143067",
                boxShadow:
                  "0 0 8px rgba(0,0,0,0.21), 4px 5px 6px rgba(0,0,0,0.66)",
              }}
            >
              Cotizar ahora
            </a>
          </div>
        </div>

        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 transition-opacity duration-500"
          style={{ zIndex: 20, opacity: scrolled ? 0 : 0.45 }}
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-1">
            <span className="font-body text-[10px] tracking-widest text-slate-400 uppercase">
              Desplaza
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#94a3b8"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </div>
        </div>
      </section>

      <section
        ref={gridRef}
        className="relative z-10 px-5 py-16 md:px-8 md:py-20 lg:py-24"
        style={{
          backgroundColor: "#f8f9fb",
          boxShadow: "0 -1px 2px 0 rgb(0 0 0 / 0.05)",
        }}
        aria-label="Universidades disponibles"
      >
        <div className="mx-auto max-w-screen-2xl">
          <div
            className="mb-10 flex flex-col gap-3 border-b pb-8 md:flex-row md:items-end md:justify-between md:gap-0"
            style={{ borderColor: "#e2e8f0" }}
          >
            <h2
              className="font-serif leading-tight font-black text-[#0d1a38]"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                letterSpacing: "-0.025em",
              }}
            >
              Selecciona tu universidad
            </h2>
            <p className="font-body text-sm text-slate-400 md:text-right">
              6 instituciones · Zona oriental de El Salvador
            </p>
          </div>

          <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <UnivTile univ={universidades[0]} size="large" />
            </div>
            <div>
              <UnivTile univ={universidades[1]} size="medium" />
            </div>
          </div>

          <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <UnivTile univ={universidades[2]} size="medium" />
            <UnivTile univ={universidades[3]} size="medium" />
            <div className="sm:-mt-[80px] lg:-mt-[100px]">
              <UnivTile
                univ={universidades[4]}
                size="medium"
                className="sm:!min-h-[320px] lg:!min-h-[380px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div>
              <UnivTile univ={universidades[5]} size="small" />
            </div>
            <Link
              href={siteConfig.links.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col items-center justify-center gap-3 rounded-xl px-6 py-8 text-center transition-all duration-300"
              style={{
                border: "1.5px dashed #cbd5e1",
                backgroundColor: "#ffffff",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f0f4ff";
                e.currentTarget.style.borderColor = "rgba(20,48,103,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.borderColor = "#cbd5e1";
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" />
              </svg>
              <p className="font-body text-sm font-medium text-slate-400">
                ¿No encuentras tu universidad?
                <br />
                <span className="text-xs text-slate-300">
                  Consultar por WhatsApp
                </span>
              </p>
            </Link>
          </div>
        </div>
      </section>

      <section
        className="border-t px-5 py-14 md:px-8 md:py-16"
        style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
      >
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Colores oficiales",
                body: "Cada prenda respeta el tono exacto de tu facultad.",
              },
              {
                title: "Tela Sincatex",
                body: "Antifluido, resistente, certificada para uso clínico.",
              },
              {
                title: "Bordado incluido",
                body: "Carrera y escudo bordado sin costo adicional.",
              },
              {
                title: "Precio grupal",
                body: "Descuentos desde 10 prendas para grupos de carrera.",
              },
            ].map((item) => (
              <div key={item.title} className="flex flex-col gap-2">
                <div
                  className="mb-1 h-0.5 w-6 rounded-full bg-[#143067]"
                  aria-hidden="true"
                />
                <h3 className="font-serif text-lg font-bold text-[#0d1a38]">
                  {item.title}
                </h3>
                <p className="font-body text-sm leading-relaxed text-slate-500">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="px-5 py-16 md:px-8 md:py-20"
        style={{ backgroundColor: "#0d1a38" }}
      >
        <div className="mx-auto flex max-w-screen-2xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-xl">
            <h2
              className="font-serif leading-tight font-black text-white"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 3rem)",
                letterSpacing: "-0.025em",
              }}
            >
              ¿Eres delegado de carrera?
            </h2>
            <p className="font-body mt-3 text-sm leading-relaxed text-slate-500 md:text-base">
              Coordinamos entregas para grupos completos. Precio preferencial,
              confección sincronizada, entrega directa a tu facultad.
            </p>
          </div>
          <a
            href={siteConfig.links.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body group inline-flex shrink-0 items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-bold text-[#0d1a38] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(255,255,255,0.12)] active:scale-[0.97]"
          >
            Escribir por WhatsApp
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#0d1a38]/10 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </span>
          </a>
        </div>
      </section>
    </div>
  );
}
