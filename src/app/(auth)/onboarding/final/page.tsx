"use client";

import Link from "next/link";
import Image from "next/image";

export default function FinalStepPage() {
  return (
    <div className="bg-background font-body text-on-surface relative flex min-h-screen flex-col overflow-x-hidden antialiased">
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest shadow-primary-container/5 fixed top-0 z-50 w-full shadow-sm">
        <div className="mx-auto flex h-20 w-full max-w-screen-2xl items-center px-6 md:px-12">
          <span className="font-headline text-2xl font-black tracking-tighter text-[#001b4a] uppercase">
            Confecciones Liss
          </span>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="relative flex flex-grow flex-col pt-20 pb-16">
        {/* Progress Bar Section */}
        <section className="bg-surface-container-lowest shadow-primary-container/5 relative z-40 w-full px-6 py-6 shadow-sm md:px-12">
          <div className="mx-auto max-w-4xl">
            <div className="font-label text-on-surface-variant mb-4 flex items-center justify-between text-sm font-medium">
              <div className="text-primary flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
                <span>Perfil</span>
              </div>
              <div className="text-primary flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
                <span>Rol</span>
              </div>
              <div className="text-primary flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
                <span>Institución</span>
              </div>
              <div className="text-primary flex flex-col items-center gap-1">
                <span className="material-symbols-outlined text-base">
                  check_circle
                </span>
                <span>Preferencias</span>
              </div>
              <div className="text-primary flex flex-col items-center gap-1 font-bold">
                <span
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_circle
                </span>
                <span>¡Listo!</span>
              </div>
            </div>
            <div className="bg-surface-variant h-2 w-full overflow-hidden rounded-full">
              <div className="bg-primary-container h-full w-full rounded-full transition-all duration-500 ease-out"></div>
            </div>
          </div>
        </section>

        {/* Centered Success Content */}
        <section className="relative flex flex-grow flex-col items-center justify-center px-6 py-12 md:px-12">
          {/* Confetti Elements */}
          <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-20">
            <div className="bg-primary-container absolute top-[20%] left-[15%] h-3 w-3 rounded-full blur-[1px]"></div>
            <div className="absolute top-[15%] right-[25%] h-4 w-4 rotate-45 bg-[#b43024] blur-[1px]"></div>
            <div className="bg-primary absolute top-[40%] left-[8%] h-8 w-2 rotate-12 rounded-full blur-[1px]"></div>
            <div className="absolute right-[10%] bottom-[30%] h-6 w-6 rounded-full border-2 border-[#b43024] blur-[1px]"></div>
            <div className="bg-primary-container absolute bottom-[20%] left-[20%] h-3 w-3 rounded-sm blur-[1px]"></div>
          </div>

          <div className="z-10 flex w-full max-w-[480px] flex-col items-center">
            {/* Success Icon */}
            <div className="bg-primary-container text-on-primary mb-8 flex h-24 w-24 items-center justify-center rounded-full shadow-[0_20px_40px_rgba(25,28,30,0.08)]">
              <span
                className="material-symbols-outlined text-5xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                done
              </span>
            </div>

            {/* Text */}
            <h1 className="font-headline text-primary mb-4 text-center text-4xl font-bold tracking-tight">
              ¡Todo listo, Dra. Elena!
            </h1>
            <p className="font-body text-on-surface-variant mb-10 text-center text-base">
              Tu perfil está completo. Te hemos configurado la experiencia
              perfecta para ti.
            </p>

            {/* Profile Summary Card */}
            <div className="bg-surface-container-lowest mb-8 flex w-full flex-col gap-6 rounded-xl p-6 shadow-[0_20px_40px_rgba(25,28,30,0.04)]">
              <div className="border-surface-variant flex items-center justify-between border-b pb-4">
                <h2 className="font-label text-on-surface text-sm font-bold tracking-widest uppercase">
                  Tu perfil
                </h2>
                <Link
                  href="/onboarding"
                  className="font-label text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  <span className="material-symbols-outlined text-[1rem]">
                    edit
                  </span>{" "}
                  Editar
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full shadow-sm">
                  <Image
                    fill
                    className="object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBiFluNQ4FPxfhOPlTUp6qgAunvzpl19uYdFP8FKacUDLTtGCrF1swlRhScATBZim36ls8n7pNam22rax07KKqgRH5OhM5Nc2yhEE70WV1bC_Dj2YW694bucTNtDdhlWbMwfKF4AJfTmMTunjeOyDum7gdP14NFH1Oq0lXeN6Lc1-E2kvpV-IchVJfMDhKkcNWM8yEyaU7SGvIKkYek62KKcSXXJUZcGGkl5J-gtVn0IGQssxn3X2FTLj9f0W_U4AjIB2NDrwST9Kc"
                    alt="Doctor profile picture"
                  />
                </div>
                <div>
                  <p className="font-headline text-primary text-lg font-bold">
                    Dra. Elena M.
                  </p>
                  <p className="font-body text-on-surface-variant text-sm">
                    elena.m@clinicadelsol.com
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-primary-container font-label text-on-primary rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase">
                  Cirujana
                </span>
                <span className="bg-surface-container-high font-label text-on-surface-variant rounded-full px-3 py-1 text-xs font-medium">
                  Clínica del Sol
                </span>
                <span className="bg-surface-container-high font-label text-on-surface-variant flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium">
                  <span className="material-symbols-outlined text-[14px]">
                    apparel
                  </span>{" "}
                  Talla M
                </span>
              </div>
            </div>

            {/* Redirection Box */}
            <div className="bg-secondary-container mb-8 flex w-full flex-col items-center gap-4 rounded-lg p-6 text-center">
              <p className="font-body text-on-secondary-fixed text-sm font-medium">
                🎓 Te llevaremos al catálogo exclusivo de{" "}
                <strong>Clínica del Sol</strong>.
              </p>
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 items-center justify-center">
                  <svg
                    className="absolute inset-0 h-full w-full -rotate-90 transform"
                    viewBox="0 0 36 36"
                  >
                    <path
                      className="text-surface-variant"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    ></path>
                    <path
                      className="text-primary-container"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="currentColor"
                      strokeDasharray="80, 100"
                      strokeWidth="3"
                    ></path>
                  </svg>
                  <span className="font-headline text-primary-container relative z-10 text-sm font-bold">
                    5
                  </span>
                </div>
                <span className="font-body text-on-secondary-fixed-variant text-xs">
                  Redirigiendo en 5 segundos...
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex w-full flex-col gap-4">
              <Link
                href="/checkout"
                className="bg-primary font-headline text-on-primary hover:bg-primary-container flex items-center justify-center gap-2 rounded-md py-4 font-bold shadow-sm transition-colors"
              >
                Ir ahora a mi catálogo{" "}
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <Link
                href="/"
                className="border-outline-variant font-headline text-primary hover:bg-surface-container-low rounded-md border bg-transparent py-4 text-center font-bold transition-colors"
              >
                Explorar el sitio primero
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
