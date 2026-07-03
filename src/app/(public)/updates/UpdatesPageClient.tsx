"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { ChangeCategory, VersionGroup } from "@/data/changelog";

// BADGE CONFIG
// ─────────────────────────────────────────────────────────────────────────────────
const BADGE: Record<
  ChangeCategory,
  { label: string; color: string; bg: string }
> = {
  feat: { label: "Feature", color: "#0d4f2e", bg: "#d1fae5" },
  fix: { label: "Fix", color: "#7f1d1d", bg: "#fee2e2" },
  style: { label: "Diseño", color: "#4c1d95", bg: "#ede9fe" },
  refactor: { label: "Refactor", color: "#1e3a5f", bg: "#dbeafe" },
  chore: { label: "Chore", color: "#3f3f46", bg: "#f4f4f5" },
  docs: { label: "Docs", color: "#713f12", bg: "#fef9c3" },
  perf: { label: "Perf", color: "#064e3b", bg: "#d1fae5" },
  security: { label: "Seguridad", color: "#831843", bg: "#fce7f3" },
  seo: { label: "SEO", color: "#1a3a5c", bg: "#dbeafe" },
  a11y: { label: "A11y", color: "#1c1917", bg: "#f5f5f4" },
};

const ALL_CATEGORIES: ChangeCategory[] = [
  "feat",
  "fix",
  "style",
  "refactor",
  "chore",
  "docs",
  "perf",
  "security",
  "seo",
  "a11y",
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export function UpdatesPageClient({
  changelog,
}: {
  changelog: VersionGroup[];
}) {
  const [activeFilters, setActiveFilters] = useState<Set<ChangeCategory>>(
    new Set()
  );
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleIds((prev) => new Set(prev).add(entry.target.id));
            }
          });
        },
        { threshold: 0.08 }
      );

      const cards = document.querySelectorAll("[data-timeline-entry]");
      cards.forEach((el) => observerRef.current?.observe(el));
    });

    return () => {
      cancelAnimationFrame(rafId);
      observerRef.current?.disconnect();
    };
  }, [activeFilters]);

  const toggleFilter = (cat: ChangeCategory) => {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const clearFilters = () => setActiveFilters(new Set());

  const filtered = changelog
    .map((group) => ({
      ...group,
      entries: group.entries.filter(
        (e) => activeFilters.size === 0 || activeFilters.has(e.category)
      ),
    }))
    .filter((g) => g.entries.length > 0);

  const totalEntries = changelog.reduce((acc, g) => acc + g.entries.length, 0);
  const filteredCount = filtered.reduce((acc, g) => acc + g.entries.length, 0);

  return (
    <main
      id="updates-main"
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-on-surface)",
      }}
    >
      {/* Skip to content */}
      <a
        href="#timeline"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-blue-900 focus:shadow-lg focus:outline-2"
      >
        Saltar al historial
      </a>

      {/* ── HEADER ── */}
      <section className="bg-surface px-5 pt-6 pb-0 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Updates", href: "/updates" },
            ]}
            className="animate-fade-in-up mb-6"
          />

          {/* Title */}
          <h1
            className="animate-fade-in-up text-primary mb-3 text-3xl leading-tight font-bold sm:text-4xl lg:text-5xl"
            style={{
              fontFamily: "var(--font-headline)",
              animationDelay: "100ms",
            }}
          >
            Historial de cambios
          </h1>
          <p
            className="animate-fade-in-up mb-2 max-w-2xl text-base leading-relaxed text-gray-500 md:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            Te damos la bienvenida a nuestra bitácora pública de actualizaciones
            de la plataforma web de Confecciones Liss. En este registro
            documentamos detalladamente cada mejora, corrección de errores,
            optimización de velocidad y nueva característica que implementamos
            en el sitio. Creemos en la transparencia total del proyecto y en
            mantenerte al tanto del desarrollo constante de nuestra tienda y
            catálogo en línea.
          </p>
          <p
            className="animate-fade-in-up max-w-2xl text-sm leading-relaxed text-gray-400"
            style={{ animationDelay: "200ms" }}
          >
            <strong className="text-gray-800">{totalEntries} cambios</strong>{" "}
            documentados desde el primer commit.
          </p>
        </div>
      </section>

      {/* ── CONTENT BODY ── */}
      <section className="bg-surface px-5 pt-12 pb-20 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* 📌 LEFT SIDEBAR (Stats + Filters) 📌 */}
            <aside className="w-full shrink-0 lg:sticky lg:top-20 lg:w-72 lg:self-start xl:w-80">
              {/* Stats Card */}
              <div
                className="animate-fade-in-up mb-6 rounded-2xl border p-5"
                style={{
                  background: "var(--color-surface-container-low)",
                  borderColor: "var(--color-outline-variant)",
                  animationDelay: "300ms",
                }}
              >
                <h3
                  className="mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Resumen del proyecto
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      label: "Versiones",
                      value: changelog.length,
                      icon: "rocket_launch",
                      colorClass:
                        "bg-[#143067]/5 text-[#143067] border-[#143067]/10",
                    },
                    {
                      label: "Commits",
                      value: "160+",
                      icon: "terminal",
                      colorClass:
                        "bg-[#143067]/5 text-[#143067] border-[#143067]/10",
                    },
                    {
                      label: "Desde",
                      value: "Abr 2026",
                      icon: "calendar_today",
                      colorClass:
                        "bg-[#b43024]/5 text-[#b43024] border-[#b43024]/10",
                    },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white/60 p-3 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white active:scale-[0.98]"
                    >
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background:
                            s.colorClass.split(" ")[0].split("/")[0] ===
                            "bg-[#143067]"
                              ? "rgba(20, 48, 103, 0.05)"
                              : "rgba(180, 48, 36, 0.05)",
                        }}
                      >
                        <span
                          className={`material-symbols-outlined text-[20px] ${s.colorClass.split(" ")[1]}`}
                          aria-hidden="true"
                        >
                          {s.icon}
                        </span>
                      </div>
                      <div>
                        <div
                          className="text-lg leading-none font-bold text-gray-800"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {s.value}
                        </div>
                        <div className="text-gray-505 mt-0.5 text-xs font-semibold">
                          {s.label}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Filters Card */}
              <div
                className="animate-fade-in-up rounded-2xl border p-5"
                style={{
                  background: "var(--color-surface-container-lowest)",
                  borderColor: "var(--color-outline-variant)",
                  animationDelay: "400ms",
                }}
              >
                <h3
                  className="mb-4 text-xs font-bold tracking-wider text-gray-500 uppercase"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  Filtrar por categoría
                </h3>

                <div className="flex flex-wrap gap-2">
                  {activeFilters.size > 0 && (
                    <button
                      onClick={clearFilters}
                      className="rounded-full border border-dashed border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition-all duration-200 hover:bg-red-100 active:scale-95"
                      aria-label="Limpiar todos los filtros"
                    >
                      ✕ Limpiar ({filteredCount})
                    </button>
                  )}

                  {ALL_CATEGORIES.map((cat) => {
                    const b = BADGE[cat];
                    const isActive = activeFilters.has(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleFilter(cat)}
                        aria-pressed={isActive}
                        className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: isActive ? b.bg : "transparent",
                          color: isActive
                            ? b.color
                            : "var(--color-on-surface-variant)",
                          borderColor: isActive
                            ? b.bg
                            : "var(--color-outline-variant)",
                          boxShadow: isActive
                            ? "0 1px 4px rgba(0,0,0,0.12)"
                            : "none",
                        }}
                      >
                        {b.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </aside>

            {/* ── TIMELINE COLUMN ── */}
            <div className="flex-1" id="timeline">
              {filtered.length === 0 && (
                <div
                  className="rounded-2xl border py-20 text-center"
                  style={{
                    background: "var(--color-surface-container-low)",
                    borderColor: "var(--color-outline-variant)",
                  }}
                >
                  <p
                    className="text-lg font-medium"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    Sin resultados para los filtros seleccionados.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-4 rounded-full px-6 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-80"
                    style={{ background: "var(--color-primary)" }}
                  >
                    Ver todos los cambios
                  </button>
                </div>
              )}

              {filtered.map((group, gi) => (
                <section
                  key={group.version}
                  aria-labelledby={`version-${group.version}`}
                  className="mb-14 last:mb-0"
                >
                  {/* Version header */}
                  <div className="mb-6 flex items-center gap-4">
                    <div
                      className="shrink-0 rounded-full px-4 py-1.5 text-sm font-bold"
                      style={{
                        background: "var(--color-primary)",
                        color: "#fff",
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {group.version}
                    </div>
                    <div>
                      <h2
                        id={`version-${group.version}`}
                        className="text-lg leading-tight font-semibold"
                        style={{
                          color: "var(--color-on-surface)",
                          fontFamily: "var(--font-headline)",
                        }}
                      >
                        {group.label}
                      </h2>
                      <p
                        className="mt-0.5 text-xs"
                        style={{ color: "var(--color-on-surface-variant)" }}
                      >
                        {group.dateRange}
                      </p>
                    </div>
                  </div>

                  {/* Entries list */}
                  <ol
                    className="relative"
                    style={{ listStyle: "none", padding: 0, margin: 0 }}
                  >
                    {/* Vertical line */}
                    <li
                      aria-hidden="true"
                      className="absolute top-0 bottom-0 left-4 w-px sm:left-5"
                      style={{ background: "var(--color-outline-variant)" }}
                    />

                    {group.entries.map((entry, ei) => {
                      const b = BADGE[entry.category];
                      const isVisible = visibleIds.has(entry.id);

                      return (
                        <li
                          key={entry.id}
                          id={entry.id}
                          data-timeline-entry
                          className="relative mb-5 pl-10 transition-all duration-500 last:mb-0 sm:pl-12"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible
                              ? "translateY(0)"
                              : "translateY(20px)",
                          }}
                        >
                          {/* Dot */}
                          <div
                            aria-hidden="true"
                            className="absolute top-4 left-2 h-4 w-4 rounded-full border-2 border-white shadow-sm sm:left-2.5"
                            style={{ background: b.bg, borderColor: b.color }}
                          />

                          {/* Card */}
                          <article
                            aria-labelledby={`title-${entry.id}`}
                            className="rounded-xl border p-4 transition-shadow duration-200 hover:shadow-md sm:p-5"
                            style={{
                              background:
                                "var(--color-surface-container-lowest)",
                              borderColor: "var(--color-outline-variant)",
                            }}
                          >
                            {/* Meta row */}
                            <div className="mb-2 flex flex-wrap items-center gap-2">
                              {/* Category badge */}
                              <span
                                className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold"
                                style={{ background: b.bg, color: b.color }}
                              >
                                {b.label}
                              </span>
                              {/* Date */}
                              <time
                                dateTime={entry.date}
                                className="text-xs"
                                style={{
                                  color: "var(--color-on-surface-variant)",
                                }}
                              >
                                {formatDate(entry.date)}
                              </time>
                              {/* Commit hash */}
                              {entry.commit && (
                                <code
                                  className="rounded px-1.5 py-0.5 font-mono text-xs"
                                  style={{
                                    background:
                                      "var(--color-surface-container)",
                                    color: "var(--color-on-surface-variant)",
                                  }}
                                >
                                  {entry.commit}
                                </code>
                              )}
                            </div>

                            {/* Title */}
                            <h3
                              id={`title-${entry.id}`}
                              className="mb-1.5 text-base leading-snug font-semibold"
                              style={{
                                color: "var(--color-on-surface)",
                                fontFamily: "var(--font-headline)",
                              }}
                            >
                              {entry.title}
                            </h3>

                            {/* Description */}
                            <p
                              className="text-sm leading-relaxed"
                              style={{
                                color: "var(--color-on-surface-variant)",
                              }}
                            >
                              {entry.description}
                            </p>

                            {/* Clarification note */}
                            {entry.note && (
                              <div
                                className="mt-3 rounded-lg border-l-2 px-3 py-2 text-xs leading-relaxed"
                                style={{
                                  background:
                                    "var(--color-surface-container-low)",
                                  color: "var(--color-on-surface-variant)",
                                  borderColor: "var(--color-outline)",
                                }}
                              >
                                <span
                                  className="font-semibold"
                                  style={{ color: "var(--color-on-surface)" }}
                                >
                                  Nota:
                                </span>{" "}
                                {entry.note}
                              </div>
                            )}
                          </article>
                        </li>
                      );
                    })}
                  </ol>
                </section>
              ))}

              {/* Bottom note */}
              {filtered.length > 0 && (
                <div
                  className="border-t pt-6 pb-2 text-center"
                  style={{ borderColor: "var(--color-outline-variant)" }}
                >
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-on-surface-variant)" }}
                  >
                    Mostrando{" "}
                    <strong style={{ color: "var(--color-on-surface)" }}>
                      {filteredCount}
                    </strong>{" "}
                    de{" "}
                    <strong style={{ color: "var(--color-on-surface)" }}>
                      {totalEntries}
                    </strong>{" "}
                    entradas · Orden cronológico inverso (más reciente primero)
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HELPER
// ─────────────────────────────────────────────────────────────────────────────
function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
