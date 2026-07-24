import { socialLinks } from "@/lib/seo-data";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/icons/Icon";
import {
  SiFacebook,
  SiGooglemaps,
  SiInstagram,
  SiTiktok,
  SiYoutube,
  SiWhatsapp,
  SiThreads,
  SiPinterest,
  SiX,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { IconType } from "react-icons";

const socialIconMap: Record<string, { Icon: IconType; color: string }> = {
  Facebook: { Icon: SiFacebook, color: "#1877F2" },
  "Facebook Admin": { Icon: SiFacebook, color: "#1877F2" },
  Instagram: { Icon: SiInstagram, color: "#E1306C" },
  TikTok: { Icon: SiTiktok, color: "#000000" },
  YouTube: { Icon: SiYoutube, color: "#FF0000" },
  "Google Maps": { Icon: SiGooglemaps, color: "#4285F4" },
  WhatsApp: { Icon: SiWhatsapp, color: "#25D366" },
  Threads: { Icon: SiThreads, color: "#000000" },
  Twitter: { Icon: SiX, color: "#000000" },
  LinkedIn: { Icon: FaLinkedin, color: "#0077B5" },
  Pinterest: { Icon: SiPinterest, color: "#E60023" },
  MarketPlace: { Icon: SiFacebook, color: "#1877F2" },
};

export function NapContacto() {
  return (
    <section
      aria-labelledby="contacto-heading"
      className="bg-surface-container-lowest px-5 py-14 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-screen-2xl">
        <h2
          id="contacto-heading"
          className="text-primary animate-fade-in-up mb-8 text-center font-serif text-2xl"
          style={{ animationDelay: "100ms" }}
        >
          Visítanos o contáctanos — Confecciones Liss San Miguel
        </h2>
        {/* Mobile/Tablet: horizontal cards (icon + text). Desktop: 3-col centered grid */}
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-3 lg:gap-8">
          {/* DIRECCIÓN */}
          <div
            className="animate-fade-in-up flex flex-row items-start gap-4 lg:flex-col lg:items-center lg:text-center"
            style={{ animationDelay: "150ms" }}
          >
            <div className="bg-primary text-on-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95">
              <Icon name="location_on" size={24} />
            </div>
            <div>
              <h3 className="text-primary mb-1 font-serif text-lg font-semibold">
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
                  (A la par del edificio anexo UNAB, sobre la calle de la Corte
                  de Cuentas)
                </small>
              </address>
            </div>
          </div>

          {/* CONTACTO */}
          <div
            className="animate-fade-in-up flex flex-row items-start gap-4 lg:flex-col lg:items-center lg:text-center"
            style={{ animationDelay: "200ms" }}
          >
            <div className="bg-primary text-on-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95">
              <Icon name="phone" size={24} />
            </div>
            <div>
              <h3 className="text-primary mb-1 font-serif text-lg font-semibold">
                Contacto
              </h3>
              <div className="text-on-surface-variant space-y-2 text-sm">
                <p>
                  <strong className="text-on-surface">WhatsApp:</strong>{" "}
                  <a
                    href={siteConfig.links.whatsappDirect}
                    className="text-primary inline-block transition-transform hover:underline active:scale-[0.98]"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <strong className="text-on-surface">Correo:</strong>{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary inline-block text-xs transition-transform hover:underline active:scale-[0.98]"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p>
                  <strong className="text-on-surface">Web:</strong>{" "}
                  <a
                    href="https://www.confeccionesliss.com"
                    className="text-primary inline-block transition-transform hover:underline active:scale-[0.98]"
                  >
                    www.confeccionesliss.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* HORARIO */}
          <div
            className="animate-fade-in-up flex flex-row items-start gap-4 lg:flex-col lg:items-center lg:text-center"
            style={{ animationDelay: "250ms" }}
          >
            <div className="bg-primary text-on-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-transform active:scale-95">
              <Icon name="schedule" size={24} />
            </div>
            <div>
              <h3 className="text-primary mb-1 font-serif text-lg font-semibold">
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
        </div>

        {/* REDES SOCIALES */}
        <div
          className="animate-fade-in-up mt-12 text-center"
          style={{ animationDelay: "300ms" }}
        >
          <p className="text-on-surface-variant mb-4 text-sm">
            Síguenos en redes sociales para ver nuestros trabajos más recientes:
          </p>
          <div className="mx-auto flex max-w-md flex-wrap justify-center gap-3">
            {socialLinks.map((s, index) => {
              const entry = socialIconMap[s.red];
              if (!entry) return null;
              const { Icon } = entry;
              return (
                <a
                  key={s.red}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Seguir Confecciones Liss en ${s.red}`}
                  title={`Confecciones Liss en ${s.red}`}
                  className="text-on-surface-variant flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110 active:scale-90"
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
