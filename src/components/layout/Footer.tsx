import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary mt-auto font-sans text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-3">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-white"
              data-icon="content_cut"
            >
              content_cut
            </span>
            <span className="font-serif text-2xl font-bold italic">
              Confecciones Liss
            </span>
          </div>
          <p className="text-primary-container mb-6 max-w-xs text-sm">
            Tailored with surgical precision in San Miguel. Uniformes que
            reflejan tu profesionalismo.
          </p>
          <div className="flex gap-4">
            {/* Social icons */}
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-sm">
                photo_camera
              </span>
            </Link>
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="material-symbols-outlined text-sm">
                facebook
              </span>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-serif text-lg">Enlaces Rápidos</h4>
          <ul className="text-primary-container space-y-3 text-sm">
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/catalogo/salud"
              >
                Catálogo Completo
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/novedades"
              >
                Novedades
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/nosotros"
              >
                Nosotros
              </Link>
            </li>
            <li>
              <Link
                className="transition-colors hover:text-white"
                href="/ayuda"
              >
                Preguntas Frecuentes
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 font-serif text-lg">Contacto</h4>
          <ul className="text-primary-container space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                location_on
              </span>{" "}
              San Miguel, El Salvador
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                phone
              </span>{" "}
              +503 7000-0000
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>{" "}
              contacto@confeccionesliss.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="text-primary-container mx-auto flex w-full max-w-screen-2xl flex-col items-center justify-between px-8 py-6 text-xs md:flex-row">
          <p>
            © {new Date().getFullYear()} Confecciones Liss. Todos los derechos
            reservados.
          </p>
          <nav className="mt-4 flex gap-6 md:mt-0">
            <Link
              className="transition-colors hover:text-white"
              href="/legal#privacidad"
            >
              Privacidad
            </Link>
            <Link
              className="transition-colors hover:text-white"
              href="/legal#terminos"
            >
              Términos de Servicio
            </Link>
            <Link
              className="transition-colors hover:text-white"
              href="/ayuda#envios"
            >
              Envíos
            </Link>
            <Link
              className="transition-colors hover:text-white"
              href="/ayuda#devoluciones"
            >
              Devoluciones
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
