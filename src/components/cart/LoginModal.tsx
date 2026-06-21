"use client";

import { useAuth } from "@/context/AuthContext";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useModal } from "@/hooks/useModal";
import FocusLock from "react-focus-lock";

const contextMessages: Record<
  string,
  { icon: string; title: string; message: string }
> = {
  cart: {
    icon: "shopping_cart",
    title: "Inicia sesión para continuar",
    message:
      "Inicia sesión para agregar productos a tu carrito y realizar pedidos.",
  },
  favorites: {
    icon: "favorite",
    title: "Inicia sesión para continuar",
    message:
      "Inicia sesión para guardar tus productos favoritos y acceder a ellos desde cualquier dispositivo.",
  },
  contact: {
    icon: "mail",
    title: "Inicia sesión para continuar",
    message:
      "Inicia sesión para enviarnos un mensaje. Así podremos responderte más rápido.",
  },
  generic: {
    icon: "account_circle",
    title: "Bienvenido a Confecciones Liss",
    message:
      "Inicia sesión para guardar tus listas de favoritos y personalizar tu experiencia.",
  },
};

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  context?: string;
}

export function LoginModal({
  isOpen,
  onClose,
  context = "generic",
}: LoginModalProps) {
  const { signInWithGoogle } = useAuth();
  const { modalRef } = useModal({ isOpen, onClose });

  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  const ctx = contextMessages[context] ?? contextMessages.generic;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-[var(--space-md)]">
      <button
        type="button"
        className="absolute inset-0 w-full cursor-default bg-black/30 backdrop-blur-[2px] sm:bg-black/20"
        onClick={onClose}
        aria-label="Cerrar modal"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="animate-in fade-in zoom-in relative w-full max-w-sm overflow-hidden rounded-3xl bg-white p-[var(--space-xl)] text-center shadow-2xl duration-200"
      >
        <FocusLock returnFocus className="flex w-full flex-col">
          <button
            onClick={onClose}
            className="absolute top-[var(--space-md)] right-[var(--space-md)] flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-slate-500 transition-colors hover:text-slate-900"
            aria-label="Cerrar modal"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "20px" }}
            >
              close
            </span>
          </button>

          <div
            className={`mx-auto mb-[var(--space-md)] flex h-16 w-16 items-center justify-center rounded-full ${
              context === "generic"
                ? "text-primary bg-slate-100"
                : "bg-primary/10 text-primary"
            }`}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "32px" }}
            >
              {ctx.icon}
            </span>
          </div>

          <h2
            id="login-modal-title"
            className="mb-[var(--space-xs)] font-bold text-[var(--text-xl)] text-slate-900"
          >
            {ctx.title}
          </h2>
          <p className="mx-auto mb-[var(--space-lg)] max-w-xs text-[var(--text-sm)] text-slate-500">
            {ctx.message}
          </p>

          <button
            onClick={() => {
              signInWithGoogle();
            }}
            className="flex w-full items-center justify-center gap-[var(--space-sm)] rounded-xl border border-gray-200 bg-white px-[var(--space-md)] py-[var(--space-md)] font-medium text-slate-700 shadow-md transition-colors hover:bg-gray-50"
          >
            {/* Google SVG logo */}
            <svg
              className="h-5 w-5 shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>
        </FocusLock>
      </div>
    </div>
  );
}
