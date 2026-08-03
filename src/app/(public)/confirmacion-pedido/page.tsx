import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ConfirmacionPedidoClient } from "./ConfirmacionPedidoClient";

export const revalidate = 0;

const PAGE_TITLE = "Confirmación de Pedido | Confecciones Liss";
const PAGE_DESCRIPTION =
  "¡Gracias por tu pedido en Confecciones Liss! Tu compra ha sido realizada con éxito. Tu número de pedido y detalles se encuentran confirmados.";

export const metadata: Metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  robots: {
    index: false,
    follow: true,
  },
};

export default function ConfirmacionPedidoPage() {
  return <ConfirmacionPedidoClient />;
}
