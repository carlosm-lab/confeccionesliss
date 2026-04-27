"use client";

import Link from "next/link";

import Image from "next/image";

export function Navbar() {
  return (
    <header className="text-primary sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between px-5 py-[2px] md:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.svg"
            alt="Confecciones Liss Logo"
            width={180}
            height={180}
            className="h-12 w-auto"
            priority
          />
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
