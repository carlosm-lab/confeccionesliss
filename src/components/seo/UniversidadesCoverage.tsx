import { universities } from "@/lib/seo-data";

export function UniversidadesCoverage() {
  return (
    <section
      aria-labelledby="universidades-heading"
      className="bg-surface px-8 py-20"
    >
      <div className="mx-auto max-w-screen-xl">
        <h2
          id="universidades-heading"
          className="text-primary mb-4 text-center font-serif text-3xl lg:text-4xl"
        >
          Uniformes para todas las universidades de la zona oriental
        </h2>
        <p className="text-on-surface-variant mx-auto mb-12 max-w-2xl text-center text-sm">
          Si estudias en alguna de estas instituciones, tenemos los uniformes de
          tu carrera. Trabajamos con las especificaciones exactas de cada
          universidad.
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {universities.map((u) => (
            <article
              key={u.sigla}
              aria-label={`Uniformes ${u.sigla} ${u.nombre}`}
              className="bg-surface-container-lowest ambient-shadow rounded-xl p-6 text-center"
            >
              <div className="bg-primary text-on-primary mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold">
                {u.sigla.substring(0, 2)}
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

        <div className="mt-8 text-center">
          <p className="text-on-surface-variant mb-4 text-sm">
            ¿Tu institución no aparece? Igualmente podemos confeccionar tus
            uniformes.
          </p>
          <a
            href="https://wa.me/50373317181?text=Hola,%20necesito%20uniformes%20para%20mi%20universidad"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-on-primary inline-block rounded-md px-8 py-3 font-semibold transition-opacity hover:opacity-90"
          >
            Consultar por mi universidad
          </a>
        </div>
      </div>
    </section>
  );
}
