# `@flux-ui/statistics`

Chart and statistics components for [Flux UI](https://flux-ui.dev).

Built on top of [ApexCharts](https://apexcharts.com) via [`vue3-apexcharts`](https://github.com/apexcharts/vue3-apexcharts), themed to match the Flux design system. Locale-aware labels are provided through `vue-i18n`.

## Highlights

- Themed chart components that respect the Flux color palette and surfaces.
- Locale-aware formatting for axes, tooltips, and legends.
- Same CSS Modules and naming conventions as `@flux-ui/components`.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/statistics build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux Statistics globally with Bun, run `bun link --cwd packages/statistics`.
    - In another project, use `link:@flux-ui/statistics` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/dashboard`](../dashboard)
- [`@flux-ui/application`](../application)
