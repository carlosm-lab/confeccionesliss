import { ImageResponse } from "next/og";
import { CATEGORIES } from "@/data/categories";
import { getImageBuffer } from "@/lib/og-helper";
import type { Sector } from "@/data/types";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Generate one OG image per sector category at build time
export function generateStaticParams() {
  return (Object.keys(CATEGORIES) as Sector[]).map((sector) => ({
    sector,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ sector: string }>;
}) {
  const { sector } = await params;
  const category = CATEGORIES[sector as Sector];

  if (!category) {
    return new ImageResponse(
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#e8ecf4",
          color: "#143067",
          fontSize: 48,
          fontWeight: 700,
        }}
      >
        Categoría no encontrada
      </div>,
      { ...size }
    );
  }

  // Load category image or fallback safely
  let heroSrc = "";
  try {
    const imgPath = category.hubImage
      ? category.hubImage.endsWith(".webp")
        ? category.hubImage.replace(".webp", ".png")
        : category.hubImage
      : "/logo.png";
    const buffer = await getImageBuffer(imgPath);
    heroSrc = `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
  } catch {
    try {
      const buffer = await getImageBuffer("/logo.png");
      heroSrc = `data:image/png;base64,${Buffer.from(buffer).toString("base64")}`;
    } catch {
      heroSrc = "";
    }
  }

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#e8ecf4",
        position: "relative",
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
            backgroundColor: "rgba(20, 48, 103, 0.08)",
            color: "#143067",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1.5,
            padding: "6px 14px",
            borderRadius: 100,
            marginBottom: 16,
          }}
        >
          {"COLECCIÓN • " + category.subtitle}
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            color: "#143067",
            fontSize: 44,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          {category.title}
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: 17,
            color: "#4a5568",
            lineHeight: 1.5,
            maxWidth: 480,
            marginBottom: 24,
          }}
        >
          {category.description}
        </div>

        {/* Brand highlights */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 13,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            A tu medida
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 13,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            Precios especiales
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 13,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            Pago contra entrega
          </div>
        </div>
      </div>

      {/* Right panel — category image */}
      <div
        style={{
          display: "flex",
          width: "42%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          paddingRight: 40,
        }}
      >
        {/* Decorative shape */}
        <div
          style={{
            position: "absolute",
            top: 60,
            right: 40,
            bottom: 60,
            left: 20,
            backgroundColor: "#d7dffc",
            borderRadius: 30,
            opacity: 0.45,
            display: "flex",
          }}
        />

        {/* Category image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt={category.title}
          width={380}
          height={440}
          style={{
            borderRadius: 16,
            position: "relative",
            objectFit: "cover",
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
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 56,
          paddingRight: 56,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 13,
            color: "rgba(215, 223, 252, 0.7)",
          }}
        >
          Confección Profesional a la Medida • San Miguel, El Salvador
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 13,
            color: "rgba(215, 223, 252, 0.7)",
            fontWeight: 600,
          }}
        >
          {"confeccionesliss.com/catalogo/" + sector}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
