import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Direct static icon data nodes imported straight from official lucide-react package
// @ts-ignore
import { __iconNode as shieldNode } from "lucide-react/dist/esm/icons/shield.js";
// @ts-ignore
import { __iconNode as fileTextNode } from "lucide-react/dist/esm/icons/file-text.js";
// @ts-ignore
import { __iconNode as dollarSignNode } from "lucide-react/dist/esm/icons/dollar-sign.js";
// @ts-ignore
import { __iconNode as truckNode } from "lucide-react/dist/esm/icons/truck.js";
// @ts-ignore
import { __iconNode as refreshCwNode } from "lucide-react/dist/esm/icons/refresh-cw.js";
// @ts-ignore
import { __iconNode as rulerNode } from "lucide-react/dist/esm/icons/ruler.js";
// @ts-ignore
import { __iconNode as tagsNode } from "lucide-react/dist/esm/icons/tags.js";
// @ts-ignore
import { __iconNode as userPlusNode } from "lucide-react/dist/esm/icons/user-plus.js";
// @ts-ignore
import { __iconNode as brainNode } from "lucide-react/dist/esm/icons/brain.js";
// @ts-ignore
import { __iconNode as circleCheckNode } from "lucide-react/dist/esm/icons/circle-check.js";
// @ts-ignore
import { __iconNode as badgeCheckNode } from "lucide-react/dist/esm/icons/badge-check.js";
// @ts-ignore
import { __iconNode as landmarkNode } from "lucide-react/dist/esm/icons/landmark.js";
// @ts-ignore
import { __iconNode as cookieNode } from "lucide-react/dist/esm/icons/cookie.js";
// @ts-ignore
import { __iconNode as messageCircleNode } from "lucide-react/dist/esm/icons/message-circle.js";
// @ts-ignore
import { __iconNode as megaphoneNode } from "lucide-react/dist/esm/icons/megaphone.js";
// @ts-ignore
import { __iconNode as accessibilityNode } from "lucide-react/dist/esm/icons/accessibility.js";
// @ts-ignore
import { __iconNode as usersNode } from "lucide-react/dist/esm/icons/users.js";
// @ts-ignore
import { __iconNode as cameraNode } from "lucide-react/dist/esm/icons/camera.js";
// @ts-ignore
import { __iconNode as scaleNode } from "lucide-react/dist/esm/icons/scale.js";
// @ts-ignore
import { __iconNode as sparklesNode } from "lucide-react/dist/esm/icons/sparkles.js";
// @ts-ignore
import { __iconNode as handshakeNode } from "lucide-react/dist/esm/icons/handshake.js";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type IconTupleNode = [string, Record<string, string>];

const LEGAL_OG_NODES: Record<string, IconTupleNode[]> = {
  shield: shieldNode,
  description: fileTextNode,
  attach_money: dollarSignNode,
  local_shipping: truckNode,
  replay: refreshCwNode,
  straighten: rulerNode,
  sell: tagsNode,
  group_add: userPlusNode,
  psychology: brainNode,
  task_alt: circleCheckNode,
  verified_user: badgeCheckNode,
  account_balance: landmarkNode,
  cookie: cookieNode,
  forum: messageCircleNode,
  campaign: megaphoneNode,
  accessibility_new: accessibilityNode,
  groups: usersNode,
  photo_camera: cameraNode,
  gavel: scaleNode,
  workspace_premium: sparklesNode,
  handshake: handshakeNode,
};

function renderLucideNodes(nodes: IconTupleNode[]) {
  return nodes.map(([Tag, attrs], i) => {
    const key = attrs.key || `node-${i}`;
    const cleanAttrs = { ...attrs };
    delete cleanAttrs.key;

    if (Tag === "path") return <path key={key} {...cleanAttrs} />;
    if (Tag === "circle") return <circle key={key} {...cleanAttrs} />;
    if (Tag === "line") return <line key={key} {...cleanAttrs} />;
    if (Tag === "polyline") return <polyline key={key} {...cleanAttrs} />;
    if (Tag === "polygon") return <polygon key={key} {...cleanAttrs} />;
    if (Tag === "rect") return <rect key={key} {...cleanAttrs} />;

    return null;
  });
}

export async function generateLegalOgImage({
  iconName,
  readingTime,
}: {
  iconName: string;
  readingTime?: number | null;
}) {
  const logoBuf = await readFile(
    join(process.cwd(), "public", "logo-white.png")
  );
  const logoSrc = `data:image/png;base64,${logoBuf.toString("base64")}`;

  const iconNodes = LEGAL_OG_NODES[iconName] ?? scaleNode;

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
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Watermark Logo Layer (+50% size = 462px, subtle opacity, centered) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt="Confecciones Liss Watermark"
          width={462}
          height={462}
          style={{
            width: "462px",
            height: "462px",
            objectFit: "contain",
            opacity: 0.18,
          }}
        />
      </div>

      {/* Top-Right Badge: ⏱ X min */}
      {typeof readingTime === "number" && readingTime > 0 && (
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "48px",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.45)",
            color: "#ffffff",
            padding: "12px 28px",
            borderRadius: "32px",
            fontSize: "30px",
            fontWeight: 700,
            letterSpacing: "-0.01em",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={32}
            height={32}
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span>{readingTime} min</span>
        </div>
      )}

      {/* Centered Large Vector Icon (Exact Official Lucide SVG geometry, thin line stroke) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={264}
          height={264}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {renderLucideNodes(iconNodes)}
        </svg>
      </div>
    </div>,
    { ...size }
  );
}
