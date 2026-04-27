import Image from "next/image";
import { services } from "@/lib/seo-data";

export function ServiciosPrincipales() {
  return (
    <section
      aria-labelledby="servicios-heading"
      className="bg-surface px-8 py-20"
    >
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-12 flex flex-col items-start md:items-center">
          <div className="mb-4">
            <span className="bg-primary-container/10 text-primary-container rounded-full px-4 py-1 text-xs font-bold tracking-widest uppercase">
              ¿Qué fabricamos?
            </span>
          </div>
          <h2
            id="servicios-heading"
            className="text-primary text-left font-serif text-3xl leading-[1.15] tracking-tight text-balance md:text-center md:text-4xl lg:text-5xl"
          >
            Confección profesional de uniformes a la medida en El Salvador
          </h2>
          <div className="bg-tertiary mt-6 h-1 w-16 rounded-full"></div>
        </div>
        <p className="text-on-surface-variant mb-12 max-w-2xl text-left text-base leading-relaxed md:mx-auto md:text-center">
          Somos el único taller de{" "}
          <strong>scrubs a la medida en la zona oriental</strong> de El
          Salvador. Atendemos médicos, enfermeras, estudiantes, empresas y
          colegios de todo el país.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <article
              key={s.title}
              className="bg-surface-container-lowest border-surface-variant ambient-shadow group flex flex-col overflow-hidden rounded-xl border"
            >
              <div className="bg-primary/5 flex h-48 items-center justify-center">
                <Image
                  width={800}
                  height={400}
                  alt={s.imgAlt}
                  className="h-full w-full object-cover"
                  src={s.imgSrc}
                />
              </div>
              <div className="flex flex-col p-6">
                <h3 className="text-primary mb-3 font-serif text-xl font-bold">
                  {s.title}
                </h3>
                <p
                  className="text-on-surface-variant mb-4 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: s.description }}
                />
                <ul className="text-secondary mb-6 space-y-1 text-xs">
                  {s.features.map((f) => (
                    <li key={f}>✓ {f}</li>
                  ))}
                </ul>
                <a
                  href={`https://confeccionesliss.axkar.com/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-on-primary mt-auto rounded-md py-3 text-center text-sm font-semibold transition-opacity hover:opacity-90"
                >
                  {s.cta}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
