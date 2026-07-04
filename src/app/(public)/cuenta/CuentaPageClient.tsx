"use client";

import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/formatPrice";
import Image from "next/image";
import Link from "next/link";

export default function CuentaPageClient() {
  const { user, profile, loading, signOut, showAuthModal } = useAuth();
  const { cartItems, cartTotal, setIsCartOpen } = useCart();

  if (loading) {
    return (
      <section className="px-5 pt-16 pb-20 md:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-screen-2xl flex-col items-center justify-center gap-6">
          <span className="material-symbols-outlined text-primary animate-spin text-5xl">
            progress_activity
          </span>
        </div>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="px-5 pt-16 pb-20 md:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-screen-2xl flex-col items-center justify-center gap-6 text-center">
          <span
            className="animate-fade-in-up material-symbols-outlined text-primary text-6xl"
            style={{
              fontVariationSettings: "'FILL' 0",
              animationDelay: "100ms",
            }}
            aria-hidden="true"
          >
            manage_accounts
          </span>
          <h1
            className="animate-fade-in-up text-primary font-serif text-3xl font-bold"
            style={{ animationDelay: "200ms" }}
          >
            Cuenta
          </h1>
          <p
            className="animate-fade-in-up max-w-sm text-gray-500"
            style={{ animationDelay: "250ms" }}
          >
            Inicia sesión para acceder a tu cuenta, guardar favoritos y revisar
            tu historial de pedidos.
          </p>
          <button
            onClick={() => showAuthModal("account")}
            className="animate-fade-in-up bg-primary text-on-primary rounded-xl px-8 py-3 font-semibold shadow-sm transition hover:opacity-90 active:scale-[0.97]"
            style={{ animationDelay: "300ms" }}
          >
            Iniciar sesión con Google
          </button>
        </div>
      </section>
    );
  }

  const avatarUrl = user.user_metadata?.avatar_url as string | undefined;
  const displayName =
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    user.email ||
    "Usuario";
  const isAdmin = profile?.role === "admin";

  return (
    <section className="px-5 pt-8 pb-24 md:px-8">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Profile Card */}
        <div className="animate-fade-in-up flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="border-primary/20 relative h-20 w-20 shrink-0 overflow-hidden rounded-full border-4 shadow-md">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="Avatar"
                fill
                sizes="80px"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="bg-primary/10 flex h-full w-full items-center justify-center">
                <span className="material-symbols-outlined text-primary text-4xl">
                  person
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-xl leading-tight font-bold text-slate-900">
                {displayName}
              </h1>
              {isAdmin && (
                <span className="bg-primary rounded-full px-2 py-0.5 text-[10px] font-black tracking-wider text-white uppercase">
                  Admin
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="mt-1 text-xs text-gray-400">
              Cuenta Google conectada
            </p>
          </div>
        </div>

        {/* Cart summary */}
        {cartItems.length > 0 && (
          <div
            className="animate-fade-in-up rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            style={{ animationDelay: "100ms" }}
          >
            <h2 className="mb-4 flex items-center gap-2 font-semibold text-slate-800">
              <span className="material-symbols-outlined text-primary">
                shopping_cart
              </span>
              Carrito actual ({cartItems.length}{" "}
              {cartItems.length === 1 ? "producto" : "productos"})
            </h2>
            <div className="space-y-2 text-sm text-slate-600">
              {cartItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between border-b border-slate-50 pb-2"
                >
                  <span className="line-clamp-1 pr-4">{item.product.name}</span>
                  <span className="shrink-0 font-medium text-slate-800">
                    {formatPrice(item.product.price)} × {item.quantity}
                  </span>
                </div>
              ))}
              {cartItems.length > 3 && (
                <p className="text-xs text-gray-400">
                  +{cartItems.length - 3} productos más...
                </p>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-base font-bold text-slate-900">
                Total: {formatPrice(cartTotal)}
              </span>
              <button
                onClick={() => setIsCartOpen(true)}
                className="bg-primary rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Ver carrito
              </button>
            </div>
          </div>
        )}

        {/* Admin link */}
        {isAdmin && (
          <div
            className="animate-fade-in-up border-primary/20 bg-primary/5 rounded-2xl border p-6"
            style={{ animationDelay: "150ms" }}
          >
            <h2 className="text-primary mb-2 font-semibold">
              Panel Administrador
            </h2>
            <p className="mb-4 text-sm text-slate-600">
              Tienes acceso al panel de administración.
            </p>
            <Link
              href="/admin"
              className="bg-primary inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
            >
              <span className="material-symbols-outlined text-[18px]">
                admin_panel_settings
              </span>
              Ir al Panel Admin
            </Link>
          </div>
        )}

        {/* Sign out */}
        <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
          <button
            onClick={signOut}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 py-4 text-sm font-semibold text-red-600 transition hover:bg-red-100 active:scale-[0.97]"
          >
            <span className="material-symbols-outlined text-[20px]">
              logout
            </span>
            Cerrar sesión
          </button>
        </div>
      </div>
    </section>
  );
}
