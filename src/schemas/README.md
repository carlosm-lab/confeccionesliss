# Validation Schemas

This directory must contain all Zod schemas used for validating data across the application.

**CRITICAL RULE:**
Do not define validation schemas inline within components or Server Actions.
Always define them here and export them, so both the client (e.g., React Hook Form) and the server (e.g., next-safe-action) can share the exact same validation logic.

Example:
`src/schemas/user.ts` -> export `userSchema`
