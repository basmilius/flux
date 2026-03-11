# useDashboardInjection

This composable provides access to the [Dashboard](../components/dashboard) context. It must be used within a FluxDashboard component tree.

::: warning
This composable will throw an error if used outside of a FluxDashboard component.
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

- [Dashboard content](../components/content)
- [Dashboard header](../components/header)
- [Dashboard navigation](../components/navigation)
- [Dashboard side](../components/side)
