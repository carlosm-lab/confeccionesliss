import { geoZonaOriental, geoRestoPais } from "@/lib/seo-data";

function MuniList({ items, prefix }: { items: string[]; prefix: string }) {
  return (
    <ul className="text-on-surface-variant space-y-1 text-xs">
      {items.map((m) => (
        <li key={m}>
          <span className="sr-only">{prefix} </span>
          {m}
        </li>
      ))}
    </ul>
  );
}

export function CoberturaNacional() {
  return (
    <section
      aria-labelledby="cobertura-heading"
      className="bg-surface-container-low px-8 py-16"
    >
      <div className="mx-auto max-w-screen-xl">
        <h2
          id="cobertura-heading"
          className="text-primary mb-4 text-center font-serif text-2xl"
        >
          Enviamos uniformes y scrubs a todo El Salvador
        </h2>
        <p className="text-on-surface-variant mb-10 text-center text-sm">
          Desde nuestro taller en <strong>San Miguel</strong>, enviamos con pago
          al recibir a cualquier municipio de los 14 departamentos de El
          Salvador. Confecciones Liss llega hasta ti.
        </p>

        {/* ZONA ORIENTAL */}
        <div className="mb-8">
          <h3 className="text-primary mb-4 font-serif text-xl font-semibold">
            🔵 Zona Oriental — Entrega rápida y recogida en taller
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                San Miguel (Oficina central)
              </h4>
              <MuniList
                items={geoZonaOriental.sanMiguel}
                prefix="Uniformes y scrubs en"
              />
            </div>
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                Usulután
              </h4>
              <MuniList
                items={geoZonaOriental.usulutan}
                prefix="Uniformes en"
              />
            </div>
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                La Unión
              </h4>
              <MuniList items={geoZonaOriental.laUnion} prefix="Scrubs en" />
            </div>
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                Morazán
              </h4>
              <MuniList items={geoZonaOriental.morazan} prefix="Uniformes en" />
            </div>
          </div>
        </div>

        {/* RESTO DEL PAÍS */}
        <div>
          <h3 className="text-primary mb-4 font-serif text-xl font-semibold">
            🟢 Todo El Salvador — Envío con pago al recibir
          </h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                San Salvador
              </h4>
              <MuniList
                items={geoRestoPais.sanSalvador}
                prefix="Uniformes en"
              />
            </div>
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                La Libertad
              </h4>
              <MuniList items={geoRestoPais.laLibertad} prefix="Scrubs en" />
            </div>
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                Santa Ana
              </h4>
              <MuniList items={geoRestoPais.santaAna} prefix="Uniformes en" />
            </div>
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                Sonsonate / La Paz
              </h4>
              <MuniList
                items={geoRestoPais.sonsonateLaPaz}
                prefix="Uniformes en"
              />
            </div>
            <div>
              <h4 className="text-primary-container mb-2 text-sm font-bold tracking-wide uppercase">
                Resto del país
              </h4>
              <MuniList
                items={geoRestoPais.resto}
                prefix="Scrubs y uniformes en"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
