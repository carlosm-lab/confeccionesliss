import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Catálogo Sector Salud | Confecciones Liss",
  description:
    "Scrubs médicos y uniformes para profesionales de la salud. Alta calidad y confort.",
};

export default function CatalogoMedicoPage() {
  return (
    <main className="mx-auto w-full max-w-screen-2xl px-4 py-8 md:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center space-x-2 text-sm text-slate-500">
        <Link className="hover:text-primary transition-colors" href="/">
          Inicio
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <Link className="hover:text-primary transition-colors" href="/catalogo">
          Catálogo
        </Link>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="font-medium text-slate-800">Sector Salud</span>
      </nav>

      {/* Hero Banner */}
      <section className="relative mb-8 flex h-[280px] items-center overflow-hidden rounded-xl">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <Image
            width={800}
            height={800}
            alt="Medical professionals in scrubs"
            className="h-full w-full object-cover"
            data-alt="Group of diverse medical professionals wearing premium blue scrubs standing confidently in a modern, bright clinical setting, selective focus"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuChiOCfwhaZ1hrlrB-KF8m_PC2GDgs6AOxNpBUqUij-99Wk_jEaxaMo3c6GxqRU3AMuT_BB1ajJHdhRzc79j32GqOHA0Ht45zeZI3DSNfgGWvR89sfSMhUIiiUH9lbCPJeLnzqjKC7X1qFHPvD6Vl6F66D7gmzqZVT9Ro8FBuFnIDly-EeDq38DH1qCvj-BdzL54cLynP4Y6Gs3x_Bm0zpu3kWr_MXWkxWa2X2B9U_G0iy_T1Ov4JLi-ch8ZyMixXrH46XUg-sRvVFW"
          />
          <div className="absolute inset-0 bg-[#143067]/70"></div>
        </div>
        <div className="relative z-10 flex w-full flex-col items-center justify-between px-12 md:flex-row">
          <div className="max-w-2xl text-white">
            <h1 className="mb-4 text-4xl leading-none font-extrabold tracking-[-0.02em] md:text-[3.5rem]">
              Catálogo Sector Salud
            </h1>
            <p className="text-lg font-medium text-blue-100">
              Scrubs médicos y uniformes para profesionales de la salud.
            </p>
          </div>
          {/* Integrated Search */}
          <div className="mt-6 w-full md:mt-0 md:w-80">
            <div className="relative w-full">
              <input
                className="w-full rounded-lg border border-white/30 bg-white/20 py-3 pr-4 pl-12 text-white placeholder-white/70 backdrop-blur-md transition-all focus:border-white focus:ring-1 focus:ring-white focus:outline-none"
                placeholder="Buscar por código o nombre..."
                type="text"
              />
              <span className="material-symbols-outlined absolute top-3 left-4 text-white/80">
                search
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategory Tabs */}
      <div className="mb-8 overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm">
        <div className="hide-scrollbar flex overflow-x-auto">
          <button className="text-primary border-primary border-b-[3px] px-6 py-4 text-sm font-bold whitespace-nowrap">
            Todos
          </button>
          <button className="hover:text-primary px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-500">
            Médicos
          </button>
          <button className="hover:text-primary px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-500">
            Enfermería
          </button>
          <button className="hover:text-primary px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-500">
            Odontología
          </button>
          <button className="hover:text-primary px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-500">
            Fisioterapia
          </button>
          <button className="hover:text-primary px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-500">
            Laboratorio Clínico
          </button>
          <button className="hover:text-primary px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-500">
            Radiología
          </button>
          <button className="hover:text-primary px-6 py-4 text-sm font-medium whitespace-nowrap text-slate-500">
            Nutrición
          </button>
        </div>
      </div>

      {/* Filter Bar & Toolbar */}
      <div className="sticky top-[72px] z-40 mb-8 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          {/* Category Dropdown */}
          <select className="form-select focus:border-primary focus:ring-primary rounded-lg border-slate-200 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-1">
            <option>Categoría</option>
            <option>Uniformes completos</option>
            <option>Filipinas</option>
            <option>Pantalones</option>
            <option>Batas</option>
          </select>
          {/* Size Multi-select Dropdown (Simplified representation) */}
          <select className="form-select focus:border-primary focus:ring-primary rounded-lg border-slate-200 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-1">
            <option>Talla</option>
            <option>XS</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
            <option>2XL</option>
            <option>3XL</option>
          </select>
          {/* Color Selector Dropdown */}
          <select className="form-select focus:border-primary focus:ring-primary rounded-lg border-slate-200 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-1">
            <option>Color</option>
            <option>Navy</option>
            <option>Negro</option>
            <option>Blanco</option>
            <option>Verde</option>
          </select>
          {/* Price Range */}
          <select className="form-select focus:border-primary focus:ring-primary rounded-lg border-slate-200 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-1">
            <option>Precio</option>
            <option>$0 - $50.000</option>
            <option>$50.000 - $100.000</option>
            <option>+$100.000</option>
          </select>
          {/* Gender */}
          <select className="form-select focus:border-primary focus:ring-primary rounded-lg border-slate-200 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-1">
            <option>Género</option>
            <option>Unisex</option>
            <option>Femenino</option>
            <option>Masculino</option>
          </select>
          {/* Purchase Type */}
          <select className="form-select focus:border-primary focus:ring-primary rounded-lg border-slate-200 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-1">
            <option>Tipo de compra</option>
            <option>Individual</option>
            <option>Mayoreo</option>
          </select>
          <button className="text-accent ml-2 text-sm font-medium hover:text-[#91251c]">
            Limpiar todo
          </button>
        </div>
        <div className="mt-4 flex w-full items-center justify-between gap-4 md:mt-0 md:w-auto md:justify-end">
          <p className="hidden text-sm text-slate-500 lg:block">
            Mostrando <span className="font-bold text-slate-800">24</span> de{" "}
            <span className="font-bold text-slate-800">163</span> productos.
          </p>
          <div className="flex items-center space-x-2">
            <label
              className="text-sm whitespace-nowrap text-slate-500"
              htmlFor="ordenar"
            >
              Ordenar por:
            </label>
            <select
              id="ordenar"
              className="form-select focus:border-primary focus:ring-primary rounded-lg border-slate-200 py-2 pr-8 pl-3 text-sm text-slate-700 focus:ring-1"
            >
              <option>Relevancia</option>
              <option>Precio ↑</option>
              <option>Precio ↓</option>
              <option>Más nuevo</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customization Banner */}
      <div className="border-primary mb-8 flex flex-col items-center justify-between rounded-r-xl border-l-4 bg-[#f0f4ff] p-4 shadow-sm md:flex-row">
        <div className="mb-4 flex items-center space-x-4 md:mb-0">
          <span className="material-symbols-outlined text-primary text-2xl">
            styler
          </span>
          <div>
            <h4 className="text-primary font-bold">
              ¿Quieres tu nombre o logo bordado? Servicio disponible.
            </h4>
          </div>
        </div>
        <button className="border-primary text-primary hover:bg-primary rounded-lg border-2 bg-white px-6 py-2 text-sm font-bold transition-colors hover:text-white">
          Consultar
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Product Card 1 */}
        <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-square overflow-hidden bg-slate-50">
            <Image
              width={800}
              height={800}
              alt="Conjunto Scrub 'Atelier' Navy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="High quality studio shot of a dark blue medical scrub top folded neatly on a light surface, soft lighting, premium fabric texture visible"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmVb46eQQ_iW8X2kXil001ABrK_ZEo6hVuFdQq_qEd_l6oDbmeNstLHW6bKUKcNOb3gdGowaqMFggSbV_qL9PIVe8FYE62xEQcwDqGku5MhdYR-X_zvn-5agGa6FQlu8o1t4lLD7NQ_W23g6oH18XMXQ4BTiXcGtVy5KgBeisEZAtlPRyW-5z-r3PdPN_4DNp2-0Sypz6JO4df0qQvD1b2aVZWJyQHOg-k4e6kQYtGGI2BoHoaIC54YnLmNq7I2VOdz4ILi1wxsfS3"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-primary rounded-full bg-white px-4 py-2 text-sm font-bold">
                Ver detalle
              </span>
            </div>
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className="rounded bg-[#b43024] px-2 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                Nuevo
              </span>
              <span className="bg-primary rounded px-2 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                Popular
              </span>
            </div>
            <button className="absolute top-3 right-3 z-10 rounded-full bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:text-[#b43024]">
              <span className="material-symbols-outlined text-xl">
                favorite
              </span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-5">
            <p className="mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Médicos
            </p>
            <h3 className="mb-1 line-clamp-2 text-sm font-bold text-slate-800">
              Conjunto Scrub &apos;Atelier&apos; Navy
            </h3>
            <p className="mb-3 line-clamp-1 text-xs text-slate-500">
              Tela anti-fluidos, estiramiento 4-way.
            </p>
            <div className="mt-auto">
              <div className="mb-2 text-xl font-black text-slate-900">
                $145.000{" "}
                <span className="text-sm font-medium text-slate-500">COP</span>
              </div>
              <div className="mb-4 flex gap-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  XS
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  S
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  M
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  L
                </span>
              </div>
              <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0f2347]">
                <span className="material-symbols-outlined text-[18px]">
                  add_shopping_cart
                </span>
                Agregar al carrito
              </button>
            </div>
          </div>
        </article>

        {/* Product Card 2 */}
        <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-square overflow-hidden bg-slate-50">
            <Image
              width={800}
              height={800}
              alt="Bata Médica Clásica"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="Clean bright image of a high quality white medical lab coat hanging elegantly, white background, premium tailoring details visible"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLZMVeDVq227FnFm2TSBVEqkXTD8ApM-jIb-mhPaI1pQ5vRLWZcpOHlVEGkRUQM6B0_OVyZ1LBK2R3j0BB5QAxzCSCllJU0abgq1MTDREAw-GhnBnuukQ8ozQ4rVlxABtAHV-zIyVDscfc2Ct_t6mdfVwJRzOAsoOeeE2DtDCWG5Sf2UHMEGwpo-tck_N0D-GbfShx7-7cAncqhQfdKiSBvRP9vi1zH96z5b1YPEWrjjMc1qJDfyohRgngOoV_L7d26JBN1VYcRTkG"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-primary rounded-full bg-white px-4 py-2 text-sm font-bold">
                Ver detalle
              </span>
            </div>
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className="rounded bg-slate-500 px-2 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                Mayoreo
              </span>
            </div>
            <button className="absolute top-3 right-3 z-10 rounded-full bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:text-[#b43024]">
              <span className="material-symbols-outlined text-xl">
                favorite
              </span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-5">
            <p className="mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Laboratorio Clínico
            </p>
            <h3 className="mb-1 line-clamp-2 text-sm font-bold text-slate-800">
              Bata Médica Clásica
            </h3>
            <p className="mb-3 line-clamp-1 text-xs text-slate-500">
              Algodón premium, tres bolsillos.
            </p>
            <div className="mt-auto">
              <div className="mb-2 text-xl font-black text-slate-900">
                $95.000{" "}
                <span className="text-sm font-medium text-slate-500">COP</span>
              </div>
              <div className="mb-4 flex gap-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  S
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  M
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  L
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  XL
                </span>
              </div>
              <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0f2347]">
                <span className="material-symbols-outlined text-[18px]">
                  add_shopping_cart
                </span>
                Agregar al carrito
              </button>
            </div>
          </div>
        </article>

        {/* Product Card 3 */}
        <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-square overflow-hidden bg-slate-50">
            <Image
              width={800}
              height={800}
              alt="Scrub Enfermería"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              data-alt="Modern teal medical scrub top on a mannequin, bright clean clinical setting background, high resolution fabric texture"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZM_DA9uNNhfwYRqVesf4aVsxB3PxaGY1Suq9Jvhphm8NyuwidtsYYT2a0TFAENm-0NBvVWys8A-8o1NaMKVaUMmT4Pa7GN6pfcCjhutAtdegC2m4vTGyhrUkBTvRnwghNXpqEeUY_OfR30qz7emutFVuHUnRSmUxUkSADAdvys72su94V9fvPkQdbAaP8bRsD8MGEutgxQca3fUvgPfYSqF4D6HZMevp4gpvT0q4oCq4ojE0_I89jHYXC5ZBfR0BtsGec0XMrJGZr"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-primary rounded-full bg-white px-4 py-2 text-sm font-bold">
                Ver detalle
              </span>
            </div>
            <button className="absolute top-3 right-3 z-10 rounded-full bg-white p-1.5 text-[#b43024] shadow-sm">
              <span
                className="material-symbols-outlined text-xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-5">
            <p className="mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Enfermería
            </p>
            <h3 className="mb-1 line-clamp-2 text-sm font-bold text-slate-800">
              Blusa Scrub &apos;Comfort&apos; Teal
            </h3>
            <p className="mb-3 line-clamp-1 text-xs text-slate-500">
              Diseño ergonómico, ultra transpirable.
            </p>
            <div className="mt-auto">
              <div className="mb-2 text-xl font-black text-slate-900">
                $85.000{" "}
                <span className="text-sm font-medium text-slate-500">COP</span>
              </div>
              <div className="mb-4 flex gap-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  XS
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  S
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  M
                </span>
              </div>
              <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0f2347]">
                <span className="material-symbols-outlined text-[18px]">
                  add_shopping_cart
                </span>
                Agregar al carrito
              </button>
            </div>
          </div>
        </article>

        {/* Product Card 4 */}
        <article className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-100 bg-white transition-all duration-300 hover:shadow-lg">
          <div className="relative aspect-square overflow-hidden bg-slate-50">
            <div className="flex h-full w-full items-center justify-center bg-slate-200">
              <span className="material-symbols-outlined text-4xl text-slate-400">
                image
              </span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
              <span className="text-primary rounded-full bg-white px-4 py-2 text-sm font-bold">
                Ver detalle
              </span>
            </div>
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              <span className="bg-primary rounded px-2 py-1 text-[10px] font-bold tracking-wide text-white uppercase">
                Popular
              </span>
            </div>
            <button className="absolute top-3 right-3 z-10 rounded-full bg-white p-1.5 text-slate-400 shadow-sm transition-colors hover:text-[#b43024]">
              <span className="material-symbols-outlined text-xl">
                favorite
              </span>
            </button>
          </div>
          <div className="flex flex-grow flex-col p-5">
            <p className="mb-1 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Odontología
            </p>
            <h3 className="mb-1 line-clamp-2 text-sm font-bold text-slate-800">
              Pantalón Jogger Clínico
            </h3>
            <p className="mb-3 line-clamp-1 text-xs text-slate-500">
              Múltiples bolsillos, cintura elástica.
            </p>
            <div className="mt-auto">
              <div className="mb-2 text-xl font-black text-slate-900">
                $75.000{" "}
                <span className="text-sm font-medium text-slate-500">COP</span>
              </div>
              <div className="mb-4 flex gap-1">
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  M
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  L
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  XL
                </span>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-200 bg-slate-100 text-[10px] text-slate-500">
                  2XL
                </span>
              </div>
              <button className="bg-primary flex w-full items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#0f2347]">
                <span className="material-symbols-outlined text-[18px]">
                  add_shopping_cart
                </span>
                Agregar al carrito
              </button>
            </div>
          </div>
        </article>
      </div>

      {/* Pagination */}
      <div className="mt-12 flex items-center justify-center space-x-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button className="bg-primary flex h-10 w-10 items-center justify-center rounded-lg font-bold text-white">
          1
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
          2
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
          3
        </button>
        <span className="px-2 text-slate-400">...</span>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
          8
        </button>
        <button className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* No Results Section */}
      <div className="mx-auto mt-20 max-w-lg rounded-xl border border-slate-100 bg-white p-8 text-center shadow-sm">
        <span className="material-symbols-outlined mb-4 text-4xl text-slate-300">
          search_off
        </span>
        <h3 className="mb-2 text-xl font-bold text-slate-800">
          ¿No encontraste lo que buscas?
        </h3>
        <p className="mb-6 text-sm text-slate-500">
          Nuestro equipo de atención puede ayudarte a encontrar el uniforme
          perfecto o cotizar pedidos especiales.
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button className="flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-bold text-white transition-colors hover:bg-[#1da851]">
            <span className="material-symbols-outlined">chat</span>
            WhatsApp
          </button>
          <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-6 py-3 font-bold text-slate-700 transition-colors hover:bg-slate-50">
            Contactar por email
          </button>
        </div>
      </div>
    </main>
  );
}
