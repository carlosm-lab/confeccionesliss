import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Admin Dashboard | Confecciones Liss",
  description: "Panel de administración de Confecciones Liss.",
};

export default function AdminDashboardPage() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-8 p-6 lg:p-10">
      {/* Welcome Bar */}
      <section className="bg-surface-container-lowest flex flex-col items-start justify-between gap-4 rounded-xl p-6 md:flex-row md:items-center">
        <div>
          <h1 className="font-headline text-on-surface text-3xl font-bold">
            Buenos días, Admin
          </h1>
          <p className="font-body text-secondary mt-1">
            <span className="text-tertiary mr-2 font-semibold">
              3 mensajes sin leer
            </span>
            <Link
              className="text-primary-container text-sm font-medium hover:underline"
              href="/admin/mensajes"
            >
              Ver bandeja →
            </Link>
          </p>
        </div>
        <div className="text-right">
          <div className="font-body text-secondary text-sm">Fecha actual</div>
          <div className="font-headline text-on-surface text-lg font-semibold">
            24 Octubre 2026
          </div>
        </div>
      </section>

      {/* Metrics Row */}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="bg-surface-container-lowest border-surface-container/50 group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <span
              className="material-symbols-outlined text-primary-container text-6xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              inventory_2
            </span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-primary-container/10 rounded-lg p-2">
              <span
                className="material-symbols-outlined text-primary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                inventory_2
              </span>
            </div>
            <h3 className="font-body text-secondary text-sm font-semibold">
              Productos activos
            </h3>
          </div>
          <div className="font-headline text-on-surface mb-2 text-4xl font-bold">
            1,204
          </div>
          <div className="font-body text-secondary flex items-center gap-1 text-xs font-medium">
            <span className="flex items-center text-green-600">
              <span className="material-symbols-outlined text-[16px]">
                trending_up
              </span>{" "}
              + 45
            </span>{" "}
            este mes
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-surface-container-lowest border-surface-container/50 group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <span
              className="material-symbols-outlined text-tertiary text-6xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              mail
            </span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="bg-tertiary/10 rounded-lg p-2">
              <span
                className="material-symbols-outlined text-tertiary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                mail
              </span>
            </div>
            <h3 className="font-body text-secondary text-sm font-semibold">
              Mensajes sin leer
            </h3>
          </div>
          <div className="font-headline text-on-surface mb-2 text-4xl font-bold">
            3
          </div>
          <div className="font-body text-secondary flex items-center gap-1 text-xs font-medium">
            <span className="text-tertiary flex items-center">
              <span className="material-symbols-outlined text-[16px]">
                trending_up
              </span>{" "}
              + 2
            </span>{" "}
            hoy
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-surface-container-lowest border-surface-container/50 group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <span
              className="material-symbols-outlined text-6xl text-green-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              group
            </span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-green-600/10 p-2">
              <span
                className="material-symbols-outlined text-green-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                group
              </span>
            </div>
            <h3 className="font-body text-secondary text-sm font-semibold">
              Clientes registrados
            </h3>
          </div>
          <div className="font-headline text-on-surface mb-2 text-4xl font-bold">
            845
          </div>
          <div className="font-body text-secondary flex items-center gap-1 text-xs font-medium">
            <span className="flex items-center text-green-600">
              <span className="material-symbols-outlined text-[16px]">
                trending_up
              </span>{" "}
              + 12
            </span>{" "}
            este mes
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-surface-container-lowest border-surface-container/50 group relative overflow-hidden rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md">
          <div className="absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <span
              className="material-symbols-outlined text-6xl text-purple-600"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              favorite
            </span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-lg bg-purple-600/10 p-2">
              <span
                className="material-symbols-outlined text-purple-600"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                favorite
              </span>
            </div>
            <h3 className="font-body text-secondary text-sm font-semibold">
              Total favoritos
            </h3>
          </div>
          <div className="font-headline text-on-surface mb-2 text-4xl font-bold">
            3,402
          </div>
          <div className="font-body text-secondary flex items-center gap-1 text-xs font-medium">
            <span className="flex items-center text-green-600">
              <span className="material-symbols-outlined text-[16px]">
                trending_up
              </span>{" "}
              + 150
            </span>{" "}
            este mes
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Link
          href="/admin/productos"
          className="bg-surface-container-lowest hover:bg-surface-container-low group flex flex-col items-center justify-center gap-3 rounded-xl p-6 shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-primary-container text-3xl transition-transform group-hover:scale-110">
            add_circle
          </span>
          <span className="font-body text-on-surface text-sm font-semibold">
            Agregar producto
          </span>
        </Link>
        <Link
          href="/admin/mensajes"
          className="bg-surface-container-lowest hover:bg-surface-container-low group flex flex-col items-center justify-center gap-3 rounded-xl p-6 shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-primary-container text-3xl transition-transform group-hover:scale-110">
            mail
          </span>
          <span className="font-body text-on-surface text-sm font-semibold">
            Ver mensajes
          </span>
        </Link>
        <Link
          href="/admin/clientes"
          className="bg-surface-container-lowest hover:bg-surface-container-low group flex flex-col items-center justify-center gap-3 rounded-xl p-6 shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-primary-container text-3xl transition-transform group-hover:scale-110">
            group
          </span>
          <span className="font-body text-on-surface text-sm font-semibold">
            Ver clientes
          </span>
        </Link>
        <Link
          href="/admin/configuracion"
          className="bg-surface-container-lowest hover:bg-surface-container-low group flex flex-col items-center justify-center gap-3 rounded-xl p-6 shadow-sm transition-colors"
        >
          <span className="material-symbols-outlined text-primary-container text-3xl transition-transform group-hover:scale-110">
            settings
          </span>
          <span className="font-body text-on-surface text-sm font-semibold">
            Configuración
          </span>
        </Link>
      </section>

      {/* Two Central Columns */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Messages */}
        <div className="bg-surface-container-lowest flex h-full flex-col rounded-xl p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-headline text-on-surface text-xl font-bold">
              Mensajes recientes
            </h2>
            <button className="text-secondary hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined">more_horiz</span>
            </button>
          </div>
          <div className="flex flex-grow flex-col gap-4">
            {/* Message Row 1 (Unread) */}
            <div className="hover:bg-surface-container-low bg-surface-container-low/50 relative flex cursor-pointer items-start gap-4 rounded-lg p-3 transition-colors">
              <div className="bg-tertiary absolute top-1/2 left-2 h-2 w-2 -translate-y-1/2 rounded-full"></div>
              <Image
                width={40}
                height={40}
                alt="Avatar"
                className="ml-3 h-10 w-10 rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBHqigubFwDN0nDIWjAk3iVZitKqEYdGavfZGjNZH8PqrG8opL1mFz0WelT6MPPvRyD9Z8a42lnK1ammDAcT2EATefljHBhVdL28emd8Sss-8Wju64XAuDblHAseUqgliZLViI-g4p6JfyKKgAkq8qgnBpKXRMl0QeDcBtjHLg00_TvprvXx5o1SRwHE-kEmAKVb3XQRuyczKBrxpSEQp7XXoUTo7f6MK9WJ6v_XvuuOyFpls9xBX-rUOkh6hUqhsz8G6GhB37BPsUV"
              />
              <div className="min-w-0 flex-grow">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="font-body text-on-surface truncate text-sm font-bold">
                    Dra. Elena Vargas
                  </span>
                  <span className="font-body text-secondary text-xs whitespace-nowrap">
                    Hace 1h
                  </span>
                </div>
                <div className="font-body text-on-surface truncate text-sm font-semibold">
                  Pedido urgente uniformes cirugía
                </div>
                <div className="font-body text-secondary truncate text-sm">
                  Necesitamos 50 unidades para el Hospital Central...
                </div>
              </div>
            </div>
            {/* Message Row 2 (Unread) */}
            <div className="hover:bg-surface-container-low bg-surface-container-low/50 relative flex cursor-pointer items-start gap-4 rounded-lg p-3 transition-colors">
              <div className="bg-tertiary absolute top-1/2 left-2 h-2 w-2 -translate-y-1/2 rounded-full"></div>
              <div className="bg-primary-container/10 text-primary-container ml-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                MC
              </div>
              <div className="min-w-0 flex-grow">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="font-body text-on-surface truncate text-sm font-bold">
                    Miguel Cervantes
                  </span>
                  <span className="font-body text-secondary text-xs whitespace-nowrap">
                    Hace 3h
                  </span>
                </div>
                <div className="font-body text-on-surface truncate text-sm font-semibold">
                  Consulta tallas modelo B-12
                </div>
                <div className="font-body text-secondary truncate text-sm">
                  Hola, quería saber si las tallas del modelo B-12 vienen
                  amplias...
                </div>
              </div>
            </div>
            {/* Message Row 3 */}
            <div className="hover:bg-surface-container-low relative flex cursor-pointer items-start gap-4 rounded-lg p-3 pl-5 transition-colors">
              <Image
                width={40}
                height={40}
                alt="Avatar"
                className="ml-2 h-10 w-10 rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWtmw6HA9nJv6xV7H0pf7sIADz9-gSOl1uDreB_GkunESa-9shV0pn0o2j2HTugUO5h_pi1-utKJlqeK-3yxD2YfNhiKoAqQzA1tnRP-1xRLnRrwrTlhbrXNnTNx8XzfArc5h3xQVyUV9efBkBHmlA_d5MRiNhR68AUc5Y6uoQ5PTPsLRZU5_74lsM0mnYk4opG_JIoJxRl_X1soOPhEeSwONfxtsyNXsWMxCx1V3Ff8FUWvA18MwAp_8Vnhzf4FxJY652T3oM7NA0"
              />
              <div className="min-w-0 flex-grow">
                <div className="mb-1 flex items-baseline justify-between">
                  <span className="font-body text-on-surface truncate text-sm font-bold">
                    Clínica San José
                  </span>
                  <span className="font-body text-secondary text-xs whitespace-nowrap">
                    Ayer
                  </span>
                </div>
                <div className="font-body text-on-surface truncate text-sm font-medium">
                  Comprobante de pago adjunto
                </div>
                <div className="font-body text-secondary truncate text-sm">
                  Adjuntamos el comprobante del último pedido realizado...
                </div>
              </div>
            </div>
          </div>
          <div className="border-surface-container-high mt-6 border-t pt-4 text-center">
            <Link
              className="font-body text-primary-container inline-flex items-center gap-1 text-sm font-semibold hover:underline"
              href="/admin/mensajes"
            >
              Ver todos los mensajes{" "}
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Recent Clients */}
        <div className="bg-surface-container-lowest flex h-full flex-col rounded-xl p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-headline text-on-surface text-xl font-bold">
              Clientes recientes
            </h2>
            <button className="text-secondary hover:text-primary-container transition-colors">
              <span className="material-symbols-outlined">filter_list</span>
            </button>
          </div>
          <div className="flex flex-grow flex-col gap-4">
            <div className="hover:bg-surface-container-low flex items-center gap-4 rounded-lg p-3 transition-colors">
              <Image
                width={40}
                height={40}
                alt="Client Avatar"
                className="h-10 w-10 rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2DP57gf4cgfThSwEVvFXtx_iPc00d96bsNTau7c31sFCEXWlKEEI2G5CA7txFZ3ZGI_Ci6UhJu-SdcfX6To_GncYrX9YIEcJSzDa0-rz6EOZ9rV9ejhQuZJ0MdyCJhVFKH6AZedbPW2pr4JVXb06zuW6oESQtIk_sDQuB-r7Ea8Av84RGoagqeGjKXK5hCZSK_GjOjfFawBsrLxAAuRzW0NaclXRUWUSMSbjn_e7d4b8glr-wRYVhebD5Ep-EZ24FQbaUtQpL0p1F"
              />
              <div className="min-w-0 flex-grow">
                <div className="font-body text-on-surface truncate text-sm font-bold">
                  Dra. Sofia Mendez
                </div>
                <div className="font-body text-secondary truncate text-xs">
                  sofia.m@hospitalcentral.com
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-primary-container/10 text-primary-container rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                  Hospital Central
                </span>
                <span className="font-body text-secondary text-[10px]">
                  Hoy
                </span>
              </div>
            </div>
            <div className="hover:bg-surface-container-low flex items-center gap-4 rounded-lg p-3 transition-colors">
              <div className="bg-surface-variant text-on-surface-variant flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold">
                JP
              </div>
              <div className="min-w-0 flex-grow">
                <div className="font-body text-on-surface truncate text-sm font-bold">
                  Jorge Pérez
                </div>
                <div className="font-body text-secondary truncate text-xs">
                  jperez@clinicasur.com
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-primary-container/10 text-primary-container rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                  Clínica Sur
                </span>
                <span className="font-body text-secondary text-[10px]">
                  Ayer
                </span>
              </div>
            </div>
            <div className="hover:bg-surface-container-low flex items-center gap-4 rounded-lg p-3 transition-colors">
              <Image
                width={40}
                height={40}
                alt="Client Avatar"
                className="h-10 w-10 rounded-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjIsVqnOmfeg4othy96Y0dZwVc8xCIqSJ4Frp3F9QiNFaff9V_b6o3V-a6HnCJ8I_xC-zlWtU-9omKoRsoHT_vI4zwSyu5RbojnjFbNK92XYFyaMaWTzd4D1Wven-wKPEtHuIeHMBFF1HbAh73A-UMWy6QxxeWAUVKghsxPnY6myfTeJNaYL6CjuurGETRwInN5gnrR-pyZvYnvfzxPqsiLo1nExOsOLnH-ZnkvAzJOMiB1ZB4AWLz7N70f5o-Fe9yEZstWBmzFTy4"
              />
              <div className="min-w-0 flex-grow">
                <div className="font-body text-on-surface truncate text-sm font-bold">
                  Dr. Carlos Mendoza
                </div>
                <div className="font-body text-secondary truncate text-xs">
                  cmendoza@independiente.com
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="bg-surface-container-highest text-secondary rounded-sm px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase">
                  Independiente
                </span>
                <span className="font-body text-secondary text-[10px]">
                  22 Oct
                </span>
              </div>
            </div>
          </div>
          <div className="border-surface-container-high mt-6 border-t pt-4 text-center">
            <Link
              className="font-body text-primary-container inline-flex items-center gap-1 text-sm font-semibold hover:underline"
              href="/admin/clientes"
            >
              Ver cartera de clientes{" "}
              <span className="material-symbols-outlined text-[16px]">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Bottom Sections Row */}
      <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Top Favorites */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="font-headline text-on-surface text-xl font-bold">
              Productos más en favoritos
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
            {[
              {
                rank: 1,
                name: "Pijama Quirúrgica Clásica Azul",
                cat: "Conjuntos",
                count: 452,
                pct: 100,
              },
              {
                rank: 2,
                name: "Bata Laboratorio Premium",
                cat: "Batas",
                count: 385,
                pct: 85,
              },
              {
                rank: 3,
                name: "Gorro Cirugía Estampado",
                cat: "Accesorios",
                count: 312,
                pct: 69,
              },
              {
                rank: 4,
                name: "Pantalón Médico Flex",
                cat: "Pantalones",
                count: 280,
                pct: 62,
              },
              {
                rank: 5,
                name: "Filipina Cuello V Mujer",
                cat: "Filipinas",
                count: 245,
                pct: 54,
              },
              {
                rank: 6,
                name: "Conjunto Antifluido Negro",
                cat: "Conjuntos",
                count: 210,
                pct: 46,
              },
            ].map((item) => (
              <div
                key={item.rank}
                className="hover:bg-surface-container-low group flex items-center gap-3 rounded-lg p-2 transition-colors"
              >
                <div className="border-primary-container text-primary-container flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold">
                  {item.rank}
                </div>
                <div className="bg-surface-container-high text-secondary flex h-12 w-12 shrink-0 items-center justify-center rounded">
                  <span className="material-symbols-outlined">image</span>
                </div>
                <div className="min-w-0 flex-grow">
                  <div className="font-body text-on-surface truncate text-sm font-bold">
                    {item.name}
                  </div>
                  <div className="font-body text-secondary text-xs">
                    {item.cat}
                  </div>
                </div>
                <div className="flex w-24 shrink-0 flex-col items-end gap-1">
                  <span className="font-headline text-sm font-bold">
                    {item.count}
                  </span>
                  <div className="bg-surface-container-high h-1.5 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary-container h-full rounded-full"
                      style={{ width: `${item.pct}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Institution Distribution */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <h3 className="font-headline text-on-surface text-xl font-bold">
              Pedidos por institución
            </h3>
            <p className="font-body text-secondary mt-1 text-xs">
              Distribución del mes actual
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {[
              { name: "Hospital Central", count: 345, pct: 85 },
              { name: "Clínica Sur", count: 210, pct: 60 },
              { name: "Lab. Norte", count: 156, pct: 45 },
              { name: "Independientes", count: 120, pct: 35 },
              { name: "Sanatorio del Valle", count: 89, pct: 25 },
            ].map((inst) => (
              <div key={inst.name}>
                <div className="mb-1 flex items-end justify-between">
                  <span className="font-body text-on-surface text-sm font-semibold">
                    {inst.name}
                  </span>
                  <span className="font-body text-primary-container text-sm font-bold">
                    {inst.count}
                  </span>
                </div>
                <div className="bg-surface-container-high h-2 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary-container h-full rounded-full"
                    style={{ width: `${inst.pct}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
