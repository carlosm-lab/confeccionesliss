export default function PublicNotFound() {
  return (
    <section
      className="bg-background relative flex flex-col justify-center overflow-x-hidden px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-14 lg:pb-4"
      style={{ minHeight: "calc(100dvh - 56px)" }}
    >
      <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
        {/* Left Side: Info */}
        <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
          {/* Title */}
          <h1 className="text-primary mb-6 w-full text-center font-serif text-3xl leading-[1.15] tracking-tight sm:text-4xl md:mb-10 md:flex md:flex-col md:items-center md:text-5xl lg:mb-6 lg:block lg:text-left lg:text-5xl xl:text-6xl xl:leading-[1.1]">
            ¡Esta página se perdió en el taller!
          </h1>

          {/* Responsive container for description / mobile 404 */}
          <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 md:items-stretch md:gap-12 lg:flex lg:flex-col lg:gap-0">
            {/* Mobile / Tablet 404 */}
            <div className="relative flex w-full items-center justify-center self-center py-4 select-none md:order-2 md:h-full md:max-w-none md:self-stretch lg:hidden">
              <span
                className="font-sans text-[25vw] leading-none font-black tracking-tighter md:text-[18vw]"
                style={{
                  WebkitTextStroke: "3px var(--color-primary)",
                  color: "transparent",
                }}
              >
                404
              </span>
            </div>

            {/* Description Column */}
            <div className="flex w-full flex-col items-start md:order-1 md:justify-center">
              <p className="text-on-surface-variant font-body mb-6 w-full text-center text-base leading-relaxed md:text-lg lg:mb-6 lg:text-left lg:text-xl">
                Lo sentimos, el enlace que seguiste podría estar roto, la página
                ha sido eliminada o nunca existió en nuestro taller de costura.
                Si crees que esto es un error de nuestra parte, puedes utilizar
                el menú de navegación superior para regresar a la página
                principal y explorar nuestro catálogo de scrubs y uniformes a la
                medida.
              </p>
            </div>
          </div>
        </div>

        {/* Desktop 404 */}
        <div className="hidden h-full select-none lg:flex lg:w-[45%] lg:items-center lg:justify-center">
          <span
            className="font-sans text-[15vw] leading-none font-black tracking-tighter"
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
