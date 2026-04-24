import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Catálogo Universitario - UGB | Confecciones Liss",
  description:
    "Uniformes oficiales para estudiantes de la Universidad Gerardo Barrios (UGB).",
};

export default function CatalogoInstitucionalPage() {
  return (
    <main className="flex w-full flex-grow flex-col">
      {/* 3. Breadcrumbs */}
      <div className="mx-auto w-full max-w-7xl px-8 py-4">
        <nav className="font-body flex text-sm text-gray-500">
          <Link className="transition-colors hover:text-[#143067]" href="/">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <Link
            className="transition-colors hover:text-[#143067]"
            href={"/catalogo" as any}
          >
            Universidades
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-[#143067]">
            Universidad Gerardo Barrios
          </span>
        </nav>
      </div>

      {/* 4. Institutional Hero */}
      <section className="mx-auto mb-8 w-full max-w-7xl px-8">
        <div className="relative flex h-auto flex-col overflow-hidden rounded-xl bg-white shadow-sm md:h-[320px] md:flex-row">
          {/* Left 60% */}
          <div className="relative z-10 flex w-full flex-col justify-center p-8 md:w-[60%] md:p-12">
            <div className="absolute top-0 right-0 -z-10 hidden h-40 w-40 rounded-bl-full bg-[#143067]/5 md:block"></div>
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                <span className="material-symbols-outlined text-3xl text-gray-400">
                  school
                </span>
              </div>
            </div>
            <h1 className="font-headline mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl">
              Uniformes oficiales para estudiantes de la Universidad Gerardo
              Barrios
            </h1>
            <p className="font-body text-base text-gray-600">
              San Miguel, El Salvador — Carreras del sector salud.
            </p>
          </div>
          {/* Right 40% */}
          <div className="relative h-64 w-full md:h-full md:w-[40%]">
            <Image
              width={800}
              height={800}
              alt="Estudiante"
              className="h-full w-full object-cover object-top"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAM14pkXRqG87JWLOlquaaIi1TQAX8P19V-boHyMS837AmD53qhxLFO-Cl0oCcMzXrDHyyoWK2M0tbi4_6XvOQVnPfwoXzceV17JIiOQEgTr6YJnG50sz-h2xRZ77haknI78Gh6fX8EFjcRf85HOTNO0rAPzqueuZdM__CtFzGw8ZVzF0SCQsct81us-MJFHukWhRAn7imEV2pfqVANLbmgrnNkIGaLDWm10j8jIj7l_Ep4P6Cfv8qTvEEEtzzHCBGk_IBUKlB6-cU"
            />
          </div>
          {/* Bottom Strip */}
          <div className="absolute right-0 bottom-0 left-0 z-20 flex hidden items-center justify-between bg-[#143067] px-8 py-2 text-xs tracking-wider text-white uppercase sm:flex">
            <span>
              Confecciones Liss — Proveedor de uniformes para estudiantes de
              salud en San Miguel.
            </span>
            <span className="material-symbols-outlined text-sm">verified</span>
          </div>
        </div>
      </section>

      {/* 5. Info Strip */}
      <section className="mx-auto mb-8 w-full max-w-7xl px-8">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <span className="material-symbols-outlined text-[#143067]">
                  rule
                </span>
              </div>
              <span className="font-body text-sm font-medium text-gray-800">
                Modelos aprobados por reglamento UGB
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <span className="material-symbols-outlined text-[#143067]">
                  straighten
                </span>
              </div>
              <span className="font-body text-sm font-medium text-gray-800">
                Tallas XS hasta 3XL
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <span className="material-symbols-outlined text-[#143067]">
                  local_shipping
                </span>
              </div>
              <span className="font-body text-sm font-medium text-gray-800">
                Entrega en San Miguel
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50">
                <span className="material-symbols-outlined text-[#143067]">
                  groups
                </span>
              </div>
              <span className="font-body text-sm font-medium text-gray-800">
                Precio especial para grupos de sección
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Career Filters */}
      <section className="mx-auto mb-8 w-full max-w-7xl px-8">
        <div className="hide-scrollbar flex snap-x gap-3 overflow-x-auto pb-2">
          <button className="font-body shrink-0 snap-start rounded-full bg-[#143067] px-5 py-2.5 text-sm font-medium text-white">
            Todas
          </button>
          <button className="font-body shrink-0 snap-start rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            Medicina
          </button>
          <button className="font-body shrink-0 snap-start rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            Enfermería
          </button>
          <button className="font-body shrink-0 snap-start rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            Odontología
          </button>
          <button className="font-body shrink-0 snap-start rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            Fisioterapia
          </button>
          <button className="font-body shrink-0 snap-start rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            Laboratorio Clínico
          </button>
          <button className="font-body shrink-0 snap-start rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            Nutrición
          </button>
          <button className="font-body shrink-0 snap-start rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
            Radiología
          </button>
        </div>
      </section>

      {/* Main Content Area with Filters and Grid */}
      <div className="mx-auto mb-16 flex w-full max-w-7xl flex-col gap-8 px-8 lg:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full shrink-0 lg:w-64">
          {/* 7. Filter Bar */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-headline font-semibold text-gray-900">
                Filtros
              </h3>
              <button className="font-body text-xs font-medium text-[#b43024] hover:underline">
                Limpiar
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {/* Tallas */}
              <div>
                <label
                  className="mb-3 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                  htmlFor="talla"
                >
                  Talla
                </label>
                <select
                  id="talla"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-[#143067] focus:outline-none"
                >
                  <option>Todas las tallas</option>
                  <option>XS</option>
                  <option>S</option>
                  <option>M</option>
                  <option>L</option>
                  <option>XL</option>
                </select>
              </div>
              {/* Colores */}
              <div>
                <label
                  className="mb-3 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                  htmlFor="color"
                >
                  Color
                </label>
                <select
                  id="color"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-[#143067] focus:outline-none"
                >
                  <option>Todos los colores</option>
                  <option>Blanco</option>
                  <option>Azul Marino</option>
                  <option>Vino</option>
                </select>
              </div>
              {/* Sort */}
              <div>
                <label
                  className="mb-3 block text-xs font-semibold tracking-wider text-gray-500 uppercase"
                  htmlFor="ordenar"
                >
                  Ordenar por
                </label>
                <select
                  id="ordenar"
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-700 focus:border-[#143067] focus:outline-none"
                >
                  <option>Recomendados</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                  <option>Nuevos</option>
                </select>
              </div>
            </div>
          </div>
        </aside>

        {/* 8. Product Grid */}
        <div className="flex flex-grow flex-col">
          <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Product Card 1 */}
            <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute bottom-3 left-3 z-10 rounded border border-gray-100 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#143067] uppercase">
                UGB
              </div>
              <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm transition-colors hover:text-[#b43024]">
                <span className="material-symbols-outlined text-[18px]">
                  favorite
                </span>
              </button>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  width={800}
                  height={800}
                  alt="Scrub Navy"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBoARqRDTof2NbvL1nigR0jlkIzwqAwtRy7MQB2koo37cEi2gVH0vjwRZ8ZlZBzoV9_AC_d-MnVHlPTSphVq41XRK6YUv37qcs_SePKC0MbvRV1a55lp27RTaj1Hr-9EW0CrmNifwWda2s4SJZmBzhOrXJSZUzUx6k3GTe867OYbIWzwFFV0JmsBdO7xzLQPToxbGQMgsDiFouAr0-pPup2IRmQWlaUWcVJOM6atCbDXNiWbkXzu8DDBv1u2JpD4g-CersT1S7KV6g"
                />
              </div>
              <div className="flex flex-grow flex-col p-4">
                <span className="mb-1 text-[10px] tracking-wider text-gray-500 uppercase">
                  Medicina
                </span>
                <h3 className="font-headline mb-1 text-sm leading-snug font-semibold text-gray-900">
                  Conjunto Scrub Navy - Diseño Institucional
                </h3>
                <p className="mb-3 line-clamp-1 text-xs text-gray-500">
                  Filipina cuello V y pantalón jogger.
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-bold text-[#143067]">
                      $35.00
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Tallas: XS - 3XL
                    </span>
                  </div>
                  <button className="w-full rounded bg-[#143067] py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute bottom-3 left-3 z-10 rounded border border-gray-100 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#143067] uppercase">
                UGB
              </div>
              <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm transition-colors hover:text-[#b43024]">
                <span className="material-symbols-outlined text-[18px]">
                  favorite
                </span>
              </button>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  width={800}
                  height={800}
                  alt="Bata"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZuU8PT5ZipDHkTGv953rLRSvDeVSYXeN9i2bwV62uixjXPHm9zbacD6opZfZ74AmrUNUs-OhdZvjQp5SHrmU_zrNISEVLhmTkPJK6pVLhGzGKDOIEg1khy8BYvYybn3Wu9dZD3KxxQ4VHdhM_p_i03LP3FfZ-6K_kukkdLIiyhr6IS4nEP-tgwjPERzUCY7ODbOCylrva2KVv3JlNTR9nvxfmxMOtZMSd_B13EKmfLto9OVt14s-oBt0zUrGNxVJF5eHwaXWYanI"
                />
              </div>
              <div className="flex flex-grow flex-col p-4">
                <span className="mb-1 text-[10px] tracking-wider text-gray-500 uppercase">
                  Laboratorio
                </span>
                <h3 className="font-headline mb-1 text-sm leading-snug font-semibold text-gray-900">
                  Bata Clínica Manga Larga Oficial
                </h3>
                <p className="mb-3 line-clamp-1 text-xs text-gray-500">
                  Gabardina pesada con bordado.
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-bold text-[#143067]">
                      $28.00
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Tallas: S - XXL
                    </span>
                  </div>
                  <button className="w-full rounded bg-[#143067] py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute bottom-3 left-3 z-10 rounded border border-gray-100 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#143067] uppercase">
                UGB
              </div>
              <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm transition-colors hover:text-[#b43024]">
                <span className="material-symbols-outlined text-[18px]">
                  favorite
                </span>
              </button>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  width={800}
                  height={800}
                  alt="Enfermeria"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuANzcCZJbsb17DCLkZLsOeD-dCcw_uZOZN0v-JXT4_3cLKRIKKvo9I6OpOPSWnDUrqnrgQCUrXwp7PCiIybtliezeJP7njyekGrXKqPgUmV4yjPvlKU98beeuZ8e5jcyYWhTPLjPpi0-mJhciI6W4OOAj_M3HtIITniEytjHQFoVySdDVcQGVKdNrRIwskC0urjI0bDyqLA1OevBor1lG0RxThgv02tA16VsWJhOZ4Bn1RrQan0pKk_JPEOIWABjPdVrPh3Xd9BBio"
                />
              </div>
              <div className="flex flex-grow flex-col p-4">
                <span className="mb-1 text-[10px] tracking-wider text-gray-500 uppercase">
                  Enfermería
                </span>
                <h3 className="font-headline mb-1 text-sm leading-snug font-semibold text-gray-900">
                  Uniforme Clínico Blanco Tradicional
                </h3>
                <p className="mb-3 line-clamp-1 text-xs text-gray-500">
                  Resistente al cloro, ajuste clásico.
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-bold text-[#143067]">
                      $32.00
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Tallas: XS - 3XL
                    </span>
                  </div>
                  <button className="w-full rounded bg-[#143067] py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="relative flex flex-col overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="absolute bottom-3 left-3 z-10 rounded border border-gray-100 bg-white/90 px-2 py-0.5 text-[10px] font-bold text-[#143067] uppercase">
                UGB
              </div>
              <button className="absolute top-3 right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm transition-colors hover:text-[#b43024]">
                <span className="material-symbols-outlined text-[18px]">
                  favorite
                </span>
              </button>
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  width={800}
                  height={800}
                  alt="Fisio"
                  className="h-full w-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDP1yA9fpQcugpTOlGvw60D27NjUYF-hXxbat8pkovnaCneh0cQi_a5g_wJgyQhRA3F9akZq17qcrgcY8POvw4lS-CE0tlKMIKsXjL3MqOjbUVfkqbGTfGbNuG9TkGwlnbfUtyAb7EUtUxjA-VjVPCyEd7KntnQrrM8oEFNXNP_d6atxVSwlefupVVyLOnOXnT49UOyp_wNYyvFQ9CED0FbNt41KJhKT1QNoshYt0XycVX4Os9C3iuAbPEcCGlRGx5_jLieFM2i33I"
                />
              </div>
              <div className="flex flex-grow flex-col p-4">
                <span className="mb-1 text-[10px] tracking-wider text-gray-500 uppercase">
                  Fisioterapia
                </span>
                <h3 className="font-headline mb-1 text-sm leading-snug font-semibold text-gray-900">
                  Conjunto Scrub Vino Tinto Spandex
                </h3>
                <p className="mb-3 line-clamp-1 text-xs text-gray-500">
                  Alta movilidad con spandex.
                </p>
                <div className="mt-auto flex flex-col gap-3">
                  <div className="flex items-end justify-between">
                    <span className="text-lg font-bold text-[#143067]">
                      $38.00
                    </span>
                    <span className="text-[10px] text-gray-500">
                      Tallas: S - XL
                    </span>
                  </div>
                  <button className="w-full rounded bg-[#143067] py-2 text-sm font-medium text-white transition-colors hover:bg-blue-900">
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 9. Group Order Banner */}
          <div className="mb-12 flex w-full flex-col items-center justify-between gap-6 rounded-xl bg-[#143067] p-8 text-white shadow-md lg:flex-row">
            <div className="flex-1">
              <h3 className="font-headline mb-4 text-2xl font-bold">
                ¿Eres coordinador o representante de sección?
              </h3>
              <div className="flex flex-col gap-6 text-sm sm:flex-row">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    1
                  </span>
                  <span>Reúne los pedidos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
                    2
                  </span>
                  <span>Escríbenos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#b43024] text-xs font-bold">
                    3
                  </span>
                  <span>Precio especial</span>
                </div>
              </div>
            </div>
            <button className="shrink-0 rounded bg-white px-6 py-3 text-sm font-bold text-[#143067] transition-colors hover:bg-gray-100">
              Solicitar cotización grupal
            </button>
          </div>

          {/* 10. Pagination */}
          <div className="mb-16 flex items-center justify-center gap-2">
            <button
              className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50"
              disabled
            >
              <span className="material-symbols-outlined text-sm">
                chevron_left
              </span>
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded bg-[#143067] text-sm font-medium text-white">
              1
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-sm text-gray-700 transition-colors hover:bg-gray-50">
              2
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-sm text-gray-700 transition-colors hover:bg-gray-50">
              3
            </button>
            <span className="mx-1 text-gray-400">...</span>
            <button className="flex h-10 w-10 items-center justify-center rounded border border-gray-200 text-gray-700 transition-colors hover:bg-gray-50">
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 11. Related Section */}
      <section className="mx-auto mb-16 w-full max-w-7xl px-8">
        <h2 className="font-headline mb-6 text-2xl font-bold text-gray-900">
          También te puede interesar
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex h-64 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 shadow-sm">
            Producto relacionado
          </div>
          <div className="flex h-64 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 shadow-sm">
            Producto relacionado
          </div>
          <div className="flex h-64 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 shadow-sm">
            Producto relacionado
          </div>
          <div className="flex h-64 items-center justify-center rounded-xl border border-gray-100 bg-white text-gray-400 shadow-sm">
            Producto relacionado
          </div>
        </div>
      </section>

      {/* 12. SEO Block */}
      <section className="mt-auto border-t border-gray-200 bg-white py-12">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <p className="text-xs leading-relaxed text-gray-500">
            Confecciones Liss es proveedor de uniformes médicos y clínicos para
            estudiantes de la Universidad Gerardo Barrios (UGB) en San Miguel,
            El Salvador. Ofrecemos scrubs, gabachas y uniformes completos que
            cumplen con el reglamento institucional para las carreras del sector
            salud.
          </p>
        </div>
      </section>
    </main>
  );
}
