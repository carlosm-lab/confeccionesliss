"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export default function NotFound() {
  return (
    <div className="bg-background text-on-background relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />

      {/* Main Content */}
      <main
        id="main-content"
        className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-grow flex-col items-center justify-center px-6 pt-32 pb-24"
      >
        {/* Giant Decorative 404 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center overflow-hidden opacity-[0.15] select-none"
        >
          <span
            className="text-[30vw] leading-none font-black tracking-tighter"
            style={{ WebkitTextStroke: "2px #143067", color: "transparent" }}
          >
            404
          </span>
        </div>

        <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
          {/* Icon */}
          <div className="bg-primary/10 mb-8 flex h-20 w-20 items-center justify-center rounded-full">
            <span className="material-symbols-outlined text-primary text-4xl">
              content_cut
            </span>
          </div>

          <h1 className="text-primary mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">
            ¡Esta página se perdió en el taller!
          </h1>

          <p className="text-on-surface-variant max-w-md text-lg leading-relaxed md:text-xl">
            La página que buscas no existe o fue movida.
          </p>
        </div>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
