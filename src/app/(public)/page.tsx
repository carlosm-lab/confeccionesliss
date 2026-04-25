import Link from "next/link";
import Image from "next/image";
import { LobbyModal } from "@/components/ui/LobbyModal";

export default function HomePage() {
  return (
    <>
      <LobbyModal />
      {/* 3. HERO */}
      <section className="bg-surface-container-low relative overflow-hidden px-8 pt-20 pb-28">
        <div className="mx-auto flex max-w-screen-2xl flex-col items-center gap-16 lg:flex-row lg:pr-24 lg:pl-12">
          {/* Left: Content (55%) */}
          <div className="z-10 flex w-full flex-col items-start lg:w-[55%]">
            <div className="bg-tertiary/10 text-tertiary mb-6 flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-[16px]">
                verified
              </span>
              Hecho en El Salvador
            </div>
            <h1 className="text-primary mb-6 font-serif text-5xl leading-[1.1] tracking-tight lg:text-7xl">
              Tu uniforme,
              <br />
              tu identidad
              <br />
              profesional
            </h1>
            <p className="text-on-surface-variant font-body mb-8 max-w-lg text-lg leading-relaxed lg:text-xl">
              Confección artesanal de uniformes médicos y corporativos en San
              Miguel. Diseñados para la precisión, ajustados para tu comodidad.
            </p>
            {/* Trust Badges */}
            <div className="mb-10 flex flex-wrap gap-4">
              <div className="text-secondary flex items-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-primary-container">
                  check_circle
                </span>
                Confección artesanal
              </div>
              <div className="text-secondary flex items-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-primary-container">
                  check_circle
                </span>
                Tela de calidad
              </div>
              <div className="text-secondary flex items-center gap-2 text-sm font-medium">
                <span className="material-symbols-outlined text-primary-container">
                  check_circle
                </span>
                Entrega en zona oriental
              </div>
            </div>
            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalogo/salud"
                className="btn-gradient font-body ambient-shadow rounded-md px-8 py-4 font-semibold text-white transition-opacity hover:opacity-90"
              >
                Ver catálogo
              </Link>
              <Link
                href="https://wa.me/50370000000"
                target="_blank"
                rel="noopener noreferrer"
                className="border-outline text-primary hover:bg-surface-variant/50 rounded-md border bg-transparent px-8 py-4 font-serif font-medium transition-colors"
              >
                Pedir por WhatsApp
              </Link>
            </div>
          </div>
          {/* Right: Image (45%) */}
          <div className="relative w-full lg:w-[45%]">
            <div className="bg-primary-container absolute inset-0 translate-x-6 translate-y-6 transform rounded-tr-[100px] rounded-bl-[100px] opacity-20"></div>
            <div className="ambient-shadow bg-surface-container-highest relative z-10 aspect-[4/5] overflow-hidden rounded-tl-xl rounded-br-xl">
              <Image
                width={800}
                height={800}
                alt="Profesional médico vistiendo un scrub de alta calidad"
                className="h-full w-full object-cover object-center"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMIor4NQU8ZY6h6n53wLwP1PPv_4IfEVDlrdkQiVgvWOiidIyGatWukXX7ZzVsdzRcz71fAfJcvi2HELZG7UhjbUqAz3THePqzcXwVEFSXMa0_8RlkF37VvPCxi3qVma_OFXo80Xv6Ys_4iZKHWxLrn6BbTqt1WpiNtaLbAYB3k3U3CFLZ7Ir1kw-e3SwltcGqBC7zr1jVmabzJpJr_0Dxdp4gnvhAIm_RseUm_lKpMpO80Ncg0AwJ3Uyzgkf0sjKg62CnPdOG4qWK"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CATEGORY ROW (Chips with icons) */}
      <section className="bg-surface border-surface-variant/30 border-b py-8">
        <div className="mx-auto max-w-screen-2xl px-8">
          <div className="scrollbar-hide no-scrollbar relative flex snap-x gap-3 overflow-x-auto pb-4">
            <Link
              href="/catalogo/salud"
              className="bg-primary font-label flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium text-white"
            >
              <span className="material-symbols-outlined text-sm">
                grid_view
              </span>{" "}
              Todos
            </Link>
            <Link
              href="/catalogo/salud?filter=medicos"
              className="bg-surface-container-high text-on-surface font-label hover:bg-surface-variant flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                medical_services
              </span>{" "}
              Médicos
            </Link>
            <Link
              href="/catalogo/salud?filter=enfermeria"
              className="bg-surface-container-high text-on-surface font-label hover:bg-surface-variant flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">healing</span>{" "}
              Enfermería
            </Link>
            <Link
              href="/catalogo/salud?filter=odontologia"
              className="bg-surface-container-high text-on-surface font-label hover:bg-surface-variant flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                dentistry
              </span>{" "}
              Odontología
            </Link>
            <Link
              href="/catalogo/salud?filter=fisioterapia"
              className="bg-surface-container-high text-on-surface font-label hover:bg-surface-variant flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                physical_therapy
              </span>{" "}
              Fisioterapia
            </Link>
            <Link
              href={"/catalogo/escolar" as any}
              className="bg-surface-container-high text-on-surface font-label hover:bg-surface-variant flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">school</span>{" "}
              Estudiantes
            </Link>
            <Link
              href="/catalogo/salud"
              className="bg-surface-container-high text-on-surface font-label hover:bg-surface-variant flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">biotech</span>{" "}
              Lab Clínico
            </Link>
            <Link
              href={"/catalogo/corporativo" as any}
              className="bg-surface-container-high text-on-surface font-label hover:bg-surface-variant flex shrink-0 snap-start items-center gap-2 rounded-full px-6 py-2 text-sm font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-sm">domain</span>{" "}
              Empresas
            </Link>
          </div>
        </div>
      </section>

      {/* 5. NOVEDADES */}
      <section className="bg-surface px-8 py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between lg:pr-12">
            <h2 className="text-primary font-serif text-4xl">Novedades</h2>
            <Link
              href="/novedades"
              className="text-primary font-body flex items-center gap-1 text-sm font-semibold tracking-wider uppercase hover:underline"
            >
              Ver todas{" "}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Product Card 1 */}
            <div className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-surface-container relative flex aspect-square items-center justify-center p-6">
                <span className="bg-tertiary absolute top-4 left-4 rounded px-2 py-1 text-xs font-bold text-white">
                  Nuevo
                </span>
                <button
                  aria-label="Añadir a favoritos"
                  className="text-outline hover:text-tertiary absolute top-4 right-4 z-10 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                </button>
                <Image
                  width={800}
                  height={800}
                  alt="Scrub top"
                  className="h-full w-full rounded object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAchu4owugaejCs4BMo2xGoxy7qsqP18zTQW-ksYQ2RWsOEVeWVCdsfHpn0lEgaxeXrMmj8uV8I6V4ee6ikie_qtd5BBZ0Xg7VQbe7cBJKbpPt8vVx_MyyZ1TSFmYMQdLZMYk-JB7ewnfWxXM9U_Mzh4So5AeoT-fysb5R9Gmp-vDmFpQHr0QeQ-hTBhzJIhnNPgtvwLUux8BNfxZ_nay8OrukMWHcBHovbjUjdebNO8Ks9V7OlnsPOGBkoIyciurbGMlOMoj9uQv_p"
                />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <span className="font-label text-secondary mb-2 text-xs tracking-wider uppercase">
                  Enfermería
                </span>
                <h3 className="text-on-surface mb-1 font-serif text-lg">
                  Set &quot;Precision&quot; Azul Marino
                </h3>
                <p className="text-on-surface-variant font-body mb-4 font-semibold">
                  $45.00
                </p>
                <div className="mb-6 flex gap-2">
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    S
                  </span>
                  <span className="bg-primary flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-white">
                    M
                  </span>
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    L
                  </span>
                </div>
                <button className="bg-primary font-body mt-auto flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="material-symbols-outlined text-sm">
                    shopping_cart
                  </span>{" "}
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-surface-container relative flex aspect-square items-center justify-center p-6">
                <span className="bg-tertiary absolute top-4 left-4 rounded px-2 py-1 text-xs font-bold text-white">
                  Nuevo
                </span>
                <button
                  aria-label="Añadir a favoritos"
                  className="text-outline hover:text-tertiary absolute top-4 right-4 z-10 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                </button>
                <Image
                  width={800}
                  height={800}
                  alt="Bata médica"
                  className="h-full w-full rounded object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1dg_pqLOX2A6RX3FBs0wyZsaArck0ViXc4-ogvtrFGI8cd12D3xVp-Eg9fq0nVWP5ceV0FVwM8LfliiArsjazrSimOSza6kQSoB0i7wXuOjOvit6w60LsedI-e7HaF-ymeJY2iSNMHLXiiKTYQgCsucrDBR1BRoAsakNyxpC3FrnxR4JaB8u6MQYqMcop1_dew887jS107mDxdLRAy9CXcatWoo5eWJKT6zx1Kr2fT_vdwLmEA2s_EDFEEKz3ccx5gpGr0Z203u_A"
                />
              </div>
              <div className="flex flex-grow flex-col p-6">
                <span className="font-label text-secondary mb-2 text-xs tracking-wider uppercase">
                  Médicos
                </span>
                <h3 className="text-on-surface mb-1 font-serif text-lg">
                  Bata Blanca &quot;Atelier&quot;
                </h3>
                <p className="text-on-surface-variant font-body mb-4 font-semibold">
                  $35.00
                </p>
                <div className="mb-6 flex gap-2">
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    M
                  </span>
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    L
                  </span>
                </div>
                <button className="bg-primary font-body mt-auto flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="material-symbols-outlined text-sm">
                    shopping_cart
                  </span>{" "}
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-surface-container relative flex aspect-square items-center justify-center p-6">
                <span className="bg-tertiary absolute top-4 left-4 rounded px-2 py-1 text-xs font-bold text-white">
                  Nuevo
                </span>
                <button
                  aria-label="Añadir a favoritos"
                  className="text-outline hover:text-tertiary absolute top-4 right-4 z-10 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                </button>
                <div className="bg-surface-container-low border-outline-variant/30 flex h-full w-full items-center justify-center rounded-xl border">
                  <span className="material-symbols-outlined text-outline text-4xl">
                    image
                  </span>
                </div>
              </div>
              <div className="flex flex-grow flex-col p-6">
                <span className="font-label text-secondary mb-2 text-xs tracking-wider uppercase">
                  Estudiantes
                </span>
                <h3 className="text-on-surface mb-1 font-serif text-lg">
                  Scrub Básico UES
                </h3>
                <p className="text-on-surface-variant font-body mb-4 font-semibold">
                  $28.00
                </p>
                <div className="mb-6 flex gap-2">
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    S
                  </span>
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    M
                  </span>
                </div>
                <button className="bg-primary font-body mt-auto flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="material-symbols-outlined text-sm">
                    shopping_cart
                  </span>{" "}
                  Agregar al carrito
                </button>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white transition-transform duration-300 hover:-translate-y-1">
              <div className="bg-surface-container relative flex aspect-square items-center justify-center p-6">
                <span className="bg-tertiary absolute top-4 left-4 rounded px-2 py-1 text-xs font-bold text-white">
                  Nuevo
                </span>
                <button
                  aria-label="Añadir a favoritos"
                  className="text-outline hover:text-tertiary absolute top-4 right-4 z-10 transition-colors"
                >
                  <span className="material-symbols-outlined">
                    favorite_border
                  </span>
                </button>
                <div className="bg-surface-container-low border-outline-variant/30 flex h-full w-full items-center justify-center rounded-xl border">
                  <span className="material-symbols-outlined text-outline text-4xl">
                    image
                  </span>
                </div>
              </div>
              <div className="flex flex-grow flex-col p-6">
                <span className="font-label text-secondary mb-2 text-xs tracking-wider uppercase">
                  Odontología
                </span>
                <h3 className="text-on-surface mb-1 font-serif text-lg">
                  Filipina Cuello Mao
                </h3>
                <p className="text-on-surface-variant font-body mb-4 font-semibold">
                  $32.00
                </p>
                <div className="mb-6 flex gap-2">
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    M
                  </span>
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    L
                  </span>
                  <span className="bg-surface-container text-secondary flex h-6 w-6 items-center justify-center rounded-full text-[10px]">
                    XL
                  </span>
                </div>
                <button className="bg-primary font-body mt-auto flex w-full items-center justify-center gap-2 rounded-md py-3 text-sm font-semibold text-white opacity-90 transition-opacity group-hover:opacity-100">
                  <span className="material-symbols-outlined text-sm">
                    shopping_cart
                  </span>{" "}
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHY CONFECCIONES LISS */}
      <section className="bg-surface-container-low border-surface-variant/50 border-t border-b px-8 py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <span className="material-symbols-outlined text-3xl">cut</span>
              </div>
              <h3 className="text-primary mb-3 font-serif text-xl">
                Confección artesanal
              </h3>
              <p className="text-on-surface-variant font-body text-sm">
                Corte y costura detallada para un ajuste perfecto y duradero.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <span className="material-symbols-outlined text-3xl">
                  texture
                </span>
              </div>
              <h3 className="text-primary mb-3 font-serif text-xl">
                Telas certificadas
              </h3>
              <p className="text-on-surface-variant font-body text-sm">
                Materiales resistentes a fluidos y desgaste por lavados
                frecuentes.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <span className="material-symbols-outlined text-3xl">
                  styler
                </span>
              </div>
              <h3 className="text-primary mb-3 font-serif text-xl">Bordados</h3>
              <p className="text-on-surface-variant font-body text-sm">
                Personalización con el logo de tu clínica, hospital o
                universidad.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-primary mb-6 flex h-16 w-16 items-center justify-center rounded-full text-white">
                <span className="material-symbols-outlined text-3xl">
                  local_shipping
                </span>
              </div>
              <h3 className="text-primary mb-3 font-serif text-xl">
                Entrega oriental
              </h3>
              <p className="text-on-surface-variant font-body text-sm">
                Cobertura rápida y segura en toda la zona oriental del país.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CATALOGS SECTION */}
      <section className="bg-surface px-8 py-20">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="text-primary mb-12 text-center font-serif text-4xl">
            Catálogos Especializados
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Card 1 */}
            <div className="group ambient-shadow relative h-64 cursor-pointer overflow-hidden rounded-xl">
              <div className="bg-primary/40 group-hover:bg-primary/30 absolute inset-0 z-10 transition-colors"></div>
              <div className="bg-surface-container-high absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-outline/30 text-6xl">
                  image
                </span>
              </div>
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="material-symbols-outlined mb-4 text-4xl">
                  medical_information
                </span>
                <h3 className="mb-2 font-serif text-2xl font-bold">
                  Sector Salud
                </h3>
                <p className="font-body text-sm opacity-90">
                  Uniformes para médicos, enfermería y clínicas.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group ambient-shadow relative h-64 cursor-pointer overflow-hidden rounded-xl">
              <div className="bg-primary/40 group-hover:bg-primary/30 absolute inset-0 z-10 transition-colors"></div>
              <div className="bg-surface-container-high absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-outline/30 text-6xl">
                  image
                </span>
              </div>
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="material-symbols-outlined mb-4 text-4xl">
                  school
                </span>
                <h3 className="mb-2 font-serif text-2xl font-bold">
                  Universidades
                </h3>
                <p className="font-body text-sm opacity-90">
                  Uniformes para facultades de salud y ciencias.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group ambient-shadow relative h-64 cursor-pointer overflow-hidden rounded-xl">
              <div className="bg-primary/40 group-hover:bg-primary/30 absolute inset-0 z-10 transition-colors"></div>
              <div className="bg-surface-container-high absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-outline/30 text-6xl">
                  image
                </span>
              </div>
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center text-white">
                <span className="material-symbols-outlined mb-4 text-4xl">
                  business
                </span>
                <h3 className="mb-2 font-serif text-2xl font-bold">Empresas</h3>
                <p className="font-body text-sm opacity-90">
                  Dotaciones corporativas y uniformes de trabajo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. POPULAR PRODUCTS */}
      <section className="bg-surface-container-low px-8 py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-primary font-serif text-4xl">Más Vendidos</h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Prod 1 */}
            <div className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white">
              <div className="bg-surface-container relative flex aspect-[4/3] items-center justify-center p-4">
                <span className="bg-secondary absolute top-4 left-4 flex items-center gap-1 rounded px-2 py-1 text-xs font-bold text-white">
                  <span className="material-symbols-outlined text-[12px]">
                    local_fire_department
                  </span>{" "}
                  Popular
                </span>
                <div className="bg-surface-container-high border-outline-variant/30 flex h-full w-full items-center justify-center rounded border">
                  <span className="material-symbols-outlined text-outline text-4xl">
                    image
                  </span>
                </div>
              </div>
              <div className="flex flex-grow flex-col p-5">
                <h3 className="text-on-surface mb-1 font-serif text-lg">
                  Gorro Quirúrgico Estampado
                </h3>
                <p className="text-on-surface-variant font-body font-semibold">
                  $12.00
                </p>
              </div>
            </div>

            {/* Prod 2 */}
            <div className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white">
              <div className="bg-surface-container relative flex aspect-[4/3] items-center justify-center p-4">
                <span className="bg-secondary absolute top-4 left-4 flex items-center gap-1 rounded px-2 py-1 text-xs font-bold text-white">
                  <span className="material-symbols-outlined text-[12px]">
                    local_fire_department
                  </span>{" "}
                  Popular
                </span>
                <div className="bg-surface-container-high border-outline-variant/30 flex h-full w-full items-center justify-center rounded border">
                  <span className="material-symbols-outlined text-outline text-4xl">
                    image
                  </span>
                </div>
              </div>
              <div className="flex flex-grow flex-col p-5">
                <h3 className="text-on-surface mb-1 font-serif text-lg">
                  Pantalón Cargo &quot;Resilience&quot;
                </h3>
                <p className="text-on-surface-variant font-body font-semibold">
                  $25.00
                </p>
              </div>
            </div>

            {/* Prod 3 */}
            <div className="group ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white">
              <div className="bg-surface-container relative flex aspect-[4/3] items-center justify-center p-4">
                <span className="bg-secondary absolute top-4 left-4 flex items-center gap-1 rounded px-2 py-1 text-xs font-bold text-white">
                  <span className="material-symbols-outlined text-[12px]">
                    local_fire_department
                  </span>{" "}
                  Popular
                </span>
                <div className="bg-surface-container-high border-outline-variant/30 flex h-full w-full items-center justify-center rounded border">
                  <span className="material-symbols-outlined text-outline text-4xl">
                    image
                  </span>
                </div>
              </div>
              <div className="flex flex-grow flex-col p-5">
                <h3 className="text-on-surface mb-1 font-serif text-lg">
                  Chaqueta Médica Antifluido
                </h3>
                <p className="text-on-surface-variant font-body font-semibold">
                  $40.00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. PROCESS SECTION */}
      <section className="bg-primary px-8 py-24 text-white">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 font-serif text-4xl">
              ¿Cómo funciona un pedido a medida?
            </h2>
            <p className="text-primary-container mx-auto max-w-2xl text-lg">
              Un proceso sencillo para asegurar que tu uniforme sea perfecto
              para ti.
            </p>
          </div>
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            {/* Line connector for desktop */}
            <div className="bg-primary-container/30 absolute top-12 right-[10%] left-[10%] z-0 hidden h-0.5 md:block"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-primary ambient-shadow mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white font-serif text-3xl font-bold">
                1
              </div>
              <h3 className="mb-2 font-serif text-xl">Elige el modelo</h3>
              <p className="text-primary-container text-sm">
                Explora nuestro catálogo o trae tu propio diseño.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-primary ambient-shadow mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white font-serif text-3xl font-bold">
                2
              </div>
              <h3 className="mb-2 font-serif text-xl">Selecciona la tela</h3>
              <p className="text-primary-container text-sm">
                Antifluidos, spandex, o algodón. Tenemos opciones para cada
                necesidad.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-primary ambient-shadow mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white font-serif text-3xl font-bold">
                3
              </div>
              <h3 className="mb-2 font-serif text-xl">Toma de medidas</h3>
              <p className="text-primary-container text-sm">
                Ajustamos el patrón a tu cuerpo para una comodidad total.
              </p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="text-primary ambient-shadow mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white font-serif text-3xl font-bold">
                4
              </div>
              <h3 className="mb-2 font-serif text-xl">Entrega</h3>
              <p className="text-primary-container text-sm">
                Recibe tu uniforme listo para usar en tu lugar de trabajo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TESTIMONIALS */}
      <section className="bg-[#f4f5f7] px-8 py-24">
        <div className="mx-auto max-w-screen-2xl">
          <h2 className="text-primary mb-16 text-center font-serif text-4xl">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="ambient-shadow rounded-xl bg-white p-8">
              <div className="text-tertiary mb-4 flex gap-1">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
              </div>
              <p className="text-on-surface-variant font-body mb-6 italic">
                &quot;La calidad de la tela es excelente y el bordado de mi logo
                quedó perfecto. Totalmente recomendados en San Miguel.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-surface-container text-secondary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                  M
                </div>
                <div>
                  <h4 className="text-on-surface font-serif font-bold">
                    Dra. María Hernández
                  </h4>
                  <span className="text-secondary text-xs">
                    Doctora General
                  </span>
                </div>
              </div>
            </div>

            <div className="ambient-shadow rounded-xl bg-white p-8">
              <div className="text-tertiary mb-4 flex gap-1">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
              </div>
              <p className="text-on-surface-variant font-body mb-6 italic">
                &quot;Los uniformes para nuestro grupo de prácticas clínicas
                quedaron a la medida. El servicio al cliente fue muy
                atento.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-surface-container text-secondary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                  C
                </div>
                <div>
                  <h4 className="text-on-surface font-serif font-bold">
                    Carlos R.
                  </h4>
                  <span className="text-secondary text-xs">Estudiante UES</span>
                </div>
              </div>
            </div>

            <div className="ambient-shadow rounded-xl bg-white p-8">
              <div className="text-tertiary mb-4 flex gap-1">
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star</span>
                <span className="material-symbols-outlined">star_half</span>
              </div>
              <p className="text-on-surface-variant font-body mb-6 italic">
                &quot;Excelente opción para renovar mis filipinas. Son muy
                cómodas para turnos largos y la tela no se decolora
                fácilmente.&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="bg-surface-container text-secondary flex h-12 w-12 items-center justify-center rounded-full font-bold">
                  L
                </div>
                <div>
                  <h4 className="text-on-surface font-serif font-bold">
                    Lic. Laura Gómez
                  </h4>
                  <span className="text-secondary text-xs">Enfermera</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. UNIVERSITY LOGOS */}
      <section className="border-surface-variant/50 border-b bg-white px-8 py-12">
        <div className="mx-auto max-w-screen-xl">
          <p className="font-label text-secondary mb-8 text-center text-sm tracking-widest uppercase">
            Confeccionamos uniformes para estudiantes de:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 md:gap-16">
            <span className="font-serif text-xl font-bold">UES Oriental</span>
            <span className="font-serif text-xl font-bold">UGB</span>
            <span className="font-serif text-xl font-bold">Andrés Bello</span>
            <span className="font-serif text-xl font-bold">UNIVO</span>
            <span className="font-serif text-xl font-bold">UMA</span>
            <span className="font-serif text-xl font-bold">IEPROES</span>
          </div>
        </div>
      </section>

      {/* 12. INSTITUTIONAL BANNER */}
      <section className="bg-primary px-8 py-20 text-white">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="md:w-2/3">
            <h2 className="mb-4 font-serif text-3xl md:text-4xl">
              ¿Necesitas dotación para tu clínica o grupo de estudiantes?
            </h2>
            <p className="text-primary-container text-lg">
              Ofrecemos descuentos especiales por volumen, toma de medidas en
              tus instalaciones y bordado institucional.
            </p>
          </div>
          <div className="justify-md-end flex md:w-1/3">
            <button className="text-primary font-body hover:bg-surface-container w-full rounded-md bg-white px-8 py-4 font-bold transition-colors md:w-auto">
              Solicitar cotización
            </button>
          </div>
        </div>
      </section>

      {/* 13. BLOG PREVIEW */}
      <section className="bg-surface px-8 py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-primary font-serif text-4xl">Nuestro Blog</h2>
            <Link
              href="/blog"
              className="text-primary font-body flex items-center gap-1 text-sm font-semibold tracking-wider uppercase hover:underline"
            >
              Ver todos{" "}
              <span className="material-symbols-outlined text-[18px]">
                arrow_forward
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <article className="ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white">
              <div className="bg-surface-container-high flex h-48 items-center justify-center">
                <span className="material-symbols-outlined text-outline text-4xl">
                  image
                </span>
              </div>
              <div className="flex flex-grow flex-col p-6">
                <span className="text-secondary mb-2 text-xs">
                  15 Octubre, 2024
                </span>
                <h3 className="text-on-surface mb-3 font-serif text-xl">
                  ¿Cómo elegir la tela ideal para tu scrub?
                </h3>
                <p className="text-on-surface-variant mb-4 text-sm">
                  Conoce las diferencias entre antifluido, spandex y algodón
                  para encontrar tu comodidad ideal.
                </p>
                <Link
                  href="/blog/como-elegir-tela"
                  className="text-primary mt-auto text-sm font-semibold hover:underline"
                >
                  Leer artículo
                </Link>
              </div>
            </article>

            <article className="ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white">
              <div className="bg-surface-container-high flex h-48 items-center justify-center">
                <span className="material-symbols-outlined text-outline text-4xl">
                  image
                </span>
              </div>
              <div className="flex flex-grow flex-col p-6">
                <span className="text-secondary mb-2 text-xs">
                  02 Septiembre, 2024
                </span>
                <h3 className="text-on-surface mb-3 font-serif text-xl">
                  Cuidados esenciales para prolongar la vida de tu uniforme
                </h3>
                <p className="text-on-surface-variant mb-4 text-sm">
                  Tips de lavado y planchado para mantener el color y la
                  integridad de las telas certificadas.
                </p>
                <Link
                  href="/blog/cuidados-esenciales"
                  className="text-primary mt-auto text-sm font-semibold hover:underline"
                >
                  Leer artículo
                </Link>
              </div>
            </article>

            <article className="ambient-shadow border-surface-variant flex flex-col overflow-hidden rounded-xl border bg-white">
              <div className="bg-surface-container-high flex h-48 items-center justify-center">
                <span className="material-symbols-outlined text-outline text-4xl">
                  image
                </span>
              </div>
              <div className="flex flex-grow flex-col p-6">
                <span className="text-secondary mb-2 text-xs">
                  18 Agosto, 2024
                </span>
                <h3 className="text-on-surface mb-3 font-serif text-xl">
                  Tendencias en colores de uniformes médicos 2024
                </h3>
                <p className="text-on-surface-variant mb-4 text-sm">
                  Descubre cuáles son los colores que transmiten más
                  profesionalismo y calma a tus pacientes.
                </p>
                <Link
                  href="/blog/tendencias-colores"
                  className="text-primary mt-auto text-sm font-semibold hover:underline"
                >
                  Leer artículo
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
