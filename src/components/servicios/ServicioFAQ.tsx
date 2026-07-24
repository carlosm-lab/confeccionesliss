"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface FAQ {
  question: string;
  answer: string;
}

interface ServicioFAQProps {
  faqs: FAQ[];
}

function FAQItem({ question, answer }: FAQ) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-primary/12 overflow-hidden rounded-[16px] border bg-white">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none"
        aria-expanded={isOpen}
      >
        <span className="text-primary font-serif text-lg font-bold">
          {question}
        </span>
        <Icon
          name="expand_more"
          className="text-[#143067] transition-transform duration-300"
          aria-hidden="true"
        />
      </button>
      <div
        className={cn(
          "overflow-hidden px-6 transition-all duration-300 ease-out",
          isOpen ? "max-h-[300px] pb-5" : "max-h-0"
        )}
      >
        <p className="text-on-surface-variant border-primary/10 border-t pt-4 font-sans text-base leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function ServicioFAQ({ faqs }: ServicioFAQProps) {
  return (
    <section className="px-4 py-12 md:px-10 md:py-16">
      <div className="mb-12 text-center">
        <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
          Preguntas Frecuentes
        </h2>
        <p className="text-on-surface-variant mt-4 font-sans text-base">
          Resolvemos sus dudas sobre el proceso de bordado.
        </p>
      </div>
      <div className="mx-auto flex max-w-3xl flex-col gap-4">
        {faqs.map((faq, idx) => (
          <FAQItem key={idx} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </section>
  );
}
