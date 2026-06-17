"use client";
// ──────────────────────────────────────────────────────────────
// GLOBAL MODALS — Confecciones Liss
// ──────────────────────────────────────────────────────────────
// Client component que renderiza los modales globales de la app:
//   - CartDrawer: estado manejado por CartContext
//   - LoginModal: estado manejado por AuthContext.authModalContext
//
// Se monta una sola vez en (public)/layout.tsx para que estén
// disponibles en TODAS las páginas sin duplicar la instancia.
// ──────────────────────────────────────────────────────────────
import { CartDrawer } from "@/components/cart/CartDrawer";
import { LoginModal } from "@/components/cart/LoginModal";
import { useAuth } from "@/context/AuthContext";

export function GlobalModals() {
  const { authModalContext, hideAuthModal } = useAuth();

  return (
    <>
      <CartDrawer />
      <LoginModal
        isOpen={authModalContext !== null}
        onClose={hideAuthModal}
        context={authModalContext ?? "generic"}
      />
    </>
  );
}
