import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { GlobalModals } from "@/components/layout/GlobalModals";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow pb-20 sm:pb-0">
        {children}
      </main>
      <Footer />

      {/* Mobile bottom nav — only renders on < sm viewports */}
      <MobileBottomNav />

      {/* Global modals: CartDrawer + LoginModal — se montan una sola vez */}
      <GlobalModals />
    </>
  );
}
