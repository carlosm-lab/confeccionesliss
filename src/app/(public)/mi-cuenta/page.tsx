import type { Metadata } from "next";
import MiCuentaPageClient from "./MiCuentaPageClient";

export const metadata: Metadata = {
  title: "Mi Cuenta | Confecciones Liss",
  description: "Accede a tu cuenta en Confecciones Liss.",
  robots: { index: false, follow: false },
};

// Server Component shell — la lógica de autenticación y carrito
// está en el Client Component MiCuentaPageClient.
export default function MiCuentaPage() {
  return <MiCuentaPageClient />;
}
