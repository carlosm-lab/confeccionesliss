"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { useState, useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { logger } from "@/lib/logger";
import FocusLock from "react-focus-lock";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";

/** ── Types ────────────────────────────────────────────────── */
type ModalType =
  | "products"
  | "categories"
  | "offers"
  | "messages"
  | "favorites"
  | "users"
  | null;

interface ProductItem {
  id: string;
  name: string;
  price: number;
  category: string;
}
interface CategoryItem {
  id: string;
  name: string;
  slug: string;
}
interface OfferItem {
  id: string;
  name: string;
  price: number;
  old_price: number;
}
interface MessageItem {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  created_at: string;
}
interface FavoriteItem {
  id: string;
  name: string;
  count: number;
}
interface UserItem {
  id: string;
  full_name?: string;
  email: string;
  role?: string;
}

type DataItem =
  | ProductItem
  | CategoryItem
  | OfferItem
  | MessageItem
  | FavoriteItem
  | UserItem;

interface StatDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: ModalType;
}

/** ── Component ─────────────────────────────────────────────── */
export default function StatDetailModal({
  isOpen,
  onClose,
  type,
}: StatDetailModalProps) {
  useBodyScrollLock(isOpen);

  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);

  /* ── Fetch data ─────────────────────────────────────────── */
  useEffect(() => {
    if (!isOpen || !type) return;

    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const supabase = getSupabaseClient();
        let fetchedData: DataItem[] = [];

        switch (type) {
          case "products": {
            const { data: pData } = await supabase
              .from("products")
              .select("id, name, price, category")
              .order("created_at", { ascending: false })
              .limit(100);
            fetchedData = (pData as ProductItem[]) || [];
            break;
          }
          case "categories": {
            const { data: cData } = await supabase
              .from("categories")
              .select("id, name, slug")
              .order("name");
            fetchedData = (cData as CategoryItem[]) || [];
            break;
          }
          case "offers": {
            const { data: oData } = await supabase
              .from("products")
              .select("id, name, price, old_price")
              .not("old_price", "is", null)
              .order("created_at", { ascending: false })
              .limit(100);
            fetchedData = (oData as OfferItem[]) || [];
            break;
          }
          case "messages": {
            /* FIX B1: tabla correcta = "messages" (no "contact_messages") */
            const { data: mData } = await supabase
              .from("messages")
              .select("id, name, email, subject, created_at")
              .eq("is_read", false)
              .order("created_at", { ascending: false })
              .limit(100);
            fetchedData = (mData as MessageItem[]) || [];
            break;
          }
          case "favorites": {
            const { data: allFavs } = await supabase
              .from("user_favorites")
              .select("product_id");
            if (allFavs && allFavs.length > 0) {
              const counts: Record<string, number> = {};
              for (const row of allFavs as { product_id: string }[]) {
                counts[row.product_id] = (counts[row.product_id] || 0) + 1;
              }
              const pIds = Object.keys(counts);
              if (pIds.length > 0) {
                const { data: favProd } = await supabase
                  .from("products")
                  .select("id, name")
                  .in("id", pIds);
                if (favProd) {
                  fetchedData = (favProd as { id: string; name: string }[])
                    .map((p) => ({ ...p, count: counts[p.id] || 0 }))
                    .sort((a, b) => b.count - a.count) as FavoriteItem[];
                }
              }
            }
            break;
          }
          case "users": {
            const { data: uData } = await supabase.rpc("get_users_list");
            fetchedData = (uData as UserItem[]) || [];
            break;
          }
        }

        if (isMounted) setData(fetchedData);
      } catch (err) {
        logger.error(`Error fetching data for ${type}:`, err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [isOpen, type]);

  /* ── Keyboard ESC ───────────────────────────────────────── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  /* ── Helpers ─────────────────────────────────────────────── */
  const getTitle = () => {
    switch (type) {
      case "products":
        return "Detalle de Productos";
      case "categories":
        return "Detalle de Categorías";
      case "offers":
        return "Ofertas Activas";
      case "messages":
        return "Mensajes No Leídos";
      case "favorites":
        return "Top Favoritos";
      case "users":
        return "Lista de Usuarios";
      default:
        return "Detalle";
    }
  };

  const renderItem = (item: DataItem, idx: number) => {
    switch (type) {
      case "products": {
        const p = item as ProductItem;
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {p.name}
              </p>
              <p className="text-xs text-slate-500">{p.category}</p>
            </div>
            <div className="font-bold text-slate-800 dark:text-slate-200">
              ${p.price}
            </div>
          </div>
        );
      }
      case "categories": {
        const c = item as CategoryItem;
        return (
          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-900 dark:text-white">
              {c.name}
            </p>
            <p className="rounded-full border border-slate-200 px-2 text-sm text-slate-500 dark:border-white/5">
              {c.slug}
            </p>
          </div>
        );
      }
      case "offers": {
        const o = item as OfferItem;
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {o.name}
              </p>
              <p className="text-xs text-red-500 line-through">
                ${o.old_price}
              </p>
            </div>
            <div className="font-bold text-emerald-600">${o.price}</div>
          </div>
        );
      }
      case "messages": {
        const m = item as MessageItem;
        return (
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p className="font-medium text-slate-900 dark:text-white">
                {m.name}
              </p>
              <span className="text-xs text-slate-500">
                {new Date(m.created_at).toLocaleDateString("es-ES")}
              </span>
            </div>
            <p className="truncate text-sm text-slate-600">
              {m.subject || "Sin asunto"}
            </p>
            <a
              href={`mailto:${m.email}`}
              className="text-primary text-xs hover:underline"
            >
              {m.email}
            </a>
          </div>
        );
      }
      case "favorites": {
        const f = item as FavoriteItem;
        return (
          <div className="flex items-center justify-between">
            <p className="font-medium text-slate-900 dark:text-white">
              {f.name}
            </p>
            <div className="flex items-center gap-1 text-pink-500">
              <Icon name="favorite" size={16} />
              <span className="font-bold">{f.count}</span>
            </div>
          </div>
        );
      }
      case "users": {
        const u = item as UserItem;
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-900 dark:text-white">
                {u.full_name || "Sin Nombre"}
              </p>
              <p className="text-xs text-slate-500">{u.email}</p>
            </div>
            <span
              className={`rounded-full px-2 py-1 text-xs ${u.role === "admin" ? "bg-primary/10 text-primary" : "bg-slate-100 text-slate-700"}`}
            >
              {u.role || "user"}
            </span>
          </div>
        );
      }
      default:
        return (
          <p key={idx} className="text-sm text-slate-500">
            Item desconocido
          </p>
        );
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-10">
          <span className="border-primary/20 border-t-primary h-8 w-8 animate-spin rounded-full border-4" />
        </div>
      );
    }
    if (data.length === 0) {
      return (
        <div className="py-10 text-center text-slate-500">
          No hay datos disponibles para mostrar.
        </div>
      );
    }
    return (
      <ul className="divide-y divide-slate-100 dark:divide-white/5">
        {data.map((item, idx) => (
          <li
            key={(item as { id: string }).id || idx}
            className="px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
          >
            {renderItem(item, idx)}
          </li>
        ))}
      </ul>
    );
  };

  /* ── Render ──────────────────────────────────────────────── */
  return (
    /* FIX A5: Backdrop — role button for a11y */
    <div
      role="button"
      tabIndex={-1}
      aria-label="Cerrar"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 p-4 backdrop-blur-[2px] sm:bg-black/20"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      {/* FIX B4: id corregido para coincidir con aria-labelledby */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="stat-modal-title"
        className="flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl dark:bg-slate-900"
      >
        <FocusLock
          returnFocus
          className="flex max-h-[85vh] w-full flex-col overflow-hidden"
        >
          <div className="flex shrink-0 items-center justify-between border-b border-slate-100 p-6 dark:border-white/5">
            {/* FIX B4: id coincide con aria-labelledby */}
            <h2
              id="stat-modal-title"
              className="text-xl font-bold text-slate-900 dark:text-white"
            >
              {getTitle()}
            </h2>
            <button
              onClick={onClose}
              aria-label="Cerrar detalles"
              className="rounded-full p-2 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-white/10"
            >
              <Icon name="close" />
            </button>
          </div>
          <div className="custom-scrollbar flex-1 overflow-y-auto">
            {renderContent()}
          </div>
        </FocusLock>
      </div>
    </div>
  );
}
