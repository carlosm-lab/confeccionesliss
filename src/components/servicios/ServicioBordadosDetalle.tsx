"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { siteConfig } from "@/config/site";

// ------------ datos ------------
const DATA = {
  heroImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD6jGN2zqo5KCCZFCLxiPbzhahgf_EQFytz6rb5HVdLlxqQ4VJ8S1BystI0w_Sta5EGnt883oBvXgG3gk2yTOSoMhldpg6c_HOI1mhG78RTn1k3DAgUWm-M1MV43SEe5Wwc-0lmwCzphS3Gk7kVyKcx1ECxskfTUUKZSmBUmlpCpTttbR7UJq_C73mUbiJyOng80OMkHgyXaCEKmQxEaZQ3P-IWvpA3heAMe9VX4m9ryoy-Ft3YfkSHFcqjMfCPf0hV79efXsjD9FLV",
  sectionAImage:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBzNcREsUj-gAOY0MsFycUFSnXBmyNU2dpjy0BeOLrQD7UVXvxs7ioNsaS5Ip6xxQNurkxAkP0WxpR-NSCOFYUVrYslQBhv-Ls_Cb8TXdSeM2JatkyiduxXypH34w4_rEjNOhFeJdB4SvV8vBjjzqefhIhzzW9D4cKPW4s95WJRzaf1u4zTdfyznFV9zxr0avV4zYMNwRp3cciNvhdn2abhUSn8YC0ei8gB1IgpwoCCYH-lM6mH27YC0yov-kEUgEVy5U-KrD2pcpjX",
  garmentImages: {
    polos:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJPKOJfFpAaIKRzm8AhXmbyfIoc018Ivq4Pxf59-SNQQ4w2mjiHNzOG-qyRI-I6TGL80ZSvpaCeUztBA59MoaxJc2GduXCO2MZr24AB9eWmBLJc2h8M9OliaNhDJeykMxDt_wKfUTmfotfdKY0BlSfDPPAMyDpcYJJrLrDlAmLD69XyHg058Xlp0HUDBw9gqW3auy2Ly3s34IhA9LQMHLyN0aGfn5LpCYPzi2BFsl4Nj5VDG9b-kL9-iomEX3iTqfVqwrKS0bm2Jez",
    camisas:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8UALRQZEd-VvcVKP-Jn-M3jfZTEYqGwxxmYdsOAWkJknIahgkm3Z6h9ECQCY48Y2gzKdvj9NQM0pxuZCooed187gNsOcUAOkek8mhY1vItk8jwBgNhciVFgD0Z1hJbyH54LvVFO0QfWgi3SDLRJ4gbvOkj4uiER7tFqf3WnV0FCcNedE962G8L6RaKfDQc3tbefLnBYbGqnBPvrigNxqtF-7nK_KATm4nSHHvbHpMSNp7F55EphIvk1SpOP02ix76oyihUeIOYuoo",
    industrial:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAZfj19Pxka9aPjvaZscboS6tUZIxvkYYseVmlKiEhmBF0ibhYR7ifJT9IgWbACVRotvlJezaSRhGyIPZPlxpG7kdLdBBjAmgIb6Wis4l-SVh3zG1ykS68SefpMK4_bNH4yULGR7MEsEzFnV1AlQ0FovN59TCktEn8nqoxR_G5FLie5xziA-YxJrt6FMz55pYhdBHa6EmjcLCrUZjqLPf5CmMTTTNdi4tA_YRdL3f04fAq_b6gdYyxrDEv_4BmfI58L_N7bu46DNWLp",
    gorras:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCdUQIwc-E3pdFJEWG4QTQnvndOiZYLnNPV3y_iDB8BId7OI9gYFUQIW4hgxN2tBQTepVtNE11XKx_lyNx_ulTkZfjbRI7isQmNauJhdMDYwf0aW-oPURA5RAArR74NEZxsR4g26w4rE2hu7e9WA4r7Lo8SeJF6LN3zNc2vlSUbbeZbFX9c1Q63mJrmJ2higZ6uzSA-AOzigwgQG8XxTxkRcmeH7OHqVpF7hlVgTvcKVl-cqf1aJDOXdiPu0_67C4feI_9QVW3TDThy",
  },
  faqs: [
    {
      q: "¿Cuánto cuesta bordar un logo?",
      a: "El costo no depende del número de colores, sino de la cantidad de puntadas requeridas (tamaño y densidad del diseño) y del volumen total de prendas. Le recomendamos enviarnos su diseño para realizar una cotización exacta sin compromiso.",
    },
    {
      q: "¿Se puede bordar sobre cualquier color de tela?",
      a: "Sí. Contamos con una amplia paleta de hilos en diversos tonos. Si su tela es oscura, recomendamos usar un hilo base blanco bajo el diseño principal para asegurar que los colores de su logo resalten perfectamente sin perder intensidad.",
    },
    {
      q: "¿El bordado se deshila con los lavados?",
      a: "No. Utilizamos hilos de poliéster de alta tenacidad que son resistentes a lavados industriales, cloro y fricción. El bordado es, por naturaleza, la técnica de personalización más duradera disponible en el mercado textil.",
    },
  ],
};

const fabricTextureStyle = {
  backgroundImage: `url('data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M0 0h20v20H0z" fill="none"/%3E%3Cpath d="M0 0h1v20H0zm2 0h1v20H2zm2 0h1v20H4zm2 0h1v20H6zm2 0h1v20H8zm2 0h1v20h-1zm2 0h1v20h-1zm2 0h1v20h-1zm2 0h1v20h-1zm2 0h1v20h-1zM0 0v1h20V0zm0 2v1h20V2zm0 2v1h20V4zm0 2v1h20V6zm0 2v1h20V8zm0 2v1h20v-1zm0 2v1h20v-1zm0 2v1h20v-1zm0 2v1h20v-1zm0 2v1h20v-1z" fill="%23143067" fill-opacity="0.03"/%3E%3C/svg%3E')`,
};

// ------------ FAQItem ------------
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-primary/12 overflow-hidden rounded-[16px] border bg-white">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left focus:outline-none"
        aria-expanded={open}
      >
        <span className="text-primary font-serif text-lg font-bold">{q}</span>
        <span
          className={`material-symbols-outlined text-[#B43024] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          expand_more
        </span>
      </button>
      <div
        className={`overflow-hidden px-6 transition-all duration-300 ease-out ${open ? "max-h-[300px] pb-5" : "max-h-0"}`}
      >
        <p className="border-primary/10 text-on-surface-variant border-t pt-4 font-sans text-base leading-relaxed">
          {a}
        </p>
      </div>
    </div>
  );
}

// ------------ main component ------------
export function ServicioBordadosDetalle() {
  const whatsapp = siteConfig.links.whatsappDirect;

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="mx-auto max-w-screen-2xl px-5 py-4 md:px-8">
        <Breadcrumb
          items={[
            { label: "Inicio", href: "/" },
            { label: "Servicios", href: "/servicios" },
            { label: "Bordados", href: "/servicios/bordados-personalizados" },
          ]}
        />
      </div>

      {/* ── HERO ── */}
      <section className="w-full px-5 pt-4 pb-10 md:px-8 md:pt-6 md:pb-14">
        <div className="mx-auto max-w-screen-2xl">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-8 lg:gap-16">
            {/* Left: Content (55% / md:col-span-7) */}
            <div className="flex flex-col items-start gap-6 md:col-span-7">
              {/* Label "SERVICIO" con barra roja */}
              <div className="flex items-center gap-4">
                <div className="h-6 w-1 bg-[#B43024]" />
                <span className="text-primary font-sans text-xs font-semibold tracking-widest uppercase">
                  Servicio
                </span>
              </div>

              <h1 className="text-primary font-serif text-[28px] leading-tight font-bold md:text-[48px]">
                Servicio de Bordado Computarizado
              </h1>

              <p className="text-on-surface-variant max-w-2xl font-sans text-lg leading-relaxed">
                Personalizamos sus prendas con precisión milimétrica. Nuestro
                servicio de bordado computarizado garantiza durabilidad, colores
                vibrantes y un acabado profesional que refleja la calidad de su
                marca. Ideal para uniformes, gorras y textiles corporativos.
              </p>

              {/* Chips de features — bg-primary (#143067) con texto blanco */}
              <div className="mt-2 flex flex-wrap gap-3">
                {[
                  { icon: "verified", text: "Alta precisión" },
                  { icon: "local_shipping", text: "Entregas rápidas" },
                  { icon: "design_services", text: "Digitalización gratis" },
                ].map((f) => (
                  <div
                    key={f.text}
                    className="bg-primary text-on-primary flex items-center gap-2 rounded-full px-4 py-2 font-sans text-sm font-medium"
                  >
                    <span
                      className="material-symbols-outlined text-sm"
                      aria-hidden="true"
                    >
                      {f.icon}
                    </span>
                    {f.text}
                  </div>
                ))}
              </div>

              {/* Botón CTA */}
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-on-primary hover:bg-primary/90 mt-6 inline-flex cursor-pointer items-center gap-2 rounded-[12px] px-8 py-4 font-sans text-base font-semibold shadow-sm transition-colors"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  chat
                </span>
                Cotizar bordado
              </a>
            </div>

            {/* Right: Image (45% / md:col-span-5) */}
            <div className="relative mx-auto h-[300px] w-full max-w-[500px] sm:h-[400px] md:col-span-5 md:h-[500px] md:max-w-none">
              <Image
                src={DATA.heroImage}
                alt="Máquina de bordado computarizado"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                priority
                className="border-primary/12 rounded-[16px] border object-cover shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── EDITORIAL ── */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-24">
          {/* Sección A */}
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            {/* Imagen izquierda */}
            <div className="border-primary/12 bg-surface-container-lowest relative order-2 aspect-[4/3] overflow-hidden rounded-[16px] border md:order-1">
              <div
                className="absolute inset-0 opacity-50"
                style={fabricTextureStyle}
              />
              <Image
                src={DATA.sectionAImage}
                alt="Detalle de bordado de alta precisión"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="absolute inset-0 z-0 object-cover"
              />
              <div className="absolute inset-0 z-10 flex items-center justify-center">
                <div className="rounded-full bg-white/90 p-6 shadow-lg backdrop-blur-sm">
                  <span
                    className="material-symbols-outlined text-primary text-[48px]"
                    aria-hidden="true"
                  >
                    strikethrough_s
                  </span>
                </div>
              </div>
            </div>

            {/* Texto derecha */}
            <div className="order-1 flex flex-col gap-4 md:order-2">
              <h2 className="text-primary flex items-center gap-3 font-serif text-2xl font-bold md:text-3xl">
                <span
                  className="material-symbols-outlined text-tertiary text-3xl"
                  aria-hidden="true"
                >
                  info
                </span>
                ¿Qué es el bordado computarizado?
              </h2>
              <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                Es el proceso de reproducir un diseño digital mediante hilos
                sobre una prenda textil, utilizando máquinas de coser
                industriales controladas por computadora. Este método ofrece una
                resistencia superior frente a lavados y fricción constante,
                garantizando que su logotipo mantenga su forma y color durante
                toda la vida útil de la prenda. Es el estándar de oro para
                indumentaria corporativa y uniformes de trabajo que requieren
                transmitir una imagen sólida y profesional.
              </p>
            </div>
          </div>

          {/* Sección B */}
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                ¿Sobre qué prendas bordamos?
              </h2>
              <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                Nuestra tecnología nos permite adaptar la tensión del hilo y el
                tipo de puntada a una amplia variedad de textiles. Desde telas
                ligeras hasta materiales gruesos, ajustamos cada matriz de
                bordado para evitar frunces o daños en la tela original.
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {[
                  "Polos camiseros y camisetas (Algodón, Piqué)",
                  "Camisas corporativas (Oxford, Popelina)",
                  "Casacas, chalecos y polares",
                  "Gorras, sombreros y accesorios textiles",
                  "Ropa de trabajo industrial (Drill, Denim)",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-on-surface flex items-center gap-3 font-sans text-base"
                  >
                    <span
                      className="material-symbols-outlined text-tertiary text-lg"
                      aria-hidden="true"
                    >
                      check_circle
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Grid 2×2 de swatches */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { src: DATA.garmentImages.polos, label: "Polos & Piqué" },
                { src: DATA.garmentImages.camisas, label: "Camisas Oxford" },
                {
                  src: DATA.garmentImages.industrial,
                  label: "Ropa Industrial",
                },
                { src: DATA.garmentImages.gorras, label: "Gorras" },
              ].map(({ src, label }) => (
                <div
                  key={label}
                  className="border-primary/12 bg-surface-container-lowest flex flex-col items-center gap-2 rounded-[16px] border p-4 text-center"
                >
                  <div className="relative mb-2 aspect-[4/3] w-full overflow-hidden rounded-lg">
                    <Image
                      src={src}
                      alt={label}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                  <span className="text-primary font-sans text-xs font-semibold tracking-wider uppercase">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sección C – Proceso */}
          <div className="border-primary/12 bg-surface-container-lowest relative flex flex-col gap-12 overflow-hidden rounded-[16px] border p-8 md:p-12">
            <div className="bg-primary/5 absolute top-0 right-0 -z-10 h-64 w-64 rounded-bl-full" />
            <div className="mx-auto flex max-w-2xl flex-col gap-4 text-center">
              <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                Proceso de digitalización
              </h2>
              <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                Transformamos su logo en un programa que la máquina de bordar
                entiende. Este proceso, conocido como &ldquo;ponchado&rdquo; o
                matrizaje, es crucial para determinar la dirección de la
                puntada, densidad y orden de los colores.
              </p>
            </div>
            <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="bg-tertiary/30 absolute top-1/2 right-[16.666%] left-[16.666%] z-0 hidden h-[2px] -translate-y-1/2 md:block" />
              {[
                {
                  n: "1",
                  title: "Digitalizar",
                  desc: "Convertimos su archivo de imagen (JPG, PNG, PDF) en una matriz de bordado profesional.",
                  accent: false,
                },
                {
                  n: "2",
                  title: "Configurar",
                  desc: "Asignamos los colores de hilo exactos y configuramos la tensión según el tipo de tela a bordar.",
                  accent: false,
                },
                {
                  n: "3",
                  title: "Bordar",
                  desc: "Nuestras máquinas multicabezal ejecutan el diseño con alta velocidad y precisión absoluta.",
                  accent: true,
                },
              ].map((step) => (
                <div
                  key={step.n}
                  className="border-primary/12 relative z-10 flex flex-col items-center gap-4 rounded-[16px] border bg-white p-6 text-center shadow-sm"
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full font-serif text-2xl font-bold text-white shadow-md ${step.accent ? "bg-tertiary" : "bg-primary"}`}
                  >
                    {step.n}
                  </div>
                  <h3
                    className={`font-sans text-lg font-semibold ${step.accent ? "text-tertiary" : "text-primary"}`}
                  >
                    {step.title}
                  </h3>
                  <p className="text-on-surface-variant font-sans text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sección D – Pedidos mínimos */}
          <div className="border-primary/12 bg-surface grid grid-cols-1 items-center gap-12 rounded-[16px] border p-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
                Pedidos mínimos y tiempos
              </h2>
              <p className="text-on-surface-variant font-sans text-base leading-relaxed">
                Atendemos desde pequeñas empresas hasta corporaciones. Nuestros
                tiempos de entrega están optimizados para garantizar calidad sin
                demoras innecesarias.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                {
                  icon: "inventory_2",
                  label: "Pedido Mínimo",
                  value: "Desde 12 unidades",
                  note: null,
                },
                {
                  icon: "schedule",
                  label: "Tiempo Promedio",
                  value: "3 a 5 días hábiles",
                  note: "Sujeto a volumen y complejidad del logo.",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="border-primary/12 flex items-center gap-4 rounded-[12px] border bg-white p-4 shadow-sm"
                >
                  <span
                    className="material-symbols-outlined text-tertiary text-3xl"
                    aria-hidden="true"
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-on-surface-variant font-sans text-[10px] font-semibold tracking-wider uppercase md:text-xs">
                      {item.label}
                    </p>
                    <p className="text-primary font-sans text-lg font-bold">
                      {item.value}
                    </p>
                    {item.note && (
                      <p className="text-on-surface-variant mt-1 font-sans text-xs">
                        {item.note}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="mb-12 text-center">
            <h2 className="text-primary font-serif text-2xl font-bold md:text-3xl">
              Preguntas Frecuentes
            </h2>
            <p className="text-on-surface-variant mt-4 font-sans text-base">
              Resolvemos sus dudas sobre el proceso de bordado.
            </p>
          </div>
          <div className="mx-auto flex max-w-3xl flex-col gap-4">
            {DATA.faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="w-full px-5 py-14 md:px-8 md:py-20">
        <div className="mx-auto max-w-screen-2xl">
          <div className="relative flex w-full flex-col items-center gap-6 overflow-hidden rounded-[24px] bg-[#143067] px-8 py-16 text-center shadow-lg md:py-24">
            <div
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/woven.png')",
              }}
            />
            <h2 className="z-10 font-serif text-[28px] leading-tight font-bold text-white md:text-[48px]">
              ¿Necesitas bordar tu logo?
            </h2>
            <p className="z-10 max-w-2xl font-sans text-lg leading-relaxed text-white/90">
              Envíanos tu diseño y la cantidad que necesitas. Te enviaremos una
              cotización detallada y una prueba digital de cómo quedará tu
              matriz de bordado.
            </p>
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="z-10 mt-4 inline-flex cursor-pointer items-center gap-2 rounded-[12px] bg-white px-8 py-4 font-sans text-base font-bold text-[#143067] shadow-md transition-colors hover:bg-white/90"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                chat
              </span>
              Solicitar cotización
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
