# useApplicationInjection

This composable provides access to the [Application](../components/application) context. It must be used within a `FluxApplication` component tree.

::: warning
This composable will throw an error if used outside of a [`FluxApplication`](../components/application) component.
:::

## Usage

```ts
import { useApplicationInjection } from '@flux-ui/application';

const application = useApplicationInjection();
```

## Type declarations

```ts
declare function useApplicationInjection(): FluxApplicationInjection;

type FluxApplicationInjection = {
    readonly activeContext: ComputedRef<FluxApplicationContextInfo | undefined>;
    readonly contexts: ComputedRef<readonly FluxApplicationContextInfo[]>;
    readonly isMenuCollapsed: Ref<boolean>;
    readonly layout: Ref<FluxApplicationLayout>;
    readonly showDesktopMenuToggle: Ref<boolean>;
    readonly totalLevels: ComputedRef<number>;
    readonly viewIndex: Ref<number>;
    goToChild(): void;
    goToCurrent(): void;
    goToLevel(index: number): void;
    goToMain(): void;
    goToParent(): void;
    pushContext(info: FluxApplicationContextInfo): void;
    removeContext(id: symbol): void;
};

type FluxApplicationContextInfo = {
    readonly id: symbol;
    readonly title: string;
    readonly subtitle?: string;
    readonly to?: FluxTo;
    readonly entryTo?: FluxTo;
    readonly href?: string;
    readonly type?: FluxPressableType;
};

type FluxApplicationLayout =
    | 'default'
    | 'dashboard'
    | 'full'
    | 'medium'
    | 'narrow';
```

## Used by

- [Application](../components/application)
    - [Application content](../components/content)
    - [Application menu](../components/menu)
    - [Application menu context](../components/menu-context)
    - [Application menu toggle](../components/menu-toggle)
    - [Application top](../components/top)
