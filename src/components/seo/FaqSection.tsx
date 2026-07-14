"use client";

import { useState } from "react";
import { faqItems } from "@/lib/seo-data";

export function FaqSection() {
  const [openPairs, setOpenPairs] = useState<Record<number, boolean>>({});

  const handleToggle = (idx: number) => {
    const pairIdx = Math.floor(idx / 2);
    setOpenPairs((prev) => ({
      ...prev,
      [pairIdx]: !prev[pairIdx],
    }));
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-surface px-5 py-14 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-screen-2xl">
        <h2
          id="faq-heading"
          className="animate-fade-in-up section-title mb-4"
          style={{ animationDelay: "100ms" }}
        >
          Preguntas frecuentes sobre uniformes en El Salvador
        </h2>
        <p
          className="animate-fade-in-up text-on-surface-variant mb-12 w-full text-left text-sm md:text-center"
          style={{ animationDelay: "150ms" }}
        >
          Todo lo que necesitas saber antes de pedir tus uniformes en
          Confecciones Liss.
        </p>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {faqItems.map((faq, index) => {
            const pairIdx = Math.floor(index / 2);
            const isOpen = !!openPairs[pairIdx];
            return (
              <details
                key={faq.q}
                open={isOpen}
                className="animate-fade-in-up bg-surface-container-lowest ambient-shadow group rounded-xl p-6"
                style={{ animationDelay: `${index * 50 + 200}ms` }}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault();
                    handleToggle(index);
                  }}
                  className="text-primary flex cursor-pointer list-none items-center justify-between font-serif text-lg font-semibold"
                >
                  {faq.q}
                  <span className="material-symbols-outlined text-secondary ml-4 flex-shrink-0 transition-transform group-open:rotate-180">
                    expand_more
                  </span>
                </summary>
                <p className="text-on-surface-variant mt-4 text-sm leading-relaxed">
                  {faq.a}
                </p>
              </details>
            );
          })}
        </div>
      </div>
    </section>
  );
}
