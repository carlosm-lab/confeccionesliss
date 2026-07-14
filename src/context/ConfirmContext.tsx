"use client";
// ──────────────────────────────────────────────────────────────
// CONTEXTO DE CONFIRMACIÓN (Diálogo global Promise-based)
// ──────────────────────────────────────────────────────────────
import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";

interface ConfirmOptions {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
}

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | undefined>(undefined);

interface ConfirmState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  type: "danger" | "warning" | "info";
  resolve: ((value: boolean) => void) | null;
}

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [confirmState, setConfirmState] = useState<ConfirmState>({
    isOpen: false,
    title: "",
    message: "",
    confirmText: "Confirmar",
    cancelText: "Cancelar",
    type: "danger",
    resolve: null,
  });

  const confirm: ConfirmFn = useCallback((options) => {
    return new Promise((resolve) => {
      setConfirmState({
        isOpen: true,
        title: options.title || "Confirmar acción",
        message: options.message || "¿Estás seguro?",
        confirmText: options.confirmText || "Confirmar",
        cancelText: options.cancelText || "Cancelar",
        type: options.type || "danger",
        resolve,
      });
    });
  }, []);

  const handleConfirm = () => {
    confirmState.resolve?.(true);
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  const handleCancel = () => {
    confirmState.resolve?.(false);
    setConfirmState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        isOpen={confirmState.isOpen}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        cancelText={confirmState.cancelText}
        type={confirmState.type}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
}

export function useConfirm(): ConfirmFn {
  const context = useContext(ConfirmContext);
  return context ?? (async () => false);
}
