import Image from "next/image";
import { siteConfig } from "@/config/site";
import type { GoogleReview } from "@/lib/googleReviewsService";

interface GoogleReviewsProps {
  reviews: GoogleReview[];
}

export function GoogleReviews({ reviews }: GoogleReviewsProps) {
  // Enlaces de cada reseña compartidos por el usuario, mapeados por nombre para consistencia
  const reviewLinksByName: Record<string, string> = {
    "Iris M.": "https://maps.app.goo.gl/duFjMseLjYQHTERh6",
    "RUTH MEJIA": "https://maps.app.goo.gl/NnM5yP4f2Kd8UPxY7",
    "Erick Salvador": "https://maps.app.goo.gl/GgEdxryKJ2Qtpu7E8",
    Carlitos: "https://maps.app.goo.gl/ag8dQYSEcZDdRiUPA",
    "Gerardo Vargas": "https://maps.app.goo.gl/6qBEkSrSrAKcu94p8",
    "Manuel Godoy": "https://maps.app.goo.gl/BoKZJLj45UggL5zo7",
    "Damaris Navarrete": "https://maps.app.goo.gl/Qvtrx9wcQP4TbkbZ6",
    ツツ: "https://maps.app.goo.gl/Uj8nmRYLxySeMVTp9",
    "Erick Josue fuentes": "https://maps.app.goo.gl/uE69PX9vMeScfMpG7",
    "Antonio Guzmán": "https://maps.app.goo.gl/uEUxsbKsHyEA5tLN6",
    "José Menéndez": "https://maps.app.goo.gl/k6YCbZWJPNZFT3Xj8",
    "Jackelline Lisseth Molina Villacorta":
      "https://maps.app.goo.gl/mi32DKS3RNQ8fwiaA",
    "Carlos Molina": "https://maps.app.goo.gl/2JE4ZcQsBSpMyKxEA",
    "Karla Vanessa Perla Blanco": "https://maps.app.goo.gl/cEv8V53TqZMUKPbq6",
    "Isaac Padilla": "https://maps.app.goo.gl/yewud5VFno9jDJKP8",
    "Mauricio Guzman": "https://maps.app.goo.gl/Ais8rhXC4R1BcMTK7",
    "pepa pig": "https://maps.app.goo.gl/sNx8z4AMbCWnxPRw8",
    "Kenia Yaritza Pérez Martínez": "https://maps.app.goo.gl/96pnCzRKtPvp9tey8",
    "Melisa López": "https://maps.app.goo.gl/AyLLeUJwpmqDjfvk6",
    "Enmanuel Mejía": "https://maps.app.goo.gl/6S65SsmQhSk4too88",
    "Jeffry Anselmo Guzmán Robles": "https://maps.app.goo.gl/6GnFJ87uUdK2CtQr9",
    "Marlyn Antonio Palacio Reyes": "https://maps.app.goo.gl/eY7c3Joikm5AsiZN6",
  };

  return (
    <section
      className="bg-surface lazy-section px-5 py-16 md:px-8 md:py-24"
      aria-labelledby="google-reviews-title"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-2">
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={24}
              height={24}
              className="h-6 w-auto"
            />
            <span className="font-sans text-sm font-semibold tracking-wider text-slate-500 uppercase">
              Opiniones en Google Maps
            </span>
          </div>
          <h2
            id="google-reviews-title"
            className="text-primary font-serif text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Opiniones Reales de Clientes
          </h2>
          <div className="bg-tertiary mt-4 h-1 w-16 rounded-full" />

          {/* Rating: stacks on mobile, single row on sm+ */}
          <div className="mt-4 flex flex-col items-center gap-1 sm:flex-row sm:gap-2">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-800">4.8</span>
              <div
                className="flex text-amber-400"
                aria-label="4.8 de 5 estrellas"
              >
                {[1, 2, 3, 4].map((s) => (
                  <span
                    key={s}
                    className="material-symbols-outlined font-fill-1 text-lg leading-none"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
                <span
                  className="material-symbols-outlined font-fill-1 text-lg leading-none"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star_half
                </span>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-0.5 font-sans text-xs font-medium text-slate-500">
              4.8 de 5 &middot; 21 reseñas
            </span>
          </div>
        </div>

        {/* Mobile/Tablet: horizontal snap-scroll row */}
        <div className="block lg:hidden">
          <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8">
            {[...reviews]
              .sort((a, b) => {
                const hasCommentA = a.comment ? 1 : 0;
                const hasCommentB = b.comment ? 1 : 0;
                if (hasCommentA !== hasCommentB)
                  return hasCommentB - hasCommentA;
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              })
              .map((r, index) => {
                const href =
                  reviewLinksByName[r.author_name] ||
                  siteConfig.links.googleMaps;
                return (
                  <a
                    key={r.id || index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-primary/10 hover:border-primary/30 focus-visible:ring-primary flex w-[78vw] max-w-[300px] shrink-0 snap-start flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_4px_20px_rgba(20,48,103,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(20,48,103,0.1)] focus-visible:ring-2 focus-visible:outline-none sm:w-[320px] sm:max-w-none"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className="flex text-amber-400"
                          aria-label={`${r.rating} estrellas`}
                        >
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <span className="group-hover:text-primary text-slate-300 transition-colors">
                          <Image
                            src="/icons/google.svg"
                            alt="Google"
                            width={16}
                            height={16}
                            className="h-4 w-auto opacity-60 group-hover:opacity-100"
                          />
                        </span>
                      </div>
                      {r.comment && (
                        <blockquote className="text-on-surface-variant mb-4 font-sans text-sm leading-relaxed italic">
                          &quot;{r.comment}&quot;
                        </blockquote>
                      )}
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="bg-primary/5 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold uppercase">
                        {r.author_name.charAt(0)}
                      </div>
                      <div>
                        <cite className="text-on-surface block font-sans text-sm font-semibold not-italic">
                          {r.author_name}
                        </cite>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          Cliente verificado
                          <span className="material-symbols-outlined text-[12px] font-bold text-emerald-500">
                            verified
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>

        {/* Desktop: single horizontal scroll row.
             -mt-3 + py-3 trick: overflow-x-auto clips vertically too, so we give
             extra vertical padding so hover lift + shadow are never cut off. */}
        <div className="hidden lg:block">
          <div className="scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent -mt-3 flex snap-x snap-mandatory gap-6 overflow-x-auto py-3 pb-5">
            {[...reviews]
              .sort((a, b) => {
                const hasCommentA = a.comment ? 1 : 0;
                const hasCommentB = b.comment ? 1 : 0;
                if (hasCommentA !== hasCommentB)
                  return hasCommentB - hasCommentA;
                return (
                  new Date(b.created_at).getTime() -
                  new Date(a.created_at).getTime()
                );
              })
              .map((r, index) => {
                const href =
                  reviewLinksByName[r.author_name] ||
                  siteConfig.links.googleMaps;
                return (
                  <a
                    key={r.id || index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group border-primary/10 hover:border-primary/30 focus-visible:ring-primary flex w-[320px] shrink-0 snap-start flex-col justify-between rounded-2xl border bg-white p-6 shadow-[0_4px_20px_rgba(20,48,103,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(20,48,103,0.1)] focus-visible:ring-2 focus-visible:outline-none"
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between">
                        <div
                          className="flex text-amber-400"
                          aria-label={`${r.rating} estrellas`}
                        >
                          {Array.from({ length: r.rating }).map((_, i) => (
                            <span
                              key={i}
                              className="material-symbols-outlined text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                          ))}
                        </div>
                        <span className="group-hover:text-primary text-slate-300 transition-colors">
                          <Image
                            src="/icons/google.svg"
                            alt="Google"
                            width={16}
                            height={16}
                            className="h-4 w-auto opacity-60 group-hover:opacity-100"
                          />
                        </span>
                      </div>
                      {r.comment && (
                        <blockquote className="text-on-surface-variant mb-4 font-sans text-sm leading-relaxed italic">
                          &quot;{r.comment}&quot;
                        </blockquote>
                      )}
                    </div>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="bg-primary/5 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-serif text-sm font-bold uppercase">
                        {r.author_name.charAt(0)}
                      </div>
                      <div>
                        <cite className="text-on-surface block font-sans text-sm font-semibold not-italic">
                          {r.author_name}
                        </cite>
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          Cliente verificado
                          <span className="material-symbols-outlined text-[12px] font-bold text-emerald-500">
                            verified
                          </span>
                        </span>
                      </div>
                    </div>
                  </a>
                );
              })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a
            href={siteConfig.links.googleMaps}
            target="_blank"
            rel="noopener noreferrer"
            className="border-primary text-primary hover:bg-primary/5 focus-visible:ring-primary inline-flex items-center gap-2 rounded-xl border px-6 py-3 font-sans text-sm font-bold transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <span>Ver más opiniones en Google Maps</span>
            <span className="material-symbols-outlined text-sm">
              open_in_new
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
