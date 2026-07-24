import { Icon } from "@/components/ui/icons/Icon";
import Link from "next/link";

export default function PublicNotFound() {
  return (
    <section
      className="bg-background relative flex flex-col items-center justify-center px-5 py-10 text-center select-none"
      style={{ minHeight: "calc(100dvh - 56px)" }}
    >
      <div className="flex flex-col items-center justify-center gap-6 md:gap-8">
        <span
          className="font-sans text-[25vw] leading-none font-black tracking-tighter md:text-[20vw] lg:text-[15vw]"
          style={{
            WebkitTextStroke: "3px var(--color-primary)",
            color: "transparent",
          }}
        >
          404
        </span>
        <h1 className="text-primary font-serif text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl lg:text-5xl">
          Página no Encontrada
        </h1>
        <p className="text-on-surface-variant max-w-md font-sans text-base leading-relaxed">
          La página que buscas no existe o fue movida. Usa los enlaces de abajo
          para continuar navegando.
        </p>
        <div className="mt-4 flex flex-col items-center gap-6">
          <div className="flex w-full flex-col justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/catalogo"
              className="btn-gradient ambient-shadow flex h-12 w-full items-center justify-center rounded-md px-8 text-base font-semibold text-white transition hover:opacity-90 active:scale-[0.97] sm:w-auto"
            >
              Ver catálogo
            </Link>
            <Link
              href="/"
              className="border-outline text-primary flex h-12 w-full items-center justify-center rounded-md border bg-white px-8 text-base font-medium transition hover:bg-gray-50 active:scale-[0.97] sm:w-auto"
            >
              Ir al inicio
            </Link>
          </div>

          <a
            href="https://wa.me/50378063903"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/80 inline-flex items-center gap-1 font-sans text-sm font-semibold transition hover:underline"
          >
            Escribir por WhatsApp
            <Icon name="arrow_forward" size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}
