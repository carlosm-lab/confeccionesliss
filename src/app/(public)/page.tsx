import Link from "next/link";
import Image from "next/image";

export default function LobbyPage() {
  return (
    <div className="flex flex-col min-h-screen relative selection:bg-primary selection:text-on-primary font-headline antialiased">
      <main className="flex-grow pt-10">
        
        {/* Hero Section: Split Viewport */}
        <section className="min-h-[700px] md:min-h-[870px] flex flex-col md:flex-row relative overflow-hidden bg-surface-container-lowest">
          {/* Geometric Accent Background */}
          <div 
            className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
            style={{ backgroundImage: "radial-gradient(circle at 100% 0%, #143067 0%, transparent 50%)" }}
          />

          <div className="w-full md:w-1/2 flex items-center justify-center p-12 lg:p-24 z-10">
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-[2.75rem] leading-[1.1] font-extrabold tracking-tight text-primary mb-6">
                ¿Qué tipo de uniforme necesitas?
              </h1>
              <p className="text-lg text-on-surface-variant leading-relaxed mb-10">
                Encuentra el catálogo perfecto para ti. Diseños de alta precisión para cada profesión.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/inicio" className="bg-gradient-to-r from-primary to-primary-container text-on-primary px-8 py-4 rounded-md font-medium text-center hover:opacity-90 transition-opacity shadow-[0_12px_32px_rgba(25,28,30,0.06)]">
                  Ver Catálogo General
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full md:w-1/2 relative z-10 p-8 md:p-12 lg:p-16 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-full h-full max-h-[700px] relative">
              <div className="relative col-span-1 row-span-2 shadow-sm rounded-lg overflow-hidden h-full">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCPHnbLu5luDAxr-SHXaYUG6Gg8RaeWWMKUXjg1cAaFc4ZI-oG_wIo2qIyzeEyVdLL0gQs_0OkxB1ee3MG_tbRJ7ZF8mwROvQLWFJfX-D9eXS1f2hXX2PfNpVkEVOjsbP20XWi8uILHtfbdsqKyUwCeYkVHToGbuimCb4VKRPGxjCd_IeOnmMc4WZGJLDhgf3iv80GLtmAGCs93gY3n2BpSvxZt8FD2vYtyZ63cx3FSyaD3CC20NWIBaTJG0oFAm0ieOnwkzqssWnc"
                  alt="Medical professionals in clean blue scrubs"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="relative shadow-sm rounded-lg overflow-hidden h-64 md:h-full">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz0tnWS1HEP6JI-4ivXwWhSjKzlj7xOGzTJDTUIvm5ITRePEf_LFL_HqUsDwnBYFFn4mmWheiGiAuR1STquLF-6rcDuk8F3CZ4K9DPG1sGbhojF2Eko7LJatixb3rlILf7ns4I16PCvDIeNvDExRrq8aQ8SXfiFy6ZneoMsxT4mSXrwS8-2ACqcHBne4FOthDCCltrn0d4vEfe9aIWAZ0M7NuMsTHiQSeeM0Ov1qJUB9bMbL5iz-PyOU_3H_baI6o2l6IaNIXSkG0"
                  alt="Corporate team in formal wear"
                  fill
                  className="object-cover object-center"
                />
              </div>
              <div className="relative shadow-sm rounded-lg overflow-hidden h-64 md:h-full">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7BWgkJIQEwNUb4FnZGP7yr27oq4bx4syUzuSDSMPTkLf_vvj-rGQhKlg0zKY8UU1zXnw1-RgHeeYsfNB7GVQKZQQTA8-AirlcV0gQkk4K734JCUJMapaJqlLr3oNOu5dZgo58WEZMnc-qAB8X9cP8Y7mXmGRmvzRkIK3wsfvMzq8ELbZM6nE1g3T9DPaRBN-y_8cTyarh_FyHkUzS9vc-ONVmkW8RWYr0I0__Kp9rFTWg0k2vmYd59WYZhCEm7OIqh7QtzBaa0vc"
                  alt="Students in uniform"
                  fill
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Purchase Type Strip */}
        <section className="bg-surface-container-low border-t border-surface-dim/30 border-b relative z-20">
          <div className="max-w-7xl mx-auto px-8 py-8 md:py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-shrink-0">
              <h2 className="text-xl font-bold text-primary tracking-tight">¿Cómo deseas comprar?</h2>
            </div>
            <div className="flex flex-col sm:flex-row bg-surface p-2 rounded-lg shadow-sm gap-2">
              <Link href="/inicio" className="flex items-center space-x-3 px-6 py-3 rounded-md bg-primary text-on-primary font-medium transition-all hover:bg-primary-container">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                <span>Compra individual</span>
              </Link>
              <Link href="/contacto" className="flex items-center space-x-3 px-6 py-3 rounded-md text-on-surface-variant hover:bg-surface-container transition-all">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>business</span>
                <span>Compra al por mayor</span>
              </Link>
            </div>
            <div className="text-sm text-on-surface-variant max-w-xs text-center md:text-left leading-relaxed">
              La compra al por mayor aplica para instituciones, clínicas y grupos de 10 o más prendas.
            </div>
          </div>
        </section>

        {/* Selector Cards Section */}
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-[2rem] font-extrabold tracking-tight text-primary mb-4">Elige tu categoría</h2>
              <p className="text-on-surface-variant max-w-2xl mx-auto">Selecciona el área para la que necesitas confecciones y descubre nuestras opciones especializadas.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {/* Card 1: Médico */}
              <div className="bg-surface-container-lowest rounded-lg p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)] transition-all relative flex flex-col h-full group border-t-4 border-transparent hover:border-t-primary">
                <div className="absolute top-6 right-6 bg-secondary/10 text-secondary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  Principal
                </div>
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>stethoscope</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">Sector Salud</h3>
                <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">Médicos, enfermeras, odontología y más.</p>
                <Link href="/catalogo/medico" className="w-full text-center bg-primary text-on-primary py-3 rounded-md font-medium hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors block">
                  Explorar
                </Link>
              </div>

              {/* Card 2: Universidades */}
              <div className="bg-surface-container-lowest rounded-lg p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)] transition-all flex flex-col h-full group border-t-4 border-transparent hover:border-t-primary">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>school</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">Universidades</h3>
                <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">Uniformes para estudiantes del sector salud y laboratorios.</p>
                <Link href="/catalogo/escolar" className="w-full text-center bg-primary text-on-primary py-3 rounded-md font-medium hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors block">
                  Explorar
                </Link>
              </div>

              {/* Card 3: Escuelas */}
              <div className="bg-surface-container-lowest rounded-lg p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)] transition-all flex flex-col h-full group border-t-4 border-transparent hover:border-t-primary">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>domain</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">Escuelas y Colegios</h3>
                <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">Uniformes y ropa escolar institucional.</p>
                <Link href="/catalogo/escolar" className="w-full text-center bg-primary text-on-primary py-3 rounded-md font-medium hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors block">
                  Explorar
                </Link>
              </div>

              {/* Card 4: Corporativos */}
              <div className="bg-surface-container-lowest rounded-lg p-10 shadow-[0_12px_32px_rgba(25,28,30,0.06)] hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(25,28,30,0.1)] transition-all flex flex-col h-full group border-t-4 border-transparent hover:border-t-primary">
                <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>work</span>
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4 tracking-tight">Empresas y Talleres</h3>
                <p className="text-on-surface-variant mb-12 flex-grow leading-relaxed">Uniformes corporativos y laborales de alta durabilidad.</p>
                <Link href="/catalogo/corporativo" className="w-full text-center bg-primary text-on-primary py-3 rounded-md font-medium hover:bg-primary-fixed hover:text-on-primary-fixed transition-colors block">
                  Explorar
                </Link>
              </div>
            </div>

            {/* Centered Bottom Card */}
            <div className="flex justify-center mt-8">
              <div className="w-full md:w-2/3 lg:w-1/2 bg-surface-container-low rounded-lg p-10 text-center hover:-translate-y-1 shadow-sm transition-all border-t-4 border-transparent hover:border-t-primary">
                <div className="w-16 h-16 rounded-full bg-surface-container-lowest mx-auto flex items-center justify-center mb-6 text-primary shadow-sm">
                  <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 0" }}>content_cut</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-3 tracking-tight">No sé qué necesito</h3>
                <p className="text-on-surface-variant mb-8 leading-relaxed">Te ayudamos a encontrarlo. Asesoría personalizada para tu proyecto.</p>
                <Link href="/contacto" className="inline-block px-8 py-3 rounded-md font-medium text-primary border border-outline-variant/50 hover:bg-surface-container-lowest transition-colors bg-transparent">
                  Contactar
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Primera vez aquí Section */}
        <section className="bg-[#f0f4ff] py-16 px-8 border-y border-outline-variant/30">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Side: Steps */}
            <div className="w-full lg:w-2/3">
              <h2 className="text-2xl font-bold text-primary mb-8 tracking-tight">¿Primera vez aquí?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined">category</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Elige tu categoría</h4>
                    <p className="text-sm text-on-surface-variant">Encuentra el estilo perfecto.</p>
                  </div>
                </div>
                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined">straighten</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Personaliza tu talla</h4>
                    <p className="text-sm text-on-surface-variant">Ajuste ideal para ti.</p>
                  </div>
                </div>
                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm flex-shrink-0">
                    <span className="material-symbols-outlined">local_shipping</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-1">Recibe en tu puerta</h4>
                    <p className="text-sm text-on-surface-variant">Envío rápido y seguro.</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Side: Call to Action */}
            <div className="w-full lg:w-1/3 flex flex-col items-start lg:items-end text-center lg:text-right">
              <Link href="/onboarding" className="bg-[#143067] text-white px-8 py-4 rounded-md font-medium hover:opacity-90 transition-opacity shadow-[0_12px_32px_rgba(25,28,30,0.06)] w-full sm:w-auto mb-4 block">
                Crea tu cuenta gratis
              </Link>
              <Link href="/inicio" className="text-sm font-medium text-primary hover:text-primary-container hover:underline w-full sm:w-auto text-center lg:text-right px-2 block">
                Ver catálogo sin cuenta
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
