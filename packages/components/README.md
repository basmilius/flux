# `@flux-ui/components`

The main component library of Flux UI — an opinionated set of UI components for [Vue 3](https://vuejs.org).

Documentation lives at [flux-ui.dev](https://flux-ui.dev). This readme covers building the package locally.

## Highlights

- 100+ Vue 3 components built with `<script setup lang="ts">`.
- CSS Modules with shared design tokens (palette scales, semantic surfaces, focus rings).
- Programmatic helpers: `showAlert`, `showConfirm`, `showPrompt`, `showSnackbar`.
- Public composables: `useBreakpoints`, `useDisabled`.
- FontAwesome Pro icons (registered through `fluxRegisterIcons`).

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23
- A FontAwesome Pro npm token in `FONTAWESOME_NPM_AUTH_TOKEN` (see the root `.npmrc`).

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/components build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux globally with Bun, run `bun link --cwd packages/components`.
    - In another project, use `link:@flux-ui/components` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/types`](../types) — public TypeScript types.
- [`@flux-ui/internals`](../internals) — shared composables, utilities, and directives.
- [`@flux-ui/statistics`](../statistics) — chart components built on Apache ECharts.
- [`@flux-ui/dashboard`](../dashboard) — dashboard layout components.
- [`@flux-ui/application`](../application) — application shell components.
