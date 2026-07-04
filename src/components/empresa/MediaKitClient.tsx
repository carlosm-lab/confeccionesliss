"use client";
import Image from "next/image";
import Link from "next/link";

export default function MediaKitClient() {
  return (
    <div className="overflow-x-hidden bg-[#f8f9fb] font-sans text-[#191c1e] antialiased selection:bg-[#143067]/10 selection:text-[#143067]">
      {/* ──────────────────────────────────────────────────────── */}
      {/* HERO — Split 60/40 */}
      {/* ──────────────────────────────────────────────────────── */}
      <header className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 pt-4 pb-10 md:px-8 md:pt-6">
        <div className="border-primary/35 flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:max-h-[380px] md:flex-row md:p-8">
          {/* Columna Izquierda: Textos */}
          <div className="space-y-4 md:w-3/5">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Recursos de Marca
            </span>
            <h1 className="font-serif text-3xl leading-tight font-bold text-[#143067] md:text-5xl">
              Media Kit
            </h1>
            <p className="font-serif text-sm leading-relaxed text-[#444650] md:text-base">
              Recursos oficiales para medios de comunicación, periodistas,
              creadores de contenido, instituciones y colaboradores.
            </p>
            <p className="max-w-xl text-xs leading-relaxed text-[#444650]">
              Esta página reúne los recursos oficiales de Confecciones Liss para
              facilitar el uso correcto de la marca en publicaciones, notas de
              prensa, colaboraciones y proyectos institucionales.
            </p>

            {/* Botones */}
            <div className="grid w-full grid-cols-2 gap-2 pt-2 sm:flex sm:w-auto">
              <a
                href="/logo.png"
                download
                className="flex items-center justify-center rounded-lg bg-[#143067] px-4 py-2.5 text-center font-mono text-[10px] tracking-wider text-white uppercase transition-opacity hover:opacity-80"
              >
                Descargar Logos
              </a>
              <Link
                href="/catalogo"
                className="flex items-center justify-center rounded-lg border border-[#143067] px-4 py-2.5 text-center font-mono text-[10px] tracking-wider text-[#143067] uppercase transition-colors hover:bg-[#143067]/5"
              >
                Ver Catálogo
              </Link>
            </div>
          </div>

          {/* Columna Derecha: Logo real */}
          <div className="flex items-center justify-center p-4 md:w-2/5">
            <Image
              src="/logo.png"
              alt="Logotipo Confecciones Liss"
              width={220}
              height={110}
              className="h-auto w-full max-w-[220px] object-contain"
              priority
            />
          </div>
        </div>
      </header>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 1: IDENTIDAD VISUAL */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto min-h-[500px] max-w-[1600px] border-b border-[#e1e2e5] px-5 py-12 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
          {/* Columna Izquierda (30%) */}
          <div className="space-y-4 lg:col-span-4">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Especificaciones
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Identidad Visual
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
            <p className="max-w-sm text-xs leading-relaxed text-[#444650]">
              Nuestra identidad visual representa precisión, orden y
              profesionalidad. A continuación se presentan las variaciones de
              logotipo autorizadas y los colores del taller.
            </p>
          </div>

          {/* Columna Derecha (70% — 8 módulos) */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {/* Módulo 1: Logo Principal */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-mono text-[9px] text-[#444650]/60">
                01 // LOGO PRINCIPAL
              </span>
              <div className="my-auto flex flex-1 items-center justify-center py-2">
                <Image
                  src="/logo.png"
                  alt="Logotipo Confecciones Liss — versión principal"
                  width={240}
                  height={240}
                  className="h-auto max-h-[80%] w-[80%] object-contain"
                />
              </div>
              <span className="text-center font-mono text-[9px] font-bold text-[#143067]">
                USO ESTÁNDAR
              </span>
            </div>

            {/* Módulo 2: Logo Monocromático */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-[#f8f9fb] p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-mono text-[9px] text-[#444650]/60">
                02 // MONOCROMÁTICO
              </span>
              <div className="my-auto flex flex-1 items-center justify-center py-2">
                <Image
                  src="/logo.png"
                  alt="Logotipo Confecciones Liss — versión monocromática"
                  width={240}
                  height={240}
                  className="h-auto max-h-[80%] w-[80%] object-contain grayscale"
                />
              </div>
              <span className="text-center font-mono text-[9px] text-[#444650]">
                GRIS ALTA RESOLUCIÓN
              </span>
            </div>

            {/* Módulo 3: Logo Negativo */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-[#143067] p-4 text-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-mono text-[9px] text-white/60">
                03 // NEGATIVO
              </span>
              <div className="my-auto flex flex-1 items-center justify-center py-2">
                <Image
                  src="/logo.png"
                  alt="Logotipo Confecciones Liss — versión negativa"
                  width={240}
                  height={240}
                  className="h-auto max-h-[80%] w-[80%] object-contain brightness-0 invert"
                />
              </div>
              <span className="text-center font-mono text-[9px] text-white/80">
                FONDO OSCURO
              </span>
            </div>

            {/* Módulo 4: Color Primario */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-[#143067] p-4 text-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-mono text-[9px] text-white/60">
                04 // COLOR PRIMARIO
              </span>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold">Azul Marino</p>
                <p className="font-mono text-[9px] text-white/80">
                  HEX: #143067
                </p>
                <p className="font-mono text-[9px] text-white/80">
                  RGB: 20, 48, 103
                </p>
              </div>
              <span className="font-mono text-[9px] text-white/80">
                PRIMARIO INSTITUCIONAL
              </span>
            </div>

            {/* Módulo 5: Color Acento */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-[#b43024] p-4 text-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-mono text-[9px] text-white/60">
                05 // COLOR ACENTO
              </span>
              <div className="space-y-1">
                <p className="font-serif text-lg font-bold">Rojo Terracota</p>
                <p className="font-mono text-[9px] text-white/80">
                  HEX: #b43024
                </p>
                <p className="font-mono text-[9px] text-white/80">
                  RGB: 180, 48, 36
                </p>
              </div>
              <span className="font-mono text-[9px] text-white/80">
                ACENTO Y CONTRASTE
              </span>
            </div>

            {/* Módulo 6: Tipografía Noto Serif */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-mono text-[9px] text-[#444650]/60">
                06 // TIPOGRAFÍA SERIF
              </span>
              <div className="py-2">
                <p className="font-serif text-2xl font-bold text-[#143067]">
                  Noto Serif
                </p>
                <p className="mt-1 font-serif text-xs text-[#444650]">
                  Abc 123
                </p>
              </div>
              <span className="font-mono text-[9px] leading-none text-[#444650]">
                USO EXCLUSIVO EN TÍTULOS
              </span>
            </div>

            {/* Módulo 7: Tipografía Manrope */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="font-mono text-[9px] text-[#444650]/60">
                07 // TIPOGRAFÍA SANS
              </span>
              <div className="py-2 font-sans">
                <p className="text-xl font-bold text-[#143067]">Manrope</p>
                <p className="mt-1 text-xs text-[#444650]">Abc 123</p>
              </div>
              <span className="font-mono text-[9px] leading-none text-[#444650]">
                USO EN CUERPO DE TEXTO
              </span>
            </div>

            {/* Módulo 8: Zona de Protección */}
            <div className="border-primary/35 flex aspect-square flex-col justify-between rounded-2xl border bg-[#f8f9fb] p-4 font-mono text-[9px] text-[#444650] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <span className="text-[#444650]/60">08 // REGLA DE MARGEN</span>
              <div className="my-auto rounded-xl border border-dashed border-[#143067] p-3 text-center">
                <p className="font-bold text-[#143067]">MARGEN X</p>
                <p className="mt-1 text-[8px] text-[#444650]">
                  Espacio libre obligatorio de 20px alrededor.
                </p>
              </div>
              <span>PROTECCIÓN DE MARCA</span>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 2: DESCRIPCIÓN OFICIAL */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Columna Izquierda: Textos */}
          <div className="space-y-6 lg:col-span-6">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Biografía Oficial
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Descripción oficial de la marca
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>

            <div className="space-y-4 text-sm leading-relaxed text-[#444650]">
              <p>
                Confecciones Liss es una empresa familiar especializada en la
                confección de uniformes escolares, empresariales y médicos.
                Desde nuestros inicios hemos combinado experiencia práctica,
                especialización técnica y transformación digital para ofrecer
                prendas de calidad adaptadas a las necesidades de cada cliente.
              </p>
              <p>
                Nuestra historia comenzó en 2005 y desde entonces hemos
                evolucionado hasta convertirnos en un taller especializado con
                presencia digital y un equipo multidisciplinario.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Cita */}
          <div className="space-y-6 lg:col-span-6">
            <div className="border-primary/35 rounded-2xl border bg-[#143067] p-6 text-white shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <p className="text-center font-serif text-xl text-[#dae2ff] italic md:text-2xl">
                &ldquo;La confianza también se confecciona.&rdquo;
              </p>
            </div>

            <div className="border-primary/35 relative aspect-[16/9] w-full overflow-hidden rounded-2xl border bg-[#f8f9fb] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDql6RAV4sbPJQGYiXijV7KHGzjJUep7ygJh0aamJxp9_KY2wPDDgZuqgHyZ2hSX5FHdJ0_zeDOOcmveyy3URfYQuwBDOHHaeKJnJtwfHT8R4APNmQ4dC5IeR89-M-GRnMhKL3Mrmz4RIrW6UfXKZPfojqoPElzWRv7xPnZzlzYWzxpMNKA05CvKHF38tVCtOs7SaFpaAbA0baMp_63_ivw10zgiOvHS0bReDbkD2_GAibQocZlAk9zBix5wNco3k5Ph_kMGvT35cY"
                alt="Taller de confección textil"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* NUEVA SECCIÓN A: TRAYECTORIA Y ALCANCE */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-10 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            En Cifras
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Trayectoria y alcance
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
          <p className="max-w-2xl text-sm leading-relaxed text-[#444650]">
            Datos verificables sobre nuestra operación, útiles para
            colaboraciones, notas de prensa y alianzas institucionales.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {[
            {
              cifra: "20+ años",
              etiqueta: "De trayectoria en confección, desde 2005",
            },
            {
              cifra: "2021",
              etiqueta: "Año de constitución formal del taller",
            },
            {
              cifra: "3 sectores",
              etiqueta: "Uniformes escolares, médicos y empresariales",
            },
            { cifra: "8 personas", etiqueta: "Equipo especializado por área" },
            {
              cifra: "San Miguel",
              etiqueta:
                "Origen y operación, con cobertura de envío a nivel nacional",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="border-primary/35 flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]"
            >
              <p className="font-serif text-2xl font-bold text-[#143067] md:text-3xl">
                {stat.cifra}
              </p>
              <p className="mt-3 font-mono text-[10px] leading-snug text-[#444650]">
                {stat.etiqueta}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* NUEVA SECCIÓN B: CASOS DESTACADOS */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-10 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Colaboraciones Institucionales
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Casos destacados
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
          <p className="max-w-2xl text-sm leading-relaxed text-[#444650]">
            Algunos de los proyectos que reflejan nuestra capacidad de trabajo
            institucional y en volumen.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            {
              titulo: "Ministerio de Educación de El Salvador",
              periodo: "2009 – 2011",
              descripcion:
                "Confección de uniformes escolares completos para los alumnos del Centro Escolar Profesor Jorge Salomón Granados (código 12855).",
            },
            {
              titulo: "Producción industrial en San Miguel",
              periodo: "2012 – 2019",
              descripcion:
                "Colaboración con talleres de confección industrial de San Miguel, con experiencia en producción de gran volumen y estandarización de procesos.",
            },
            {
              titulo: "Uniformes médicos institucionales",
              periodo: "Desde 2021",
              descripcion:
                "Confección de scrubs y uniformes médicos para profesionales y consultorios de la región oriental de El Salvador.",
            },
          ].map((caso, i) => (
            <div
              key={i}
              className="border-primary/35 flex flex-col justify-between space-y-4 rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]"
            >
              <div className="space-y-2">
                <span className="font-mono text-[9px] font-bold tracking-widest text-[#143067]/60 uppercase">
                  {caso.periodo}
                </span>
                <h3 className="font-serif text-base font-bold text-[#143067]">
                  {caso.titulo}
                </h3>
                <p className="text-xs leading-relaxed text-[#444650]">
                  {caso.descripcion}
                </p>
              </div>
              <div className="h-0.5 w-8 rounded-full bg-[#143067]/30"></div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 3: USO CORRECTO DE LA MARCA */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-12 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Normas de Aplicación
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Uso correcto de la marca
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Correcto 1 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-green-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-green-800 uppercase">
              CORRECTO
            </span>
            <div className="border-primary/35 flex aspect-[4/3] items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <Image
                src="/logo.png"
                alt="Logo sobre fondo claro — uso correcto"
                width={240}
                height={240}
                className="h-auto max-h-[80%] w-[80%] object-contain"
              />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Uso del logotipo sobre fondos claros
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              El logo principal debe presentarse preferiblemente sobre fondos
              blancos o grises claros.
            </p>
          </div>

          {/* Correcto 2 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-green-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-green-800 uppercase">
              CORRECTO
            </span>
            <div className="border-primary/35 flex aspect-[4/3] items-center justify-center rounded-2xl border bg-[#143067] p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <Image
                src="/logo.png"
                alt="Logo negativo sobre fondo oscuro — uso correcto"
                width={240}
                height={240}
                className="h-auto max-h-[80%] w-[80%] object-contain brightness-0 invert"
              />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Respeto de colores institucionales
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              Sobre fondos corporativos oscuros (#143067) se debe emplear el
              logotipo en versión negativa, generada con el mismo filtro usado
              en el pie de página del sitio.
            </p>
          </div>

          {/* Incorrecto 1 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-red-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-red-800 uppercase">
              INCORRECTO
            </span>
            <div className="border-primary/35 flex aspect-[4/3] items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <Image
                src="/logo.png"
                alt="Logo con color alterado — uso incorrecto"
                width={240}
                height={240}
                className="h-auto max-h-[80%] w-[80%] object-contain hue-rotate-[240deg] saturate-[2]"
              />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Modificar colores
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              Queda prohibida la alteración del color principal azul marino o el
              uso de gradientes sobre el logotipo.
            </p>
          </div>

          {/* Incorrecto 2 */}
          <div className="space-y-4">
            <span className="inline-block rounded bg-red-100 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-red-800 uppercase">
              INCORRECTO
            </span>
            <div className="border-primary/35 flex aspect-[4/3] items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <Image
                src="/logo.png"
                alt="Logo deformado — uso incorrecto"
                width={240}
                height={240}
                className="h-auto max-h-[80%] w-[80%] scale-x-[1.5] object-contain"
              />
            </div>
            <h3 className="font-serif text-sm font-bold text-[#143067]">
              Deformar el logotipo
            </h3>
            <p className="text-xs leading-relaxed text-[#444650]">
              Queda prohibido comprimir, estirar o sesgar los ejes
              proporcionales del logotipo.
            </p>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 4: INFORMACIÓN INSTITUCIONAL */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Tabla de Información */}
          <div className="space-y-6">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Datos Institucionales
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Información institucional
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>

            <div className="border-primary/35 overflow-hidden rounded-2xl border shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
              <table className="w-full text-left font-mono text-xs text-[#444650]">
                <tbody className="divide-y divide-[#e1e2e5]">
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Fundación del oficio
                    </td>
                    <td className="bg-white p-4">2005</td>
                  </tr>
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Constitución del taller
                    </td>
                    <td className="bg-white p-4">2021</td>
                  </tr>
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Ubicación
                    </td>
                    <td className="bg-white p-4">
                      Barrio La Merced, San Miguel
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-[#f8f9fb] p-4 font-bold text-[#143067]">
                      Especialidad
                    </td>
                    <td className="bg-white p-4">
                      <p>· Uniformes escolares</p>
                      <p>· Uniformes empresariales</p>
                      <p>· Uniformes médicos</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Placeholder Fotografía */}
          <div className="border-primary/35 relative flex aspect-[16/10] w-full flex-col justify-between overflow-hidden rounded-2xl border bg-[#f8f9fb] p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "radial-gradient(#143067 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            ></div>

            <div className="flex items-center justify-between font-mono text-[9px] text-[#444650]">
              <span>Fotografía de Taller Industrial</span>
              <span className="font-bold text-[#143067]">PLACEHOLDER</span>
            </div>

            <div className="my-auto flex flex-col items-center justify-center py-8 text-[#143067]/40">
              <svg
                className="mb-2 h-12 w-12 fill-none stroke-current stroke-1"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M 3,7 L 3,19 L 21,19 L 21,7 L 17,7 L 15,4 L 9,4 L 7,7 Z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <span className="font-mono text-[10px] text-[#444650]">
                [Placeholder — pendiente de fotografía oficial]
              </span>
            </div>

            <div className="text-right font-mono text-[9px] text-[#444650]/60">
              Dimensiones: 1920px x 1200px
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 5: EQUIPO PARA PRENSA */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-12 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Contactos Autorizados
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Equipo para prensa
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-8">
          {[
            {
              name: "Lisseth Molina",
              role: "Directora General",
              spec: "Diseño y patronaje",
            },
            {
              name: "Lilian Romero",
              role: "Especialista en Confección",
              spec: "Confección de uniformes",
            },
            {
              name: "Nubia Vázquez",
              role: "Especialista en Confección",
              spec: "Confección de prendas",
            },
            {
              name: "Carlos Antonio Molina",
              role: "Logística",
              spec: "Despacho y entregas",
            },
            {
              name: "René Alfonso Méndez",
              role: "Control de Calidad",
              spec: "Toma de medidas e inspección",
            },
            {
              name: "Carlos José Molina",
              role: "Estrategia Digital",
              spec: "Ecosistema digital",
            },
            {
              name: "Jackeline Lisseth",
              role: "Modelo Institucional",
              spec: "Imagen de marca",
            },
            {
              name: "Liam Alejandro",
              role: "Modelo Institucional",
              spec: "Imagen de marca",
            },
          ].map((member, index) => (
            <div
              key={index}
              className="border-primary/35 hover:border-primary/55 flex min-h-[160px] flex-col justify-between rounded-2xl border bg-white p-4 text-center shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_45px_15px_rgba(20,48,103,0.26),0_0_20px_5px_rgba(20,48,103,0.16)]"
            >
              <div className="space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#143067]/10 font-serif text-xs font-bold text-[#143067]">
                  {member.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-serif text-xs leading-tight font-bold text-[#143067]">
                    {member.name}
                  </h3>
                  <p className="mt-1 font-mono text-[9px] font-bold text-[#143067]">
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="mt-2 border-t border-[#e1e2e5] pt-2 font-mono text-[8px] text-[#444650]">
                {member.spec}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* NUEVA SECCIÓN C: SERVICIOS Y CATÁLOGO */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-8 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Servicios
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Servicios y catálogo
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
          <p className="max-w-2xl text-sm leading-relaxed text-[#444650]">
            Para información detallada sobre nuestros servicios, productos y
            precios, consulta nuestro catálogo o contáctanos directamente para
            una cotización personalizada.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/catalogo"
            className="rounded-lg bg-[#143067] px-6 py-3 font-mono text-[11px] tracking-wider text-white uppercase shadow-md transition-opacity hover:opacity-80"
          >
            Ver Catálogo
          </Link>
          <Link
            href="/servicios"
            className="rounded-lg border border-[#143067] px-6 py-3 font-mono text-[11px] tracking-wider text-[#143067] uppercase shadow-sm transition-colors hover:bg-[#143067]/5"
          >
            Ver Servicios
          </Link>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 6: RECURSOS DISPONIBLES */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="mb-12 space-y-3">
          <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
            Descargas Públicas
          </span>
          <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
            Recursos disponibles
          </h2>
          <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>
        </div>

        {/* Card única — único recurso disponible actualmente */}
        <div className="border-primary/35 hover:border-primary/55 flex max-w-sm items-center justify-between gap-6 rounded-2xl border bg-white p-5 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] transition-all duration-300">
          <div className="space-y-1">
            <p className="font-serif text-sm font-bold text-[#143067]">
              Logotipo oficial
            </p>
            <p className="font-mono text-[10px] text-[#444650]">Formato: PNG</p>
          </div>
          <a
            href="/logo.png"
            download
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-[#143067] px-4 py-2 font-mono text-[10px] tracking-wider text-white uppercase shadow-md transition-opacity hover:opacity-80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Descargar
          </a>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE 7: INFORMACIÓN PARA MEDIOS */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[1600px] border-b border-[#e1e2e5] px-5 py-16 md:px-8">
        <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-16">
          {/* Columna Izquierda: Bio */}
          <div className="space-y-4 lg:col-span-7">
            <span className="font-mono text-xs font-bold tracking-widest text-[#143067] uppercase">
              Resumen de Prensa
            </span>
            <h2 className="font-serif text-2xl text-[#143067] md:text-3xl">
              Información para medios
            </h2>
            <div className="h-0.5 w-12 rounded-full bg-[#143067]"></div>

            <div className="space-y-4 pr-4 text-sm leading-relaxed text-[#444650]">
              <h3 className="font-serif text-base font-bold text-[#143067]">
                Biografía institucional
              </h3>
              <p>
                Confecciones Liss es una empresa salvadoreña especializada en la
                confección de uniformes escolares, empresariales y médicos.
                Fundada oficialmente en 2021, pero con una trayectoria iniciada
                en 2005, combina experiencia práctica, especialización técnica y
                transformación digital para ofrecer soluciones textiles de
                calidad.
              </p>
            </div>
          </div>

          {/* Columna Derecha: Contacto */}
          <div className="border-primary/35 space-y-4 rounded-2xl border bg-white p-6 font-mono text-xs text-[#444650] shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] lg:col-span-5">
            <span className="block border-b border-[#e1e2e5] pb-2 font-bold tracking-wider text-[#143067] uppercase">
              DATOS DE CONTACTO
            </span>
            <div className="space-y-2">
              <p>
                · Correo:{" "}
                <span className="font-semibold text-[#191c1e]">
                  confeccionesliss.contacto@gmail.com
                </span>
              </p>
              <p>
                · Teléfono:{" "}
                <span className="font-semibold text-[#191c1e]">
                  +503 7331-7181
                </span>
              </p>
              <p>
                · Sitio Web:{" "}
                <span className="font-semibold text-[#191c1e]">
                  confeccionesliss.com
                </span>
              </p>
              <p>
                · Dirección:{" "}
                <span className="font-semibold text-[#191c1e]">
                  Barrio La Merced, San Miguel, El Salvador
                </span>
              </p>
              <p>
                · Redes:{" "}
                <span className="font-semibold text-[#191c1e]">
                  @confeccionliss
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────── */}
      {/* BLOQUE FINAL */}
      {/* ──────────────────────────────────────────────────────── */}
      <section className="relative flex h-[220px] items-center justify-center overflow-hidden border-t border-[#143067] bg-[#143067] px-5 py-12 text-center text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: "radial-gradient(white 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        ></div>

        <div className="relative z-10 mx-auto max-w-2xl space-y-4">
          <h2 className="font-serif text-lg font-bold md:text-xl">
            ¿Necesita material adicional?
          </h2>
          <p className="mx-auto max-w-lg text-xs leading-relaxed text-[#dae2ff]">
            Nuestro equipo puede proporcionar recursos específicos para medios,
            instituciones y colaboraciones cuando sea necesario.
          </p>
          <div className="pt-2">
            <Link
              href="/contacto"
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-6 py-3.5 font-sans text-[14px] font-semibold text-[#143067] shadow-sm transition-all hover:bg-[#dae2ff] hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-white"
            >
              Contactar al Equipo
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
