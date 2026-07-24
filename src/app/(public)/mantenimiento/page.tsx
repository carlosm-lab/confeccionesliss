import { Icon } from "@/components/ui/icons/Icon";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Mantenimiento | Confecciones Liss",
  description:
    "El sitio se encuentra temporalmente en mantenimiento. Regresamos pronto.",
  robots: { index: false, follow: false },
};

export default function MantenimientoPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="flex w-full max-w-md flex-col items-center gap-8 text-center">
        {/* Logo */}
        <div className="relative h-20 w-20 overflow-hidden rounded-2xl shadow-lg">
          <Image
            src="/icon.png"
            alt="Confecciones Liss"
            fill
            sizes="80px"
            className="object-contain"
            priority
          />
        </div>

        {/* Ícono de mantenimiento animado */}
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 shadow-inner ring-1 ring-blue-100 dark:bg-blue-950/30 dark:ring-blue-800">
          <Icon
            name="construction"
            size={48}
            className="animate-pulse text-blue-500"
            aria-hidden="true"
          />
        </div>

        {/* Texto principal */}
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
            Estamos en mantenimiento
          </h1>
          <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Nuestro sitio está temporalmente fuera de servicio mientras
            realizamos mejoras. Regresaremos muy pronto.
          </p>
        </div>

        {/* Separador */}
        <div className="h-px w-full bg-slate-100 dark:bg-white/5" />

        {/* WhatsApp CTA — siempre disponible */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            ¿Necesitas hacer un pedido urgente?
          </p>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "50373317181"}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-green-600 px-6 py-3 font-bold text-white shadow-md transition hover:bg-green-700 hover:shadow-lg active:scale-[0.97]"
          >
            {/* WhatsApp icon inline — no dep externa */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 shrink-0"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Contáctanos por WhatsApp
          </a>
        </div>

        {/* Footer mínimo */}
        <p className="text-xs text-slate-400 dark:text-slate-600">
          © {new Date().getFullYear()} Confecciones Liss — Todos los derechos
          reservados
        </p>
      </div>
    </div>
  );
}
