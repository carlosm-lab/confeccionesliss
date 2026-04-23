import Image from "next/image";
import Link from "next/link";

export default function NovedadesPage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-background font-body">
      {/* Hero Section */}
      <section className="bg-surface-container-lowest py-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-primary mb-6 tracking-tight">Blog de Confecciones Liss</h1>
          <p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto mb-10 leading-relaxed">
            Consejos, guías y noticias sobre uniformes médicos en El Salvador.
          </p>
          
          {/* Category Chips */}
          <div className="flex flex-wrap justify-center gap-3">
            <button className="bg-primary-container text-on-primary px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">Todos</button>
            <button className="bg-surface-container-highest text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-full text-sm font-medium transition-colors">Guías de tallas</button>
            <button className="bg-surface-container-highest text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-full text-sm font-medium transition-colors">Cuidado de uniformes</button>
            <button className="bg-surface-container-highest text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-full text-sm font-medium transition-colors">Noticias</button>
            <button className="bg-surface-container-highest text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-full text-sm font-medium transition-colors">Tendencias</button>
            <button className="bg-surface-container-highest text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-full text-sm font-medium transition-colors">Universidades</button>
            <button className="bg-surface-container-highest text-on-surface hover:bg-surface-container-low px-4 py-2 rounded-full text-sm font-medium transition-colors">Consejos profesionales</button>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-4 md:px-8 py-12 max-w-7xl mx-auto w-full">
        <div className="bg-surface-container-lowest rounded-xl overflow-hidden flex flex-col md:flex-row shadow-[0_8px_32px_rgba(25,28,30,0.04)] border border-outline-variant/10 group">
          <div className="md:w-[55%] relative overflow-hidden min-h-[300px] md:min-h-[400px]">
             <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4Vwp4_8oEeh1jQ8Xfb0FLt4GayKuzSjkVfWXWV4kpL4FUG8JsCF2o6MpbJV7k3IhrJgKR25KtVDxrDBbumhMBCTVsvfeEzmkUdojXAsdTGmQvJuvP1JHJRBvRYdlMvOPSWzLydrymRTlqNkICUWgI8nMh5LEXOHzOukEp7m-2AUC0BUsmiFvCd2Lwpu-9iH1Gfzj6HERnDyVjRK8DL1U5SIGekIYjl7x7cFbsFU5CCaUmOfVGG70PyZEfLcid58G4_0dXKbI0qpBO"
              alt="Featured article image"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="md:w-[45%] p-8 md:p-10 flex flex-col justify-center bg-gradient-to-br from-surface-container-lowest to-surface">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-primary-container bg-primary-fixed px-2 py-1 rounded">Guías de tallas</span>
              <span className="text-sm text-outline">15 Oct 2024</span>
            </div>
            <h2 className="font-headline text-3xl font-bold text-primary mb-4 leading-tight">Cómo Elegir la Talla Perfecta de tu Uniforme Médico sin Probártelo</h2>
            <p className="font-body text-on-surface-variant mb-6 leading-relaxed line-clamp-3">Una guía completa para tomar tus medidas correctamente en casa y asegurar que tu próximo scrub Confecciones Liss te quede impecable desde el primer uso.</p>
            
            <div className="flex items-center gap-4 mb-8">
               <div className="w-10 h-10 rounded-full relative overflow-hidden border border-outline-variant/20">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARfnpX1yqcLayH4AqXpa_3K2S-7LTqV_9fbnZfl5f3725XjsKp6qjdwhyzxXoBw6N04w2IQ2LdS3mphy7ZbRi5fVZw9ll9PVPxB9xlEiG0ezzEPl-HjyMHVl96oy3WVV35bZAuh8cW-mY3YWzbx5kfMCLe3IsF_aadG3V54C4rIR8H16C6nT_AEwtR7r53I989WPi7fD1QGDp6ieR9Mzz5TqYPIzADJ1MWFfoCYLcvOOD6OqOZtB42oGJIuaPM0d-nx57_Vh6xV-2L"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
               </div>
              <div>
                <div className="text-sm font-semibold text-on-surface">Ana López</div>
                <div className="text-xs text-outline">Maestra de Taller • 5 min de lectura</div>
              </div>
            </div>
            <Link href="/blog/articulo" className="inline-flex items-center justify-center bg-primary-container text-on-primary px-6 py-3 rounded-md font-medium hover:bg-primary transition-colors self-start">
              Leer artículo completo
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 w-full">
        {/* Articles Grid (70%) */}
        <div className="lg:w-[70%]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Article Card 1 */}
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-shadow duration-300 group border border-outline-variant/10">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKqb9v5u2qC4pHfZjnIn3YJZG2ZYeJinN5CilGMGx7m17pvoICrPsckQVM9yZbfWufoH-stphS3euUF4hcTAYKbW3SI2DE8qZPWdQdKGKzNbH6SZoAYma1NvVXpMNL7ZSBds_aYdZFuRdbVGaO8zvWV21piX1KMIJ3R_us0Xas18MrRfEzl2Tu0t2gtrudVmz_uhbMmUwdxwCw7AuBVCYE8TDXKBVrojo5ejf6Ou3RAfIM-W1ekUWf00jP4p0y0hfh21pAQQP1raeS"
                  alt="Article 1"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="font-bold text-primary-container">TENDENCIAS</span>
                  <span className="text-outline">• 10 Oct 2024</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2 line-clamp-2">Colores en Tendencia para la Temporada 2024</h3>
                <p className="font-body text-sm text-on-surface-variant mb-4 line-clamp-2 flex-grow">Descubre cuáles son los tonos que dominan los pasillos de los hospitales más modernos este año.</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-outline font-medium">Por Carlos M.</span>
                  </div>
                  <Link href="/blog/articulo" className="text-sm font-semibold text-primary-container hover:text-primary transition-colors">Leer más</Link>
                </div>
              </div>
            </div>

            {/* Article Card 2 */}
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-shadow duration-300 group border border-outline-variant/10">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsZxWC-_D_KDW9OYE4fLywlRYdgQVJs4d2qrKDbgBqkn1GqQZ1QeZvwGQjmSoTB1ZIwE_mShdMPRRjMJu_MsQX1CzORCAlfyGxlfy3m-JG7IeJrQyD03TossrsQjuS441W7lHa-xYg4GK8r_QFerQPqAlfkTW6PIlwEapEbu25EAJLCnZ1Aq-T6zWxrLNFrb_fo-wp0w0Id4J6Aw-8Z1-yTdy-GAce3p_87U9vOgz5N3Nc91U92IRBP6avNqDwenybPqgsrVhau-lk"
                  alt="Article 2"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="font-bold text-primary-container">CUIDADO</span>
                  <span className="text-outline">• 05 Oct 2024</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2 line-clamp-2">Cómo Eliminar Manchas Difíciles de tu Uniforme Blanco</h3>
                <p className="font-body text-sm text-on-surface-variant mb-4 line-clamp-2 flex-grow">Tips profesionales para mantener tus scrubs blancos radiantes sin dañar la integridad de la tela.</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-outline font-medium">Por Equipo Liss</span>
                  </div>
                  <Link href="/blog/articulo" className="text-sm font-semibold text-primary-container hover:text-primary transition-colors">Leer más</Link>
                </div>
              </div>
            </div>

            {/* Article Card 3 */}
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-shadow duration-300 group border border-outline-variant/10">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpWHeZb95i0tzGN3qZexMxr8JnhE_ZbT24xHH7CFSlxUUk5yVdfYBSPfJaq6FQSXuvhZeAnz4yYpTu10P5z7ngGJVfjqrMKjrr3IwA_O3mBy-t2FuYislWobeHOdIrArkD51x0ePl3_ggMxflbk59fgcVzcWKNeXYd_n0BNMI7i0cDPT4Ysti1jGrpdH2H6A7hYtUpzr8RJOgJCLhQ3AxVwS78_qvQAU4BQ60KdhAIsZuebASWj4qqE6O4_a4fR7VZEgcVWA_XPpWn"
                  alt="Article 3"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="font-bold text-primary-container">UNIVERSIDADES</span>
                  <span className="text-outline">• 28 Sep 2024</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2 line-clamp-2">Requisitos de Uniformes para Estudiantes de Medicina UES</h3>
                <p className="font-body text-sm text-on-surface-variant mb-4 line-clamp-2 flex-grow">Todo lo que necesitas saber antes de tu primera rotación clínica en el hospital universitario.</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-outline font-medium">Por Ana López</span>
                  </div>
                  <Link href="/blog/articulo" className="text-sm font-semibold text-primary-container hover:text-primary transition-colors">Leer más</Link>
                </div>
              </div>
            </div>

            {/* Article Card 4 */}
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-shadow duration-300 group border border-outline-variant/10">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQZgt3xn4vVS8FDmRqOenv3_foK0lk6j-ccrbk8gZLmYlndHVzG4nnzAeV2I4cyH11W1XL-CB10yff3aOVMJwQvjRbe_m76w4i7Fyuq6totv4IcsbMVoVnaIiyE1OyO6fkNBaEV99EgNJoNDkxJ2Jhl7aIa3WtXHrvEFRvKsf2oKiiY3pkr926vBp9omzxnY0lHQjJK_aj1qFb4GNquhe3Jltu1tQOz5ydS_TtriOVM-d3Gdnh_dyjNzT-d1Wkyovumc4eq1iedHp6"
                  alt="Article 4"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="font-bold text-primary-container">CONSEJOS</span>
                  <span className="text-outline">• 15 Sep 2024</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2 line-clamp-2">Por qué la Comodidad de tu Uniforme Afecta tu Rendimiento</h3>
                <p className="font-body text-sm text-on-surface-variant mb-4 line-clamp-2 flex-grow">Un análisis sobre cómo la ergonomía en la ropa médica impacta directamente en las guardias largas.</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-outline font-medium">Por Dr. Ramírez</span>
                  </div>
                  <Link href="/blog/articulo" className="text-sm font-semibold text-primary-container hover:text-primary transition-colors">Leer más</Link>
                </div>
              </div>
            </div>

            {/* Article Card 5 */}
            <div className="bg-surface-container-lowest rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-[0_8px_32px_rgba(25,28,30,0.08)] transition-shadow duration-300 group border border-outline-variant/10">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD7wRKX_D9a5lvDVXGRPpEi-cRwoRa04TB6pQ3NgZ5YnEZkRNjkFA_2SODdn3W1qScUspnHVjHD2NtoWqavJTKdLi1xQI3RXdEinr7wIiab7dk_4lTzG4XIma1JuSHeginccyzpYVBji3hxgBt6E34kE5UYqBvHvqJe02WdNPCZs2iIAhTF8oj4D3Wl5hiepcjT6w8Fv4Y8GhuFoLf6SbWMOaNRVbCdXBj9GykzR571CULvlWm7KPInS2ahjHcqD7D_RL4nyT8qHmo5"
                  alt="Article 5"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-3 text-xs">
                  <span className="font-bold text-primary-container">NOTICIAS</span>
                  <span className="text-outline">• 02 Sep 2024</span>
                </div>
                <h3 className="font-headline text-lg font-bold text-primary mb-2 line-clamp-2">Nuestra Nueva Tecnología Antifluido: Qué la Hace Diferente</h3>
                <p className="font-body text-sm text-on-surface-variant mb-4 line-clamp-2 flex-grow">Presentamos la nueva línea Pro-Shield diseñada para máxima protección sin sacrificar transpirabilidad.</p>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-variant/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-outline font-medium">Por Equipo Liss</span>
                  </div>
                  <Link href="/blog/articulo" className="text-sm font-semibold text-primary-container hover:text-primary transition-colors">Leer más</Link>
                </div>
              </div>
            </div>

          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 mt-12">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors disabled:opacity-50">
              <span className="material-symbols-outlined text-sm">arrow_back_ios_new</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-container text-on-primary font-medium">1</button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container font-medium transition-colors">2</button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container font-medium transition-colors">3</button>
            <span className="text-on-surface-variant px-2">...</span>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container font-medium transition-colors">8</button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-sm">arrow_forward_ios</span>
            </button>
          </div>
        </div>

        {/* Sidebar (30%) */}
        <aside className="lg:w-[30%] flex flex-col gap-10">
          {/* Popular Articles */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
            <h3 className="font-headline text-lg font-bold text-primary mb-6 pb-2 border-b border-surface-container-high">Artículos populares</h3>
            <div className="flex flex-col gap-4">
              <Link href="/blog/articulo" className="flex gap-4 group">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBTCgf2gRtyJisL_Zm2H0OCxDdYeq156rwXZFN3-3NwoasNkoznsI4AjYgebUee_K2PaLkBAtNJA3g-iWwv0D9D_vnUNG_YL3Q8LHoN0QIC2Hi5V4iVBAN2L4l3Cbz7MTWIcdePDLUX10LW9nIOPND0pdvHOdAdcNTZe5BEbq8hOeEIlwL-6MyY-u_FZ2Q3KdNqgA0RmRGeui2QdSS-bpckZ82bKuLdYI8_FHX-3bwJDwkLWjXgyNQVx7xNsFYuDiqwVaCanm5Fn-s"
                    alt="Pop 1"
                    fill
                    className="rounded object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold text-on-surface group-hover:text-primary-container line-clamp-2 leading-tight mb-1">Guía definitiva de telas para uniformes médicos</h4>
                  <span className="text-xs text-outline">12 Ago 2024</span>
                </div>
              </Link>
              <Link href="/blog/articulo" className="flex gap-4 group">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKJHnrAB1SimOE53ltBVIutP1lT-mZnDc3yiM3nl-i08OQn-KtXtzh2sUpqagBfCvyWTJp1bLeOMnl1HXSHyKWqOfF7pyiWvJ8GCKtJuk-VGPExZecx_26sjZfg6xIWCeul7idJvxzX4-4K736a4_o4646l9lTAFNdEoo22ZdeOS1hThenlx1TrdumBMdY6ckBGIQ_qZSTopFkvx2JW79mw8e745Pi_kcvP5EBYa7cngvrGiB0zfssIqkY1l-12ypaPzBubDTHD6cd"
                    alt="Pop 2"
                    fill
                    className="rounded object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold text-on-surface group-hover:text-primary-container line-clamp-2 leading-tight mb-1">El código de colores en hospitales de El Salvador</h4>
                  <span className="text-xs text-outline">05 Jul 2024</span>
                </div>
              </Link>
              <Link href="/blog/articulo" className="flex gap-4 group">
                <div className="w-16 h-16 relative flex-shrink-0">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZc15GmdzFJFTJUX4VsxCGVUzUVoBoOqrwx_OYEieZSAKxbe60lWVM5TfRAlKqszRFIJQHhIg6ZEqKkR1U3zl0kSG01PLMUVvHgE0Yo5Ic2oRSt9iBbfZJmr8NQHyu3h8B7h8_IGRVd1xPN8GXdJagoBbQU9LmTAUcv1Lxdv3UGks3qnMom1U4OxRJ4LICwL36oE0kLHVysrYpdo4MhJFFYI0UaX070zPCcsU7ocfw7xl3sTPUYM2Xq0-y_LlWYtm9yqIOJUQgqCPe"
                    alt="Pop 3"
                    fill
                    className="rounded object-cover group-hover:opacity-80 transition-opacity"
                  />
                </div>
                <div>
                  <h4 className="font-body text-sm font-semibold text-on-surface group-hover:text-primary-container line-clamp-2 leading-tight mb-1">¿Bata blanca o scrub? Cuándo usar cada uno</h4>
                  <span className="text-xs text-outline">22 Jun 2024</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm">
            <h3 className="font-headline text-lg font-bold text-primary mb-6 pb-2 border-b border-surface-container-high">Categorías</h3>
            <ul className="flex flex-col gap-3 font-body text-sm">
              <li>
                <Link href="#" className="flex justify-between items-center text-on-surface-variant hover:text-primary-container transition-colors py-1">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">straighten</span> Guías de tallas</span> 
                  <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">12</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex justify-between items-center text-on-surface-variant hover:text-primary-container transition-colors py-1">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">water_drop</span> Cuidado de uniformes</span> 
                  <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">8</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex justify-between items-center text-on-surface-variant hover:text-primary-container transition-colors py-1">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">campaign</span> Noticias</span> 
                  <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">24</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex justify-between items-center text-on-surface-variant hover:text-primary-container transition-colors py-1">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">auto_awesome</span> Tendencias</span> 
                  <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">15</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="flex justify-between items-center text-on-surface-variant hover:text-primary-container transition-colors py-1">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">school</span> Universidades</span> 
                  <span className="bg-surface-container-high px-2 py-0.5 rounded text-xs">6</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Subscription Box */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/15 text-center shadow-inner">
            <span className="material-symbols-outlined text-4xl text-primary-container mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
            <h3 className="font-headline text-lg font-bold text-primary mb-2">Suscríbete al Boletín</h3>
            <p className="font-body text-sm text-on-surface-variant mb-6">Recibe las últimas noticias y ofertas exclusivas en tu correo.</p>
            <form className="flex flex-col gap-3">
              <input className="w-full bg-surface-container-lowest border-none rounded-md px-4 py-2 text-sm focus:ring-2 focus:ring-primary-container outline-none transition-shadow" placeholder="Tu correo electrónico" required type="email" />
              <button className="w-full bg-primary-container text-on-primary font-medium py-2 rounded-md hover:bg-primary transition-colors text-sm" type="submit">Suscribirme</button>
            </form>
          </div>
        </aside>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary-container text-on-primary py-16 px-4 md:px-8 mt-12 bg-gradient-to-r from-primary to-primary-container relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <h2 className="font-headline text-3xl font-bold leading-tight">¿Quieres que escribamos sobre un tema específico?</h2>
          <Link href="/contacto" className="bg-surface-container-lowest text-primary-container px-8 py-3 rounded-md font-bold hover:bg-surface-container-low transition-colors whitespace-nowrap shadow-lg">
            Escríbenos
          </Link>
        </div>
      </section>
    </div>
  );
}
