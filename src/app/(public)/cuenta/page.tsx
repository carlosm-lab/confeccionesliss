import type { Metadata } from "next";
import CuentaPageClient from "./CuentaPageClient";

export const metadata: Metadata = {
  title: "Cuenta | Confecciones Liss",
  description: "Accede a tu cuenta en Confecciones Liss.",
  robots: { index: false, follow: false },
};

// Server Component shell — la lógica de autenticación y carrito
// está en el Client Component CuentaPageClient.
export default function CuentaPage() {
  return <CuentaPageClient />;
}
