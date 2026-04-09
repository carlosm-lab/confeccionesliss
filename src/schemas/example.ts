import { z } from "zod";

/**
 * Schema de ejemplo para demostrar el patrón de validación con Zod.
 * Todos los schemas de formularios y payloads deben definirse aquí
 * y ser compartidos entre Server Actions y Client Components.
 */
export const exampleSchema = z.object({
  message: z.string().min(1, "El mensaje es requerido"),
});

export type ExampleInput = z.infer<typeof exampleSchema>;
