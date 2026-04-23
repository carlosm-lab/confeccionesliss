import { z } from "zod";

export const orderItemSchema = z.object({
  producto_id: z.string().uuid(),
  cantidad: z.number().int().positive(),
  talla: z.string().optional(),
  color: z.string().optional(),
});

export const orderSchema = z.object({
  direccion_envio: z.object({
    nombreCompleto: z.string().min(3, "Nombre requerido"),
    calle: z.string().min(3, "Dirección requerida"),
    ciudad: z.string().min(2, "Ciudad requerida"),
    provincia: z.string().min(2, "Provincia requerida"),
    codigoPostal: z.string().min(3, "Código postal requerido"),
    telefono: z.string().min(6, "Teléfono requerido"),
  }),
  metodo_pago: z.enum(["tarjeta", "transferencia", "efectivo"]),
  notas: z.string().optional(),
  items: z
    .array(orderItemSchema)
    .min(1, "El pedido debe contener al menos un producto"),
});

export type OrderInput = z.infer<typeof orderSchema>;
export type OrderItemInput = z.infer<typeof orderItemSchema>;
