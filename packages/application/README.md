# `@flux-ui/application`

Application shell components for building full apps with [Flux UI](https://flux-ui.dev).

## Highlights

- `FluxApplication` — root application shell.
- `FluxApplicationContent` — main content region.
- `FluxApplicationSection` — section wrapper.
- `FluxApplicationSide` — sidebar slot.
- `FluxApplicationTop` — top bar.
- `FluxApplicationHero` — hero section.
- `FluxApplicationMenu` (+ `…Account`, `…Context`, `…ContextStack`, `…Promo`, `…Toggle`) — menu primitives for the application chrome.

Integrates with `vue-router` for navigation-aware behavior.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/application build` to build the package (runs `vue-tsc` then `vite build`).
4. To link Flux Application globally with Bun, run `bun link --cwd packages/application`.
    - In another project, use `link:@flux-ui/application` as the dependency version in `package.json`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/statistics`](../statistics)
- [`@flux-ui/dashboard`](../dashboard)
