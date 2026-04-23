"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-container py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-headline font-bold text-white mb-4 tracking-tight">Contáctanos</h1>
          <p className="text-lg md:text-xl text-primary-fixed-dim font-body max-w-2xl mx-auto font-light">Estamos en San Miguel, El Salvador.</p>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 border border-surface-container-high shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary-container mb-4">
              <span className="material-symbols-outlined text-2xl font-light">call</span>
            </div>
            <h3 className="font-headline font-bold text-on-surface mb-2">WhatsApp</h3>
            <p className="text-secondary font-body text-sm">+503 7000-0000</p>
          </div>
          {/* Card 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 border border-surface-container-high shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary-container mb-4">
              <span className="material-symbols-outlined text-2xl font-light">mail</span>
            </div>
            <h3 className="font-headline font-bold text-on-surface mb-2">Correo</h3>
            <p className="text-secondary font-body text-sm">info@confeccionesliss.com</p>
          </div>
          {/* Card 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 border border-surface-container-high shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary-container mb-4">
              <span className="material-symbols-outlined text-2xl font-light">location_on</span>
            </div>
            <h3 className="font-headline font-bold text-on-surface mb-2">Dirección</h3>
            <p className="text-secondary font-body text-sm">San Miguel, El Salvador</p>
          </div>
          {/* Card 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow duration-300 border border-surface-container-high shadow-sm">
            <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-primary-container mb-4">
              <span className="material-symbols-outlined text-2xl font-light">schedule</span>
            </div>
            <h3 className="font-headline font-bold text-on-surface mb-2">Horario</h3>
            <p className="text-secondary font-body text-sm">Lun-Sáb 8am-5pm</p>
          </div>
        </div>
      </section>

      {/* Two Columns Section */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left Column: Form */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest rounded-xl p-8 lg:p-10 border border-surface-container-high shadow-sm">
            <h2 className="text-3xl font-headline font-bold text-primary-container mb-8 tracking-tight">Envíanos un mensaje</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-label text-sm text-on-surface-variant mb-2" htmlFor="nombre">Nombre</label>
                  <input id="nombre" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-colors" placeholder="Tu nombre" type="text" />
                </div>
                <div>
                  <label className="block font-label text-sm text-on-surface-variant mb-2" htmlFor="correo">Correo</label>
                  <input id="correo" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-colors" placeholder="tu@email.com" type="email" />
                </div>
              </div>
              <div>
                <label className="block font-label text-sm text-on-surface-variant mb-2" htmlFor="telefono">Teléfono</label>
                <input id="telefono" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-colors" placeholder="Tu número" type="tel" />
              </div>
              <div>
                <label className="block font-label text-sm text-on-surface-variant mb-2" htmlFor="asunto">Asunto</label>
                <select id="asunto" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-colors text-on-surface">
                  <option value="general">Consulta general</option>
                  <option value="pedido">Pedido individual</option>
                  <option value="grupo">Cotización grupal</option>
                  <option value="bordado">Bordado personalizado</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label className="block font-label text-sm text-on-surface-variant mb-3">¿Eres del sector salud?</label>
                <div className="flex gap-6 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="text-primary-container focus:ring-primary-container" defaultChecked name="sector_salud" type="radio" value="si" />
                    <span className="text-on-surface text-sm">Sí</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input className="text-primary-container focus:ring-primary-container" name="sector_salud" type="radio" value="no" />
                    <span className="text-on-surface text-sm">No</span>
                  </label>
                </div>
                <label htmlFor="institucion" className="sr-only">Institución</label>
                <input id="institucion" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-colors" placeholder="¿Cuál es tu institución?" type="text" />
              </div>
              <div>
                <label className="block font-label text-sm text-on-surface-variant mb-2" htmlFor="mensaje">Mensaje</label>
                <textarea id="mensaje" className="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-colors resize-none" placeholder="¿En qué podemos ayudarte?" rows={5}></textarea>
              </div>
              <div className="flex items-start gap-3">
                <input id="privacidad" className="mt-1 text-primary-container focus:ring-primary-container rounded border-outline-variant" type="checkbox" />
                <label htmlFor="privacidad" className="text-sm text-secondary font-body leading-relaxed">
                  He leído y acepto la <a className="text-primary-container underline underline-offset-2" href="#">política de privacidad</a>.
                </label>
              </div>
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-label font-bold text-sm py-4 px-6 rounded-lg hover:opacity-90 transition-opacity shadow-sm" type="button">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Info & Widgets */}
        <div className="lg:col-span-5 space-y-10">
          {/* Map / Location */}
          <div>
            <h3 className="text-2xl font-headline font-bold text-on-surface mb-6">Visítanos</h3>
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container-high shadow-sm mb-6 relative h-64">
              <Image src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrZ5kvA-c9PrmUDx-bk-_AMGKqdkQJskdWm44XDEl5Tt2odGBcqpEOKasSyFX0-4ZvgxQsVW0BusqGCrJDQcdU-sCSYafKFnJ5OzueMuxO_fIkdHbwgkg_5FuOTbAoouFLS_Im7FxQFtFX-xGEk_Z5pAIcNjgmK6T7dH4HenTrnkGQNw15zrZD4n1NfVDsM67DaxN5EhZvhziZ54k7z5fMa7eVapZhqY5i0VEX4R0Wu1ly3nDF5tJEPSxFp0H87v1xzMtFzndu_etQ" alt="Mapa de San Miguel El Salvador" fill className="object-cover grayscale opacity-70" />
            </div>
            <div className="bg-surface-container-low rounded-xl p-5 border border-surface-container-high">
              <div className="flex gap-4 items-start">
                <span className="material-symbols-outlined text-primary-container mt-1 font-light">directions</span>
                <div>
                  <p className="font-body text-on-surface font-medium">San Miguel, El Salvador</p>
                  <p className="text-sm text-secondary mt-1">Cómo llegar: Detrás del Hospital San Juan de Dios, Avenida Principal.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Zones */}
          <div>
            <h3 className="text-xl font-headline font-bold text-on-surface mb-4">Zonas de entrega</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-secondary font-body">
                <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                San Miguel
              </li>
              <li className="flex items-center gap-3 text-secondary font-body">
                <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                Moncagua
              </li>
              <li className="flex items-center gap-3 text-secondary font-body">
                <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                Chinameca
              </li>
              <li className="flex items-center gap-3 text-secondary font-body">
                <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                El Tránsito, Nueva Guadalupe
              </li>
              <li className="flex items-center gap-3 text-secondary font-body">
                <span className="material-symbols-outlined text-primary-container text-sm">check_circle</span>
                Zona oriental general
              </li>
            </ul>
          </div>

          {/* WhatsApp Fast Track */}
          <div className="bg-[#e8f5e9] rounded-xl p-6 border-l-4 border-[#4caf50]">
            <div className="flex items-center gap-4 mb-4">
              <span className="material-symbols-outlined text-4xl text-[#4caf50]" style={{ fontVariationSettings: "'FILL' 1" }}>platform</span>
              <div>
                <h4 className="font-headline font-bold text-on-surface">Respondemos en menos de 1 hora</h4>
                <p className="text-sm text-secondary">Chat directo con ventas</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="bg-white text-secondary text-xs px-3 py-1.5 rounded-full border border-[#c8e6c9] hover:bg-[#c8e6c9] transition-colors cursor-pointer">Quiero cotizar uniformes médicos</span>
              <span className="bg-white text-secondary text-xs px-3 py-1.5 rounded-full border border-[#c8e6c9] hover:bg-[#c8e6c9] transition-colors cursor-pointer">Necesito uniformes universitarios</span>
              <span className="bg-white text-secondary text-xs px-3 py-1.5 rounded-full border border-[#c8e6c9] hover:bg-[#c8e6c9] transition-colors cursor-pointer">Quiero una cotización grupal</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-headline font-bold text-center text-primary-container mb-12">Preguntas frecuentes</h2>
        <div className="space-y-4">
          {/* Accordion Item 1 */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-5">
            <button className="w-full flex justify-between items-center text-left focus:outline-none group" type="button">
              <span className="font-headline font-semibold text-on-surface group-hover:text-primary-container transition-colors">¿Cuál es el mínimo de pedidos?</span>
              <span className="material-symbols-outlined text-secondary transition-transform">expand_more</span>
            </button>
          </div>
          {/* Accordion Item 2 */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-5">
            <button className="w-full flex justify-between items-center text-left focus:outline-none group" type="button">
              <span className="font-headline font-semibold text-on-surface group-hover:text-primary-container transition-colors">¿Cómo funcionan las tallas?</span>
              <span className="material-symbols-outlined text-secondary transition-transform">expand_more</span>
            </button>
          </div>
          {/* Accordion Item 3 */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-5">
            <button className="w-full flex justify-between items-center text-left focus:outline-none group" type="button">
              <span className="font-headline font-semibold text-on-surface group-hover:text-primary-container transition-colors">¿Hacen envíos fuera de San Miguel?</span>
              <span className="material-symbols-outlined text-secondary transition-transform">expand_more</span>
            </button>
          </div>
          {/* Accordion Item 4 */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-5">
            <button className="w-full flex justify-between items-center text-left focus:outline-none group" type="button">
              <span className="font-headline font-semibold text-on-surface group-hover:text-primary-container transition-colors">¿Se puede personalizar el bordado?</span>
              <span className="material-symbols-outlined text-secondary transition-transform">expand_more</span>
            </button>
          </div>
          {/* Accordion Item 5 */}
          <div className="bg-surface-container-lowest rounded-xl border border-surface-container-high p-5">
            <button className="w-full flex justify-between items-center text-left focus:outline-none group" type="button">
              <span className="font-headline font-semibold text-on-surface group-hover:text-primary-container transition-colors">¿Tienen precios para grupos?</span>
              <span className="material-symbols-outlined text-secondary transition-transform">expand_more</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
