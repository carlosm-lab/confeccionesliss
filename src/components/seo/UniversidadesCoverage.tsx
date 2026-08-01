import Image from "next/image";
import { siteConfig } from "@/config/site";
import { universities } from "@/lib/seo-data";

export function UniversidadesCoverage() {
  return (
    <section
      aria-labelledby="universidades-heading"
      className="bg-surface lazy-section px-5 py-14 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div
          className="animate-fade-in-up mb-10 flex flex-col items-center"
          style={{ animationDelay: "100ms" }}
        >
          <h2 id="universidades-heading" className="section-title">
            Uniformes para todas las universidades de la zona oriental
          </h2>
          <div className="bg-tertiary mt-6 h-1 w-16 rounded-full"></div>
        </div>
        <p
          className="animate-fade-in-up text-on-surface-variant mb-12 w-full max-w-2xl text-left text-base leading-relaxed md:mx-auto md:text-center"
          style={{ animationDelay: "150ms" }}
        >
          Si estudias en alguna de estas instituciones, tenemos los uniformes de
          tu carrera. Trabajamos con las especificaciones exactas de cada
          universidad.
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-7">
          {universities.map((u, index) => (
            <article
              key={u.sigla}
              aria-label={`Uniformes ${u.sigla} ${u.nombre}`}
              className="animate-fade-in-up bg-surface-container-lowest ambient-shadow rounded-xl p-6 text-center"
              style={{ animationDelay: `${index * 40 + 200}ms` }}
            >
              {/* Logo real o fallback con iniciales */}
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center">
                {u.logo ? (
                  <div className="relative h-14 w-14">
                    <Image
                      src={u.logo}
                      alt={`Logo ${u.sigla}`}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                ) : (
                  <div className="bg-primary text-on-primary flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold">
                    {u.sigla.substring(0, 2)}
                  </div>
                )}
              </div>
              <div className="text-primary mb-1 text-lg font-bold">
                {u.sigla}
              </div>
              <div className="text-on-surface-variant mb-2 text-xs leading-tight">
                {u.nombre}
              </div>
              <div className="text-secondary text-xs">{u.ciudad}</div>
            </article>
          ))}
        </div>

        <div
          className="animate-fade-in-up mt-8 text-center"
          style={{ animationDelay: "450ms" }}
        >
          <p className="text-on-surface-variant mb-4 text-sm">
            ¿Tu institución no aparece? Igualmente podemos confeccionar tus
            uniformes.
          </p>
          <a
            href={siteConfig.links.whatsappDirect}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary inline-block rounded-md px-8 py-3 font-semibold transition hover:opacity-90 active:scale-[0.97]"
          >
            Consultar por mi universidad
          </a>
        </div>
      </div>
    </section>
  );
}
