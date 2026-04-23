import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Scrub Médico Premium 'San Miguel' | Confecciones Liss",
  description: "Detalle del producto Scrub Médico Premium 'San Miguel'.",
};

export default function ProductoPage({ params }: { params: { id: string } }) {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-12 px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      {/* BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        className="flex text-sm font-medium tracking-wide text-gray-500"
      >
        <ol className="flex items-center space-x-2">
          <li>
            <Link className="hover:text-primary transition-colors" href="/">
              Inicio
            </Link>
          </li>
          <li>
            <span className="mx-1">/</span>
          </li>
          <li>
            <Link
              className="hover:text-primary transition-colors"
              href="/catalogo"
            >
              Sector Salud
            </Link>
          </li>
          <li>
            <span className="mx-1">/</span>
          </li>
          <li>
            <Link
              className="hover:text-primary transition-colors"
              href="/catalogo/medico"
            >
              Scrubs Médicos
            </Link>
          </li>
          <li>
            <span className="mx-1">/</span>
          </li>
          <li aria-current="page" className="text-gray-900">
            Scrub Médico Premium &apos;San Miguel&apos;
          </li>
        </ol>
      </nav>

      {/* PRODUCT DETAIL SECTION */}
      <section className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        {/* LEFT: Imagery (55%) */}
        <div className="relative flex flex-col gap-6 lg:w-[55%]">
          {/* Badges */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-accent rounded-full px-3 py-1 text-xs font-bold tracking-wider text-white uppercase shadow-sm">
              Nuevo
            </span>
          </div>

          {/* Main Image */}
          <div className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-[#f8f8f8] shadow-sm">
            <Image
              width={800}
              height={800}
              alt="Scrub Médico Premium 'San Miguel'"
              className="h-full w-full object-cover object-center mix-blend-multiply"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHxaJ3wC7_Tyv2qoS2x-JxEIKirXQbF3Oa93ux9PxpkeDL7PxP9HgLzvuK4PXKFpUyQIEazDIMFGi-ippZhPkDRGzV0_DgjDlpq1lvYtUEKv6MM_9SCEIjG9hv1Kuj25-a2myQC0CLzn4fEvE0DFt2kbgC_jM_U-I-1a5mo6eKrFB-IUhmbhCp2sfLYyoGpdjIhZHsgiWX3J4kkrsjmCwv49dPUsoa-VXowlnCp231nVGXqhuBRF3wCeAivhPWKCJ4QLH2jr6oNBXo"
            />
            <button className="hover:text-primary absolute top-4 right-4 rounded-full bg-white/90 p-2.5 text-gray-600 opacity-0 shadow-md backdrop-blur-sm transition-colors duration-200 group-hover:opacity-100">
              <span className="material-symbols-outlined text-[20px]">
                share
              </span>
            </button>
          </div>

          {/* Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            <button className="border-primary aspect-square overflow-hidden rounded-lg border-2 bg-[#f8f8f8]">
              <Image
                width={800}
                height={800}
                alt="Thumbnail 1"
                className="h-full w-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxSbIkuyWTJrw2EAiS4xEAWH3lyRMzEX1EAjDFnWMhZr_t4qHRlSJPcv8WPv7kTJnqf-L1g3_tlCuiFODPxSanZtyJmncxqhD_3enq-HKR27k_wuBOjgM4QrItW1W3d3YSx1YZpUUx-AEiSRGqPExOd-iJ1Na0rtckcedSu_qQkKuuVwW0DutZRRKmVzw_yq55U6NS70EP0KEwVkLzUt_Hwh3o_9AFbhaVeGczixKKq2Qpb10mpURGgV2HynW1g3MKlYs6n-yp8KKO"
              />
            </button>
            <button className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-[#f8f8f8] transition-colors hover:border-gray-400">
              <Image
                width={800}
                height={800}
                alt="Thumbnail 2"
                className="h-full w-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBG8Pkg0hVXNK7TEd0bV18_WM0UXdldDj5IPq4OXIOipnPhWjrt9q9mjRLKN91ZRPJLQ8l9Zsxu0AhT88ShQWx7psfKJJsj4y50jr4Pf8j_5vf3dLepp2I5UC3GOWu73FGSMvkMpqFguLyrjRjsSSgqUBYPz2Fbe2avE0yhcbgKwHpWIzG8yEd5ljHvlEMY_jcnw6UvkfuTY0wkqc0P_4lWRSnwxwLAD-2d3WYGb5t--r6IR0SW3dnA2Zp8RXxGuQAz0LAJLGQ3OiZO"
              />
            </button>
            <button className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-[#f8f8f8] transition-colors hover:border-gray-400">
              <Image
                width={800}
                height={800}
                alt="Thumbnail 3"
                className="h-full w-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQepqZh7wWu3DuxMx5nRM9lm2JxllqopZA7uJqcHql4U8sgiQ24iDi_1JmHF5dnFzyaxD36dUIm-mvhvey04mWJa8fNceomHfzq8tY6aExELUPlX0NLLworw5HfUcwtc9eegWij8sFrVZurpOdpic-V2Y0pb83XvzL4Sud4ShRaIOwwwp8ZXxIhd1uxYeaNFfhNQlaas11n5dzAfEL-Q42eLJ67EwdnX2sbsJ0jbEFo_BGGtbUVSL8UMDmQvjR6p2yksuarMD2wCzV"
              />
            </button>
            <button className="flex aspect-square items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100 transition-colors hover:border-gray-400">
              <span className="material-symbols-outlined text-3xl text-gray-400">
                play_circle
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT: Details & Actions (45%) */}
        <div className="flex flex-col lg:w-[45%]">
          <div className="mb-6">
            <span className="border-primary text-primary mb-4 inline-block rounded-full border bg-white px-3 py-1 text-xs font-semibold tracking-wider uppercase">
              Scrubs Médicos
            </span>
            <h1 className="mb-3 text-3xl leading-tight font-extrabold tracking-tight text-gray-900 lg:text-4xl">
              Scrub Médico Premium &apos;San Miguel&apos;
            </h1>
            <div className="mb-4 flex items-center space-x-4">
              <div className="flex items-center text-yellow-500">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star_half
                </span>
              </div>
              <a
                className="hover:text-primary text-sm text-gray-500 underline decoration-gray-300 underline-offset-4 transition-colors"
                href="#reviews"
              >
                4.8 (12 reseñas)
              </a>
            </div>
            <p className="text-base leading-relaxed text-gray-600">
              Confeccionado con tejido técnico repelente a fluidos y
              estiramiento en 4 direcciones para máxima movilidad durante largas
              jornadas. Diseño anatómico con detalles de sastre.
            </p>
          </div>

          <div className="mb-8 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="mb-2 flex items-end space-x-3">
              <span className="text-accent text-3xl font-bold">$45.00</span>
              <span className="mb-1 text-lg text-gray-400 line-through">
                $55.00
              </span>
            </div>
            <div className="flex inline-flex items-center rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-600">
              <span className="material-symbols-outlined text-accent mr-2 text-sm">
                local_offer
              </span>
              <span className="font-medium">Mayoreo disponible:</span>{" "}
              <span className="ml-1">$38.00 a partir de 10 unidades.</span>
            </div>
          </div>

          {/* SELECTORS */}
          <div className="mb-8 space-y-6">
            {/* Size */}
            <div>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-bold tracking-wider text-gray-900 uppercase">
                  Talla Seleccionada: <span className="text-primary">M</span>
                </span>
                <button className="text-primary decoration-primary/30 flex items-center text-sm underline underline-offset-4 transition-colors hover:text-blue-800">
                  <span className="material-symbols-outlined mr-1 text-[16px]">
                    straighten
                  </span>{" "}
                  Guía de tallas
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="hover:border-primary h-10 rounded-lg border border-gray-300 px-3 font-medium text-gray-700 transition-colors">
                  XS
                </button>
                <button className="hover:border-primary h-10 rounded-lg border border-gray-300 px-3 font-medium text-gray-700 transition-colors">
                  S
                </button>
                <button className="bg-primary border-primary h-10 rounded-lg border px-3 font-bold text-white shadow-md">
                  M
                </button>
                <button className="hover:border-primary h-10 rounded-lg border border-gray-300 px-3 font-medium text-gray-700 transition-colors">
                  L
                </button>
                <button className="hover:border-primary h-10 rounded-lg border border-gray-300 px-3 font-medium text-gray-700 transition-colors">
                  XL
                </button>
                <button className="hover:border-primary h-10 rounded-lg border border-gray-300 px-3 font-medium text-gray-700 transition-colors">
                  XXL
                </button>
                <button className="hover:border-primary h-10 rounded-lg border border-gray-300 px-3 font-medium text-gray-700 transition-colors">
                  2XL
                </button>
                <button className="h-10 cursor-not-allowed rounded-lg border border-gray-200 bg-gray-50 px-3 font-medium text-gray-400 line-through">
                  3XL
                </button>
              </div>
            </div>

            {/* Color */}
            <div>
              <span className="mb-3 block text-sm font-bold tracking-wider text-gray-900 uppercase">
                Color:{" "}
                <span className="text-primary font-medium">Azul Naval</span>
              </span>
              <div className="flex gap-3">
                <button className="bg-primary ring-primary relative flex h-9 w-9 items-center justify-center rounded-full shadow-sm ring-2 ring-offset-2">
                  <span className="material-symbols-outlined text-[16px] text-white">
                    check
                  </span>
                </button>
                <button className="h-9 w-9 rounded-full border border-gray-300 bg-[#1b4332] shadow-sm transition-transform hover:scale-110"></button>
                <button className="h-9 w-9 rounded-full border border-gray-300 bg-[#4a0000] shadow-sm transition-transform hover:scale-110"></button>
                <button className="h-9 w-9 rounded-full border border-gray-300 bg-[#2b2d42] shadow-sm transition-transform hover:scale-110"></button>
                <button className="h-9 w-9 rounded-full border border-gray-300 bg-[#ffffff] shadow-sm transition-transform hover:scale-110"></button>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="mb-8 flex flex-col gap-4">
            <div className="flex gap-4">
              {/* Quantity */}
              <div className="flex h-12 w-32 shrink-0 items-center rounded-lg border border-gray-300 bg-white shadow-sm">
                <button className="hover:text-primary flex h-full w-full items-center justify-center px-3 text-gray-500 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    remove
                  </span>
                </button>
                <span className="w-full text-center font-medium text-gray-900">
                  1
                </span>
                <button className="hover:text-primary flex h-full w-full items-center justify-center px-3 text-gray-500 transition-colors">
                  <span className="material-symbols-outlined text-[20px]">
                    add
                  </span>
                </button>
              </div>
              <button className="bg-primary flex h-12 flex-1 items-center justify-center rounded-lg font-bold tracking-wide text-white shadow-md transition-colors hover:bg-blue-900">
                Agregar al carrito
              </button>
              <button className="hover:text-accent hover:border-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-500 shadow-sm transition-colors">
                <span className="material-symbols-outlined">
                  favorite_border
                </span>
              </button>
            </div>
            <button className="flex h-12 w-full items-center justify-center rounded-lg bg-[#25D366] font-bold tracking-wide text-white shadow-md transition-colors hover:bg-[#20b958]">
              <span className="material-symbols-outlined mr-2 text-[20px]">
                chat
              </span>{" "}
              Comprar por WhatsApp
            </button>
          </div>

          {/* CUSTOMIZATION ACCORDION */}
          <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
            <button className="group flex w-full items-center justify-between p-4 font-medium text-gray-900 transition-colors hover:bg-gray-50">
              <div className="flex items-center">
                <span className="material-symbols-outlined text-primary mr-2">
                  edit_square
                </span>
                ¿Quieres personalización?
              </div>
              <span className="material-symbols-outlined expand-icon text-gray-500 transition-transform group-[.accordion-active]:rotate-180">
                expand_more
              </span>
            </button>
            <div className="accordion-content hidden border-t border-gray-100 bg-gray-50 px-4">
              <div className="space-y-4 pt-4">
                <div className="flex cursor-pointer items-start space-x-3">
                  <input
                    id="personalizacion-nombre"
                    defaultChecked
                    className="text-primary focus:ring-primary mt-1 rounded border-gray-300"
                    type="checkbox"
                  />
                  <label htmlFor="personalizacion-nombre" className="flex-1">
                    <span className="block text-sm font-medium text-gray-900">
                      Nombre bordado (+$5.00)
                    </span>
                    <input
                      className="focus:border-primary focus:ring-primary focus:ring-opacity-50 mt-2 h-10 w-full rounded-md border-gray-300 px-3 text-sm shadow-sm focus:ring"
                      placeholder="Ej. Dra. Ana Martínez"
                      type="text"
                      aria-label="Nombre a bordar"
                    />
                  </label>
                </div>
                <div className="flex cursor-pointer items-start space-x-3">
                  <input
                    id="personalizacion-logo"
                    className="text-primary focus:ring-primary mt-1 rounded border-gray-300"
                    type="checkbox"
                  />
                  <label htmlFor="personalizacion-logo" className="flex-1">
                    <span className="block text-sm font-medium text-gray-900">
                      Logo institucional (+$8.00)
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      Nos comunicaremos contigo para solicitar el logo tras la
                      compra.
                    </span>
                  </label>
                </div>
                <div className="pt-2">
                  <span className="mb-2 block text-xs font-bold text-gray-700 uppercase">
                    Color de hilo sugerido:
                  </span>
                  <div className="flex gap-2">
                    <div className="ring-primary h-6 w-6 rounded-full border border-gray-300 bg-white ring-1 ring-offset-1"></div>
                    <div className="h-6 w-6 rounded-full border border-gray-300 bg-yellow-400"></div>
                    <div className="h-6 w-6 rounded-full border border-gray-300 bg-blue-400"></div>
                    <div className="h-6 w-6 rounded-full border border-gray-300 bg-pink-400"></div>
                    <div className="h-6 w-6 rounded-full border border-gray-300 bg-gray-400"></div>
                    <div className="h-6 w-6 rounded-full border border-gray-300 bg-black"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* INFO STRIP */}
          <div className="grid grid-cols-2 gap-x-2 gap-y-4 border-y border-gray-200 py-6">
            <div className="flex items-center text-sm text-gray-600">
              <span className="material-symbols-outlined text-primary mr-2 text-[20px]">
                checkroom
              </span>{" "}
              Confección artesanal
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="material-symbols-outlined text-primary mr-2 text-[20px]">
                health_and_safety
              </span>{" "}
              Tela médica
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="material-symbols-outlined text-primary mr-2 text-[20px]">
                auto_awesome
              </span>{" "}
              Bordado disponible
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <span className="material-symbols-outlined text-primary mr-2 text-[20px]">
                local_shipping
              </span>{" "}
              Envío zona oriental
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section className="mt-8 border-b border-gray-200">
        <nav
          aria-label="Tabs"
          className="no-scrollbar flex space-x-8 overflow-x-auto"
        >
          <a
            className="border-primary text-primary border-b-2 px-1 py-4 text-base font-medium whitespace-nowrap"
            href="#/"
          >
            Descripción
          </a>
          <a
            className="border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
            href="#/"
          >
            Especificaciones
          </a>
          <a
            className="border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
            href="#/"
          >
            Guía de tallas
          </a>
          <a
            className="border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
            href="#/"
          >
            Cuidados
          </a>
          <a
            className="border-b-2 border-transparent px-1 py-4 text-base font-medium whitespace-nowrap text-gray-500 hover:border-gray-300 hover:text-gray-700"
            href="#/"
          >
            Política de cambios
          </a>
        </nav>
        <div className="max-w-3xl py-8 leading-relaxed text-gray-600">
          <p className="mb-4">
            El Scrub Médico Premium &apos;San Miguel&apos; representa el
            pináculo de la comodidad clínica. Diseñado específicamente para
            profesionales de la salud que exigen funcionalidad sin comprometer
            la apariencia.
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Tejido antimicrobiano y repelente a líquidos.</li>
            <li>Corte moderno y favorecedor con pinzas traseras.</li>
            <li>
              6 bolsillos funcionales incluyendo ranura para bolígrafos y
              bolsillo oculto para anillos/reloj.
            </li>
            <li>Cintura elástica con cordón ajustable interno.</li>
            <li>
              Resistencia excepcional a la decoloración tras múltiples lavados
              institucionales.
            </li>
          </ul>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-8" id="reviews">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          Reseñas de Clientes
        </h2>
        <div className="flex flex-col gap-12 md:flex-row">
          {/* Summary */}
          <div className="md:w-1/3">
            <div className="mb-6 flex items-center gap-4">
              <span className="text-5xl font-bold text-gray-900">4.8</span>
              <div>
                <div className="mb-1 flex text-yellow-500">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star_half
                  </span>
                </div>
                <p className="text-sm text-gray-500">Basado en 12 reseñas</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="w-3 text-sm font-medium">5</span>
                <span
                  className="material-symbols-outlined text-sm text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[85%] bg-yellow-500"></div>
                </div>
                <span className="w-6 text-right text-sm text-gray-500">10</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-sm font-medium">4</span>
                <span
                  className="material-symbols-outlined text-sm text-yellow-500"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                  <div className="h-full w-[15%] bg-yellow-500"></div>
                </div>
                <span className="w-6 text-right text-sm text-gray-500">2</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-sm font-medium">3</span>
                <span
                  className="material-symbols-outlined text-sm text-gray-300"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"></div>
                <span className="w-6 text-right text-sm text-gray-500">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-sm font-medium">2</span>
                <span
                  className="material-symbols-outlined text-sm text-gray-300"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"></div>
                <span className="w-6 text-right text-sm text-gray-500">0</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 text-sm font-medium">1</span>
                <span
                  className="material-symbols-outlined text-sm text-gray-300"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200"></div>
                <span className="w-6 text-right text-sm text-gray-500">0</span>
              </div>
            </div>
          </div>

          {/* Review Cards */}
          <div className="space-y-6 md:w-2/3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold">
                    MR
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">María Rodríguez</h4>
                    <div className="flex items-center text-xs font-medium text-green-600">
                      <span className="material-symbols-outlined mr-1 text-[14px]">
                        verified
                      </span>{" "}
                      Comprador verificado
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-500">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
              </div>
              <h5 className="mb-2 font-bold text-gray-900">
                Excelente calidad y ajuste
              </h5>
              <p className="text-sm text-gray-600">
                La tela es súper fresca para los turnos de 24 horas. El bordado
                quedó perfecto. Definitivamente compraré en otros colores.
              </p>
              <span className="mt-4 block text-xs text-gray-400">
                Hace 2 semanas
              </span>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-primary flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 font-bold">
                    CF
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">Carlos Fuentes</h4>
                    <div className="flex items-center text-xs font-medium text-green-600">
                      <span className="material-symbols-outlined mr-1 text-[14px]">
                        verified
                      </span>{" "}
                      Comprador verificado
                    </div>
                  </div>
                </div>
                <div className="flex text-yellow-500">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                </div>
              </div>
              <h5 className="mb-2 font-bold text-gray-900">
                Muy buenos, talla un poco exacta
              </h5>
              <p className="text-sm text-gray-600">
                Son de los mejores uniformes que he tenido, la tela repele muy
                bien. Solo recomiendo pedir una talla más si te gusta andar
                holgado.
              </p>
              <span className="mt-4 block text-xs text-gray-400">
                Hace 1 mes
              </span>
            </div>

            <button className="text-primary py-2 font-bold hover:underline">
              Ver todas las reseñas
            </button>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className="border-t border-gray-200 py-8">
        <h2 className="mb-8 text-2xl font-bold text-gray-900">
          Completa tu equipo
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Product Card 1 */}
          <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <Image
                width={800}
                height={800}
                alt="Gorro Quirúrgico"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJrG7ywGURCgxGpPBAAxum4EmcC_Ho7DeJYfkcDI1HZLbfrOwjxr84oTYIAz6pJDmYCubgLMXEu2F6OidCmmzN5zFRZRxwQ222Y0aygqOfBOYVJahJFWuX1ePwZ70pzkqqTns9WnbaMFcG5KdIxznIxMA88-3K0vSoYKbvHDe4mMUaQL0c7sboJLYopKKEkMRVQKJkyE-lYKgm8CKMjDe4Hx0thfhqjjJQzYH7PffT9wI0yDesJPkDx8eTyFVeai0jSXh9nfgbPMTI"
              />
              <button className="hover:text-accent absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-400 opacity-0 shadow-sm transition-opacity group-hover:opacity-100">
                <span className="material-symbols-outlined text-lg">
                  favorite_border
                </span>
              </button>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-sm font-bold text-gray-900">
                Gorro Quirúrgico Premium
              </h3>
              <p className="mb-3 text-xs text-gray-500">Varios colores</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold">$12.00</span>
                <button className="text-primary text-xs font-bold hover:underline">
                  Ver más
                </button>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
            <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
              <Image
                width={800}
                height={800}
                alt="Bata Médica"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_YwV1ovoyjSwwiIBSXICjSK7t1NRCrORLAJ_WG-VlxLKegY62cdSW0kO4i3RxDxHeOqFaTkKljC8uUBjX8XSP244WgBQ8bv4mqN4XAi-Z3lze5iprsJy74iA97nN7xLG5T9DBh4P0VEV695KAJVFJrMjA6g4-7UnCczo95wFOeSaQEwmOur-gRTwnqJw5YmdyL-yRztA_ycYcCO6hlBmQgXtwurLLPdd7k6oBBIlTI68PQeL9OeeJZoTLCf6r-BJF1EXy2TeD_qa9"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-sm font-bold text-gray-900">
                Bata Médica Clásica
              </h3>
              <p className="mb-3 text-xs text-gray-500">Blanco</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold">$35.00</span>
                <button className="text-primary text-xs font-bold hover:underline">
                  Ver más
                </button>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group hidden overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:block">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gray-100">
              <span className="material-symbols-outlined text-4xl text-gray-300">
                checkroom
              </span>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-sm font-bold text-gray-900">
                Chaqueta Clínica
              </h3>
              <p className="mb-3 text-xs text-gray-500">Azul Naval</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold">$40.00</span>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group hidden overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg lg:block">
            <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden bg-gray-100">
              <span className="material-symbols-outlined text-4xl text-gray-300">
                shopping_bag
              </span>
            </div>
            <div className="p-4">
              <h3 className="mb-1 text-sm font-bold text-gray-900">
                Kit Scrub + Gorro
              </h3>
              <p className="mb-3 text-xs text-gray-500">Promoción</p>
              <div className="flex items-center justify-between">
                <span className="text-primary font-bold">$52.00</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
