# useTabBarInjection

This composable provides access to the [Tab bar](../../components/tab-bar) context. It lets an item of your own register itself with the bar, so the bar can scroll it into view and move its indicator, and read whether the bar renders as pills.

Outside a `FluxTabBar` it returns a no-op context, so a component that uses it stays safe to render on its own.

## Usage

```ts
import { useTabBarInjection } from '@flux-ui/components';

const { isPills, registerItem, unregisterItem } = useTabBarInjection();
```

## Type declarations

```ts
declare function useTabBarInjection(): FluxTabBarInjection;

type FluxTabBarInjection = {
    readonly isPills: Ref<boolean>;

    registerItem(element: Element, isActive: Ref<boolean>): void;
    unregisterItem(element: Element): void;
};
```

## Used by

- [Tab bar](../../components/tab-bar)
