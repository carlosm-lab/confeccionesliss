"use client";

import Image from "next/image";

export default function FavoritesPage() {
  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 px-6 py-12 md:py-20">
      {/* Header Section */}
      <section className="rounded-xl bg-surface-container-lowest p-8 md:p-12">
        <div className="mb-2 flex items-baseline gap-4">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary md:text-5xl">Mis favoritos</h1>
          <span className="rounded-full bg-surface-container-high px-3 py-1 font-label text-sm font-bold text-on-surface-variant">12</span>
        </div>
        <p className="font-body text-lg text-on-surface-variant max-w-2xl">
          Tus productos guardados en Confecciones Liss.
        </p>
      </section>

      {/* Action Bar */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-6 rounded-xl bg-surface-container-lowest p-6">
        <div className="flex flex-wrap gap-3">
          <button className="rounded-full bg-primary px-5 py-2 font-label text-sm text-on-primary transition-colors" type="button">Todos</button>
          <button className="rounded-full bg-surface-container-low px-5 py-2 font-label text-sm text-on-surface transition-colors hover:bg-surface-container-high" type="button">Sector Salud</button>
          <button className="rounded-full bg-surface-container-low px-5 py-2 font-label text-sm text-on-surface transition-colors hover:bg-surface-container-high" type="button">Universidades</button>
          <button className="rounded-full bg-surface-container-low px-5 py-2 font-label text-sm text-on-surface transition-colors hover:bg-surface-container-high" type="button">Escuelas</button>
          <button className="rounded-full bg-surface-container-low px-5 py-2 font-label text-sm text-on-surface transition-colors hover:bg-surface-container-high" type="button">Empresas</button>
        </div>
        <div className="flex items-center gap-6">
          <button className="font-label text-sm font-semibold text-[#b43024] transition-opacity hover:opacity-80" type="button">Vaciar favoritos</button>
          <button className="rounded-full border border-outline-variant/30 px-6 py-2.5 font-label text-sm font-semibold text-primary transition-colors hover:bg-surface-container-low" type="button">
            Agregar todo al carrito
          </button>
        </div>
      </section>

      {/* Product Grid */}
      <section className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {/* Product 1 */}
        <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface-container-lowest transition-all duration-300 hover:bg-surface-bright">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnqqdywMy2IndzPSwIQAzF6YFcJDU8QFCr17hXz4AtHntemFGtsCUwUerEx5xICIYp991J9XFv9J-Xy9IUAKNRSFfViJPAgnVY1remz9D78E423t_0obM074oQ5RypzzzxWo084I6h_JE2NPNnOaXzc1N1i2MkcNG1X5h1xOgtVlZSA-vylHASAOgKnZBjuysfZbQ93RLWXKMw8ohL6VVj8WyRqN53tdHeh9c6ffXfKCGoabpcLKc7wZWKMCiQ20xizjBppZCBJlHK" alt="Filipina Médica Elite" fill className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
            {/* Hover Action Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <button className="flex items-center gap-2 translate-y-4 transform rounded-full bg-white px-4 py-2 font-label text-sm font-bold text-[#b43024] shadow-lg transition-transform duration-300 group-hover:translate-y-0" type="button">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
                Eliminar de favoritos
              </button>
            </div>
            {/* Heart Icon */}
            <button aria-label="Favorito" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110" type="button">
              <span className="material-symbols-outlined text-[#b43024]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-6">
            <div className="mb-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">Sector Salud</div>
            <h3 className="mb-2 font-headline text-lg font-bold text-primary">Filipina Médica Elite</h3>
            <p className="mb-6 flex-grow font-body text-sm text-on-surface-variant">Tela antifluidos, corte princesa, detalles asimétricos.</p>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-headline text-xl font-extrabold text-primary">$45.00</span>
            </div>
            <button className="mt-auto w-full rounded-full bg-primary py-3 font-label font-bold text-on-primary transition-opacity hover:opacity-90" type="button">
              Agregar al carrito
            </button>
          </div>
        </article>

        {/* Product 2 */}
        <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface-container-lowest transition-all duration-300 hover:bg-surface-bright">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdzw1jJZUUu9uSINajAFavD9UnzeZqomUJhrJpTAXFNRwczvsP016FAo-6KOgWUrDF31fhDQY9t6DdlHay2viYhBaZ9KOhCzX0HPrEwR4EtNu7uoF9O0piYlyu1_w2UuWS2pmnm4VG5qzzybwGS0bsXWJulo8-NSIpyKxaS08Z4dEQFOwjz_k_DEBfUx9mCWSjTHY1aVaTvsE8SRN3pFdxeVTWRWNjxzi84Qqkoo4S43afUYLGAYpMH9jlmoQmGtQD5QqchbTWq_TG" alt="Pantalón Quirúrgico Cargo" fill className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <button className="flex items-center gap-2 translate-y-4 transform rounded-full bg-white px-4 py-2 font-label text-sm font-bold text-[#b43024] shadow-lg transition-transform duration-300 group-hover:translate-y-0" type="button">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
                Eliminar de favoritos
              </button>
            </div>
            <button aria-label="Favorito" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110" type="button">
              <span className="material-symbols-outlined text-[#b43024]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-6">
            <div className="mb-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">Sector Salud</div>
            <h3 className="mb-2 font-headline text-lg font-bold text-primary">Pantalón Quirúrgico Cargo</h3>
            <p className="mb-6 flex-grow font-body text-sm text-on-surface-variant">Ajuste ergonómico, múltiples bolsillos, cintura elástica.</p>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-headline text-xl font-extrabold text-primary">$38.00</span>
            </div>
            <button className="mt-auto w-full rounded-full bg-primary py-3 font-label font-bold text-on-primary transition-opacity hover:opacity-90" type="button">
              Agregar al carrito
            </button>
          </div>
        </article>

        {/* Product 3 (Out of Stock) */}
        <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface-container-lowest opacity-80">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvhyOZhyh1APLcnBt0xXO2tKrN7QRMJp_J7rq4EQuKNkKHInY4s3Vwyfz9hL0sF0sP_tlQa_n_gnJCOJPjtghob5XxCr8Vsig28wBwhFsg2h8xMGYsspgwhl1_vEvAOfqxrXly38yHQN6ZQEi-rl3Vq5oFVVBvgZVRr2AuRqRrbgSDWDqBQ2r-62Dl3xzw4bTfI5Gd25ZXPUrhWXf12VHMl3zksJLqIpB007Mb3DS10GP4LpLtnN4ehgUSr4q0-hELYp7IWPpurPGz" alt="Bata de Laboratorio Premium" fill className="object-cover mix-blend-multiply grayscale" />
            {/* Out of stock overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-surface-container/60 backdrop-blur-[2px]">
              <span className="rounded-full bg-surface px-4 py-2 font-label text-sm font-bold text-on-surface-variant shadow-sm">
                Agotado
              </span>
            </div>
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-primary/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <button className="flex items-center gap-2 translate-y-4 transform rounded-full bg-white px-4 py-2 font-label text-sm font-bold text-[#b43024] shadow-lg transition-transform duration-300 group-hover:translate-y-0" type="button">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
                Eliminar de favoritos
              </button>
            </div>
            <button aria-label="Favorito" className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110" type="button">
              <span className="material-symbols-outlined text-[#b43024]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-6">
            <div className="mb-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">Universidades</div>
            <h3 className="mb-2 font-headline text-lg font-bold text-primary">Bata de Laboratorio Premium</h3>
            <p className="mb-6 flex-grow font-body text-sm text-on-surface-variant">Algodón egipcio, corte clásico, protección total.</p>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-headline text-xl font-extrabold text-on-surface-variant line-through">$55.00</span>
            </div>
            <button className="mt-auto flex w-full items-center justify-center gap-2 rounded-full bg-surface-container-high py-3 font-label font-bold text-on-surface transition-colors hover:bg-surface-variant" type="button">
              <span className="material-symbols-outlined text-sm">notifications</span>
              Notificarme
            </button>
          </div>
        </article>

        {/* Product 4 */}
        <article className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-surface-container-lowest transition-all duration-300 hover:bg-surface-bright">
          <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-low">
            <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRQ62kHZ-IeLc9R7IkceEOMDAZdb_yHpP-kdeP_cEOZcqdhfS8_42GcW3Wi46A1sriKJs-RnSp1P5PGK94N_mvaiyXwzRkB4YFU0JVWV10y2i7jhb3YAymU46c6khQvqhT7HN0y0QLGu1T-eWgXlqtxp1xRLleT8e7GA5cXxxuPEvK6UpQMXvTgb6_anBfBuPr9RFT66DiAf-5MkawhHfch4ne91JkqFtVHFXjix_4_ZE7stf35kWruoI6WhXGqBgvrUVZYGnZcFMj" alt="Conjunto Scrub Essential" fill className="object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex items-center justify-center bg-primary/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
              <button className="flex items-center gap-2 translate-y-4 transform rounded-full bg-white px-4 py-2 font-label text-sm font-bold text-[#b43024] shadow-lg transition-transform duration-300 group-hover:translate-y-0" type="button">
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>delete</span>
                Eliminar de favoritos
              </button>
            </div>
            <button aria-label="Favorito" className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur-sm transition-transform hover:scale-110" type="button">
              <span className="material-symbols-outlined text-[#b43024]" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-6">
            <div className="mb-2 font-label text-xs uppercase tracking-widest text-on-surface-variant">Clínicas</div>
            <h3 className="mb-2 font-headline text-lg font-bold text-primary">Conjunto Scrub Essential</h3>
            <p className="mb-6 flex-grow font-body text-sm text-on-surface-variant">Comodidad para turnos largos, tela transpirable.</p>
            <div className="mb-6 flex items-center justify-between">
              <span className="font-headline text-xl font-extrabold text-primary">$65.00</span>
            </div>
            <button className="mt-auto w-full rounded-full bg-primary py-3 font-label font-bold text-on-primary transition-opacity hover:opacity-90" type="button">
              Agregar al carrito
            </button>
          </div>
        </article>
      </section>
    </div>
  );
}
