import Link from "next/link";
import { siteConfig } from "@/config/site";

export default function NotFound() {
  return (
    <div className="bg-surface text-on-surface relative flex min-h-screen flex-col overflow-x-hidden">
      {/* Header */}
      <header className="bg-surface-container-lowest/80 fixed top-0 z-50 flex h-20 w-full items-center justify-between px-8 shadow-sm backdrop-blur-xl">
        <Link
          href="/"
          className="text-primary text-xl font-bold tracking-tighter"
        >
          Confecciones Liss
        </Link>
        <Link
          className="border-primary-container text-primary-container hover:bg-surface-container-low rounded-md border-[1.5px] px-6 py-2 font-medium transition-all duration-200"
          href="/"
        >
          Volver al inicio
        </Link>
      </header>

      {/* Main Content */}
      <main className="relative z-10 mx-auto flex w-full max-w-screen-xl flex-grow flex-col items-center justify-center px-6 pt-32 pb-24">
        {/* Giant Decorative 404 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-[0.03] select-none"
        >
          <span
            className="text-[30vw] leading-none font-black tracking-tighter"
            style={{ WebkitTextStroke: "2px #143067", color: "transparent" }}
          >
            404
          </span>
        </div>

        <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          {/* Icon */}
          <div className="bg-surface-container-low mb-8 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="material-symbols-outlined text-primary text-4xl">
              content_cut
            </span>
          </div>
          <h1 className="text-primary mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            ¡Oops! Esta página se perdió en el taller.
          </h1>
          <p className="text-on-surface-variant mb-10 text-lg leading-relaxed md:text-xl">
            La página que buscas no existe o fue movida.
          </p>
          <div className="mb-16 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
            <Link
              className="from-primary to-primary-container text-on-primary rounded-md bg-gradient-to-br px-8 py-3 text-center font-semibold transition-opacity hover:opacity-90"
              href="/"
            >
              Volver al inicio
            </Link>
            <a
              className="border-outline-variant/20 text-primary-container hover:bg-surface-container-low rounded-md border-[1.5px] bg-transparent px-8 py-3 text-center font-medium transition-colors"
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <span className="material-symbols-outlined text-on-surface-variant/60 absolute top-1/2 left-4 -translate-y-1/2">
              search
            </span>
            <input
              className="bg-surface-variant border-primary-fixed-dim text-on-surface focus:border-secondary placeholder:text-on-surface-variant/60 w-full rounded-t-md border-b-2 px-12 py-4 transition-colors focus:ring-0 focus:outline-none"
              placeholder="¿Buscabas algún producto?"
              type="text"
            />
          </div>
        </div>

        {/* Quick Links — Only existing pages/external links */}
        <section className="mt-24 mb-12 w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Link
              className="group bg-surface-container-lowest hover:bg-surface-container-high relative flex items-start gap-4 overflow-hidden rounded-xl p-6 transition-all duration-300"
              href="/"
            >
              <div className="bg-primary-fixed/30 group-hover:bg-primary-fixed/50 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">
                  home
                </span>
              </div>
              <div>
                <h3 className="text-primary group-hover:text-primary-container mb-1 text-lg font-bold tracking-tight transition-colors">
                  Página principal
                </h3>
                <span className="text-secondary flex items-center gap-1 text-sm font-medium transition-transform group-hover:translate-x-1">
                  Ir al inicio{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
              </div>
            </Link>
            <a
              className="group bg-surface-container-lowest hover:bg-surface-container-high relative flex items-start gap-4 overflow-hidden rounded-xl p-6 transition-all duration-300"
              href={siteConfig.links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-primary-fixed/30 group-hover:bg-primary-fixed/50 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">
                  chat
                </span>
              </div>
              <div>
                <h3 className="text-primary group-hover:text-primary-container mb-1 text-lg font-bold tracking-tight transition-colors">
                  Contacto WhatsApp
                </h3>
                <span className="text-secondary flex items-center gap-1 text-sm font-medium transition-transform group-hover:translate-x-1">
                  Escríbenos{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
              </div>
            </a>
            <a
              className="group bg-surface-container-lowest hover:bg-surface-container-high relative flex items-start gap-4 overflow-hidden rounded-xl p-6 transition-all duration-300"
              href={siteConfig.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-primary-fixed/30 group-hover:bg-primary-fixed/50 flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full transition-colors">
                <span className="material-symbols-outlined text-primary">
                  location_on
                </span>
              </div>
              <div>
                <h3 className="text-primary group-hover:text-primary-container mb-1 text-lg font-bold tracking-tight transition-colors">
                  Ubicación
                </h3>
                <span className="text-secondary flex items-center gap-1 text-sm font-medium transition-transform group-hover:translate-x-1">
                  Ver en Google Maps{" "}
                  <span className="material-symbols-outlined text-[16px]">
                    arrow_forward
                  </span>
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
