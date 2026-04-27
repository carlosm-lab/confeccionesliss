import { faqItems } from "@/lib/seo-data";

export function FaqSection() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-surface px-5 py-14 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-screen-xl">
        <h2 id="faq-heading" className="section-title mb-4">
          Preguntas frecuentes sobre uniformes en El Salvador
        </h2>
        <p className="text-on-surface-variant mb-12 text-center text-sm">
          Todo lo que necesitas saber antes de pedir tus uniformes en
          Confecciones Liss.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {faqItems.map((faq) => (
            <details
              key={faq.q}
              className="bg-surface-container-lowest ambient-shadow group rounded-xl p-6"
            >
              <summary className="text-primary flex cursor-pointer list-none items-center justify-between font-serif text-lg font-semibold">
                {faq.q}
                <span className="material-symbols-outlined text-secondary ml-4 flex-shrink-0 transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <p className="text-on-surface-variant mt-4 text-sm leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
