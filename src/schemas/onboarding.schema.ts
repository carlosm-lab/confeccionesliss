import { z } from "zod";

export const onboardingSchema = z.object({
  tipoTienda: z.string().min(2, "Requerido"),
  tamaño: z.string().optional(),
  intereses: z.array(z.string()).optional(),
});

export type OnboardingInput = z.infer<typeof onboardingSchema>;
