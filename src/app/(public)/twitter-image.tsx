import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Confecciones Liss — Scrubs y uniformes a la medida en San Miguel, El Salvador";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#143067",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative top accent line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: "linear-gradient(90deg, #b43024, #e05545, #b43024)",
            display: "flex",
          }}
        />

        {/* Subtle background pattern — diagonal lines */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.04,
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 40px, #ffffff 40px, #ffffff 42px)",
            display: "flex",
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            zIndex: 1,
          }}
        >
          {/* Scissors icon — text-based */}
          <div
            style={{
              fontSize: "48px",
              color: "#d7dffc",
              marginBottom: "8px",
              display: "flex",
            }}
          >
            ✂
          </div>

          {/* Business name */}
          <div
            style={{
              fontSize: "72px",
              fontFamily: "serif",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-2px",
              lineHeight: 1,
              display: "flex",
            }}
          >
            Confecciones Liss
          </div>

          {/* Divider */}
          <div
            style={{
              width: "80px",
              height: "3px",
              backgroundColor: "#b43024",
              marginTop: "8px",
              marginBottom: "8px",
              borderRadius: "2px",
              display: "flex",
            }}
          />

          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              fontFamily: "sans-serif",
              color: "#d7dffc",
              maxWidth: "700px",
              textAlign: "center",
              lineHeight: 1.4,
              display: "flex",
            }}
          >
            Scrubs y uniformes a la medida en San Miguel, El Salvador
          </div>

          {/* Pills row */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "32px",
            }}
          >
            {["Desde $35", "Pago al recibir", "Envíos nacionales"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    backgroundColor: "#b43024",
                    color: "#ffffff",
                    fontSize: "16px",
                    fontFamily: "sans-serif",
                    fontWeight: 600,
                    padding: "10px 24px",
                    borderRadius: "100px",
                    display: "flex",
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom-right URL */}
        <div
          style={{
            position: "absolute",
            bottom: "24px",
            right: "32px",
            fontSize: "16px",
            fontFamily: "sans-serif",
            color: "rgba(215, 223, 252, 0.5)",
            display: "flex",
          }}
        >
          confeccionesliss.com
        </div>
      </div>
    ),
    { ...size }
  );
}
