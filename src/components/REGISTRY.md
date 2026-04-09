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
