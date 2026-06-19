// Ruta /carrito: redirige a la home con ?open_cart=1.
// El componente CartAutoOpen (montado en el layout público) lee ese
// query param y abre el CartDrawer automáticamente.
// Así funciona tanto en navegación SPA como en acceso directo por URL.

import { redirect } from "next/navigation";

export default function CarritoRedirectPage() {
  redirect("/?open_cart=1");
}
