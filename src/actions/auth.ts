"use server";

import { actionClient } from "@/lib/safe-action";
import { loginSchema, signUpSchema } from "@/schemas/auth.schema";
import { createServer } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const signInAction = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    const supabase = await createServer();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath("/");
    return data;
  });

export const signUpAction = actionClient
  .schema(signUpSchema)
  .action(async ({ parsedInput: { email, password, nombre, apellidos } }) => {
    const supabase = await createServer();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          nombre,
          apellidos,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  });

export const signOutAction = actionClient.action(async () => {
  const supabase = await createServer();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  return { success: true };
});
