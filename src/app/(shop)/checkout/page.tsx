"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CheckoutDeliveryPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<"shipping" | "pickup">(
    "shipping"
  );

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

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 py-12 sm:px-6 lg:flex-row lg:gap-12 lg:px-8">
        {/* Left Column (60%) */}
        <div className="w-full space-y-10 lg:w-3/5">
          <div className="space-y-2">
            <h1
              className="font-headline text-primary text-4xl font-bold tracking-tight md:text-5xl"
              style={{ letterSpacing: "-0.02em" }}
            >
              Información de contacto y entrega
            </h1>
            <p className="font-body text-on-surface-variant text-lg">
              Paso 1 de 2: Complete sus datos para el envío o retiro de sus
              uniformes médicos.
            </p>
          </div>

          {/* Contact Information */}
          <section className="bg-surface-container-low space-y-6 rounded-xl p-8">
            <h2 className="font-headline text-primary text-2xl font-semibold">
              Información de contacto
            </h2>
            <div className="space-y-4">
              <div className="relative">
                <label
                  className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                  htmlFor="fullName"
                >
                  Nombre Completo
                </label>
                <input
                  className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                  id="fullName"
                  placeholder="Ej. Dr. Juan Pérez"
                  type="text"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative">
                  <label
                    className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                    htmlFor="phone"
                  >
                    Teléfono (+503)
                  </label>
                  <input
                    className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                    id="phone"
                    placeholder="7777-7777"
                    type="tel"
                  />
                </div>
                <div className="relative">
                  <label
                    className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                    htmlFor="email"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                    id="email"
                    placeholder="doctor@clinica.com"
                    type="email"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Delivery Method */}
          <section className="bg-surface-container-low space-y-6 rounded-xl p-8">
            <h2 className="font-headline text-primary text-2xl font-semibold">
              Método de entrega
            </h2>
            <div className="flex flex-col gap-4 sm:flex-row">
              <label
                htmlFor="delivery-shipping"
                aria-label="Envío a domicilio"
                className="flex-1 cursor-pointer"
              >
                <input
                  id="delivery-shipping"
                  checked={deliveryMethod === "shipping"}
                  onChange={() => setDeliveryMethod("shipping")}
                  className="peer sr-only"
                  name="deliveryMethod"
                  type="radio"
                  value="shipping"
                />
                <div className="border-outline-variant/15 bg-surface-container-lowest peer-checked:border-primary peer-checked:ring-primary flex items-center gap-4 rounded-lg border p-4 transition-all peer-checked:ring-1">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_shipping
                  </span>
                  <div>
                    <p className="text-primary font-semibold">
                      Envío a domicilio
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      Entrega a todo El Salvador
                    </p>
                  </div>
                </div>
              </label>
              <label
                htmlFor="delivery-pickup"
                aria-label="Retiro en tienda"
                className="flex-1 cursor-pointer"
              >
                <input
                  id="delivery-pickup"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                  className="peer sr-only"
                  name="deliveryMethod"
                  type="radio"
                  value="pickup"
                />
                <div className="border-outline-variant/15 bg-surface-container-lowest peer-checked:border-primary peer-checked:ring-primary flex items-center gap-4 rounded-lg border p-4 opacity-70 transition-all peer-checked:opacity-100 peer-checked:ring-1">
                  <span
                    className="material-symbols-outlined text-primary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    storefront
                  </span>
                  <div>
                    <p className="text-primary font-semibold">
                      Retiro en tienda
                    </p>
                    <p className="text-on-surface-variant text-sm">
                      Sucursal San Miguel
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {/* Shipping Address Fields (Conditional) */}
            {deliveryMethod === "shipping" && (
              <div className="border-surface-variant space-y-4 border-t pt-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="relative">
                    <label
                      className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                      htmlFor="department"
                    >
                      Departamento
                    </label>
                    <select
                      className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full appearance-none rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                      id="department"
                    >
                      <option>San Miguel</option>
                      <option>San Salvador</option>
                      <option>La Libertad</option>
                    </select>
                    <span className="text-on-surface-variant material-symbols-outlined pointer-events-none absolute top-[38px] right-4">
                      expand_more
                    </span>
                  </div>
                  <div className="relative">
                    <label
                      className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                      htmlFor="municipality"
                    >
                      Municipio
                    </label>
                    <select
                      className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full appearance-none rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                      id="municipality"
                    >
                      <option>San Miguel</option>
                      <option>San Salvador</option>
                      <option>Antiguo Cuscatlán</option>
                    </select>
                    <span className="text-on-surface-variant material-symbols-outlined pointer-events-none absolute top-[38px] right-4">
                      expand_more
                    </span>
                  </div>
                </div>
                <div className="relative">
                  <label
                    className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                    htmlFor="address"
                  >
                    Dirección Exacta (Colonia, Residencial, Calle, # Casa)
                  </label>
                  <input
                    className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                    id="address"
                    placeholder="Ej. Residencial Las Magnolias, Calle Principal, Casa #42"
                    type="text"
                  />
                </div>
                <div className="relative">
                  <label
                    className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                    htmlFor="landmark"
                  >
                    Punto de Referencia
                  </label>
                  <input
                    className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                    id="landmark"
                    placeholder="Frente a parque central / Casa color blanco con portón negro"
                    type="text"
                  />
                </div>

                {/* Google Maps Placeholder */}
                <div className="bg-surface-container-highest relative mt-4 flex h-48 items-center justify-center overflow-hidden rounded-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 grayscale"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDneM0sD_BneKJKEQoCRvSQ2gcv1eLJO-2iKYMsYETjkJqs745umE_esUmFQ-73XEpc_qPHfLrNuy6m67oZJRWlcpbINXejVNyRcNQE9oeDRjA_NRAtIZE1jv3uH-lBkVCZLpc4T72m32_qRWkjxxw_PYNBZIOgcE8nojNmm3TSUjqHh2d6iEYNuDenATwM1R2v-GGmGXb_rR6GW63PlA1NMAJLUDYLCFVZIGSh0n4es5B7-CRS7ysnDDBXKOk00PdrBlLqfsJnxtr7')",
                    }}
                  ></div>
                  <div className="text-on-surface-variant relative z-10 flex flex-col items-center">
                    <span
                      className="material-symbols-outlined mb-2 text-4xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      pin_drop
                    </span>
                    <span className="text-sm font-semibold">
                      Toca para ubicar en el mapa
                    </span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Order Notes & Preferences */}
          <section className="bg-surface-container-low space-y-6 rounded-xl p-8">
            <h2 className="font-headline text-primary text-2xl font-semibold">
              Notas y Personalización
            </h2>
            <div className="relative">
              <label
                className="font-label text-on-surface-variant mb-1 block text-sm font-semibold"
                htmlFor="notes"
              >
                Indicaciones especiales o notas del pedido
              </label>
              <textarea
                className="bg-surface-container-highest text-on-surface focus:bg-surface-container-lowest focus:ring-primary/30 w-full resize-none rounded-lg border-0 px-4 py-3 shadow-sm transition-colors outline-none focus:ring-1"
                id="notes"
                placeholder="Ej. El bordado debe decir 'Dra. María - Pediatría' / Entregar en horario de mañana"
                rows={3}
              ></textarea>
            </div>
            <div className="space-y-3 pt-2">
              <label
                htmlFor="confirm-sizes"
                className="group flex cursor-pointer items-start gap-3"
              >
                <div className="border-outline-variant bg-surface-container-highest group-hover:border-primary mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors">
                  <input
                    id="confirm-sizes"
                    defaultChecked
                    className="peer sr-only"
                    type="checkbox"
                  />
                  <span
                    className="material-symbols-outlined text-primary text-[16px] opacity-0 transition-opacity peer-checked:opacity-100"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </div>
                <span className="text-on-surface-variant text-sm">
                  Confirmar que las tallas seleccionadas son correctas según la
                  guía de medidas.
                </span>
              </label>
              <label
                htmlFor="fiscal-credit"
                className="group flex cursor-pointer items-start gap-3"
              >
                <div className="border-outline-variant bg-surface-container-highest group-hover:border-primary mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors">
                  <input
                    id="fiscal-credit"
                    className="peer sr-only"
                    type="checkbox"
                  />
                  <span
                    className="material-symbols-outlined text-primary text-[16px] opacity-0 transition-opacity peer-checked:opacity-100"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </div>
                <span className="text-on-surface-variant text-sm">
                  Requiero factura con crédito fiscal (Nos contactaremos para
                  solicitar los datos).
                </span>
              </label>
            </div>
          </section>

          {/* Primary Action */}
          <div className="pt-4">
            <Link
              href="/checkout/pago"
              className="bg-primary text-on-primary flex w-full items-center justify-center gap-2 rounded-lg px-8 py-4 text-lg font-semibold shadow-[0_8px_24px_rgba(25,28,30,0.06)] transition-opacity hover:opacity-90 md:w-auto"
            >
              Continuar al pago
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary Sticky Sidebar (40%) */}
        <aside className="relative mt-8 w-full lg:mt-0 lg:w-2/5">
          <div className="border-outline-variant/10 bg-surface-container-lowest sticky top-24 rounded-xl border p-8 shadow-[0_8px_24px_rgba(25,28,30,0.04)]">
            <div className="border-surface-variant mb-6 flex items-end justify-between border-b pb-4">
              <h2 className="font-headline text-primary text-2xl font-bold">
                Tu pedido
              </h2>
              <Link
                href="/carrito"
                className="text-primary-container hover:text-primary flex items-center gap-1 text-sm font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  arrow_back
                </span>
                Editar carrito
              </Link>
            </div>

            {/* Order Items */}
            <div className="no-scrollbar mb-8 max-h-[400px] space-y-6 overflow-y-auto pr-2">
              <div className="flex items-start gap-4">
                <div className="bg-surface-container relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrK6YGNco1ebNvTp8wl5brxk49jAYFm9fIUnpzw78EqBR-07mj3Ya-ohErjDjsK6ymaEZg8_ZaI9hs3-VL6dlmGzJ6Q-QdLx5TyXuc_h6sTk8kt3m9dGzBMvTzCTCQNK50xUZ5f2m9gcbZ58J-V3kyeCK50K_trFBjGPs0pSV4JnYg4LvyDWaHLjC0Dl972j1wo6-CkeKiUUPGY5WUhGRINrjNcOaLo41Zi0QGzkA9C-YQQBowLpDc3P5sW2TdO61atbXkwLhO7ynJ"
                    alt="Scrub top"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-primary text-sm leading-tight font-bold">
                    Filipina Médica Quirúrgica Élite
                  </h3>
                  <p className="text-on-surface-variant mt-1 text-xs">
                    Color: Azul Marino | Talla: M
                  </p>
                  <p className="text-on-surface-variant text-xs">
                    Bordado: Sí (+&quot;Dr. Pérez&quot;)
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-on-surface text-sm font-semibold">
                      Cant: 2
                    </span>
                    <span className="text-primary font-bold">$70.00</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-surface-container relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDO3mVbHuGtsO6In2ma2X24HYCTr34agnNZaCyrjWa1iz8rfoNXLYy_VynY2xIHhP0Ub0A4meq_4k3seIp6WilXSwyd9KNxfQWQpp0FMHvwfsYtaYZjkX8Sd1Ptty2tBaxGAfvVgNvMdHqZEI_PCJvWPobGRcMmyHUgDRXh6AiZlT9y7Dezc-GubSQozFV1lz20BIeFqcMJk7SmLVhPZLIjK_K0SeUDAlEXCKWIRykZgFah6wqN9skZLNBP0XqNSG8C28DMqEmvZDNI"
                    alt="Scrub pants"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="text-primary text-sm leading-tight font-bold">
                    Pantalón Cargo Clínico Flex
                  </h3>
                  <p className="text-on-surface-variant mt-1 text-xs">
                    Color: Azul Marino | Talla: M
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-on-surface text-sm font-semibold">
                      Cant: 2
                    </span>
                    <span className="text-primary font-bold">$60.00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Totals */}
            <div className="border-surface-variant space-y-3 border-t pt-6">
              <div className="text-on-surface-variant flex justify-between text-sm">
                <span>Subtotal</span>
                <span>$130.00</span>
              </div>
              <div className="text-on-surface-variant flex justify-between text-sm">
                <span>Envío (San Miguel)</span>
                <span>$3.50</span>
              </div>
              <div className="text-on-surface-variant flex justify-between text-sm">
                <span>Bordados (x2)</span>
                <span>$10.00</span>
              </div>
              <div className="border-surface-variant mt-2 flex items-end justify-between border-t pt-4">
                <span className="text-primary text-lg font-bold">Total</span>
                <span
                  className="text-primary text-3xl font-bold tracking-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  $143.50
                </span>
              </div>
            </div>

            {/* Secure Badge */}
            <div className="border-surface-variant text-on-surface-variant mt-8 flex items-center justify-center gap-2 border-t pt-6">
              <span
                className="material-symbols-outlined text-green-700"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified_user
              </span>
              <span className="text-sm font-semibold tracking-wider uppercase">
                Compra Segura y Encriptada
              </span>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
