import { socialLinks } from "@/lib/seo-data";
import {
  SiFacebook,
  SiGooglemaps,
  SiInstagram,
  SiTiktok,
  SiYoutube,
} from "react-icons/si";
import type { IconType } from "react-icons";

const socialIconMap: Record<string, { Icon: IconType; color: string }> = {
  Facebook: { Icon: SiFacebook, color: "#1877F2" },
  Instagram: { Icon: SiInstagram, color: "#E1306C" },
  TikTok: { Icon: SiTiktok, color: "#000000" },
  YouTube: { Icon: SiYoutube, color: "#FF0000" },
  "Google Maps": { Icon: SiGooglemaps, color: "#4285F4" },
};

export function NapContacto() {
  return (
    <section
      aria-labelledby="contacto-heading"
      className="bg-surface-container-lowest px-5 py-14 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-screen-xl">
        <h2
          id="contacto-heading"
          className="text-primary mb-8 text-center font-serif text-2xl"
        >
          Visítanos o contáctanos — Confecciones Liss San Miguel
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* DIRECCIÓN */}
          <div className="text-center">
            <div className="bg-primary text-on-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <span className="material-symbols-outlined">location_on</span>
            </div>
            <h3 className="text-primary mb-2 font-serif text-lg font-semibold">
              Dirección
            </h3>
            <address className="text-on-surface-variant text-sm leading-relaxed not-italic">
              <strong className="text-on-surface">Confecciones Liss</strong>
              <br />
              Barrio La Merced,
              <br />
              5A Calle Poniente &amp; 1A Avenida Sur,
              <br />
              San Miguel, San Miguel,
              <br />
              El Salvador
              <br />
              <small className="text-xs">
                (A la par del edificio anexo UNAB, sobre la calle de la Corte de
                Cuentas)
              </small>
            </address>
          </div>

          {/* CONTACTO */}
          <div className="text-center">
            <div className="bg-primary text-on-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <span className="material-symbols-outlined">phone</span>
            </div>
            <h3 className="text-primary mb-2 font-serif text-lg font-semibold">
              Contacto
            </h3>
            <div className="text-on-surface-variant space-y-2 text-sm">
              <p>
                <strong className="text-on-surface">WhatsApp:</strong>{" "}
                <a
                  href="https://confeccionesliss.axkar.com/"
                  className="text-primary hover:underline"
                >
                  +503 7331-7181
                </a>
              </p>
              <p>
                <strong className="text-on-surface">Correo:</strong>{" "}
                <a
                  href="mailto:confeccionesliss.contacto@gmail.com"
                  className="text-primary text-xs hover:underline"
                >
                  confeccionesliss.contacto@gmail.com
                </a>
              </p>
              <p>
                <strong className="text-on-surface">Web:</strong>{" "}
                <a
                  href="https://www.confeccionesliss.com"
                  className="text-primary hover:underline"
                >
                  www.confeccionesliss.com
                </a>
              </p>
            </div>
          </div>

          {/* HORARIO */}
          <div className="text-center">
            <div className="bg-primary text-on-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <span className="material-symbols-outlined">schedule</span>
            </div>
            <h3 className="text-primary mb-2 font-serif text-lg font-semibold">
              Horario de atención
            </h3>
            <div className="text-on-surface-variant space-y-1 text-sm">
              <p>
                <strong className="text-on-surface">Lunes a sábado</strong>
              </p>
              <p>8:00 a.m. — 5:00 p.m.</p>
              <p className="text-secondary mt-2 text-xs">
                También puedes escribirnos por WhatsApp
                <br />
                fuera del horario para consultas.
              </p>
            </div>
          </div>
        </div>

        {/* REDES SOCIALES */}
        <div className="mt-12 text-center">
          <p className="text-on-surface-variant mb-4 text-sm">
            Síguenos en redes sociales para ver nuestros trabajos más recientes:
          </p>
          <div className="flex justify-center gap-4">
            {socialLinks.map((s) => {
              const entry = socialIconMap[s.red];
              if (!entry) return null;
              const { Icon, color } = entry;
              return (
                <a
                  key={s.red}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Seguir Confecciones Liss en ${s.red}`}
                  title={`Confecciones Liss en ${s.red}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110"
                  style={{ color }}
                >
                  <Icon className="text-2xl" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
