"use client";

interface CategoryDataItem {
  name: string;
  count: number;
}

interface CategoryChartProps {
  data: CategoryDataItem[];
  loading: boolean;
}

export default function CategoryChart({ data, loading }: CategoryChartProps) {
  if (loading) {
    return (
      <div className="border-primary/30 dark:border-primary/20 h-full rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
        <h3 className="mb-4 text-lg font-bold text-slate-900 dark:text-white">
          Distribución por Categorías
        </h3>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="mb-1 flex justify-between text-xs">
                <div className="h-3 w-1/4 rounded bg-slate-200 dark:bg-white/10"></div>
                <div className="h-3 w-8 rounded bg-slate-200 dark:bg-white/10"></div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const getItemCount = (item: any) =>
    Number(item.count ?? item.product_count ?? 0);

  const total = data.reduce((sum, item) => sum + getItemCount(item), 0);
  const sortedData = [...data]
    .sort((a, b) => getItemCount(b) - getItemCount(a))
    .slice(0, 6);

  const barColors = [
    "bg-primary",
    "bg-blue-500",
    "bg-teal-500",
    "bg-purple-500",
    "bg-amber-500",
    "bg-slate-400",
  ];

  return (
    <div className="border-primary/30 dark:border-primary/20 flex h-full flex-col rounded-2xl border bg-white p-6 shadow-[0_0_25px_6px_rgba(20,48,103,0.12),0_0_10px_2px_rgba(20,48,103,0.08)] dark:bg-white/5">
      <h3 className="mb-6 text-lg font-bold text-slate-900 dark:text-white">
        Distribución por Categorías
      </h3>

      {sortedData.length === 0 ? (
        <p className="py-4 text-center text-sm text-slate-500 dark:text-slate-400">
          No hay datos suficientes.
        </p>
      ) : (
        <div className="custom-scrollbar flex min-h-0 flex-1 flex-col space-y-5 overflow-y-auto">
          {sortedData.map((item, index) => {
            const count = getItemCount(item);
            const percentage =
              total > 0 ? Math.round((count / total) * 100) : 0;
            const colorClass = barColors[index % barColors.length];

            return (
              <div
                key={`${item.name || "sin-nombre"}-${index}`}
                className="group"
              >
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="truncate pr-4 font-medium text-slate-700 dark:text-slate-300">
                    {item.name || "Sin categorizar"}
                  </span>
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-bold text-slate-900 dark:bg-white/10 dark:text-white">
                    {count}{" "}
                    <span className="ml-1 text-[10px] text-slate-500 dark:text-slate-400">
                      ({percentage}%)
                    </span>
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-white/10">
                  <div
                    className={`h-full ${colorClass} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
