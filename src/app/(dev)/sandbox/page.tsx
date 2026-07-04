import type { Metadata } from "next";
import { HeroImageCarousel } from "@/components/ui/HeroImageCarousel";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";

/** Sandbox de desarrollo — nunca debe aparecer en buscadores. */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function SandboxPage() {
  return (
    <div className="py-10">
      <Navbar />
      <div className="mx-auto my-6 max-w-screen-2xl px-5 md:px-8">
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 font-mono text-xs text-amber-900">
          <strong>ENTORNO DE SANDBOX DE DESARROLLO</strong>
          <br />
          Esta ruta se utiliza exclusivamente para validar visualmente y probar
          los componentes del proyecto.
        </div>
      </div>
      <div className="mt-8 flex justify-center border-t border-[#e1e2e4] pt-8">
        <div className="border-primary/35 relative flex h-[400px] w-[320px] flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-[500px] md:w-[400px]">
          <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
          <div className="relative h-full w-full overflow-hidden rounded-xl">
            <HeroImageCarousel sizes="(max-width:768px) 80vw, 40vw" priority />
          </div>
        </div>
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
