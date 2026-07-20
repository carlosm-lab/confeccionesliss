"use client";

import { useState, useRef } from "react";
import { sendContactMessage } from "@/actions/contact";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<
  Record<"nombre" | "email" | "telefono" | "asunto" | "mensaje", string>
>;

type FormState = "idle" | "loading" | "success" | "error";

const FIELDS = [
  {
    id: "nombre",
    label: "Nombre completo",
    type: "text",
    placeholder: "Ej. María García",
    required: true,
    autoComplete: "name",
  },
  {
    id: "email",
    label: "Correo electrónico",
    type: "email",
    placeholder: "tu@correo.com",
    required: true,
    autoComplete: "email",
  },
  {
    id: "telefono",
    label: "Teléfono (opcional)",
    type: "tel",
    placeholder: "7000-0000",
    required: false,
    autoComplete: "tel",
  },
  {
    id: "asunto",
    label: "Asunto",
    type: "text",
    placeholder: "¿En qué podemos ayudarte?",
    required: true,
    autoComplete: "off",
  },
] as const;

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary/60 disabled:opacity-50";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");
    setFieldErrors({});
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    const raw = {
      nombre: (fd.get("nombre") as string) ?? "",
      email: (fd.get("email") as string) ?? "",
      telefono: (fd.get("telefono") as string) ?? "",
      asunto: (fd.get("asunto") as string) ?? "",
      mensaje: (fd.get("mensaje") as string) ?? "",
    };

    // Client-side validation first
    const { contactSchema } = await import("@/schemas/contactSchema");
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const errs: FieldErrors = {};
      for (const [k, v] of Object.entries(parsed.error.flatten().fieldErrors)) {
        (errs as Record<string, string>)[k] = v?.[0] ?? "";
      }
      setFieldErrors(errs);
      setState("idle");
      return;
    }

    // Server action
    const result = await sendContactMessage(parsed.data);

    if (result.success) {
      setState("success");
      formRef.current?.reset();
    } else {
      setState("error");
      setServerError(result.error);
      if ("fieldErrors" in result && result.fieldErrors) {
        setFieldErrors(result.fieldErrors as FieldErrors);
      }
    }
  };

  if (state === "success") {
    return (
      <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-green-100 bg-green-50 px-6 py-12 text-center">
        <span
          className="material-symbols-outlined text-5xl text-green-500"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          check_circle
        </span>
        <div>
          <p className="font-serif text-xl font-bold text-gray-800">
            ¡Mensaje enviado!
          </p>
          <p className="mt-1 text-sm text-gray-500">
            Nos pondremos en contacto contigo pronto.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setState("idle")}
          className="text-primary mt-2 text-sm font-medium underline-offset-2 hover:underline"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      data-webmcp-tool="contact_support"
      data-webmcp-name="Formulario de Contacto"
      data-webmcp-description="Formulario para enviar consultas directas sobre uniformes y servicios de confección"
      className="space-y-4"
    >
      {/* Text fields */}
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div
            key={field.id}
            className={field.id === "asunto" ? "sm:col-span-2" : ""}
          >
            <label
              htmlFor={field.id}
              className="mb-1.5 block text-xs font-semibold text-gray-700"
            >
              {field.label}
              {field.required && (
                <span className="ml-0.5 text-red-500" aria-hidden="true">
                  *
                </span>
              )}
            </label>
            <input
              id={field.id}
              name={field.id}
              type={field.type}
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              required={field.required}
              disabled={state === "loading"}
              aria-invalid={!!fieldErrors[field.id]}
              aria-describedby={
                fieldErrors[field.id] ? `${field.id}-error` : undefined
              }
              className={cn(
                inputBase,
                fieldErrors[field.id]
                  ? "border-red-300 focus:border-red-400 focus:ring-red-200"
                  : "border-gray-200"
              )}
            />
            {fieldErrors[field.id] && (
              <p
                id={`${field.id}-error`}
                role="alert"
                className="mt-1 text-xs text-red-500"
              >
                {fieldErrors[field.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div>
        <label
          htmlFor="mensaje"
          className="mb-1.5 block text-xs font-semibold text-gray-700"
        >
          Mensaje
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows={5}
          placeholder="Cuéntanos sobre tu pedido, material, tallas, cantidad..."
          required
          disabled={state === "loading"}
          aria-invalid={!!fieldErrors.mensaje}
          aria-describedby={fieldErrors.mensaje ? "mensaje-error" : undefined}
          className={cn(
            inputBase,
            "resize-none",
            fieldErrors.mensaje
              ? "border-red-300 focus:border-red-400 focus:ring-red-200"
              : "border-gray-200"
          )}
        />
        {fieldErrors.mensaje && (
          <p
            id="mensaje-error"
            role="alert"
            className="mt-1 text-xs text-red-500"
          >
            {fieldErrors.mensaje}
          </p>
        )}
      </div>

      {/* Server error */}
      {state === "error" && serverError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span
            className="material-symbols-outlined text-base"
            aria-hidden="true"
          >
            error
          </span>
          {serverError}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={state === "loading"}
        className="btn-gradient flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {state === "loading" ? (
          <>
            <span
              className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden="true"
            />
            Enviando...
          </>
        ) : (
          <>
            <span
              className="material-symbols-outlined text-[18px]"
              aria-hidden="true"
            >
              send
            </span>
            Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}
