import { z } from "zod";

export const productSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  slug: z.string().min(3),
  descripcion: z.string().optional(),
  precio: z.number().positive("El precio debe ser positivo"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo"),
  categoria_id: z.string().uuid("Categoría inválida").optional(),
  imagenes: z.array(z.string().url()).optional(),
  tallas: z.array(z.string()).optional(),
  colores: z.array(z.string()).optional(),
  destacado: z.boolean().default(false),
});

export type ProductInput = z.infer<typeof productSchema>;
