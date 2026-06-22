"use client";

/**
 * ProductReviews — Confecciones Liss
 * Rediseño v2: score compacto integrado al header, cards con carácter,
 * barras de distribución en popover/inline compacto.
 */

import { useState, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { reviewSchema } from "@/schemas/reviewSchema";
import type { DbReview } from "@/lib/reviewsService";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

interface ProductReviewsProps {
  productId: string;
  initialReviews: DbReview[];
  averageRating: number;
  totalCount: number;
}

// ── Star display ───────────────────────────────────────────────

function StarDisplay({
  rating,
  size = "sm",
  className,
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const px = { sm: "text-[13px]", md: "text-[17px]", lg: "text-[22px]" }[size];
  return (
    <span
      className={cn("flex items-center gap-px", className)}
      aria-label={`${rating} de 5`}
    >
      {[1, 2, 3, 4, 5].map((s) => (
        <span
          key={s}
          className={cn("material-symbols-outlined text-amber-400", px)}
          style={{
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

// ── Star input ─────────────────────────────────────────────────

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  const labels = ["", "Muy malo", "Malo", "Regular", "Bueno", "Excelente"];
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
              className="material-symbols-outlined text-[30px] text-amber-400 transition-all"
              style={{
                fontVariationSettings:
                  s <= (hovered || value) ? "'FILL' 1" : "'FILL' 0",
              }}
              aria-hidden="true"
            >
              star
            </span>
          </button>
        ))}
      </div>
      {(hovered || value) > 0 && (
        <span className="text-sm font-semibold text-amber-600">
          {labels[hovered || value]}
        </span>
      )}
    </div>
  );
}

// ── Compact distribution bars ──────────────────────────────────

function DistributionBars({ reviews }: { reviews: DbReview[] }) {
  const total = reviews.length;
  if (total === 0) return null;
  return (
    <div className="flex w-40 flex-col gap-1">
      {[5, 4, 3, 2, 1].map((stars) => {
        const count = reviews.filter((r) => r.rating === stars).length;
        const pct = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={stars} className="flex items-center gap-1.5">
            <span className="w-2 shrink-0 text-right text-[10px] font-medium text-slate-400">
              {stars}
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-amber-400 transition-all duration-700"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Review card ────────────────────────────────────────────────

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
  const isOwner = currentUserId === review.user_id;
  const date = new Date(review.created_at).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <article
      className="animate-fade-in-up group relative rounded-xl bg-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
      style={{
        animationDelay: `${index * 70}ms`,
        boxShadow:
          "0 1px 3px rgba(20,48,103,0.06), 0 4px 12px rgba(20,48,103,0.04)",
      }}
    >
      {/* Navy left accent */}
      <div className="bg-primary absolute inset-y-0 left-0 w-[3px] rounded-l-xl" />

      <div className="px-5 py-4 pl-6">
        {/* Row 1: avatar + name + stars + date + actions */}
        <div className="flex items-start gap-3">
          {/* Avatar */}
          {review.user_avatar ? (
            <Image
              src={review.user_avatar}
              alt={review.user_name}
              width={40}
              height={40}
              className="ring-primary/15 h-10 w-10 shrink-0 rounded-full object-cover ring-2"
              unoptimized
            />
          ) : (
            <div className="bg-primary/10 ring-primary/15 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-2">
              <span className="material-symbols-outlined text-primary text-[20px]">
                person
              </span>
            </div>
          )}

          {/* Name + meta */}
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
              <p className="font-serif text-sm font-bold text-slate-800">
                {review.user_name}
              </p>

              {/* Owner actions — visible on hover */}
              {isOwner && (
                <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => onEdit(review)}
                    className="hover:text-primary rounded-lg px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-slate-100"
                    aria-label="Editar reseña"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      edit
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(review.id)}
                    disabled={isDeleting}
                    className="rounded-lg px-2 py-1 text-xs font-medium text-slate-400 transition hover:bg-red-50 hover:text-red-500 disabled:opacity-40"
                    aria-label="Eliminar reseña"
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

            <div className="mt-0.5 flex flex-wrap items-center gap-2">
              <StarDisplay rating={review.rating} size="sm" />
              <span className="text-xs text-slate-400">{date}</span>
            </div>
          </div>
        </div>

        {/* Comment */}
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {review.comment}
        </p>
      </div>
    </article>
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
      const supabase = getSupabaseClient();
      if (editTarget) {
        const { data, error } = await supabase
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
          console.error("[ReviewForm] update:", error);
          toast.error("No se pudo actualizar. Inténtalo de nuevo.");
          return;
        }
        toast.success("Reseña actualizada");
        onSuccess(data as DbReview);
      } else {
        const { data, error } = await supabase
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
          console.error("[ReviewForm] insert:", error);
          toast.error(
            error.code === "23505"
              ? "Ya tienes una reseña para este producto."
              : "No se pudo guardar. Inténtalo de nuevo."
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
      className="animate-fade-in-up border-primary/20 overflow-hidden rounded-2xl border bg-white"
      style={{ boxShadow: "0 2px 8px rgba(20,48,103,0.08)" }}
    >
      {/* Header strip */}
      <div className="border-primary/10 bg-primary/5 flex items-center gap-2 border-b px-5 py-3">
        <span className="material-symbols-outlined text-primary text-[18px]">
          rate_review
        </span>
        <h3 className="text-primary font-serif text-sm font-bold">
          {editTarget ? "Editar reseña" : "Escribe tu reseña"}
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-5">
        {/* Stars */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-semibold tracking-widest text-slate-400 uppercase">
            Calificación <span className="text-red-400">*</span>
          </p>
          <StarInput value={rating} onChange={setRating} />
          {errors.rating && (
            <p className="mt-1.5 text-xs text-red-500">{errors.rating}</p>
          )}
        </div>

        {/* Textarea */}
        <div className="mb-4">
          <label
            htmlFor="review-comment"
            className="mb-2 block text-xs font-semibold tracking-widest text-slate-400 uppercase"
          >
            Comentario <span className="text-red-400">*</span>
          </label>
          <textarea
            id="review-comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            maxLength={1000}
            rows={4}
            placeholder="Cuéntanos tu experiencia con este producto… (mínimo 10 caracteres)"
            className={cn(
              "w-full resize-none rounded-xl border bg-slate-50 p-3.5 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:bg-white focus:ring-2",
              errors.comment
                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
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

        {/* Actions */}
        <div className="flex gap-2.5">
          <button
            type="submit"
            disabled={isPending}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:shadow active:scale-[0.98] disabled:opacity-60"
          >
            {isPending ? (
              <>
                <span className="material-symbols-outlined animate-spin text-[15px]">
                  progress_activity
                </span>
                Guardando…
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[15px]">
                  {editTarget ? "save" : "send"}
                </span>
                {editTarget ? "Guardar" : "Publicar reseña"}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-500 transition hover:bg-slate-50 disabled:opacity-50"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────

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

  const recalcAggregate = useCallback((updated: DbReview[]) => {
    const n = updated.length;
    setAggCount(n);
    setAggRating(
      n > 0
        ? Math.round((updated.reduce((s, r) => s + r.rating, 0) / n) * 10) / 10
        : 0
    );
  }, []);

  const handleFormSuccess = useCallback(
    (rev: DbReview) => {
      setReviews((prev) => {
        const isEdit = prev.some((r) => r.id === rev.id);
        const next = isEdit
          ? prev.map((r) => (r.id === rev.id ? rev : r))
          : [rev, ...prev];
        recalcAggregate(next);
        return next;
      });
      setShowForm(false);
      setEditTarget(null);
    },
    [recalcAggregate]
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
        recalcAggregate(next);
        return next;
      });
      setDeletingId(null);
      toast.success("Reseña eliminada");
    },
    [user, recalcAggregate]
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
      className="animate-fade-in-up mt-16"
      style={{ animationDelay: "350ms" }}
      aria-labelledby="reviews-heading"
    >
      {/* ── Header row ─────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        {/* Left: title + compact score */}
        <div className="flex flex-wrap items-center gap-4">
          <h2
            id="reviews-heading"
            className="font-serif text-2xl font-bold text-slate-900"
          >
            Reseñas
          </h2>

          {aggCount > 0 && (
            <div className="flex items-center gap-3">
              {/* Score badge */}
              <div className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1">
                <span
                  className="material-symbols-outlined text-[15px] text-amber-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span className="font-serif text-sm font-bold text-amber-700">
                  {aggRating.toFixed(1)}
                </span>
                <span className="text-xs text-amber-500">({aggCount})</span>
              </div>

              {/* Distribution bars — compact inline */}
              <DistributionBars reviews={reviews} />
            </div>
          )}
        </div>

        {/* Right: CTA */}
        {user && !userReview && !showForm && (
          <button
            type="button"
            id="add-review-btn"
            onClick={() => {
              setEditTarget(null);
              setShowForm(true);
            }}
            className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition hover:shadow-md active:scale-[0.97]"
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
            className="border-primary/25 bg-primary/5 text-primary hover:border-primary/40 hover:bg-primary/10 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition active:scale-[0.97]"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            Inicia sesión para reseñar
          </button>
        )}
      </div>

      {/* Divider */}
      <div className="from-primary/20 mb-6 h-px bg-gradient-to-r via-slate-200 to-transparent" />

      {/* ── Form ──────────────────────────────────────────── */}
      <div id="review-form-anchor" />
      {showForm && userInfo && (
        <div className="mb-5">
          <ReviewForm
            productId={productId}
            editTarget={editTarget}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditTarget(null);
            }}
            userInfo={userInfo}
          />
        </div>
      )}

      {/* ── Reviews list ───────────────────────────────────── */}
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-3">
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
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 py-12 text-center">
          <span
            className="material-symbols-outlined mb-3 text-[40px] text-slate-300"
            style={{ fontVariationSettings: "'FILL' 0, 'wght' 200" }}
          >
            chat_bubble_outline
          </span>
          <p className="font-serif text-sm font-bold text-slate-600">
            Sin reseñas aún
          </p>
          <p className="mt-1 text-xs text-slate-400">
            {user
              ? "Comparte tu experiencia y ayuda a otros clientes."
              : "Inicia sesión para dejar la primera reseña."}
          </p>
          {user && !showForm && (
            <button
              type="button"
              onClick={() => {
                setEditTarget(null);
                setShowForm(true);
              }}
              className="bg-primary hover:bg-primary/90 mt-4 flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[15px]">
                rate_review
              </span>
              Ser el primero en reseñar
            </button>
          )}
          {!user && (
            <button
              type="button"
              onClick={() => showAuthModal("reviews")}
              className="border-primary/25 text-primary hover:bg-primary/5 mt-4 flex items-center gap-2 rounded-xl border px-5 py-2.5 text-sm font-semibold transition"
            >
              <span className="material-symbols-outlined text-[14px]">
                login
              </span>
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </section>
  );
}
