// src/app/(public)/opengraph-image.tsx
// OG Image para / (Home) — Equilibrio óptico de márgenes exteriores (70px izq / 100px der) y titular sin dos puntos al final.

import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Scrubs y Uniformes Médicos | Confecciones Liss";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function HomeOGImage() {
  const logoBuf = await readFile(
    join(process.cwd(), "public", "logo-white.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuf.toString("base64")}`;

  const fontBoldBuf = await readFile(
    join(process.cwd(), "public", "fonts", "Inter-Bold.ttf")
  );
  const fontMediumBuf = await readFile(
    join(process.cwd(), "public", "fonts", "Inter-Medium.ttf")
  );

  const fontBold = fontBoldBuf.buffer.slice(
    fontBoldBuf.byteOffset,
    fontBoldBuf.byteOffset + fontBoldBuf.byteLength
  );
  const fontMedium = fontMediumBuf.buffer.slice(
    fontMediumBuf.byteOffset,
    fontMediumBuf.byteOffset + fontMediumBuf.byteLength
  );

  // Píldoras simétricas (52px alto, 20px font, flex: 1)
  const pillStyle = {
    flex: 1,
    height: "52px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    border: "1.5px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "10px",
    color: "#FFFFFF",
    fontSize: "20px",
    fontWeight: 600,
    boxSizing: "border-box" as const,
  };

  return new ImageResponse(
    <div
      style={{
        width: "1200px",
        height: "630px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#143067",
        fontFamily: "Inter",
        paddingLeft: "70px",
        paddingRight: "100px",
        justifyContent: "space-between",
        boxSizing: "border-box",
      }}
    >
      {/* Columna Izquierda: Logo (320px) -> Margen Izquierdo Exterior = 70px */}
      <div
        style={{
          width: "320px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Confecciones Liss"
          width={320}
          height={320}
          style={{ width: "320px", height: "320px", objectFit: "contain" }}
        />
      </div>

      {/* Columna Derecha: Contenido (660px) -> Margen Derecho Exterior = 100px (Equilibrio óptico con el botón CTA blanco) */}
      <div
        style={{
          width: "660px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Titular en 2 líneas SIN dos puntos al final */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            marginBottom: "26px",
            boxSizing: "border-box",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "38px",
              fontWeight: 700,
              lineHeight: 1.15,
              whiteSpace: "nowrap",
            }}
          >
            Scrubs, Uniformes, Ropa e
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "38px",
              fontWeight: 700,
              lineHeight: 1.15,
              whiteSpace: "nowrap",
            }}
          >
            Indumentaria Médica para
          </span>
        </div>

        {/* 4 Píldoras en 2x2 al 100% del ancho del bloque derechista (660px) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "32px",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "14px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={pillStyle}>Hospitales</div>
            <div style={pillStyle}>Universidades</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "14px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            <div style={pillStyle}>Laboratorios</div>
            <div style={pillStyle}>Clínicas & Más</div>
          </div>
        </div>

        {/* Botón CTA Blanco al 100% del ancho (660px) */}
        <div
          style={{
            width: "100%",
            height: "56px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            color: "#143067",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            boxSizing: "border-box",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#143067"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            style={{ marginRight: "12px" }}
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          <span>VER CATÁLOGO</span>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "Inter",
          data: fontBold,
          style: "normal",
          weight: 700,
        },
        {
          name: "Inter",
          data: fontMedium,
          style: "normal",
          weight: 500,
        },
      ],
    }
  );
}
