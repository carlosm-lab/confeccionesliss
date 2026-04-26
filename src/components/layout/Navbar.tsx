"use client";

import Link from "next/link";

export function Navbar() {
  return (
    <header className="text-primary sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-8 py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-primary"
            data-icon="content_cut"
          >
            content_cut
          </span>
          <span className="font-serif text-2xl font-bold italic">
            Confecciones Liss
          </span>
        </Link>

        {/* Trailing Icons */}
        <div className="flex items-center gap-4">
          <button
            aria-label="Buscar productos"
            className="transition-opacity hover:opacity-80"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              search
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
