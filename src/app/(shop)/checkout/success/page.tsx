"use client";

import Link from "next/link";
import Image from "next/image";

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen flex-col">
      {/* Minimal TopNavBar */}
      <header className="bg-surface-container-low sticky top-0 z-50 flex w-full items-center justify-between px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link
            href="/carrito"
            className="text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            <span className="hidden sm:inline">Volver al carrito</span>
          </Link>
        </div>
        <div className="font-headline text-primary text-xl font-bold tracking-tighter uppercase">
          Confecciones Liss
        </div>
        <div className="flex items-center gap-4">
          <div className="border-primary text-primary flex items-center gap-2 border-b-2 pb-1 font-semibold">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock
            </span>
            <span className="hidden sm:inline">Pago Seguro</span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex flex-grow flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        {/* Step Indicator */}
        <div className="mb-12 flex w-full max-w-2xl justify-center">
          <div className="font-label text-on-surface-variant flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2 opacity-50">
              <span className="bg-surface-variant text-on-surface-variant flex h-6 w-6 items-center justify-center rounded-full">
                1
              </span>
              <span>Contacto</span>
            </div>
            <div className="bg-surface-variant h-px w-8"></div>
            <div className="flex items-center gap-2 opacity-50">
              <span className="bg-surface-variant text-on-surface-variant flex h-6 w-6 items-center justify-center rounded-full">
                2
              </span>
              <span>Pago</span>
            </div>
            <div className="bg-surface-variant h-px w-8"></div>
            <div className="flex items-center gap-2">
              <span className="bg-primary text-on-primary flex h-6 w-6 items-center justify-center rounded-full font-bold">
                3
              </span>
              <span className="text-primary font-semibold">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Success Content Container */}
        <div className="bg-surface-container-lowest relative flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-xl p-8 text-center md:p-12">
          {/* Subtle background accent */}
          <div className="bg-primary-container absolute -top-24 -right-24 h-64 w-64 rounded-full opacity-5 blur-3xl"></div>

          {/* Animated-style checkmark icon */}
          <div className="bg-primary-fixed relative z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-full shadow-[0_8px_24px_rgba(25,28,30,0.06)]">
            <span
              className="material-symbols-outlined text-primary text-5xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
          </div>

          <h2 className="font-headline text-primary relative z-10 mb-2 text-3xl font-bold tracking-tight md:text-4xl">
            ¡Pedido recibido!
          </h2>
          <p className="font-body text-on-surface-variant relative z-10 mb-8 text-lg">
            Tu orden{" "}
            <span className="text-on-surface font-bold">#ORD-2024-8839</span> ha
            sido confirmada y está en proceso. Te hemos enviado un correo con
            los detalles de la confección.
          </p>

          {/* Order Summary Overview Card */}
          <div className="bg-surface-container-low relative z-10 mb-8 w-full rounded-lg p-6 text-left">
            <h3 className="font-headline text-primary mb-4 text-sm font-bold tracking-widest uppercase">
              Resumen Rápido
            </h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-surface-container relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrK6YGNco1ebNvTp8wl5brxk49jAYFm9fIUnpzw78EqBR-07mj3Ya-ohErjDjsK6ymaEZg8_ZaI9hs3-VL6dlmGzJ6Q-QdLx5TyXuc_h6sTk8kt3m9dGzBMvTzCTCQNK50xUZ5f2m9gcbZ58J-V3kyeCK50K_trFBjGPs0pSV4JnYg4LvyDWaHLjC0Dl972j1wo6-CkeKiUUPGY5WUhGRINrjNcOaLo41Zi0QGzkA9C-YQQBowLpDc3P5sW2TdO61atbXkwLhO7ynJ"
                      alt="Chaqueta Médica"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-body text-on-surface text-base font-semibold">
                      Filipina Médica Quirúrgica Élite
                    </p>
                    <p className="font-body text-on-surface-variant text-sm">
                      Talla M - Azul Marino
                    </p>
                  </div>
                </div>
                <span className="font-body text-on-surface text-base font-bold">
                  $70.00
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-surface-container relative h-12 w-12 shrink-0 overflow-hidden rounded-md">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3mVbHuGtsO6In2ma2X24HYCTr34agnNZaCyrjWa1iz8rfoNXLYy_VynY2xIHhP0Ub0A4meq_4k3seIp6WilXSwyd9KNxfQWQpp0FMHvwfsYtaYZjkX8Sd1Ptty2tBaxGAfvVgNvMdHqZEI_PCJvWPobGRcMmyHUgDRXh6AiZlT9y7Dezc-GubSQozFV1lz20BIeFqcMJk7SmLVhPZLIjK_K0SeUDAlEXCKWIRykZgFah6wqN9skZLNBP0XqNSG8C28DMqEmvZDNI"
                      alt="Pantalón Quirúrgico"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-body text-on-surface text-base font-semibold">
                      Pantalón Cargo Clínico Flex
                    </p>
                    <p className="font-body text-on-surface-variant text-sm">
                      Talla M - Azul Marino
                    </p>
                  </div>
                </div>
                <span className="font-body text-on-surface text-base font-bold">
                  $60.00
                </span>
              </div>

              {/* Separation via tonal shift */}
              <div className="bg-surface-container-highest mt-2 flex items-center justify-between rounded-lg p-4 pt-4">
                <span className="font-body text-on-surface text-lg font-semibold">
                  Total pagado
                </span>
                <span className="font-body text-primary text-xl font-bold">
                  $143.50
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative z-10 flex w-full flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/pedidos"
              className="bg-primary font-body text-on-primary hover:bg-primary-container flex items-center justify-center rounded-md px-8 py-3 text-lg font-semibold shadow-[0_8px_24px_rgba(25,28,30,0.06)] transition-colors"
            >
              Ver mis pedidos
            </Link>
            <Link
              href={"/catalogo" as any}
              className="border-outline-variant font-body text-primary hover:bg-surface-container-low flex items-center justify-center rounded-md border bg-transparent px-8 py-3 text-lg font-semibold transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
