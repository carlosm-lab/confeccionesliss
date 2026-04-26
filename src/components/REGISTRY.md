# Component Registry

This file serves as the Single Source of Truth for all UI components extracted and built by AI agents.
**CRITICAL RULE:** Every time a new component is created or imported from prototypes, you MUST document it here.

## Template for new components:

### `<ComponentName />`

**Path:** `src/components/...`
**Description:** Brief explanation of what it does and its visual state.

**Props:**

- `propName` (`type`): Description of the prop.

**Example Usage:**

```tsx
import { ComponentName } from "@/components/ComponentName";

<ComponentName propName="value" />;
```

---

## Registered Components

_(Add new components below this line)_

### `<GoogleIcon />`

**Path:** `src/components/ui/icons/GoogleIcon.tsx`
**Description:** Google "G" logo icon extracted from inline SVG. Used in OAuth login/register buttons.

**Props:**

- `className` (`string`): Optional CSS class override. Defaults to `"h-5 w-5"`.

**Example Usage:**

```tsx
import { GoogleIcon } from "@/components/ui/icons/GoogleIcon";

<GoogleIcon className="h-6 w-6" />;
```

---
