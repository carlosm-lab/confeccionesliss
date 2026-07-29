// src/app/(public)/opengraph-image.tsx
// OG Image para / (home) — Layout split: logo izq · texto tipografico der.
// Texto: dos lineas de ancho calibrado para apariencia justificada.
// Separadores centrados (U+00B7 middle dot) como en la descripcion visible de /links.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt =
  "Confecciones Liss - Uniformes, Scrubs y Ropa para Hospitales, Laboratorios, Clinicas, Universidades y Mas";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function HomeOGImage() {
  const logoData = await readFile(
    join(process.cwd(), "public", "logo-white.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  // Columna derecha disponible: 58% de 1200 = 696px, padding 2x52 = 592px util
  // Linea 1 (mas corta):  "Uniformes, Scrubs, Ropa e Indumentaria Para"  ~43 chars
  // Linea 2 (mas larga): "Hospitales · Laboratorios · Clinicas · Universidades & Mas" ~58 chars
  //
  // Estrategia: font-size diferente por linea + letter-spacing para igualar anchos.
  // Linea 1 usa font mas grande (38px) + letter-spacing para alcanzar el ancho de linea 2.
  // Linea 2 usa font base (30px) con letter-spacing normal.
  // Separadores · (U+00B7) centrados verticalmente — igual a los de /links description.

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#143067",
      }}
    >
      {/* Columna izquierda: Logo */}
      <div
        style={{
          width: "42%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Confecciones Liss"
          width={290}
          height={290}
          style={{ width: "290px", height: "290px", objectFit: "contain" }}
        />
      </div>

      {/* Columna derecha: Texto tipografico */}
      <div
        style={{
          width: "58%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 52px",
          gap: "0px",
        }}
      >
        {/* Linea 1 — font mayor + letter-spacing calibrado para igualar ancho de linea 2 */}
        <p
          style={{
            color: "rgba(255,255,255,0.95)",
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "0.09em",
            textTransform: "uppercase",
            margin: 0,
            lineHeight: 1.2,
            marginBottom: "26px",
          }}
        >
          Uniformes, Scrubs, Ropa e Indumentaria Para
        </p>

        {/* Separador decorativo */}
        <div
          style={{
            width: "48px",
            height: "3px",
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "2px",
            marginBottom: "28px",
          }}
        />

        {/* Linea 2 — sectores con separadores · centrados (middle dot U+00B7) */}
        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "25px",
            fontWeight: 500,
            letterSpacing: "0.025em",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Hospitales · Laboratorios · Clínicas
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.72)",
            fontSize: "25px",
            fontWeight: 500,
            letterSpacing: "0.025em",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Universidades & Más
        </p>

        {/* URL — bold, blanca */}
        <p
          style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "16px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginTop: "40px",
            marginBottom: 0,
          }}
        >
          confeccionesliss.com
        </p>
      </div>
    </div>,
    { ...size }
  );
}
