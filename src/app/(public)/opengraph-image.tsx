// src/app/(public)/opengraph-image.tsx
// OG Image para / (Home) — Título grande de alto impacto (40px) sin alterar márgenes o píldoras.

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

  // Píldora flex de ancho simétrico
  const pillStyle = {
    flex: 1,
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    border: "1.5px solid rgba(255, 255, 255, 0.25)",
    borderRadius: "10px",
    color: "#FFFFFF",
    fontSize: "19px",
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
      {/* Columna Izquierda: Logo 330px centrado en 40% */}
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

      {/* Columna Derecha: Margen simétrico de 75px a la derecha */}
      <div
        style={{
          width: "60%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "0 75px 0 20px",
        }}
      >
        {/* Titular Principal en 40px */}
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "40px",
            fontWeight: 700,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            marginBottom: "26px",
          }}
        >
          Scrubs, Uniformes, Ropa e Indumentaria Médica para:
        </div>

        {/* 4 Píldoras con ancho simétrico */}
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginBottom: "30px",
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

        {/* Botón CTA Blanco alineado */}
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
