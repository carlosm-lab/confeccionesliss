"use client";

import { Icon } from "@/components/ui/icons/Icon";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { TeamMember } from "@/data/team";

interface PerfilDetalleClientProps {
  member: TeamMember;
}

export default function PerfilDetalleClient({
  member,
}: PerfilDetalleClientProps) {
  const fadeIn: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as const },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-[#f8f9fb] text-[#191c1e] antialiased selection:bg-[#d7dffc] selection:text-[#143067]">
      {/* Detalle Layout */}
      <section className="relative px-6 py-16 md:px-12 lg:px-24">
        <div className="mx-auto max-w-5xl">
          {/* Back button */}
          <div className="mb-12">
            <Link
              href="/empresa/equipo"
              className="group inline-flex items-center gap-2 font-mono text-xs font-bold text-[#143067] transition-all hover:text-[#b43024]"
            >
              <Icon
                name="keyboard_backspace"
                size={14}
                className="translate-x-0 transition-transform duration-200 group-hover:-translate-x-1.5"
              />
              <span>Volver al Equipo</span>
            </Link>
          </div>

          <motion.div
            className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            {/* Left Column: Portrait Monogram & Metrics */}
            <div className="space-y-6 lg:col-span-4">
              <div
                className={`aspect-[4/5] w-full rounded-[32px] ${member.avatarBg} relative flex items-center justify-center overflow-hidden font-serif text-8xl font-bold text-white shadow-lg select-none`}
              >
                <span>{member.initials}</span>
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
              </div>

              <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-xs">
                <div>
                  <span className="block font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                    Experiencia
                  </span>
                  <span className="font-sans text-sm font-bold text-[#143067]">
                    {member.experience}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                    Área Técnica
                  </span>
                  <span className="font-sans text-sm font-bold text-[#143067] capitalize">
                    {member.layer}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                    Taller
                  </span>
                  <span className="font-sans text-sm font-bold text-[#143067]">
                    San Miguel, El Salvador
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Bio, Details and Quotes */}
            <div className="space-y-8 lg:col-span-8">
              <div className="space-y-4">
                <span className="font-mono text-xs font-semibold tracking-[0.2em] text-[#b43024] uppercase">
                  Ficha Profesional
                </span>
                <h1 className="font-serif text-4xl leading-tight font-bold text-[#143067] md:text-5xl">
                  {member.name}
                </h1>
                <p className="border-b border-slate-200/60 pb-4 font-sans text-sm font-bold tracking-wider text-slate-500 uppercase">
                  {member.role}
                </p>
              </div>

              {/* Personal Quote */}
              <div className="border-l-4 border-[#b43024] py-2 pl-6">
                <p className="font-serif text-xl leading-relaxed text-[#143067] italic md:text-2xl">
                  &ldquo;{member.quote}&rdquo;
                </p>
              </div>

              {/* Bio summary */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#143067]">
                  Trayectoria Breve
                </h3>
                <p className="font-sans text-base leading-relaxed text-[#444650]">
                  {member.bio}
                </p>
              </div>

              {/* In-depth details */}
              <div className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-[#143067]">
                  Rol Técnico en el Taller
                </h3>
                <p className="font-sans text-base leading-relaxed text-[#444650]">
                  {member.details}
                </p>
              </div>

              {/* Tags */}
              <div className="space-y-3 border-t border-slate-200/60 pt-4">
                <h4 className="font-mono text-[10px] tracking-wider text-slate-400 uppercase">
                  Especialidades & Competencias
                </h4>
                <div className="flex flex-wrap gap-2">
                  {member.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-[#d7dffc]/40 px-3.5 py-1 font-sans text-xs font-semibold text-[#143067]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
