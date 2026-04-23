"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Camera, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const TALLAS = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;
const GENEROS = [
  "Femenino",
  "Masculino",
  "No binario",
  "Prefiero no decir",
] as const;
const DEPARTAMENTOS = [
  "San Miguel",
  "La Unión",
  "Morazán",
  "Usulután",
  "San Salvador",
  "Santa Ana",
  "Otro",
] as const;

export default function PerfilPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [selectedTalla, setSelectedTalla] = useState("");
  const [selectedGenero, setSelectedGenero] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [referencia, setReferencia] = useState("");

  const handleContinue = useCallback(() => {
    router.push("/onboarding/rol");
  }, [router]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Completa tu perfil
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Cuéntanos un poco sobre ti para personalizar tu experiencia.
        </p>
      </div>

      {/* Foto de perfil */}
      <div className="flex items-center gap-5">
        <div className="flex size-20 items-center justify-center rounded-full bg-gray-200">
          <Camera className="size-8 text-gray-400" />
        </div>
        <div>
          <button
            type="button"
            className="cursor-pointer rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Subir foto
          </button>
          <p className="mt-1 text-xs text-gray-500">JPG, PNG. Máximo 2MB.</p>
        </div>
      </div>

      {/* Datos básicos */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="username"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Nombre de usuario
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="@tu_usuario"
            className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="displayName"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Nombre para mostrar
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="María González"
            className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="phone"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Teléfono
          </label>
          <div className="flex gap-2">
            <span className="flex items-center rounded-lg border border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
              +503
            </span>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="7000 0000"
              className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="secondaryEmail"
            className="mb-1.5 block text-sm font-medium text-gray-700"
          >
            Email secundario (opcional)
          </label>
          <input
            id="secondaryEmail"
            type="email"
            value={secondaryEmail}
            onChange={(e) => setSecondaryEmail(e.target.value)}
            placeholder="otro@correo.com"
            className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
      </div>

      {/* Talla */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">Tu talla</h3>
        <div className="flex flex-wrap gap-2">
          {TALLAS.map((talla) => (
            <button
              key={talla}
              type="button"
              onClick={() => setSelectedTalla(talla)}
              className={cn(
                "flex size-11 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                selectedTalla === talla
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "hover:border-brand-primary border-gray-200 text-gray-600"
              )}
            >
              {talla}
            </button>
          ))}
        </div>
      </div>

      {/* Género */}
      <div>
        <h3 className="mb-3 text-sm font-medium text-gray-700">Género</h3>
        <div className="flex flex-wrap gap-2">
          {GENEROS.map((genero) => (
            <button
              key={genero}
              type="button"
              onClick={() => setSelectedGenero(genero)}
              className={cn(
                "cursor-pointer rounded-full border px-4 py-2 text-sm font-medium transition-all",
                selectedGenero === genero
                  ? "border-brand-primary bg-brand-primary text-white"
                  : "hover:border-brand-primary border-gray-200 text-gray-600"
              )}
            >
              {genero}
            </button>
          ))}
        </div>
      </div>

      {/* Dirección */}
      <div>
        <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900">
          <MapPin className="text-brand-primary size-5" />
          Dirección de entrega
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="departamento"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Departamento
            </label>
            <select
              id="departamento"
              value={departamento}
              onChange={(e) => setDepartamento(e.target.value)}
              className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
            >
              <option value="">Selecciona</option>
              {DEPARTAMENTOS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="municipio"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Municipio
            </label>
            <input
              id="municipio"
              type="text"
              value={municipio}
              onChange={(e) => setMunicipio(e.target.value)}
              placeholder="Ej: San Miguel centro"
              className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="direccion"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Dirección
            </label>
            <input
              id="direccion"
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Calle, número, colonia"
              className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="referencia"
              className="mb-1.5 block text-sm font-medium text-gray-700"
            >
              Referencia
            </label>
            <input
              id="referencia"
              type="text"
              value={referencia}
              onChange={(e) => setReferencia(e.target.value)}
              placeholder="Ej: Frente a la iglesia"
              className="focus:border-brand-primary focus:ring-brand-primary/20 w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:outline-none"
            />
          </div>
        </div>

        {/* Mapa placeholder */}
        <div className="mt-4 flex h-40 items-center justify-center rounded-lg bg-gray-200">
          <span className="text-sm text-gray-500">Mapa interactivo</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleContinue}
        className="bg-brand-primary w-full cursor-pointer rounded-lg py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Continuar →
      </button>
    </div>
  );
}
