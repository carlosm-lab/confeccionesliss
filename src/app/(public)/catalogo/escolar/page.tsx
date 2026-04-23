import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Catálogo Escolar | Confecciones Liss",
  description:
    "Uniformes escolares, camisas, faldas, pantalones y de educación física de alta calidad.",
};

export default function CatalogoEscolarPage() {
  return (
    <main className="w-full">
      {/* Category Hero Header */}
      <section className="border-outline-variant/15 border-b bg-slate-50 px-6 py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-[#143067]">
            <span className="material-symbols-outlined text-3xl">school</span>
          </div>
          <h1 className="font-headline mb-4 text-4xl font-bold tracking-tight text-[#143067] md:text-5xl">
            Catálogo Escolar
          </h1>
          <p className="text-on-surface-variant font-body max-w-2xl text-lg">
            Uniformes resistentes, cómodos y diseñados para el día a día
            estudiantil. Calidad comprobada para soportar todo el año escolar.
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-12 lg:flex-row">
        {/* SIDEBAR FILTERS (Left Column) */}
        <aside className="w-full space-y-8 lg:w-1/4">
          <div>
            <h3 className="text-on-surface font-headline border-outline-variant/15 mb-4 border-b pb-2 text-lg font-bold">
              Categorías
            </h3>
            <ul className="font-body space-y-3 text-sm">
              <li>
                <Link
                  className="text-on-surface-variant group flex items-center justify-between transition-colors hover:text-[#143067]"
                  href="/catalogo/escolar"
                >
                  <span className="group-hover:font-medium">
                    Camisas y Blusas
                  </span>
                  <span className="bg-surface-container-low text-on-surface-variant rounded px-2 py-0.5 text-xs">
                    12
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="flex items-center justify-between font-semibold text-[#143067] transition-colors"
                  href="/catalogo/escolar"
                >
                  <span>Pantalones y Faldas</span>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-[#143067]">
                    8
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-on-surface-variant group flex items-center justify-between transition-colors hover:text-[#143067]"
                  href="/catalogo/escolar"
                >
                  <span className="group-hover:font-medium">
                    Educación Física (Buzo)
                  </span>
                  <span className="bg-surface-container-low text-on-surface-variant rounded px-2 py-0.5 text-xs">
                    15
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-on-surface-variant group flex items-center justify-between transition-colors hover:text-[#143067]"
                  href="/catalogo/escolar"
                >
                  <span className="group-hover:font-medium">
                    Suéteres y Chaquetas
                  </span>
                  <span className="bg-surface-container-low text-on-surface-variant rounded px-2 py-0.5 text-xs">
                    5
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  className="text-on-surface-variant group flex items-center justify-between transition-colors hover:text-[#143067]"
                  href="/catalogo/escolar"
                >
                  <span className="group-hover:font-medium">
                    Camisetas Polo
                  </span>
                  <span className="bg-surface-container-low text-on-surface-variant rounded px-2 py-0.5 text-xs">
                    9
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-on-surface font-headline border-outline-variant/15 mb-4 border-b pb-2 text-lg font-bold">
              Tallas
            </h3>
            <div className="font-body grid grid-cols-4 gap-2 text-sm">
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                4
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                6
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                8
              </button>
              <button className="rounded border border-[#143067] bg-blue-50 py-2 text-center font-semibold text-[#143067] transition-colors">
                10
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                12
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                14
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                16
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                S
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                M
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                L
              </button>
              <button className="border-outline-variant/30 rounded border py-2 text-center transition-colors hover:border-[#143067] hover:text-[#143067]">
                XL
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-on-surface font-headline border-outline-variant/15 mb-4 border-b pb-2 text-lg font-bold">
              Colores Institucionales
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                className="border-outline-variant/30 h-8 w-8 rounded-full border-2 bg-white shadow-sm focus:ring-2 focus:ring-[#143067] focus:ring-offset-1"
                title="Blanco"
              ></button>
              <button
                className="border-outline-variant/30 h-8 w-8 rounded-full border-2 bg-[#143067] shadow-sm ring-2 ring-[#143067] ring-offset-1 focus:ring-2 focus:ring-[#143067] focus:ring-offset-1"
                title="Azul Marino"
              ></button>
              <button
                className="border-outline-variant/30 h-8 w-8 rounded-full border-2 bg-[#b02d22] shadow-sm focus:ring-2 focus:ring-[#143067] focus:ring-offset-1"
                title="Rojo Tinto"
              ></button>
              <button
                className="border-outline-variant/30 h-8 w-8 rounded-full border-2 bg-[#1e4620] shadow-sm focus:ring-2 focus:ring-[#143067] focus:ring-offset-1"
                title="Verde Oscuro"
              ></button>
              <button
                className="border-outline-variant/30 h-8 w-8 rounded-full border-2 bg-gray-300 shadow-sm focus:ring-2 focus:ring-[#143067] focus:ring-offset-1"
                title="Gris"
              ></button>
              <button
                className="border-outline-variant/30 h-8 w-8 rounded-full border-2 bg-yellow-400 shadow-sm focus:ring-2 focus:ring-[#143067] focus:ring-offset-1"
                title="Amarillo"
              ></button>
              <button
                className="border-outline-variant/30 h-8 w-8 rounded-full border-2 bg-blue-400 shadow-sm focus:ring-2 focus:ring-[#143067] focus:ring-offset-1"
                title="Celeste"
              ></button>
            </div>
          </div>

          {/* Promo/Info Banner Widget */}
          <div className="rounded-lg bg-[#143067] p-6 text-white shadow-sm">
            <span className="material-symbols-outlined text-secondary-fixed mb-3 text-3xl">
              diversity_3
            </span>
            <h4 className="font-headline mb-2 text-lg font-bold">
              Uniformes para tu Colegio
            </h4>
            <p className="font-body mb-4 text-sm text-blue-100">
              Fabricamos bajo la norma o diseño exclusivo de tu centro
              educativo.
            </p>
            <button className="hover:bg-surface-bright w-full rounded bg-white px-4 py-2 text-sm font-semibold text-[#143067] transition-colors">
              Cotizar por Mayor
            </button>
          </div>
        </aside>

        {/* MAIN PRODUCT GRID (Right Column) */}
        <section className="w-full lg:w-3/4">
          {/* Top Bar for Grid */}
          <div className="border-outline-variant/15 mb-6 flex flex-wrap items-center justify-between gap-4 rounded-lg border bg-white p-4 shadow-sm">
            <div className="text-on-surface-variant font-body text-sm">
              Mostrando <span className="text-on-surface font-bold">1 - 8</span>{" "}
              de <span className="text-on-surface font-bold">49</span> productos
            </div>
            <div className="flex items-center gap-2">
              <label
                className="text-on-surface-variant font-body text-sm"
                htmlFor="ordenar"
              >
                Ordenar por:
              </label>
              <select
                id="ordenar"
                className="bg-surface rounded border-none py-2 pr-8 pl-3 text-sm font-medium focus:ring-1 focus:ring-[#143067]"
              >
                <option>Recomendados</option>
                <option>Precio: Mayor a Menor</option>
                <option>Precio: Menor a Mayor</option>
                <option>Más recientes</option>
              </select>
            </div>
          </div>

          {/* Grid Layout 3 Cols */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Product Card 1 */}
            <div className="group border-outline-variant/10 flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-surface-container-low relative aspect-[3/4] overflow-hidden">
                <Image
                  width={800}
                  height={800}
                  alt="Camisa Escolar Blanca Manga Corta"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  data-alt="crisp white short-sleeve school uniform shirt, front view, button-down with a pointed collar, folded completely flat on a light background, studio lighting"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMsZ4gR8V-D9pX8L3D_X9tB2MndC-y6B-D-1j6w-w1X_V5S_6ZfT8Kx5v31x-3w-1_0l_94f41xWf302M-_c85Hl0w01oIqBkVn2tWqjYp3_Y1N86cK5s0pD_Zf10y9Aky1eQ4n_Y0bKyF62q07_4N-vNvy908_gH7qBvG8Y0vKyvR_mZzy8q1N97O28G8_a8300L_q4YQ0_2Jc_G5lGk69q_XN82YJ_w7T3_k"
                />
                <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-xs font-semibold text-slate-500">
                  Camisas y Blusas
                </span>
                <h4 className="text-on-surface font-headline mb-2 line-clamp-2 text-base font-bold">
                  Camisa Escolar Blanca Manga Corta
                </h4>
                <div className="mb-3 flex gap-1">
                  <div className="h-4 w-4 rounded-full border border-gray-300 bg-white"></div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-lg font-bold text-[#143067]">$12.50</div>
                  <button
                    className="bg-surface-container-low rounded p-2 text-[#143067] transition-colors hover:bg-[#143067] hover:text-white"
                    title="Agregar al carrito"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="group border-outline-variant/10 flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-surface-container-low relative aspect-[3/4] overflow-hidden">
                <Image
                  width={800}
                  height={800}
                  alt="Pantalón Escolar Sincatex Azul Marino"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  data-alt="navy blue school uniform pants, straight leg tailored fit, front view lying flat on a minimalist background, wrinkle-resistant fabric texture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3M9IEY4m1Yh89k7D-eM5971yBvZy_892b1G9d0Nqy5v3E6k_4lY3fN3Q2E8Q1_X3Y0mR9n8L1s5pQ4Z6c0o8z7w9T0t_T2Y4n1v9W9N9w2K_1I2rO8f9D5Y9K_0c4Y1t4m5D-7X8a4K9H0y0C5G7C6B719E_3x0sT6R2o5F2xG3_H_w4E3R9p_mXy9N9_3v_vG0E_3g7M5P_E9V8R9X2B0Z9r3pZ_7"
                />
                <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm transition-colors">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </button>
                <div className="absolute top-3 left-3 rounded bg-[#143067] px-2 py-1 text-[10px] font-bold text-white">
                  MÁS VENDIDO
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-xs font-semibold text-slate-500">
                  Pantalones y Faldas
                </span>
                <h4 className="text-on-surface font-headline mb-2 line-clamp-2 text-base font-bold">
                  Pantalón Escolar Sincatex Azul Marino
                </h4>
                <div className="mb-3 flex gap-1">
                  <div className="h-4 w-4 rounded-full border border-gray-300 bg-[#143067]"></div>
                  <div className="h-4 w-4 rounded-full border border-gray-300 bg-gray-300"></div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div>
                    <div className="text-on-surface-variant text-xs line-through opacity-70">
                      $18.00
                    </div>
                    <div className="text-secondary text-lg font-bold">
                      $15.50
                    </div>
                  </div>
                  <button
                    className="bg-surface-container-low rounded p-2 text-[#143067] transition-colors hover:bg-[#143067] hover:text-white"
                    title="Agregar al carrito"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="group border-outline-variant/10 flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-surface-container-low relative aspect-[3/4] overflow-hidden">
                <Image
                  width={800}
                  height={800}
                  alt="Camiseta Polo Escolar Piqué"
                  className="h-full w-full object-cover mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                  data-alt="white short-sleeve polo shirt for school uniform, featuring a blue and red striped collar, laid flat, high quality pique cotton texture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDU9_f8fN_o8D9r5F6O9M2T2F5H8K5e9M1K9q9G2xP0bX1aY0_aE1P8kM6s1W-8v9nF_z38A4k0G5l49T5E1F7r1c4B6l9p_L-r1h4_9U_U1E6R-y5D2V9G7Q8p_W1u3n3k7T5z5J_2O1K6K0z_pH0R3E2h0S9R9i_q7b3X7s6oZ9w9F1A4K_r6F4A_A8j6G6n9q7_u1L5f6_V7r1f9A4x0T4H8n2f9V_6E1h_A_V"
                />
                <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-xs font-semibold text-slate-500">
                  Camisetas Polo
                </span>
                <h4 className="text-on-surface font-headline mb-2 line-clamp-2 text-base font-bold">
                  Camiseta Polo Blanca con Ribete Deportivo
                </h4>
                <div className="mb-3 flex gap-1">
                  <div className="block h-4 w-4 rounded-full border border-gray-300 bg-white"></div>
                  <div className="block h-4 w-4 rounded-full border border-gray-300 bg-yellow-400"></div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-lg font-bold text-[#143067]">$11.00</div>
                  <button
                    className="bg-surface-container-low rounded p-2 text-[#143067] transition-colors hover:bg-[#143067] hover:text-white"
                    title="Agregar al carrito"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 4 Placeholder */}
            <div className="group border-outline-variant/10 flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-surface-container-low relative aspect-[3/4] overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                  Imagen Producto
                </div>
                <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-xs font-semibold text-slate-500">
                  Faldas
                </span>
                <h4 className="text-on-surface font-headline mb-2 line-clamp-2 text-base font-bold">
                  Falda Escolar Plisada Tradicional
                </h4>
                <div className="mb-3 flex gap-1">
                  <div className="block h-4 w-4 rounded-full border border-gray-300 bg-[#143067]"></div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-lg font-bold text-[#143067]">$14.50</div>
                  <button
                    className="bg-surface-container-low rounded p-2 text-[#143067] transition-colors hover:bg-[#143067] hover:text-white"
                    title="Agregar al carrito"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 5 Placeholder */}
            <div className="group border-outline-variant/10 flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-surface-container-low relative aspect-[3/4] overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                  Imagen Producto
                </div>
                <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-xs font-semibold text-slate-500">
                  Educación Física
                </span>
                <h4 className="text-on-surface font-headline mb-2 line-clamp-2 text-base font-bold">
                  Pantalón Deportivo Buzo Azul/Blanco
                </h4>
                <div className="mb-3 flex gap-1">
                  <div className="block h-4 w-4 rounded-full border border-gray-300 bg-[#143067]"></div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-lg font-bold text-[#143067]">$16.00</div>
                  <button
                    className="bg-surface-container-low rounded p-2 text-[#143067] transition-colors hover:bg-[#143067] hover:text-white"
                    title="Agregar al carrito"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 6 Placeholder */}
            <div className="group border-outline-variant/10 flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="bg-surface-container-low relative aspect-[3/4] overflow-hidden">
                <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-400">
                  Imagen Producto
                </div>
                <button className="text-on-surface-variant hover:text-secondary absolute top-3 right-3 z-10 rounded-full bg-white p-2 shadow-sm transition-colors">
                  <span className="material-symbols-outlined text-sm">
                    favorite
                  </span>
                </button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="mb-1 text-xs font-semibold text-slate-500">
                  Suéteres
                </span>
                <h4 className="text-on-surface font-headline mb-2 line-clamp-2 text-base font-bold">
                  Suéter Escolar Cuello V Acrílico
                </h4>
                <div className="mb-3 flex gap-1">
                  <div className="block h-4 w-4 rounded-full border border-gray-300 bg-[#143067]"></div>
                  <div className="block h-4 w-4 rounded-full border border-gray-300 bg-[#b02d22]"></div>
                </div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-lg font-bold text-[#143067]">$19.50</div>
                  <button
                    className="bg-surface-container-low rounded p-2 text-[#143067] transition-colors hover:bg-[#143067] hover:text-white"
                    title="Agregar al carrito"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      shopping_cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center space-x-2">
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
            <button className="border-surface-variant text-on-surface hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border font-medium">
              3
            </button>
            <span className="text-on-surface-variant flex h-10 w-10 items-center justify-center">
              ...
            </span>
            <button className="border-surface-variant text-on-surface hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border font-medium">
              8
            </button>
            <button className="border-surface-variant text-on-surface hover:bg-surface-container-low flex h-10 w-10 items-center justify-center rounded border">
              <span className="material-symbols-outlined text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </section>
      </div>

      {/* Feature Strip */}
      <section className="bg-surface-container-low border-outline-variant/15 mt-10 border-y py-10">
        <div className="divide-outline-variant/20 mx-auto grid max-w-7xl grid-cols-1 gap-8 divide-y px-6 text-center md:grid-cols-3 md:divide-x md:divide-y-0">
          <div className="p-4">
            <span className="material-symbols-outlined mb-3 text-4xl text-[#143067]">
              inventory_2
            </span>
            <h4 className="text-on-surface font-headline mb-2 font-bold">
              Stock todo el año
            </h4>
            <p className="font-body text-on-surface-variant text-sm">
              Mantemos inventario constante de tallas regulares para
              reposiciones inmediatas.
            </p>
          </div>
          <div className="p-4 pt-8 md:pt-4">
            <span className="material-symbols-outlined mb-3 text-4xl text-[#143067]">
              check_circle
            </span>
            <h4 className="text-on-surface font-headline mb-2 font-bold">
              Telar Garantizado
            </h4>
            <p className="font-body text-on-surface-variant text-sm">
              Telas Sincatex de alta durabilidad que no destiñen ni se encogen
              con lavadas.
            </p>
          </div>
          <div className="p-4 pt-8 md:pt-4">
            <span className="material-symbols-outlined mb-3 text-4xl text-[#143067]">
              straighten
            </span>
            <h4 className="text-on-surface font-headline mb-2 font-bold">
              Tallaje Estándar SV
            </h4>
            <p className="font-body text-on-surface-variant text-sm">
              Molduras adaptadas al estudiante salvadoreño para un ajuste cómodo
              y presentable.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
