# `@flux-ui/flow`

Flow building blocks for [Flux UI](https://flux-ui.dev).

Display-only components for drawing node graphs, chains and their connections, built on top of the Flux design system.

## Highlights

- Display-only: the layout is derived from what is written inside the slots, there is no editor.
- Automatic connection routing between placed nodes.
- Same CSS Modules and naming conventions as `@flux-ui/components`.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/flow build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux Flow globally with Bun, run `bun link --cwd packages/flow`.
    - In another project, use `link:@flux-ui/flow` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/application`](../application)
- [`@flux-ui/statistics`](../statistics)
- [`@flux-ui/ai`](../ai)
- [`@flux-ui/visuals`](../visuals)
