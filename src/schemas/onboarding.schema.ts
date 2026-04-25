import { z } from "zod";

export const onboardingSchema = z.object({
  // From Perfil
  nombre: z.string().optional(),
  apellidos: z.string().optional(),
  telefono: z.string().optional(),
  talla: z.string().optional(),
  genero: z.string().optional(),
  departamento: z.string().optional(),
  municipio: z.string().optional(),
  direccion: z
    .object({
      calle: z.string().optional(),
      referencia: z.string().optional(),
    })
    .optional(),

  // From Rol
  tipo_perfil: z.string().optional(),

  // From Institucion
  institucion: z.string().optional(),

  // From Preferencias
  tipo_compra: z.string().optional(),
  colores_favoritos: z.array(z.string()).optional(),
  notificaciones: z.record(z.string(), z.boolean()).optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
