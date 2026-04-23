import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Novedades | Confecciones Liss",
  description: "Descubre los últimos diseños en uniformes médicos y corporativos. Comodidad y estilo profesional.",
}

export default function NovedadesPage() {
  return (
    <main className="flex-grow">
      {/* HERO SECTION */}
      <section className="w-full h-[320px] bg-primary flex flex-col items-center justify-center text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20 z-0"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1584820927508-cadefcde70ec?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center opacity-30 mix-blend-overlay z-0"></div>
        <div className="relative z-10 space-y-6 max-w-3xl mt-8">
          <h1 className="font-headline text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-md">Novedades</h1>
          <p className="font-body text-xl text-white/90 max-w-xl mx-auto font-medium drop-shadow-sm">Descubre los últimos diseños en uniformes médicos y corporativos. Comodidad y estilo profesional.</p>
          <span className="inline-block mt-4 bg-white/20 backdrop-blur-md border border-white/30 text-white font-label text-xs uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg">
            Actualizado Abril 2026
          </span>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* FILTER CHIPS */}
        <section className="bg-white p-3 rounded-2xl shadow-[0px_4px_20px_rgba(20,48,103,0.05)] flex flex-nowrap overflow-x-auto gap-3 items-center no-scrollbar border border-slate-200">
          <span className="font-label text-sm font-bold text-slate-700 pl-4 pr-2 whitespace-nowrap uppercase tracking-wide">Filtrar:</span>
          <button className="bg-primary text-white font-label text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap transition-all shadow-md">Todos</button>
          <button className="bg-slate-50 text-slate-700 font-label text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200">Esta semana</button>
          <button className="bg-slate-50 text-slate-700 font-label text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200">Este mes</button>
          <button className="bg-slate-50 text-slate-700 font-label text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200">Sector Salud</button>
          <button className="bg-slate-50 text-slate-700 font-label text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200">Universidades</button>
          <button className="bg-slate-50 text-slate-700 font-label text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200">Escuelas</button>
          <button className="bg-slate-50 text-slate-700 font-label text-sm font-semibold px-6 py-2.5 rounded-xl whitespace-nowrap hover:bg-slate-100 hover:text-primary transition-colors border border-slate-200">Empresas</button>
        </section>

        {/* FEATURED NEW ARRIVAL */}
        <section className="bg-white rounded-3xl overflow-hidden shadow-[0px_16px_48px_rgba(20,48,103,0.08)] border border-slate-200 flex flex-col md:flex-row group">
          <div className="md:w-1/2 h-[400px] md:h-auto relative bg-slate-100 overflow-hidden">
            <Image 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_EJbQy5hmeIJuR7R_nt629TNLagrijlf2ie96Alh7Cn0XcgFjMX83oCj_qYcjow21SUUkZmILIOxITFo7cetAo1utR-U-4SOEQWiXV_50Yu7yi2k-NjP8DpkNz8KmI3FAn3aBH54u4Bd7cQxj71750RDWRChC_MXZsSG2A9J7U3AYL-CB8JW5zEDPxmZjhrmBY0nwvvwP95GcdlRnjc9gcPWvRtFeiwDgRqB10HuBPcEeFhsEMRLAoIV2JS_VsQNhymKuebiaIJQ"
              alt="Featured medical uniform"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="md:w-1/2 p-10 md:p-14 flex flex-col justify-center bg-white relative">
            <div className="absolute top-10 right-10">
              <span className="bg-secondary text-white font-label text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full shadow-sm">Nuevo</span>
            </div>
            <span className="font-label text-sm text-slate-500 font-semibold mb-3 tracking-wide uppercase">Colección Quirúrgica Premium</span>
            <h2 className="font-headline text-4xl font-extrabold text-primary mb-5 tracking-tight leading-tight">Conjunto Antifluido &quot;Elite&quot;</h2>
            <p className="font-body text-lg text-slate-600 mb-8 leading-relaxed">Nuestra nueva tela antifluido con tecnología de estiramiento en 4 direcciones. Diseñado para largas jornadas de guardia, ofreciendo máxima comodidad y protección superior contra derrames.</p>
            
            <div className="mb-8">
              <span className="font-label text-sm text-slate-700 font-bold block mb-3 uppercase tracking-wide">Tallas Disponibles</span>
              <div className="flex gap-3">
                <button className="w-10 h-10 rounded-full border border-slate-300 hover:border-primary hover:text-primary flex items-center justify-center text-sm font-semibold text-slate-600 transition-colors">XS</button>
                <button className="w-10 h-10 rounded-full border border-slate-300 hover:border-primary hover:text-primary flex items-center justify-center text-sm font-semibold text-slate-600 transition-colors">S</button>
                <button className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center text-sm font-bold text-white bg-primary shadow-md">M</button>
                <button className="w-10 h-10 rounded-full border border-slate-300 hover:border-primary hover:text-primary flex items-center justify-center text-sm font-semibold text-slate-600 transition-colors">L</button>
                <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-sm font-semibold text-slate-400 opacity-60 cursor-not-allowed">XL</button>
              </div>
            </div>
            
            <div className="text-3xl font-headline font-black text-primary mb-10">$45.00</div>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-primary text-white font-label font-bold py-4 px-6 rounded-xl shadow-[0px_8px_16px_rgba(20,48,103,0.2)] hover:bg-[#0d2250] transition-colors active:scale-[0.98] flex items-center justify-center gap-2 text-lg">
                Ver producto
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="bg-[#25D366] text-white font-label font-bold py-4 px-6 rounded-xl shadow-[0px_8px_16px_rgba(37,211,102,0.2)] hover:bg-[#20b858] transition-colors active:scale-[0.98] flex items-center justify-center gap-2 text-lg">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path></svg>
                Consultar
              </button>
            </div>
          </div>
        </section>

        {/* PRODUCT GRID HEADER */}
        <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b-2 border-slate-200 pb-6 mt-16">
          <div>
            <h3 className="font-headline text-3xl font-extrabold text-primary tracking-tight">Todos los Ingresos</h3>
            <p className="font-body text-base text-slate-500 mt-2 font-medium">Mostrando 24 de 86 productos nuevos.</p>
          </div>
          {/* Sort Menu */}
          <div className="relative">
            <button className="flex items-center gap-2 font-label text-sm font-bold text-slate-600 bg-white border border-slate-300 hover:border-primary hover:text-primary px-4 py-2 rounded-lg transition-colors group focus:outline-none shadow-sm">
              Ordenar: Más reciente
              <span className="material-symbols-outlined text-lg transition-transform group-hover:rotate-180">keyboard_arrow_down</span>
            </button>
          </div>
        </div>

        {/* PRODUCT GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Product Card 1 */}
          <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAk4cpGr63JUCHi7D3fMrpx6ZEiTvhz2-7lz6fTkBLIBwlGr7ScHHI1CW9CfCof1zXdz0OKyo3YIIuUnsW0aKzKXTU6RwJMr1Be41cEehqrRWxbd2MeWLYFz_nQk-cqmqiZ1Yi2zGjrk2pVKcByWPieL0EfZaPSCQQ8HJ4Kt_xVGtH7m5rZUBzPgu0_cMLYrVlRH1lR1_yT3gpnLufICOQ0O4iWOh1WEWCfMqyk6bAN6uWaf2JsAanc3cvB-1lDngSHmASE0oMrOs"
                alt="Filipina cuello V"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-white font-label text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-md">Nuevo</span>
              </div>
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-white transition-all shadow-md">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
              </button>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label text-xs text-slate-500 font-bold uppercase tracking-widest">Filipinas</span>
                <span className="font-label text-[10px] text-slate-400 font-medium">Llegó hace 3 días</span>
              </div>
              <h4 className="font-headline text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-primary transition-colors">Filipina Cuello V "Clásica"</h4>
              <p className="font-body text-sm text-slate-600 line-clamp-2 mb-4">Tela popelina suave al tacto y resistente a múltiples lavados.</p>
              
              <div className="flex gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#800020] border-2 border-white ring-1 ring-slate-200 shadow-sm cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#000080] border-2 border-white ring-1 ring-slate-200 shadow-sm cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#008080] border-2 border-white ring-1 ring-slate-200 shadow-sm cursor-pointer"></div>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="font-headline font-black text-xl text-primary">$18.50</span>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary transition-all flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-sm">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCLcCNErxS0-NzihVoFW4g5Vpus2dSL3GdbGTVvbvl2JfqlnQL45dEOWNB895DKmKA2GDnq3zEUla2Zju3u2kN-zP2FX6VYbIs4wQmZlj_dFuCYdaUfFsImgbjmbV6Mo9RiUKLDroP4zPMJicxJ6cFxFg437rX5UHEHfxuHUowddrTQudMV_zezOA3qlJdtgSi2aXkaDLUgr7msrwcWzJM6FcCGaJwu8OE6_ndnaHH38AbMeI6sXxX-3imh4gJSkpxXy3T02uDNEY"
                alt="Pantalón médico"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-white font-label text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-md">Nuevo</span>
              </div>
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-white transition-all shadow-md">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
              </button>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label text-xs text-slate-500 font-bold uppercase tracking-widest">Pantalones</span>
                <span className="font-label text-[10px] text-slate-400 font-medium">Llegó hace 5 días</span>
              </div>
              <h4 className="font-headline text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-primary transition-colors">Pantalón Cargo "Flex"</h4>
              <p className="font-body text-sm text-slate-600 line-clamp-2 mb-4">Múltiples bolsillos y cintura elástica para máximo confort.</p>
              
              <div className="flex gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#008080] border-2 border-white ring-1 ring-slate-200 shadow-sm cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#111111] border-2 border-white ring-1 ring-slate-200 shadow-sm cursor-pointer"></div>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="font-headline font-black text-xl text-primary">$22.00</span>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary transition-all flex items-center justify-center focus:outline-none shadow-sm">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiw8c6vxvLAEGLY0AyXerIGPTTy4lNxKz8_QBPT4xY0VxALOQcLxziH1Xb0Qswsy9q52aTuhPDDV_1TaR4pFCuePPkDIpesTRr0A4stAtRGR84KHNC0A4WqoYctT5BL6nOUDfJAdYtrV0hME0PKKsLG9v9kfoJIUkBZCHMUHWg-vZMZCIERWZKSPhHK74hBu4hu66HpLd70eOe0hR3BZP2PcbePn7Ws9KY2w-XP-StYZ3Vjg5IhOgnhT-dwkAq7sT7COpkIfCiuIk"
                alt="Bata médica"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-white font-label text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-md">Nuevo</span>
              </div>
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-white transition-all shadow-md">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
              </button>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label text-xs text-slate-500 font-bold uppercase tracking-widest">Batas</span>
                <span className="font-label text-[10px] text-slate-400 font-medium">Llegó hace 1 semana</span>
              </div>
              <h4 className="font-headline text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-primary transition-colors">Bata Médica Larga Premium</h4>
              <p className="font-body text-sm text-slate-600 line-clamp-2 mb-4">Corte entallado elegante, tela gabardina repelente a líquidos.</p>
              
              <div className="flex gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#FFFFFF] border-2 border-slate-200 ring-1 ring-slate-300 shadow-sm cursor-pointer"></div>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="font-headline font-black text-xl text-primary">$35.00</span>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary transition-all flex items-center justify-center focus:outline-none shadow-sm">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Card 4 */}
          <div className="group relative flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
               <Image 
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600"
                alt="Traje Clínico"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute top-4 left-4">
                <span className="bg-secondary text-white font-label text-[10px] font-bold uppercase tracking-widest py-1.5 px-3 rounded-full shadow-md">Nuevo</span>
              </div>
              <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-slate-400 hover:text-secondary hover:bg-white transition-all shadow-md">
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 0" }}>favorite</span>
              </button>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-2">
                <span className="font-label text-xs text-slate-500 font-bold uppercase tracking-widest">Conjuntos</span>
                <span className="font-label text-[10px] text-slate-400 font-medium">Llegó hace 2 semanas</span>
              </div>
              <h4 className="font-headline text-lg font-bold text-slate-800 leading-tight mb-2 group-hover:text-primary transition-colors">Conjunto Completo "Zen"</h4>
              <p className="font-body text-sm text-slate-600 line-clamp-2 mb-4">Diseño minimalista con tela Spandex que permite máxima movilidad.</p>
              
              <div className="flex gap-2 mb-4">
                <div className="w-4 h-4 rounded-full bg-[#1e3a8a] border-2 border-white ring-1 ring-slate-200 shadow-sm cursor-pointer"></div>
                <div className="w-4 h-4 rounded-full bg-[#475569] border-2 border-white ring-1 ring-slate-200 shadow-sm cursor-pointer"></div>
              </div>
              
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                <span className="font-headline font-black text-xl text-primary">$42.00</span>
                <button className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 group-hover:bg-primary group-hover:border-primary group-hover:text-white text-primary transition-all flex items-center justify-center focus:outline-none shadow-sm">
                  <span className="material-symbols-outlined text-sm">shopping_cart</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* LOAD MORE */}
        <div className="flex justify-center mt-12 pb-16">
          <button className="bg-transparent text-primary font-headline font-bold text-lg border-2 border-primary py-3 px-10 rounded-xl hover:bg-primary hover:text-white transition-all duration-300">
            Cargar 24 productos más
          </button>
        </div>

      </div>
    </main>
  )
}
