"use client";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const THREADS = [
  {
    id: "1",
    name: "Dra. Elena Ruiz",
    institution: "Hospital Central",
    institutionIcon: "local_hospital",
    subject: "Pedido Uniformes Quirúrgicos",
    preview:
      "Quería confirmar si tienen disponibilidad en talla M color azul marino para...",
    time: "10:45 AM",
    unread: false,
    active: true,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA0rVmo9v09yXG6o2vwYxzPU-OOWRqSw8VdeJdcyv0DkReYONIVR96Z0HVP_Zr7ReBQ8NPaqbVWMXbgjHzt9LSHQOB-oI2lm0GfIq-bzL4smx96HgqykXRaZ_b3SiYY7--SScdfTJiJw8fp0DvsZchTARRPrywCOdYSlKBCTVwKWolQFStWgdBNWREfyr2RAOMJuHBoWoWYE8mkijgOwvoxHN9GQB0wwVdcLbBvNXQosdEkNmGHQTQmyjfDkJTVmyVsk10SGBZ0KPI",
  },
  {
    id: "2",
    name: "Clínica Mayo - Compras",
    institution: "Institución Privada",
    institutionIcon: "apartment",
    subject: "Cotización 50 batas médicas",
    preview:
      "Adjunto los detalles técnicos requeridos para las batas blancas de laboratorio...",
    time: "Ayer",
    unread: true,
    active: false,
    initials: "CM",
  },
  {
    id: "3",
    name: "Dr. Carlos Mendoza",
    institution: "Pediatra Independiente",
    institutionIcon: "stethoscope",
    subject: "Consulta sobre tela antifluido",
    preview:
      "Gracias por la información, procederé a realizar el pago vía transferencia.",
    time: "Mar 12",
    unread: false,
    active: false,
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqYEmmMSNJ7c5hxeNXJvRcJFmKjlLgIqKicg_-aN88JZJHEUJCedDj5zXXIBdj9rf6htXe1y26gdOxiTcjFJ21nY5Cy9buttBkJ1pNuGm2CGf-ajPijhu_ycFUj3f9Ek8eNpNI2GeR_bxhsfc9wHTzpIicHy0ZZUQv2uwKgq2wfThYX-P6ojIjULVxLwZSC2dE39e4q1ni-eydxt-3aJzKE4ojvnz-4IflyD626BnREmM5BJeWrgYJOz5lrgXWOdJo3Ec9VGhVBRk",
  },
];

export default function AdminMensajesPage() {
  const [activeThread, setActiveThread] = useState("1");

  return (
    <main className="mx-auto flex max-w-[1600px] flex-grow flex-col gap-6 p-4 md:p-8">
      {/* Header */}
      <section className="bg-surface-container-lowest flex items-end justify-between rounded-xl p-6 shadow-[0_4px_40px_rgba(25,28,30,0.06)]">
        <div>
          <h1 className="font-headline text-on-surface mb-2 text-3xl font-extrabold tracking-tight">
            Mensajes
          </h1>
          <p className="text-on-surface-variant text-sm">
            Gestiona consultas y pedidos de uniformes médicos.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-tertiary-container text-on-tertiary-fixed-variant flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold tracking-wide">
            <span className="material-symbols-outlined text-[14px]">mail</span>3
            No leídos
          </div>
        </div>
      </section>

      {/* Two Column Layout */}
      <section className="bg-surface-container-lowest flex h-[750px] flex-col overflow-hidden rounded-xl shadow-[0_4px_40px_rgba(25,28,30,0.06)] lg:flex-row">
        {/* Left Column: Inbox List */}
        <div className="border-surface-container-high bg-surface flex w-full flex-col border-r-0 md:border-r lg:w-[32%]">
          {/* Search & Filters */}
          <div className="border-surface-container-high border-b p-4">
            <div className="relative mb-4">
              <span className="material-symbols-outlined text-outline absolute top-1/2 left-3 -translate-y-1/2">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar conversación..."
                className="bg-surface-container-high text-on-surface placeholder:text-outline-variant focus:bg-surface-container-lowest w-full rounded-md border-none py-2.5 pr-4 pl-10 text-sm transition-all focus:shadow-[0_0_0_1px_rgba(196,198,209,0.2)_inset] focus:ring-0"
              />
            </div>
            <div className="border-surface-container-high flex gap-2 border-b pb-0">
              <button
                type="button"
                className="border-primary text-primary border-b-2 px-3 py-2 text-sm font-semibold"
              >
                Todos
              </button>
              <button
                type="button"
                className="text-on-surface-variant hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                No leídos
              </button>
              <button
                type="button"
                className="text-on-surface-variant hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                Respondidos
              </button>
            </div>
          </div>
          {/* Message List */}
          <div className="flex-grow overflow-y-auto">
            {THREADS.map((thread) => (
              <button
                type="button"
                key={thread.id}
                onClick={() => setActiveThread(thread.id)}
                className={cn(
                  "border-surface-container-high hover:bg-surface-container-low w-full cursor-pointer border-b p-4 text-left transition-colors",
                  activeThread === thread.id &&
                    "border-l-4 border-l-[#143067] bg-[#f0f4ff]"
                )}
              >
                <div className="mb-1 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {thread.unread && (
                      <div className="relative">
                        {thread.avatar ? (
                          <Image
                            src={thread.avatar}
                            alt={thread.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <span className="bg-secondary-container text-on-secondary-container flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
                            {thread.initials}
                          </span>
                        )}
                        <span className="border-surface bg-tertiary-container absolute -top-1 -right-1 h-3 w-3 rounded-full border-2"></span>
                      </div>
                    )}
                    {!thread.unread &&
                      (thread.avatar ? (
                        <Image
                          src={thread.avatar}
                          alt={thread.name}
                          width={40}
                          height={40}
                          className="h-10 w-10 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="bg-secondary-container text-on-secondary-container flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold">
                          {thread.initials}
                        </span>
                      ))}
                    <div>
                      <h4 className="text-on-surface text-sm leading-tight font-bold">
                        {thread.name}
                      </h4>
                      <div className="text-on-surface-variant mt-0.5 flex items-center gap-1 text-xs">
                        <span className="material-symbols-outlined text-[12px]">
                          {thread.institutionIcon}
                        </span>
                        <span>{thread.institution}</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      thread.unread
                        ? "text-primary font-bold"
                        : "text-on-surface-variant"
                    )}
                  >
                    {thread.time}
                  </span>
                </div>
                <div className="mt-2 pl-[52px]">
                  <p
                    className={cn(
                      "text-on-surface truncate text-sm",
                      thread.unread ? "font-bold" : "font-semibold"
                    )}
                  >
                    {thread.subject}
                  </p>
                  <p
                    className={cn(
                      "text-on-surface-variant mt-0.5 truncate text-xs",
                      thread.unread && "font-medium"
                    )}
                  >
                    {thread.preview}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Conversation View */}
        <div className="bg-surface-container-lowest flex w-full flex-col lg:w-[68%]">
          {/* Conversation Header */}
          <div className="border-surface-container-high bg-surface-container-lowest flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-4">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFrb0OmzKUIju2acDcQQy1BmuBpitcelmKo6HsmZ3ztQ71MFKocvyOi_0YU1Lonhs0bHX_IvC4r_lYGr7K5FgWcEi0yAatuw0E8Q_c9jm90n9hjUJdHOqceRNd_OOCIqP1GXhrVRhUt6ScEMe9Lbzf995lWbxr1sPJBIE2VwlXojv14_PJrPVN9QuSjkuDgmK6rPEsbS-Lp1g-u_dhT26XUtFh0BRTmQzqOJBUBWC_tom8IhDMr_WEC33TGJzcwu2a-eyB5t7FTsw"
                alt="Dra. Elena Ruiz"
                width={48}
                height={48}
                className="h-12 w-12 shrink-0 rounded-full object-cover shadow-sm"
              />
              <div>
                <h2 className="font-headline text-on-surface text-lg leading-tight font-bold">
                  Dra. Elena Ruiz
                </h2>
                <div className="text-on-surface-variant mt-0.5 flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      mail
                    </span>{" "}
                    elena.ruiz@hospitalcentral.org
                  </span>
                  <span className="text-surface-container-high">|</span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      local_hospital
                    </span>{" "}
                    Hospital Central
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="text-primary hover:text-primary-container mr-2 text-sm font-semibold transition-colors"
              >
                Ver perfil
              </button>
              <button
                type="button"
                aria-label="Cerrar conversación"
                className="text-on-surface-variant hover:bg-surface-container-low rounded-full p-2 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
          {/* Chat History */}
          <div className="bg-surface-container-lowest flex-grow space-y-6 overflow-y-auto p-6">
            <div className="flex justify-center">
              <span className="bg-surface-container text-on-surface-variant rounded-full px-3 py-1 text-xs font-semibold tracking-widest uppercase">
                Hoy, 10:45 AM
              </span>
            </div>
            {/* User Message */}
            <div className="flex max-w-[80%] items-end gap-3">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFAezZQHKJhKvwD0XQHCrjkmor-ulrIOB8YHz9JNf0vPzZ_OO3QkokcfHzttO5-FHCJUDfOkysiQCjQVKdSeE2YACU9YKIM3nWWgui0fRSW9vSwjBHegOsuRYZPw2Sg7yQ7Ya-SARdeKUm54BK529yAFwf8K8Ulbbjn4HdFNh9EonZGEazWYIyL8pp3uff10i4ObZsuKlyNb_ZEP5dZ5RuDbEhgJRoNI0aKNux6s5EhyFZMT5GeiuHyh5pu7A2Vdzj5fT01OgvPQ8"
                alt="Dra. Elena Ruiz"
                width={32}
                height={32}
                className="mb-1 hidden h-8 w-8 shrink-0 rounded-full object-cover md:block"
              />
              <div className="bg-surface-container-high text-on-surface rounded-xl rounded-bl-sm p-4">
                <p className="text-sm">Hola equipo de Liss Atelier,</p>
                <p className="mt-2 text-sm">
                  Quería confirmar si tienen disponibilidad en talla M color
                  azul marino para el modelo quirúrgico &apos;Premium
                  Flex&apos;. Necesito 3 juegos completos.
                </p>
                <p className="mt-2 text-sm">
                  ¿Cuál sería el tiempo estimado de entrega a la capital?
                </p>
              </div>
            </div>
            {/* Admin Message */}
            <div className="ml-auto flex max-w-[80%] items-end justify-end gap-3">
              <div className="border-primary-fixed-dim/20 text-on-secondary-fixed rounded-xl rounded-br-sm border bg-[#f0f4ff] p-4 shadow-[0_2px_10px_rgba(20,48,103,0.03)]">
                <p className="text-sm">
                  Estimada Dra. Ruiz, un placer saludarle.
                </p>
                <p className="mt-2 text-sm">
                  Sí, contamos con disponibilidad inmediata en talla M color
                  azul marino para el modelo &apos;Premium Flex&apos;. Tenemos
                  stock suficiente para los 3 juegos que requiere.
                </p>
                <p className="mt-2 text-sm">
                  El envío a la capital toma de 2 a 3 días hábiles una vez
                  confirmado el pago. ¿Desea que le genere la orden de compra
                  con estos artículos?
                </p>
              </div>
              <div className="mb-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#001b4a] to-[#143067] text-xs font-bold text-white md:flex">
                LA
              </div>
            </div>
            {/* User Reply */}
            <div className="flex max-w-[80%] items-end gap-3">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRSTzF_rq2WXxbBM6a97AJTaiMLRu0ErxW3VDIJw5K7oypBtKWa37Dgze45PyEWhNYtmO9fkf1kpJgXh50pmuqB7dZLrlTPo4TaUjODmbft15phl-X-TlytnXbHNP_4egMnwtQ1RDLBQN526nRc2ZKSHdhLwBuwVZcNnsCgL9oSkusRn3j1P2GyRg9MoM0MYulMNhubbYHicvq5b1U_RJuYDqod5tTVpaT44eAKn7MLpsTk8WdATs1BFb9k5me4HgM8QiVMmy_9zI"
                alt="Dra. Elena Ruiz"
                width={32}
                height={32}
                className="mb-1 hidden h-8 w-8 shrink-0 rounded-full object-cover md:block"
              />
              <div className="bg-surface-container-high text-on-surface rounded-xl rounded-bl-sm p-4">
                <p className="text-sm">
                  Perfecto. Sí por favor, envíeme el link de pago.
                </p>
              </div>
            </div>
          </div>
          {/* Reply Area */}
          <div className="border-surface-container-high bg-surface-bright border-t p-6">
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                className="text-on-surface-variant hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">
                  bolt
                </span>{" "}
                Respuestas rápidas{" "}
                <span className="material-symbols-outlined text-[16px]">
                  expand_more
                </span>
              </button>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="text-on-surface-variant hover:text-primary flex items-center gap-1 text-sm font-medium transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    inventory_2
                  </span>{" "}
                  Archivar
                </button>
              </div>
            </div>
            <div className="relative">
              <textarea
                placeholder="Escribe tu respuesta..."
                rows={3}
                className="bg-surface text-on-surface placeholder:text-outline-variant focus:bg-surface-container-lowest w-full resize-none rounded-xl border-none p-4 pr-32 text-sm transition-all focus:shadow-[0_0_0_1px_rgba(196,198,209,0.2)_inset] focus:ring-0"
              ></textarea>
              <div className="absolute right-3 bottom-3 flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Adjuntar archivo"
                  className="text-outline hover:bg-surface-container-low hover:text-primary rounded-full p-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    attach_file
                  </span>
                </button>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#001b4a] to-[#143067] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
                >
                  Enviar{" "}
                  <span className="material-symbols-outlined text-[18px]">
                    send
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
