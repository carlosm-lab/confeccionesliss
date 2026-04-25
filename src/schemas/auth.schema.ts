import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const signUpSchema = loginSchema.extend({
  nombre: z.string().min(2, "El nombre es requerido"),
  apellidos: z.string().min(2, "Los apellidos son requeridos"),
});

export const resetPasswordSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
});

export const resendVerificationSchema = z.object({
  email: z.string().email("Correo electrónico inválido"),
  type: z.enum(["signup", "magiclink", "recovery"]).default("signup"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;
