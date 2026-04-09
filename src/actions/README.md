# Server Actions

This directory must contain all Next.js Server Actions used for data mutations.

**CRITICAL RULE:**

- Do not create Server Actions inside component files.
- ALWAYS use `next-safe-action` to wrap your Server Actions.
- ALWAYS validate inputs against a Zod schema defined in `src/schemas/`.

This ensures type safety, error boundary handling, and a predictable mutation flow for AI agents.
