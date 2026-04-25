"use server";

import { actionClient } from "@/lib/safe-action";
import { createServer } from "@/lib/supabase/server";
import { onboardingSchema } from "@/schemas/onboarding.schema";
import { revalidatePath } from "next/cache";

export const updateOnboardingAction = actionClient
  .schema(onboardingSchema)
  .action(async ({ parsedInput }) => {
    const supabase = await createServer();

    // Verify user is authenticated
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("No estás autenticado.");
    }

    // Update the profile with onboarding fields
    const { error } = await supabase
      .from("profiles")
      .update({
        nombre: parsedInput.nombre,
        apellidos: parsedInput.apellidos,
        telefono: parsedInput.telefono,
        talla: parsedInput.talla,
        genero: parsedInput.genero,
        departamento: parsedInput.departamento,
        municipio: parsedInput.municipio,
        direccion: parsedInput.direccion,
        tipo_perfil: parsedInput.tipo_perfil,
        institucion: parsedInput.institucion,
        tipo_compra: parsedInput.tipo_compra,
        colores_favoritos: parsedInput.colores_favoritos,
        notificaciones: parsedInput.notificaciones,
        onboarding_completed: true,
      })
      .eq("id", user.id);

    if (error) {
      console.error("Error updating onboarding:", error);
      throw new Error("Ocurrió un error al guardar tu perfil.");
    }

    revalidatePath("/", "layout");

    return { success: true };
  });
