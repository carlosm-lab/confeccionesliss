"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<
    "paypal" | "bank" | "cash"
  >("bank");

  return (
    <div className="bg-surface font-body text-on-surface flex min-h-screen flex-col">
      {/* Minimal TopNavBar */}
      <header className="bg-surface-container-low sticky top-0 z-50 flex w-full items-center justify-between px-6 py-4 shadow-sm transition-colors md:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/checkout"
            className="text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            <span className="hidden sm:inline">Volver a envío</span>
          </Link>
        </div>
        <div className="font-headline text-primary text-xl font-bold tracking-tighter uppercase">
          Confecciones Liss
        </div>
        <div className="flex items-center gap-4">
          <button className="border-primary text-primary flex items-center gap-2 border-b-2 pb-1 font-semibold transition-opacity hover:opacity-80 active:scale-95">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              lock
            </span>
            <span className="hidden sm:inline">Pago Seguro</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-12 px-4 py-12 sm:px-6 lg:flex-row lg:px-8">
        {/* Left Column (60%) */}
        <div className="w-full space-y-10 lg:w-3/5">
          {/* Step Indicator */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex flex-col items-center">
              <div className="bg-surface-variant font-label text-on-surface-variant flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold">
                1
              </div>
              <span className="font-label text-on-surface-variant mt-2 text-xs">
                Envío
              </span>
            </div>
            <div className="bg-surface-variant mt-[-20px] h-px w-12"></div>
            <div className="flex flex-col items-center">
              <div className="bg-primary font-label text-on-primary flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold shadow-[0_8px_24px_rgba(25,28,30,0.06)]">
                2
              </div>
              <span className="font-label text-primary mt-2 text-xs font-bold">
                Pago
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="font-headline text-primary mb-2 text-3xl font-bold tracking-tight md:text-4xl">
              Método de pago
            </h1>
            <p className="font-body text-on-surface-variant text-base">
              Seleccione cómo desea pagar su pedido.
            </p>
          </div>

          {/* Payment Options (Cards) */}
          <div className="space-y-4">
            {/* PayPal */}
            <label
              htmlFor="payment-paypal"
              aria-label="Pagar con PayPal"
              className="group bg-surface-container-lowest hover:bg-surface-container-low focus-within:border-outline-variant/30 focus-within:bg-surface-container-lowest block cursor-pointer rounded-xl border border-transparent p-6 shadow-[0_8px_24px_rgba(25,28,30,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <input
                  id="payment-paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="border-outline-variant text-primary focus:ring-primary focus:ring-opacity-50 h-5 w-5"
                  name="payment_method"
                  type="radio"
                  value="paypal"
                />
                <div className="flex flex-grow items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    account_balance_wallet
                  </span>
                  <div>
                    <h3 className="font-headline text-primary text-lg font-semibold">
                      PayPal
                    </h3>
                    <p className="font-body text-on-surface-variant mt-1 text-sm">
                      Pago seguro en línea
                    </p>
                  </div>
                </div>
              </div>
            </label>

            {/* Bank Transfer */}
            <label
              htmlFor="payment-bank"
              aria-label="Transferencia bancaria"
              className="group bg-surface-container-lowest hover:bg-surface-container-low focus-within:border-outline-variant/30 focus-within:bg-surface-container-lowest block cursor-pointer rounded-xl border border-transparent p-6 shadow-[0_8px_24px_rgba(25,28,30,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <input
                  id="payment-bank"
                  checked={paymentMethod === "bank"}
                  onChange={() => setPaymentMethod("bank")}
                  className="border-outline-variant text-primary focus:ring-primary focus:ring-opacity-50 h-5 w-5"
                  name="payment_method"
                  type="radio"
                  value="bank"
                />
                <div className="flex flex-grow items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    account_balance
                  </span>
                  <div>
                    <h3 className="font-headline text-primary text-lg font-semibold">
                      Bank Transfer (Transferencia Bancaria)
                    </h3>
                    <p className="font-body text-on-surface-variant mt-1 text-sm">
                      Recibirás los datos al confirmar
                    </p>
                  </div>
                </div>
              </div>
            </label>

            {/* Cash on delivery */}
            <label
              htmlFor="payment-cash"
              aria-label="Pago contra entrega"
              className="group bg-surface-container-lowest hover:bg-surface-container-low focus-within:border-outline-variant/30 focus-within:bg-surface-container-lowest block cursor-pointer rounded-xl border border-transparent p-6 shadow-[0_8px_24px_rgba(25,28,30,0.02)] transition-colors"
            >
              <div className="flex items-center gap-4">
                <input
                  id="payment-cash"
                  checked={paymentMethod === "cash"}
                  onChange={() => setPaymentMethod("cash")}
                  className="border-outline-variant text-primary focus:ring-primary focus:ring-opacity-50 h-5 w-5"
                  name="payment_method"
                  type="radio"
                  value="cash"
                />
                <div className="flex flex-grow items-center gap-4">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    local_shipping
                  </span>
                  <div>
                    <h3 className="font-headline text-primary text-lg font-semibold">
                      Cash on delivery (Pago a Contra Entrega)
                    </h3>
                    <p className="font-body text-on-surface-variant mt-1 text-sm">
                      Solo disponible en San Miguel
                    </p>
                  </div>
                </div>
              </div>
            </label>
          </div>

          {/* Action Button */}
          <div className="pt-6">
            <Link
              href="/"
              className="bg-primary font-label text-on-primary hover:bg-primary-container flex w-full items-center justify-center rounded-md px-8 py-4 font-semibold shadow-[0_8px_24px_rgba(25,28,30,0.06)] transition-colors md:w-auto"
            >
              Confirmar pedido
            </Link>
          </div>
        </div>

        {/* Right Column (40%, Sticky) - Order Summary */}
        <aside className="w-full lg:w-2/5">
          <div className="bg-surface-container-low sticky top-24 rounded-xl p-8 shadow-[0_8px_24px_rgba(25,28,30,0.02)]">
            <h2 className="font-headline text-primary mb-6 text-xl font-semibold">
              Resumen del pedido
            </h2>

            <div className="space-y-6">
              {/* Item 1 */}
              <div className="flex items-start gap-4">
                <div className="bg-surface-container-highest relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUEQzHZwWkeuTDRHwD_h1NgRaTqeVXaf614e2ed8wpRMwWAoi4QiHM7RvkLst-JA6V0ZUmZzyq91_OBhPrX7eMpEwQYb0CZiyXotk4WtpIq8nOuDJ7UH84YIQ3Ppvny5OEVX46ellZzzk59BedHFdewOwSrnj8Wrwld3jFv6ZWmkjjfumvxYQvyHinzUpMBI_zIE0oYFp0N9fFXky7D_5s7ivP4RmhiPtDQHaCnsQTFeX4eeinrr9nt1rpmcfyLXsxQafDRuquFONp"
                    alt="Medical Uniform Top"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-body text-primary text-sm font-medium">
                    Bata Médica Clásica - Blanco
                  </h4>
                  <p className="font-label text-on-surface-variant mt-1 text-xs">
                    Talla: M | Cantidad: 1
                  </p>
                  <p className="font-label text-primary mt-2 text-sm font-semibold">
                    $45.00
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex items-start gap-4">
                <div className="bg-surface-container-highest relative h-16 w-16 shrink-0 overflow-hidden rounded-md">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXycALE7LjO2K6kwdZtgtYtYD5voKeGsQdR306fu9AqEVTI-dbHUetkbbAjvGWnkEhEqpsy2B-pkwI7sHng_ZvSKRKJdKiuJMl2ad4F5xz3MumzRzEguJGhm2BkUozAtVwx5263v-vS4aLQ55FsMjjCmwdpXlF73IuLl9-YTJ8Sfigx1BtE4zyvWMP3CGHRV9Teeat_caiIKiM2S38h3kUcdor7AeVsgWh1N1xZg1D9N3-C_Am_i5PncL-RnEnzfzo79Y1pplNYxPn"
                    alt="Medical Uniform Pants"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h4 className="font-body text-primary text-sm font-medium">
                    Pantalón Quirúrgico - Azul Marino
                  </h4>
                  <p className="font-label text-on-surface-variant mt-1 text-xs">
                    Talla: L | Cantidad: 2
                  </p>
                  <p className="font-label text-primary mt-2 text-sm font-semibold">
                    $60.00
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-surface-variant my-6 h-px w-full"></div>

            <div className="font-label text-on-surface-variant space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>$105.00</span>
              </div>
              <div className="flex justify-between">
                <span>Envío</span>
                <span>$5.00</span>
              </div>
              <div className="flex justify-between">
                <span>Impuestos</span>
                <span>$13.65</span>
              </div>
            </div>

            <div className="bg-surface-variant my-6 h-px w-full"></div>

            <div className="font-headline text-primary flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>$123.65</span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
