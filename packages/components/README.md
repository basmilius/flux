# `@flux-ui/components`

Flux UI is a set of opiniated UI components for [Vue 3.x](https://vuejs.org).
The documentation can be found on [flux-ui.dev](https://flux-ui.dev), this readme is for building Flux yourself.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure that the monorepo of Flux is used.
2. Run `bun install` in the root of the project.
3. Run `bun --cwd packages/components build` to build the project.
4. To link Flux globally, using Bun, run `bun link --cwd packages/components`.
    - In another project, use `link:@flux-ui/components` as the dependency version in `package.json`.
