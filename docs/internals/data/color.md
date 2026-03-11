# Color palette

The `@flux-ui/internals` package exports a comprehensive color palette based on the Tailwind CSS color system. Each color is available in 12 shades, from `50` (lightest) to `950` (darkest).

## Usage

```ts
import { blue500, red500, green500 } from '@flux-ui/internals';

console.log(blue500); // '#3b82f6'
```

## Available colors

Each of the following colors exports shades `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, and `950`:

| Color | Example (500) |
|-------|---------------|
| `slate` | `#64748b` |
| `gray` | `#6b7280` |
| `zinc` | `#71717a` |
| `neutral` | `#737373` |
| `stone` | `#78716c` |
| `red` | `#ef4444` |
| `orange` | `#f97316` |
| `amber` | `#f59e0b` |
| `yellow` | `#eab308` |
| `lime` | `#84cc16` |
| `green` | `#22c55e` |
| `emerald` | `#10b981` |
| `teal` | `#14b8a6` |
| `cyan` | `#06b6d4` |
| `sky` | `#0ea5e9` |
| `blue` | `#3b82f6` |
| `indigo` | `#6366f1` |
| `violet` | `#8b5cf6` |
| `purple` | `#a855f7` |
| `fuchsia` | `#d946ef` |
| `pink` | `#ec4899` |
| `rose` | `#f43f5e` |

## Type declarations

```ts
// Each color exports shades as string constants, e.g.:
export declare const blue50: string;
export declare const blue100: string;
// ... through blue950
```
