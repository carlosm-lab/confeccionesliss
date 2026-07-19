"use client";

/**
 * DeliveryFormModal — Confecciones Liss
 *
 * Formulario de datos de entrega optimizado y limpio.
 *
 * Mejoras aplicadas:
 * 1. Selección inicial obligatoria del Tipo de Entrega.
 * 2. Visualización condicional inteligente:
 *    - A domicilio: Formulario completo (Dirección y Destinatario).
 *    - Punto medio / Taller / A la medida: Solo datos del destinatario/cliente.
 * 3. Animación premium "Calculando tarifa..." al seleccionar/cambiar el método o ubicación.
 * 4. Eliminación de la tabla estática de tarifas de entrega.
 * 5. Advertencias contextuales específicas (Toma de medidas obligatoria solo en taller/a la medida).
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
  deliveryMethod: "taller" | "punto_medio" | "domicilio" | "";
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
  deliveryMethod: "",
};

interface DeliveryFormProps {
  initialState?: Partial<DeliveryFormState>;
  onConfirm: (info: ShippingInfo) => void;
  onBack?: () => void;
  confirmLabel?: string;
  hasALaMedidaItem?: boolean;
}

const inputClass =
  "w-full rounded-xl border border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-on-surface)] transition-all duration-200 placeholder:text-[var(--color-on-surface-variant)]/50 focus:border-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-primary-container)] focus:outline-none";

const labelClass =
  "text-xs font-semibold tracking-wide text-[var(--color-on-surface-variant)] uppercase";

export function DeliveryForm({
  initialState,
  onConfirm,
  onBack,
  confirmLabel = "Confirmar y continuar",
  hasALaMedidaItem = false,
}: DeliveryFormProps) {
  // Inicializamos el formulario. Si tiene ítems "A la medida", forzamos el método a "taller".
  const [form, setForm] = useState<DeliveryFormState>(() => {
    const base = {
      ...INITIAL_STATE,
      ...initialState,
    };
    if (hasALaMedidaItem) {
      base.deliveryMethod = "taller";
      base.department = "San Miguel";
      base.municipality = "San Miguel";
    }
    return base as DeliveryFormState;
  });

  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationText, setCalculationText] = useState(
    "Calculando tarifa..."
  );

  const municipalities = useMemo(() => {
    const dept = DEPARTMENTS.find((d) => d.name === form.department);
    return dept?.municipalities ?? [];
  }, [form.department]);

  const set = (field: keyof DeliveryFormState, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Simular la animación premium de cálculo de tarifa al cambiar el método
  const triggerCalculationAnim = (
    method: "taller" | "punto_medio" | "domicilio",
    deptName?: string
  ) => {
    setIsCalculating(true);
    if (method === "domicilio") {
      setCalculationText(
        deptName
          ? `Calculando tarifa de envío para ${deptName}...`
          : "Calculando tarifa a domicilio..."
      );
    } else if (method === "punto_medio") {
      setCalculationText("Calculando tarifa en Punto Medio...");
    } else {
      setCalculationText("Calculando tarifa de taller...");
    }

    setTimeout(() => {
      setIsCalculating(false);
    }, 900);
  };

  const handleMethodChange = (
    method: "taller" | "punto_medio" | "domicilio"
  ) => {
    setForm((prev) => {
      const nextDept = method === "domicilio" ? prev.department : "San Miguel";
      const nextMuni =
        method === "domicilio" ? prev.municipality : "San Miguel";
      return {
        ...prev,
        deliveryMethod: method,
        department: nextDept,
        municipality: nextMuni,
      };
    });
    triggerCalculationAnim(method);
  };

  const handleConfirm = () => {
    if (!form.deliveryMethod) {
      toast.error("Por favor selecciona un método de entrega.");
      return;
    }

    // Validaciones condicionales según el método de entrega
    if (form.deliveryMethod === "domicilio") {
      if (!form.department) {
        toast.error("Por favor selecciona un departamento.");
        return;
      }
      if (!form.municipality) {
        toast.error("Por favor selecciona un municipio.");
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
    }

    // Datos comunes del destinatario/cliente
    if (!form.recipientName.trim()) {
      toast.error("Por favor ingresa el nombre completo.");
      return;
    }
    if (!form.recipientPhone.trim()) {
      toast.error("Por favor ingresa el número de teléfono.");
      return;
    }
    if (!form.termsAccepted) {
      toast.error("Debes aceptar los términos de envío y devoluciones.");
      return;
    }

    // Construir la información de envío
    const baseInfo = getShippingInfo(
      form.department || "San Miguel",
      form.municipality || "San Miguel",
      form.deliveryMethod
    );

    const fullInfo: ShippingInfo = {
      ...baseInfo,
      recipientName: form.recipientName.trim(),
      recipientPhone: form.recipientPhone.trim(),
      alternatePhone: form.alternatePhone.trim() || undefined,
      addressColonia:
        form.deliveryMethod === "domicilio"
          ? form.addressColonia.trim()
          : undefined,
      addressStreet:
        form.deliveryMethod === "domicilio"
          ? form.addressStreet.trim()
          : undefined,
      addressPolygon:
        form.deliveryMethod === "domicilio" && form.addressPolygon.trim()
          ? form.addressPolygon.trim()
          : undefined,
      addressNumber:
        form.deliveryMethod === "domicilio"
          ? form.addressNumber.trim()
          : undefined,
      addressReference:
        form.deliveryMethod === "domicilio"
          ? form.addressReference.trim()
          : undefined,
      termsAccepted: true,
    };

    onConfirm(fullInfo);
  };

  const previewInfo = useMemo(() => {
    if (!form.deliveryMethod) return null;
    if (
      form.deliveryMethod === "domicilio" &&
      (!form.department || !form.municipality)
    ) {
      return null;
    }
    return getShippingInfo(
      form.department || "San Miguel",
      form.municipality || "San Miguel",
      form.deliveryMethod
    );
  }, [form.deliveryMethod, form.department, form.municipality]);

  return (
    <div className="flex flex-col gap-4">
      {/* ── Botón de Atrás ──────────────────────────────────── */}
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
          Método y Datos de Entrega
        </h3>
        <p className="text-sm text-[var(--color-on-surface-variant)]">
          Selecciona cómo deseas recibir tu pedido y completa los datos
          requeridos.
        </p>
      </div>

      {/* ── PASO 1: Selección de Método de Entrega (Siempre visible) ── */}
      <div className="rounded-2xl border border-[var(--color-outline-variant)]/20 bg-[var(--color-surface-container-lowest)] p-4">
        <p className="mb-3 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary)] uppercase">
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "14px" }}
          >
            local_shipping
          </span>
          Selecciona el Tipo de Entrega
        </p>

        {hasALaMedidaItem ? (
          <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3 text-center dark:border-blue-900/30 dark:bg-blue-950/20">
            <span
              className="material-symbols-outlined mb-1 text-blue-600"
              style={{ fontSize: "28px" }}
            >
              straighten
            </span>
            <p className="text-xs font-bold text-blue-900 dark:text-blue-300">
              Entrega Exclusiva en Taller (A la Medida)
            </p>
            <p className="mt-1 text-[11px] text-blue-700/80 dark:text-blue-400/80">
              Tu pedido incluye prendas con confección a la medida. Es
              obligatorio visitar nuestro taller para la toma de medidas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
            {/* Taller */}
            <button
              type="button"
              onClick={() => handleMethodChange("taller")}
              className={`flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all duration-300 ${
                form.deliveryMethod === "taller"
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/20 text-[var(--color-primary)] shadow-sm ring-2 ring-[var(--color-primary)]/20"
                  : "border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] hover:border-slate-400"
              }`}
            >
              <span className="material-symbols-outlined mb-1.5 text-xl">
                store
              </span>
              <span className="text-xs font-bold">Retiro en Taller</span>
              <span className="mt-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                Gratis
              </span>
            </button>

            {/* Punto Medio */}
            <button
              type="button"
              onClick={() => handleMethodChange("punto_medio")}
              className={`flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all duration-300 ${
                form.deliveryMethod === "punto_medio"
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/20 text-[var(--color-primary)] shadow-sm ring-2 ring-[var(--color-primary)]/20"
                  : "border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] hover:border-slate-400"
              }`}
            >
              <span className="material-symbols-outlined mb-1.5 text-xl">
                meetups
              </span>
              <span className="text-xs font-bold">Punto Medio (Finde)</span>
              <span className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                $1.00
              </span>
            </button>

            {/* Domicilio */}
            <button
              type="button"
              onClick={() => handleMethodChange("domicilio")}
              className={`flex flex-col items-center justify-center rounded-xl border p-3.5 text-center transition-all duration-300 ${
                form.deliveryMethod === "domicilio"
                  ? "border-[var(--color-primary)] bg-[var(--color-primary-container)]/20 text-[var(--color-primary)] shadow-sm ring-2 ring-[var(--color-primary)]/20"
                  : "border-[var(--color-outline-variant)]/40 bg-[var(--color-surface)] hover:border-slate-400"
              }`}
            >
              <span className="material-symbols-outlined mb-1.5 text-xl">
                local_shipping
              </span>
              <span className="text-xs font-bold">A Domicilio</span>
              <span className="mt-1 text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                $3.00 / $6.00
              </span>
            </button>
          </div>
        )}
      </div>

      {/* ── ⚠️ Warning de precios desactualizados (Solo si hay un método seleccionado) ── */}
      {form.deliveryMethod && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-400/20 bg-amber-50/50 p-3 text-xs text-amber-800 dark:bg-amber-950/10 dark:text-amber-300">
          <span
            className="material-symbols-outlined shrink-0 text-amber-500"
            style={{ fontSize: "16px" }}
          >
            warning
          </span>
          <p>
            Los precios mostrados son de referencia. Confirmaremos el costo
            final al procesar tu pedido.
          </p>
        </div>
      )}

      {/* ── ANIMACIÓN PREMIUM: Calculando tarifa de entrega ── */}
      {isCalculating && (
        <div className="animate-fade-in flex flex-col items-center justify-center gap-3 rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-primary-container)]/5 py-8">
          <div className="relative flex h-10 w-10 items-center justify-center">
            {/* Círculo rotativo de carga */}
            <div className="absolute h-full w-full animate-spin rounded-full border-4 border-slate-200 border-t-[var(--color-primary)]" />
            <span className="material-symbols-outlined animate-pulse text-sm text-[var(--color-primary)]">
              payments
            </span>
          </div>
          <span className="animate-pulse text-xs font-semibold tracking-wide text-[var(--color-primary)]">
            {calculationText}
          </span>
        </div>
      )}

      {/* ── PASO 2: Formularios dinámicos (Ocultos durante la carga) ── */}
      {!isCalculating && form.deliveryMethod && (
        <div className="animate-fade-in flex flex-col gap-4">
          {/* A. Warning A LA MEDIDA (Solo si aplica y se selecciona Taller) */}
          {hasALaMedidaItem && form.deliveryMethod === "taller" && (
            <div className="flex items-start gap-2.5 rounded-xl border border-blue-400/40 bg-blue-50/80 p-3.5 text-xs text-blue-900 dark:bg-blue-900/20 dark:text-blue-300">
              <span
                className="material-symbols-outlined mt-0.5 shrink-0 text-blue-500"
                style={{ fontSize: "18px" }}
              >
                straighten
              </span>
              <p>
                <span className="font-semibold">
                  Toma de medidas obligatoria:
                </span>{" "}
                Has seleccionado prendas{" "}
                <span className="font-bold">&quot;A la medida&quot;</span>. Es
                indispensable que agendes una visita a nuestro taller para la
                toma exacta de tus medidas.
              </p>
            </div>
          )}

          {/* B. Vista Previa del Costo Calculado */}
          {previewInfo && (
            <div className="rounded-xl border border-[var(--color-primary)]/10 bg-[var(--color-primary-container)]/20 p-3">
              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <p className="font-semibold text-[var(--color-on-surface)]">
                    Costo de entrega calculado:
                  </p>
                  <p className="mt-0.5 text-[11px] text-[var(--color-on-surface-variant)]">
                    {previewInfo.method}
                  </p>
                </div>
                <span className="text-base font-black text-[var(--color-primary)]">
                  {previewInfo.label}
                </span>
              </div>
            </div>
          )}

          {/* C. Campos de UBICACIÓN / DIRECCIÓN (Solo para envío a domicilio) */}
          {form.deliveryMethod === "domicilio" && (
            <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-outline-variant)]/20 bg-[var(--color-surface)] p-4">
              <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary)] uppercase">
                <span
                  className="material-symbols-outlined"
                  style={{ fontSize: "14px" }}
                >
                  location_on
                </span>
                Dirección de Envío
              </p>

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
                    }));
                    triggerCalculationAnim("domicilio", value);
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

              {/* Dirección de Calle, Colonia, etc. */}
              {form.municipality && (
                <div className="mt-1 flex flex-col gap-3 border-t border-[var(--color-outline-variant)]/10 pt-3">
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
              )}
            </div>
          )}

          {/* D. Datos del CLIENTE / DESTINATARIO (Siempre visible si se ha seleccionado método) */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[var(--color-outline-variant)]/20 bg-[var(--color-surface)] p-4">
            <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary)] uppercase">
              <span
                className="material-symbols-outlined"
                style={{ fontSize: "14px" }}
              >
                person
              </span>
              {form.deliveryMethod === "domicilio"
                ? "Datos del Destinatario"
                : "Datos del Cliente"}
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
                  Teléfono de contacto *
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
                  placeholder="Contacto de respaldo si no logramos comunicarnos"
                  value={form.alternatePhone}
                  onChange={(e) => set("alternatePhone", e.target.value)}
                  className={inputClass}
                  maxLength={20}
                />
              </div>
            </div>
          </div>

          {/* E. Términos y condiciones */}
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
                  style={{
                    fontSize: "11px",
                    fontVariationSettings: "'FILL' 1",
                  }}
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

          {/* F. Botón de Confirmación */}
          <div className="mt-1">
            <button
              onClick={handleConfirm}
              className="w-full rounded-xl bg-[var(--color-primary)] py-3.5 text-sm font-bold text-[var(--color-on-primary)] transition-all duration-200 hover:bg-[var(--color-on-primary-container)] active:scale-[0.98]"
            >
              {confirmLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
