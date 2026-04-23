"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const CLIENTS = [
  {
    id: "1",
    name: "Dra. Elena Vargas",
    since: "Oct 2023",
    email: "elena.vargas@med.uchile.cl",
    phone: "+56 9 8765 4321",
    institution: "U. de Chile",
    role: "Residente",
    roleBg: "bg-secondary-container text-on-secondary-container",
    orders: 4,
    active: true,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCe6pP8n5MbHWSyemEb6Qhn7MLEzKDjoX1jaVfvK7C7-FXulOqrLwTibW4FPCWO4osnvbn6b1QQYqZR2a8xX1x3GXC_TomLq5Bwfm-iubUvQfIHyWdV7DZb19xvPYiH1nwusvqsZzUQWUaCsLZy6wAnLnN6QSgTzOJJGUYCyCiz-ZR9QK2_Jz56h_FE_EI_6u031fHLvWbFULVeWyuKG1M1sNiqqy4rKczCAJ10iWqpFNGh-wXdgoNIob6gvkHCDb-mNEMFXVVW_hE5",
  },
  {
    id: "2",
    name: "Matías Cáceres",
    since: "Ene 2024",
    email: "mcaceres.med@gmail.com",
    phone: "+56 9 1234 5678",
    institution: "PUC",
    role: "Estudiante",
    roleBg: "bg-surface-container-high text-on-surface-variant",
    orders: 1,
    active: true,
    initials: "MC",
  },
  {
    id: "3",
    name: "Dr. Roberto Silva",
    since: "Mar 2022",
    email: "rsilva.clinica@salud.cl",
    phone: "+56 9 9876 5432",
    institution: "Clínica Alemana",
    role: "Especialista",
    roleBg: "bg-primary-fixed text-on-primary-fixed-variant",
    orders: 12,
    active: false,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCusP35lvPMwSLItlvqMwDsHRf8v7GYWgYeLjhw2OUDYtnDHj6G8OiGx8sFm8sQApIYnyV6IynmWsRe2pioxHl4OOzabp2RJd9PZgdgRsY-2vlqYwjc0YNr5lpoNMJEZSSu_hCKejwflUYaSGLPCr95uAZU1yQUrfowuPocGaUKy4224dy-VZFweAlaPtyvUhzo-ejxPjdkIIAlXE-s1IEZyG1PB_Pt3JCijUCr2b5PJ6tqpQsROKdKuhCYneb0oo78aouQu7x-Qmpv",
  },
];

export default function AdminClientesPage() {
  const [selectedId, setSelectedId] = useState<string | null>("1");
  const selected = CLIENTS.find((c) => c.id === selectedId) ?? CLIENTS[0];

  return (
    <main className="relative mx-auto flex w-full max-w-[1920px] flex-1 overflow-hidden">
      {/* Left Side */}
      <div className="flex flex-1 flex-col overflow-y-auto p-8 pr-[45%] pb-24 lg:p-12">
        <header className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2 flex items-center gap-4">
              <h1 className="font-headline text-on-surface text-4xl font-bold tracking-tight">
                Clientes
              </h1>
              <span className="bg-primary-container text-on-primary-container flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase">
                1,248 Totales
              </span>
            </div>
            <p className="text-on-surface-variant max-w-xl text-sm">
              Gestión de cartera, instituciones afiliadas e historial de pedidos
              del taller.
            </p>
          </div>
          <button
            type="button"
            className="border-outline-variant/30 bg-surface-container-lowest text-on-surface hover:bg-surface-container-high flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium shadow-[0_12px_32px_rgba(20,48,103,0.06)] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">download</span>{" "}
            Exportar lista
          </button>
        </header>

        {/* Stats */}
        <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-surface-container-lowest relative overflow-hidden rounded-xl p-6 shadow-[0_12px_32px_rgba(20,48,103,0.06)]">
            <div className="absolute top-0 left-0 h-full w-1 bg-[#9ff1f0]"></div>
            <p className="text-on-surface-variant mb-2 text-xs font-semibold tracking-widest uppercase">
              Total Clientes
            </p>
            <p className="font-headline text-on-surface text-3xl font-bold tracking-tighter">
              1,248
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_32px_rgba(20,48,103,0.06)]">
            <p className="text-on-surface-variant mb-2 text-xs font-semibold tracking-widest uppercase">
              Nuevos (Mes)
            </p>
            <p className="font-headline text-on-surface flex items-center gap-2 text-3xl font-bold tracking-tighter">
              +42{" "}
              <span className="flex items-center rounded-full bg-[#9ff1f0]/30 px-2 py-0.5 text-xs font-medium text-[#003939]">
                <span className="material-symbols-outlined mr-1 text-[10px]">
                  trending_up
                </span>{" "}
                12%
              </span>
            </p>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_32px_rgba(20,48,103,0.06)]">
            <p className="text-on-surface-variant mb-2 text-xs font-semibold tracking-widest uppercase">
              Estudiantes
            </p>
            <p className="font-headline text-on-surface text-3xl font-bold tracking-tighter">
              68%
            </p>
            <div className="bg-surface-container-high mt-3 h-1.5 w-full overflow-hidden rounded-full">
              <div className="bg-secondary h-full w-[68%] rounded-full"></div>
            </div>
          </div>
          <div className="bg-surface-container-lowest rounded-xl p-6 shadow-[0_12px_32px_rgba(20,48,103,0.06)]">
            <p className="text-on-surface-variant mb-2 text-xs font-semibold tracking-widest uppercase">
              Profesionales
            </p>
            <p className="font-headline text-on-surface text-3xl font-bold tracking-tighter">
              32%
            </p>
            <div className="bg-surface-container-high mt-3 h-1.5 w-full overflow-hidden rounded-full">
              <div className="bg-primary h-full w-[32%] rounded-full"></div>
            </div>
          </div>
        </section>

        {/* Client List */}
        <section className="bg-surface-container-lowest flex flex-1 flex-col overflow-hidden rounded-xl shadow-[0_12px_32px_rgba(20,48,103,0.06)]">
          <div className="flex flex-col gap-1 p-2">
            {CLIENTS.map((c) => (
              <button
                type="button"
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  "relative flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors",
                  selectedId === c.id
                    ? "bg-surface-container-low"
                    : "hover:bg-surface-container-low cursor-pointer",
                  !c.active && "opacity-75 hover:opacity-100"
                )}
              >
                {selectedId === c.id && (
                  <div className="bg-primary absolute top-1/2 left-0 h-8 w-1 -translate-y-1/2 rounded-r-full"></div>
                )}
                <div className="flex items-center gap-3">
                  {c.avatar ? (
                    <Image
                      src={c.avatar}
                      alt={c.name}
                      width={40}
                      height={40}
                      className={cn(
                        "h-10 w-10 rounded-full object-cover shadow-sm",
                        !c.active && "grayscale-[30%]"
                      )}
                    />
                  ) : (
                    <div className="bg-primary-container text-on-primary-container flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-sm">
                      {c.initials}
                    </div>
                  )}
                  <div>
                    <p className="text-on-surface text-sm font-semibold">
                      {c.name}
                    </p>
                    <p className="text-on-surface-variant text-[11px]">
                      Miembro desde {c.since}
                    </p>
                  </div>
                </div>
                <div className="ml-auto hidden items-center gap-6 lg:flex">
                  <span className="bg-surface-container text-on-surface-variant rounded px-2 py-1 text-xs font-medium">
                    {c.institution}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
                      c.roleBg
                    )}
                  >
                    {c.role}
                  </span>
                  <span className="text-on-surface text-sm font-medium">
                    {c.orders}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium",
                      c.active
                        ? "bg-[#9ff1f0]/20 text-[#002222]"
                        : "bg-surface-container-high text-on-surface-variant"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        c.active ? "bg-[#002222]" : "bg-outline"
                      )}
                    ></span>
                    {c.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Right Side: Detail Panel */}
      <aside className="bg-surface-container-lowest/90 absolute top-0 right-0 z-40 flex h-full w-[45%] max-w-2xl min-w-[400px] flex-col border-l border-white shadow-[-12px_0px_32px_rgba(20,48,103,0.08)] backdrop-blur-xl">
        <div className="bg-surface-container-lowest relative z-10 px-8 pt-8 pb-6">
          <div className="flex items-start gap-5">
            <div className="relative">
              {selected.avatar ? (
                <Image
                  src={selected.avatar}
                  alt={selected.name}
                  width={80}
                  height={80}
                  className="h-20 w-20 rounded-2xl object-cover shadow-sm"
                />
              ) : (
                <div className="bg-primary-container text-on-primary-container flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold">
                  {selected.initials}
                </div>
              )}
              {selected.active && (
                <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-[#002222]"></div>
              )}
            </div>
            <div className="pt-1">
              <h2 className="font-headline text-on-surface text-2xl leading-tight font-bold">
                {selected.name}
              </h2>
              <div className="mt-2 flex items-center gap-3">
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
                    selected.roleBg
                  )}
                >
                  {selected.role}
                </span>
                <span className="text-on-surface-variant text-sm">
                  {selected.institution}
                </span>
              </div>
              <p className="text-on-surface-variant mt-3 text-xs tracking-wide">
                Miembro desde{" "}
                {selected.since === "Oct 2023"
                  ? "Octubre 2023"
                  : selected.since}
              </p>
            </div>
          </div>
          <div className="border-outline-variant/20 mt-8 flex gap-6 border-b">
            <button
              type="button"
              className="border-primary text-primary border-b-2 pb-3 text-sm font-semibold"
            >
              Perfil
            </button>
            <button
              type="button"
              className="text-on-surface-variant hover:text-on-surface pb-3 text-sm font-medium"
            >
              Pedidos ({selected.orders})
            </button>
            <button
              type="button"
              className="text-on-surface-variant hover:text-on-surface pb-3 text-sm font-medium"
            >
              Favoritos (12)
            </button>
            <button
              type="button"
              className="text-on-surface-variant hover:text-on-surface pb-3 text-sm font-medium"
            >
              Mensajes
            </button>
          </div>
        </div>
        <div className="bg-surface/30 flex-1 space-y-8 overflow-y-auto px-8 py-6">
          <section>
            <h3 className="text-on-surface-variant mb-4 text-xs font-semibold tracking-widest uppercase">
              Datos Personales
            </h3>
            <div className="grid grid-cols-2 gap-4 gap-x-6">
              <div className="bg-surface-container-lowest rounded-lg p-3">
                <p className="text-outline mb-1 text-[10px] font-semibold tracking-wider uppercase">
                  Email
                </p>
                <p className="text-on-surface truncate text-sm font-medium">
                  {selected.email}
                </p>
              </div>
              <div className="bg-surface-container-lowest rounded-lg p-3">
                <p className="text-outline mb-1 text-[10px] font-semibold tracking-wider uppercase">
                  Teléfono
                </p>
                <p className="text-on-surface text-sm font-medium">
                  {selected.phone}
                </p>
              </div>
              <div className="bg-surface-container-lowest col-span-2 rounded-lg p-3">
                <p className="text-outline mb-1 text-[10px] font-semibold tracking-wider uppercase">
                  Dirección de Envío Principal
                </p>
                <p className="text-on-surface text-sm">
                  Av. Independencia 1027, Depto 402, Independencia, Santiago.
                </p>
              </div>
            </div>
          </section>
          <section>
            <h3 className="text-on-surface-variant mb-4 text-xs font-semibold tracking-widest uppercase">
              Medidas y Preferencias
            </h3>
            <div className="bg-surface-container-lowest flex items-center justify-between rounded-xl p-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-outline mb-1 text-[10px] font-semibold tracking-wider uppercase">
                    Talla Superior
                  </p>
                  <p className="font-headline text-on-surface text-lg font-bold">
                    M{" "}
                    <span className="text-on-surface-variant text-xs font-normal">
                      (Scrub)
                    </span>
                  </p>
                </div>
                <div className="bg-outline-variant/30 h-8 w-[1px]"></div>
                <div>
                  <p className="text-outline mb-1 text-[10px] font-semibold tracking-wider uppercase">
                    Talla Inferior
                  </p>
                  <p className="font-headline text-on-surface text-lg font-bold">
                    S{" "}
                    <span className="text-on-surface-variant text-xs font-normal">
                      (Pantalón)
                    </span>
                  </p>
                </div>
                <div className="bg-outline-variant/30 h-8 w-[1px]"></div>
                <div>
                  <p className="text-outline mb-1 text-[10px] font-semibold tracking-wider uppercase">
                    Estatura
                  </p>
                  <p className="font-headline text-on-surface text-lg font-bold">
                    1.65m
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="border-outline-variant/15 bg-surface-container-lowest flex flex-col gap-3 border-t px-8 py-5">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-[#143067] to-[#001b4a] py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(20,48,103,0.06)]"
          >
            <span className="material-symbols-outlined text-[18px]">
              chat_bubble
            </span>{" "}
            Enviar mensaje directo
          </button>
          <button
            type="button"
            className="text-on-surface hover:bg-surface-container-low w-full rounded-xl bg-transparent py-2 text-sm font-medium"
          >
            Ver perfil completo
          </button>
        </div>
      </aside>
    </main>
  );
}
