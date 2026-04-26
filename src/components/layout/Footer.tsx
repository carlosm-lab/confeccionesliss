import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-primary mt-auto font-sans text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-2">
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
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir en Instagram"
            >
              <span
                className="material-symbols-outlined text-sm"
                aria-hidden="true"
              >
                photo_camera
              </span>
            </Link>
            <Link
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir en Facebook"
            >
              <span
                className="material-symbols-outlined text-sm"
                aria-hidden="true"
              >
                facebook
              </span>
            </Link>
          </div>
        </div>

        <div>
          <h4 className="mb-6 font-serif text-lg">Contacto</h4>
          <ul className="text-primary-container space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                location_on
              </span>{" "}
              San Miguel, El Salvador
            </li>
            <li className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                phone
              </span>{" "}
              +503 7000-0000
            </li>
            <li className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                mail
              </span>{" "}
              contacto@confeccionesliss.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="text-primary-container mx-auto flex w-full max-w-screen-2xl items-center justify-center px-8 py-6 text-xs">
          <p>
            © {new Date().getFullYear()} Confecciones Liss. Todos los derechos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
