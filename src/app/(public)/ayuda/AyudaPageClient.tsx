"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import type { AyudaCategory } from "@/data/ayuda";
import { siteConfig } from "@/config/site";

interface AyudaPageClientProps {
  categories: AyudaCategory[];
  totalQuestions: number;
}

export function AyudaPageClient({
  categories,
  totalQuestions,
}: AyudaPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    const allIds = new Set<string>();
    categories.forEach((cat) => {
      cat.questions.forEach((q) => allIds.add(q.id));
    });
    setOpenItems(allIds);
  };

  const collapseAll = () => setOpenItems(new Set());

  // Filter categories and questions based on category selection & search query
  const filteredCategories = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    return categories
      .map((cat) => {
        if (selectedCategory && cat.id !== selectedCategory) {
          return null;
        }

        const matchingQuestions = cat.questions.filter((item) => {
          if (!q) return true;
          return (
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q) ||
            item.n.toString().includes(q)
          );
        });

        if (matchingQuestions.length === 0) return null;

        return {
          ...cat,
          questions: matchingQuestions,
        };
      })
      .filter(Boolean) as AyudaCategory[];
  }, [categories, selectedCategory, searchQuery]);

  const filteredQuestionCount = useMemo(() => {
    return filteredCategories.reduce(
      (acc, cat) => acc + cat.questions.length,
      0
    );
  }, [filteredCategories]);

  // Intersection Observer for fade-in entry animations (matching /updates)
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
        { threshold: 0.05 }
      );

      const cards = document.querySelectorAll("[data-timeline-entry]");
      cards.forEach((el) => observerRef.current?.observe(el));
    });

    return () => {
      cancelAnimationFrame(rafId);
      observerRef.current?.disconnect();
    };
  }, [filteredCategories]);

  return (
    <main
      id="ayuda-main"
      className="min-h-screen"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-on-surface)",
      }}
    >
      {/* Skip to content */}
      <a
        href="#preguntas-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-blue-900 focus:shadow-lg focus:outline-2"
      >
        Saltar a las preguntas
      </a>

      {/* ── HEADER ── */}
      <section className="bg-surface px-5 pt-6 pb-0 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { label: "Inicio", href: "/" },
              { label: "Ayuda", href: "/ayuda" },
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
            Centro de Ayuda y Preguntas Frecuentes
          </h1>
          <p
            className="animate-fade-in-up mb-2 max-w-3xl text-base leading-relaxed text-gray-500 md:text-lg"
            style={{ animationDelay: "180ms" }}
          >
            Resuelve todas tus dudas sobre scrubs médicos, uniformes
            universitarios, escolares y corporativos en San Miguel, El Salvador:
            precios, tallas a la medida, envíos nacionales, bordados y garantía.
          </p>
          <p
            className="animate-fade-in-up max-w-2xl text-sm leading-relaxed text-gray-400"
            style={{ animationDelay: "200ms" }}
          >
            <strong className="text-gray-800">
              {totalQuestions} preguntas respondidas
            </strong>{" "}
            en {categories.length} categorías especializadas.
          </p>
        </div>
      </section>

      {/* ── CONTENT BODY ── */}
      <section className="bg-surface px-5 pt-12 pb-20 md:px-8">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            {/* 📌 LEFT SIDEBAR (Category Index & Search - Adapts to desktop viewport with internal scroll) 📌 */}
            <aside className="flex w-full shrink-0 flex-col lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:w-72 lg:self-start xl:w-80">
              <div
                className="animate-fade-in-up flex max-h-full flex-col overflow-hidden rounded-2xl border p-5 shadow-xs"
                style={{
                  background: "var(--color-surface-container-lowest)",
                  borderColor: "var(--color-outline-variant)",
                  animationDelay: "300ms",
                }}
              >
                {/* Search box */}
                <div className="mb-5 shrink-0">
                  <label
                    htmlFor="ayuda-search"
                    className="mb-2 block text-xs font-bold tracking-wider text-gray-500 uppercase"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Buscar pregunta
                  </label>
                  <div className="relative">
                    <span
                      className="material-symbols-outlined pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[18px] text-gray-400"
                      aria-hidden="true"
                    >
                      search
                    </span>
                    <input
                      id="ayuda-search"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ej. precio, Sincatex, envío..."
                      className="focus:border-primary focus:ring-primary/20 w-full rounded-xl border border-gray-200 bg-white py-2.5 pr-8 pl-9 text-sm placeholder-gray-400 shadow-xs transition outline-none focus:ring-2"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        aria-label="Limpiar búsqueda"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          close
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Index / Category header */}
                <div className="mb-3 flex shrink-0 items-center justify-between">
                  <h3
                    className="text-xs font-bold tracking-wider text-gray-500 uppercase"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    Índice de temas
                  </h3>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-primary text-xs font-semibold hover:underline"
                    >
                      Ver todo
                    </button>
                  )}
                </div>

                {/* Scrollable category list */}
                <nav
                  aria-label="Índice de temas de ayuda"
                  className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1"
                >
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                      selectedCategory === null
                        ? "bg-primary text-white shadow-xs"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[16px]">
                        grid_view
                      </span>
                      Todas las categorías
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] ${
                        selectedCategory === null
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {totalQuestions}
                    </span>
                  </button>

                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() =>
                          setSelectedCategory(isActive ? null : cat.id)
                        }
                        className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-primary text-white shadow-xs"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <span className="flex items-center gap-2 truncate pr-2">
                          <span className="material-symbols-outlined shrink-0 text-[16px]">
                            {cat.icon}
                          </span>
                          <span className="truncate">{cat.title}</span>
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {cat.questions.length}
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* ── QUESTIONS CONTENT COLUMN ── */}
            <div className="flex-1" id="preguntas-content">
              {/* Toolbar */}
              <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-100 bg-white p-3.5 shadow-xs">
                <div className="text-xs font-medium text-gray-500">
                  Mostrando{" "}
                  <strong className="text-gray-900">
                    {filteredQuestionCount}
                  </strong>{" "}
                  de <strong className="text-gray-900">{totalQuestions}</strong>{" "}
                  preguntas
                  {selectedCategory && (
                    <span className="text-primary ml-1">
                      {`en "${categories.find((c) => c.id === selectedCategory)?.title}"`}
                    </span>
                  )}
                  {searchQuery && (
                    <span className="text-primary ml-1">
                      {`para "${searchQuery}"`}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={expandAll}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100 active:scale-95"
                  >
                    Expandir todo
                  </button>
                  <button
                    onClick={collapseAll}
                    className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-100 active:scale-95"
                  >
                    Colapsar todo
                  </button>
                </div>
              </div>

              {/* Empty state */}
              {filteredCategories.length === 0 && (
                <div
                  className="rounded-2xl border px-6 py-16 text-center"
                  style={{
                    background: "var(--color-surface-container-low)",
                    borderColor: "var(--color-outline-variant)",
                  }}
                >
                  <span className="material-symbols-outlined mb-3 text-5xl text-gray-400">
                    search_off
                  </span>
                  <h3
                    className="text-lg font-bold text-gray-800"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    No se encontraron preguntas
                  </h3>
                  <p className="mx-auto mt-1 max-w-md text-sm text-gray-500">
                    {`No encontramos respuestas coincidentes para tu búsqueda "${searchQuery}". Puedes intentar con otras palabras o escribirnos directamente.`}
                  </p>
                  <div className="mt-6 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory(null);
                      }}
                      className="bg-primary rounded-full px-6 py-2 text-xs font-bold text-white transition hover:opacity-90"
                    >
                      Limpiar filtros
                    </button>
                    <a
                      href={siteConfig.links.whatsappDirect}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-gray-300 bg-white px-6 py-2 text-xs font-bold text-gray-700 transition hover:bg-gray-50"
                    >
                      Escribir por WhatsApp
                    </a>
                  </div>
                </div>
              )}

              {/* Question sections */}
              {filteredCategories.map((cat) => (
                <section
                  key={cat.id}
                  id={cat.id}
                  className="mb-12 scroll-mt-24 last:mb-0"
                >
                  {/* Category Header */}
                  <div className="mb-5 flex items-center gap-3 border-b border-gray-200 pb-3">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                      <span className="material-symbols-outlined text-[22px]">
                        {cat.icon}
                      </span>
                    </div>
                    <div>
                      <h2
                        className="text-primary text-xl leading-tight font-bold"
                        style={{ fontFamily: "var(--font-headline)" }}
                      >
                        {cat.title}
                      </h2>
                      <span className="text-xs text-gray-400">
                        {cat.questions.length} preguntas en este tema
                      </span>
                    </div>
                  </div>

                  {/* Question Cards */}
                  <div className="space-y-3">
                    {cat.questions.map((item) => {
                      const isOpen =
                        openItems.has(item.id) || searchQuery.length > 0;
                      const isVisible = visibleIds.has(item.id);

                      return (
                        <article
                          key={item.id}
                          id={item.id}
                          data-timeline-entry
                          className="group rounded-2xl border transition-all duration-500"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transform: isVisible
                              ? "translateY(0)"
                              : "translateY(20px)",
                            background: isOpen
                              ? "var(--color-surface-container-lowest)"
                              : "white",
                            borderColor: isOpen
                              ? "var(--color-primary)"
                              : "var(--color-outline-variant)",
                          }}
                        >
                          {/* Question Button */}
                          <button
                            onClick={() => toggleItem(item.id)}
                            className="flex w-full items-start justify-between gap-4 p-4 text-left sm:p-5"
                            aria-expanded={isOpen}
                          >
                            <div className="flex items-start gap-3">
                              <span className="bg-primary/10 text-primary mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                                {item.n}
                              </span>
                              <h3
                                className="group-hover:text-primary text-base leading-snug font-semibold text-gray-900 transition-colors"
                                style={{ fontFamily: "var(--font-headline)" }}
                              >
                                {item.question}
                              </h3>
                            </div>
                            <span
                              className={`material-symbols-outlined shrink-0 text-[22px] text-gray-400 transition-transform duration-200 ${
                                isOpen ? "text-primary rotate-180" : ""
                              }`}
                            >
                              expand_more
                            </span>
                          </button>

                          {/* Answer Content */}
                          {isOpen && (
                            <div className="border-t border-gray-100 px-4 pt-3 pb-5 text-sm leading-relaxed text-gray-600 sm:px-5 sm:pl-13">
                              <p className="whitespace-pre-line">
                                {item.answer}
                              </p>

                              {/* Help footer on answer */}
                              <div className="mt-4 flex items-center gap-4 border-t border-gray-50 pt-3 text-xs text-gray-400">
                                <a
                                  href={siteConfig.links.whatsappDirect}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-primary inline-flex items-center gap-1 font-semibold hover:underline"
                                >
                                  <span className="material-symbols-outlined text-[14px]">
                                    chat
                                  </span>
                                  Consultar sobre esto en WhatsApp
                                </a>
                              </div>
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}

              {/* Bottom Help Banner */}
              <div
                className="mt-14 rounded-2xl border p-8 text-center"
                style={{
                  background: "var(--color-surface-container-low)",
                  borderColor: "var(--color-outline-variant)",
                }}
              >
                <span className="material-symbols-outlined text-primary mb-2 text-4xl">
                  contact_support
                </span>
                <h3
                  className="text-primary text-xl font-bold"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  ¿No encontraste la respuesta a tu duda?
                </h3>
                <p className="mx-auto mt-2 max-w-lg text-sm text-gray-600">
                  Escríbenos directamente por WhatsApp y nuestro equipo en San
                  Miguel resolverá tus preguntas sobre tallas, telas,
                  cotizaciones y envíos en pocos minutos.
                </p>
                <div className="mt-6 flex justify-center">
                  <a
                    href={siteConfig.links.whatsappDirect}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary inline-flex items-center gap-2 rounded-xl px-8 py-3.5 text-sm font-bold text-white shadow-md transition hover:opacity-90 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      chat
                    </span>
                    Contactar por WhatsApp (+503 7331-7181)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
