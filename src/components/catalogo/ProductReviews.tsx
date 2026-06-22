"use client";

/**
 * ProductReviews — Confecciones Liss
 *
 * Sección de reseñas de producto. Aparece debajo de "También te puede gustar".
 *
 * Features:
 * - Muestra lista de reseñas con avatar, nombre, estrellas, comentario y fecha
 * - Usuarios autenticados pueden agregar UNA reseña por producto
 * - Usuarios pueden editar o eliminar su propia reseña
 * - Usuarios no autenticados ven un CTA de login
 */

import { useState, useCallback } from "react";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { reviewSchema } from "@/schemas/reviewSchema";
import type { DbReview } from "@/lib/reviewsService";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

// ── Props ──────────────────────────────────────────────────────

interface ProductReviewsProps {
  productId: string;
  initialReviews: DbReview[];
  averageRating: number;
  totalCount: number;
}

// ── Star rating display component ─────────────────────────────

function StarDisplay({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "text-[14px]",
    md: "text-[18px]",
    lg: "text-[24px]",
  }[size];

  return (
    <span
      className="flex items-center gap-0.5"
      aria-label={`${rating} de 5 estrellas`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={cn("material-symbols-outlined text-amber-400", sizeClass)}
          style={{
            fontVariationSettings: star <= rating ? "'FILL' 1" : "'FILL' 0",
          }}
          aria-hidden="true"
        >
          star
        </span>
      ))}
    </span>
  );
}

// ── Star rating input component ────────────────────────────────

function StarInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);

  return (
    <div
      className="flex items-center gap-1"
      role="radiogroup"
      aria-label="Calificación"
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={value === star}
          aria-label={`${star} estrella${star !== 1 ? "s" : ""}`}
          className="cursor-pointer transition-transform hover:scale-110 active:scale-95"
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
        >
          <span
            className="material-symbols-outlined text-[28px] text-amber-400 transition-all"
            style={{
              fontVariationSettings:
                star <= (hovered || value) ? "'FILL' 1" : "'FILL' 0",
            }}
            aria-hidden="true"
          >
            star
          </span>
        </button>
      ))}
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
}: {
  review: DbReview;
  currentUserId: string | null;
  onEdit: (review: DbReview) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}) {
  const isOwner = currentUserId === review.user_id;
  const date = new Date(review.created_at).toLocaleDateString("es-SV", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <article className="flex gap-3 rounded-xl border border-slate-100 bg-white p-4 shadow-sm dark:border-white/5 dark:bg-white/5">
      {/* Avatar */}
      <div className="shrink-0">
        {review.user_avatar ? (
          <Image
            src={review.user_avatar}
            alt={review.user_name}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-100"
            unoptimized
          />
        ) : (
          <div className="bg-primary/10 flex h-10 w-10 items-center justify-center rounded-full ring-2 ring-slate-100">
            <span className="material-symbols-outlined text-primary text-[20px]">
              person
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              {review.user_name}
            </span>
            <div className="flex items-center gap-2">
              <StarDisplay rating={review.rating} size="sm" />
              <span className="text-xs text-slate-400">{date}</span>
            </div>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="flex shrink-0 items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(review)}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-white/10"
                aria-label="Editar reseña"
              >
                <span className="material-symbols-outlined text-[14px]">
                  edit
                </span>
                Editar
              </button>
              <button
                type="button"
                onClick={() => onDelete(review.id)}
                disabled={isDeleting}
                className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-900/20"
                aria-label="Eliminar reseña"
              >
                <span className="material-symbols-outlined text-[14px]">
                  delete
                </span>
                Eliminar
              </button>
            </div>
          )}
        </div>

        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
  onSuccess: (review: DbReview) => void;
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
      const fieldErrors: { rating?: string; comment?: string } = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as "rating" | "comment";
        if (!fieldErrors[field]) fieldErrors[field] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setIsPending(true);
    try {
      const supabase = getSupabaseClient();

      if (editTarget) {
        // UPDATE existing review
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
          console.error("[ReviewForm] update error:", error);
          toast.error("No se pudo actualizar la reseña. Inténtalo de nuevo.");
          return;
        }
        toast.success("Reseña actualizada");
        onSuccess(data as DbReview);
      } else {
        // INSERT new review
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
          console.error("[ReviewForm] insert error:", error);
          if (error.code === "23505") {
            toast.error("Ya tienes una reseña para este producto.");
          } else {
            toast.error("No se pudo guardar la reseña. Inténtalo de nuevo.");
          }
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
    <form
      onSubmit={handleSubmit}
      className="border-primary/20 bg-primary/5 rounded-xl border p-4"
    >
      <h3 className="mb-4 text-sm font-bold text-slate-800 dark:text-slate-200">
        {editTarget ? "Editar tu reseña" : "Escribe tu reseña"}
      </h3>

      {/* Star rating input */}
      <div className="mb-4">
        <p className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase">
          Calificación <span className="text-red-500">*</span>
        </p>
        <StarInput value={rating} onChange={setRating} />
        {errors.rating && (
          <p className="mt-1 text-xs text-red-500">{errors.rating}</p>
        )}
      </div>

      {/* Comment textarea */}
      <div className="mb-4">
        <label
          htmlFor="review-comment"
          className="mb-2 block text-xs font-semibold tracking-wider text-slate-500 uppercase"
        >
          Comentario <span className="text-red-500">*</span>
        </label>
        <textarea
          id="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={1000}
          rows={3}
          placeholder="Cuéntanos tu experiencia con este producto… (mínimo 10 caracteres)"
          className={cn(
            "w-full rounded-xl border bg-white p-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none focus:ring-1 dark:bg-white/10 dark:text-slate-100",
            errors.comment
              ? "border-red-300 focus:border-red-400 focus:ring-red-400"
              : "focus:border-primary focus:ring-primary border-slate-200"
          )}
        />
        <div className="mt-1 flex items-center justify-between">
          {errors.comment ? (
            <p className="text-xs text-red-500">{errors.comment}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-slate-400">{comment.length}/1000</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending}
          className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white shadow-sm transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? (
            <>
              <span className="material-symbols-outlined animate-spin text-[16px]">
                progress_activity
              </span>
              Guardando…
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[16px]">
                {editTarget ? "save" : "rate_review"}
              </span>
              {editTarget ? "Guardar cambios" : "Publicar reseña"}
            </>
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={isPending}
          className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

// ── Main Component ─────────────────────────────────────────────

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

  // ── Aggregate helpers ────────────────────────────────────────
  const recalcAggregate = useCallback((updatedReviews: DbReview[]) => {
    const count = updatedReviews.length;
    const avg =
      count > 0
        ? Math.round(
            (updatedReviews.reduce((s, r) => s + r.rating, 0) / count) * 10
          ) / 10
        : 0;
    setAggCount(count);
    setAggRating(avg);
  }, []);

  // ── Handlers ─────────────────────────────────────────────────
  const handleFormSuccess = useCallback(
    (newReview: DbReview) => {
      setReviews((prev) => {
        const isEdit = prev.some((r) => r.id === newReview.id);
        const updated = isEdit
          ? prev.map((r) => (r.id === newReview.id ? newReview : r))
          : [newReview, ...prev];
        recalcAggregate(updated);
        return updated;
      });
      setShowForm(false);
      setEditTarget(null);
    },
    [recalcAggregate]
  );

  const handleEdit = useCallback((review: DbReview) => {
    setEditTarget(review);
    setShowForm(true);
    // Scroll to form smoothly
    setTimeout(() => {
      document
        .getElementById("review-form-anchor")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  const handleDelete = useCallback(
    async (reviewId: string) => {
      if (!user) return;
      setDeletingId(reviewId);
      const supabase = getSupabaseClient();
      const { error } = await supabase
        .from("product_reviews")
        .delete()
        .eq("id", reviewId)
        .eq("user_id", user.id);

      if (error) {
        toast.error("No se pudo eliminar la reseña.");
        setDeletingId(null);
        return;
      }

      setReviews((prev) => {
        const updated = prev.filter((r) => r.id !== reviewId);
        recalcAggregate(updated);
        return updated;
      });
      setDeletingId(null);
      toast.success("Reseña eliminada");
    },
    [user, recalcAggregate]
  );

  const handleCancelForm = useCallback(() => {
    setShowForm(false);
    setEditTarget(null);
  }, []);

  // ── User info for form ────────────────────────────────────────
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
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2
            id="reviews-heading"
            className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          >
            Reseñas
          </h2>
          {aggCount > 0 && (
            <div className="flex items-center gap-2">
              <StarDisplay rating={Math.round(aggRating)} size="md" />
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                {aggRating.toFixed(1)}
              </span>
              <span className="text-sm text-slate-400">
                ({aggCount} {aggCount === 1 ? "reseña" : "reseñas"})
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
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
            className="border-primary/30 bg-primary/5 text-primary hover:border-primary/60 hover:bg-primary/10 flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-sm font-bold transition active:scale-[0.97]"
          >
            <span className="material-symbols-outlined text-[16px]">login</span>
            Inicia sesión para reseñar
          </button>
        )}
      </div>

      {/* ── Form anchor ────────────────────────────────────────── */}
      <div id="review-form-anchor" />

      {/* ── Review form ────────────────────────────────────────── */}
      {showForm && userInfo && (
        <div className="mb-6">
          <ReviewForm
            productId={productId}
            editTarget={editTarget}
            onSuccess={handleFormSuccess}
            onCancel={handleCancelForm}
            userInfo={userInfo}
          />
        </div>
      )}

      {/* ── Reviews list ───────────────────────────────────────── */}
      {reviews.length > 0 ? (
        <div className="flex flex-col gap-3">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={user?.id ?? null}
              onEdit={handleEdit}
              onDelete={handleDelete}
              isDeleting={deletingId === review.id}
            />
          ))}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 py-10 text-center dark:border-white/10">
          <span className="material-symbols-outlined mb-3 text-4xl text-slate-300 dark:text-slate-600">
            rate_review
          </span>
          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
            Aún no hay reseñas para este producto
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {user
              ? "¡Sé el primero en reseñarlo!"
              : "Inicia sesión para dejar la primera reseña"}
          </p>
          {!user && (
            <button
              type="button"
              onClick={() => showAuthModal("reviews")}
              className="border-primary/30 text-primary hover:bg-primary/5 mt-4 flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition"
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
