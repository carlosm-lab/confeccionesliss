---
name: Artisanal Heritage System
colors:
  surface: "#f8f9fb"
  surface-dim: "#d9dadc"
  surface-bright: "#f8f9fb"
  surface-container-lowest: "#ffffff"
  surface-container-low: "#f2f4f6"
  surface-container: "#edeef0"
  surface-container-high: "#e7e8ea"
  surface-container-highest: "#e1e2e4"
  on-surface: "#191c1e"
  on-surface-variant: "#444650"
  inverse-surface: "#2e3132"
  inverse-on-surface: "#f0f1f3"
  outline: "#757781"
  outline-variant: "#c4c6d1"
  surface-tint: "#455d96"
  primary: "#001b4a"
  on-primary: "#ffffff"
  primary-container: "#143067"
  on-primary-container: "#8299d7"
  inverse-primary: "#b1c5ff"
  secondary: "#b02d22"
  on-secondary: "#ffffff"
  secondary-container: "#fc6452"
  on-secondary-container: "#650001"
  tertiary: "#1b1d26"
  on-tertiary: "#ffffff"
  tertiary-container: "#30323c"
  on-tertiary-container: "#999aa6"
  error: "#ba1a1a"
  on-error: "#ffffff"
  error-container: "#ffdad6"
  on-error-container: "#93000a"
  primary-fixed: "#d9e2ff"
  primary-fixed-dim: "#b1c5ff"
  on-primary-fixed: "#001946"
  on-primary-fixed-variant: "#2c457d"
  secondary-fixed: "#ffdad5"
  secondary-fixed-dim: "#ffb4a9"
  on-secondary-fixed: "#410000"
  on-secondary-fixed-variant: "#8e130c"
  tertiary-fixed: "#e1e1ee"
  tertiary-fixed-dim: "#c5c6d2"
  on-tertiary-fixed: "#191b24"
  on-tertiary-fixed-variant: "#444650"
  background: "#f8f9fb"
  on-background: "#191c1e"
  surface-variant: "#e1e2e4"
typography:
  display:
    fontFamily: Noto Serif
    fontSize: 48px
    fontWeight: "700"
    lineHeight: "1.2"
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Noto Serif
    fontSize: 32px
    fontWeight: "700"
    lineHeight: "1.3"
  headline-lg-mobile:
    fontFamily: Noto Serif
    fontSize: 28px
    fontWeight: "700"
    lineHeight: "1.3"
  headline-md:
    fontFamily: Noto Serif
    fontSize: 24px
    fontWeight: "700"
    lineHeight: "1.4"
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: "400"
    lineHeight: "1.6"
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: "400"
    lineHeight: "1.6"
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: "500"
    lineHeight: "1.5"
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: "600"
    lineHeight: "1"
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
---

## Brand & Style

The design system is built for a professional tailoring workshop, emphasizing craftsmanship, precision, and local roots. The brand personality is **Artisanal and Trustworthy**, balancing the timeless elegance of traditional tailoring with the modern reliability of a high-end service provider.

The aesthetic follows a **Refined Minimalist** style with **Tactile** influences. It avoids the coldness of pure "tech" interfaces by incorporating subtle textures and a warm, grounded color palette. The UI should feel like a well-pressed linen suit: structured, clean, and intentionally detailed. It aims to evoke an emotional response of confidence and heritage, reassuring clients that their garments are in the hands of masters.

## Colors

The palette is rooted in classic tailoring materials.

- **Deep Navy (Primary):** Represents professionalism, authority, and the core of the tailoring tradition. Used for primary actions, headers, and structural borders.
- **Terracotta (Accent):** A nod to the local San Miguel landscape and the warmth of artisanal work. Reserved for high-priority calls to action, notifications, and small decorative accents.
- **Dark Gray (Secondary Text):** Provides soft contrast against the light background, ensuring long-form readability without the harshness of pure black.
- **Off-White/Light Gray (Background):** A clean, paper-like surface that allows the navy and terracotta to stand out.

Maintain a high contrast ratio for all text elements to ensure the interface remains accessible and professional.

## Typography

Typography is the cornerstone of this design system's "bespoke" feel.

- **Noto Serif** is used for all headlines to project authority and a literary, established character.
- **Manrope** provides a modern, clean counterpoint for body copy and UI labels, ensuring the workshop feels contemporary and efficient.

Use the `label-caps` style for small headers or category tags to create a rhythmic, organized information hierarchy. Avoid using Noto Serif for body text to maintain high legibility on digital screens.

## Layout & Spacing

This design system utilizes a **Fixed Grid** approach for desktop to mirror the structured nature of tailoring patterns, while transitioning to a fluid model for mobile.

- **Grid:** A 12-column grid is standard for desktop (1200px max width). Elements should align strictly to these columns to evoke a sense of order.
- **Rhythm:** An 8px base unit governs all padding and margins.
- **Adaptation:** On mobile devices, margins reduce to 16px to maximize real estate, and column structures collapse to a single stack. Gutters remain consistent at 24px to ensure white space is preserved even on smaller screens.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Low-Contrast Outlines** rather than aggressive shadows.

- **Surfaces:** Use the pure White (#FFFFFF) for cards and modals to lift them off the Light Gray (#F8F9FB) background.
- **Borders:** Every card and interactive element should feature a 1px border using the Primary Navy color at 12% opacity. This creates a subtle "seam" effect, reinforcing the tailoring theme.
- **Texture:** For large empty states or background sections, apply a subdued woven fabric texture (low-opacity SVG pattern) to provide visual interest and a tactile quality.
- **Shadows:** Use only one level of shadow for active modals: a soft, diffused navy-tinted shadow (0px 8px 24px rgba(20, 48, 103, 0.08)).

## Shapes

The shape language is approachable yet structured.

- **Standard Corners:** Use 0.5rem (8px) for small components like buttons and inputs.
- **Container Corners:** Use `rounded-lg` (16px) for cards and main content containers to create a soft, premium feel.
- **Visual Balance:** This level of roundedness avoids the harshness of a strictly corporate look while remaining more professional than a fully pill-shaped or "bubbly" startup aesthetic.

## Components

- **Buttons:** Primary buttons use the Deep Navy background with white Manrope text (Weight 600). Accent buttons use the Terracotta color. Always include the 1px navy border at 12% for secondary ghost buttons.
- **Input Fields:** Use the Manrope font for labels. Fields should have the signature 1px navy border (12% opacity) and a white background. When focused, the border opacity increases to 40% primary navy.
- **Cards:** Cards should have a 16px corner radius, white background, and the subtle 1px border. No shadows should be used for static cards; depth is achieved via the background color contrast.
- **Chips & Tags:** Use `label-caps` for text. Chips should have a very light navy tint (#F0F2F5) and no border, or a thin border if used for filtering.
- **Lists:** Use subtle dividers (1px #143067 at 8% opacity) to separate items, mirroring the precision of a measuring tape.
- **Additional Elements:** Incorporate "Fabric Swatch" components—small square previews of materials—framed with the same 1px navy border used throughout the system.
