"use client";

import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { heroTrustBadges } from "@/lib/seo-data";

// Background fabric texture (dot texture)
const fabricTextureStyle = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23143067' fill-opacity='0.03' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
};

export function ServicioRopaCasualDetalle() {
  const whatsappUrl = siteConfig.links.whatsappDirect;

  return (
    <div className="min-h-screen w-full" style={fabricTextureStyle}>
      <div className="w-full">
        {/* ── HERO HOME TEMPLATE ── */}
        <section className="relative flex min-h-[calc(100dvh-56px)] flex-col overflow-x-hidden px-5 pt-4 pb-10 md:min-h-0 md:px-8 md:pt-6 md:pb-14 lg:h-[calc(100dvh-56px)] lg:pb-4">
          <div className="mx-auto flex h-full w-full max-w-screen-2xl flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-16">
            <div className="z-10 flex w-full flex-col items-start lg:min-w-0 lg:flex-1">
              <h1 className="animate-fade-in-up text-primary mb-6 w-full text-center font-serif text-[32px] leading-tight font-bold md:mb-10 md:flex md:flex-col md:items-center md:text-[48px] lg:mb-6 lg:block lg:text-left">
                <span className="block w-full text-center lg:text-left">
                  Confección de Ropa Casual y de Vestir
                </span>
              </h1>

              {/* Contenedor inferior de contenido (Móvil / Tablet) */}
              <div className="flex w-full flex-col gap-6 md:grid md:grid-cols-2 md:items-stretch md:gap-12 lg:flex lg:flex-col lg:gap-0">
                {/* IMAGEN HERO - VERSIÓN MÓVIL */}
                <div
                  className="animate-fade-in-up relative w-full max-w-sm self-center md:order-2 md:h-full md:max-w-none md:self-stretch lg:hidden"
                  style={{ animationDelay: "300ms" }}
                >
                  <div className="border-primary/35 relative z-10 flex w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)] md:h-full">
                    <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl md:aspect-auto md:h-full md:w-full">
                      <Image
                        fill
                        alt="Studio de sastreria y confeccion de ropa"
                        className="rounded-xl object-cover object-center"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWTRZx5W-uPd8adEBbgLS5OehCkntY8Bct6jTW9MgSskNd10j1uWakL7Oo83OZdMVDjFuz1Vy_P9Q9cklYhvoXwIL3AACQ6vjMya8ncZSiVisb8lZ2BgLAp-0WEXPp6QOw4sNw9qhbgyBqp45lMV8Iyx6iyTZJM_ocAYEujXc-XGbScd_JOFP9Oxz5Iqheh6IZd8sU4M4AxLzkC2BH31Qrep2lmjWFezjyyTKnUPDnIoQtsC9BLgeQd_L_756dG-2pI-mHX-F1o1Xr"
                        sizes="(max-width:768px) 80vw, 40vw"
                        priority
                      />
                    </div>
                  </div>
                </div>

                {/* COLUMNA DE TEXTO Y ACCIONES */}
                <div className="flex w-full flex-col items-start md:order-1 md:justify-center">
                  <p
                    className="animate-fade-in-up text-on-surface-variant mb-6 w-full font-sans text-lg leading-relaxed"
                    style={{ animationDelay: "150ms" }}
                  >
                    ¿Viste algo que te encantó en Pinterest o Instagram? Lo
                    hacemos realidad. Confeccionamos prendas a la medida
                    basándose en tus imágenes o ideas, asegurando un ajuste
                    perfecto y acabados de alta calidad para cada ocasión.
                  </p>
                  <div className="mb-8 grid w-full grid-cols-2 gap-x-3 gap-y-2.5 md:grid-cols-1 lg:grid-cols-2">
                    {[
                      { icon: "draw", text: "Diseño libre" },
                      { icon: "photo_camera", text: "Copiamos de fotos" },
                      { icon: "family_restroom", text: "Toda la familia" },
                      { icon: "straighten", text: "Ajuste perfecto" },
                    ].map((b, index) => (
                      <div
                        key={b.text}
                        className="border-primary/12 text-primary animate-fade-in-up flex w-full items-center gap-2 rounded-full border bg-white px-4 py-2 font-sans text-sm font-medium shadow-xs"
                        style={{ animationDelay: `${index * 50 + 200}ms` }}
                      >
                        <span className="material-symbols-outlined text-secondary mr-2 shrink-0 text-[16px]">
                          {b.icon}
                        </span>
                        <span className="leading-tight">{b.text}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4">
                    <a
                      href="https://maps.app.goo.gl/XSs2vgjLG8uvJGoQ7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="animate-fade-in-up border-outline text-primary flex h-12 w-full items-center justify-center rounded-md border bg-white px-12 text-center font-serif text-base font-medium whitespace-nowrap transition hover:bg-gray-50 active:scale-[0.97] sm:flex-1"
                      style={{ animationDelay: "400ms" }}
                    >
                      Cómo llegar
                    </a>
                    <Link
                      href="/catalogo"
                      className="animate-fade-in-up btn-gradient font-body ambient-shadow flex h-12 w-full items-center justify-center rounded-md px-12 text-center text-base font-semibold whitespace-nowrap text-white transition hover:opacity-90 active:scale-[0.97] sm:flex-1"
                      style={{ animationDelay: "450ms" }}
                    >
                      Catálogo
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            {/* IMAGEN HERO - VERSIÓN DESKTOP */}
            <div
              className="animate-fade-in-up hidden h-full lg:flex lg:w-[40%] lg:items-center"
              style={{ animationDelay: "300ms" }}
            >
              <div className="border-primary/35 relative flex h-full w-full flex-col items-center justify-center rounded-2xl border bg-white p-4 shadow-[0_0_25px_6px_rgba(20,48,103,0.15),0_0_10px_2px_rgba(20,48,103,0.1)]">
                <div className="border-primary pointer-events-none absolute inset-3 z-20 rounded-[12px] border-[2px] border-dashed" />
                <div className="relative h-full w-full overflow-hidden rounded-xl">
                  <Image
                    fill
                    alt="Studio de sastreria y confeccion de ropa"
                    className="rounded-xl object-cover object-center"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBWTRZx5W-uPd8adEBbgLS5OehCkntY8Bct6jTW9MgSskNd10j1uWakL7Oo83OZdMVDjFuz1Vy_P9Q9cklYhvoXwIL3AACQ6vjMya8ncZSiVisb8lZ2BgLAp-0WEXPp6QOw4sNw9qhbgyBqp45lMV8Iyx6iyTZJM_ocAYEujXc-XGbScd_JOFP9Oxz5Iqheh6IZd8sU4M4AxLzkC2BH31Qrep2lmjWFezjyyTKnUPDnIoQtsC9BLgeQd_L_756dG-2pI-mHX-F1o1Xr"
                    sizes="40vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Garment Types Showcase (Bento Grid) */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto w-full max-w-screen-2xl">
            <h2 className="text-primary mb-10 font-serif text-2xl font-bold md:text-3xl">
              Prendas que confeccionamos
            </h2>
            <div className="grid auto-rows-[250px] grid-cols-1 gap-6 md:grid-cols-3">
              {/* Large Card (Fiesta y Coctel) */}
              <div className="group border-primary/12 relative row-span-2 cursor-pointer overflow-hidden rounded-xl border shadow-sm md:col-span-2">
                <Image
                  alt="Vestido de coctel elegante a medida en maniqui"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2h6_Y40etDu2UCUYM9V_4xetxyO0wG5Ul76jsUPMc54cQfhK1pFjx2Q-k6L5qCP4jrlsM48xkzhiBL-lhkXPuaxmpwpUWuHcqND870uk6Z0m9YSzjTgG0PQC3O5QH3bScbplXHdRWFLcUU83VSazSgYsIMrxPgA7yYWvk2tAetm5ROrnqbwwCeLDzWl1H1EwEI3m7q0dwu-4-VmGiVw0xT-6kLw9ttdmjlNbVF55Uz6grB4_nDujZHRi5yfyPwWehHJ1-iySO4KTx"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b4a]/90 via-[#001b4a]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 z-10 p-8">
                  <h3 className="mb-2 font-serif text-xl font-bold text-white md:text-2xl">
                    Ropa de fiesta y coctel
                  </h3>
                  <p className="text-surface-container max-w-lg translate-y-4 transform font-sans text-sm leading-relaxed opacity-0 transition-opacity duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Vestidos únicos para ocasiones especiales, diseñados a tu
                    gusto.
                  </p>
                </div>
              </div>

              {/* Small Card 1 (Infantil) */}
              <div className="group border-primary/12 relative cursor-pointer overflow-hidden rounded-xl border shadow-sm">
                <Image
                  alt="Ropa infantil tejida en algodon natural"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTOhNbtMYAd1keZz2Yalaki8FDh4Ovy8N6TGiMbr8DTKNqpeYDNmT4-61uL7Np9nyDwWClp9K6d1_7U1BKwuAGB33XJdBOoq55pGXqeG2sQQHtVWcOAUQpmCH8iFzrB_JPoQPAuSFB9_aLrKCuk_hyPoaRHlnVGHsYRHdkcGOiwMEx3b8sLT1KrSVJmU_rt1yWjK2lOsGI2d1RVY-_DfUcRX5Becu0gQ6XjFwhkqCovQU6r7P_tZh3vQ6PSmDeho8My2JI_Y5orw-y"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b4a]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 z-10 p-6">
                  <h3 className="font-serif text-lg font-bold text-white md:text-xl">
                    Ropa infantil
                  </h3>
                </div>
              </div>

              {/* Small Card 2 (Blusas y Conjuntos) */}
              <div className="group border-primary/12 relative cursor-pointer overflow-hidden rounded-xl border shadow-sm">
                <Image
                  alt="Blusa y pantalones a medida colgados en perchero"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtxfffutYVC3ZtUp2FEG7VO7qlHNvOLa8K34BfbqBARNYiJFFqpnyCTZ9uXonNBuLRTxhFTx62bhpZ3QciCRuXL0b9vgLYlIEi6g6J002UvkuIX3IMtELvTgmU2S5mXnGpodVDd5upqKXKryaPaqmJy_0jaxUjog9jXg9qaRJuecqI7mtuNvSWByAVOHXaBJAAxX1wszc6egCINYtBVIr1psy9uNupyGRil-Rfa-xSE85iYFV-0aeZTXRx15z04fofbcEp_hJMy7ts"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#001b4a]/80 to-transparent" />
                <div className="absolute bottom-0 left-0 z-10 p-6">
                  <h3 className="font-serif text-lg font-bold text-white md:text-xl">
                    Conjuntos y blusas
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Inspiration Flow */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto w-full max-w-screen-2xl">
            <div className="bg-surface-container-low border-primary/5 rounded-2xl border px-5 py-16 shadow-inner md:px-10">
              <h2 className="text-primary mb-12 text-center font-serif text-2xl font-bold md:text-3xl">
                De tu foto a tu prenda
              </h2>
              <div className="relative flex flex-col items-center justify-between gap-8 md:flex-row md:gap-4">
                {/* Step 1 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      image
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    1. Envíanos tu foto
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Muéstranos el diseño que deseas replicar.
                  </p>
                </div>

                <span
                  className="material-symbols-outlined text-secondary mb-12 hidden text-4xl opacity-85 md:block"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>

                {/* Step 2 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      texture
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    2. Elegimos la tela
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Te asesoramos con los mejores materiales.
                  </p>
                </div>

                <span
                  className="material-symbols-outlined text-secondary mb-12 hidden text-4xl opacity-85 md:block"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>

                {/* Step 3 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      content_cut
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    3. Confeccionamos
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Patronaje y costura con precisión artesanal.
                  </p>
                </div>

                <span
                  className="material-symbols-outlined text-secondary mb-12 hidden text-4xl opacity-85 md:block"
                  aria-hidden="true"
                >
                  arrow_right_alt
                </span>

                {/* Step 4 */}
                <div className="z-10 flex w-full flex-col items-center text-center md:w-1/4">
                  <div className="border-primary/10 text-primary mb-4 flex h-16 w-16 items-center justify-center rounded-full border bg-white shadow-sm">
                    <span className="material-symbols-outlined text-3xl">
                      checkroom
                    </span>
                  </div>
                  <h3 className="text-primary mb-2 font-sans text-xs font-bold tracking-wider uppercase">
                    4. Prenda lista
                  </h3>
                  <p className="text-on-surface-variant px-4 font-sans text-sm leading-relaxed">
                    Entrega de tu prenda única y a medida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Entrepreneur Section */}
        <section className="w-full px-5 py-14 md:px-8 md:py-20">
          <div className="mx-auto w-full max-w-screen-2xl">
            <div className="border-primary/12 relative flex flex-col items-center justify-between gap-8 overflow-hidden rounded-xl border bg-white p-10 shadow-sm md:flex-row">
              <div className="bg-secondary absolute top-0 bottom-0 left-0 w-1" />
              <div
                className="pointer-events-none absolute inset-0 z-0 opacity-50"
                style={fabricTextureStyle}
              />
              <div className="relative z-10 md:w-2/3">
                <h2 className="text-primary mb-4 font-serif text-2xl font-bold md:text-3xl">
                  ¿Tienes una marca de ropa?
                </h2>
                <p className="text-on-surface-variant mb-6 font-sans text-base leading-relaxed">
                  Apoyamos a emprendedores locales. Si necesitas producir tu
                  colección, ofrecemos servicio de confección por lotes con la
                  misma dedicación y calidad artesanal, adaptándonos a las
                  necesidades de tu negocio.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-primary/10 text-primary border-primary/5 inline-block rounded border px-3 py-1 font-sans text-xs font-semibold tracking-wider uppercase">
                    Producción por lotes
                  </span>
                  <span className="bg-primary/10 text-primary border-primary/5 inline-block rounded border px-3 py-1 font-sans text-xs font-semibold tracking-wider uppercase">
                    Precios competitivos
                  </span>
                  <span className="bg-primary/10 text-primary border-primary/5 inline-block rounded border px-3 py-1 font-sans text-xs font-semibold tracking-wider uppercase">
                    Sin mínimos de fábrica
                  </span>
                </div>
              </div>
              <div className="relative z-10 flex w-full justify-end md:w-1/3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-primary text-primary hover:bg-surface-container-low w-full cursor-pointer rounded border bg-white px-8 py-3 text-center font-sans text-xs font-semibold tracking-wider uppercase shadow-sm transition-colors md:w-auto"
                >
                  Consultar producción
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* CTA Banner – full width background */}
      <section className="relative w-full overflow-hidden bg-[#143067] px-5 py-14 shadow-inner md:px-8 md:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={fabricTextureStyle}
        />
        <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl flex-col items-center text-center">
          <h2 className="mb-6 font-serif text-[32px] leading-tight font-bold text-white md:text-[48px]">
            ¿Tienes un diseño en mente?
          </h2>
          <p className="mb-10 max-w-2xl font-sans text-lg leading-relaxed text-white/80">
            Envíanos tu idea, boceto o foto de referencia y cotiza sin
            compromiso. Nuestro equipo de expertos artesanos está listo para
            darle vida a tu visión.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-surface-container-low inline-flex cursor-pointer items-center justify-center rounded bg-white px-10 py-4 font-sans text-xs font-bold tracking-wider text-[#143067] uppercase shadow-lg transition-all"
          >
            <span className="material-symbols-outlined mr-2">chat</span>
            Contáctanos por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
