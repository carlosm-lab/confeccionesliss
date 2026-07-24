"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState, useEffect } from "react";
import Link from "next/link";

/**
 * CookieBanner - LGPD/GDPR-compliant consent banner.
 * Stores user choice in localStorage under "__liss_cookie_consent__".
 * Dismissed banner never shows again unless localStorage is cleared.
 */
export function CookieBanner() {
  const STORAGE_KEY = "__liss_cookie_consent__";

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let consent: string | null = null;
    try {
      consent = localStorage.getItem(STORAGE_KEY);
    } catch {
      // noop
    }

    // Retrasar el montaje del Cookie Banner 4 segundos.
    // Esto mejora enormemente el LCP de la página al evitar que el banner
    // de cookies sea el Largest Contentful Paint inicial.
    const timer = setTimeout(() => {
      setMounted(true);
      if (!consent) {
        setVisible(true);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
      window.dispatchEvent(new Event("liss_cookie_consent_updated"));
    } catch {
      // noop
    }
    setVisible(false);
  };

  const decline = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "declined");
      window.dispatchEvent(new Event("liss_cookie_consent_updated"));
    } catch {
      // noop
    }
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Aviso de cookies"
      className="fixed right-4 bottom-20 left-4 z-[9999] md:right-6 md:bottom-6 md:left-auto md:max-w-md"
    >
      <div className="border-primary/15 bg-background/95 shadow-ambient rounded-2xl border p-5 backdrop-blur-md">
        <div className="mb-3 flex items-start gap-3">
          <Icon
            name="cookie"
            size={22}
            className="text-secondary mt-0.5 shrink-0"
            aria-hidden="true"
          />
          <h2 className="text-primary font-serif text-base leading-snug font-bold">
            Usamos cookies
          </h2>
        </div>

        <p className="text-on-surface-variant mb-4 font-sans text-sm leading-relaxed">
          Utilizamos cookies propias para mejorar tu experiencia de navegacion.
          Al aceptar, nos ayudas a entender como usas el sitio.{" "}
          <Link
            href="/legal/cookies"
            className="text-primary underline underline-offset-2 hover:opacity-80"
          >
            Política de cookies
          </Link>
          .
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            onClick={decline}
            className="border-outline text-primary flex h-10 items-center justify-center rounded-md border bg-white px-5 font-sans text-sm font-medium transition hover:bg-gray-50 active:scale-[0.97]"
          >
            Solo esenciales
          </button>
          <button
            onClick={accept}
            className="btn-gradient flex h-10 items-center justify-center rounded-md px-5 font-sans text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.97]"
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
}
