import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Blog - Confecciones Liss",
  description:
    "Por qué elegir los materiales correctos marca la diferencia en el día a día del profesional de la salud.",
};

export default function BlogArticlePage() {
  return (
    <>
      {/* Breadcrumb */}
      <div className="font-label text-on-surface-variant mx-auto w-full max-w-7xl px-4 py-4 text-xs tracking-wider uppercase sm:px-6 lg:px-8">
        <Link className="hover:text-primary transition-colors" href="/">
          Inicio
        </Link>
        <span className="mx-2">&gt;</span>
        <Link className="hover:text-primary transition-colors" href="/blog">
          Blog
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="text-primary font-medium">
          La Importancia de la Tela Antifluido en la Ropa Médica
        </span>
      </div>

      {/* Article Hero */}
      <div className="bg-primary relative flex h-[420px] w-full flex-col justify-end">
        <div className="absolute inset-0 z-0">
          <Image
            width={1920}
            height={420}
            alt="Medical professional"
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0PNhYnB93IuLVKzNXVL1lkuBI6QXjiJX2x2p9VclCHlMDFZ3XXrCvafX5npxCMV4TyOMtt5g-AsKcHljv0f2qb0fvAH852P0sYuxjHA0j4QnLIDmaW5jGI09X9skf9eKsUhmXkhGc6K3QYYOme1TgXf1rN5VKCfEsfh6vK8ZMRMsfTOMeKfm_KFc_mqwdBGcXgLYQdpPwdgzsGcShNnMUEuQ4qfzVuLCdMUDOCkcXBPjoZe37M8EEdKr4XDgKFSaUOC6tgM8-4491"
          />
          <div className="absolute inset-0 bg-black/55"></div>
        </div>
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-4 pb-10 text-center sm:px-6 lg:px-8">
          <span className="font-label mb-6 inline-block rounded-full border border-white/40 px-3 py-1 text-xs tracking-widest text-white uppercase backdrop-blur-sm">
            Innovación Textil
          </span>
          <h1 className="font-headline mb-4 max-w-4xl text-4xl leading-tight font-bold tracking-[-0.02em] text-white md:text-5xl lg:text-[3.5rem]">
            La Importancia de la Tela Antifluido en la Ropa Médica
          </h1>
          <p className="font-body mb-8 max-w-2xl text-xl text-white/90 italic">
            Por qué elegir los materiales correctos marca la diferencia en el
            día a día del profesional de la salud.
          </p>
          <div className="flex w-full max-w-4xl flex-col items-center justify-between border-t border-white/20 pt-6 sm:flex-row">
            <div className="mb-4 flex items-center gap-4 sm:mb-0">
              <Image
                width={48}
                height={48}
                alt="Author"
                className="h-12 w-12 rounded-full border-2 border-white object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDm41zSvGpP6dFZxT-kRKN-FchTfrTa8mgjZMeyjbxrxurHbncjkCY-u4I_op6o1X9NivciAnohR1B5OsNDf5zuKGub2sOrfH5EEwEbDYoUFSlFWkzXLMP4qGbBuBezhPygdyrA-Y2qr2cRt12ryLFzq4shdwrTap22YDz9v4ibqQCKytou0YWDWTf2DQX1xjV9Wv1I3qrxv-91Q24gd8AkUq6N261BT6KOj94be7tZN--ZoaXrXizmH0BoFcSjrGYkSaWB0zXTjHg6"
              />
              <div className="text-left">
                <p className="font-headline text-sm font-semibold text-white">
                  Dra. Elena Valdés
                </p>
                <p className="font-label text-xs tracking-wider text-white/70 uppercase">
                  12 Oct 2023 • 5 min de lectura
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label mr-2 hidden text-xs tracking-wider text-white/70 uppercase sm:inline-block">
                Compartir:
              </span>
              <button
                aria-label="Share on WhatsApp"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#25D366] text-white transition-opacity hover:opacity-90"
              >
                <span className="material-symbols-outlined text-[16px]">
                  chat
                </span>
              </button>
              <button
                aria-label="Share on Facebook"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1877F2] text-white transition-opacity hover:opacity-90"
              >
                <span className="material-symbols-outlined text-[16px]">
                  thumb_up
                </span>
              </button>
              <button
                aria-label="Copy Link"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <span className="material-symbols-outlined text-[16px]">
                  link
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Layout Container */}
      <div className="relative mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Share Bar */}
        <div className="mb-8 hidden flex-row items-center justify-center gap-4 lg:flex">
          <button
            aria-label="Share on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366] text-white transition-all hover:shadow-[0_8px_16px_rgba(37,211,102,0.2)]"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
          </button>
          <button
            aria-label="Share on Facebook"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1877F2] text-white transition-all hover:shadow-[0_8px_16px_rgba(24,119,242,0.2)]"
          >
            <span className="material-symbols-outlined text-[20px]">
              thumb_up
            </span>
          </button>
          <button
            aria-label="Copy Link"
            className="bg-surface-container-high text-primary hover:bg-surface-variant flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">link</span>
          </button>
          <button
            aria-label="Print"
            className="bg-surface-container-high text-primary hover:bg-surface-variant flex h-10 w-10 items-center justify-center rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">print</span>
          </button>
        </div>

        <div className="flex flex-col gap-12 lg:flex-row">
          {/* Main Content Column (72%) */}
          <div className="lg:w-[72%]">
            <article className="prose prose-lg font-body text-on-surface mx-auto max-w-[720px] text-[18px] leading-relaxed">
              <p className="first-letter:font-headline first-letter:text-primary first-letter:float-left first-letter:mr-2 first-letter:text-5xl first-letter:font-bold">
                E
              </p>
              <p>
                l entorno clínico exige no solo conocimiento y precisión, sino
                también las herramientas adecuadas para garantizar la seguridad
                tanto del paciente como del profesional. En el centro de esta
                preparación se encuentra un elemento a menudo subestimado: el
                tejido de nuestros uniformes médicos. La tela antifluido ha
                revolucionado la confección médica, elevando los estándares de
                bioseguridad a niveles sin precedentes en las últimas décadas.
              </p>
              <h2 className="font-headline text-primary border-primary-container mt-12 mb-6 border-l-4 pl-4 text-2xl font-bold">
                La Barrera Invisible: Cómo Funciona
              </h2>
              <p>
                La tecnología antifluido no es magia, es ciencia aplicada a la
                textura. Mediante tratamientos químicos especializados durante
                el proceso de hilado, o aplicando recubrimientos microscópicos
                sobre el tejido final, se altera la tensión superficial de la
                tela. Esto significa que cuando líquidos —ya sea agua,
                soluciones salinas o fluidos biológicos— entran en contacto con
                la superficie, en lugar de ser absorbidos, forman gotas que
                resbalan por la prenda.
              </p>
              <p>
                Esta barrera es crítica en entornos donde la exposición a
                patógenos es constante, actuando como la primera línea de
                defensa física en una sala de emergencias o quirófano.
              </p>
              <blockquote className="text-primary my-10 border-l-4 border-[#143067] bg-[#f0f4ff] p-6 text-xl font-medium italic">
                &quot;Un uniforme antifluido de calidad no solo protege la piel
                del profesional, sino que previene la contaminación cruzada
                entre áreas del hospital, salvando vidas de manera
                silenciosa.&quot;
              </blockquote>
              <h2 className="font-headline text-primary border-primary-container mt-12 mb-6 border-l-4 pl-4 text-2xl font-bold">
                Durabilidad sin Sacrificar Confort
              </h2>
              <p>
                Históricamente, la ropa protectora solía ser rígida, calurosa y
                poco ergonómica. Sin embargo, los avances en la confección de
                alta gama, como los aplicados en <em>Confecciones Liss</em>, han
                logrado integrar la tecnología antifluido en tejidos que
                mantienen una excelente transpirabilidad. Las microfibras
                modernas permiten que el vapor de sudor escape, mientras
                bloquean el ingreso de líquidos externos.
              </p>
              <figure className="my-10">
                <Image
                  width={720}
                  height={400}
                  alt="Detail of water droplets repelling off fabric"
                  className="w-full rounded-xl object-cover shadow-[0_20px_40px_rgba(20,48,103,0.08)]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAR-cJBl8QmjtBHbH_lIqWKcZquzZ70NIF9Q8U9QlGx2_qZATWnZBgbql-ZZm_2cMdfqiBCTxANJTsR86bW2kalYfGo6jbSDueh92MHpv2wVze0CuDCFVyVNlJFgrxiZ-EOhBwpXD3tjoaw8Fub3zYKCDu5eFyXOW9l1-9Cf70dJHhsn-Qe4YdX6R4tqtA1hDXA0ESUxYYqO6sKWLL-_Us0mFmgtuhl_67oE0sYN_xLtflBzCEJJWbCPMGTY3o45Frt3VLW2oEHYJjm"
                />
                <figcaption className="font-body text-on-surface-variant mt-4 text-center text-sm italic">
                  Detalle microscópico del comportamiento de fluidos sobre
                  tejido tratado con tecnología repelente de última generación.
                </figcaption>
              </figure>
              <h2 className="font-headline text-primary border-primary-container mt-12 mb-6 border-l-4 pl-4 text-2xl font-bold">
                Conclusión
              </h2>
              <p>
                Invertir en uniformes con tecnología antifluido no es un lujo,
                es una necesidad clínica. En <em>Confecciones Liss</em>,
                tratamos la manufactura de estas prendas con la misma precisión
                que un cirujano aborda una intervención, asegurando que quienes
                cuidan de nosotros, estén igualmente protegidos. Elegir bien es,
                al final del día, una decisión de salud pública.
              </p>
            </article>

            {/* Tags */}
            <div className="border-surface-variant mt-12 flex flex-wrap items-center gap-3 border-t pt-8">
              <span className="font-headline text-primary text-sm font-bold tracking-wider uppercase">
                Etiquetas:
              </span>
              <span className="bg-surface-container-high hover:bg-surface-variant font-label text-on-surface cursor-pointer rounded-full px-4 py-1.5 text-xs tracking-wider uppercase transition-colors">
                Tecnología Textil
              </span>
              <span className="bg-surface-container-high hover:bg-surface-variant font-label text-on-surface cursor-pointer rounded-full px-4 py-1.5 text-xs tracking-wider uppercase transition-colors">
                Bioseguridad
              </span>
              <span className="bg-surface-container-high hover:bg-surface-variant font-label text-on-surface cursor-pointer rounded-full px-4 py-1.5 text-xs tracking-wider uppercase transition-colors">
                Uniformes
              </span>
            </div>

            {/* Was this helpful */}
            <div className="bg-surface-container-low mt-8 flex items-center justify-between rounded-xl p-6">
              <span className="font-headline text-primary font-medium">
                ¿Te fue útil este artículo?
              </span>
              <div className="flex gap-4">
                <button className="text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined">thumb_up</span>
                  <span className="font-label text-sm">24</span>
                </button>
                <button className="text-on-surface-variant hover:text-primary flex items-center gap-2 transition-colors">
                  <span className="material-symbols-outlined">thumb_down</span>
                  <span className="font-label text-sm">2</span>
                </button>
              </div>
            </div>

            {/* Author Box */}
            <div className="bg-surface-container-lowest mt-12 flex flex-col items-center gap-6 rounded-xl p-8 shadow-[0_20px_40px_rgba(20,48,103,0.08)] sm:flex-row sm:items-start">
              <Image
                width={96}
                height={96}
                alt="Author"
                className="h-24 w-24 flex-shrink-0 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7p9RXXrhX6x3tykqmKwtPIBIHhPCdfJH7fQldyqALTQLSSH-rI56oJUqUyJR5H8VI5YYeNu3Odk2a9Srv9b0Me-h4U6HzydeywXz-9Zr5pmS-U20ytokEP5VIjeM2HQ_ujyVcYcmCq2M82p3nYCBCssX76AiQKp9YFixLz9MHx_FhkQfxJpjm0oC9at0eDO0dfijLEHEG6d3fRxp0hv7K-FbHx_P_EsDc3i2hMYiAcGY8Zm4P3jqBkUIHflZaqyvbZN_Z7agI_0W_"
              />
              <div className="text-center sm:text-left">
                <h3 className="font-headline text-primary mb-2 text-xl font-bold">
                  Dra. Elena Valdés
                </h3>
                <p className="font-body text-on-surface-variant mb-4 leading-relaxed">
                  Especialista en medicina preventiva y asesora técnica en
                  bioseguridad textil. Apasionada por elevar los estándares de
                  protección del personal sanitario a través de la innovación en
                  materiales.
                </p>
                <Link
                  className="font-headline hover:text-primary flex items-center justify-center gap-1 text-sm font-semibold tracking-wider text-[#143067] uppercase transition-colors sm:justify-start"
                  href="/blog"
                >
                  Ver más artículos
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-16">
              <h3 className="font-headline text-primary mb-8 text-2xl font-bold">
                Comentarios (0)
              </h3>
              <div className="bg-surface-container-low mb-8 rounded-xl p-8 text-center">
                <span className="material-symbols-outlined text-on-surface-variant mb-2 text-4xl">
                  forum
                </span>
                <p className="font-body text-on-surface-variant">
                  Aún no hay comentarios. ¡Sé el primero en compartir tu
                  opinión!
                </p>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      className="font-label text-on-surface-variant mb-2 block text-xs tracking-wider uppercase"
                      htmlFor="comment-name"
                    >
                      Nombre completo
                    </label>
                    <input
                      className="focus:ring-primary w-full rounded-sm border-none bg-white px-4 py-3 shadow-sm focus:ring-2"
                      id="comment-name"
                      placeholder="Ej. Dr. Juan Pérez"
                      type="text"
                    />
                  </div>
                  <div>
                    <label
                      className="font-label text-on-surface-variant mb-2 block text-xs tracking-wider uppercase"
                      htmlFor="comment-email"
                    >
                      Correo electrónico
                    </label>
                    <input
                      className="focus:ring-primary w-full rounded-sm border-none bg-white px-4 py-3 shadow-sm focus:ring-2"
                      id="comment-email"
                      placeholder="tu@email.com"
                      type="email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    className="font-label text-on-surface-variant mb-2 block text-xs tracking-wider uppercase"
                    htmlFor="comment-text"
                  >
                    Tu comentario
                  </label>
                  <textarea
                    className="focus:ring-primary w-full resize-y rounded-sm border-none bg-white px-4 py-3 shadow-sm focus:ring-2"
                    id="comment-text"
                    placeholder="Escribe tu mensaje aquí..."
                    rows={5}
                  ></textarea>
                </div>
                <button
                  className="font-headline hover:bg-primary rounded-sm bg-[#143067] px-8 py-4 text-sm font-semibold tracking-wider text-white uppercase transition-colors"
                  type="button"
                >
                  Publicar Comentario
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar (28%) */}
          <div className="mt-12 lg:mt-0 lg:w-[28%]">
            <h3 className="font-headline text-primary border-primary-container mb-6 inline-block border-b-2 pb-2 text-xl font-bold">
              Artículos Relacionados
            </h3>
            <div className="flex flex-col gap-6">
              {/* Related Card 1 */}
              <Link
                className="group bg-surface-container-lowest block overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(20,48,103,0.03)] transition-all hover:shadow-[0_20px_40px_rgba(20,48,103,0.08)]"
                href="/blog/colores-area-salud"
              >
                <div className="h-40 overflow-hidden">
                  <Image
                    width={400}
                    height={160}
                    alt="Doctor in clinic"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmDZD0yKWkQmdO5xbmFUjfs0rHJLgjPz9NFadz2UbDrp6CaVM6fnxnd3-EDqaYZwn4KeHDrCXCIZUrSNM0E66SbmZJS4xNsBPl7HEySQKbA4H1Yqv33QXHHXcibTA9OmKJfa1DGgJ-tnbi8e0Dz6qJ2leUjbm4uAof8juu7eHROJx-rKKjUaqdKpC6g5i-Ka92SXzMxd1DsnTBRHCW69lSRFPJJQennKkJhZiHtrQPxVoXqH5kKssWpQwLtnzvezyWehSVEmc65KiH"
                  />
                </div>
                <div className="bg-surface-container-lowest p-5">
                  <span className="font-label text-primary mb-2 block text-[10px] tracking-widest uppercase">
                    Tendencias
                  </span>
                  <h4 className="font-headline text-on-surface group-hover:text-primary line-clamp-2 text-base font-bold transition-colors">
                    Colores en el Área de Salud: Qué Transmiten a tus Pacientes
                  </h4>
                  <p className="font-label text-on-surface-variant mt-3 text-xs tracking-wider uppercase">
                    5 Oct 2023
                  </p>
                </div>
              </Link>

              {/* Related Card 2 */}
              <Link
                className="group bg-surface-container-lowest block overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(20,48,103,0.03)] transition-all hover:shadow-[0_20px_40px_rgba(20,48,103,0.08)]"
                href="/blog/arte-confeccion"
              >
                <div className="h-40 overflow-hidden">
                  <Image
                    width={400}
                    height={160}
                    alt="Sewing machine details"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3BfWQyyi9LajLl8l_YR-zubirOJcIsHC3Zzb8kZmo5xwIvUCdZtgvPO_f6TfjB3pVWmR_QFo2TJxwBVxagjhKclhs3bBvlAueojD9nXWAAuBRWwE1IhdzJFKP96IIm-Lhmo1FTWm-R3bQprwbwASxuDb36AYw5NLf3QJ3wxjqGzAbHHBZDJPnXOOTUWk3BYUDUfK787nKN9VaI8-DpiaWOLHQFU0UHE1syWr-5Fu8bo-HFm18VvWHiNo94swkvVyDcyXqZQmXz1Tp"
                  />
                </div>
                <div className="bg-surface-container-lowest p-5">
                  <span className="font-label text-primary mb-2 block text-[10px] tracking-widest uppercase">
                    Manufactura
                  </span>
                  <h4 className="font-headline text-on-surface group-hover:text-primary line-clamp-2 text-base font-bold transition-colors">
                    El Arte de la Confección: Detrás de Escena en Nuestro Taller
                  </h4>
                  <p className="font-label text-on-surface-variant mt-3 text-xs tracking-wider uppercase">
                    28 Sep 2023
                  </p>
                </div>
              </Link>

              {/* Related Card 3 */}
              <Link
                className="group bg-surface-container-lowest block overflow-hidden rounded-xl shadow-[0_4px_12px_rgba(20,48,103,0.03)] transition-all hover:shadow-[0_20px_40px_rgba(20,48,103,0.08)]"
                href="/blog/cuidados-uniformes"
              >
                <div className="bg-primary-container relative h-40 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#001b4a] to-[#143067]"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                    <h4 className="font-body text-lg text-white italic">
                      Guía Definitiva de Cuidados para Uniformes Médicos
                    </h4>
                  </div>
                </div>
                <div className="bg-surface-container-lowest p-5">
                  <span className="font-label text-primary mb-2 block text-[10px] tracking-widest uppercase">
                    Guías Prácticas
                  </span>
                  <h4 className="font-headline text-on-surface group-hover:text-primary line-clamp-2 text-base font-bold transition-colors">
                    Prolonga la Vida de tu Ropa de Trabajo
                  </h4>
                  <p className="font-label text-on-surface-variant mt-3 text-xs tracking-wider uppercase">
                    15 Sep 2023
                  </p>
                </div>
              </Link>
            </div>

            {/* Newsletter Signup Sidebar */}
            <div className="bg-surface-container-low mt-8 rounded-xl p-6">
              <span className="material-symbols-outlined text-primary mb-3 text-3xl">
                mark_email_unread
              </span>
              <h4 className="font-headline text-primary mb-2 text-lg font-bold">
                Suscríbete al Boletín
              </h4>
              <p className="font-body text-on-surface-variant mb-4 text-sm">
                Recibe las últimas novedades sobre innovación textil y ofertas
                exclusivas.
              </p>
              <label htmlFor="article-email" className="sr-only">
                Tu correo electrónico
              </label>
              <input
                id="article-email"
                className="focus:ring-primary mb-3 w-full rounded-sm border-none bg-white px-3 py-2 text-sm focus:ring-2"
                placeholder="Tu correo electrónico"
                type="email"
              />
              <button className="bg-primary font-headline hover:bg-primary-container w-full rounded-sm py-3 text-xs font-semibold tracking-widest text-white uppercase transition-colors">
                Suscribirse
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
