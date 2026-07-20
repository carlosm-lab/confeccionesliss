"use client";

/**
 * ProductReviews — Confecciones Liss v5
 * - Tarjetas con altura fija + modal al hacer clic para ver reseña completa
 * - Modal con el mismo backdrop blur/transparencia que el lightbox existente
 * - StatsPanel sin iconos de estrella por barra (solo número)
 * - Grid: 1 col móvil, 2 tablet, 3 desktop
 */

import { useState, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { reviewSchema } from "@/schemas/reviewSchema";
import type { DbReview } from "@/lib/reviewsService";
import { cn } from "@/lib/utils";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import toast from "react-hot-toast";
import { logger } from "@/lib/logger";

import { sanitizeUrl } from "@/lib/sanitize";

interface ProductReviewsProps {
  productId: string;
  initialReviews: DbReview[];
  averageRating: number;
  totalCount: number;
}

// ── Stars ──────────────────────────────────────────────────────

function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className="material-symbols-outlined leading-none text-amber-400 select-none"
          style={{
            fontSize: size,
            fontVariationSettings: s <= rating ? "'FILL' 1" : "'FILL' 0",
          }}
          aria-hidden="true"
        >
          star
        </span>
      ))}
    </span>
  );
}

// ── Stats panel ────────────────────────────────────────────────

function StatsPanel({
  reviews,
  avgRating,
}: {
  reviews: DbReview[];
  avgRating: number;
}) {
  const total = reviews.length;
  if (total === 0) return null;

  return (
    <div className="border-primary/35 mb-6 flex flex-col gap-4 overflow-hidden rounded-2xl border bg-white px-5 py-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] sm:flex-row sm:items-center">
      {/* Left: score */}
      <div className="flex shrink-0 flex-col items-center gap-0.5 sm:min-w-[80px]">
        <span className="font-serif text-3xl leading-none font-bold text-slate-900">
          {avgRating.toFixed(1)}
        </span>
        <Stars rating={Math.round(avgRating)} size={14} />
        <span className="mt-0.5 text-[10px] text-slate-400">
          de 5 estrellas
        </span>
      </div>

      {/* Separator */}
      <div className="hidden h-10 w-px bg-slate-100 sm:block" />

      {/* Right: distribution bars — sin iconos de estrella por barra */}
      <div className="flex flex-1 flex-col gap-1.5">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = reviews.filter((r) => r.rating === star).length;
          const pct = total > 0 ? (count / total) * 100 : 0;
          return (
            <div key={star} className="flex items-center gap-2">
              <span className="w-2 shrink-0 text-right text-[10px] font-medium text-slate-500">
                {star}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-amber-400 transition-all duration-700"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <span className="w-3 shrink-0 text-right text-[10px] text-slate-400">
                {count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Avatar ─────────────────────────────────────────────────────

function Avatar({
  src,
  name,
  size = 52,
}: {
  src: string | null;
  name: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const safeSrc = sanitizeUrl(src);

  if (safeSrc && !failed) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={safeSrc}
        alt={name}
        width={size}
        height={size}
        className="shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className="bg-primary flex shrink-0 items-center justify-center rounded-full font-serif font-bold text-white"
      style={{ width: size, height: size, fontSize: size * 0.38 }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

// ── Review modal ───────────────────────────────────────────────

function ReviewModal({
  review,
  onClose,
}: {
  review: DbReview;
  onClose: () => void;
}) {
  const date = new Date(review.created_at).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  // Bloquea scroll + compensa scrollbar width (sin layout shift)
  useBodyScrollLock(true);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    /* Backdrop — aparece instantáneo */
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Reseña completa"
    >
      {/* Capa de blur/oscuridad — sin animación para que sea inmediata */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-[2px] sm:bg-black/20"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Card — solo este tiene la animación de entrada */}
      <div className="animate-in fade-in zoom-in-95 relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl duration-150">
        {/* Header: avatar + info + botón X dentro del card */}
        <div className="flex items-start gap-4 border-b border-slate-100 px-5 py-4">
          <Avatar src={review.user_avatar} name={review.user_name} size={44} />
          <div className="flex-1">
            <p className="font-serif text-base font-bold text-slate-900">
              {review.user_name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <Stars rating={review.rating} size={14} />
              <span className="text-xs text-slate-400">{date}</span>
            </div>
          </div>
          {/* X DENTRO del card, no flotando sobre el backdrop */}
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 18 }}
            >
              close
            </span>
          </button>
        </div>

        {/* Comment — scrollable si es largo */}
        <div className="max-h-[55dvh] overflow-y-auto px-5 py-4">
          <p className="text-[15px] leading-relaxed text-slate-700">
            {review.comment}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Review card ────────────────────────────────────────────────

const CARD_MAX_LINES = 4;

function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
  isDeleting,
  index,
}: {
  review: DbReview;
  currentUserId: string | null;
  onEdit: (r: DbReview) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
  index: number;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isOwner = currentUserId === review.user_id;
  const date = new Date(review.created_at).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <>
      <article
        className="animate-fade-in-up group border-primary/35 hover:border-primary/55 relative flex flex-col rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
        style={{ animationDelay: `${index * 70}ms` }}
      >
        {/* Botón transparente que cubre la tarjeta — accesible y sin role en article */}
        <button
          type="button"
          className="absolute inset-0 cursor-pointer rounded-2xl"
          onClick={() => setModalOpen(true)}
          aria-label={`Ver reseña completa de ${review.user_name}`}
        />
        {/* Decorative quote */}
        <span
          className="pointer-events-none absolute top-4 right-5 font-serif text-8xl leading-none text-slate-100 select-none"
          aria-hidden="true"
        >
          &ldquo;
        </span>

        {/* Header: avatar + meta + actions */}
        <div className="mb-4 flex items-start gap-3">
          <Avatar src={review.user_avatar} name={review.user_name} size={44} />
          <div className="flex min-w-0 flex-1 items-start justify-between gap-2">
            <div>
              <p className="font-serif text-sm leading-snug font-bold text-slate-900">
                {review.user_name}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-2">
                <Stars rating={review.rating} size={13} />
                <span className="text-[11px] text-slate-400">{date}</span>
              </div>
            </div>

            {/* Owner actions — z-10 so they sit above the transparent button overlay */}
            {isOwner && (
              <div className="relative z-10 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(review);
                  }}
                  className="hover:text-primary rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100"
                  aria-label="Editar reseña"
                  title="Editar"
                >
                  <span className="material-symbols-outlined text-[14px]">
                    edit
                  </span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(review.id);
                  }}
                  disabled={isDeleting}
                  className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                  aria-label="Eliminar reseña"
                  title="Eliminar"
                >
                  {isDeleting ? (
                    <span className="material-symbols-outlined animate-spin text-[14px]">
                      progress_activity
                    </span>
                  ) : (
                    <span className="material-symbols-outlined text-[14px]">
                      delete
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Comment — altura fija, truncado */}
        <p
          className="flex-1 text-sm leading-relaxed text-slate-600"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: CARD_MAX_LINES,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {review.comment}
        </p>

        {/* "Leer más" hint */}
        <p className="text-primary/60 group-hover:text-primary relative z-10 mt-3 text-[11px] font-semibold transition-colors">
          Leer más →
        </p>
      </article>

      {/* Modal — renderizado via createPortal en document.body para escapar
           el stacking context del transform de animate-fade-in-up */}
      {modalOpen &&
        mounted &&
        createPortal(
          <ReviewModal review={review} onClose={() => setModalOpen(false)} />,
          document.body
        )}
    </>
  );
}

// ── Star picker ────────────────────────────────────────────────

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Muy malo", "Malo", "Regular", "Bueno", "Excelente"];
  const active = hovered || value;
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div
        className="flex items-center gap-1"
        role="radiogroup"
        aria-label="Calificación"
      >
        {[1, 2, 3, 4, 5].map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={value === s}
            aria-label={`${s} estrella${s > 1 ? "s" : ""}`}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(s)}
            className="transition-transform hover:scale-110 active:scale-95"
          >
            <span
              className="material-symbols-outlined leading-none text-amber-400 transition-all"
              style={{
                fontSize: 30,
                fontVariationSettings: s <= active ? "'FILL' 1" : "'FILL' 0",
              }}
              aria-hidden="true"
            >
              star
            </span>
          </button>
        ))}
      </div>
      {active > 0 && (
        <span className="text-sm font-semibold text-amber-600">
          {labels[active]}
        </span>
      )}
    </div>
  );
}

// ── Review form ────────────────────────────────────────────────

function ReviewForm({
  productId,
  editTarget,
  onSuccess,
  onCancel,
  userInfo,
}: {
  productId: string;
  editTarget: DbReview | null;
  onSuccess: (r: DbReview) => void;
  onCancel: () => void;
  userInfo: { id: string; name: string; avatar: string | null };
}) {
  const [rating, setRating] = useState(editTarget?.rating ?? 0);
  const [comment, setComment] = useState(editTarget?.comment ?? "");
  const [errors, setErrors] = useState<{ rating?: string; comment?: string }>(
    {}
  );
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const parsed = reviewSchema.safeParse({ rating, comment });
    if (!parsed.success) {
      const fe: { rating?: string; comment?: string } = {};
      for (const issue of parsed.error.issues) {
        const f = issue.path[0] as "rating" | "comment";
        if (!fe[f]) fe[f] = issue.message;
      }
      setErrors(fe);
      return;
    }
    setIsPending(true);
    try {
      const sb = getSupabaseClient();
      if (editTarget) {
        const { data, error } = await sb
          .from("product_reviews")
          .update({
            rating: parsed.data.rating,
            comment: parsed.data.comment,
            updated_at: new Date().toISOString(),
          })
          .eq("id", editTarget.id)
          .eq("user_id", userInfo.id)
          .select()
          .single();
        if (error) {
          logger.error("[ReviewForm] update:", error);
          toast.error("No se pudo actualizar.");
          return;
        }
        toast.success("Reseña actualizada");
        onSuccess(data as DbReview);
      } else {
        const { data, error } = await sb
          .from("product_reviews")
          .insert({
            product_id: productId,
            user_id: userInfo.id,
            rating: parsed.data.rating,
            comment: parsed.data.comment,
            user_name: userInfo.name,
            user_avatar: userInfo.avatar,
          })
          .select()
          .single();
        if (error) {
          logger.error("[ReviewForm] insert:", error);
          toast.error(
            error.code === "23505"
              ? "Ya tienes una reseña para este producto."
              : "No se pudo guardar."
          );
          return;
        }
        toast.success("¡Gracias por tu reseña!");
        onSuccess(data as DbReview);
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="animate-fade-in-up rounded-2xl bg-white p-6"
      style={{
        boxShadow:
          "0 1px 4px rgba(20,48,103,0.06), 0 6px 20px rgba(20,48,103,0.06)",
      }}
    >
      <div className="mb-5 flex items-center gap-3">
        <Avatar src={userInfo.avatar} name={userInfo.name} size={44} />
        <div>
          <p className="font-serif text-sm font-bold text-slate-800">
            {userInfo.name}
          </p>
          <p className="text-xs text-slate-400">
            {editTarget ? "Editando tu reseña" : "Escribe una reseña"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="mb-2 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Calificación <span className="text-red-400">*</span>
          </p>
          <StarPicker value={rating} onChange={setRating} />
          {errors.rating && (
            <p className="mt-1 text-xs text-red-500">{errors.rating}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="review-comment"
            className="mb-2 block text-xs font-semibold tracking-wider text-slate-400 uppercase"
          >
            Comentario <span className="text-red-400">*</span>
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Cuéntanos tu experiencia con este producto… (mín. 10 caracteres)"
            className={cn(
              "w-full resize-none rounded-xl border bg-slate-50 p-4 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:bg-white focus:ring-2",
              errors.comment
                ? "border-red-300 focus:ring-red-100"
                : "focus:border-primary/40 focus:ring-primary/10 border-slate-200"
            )}
          />
          <div className="mt-1 flex items-center justify-between">
            {errors.comment ? (
              <p className="text-xs text-red-500">{errors.comment}</p>
            ) : (
              <span />
            )}
            <span
              className={cn(
                "text-xs",
                comment.length > 900 ? "text-amber-500" : "text-slate-400"
              )}
            >
              {comment.length}/1000
            </span>
          </div>
        </div>

        <div className="flex gap-2.5 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 flex items-center gap-1.5 rounded-xl px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.98] disabled:opacity-60"
          >
            {isPending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[15px]">
                  progress_activity
                </span>
                Guardando…
              </>
            ) : editTarget ? (
              "Guardar cambios"
            ) : (
              "Publicar reseña"
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Main ───────────────────────────────────────────────────────

export function ProductReviews({
  productId,
  initialReviews,
  averageRating,
  totalCount,
}: ProductReviewsProps) {
  const { user, showAuthModal } = useAuth();
  const [reviews, setReviews] = useState<DbReview[]>(initialReviews);
  const [aggRating, setAggRating] = useState(averageRating);
  const [aggCount, setAggCount] = useState(totalCount);
  const [showForm, setShowForm] = useState(false);
  const [editTarget, setEditTarget] = useState<DbReview | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const userReview = user ? reviews.find((r) => r.user_id === user.id) : null;

  const recalc = useCallback((next: DbReview[]) => {
    const n = next.length;
    setAggCount(n);
    setAggRating(
      n > 0
        ? Math.round((next.reduce((s, r) => s + r.rating, 0) / n) * 10) / 10
        : 0
    );
  }, []);

  const handleSuccess = useCallback(
    (rev: DbReview) => {
      setReviews((prev) => {
        const isEdit = prev.some((r) => r.id === rev.id);
        const next = isEdit
          ? prev.map((r) => (r.id === rev.id ? rev : r))
          : [rev, ...prev];
        recalc(next);
        return next;
      });
      setShowForm(false);
      setEditTarget(null);
    },
    [recalc]
  );

  const handleEdit = useCallback((r: DbReview) => {
    setEditTarget(r);
    setShowForm(true);
    setTimeout(
      () =>
        document
          .getElementById("review-form-anchor")
          ?.scrollIntoView({ behavior: "smooth", block: "center" }),
      50
    );
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!user) return;
      setDeletingId(id);
      const { error } = await getSupabaseClient()
        .from("product_reviews")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);
      if (error) {
        toast.error("No se pudo eliminar la reseña.");
        setDeletingId(null);
        return;
      }
      setReviews((prev) => {
        const next = prev.filter((r) => r.id !== id);
        recalc(next);
        return next;
      });
      setDeletingId(null);
      toast.success("Reseña eliminada");
    },
    [user, recalc]
  );

  const userInfo = user
    ? {
        id: user.id,
        name:
          (user.user_metadata?.full_name as string) ||
          (user.user_metadata?.name as string) ||
          user.email?.split("@")[0] ||
          "Usuario",
        avatar:
          (user.user_metadata?.avatar_url as string) ||
          (user.user_metadata?.picture as string) ||
          null,
      }
    : null;

  return (
    <section
      className="animate-fade-in-up -mx-5 mt-16 bg-slate-50 px-5 py-10 md:-mx-8 md:px-8"
      style={{ animationDelay: "350ms" }}
      aria-labelledby="reviews-heading"
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            id="reviews-heading"
            className="font-serif text-2xl font-bold text-slate-900"
          >
            Reseñas
          </h2>
          {aggCount > 0 && (
            <div className="mt-1 flex items-center gap-2">
              <Stars rating={Math.round(aggRating)} size={14} />
              <span className="text-sm font-semibold text-slate-700">
                {aggRating.toFixed(1)}
              </span>
              <span className="text-sm text-slate-400">·</span>
              <span className="text-sm text-slate-500">
                {aggCount} {aggCount === 1 ? "reseña" : "reseñas"}
              </span>
            </div>
          )}
        </div>

        {user && !userReview && !showForm && (
          <button
            type="button"
            id="add-review-btn"
            onClick={() => {
              setEditTarget(null);
              setShowForm(true);
            }}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.97]"
          >
            <span className="material-symbols-outlined text-[16px]">
              rate_review
            </span>
            Escribir reseña
          </button>
        )}
        {!user && (
          <button
            type="button"
            onClick={() => showAuthModal("reviews")}
            className="border-primary/25 text-primary hover:border-primary/40 flex w-full items-center justify-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold shadow-sm transition hover:shadow-md active:scale-[0.97] md:w-auto md:justify-start"
          >
            <span className="material-symbols-outlined text-[15px]">login</span>
            Inicia sesión para calificar
          </button>
        )}
      </div>

      {/* ── Stats panel ────────────────────────────────────── */}
      <StatsPanel reviews={reviews} avgRating={aggRating} />

      {/* ── Form ──────────────────────────────────────────── */}
      <div id="review-form-anchor" />
      {showForm && userInfo && (
        <div className="mb-5">
          <ReviewForm
            productId={productId}
            editTarget={editTarget}
            onSuccess={handleSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditTarget(null);
            }}
            userInfo={userInfo}
          />
        </div>
      )}

      {/* ── Reviews grid ───────────────────────────────────── */}
      {reviews.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r, i) => (
            <ReviewCard
              key={r.id}
              review={r}
              currentUserId={user?.id ?? null}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === r.id}
              index={i}
            />
          ))}
        </div>
      ) : (
        !showForm && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white py-14 text-center">
            <span
              className="material-symbols-outlined mb-3 text-[40px] text-slate-300"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
            >
              rate_review
            </span>
            <p className="font-serif text-base font-bold text-slate-700">
              Sin reseñas aún
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {user
                ? "Sé el primero en compartir tu experiencia."
                : "Inicia sesión para dejar la primera reseña."}
            </p>
            {user && (
              <button
                type="button"
                onClick={() => {
                  setEditTarget(null);
                  setShowForm(true);
                }}
                className="bg-primary hover:bg-primary/90 mt-5 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[15px]">
                  rate_review
                </span>
                Ser el primero
              </button>
            )}
            {!user && (
              <button
                type="button"
                onClick={() => showAuthModal("reviews")}
                className="border-primary/25 text-primary hover:bg-primary/5 mt-5 flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition"
              >
                <span className="material-symbols-outlined text-[14px]">
                  login
                </span>
                Inicia sesión para calificar
              </button>
            )}
          </div>
        )
      )}
    </section>
  );
}
