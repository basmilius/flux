# `@flux-ui/visuals`

Visual effect components for [Flux UI](https://flux-ui.dev).

Decorative, animated building blocks (border beams, patterns, animated colors, slot text, and more) that layer on top of the Flux design system.

## Highlights

- Purely decorative, `aria-hidden` visual effects that respect `prefers-reduced-motion`.
- Same CSS Modules and naming conventions as `@flux-ui/components`.
- Relies on the Flux theme tokens (`--gray-*`, `--radius`), so load `@flux-ui/components` styles alongside it.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/visuals build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux Visuals globally with Bun, run `bun link --cwd packages/visuals`.
    - In another project, use `link:@flux-ui/visuals` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/application`](../application)
- [`@flux-ui/statistics`](../statistics)
