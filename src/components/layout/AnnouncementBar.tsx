"use client";

import { useState } from "react";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-primary font-label relative flex items-center justify-center px-4 py-2 text-sm text-white">
      <p>🎓 Descuentos para grupos universitarios — Escríbenos por WhatsApp.</p>
      <button
        aria-label="Cerrar"
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-4 -translate-y-1/2 transform opacity-80 transition-opacity hover:opacity-100"
      >
        <span className="material-symbols-outlined text-lg">close</span>
      </button>
    </div>
  );
}
