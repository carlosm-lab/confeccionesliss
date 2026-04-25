"use server";

import { actionClient } from "@/lib/safe-action";
import {
  loginSchema,
  signUpSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  resendVerificationSchema,
} from "@/schemas/auth.schema";
import { createServer } from "@/lib/supabase/server";
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

export const resetPasswordAction = actionClient
  .schema(resetPasswordSchema)
  .action(async ({ parsedInput: { email } }) => {
    const supabase = await createServer();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/callback?next=/actualizar-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });

export const updatePasswordAction = actionClient
  .schema(updatePasswordSchema)
  .action(async ({ parsedInput: { password } }) => {
    const supabase = await createServer();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });

export const resendVerificationAction = actionClient
  .schema(resendVerificationSchema)
  .action(async ({ parsedInput: { email, type } }) => {
    const supabase = await createServer();

    if (type === "recovery") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/callback?next=/actualizar-password`,
      });
      if (error) throw new Error(error.message);
      return { success: true };
    }

    if (type === "magiclink") {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/callback?next=/onboarding/perfil`,
        },
      });
      if (error) throw new Error(error.message);
      return { success: true };
    }

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/callback?next=/onboarding/perfil`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true };
  });
