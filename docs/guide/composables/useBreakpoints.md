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

### xs — 0px
Targets the smallest viewports. Active when the viewport width is 0px or more.

### sm — 640px
Targets small viewports such as large phones in landscape mode.

### md — 768px
Targets medium viewports such as tablets in portrait mode.

### lg — 1024px
Targets large viewports such as tablets in landscape mode and small desktops.

### xl — 1280px
Targets extra-large viewports such as full-size desktop screens.

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
