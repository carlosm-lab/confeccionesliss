import { siteConfig } from "@/config/site";
import Image from "next/image";
import {
  SiFacebook,
  SiGooglemaps,
  SiInstagram,
  SiTiktok,
  SiYoutube,
} from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-primary mt-auto font-sans text-white">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-12 px-8 py-16 md:grid-cols-2">
        <div>
          <div className="mb-6 flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="Confecciones Liss"
              width={200}
              height={200}
              className="h-16 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-primary-container mb-6 max-w-xs text-sm">
            Confección profesional a la medida de scrubs médicos y uniformes en
            San Miguel, El Salvador. Envíos a todo el país con pago al recibir.
          </p>
          <div className="flex gap-4">
            <a
              className="flex h-10 w-10 items-center justify-center transition-transform hover:scale-110"
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir en Instagram"
              style={{ color: "#E1306C" }}
            >
              <SiInstagram className="text-2xl" aria-hidden="true" />
            </a>
            <a
              className="flex h-10 w-10 items-center justify-center transition-transform hover:scale-110"
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir en Facebook"
              style={{ color: "#1877F2" }}
            >
              <SiFacebook className="text-2xl" aria-hidden="true" />
            </a>
            <a
              className="flex h-10 w-10 items-center justify-center transition-transform hover:scale-110"
              href={siteConfig.links.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir en TikTok"
              style={{ color: "#FFFFFF" }}
            >
              <SiTiktok className="text-2xl" aria-hidden="true" />
            </a>
            <a
              className="flex h-10 w-10 items-center justify-center transition-transform hover:scale-110"
              href={siteConfig.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Seguir en YouTube"
              style={{ color: "#FF0000" }}
            >
              <SiYoutube className="text-2xl" aria-hidden="true" />
            </a>
            <a
              className="flex h-10 w-10 items-center justify-center transition-transform hover:scale-110"
              href={siteConfig.links.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver en Google Maps"
              style={{ color: "#4285F4" }}
            >
              <SiGooglemaps className="text-2xl" aria-hidden="true" />
            </a>
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
              Barrio La Merced, 5A Calle Poniente &amp; 1A Avenida Sur, San
              Miguel, El Salvador
            </li>
            <li className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                phone
              </span>{" "}
              <a
                href="https://confeccionesliss.axkar.com/"
                className="hover:underline"
              >
                +503 7331-7181
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                mail
              </span>{" "}
              confeccionesliss.contacto@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-[18px]"
                aria-hidden="true"
              >
                schedule
              </span>{" "}
              Lun–Sáb 8:00 AM – 5:00 PM
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
