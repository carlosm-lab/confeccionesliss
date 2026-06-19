"use client";
import { useState, useEffect, useCallback } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import { useConfirm } from "@/context/ConfirmContext";
import { SUPER_ADMIN_EMAIL } from "@/config/site";
import Image from "next/image";
import toast from "react-hot-toast";

// ── Tipos ─────────────────────────────────────────────────────
interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  role: string;
  created_at: string;
}

// ── Helpers ───────────────────────────────────────────────────
function getInitials(name: string, email: string): string {
  if (name) {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }
  const localPart = email.split("@")[0] || "";
  const emailParts = localPart.split(/[._-]/);
  if (emailParts.length >= 2) {
    return (emailParts[0][0] + emailParts[1][0]).toUpperCase();
  }
  return localPart.slice(0, 2).toUpperCase();
}

// ── Componente principal ──────────────────────────────────────
export default function AdminUsuariosPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "admin" | "user">("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const confirm = useConfirm();

  // ── Fetch ────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const supabase = getSupabaseClient();
      const { data, error } = await supabase.rpc("get_users_list");
      if (error) throw error;
      setUsers(
        ((data as UserProfile[]) || []).map((u) => ({
          id: u.id,
          email: u.email || "Sin email",
          full_name: u.full_name || "",
          avatar_url: u.avatar_url || null,
          role: u.role || "user",
          created_at: u.created_at,
        }))
      );
    } catch (error) {
      logger.error("Error fetching users:", error);
      toast.error("No se pudo cargar la lista de usuarios.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── Filtro ───────────────────────────────────────────────────
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      !searchTerm ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.full_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const adminCount = users.filter((u) => u.role === "admin").length;
  const userCount = users.filter((u) => u.role === "user").length;

  // ── Superadmin guard ─────────────────────────────────────────
  const isSuperAdmin = (user: UserProfile) =>
    user.email.toLowerCase() === SUPER_ADMIN_EMAIL.toLowerCase();

  // ── Acción: cambiar rol ──────────────────────────────────────
  const handleSetRole = async (
    user: UserProfile,
    newRole: "admin" | "user"
  ) => {
    if (isSuperAdmin(user)) return;

    const action =
      newRole === "admin"
        ? "promover a administrador"
        : "quitar privilegios de administrador";
    const confirmed = await confirm({
      title: newRole === "admin" ? "Promover a Admin" : "Degradar a Usuario",
      message: `¿Seguro que deseas ${action} a ${user.full_name || user.email}? Esta acción afecta inmediatamente sus permisos en el panel.`,
      confirmText: newRole === "admin" ? "Sí, promover" : "Sí, degradar",
      type: newRole === "admin" ? "info" : "danger",
    });
    if (!confirmed) return;

    setActionLoading(user.id + "-role");
    try {
      const supabase = getSupabaseClient();
      // SEC-002 fix: usar admin_set_user_role RPC que sincroniza TANTO
      // profiles.role (BD) COMO auth.users.raw_app_meta_data (JWT).
      // Antes: solo actualizaba profiles.role, el JWT no se refrescaba
      // hasta expirar → un admin degradado seguía con acceso por la duración del JWT.
      const { error } = await supabase.rpc("admin_set_user_role", {
        target_user_id: user.id,
        new_role: newRole,
      });
      if (error) throw error;
      toast.success(
        newRole === "admin"
          ? `${user.full_name || user.email} ahora es administrador.`
          : `${user.full_name || user.email} ya no es administrador.`
      );
      await fetchUsers();
    } catch (err) {
      logger.error("Error updating role:", err);
      toast.error("No se pudo actualizar el rol. Intenta de nuevo.");
    } finally {
      setActionLoading(null);
    }
  };

  // ── Acción: eliminar usuario ─────────────────────────────────
  const handleDeleteUser = async (user: UserProfile) => {
    if (isSuperAdmin(user)) return;

    const confirmed = await confirm({
      title: "Eliminar Usuario",
      message: `¿Seguro que deseas eliminar permanentemente a ${user.full_name || user.email}? Esta acción no se puede deshacer y eliminará todos sus datos.`,
      confirmText: "Sí, eliminar",
      type: "danger",
    });
    if (!confirmed) return;

    setActionLoading(user.id + "-delete");
    try {
      const supabase = getSupabaseClient();
      const { error } = await supabase.rpc("admin_delete_user", {
        target_user_id: user.id,
      });
      if (error) throw error;
      toast.success(`Usuario ${user.email} eliminado.`);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
    } catch (err) {
      logger.error("Error deleting user:", err);
      toast.error(
        "No se pudo eliminar el usuario. Verifica que la función admin_delete_user exista en Supabase."
      );
    } finally {
      setActionLoading(null);
    }
  };

  // ── Render ───────────────────────────────────────────────────
  return (
    <div className="flex h-full w-full max-w-[1400px] flex-col">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="mb-1 flex items-center gap-3 text-2xl font-bold text-slate-900 md:text-3xl dark:text-white">
            Usuarios
            {users.length > 0 && (
              <span className="bg-primary rounded-full px-2.5 py-0.5 text-xs font-bold text-white">
                {users.length}
              </span>
            )}
          </h1>
          <p className="text-sm text-slate-500 md:text-base dark:text-slate-400">
            Gestiona usuarios y permisos de administrador.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-3 gap-3 md:gap-4">
        {[
          {
            label: "Total",
            value: users.length,
            icon: "group",
            color: "bg-primary/10 text-primary dark:bg-primary/20",
          },
          {
            label: "Admins",
            value: adminCount,
            icon: "shield_person",
            color:
              "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
          },
          {
            label: "Usuarios",
            value: userCount,
            icon: "person",
            color:
              "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="border-primary/30 dark:border-primary/20 rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${stat.color}`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {stat.icon}
                </span>
              </div>
              <div>
                <p className="text-xl font-black text-slate-900 md:text-2xl dark:text-white">
                  {isLoading ? "..." : stat.value}
                </p>
                <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase md:text-xs dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="border-primary/30 dark:border-primary/20 mb-6 flex flex-col gap-3 rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] sm:flex-row sm:items-center dark:bg-white/5">
        <div className="relative min-w-[220px] flex-1">
          <span className="pointer-events-none absolute top-1/2 left-3 flex -translate-y-1/2 items-center leading-[0] text-slate-400">
            <span className="material-symbols-outlined text-[20px] leading-[0]">
              search
            </span>
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="focus:ring-primary/20 w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pr-4 pl-10 text-sm text-slate-900 outline-none focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>
        <div className="flex w-full self-start rounded-xl bg-slate-100 p-1 sm:w-auto sm:self-auto dark:bg-white/5">
          {(["all", "admin", "user"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setRoleFilter(f)}
              className={`flex-1 rounded-lg py-2 text-sm font-medium whitespace-nowrap transition-all sm:px-4 ${roleFilter === f ? "bg-white text-slate-900 shadow-sm dark:bg-white/10 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
            >
              {f === "all" ? "Todos" : f === "admin" ? "Admins" : "Usuarios"}
            </button>
          ))}
        </div>
      </div>

      {/* Users List */}
      <div className="border-primary/30 dark:border-primary/20 flex-1 overflow-hidden rounded-2xl border bg-white shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <div className="custom-scrollbar h-full overflow-y-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-12">
              <div className="border-primary/20 border-t-primary mb-4 h-10 w-10 animate-spin rounded-full border-4" />
              <p className="text-slate-500">Cargando usuarios...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-50 text-slate-400 dark:bg-transparent">
                <span className="material-symbols-outlined text-[32px]">
                  person_off
                </span>
              </div>
              <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
                Sin resultados
              </h3>
              <p className="text-slate-500">
                {searchTerm
                  ? `No se encontraron usuarios con "${searchTerm}".`
                  : roleFilter !== "all"
                    ? `No hay usuarios con rol "${roleFilter}".`
                    : "No hay usuarios registrados aún."}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-white/5">
              {/* Table Header */}
              <div className="hidden border-b border-slate-100 bg-slate-50/80 px-5 py-3 text-xs font-bold tracking-wider text-slate-500 uppercase sm:grid sm:grid-cols-[1fr_110px_120px_120px] sm:gap-4 dark:border-white/5 dark:bg-white/5">
                <span>Usuario</span>
                <span className="text-center">Rol</span>
                <span className="text-center">Registrado</span>
                <span className="text-right">Acciones</span>
              </div>

              {filteredUsers.map((user) => {
                const superAdmin = isSuperAdmin(user);
                const isAdmin = user.role === "admin";
                const isLoadingRole = actionLoading === user.id + "-role";
                const isLoadingDelete = actionLoading === user.id + "-delete";
                const isAnyLoading = isLoadingRole || isLoadingDelete;

                return (
                  <div
                    key={user.id}
                    className="flex flex-col gap-3 px-5 py-4 transition-colors hover:bg-slate-50 sm:grid sm:grid-cols-[1fr_110px_120px_120px] sm:items-center sm:gap-4 dark:hover:bg-white/5"
                  >
                    {/* User Info */}
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold ${
                          isAdmin
                            ? "bg-primary/15 text-primary dark:bg-primary/25"
                            : "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                        }`}
                      >
                        {user.avatar_url ? (
                          <Image
                            src={user.avatar_url}
                            alt={user.full_name || user.email}
                            width={40}
                            height={40}
                            className="h-full w-full rounded-full object-cover"
                          />
                        ) : (
                          getInitials(user.full_name, user.email)
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                            {user.full_name || "Sin Nombre"}
                          </p>
                          {superAdmin && (
                            <span className="inline-flex items-center gap-0.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 px-2 py-0.5 text-[10px] font-black text-white shadow-sm">
                              <span
                                className="material-symbols-outlined text-[10px]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              OWNER
                            </span>
                          )}
                        </div>
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div className="flex items-center sm:justify-center">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${
                          isAdmin
                            ? "bg-primary/10 text-primary dark:bg-primary/20"
                            : "bg-slate-100 text-slate-600 dark:bg-white/10 dark:text-slate-300"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[13px]">
                          {isAdmin ? "shield_person" : "person"}
                        </span>
                        {isAdmin ? "Admin" : "Usuario"}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="text-xs text-slate-500 sm:text-center">
                      {user.created_at
                        ? new Date(user.created_at).toLocaleDateString(
                            "es-ES",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "—"}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2">
                      {superAdmin ? (
                        /* Superadmin — intocable, solo muestra el candado */
                        <div
                          className="flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-400"
                          title="Esta cuenta no puede modificarse"
                        >
                          <span className="material-symbols-outlined text-[15px]">
                            lock
                          </span>
                          <span className="hidden sm:inline">Protegida</span>
                        </div>
                      ) : (
                        <>
                          {/* Promote / Degrade */}
                          {isAdmin ? (
                            <button
                              type="button"
                              disabled={isAnyLoading}
                              onClick={() => handleSetRole(user, "user")}
                              title="Quitar admin"
                              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700 disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-amber-500/10"
                            >
                              {isLoadingRole ? (
                                <svg
                                  className="h-3.5 w-3.5 animate-spin"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                  />
                                </svg>
                              ) : (
                                <span className="material-symbols-outlined text-[14px]">
                                  shield_minus
                                </span>
                              )}
                              <span className="hidden sm:inline">Degradar</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              disabled={isAnyLoading}
                              onClick={() => handleSetRole(user, "admin")}
                              title="Promover a admin"
                              className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-blue-500/10"
                            >
                              {isLoadingRole ? (
                                <svg
                                  className="h-3.5 w-3.5 animate-spin"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  />
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                  />
                                </svg>
                              ) : (
                                <span className="material-symbols-outlined text-[14px]">
                                  shield_person
                                </span>
                              )}
                              <span className="hidden sm:inline">Promover</span>
                            </button>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            disabled={isAnyLoading}
                            onClick={() => handleDeleteUser(user)}
                            title="Eliminar usuario"
                            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:opacity-40 dark:border-white/10 dark:text-slate-300 dark:hover:bg-red-500/10"
                          >
                            {isLoadingDelete ? (
                              <svg
                                className="h-3.5 w-3.5 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                            ) : (
                              <span className="material-symbols-outlined text-[14px]">
                                delete
                              </span>
                            )}
                            <span className="hidden sm:inline">Eliminar</span>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Footer count */}
      {!isLoading && filteredUsers.length > 0 && (
        <div className="mt-4 text-center text-sm text-slate-500">
          Mostrando {filteredUsers.length} de {users.length} usuarios
        </div>
      )}
    </div>
  );
}
