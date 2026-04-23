"use client";

import { useState } from "react";
import Image from "next/image";

const THREADS = [
  {
    id: "1",
    name: "Dr. Ricardo Sosa",
    email: "rsosa@email.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4TjqM4ZJz2XLZap8QO0gKRlqCUy5ucqS4QBjSwhnnanGIvoQxwlyXuUb7C_cOvl65D2M-i6_N-KzM7KgfuSzGjAi-KTMvcvsgH_f8-ZqlFESxdwcgy_TQVNeSLIXjn9aWqBlLFqS-Rvvn2YGcYqH_a_X58g09UJSby-7Oc4RiJrINS0K_0CGHd1C0JLXAapOlgIB4g5xpa_fnuFlLkZeBof_Pi9xB6OW1GfR3F_cUc5HRvN3ZR3WGDn_IZ8zWXoUQHnNICOwLyb4",
    subject: "Confirmación de pedido",
    preview: "Hola, quería confirmar el estado de...",
    time: "10:30 AM",
    date: "15 de Octubre 2026, 10:30 AM",
    unread: true,
    body: `Hola equipo de Confecciones Liss,

Escribo para confirmar si mi pedido de uniformes antifluido para la clínica ya está en camino. Me gustaría saber la fecha estimada de entrega.

Saludos,
Dr. Ricardo Sosa.`,
  },
  {
    id: "2",
    name: "Maria Lopez",
    email: "mlopez@email.com",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBy9jMzQ5QutQC4TPJJXg-ZymZDxQykIFwYh5FnFWp4dPnNswhPAziWzT42MWGVdFCsP0ydlaX0Q15DYsdWwqrLp019rqyeNGUesyq5_X7V_O542Go-A6nTUZmQZJjTkW9HmJuclkYuFjuaFEZd_mUokwJSvwIj8OIj395vGeBOKvaX-oM735kdof9zYF7WPB6nAvixvy2q2ZdDr1OAdct7fRhcpmbEvN8eWVz7Wau2bvIS9RrzEHojXAB62x_Y3RNbmCHPLNU8dG4",
    subject: "Tallas disponibles",
    preview: "Buenas tardes, ¿tienen tallas XS en...",
    time: "Ayer",
    date: "14 de Octubre 2026, 3:15 PM",
    unread: false,
    body: `Buenas tardes,

¿Tienen tallas XS en la filipina cuello V color burgundy? Necesito 5 unidades para el equipo de enfermería del hospital.

Gracias,
Maria Lopez.`,
  },
];

export default function MensajesPage() {
  const [active, setActive] = useState("1");
  const [reply, setReply] = useState("");
  const activeThread = THREADS.find((t) => t.id === active);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-grow flex-col gap-8 px-4 pt-4 pb-20 md:px-12">
      {/* Title Area */}
      <div className="flex items-center gap-4">
        <h2 className="font-headline text-on-surface text-4xl leading-none font-black tracking-tighter md:text-[3.5rem]">
          Mis mensajes
        </h2>
        <span className="bg-secondary rounded-full px-3 py-1 text-sm font-bold text-white shadow-sm">
          1 Nuevo
        </span>
      </div>

      {/* Inbox Layout */}
      <div className="bg-surface-container-lowest outline-outline-variant/15 flex min-h-[600px] flex-col overflow-hidden rounded-xl shadow-[0_12px_32px_-4px_rgba(25,28,30,0.06)] outline outline-1 md:flex-row">
        {/* Left Column: Message List */}
        <div className="bg-surface-container flex w-full flex-col md:w-[35%]">
          {/* Search & Tabs */}
          <div className="bg-surface-container flex flex-col gap-6 p-6 pb-0">
            <div className="relative">
              <span className="material-symbols-outlined text-on-surface-variant absolute top-1/2 left-4 -translate-y-1/2">
                search
              </span>
              <input
                className="bg-surface-container-high focus:bg-surface-container-lowest focus:ring-primary placeholder:text-on-surface-variant text-on-surface font-body w-full rounded-full py-3 pr-4 pl-12 text-sm transition-all focus:ring-1 focus:outline-none"
                placeholder="Buscar mensajes..."
                type="text"
              />
            </div>
            <div className="border-outline-variant/30 flex gap-6 border-b px-2">
              <button className="text-primary border-primary border-b-2 pb-3 text-sm font-bold">
                Recibidos
              </button>
              <button className="text-on-surface-variant hover:text-on-surface pb-3 text-sm font-medium transition-colors">
                Enviados
              </button>
            </div>
          </div>

          {/* List Items */}
          <div className="flex-grow overflow-y-auto">
            {THREADS.map((thread) => (
              <button
                type="button"
                key={thread.id}
                onClick={() => setActive(thread.id)}
                className={`relative flex w-full cursor-pointer gap-4 p-5 text-left transition-colors ${
                  active === thread.id
                    ? "bg-[#f0f4ff] hover:bg-slate-100/50"
                    : "hover:bg-surface-container-high/50 border-outline-variant/10 border-t"
                }`}
              >
                {active === thread.id && (
                  <div className="bg-primary-container absolute top-0 bottom-0 left-0 w-[3px]"></div>
                )}
                <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full">
                  <Image
                    width={48}
                    height={48}
                    alt={`${thread.name} avatar`}
                    className="h-full w-full object-cover"
                    src={thread.avatar}
                  />
                </div>
                <div className="min-w-0 flex-grow">
                  <div className="mb-1 flex items-baseline justify-between">
                    <span
                      className={`truncate pr-2 text-sm ${thread.unread ? "text-on-surface font-bold" : "text-on-surface font-medium"}`}
                    >
                      {thread.name}
                    </span>
                    <span
                      className={`text-xs whitespace-nowrap ${thread.unread ? "text-primary-container font-semibold" : "text-on-surface-variant"}`}
                    >
                      {thread.time}
                    </span>
                  </div>
                  <p
                    className={`mb-1 truncate text-sm ${thread.unread ? "text-on-surface font-bold" : "text-on-surface font-medium"}`}
                  >
                    {thread.subject}
                  </p>
                  <p className="text-on-surface-variant truncate text-xs">
                    {thread.preview}
                  </p>
                </div>
                {thread.unread && (
                  <div className="flex flex-shrink-0 items-center justify-center pt-2">
                    <div className="bg-primary-container h-2 w-2 rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Message Detail */}
        <div className="bg-surface-container-lowest relative z-10 flex w-full flex-col shadow-[-12px_0_32px_-12px_rgba(25,28,30,0.04)] md:w-[65%]">
          {/* Header */}
          <div className="flex flex-col gap-6 p-8 pb-6">
            <h2 className="font-headline text-on-surface text-2xl font-bold tracking-tight">
              {activeThread?.subject}
            </h2>
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full">
                <Image
                  width={56}
                  height={56}
                  alt={`${activeThread?.name} avatar`}
                  className="h-full w-full object-cover"
                  src={activeThread?.avatar ?? ""}
                />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span className="text-on-surface font-bold">
                    {activeThread?.name}
                  </span>
                  <span className="text-on-surface-variant text-sm">
                    {activeThread?.date}
                  </span>
                </div>
                <span className="text-on-surface-variant text-sm">
                  {activeThread?.email}
                </span>
              </div>
            </div>
          </div>

          {/* Visual Separator */}
          <div className="bg-surface-container-low h-4 w-full"></div>

          {/* Body */}
          <div className="flex-grow p-8">
            <div className="prose prose-sm text-on-surface font-body max-w-none text-[15px] leading-relaxed whitespace-pre-wrap">
              {activeThread?.body}
            </div>
          </div>

          {/* Reply Area */}
          <div className="bg-surface-container-lowest mt-auto p-8 pt-0">
            <div className="bg-surface-container-low outline-outline-variant/15 flex flex-col gap-4 rounded-xl p-6 outline outline-1">
              <div className="relative">
                <label
                  className="text-on-surface-variant mb-2 block text-xs font-semibold tracking-wider uppercase"
                  htmlFor="reply-text"
                >
                  Responder a {activeThread?.name}
                </label>
                <textarea
                  className="bg-surface-container-high focus:bg-surface-container-lowest focus:ring-primary text-on-surface font-body w-full resize-none rounded-lg p-4 text-sm transition-all focus:ring-1 focus:outline-none"
                  id="reply-text"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={4}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                ></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  className="text-on-surface-variant hover:bg-surface-variant rounded-full px-6 py-2.5 text-sm font-semibold transition-colors"
                  onClick={() => setReply("")}
                >
                  Cancelar
                </button>
                <button className="from-primary-container to-primary rounded-full bg-gradient-to-r px-6 py-2.5 text-sm font-bold tracking-wider text-white uppercase transition-all hover:-translate-y-0.5 hover:shadow-md">
                  Enviar respuesta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
