// src/app/(public)/opengraph-image.tsx
// OG Image para / (Home) — Layout split 2 columnas (Logo izq · Contenido der).
// Píldoras en 2x2 para sectores + Botón CTA "VER CATÁLOGO" estilo outline.

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
      {/* Columna Izquierda: Logo (42%) */}
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
          width={260}
          height={260}
          style={{ width: "260px", height: "260px", objectFit: "contain" }}
        />
      </div>

      {/* Columna Derecha: Titular + Píldoras + Botón CTA (58%) */}
      <div
        style={{
          width: "58%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 48px",
        }}
      >
        {/* Titular Principal */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "32px",
            fontWeight: 700,
            lineHeight: 1.25,
            marginBottom: "24px",
          }}
        >
          Scrubs, Uniformes, Ropa e Indumentaria
        </div>

        {/* Subetiqueta para píldoras */}
        <div
          style={{
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginBottom: "14px",
          }}
        >
          PARA:
        </div>

        {/* 4 Píldoras en 2 filas x 2 columnas */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginBottom: "36px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "30px",
                padding: "8px 20px",
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Hospitales
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "30px",
                padding: "8px 20px",
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Universidades
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "row", gap: "12px" }}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "30px",
                padding: "8px 20px",
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Laboratorios
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                borderRadius: "30px",
                padding: "8px 20px",
                color: "#FFFFFF",
                fontSize: "18px",
                fontWeight: 500,
              }}
            >
              Clínicas & Más
            </div>
          </div>
        </div>

        {/* Botón CTA "VER CATÁLOGO" estilo Outline */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            border: "2px solid rgba(255, 255, 255, 0.85)",
            borderRadius: "10px",
            padding: "12px 28px",
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            color: "#FFFFFF",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.08em",
          }}
        >
          {/* SVG Bolsa de Compras */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={22}
            height={22}
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
