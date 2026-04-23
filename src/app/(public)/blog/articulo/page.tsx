import Image from "next/image";
import Link from "next/link";

export default function BlogArticlePage() {
  return (
    <div className="w-full flex flex-col min-h-screen bg-surface font-body text-on-surface antialiased">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-4 font-label text-[0.75rem] uppercase tracking-wider text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">Inicio</Link>
        <span className="mx-2">&gt;</span>
        <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
        <span className="mx-2">&gt;</span>
        <span className="text-primary font-medium">La Importancia de la Tela Antifluido en la Ropa Médica</span>
      </div>

      {/* Article Hero */}
      <div className="w-full h-[420px] relative bg-primary flex flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0PNhYnB93IuLVKzNXVL1lkuBI6QXjiJX2x2p9VclCHlMDFZ3XXrCvafX5npxCMV4TyOMtt5g-AsKcHljv0f2qb0fvAH852P0sYuxjHA0j4QnLIDmaW5jGI09X9skf9eKsUhmXkhGc6K3QYYOme1TgXf1rN5VKCfEsfh6vK8ZMRMsfTOMeKfm_KFc_mqwdBGcXgLYQdpPwdgzsGcShNnMUEuQ4qfzVuLCdMUDOCkcXBPjoZe37M8EEdKr4XDgKFSaUOC6tgM8-4491"
            alt="Medical professional"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-10 flex flex-col items-center text-center">
          <span className="inline-block border border-white/40 text-white font-label text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-6 backdrop-blur-sm">Innovación Textil</span>
          <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-[3.5rem] text-white tracking-[-0.02em] leading-tight mb-4 max-w-4xl">La Importancia de la Tela Antifluido en la Ropa Médica</h1>
          <p className="font-body italic text-white/90 text-xl max-w-2xl mb-8">Por qué elegir los materiales correctos marca la diferencia en el día a día del profesional de la salud.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-between w-full max-w-4xl border-t border-white/20 pt-6">
            <div className="flex items-center gap-4 mb-4 sm:mb-0">
              <div className="w-12 h-12 rounded-full relative overflow-hidden border-2 border-white">
                 <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm41zSvGpP6dFZxT-kRKN-FchTfrTa8mgjZMeyjbxrxurHbncjkCY-u4I_op6o1X9NivciAnohR1B5OsNDf5zuKGub2sOrfH5EEwEbDYoUFSlFWkzXLMP4qGbBuBezhPygdyrA-Y2qr2cRt12ryLFzq4shdwrTap22YDz9v4ibqQCKytou0YWDWTf2DQX1xjV9Wv1I3qrxv-91Q24gd8AkUq6N261BT6KOj94be7tZN--ZoaXrXizmH0BoFcSjrGYkSaWB0zXTjHg6"
                    alt="Author"
                    fill
                    className="object-cover"
                 />
              </div>
              <div className="text-left">
                <p className="font-headline font-semibold text-white text-sm">Dra. Elena Valdés</p>
                <p className="font-label text-xs text-white/70 uppercase tracking-wider">12 Oct 2023 • 5 min de lectura</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-white/70 font-label text-xs uppercase tracking-wider mr-2 hidden sm:inline-block">Compartir:</span>
              <button aria-label="Share on WhatsApp" className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                 <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
              </button>
              <button aria-label="Share on Facebook" className="w-8 h-8 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:opacity-90 transition-opacity">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
              </button>
              <button aria-label="Copy Link" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center hover:bg-white/30 transition-colors">
                <span className="material-symbols-outlined text-[16px]">link</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 relative mb-16">
        
        {/* Left Share Bar (Fixed on Desktop) */}
        <div className="hidden lg:flex items-center gap-4 flex-row justify-center mb-8">
            <button aria-label="Share on WhatsApp" className="w-10 h-10 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:shadow-[0_8px_16px_rgba(37,211,102,0.2)] transition-all">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path></svg>
            </button>
            <button aria-label="Share on Facebook" className="w-10 h-10 rounded-full bg-[#1877F2] text-white flex items-center justify-center hover:shadow-[0_8px_16px_rgba(24,119,242,0.2)] transition-all">
               <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg>
            </button>
            <button aria-label="Copy Link" className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-variant transition-colors">
               <span className="material-symbols-outlined text-[20px]">link</span>
            </button>
            <button aria-label="Print" className="w-10 h-10 rounded-full bg-surface-container-high text-primary flex items-center justify-center hover:bg-surface-variant transition-colors">
               <span className="material-symbols-outlined text-[20px]">print</span>
            </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Main Content Column (72%) */}
          <div className="lg:w-[72%]">
            <article className="prose prose-lg max-w-[720px] font-body text-[18px] leading-relaxed text-on-surface mx-auto">
              <p className="first-letter:text-5xl first-letter:font-headline first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                El entorno clínico exige no solo conocimiento y precisión, sino también las herramientas adecuadas para garantizar la seguridad tanto del paciente como del profesional. En el centro de esta preparación se encuentra un elemento a menudo subestimado: el tejido de nuestros uniformes médicos. La tela antifluido ha revolucionado la confección médica, elevando los estándares de bioseguridad a niveles sin precedentes en las últimas décadas.
              </p>

              <h2 className="font-headline font-bold text-2xl text-primary mt-12 mb-6 border-l-4 border-primary-container pl-4">La Barrera Invisible: Cómo Funciona</h2>
              <p>
                La tecnología antifluido no es magia, es ciencia aplicada a la textura. Mediante tratamientos químicos especializados durante el proceso de hilado, o aplicando recubrimientos microscópicos sobre el tejido final, se altera la tensión superficial de la tela. Esto significa que cuando líquidos —ya sea agua, soluciones salinas o fluidos biológicos— entran en contacto con la superficie, en lugar de ser absorbidos, forman gotas que resbalan por la prenda.
              </p>
              <p>
                Esta barrera es crítica en entornos donde la exposición a patógenos es constante, actuando como la primera línea de defensa física en una sala de emergencias o quirófano.
              </p>

              <blockquote className="bg-[#f0f4ff] border-l-4 border-[#143067] p-6 my-10 italic text-xl text-primary font-medium">
                  "Un uniforme antifluido de calidad no solo protege la piel del profesional, sino que previene la contaminación cruzada entre áreas del hospital, salvando vidas de manera silenciosa."
              </blockquote>

              <h2 className="font-headline font-bold text-2xl text-primary mt-12 mb-6 border-l-4 border-primary-container pl-4">Durabilidad sin Sacrificar Confort</h2>
              <p>
                Históricamente, la ropa protectora solía ser rígida, calurosa y poco ergonómica. Sin embargo, los avances en la confección de alta gama, como los aplicados en <em>Confecciones Liss</em>, han logrado integrar la tecnología antifluido en tejidos que mantienen una excelente transpirabilidad. Las microfibras modernas permiten que el vapor de sudor escape, mientras bloquean el ingreso de líquidos externos.
              </p>

              <figure className="my-10">
                 <div className="w-full h-80 relative overflow-hidden rounded-xl shadow-[0_20px_40px_rgba(20,48,103,0.08)]">
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR-cJBl8QmjtBHbH_lIqWKcZquzZ70NIF9Q8U9QlGx2_qZATWnZBgbql-ZZm_2cMdfqiBCTxANJTsR86bW2kalYfGo6jbSDueh92MHpv2wVze0CuDCFVyVNlJFgrxiZ-EOhBwpXD3tjoaw8Fub3zYKCDu5eFyXOW9l1-9Cf70dJHhsn-Qe4YdX6R4tqtA1hDXA0ESUxYYqO6sKWLL-_Us0mFmgtuhl_67oE0sYN_xLtflBzCEJJWbCPMGTY3o45Frt3VLW2oEHYJjm"
                      alt="Detail of water droplets repelling off fabric"
                      fill
                      className="object-cover"
                    />
                 </div>
                <figcaption className="text-center font-body italic text-sm text-on-surface-variant mt-4">Detalle microscópico del comportamiento de fluidos sobre tejido tratado con tecnología repelente de última generación.</figcaption>
              </figure>

              <h2 className="font-headline font-bold text-2xl text-primary mt-12 mb-6 border-l-4 border-primary-container pl-4">Conclusión</h2>
              <p>
                Invertir en uniformes con tecnología antifluido no es un lujo, es una necesidad clínica. En <em>Confecciones Liss</em>, tratamos la manufactura de estas prendas con la misma precisión que un cirujano aborda una intervención, asegurando que quienes cuidan de nosotros, estén igualmente protegidos. Elegir bien es, al final del día, una decisión de salud pública.
              </p>
            </article>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-surface-variant flex items-center flex-wrap gap-3">
              <span className="font-headline font-bold text-sm text-primary uppercase tracking-wider">Etiquetas:</span>
              <Link href="#" className="px-4 py-1.5 bg-surface-container-high hover:bg-surface-variant transition-colors rounded-full font-label text-xs text-on-surface uppercase tracking-wider">Tecnología Textil</Link>
              <Link href="#" className="px-4 py-1.5 bg-surface-container-high hover:bg-surface-variant transition-colors rounded-full font-label text-xs text-on-surface uppercase tracking-wider">Bioseguridad</Link>
              <Link href="#" className="px-4 py-1.5 bg-surface-container-high hover:bg-surface-variant transition-colors rounded-full font-label text-xs text-on-surface uppercase tracking-wider">Uniformes</Link>
            </div>

            {/* Was this helpful Widget */}
            <div className="mt-8 bg-surface-container-low p-6 rounded-xl flex items-center justify-between border-none">
              <span className="font-headline font-medium text-primary">¿Te fue útil este artículo?</span>
              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">thumb_up</span>
                  <span className="font-label text-sm">24</span>
                </button>
                <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
                  <span className="material-symbols-outlined">thumb_down</span>
                  <span className="font-label text-sm">2</span>
                </button>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-12 bg-surface-container-lowest p-8 rounded-xl shadow-[0_20px_40px_rgba(20,48,103,0.08)] flex flex-col sm:flex-row gap-6 items-center sm:items-start border-none">
               <div className="w-24 h-24 rounded-full relative overflow-hidden flex-shrink-0">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7p9RXXrhX6x3tykqmKwtPIBIHhPCdfJH7fQldyqALTQLSSH-rI56oJUqUyJR5H8VI5YYeNu3Odk2a9Srv9b0Me-h4U6HzydeywXz-9Zr5pmS-U20ytokEP5VIjeM2HQ_ujyVcYcmCq2M82p3nYCBCssX76AiQKp9YFixLz9MHx_FhkQfxJpjm0oC9at0eDO0dfijLEHEG6d3fRxp0hv7K-FbHx_P_EsDc3i2hMYiAcGY8Zm4P3jqBkUIHflZaqyvbZN_Z7agI_0W_"
                    alt="Author"
                    fill
                    className="object-cover"
                  />
               </div>
              <div className="text-center sm:text-left">
                <h3 className="font-headline font-bold text-xl text-primary mb-2">Dra. Elena Valdés</h3>
                <p className="font-body text-on-surface-variant leading-relaxed mb-4">Especialista en medicina preventiva y asesora técnica en bioseguridad textil. Apasionada por elevar los estándares de protección del personal sanitario a través de la innovación en materiales.</p>
                <Link href="/blog" className="font-headline font-semibold text-[#143067] hover:text-primary flex items-center justify-center sm:justify-start gap-1 text-sm uppercase tracking-wider transition-colors">
                  Ver más artículos
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-16">
              <h3 className="font-headline font-bold text-2xl text-primary mb-8">Comentarios (0)</h3>
              
              <div className="bg-surface-container-low p-8 rounded-xl text-center mb-8 border-none">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">forum</span>
                <p className="font-body text-on-surface-variant">Aún no hay comentarios. ¡Sé el primero en compartir tu opinión!</p>
              </div>

              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block font-label text-xs uppercase tracking-wider text-on-surface-variant mb-2">Nombre completo</label>
                    <input type="text" id="name" placeholder="Ej. Dr. Juan Pérez" className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-label text-xs uppercase tracking-wider text-on-surface-variant mb-2">Correo electrónico</label>
                    <input type="email" id="email" placeholder="tu@email.com" className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary shadow-sm" />
                  </div>
                </div>
                <div>
                  <label htmlFor="comment" className="block font-label text-xs uppercase tracking-wider text-on-surface-variant mb-2">Tu comentario</label>
                  <textarea id="comment" rows={5} placeholder="Escribe tu mensaje aquí..." className="w-full bg-white border border-outline-variant/50 rounded-sm px-4 py-3 focus:ring-2 focus:ring-primary shadow-sm resize-y"></textarea>
                </div>
                <button type="button" className="bg-[#143067] text-white font-headline font-semibold text-sm uppercase tracking-wider px-8 py-4 rounded-sm hover:bg-primary transition-colors">
                  Publicar Comentario
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar (28%) */}
          <div className="lg:w-[28%] mt-12 lg:mt-0">
            <h3 className="font-headline font-bold text-xl text-primary mb-6 border-b-2 border-primary-container pb-2 inline-block">Artículos Relacionados</h3>
            
            <div className="flex flex-col gap-6">
              {/* Related Card 1 */}
              <Link href="#" className="group block bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(20,48,103,0.03)] overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(20,48,103,0.08)] border-none">
                <div className="h-40 overflow-hidden relative">
                   <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmDZD0yKWkQmdO5xbmFUjfs0rHJLgjPz9NFadz2UbDrp6CaVM6fnxnd3-EDqaYZwn4KeHDrCXCIZUrSNM0E66SbmZJS4xNsBPl7HEySQKbA4H1Yqv33QXHHXcibTA9OmKJfa1DGgJ-tnbi8e0Dz6qJ2leUjbm4uAof8juu7eHROJx-rKKjUaqdKpC6g5i-Ka92SXzMxd1DsnTBRHCW69lSRFPJJQennKkJhZiHtrQPxVoXqH5kKssWpQwLtnzvezyWehSVEmc65KiH"
                      alt="Doctor in clinic"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="p-5 bg-surface-container-lowest">
                  <span className="font-label text-[10px] text-primary uppercase tracking-widest mb-2 block">Tendencias</span>
                  <h4 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-2">Colores en el Área de Salud: Qué Transmiten a tus Pacientes</h4>
                  <p className="font-label text-xs text-on-surface-variant mt-3 uppercase tracking-wider">5 Oct 2023</p>
                </div>
              </Link>
              
              {/* Related Card 2 */}
              <Link href="#" className="group block bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(20,48,103,0.03)] overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(20,48,103,0.08)] border-none">
                <div className="h-40 overflow-hidden relative">
                  <Image
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3BfWQyyi9LajLl8l_YR-zubirOJcIsHC3Zzb8kZmo5xwIvUCdZtgvPO_f6TfjB3pVWmR_QFo2TJxwBVxagjhKclhs3bBvlAueojD9nXWAAuBRWwE1IhdzJFKP96IIm-Lhmo1FTWm-R3bQprwbwASxuDb36AYw5NLf3QJ3wxjqGzAbHHBZDJPnXOOTUWk3BYUDUfK787nKN9VaI8-DpiaWOLHQFU0UHE1syWr-5Fu8bo-HFm18VvWHiNo94swkvVyDcyXqZQmXz1Tp"
                    alt="Sewing machine details"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 bg-surface-container-lowest">
                  <span className="font-label text-[10px] text-primary uppercase tracking-widest mb-2 block">Manufactura</span>
                  <h4 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-2">El Arte de la Confección: Detrás de Escena en Nuestro Taller</h4>
                  <p className="font-label text-xs text-on-surface-variant mt-3 uppercase tracking-wider">28 Sep 2023</p>
                </div>
              </Link>

              {/* Related Card 3 */}
              <Link href="#" className="group block bg-surface-container-lowest rounded-xl shadow-[0_4px_12px_rgba(20,48,103,0.03)] overflow-hidden transition-all hover:shadow-[0_20px_40px_rgba(20,48,103,0.08)] border-none">
                <div className="h-40 overflow-hidden bg-primary-container relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#001b4a] to-[#143067]"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <h4 className="font-body italic text-white text-lg">Guía Definitiva de Cuidados para Uniformes Médicos</h4>
                  </div>
                </div>
                <div className="p-5 bg-surface-container-lowest">
                  <span className="font-label text-[10px] text-primary uppercase tracking-widest mb-2 block">Guías Prácticas</span>
                  <h4 className="font-headline font-bold text-base text-on-surface group-hover:text-primary transition-colors line-clamp-2">Prolonga la Vida de tu Ropa de Trabajo</h4>
                  <p className="font-label text-xs text-on-surface-variant mt-3 uppercase tracking-wider">15 Sep 2023</p>
                </div>
              </Link>
            </div>

            {/* Newsletter Signup Sidebar */}
            <div className="mt-8 bg-surface-container-low p-6 rounded-xl border-none">
              <span className="material-symbols-outlined text-primary text-3xl mb-3">mark_email_unread</span>
              <h4 className="font-headline font-bold text-lg text-primary mb-2">Suscríbete al Boletín</h4>
              <p className="font-body text-sm text-on-surface-variant mb-4">Recibe las últimas novedades sobre innovación textil y ofertas exclusivas.</p>
              <form>
                <input type="email" placeholder="Tu correo electrónico" className="w-full bg-white border border-outline-variant/30 rounded-sm px-3 py-2 mb-3 text-sm focus:ring-2 focus:ring-primary" required />
                <button type="submit" className="w-full bg-primary text-white font-headline text-xs font-semibold uppercase tracking-widest py-3 rounded-sm hover:bg-primary-container transition-colors">
                  Suscribirse
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
