"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SearchModal } from "@/components/layout/SearchModal";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="focus:bg-primary sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded-lg focus:px-4 focus:py-2 focus:text-white focus:shadow-lg"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="main-content" className="flex-grow pb-[64px] sm:pb-0">
        {children}
      </main>
      <Footer />

      {/* Mobile bottom nav — only renders on < sm viewports */}
      <MobileBottomNav onSearchOpen={() => setIsSearchOpen(true)} />

      {/* Shared search modal triggered from bottom nav on mobile */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
