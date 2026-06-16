import { ImageResponse } from "next/og";
import { getImageBuffer } from "@/lib/og-helper";

export const alt =
  "Confecciones Liss — Todos nuestros canales de contacto y redes sociales";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoBuffer = await getImageBuffer("/logo.png");
  const logoSrc = `data:image/png;base64,${Buffer.from(logoBuffer).toString("base64")}`;

  const links = [
    "WhatsApp",
    "Instagram",
    "Facebook",
    "TikTok",
    "YouTube",
    "LinkedIn",
    "Pinterest",
    "Threads",
    "X (Twitter)",
    "MarketPlace",
    "Ubicación",
  ];

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        background: "linear-gradient(135deg, #fbf8fe 0%, #efecf6 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative blobs */}
      <div
        style={{
          position: "absolute",
          top: -80,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(76,85,182,0.15) 0%, transparent 70%)",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: -60,
          left: -60,
          width: 260,
          height: 260,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(140,149,251,0.12) 0%, transparent 70%)",
          display: "flex",
        }}
      />

      {/* Left Panel */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "55%",
          padding: "56px 48px",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "flex",
            backgroundColor: "rgba(76,85,182,0.1)",
            color: "#4c55b6",
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 2,
            padding: "6px 16px",
            borderRadius: 100,
            marginBottom: 20,
          }}
        >
          LINK IN BIO OFICIAL
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            color: "#32323b",
            fontSize: 52,
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          <div style={{ display: "flex" }}>Confecciones</div>
          <div style={{ display: "flex", color: "#4c55b6" }}>Liss</div>
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#5f5e68",
            lineHeight: 1.6,
            maxWidth: 420,
            marginBottom: 28,
          }}
        >
          Todos nuestros canales: WhatsApp, redes sociales, tienda online y
          ubicación en San Miguel, El Salvador.
        </div>

        {/* Links grid */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          {links.map((link) => (
            <div
              key={link}
              style={{
                display: "flex",
                backgroundColor: "rgba(76,85,182,0.08)",
                color: "#4c55b6",
                fontSize: 12,
                fontWeight: 600,
                padding: "5px 12px",
                borderRadius: 100,
                border: "1px solid rgba(76,85,182,0.2)",
              }}
            >
              {link}
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel — Logo */}
      <div
        style={{
          display: "flex",
          width: "45%",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Circle background */}
        <div
          style={{
            position: "absolute",
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4c55b6 0%, #8c95fb 100%)",
            opacity: 0.12,
            display: "flex",
          }}
        />
        {/* Logo circle */}
        <div
          style={{
            width: 240,
            height: 240,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #4c55b6 0%, #8c95fb 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 8,
            boxShadow: "0 20px 60px rgba(76,85,182,0.3)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              backgroundColor: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Confecciones Liss"
              width={180}
              height={180}
              style={{ objectFit: "contain", padding: 12 }}
            />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 44,
          backgroundColor: "#4c55b6",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingRight: 36,
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "rgba(251,248,255,0.75)",
            display: "flex",
          }}
        >
          www.confeccionesliss.com/links
        </div>
      </div>
    </div>,
    { ...size }
  );
}
