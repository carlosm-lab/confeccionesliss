"use client";

import Image from "next/image";
import Link from "next/link";

export default function OrderHistoryPage() {
  return (
    <div className="flex w-full max-w-screen-xl mx-auto flex-col gap-8 px-6 py-12">
      {/* Header */}
      <section className="bg-surface-container-lowest rounded-xl p-8 shadow-[0_8px_30px_rgb(25,28,30,0.04)]">
        <div className="mb-2 flex items-center gap-4">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-primary">Mis Pedidos</h1>
          <span className="rounded-full bg-surface-container-low px-3 py-1 font-label text-sm font-semibold text-on-surface-variant">12 Totales</span>
        </div>
        <p className="font-body text-lg text-on-surface-variant">Historial completo de tus compras en Confecciones Liss.</p>
      </section>

      {/* Filter & Search Bar */}
      <section className="flex flex-col items-start gap-6 rounded-xl bg-surface-container-lowest p-6 shadow-[0_8px_30px_rgb(25,28,30,0.04)] lg:flex-row lg:items-center justify-between">
        <div className="relative w-full lg:w-1/3">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input className="w-full rounded-md border border-outline-variant/15 bg-surface-container-low py-3 pl-12 pr-4 font-body text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Buscar por número o producto..." type="text"/>
        </div>
        <div className="flex flex-1 w-full flex-wrap gap-2 lg:w-auto">
          <button className="rounded-full bg-primary-container px-4 py-2 font-label text-sm font-semibold text-on-primary shadow-sm" type="button">Todos</button>
          <button className="rounded-full bg-surface-container-low px-4 py-2 font-label text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors" type="button">Pendiente de pago</button>
          <button className="rounded-full bg-surface-container-low px-4 py-2 font-label text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors" type="button">En confección</button>
          <button className="rounded-full bg-surface-container-low px-4 py-2 font-label text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors" type="button">Listo para retirar</button>
          <button className="rounded-full bg-surface-container-low px-4 py-2 font-label text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors" type="button">Enviado</button>
          <button className="rounded-full bg-surface-container-low px-4 py-2 font-label text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors" type="button">Entregado</button>
          <button className="rounded-full bg-surface-container-low px-4 py-2 font-label text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors" type="button">Cancelado</button>
        </div>
        <div className="relative w-full lg:w-auto">
          <label htmlFor="periodFilter" className="sr-only">Filtrar por periodo</label>
          <select id="periodFilter" className="w-full lg:w-48 appearance-none rounded-md border border-outline-variant/15 bg-surface-container-low py-3 px-4 font-body text-on-surface transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer">
            <option>Todo el tiempo</option>
            <option>Último mes</option>
            <option>Últimos 3 meses</option>
            <option>Este año</option>
          </select>
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
        </div>
      </section>

      {/* Orders List */}
      <section className="flex flex-col gap-6">
        {/* Order Card 1: En confección */}
        <article className="rounded-xl bg-surface-container-lowest p-6 shadow-[0_8px_30px_rgb(25,28,30,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgb(25,28,30,0.08)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6">
            <div className="mb-4 flex flex-col gap-1 md:mb-0">
              <span className="font-headline text-xl font-bold text-primary">Pedido #4829</span>
              <span className="font-body text-sm text-on-surface-variant">Realizado el 12 de Octubre, 2024</span>
            </div>
            <span className="rounded-full bg-primary-container px-3 py-1.5 font-label text-xs font-bold uppercase tracking-wider text-on-primary-container">En confección</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 rounded-md bg-surface px-6 py-6">
            <div className="flex -space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-surface-container-lowest">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxjnUGKRE9_oE2mybSYe9GP6eBDyQYrCGluggH32VW8JqUFGVrnlSg0_j62h0K7Gr7B9aZWn90yI32-EGR8J8RtGJGA-ynuxNM7975tp9C7AgdRbL3-puJhxIKiXm6Zi1KAW6K73vo6PDgRHgZWdDTImasgB3t3fFUEh4w_6x57aYHjpalc1MOZhUzLLjmBcLCCPEBGGyiap76SWL1rh9KtzZhZHsEv3L_wWQXjgTfX9fBeQ4Xcgbx4ziET81wXUb7OYChEPwJQok" alt="Scrub top navy blue" fill className="object-cover" />
              </div>
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-surface-container-lowest">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZOlUu-Wn4IAevbOca9sgsyNAkwJc8ppOFoIQofyoTm7jC5Rjeei6aGCMU9_FZl7QAMEGYpGqv-VoXbRTkRgzUN_8O3EA6wALWDMYGdC8MD5ZYNF4T9louhyWQQFiuEI-EGHypRqJY0tkR3Ps-6foYeVGxdS2VMWZ28PL0Ecg6KyK3UjP6j098OOmMa7Ql68r0oM7WgBFh1cj-3yUzw7-hflRsoXe9BsBwIkQIK0Bj2Su51YQxpp20oogzm_rCCQmjxWTo8KVEQiY" alt="Scrub pants navy blue" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-body font-semibold text-on-surface">Conjunto Quirúrgico Premium x2</h3>
              <p className="font-body text-sm text-on-surface-variant">Talla M • Azul Marino</p>
            </div>
            <div className="text-right">
              <span className="font-headline text-2xl font-bold text-primary">$85.00</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6">
            <div className="mb-4 sm:mb-0 flex items-center gap-2 font-body text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-base">credit_card</span>
              <span>Pagado con Visa terminada en 4242</span>
            </div>
            <Link href="/pedidos/4829" className="rounded-lg border border-primary px-6 py-2 font-label font-semibold text-primary transition-colors hover:bg-surface-variant">Ver detalle</Link>
          </div>
        </article>

        {/* Order Card 2: Entregado */}
        <article className="rounded-xl bg-surface-container-lowest p-6 shadow-[0_8px_30px_rgb(25,28,30,0.04)] transition-shadow duration-300 hover:shadow-[0_12px_40px_rgb(25,28,30,0.08)]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6">
            <div className="mb-4 flex flex-col gap-1 md:mb-0">
              <span className="font-headline text-xl font-bold text-primary">Pedido #4710</span>
              <span className="font-body text-sm text-on-surface-variant">Realizado el 05 de Septiembre, 2024</span>
            </div>
            <span className="rounded-full bg-emerald-100 text-emerald-800 px-3 py-1.5 font-label text-xs font-bold uppercase tracking-wider">Entregado</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6 rounded-md bg-surface px-6 py-6">
            <div className="flex -space-x-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-surface-container-lowest">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6l_ukmIXeoJxaWjDbBgmMRaXdo7IkBeTO4gnr013eqB7ExE_uvWHIcHTR8C8t92QsGXJzewX4yZk4eNLUOnV_ItB0dYyi9YGjZgwRFpSPVq1y9hlW_5rp_FQahv3JIJgrbpAYbMN4dMUXe-sBUvmw86Lyq1tgyWb3h-bPEknSEDIPYyL8XuIrDH7J47D55s0T4ss5noMafDBqp1jwjltHha-lKaYD6l_CdWhDoQCNo8DW6rdzrjhmjWxNvB8smy7traD5x7u0Brg" alt="White lab coat" fill className="object-cover" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-body font-semibold text-on-surface">Bata Clínica de Especialista</h3>
              <p className="font-body text-sm text-on-surface-variant">Talla L • Blanco Óptico</p>
            </div>
            <div className="text-right">
              <span className="font-headline text-2xl font-bold text-primary">$45.00</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-6">
            <div className="mb-4 sm:mb-0 flex items-center gap-2 font-body text-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-base">account_balance</span>
              <span>Pagado por Transferencia Bancaria</span>
            </div>
            <Link href="/pedidos/4710" className="rounded-lg border border-primary px-6 py-2 font-label font-semibold text-primary transition-colors hover:bg-surface-variant">Ver detalle</Link>
          </div>
        </article>
      </section>

      {/* Pagination */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button aria-label="Anterior" className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-container-lowest text-on-surface-variant shadow-sm transition-colors hover:bg-surface-variant" type="button">
          <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-container font-label font-semibold text-on-primary shadow-sm" type="button">1</button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-container-lowest font-label font-medium text-on-surface-variant shadow-sm transition-colors hover:bg-surface-variant" type="button">2</button>
        <button className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-container-lowest font-label font-medium text-on-surface-variant shadow-sm transition-colors hover:bg-surface-variant" type="button">3</button>
        <span className="px-2 text-on-surface-variant">...</span>
        <button aria-label="Siguiente" className="flex h-10 w-10 items-center justify-center rounded-md bg-surface-container-lowest text-on-surface-variant shadow-sm transition-colors hover:bg-surface-variant" type="button">
          <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
        </button>
      </div>
    </div>
  );
}
