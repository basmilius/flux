# useApplicationMenu

This composable is a higher-level wrapper around [`useApplicationInjection`](./useApplicationInjection) that exposes convenience methods and computed properties for working with the application menu — opening and closing it, navigating between menu levels, and inspecting the current state.

::: warning
This composable will throw an error if used outside of a [`FluxApplication`](../components/application) component.
:::

## Usage

```ts
import { useApplicationMenu } from '@flux-ui/application';

const menu = useApplicationMenu();

menu.open();
menu.toggle();
menu.showMainMenu();
menu.showContextMenu();
```

## Type declarations

```ts
declare function useApplicationMenu(): UseApplicationMenu;

type UseApplicationMenu = {
    readonly activeContext: ComputedRef<FluxApplicationContextInfo | undefined>;
    readonly canGoBack: ComputedRef<boolean>;
    readonly canGoForward: ComputedRef<boolean>;
    readonly contexts: ComputedRef<readonly FluxApplicationContextInfo[]>;
    readonly isMainMenuVisible: ComputedRef<boolean>;
    readonly isMenuCollapsed: Ref<boolean>;
    readonly layout: Ref<FluxApplicationLayout>;
    readonly totalLevels: ComputedRef<number>;
    readonly viewIndex: Ref<number>;
    close(): void;
    goToChild(): void;
    goToCurrent(): void;
    goToLevel(index: number): void;
    goToMain(): void;
    goToParent(): void;
    open(): void;
    showContextMenu(): void;
    showMainMenu(): void;
    toggle(): void;
    toggleMainMenu(): void;
};
```

## Used by

- [Application menu](../components/menu)
