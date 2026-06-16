import { ImageResponse } from "next/og";
import { ALL_PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { getImageBuffer } from "@/lib/og-helper";
import type { Sector } from "@/data/types";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Generate one OG image per product at build time
export function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    sector: product.sector,
    id: product.id,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ sector: string; id: string }>;
}) {
  const { sector, id } = await params;
  const product = ALL_PRODUCTS.find((p) => p.id === id && p.sector === sector);

  if (!product) {
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
        Producto no encontrado
      </div>,
      { ...size }
    );
  }

  const categoryName = CATEGORIES[sector as Sector]?.subtitle ?? "Catálogo";
  const description = product.descripcionCorta ?? product.descripcion ?? "";
  const descTrimmed =
    description.length > 150 ? description.slice(0, 150) + "..." : description;

  // Load the product image or fallback safely
  let heroSrc = "";
  try {
    const imgPath = product.imagen
      ? product.imagen.endsWith(".webp")
        ? product.imagen.replace(".webp", ".png")
        : product.imagen
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

  const priceLabel =
    "$" + product.precio.toFixed(2) + (product.priceSuffix ?? "");
  const badgeLabel =
    product.showBadge && product.badgeText ? product.badgeText : "";

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
        {/* Category badge */}
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
          {categoryName.toUpperCase() + " • CONFECCIONES LISS"}
        </div>

        {/* Product name */}
        <div
          style={{
            display: "flex",
            color: "#143067",
            fontSize: 42,
            fontWeight: 800,
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          {product.nombre}
        </div>

        {/* Price row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 16,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#055e38",
              fontSize: 36,
              fontWeight: 800,
            }}
          >
            {priceLabel}
          </div>

          {product.precioAnterior ? (
            <div
              style={{
                display: "flex",
                color: "#a0aec0",
                fontSize: 22,
                fontWeight: 500,
                textDecoration: "line-through",
              }}
            >
              {"$" + product.precioAnterior.toFixed(2)}
            </div>
          ) : (
            <div style={{ display: "none" }} />
          )}

          {badgeLabel ? (
            <div
              style={{
                display: "flex",
                backgroundColor: "#055e38",
                color: "#ffffff",
                fontSize: 12,
                fontWeight: 700,
                padding: "4px 10px",
                borderRadius: 4,
              }}
            >
              {badgeLabel.toUpperCase()}
            </div>
          ) : (
            <div style={{ display: "none" }} />
          )}
        </div>

        {/* Description */}
        {descTrimmed ? (
          <div
            style={{
              display: "flex",
              fontSize: 16,
              color: "#4a5568",
              lineHeight: 1.5,
              maxWidth: 480,
              marginBottom: 24,
            }}
          >
            {descTrimmed}
          </div>
        ) : (
          <div style={{ display: "none" }} />
        )}

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
            Bordado incluido
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 13,
              fontWeight: 600,
              color: "#3c5a9a",
            }}
          >
            Envíos nacionales
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

        {/* Product image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={heroSrc}
          alt={product.nombre}
          width={380}
          height={440}
          style={{
            borderRadius: 16,
            position: "relative",
            objectFit: "contain",
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
          Confección Profesional y Venta de Uniformes
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 13,
            color: "rgba(215, 223, 252, 0.7)",
            fontWeight: 600,
          }}
        >
          confeccionesliss.com
        </div>
      </div>
    </div>,
    { ...size }
  );
}
