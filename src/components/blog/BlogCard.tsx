import Link from "next/link";
import type { BlogPost } from "@/data/blog-posts";
import { Icon } from "@/components/ui/icons/Icon";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
  viewMode?: "grid" | "list";
}

export function BlogCard({ post, viewMode = "grid" }: BlogCardProps) {
  const isDraft = post.status === "draft";
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("es-SV", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  if (viewMode === "list") {
    return (
      <article className="group border-primary/15 hover:border-primary/40 focus-within:ring-primary relative flex flex-col gap-4 overflow-hidden rounded-2xl border bg-white p-3.5 shadow-2xs transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 hover:shadow-md sm:flex-row">
        {/* Thumbnail with padding frame (16:9 OpenGraph Ratio) */}
        <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:w-48">
          {post.imagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.imagen}
              alt={post.titulo}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="bg-primary/5 text-primary/40 flex h-full w-full items-center justify-center">
              <Icon name="bookmark" size={28} />
            </div>
          )}

          {isDraft && (
            <span className="bg-primary/90 absolute top-2 right-2 rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
              Próximamente
            </span>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between py-1 pr-1">
          <div>
            {/* Badges */}
            <div className="mb-2 flex flex-wrap items-center gap-1.5 text-xs font-semibold">
              <span className="bg-primary rounded-md px-2.5 py-0.5 text-[11px] font-bold text-white">
                {post.pilar}
              </span>
              {post.universidad && (
                <span className="border-primary/20 bg-primary/10 text-primary rounded-md border px-2 py-0.5 text-[11px] font-semibold">
                  {post.universidad}
                </span>
              )}
              {post.carrera && (
                <span className="border-primary/10 bg-primary/5 text-primary/80 rounded-md border px-2 py-0.5 text-[11px] font-medium">
                  {post.carrera}
                </span>
              )}
            </div>

            {/* Title (Standardized font size) */}
            <h2 className="text-primary group-hover:text-primary/80 mb-1.5 line-clamp-2 font-serif text-base leading-snug font-bold transition-colors">
              <Link
                href={`/blog/${post.slug}`}
                className="after:absolute after:inset-0 focus:outline-none"
              >
                {post.titulo}
              </Link>
            </h2>

            {/* Description */}
            <p className="font-body mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500">
              {post.metaDescripcion}
            </p>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-2.5 text-xs font-medium text-gray-400">
            <div className="flex items-center gap-1.5">
              <Icon name="calendar_month" size={14} className="text-gray-400" />
              <span>{formattedDate || "Próximamente"}</span>
            </div>
            <span className="text-primary inline-flex items-center gap-1 font-bold transition-transform group-hover:translate-x-0.5">
              {isDraft ? "En preparación" : "Leer más"}
              <Icon name="arrow_forward" size={14} />
            </span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group border-primary/15 hover:border-primary/40 focus-within:ring-primary relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white p-3 shadow-2xs transition-all duration-300 focus-within:ring-2 focus-within:ring-offset-2 hover:-translate-y-1 hover:shadow-md">
      <div>
        {/* Thumbnail Container with inner margin frame (16:9 Ratio) */}
        <div className="relative mb-3 aspect-[16/9] w-full overflow-hidden rounded-xl bg-gray-100">
          {post.imagen ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.imagen}
              alt={post.titulo}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="bg-primary/5 text-primary/40 flex h-full w-full items-center justify-center">
              <Icon name="bookmark" size={32} />
            </div>
          )}

          {/* Floating Pill Badges on top of Image */}
          <div className="absolute top-2.5 right-2.5 left-2.5 flex flex-wrap items-center justify-between gap-1.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="bg-primary/90 rounded-md px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
                {post.pilar}
              </span>
              {post.universidad && (
                <span className="border-primary/20 text-primary rounded-md border bg-white/95 px-2 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur-xs">
                  {post.universidad}
                </span>
              )}
            </div>

            {isDraft && (
              <span className="border-primary/30 text-primary flex items-center gap-1 rounded-md border bg-white/95 px-2 py-0.5 text-[10px] font-bold shadow-xs backdrop-blur-xs">
                <Icon name="schedule" size={11} className="text-primary" />
                Próximamente
              </span>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="px-1 pb-1">
          {/* Sub Badges (Carrera if present) */}
          {post.carrera && (
            <div className="mb-1.5 flex items-center gap-1">
              <span className="bg-primary/5 border-primary/10 text-primary/80 inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[10px] font-medium">
                <Icon
                  name="stethoscope"
                  size={11}
                  className="text-primary/60"
                />
                {post.carrera}
              </span>
            </div>
          )}

          {/* Title - Standardized balanced size (text-base) */}
          <h2 className="text-primary group-hover:text-primary/80 mb-1.5 line-clamp-2 font-serif text-base leading-snug font-bold transition-colors">
            <Link
              href={`/blog/${post.slug}`}
              className="after:absolute after:inset-0 focus:outline-none"
            >
              {post.titulo}
            </Link>
          </h2>

          {/* Excerpt */}
          <p className="font-body line-clamp-2 text-xs leading-relaxed text-gray-500">
            {post.metaDescripcion}
          </p>
        </div>
      </div>

      {/* Card Footer */}
      <div className="border-primary/10 text-primary/70 mt-3 flex items-center justify-between border-t px-1 pt-2.5 text-xs font-medium">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Icon name="calendar_month" size={14} className="text-gray-400" />
          <span>{formattedDate || "Próximamente"}</span>
        </div>

        <span className="text-primary inline-flex items-center gap-1 font-bold transition-transform group-hover:translate-x-0.5">
          {isDraft ? "En preparación" : "Leer más"}
          <Icon name="arrow_forward" size={14} />
        </span>
      </div>
    </article>
  );
}
