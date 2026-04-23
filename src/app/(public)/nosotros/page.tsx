import Image from "next/image";
import Link from "next/link";

export default function NosotrosPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[716px] flex items-center justify-center overflow-hidden bg-surface-container-low">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkgh-SJ4HhJF21myYZEpjzecUi3SFjVaShXZPw-lNQ3UGZ4SeBGXLxsvTrZXJK2lFo_0Ij0410bf7SvmvjCodHclwvCiE8d7WYRiMGCgWz7ROWPR1ejFtYrBFflg0ol6W0WLllCM75U3kd2fwzIwWfFzc7fWunpPukJS2IDxIhLDMS7yBf02O2k0vGXQ1kTaWRM8XjDx5vy9nJQ1MHTQaqSVK9jEKjGtfEny6ogxiKE5SOwga7hL67oz7AtfBHuiqaioCtUkU8LOA"
            alt="Workshop Hero"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-primary-container/60 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <span className="font-label text-xs uppercase tracking-[0.2em] text-white/80 mb-6 bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/20">
            Taller artesanal desde 2015
          </span>
          <h1 className="font-headline text-5xl md:text-7xl text-white mb-6 leading-tight italic font-light drop-shadow-lg">
            "Cada puntada,<br />una promesa de calidad."
          </h1>
          <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light tracking-wide">
            Confecciones Liss — San Miguel, El Salvador.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-24 px-6 md:px-12 bg-surface-container-lowest relative z-20">
        <div className="max-w-screen-xl mx-auto">
          {/* Row 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="w-12 h-0.5 bg-primary/20 mb-8"></div>
              <h2 className="font-headline text-4xl md:text-5xl text-primary font-medium tracking-tight">Nuestra historia</h2>
              <div className="space-y-4 font-body text-on-surface-variant text-lg leading-relaxed font-light">
                <p>Nacimos en el corazón de San Miguel con una máquina de coser y una visión clara: elevar el estándar del uniforme médico en oriente. Lo que comenzó como un pequeño taller familiar se ha transformado en un referente de precisión y durabilidad.</p>
                <p>Entendemos que un uniforme no es solo tela; es la armadura diaria de quienes dedican su vida a cuidar la de otros. Por eso, cada pieza que sale de nuestro taller lleva impreso un compromiso inquebrantable con la excelencia.</p>
                <p>Nuestra misión es confeccionar prendas que ofrezcan confort absoluto, resistencia excepcional y un diseño que dignifique la labor de los profesionales de la salud en El Salvador.</p>
              </div>
              <div className="pt-4">
                <button type="button" className="font-label text-sm font-medium text-primary border border-primary/20 hover:border-primary px-8 py-3 rounded-lg transition-all duration-300 hover:bg-surface-container-low flex items-center space-x-2">
                  <span>Conoce nuestro proceso</span>
                  <span className="material-symbols-outlined text-sm font-light">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <div className="absolute -inset-4 bg-surface-container-low rounded-xl transform rotate-2"></div>
              <div className="relative z-10 rounded-lg shadow-[0_20px_40px_-12px_rgba(20,48,103,0.1)] w-full aspect-[4/3] overflow-hidden bg-surface-container-high">
               <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDe-ofAogmiiLZh4HTmSJUQR8Ks-Xbv8okZDJX7lmB4C86FK2mQ3eFHsHiP_MIt_oUtJYXxJfm7ZV3Iq4WW5milDCwHJfjKWD5fldvXeie0-UMa5Up7FDD46gWhGW-U03mqoPpnFdcHTTQbhd_3rRq6TpGOkpz-uRdaYBpKgxlSYEZ-e1iWsWkRGc74xStNUI6Le2oyGqrqVIvGuvMPDueUmdzlFga6frGHQQRt6E8M3ZvsN3ZbSRSds_dpCsrIkLQxBeAa43JLdjw" alt="Our origins" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-secondary-fixed rounded-xl transform -rotate-2"></div>
              <div className="relative z-10 rounded-lg shadow-[0_20px_40px_-12px_rgba(20,48,103,0.1)] w-full aspect-[4/3] overflow-hidden bg-surface-container-high">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDy9bd2qqmR3p09Kg45PgBkbn06mR936QQtHHAfu389TcG55g3KhxXrFBaMPEO1392cqpetBmeiBqsz-7t9vZwAPVOt5kcDFgsxlgt2v_idouYHzArszr64BBsu1xQDSqxyZzVmfcX_gKjXBSxxM816lhWzG2U-7PurBJ7RGH7SXPauGmLBn-3o7R2aR0iJ2D6gtrXBAdLalFDfWT7PLJAYfs3OoEaW4w8TntHVHOtWlFAfAWxqPnIQNPkHMB7dkV_58TCBzMv__rY" alt="Medical scrubs specialty" fill className="object-cover" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-12 h-0.5 bg-primary/20 mb-8"></div>
              <h3 className="font-headline text-3xl md:text-4xl text-primary font-medium tracking-tight">Especialistas en la salud</h3>
              <p className="font-body text-on-surface-variant text-lg leading-relaxed font-light">
                Nos hemos especializado en el diseño y confección de pijamas quirúrgicas y gabachas médicas. Seleccionamos cuidadosamente textiles que repelen fluidos, resisten múltiples lavados industriales y mantienen su estructura, garantizando que el profesional luzca impecable en todo momento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6 bg-primary-container text-white">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl font-medium mb-4 text-white">Nuestros valores</h2>
            <div className="w-16 h-0.5 bg-white/20 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Value 1 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">diamond</span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">Calidad artesanal</h4>
              <p className="font-body text-sm text-white/70 font-light leading-relaxed">Atención meticulosa al detalle en cada costura y acabado.</p>
            </div>
            {/* Value 2 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">health_and_safety</span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">Compromiso con la salud</h4>
              <p className="font-body text-sm text-white/70 font-light leading-relaxed">Materiales seleccionados para la protección y confort del personal médico.</p>
            </div>
            {/* Value 3 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">groups</span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">Atención personalizada</h4>
              <p className="font-body text-sm text-white/70 font-light leading-relaxed">Asesoría individual para asegurar el ajuste perfecto de cada cliente.</p>
            </div>
            {/* Value 4 */}
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner">
                <span className="material-symbols-outlined text-3xl font-light text-white">eco</span>
              </div>
              <h4 className="font-body text-lg font-semibold tracking-wide">Confección sostenible</h4>
              <p className="font-body text-sm text-white/70 font-light leading-relaxed">Prácticas de producción que minimizan el desperdicio textil.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 bg-surface-container-lowest">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16">
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-medium tracking-tight">Nuestro proceso de confección</h2>
            <p className="font-body text-on-surface-variant mt-4 font-light text-lg">De la idea a la prenda terminada, un viaje de precisión.</p>
          </div>
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-10 left-0 right-0 h-[1px] bg-outline-variant/30 z-0"></div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col lg:items-center relative bg-surface-container-lowest p-4 rounded-xl">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-sm border border-white relative">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">forum</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-label text-xs font-bold">1</div>
                </div>
                <h4 className="font-body font-semibold text-primary mb-2 lg:text-center text-lg">Consulta</h4>
                <p className="font-body text-sm text-on-surface-variant font-light lg:text-center mb-4">Análisis de necesidades y requerimientos específicos.</p>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col lg:items-center relative bg-surface-container-lowest p-4 rounded-xl">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-sm border border-white relative">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">layers</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-label text-xs font-bold">2</div>
                </div>
                <h4 className="font-body font-semibold text-primary mb-2 lg:text-center text-lg">Elección de tela</h4>
                <p className="font-body text-sm text-on-surface-variant font-light lg:text-center mb-4">Selección de textiles técnicos de alto rendimiento.</p>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col lg:items-center relative bg-surface-container-lowest p-4 rounded-xl">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-sm border border-white relative">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">straighten</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-label text-xs font-bold">3</div>
                </div>
                <h4 className="font-body font-semibold text-primary mb-2 lg:text-center text-lg">Toma de medidas</h4>
                <p className="font-body text-sm text-on-surface-variant font-light lg:text-center mb-4">Ajuste personalizado para máxima ergonomía.</p>
              </div>
              {/* Step 4 */}
              <div className="flex flex-col lg:items-center relative bg-surface-container-lowest p-4 rounded-xl">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-sm border border-white relative">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">content_cut</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-label text-xs font-bold">4</div>
                </div>
                <h4 className="font-body font-semibold text-primary mb-2 lg:text-center text-lg">Confección</h4>
                <p className="font-body text-sm text-on-surface-variant font-light lg:text-center mb-4">Corte y costura en nuestro taller.</p>
                <span className="inline-block bg-secondary-container text-on-secondary-container font-label text-[10px] uppercase font-bold px-3 py-1 rounded-full">3-7 días</span>
              </div>
              {/* Step 5 */}
              <div className="flex flex-col lg:items-center relative bg-surface-container-lowest p-4 rounded-xl">
                <div className="w-20 h-20 rounded-full bg-surface-container-high flex items-center justify-center mb-6 shadow-sm border border-white relative">
                  <span className="material-symbols-outlined text-primary text-3xl font-light">fact_check</span>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center font-label text-xs font-bold">5</div>
                </div>
                <h4 className="font-body font-semibold text-primary mb-2 lg:text-center text-lg">Control y entrega</h4>
                <p className="font-body text-sm text-on-surface-variant font-light lg:text-center mb-4">Inspección final de calidad y distribución.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 px-6 bg-[#f4f5f7]">
        <div className="max-w-screen-xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-4xl md:text-5xl text-primary font-medium tracking-tight">Nuestro equipo</h2>
            <div className="w-16 h-0.5 bg-primary/20 mx-auto mt-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Team Card 1 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-sm border-2 border-white ring-2 ring-primary/10 relative">
                <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcmVPGry2MmCoOf43zD76fwT6J_fiGby9aQ_GzxwlRbgmXk2cGaSd4JEnRqcskOWV2winZg5sa3Rzj5_fOba1_ZVp28PeSOjSvIACeezlK1ufHMHyH0eMnNnKYnXwpQVZmiLMiL_6SQURKROFqa0NCBOVtfVqZBsuypKAQwSQaiTFtYfgJ0b04q9QTYinUF8Qeqf7nv7wmM-DJJMgngWrCMsnuHqlWyFxVuaMKClhXli1A5njaCzgW4UAPSV5aFRLjCy0d5JFePHQ" alt="María López" fill className="object-cover" />
              </div>
              <h4 className="font-body font-bold text-lg text-primary mb-1">María López</h4>
              <p className="font-body text-sm text-secondary mb-3">Costurera Principal</p>
              <span className="font-label text-[10px] uppercase font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">15 años de experiencia</span>
            </div>
            {/* Team Card 2 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-sm border-2 border-white ring-2 ring-primary/10 relative">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-CiCy2IRqQZpPSAvtnFXGVB7FhaP4j8P1YUpGnw-9ZZJNiFzkGQSA0Cq8bBrUt5OlCSlBzj3LaWJzbVh34LWqA96JvITnV9G-EMIFmFlhf8JtKGttLLS87WOegTnGBEJcHEnqOxG-SyQHvDpg8dIuczPXWb4CtI7pFgqW7eZ28D5fwwByCZkEw8NH_in8SG4wj9CZXaVzS3mgTVFkviJ9iMxhFxD1KkdvZHqTH79qPJ6EgULQuALqg3c3vGjFdBGpPOJ0ys-oh8A" alt="Ana Martínez" fill className="object-cover" />
              </div>
              <h4 className="font-body font-bold text-lg text-primary mb-1">Ana Martínez</h4>
              <p className="font-body text-sm text-secondary mb-3">Especialista en Corte</p>
              <span className="font-label text-[10px] uppercase font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">8 años de experiencia</span>
            </div>
            {/* Team Card 3 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-sm border-2 border-white ring-2 ring-primary/10 relative">
                 <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-9miYcsFmwtfjyZf3Wmt3BETmV5xARLJLqfdcSYDMr-4Gg2LoY-ROWfJduJ9dJqiCjfud1cCEELOfUx9r9_h8RrQn5sjocQCpibjRpBiEA56kZ-_-FXeJwafNdxqdf9gQepWYIUMJCFeYmE3BeLY_VEIvVUQo7ucadgtqhGusIrWcMGo3ffkwnDt2x0v-X5GO6uTO5tsumAS8rulk5wwcDi4MRowMnpZldjlVcxkB79QBgvdzlYjQGeUZl_2-EfMIB7e-V7NqX-I" alt="Carlos Ruiz" fill className="object-cover" />
              </div>
              <h4 className="font-body font-bold text-lg text-primary mb-1">Carlos Ruiz</h4>
              <p className="font-body text-sm text-secondary mb-3">Diseñador de Patrones</p>
              <span className="font-label text-[10px] uppercase font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">12 años de experiencia</span>
            </div>
            {/* Team Card 4 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 shadow-sm border-2 border-white ring-2 ring-primary/10 relative">
                  <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCgfVXk_HxH3opa8M3Vg-K6YOvfXj1ZHz0cS7ig_kYHZrQbOeRzmma7y6gqRhmtbIctA6KS-66WbZpp_N9tYNPRM8z-xD82YBTbe261PcSz5S-WNLliixzbXMFh5v99df4CTZGiieto2ISMIQqAYRA63X1mj95AhA_o9JtaM-k2GrAJ9cn0g1zR_55XQB0DNq3e4oDACyXOq3WzoUA-mQiaiiAKNRjWpTR8PbOF8j4aHLBVkyBZbhjQoFjJg57bqTQwxlKDDpCh48" alt="Rosa Santos" fill className="object-cover" />
              </div>
              <h4 className="font-body font-bold text-lg text-primary mb-1">Rosa Santos</h4>
              <p className="font-body text-sm text-secondary mb-3">Control de Calidad</p>
              <span className="font-label text-[10px] uppercase font-bold bg-secondary-container text-on-secondary-container px-2 py-1 rounded-full">20 años de experiencia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 px-6 bg-[#f0f4ff]">
        <div className="max-w-screen-xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <p className="font-headline text-5xl font-bold text-primary-container">8+</p>
              <p className="font-body text-sm font-medium text-secondary uppercase tracking-wider">Años</p>
            </div>
            <div className="space-y-2">
              <p className="font-headline text-5xl font-bold text-primary-container">2,000+</p>
              <p className="font-body text-sm font-medium text-secondary uppercase tracking-wider">Uniformes</p>
            </div>
            <div className="space-y-2">
              <p className="font-headline text-5xl font-bold text-primary-container">6</p>
              <p className="font-body text-sm font-medium text-secondary uppercase tracking-wider">Universidades</p>
            </div>
            <div className="space-y-2">
              <p className="font-headline text-5xl font-bold text-primary-container">100%</p>
              <p className="font-body text-sm font-medium text-secondary uppercase tracking-wider">Hecho en San Miguel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Universities Strip */}
      <section className="py-12 px-6 border-b border-outline-variant/20 bg-white">
        <div className="max-w-screen-xl mx-auto">
          <p className="text-center font-label text-sm uppercase tracking-widest text-secondary mb-8">Universidades que nos eligen</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-headline text-xl font-bold text-primary">UES Oriental</span>
            <span className="font-headline text-xl font-bold text-primary">UGB</span>
            <span className="font-headline text-xl font-bold text-primary">Dr. Andrés Bello</span>
            <span className="font-headline text-xl font-bold text-primary">UNIVO</span>
            <span className="font-headline text-xl font-bold text-primary">UMA</span>
            <span className="font-headline text-xl font-bold text-primary">IEPROES</span>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-container text-white py-20 px-6 relative overflow-hidden">
        {/* Abstract gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#143067] via-primary to-[#143067] opacity-90 z-0"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-fixed-dim/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-headline text-4xl md:text-5xl mb-8 font-medium text-white">¿Listo para tu uniforme personalizado?</h2>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/catalogo" className="bg-white text-primary font-label font-semibold text-sm px-8 py-4 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all w-full sm:w-auto text-center">
              Ver catálogo
            </Link>
            <Link href="/contacto" className="bg-transparent border border-white/30 text-white hover:bg-white/10 font-label font-semibold text-sm px-8 py-4 rounded-lg transition-all w-full sm:w-auto text-center">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
