import { professions } from "@/lib/seo-data";

export function ProfesionesMedicas() {
  return (
    <section
      aria-labelledby="profesiones-heading"
      className="bg-surface px-5 py-14 md:px-8 md:py-16"
    >
      <div className="mx-auto max-w-screen-xl">
        <h2
          id="profesiones-heading"
          className="text-primary mb-4 text-center font-serif text-2xl"
        >
          Uniformes para cada profesión del sector salud
        </h2>
        <p className="text-on-surface-variant mx-auto mb-10 w-full max-w-2xl text-left text-sm md:text-center">
          En Confecciones Liss fabricamos scrubs y uniformes especializados para
          cada área de la salud. Cada prenda confeccionada según los
          requerimientos de tu especialidad.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {professions.map((prof) => (
            <div
              key={prof}
              className="bg-surface-container-lowest border-surface-variant text-on-surface-variant rounded-lg border px-3 py-2 text-center text-xs"
            >
              {prof}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
