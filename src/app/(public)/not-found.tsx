export default function PublicNotFound() {
  return (
    <section className="relative mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-screen-2xl flex-col items-center justify-center px-5 py-8 md:px-8 lg:h-[calc(100dvh-80px)]">
      <div className="flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left Side: Info */}
        <div className="z-10 flex w-full flex-col items-center text-center lg:flex-1 lg:items-start lg:text-left">
          {/* Icon */}
          <div className="bg-primary/10 mb-6 flex h-16 w-16 items-center justify-center rounded-full">
            <span
              className="material-symbols-outlined text-primary text-3xl"
              aria-hidden="true"
            >
              content_cut
            </span>
          </div>

          <h1 className="text-primary mb-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            ¡Esta página se perdió en el taller!
          </h1>

          <p className="text-on-surface-variant max-w-xl text-base leading-relaxed md:text-lg">
            Lo sentimos, el enlace que seguiste podría estar roto, la página ha
            sido eliminada o nunca existió. Si crees que esto es un error,
            puedes utilizar la navegación superior para regresar a la página
            principal y explorar nuestras categorías de scrubs y uniformes a la
            medida.
          </p>
        </div>

        {/* Right Side: Giant 404 */}
        <div className="flex w-full items-center justify-center select-none lg:flex-1">
          <span
            className="text-[25vw] leading-none font-black tracking-tighter lg:text-[15vw]"
            style={{
              WebkitTextStroke: "3px var(--color-primary)",
              color: "transparent",
            }}
          >
            404
          </span>
        </div>
      </div>
    </section>
  );
}
