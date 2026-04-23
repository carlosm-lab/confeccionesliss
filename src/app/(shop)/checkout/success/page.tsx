"use client";

import Link from "next/link";
import Image from "next/image";

export default function CheckoutSuccessPage() {
  return (
    <div className="flex min-h-screen flex-col bg-surface font-body text-on-surface">
      {/* Minimal TopNavBar */}
      <header className="sticky top-0 z-50 flex w-full items-center justify-between bg-surface-container-low px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/carrito" className="flex items-center gap-2 text-on-surface-variant transition-colors hover:text-primary active:scale-95">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            <span className="hidden sm:inline">Volver al carrito</span>
          </Link>
        </div>
        <div className="font-headline text-xl font-bold uppercase tracking-tighter text-primary">
          Confecciones Liss
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-b-2 border-primary pb-1 font-semibold text-primary">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
            <span className="hidden sm:inline">Pago Seguro</span>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex flex-grow flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        
        {/* Step Indicator */}
        <div className="mb-12 flex w-full max-w-2xl justify-center">
          <div className="flex items-center gap-4 font-label text-sm text-on-surface-variant">
            <div className="flex items-center gap-2 opacity-50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant">1</span>
              <span>Contacto</span>
            </div>
            <div className="h-px w-8 bg-surface-variant"></div>
            <div className="flex items-center gap-2 opacity-50">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-surface-variant text-on-surface-variant">2</span>
              <span>Pago</span>
            </div>
            <div className="h-px w-8 bg-surface-variant"></div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary font-bold text-on-primary">3</span>
              <span className="font-semibold text-primary">Confirmación</span>
            </div>
          </div>
        </div>

        {/* Success Content Container */}
        <div className="relative flex w-full max-w-2xl flex-col items-center overflow-hidden rounded-xl bg-surface-container-lowest p-8 text-center md:p-12">
          {/* Subtle background accent */}
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary-container opacity-5 blur-3xl"></div>
          
          {/* Animated-style checkmark icon */}
          <div className="relative z-10 mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary-fixed shadow-[0_8px_24px_rgba(25,28,30,0.06)]">
            <span className="material-symbols-outlined text-5xl text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          </div>
          
          <h2 className="relative z-10 mb-2 font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">¡Pedido recibido!</h2>
          <p className="relative z-10 mb-8 font-body text-lg text-on-surface-variant">
            Tu orden <span className="font-bold text-on-surface">#ORD-2024-8839</span> ha sido confirmada y está en proceso. Te hemos enviado un correo con los detalles de la confección.
          </p>

          {/* Order Summary Overview Card */}
          <div className="relative z-10 mb-8 w-full rounded-lg bg-surface-container-low p-6 text-left">
            <h3 className="mb-4 font-headline text-sm font-bold uppercase tracking-widest text-primary">Resumen Rápido</h3>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-container">
                    <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrK6YGNco1ebNvTp8wl5brxk49jAYFm9fIUnpzw78EqBR-07mj3Ya-ohErjDjsK6ymaEZg8_ZaI9hs3-VL6dlmGzJ6Q-QdLx5TyXuc_h6sTk8kt3m9dGzBMvTzCTCQNK50xUZ5f2m9gcbZ58J-V3kyeCK50K_trFBjGPs0pSV4JnYg4LvyDWaHLjC0Dl972j1wo6-CkeKiUUPGY5WUhGRINrjNcOaLo41Zi0QGzkA9C-YQQBowLpDc3P5sW2TdO61atbXkwLhO7ynJ" alt="Chaqueta Médica" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-body text-base font-semibold text-on-surface">Filipina Médica Quirúrgica Élite</p>
                    <p className="font-body text-sm text-on-surface-variant">Talla M - Azul Marino</p>
                  </div>
                </div>
                <span className="font-body text-base font-bold text-on-surface">$70.00</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md bg-surface-container">
                     <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3mVbHuGtsO6In2ma2X24HYCTr34agnNZaCyrjWa1iz8rfoNXLYy_VynY2xIHhP0Ub0A4meq_4k3seIp6WilXSwyd9KNxfQWQpp0FMHvwfsYtaYZjkX8Sd1Ptty2tBaxGAfvVgNvMdHqZEI_PCJvWPobGRcMmyHUgDRXh6AiZlT9y7Dezc-GubSQozFV1lz20BIeFqcMJk7SmLVhPZLIjK_K0SeUDAlEXCKWIRykZgFah6wqN9skZLNBP0XqNSG8C28DMqEmvZDNI" alt="Pantalón Quirúrgico" fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-body text-base font-semibold text-on-surface">Pantalón Cargo Clínico Flex</p>
                    <p className="font-body text-sm text-on-surface-variant">Talla M - Azul Marino</p>
                  </div>
                </div>
                <span className="font-body text-base font-bold text-on-surface">$60.00</span>
              </div>

              {/* Separation via tonal shift */}
              <div className="mt-2 flex items-center justify-between rounded-lg bg-surface-container-highest p-4 pt-4">
                <span className="font-body text-lg font-semibold text-on-surface">Total pagado</span>
                <span className="font-body text-xl font-bold text-primary">$143.50</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="relative z-10 flex w-full flex-col justify-center gap-4 sm:flex-row">
            <Link href="/mis-pedidos" className="flex items-center justify-center rounded-md bg-primary px-8 py-3 font-body text-lg font-semibold text-on-primary shadow-[0_8px_24px_rgba(25,28,30,0.06)] transition-colors hover:bg-primary-container">
              Ver mis pedidos
            </Link>
            <Link href="/catalogo" className="flex items-center justify-center rounded-md border border-outline-variant bg-transparent px-8 py-3 font-body text-lg font-semibold text-primary transition-colors hover:bg-surface-container-low">
              Seguir comprando
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
