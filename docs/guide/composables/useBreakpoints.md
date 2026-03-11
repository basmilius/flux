# useBreakpoints

This composable tracks the current viewport breakpoint and provides reactive boolean refs for each breakpoint size.

## Usage

```ts
import { useBreakpoints } from '@flux-ui/components';

const { currentBreakpoint, xs, sm, md, lg, xl } = useBreakpoints();

// Use in a computed or watcher
if (md.value) {
    console.log('Viewport is at least medium');
}
```

## Breakpoints

| Name | Minimum width |
|------|---------------|
| `xs` | 0px |
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |

## Type declarations

```ts
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

declare function useBreakpoints(): {
    readonly currentBreakpoint: Ref<Breakpoint | null>;
    readonly xs: Ref<boolean>;
    readonly sm: Ref<boolean>;
    readonly md: Ref<boolean>;
    readonly lg: Ref<boolean>;
    readonly xl: Ref<boolean>;
};
```
