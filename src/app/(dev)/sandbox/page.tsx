import type { Metadata } from "next";
import FilosofiaClient from "@/components/empresa/FilosofiaClient";
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
      <div className="mt-8 border-t border-[#e1e2e4] pt-8">
        <FilosofiaClient />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
