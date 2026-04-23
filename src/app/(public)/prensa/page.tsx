import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Sala de Prensa - Confecciones Liss",
  description: "Recursos e información para medios de comunicación.",
};

export default function PrensaPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="from-primary to-primary-container text-on-primary relative flex h-[200px] w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br px-4">
        <div className="bg-primary/20 absolute inset-0 mix-blend-multiply"></div>
        <div className="relative z-10 text-center">
          <h1 className="font-headline mb-2 text-4xl font-extrabold tracking-tight md:text-5xl">
            Sala de Prensa
          </h1>
          <p className="font-body text-on-primary/90 mx-auto max-w-2xl font-medium">
            Recursos e información para medios de comunicación.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-12 lg:px-8">
        {/* Left Column (Resources & Mentions) */}
        <div className="space-y-16 lg:col-span-8">
          {/* Brand Resources */}
          <section>
            <h2 className="font-headline text-on-surface border-surface-container-low mb-8 border-b pb-4 text-2xl font-bold">
              Recursos de Marca
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {/* Resource Card 1 */}
              <div className="bg-surface-container-lowest group flex flex-col items-center rounded-lg p-6 text-center shadow-[0_4px_24px_rgba(25,28,30,0.04)] transition-transform duration-300 hover:-translate-y-1">
                <div className="bg-surface-container-low text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    image
                  </span>
                </div>
                <h3 className="font-headline mb-1 text-lg font-bold">
                  Logo principal
                </h3>
                <p className="font-label text-outline mb-6 text-xs">
                  Formato PNG, Alta Resolución
                </p>
                <button className="from-primary to-primary-container text-on-primary font-label mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90">
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>{" "}
                  Descargar
                </button>
              </div>

              {/* Resource Card 2 */}
              <div className="bg-surface-container-lowest group flex flex-col items-center rounded-lg p-6 text-center shadow-[0_4px_24px_rgba(25,28,30,0.04)] transition-transform duration-300 hover:-translate-y-1">
                <div className="bg-surface-container-low text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    image
                  </span>
                </div>
                <h3 className="font-headline mb-1 text-lg font-bold">
                  Logo blanco
                </h3>
                <p className="font-label text-outline mb-6 text-xs">
                  Formato SVG, Vectorial
                </p>
                <button className="from-primary to-primary-container text-on-primary font-label mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90">
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>{" "}
                  Descargar
                </button>
              </div>

              {/* Resource Card 3 */}
              <div className="bg-surface-container-lowest group flex flex-col items-center rounded-lg p-6 text-center shadow-[0_4px_24px_rgba(25,28,30,0.04)] transition-transform duration-300 hover:-translate-y-1">
                <div className="bg-surface-container-low text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    picture_as_pdf
                  </span>
                </div>
                <h3 className="font-headline mb-1 text-lg font-bold">
                  Guía de marca
                </h3>
                <p className="font-label text-outline mb-6 text-xs">
                  PDF, Manual de Uso
                </p>
                <button className="from-primary to-primary-container text-on-primary font-label mt-auto flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-br px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90">
                  <span className="material-symbols-outlined text-sm">
                    download
                  </span>{" "}
                  Descargar
                </button>
              </div>
            </div>
          </section>

          {/* Mentions Grid */}
          <section>
            <div className="border-surface-container-low mb-8 flex items-end justify-between border-b pb-4">
              <h2 className="font-headline text-on-surface text-2xl font-bold">
                Menciones Recientes
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Mention 1 */}
              <article className="bg-surface-container-lowest flex flex-col rounded-lg p-6 shadow-[0_4px_24px_rgba(25,28,30,0.04)]">
                <div className="mb-3 flex items-center gap-2">
                  <span className="bg-secondary-fixed text-on-secondary-fixed font-label rounded-sm px-2 py-1 text-xs font-bold tracking-wider">
                    REVISTA MODA
                  </span>
                  <span className="text-outline font-label text-xs">
                    15 Oct 2025
                  </span>
                </div>
                <h3 className="font-headline text-on-surface mb-3 text-lg leading-tight font-bold">
                  La revolución del uniforme médico: Confecciones Liss marca la
                  pauta
                </h3>
                <p className="font-body text-on-surface-variant mb-6 line-clamp-2 text-sm">
                  Descubrimos cómo la empresa salvadoreña está transformando la
                  percepción de la ropa clínica con diseños que combinan
                  ergonomía extrema y estética de alta costura.
                </p>
                <Link
                  className="text-primary font-label hover:text-primary-container mt-auto flex items-center gap-1 text-sm font-bold"
                  href="#"
                >
                  Leer nota completa{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </article>

              {/* Mention 2 */}
              <article className="bg-surface-container-lowest flex flex-col rounded-lg p-6 shadow-[0_4px_24px_rgba(25,28,30,0.04)]">
                <div className="mb-3 flex items-center gap-2">
                  <span className="bg-surface-container-low text-on-surface font-label rounded-sm px-2 py-1 text-xs font-bold tracking-wider">
                    DIARIO EL MUNDO
                  </span>
                  <span className="text-outline font-label text-xs">
                    02 Sep 2025
                  </span>
                </div>
                <h3 className="font-headline text-on-surface mb-3 text-lg leading-tight font-bold">
                  Innovación textil: Tejidos antimicrobianos en hospitales
                  locales
                </h3>
                <p className="font-body text-on-surface-variant mb-6 line-clamp-2 text-sm">
                  Una mirada a los nuevos estándares de higiene impulsados por
                  la reciente línea de uniformes de Confecciones Liss, adoptada
                  por los principales centros médicos.
                </p>
                <Link
                  className="text-primary font-label hover:text-primary-container mt-auto flex items-center gap-1 text-sm font-bold"
                  href="#"
                >
                  Leer nota completa{" "}
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </article>
            </div>
          </section>
        </div>

        {/* Right Column (Sticky Info) */}
        <div className="space-y-8 lg:col-span-4">
          {/* Official Snippet */}
          <div className="bg-surface-container-lowest border-primary rounded-r-lg border-l-4 p-6 shadow-[0_4px_24px_rgba(25,28,30,0.04)]">
            <h3 className="font-headline text-on-surface mb-4 text-xl font-bold">
              Sobre Confecciones Liss{" "}
              <span className="text-outline mt-1 block text-sm font-normal">
                (para medios)
              </span>
            </h3>
            <div className="font-body text-on-surface-variant mb-6 space-y-4 text-sm">
              <p>
                Confecciones Liss es el atelier clínico líder en El Salvador,
                especializado en la creación de uniformes médicos de alto
                rendimiento que fusionan la precisión técnica con el diseño de
                vanguardia.
              </p>
              <p>
                Fundada bajo la premisa de que los profesionales de la salud
                merecen indumentaria que refleje la importancia de su labor, la
                empresa utiliza textiles avanzados que ofrecen durabilidad,
                protección antimicrobiana y un confort excepcional para jornadas
                extensas.
              </p>
              <p>
                Con un compromiso inquebrantable con la calidad y la innovación,
                Confecciones Liss atiende a las instituciones de salud más
                prestigiosas del país, redefiniendo el estándar del vestuario
                clínico.
              </p>
            </div>
            <button className="border-outline text-on-surface font-label hover:bg-surface-container-low flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition-colors">
              <span className="material-symbols-outlined text-sm">
                content_copy
              </span>{" "}
              Copiar texto
            </button>
          </div>

          {/* Press Contact */}
          <div className="bg-primary-fixed/30 flex flex-col items-center rounded-lg p-6 text-center">
            <div className="bg-primary text-on-primary mb-4 flex h-12 w-12 items-center justify-center rounded-full shadow-sm">
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                contact_mail
              </span>
            </div>
            <h3 className="font-headline text-on-primary-fixed mb-4 text-lg font-bold">
              Contacto de prensa
            </h3>
            <div className="font-body text-on-primary-fixed-variant space-y-2 text-sm">
              <p className="text-base font-bold">Ana Martínez</p>
              <p className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>{" "}
                prensa@confeccionesliss.com
              </p>
              <p className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">call</span>{" "}
                +503 2233-4455
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
