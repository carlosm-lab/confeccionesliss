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
        { type: "actions", pattern: "src/actions/**/*" },
        { type: "lib", pattern: "src/lib/**/*" },
        { type: "hooks", pattern: "src/hooks/**/*" },
        { type: "ui", pattern: "src/components/ui/**/*" },
        { type: "components", pattern: "src/components/**/*" },
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
              from: ["ui"],
              disallow: ["components", "hooks", "actions", "server"],
              message: "UI components cannot import from higher layers.",
            },
            {
              from: ["client", "components"],
              disallow: ["server", "actions"],
              message: "Client components cannot directly import server code or actions.",
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
