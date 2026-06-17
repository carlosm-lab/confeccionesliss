"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

/* ── Props ────────────────────────────────────────────────────────────────── */
interface LegalArticleReaderProps {
  title: string;
  category?: string;
  date: string;
  readingTime: number;
  children: React.ReactNode;
}

/* ── Shared SVG icons ─────────────────────────────────────────────────────── */
const IconClose = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconBack = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconCal = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const IconClock = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ── Component ────────────────────────────────────────────────────────────── */
export default function LegalArticleReader({
  title,
  category = "DOCUMENTOS LEGALES",
  date,
  readingTime,
  children,
}: LegalArticleReaderProps) {
  const router = useRouter();

  /* ESC key → close modal (desktop) */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") router.push("/legal");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  const handleClose = () => router.push("/legal");

  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: "Legal", href: "/legal" },
  ];

  /* ════════════════════════════════════════════════════════════════════════
     MOBILE / TABLET  (< lg)
     Direct page layout — no overlay, no extra containers.
     The public layout already provides <Navbar>, <main>, <Footer>.
     ════════════════════════════════════════════════════════════════════════ */
  const mobileLayout = (
    <div className="lg:hidden">
      {/* Article content — uses semantic HTML: article > header + sections.
          <section> elements come from LegalContent.tsx Section component. */}
      <article
        itemScope
        itemType="https://schema.org/Article"
        className="mx-auto max-w-2xl px-4 pt-5 pb-20 sm:max-w-none sm:px-5 md:px-8"
      >
        {/* Breadcrumbs — same position as all other public pages */}
        <Breadcrumb items={breadcrumbItems} className="mb-5 justify-start" />

        {/* Article header */}
        <header className="mb-8 border-b border-slate-200 pb-6 text-center">
          <span
            className="mb-3 inline-block rounded-md bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase"
            itemProp="articleSection"
          >
            {category}
          </span>

          <h1
            className="mb-4 text-2xl leading-tight font-extrabold text-slate-900 sm:text-3xl"
            style={{ fontFamily: "'Inter', sans-serif" }}
            itemProp="headline"
          >
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-500">
            <time
              dateTime="2025-06-15"
              itemProp="datePublished"
              className="flex items-center gap-1.5"
            >
              <IconCal />
              {date}
            </time>
            <span className="flex items-center gap-1.5">
              <IconClock />
              {readingTime} min lectura
            </span>
          </div>
        </header>

        {/* Article body — renders <section> elements from LegalContent */}
        <div
          itemProp="articleBody"
          className="space-y-6 text-slate-600"
          style={{
            fontSize: "1.05rem",
            lineHeight: 1.75,
            fontFamily: "'Georgia', 'Times New Roman', serif",
          }}
        >
          {children}
        </div>

        {/* Article footer */}
        <footer className="mt-12 border-t border-slate-100 pt-6">
          <Link
            href="/legal"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
          >
            <IconBack />
            Volver a documentos legales
          </Link>
        </footer>
      </article>
    </div>
  );

  /* ════════════════════════════════════════════════════════════════════════
     DESKTOP  (lg+)
     Modal overlay — preserves the existing reading experience.
     Changes vs. original:
       · padding reduced 75 % on vertical: 20px → 5px (top & bottom).
       · Breadcrumbs added before the article header.
     ════════════════════════════════════════════════════════════════════════ */
  const desktopLayout = (
    <div
      role="button"
      tabIndex={-1}
      aria-label="Cerrar documento y volver a la lista"
      className="fixed inset-0 z-[9999] hidden items-center justify-center overflow-hidden lg:flex"
      style={{
        background: "rgba(10, 17, 40, 0.93)",
        backdropFilter: "blur(8px)",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") handleClose();
      }}
    >
      {/* Wrapper — relative so the button can be absolute-positioned over the paper */}
      <div
        className="relative mx-3 w-full"
        style={{ maxWidth: 850, maxHeight: "98vh" }}
      >
        {/* ── Floating close button ─────────────────────────────────────────
            position:absolute keeps it anchored to the paper corner without
            scrolling and without any extra structural element (no white bar).
            top:12px + right:12px = 12 px from both the top and right edges
            of the paper → perfectly symmetric from the page border. */}
        <button
          onClick={handleClose}
          aria-label="Cerrar y volver a documentos legales"
          className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-all duration-300 hover:rotate-90 hover:border-red-200 hover:bg-red-50 hover:text-red-500 hover:shadow-red-100"
          style={{ top: 12, right: 12 }}
        >
          <IconClose />
        </button>

        {/* ── Scrollable paper sheet ───────────────────────────────────────
            paddingTop:64px = 12px (gap above btn) + 40px (btn height) + 12px
            (breathing room) → first content always starts below the button. */}
        <div
          role="article"
          className="w-full bg-white"
          style={{
            maxHeight: "98vh",
            overflowY: "auto",
            overflowX: "hidden",
            overscrollBehavior: "contain",
            borderRadius: 4,
            boxShadow: "0 25px 60px -12px rgba(0,0,0,0.55)",
            borderTop: "1px solid #E2E8F0",
            borderBottom: "1px solid #E2E8F0",
            scrollbarWidth: "thin",
            scrollbarColor: "#CBD5E1 transparent",
            paddingTop: "64px",
            paddingRight: "40px",
            paddingBottom: "60px",
            paddingLeft: "40px",
          }}
        >
          {/* Breadcrumbs */}
          <div className="pb-2">
            <Breadcrumb items={breadcrumbItems} className="justify-start" />
          </div>

          {/* Article header */}
          <header className="mb-8 border-b border-slate-200 pt-3 pb-6 text-center">
            <span className="mb-3 inline-block rounded-md bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-widest text-blue-600 uppercase">
              {category}
            </span>

            <h1
              className="mb-4 text-3xl leading-tight font-extrabold text-slate-900 sm:text-4xl"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {title}
            </h1>

            <div className="flex items-center justify-center gap-5 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <IconCal />
                {date}
              </span>
              <span className="flex items-center gap-1.5">
                <IconClock />
                {readingTime} min lectura
              </span>
            </div>
          </header>

          {/* Article content */}
          <div
            className="space-y-6 text-slate-600"
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.75,
              fontFamily: "'Georgia', 'Times New Roman', serif",
            }}
          >
            {children}
          </div>

          {/* Footer nav */}
          <footer className="mt-12 border-t border-slate-100 pt-6 text-center">
            <Link
              href="/legal"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-800"
            >
              <IconBack />
              Volver a documentos legales
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {mobileLayout}
      {desktopLayout}
    </>
  );
}
