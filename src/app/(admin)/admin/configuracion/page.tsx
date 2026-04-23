"use client";
import Image from "next/image";

const USERS = [
  {
    id: "1",
    name: "Sarah Connor",
    email: "sarah@confeccionesliss.com",
    role: "admin",
    institution: "Administración Central",
    institutionBg: "bg-secondary-fixed text-on-secondary-fixed",
    active: true,
    lastSeen: "Hace 2 horas",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDZA8AKnCVzx-U2uV_f12S-dwAYjVmhRWLhz9HdkgdGzdCluWo68Spph8GxTp8SnlgLJS2SdtzYL1JfV9FYjUe7eQZ0G9BWXzvtpH6wc6HOAGLcWUHgpUTJoe9iCPE0ypqIaBcbsW2ESOh5X2_cxElGO4Ueie1VeXwvJ-B45okgBXkWoerLJ2sK-jIV1FQq7-ybkQzkkJEcwab5ChNuq4-GG2SGkTU3tzCClfwAK27wlSnPkZo0mXfSWOkkCguy7SRHMSmWv60V5rhw",
  },
  {
    id: "2",
    name: "Miguel Juarez",
    email: "miguel.j@hospicentral.com",
    role: "cliente",
    institution: "Hospital Central",
    institutionBg: "bg-[#ffdad5] text-[#410000]",
    active: true,
    lastSeen: "Ayer, 14:30",
    initials: "MJ",
  },
];

export default function AdminConfiguracionPage() {
  return (
    <main className="container mx-auto flex-grow px-4 py-8 md:px-8">
      <div className="mb-8 pl-2">
        <h1 className="font-headline text-primary text-3xl font-extrabold tracking-[-0.02em]">
          Configuración
        </h1>
      </div>

      {/* Tabs */}
      <div className="border-surface-variant mb-8 flex space-x-2 overflow-x-auto border-b pb-1">
        <button
          type="button"
          className="bg-primary-container rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap text-white transition-colors"
        >
          Usuarios y Roles
        </button>
        <button
          type="button"
          className="text-on-surface-variant hover:bg-surface-container-low rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors"
        >
          Tienda
        </button>
        <button
          type="button"
          className="text-on-surface-variant hover:bg-surface-container-low rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors"
        >
          Notificaciones
        </button>
        <button
          type="button"
          className="text-on-surface-variant hover:bg-surface-container-low rounded-t-lg px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors"
        >
          Catálogos y Categorías
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Controls Toolbar */}
        <div className="bg-surface-container-low flex flex-col items-start justify-between gap-4 rounded-xl p-4 md:flex-row md:items-center">
          <div className="flex w-full flex-1 gap-2 md:w-auto">
            <div className="relative max-w-md flex-1">
              <span className="material-symbols-outlined text-on-surface-variant absolute top-1/2 left-3 -translate-y-1/2 text-sm">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar usuario..."
                className="bg-surface-container-highest placeholder:text-on-surface-variant focus:bg-primary-fixed/20 focus:ring-primary-fixed w-full rounded-lg border-none py-2 pr-4 pl-9 text-sm transition-colors focus:ring-1"
              />
            </div>
            <select className="bg-surface-container-highest text-on-surface focus:ring-primary-fixed rounded-lg border-none py-2 pr-8 pl-3 text-sm focus:ring-1">
              <option value="">Todos los roles</option>
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="cliente">Cliente</option>
            </select>
          </div>
          <button
            type="button"
            className="from-primary to-primary-container shadow-primary-container/20 flex items-center gap-2 rounded-lg bg-gradient-to-br px-5 py-2.5 text-sm font-medium text-white shadow-lg transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-sm">
              person_add
            </span>{" "}
            Invitar administrador
          </button>
        </div>

        {/* Users Table */}
        <div className="border-outline-variant/15 bg-surface-container-lowest overflow-hidden rounded-xl border p-1 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="border-surface-variant bg-surface-container-low/50 text-on-surface-variant border-b text-xs font-medium">
                <tr>
                  <th className="rounded-tl-xl px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">Rol</th>
                  <th className="px-6 py-4">Institución</th>
                  <th className="px-6 py-4">Estado</th>
                  <th className="px-6 py-4">Última conexión</th>
                  <th className="rounded-tr-xl px-6 py-4 text-right">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-surface-variant/50 divide-y">
                {USERS.map((u) => (
                  <tr
                    key={u.id}
                    className="group hover:bg-surface-container-low/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {u.avatar ? (
                          <Image
                            src={u.avatar}
                            alt={u.name}
                            width={36}
                            height={36}
                            className="border-surface-variant h-9 w-9 rounded-full border object-cover"
                          />
                        ) : (
                          <div className="border-surface-variant flex h-9 w-9 items-center justify-center rounded-full border bg-[#6d0001] text-xs font-bold text-[#ff6c5a]">
                            {u.initials}
                          </div>
                        )}
                        <div>
                          <div className="text-on-surface font-medium">
                            {u.name}
                          </div>
                          <div className="text-on-surface-variant text-xs">
                            {u.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        defaultValue={u.role}
                        className="text-on-surface hover:bg-surface-container-highest cursor-pointer rounded border-none bg-transparent py-1 pr-6 pl-2 text-xs font-medium focus:ring-0"
                      >
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="cliente">Cliente</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${u.institutionBg}`}
                      >
                        {u.institution}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <label
                        aria-label="Estado activo"
                        className="relative inline-flex cursor-pointer items-center"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={u.active}
                          className="peer sr-only"
                        />
                        <div className="peer bg-surface-variant peer-checked:bg-primary-container h-5 w-9 rounded-full peer-focus:outline-none after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                      </label>
                    </td>
                    <td className="text-on-surface-variant px-6 py-4 text-xs">
                      {u.lastSeen}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="text-error decoration-error/30 text-xs font-medium underline-offset-4 hover:underline"
                      >
                        Suspender
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
