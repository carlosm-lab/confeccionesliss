"use client";

/**
 * DeliveryFormModal — Confecciones Liss
 *
 * Formulario de datos de entrega reutilizable.
 * Usado tanto en CartDrawer (paso "shipping") como en ProductDetailClient ("Pedir ahora").
 *
 * Campos:
 *   - Departamento + Municipio (selectores)
 *   - Nombre completo del destinatario
 *   - Teléfono principal
 *   - Teléfono/WhatsApp alterno
 *   - Colonia o Residencial
 *   - Calle o Avenida
 *   - Polígono (opcional)
 *   - Número de casa o apartamento
 *   - Punto de referencia (textarea)
 *   - Checkbox de términos (envíos + devoluciones)
 *   - Warning de precios de referencia
 */

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { DEPARTMENTS, getShippingInfo } from "@/lib/shipping";
import type { ShippingInfo } from "@/lib/shipping";

// ── Tipos ──────────────────────────────────────────────────────

interface DeliveryFormState {
  department: string;
  municipality: string;
  recipientName: string;
  recipientPhone: string;
  alternatePhone: string;
  addressColonia: string;
  addressStreet: string;
  addressPolygon: string;
  addressNumber: string;
  addressReference: string;
  termsAccepted: boolean;
  deliveryMethod: "taller" | "punto_medio" | "domicilio";
}

const INITIAL_STATE: DeliveryFormState = {
  department: "",
  municipality: "",
  recipientName: "",
  recipientPhone: "",
  alternatePhone: "",
  addressColonia: "",
  addressStreet: "",
  addressPolygon: "",
  addressNumber: "",
  addressReference: "",
  termsAccepted: false,
  deliveryMethod: "domicilio",
};

interface DeliveryFormProps {
  /** Estado inicial del formulario (para pre-llenar si el usuario vuelve al paso) */
  initialState?: Partial<DeliveryFormState>;
  /** Callback al confirmar — recibe el ShippingInfo construido con todos los datos */
  onConfirm: (info: ShippingInfo) => void;
  /** Botón de "Atrás" */
  onBack?: () => void;
  /** Texto del botón de continuar */
  confirmLabel?: string;
  /** Si el pedido contiene algún producto 'A la medida' */
  hasALaMedidaItem?: boolean;
}

// ── Estilos compartidos para inputs ───────────────────────────

const inputClass =
  "w-full rounded-xl border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-on-surface)] transition-all duration-200 placeholder:text-[var(--color-on-surface-variant)]/50 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none";

const labelClass =
  "text-xs font-semibold tracking-wide text-[var(--color-on-surface-variant)] uppercase";

// ── Componente ─────────────────────────────────────────────────

export function DeliveryForm({
  initialState,
  onConfirm,
  onBack,
  confirmLabel = "Confirmar y continuar",
  hasALaMedidaItem = false,
}: DeliveryFormProps) {
  const [form, setForm] = useState<DeliveryFormState>({
    ...INITIAL_STATE,
    ...initialState,
  });

  const municipalities = useMemo(() => {
    const dept = DEPARTMENTS.find((d) => d.name === form.department);
    return dept?.municipalities ?? [];
  }, [form.department]);

  const set = (field: keyof DeliveryFormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleConfirm = () => {
    // ── Validaciones ────────────────────────────────────────
    if (!form.department) {
      toast.error("Por favor selecciona un departamento.");
      return;
    }
    if (!form.municipality) {
      toast.error("Por favor selecciona un municipio.");
      return;
    }
    if (!form.recipientName.trim()) {
      toast.error("Por favor ingresa el nombre completo del destinatario.");
      return;
    }
    if (!form.recipientPhone.trim()) {
      toast.error("Por favor ingresa el teléfono del destinatario.");
      return;
    }
    if (!form.addressColonia.trim()) {
      toast.error("Por favor ingresa la colonia o residencial.");
      return;
    }
    if (!form.addressStreet.trim()) {
      toast.error("Por favor ingresa la calle o avenida.");
      return;
    }
    if (!form.addressNumber.trim()) {
      toast.error("Por favor ingresa el número de casa o apartamento.");
      return;
    }
    if (!form.addressReference.trim()) {
      toast.error("Por favor ingresa un punto de referencia.");
      return;
    }
    if (!form.termsAccepted) {
      toast.error(
        "Debes aceptar los términos de envío y devoluciones para continuar."
      );
      return;
    }

    // ── Construir ShippingInfo ──────────────────────────────
    const baseInfo = getShippingInfo(
      form.department,
      form.municipality,
      form.deliveryMethod
    );
    const fullInfo: ShippingInfo = {
      ...baseInfo,
      recipientName: form.recipientName.trim(),
      recipientPhone: form.recipientPhone.trim(),
      alternatePhone: form.alternatePhone.trim() || undefined,
      addressColonia: form.addressColonia.trim(),
      addressStreet: form.addressStreet.trim(),
      addressPolygon: form.addressPolygon.trim() || undefined,
      addressNumber: form.addressNumber.trim(),
      addressReference: form.addressReference.trim(),
      termsAccepted: true,
    };

    onConfirm(fullInfo);
  };

  // Vista previa del costo de envío
  const previewInfo =
    form.department && form.municipality
      ? getShippingInfo(form.department, form.municipality, form.deliveryMethod)
      : null;

  return (
    <div className="flex flex-col gap-4">
      {/* ── Back button ──────────────────────────────────── */}
      {onBack && (
        <button
          onClick={onBack}
          className="group mb-1 flex w-max items-center gap-1 text-sm font-medium text-[var(--color-on-surface-variant)] transition-colors duration-200 hover:text-[var(--color-primary)]"
        >
          <span
            className="material-symbols-outlined transition-transform duration-200 group-hover:-translate-x-0.5"
            style={{ fontSize: "18px" }}
          >
            arrow_back
          </span>
          Atrás
        </button>
      )}

      {/* ── Título ───────────────────────────────────────── */}
      <div>
        <h3 className="mb-1 font-serif text-lg font-bold text-[var(--color-on-surface)]">
          ¿A dónde enviamos?
        </h3>
        <p className="text-sm text-[var(--color-on-surface-variant)]">
          Completa los datos de entrega para procesar tu pedido.
        </p>
      </div>

      {/* ── ⚠️ Warning 'A la medida' (Toma de medidas) ────── */}
      {hasALaMedidaItem && (
        <div className="flex animate-pulse items-start gap-2.5 rounded-xl border border-blue-400/40 bg-blue-50/80 p-3.5 text-xs text-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
          <span
            className="material-symbols-outlined mt-0.5 shrink-0 text-blue-500"
            style={{ fontSize: "18px" }}
          >
            info
          </span>
          <p>
            <span className="font-semibold">Importante:</span> Has seleccionado
            la opción <span className="font-bold">&quot;A la medida&quot;</span>{" "}
            en tu pedido. Recuerda que es{" "}
            <span className="font-bold">
              obligatorio visitar nuestro taller
            </span>{" "}
            para realizar la toma de medidas de forma correcta.
          </p>
        </div>
      )}

      {/* ── ⚠️ Warning precios de referencia ────────────── */}
      <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/40 bg-amber-50/80 p-3.5 text-xs text-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
        <span
          className="material-symbols-outlined mt-0.5 shrink-0 text-amber-500"
          style={{ fontSize: "16px" }}
        >
          warning
        </span>
        <p>
          <span className="font-semibold">Aviso:</span> Los precios aquí
          especificados pueden estar desactualizados. Tómalos{" "}
          <span className="font-semibold">solo como referencia</span>. El precio
          final será confirmado por nuestro equipo al procesar tu pedido.
        </p>
      </div>

      {/* ── Referencia de costos por zona ────────────────── */}
      <div className="space-y-2 rounded-xl bg-[var(--color-surface-container-low)] p-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-[var(--color-on-surface)]">
            Tarifas de Entrega:
          </p>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-whatsapp)]" />
            <span className="text-[var(--color-on-surface-variant)]">
              <span className="font-semibold text-[var(--color-on-surface)]">
                San Miguel (Taller)
              </span>{" "}
              — Gratis ($0.00)
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-blue-400" />
            <span className="text-[var(--color-on-surface-variant)]">
              <span className="font-semibold text-[var(--color-on-surface)]">
                San Miguel (Punto Medio en Finde)
              </span>{" "}
              — $1.00
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-amber-400" />
            <span className="text-[var(--color-on-surface-variant)]">
              <span className="font-semibold text-[var(--color-on-surface)]">
                San Miguel (A Domicilio)
              </span>{" "}
              — $3.00
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[var(--color-primary)]" />
            <span className="text-[var(--color-on-surface-variant)]">
              <span className="font-semibold text-[var(--color-on-surface)]">
                Resto del país (A Domicilio)
              </span>{" "}
              — $6.00
            </span>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* SECCIÓN 1: Ubicación                              */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-[var(--color-outline-variant)]/20 p-4">
        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary)] uppercase">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "14px" }}
          >
            location_on
          </span>
          Ubicación y Tipo de Entrega
        </p>

        <div className="flex flex-col gap-3">
          {/* Departamento */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-dept" className={labelClass}>
              Departamento *
            </label>
            <select
              id="delivery-dept"
              value={form.department}
              onChange={(e) => {
                const value = e.target.value;
                setForm((prev) => ({
                  ...prev,
                  department: value,
                  municipality: "",
                  deliveryMethod: "domicilio",
                }));
              }}
              className={inputClass}
            >
              <option value="">Selecciona departamento</option>
              {DEPARTMENTS.map((d) => (
                <option key={d.name} value={d.name}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Municipio */}
          {form.department && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="delivery-muni" className={labelClass}>
                Municipio *
              </label>
              <select
                id="delivery-muni"
                value={form.municipality}
                onChange={(e) => set("municipality", e.target.value)}
                className={inputClass}
              >
                <option value="">Selecciona municipio</option>
                {municipalities.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Método de Entrega (solo si es San Miguel) */}
          {form.department === "San Miguel" && (
            <div className="flex flex-col gap-1.5">
              <span className={labelClass}>
                Método de entrega en San Miguel *
              </span>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                <button
                  type="button"
                  onClick={() => set("deliveryMethod", "taller")}
                  className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                    form.deliveryMethod === "taller"
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/10 text-[var(--color-primary)]"
                      : "border-[var(--color-outline-variant)]/40 hover:border-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined mb-1 text-lg">
                    store
                  </span>
                  <span className="text-xs font-bold">Retiro en Taller</span>
                  <span className="mt-0.5 text-[10px] font-semibold text-emerald-600">
                    Gratis
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => set("deliveryMethod", "punto_medio")}
                  className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                    form.deliveryMethod === "punto_medio"
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/10 text-[var(--color-primary)]"
                      : "border-[var(--color-outline-variant)]/40 hover:border-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined mb-1 text-lg">
                    meetups
                  </span>
                  <span className="text-xs font-bold">Punto Medio (Finde)</span>
                  <span className="mt-0.5 text-[10px] font-semibold text-slate-500">
                    $1.00
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => set("deliveryMethod", "domicilio")}
                  className={`flex flex-col items-center justify-center rounded-xl border p-3 text-center transition-all ${
                    form.deliveryMethod === "domicilio"
                      ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/10 text-[var(--color-primary)]"
                      : "border-[var(--color-outline-variant)]/40 hover:border-slate-400"
                  }`}
                >
                  <span className="material-symbols-outlined mb-1 text-lg">
                    local_shipping
                  </span>
                  <span className="text-xs font-bold">A Domicilio</span>
                  <span className="mt-0.5 text-[10px] font-semibold text-slate-500">
                    $3.00
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Preview costo */}
          {previewInfo && (
            <div className="rounded-xl bg-[var(--color-primary-container)]/30 p-3 text-sm">
              <p className="font-semibold text-[var(--color-on-surface)]">
                {form.department === "San Miguel"
                  ? `${previewInfo.method} a ${form.municipality}`
                  : `Envío a Domicilio a ${form.municipality}, ${form.department}`}
              </p>
              <p className="text-[var(--color-on-surface-variant)]">
                Costo:{" "}
                <span className="font-bold text-[var(--color-primary)]">
                  {previewInfo.label}
                </span>
              </p>
            </div>
          )}

          {/* Colonia / Residencial */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-colonia" className={labelClass}>
              Colonia o Residencial *
            </label>
            <input
              id="delivery-colonia"
              type="text"
              placeholder="Ej. Col. San Francisco, Res. Los Almendros..."
              value={form.addressColonia}
              onChange={(e) => set("addressColonia", e.target.value)}
              className={inputClass}
              maxLength={120}
            />
          </div>

          {/* Calle / Avenida */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-street" className={labelClass}>
              Calle o Avenida *
            </label>
            <input
              id="delivery-street"
              type="text"
              placeholder="Ej. 5a Calle Oriente, Av. Roosevelt..."
              value={form.addressStreet}
              onChange={(e) => set("addressStreet", e.target.value)}
              className={inputClass}
              maxLength={120}
            />
          </div>

          {/* Polígono (opcional) */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-polygon" className={labelClass}>
              Polígono{" "}
              <span className="font-normal text-[var(--color-on-surface-variant)] normal-case">
                (opcional)
              </span>
            </label>
            <input
              id="delivery-polygon"
              type="text"
              placeholder="Ej. Polígono B, Manzana 4..."
              value={form.addressPolygon}
              onChange={(e) => set("addressPolygon", e.target.value)}
              className={inputClass}
              maxLength={80}
            />
          </div>

          {/* Número de casa / apartamento */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-number" className={labelClass}>
              Número de casa o apartamento *
            </label>
            <input
              id="delivery-number"
              type="text"
              placeholder="Ej. #15, Apto. 3B, Local 5..."
              value={form.addressNumber}
              onChange={(e) => set("addressNumber", e.target.value)}
              className={inputClass}
              maxLength={60}
            />
          </div>

          {/* Punto de referencia */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-reference" className={labelClass}>
              Punto de referencia *
            </label>
            <textarea
              id="delivery-reference"
              placeholder={`Ej. "Casa verde de dos pisos con portón morado, jardín en el patio, es la única casa con paneles solares y está frente a la tienda La Fe"`}
              value={form.addressReference}
              onChange={(e) => set("addressReference", e.target.value)}
              className={`${inputClass} resize-none`}
              rows={3}
              maxLength={400}
            />
            <p className="text-right text-[10px] text-[var(--color-on-surface-variant)]">
              {form.addressReference.length}/400
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* SECCIÓN 2: Datos del destinatario                 */}
      {/* ══════════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-[var(--color-outline-variant)]/20 p-4">
        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary)] uppercase">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "14px" }}
          >
            person
          </span>
          Datos del destinatario
        </p>

        <div className="flex flex-col gap-3">
          {/* Nombre completo */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-name" className={labelClass}>
              Nombre completo *
            </label>
            <input
              id="delivery-name"
              type="text"
              placeholder="Nombre y apellidos de quien recibe"
              value={form.recipientName}
              onChange={(e) => set("recipientName", e.target.value)}
              className={inputClass}
              maxLength={120}
            />
          </div>

          {/* Teléfono principal */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-phone" className={labelClass}>
              Teléfono de quien recibe *
            </label>
            <input
              id="delivery-phone"
              type="tel"
              placeholder="Ej. 7123-4567"
              value={form.recipientPhone}
              onChange={(e) => set("recipientPhone", e.target.value)}
              className={inputClass}
              maxLength={20}
            />
          </div>

          {/* Contacto alterno */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="delivery-alt-phone" className={labelClass}>
              Teléfono o WhatsApp alterno{" "}
              <span className="font-normal text-[var(--color-on-surface-variant)] normal-case">
                (opcional)
              </span>
            </label>
            <input
              id="delivery-alt-phone"
              type="tel"
              placeholder="Contacto si no logramos comunicarnos con el destinatario"
              value={form.alternatePhone}
              onChange={(e) => set("alternatePhone", e.target.value)}
              className={inputClass}
              maxLength={20}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════ */}
      {/* SECCIÓN 3: Términos y condiciones                 */}
      {/* ══════════════════════════════════════════════════ */}
      <label
        htmlFor="delivery-terms"
        className="flex cursor-pointer items-start gap-3 rounded-xl border border-[var(--color-outline-variant)]/30 bg-[var(--color-surface-container-low)] p-4"
      >
        <div className="relative mt-0.5 shrink-0">
          <input
            id="delivery-terms"
            type="checkbox"
            checked={form.termsAccepted}
            onChange={(e) => set("termsAccepted", e.target.checked)}
            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[var(--color-outline-variant)] bg-[var(--color-surface)] transition-all checked:border-[var(--color-primary)] checked:bg-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none"
          />
          <span className="pointer-events-none absolute top-0 left-0 hidden h-4 w-4 items-center justify-center peer-checked:flex">
            <span
              className="material-symbols-outlined text-white"
              style={{ fontSize: "11px", fontVariationSettings: "'FILL' 1" }}
            >
              check
            </span>
          </span>
        </div>
        <p className="text-xs leading-relaxed text-[var(--color-on-surface-variant)]">
          He leído y acepto los{" "}
          <Link
            href="/legal/envios"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-semibold text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80"
          >
            términos de envíos
          </Link>{" "}
          y los{" "}
          <Link
            href="/legal/devoluciones"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="font-semibold text-[var(--color-primary)] underline underline-offset-2 hover:opacity-80"
          >
            términos de devoluciones
          </Link>{" "}
          de Confecciones Liss.
        </p>
      </label>

      {/* ── Botón confirmar ──────────────────────────────── */}
      <div className="mt-1">
        <button
          onClick={handleConfirm}
          className="w-full rounded-xl bg-[var(--color-primary)] py-3.5 text-sm font-bold text-[var(--color-on-primary)] transition-all duration-200 hover:bg-[var(--color-on-primary-container)] active:scale-[0.98]"
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
