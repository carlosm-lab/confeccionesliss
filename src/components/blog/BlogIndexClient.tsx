"use client";

import { useState, useMemo, useEffect } from "react";
import type { BlogPost, BlogPilar, Universidad } from "@/data/blog-posts";
import { filterBlogPosts } from "@/data/blog-posts";
import { BlogCard } from "./BlogCard";
import { BlogEmptyState } from "./BlogEmptyState";
import { BlogWhatsAppCTA } from "./BlogWhatsAppCTA";
import { Icon } from "@/components/ui/icons/Icon";
import { cn } from "@/lib/utils";

const PILARES: { label: string; value: BlogPilar | "Todos" }[] = [
  { label: "Todas las guías", value: "Todos" },
  { label: "Universidad", value: "Universidad" },
  { label: "Normativa MINSAL", value: "Normativa MINSAL" },
  { label: "Carrera", value: "Carrera" },
  { label: "Guías de compra y cuidado", value: "Guías de compra y cuidado" },
  { label: "Local y negocio", value: "Local y negocio" },
  { label: "Estacional", value: "Estacional" },
  { label: "Comparativas", value: "Comparativas" },
];

const UNIVERSIDADES: (Universidad | "Todas")[] = [
  "Todas",
  "UNIVO",
  "IEPROES",
  "UGB",
  "UNAB",
  "UES",
  "UMA",
  "UEES",
];

const PAGE_SIZE = 9;

type SecondaryNavTab =
  | "tendencias"
  | "mas_leidas"
  | "recientes"
  | "oficiales"
  | "universidades"
  | "minsal";

interface BlogIndexClientProps {
  publishedPosts: BlogPost[];
  featuredPosts: BlogPost[];
}

export function BlogIndexClient({
  publishedPosts,
  featuredPosts,
}: BlogIndexClientProps) {
  const [selectedPilar, setSelectedPilar] = useState<BlogPilar | "Todos">(
    "Todos"
  );
  const [selectedUniversity, setSelectedUniversity] = useState<
    Universidad | "Todas"
  >("Todas");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeSecondaryTab, setActiveSecondaryTab] =
    useState<SecondaryNavTab>("tendencias");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileDrawerOpen]);

  // Counts per pilar
  const pilarCounts = useMemo(() => {
    const counts: Record<string, number> = { Todos: publishedPosts.length };
    publishedPosts.forEach((post) => {
      counts[post.pilar] = (counts[post.pilar] || 0) + 1;
    });
    return counts;
  }, [publishedPosts]);

  // Counts per university
  const universityCounts = useMemo(() => {
    const counts: Record<string, number> = { Todas: publishedPosts.length };
    publishedPosts.forEach((post) => {
      if (post.universidad) {
        counts[post.universidad] = (counts[post.universidad] || 0) + 1;
      }
    });
    return counts;
  }, [publishedPosts]);

  // Handle Secondary Tab Navigation
  const handleSecondaryTabChange = (tab: SecondaryNavTab) => {
    setActiveSecondaryTab(tab);
    setVisibleCount(PAGE_SIZE);

    if (tab === "oficiales") {
      setSelectedPilar("Guías de compra y cuidado");
    } else if (tab === "universidades") {
      setSelectedPilar("Universidad");
    } else if (tab === "minsal") {
      setSelectedPilar("Normativa MINSAL");
    } else {
      setSelectedPilar("Todos");
      setSelectedUniversity("Todas");
    }
  };

  // Filtered posts logic
  const filteredPosts = useMemo(() => {
    let posts = filterBlogPosts(
      publishedPosts,
      selectedPilar,
      selectedUniversity,
      searchQuery
    );

    if (activeSecondaryTab === "mas_leidas") {
      posts = [...posts].sort(
        (a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0)
      );
    } else if (activeSecondaryTab === "recientes") {
      posts = [...posts].sort((a, b) => {
        const dateA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        const dateB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        return dateB - dateA;
      });
    }

    return posts;
  }, [
    publishedPosts,
    selectedPilar,
    selectedUniversity,
    searchQuery,
    activeSecondaryTab,
  ]);

  const visiblePosts = useMemo(() => {
    return filteredPosts.slice(0, visibleCount);
  }, [filteredPosts, visibleCount]);

  const isFiltered =
    selectedPilar !== "Todos" ||
    selectedUniversity !== "Todas" ||
    searchQuery.trim() !== "";

  const handleClearFilters = () => {
    setSelectedPilar("Todos");
    setSelectedUniversity("Todas");
    setSearchQuery("");
    setActiveSecondaryTab("tendencias");
    setVisibleCount(PAGE_SIZE);
  };

  const handlePilarSelect = (pilar: BlogPilar | "Todos") => {
    setSelectedPilar(pilar);
    if (pilar !== "Universidad" && pilar !== "Todos") {
      setSelectedUniversity("Todas");
    }
    setVisibleCount(PAGE_SIZE);
  };

  const handleUniversitySelect = (uni: Universidad | "Todas") => {
    setSelectedUniversity(uni);
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
      {/* 📌 DESKTOP LEFT SIDEBAR (Sticky on lg) 📌 */}
      <aside className="hidden flex-col space-y-6 lg:sticky lg:top-20 lg:flex lg:max-h-[calc(100vh-6rem)] lg:w-72 lg:shrink-0 lg:self-start xl:w-80">
        <div
          className="animate-fade-in-up flex max-h-full w-full flex-col space-y-5 overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-5 shadow-2xs"
          style={{ animationDelay: "200ms" }}
        >
          {/* Search Box with Updated Placeholder */}
          <div className="shrink-0">
            <label
              htmlFor="blog-search-desktop"
              className="mb-2 block font-serif text-xs font-bold tracking-wider text-gray-500 uppercase"
            >
              Buscar en el blog
            </label>
            <div className="focus-within:border-primary relative rounded-xl border border-gray-200 bg-gray-50/70 shadow-2xs transition-all">
              <Icon
                name="search"
                size={18}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
                aria-hidden="true"
              />
              <input
                id="blog-search-desktop"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar guías, universidades o normativas..."
                className="text-primary w-full rounded-xl bg-transparent py-2.5 pr-8 pl-9 text-xs placeholder-gray-400 outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="hover:text-primary absolute top-1/2 right-2.5 -translate-y-1/2 text-gray-400"
                  aria-label="Limpiar búsqueda"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Categories Section */}
          <div className="shrink-0 space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xs font-bold tracking-wider text-gray-500 uppercase">
                Categorías
              </h3>
              {isFiltered && (
                <button
                  onClick={handleClearFilters}
                  className="text-primary text-[11px] font-semibold hover:underline"
                >
                  Limpiar
                </button>
              )}
            </div>

            <nav
              aria-label="Categorías del blog"
              className="max-h-56 space-y-1 overflow-y-auto pr-1"
            >
              {PILARES.map(({ label, value }) => {
                const isActive = selectedPilar === value;
                const count = pilarCounts[value] || 0;
                return (
                  <button
                    key={value}
                    onClick={() => handlePilarSelect(value)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition-all",
                      isActive
                        ? "bg-primary font-bold text-white shadow-2xs"
                        : "text-gray-600 hover:bg-gray-100/80"
                    )}
                  >
                    <span className="truncate pr-2">{label}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px]",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-gray-100 text-gray-500"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Universities Section */}
          <div className="shrink-0 space-y-2 border-t border-gray-100 pt-4">
            <h3 className="flex items-center gap-1 font-serif text-xs font-bold tracking-wider text-gray-500 uppercase">
              <Icon name="school" size={14} className="text-primary" />
              Filtrar por universidad
            </h3>
            <div className="flex max-h-36 flex-wrap gap-1.5 overflow-y-auto pr-1">
              {UNIVERSIDADES.map((uni) => {
                const key = uni || "Todas";
                const isActive = selectedUniversity === uni;
                const count = universityCounts[key] || 0;
                return (
                  <button
                    key={key}
                    onClick={() => handleUniversitySelect(uni)}
                    className={cn(
                      "rounded-lg px-2.5 py-1 text-[11px] font-medium transition-all",
                      isActive
                        ? "bg-primary font-bold text-white shadow-2xs"
                        : "border border-gray-200/60 bg-gray-100/80 text-gray-600 hover:bg-gray-200/60"
                    )}
                  >
                    {uni === "Todas"
                      ? `Todas (${publishedPosts.length})`
                      : `${uni} (${count})`}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Official Info Box */}
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-2xs">
          <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
            <Icon name="verified" size={20} />
          </div>
          <div>
            <h4 className="text-xs leading-snug font-bold text-gray-900">
              Información oficial y actualizada
            </h4>
            <p className="mt-0.5 text-[11px] leading-tight text-gray-400">
              Basado en normativas MINSAL y requerimientos de cada universidad.
            </p>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT COLUMN ── */}
      <div className="flex-1 space-y-8">
        {/* Mobile Filter Button (lg:hidden) */}
        <div className="flex items-center justify-between lg:hidden">
          <button
            onClick={() => setIsMobileDrawerOpen(true)}
            className="text-primary flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold shadow-2xs transition active:scale-[0.98]"
          >
            <span className="flex items-center gap-2">
              <Icon name="tune" size={20} className="text-primary" />
              <span>Filtros y Búsqueda del Blog</span>
            </span>
            <span className="bg-primary/10 text-primary max-w-[130px] truncate rounded-full px-2.5 py-0.5 text-xs font-bold">
              {selectedPilar !== "Todos"
                ? selectedPilar
                : selectedUniversity !== "Todas" && selectedUniversity !== null
                  ? selectedUniversity
                  : "Todas"}
            </span>
          </button>
        </div>

        {/* 🌟 ARTÍCULOS DESTACADOS DENTRO DE TARJETA CON BORDE PUNTEADO (ESTILO CATÁLOGO) 🌟 */}
        {featuredPosts.length > 0 && !isFiltered && (
          <section
            aria-labelledby="featured-heading"
            className="border-primary/25 bg-primary/[0.03] animate-fade-in rounded-2xl border-2 border-dashed p-5 shadow-2xs md:p-6"
          >
            <div className="border-primary/10 mb-5 flex flex-wrap items-center justify-between gap-2 border-b pb-3">
              <div className="text-primary flex items-center gap-2 font-serif text-lg font-bold">
                <Icon name="star" size={20} className="text-primary" />
                <h2 id="featured-heading">Artículos destacados</h2>
              </div>
              <span className="bg-primary/10 border-primary/20 text-primary flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold">
                <Icon name="sparkles" size={13} className="text-primary" />
                Guías oficiales más leídas
              </span>
            </div>

            {/* 3-Column Grid on Desktop with Inner Padding Frames */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.slice(0, 3).map((post) => (
                <article
                  key={post.slug}
                  className="group border-primary/20 hover:border-primary/40 relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-3 shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    {/* Thumbnail OpenGraph 16:9 Ratio with inner frame margin */}
                    <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
                      {post.imagen ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={post.imagen}
                          alt={post.titulo}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="bg-primary/5 text-primary/40 flex h-full w-full items-center justify-center">
                          <Icon name="bookmark" size={28} />
                        </div>
                      )}

                      {/* Floating Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                        <span className="bg-primary/90 rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                          {post.pilar}
                        </span>
                        {post.universidad && (
                          <span className="text-primary rounded-md bg-white/95 px-2 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur-xs">
                            {post.universidad}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="px-1">
                      <h3 className="text-primary group-hover:text-primary/80 line-clamp-2 font-serif text-base leading-snug font-bold transition-colors">
                        <a
                          href={`/blog/${post.slug}`}
                          className="after:absolute after:inset-0 focus:outline-none"
                        >
                          {post.titulo}
                        </a>
                      </h3>
                    </div>
                  </div>

                  <div className="mt-auto px-1 pt-3">
                    <span className="text-primary inline-flex items-center gap-1 text-xs font-bold transition-transform group-hover:translate-x-0.5">
                      Leer artículo
                      <Icon name="arrow_forward" size={13} />
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── SECONDARY NAVIGATION BAR (TENDENCIAS, MÁS LEÍDAS, RECIÉN PUBLICADAS) ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200/80 pb-4">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "tendencias", label: "Tendencias", icon: "flame" },
              {
                id: "mas_leidas",
                label: "Más leídas esta semana",
                icon: "star",
              },
              { id: "recientes", label: "Recién publicadas", icon: "sparkles" },
              { id: "oficiales", label: "Guías oficiales", icon: "menu_book" },
              { id: "universidades", label: "Universidades", icon: "school" },
              { id: "minsal", label: "MINSAL", icon: "health_and_safety" },
            ].map((tab) => {
              const isActive = activeSecondaryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() =>
                    handleSecondaryTabChange(tab.id as SecondaryNavTab)
                  }
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all",
                    isActive
                      ? "bg-primary font-bold text-white shadow-2xs"
                      : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/60"
                  )}
                >
                  <Icon
                    name={tab.icon}
                    size={14}
                    className={cn(isActive ? "text-white" : "text-primary/70")}
                  />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Grid vs List View Mode Toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50/80 p-0.5">
            <button
              onClick={() => setViewMode("grid")}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all",
                viewMode === "grid"
                  ? "text-primary bg-white shadow-2xs"
                  : "text-gray-400 hover:text-gray-700"
              )}
              aria-label="Vista en cuadrícula"
            >
              <Icon name="grid_view" size={16} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md text-xs transition-all",
                viewMode === "list"
                  ? "text-primary bg-white shadow-2xs"
                  : "text-gray-400 hover:text-gray-700"
              )}
              aria-label="Vista en lista"
            >
              <Icon name="format_list_bulleted" size={16} />
            </button>
          </div>
        </div>

        {/* ── MAIN GRID (3 COLUMNS DESKTOP - lg:grid-cols-3) ── */}
        {filteredPosts.length > 0 ? (
          <>
            <div
              className={cn(
                "grid gap-6",
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              )}
            >
              {visiblePosts.map((post, idx) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  priority={idx < 3}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* Taller, Prominent "Cargar más guías" Button */}
            {visibleCount < filteredPosts.length && (
              <div className="pt-8 text-center">
                <button
                  onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                  className="focus:ring-primary inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-10 py-3.5 text-xs font-bold text-gray-800 shadow-2xs transition-all hover:bg-gray-50 hover:shadow-xs focus:ring-2 focus:outline-none active:scale-98 sm:text-sm"
                >
                  <span>
                    Cargar más guías ({filteredPosts.length - visibleCount}{" "}
                    restantes)
                  </span>
                  <Icon
                    name="expand_more"
                    size={18}
                    className="text-gray-600"
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          <BlogEmptyState
            onResetFilters={handleClearFilters}
            selectedPilar={
              selectedPilar !== "Todos" ? selectedPilar : undefined
            }
            selectedUniversity={
              selectedUniversity !== "Todas" && selectedUniversity !== null
                ? selectedUniversity
                : undefined
            }
          />
        )}

        {/* Conversion Banner */}
        <BlogWhatsAppCTA />
      </div>

      {/* ── MOBILE FILTER DRAWER (lg:hidden) ── */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-[998] cursor-pointer bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-blog-filter-title"
        className={cn(
          "fixed inset-y-0 right-0 z-[999] flex w-full max-w-[22rem] transform flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out lg:hidden",
          isMobileDrawerOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Drawer Header */}
        <div className="border-primary/15 flex items-center justify-between border-b px-5 py-4">
          <div className="flex items-center gap-2">
            <Icon name="tune" size={22} className="text-primary" />
            <h2
              id="mobile-blog-filter-title"
              className="text-primary font-serif text-base font-bold"
            >
              Filtros del Blog
            </h2>
          </div>
          <button
            onClick={() => setIsMobileDrawerOpen(false)}
            className="text-primary/60 hover:bg-primary/5 hover:text-primary flex h-8 w-8 items-center justify-center rounded-full transition-colors"
            aria-label="Cerrar filtros"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-5 py-5">
          {/* Search Box */}
          <div>
            <label
              htmlFor="blog-search-mobile"
              className="text-primary/80 mb-2 block font-serif text-xs font-bold tracking-wider uppercase"
            >
              Buscar artículo
            </label>
            <div className="relative">
              <Icon
                name="search"
                size={18}
                className="text-primary/40 pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                id="blog-search-mobile"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar guías, universidades o normativas..."
                className="border-primary/20 text-primary placeholder-primary/40 focus:border-primary focus:ring-primary/20 w-full rounded-xl border bg-white py-2.5 pr-8 pl-9 text-xs shadow-xs transition outline-none focus:ring-2"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-primary/40 hover:text-primary absolute top-1/2 right-2.5 -translate-y-1/2"
                  aria-label="Limpiar búsqueda"
                >
                  <Icon name="close" size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Pilar Category List */}
          <div>
            <h3 className="text-primary/80 mb-2 font-serif text-xs font-bold tracking-wider uppercase">
              Categorías
            </h3>
            <nav aria-label="Categorías del blog móvil" className="space-y-1">
              {PILARES.map(({ label, value }) => {
                const isActive = selectedPilar === value;
                const count = pilarCounts[value] || 0;
                return (
                  <button
                    key={value}
                    onClick={() => {
                      handlePilarSelect(value);
                      setIsMobileDrawerOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-semibold transition-all",
                      isActive
                        ? "bg-primary font-bold text-white shadow-xs"
                        : "text-primary/90 hover:bg-primary/5"
                    )}
                  >
                    <span className="truncate pr-2">{label}</span>
                    <span
                      className={cn(
                        "shrink-0 rounded-full px-2 py-0.5 text-[10px]",
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-primary/10 text-primary"
                      )}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* University Sub-filter List */}
          {(selectedPilar === "Universidad" || selectedPilar === "Todos") && (
            <div className="border-primary/15 space-y-2 border-t pt-4">
              <h3 className="text-primary/80 flex items-center gap-1 font-serif text-xs font-bold tracking-wider uppercase">
                <Icon name="school" size={14} className="text-primary" />
                Universidad
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {UNIVERSIDADES.map((uni) => {
                  const key = uni || "Todas";
                  const isActive = selectedUniversity === uni;
                  const count = universityCounts[key] || 0;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        handleUniversitySelect(uni);
                        setIsMobileDrawerOpen(false);
                      }}
                      className={cn(
                        "rounded-lg px-2.5 py-1.5 text-xs font-medium transition-all",
                        isActive
                          ? "bg-primary font-semibold text-white shadow-xs"
                          : "bg-primary/5 border-primary/15 text-primary hover:bg-primary/10 border"
                      )}
                    >
                      {uni === "Todas" ? "Todas" : uni}{" "}
                      {count > 0 && `(${count})`}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        <div className="border-primary/15 bg-primary/5 flex gap-2 border-t px-5 py-4">
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                handleClearFilters();
                setIsMobileDrawerOpen(false);
              }}
              className="border-primary/30 text-primary hover:bg-primary/10 flex-1 rounded-xl border bg-white py-2.5 text-xs font-semibold transition"
            >
              Limpiar todo
            </button>
          )}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(false)}
            className="bg-primary flex-1 rounded-xl py-2.5 text-xs font-bold text-white shadow-xs transition hover:opacity-90"
          >
            Ver {filteredPosts.length} guías
          </button>
        </div>
      </div>
    </div>
  );
}
