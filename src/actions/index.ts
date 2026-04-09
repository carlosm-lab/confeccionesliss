"use server";

import { actionClient } from "@/lib/safe-action";
import { exampleSchema } from "@/schemas/example";

/**
 * Server Action de ejemplo usando next-safe-action.
 * Todas las actions DEBEN seguir este patrón:
 * 1. "use server" como primera línea del archivo.
 * 2. Usar actionClient de @/lib/safe-action.
 * 3. Validar input con un schema Zod de @/schemas/.
 */
export const exampleAction = actionClient
  .schema(exampleSchema)
  .action(async ({ parsedInput }) => {
    // Aquí va la lógica del servidor (DB, APIs externas, etc.)
    return { success: true, message: parsedInput.message };
  });
