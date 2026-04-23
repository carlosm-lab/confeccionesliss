import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Catálogo Corporativo y Talleres | Confecciones Liss",
  description:
    "Uniformes corporativos, camisas oxford, overoles, pantalones cargo y más.",
};

export default function CatalogoCorporativoPage() {
  return (
    <main className="w-full">
      {/* BREADCRUMB */}
      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav className="text-on-surface-variant font-body flex text-sm">
          <ol className="flex items-center space-x-2">
            <li>
              <Link className="transition-colors hover:text-[#143067]" href="/">
                Inicio
              </Link>
            </li>
            <li>
              <span className="material-symbols-outlined mx-1 text-sm">
                chevron_right
              </span>
            </li>
            <li className="font-medium text-[#143067]">Empresas y Talleres</li>
          </ol>
        </nav>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-[#1a2a4a] py-24 text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            width={800}
            height={800}
            alt="Taller"
            className="h-full w-full object-cover opacity-20"
            data-alt="tailors working in a modern, well-lit professional garment manufacturing workshop, precise stitching, focused environment, warm professional lighting"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBDd4_z8Bg5WoGSYZEISmoRexfuh_jMC7TDY2kr3Xka3lakrw3MSgeSXI0gOZZfG27yG__k7AZafSv9PnEdk-XhiyxSyAR8WM9SbprG__Zzb08-Sp7mvq0XvFuU-uJJZjHAh9TdIEZi8bixDT8l1wzD2SXUMlq8Y20NzkfzAMOlas-eCWYpXrT9X99gp4T_AjNNG0WhcrSOa0ftZfM6yAQJtS5PCz44pRz6qy3AZZvsGnVT4KrHqOdSsOfVtEMWNls1eYMGrfCq0zc"
          />
        </div>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <h1 className="font-headline mb-6 text-4xl leading-tight font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Uniformes Corporativos y Laborales
          </h1>
          <p className="font-body mb-10 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
            Imagen profesional para tu empresa. Confeccionados a medida en San
            Miguel con la más alta precisión y calidad de tela.
          </p>
          <div className="flex w-full flex-col justify-center gap-4 sm:w-auto sm:flex-row">
            <button className="rounded bg-white px-8 py-3 font-semibold text-[#143067] shadow-sm transition-colors hover:bg-gray-100">
              Ver catálogo
            </button>
            <button className="rounded border border-white bg-transparent px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-[#143067]">
              Solicitar cotización
            </button>
          </div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="mx-auto max-w-7xl space-y-24 px-6 py-16">
        {/* CATEGORIES (Layered surface) */}
        <section className="bg-surface-container-low relative z-20 -mt-8 rounded-xl p-8 shadow-sm">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {/* Category 1 */}
            <Link
              className="group hover:bg-surface-bright flex flex-col items-center rounded-lg border border-transparent bg-white p-6 text-center shadow-sm transition-colors hover:border-[#143067]"
              href="/catalogo/corporativo"
            >
              <span
                className="material-symbols-outlined mb-4 text-4xl text-[#143067] transition-transform group-hover:scale-110"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                apparel
              </span>
              <span className="text-on-surface text-sm font-semibold">
                Camisas con Logo
              </span>
            </Link>
            {/* Category 2 */}
            <Link
              className="group hover:bg-surface-bright flex flex-col items-center rounded-lg border border-transparent bg-white p-6 text-center shadow-sm transition-colors hover:border-[#143067]"
              href="/catalogo/corporativo"
            >
              <span className="material-symbols-outlined mb-4 text-4xl text-[#143067] transition-transform group-hover:scale-110">
                restaurant
              </span>
              <span className="text-on-surface text-sm font-semibold">
                Mandiles y Delantales
              </span>
            </Link>
            {/* Category 3 */}
            <Link
              className="group hover:bg-surface-bright flex flex-col items-center rounded-lg border border-transparent bg-white p-6 text-center shadow-sm transition-colors hover:border-[#143067]"
              href="/catalogo/corporativo"
            >
              <span
                className="material-symbols-outlined mb-4 text-4xl text-[#143067] transition-transform group-hover:scale-110"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                construction
              </span>
              <span className="text-on-surface text-sm font-semibold">
                Uniformes de Taller
              </span>
            </Link>
            {/* Category 4 */}
            <Link
              className="group hover:bg-surface-bright flex flex-col items-center rounded-lg border border-transparent bg-white p-6 text-center shadow-sm transition-colors hover:border-[#143067]"
              href="/catalogo/corporativo"
            >
              <span className="material-symbols-outlined mb-4 text-4xl text-[#143067] transition-transform group-hover:scale-110">
                work
              </span>
              <span className="text-on-surface text-sm font-semibold">
                Ropa de Trabajo
              </span>
            </Link>
            {/* Category 5 */}
            <Link
              className="group hover:bg-surface-bright flex flex-col items-center rounded-lg border border-transparent bg-white p-6 text-center shadow-sm transition-colors hover:border-[#143067]"
              href="/catalogo/corporativo"
            >
              <span className="material-symbols-outlined mb-4 text-4xl text-[#143067] transition-transform group-hover:scale-110">
                local_shipping
              </span>
              <span className="text-on-surface text-sm font-semibold">
                Personalización Corporativa
              </span>
            </Link>
          </div>
        </section>

        {/* ASYMMETRICAL LAYOUT: VOLUME PRICING & FILTERS */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* VOLUME PRICING CARD */}
          <div className="rounded-lg border-l-4 border-[#143067] bg-white p-8 shadow-sm lg:col-span-1">
            <h3 className="mb-6 flex items-center gap-2 text-lg font-bold text-[#143067]">
              <span className="material-symbols-outlined">payments</span>
              Precios por volumen
            </h3>
            <div className="outline-outline-variant/15 mb-8 overflow-x-auto rounded outline outline-1">
              <table className="font-body w-full text-left text-sm">
                <thead className="bg-surface-container-low font-semibold text-[#143067]">
                  <tr>
                    <th className="border-surface-variant border-b px-4 py-3">
                      Cantidad
                    </th>
                    <th className="border-surface-variant border-b px-4 py-3">
                      Descuento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-surface-variant border-b">
                    <td className="px-4 py-3">1 - 9 uds</td>
                    <td className="text-on-surface-variant px-4 py-3">
                      Normal
                    </td>
                  </tr>
                  <tr className="bg-surface-container-low border-surface-variant border-b">
                    <td className="px-4 py-3 font-medium">10 - 24 uds</td>
                    <td className="text-secondary px-4 py-3 font-bold">
                      10% OFF
                    </td>
                  </tr>
                  <tr className="border-surface-variant border-b">
                    <td className="px-4 py-3 font-medium">25 - 49 uds</td>
                    <td className="text-secondary px-4 py-3 font-bold">
                      18% OFF
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#143067]">
                      50+ uds
                    </td>
                    <td className="px-4 py-3 font-bold text-[#143067]">
                      Cotizar
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button className="flex w-full items-center justify-center gap-2 rounded border border-[#143067] px-4 py-3 font-semibold text-[#143067] transition-colors hover:bg-[#143067] hover:text-white">
              <span className="material-symbols-outlined text-sm">
                calculate
              </span>
              Calcular mi pedido
            </button>
          </div>

          {/* MAIN PRODUCT AREA */}
          <div className="space-y-8 lg:col-span-3">
            {/* FILTERS BAR */}
            <div className="outline-outline-variant/15 flex flex-wrap items-center justify-between gap-4 rounded-lg bg-white p-4 shadow-sm outline outline-1">
              <div className="relative min-w-[200px] flex-1">
                <span className="material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2">
                  search
                </span>
                <input
                  className="bg-surface w-full rounded border-none py-2 pr-4 pl-10 text-sm focus:ring-1 focus:ring-[#143067]"
                  placeholder="Buscar en Empresas y Talleres..."
                  type="text"
                />
              </div>
              <div className="flex gap-4">
                <select className="bg-surface rounded border-none py-2 pr-8 pl-4 text-sm focus:ring-1 focus:ring-[#143067]">
                  <option>Tipo de Prenda</option>
                  <option>Camisas</option>
                  <option>Pantalones</option>
                  <option>Chaquetas</option>
                </select>
                <select className="bg-surface rounded border-none py-2 pr-8 pl-4 text-sm focus:ring-1 focus:ring-[#143067]">
                  <option>Disponibilidad</option>
                  <option>En stock</option>
                  <option>Bajo pedido</option>
                </select>
                <select className="bg-surface rounded border-none py-2 pr-8 pl-4 text-sm font-medium text-[#143067] focus:ring-1 focus:ring-[#143067]">
                  <option>Ordenar por: Destacados</option>
                  <option>Precio: Menor a Mayor</option>
                </select>
              </div>
            </div>

            {/* PRODUCT GRID 4 COLS */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {/* Product 1 */}
              <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition-all hover:border-[#143067] hover:shadow-[0_10px_30px_rgba(20,48,103,0.06)]">
                <div className="bg-surface-container-low relative aspect-[4/3] overflow-hidden">
                  <Image
                    width={800}
                    height={800}
                    alt="Camisa Corporativa"
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    data-alt="crisp white professional uniform shirt on a clean light grey background, high quality fabric texture visible, studio lighting"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmE5GZ1jfFEW7JOHPVbveJFZNsMmOdDmpIsnk-KyVvtYNl8oJWu5vOX39UeUerClbIkJ9tz3Gyh5MyCzmTbhGEQalN1KY4AKPnFIeq0imijPFeASzPWG2M9aBE9n3OyAq5qeA__spH6f1zH0M9MD9NY9A1BHT5bAu5QzsI8mhg3cGpHpmgYUT2OWKkIuPinkvruEyIZ9vYi7eXl4EnrWOLO00u0g0Nq95BL3NVczJWY-s_y5Yne_XS5ahBQnamg9uOZH53IIQR4aw"
                  />
                  <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      favorite
                    </span>
                  </button>
                  <div className="absolute top-3 left-3 rounded bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-800">
                    Logo bordado disponible
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-1 text-xs font-semibold tracking-widest text-[#143067] uppercase">
                    Corporativo
                  </span>
                  <h4 className="text-on-surface font-headline mb-2 text-lg font-bold">
                    Camisa Oxford Manga Larga
                  </h4>
                  <p className="text-on-surface-variant font-body mb-4 line-clamp-2 text-sm">
                    Ideal para equipos administrativos. Tela resistente a
                    arrugas.
                  </p>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-on-surface-variant text-sm">
                        desde
                      </div>
                      <div className="text-xl font-bold text-[#143067]">
                        $18.50
                        <span className="text-on-surface-variant text-sm font-normal">
                          /unidad
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center justify-center rounded bg-[#143067] p-2 text-white transition-colors hover:bg-blue-900">
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 2 */}
              <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition-all hover:border-[#143067] hover:shadow-[0_10px_30px_rgba(20,48,103,0.06)]">
                <div className="bg-surface-container-low relative aspect-[4/3] overflow-hidden">
                  <Image
                    width={800}
                    height={800}
                    alt="Pantalón Industrial"
                    className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                    data-alt="heavy duty grey cargo work pants, folded neatly on a clean white surface, durable fabric, industrial workwear styling"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6U1nkjsr9xGW-7NRGwuPMeMXTu8sg-ZanJZLUS-Ln5zBiyc5oSBE8LEv-IOgPc_ob_kh5HhdoOYsMQHBwPcL8UKQ08eISsDPV5F1e3Rq8yXEjMcPm1cwG_JRGf_Zz42tGhDL4mB8FsY8DRoOCzp9OGrb3wOz6DDu3G3HT-xboa-J0hCtNrKShf-RRW6pD2BX40dyed2NsL3lJEo97CHX3dtkt0lzGpnali3tKki_HiJaaellFYZeMdbdCoZVVlp7dwy6yJVdvAYQ"
                  />
                  <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-1 text-xs font-semibold tracking-widest text-[#143067] uppercase">
                    Industrial
                  </span>
                  <h4 className="text-on-surface font-headline mb-2 text-lg font-bold">
                    Pantalón Cargo Reforzado
                  </h4>
                  <p className="text-on-surface-variant font-body mb-4 line-clamp-2 text-sm">
                    Costuras triples y bolsillos utilitarios. Alta durabilidad.
                  </p>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-on-surface-variant text-sm">
                        desde
                      </div>
                      <div className="text-xl font-bold text-[#143067]">
                        $24.00
                        <span className="text-on-surface-variant text-sm font-normal">
                          /unidad
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center justify-center rounded bg-[#143067] p-2 text-white transition-colors hover:bg-blue-900">
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 3 Placeholder */}
              <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition-all hover:border-[#143067] hover:shadow-[0_10px_30px_rgba(20,48,103,0.06)]">
                <div className="bg-surface-container-low relative aspect-[4/3] overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                    Imagen 3
                  </div>
                  <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-1 text-xs font-semibold tracking-widest text-[#143067] uppercase">
                    Taller
                  </span>
                  <h4 className="text-on-surface font-headline mb-2 text-lg font-bold">
                    Overol de Trabajo
                  </h4>
                  <p className="text-on-surface-variant font-body mb-4 line-clamp-2 text-sm">
                    Protección completa para talleres mecánicos.
                  </p>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-on-surface-variant text-sm">
                        desde
                      </div>
                      <div className="text-xl font-bold text-[#143067]">
                        $35.00
                        <span className="text-on-surface-variant text-sm font-normal">
                          /unidad
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center justify-center rounded bg-[#143067] p-2 text-white transition-colors hover:bg-blue-900">
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Product 4 Placeholder */}
              <div className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-transparent bg-white shadow-sm transition-all hover:border-[#143067] hover:shadow-[0_10px_30px_rgba(20,48,103,0.06)]">
                <div className="bg-surface-container-low relative aspect-[4/3] overflow-hidden">
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                    Imagen 4
                  </div>
                  <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 rounded-full bg-white p-2 shadow-sm transition-colors">
                    <span className="material-symbols-outlined text-sm">
                      favorite
                    </span>
                  </button>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <span className="mb-1 text-xs font-semibold tracking-widest text-[#143067] uppercase">
                    Restaurante
                  </span>
                  <h4 className="text-on-surface font-headline mb-2 text-lg font-bold">
                    Filipina Chef Clásica
                  </h4>
                  <p className="text-on-surface-variant font-body mb-4 line-clamp-2 text-sm">
                    Algodón transpirable y resistente al calor.
                  </p>
                  <div className="mt-auto flex items-end justify-between">
                    <div>
                      <div className="text-on-surface-variant text-sm">
                        desde
                      </div>
                      <div className="text-xl font-bold text-[#143067]">
                        $28.00
                        <span className="text-on-surface-variant text-sm font-normal">
                          /unidad
                        </span>
                      </div>
                    </div>
                    <button className="flex items-center justify-center rounded bg-[#143067] p-2 text-white transition-colors hover:bg-blue-900">
                      <span className="material-symbols-outlined">
                        add_shopping_cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center space-x-2">
              <button className="border-surface-variant text-on-surface hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border">
                <span className="material-symbols-outlined text-sm">
                  chevron_left
                </span>
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded bg-[#143067] font-medium text-white">
                1
              </button>
              <button className="border-surface-variant text-on-surface hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border font-medium">
                2
              </button>
              <button className="border-surface-variant text-on-surface hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border">
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* CORPORATE ORDER PROCESS */}
        <section className="border-outline-variant/15 mt-16 rounded-xl border bg-white p-10 shadow-sm">
          <div className="mb-10 text-center">
            <h2 className="font-headline mb-4 text-3xl font-bold tracking-tight text-[#143067]">
              Proceso de Pedido Corporativo
            </h2>
            <p className="text-on-surface-variant mx-auto max-w-2xl">
              Nuestro taller en San Miguel garantiza un proceso transparente y
              eficiente desde la idea hasta la entrega.
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-6 md:grid-cols-5">
            {/* Connecting line (desktop) */}
            <div className="bg-surface-variant absolute top-6 right-10 left-10 z-0 hidden h-0.5 md:block"></div>
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#143067] text-lg font-bold text-white shadow-sm">
                1
              </div>
              <h4 className="text-on-surface mb-2 font-bold">
                Consulta inicial
              </h4>
              <p className="text-on-surface-variant text-sm">
                Evaluación de necesidades
              </p>
            </div>
            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#143067] text-lg font-bold text-white shadow-sm">
                2
              </div>
              <h4 className="text-on-surface mb-2 font-bold">
                Muestra de diseño
              </h4>
              <p className="text-on-surface-variant text-sm">
                Digital y prototipo físico
              </p>
            </div>
            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#143067] text-lg font-bold text-white shadow-sm">
                3
              </div>
              <h4 className="text-on-surface mb-2 font-bold">Aprobación</h4>
              <p className="text-on-surface-variant text-sm">
                Ajustes finales y tallas
              </p>
            </div>
            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#143067] text-lg font-bold text-white shadow-sm">
                4
              </div>
              <h4 className="text-on-surface mb-2 font-bold">Producción</h4>
              <p className="text-on-surface-variant text-sm">
                Corte, confección y bordado
              </p>
            </div>
            {/* Step 5 */}
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-[#143067] text-lg font-bold text-white shadow-sm">
                5
              </div>
              <h4 className="text-on-surface mb-2 font-bold">Entrega</h4>
              <p className="text-on-surface-variant text-sm">
                Control de calidad final
              </p>
            </div>
          </div>
        </section>

        {/* COMPANY STRIP */}
        <section className="mt-20 text-center">
          <h3 className="font-headline mb-8 text-xl font-bold text-[#143067]">
            Empresas que confían en nosotros
          </h3>
          <div className="flex flex-wrap justify-center gap-8 opacity-60">
            <div className="bg-surface-variant text-on-surface-variant flex h-12 w-32 items-center justify-center rounded text-sm font-medium">
              Logo Placeholder
            </div>
            <div className="bg-surface-variant text-on-surface-variant flex h-12 w-32 items-center justify-center rounded text-sm font-medium">
              Logo Placeholder
            </div>
            <div className="bg-surface-variant text-on-surface-variant flex h-12 w-32 items-center justify-center rounded text-sm font-medium">
              Logo Placeholder
            </div>
            <div className="bg-surface-variant text-on-surface-variant flex h-12 w-32 items-center justify-center rounded text-sm font-medium">
              Logo Placeholder
            </div>
          </div>
        </section>
      </div>

      {/* TONAL SHIFT: QUOTE SECTION */}
      <div className="bg-surface-container-low border-outline-variant/10 border-t py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-16 px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-headline mb-6 text-3xl font-bold tracking-tight text-[#143067]">
              Solicita tu cotización corporativa
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              Si necesitas vestir a todo tu equipo, completa el formulario.
              Nuestro equipo en San Miguel se pondrá en contacto contigo en
              menos de 24 horas laborables con una propuesta a medida.
            </p>
            <div className="border-outline-variant/15 mb-8 rounded-lg border bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start gap-4">
                <span className="material-symbols-outlined mt-1 text-[#143067]">
                  support_agent
                </span>
                <div>
                  <h4 className="text-on-surface font-bold">
                    Atención Especializada
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    Te asignamos un ejecutivo de cuenta para tu proyecto.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined mt-1 text-[#143067]">
                  local_shipping
                </span>
                <div>
                  <h4 className="text-on-surface font-bold">
                    Logística Nacional
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    Envíos consolidados a diferentes sucursales si es necesario.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CORPORATE QUOTE FORM */}
          <div className="relative overflow-hidden rounded-xl bg-white p-8 shadow-[0_10px_30px_rgba(20,48,103,0.06)]">
            {/* Hem styling top line */}
            <div className="absolute top-0 left-0 h-1 w-full bg-[#143067]"></div>
            <form className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="text-on-surface mb-2 block text-xs font-semibold tracking-wider uppercase"
                    htmlFor="empresa"
                  >
                    Empresa
                  </label>
                  <input
                    id="empresa"
                    className="bg-surface border-outline-variant/50 w-full rounded border p-3 text-sm focus:border-[#143067] focus:ring-1 focus:ring-[#143067]"
                    placeholder="Nombre de la empresa"
                    type="text"
                  />
                </div>
                <div>
                  <label
                    className="text-on-surface mb-2 block text-xs font-semibold tracking-wider uppercase"
                    htmlFor="contacto"
                  >
                    Persona de contacto
                  </label>
                  <input
                    id="contacto"
                    className="bg-surface border-outline-variant/50 w-full rounded border p-3 text-sm focus:border-[#143067] focus:ring-1 focus:ring-[#143067]"
                    placeholder="Tu nombre"
                    type="text"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="text-on-surface mb-2 block text-xs font-semibold tracking-wider uppercase"
                    htmlFor="telefono"
                  >
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    className="bg-surface border-outline-variant/50 w-full rounded border p-3 text-sm focus:border-[#143067] focus:ring-1 focus:ring-[#143067]"
                    placeholder="Tu teléfono"
                    type="tel"
                  />
                </div>
                <div>
                  <label
                    className="text-on-surface mb-2 block text-xs font-semibold tracking-wider uppercase"
                    htmlFor="correo"
                  >
                    Correo
                  </label>
                  <input
                    id="correo"
                    className="bg-surface border-outline-variant/50 w-full rounded border p-3 text-sm focus:border-[#143067] focus:ring-1 focus:ring-[#143067]"
                    placeholder="tu@empresa.com"
                    type="email"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    className="text-on-surface mb-2 block text-xs font-semibold tracking-wider uppercase"
                    htmlFor="producto"
                  >
                    Tipo de producto
                  </label>
                  <select
                    id="producto"
                    className="bg-surface border-outline-variant/50 w-full rounded border p-3 text-sm focus:border-[#143067] focus:ring-1 focus:ring-[#143067]"
                  >
                    <option>Selecciona una opción</option>
                    <option>Camisas Corporativas</option>
                    <option>Uniformes Industriales</option>
                    <option>Mandiles / Restaurante</option>
                    <option>Varios</option>
                  </select>
                </div>
                <div>
                  <label
                    className="text-on-surface mb-2 block text-xs font-semibold tracking-wider uppercase"
                    htmlFor="cantidad"
                  >
                    Cantidad estimada
                  </label>
                  <input
                    id="cantidad"
                    className="bg-surface border-outline-variant/50 w-full rounded border p-3 text-sm focus:border-[#143067] focus:ring-1 focus:ring-[#143067]"
                    placeholder="Ej: 50"
                    type="number"
                  />
                </div>
              </div>
              <div>
                <label
                  className="text-on-surface mb-2 block text-xs font-semibold tracking-wider uppercase"
                  htmlFor="requisitos"
                >
                  Requisitos adicionales
                </label>
                <textarea
                  id="requisitos"
                  className="bg-surface border-outline-variant/50 w-full rounded border p-3 text-sm focus:border-[#143067] focus:ring-1 focus:ring-[#143067]"
                  placeholder="Cuéntanos más sobre colores, necesidad de bordados, fechas límite..."
                  rows={4}
                ></textarea>
              </div>
              <button
                className="flex w-full items-center justify-center gap-2 rounded bg-[#143067] px-6 py-4 font-bold text-white shadow-sm transition-colors hover:bg-blue-900"
                type="submit"
              >
                Enviar solicitud
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
