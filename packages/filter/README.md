# `@flux-ui/filter`

Filter bar and filter building blocks for [Flux UI](https://flux-ui.dev).

A filter bar, a filter window and the date, option, range and async filters that go in them, together with `defineFilter` for writing your own.

## Highlights

- Ships the `defineFilterMacro()` Vite plugin at `@flux-ui/filter/vite`, so `@flux-ui/components` carries no build-tool entry.
- Built on `FluxMenu`, `FluxFlyout`, `FluxWindow` and the form controls of `@flux-ui/components`.
- Same CSS Modules and naming conventions as `@flux-ui/components`.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/filter build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux Filter globally with Bun, run `bun link --cwd packages/filter`.
    - In another project, use `link:@flux-ui/filter` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/application`](../application)
- [`@flux-ui/statistics`](../statistics)
- [`@flux-ui/ai`](../ai)
- [`@flux-ui/flow`](../flow)
- [`@flux-ui/visuals`](../visuals)
