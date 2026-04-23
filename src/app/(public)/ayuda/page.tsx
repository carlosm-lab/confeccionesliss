import Link from "next/link";

export default function AyudaPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="w-full bg-primary-container h-[260px] flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-container opacity-90 z-0"></div>
        {/* Decorative background blur */}
        <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl z-0 pointer-events-none"></div>
        <div className="relative z-10 w-full max-w-3xl flex flex-col items-center text-center">
          <h1 className="font-headline text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">Centro de Ayuda</h1>
          <div className="w-full relative group shadow-lg">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant z-20 font-light">search</span>
            <input aria-label="Buscar ayuda" className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest text-on-surface font-body text-base rounded-lg border-none focus:ring-2 focus:ring-primary-container shadow-sm transition-all focus:outline-none" placeholder="¿En qué podemos ayudarte?" type="text" />
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button type="button" className="px-4 py-1.5 rounded-full border border-white/30 text-white font-label text-sm hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">Guía de tallas</button>
            <button type="button" className="px-4 py-1.5 rounded-full border border-white/30 text-white font-label text-sm hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">Tiempo de entrega</button>
            <button type="button" className="px-4 py-1.5 rounded-full border border-white/30 text-white font-label text-sm hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">Cómo pagar</button>
            <button type="button" className="px-4 py-1.5 rounded-full border border-white/30 text-white font-label text-sm hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">Pedidos grupales</button>
          </div>
        </div>
      </section>

      {/* Content Area */}
      <div className="bg-surface-container-low min-h-screen pb-32 pt-16">
        <div className="max-w-screen-xl mx-auto px-6 sm:px-8 lg:px-12">
          {/* Categories Grid */}
          <section className="mb-24">
            <h2 className="sr-only">Categorías de Ayuda</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <Link href="#" className="group bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0px_12px_24px_rgba(25,28,30,0.06)] hover:-translate-y-1 block border-t-4 border-transparent hover:border-primary-container">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl font-light" style={{ fontVariationSettings: "'FILL' 1" }}>credit_card</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">Pedidos y pagos</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">Información sobre métodos de pago, facturación y cómo realizar pedidos al por mayor o detalle.</p>
                <div className="flex items-center text-xs font-label text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px] mr-1 font-light">article</span>
                  <span>12 artículos</span>
                </div>
              </Link>
              
              {/* Card 2 */}
              <Link href="#" className="group bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0px_12px_24px_rgba(25,28,30,0.06)] hover:-translate-y-1 block border-t-4 border-transparent hover:border-primary-container">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl font-light" style={{ fontVariationSettings: "'FILL' 1" }}>straighten</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">Tallas y medidas</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">Cómo medir correctamente para asegurar el ajuste perfecto de sus uniformes clínicos y corporativos.</p>
                <div className="flex items-center text-xs font-label text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px] mr-1 font-light">article</span>
                  <span>5 artículos</span>
                </div>
              </Link>

              {/* Card 3 */}
              <Link href="#" className="group bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0px_12px_24px_rgba(25,28,30,0.06)] hover:-translate-y-1 block border-t-4 border-transparent hover:border-primary-container">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl font-light" style={{ fontVariationSettings: "'FILL' 1" }}>design_services</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">Personalización y bordados</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">Detalles sobre logotipos, nombres bordados, colores de hilo disponibles y tiempos de producción.</p>
                <div className="flex items-center text-xs font-label text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px] mr-1 font-light">article</span>
                  <span>8 artículos</span>
                </div>
              </Link>

              {/* Card 4 */}
              <Link href="#" className="group bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0px_12px_24px_rgba(25,28,30,0.06)] hover:-translate-y-1 block border-t-4 border-transparent hover:border-primary-container">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl font-light" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">Envíos y entregas</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">Costos, tiempos de tránsito, zonas de cobertura y cómo rastrear su pedido dentro y fuera de San Miguel.</p>
                <div className="flex items-center text-xs font-label text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px] mr-1 font-light">article</span>
                  <span>6 artículos</span>
                </div>
              </Link>

              {/* Card 5 */}
              <Link href="#" className="group bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0px_12px_24px_rgba(25,28,30,0.06)] hover:-translate-y-1 block border-t-4 border-transparent hover:border-primary-container">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl font-light" style={{ fontVariationSettings: "'FILL' 1" }}>assignment_return</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">Devoluciones y cambios</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">Política de cambios por talla, garantías de confección y excepciones para prendas bordadas personalizadas.</p>
                <div className="flex items-center text-xs font-label text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px] mr-1 font-light">article</span>
                  <span>4 artículos</span>
                </div>
              </Link>

              {/* Card 6 */}
              <Link href="#" className="group bg-surface-container-lowest rounded-xl p-8 relative overflow-hidden transition-all duration-300 hover:shadow-[0px_12px_24px_rgba(25,28,30,0.06)] hover:-translate-y-1 block border-t-4 border-transparent hover:border-primary-container">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-fixed group-hover:text-primary transition-colors">
                    <span className="material-symbols-outlined text-2xl font-light" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold text-on-surface mb-2 tracking-tight group-hover:text-primary transition-colors">Pedidos institucionales</h3>
                <p className="font-body text-sm text-on-surface-variant leading-relaxed mb-6">Información exclusiva para hospitales, clínicas, universidades y compras corporativas de gran volumen.</p>
                <div className="flex items-center text-xs font-label text-outline group-hover:text-primary transition-colors">
                  <span className="material-symbols-outlined text-[16px] mr-1 font-light">article</span>
                  <span>9 artículos</span>
                </div>
              </Link>
            </div>
          </section>
          <div className="h-16"></div> {/* Visual break */}
        </div>
      </div>
    </div>
  );
}
