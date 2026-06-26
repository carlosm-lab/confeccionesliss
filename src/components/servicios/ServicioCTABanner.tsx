"use client";

import { siteConfig } from "@/config/site";

interface ServicioCTABannerProps {
  title: string;
  description: string;
  ctaText: string;
}

export function ServicioCTABanner({
  title,
  description,
  ctaText,
}: ServicioCTABannerProps) {
  const whatsappUrl = siteConfig.links.whatsappDirect;

  return (
    <section className="mb-12 px-4 py-12 md:px-10 md:py-20">
      <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden rounded-[24px] bg-[#143067] px-8 py-16 text-center shadow-lg md:py-24">
        {/* Woven background texture */}
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/woven.png')",
          }}
        />
        <h2 className="z-10 font-serif text-[28px] leading-tight font-bold text-white md:text-[48px]">
          {title}
        </h2>
        <p className="z-10 max-w-2xl font-sans text-lg leading-relaxed text-white/90">
          {description}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 mt-4 inline-flex cursor-pointer items-center gap-2 rounded-[12px] bg-white px-8 py-4 font-sans text-base font-bold text-[#143067] shadow-md transition-colors hover:bg-white/90"
        >
          <span
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            chat
          </span>
          {ctaText}
        </a>
      </div>
    </section>
  );
}
