import Image from "next/image";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-surface-container-low relative flex h-[716px] items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkgh-SJ4HhJF21myYZEpjzecUi3SFjVaShXZPw-lNQ3UGZ4SeBGXLxsvTrZXJK2lFo_0Ij0410bf7SvmvjCodHclwvCiE8d7WYRiMGCgWz7ROWPR1ejFtYrBFflg0ol6W0WLllCM75U3kd2fwzIwWfFzc7fWunpPukJS2IDxIhLDMS7yBf02O2k0vGXQ1kTaWRM8XjDx5vy9nJQ1MHTQaqSVK9jEKjGtfEny6ogxiKE5SOwga7hL67oz7AtfBHuiqaioCtUkU8LOA"
            alt="Workshop Hero"
            fill
            className="object-cover"
          />
          <div className="bg-primary-container/60 absolute inset-0 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center">
          <span className="font-label mb-6 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs tracking-[0.2em] text-white/80 uppercase backdrop-blur-sm">
            Taller artesanal desde 2015
          </span>
          <h1 className="font-headline mb-6 text-5xl leading-tight font-light text-white italic drop-shadow-lg md:text-7xl">
            &quot;Cada puntada,
            <br />
            una promesa de calidad.&quot;
          </h1>
          <p className="font-body mx-auto max-w-2xl text-lg font-light tracking-wide text-white/90 md:text-xl">
            Confecciones Liss — San Miguel, El Salvador.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-surface-container-lowest relative z-20 px-6 py-24 md:px-12">
        <div className="mx-auto max-w-screen-xl">
          {/* Row 1 */}
          <div className="mb-24 grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="order-2 space-y-6 lg:order-1">
              <div className="bg-primary/20 mb-8 h-0.5 w-12"></div>
              <h2 className="font-headline text-primary text-4xl font-medium tracking-tight md:text-5xl">
                Nuestra historia
              </h2>
              <div className="font-body text-on-surface-variant space-y-4 text-lg leading-relaxed font-light">
                <p>
                  Nacimos en el corazón de San Miguel con una máquina de coser y
                  una visión clara: elevar el estándar del uniforme médico en
                  oriente. Lo que comenzó como un pequeño taller familiar se ha
                  transformado en un referente de precisión y durabilidad.
                </p>
                <p>
                  Entendemos que un uniforme no es solo tela; es la armadura
                  diaria de quienes dedican su vida a cuidar la de otros. Por
                  eso, cada pieza que sale de nuestro taller lleva impreso un
                  compromiso inquebrantable con la excelencia.
                </p>
                <p>
                  Nuestra misión es confeccionar prendas que ofrezcan confort
                  absoluto, resistencia excepcional y un diseño que dignifique
                  la labor de los profesionales de la salud en El Salvador.
                </p>
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  className="font-label text-primary border-primary/20 hover:border-primary hover:bg-surface-container-low flex items-center space-x-2 rounded-lg border px-8 py-3 text-sm font-medium transition-all duration-300"
                >
                  <span>Conoce nuestro proceso</span>
                  <span className="material-symbols-outlined text-sm font-light">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="bg-surface-container-low absolute -inset-4 rotate-2 transform rounded-xl"></div>
              <div className="bg-surface-container-high relative z-10 aspect-[4/3] w-full overflow-hidden rounded-lg shadow-[0_20px_40px_-12px_rgba(20,48,103,0.1)]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe-ofAogmiiLZh4HTmSJUQR8Ks-Xbv8okZDJX7lmB4C86FK2mQ3eFHsHiP_MIt_oUtJYXxJfm7ZV3Iq4WW5milDCwHJfjKWD5fldvXeie0-UMa5Up7FDD46gWhGW-U03mqoPpnFdcHTTQbhd_3rRq6TpGOkpz-uRdaYBpKgxlSYEZ-e1iWsWkRGc74xStNUI6Le2oyGqrqVIvGuvMPDueUmdzlFga6frGHQQRt6E8M3ZvsN3ZbSRSds_dpCsrIkLQxBeAa43JLdjw"
                  alt="Our origins"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="bg-secondary-fixed absolute -inset-4 -rotate-2 transform rounded-xl"></div>
              <div className="bg-surface-container-high relative z-10 aspect-[4/3] w-full overflow-hidden rounded-lg shadow-[0_20px_40px_-12px_rgba(20,48,103,0.1)]">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy9bd2qqmR3p09Kg45PgBkbn06mR936QQtHHAfu389TcG55g3KhxXrFBaMPEO1392cqpetBmeiBqsz-7t9vZwAPVOt5kcDFgsxlgt2v_idouYHzArszr64BBsu1xQDSqxyZzVmfcX_gKjXBSxxM816lhWzG2U-7PurBJ7RGH7SXPauGmLBn-3o7R2aR0iJ2D6gtrXBAdLalFDfWT7PLJAYfs3OoEaW4w8TntHVHOtWlFAfAWxqPnIQNPkHMB7dkV_58TCBzMv__rY"
                  alt="Medical scrubs specialty"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-primary/20 mb-8 h-0.5 w-12"></div>
              <h3 className="font-headline text-primary text-3xl font-medium tracking-tight md:text-4xl">
                Especialistas en la salud
              </h3>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed font-light">
                Nos hemos especializado en el diseño y confección de pijamas
                quirúrgicas y gabachas médicas. Seleccionamos cuidadosamente
                textiles que repelen fluidos, resisten múltiples lavados
                industriales y mantienen su estructura, garantizando que el
                profesional luzca impecable en todo momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-primary-container px-6 py-24 text-white">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="font-headline mb-4 text-4xl font-medium text-white md:text-5xl">
              Nuestros valores
            </h2>
            <div className="mx-auto h-0.5 w-16 bg-white/20"></div>
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            {/* Value 1 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/10 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">
                  diamond
                </span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">
                Calidad artesanal
              </h4>
              <p className="font-body text-sm leading-relaxed font-light text-white/70">
                Atención meticulosa al detalle en cada costura y acabado.
              </p>
            </div>
            {/* Value 2 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/10 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">
                  health_and_safety
                </span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">
                Compromiso con la salud
              </h4>
              <p className="font-body text-sm leading-relaxed font-light text-white/70">
                Materiales seleccionados para la protección y confort del
                personal médico.
              </p>
            </div>
            {/* Value 3 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/10 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">
                  groups
                </span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">
                Atención personalizada
              </h4>
              <p className="font-body text-sm leading-relaxed font-light text-white/70">
                Asesoría individual para asegurar el ajuste perfecto de cada
                cliente.
              </p>
            </div>
            {/* Value 4 */}
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/5 bg-white/10 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">
                  eco
                </span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">
                Confección sostenible
              </h4>
              <p className="font-body text-sm leading-relaxed font-light text-white/70">
                Prácticas de producción que minimizan el desperdicio textil.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-surface-container-lowest px-6 py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-16">
            <h2 className="font-headline text-primary text-4xl font-medium tracking-tight md:text-5xl">
              Nuestro proceso de confección
            </h2>
            <p className="font-body text-on-surface-variant mt-4 text-lg font-light">
              De la idea a la prenda terminada, un viaje de precisión.
            </p>
          </div>
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="bg-outline-variant/30 absolute top-10 right-0 left-0 z-0 hidden h-[1px] lg:block"></div>
            <div className="relative z-10 grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-4">
              {/* Step 1 */}
              <div className="bg-surface-container-lowest relative flex flex-col rounded-xl p-4 lg:items-center">
                <div className="bg-surface-container-high relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">
                    forum
                  </span>
                  <div className="bg-primary font-label absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    1
                  </div>
                </div>
                <h4 className="font-body text-primary mb-2 text-lg font-semibold lg:text-center">
                  Consulta
                </h4>
                <p className="font-body text-on-surface-variant mb-4 text-sm font-light lg:text-center">
                  Análisis de necesidades y requerimientos específicos.
                </p>
              </div>
              {/* Step 2 */}
              <div className="bg-surface-container-lowest relative flex flex-col rounded-xl p-4 lg:items-center">
                <div className="bg-surface-container-high relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">
                    layers
                  </span>
                  <div className="bg-primary font-label absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    2
                  </div>
                </div>
                <h4 className="font-body text-primary mb-2 text-lg font-semibold lg:text-center">
                  Elección de tela
                </h4>
                <p className="font-body text-on-surface-variant mb-4 text-sm font-light lg:text-center">
                  Selección de textiles técnicos de alto rendimiento.
                </p>
              </div>
              {/* Step 3 */}
              <div className="bg-surface-container-lowest relative flex flex-col rounded-xl p-4 lg:items-center">
                <div className="bg-surface-container-high relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">
                    straighten
                  </span>
                  <div className="bg-primary font-label absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    3
                  </div>
                </div>
                <h4 className="font-body text-primary mb-2 text-lg font-semibold lg:text-center">
                  Toma de medidas
                </h4>
                <p className="font-body text-on-surface-variant mb-4 text-sm font-light lg:text-center">
                  Ajuste personalizado para máxima ergonomía.
                </p>
              </div>
              {/* Step 4 */}
              <div className="bg-surface-container-lowest relative flex flex-col rounded-xl p-4 lg:items-center">
                <div className="bg-surface-container-high relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">
                    content_cut
                  </span>
                  <div className="bg-primary font-label absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    4
                  </div>
                </div>
                <h4 className="font-body text-primary mb-2 text-lg font-semibold lg:text-center">
                  Confección
                </h4>
                <p className="font-body text-on-surface-variant mb-4 text-sm font-light lg:text-center">
                  Corte y costura en nuestro taller.
                </p>
                <span className="bg-secondary-container text-on-secondary-container font-label inline-block rounded-full px-3 py-1 text-[10px] font-bold uppercase">
                  3-7 días
                </span>
              </div>
              {/* Step 5 */}
              <div className="bg-surface-container-lowest relative flex flex-col rounded-xl p-4 lg:items-center">
                <div className="bg-surface-container-high relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-white shadow-sm">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">
                    fact_check
                  </span>
                  <div className="bg-primary font-label absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white">
                    5
                  </div>
                </div>
                <h4 className="font-body text-primary mb-2 text-lg font-semibold lg:text-center">
                  Control y entrega
                </h4>
                <p className="font-body text-on-surface-variant mb-4 text-sm font-light lg:text-center">
                  Inspección final de calidad y distribución.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[#f4f5f7] px-6 py-24">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-16 text-center">
            <h2 className="font-headline text-primary text-4xl font-medium tracking-tight md:text-5xl">
              Nuestro equipo
            </h2>
            <div className="bg-primary/20 mx-auto mt-6 h-0.5 w-16"></div>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Team Card 1 */}
            <div className="border-outline-variant/20 flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm">
              <div className="ring-primary/10 relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-sm ring-2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcmVPGry2MmCoOf43zD76fwT6J_fiGby9aQ_GzxwlRbgmXk2cGaSd4JEnRqcskOWV2winZg5sa3Rzj5_fOba1_ZVp28PeSOjSvIACeezlK1ufHMHyH0eMnNnKYnXwpQVZmiLMiL_6SQURKROFqa0NCBOVtfVqZBsuypKAQwSQaiTFtYfgJ0b04q9QTYinUF8Qeqf7nv7wmM-DJJMgngWrCMsnuHqlWyFxVuaMKClhXli1A5njaCzgW4UAPSV5aFRLjCy0d5JFePHQ"
                  alt="María López"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-body text-primary mb-1 text-lg font-bold">
                María López
              </h4>
              <p className="font-body text-secondary mb-3 text-sm">
                Costurera Principal
              </p>
              <span className="font-label bg-secondary-container text-on-secondary-container rounded-full px-2 py-1 text-[10px] font-bold uppercase">
                15 años de experiencia
              </span>
            </div>
            {/* Team Card 2 */}
            <div className="border-outline-variant/20 flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm">
              <div className="ring-primary/10 relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-sm ring-2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-CiCy2IRqQZpPSAvtnFXGVB7FhaP4j8P1YUpGnw-9ZZJNiFzkGQSA0Cq8bBrUt5OlCSlBzj3LaWJzbVh34LWqA96JvITnV9G-EMIFmFlhf8JtKGttLLS87WOegTnGBEJcHEnqOxG-SyQHvDpg8dIuczPXWb4CtI7pFgqW7eZ28D5fwwByCZkEw8NH_in8SG4wj9CZXaVzS3mgTVFkviJ9iMxhFxD1KkdvZHqTH79qPJ6EgULQuALqg3c3vGjFdBGpPOJ0ys-oh8A"
                  alt="Ana Martínez"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-body text-primary mb-1 text-lg font-bold">
                Ana Martínez
              </h4>
              <p className="font-body text-secondary mb-3 text-sm">
                Especialista en Corte
              </p>
              <span className="font-label bg-secondary-container text-on-secondary-container rounded-full px-2 py-1 text-[10px] font-bold uppercase">
                8 años de experiencia
              </span>
            </div>
            {/* Team Card 3 */}
            <div className="border-outline-variant/20 flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm">
              <div className="ring-primary/10 relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-sm ring-2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-9miYcsFmwtfjyZf3Wmt3BETmV5xARLJLqfdcSYDMr-4Gg2LoY-ROWfJduJ9dJqiCjfud1cCEELOfUx9r9_h8RrQn5sjocQCpibjRpBiEA56kZ-_-FXeJwafNdxqdf9gQepWYIUMJCFeYmE3BeLY_VEIvVUQo7ucadgtqhGusIrWcMGo3ffkwnDt2x0v-X5GO6uTO5tsumAS8rulk5wwcDi4MRowMnpZldjlVcxkB79QBgvdzlYjQGeUZl_2-EfMIB7e-V7NqX-I"
                  alt="Carlos Ruiz"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-body text-primary mb-1 text-lg font-bold">
                Carlos Ruiz
              </h4>
              <p className="font-body text-secondary mb-3 text-sm">
                Diseñador de Patrones
              </p>
              <span className="font-label bg-secondary-container text-on-secondary-container rounded-full px-2 py-1 text-[10px] font-bold uppercase">
                12 años de experiencia
              </span>
            </div>
            {/* Team Card 4 */}
            <div className="border-outline-variant/20 flex flex-col items-center rounded-2xl border bg-white p-6 text-center shadow-sm">
              <div className="ring-primary/10 relative mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-white shadow-sm ring-2">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCgfVXk_HxH3opa8M3Vg-K6YOvfXj1ZHz0cS7ig_kYHZrQbOeRzmma7y6gqRhmtbIctA6KS-66WbZpp_N9tYNPRM8z-xD82YBTbe261PcSz5S-WNLliixzbXMFh5v99df4CTZGiieto2ISMIQqAYRA63X1mj95AhA_o9JtaM-k2GrAJ9cn0g1zR_55XQB0DNq3e4oDACyXOq3WzoUA-mQiaiiAKNRjWpTR8PbOF8j4aHLBVkyBZbhjQoFjJg57bqTQwxlKDDpCh48"
                  alt="Rosa Santos"
                  fill
                  className="object-cover"
                />
              </div>
              <h4 className="font-body text-primary mb-1 text-lg font-bold">
                Rosa Santos
              </h4>
              <p className="font-body text-secondary mb-3 text-sm">
                Control de Calidad
              </p>
              <span className="font-label bg-secondary-container text-on-secondary-container rounded-full px-2 py-1 text-[10px] font-bold uppercase">
                20 años de experiencia
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-[#f0f4ff] px-6 py-20">
        <div className="mx-auto max-w-screen-xl">
          <div className="grid grid-cols-1 gap-12 text-center md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <p className="font-headline text-primary-container text-5xl font-bold">
                8+
              </p>
              <p className="font-body text-secondary text-sm font-medium tracking-wider uppercase">
                Años
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-headline text-primary-container text-5xl font-bold">
                2,000+
              </p>
              <p className="font-body text-secondary text-sm font-medium tracking-wider uppercase">
                Uniformes
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-headline text-primary-container text-5xl font-bold">
                6
              </p>
              <p className="font-body text-secondary text-sm font-medium tracking-wider uppercase">
                Universidades
              </p>
            </div>
            <div className="space-y-2">
              <p className="font-headline text-primary-container text-5xl font-bold">
                100%
              </p>
              <p className="font-body text-secondary text-sm font-medium tracking-wider uppercase">
                Hecho en San Miguel
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Strip */}
      <section className="border-outline-variant/20 border-b bg-white px-6 py-12">
        <div className="mx-auto max-w-screen-xl">
          <p className="font-label text-secondary mb-8 text-center text-sm tracking-widest uppercase">
            Universidades que nos eligen
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 md:gap-16">
            <span className="font-headline text-primary text-xl font-bold">
              UES Oriental
            </span>
            <span className="font-headline text-primary text-xl font-bold">
              UGB
            </span>
            <span className="font-headline text-primary text-xl font-bold">
              Dr. Andrés Bello
            </span>
            <span className="font-headline text-primary text-xl font-bold">
              UNIVO
            </span>
            <span className="font-headline text-primary text-xl font-bold">
              UMA
            </span>
            <span className="font-headline text-primary text-xl font-bold">
              IEPROES
            </span>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-container relative overflow-hidden px-6 py-20 text-white">
        {/* Abstract gradient background */}
        <div className="via-primary absolute inset-0 z-0 bg-gradient-to-br from-[#143067] to-[#143067] opacity-90"></div>
        <div className="bg-primary-fixed-dim/10 absolute top-0 right-0 h-96 w-96 translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="font-headline mb-8 text-4xl font-medium text-white md:text-5xl">
            ¿Listo para tu uniforme personalizado?
          </h2>
          <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
            <Link
              href={"/catalogo/salud" as any}
              className="text-primary font-label w-full rounded-lg bg-white px-8 py-4 text-center text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
            >
              Ver catálogo
            </Link>
            <Link
              href="/contacto"
              className="font-label w-full rounded-lg border border-white/30 bg-transparent px-8 py-4 text-center text-sm font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
