# `@flux-ui/ai`

Conversational and AI building blocks for [Flux UI](https://flux-ui.dev).

Components for chat surfaces, streaming responses and rendered markdown, built on top of the Flux design system.

## Highlights

- Streaming-aware markdown rendering that keeps a partial response readable while it arrives.
- Reuses `FluxProse`, `FluxDynamicView` and `FluxHoverCard` from `@flux-ui/components`.
- Same CSS Modules and naming conventions as `@flux-ui/components`.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/ai build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux AI globally with Bun, run `bun link --cwd packages/ai`.
    - In another project, use `link:@flux-ui/ai` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/application`](../application)
- [`@flux-ui/statistics`](../statistics)
- [`@flux-ui/flow`](../flow)
- [`@flux-ui/visuals`](../visuals)
