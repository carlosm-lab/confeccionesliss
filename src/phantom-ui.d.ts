import type { PhantomUiAttributes } from "@aejkatappaja/phantom-ui";

declare module "react/jsx-runtime" {
  export namespace JSX {
    interface IntrinsicElements {
      "phantom-ui": PhantomUiAttributes;
    }
  }
}

declare module "lucide-react/dist/esm/icons/*.js" {
  export const __iconNode: [string, Record<string, string>][];
  const component: any;
  export default component;
}
