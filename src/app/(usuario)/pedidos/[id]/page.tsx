"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function OrderDetailPage() {
  const params = useParams();
  const orderId = params.id || "1234";

  return (
    <div className="flex w-full max-w-screen-2xl mx-auto flex-col gap-8 px-4 md:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 font-label text-sm font-medium text-on-surface-variant">
        <Link href="/" className="transition-colors hover:text-primary">Inicio</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link href="/pedidos" className="transition-colors hover:text-primary">Mis pedidos</Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="font-bold text-primary">Pedido #{orderId}</span>
      </nav>

      {/* Header Card */}
      <section className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 rounded-xl bg-surface-container-lowest p-6 md:p-8">
        <div>
          <div className="mb-2 flex items-center gap-4">
            <h1 className="font-headline text-3xl font-extrabold tracking-tight text-primary">Pedido #{orderId}</h1>
            <span className="rounded-full bg-primary-fixed px-3 py-1 font-label text-xs font-bold uppercase tracking-wider text-on-primary-fixed">Quality Check</span>
          </div>
          <p className="font-label text-sm text-on-surface-variant">Realizado el 15 de Octubre, 2023 a las 14:30</p>
        </div>
        <button className="rounded-md border-2 border-primary border-opacity-15 px-6 py-3 font-label text-sm font-bold uppercase tracking-wider text-primary transition-colors hover:bg-surface-variant" type="button">
          Comprar de nuevo
        </button>
      </section>

      {/* Status Tracker */}
      <section className="relative z-10 rounded-xl bg-surface-container-lowest p-6 md:p-10">
        <div className="relative mx-auto mb-8 max-w-4xl">
          {/* Connecting Line Base */}
          <div className="absolute left-0 top-1/2 z-0 h-1 w-full -translate-y-1/2 rounded-full bg-surface-variant"></div>
          {/* Active Line */}
          <div className="absolute left-0 top-1/2 z-0 h-1 w-1/2 -translate-y-1/2 rounded-full bg-primary"></div>
          {/* Steps */}
          <div className="relative z-10 flex justify-between">
            {/* Step 1 */}
            <div className="group flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-[0_4px_12px_rgba(20,48,103,0.2)]">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <span className="font-label text-center text-xs font-bold text-primary">Recibido</span>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-on-primary shadow-[0_4px_12px_rgba(20,48,103,0.2)]">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
              </div>
              <span className="font-label text-center text-xs font-bold text-primary">En confección</span>
            </div>
            {/* Step 3 Active */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container text-sm font-bold text-on-primary shadow-[0_4px_20px_rgba(20,48,103,0.3)] ring-4 ring-primary-fixed-dim">
                3
              </div>
              <span className="font-label text-center text-xs font-bold text-primary-container">Listo</span>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-outline-variant bg-surface-container-highest text-sm font-bold text-on-surface-variant">
                4
              </div>
              <span className="font-label text-center text-xs font-medium text-on-surface-variant">Enviado</span>
            </div>
            {/* Step 5 */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-outline-variant bg-surface-container-highest text-sm font-bold text-on-surface-variant">
                5
              </div>
              <span className="font-label text-center text-xs font-medium text-on-surface-variant">Entregado</span>
            </div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="font-label text-sm font-medium text-on-surface-variant">Fecha estimada de entrega: <strong className="font-bold text-primary">22 de Octubre, 2023</strong></p>
        </div>
      </section>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
        {/* Left Column: Products (65%) */}
        <div className="space-y-6 lg:col-span-8">
          <h2 className="font-headline mb-4 text-xl font-bold text-primary">Productos del pedido</h2>
          
          {/* Product List */}
          <div className="overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm">
            <div className="divide-y divide-surface-variant/50">
              {/* Item 1 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 transition-colors hover:bg-surface-bright">
                <div className="relative h-24 w-24 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuBo-dOm3wGkU7CVCgIiBMBolfHatH3LPJsJ_j0taN9pZCYZtmygkKjlMzwd8RgJI9CsvPWi28NngLBntLK55TNmTvh8fLf2hZY0n3IJfsI1lA41s0mHKbrNR0isEj3FlFWTreJ7TOcS_YgNEnV52YqeaMJXzBGfqZy6ryqWIhUES32Ga6EJbX2UA8-aCM5wNLgWNQ7cpsNIEWjiTc4iOcIHA6XvjWnFpJA4tNO3KnZIjlOpOFrDeud8-UYYUDlvEqP48tQDhfRoA57A" alt="Scrub Set Navy" fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-headline text-base font-bold text-on-surface">Conjunto Quirúrgico Élite</h3>
                  <p className="font-label mb-2 text-xs text-on-surface-variant">Categoría: Uniformes Médicos</p>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="font-label rounded bg-surface-container px-2 py-1 text-xs font-medium text-on-surface">Talla: L</span>
                    <span className="font-label rounded bg-surface-container px-2 py-1 text-xs font-medium text-on-surface">Color: Navy</span>
                  </div>
                  <p className="font-label inline-block rounded bg-tertiary-fixed px-2 py-1 text-xs font-medium text-tertiary">Nota: Bordado &quot;Dra. G&oacute;mez&quot; en bolsillo izq.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex w-full sm:w-auto flex-row sm:flex-col justify-between sm:justify-center text-right">
                  <span className="font-label mb-1 text-sm text-on-surface-variant">Cant: 2 x $45.00</span>
                  <span className="font-headline text-lg font-bold text-primary">$90.00</span>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 transition-colors hover:bg-surface-bright">
                <div className="relative h-24 w-24 sm:h-20 sm:w-20 shrink-0 overflow-hidden rounded-lg bg-surface-container">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCnYfEfyOCCzcOnop9O1GGKBm5SvuV9rCP2-k_K7ylilbMle3KdxY2OxkGgJiGViVcO-hzdSyyZ08Z_6TnLk0cfo8xN-7g4rF0QUhP_7v1B49FrjmdUxOiAZT5HWsaMq3rQNSRupQ1T1jS7dVeodU2--1HQf14zTOaGCbpDYCCOABjIG82nujdAKo5l2Kv7kh4oYQg7ClJXWnZjmkygnzh85h549J6VgrPdVLZUlj284GS582-dkXR0uHMA6Wcx8-4DrqkwZRyDzGva" alt="Lab Coat White" fill className="object-cover" />
                </div>
                <div className="flex-grow">
                  <h3 className="font-headline text-base font-bold text-on-surface">Bata de Laboratorio Premium</h3>
                  <p className="font-label mb-2 text-xs text-on-surface-variant">Categoría: Batas</p>
                  <div className="mb-2 flex flex-wrap gap-2">
                    <span className="font-label rounded bg-surface-container px-2 py-1 text-xs font-medium text-on-surface">Talla: M</span>
                    <span className="font-label rounded bg-surface-container px-2 py-1 text-xs font-medium text-on-surface">Color: Blanco</span>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 flex w-full sm:w-auto flex-row sm:flex-col justify-between sm:justify-center text-right">
                  <span className="font-label mb-1 text-sm text-on-surface-variant">Cant: 1 x $35.00</span>
                  <span className="font-headline text-lg font-bold text-primary">$35.00</span>
                </div>
              </div>
            </div>
            
            {/* Grand Total Banner */}
            <div className="flex items-center justify-between border-t border-outline-variant/20 bg-surface-container-low p-6">
              <span className="font-headline text-sm font-bold uppercase tracking-wider text-on-surface">Total del Pedido</span>
              <span className="font-headline text-2xl font-black text-primary">$125.00</span>
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar (35%) */}
        <div className="space-y-6 lg:col-span-4">
          {/* Financial Summary */}
          <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="font-headline mb-4 flex items-center gap-2 text-lg font-bold text-primary">
              <span className="material-symbols-outlined text-xl text-primary">receipt_long</span>
              Resumen Financiero
            </h3>
            <div className="space-y-3 font-body text-sm text-on-surface-variant">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-on-surface">$125.00</span>
              </div>
              <div className="flex justify-between">
                <span>Personalización (Bordado)</span>
                <span className="font-medium text-on-surface">$5.00</span>
              </div>
              <div className="flex justify-between border-b border-surface-variant pb-3">
                <span>Envío</span>
                <span className="font-medium text-on-surface">$10.00</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-base font-bold text-primary">Total a Pagar</span>
                <span className="text-base font-bold text-primary">$140.00</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="font-headline mb-4 flex items-center gap-2 text-lg font-bold text-primary">
              <span className="material-symbols-outlined text-xl text-primary">local_shipping</span>
              Información de Entrega
            </h3>
            <div className="rounded-lg bg-surface-container-low p-4">
              <p className="font-label mb-1 text-sm font-bold text-on-surface">Envío a Domicilio</p>
              <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                Dra. Ana Gómez<br/>
                Hospital General, Consultorio 4B<br/>
                San Salvador, El Salvador<br/>
                Tel: +503 7000-0000
              </p>
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-xl bg-surface-container-lowest p-6 shadow-sm">
            <h3 className="font-headline mb-4 flex items-center gap-2 text-lg font-bold text-primary">
              <span className="material-symbols-outlined text-xl text-primary">credit_card</span>
              Método de Pago
            </h3>
            <div className="flex items-center gap-4">
              <div className="flex h-8 w-12 items-center justify-center rounded border border-outline-variant bg-surface-container">
                <span className="material-symbols-outlined text-on-surface-variant">account_balance</span>
              </div>
              <div>
                <p className="font-label text-sm font-medium text-on-surface">Transferencia Bancaria</p>
                <p className="mt-1 inline-block rounded-full bg-primary-fixed px-2 py-0.5 text-xs font-bold text-primary">Pagado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
