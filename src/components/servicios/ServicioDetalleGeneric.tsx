"use client";

import { ServicioHero } from "./ServicioHero";
import { ServicioFAQ } from "./ServicioFAQ";
import { ServicioCTABanner } from "./ServicioCTABanner";
import Image from "next/image";

import { ServicePage } from "@/data/services";

interface ServicioDetalleGenericProps {
  service: ServicePage;
}

export function ServicioDetalleGeneric({
  service,
}: ServicioDetalleGenericProps) {
  return (
    <div className="mx-auto w-full max-w-screen-2xl">
      {/* Hero Section */}
      <ServicioHero
        title={service.title}
        description={service.description}
        features={service.heroFeatures}
        ctaText={service.ctaBanner.ctaText}
        heroImage={service.cardImage}
        slug={service.slug}
        navLabel={service.navLabel}
      />

      {/* Editorial Sections (Dynamic fallback) */}
      <section className="flex flex-col gap-16 px-5 py-14 md:px-8 md:py-20">
        {service.sections.map((section, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 items-center gap-12 md:grid-cols-2"
          >
            <div className={idx % 2 === 0 ? "order-1" : "order-1 md:order-2"}>
              <h2 className="text-primary mb-4 font-serif text-2xl font-bold md:text-3xl">
                {section.heading}
              </h2>
              <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                {section.body}
              </p>
            </div>
            <div
              className={
                idx % 2 === 0
                  ? "bg-primary/5 border-primary/10 relative order-2 h-[250px] overflow-hidden rounded-xl border md:col-span-1"
                  : "bg-primary/5 border-primary/10 relative order-2 h-[250px] overflow-hidden rounded-xl border md:order-1 md:col-span-1"
              }
            >
              <Image
                src={service.cardImage}
                alt={section.heading}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover opacity-80"
              />
            </div>
          </div>
        ))}
      </section>

      {/* FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <ServicioFAQ faqs={service.faqs} />
      )}

      {/* CTA Banner */}
      <ServicioCTABanner
        title={service.ctaBanner.title}
        description={service.ctaBanner.description}
        ctaText={service.ctaBanner.ctaText}
      />
    </div>
  );
}
