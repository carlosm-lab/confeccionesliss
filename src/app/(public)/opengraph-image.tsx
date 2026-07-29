// src/app/(public)/opengraph-image.tsx
// OG Image para / (Home) — Márgenes simétricos de 75px en ambos extremos, sin dos puntos en "para", titular 42px y píldoras 52px idénticas.

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

  // Estilo de píldora idéntica (52px alto, 20px font, flex: 1)
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
  };

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#143067",
        fontFamily: "Inter",
      }}
    >
      {/* Columna Izquierda: Logo 330px centrado en 40% (margen izquierdo exterior = 75px) */}
      <div
        style={{
          width: "40%",
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
          width={330}
          height={330}
          style={{ width: "330px", height: "330px", objectFit: "contain" }}
        />
      </div>

      {/* Columna Derecha: Margen derecho exterior = 75px (idéntico al margen del logo) */}
      <div
        style={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 75px 0 15px",
        }}
      >
        {/* Titular en 42px sin dos puntos, extendiéndose hasta x = 1125px (alineado flush a la derecha con píldoras) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: "26px",
          }}
        >
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "42px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              whiteSpace: "nowrap",
            }}
          >
            Scrubs, Uniformes, Ropa e
          </span>
          <span
            style={{
              color: "#FFFFFF",
              fontSize: "42px",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "0.015em",
              whiteSpace: "nowrap",
            }}
          >
            Indumentaria Médica para
          </span>
        </div>

        {/* 4 Píldoras en 2x2 al 100% del ancho del contenedor */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "14px",
              width: "100%",
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
            }}
          >
            <div style={pillStyle}>Laboratorios</div>
            <div style={pillStyle}>Clínicas & Más</div>
          </div>
        </div>

        {/* Botón CTA Blanco al 100% del ancho (56px alto, 20px font) */}
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
