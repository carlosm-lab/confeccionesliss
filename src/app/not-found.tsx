import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";

export const metadata: Metadata = {
  title: { absolute: "404 — Página no encontrada | Confecciones Liss" },
  description:
    "La página que buscas no existe. Vuelve al inicio de Confecciones Liss para encontrar scrubs, uniformes y servicios de confección en San Miguel.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="bg-background text-on-background relative flex min-h-screen flex-col overflow-x-hidden">
      <Navbar />

      {/* Main Content */}
      <main id="main-content" className="flex flex-grow flex-col">
        <section
          className="bg-background relative flex flex-col items-center justify-center px-5 py-10 text-center select-none"
          style={{ minHeight: "calc(100dvh - 56px)" }}
        >
          <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
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
          </div>
        </section>
      </main>

      <Footer />
      <MobileBottomNav />
    </div>
  );
}
