"use client";

import { useEffect, useState } from "react";

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(() => {
    // Si no estamos en desarrollo o estamos en el servidor, estamos listos de inmediato
    if (process.env.NODE_ENV !== "development") return true;
    if (typeof window === "undefined") return false;
    return false;
  });

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "development"
    ) {
      const init = async () => {
        const { worker } = await import("./browser");
        await worker.start({ onUnhandledRequest: "bypass" });
        setReady(true);
      };
      init();
    }
  }, []);

  if (!ready && process.env.NODE_ENV === "development") {
    // Previene el renderizado del árbol hasta que los mocks estén listos
    // en desarrollo para evitar fetches prematuros que fallen
    return null;
  }

  return <>{children}</>;
}
