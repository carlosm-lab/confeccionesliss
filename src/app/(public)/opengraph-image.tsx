// src/app/(public)/opengraph-image.tsx
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Confecciones Liss - Líder en Diseño y Confección";
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
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#143067",
        padding: "60px 80px",
        textAlign: "center",
        fontFamily: "Inter",
      }}
    >
      {/* Logo centrado arriba */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="Confecciones Liss"
        width={170}
        height={170}
        style={{
          width: "170px",
          height: "170px",
          objectFit: "contain",
          marginBottom: "32px",
        }}
      />

      {/* Título Principal Legible */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            color: "#FFFFFF",
            fontSize: "36px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          Uniformes, Scrubs, Ropa e Indumentaria
        </span>
        <span
          style={{
            color: "rgba(255, 255, 255, 0.85)",
            fontSize: "24px",
            fontWeight: 500,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          Para
        </span>
      </div>

      {/* Categorías con Viñetas Centradoras Legibles */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          padding: "14px 28px",
          borderRadius: "50px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          marginBottom: "36px",
        }}
      >
        <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 500 }}>
          Hospitales
        </span>
        <span style={{ color: "#60A5FA", fontSize: "20px" }}>•</span>
        <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 500 }}>
          Laboratorios
        </span>
        <span style={{ color: "#60A5FA", fontSize: "20px" }}>•</span>
        <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 500 }}>
          Clínicas
        </span>
        <span style={{ color: "#60A5FA", fontSize: "20px" }}>•</span>
        <span style={{ color: "#FFFFFF", fontSize: "20px", fontWeight: 500 }}>
          Universidades & Más
        </span>
      </div>

      {/* Footer / URL */}
      <span
        style={{
          color: "rgba(255, 255, 255, 0.5)",
          fontSize: "16px",
          fontWeight: 700,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        confeccionesliss.com
      </span>
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
