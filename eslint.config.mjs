import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import boundaries from "eslint-plugin-boundaries";
import jsxA11yStrict from "eslint-plugin-jsx-a11y";
import reactCompiler from "eslint-plugin-react-compiler";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      ...jsxA11yStrict.flatConfigs.strict.rules,
    },
  },
  {
    plugins: {
      boundaries,
      "react-compiler": reactCompiler,
    },
    settings: {
      "boundaries/elements": [
        { type: "server", pattern: "src/app/api/**/*" },
        { type: "server", pattern: "src/actions/**/*" },
        { type: "server", pattern: "src/lib/server/**/*" },
        { type: "client", pattern: "src/components/**/*" },
        { type: "client", pattern: "src/hooks/**/*" },
        { type: "client", pattern: "src/app/(dev)/sandbox/**/*"}
      ],
    },
    rules: {
      "boundaries/dependencies": [
        "error",
        {
          default: "allow",
          rules: [
            {
              from: [["client"]],
              disallow: [["server"]],
              message: "Componentes de cliente no pueden importar código de servidor (Server Actions o APIs).",
            },
          ],
        },
      ],
      "react-compiler/react-compiler": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
