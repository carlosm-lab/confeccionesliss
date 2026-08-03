import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/icons/Icon";

export function BlogWhatsAppCTA() {
  const whatsappUrl = `${siteConfig.links.whatsapp}?text=${encodeURIComponent(
    "Hola Confecciones Liss, leí sus guías en el blog y estoy listo para pedir mi uniforme / cotizar mi pedido."
  )}`;

  return (
    <section
      aria-label="Cotización de uniformes"
      className="bg-primary my-12 overflow-hidden rounded-3xl border border-white/10 p-8 text-white shadow-xl sm:p-12"
    >
      <div className="mx-auto max-w-3xl space-y-4 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-xs">
          <Icon name="sparkles" size={14} className="text-blue-200" />
          Atención Directa en San Miguel y Envío a Todo El Salvador
        </span>

        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
          ¿Listo para pedir tu uniforme o necesitas cotización personal?
        </h2>

        <p className="font-body mx-auto max-w-2xl text-sm leading-relaxed text-blue-100 sm:text-base">
          Atendemos pedidos individuales para estudiantes y colectivos para
          promociones de Ciencias de la Salud (UNIVO, IEPROES, UGB, UNAB, UES,
          UMA) en San Miguel y la zona oriental.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex items-center gap-2.5 rounded-xl bg-white px-6 py-3 text-sm font-bold shadow-lg transition-all hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <Icon name="chat" size={18} className="text-primary" />
            Cotizar por WhatsApp
          </a>

          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xs transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Ver catálogo de productos
            <Icon name="arrow_forward" size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
