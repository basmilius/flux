# useDashboardInjection

This composable provides access to the [Dashboard](../components/dashboard) context. It must be used within a FluxDashboard component tree.

::: warning
This composable will throw an error if used outside of a [`FluxDashboard`](../components/dashboard) component.
:::

## Usage

```ts
import { useDashboardInjection } from '@flux-ui/dashboard';

const dashboard = useDashboardInjection();
```

## Type declarations

```ts
declare function useDashboardInjection(): FluxDashboardInjection;
```

## Used by

- [Dashboard](../components/dashboard)
    - [Content](../components/content)
    - [Header](../components/header)
    - [Navigation](../components/navigation)
    - [Side](../components/side)
