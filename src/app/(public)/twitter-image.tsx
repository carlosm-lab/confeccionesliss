import { ImageResponse } from "next/og";
import { getImageBuffer } from "@/lib/og-helper";

export const alt =
  "Confecciones Liss — Scrubs y Uniformes a la Medida en San Miguel, El Salvador";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const pngBuffer = await getImageBuffer("/images/uniformes/portada.png");
  const heroSrc = `data:image/png;base64,${Buffer.from(pngBuffer).toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#e8ecf4",
      }}
    >
      {/* Left content panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "58%",
          padding: "48px 56px",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            backgroundColor: "rgba(100, 130, 60, 0.12)",
            color: "#4a6b2a",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.5,
            padding: "6px 14px",
            borderRadius: 100,
            marginBottom: 12,
          }}
        >
          CONFECCION PROFESIONAL A LA MEDIDA
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#143067",
            fontSize: 50,
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: 12,
          }}
        >
          <div style={{ display: "flex" }}>Scrubs y Uniformes</div>
          <div style={{ display: "flex" }}>a la Medida</div>
          <div style={{ display: "flex", color: "#3c5a9a" }}>en San Miguel</div>
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: 17,
            color: "#4a5568",
            lineHeight: 1.6,
            maxWidth: 480,
            marginBottom: 16,
          }}
        >
          Scrubs medicos en tela Sincatex y Lino Oxford. Uniformes para UNIVO,
          UNAB, UGB, colegios y empresas. Bordados y envio nacional. Desde $35
          USD.
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            A tu medida
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            Envios nacionales
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            Desde $35
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 14,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            Bordados incluidos
          </div>
        </div>

        {/* CTA buttons */}
        <div style={{ display: "flex", flexDirection: "row", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#143067",
              color: "#ffffff",
              fontSize: 16,
              fontWeight: 700,
              padding: "14px 36px",
              borderRadius: 8,
            }}
          >
            Comprar
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "2px solid #c0c8d8",
              color: "#143067",
              fontSize: 16,
              fontWeight: 600,
              padding: "14px 28px",
              borderRadius: 8,
            }}
          >
            Como llegar
          </div>
        </div>
      </div>

      {/* Right panel — product image */}
      <div
        style={{
          display: "flex",
          width: "42%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Background decorative shape */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            bottom: 40,
            left: 20,
            backgroundColor: "#d7dffc",
            borderRadius: 40,
            opacity: 0.4,
            display: "flex",
          }}
        ></div>
        {/* Product image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt="Producto destacado"
          width={400}
          height={500}
          style={{
            borderRadius: 16,
            position: "relative",
          }}
        />
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          backgroundColor: "#143067",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 32,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "rgba(215, 223, 252, 0.7)",
            display: "flex",
          }}
        >
          www.confeccionesliss.com
        </div>
      </div>
    </div>,
    { ...size }
  );
}
