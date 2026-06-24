"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { siteConfig } from "@/config/site";

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
// Mismo output en SSR y cliente → sin hydration mismatch
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

// ── Hexagonal Staggered Grid ──────────────────────────────────────────────────
// Cuadrícula escalonada tipo "brick" / "honeycomb":
//   · Filas pares:    logos en columnas 0, 1, 2, …, N-1
//   · Filas impares:  logos desplazados +0.5 celdas → llenan los huecos del patrón hexagonal
//
// Jitter: ±20% del tamaño de celda (muy ajustado)
//   → cada logo está cerca del centro de su celda
//   → imposible que dos logos de celdas distintas se acumulen en el mismo punto
//
// Logos posicionados desde su CENTRO (no desde la esquina):
//   left = centroX - size/2  →  asegura que el logo esté centrado en su posición
//
// Con 10 cols × 7 rows = 70 logos + 6 logos de filas impares (cols-1) = ~66 logos
// Tamaño uniforme 88-138px — rango pequeño para evitar que logos enormes dominen zonas.
function buildHexCollage(cols: number, rows: number): StickerItem[] {
  const rand = seededRandom(97);
  const items: StickerItem[] = [];

  // Espacio cubierto: -5% a 105% en X, -6% a 106% en Y
  const totalW = 110; // % (de -5 a 105)
  const totalH = 112; // % (de -6 a 106)
  const cellW = totalW / cols;
  const cellH = totalH / rows;

  // Jitter máximo: ±20% del tamaño de celda
  const maxJitterX = cellW * 0.2;
  const maxJitterY = cellH * 0.2;

  for (let row = 0; row < rows; row++) {
    const isOdd = row % 2 === 1;
    // Filas impares: desplazadas media celda a la derecha
    const rowShift = isOdd ? cellW * 0.5 : 0;
    // Filas impares tienen una columna menos para no salir demasiado por la derecha
    const effectiveCols = isOdd ? cols - 1 : cols;

    for (let col = 0; col < effectiveCols; col++) {
      // Centro de la celda en el espacio del contenedor (%)
      const cx = -5 + col * cellW + rowShift + cellW * 0.5;
      const cy = -6 + row * cellH + cellH * 0.5;

      // Jitter acotado: desplazamiento pequeño alrededor del centro
      const jx = (rand() - 0.5) * 2 * maxJitterX;
      const jy = (rand() - 0.5) * 2 * maxJitterY;

      const size = 88 + rand() * 50; // 88–138px (rango uniforme)

      // left/top es la esquina superior-izquierda del logo
      // Convertimos de % a px relativo sería complejo en SSR,
      // así que usamos % directamente: left = cx + jx - size_pct/2
      // pero size está en px y el contenedor en %, así que dejamos
      // left/top en % y el transform:translate del CSS ajustará.
      // Simplificación: la posición en % del centro, y usamos
      // transform para centrar el elemento sobre ese punto.
      const left = cx + jx;
      const top = cy + jy;

      // Índice de logo con shuffle leve para variedad entre filas
      const base = (row * 3 + col * 2) % LOGO_SRCS.length;
      const extra = Math.floor(rand() * 2);
      const idx = (base + extra) % LOGO_SRCS.length;
      const src = LOGO_SRCS[idx];

      const rotation = rand() * 50 - 25; // -25° a +25°
      // ugb-2 es azul oscuro → reducir opacity para no robar protagonismo
      const opacityRaw = rand();
      const opacity =
        src === "/logos/ugb-2.png"
          ? 0.28 + opacityRaw * 0.12 // 0.28–0.40
          : 0.68 + opacityRaw * 0.24; // 0.68–0.92

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

// 10 cols × 7 filas → ~66 logos con cobertura hexagonal uniforme
const COLLAGE = buildHexCollage(10, 7);

// ── Tablet Collage — 768-1023px, 8 cols × 10 filas ───────────────────────────
// RAÍZ DEL PROBLEMA: buildHexCollage(10,7) está calibrado para ~1440px de ancho.
// En tablet 768px: cellW = 84px con logos de 113px → saturación horizontal.
// En tablet 968px alto: cellH = 155px con logos de 113px → huecos verticales.
//
// SOLUCIÓN con 8 cols × 10 filas, CSS 80-105px:
//   cellW = 110/8 × 768px = 105.6px ≈ logo avg (92.5px) → sin saturación ✓
//   cellH = 100/10 × 950px = 95px ≈ logo avg (92.5px)  → sin huecos ✓
//   Logo = (row*3+col)%7 → sin repetición adyacente ✓
function buildTabletCollage(): StickerItem[] {
  const rand = seededRandom(73); // seed diferente = patrón distinto al desktop
  const items: StickerItem[] = [];

  const COLS = 8;
  const ROWS = 10;

  const totalW = 110; // -5% a 105%
  const totalH = 100; //  0% a 100% → centros dentro del viewport
  const cellW = totalW / COLS; // 13.75% → 105.6px en 768px
  const cellH = totalH / ROWS; // 10%    → 95px en 950px

  const maxJitterX = cellW * 0.2;
  const maxJitterY = cellH * 0.2;

  const MAX_LOGOS = 75; // grid completo 8×10 hex = 75 posiciones

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

      // 80–105px CSS → visible 80–105px a escala 1.0 en tablet
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

// ── Mobile Collage — Mismo enfoque que desktop, parámetros portrait ───────────
// El desktop usa buildHexCollage(10,7) con 20% jitter y el usuario LO APROBÓ.
// Aquí replicamos la misma lógica con parámetros proporcionales para 390×540px:
//
// DISTRIBUCIÓN:  7 cols × 10 filas, jitter 20% (idéntico al desktop)
// SIN FILAS:     spacing de fila = 54px < logo avg = 62px → solapan en promedio ✓
// SIN CÚMULOS:   jitter 20% = mismo que desktop (probado, aprobado) ✓
// SIN VACÍOS TOP: totalH = 0%…100% → centros dentro del viewport ✓
// VARIEDAD:      logo = (row*3 + col) % 7 → nunca dos adjacentes iguales ✓
//                Todos los 7 logos aparecen uniformemente en todo el hero ✓
function buildMobileCollage(): StickerItem[] {
  const rand = seededRandom(42);
  const items: StickerItem[] = [];

  const COLS = 7;
  const ROWS = 10;

  const totalW = 110; // -5% a 105% (pequeño sangrado lateral)
  const totalH = 100; //  0% a 100% (todos los centros dentro del viewport)
  const cellW = totalW / COLS; // 15.7% → 61px en 390px
  const cellH = totalH / ROWS; // 10.0% → 54px en 540px

  // 20% jitter — igual que desktop. Row spacing 54px, jitter ±10.8px.
  // Dist máx entre filas: 54 + 21.6 = 75.6px. Logo min 55px. Gap máx ≈ 20px.
  const maxJitterX = cellW * 0.2;
  const maxJitterY = cellH * 0.2;

  const MAX_LOGOS = 65; // grid completo 7×10 hex = 65 posiciones

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

// ── Universidad data ──────────────────────────────────────────────────────────

const UNIVERSIDADES = [
  {
    slug: "univo",
    sigla: "UNIVO",
    nombre: "Universidad de Oriente",
    carreras: ["Enfermería", "Medicina", "Odontología"],
    modelos: 12,
    logo: "/logos/univo.png",
  },
  {
    slug: "ieproes",
    sigla: "IEPROES",
    nombre: "Instituto Especializado de Profesionales de la Salud",
    carreras: ["Enfermería", "Fisioterapia"],
    modelos: 8,
    logo: "/logos/ieproes.png",
  },
  {
    slug: "ugb",
    sigla: "UGB",
    nombre: "Universidad Gerardo Barrios",
    carreras: ["Enfermería", "Laboratorio Clínico"],
    modelos: 9,
    logo: "/logos/ugb-1.png",
  },
  {
    slug: "unab",
    sigla: "UNAB",
    nombre: "Universidad Andrés Bello",
    carreras: ["Enfermería", "Ciencias de la Salud"],
    modelos: 7,
    logo: "/logos/unab.png",
  },
  {
    slug: "ues",
    sigla: "UES",
    nombre: "Universidad de El Salvador",
    carreras: ["Medicina", "Enfermería", "Farmacia"],
    modelos: 14,
    logo: "/logos/ues.png",
  },
  {
    slug: "uma",
    sigla: "UMA",
    nombre: "Universidad Modular Abierta",
    carreras: ["Enfermería", "Salud"],
    modelos: 5,
    logo: "/logos/uma.png",
  },
] as const;

// ── Tile de universidad ───────────────────────────────────────────────────────
function UnivTile({
  univ,
  size,
}: {
  univ: (typeof UNIVERSIDADES)[number];
  size: "large" | "medium" | "small";
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
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl p-6 lg:p-8 ${heightClass} focus-visible:ring-2 focus-visible:ring-[#143067] focus-visible:ring-offset-2 focus-visible:outline-none`}
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
      {/* Ghost sigla watermark */}
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

      {/* Logo miniatura */}
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

      {/* Sigla */}
      <div className="relative">
        <span
          className={`font-serif leading-none font-black ${siglaSize}`}
          style={{ color: "#0d1a38", letterSpacing: "-0.03em" }}
        >
          {univ.sigla}
        </span>
      </div>

      {/* Bottom info */}
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

// ── Página ────────────────────────────────────────────────────────────────────
export default function PruebaHubBlancoPage() {
  const gridRef = useRef<HTMLElement>(null);
  const heroH1Ref = useRef<HTMLHeadingElement>(null);
  const [scrolled, setScrolled] = useState(false);

  // ── Fluid title: dos líneas, cada una llena el 100% del ancho disponible ──
  //    ALGORITMO:
  //    1. Calculamos availW = parent_content_width - h1_padding
  //    2. Ponemos TODOS los spans en inline-block (para que scrollWidth = ancho
  //       del texto, NO del bloque contenedor) y font-size de referencia (16px)
  //    3. Forzamos reflow y medimos scrollWidth de cada span
  //    4. Calculamos el fontSize final = REF × availW / refW  (sin ±1px)
  //    5. Restauramos display:block con el fontSize final
  //    Solo actúa en mobile (<768px). Desktop/tablet: limpia inline styles.
  useEffect(() => {
    const fit = () => {
      const h1 = heroH1Ref.current;
      if (!h1) return;

      const spans = Array.from(
        h1.querySelectorAll<HTMLSpanElement>(
          ".hub-hero-line-1, .hub-hero-line-2"
        )
      );

      // Desktop / tablet → retirar estilos inline, usar CSS clamp
      if (window.innerWidth >= 768) {
        spans.forEach((s) => {
          s.style.removeProperty("font-size");
          s.style.removeProperty("display");
          s.style.removeProperty("white-space");
        });
        return;
      }

      // ── 1. Ancho disponible del content-area del h1 ──────────────────────
      // h1.offsetWidth ya descuenta el scrollbar vertical (≈13px en Chrome) y
      // cualquier padding del contenedor padre. Es el valor más fiable del DOM.
      void h1.offsetWidth; // fuerza reflow antes de leer
      const h1cs = window.getComputedStyle(h1);
      const h1PL = parseFloat(h1cs.paddingLeft);
      const h1PR = parseFloat(h1cs.paddingRight);
      const availW = h1.offsetWidth - h1PL - h1PR;

      // ── 2. Medir ancho real del texto a REF=48px ─────────────────────────
      // REF grande → menor error de no-linealidad de fuente.
      // getBoundingClientRect da precisión sub-pixel (float) vs scrollWidth
      // que es entero y puede acumular error de redondeo en el escalado.
      const REF = 48;
      spans.forEach((span) => {
        span.style.display = "inline-block";
        span.style.whiteSpace = "nowrap";
        span.style.fontSize = `${REF}px`;
      });
      void h1.offsetWidth; // reflow
      const measurements = spans.map(
        (span) => span.getBoundingClientRect().width
      );

      // Guard: fuente aún no cargada
      if (measurements.some((w) => w === 0)) return;

      // ── 3. Aplicar tamaño estimado y restaurar display:block ─────────────
      spans.forEach((span, i) => {
        const refW = measurements[i];
        if (!refW) return;
        // Sin - 1: la verificación del paso 4 corrige cualquier excedente real
        span.style.fontSize = `${Math.floor((REF * availW) / refW)}px`;
        span.style.display = "block";
        span.style.removeProperty("white-space");
      });

      // ── 4. Verificar y ajustar — corrige no-linealidad de fuente ─────────
      // Tras aplicar el font-size estimado, medir el scrollWidth real del span.
      // scrollWidth > clientWidth → el texto excede el ancho del span → −1px.
      // El bucle corre ≤ 3 veces en la práctica (estimación es casi exacta).
      void h1.offsetWidth; // reflow para estabilizar layout
      const verifyW = h1.offsetWidth - h1PL - h1PR;
      spans.forEach((span) => {
        while (span.scrollWidth > Math.ceil(verifyW)) {
          const fs = parseFloat(span.style.fontSize);
          if (fs <= 8) break; // cota inferior de seguridad
          span.style.fontSize = `${fs - 1}px`;
          void span.offsetWidth; // reflow por iteración
        }
      });
    };

    // Esperar a que las fuentes (serif bold) carguen antes de medir.
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
      {/* ── SVG FILTER: sticker con sombra 3D + borde punteado ──────────────
          Capas (de abajo a arriba):
            A) Sombra desplazada — feMorphology dilate → feOffset → feGaussianBlur
               → da la ilusión de que el sticker está levantado de la superficie
            B) Relleno blanco — dilate radio 7px → sigue contorno de cada letra
               sin fundir palabras enteras en un bloque
            C) Anillo exterior — dilate 10px XOR dilate 7px = franja de 3px
               → feTurbulence(baseFrequency=0.09) + umbral feColorMatrix
               → crea dashes discontinuos que siguen el contorno exterior
            D) Texto original encima
      ────────────────────────────────────────────────────────────────────── */}
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
            {/* ── A: SOMBRA ECLIPSE — halo oscuro uniforme en todo el contorno ─
                Sin offset direccional. El blur se expande igual en todos
                los lados → efecto halo/eclipse alrededor de todo el sticker */}
            {/* ── A1: SOMBRA AMBIENTE — leve, sin offset, cubre todo el contorno ─
                Baja opacidad para no competir con la sombra protagonista.
                Llena los laterales y la parte superior donde A2 no proyecta. */}
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

            {/* ── A2: SOMBRA DIRECCIONAL — protagonista, desplazada abajo-derecha */}
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

            {/* ── B: ÁREA BLANCA siguiendo contorno de letras (radio 7px) ─ */}
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

            {/* ── MERGE: sombra → blanco → texto original ──────────────── */}
            <feMerge>
              <feMergeNode in="ambientShadow" />
              <feMergeNode in="shadow" />
              <feMergeNode in="whiteSticker" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* ═══════════════════════════════════════════════════════════════════
        HERO — STICKER BOMB CON DISPERSIÓN JITTERED
        ───────────────────────────────────────────────────────────────────
        Capas:
          [0] Fondo #f0f4f8
          [1] 54 logos (Jittered Grid, 9×6) — dispersión continua y equilibrada
          [2] Overlay radial central — legibilidad del texto
          [3] Contenido centrado (z-20)

        Altura = home: min-h-[calc(100dvh-56px)] / lg:h-[calc(100dvh-56px)]
      ═══════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex min-h-[calc(100dvh-56px)] flex-col items-center justify-center overflow-hidden lg:h-[calc(100dvh-56px)]"
        style={{ backgroundColor: "#f0f4f8" }}
      >
        {/* ── CAPA 1A: Stickers DESKTOP (≥ 1024px) — cuadrícula hexagonal 10×7 ── */}
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

        {/* ── CAPA 1B: Stickers TABLET (768-1023px) — cuadrícula 8×10 ─────── */}
        {/* 8 cols × 10 filas con logos 80-105px: cellW≈106px ≈ cellH≈95px ≈  */}
        {/* logo avg 92px → ni saturación ni huecos en portrait tablet          */}
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

        {/* ── CAPA 1B: Stickers MOBILE (< 768px) ───────────────────────── */}
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

        {/* ── CAPA 2: Vignette central para legibilidad ────────────────── */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 52% 62% at 50% 50%, rgba(240,244,248,0.94) 0%, rgba(240,244,248,0.65) 52%, rgba(240,244,248,0.15) 100%)",
            zIndex: 10,
          }}
          aria-hidden="true"
        />

        {/* ── CAPA 3: Contenido centrado ────────────────────────────────── */}
        <div
          className="relative flex w-full flex-col items-center px-5 text-center"
          style={{ zIndex: 20 }}
        >
          {/* Título — sticker 3D: sombra + borde blanco por letra + borde punteado negro */}
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
            {/* Cada span es display:block → dos líneas en todos los viewports.
                En mobile, las clases hub-hero-line-* sobrescriben el font-size
                para que cada línea llene exactamente el 100% del contenedor.
                En tablet/desktop: heredan el font-size del h1 sin cambio.     */}
            <span className="hub-hero-line-1 block">Tu uniforme.</span>
            <span
              className="hub-hero-line-2 block"
              style={{ color: "#143067" }}
            >
              Tu carrera.
            </span>
          </h1>

          {/* ── Contenedor unificado: Stats (encabezado) + Descripción ───── */}
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
            {/* Stats — encabezado del bloque */}
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

            {/* Descripción — debajo de los stats */}
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

          {/* CTAs — al final, misma anchura */}
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

        {/* Scroll cue */}
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

      {/* ── GRID DE UNIVERSIDADES ─────────────────────────────────────────── */}
      <section
        ref={gridRef}
        className="relative z-10 px-5 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24"
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

          {/* Row 1: UNIVO (2/3) + IEPROES (1/3) */}
          <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <UnivTile univ={UNIVERSIDADES[0]} size="large" />
            </div>
            <div>
              <UnivTile univ={UNIVERSIDADES[1]} size="medium" />
            </div>
          </div>

          {/* Row 2: UGB + UNAB + UES */}
          <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
            <UnivTile univ={UNIVERSIDADES[2]} size="medium" />
            <UnivTile univ={UNIVERSIDADES[3]} size="medium" />
            <UnivTile univ={UNIVERSIDADES[4]} size="medium" />
          </div>

          {/* Row 3: UMA + CTA slot */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <UnivTile univ={UNIVERSIDADES[5]} size="small" />
            </div>
            <Link
              href={siteConfig.links.whatsappDirect}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center gap-3 rounded-xl px-6 py-8 text-center transition-all duration-300"
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

      {/* ── STRIP DE GARANTÍAS ────────────────────────────────────────────── */}
      <section
        className="border-t px-5 py-14 md:px-10 md:py-16 lg:px-16"
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

      {/* ── CTA FINAL ──────────────────────────────────────────────────────── */}
      <section
        className="px-5 py-16 md:px-10 md:py-20 lg:px-16"
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
