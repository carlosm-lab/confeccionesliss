import { Navbar } from "@/components/layout/Navbar";
import dynamic from "next/dynamic";

const Footer = dynamic(() =>
  import("@/components/layout/Footer").then((mod) => mod.Footer)
);

const MobileBottomNav = dynamic(() =>
  import("@/components/layout/MobileBottomNav").then(
    (mod) => mod.MobileBottomNav
  )
);

const GlobalModals = dynamic(() =>
  import("@/components/layout/GlobalModals").then((mod) => mod.GlobalModals)
);

const CookieBanner = dynamic(() =>
  import("@/components/ui/CookieBanner").then((mod) => mod.CookieBanner)
);

const ScrollToTop = dynamic(() =>
  import("@/components/layout/ScrollToTop").then((mod) => mod.ScrollToTop)
);

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollToTop />
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

      {/* Global modals: CartDrawer + LoginModal - se montan una sola vez */}
      <GlobalModals />

      {/* Cookie consent banner */}
      <CookieBanner />
    </>
  );
}
