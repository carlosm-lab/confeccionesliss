/**
 * Shared presentational components for legal article pages.
 * Import from both /legal/privacidad and /legal/terminos.
 */
import type { ReactNode } from "react";

/* ── Roman numeral helper ─────────────────────────────────── */
const ROMAN_MAP: [number, string][] = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

function toRoman(n: number): string {
  let result = "";
  let rem = n;
  for (const [val, sym] of ROMAN_MAP) {
    while (rem >= val) {
      result += sym;
      rem -= val;
    }
  }
  return result;
}

/* ── Section ──────────────────────────────────────────────── */
interface SectionProps {
  n: number;
  title: string;
  children: ReactNode;
}

export function Section({ n, title, children }: SectionProps) {
  const roman = toRoman(n);
  return (
    <section style={{ marginBottom: "1.5rem" }}>
      <h2
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "1.1rem",
          fontWeight: 700,
          color: "#1e293b",
          display: "flex",
          alignItems: "flex-start",
          gap: "0.75rem",
          marginBottom: "0.75rem",
          lineHeight: 1.35,
        }}
      >
        {/*
          Badge height = h2 line-height (1.35em) so its center aligns
          exactly with the centre of the first text line. flexShrink:0
          + alignSelf implicit flex-start keeps it pinned to line 1
          even when the title wraps to multiple lines.
        */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: "2rem",
            width: "auto",
            height: "1.485rem",
            paddingLeft: "0.35rem",
            paddingRight: "0.35rem",
            borderRadius: "0.375rem",
            background: "#f1f5f9",
            border: "1px solid #e2e8f0",
            color: "#1e293b",
            fontWeight: 900,
            fontSize: "0.7rem",
            letterSpacing: "0.02em",
            flexShrink: 0,
          }}
          aria-label={`Sección ${n}`}
        >
          {roman}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

/* ── Hr ──────────────────────────────────────────────────── */
export function Hr() {
  return (
    <hr
      style={{
        border: "none",
        borderTop: "1px solid #e2e8f0",
        margin: "1.5rem 0",
      }}
    />
  );
}

/* ── InfoBox ─────────────────────────────────────────────── */
type InfoBoxType = "green" | "blue" | "amber";
const INFO_STYLES: Record<
  InfoBoxType,
  { bg: string; border: string; color: string }
> = {
  green: { bg: "#f0fdf4", border: "#bbf7d0", color: "#166534" },
  blue: { bg: "#eff6ff", border: "#bfdbfe", color: "#1e40af" },
  amber: { bg: "#fffbeb", border: "#fde68a", color: "#92400e" },
};

interface InfoBoxProps {
  type: InfoBoxType;
  title?: string;
  children: ReactNode;
}

export function InfoBox({ type, title, children }: InfoBoxProps) {
  const s = INFO_STYLES[type];
  return (
    <div
      style={{
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: "0.75rem",
        padding: "1rem 1.25rem",
        marginBottom: "0.75rem",
      }}
    >
      {title && (
        <p style={{ fontWeight: 700, color: s.color, marginBottom: "0.5rem" }}>
          {title}
        </p>
      )}
      <p style={{ color: s.color, margin: 0 }}>{children}</p>
    </div>
  );
}

/* ── P ───────────────────────────────────────────────────── */
export function P({ children }: { children: ReactNode }) {
  return (
    <p style={{ marginBottom: "0.75rem", textAlign: "justify" }}>{children}</p>
  );
}

/* ── H3 ──────────────────────────────────────────────────── */
export function H3({ children }: { children: ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "1rem",
        fontWeight: 600,
        color: "#334155",
        marginTop: "1rem",
        marginBottom: "0.5rem",
      }}
    >
      {children}
    </h3>
  );
}

/* ── Ul ──────────────────────────────────────────────────── */
export function Ul({ items }: { items: string[] }) {
  return (
    <ul
      style={{
        paddingLeft: "1.5rem",
        marginBottom: "0.75rem",
        listStyleType: "disc",
      }}
    >
      {items.map((item, i) => (
        <li key={i} style={{ marginBottom: "0.35rem" }}>
          {item}
        </li>
      ))}
    </ul>
  );
}

/* ── LegalFootnote ───────────────────────────────────────── */
export function LegalFootnote({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        marginTop: "2rem",
        padding: "1rem 1.25rem",
        background: "#f8fafc",
        borderRadius: "0.75rem",
        fontSize: "0.85rem",
        fontStyle: "italic",
        color: "#64748b",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {children}
    </div>
  );
}
