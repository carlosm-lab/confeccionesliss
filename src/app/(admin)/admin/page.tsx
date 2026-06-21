"use client";
import { useEffect, useState } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import StatsCards from "@/components/admin/StatsCards";
import RecentProducts from "@/components/admin/RecentProducts";
import RecentMessages from "@/components/admin/RecentMessages";
import CategoryChart from "@/components/admin/CategoryChart";
import TopFavorites from "@/components/admin/TopFavorites";
import StatDetailModal from "@/components/admin/StatDetailModal";
import { logger } from "@/lib/logger";
import Link from "next/link";

interface DashboardStats {
  totalProducts: number;
  activeOffers: number;
  unreadMessages: number;
  totalFavorites: number;
  totalCategories: number;
  totalUsers: number;
}

type ModalType =
  | "products"
  | "categories"
  | "offers"
  | "messages"
  | "favorites"
  | "users"
  | null;

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalProducts: 0,
    activeOffers: 0,
    unreadMessages: 0,
    totalFavorites: 0,
    totalCategories: 0,
    totalUsers: 0,
  });

  const [recentProducts, setRecentProducts] = useState<any[]>([]);

  const [recentMessages, setRecentMessages] = useState<any[]>([]);

  const [categoryData, setCategoryData] = useState<any[]>([]);

  const [topFavorites, setTopFavorites] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const [selectedModalType, setSelectedModalType] = useState<ModalType>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchDashboardData() {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.rpc("get_dashboard_data");

        if (error) {
          logger.error("RPC Error:", error);
          throw error;
        }
        if (!isMounted) return;

        if (data) {
          const source = data.summary || data;
          setStats({
            totalProducts: Number(source.totalProducts || 0),
            activeOffers: Number(source.activeOffers || 0),
            unreadMessages: Number(source.unreadMessages || 0),
            totalFavorites: Number(source.totalFavorites || 0),
            totalCategories: Number(source.totalCategories || 0),
            totalUsers: Number(source.totalUsers || 0),
          });
          setRecentProducts(data.recentProducts || []);
          setRecentMessages(data.recentMessages || []);
          setCategoryData(data.categoryData || []);
          setTopFavorites(data.topFavorites || []);
        }
      } catch (error) {
        logger.error("Dashboard fetch error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchDashboardData();
    return () => {
      isMounted = false;
    };
  }, []);

  const statCardsData = [
    {
      id: "products",
      label: "Productos",
      value: loading ? "..." : stats.totalProducts,
      icon: "inventory_2",
      colorClass: "bg-primary/10 text-primary dark:bg-primary/20",
    },
    {
      id: "categories",
      label: "Categorías",
      value: loading ? "..." : stats.totalCategories,
      icon: "category",
      colorClass:
        "bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400",
    },
    {
      id: "offers",
      label: "Ofertas Activas",
      value: loading ? "..." : stats.activeOffers,
      icon: "local_offer",
      colorClass:
        "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    },
    {
      id: "messages",
      label: "Mensajes Nuevos",
      value: loading ? "..." : stats.unreadMessages,
      icon: "mark_email_unread",
      colorClass:
        "bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400",
    },
    {
      id: "favorites",
      label: "Favoritos",
      value: loading ? "..." : stats.totalFavorites,
      icon: "favorite",
      colorClass:
        "bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400",
    },
    {
      id: "users",
      label: "Usuarios",
      value: loading ? "..." : stats.totalUsers,
      icon: "group",
      colorClass:
        "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    },
  ];

  return (
    <div>
      <div className="mx-auto max-w-[1400px] space-y-6 pb-10 md:space-y-8">
        <div>
          <h1 className="mb-1 text-2xl font-bold text-slate-900 md:mb-2 md:text-3xl dark:text-white">
            Panel de Control
          </h1>
          <p className="text-sm text-slate-500 md:text-base dark:text-slate-400">
            Resumen y estadísticas de Confecciones Liss.
          </p>
        </div>

        <StatsCards
          stats={statCardsData}
          onCardClick={(id) => setSelectedModalType(id as ModalType)}
        />

        <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          {/* Left - 2 cols on XL */}
          <div className="space-y-6 md:space-y-8 xl:col-span-2">
            <div className="h-[400px]">
              <RecentProducts products={recentProducts} loading={loading} />
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              <div className="h-[350px]">
                <CategoryChart data={categoryData} loading={loading} />
              </div>
              <div className="h-[350px]">
                <TopFavorites products={topFavorites} loading={loading} />
              </div>
            </div>
          </div>

          {/* Right - 1 col */}
          <div className="h-[400px] xl:h-[782px]">
            <RecentMessages messages={recentMessages} loading={loading} />
          </div>
        </div>

        <StatDetailModal
          isOpen={!!selectedModalType}
          type={selectedModalType}
          onClose={() => setSelectedModalType(null)}
        />

        {/* ── Enlace al panel de notificaciones ── */}
        <Link
          href="/admin/notificaciones"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-white/5 dark:bg-slate-900"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[24px]">
              campaign
            </span>
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                Notificaciones
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Crear, enviar y gestionar notificaciones push e in-app
              </p>
            </div>
          </div>
          <span className="material-symbols-outlined text-primary/40 group-hover:text-primary text-[20px] transition-colors">
            arrow_forward
          </span>
        </Link>
      </div>
    </div>
  );
}
