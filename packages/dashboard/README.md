# `@flux-ui/dashboard`

Layout components for building dashboards with [Flux UI](https://flux-ui.dev).

## Highlights

Composable shell components:

- `FluxDashboard` — root container.
- `FluxDashboardContent` — main content region.
- `FluxDashboardSide` — sidebar slot.
- `FluxDashboardNavigation` — navigation rail.
- `FluxDashboardTopBar` — top bar.
- `FluxDashboardHeader` — page-level header.
- `FluxDashboardMenu` — menu primitive.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/dashboard build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux Dashboard globally with Bun, run `bun link --cwd packages/dashboard`.
    - In another project, use `link:@flux-ui/dashboard` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/statistics`](../statistics)
- [`@flux-ui/application`](../application)
