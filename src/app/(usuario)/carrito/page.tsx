"use client";

import Link from "next/link";
import Image from "next/image";
import { useAppStore } from "@/context/useAppStore";

export default function CarritoPage() {
  const { cartItems, removeFromCart, updateQuantity } = useAppStore();
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  if (cartItems.length === 0) {
    return (
      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="bg-surface-container-low mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <span className="material-symbols-outlined text-on-surface-variant text-4xl">
            shopping_cart
          </span>
        </div>
        <h1 className="font-headline text-primary mb-4 text-[3.5rem] leading-none font-bold tracking-tight">
          Tu carrito está vacío
        </h1>
        <p className="font-body text-on-surface-variant mb-8 text-lg">
          Agrega productos para comenzar tu pedido
        </p>
        <Link
          href="/catalogo/salud"
          className="from-primary to-primary-container font-body inline-block rounded-xl bg-gradient-to-br px-8 py-4 text-sm font-bold tracking-wide text-white uppercase transition-all hover:shadow-[0_8px_16px_rgba(0,27,74,0.15)]"
        >
          Ver catálogo
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="border-surface-variant flex items-end justify-between border-b pb-4">
        <div className="flex items-baseline gap-4">
          <h1 className="font-headline text-primary text-[3.5rem] leading-none font-bold tracking-tight">
            Mi carrito
          </h1>
          <span className="text-on-surface-variant font-body text-lg">
            ({cartItems.length} artículos)
          </span>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="flex flex-col items-start gap-8 lg:flex-row">
        {/* Left Column: Cart Items */}
        <div className="flex w-full flex-col gap-6 lg:w-[65%]">
          <div className="bg-surface-container-lowest relative rounded-xl p-6 sm:p-8">
            <h3 className="font-label text-on-surface-variant border-surface-variant mb-6 border-b pb-2 text-xs tracking-widest uppercase">
              Uniformes Médicos
            </h3>
            {cartItems.map((item) => (
              <div
                key={item.id + item.talla + item.color}
                className="border-surface-variant flex flex-col items-start gap-6 border-b py-4 last:border-0 sm:flex-row sm:items-center"
              >
                <div className="bg-surface-container-low h-24 w-24 shrink-0 overflow-hidden rounded-lg shadow-sm">
                  <div className="bg-surface-container-low h-full w-full" />
                </div>
                <div className="flex flex-grow flex-col gap-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-body text-primary text-lg font-bold">
                      {item.nombre}
                    </h4>
                    <button
                      aria-label="Eliminar producto"
                      onClick={() => removeFromCart(item.id)}
                      className="text-outline hover:text-error p-1 transition-colors"
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                  <p className="text-on-surface-variant text-sm">
                    Color: {item.color} | Talla: {item.talla}
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-3 sm:w-32">
                  <div className="border-outline-variant bg-surface-container-lowest flex items-center overflow-hidden rounded-lg border">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.cantidad - 1))
                      }
                      className="text-on-surface hover:bg-surface-container-low flex h-8 w-8 items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        remove
                      </span>
                    </button>
                    <input
                      className="text-on-surface h-8 w-10 border-0 bg-transparent p-0 text-center text-sm font-bold focus:ring-0"
                      readOnly
                      type="text"
                      value={item.cantidad}
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                      className="text-on-surface hover:bg-surface-container-low flex h-8 w-8 items-center justify-center transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">
                        add
                      </span>
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-body text-primary text-lg font-bold">
                      ${(item.precio * item.cantidad).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Link
            className="text-primary hover:text-primary-container mt-2 inline-flex w-fit items-center gap-2 text-sm font-bold transition-colors"
            href="/catalogo/salud"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Seguir comprando
          </Link>
        </div>

        {/* Right Column: Order Summary (Sticky) */}
        <div className="w-full lg:sticky lg:top-28 lg:w-[35%]">
          <div className="bg-surface-container-lowest border-outline-variant/15 rounded-xl border p-6 shadow-[0_16px_32px_rgba(0,27,74,0.06)] sm:p-8">
            <h3 className="font-headline text-primary border-surface-variant mb-6 border-b pb-4 text-xl font-bold">
              Resumen del pedido
            </h3>
            <div className="font-body mb-6 flex flex-col gap-4 text-sm">
              <div className="text-on-surface-variant flex items-center justify-between">
                <span>Subtotal ({cartItems.length} artículos)</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="text-on-surface-variant flex items-center justify-between pt-2">
                <span className="text-xs italic">
                  Envío: Se coordina al confirmar
                </span>
                <span className="font-medium">Por calcular</span>
              </div>
            </div>
            <div className="border-surface-variant mb-8 flex items-end justify-between border-t pt-6">
              <span className="font-body text-primary text-lg font-bold">
                Total
              </span>
              <span className="font-headline text-primary text-3xl font-bold">
                ${subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href="/checkout"
                className="from-primary to-primary-container font-body block w-full rounded-xl bg-gradient-to-br py-4 text-center text-sm font-bold tracking-wide text-white uppercase transition-all hover:shadow-[0_8px_16px_rgba(0,27,74,0.15)] active:scale-[0.98]"
              >
                Proceder al pago
              </Link>
              <div className="relative flex items-center py-2">
                <div className="border-surface-variant flex-grow border-t"></div>
                <span className="text-on-surface-variant mx-4 flex-shrink-0 text-xs font-semibold tracking-wider uppercase">
                  O
                </span>
                <div className="border-surface-variant flex-grow border-t"></div>
              </div>
              <button className="font-body flex w-full items-center justify-center gap-2 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 py-4 text-sm font-bold tracking-wide text-[#128C7E] uppercase transition-colors hover:bg-[#25D366]/20">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
                </svg>
                Comprar por WhatsApp
              </button>
            </div>
            <div className="text-on-surface-variant mt-6 flex items-center justify-center gap-2 text-xs">
              <span className="material-symbols-outlined text-[16px]">
                lock
              </span>
              <span>Transacción 100% segura y encriptada</span>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-sell Section */}
      <section className="border-surface-container-high mt-16 border-t pt-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-headline text-primary text-2xl font-bold">
            También te puede interesar
          </h2>
          <Link
            className="text-primary text-sm font-semibold underline underline-offset-4"
            href="/catalogo/salud"
          >
            Ver catálogo completo
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              cat: "Accesorios",
              name: "Gorro Quirúrgico Premium",
              price: "$8.00",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAIMqEJd9_aMqN-CoKi3FcYJ1NWEkZCMQjkSvuoE0rqkGrgy9OQKC6sGF9Kxs5tNLWSF0G3OwmzhWXgjZ5Lpc13U8lyc4W3PbiTNsFlm6-PrZsyAzbVbh5_kxT8vrMQdJ9x9BlMQSDcm4QBi12kqI6f73i_tq2h4TEQjboRqp3n-b3nQK9Lus2KsEkLv_xtgpN0hRyiJIy7quKR177IeaviRgU9MgjW9NieQZqeKZXcBGEckvbOP7eTWGXSLsEaFaKSKOyKf2z7Pw",
            },
            {
              cat: "Batas",
              name: "Bata Consulta Corta",
              price: "$35.00",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_mfykBEIZKwX6i_ZmMhf_mtSK6dOSWLepCrpSbcAEy_rtFV_rgWC4ZArDLNGLuMT7jA7IbDUu1b3SY_PD2yvbrC3d0Cy1wjQ5iDeJYRT9aBSLU9M4DLu7YMN1c27pOWL32zbntkkfbzoEKMfTevBD0qkIfbJIVAMacacoMRyc2wEs-7BsWuv8G1CAJCMUimJrEEW72oQ1J9pWdC5oEABD-EV3wOfVMO-q6DV6KMrCKLKt7PjcRwGbhSpnoubr4nXIPNY4RQa6DA",
            },
            {
              cat: "Uniformes",
              name: "Pantalón Jogger Clínico",
              price: "$22.00",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUpR2D2WOSk_w-bYE6sw_X_9SCeG12TzKhXTONrciL3yMP3xUaoBO8eVcw8sZGB4_IIHusovFqBoEVWiDolnuqXAp3g_LOcMLtRe46UQLcfISXz-CxxuLW4c7vgucw-bvCQhWsbTayYAgJwyNL2pSP4NFy6ysSIF-ddTEF13NI_3zFcOUqzEfby5YEnlghT-htITpb8QxlsqhaS-DzqsjAQS0nQmQbO6X2l5guANz7MEbLb89JDyt1xBSY5mMNQdtUbXiuuwaa8A",
            },
            {
              cat: "Filipinas",
              name: "Filipina Cuello V",
              price: "$18.50",
              img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAk4cpGr63JUCHi7D3fMrpx6ZEiTvhz2-7lz6fTkBLIBwlGr7ScHHI1CW9CfCof1zXdz0OKyo3YIIuUnsW0aKzKXTU6RwJMr1Be41cEehqrRWxbd2MeWLYFz_nQk-cqmqiZ1Yi2zGjrk2pVKcByWPieL0EfZaPSCQQ8HJ4Kt_xVGtH7m5rZUBzPgu0_cMLYrVlRH1lR1_yT3gpnLufICOQ0O4iWOh1WEWCfMqyk6bAN6uWaf2JsAanc3cvB-1lDngSHmASE0oMrOs",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="bg-surface-container-lowest group rounded-xl p-4 shadow-sm transition-all hover:shadow-[0_8px_24px_rgba(0,27,74,0.08)]"
            >
              <div className="bg-surface-container-low mb-4 aspect-square w-full overflow-hidden rounded-lg">
                <Image
                  width={400}
                  height={400}
                  alt={p.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={p.img}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label text-on-surface-variant text-[10px] tracking-widest uppercase">
                  {p.cat}
                </span>
                <h4 className="font-body text-primary line-clamp-1 text-sm font-bold">
                  {p.name}
                </h4>
                <span className="font-body text-primary mt-1 font-bold">
                  {p.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
