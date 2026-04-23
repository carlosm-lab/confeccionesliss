import Image from "next/image";

const TOP_BARS = [
  { name: "Filipina Quirúrgica Élite", count: 452, pct: "100%" },
  { name: "Pantalón Médico Flex", count: 385, pct: "85%" },
  { name: "Bata Laboratorio Pro", count: 312, pct: "70%" },
  { name: "Uniforme Escolar Básico", count: 245, pct: "55%" },
  { name: "Chaqueta Chef Premium", count: 198, pct: "45%" },
];

const TOP_PRODUCTS = [
  {
    rank: 1,
    name: "Filipina Quirúrgica Élite Navy",
    tags: [
      { label: "Filipinas", style: "bg-[#ffdbc8] text-[#6e3811]" },
      {
        label: "Sector Salud",
        style: "bg-secondary-container text-on-secondary-container",
      },
    ],
    count: 452,
    barPct: "100%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAUr0RMyYS6ngQHdPZDzqWIiCOSbWFHXI8na38UAkPiJN9smIxJzFuAFDD6BH24Oh2wvE873Pu7Yf5LERwUCfczi9gWi5BDD1z93m99N9vQhRJFpYtTyydcd4gElu9EtTJDhSZfkJiOchOz_JTFIgrNSa3BweoK57Tzc79kv7ETcgz4PrLUtR9drIQgWFgDQrecYi1ajy9g7wxJ88LN0O5n7oeYh5YPSMa-rqLwOVe53FX9XgAqgNI_piBpkgRelujBIP-nbQ-2kUzG",
  },
  {
    rank: 2,
    name: "Bata Laboratorio Pro Blanca",
    tags: [
      { label: "Batas", style: "bg-[#ffdbc8] text-[#6e3811]" },
      {
        label: "Sector Salud",
        style: "bg-secondary-container text-on-secondary-container",
      },
    ],
    count: 385,
    barPct: "85%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBbneZm_x63OatwPEUkNfqGcSI5tF-2DxnwVPXvlKhWaiBEnhlsq2A-i40fCoiXA0DrchRxtXSxP_V74m0Xj3NGY42qvSoALdoFuwnbUH5HCzSFYkMnJFV2tYKOzgiqIsocZAAWCV_tL12qRCA_B0irmHSTbbRPo-dpp3LLc4n5Nqm892X_LFo8s6QfwcPLVNYFTITroqP2Ex1xjFayLxCnX2Ld_bHSSrrbC4dQsdcHwegcUYc_JCGj28JgvpR-_84Am6TP-wzrBkym",
  },
  {
    rank: 3,
    name: "Uniforme Escolar Deportivo Básico",
    tags: [
      { label: "Deportivo", style: "bg-[#ffdbc8] text-[#6e3811]" },
      {
        label: "Escuelas",
        style: "bg-secondary-container text-on-secondary-container",
      },
    ],
    count: 245,
    barPct: "60%",
    image: null,
  },
];

const INSTITUTION_DATA = [
  {
    name: "Hospital Central San José",
    type: "Sector Salud",
    users: 156,
    favs: 845,
    avg: "5.4",
    trend: "trending_up",
    trendColor: "text-green-600",
  },
  {
    name: "Clínica Las Américas",
    type: "Sector Salud",
    users: 112,
    favs: 620,
    avg: "5.5",
    trend: "trending_up",
    trendColor: "text-green-600",
  },
  {
    name: "Universidad Nacional",
    type: "Universidades",
    users: 245,
    favs: 510,
    avg: "2.1",
    trend: "trending_flat",
    trendColor: "text-secondary",
  },
  {
    name: "Colegio San Ignacio",
    type: "Escuelas",
    users: 89,
    favs: 320,
    avg: "3.6",
    trend: "trending_down",
    trendColor: "text-red-600",
  },
];

export default function AdminFavoritosPage() {
  return (
    <main className="mx-auto w-full max-w-7xl flex-grow px-8 pt-8 pb-12">
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-headline text-on-primary-fixed-variant text-3xl font-extrabold tracking-tight">
          Estadísticas de Favoritos
        </h1>
        <p className="text-secondary mt-2 text-base">
          Descubre qué productos generan más interés en tus clientes.
        </p>
      </header>

      {/* Filters */}
      <div className="bg-surface-container-lowest mb-8 flex flex-wrap items-end gap-4 rounded-xl p-4 shadow-sm">
        <div className="min-w-[200px] flex-1">
          <label
            htmlFor="filter-date-range"
            className="text-on-surface-variant mb-1.5 block text-xs font-semibold tracking-wider uppercase"
          >
            Rango de Fechas
          </label>
          <div className="relative">
            <span className="material-symbols-outlined text-outline absolute top-1/2 left-3 -translate-y-1/2 text-sm">
              calendar_month
            </span>
            <input
              id="filter-date-range"
              readOnly
              type="text"
              value="Últimos 30 días"
              className="bg-surface-container-high text-on-surface focus:ring-primary/40 w-full rounded-lg border-none py-2 pr-4 pl-9 text-sm focus:shadow-none focus:ring-1 focus:outline-none"
            />
          </div>
        </div>
        <div className="min-w-[150px] flex-1">
          <label
            htmlFor="filter-catalog"
            className="text-on-surface-variant mb-1.5 block text-xs font-semibold tracking-wider uppercase"
          >
            Catálogo
          </label>
          <div className="relative">
            <select
              id="filter-catalog"
              className="bg-surface-container-high text-on-surface focus:ring-primary/40 w-full appearance-none rounded-lg border-none py-2 pr-8 pl-4 text-sm focus:ring-1 focus:outline-none"
            >
              <option>Todos los catálogos</option>
              <option>Sector Salud</option>
              <option>Colegios</option>
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm">
              expand_more
            </span>
          </div>
        </div>
        <div className="min-w-[150px] flex-1">
          <label
            htmlFor="filter-institution"
            className="text-on-surface-variant mb-1.5 block text-xs font-semibold tracking-wider uppercase"
          >
            Institución
          </label>
          <div className="relative">
            <select
              id="filter-institution"
              className="bg-surface-container-high text-on-surface focus:ring-primary/40 w-full appearance-none rounded-lg border-none py-2 pr-8 pl-4 text-sm focus:ring-1 focus:outline-none"
            >
              <option>Todas las instituciones</option>
              <option>Hospital Central</option>
              <option>Universidad Nacional</option>
            </select>
            <span className="material-symbols-outlined text-outline pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm">
              expand_more
            </span>
          </div>
        </div>
        <button
          type="button"
          className="from-primary-container to-primary rounded-lg bg-gradient-to-br px-6 py-2 text-sm font-medium text-white shadow-[0_4px_12px_rgba(20,48,103,0.15)] transition-all hover:shadow-[0_6px_16px_rgba(20,48,103,0.2)]"
        >
          Aplicar filtros
        </button>
      </div>

      {/* Metrics */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="bg-surface-container-lowest relative overflow-hidden rounded-xl p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-on-surface-variant text-sm font-semibold">
              Total favoritos del sistema
            </h3>
            <div className="bg-primary-container/10 rounded-full p-2">
              <span className="material-symbols-outlined text-primary-container">
                favorite
              </span>
            </div>
          </div>
          <div className="font-headline text-on-primary-fixed-variant text-4xl font-extrabold tracking-tight">
            12,450
          </div>
          <div className="text-secondary mt-1 flex items-center gap-1 text-xs">
            <span className="material-symbols-outlined text-xs text-green-600">
              trending_up
            </span>
            <span className="font-medium text-green-600">+15%</span> vs mes
            anterior
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-on-surface-variant text-sm font-semibold">
              Usuarios con favoritos
            </h3>
            <div className="bg-surface-container-high rounded-full p-2">
              <span className="material-symbols-outlined text-on-surface-variant">
                group
              </span>
            </div>
          </div>
          <div className="font-headline text-on-primary-fixed-variant text-4xl font-extrabold tracking-tight">
            3,210
          </div>
          <div className="text-secondary mt-1 text-xs">
            Representa el <strong className="text-on-surface">68%</strong> de
            usuarios activos
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-on-surface-variant text-sm font-semibold">
              Producto más deseado
            </h3>
            <div className="rounded-full bg-[#ffdbc8] p-2">
              <span className="material-symbols-outlined text-[#6e3811]">
                local_fire_department
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-4">
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjO-SSFsGbpDTQoJzZphEncKGtrLKIz24FwIy6TVmTXGaKCjjDnG-FJtGnofZgZDvbeiXhlL68WBO5V1pngdPGDdIIpd5VHpjGvIALVlYNsD9nC3xbc9GR-X-tVLWifxJbssRekv0lgRrGOHtTSUEo0v0MItRSySohjZVZyknqUzVClZ0l9pMQSNVzc3DcRFKnqxPw9EXvrR15rvh_1CFar2oVM_zVOaxATFj-fADi1fUEkqU6y01fv7krwizu1yTqq2SZtwRlx7Hs"
              alt="Scrub Médico"
              width={56}
              height={56}
              className="bg-surface-container rounded-lg object-cover"
            />
            <div>
              <div className="font-headline text-on-surface text-base leading-tight font-bold">
                Filipina Quirúrgica Élite Navy
              </div>
              <div className="text-primary mt-1 text-xs font-semibold">
                452 favoritos
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Top 10 Bar Chart */}
        <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
          <h3 className="font-headline text-on-primary-fixed-variant mb-6 text-lg font-bold">
            Top 10 por favoritos
          </h3>
          <div className="space-y-4">
            {TOP_BARS.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <div className="text-on-surface-variant w-1/3 truncate text-xs font-medium">
                  {b.name}
                </div>
                <div className="bg-surface-container h-2 flex-1 overflow-hidden rounded-full">
                  <div
                    className="bg-primary-container h-full rounded-full"
                    style={{ width: b.pct }}
                  ></div>
                </div>
                <div className="text-on-surface w-12 text-right text-xs font-bold">
                  {b.count}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Donut Chart */}
        <div className="bg-surface-container-lowest flex flex-col rounded-xl p-6 shadow-sm">
          <h3 className="font-headline text-on-primary-fixed-variant mb-6 text-lg font-bold">
            Por tipo de catálogo
          </h3>
          <div className="flex flex-1 items-center justify-center gap-8">
            <div
              className="relative h-40 w-40 rounded-full"
              style={{
                background:
                  "conic-gradient(from 0deg, #143067 0% 55%, #455d96 55% 75%, #b1c5ff 75% 90%, #d7dffc 90% 100%)",
              }}
            >
              <div className="bg-surface-container-lowest absolute inset-0 m-auto flex h-24 w-24 items-center justify-center rounded-full">
                <div className="text-center">
                  <div className="text-on-surface text-sm font-bold">100%</div>
                  <div className="text-secondary text-[10px] tracking-wide uppercase">
                    Total
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              {[
                { color: "#143067", label: "Sector Salud (55%)" },
                { color: "#455d96", label: "Universidades (20%)" },
                { color: "#b1c5ff", label: "Escuelas (15%)" },
                { color: "#d7dffc", label: "Empresas (10%)" },
              ].map((l) => (
                <div key={l.label} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ background: l.color }}
                  ></div>
                  <span className="text-on-surface-variant text-sm font-medium">
                    {l.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Ranking */}
      <div className="bg-surface-container-lowest mb-8 rounded-xl p-6 shadow-sm">
        <h3 className="font-headline text-on-primary-fixed-variant mb-6 text-xl font-bold">
          Top productos más deseados
        </h3>
        <div className="space-y-4">
          {TOP_PRODUCTS.map((p) => (
            <div
              key={p.rank}
              className="bg-background hover:bg-surface-container-low flex items-center gap-4 rounded-lg p-3 transition-colors"
            >
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold shadow-sm ${p.rank === 1 ? "bg-primary-container text-white" : "border-surface-container-high text-on-surface-variant border"}`}
              >
                {p.rank}
              </div>
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  width={48}
                  height={48}
                  className="bg-surface-container h-12 w-12 rounded object-cover"
                />
              ) : (
                <div className="bg-surface-container text-outline flex h-12 w-12 items-center justify-center rounded">
                  <span className="material-symbols-outlined">apparel</span>
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="text-on-surface truncate text-sm font-bold">
                  {p.name}
                </div>
                <div className="mt-1 flex gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`inline-flex items-center rounded px-2 py-0.5 text-[10px] font-semibold ${t.style}`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="hidden w-32 sm:block">
                <div className="bg-surface-container h-2 overflow-hidden rounded-full">
                  <div
                    className="bg-primary-container h-full"
                    style={{ width: p.barPct }}
                  ></div>
                </div>
              </div>
              <div className="text-on-surface w-16 text-right text-sm font-bold">
                {p.count}
              </div>
              <button
                type="button"
                className="text-primary hover:text-primary-fixed-variant ml-4 text-sm font-semibold whitespace-nowrap transition-colors"
              >
                Ver producto
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button
            type="button"
            className="text-secondary hover:text-on-surface text-sm font-semibold transition-colors"
          >
            Mostrar más (4-10)
          </button>
        </div>
      </div>

      {/* Institutions Table */}
      <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm">
        <h3 className="font-headline text-on-primary-fixed-variant mb-6 text-lg font-bold">
          Favoritos por institución
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr>
                <th className="text-on-surface-variant pb-3 text-xs font-semibold tracking-wider uppercase">
                  Institución
                </th>
                <th className="text-on-surface-variant pb-3 text-xs font-semibold tracking-wider uppercase">
                  Tipo
                </th>
                <th className="text-on-surface-variant pb-3 text-right text-xs font-semibold tracking-wider uppercase">
                  Usuarios
                </th>
                <th className="text-on-surface-variant pb-3 text-right text-xs font-semibold tracking-wider uppercase">
                  Total favoritos
                </th>
                <th className="text-on-surface-variant pb-3 text-right text-xs font-semibold tracking-wider uppercase">
                  Promedio por usuario
                </th>
                <th className="text-on-surface-variant pb-3 text-center text-xs font-semibold tracking-wider uppercase">
                  Tendencia
                </th>
              </tr>
            </thead>
            <tbody className="align-top">
              {INSTITUTION_DATA.map((r, i) => (
                <tr
                  key={r.name}
                  className={`border-background border-t-[4px] ${i % 2 === 0 ? "bg-surface-container-low/50" : ""}`}
                >
                  <td className="text-on-surface py-3 pr-4 font-medium">
                    {r.name}
                  </td>
                  <td className="text-secondary py-3 pr-4">{r.type}</td>
                  <td className="text-on-surface py-3 pr-4 text-right">
                    {r.users}
                  </td>
                  <td className="text-on-surface py-3 pr-4 text-right font-medium">
                    {r.favs}
                  </td>
                  <td className="text-secondary py-3 pr-4 text-right">
                    {r.avg}
                  </td>
                  <td className="py-3 text-center">
                    <span
                      className={`material-symbols-outlined text-base ${r.trendColor}`}
                    >
                      {r.trend}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
