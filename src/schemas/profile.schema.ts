import { z } from "zod";

export const profileUpdateSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido").optional(),
  apellidos: z.string().min(2, "Los apellidos son requeridos").optional(),
  telefono: z.string().optional(),
  direccion: z
    .object({
      calle: z.string().optional(),
      ciudad: z.string().optional(),
      provincia: z.string().optional(),
      codigoPostal: z.string().optional(),
      pais: z.string().optional(),
    })
    .optional(),
});

export type ProfileUpdateInput = z.infer<typeof profileUpdateSchema>;
