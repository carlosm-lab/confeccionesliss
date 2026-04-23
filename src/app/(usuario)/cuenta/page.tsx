"use client";

import Image from "next/image";

export default function UserProfilePage() {
  return (
    <>
      <div className="pt-8">
        {/* Header Banner */}
        <section className="bg-primary-container relative pt-16 pb-24 px-8 overflow-hidden">
          {/* Glassmorphism decorative elements */}
          <div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-primary rounded-full blur-[100px] opacity-50 mix-blend-multiply pointer-events-none"></div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-8 relative z-10">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full border-4 border-surface-container-lowest overflow-hidden shadow-lg bg-surface">
                <Image 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFUAjfdzwfMi4BURCJic7-Crt_QujWv5EQMC4gdIliPcyo3kWEFEGFa31ImSmhC3rzHeUVPaRmaqfYOOCn-R3ExnVd8kKmND8zov23P6lAS6upf3MR76MKaBhPDsgjMS22hX36nW6FD5E0r_scanXF0Cyd6kiWsJboHKhVe929INg6g4KKJMtRwaEP0LM-GRpRpH8xX3ZvJyRCjk24iR9ELr27ukHIR6OKx9xQIIOdh7csF5MZFC1KY7I9Lw2XBkL6Ky9EF48uHyEP"
                  alt="Profile Picture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-primary-container/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>edit</span>
              </div>
            </div>
            <div className="flex-1 text-center md:text-left text-on-primary">
              <div className="flex flex-col md:flex-row items-center gap-3 mb-2">
                <h2 className="text-[1.75rem] font-semibold leading-tight tracking-tight">Dra. Elena Rivera</h2>
                <span className="bg-secondary px-3 py-1 text-[0.75rem] font-bold uppercase tracking-widest rounded-sm">Especialista</span>
              </div>
              <p className="text-primary-fixed-dim text-sm mb-4">elena.rivera@clinicamedica.com</p>
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="font-bold">12</span> <span className="text-primary-fixed-dim">pedidos</span>
                </div>
                <div className="w-1 h-1 bg-surface-tint rounded-full"></div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">8</span> <span className="text-primary-fixed-dim">favoritos</span>
                </div>
                <div className="w-1 h-1 bg-surface-tint rounded-full"></div>
                <div className="flex items-center gap-1">
                  <span className="font-bold">3</span> <span className="text-primary-fixed-dim">mensajes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sticky Tabs */}
        <div className="bg-surface/85 backdrop-blur-md sticky top-[72px] lg:top-[88px] z-40 border-b-0 shadow-[0px_4px_16px_rgba(25,28,30,0.03)] px-8">
          <div className="max-w-7xl mx-auto flex overflow-x-auto hide-scrollbar">
            <button className="px-6 py-4 text-primary font-bold border-b-2 border-primary whitespace-nowrap transition-colors">
              Información personal
            </button>
            <button className="px-6 py-4 text-outline hover:text-primary whitespace-nowrap transition-colors">
              Seguridad
            </button>
            <button className="px-6 py-4 text-outline hover:text-primary whitespace-nowrap transition-colors">
              Preferencias
            </button>
            <button className="px-6 py-4 text-outline hover:text-primary whitespace-nowrap transition-colors">
              Mi institución
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <form className="bg-surface-container-lowest shadow-[0px_12px_32px_rgba(25,28,30,0.06)] rounded-lg p-8 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              <h3 className="text-[1.375rem] font-medium text-on-surface mb-6">Datos Generales</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="nombre" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Nombre completo</label>
                  <input id="nombre" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface transition-shadow" type="text" defaultValue="Dra. Elena Rivera"/>
                </div>
                <div className="space-y-2">
                  <label htmlFor="user" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Usuario</label>
                  <input id="user" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface transition-shadow" type="text" defaultValue="erivera_med"/>
                </div>
                <div className="space-y-2">
                  <label htmlFor="mostrar" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Mostrar como</label>
                  <input id="mostrar" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface transition-shadow" type="text" defaultValue="Elena"/>
                </div>
                <div className="space-y-2">
                  <label htmlFor="telefono" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Teléfono</label>
                  <input id="telefono" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface transition-shadow" type="tel" defaultValue="+57 300 123 4567"/>
                </div>
              </div>

              <div className="pt-8 space-y-6">
                <h3 className="text-[1.375rem] font-medium text-on-surface">Dirección de Envío</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="depto" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Departamento</label>
                    <select id="depto" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface appearance-none" defaultValue="Antioquia">
                      <option value="Antioquia">Antioquia</option>
                      <option value="Cundinamarca">Cundinamarca</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="muni" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Municipio</label>
                    <select id="muni" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface appearance-none" defaultValue="Medellín">
                      <option value="Medellín">Medellín</option>
                      <option value="Envigado">Envigado</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="direccion" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Dirección exacta</label>
                    <input id="direccion" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface transition-shadow" type="text" defaultValue="Calle 10 # 40-50, Consultorio 301"/>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label htmlFor="referencia" className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant">Punto de referencia</label>
                    <input id="referencia" className="w-full bg-surface-container-low border-0 focus:ring-2 focus:ring-primary-container px-4 py-3 rounded-md text-on-surface transition-shadow" type="text" defaultValue="Edificio Clínica Salud, frente al parque"/>
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-lg overflow-hidden relative h-48 group mt-6">
                  <Image fill src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTQVhIAmYPRa0o60f66D3JBwVIP7RL7Jtx_q7FDfYx6kNF7B1sNEOMRIwZTLqi_RGbchmZdpyXCD9hFv5WAX5UP53Y_YlEHe3h4N_NWLdwogpec9tE-DQIpqkuhJDdwClDAXImE_XhofV3dJxbGPEKDZsvacYMgL3Bg8kMXYrRuc3o8KbtatHhjJpp378KY6WbzwV-qFDIHrhvL56qgOmqYkJTIFjPAr1qoiae3bpnwQlBgo9wJvIM3wyVH-5GnfDHxXn9SgXuoPnW" alt="Map view" className="object-cover opacity-80" />
                  <div className="absolute inset-0 bg-on-surface/5 flex items-center justify-center">
                    <button className="bg-surface-container-lowest text-on-surface px-4 py-2 rounded-md shadow-sm text-sm font-medium hover:-translate-y-0.5 transition-transform flex items-center gap-2" type="button">
                      <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 0" }}>pin_drop</span>
                      Actualizar en mapa
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Preferences Panel */}
            <div className="bg-surface rounded-lg p-6 space-y-8 self-start">
              <div>
                <h4 className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Talla Predeterminada</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-4 py-2 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high rounded-md text-sm font-medium transition-colors" type="button">XS</button>
                  <button className="px-4 py-2 bg-primary-container text-on-primary rounded-md text-sm font-medium shadow-[0px_4px_8px_rgba(20,48,103,0.2)]" type="button">S</button>
                  <button className="px-4 py-2 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high rounded-md text-sm font-medium transition-colors" type="button">M</button>
                  <button className="px-4 py-2 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high rounded-md text-sm font-medium transition-colors" type="button">L</button>
                  <button className="px-4 py-2 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high rounded-md text-sm font-medium transition-colors" type="button">XL</button>
                </div>
              </div>
              <div>
                <h4 className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Corte / Género</h4>
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 bg-primary-container text-on-primary rounded-md text-sm font-medium shadow-[0px_4px_8px_rgba(20,48,103,0.2)]" type="button">Femenino</button>
                  <button className="flex-1 px-4 py-2 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high rounded-md text-sm font-medium transition-colors" type="button">Masculino</button>
                  <button className="flex-1 px-4 py-2 bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high rounded-md text-sm font-medium transition-colors" type="button">Unisex</button>
                </div>
              </div>
              <div>
                <h4 className="text-[0.75rem] font-bold uppercase tracking-widest text-on-surface-variant mb-4">Colores Favoritos</h4>
                <div className="flex gap-3">
                  <button aria-label="Navy" className="w-8 h-8 rounded-full bg-[#143067] ring-2 ring-offset-2 ring-primary-container shadow-sm" type="button"></button>
                  <button aria-label="White" className="w-8 h-8 rounded-full bg-[#e2e8f0] border border-outline-variant hover:scale-110 transition-transform" type="button"></button>
                  <button aria-label="Teal" className="w-8 h-8 rounded-full bg-[#0d9488] border border-outline-variant hover:scale-110 transition-transform" type="button"></button>
                  <button aria-label="Burgundy" className="w-8 h-8 rounded-full bg-[#be123c] border border-outline-variant hover:scale-110 transition-transform" type="button"></button>
                </div>
              </div>
            </div>

            {/* Footer Action */}
            <div className="lg:col-span-3 pt-8 mt-4 border-t-0 border-surface-container-high relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-outline-variant opacity-15"></div>
              <button className="w-full bg-primary-container hover:bg-primary text-on-primary font-bold py-4 rounded-md transition-all hover:-translate-y-0.5 shadow-[0px_12px_32px_rgba(25,28,30,0.06)]" type="submit">
                Guardar cambios
              </button>
            </div>
          </form>

          {/* Danger Zone */}
          <div className="mt-16 p-8 bg-surface-container-low rounded-lg relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-error"></div>
            <h3 className="text-[1.375rem] font-medium text-error mb-2">Eliminar mi cuenta</h3>
            <p className="text-on-surface-variant mb-6 max-w-2xl">Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, ten la certeza de que deseas realizar esta acción. Toda tu información, historial de pedidos y preferencias se borrarán permanentemente.</p>
            <button className="bg-surface-container-lowest text-error border border-error/20 hover:bg-error/5 font-medium px-6 py-3 rounded-md transition-colors shadow-sm" type="button">
              Eliminar cuenta
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
