"use client";

import { Icon } from "@/components/ui/icons/Icon";

interface StatCard {
  id: string;
  label: string;
  value: string | number;
  icon: string;
  colorClass?: string;
}

interface StatsCardsProps {
  stats: StatCard[];
  onCardClick?: (id: string) => void;
}

export default function StatsCards({ stats, onCardClick }: StatsCardsProps) {
  return (
    <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 2xl:grid-cols-6">
      {stats.map((stat) => {
        const Tag = onCardClick ? "button" : "div";
        return (
          <Tag
            key={stat.id}
            type={onCardClick ? "button" : undefined}
            onClick={onCardClick ? () => onCardClick(stat.id) : undefined}
            aria-label={
              onCardClick ? `Ver detalles de ${stat.label}` : undefined
            }
            className={`group focus:ring-primary border-primary/30 hover:border-primary/50 dark:border-primary/20 flex w-full flex-col gap-3 overflow-hidden rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] transition-all duration-300 hover:shadow-[0_0_35px_8px_rgba(20,48,103,0.18),0_0_15px_3px_rgba(20,48,103,0.12)] focus:ring-2 focus:outline-none md:gap-4 md:p-5 dark:bg-white/5 ${onCardClick ? "cursor-pointer text-left" : ""}`}
          >
            <div className="flex w-full items-center justify-between">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 md:h-11 md:w-11 ${stat.colorClass || "bg-primary/10 text-primary"}`}
              >
                <Icon name={stat.icon} size={20} />
              </div>
              <h3 className="text-xl leading-tight font-black text-slate-900 md:text-2xl dark:text-white">
                {stat.value}
              </h3>
            </div>
            <div className="w-full text-center">
              <p className="line-clamp-1 text-[10px] font-bold tracking-wider text-slate-500 uppercase md:text-xs dark:text-slate-400">
                {stat.label}
              </p>
            </div>
          </Tag>
        );
      })}
    </div>
  );
}
