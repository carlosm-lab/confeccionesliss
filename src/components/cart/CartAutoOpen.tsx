"use client";

// Componente cliente que lee el query param ?open_cart=1
// y abre el CartDrawer al montar. Se usa exclusivamente desde /carrito redirect.

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export function CartAutoOpen() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsCartOpen } = useCart();

  useEffect(() => {
    if (searchParams.get("open_cart") === "1") {
      setIsCartOpen(true);
      // Limpiar el query param de la URL sin añadir entrada al historial
      router.replace("/", { scroll: false });
    }
  }, [searchParams, setIsCartOpen, router]);

  return null;
}
