# `@flux-ui/types`

Public TypeScript types shared across the Flux UI packages.

This package has **no build step** — it ships its TypeScript sources directly.

## Highlights

| File            | Contents                                                                |
|-----------------|-------------------------------------------------------------------------|
| `common.ts`     | Cross-cutting types — `FluxColor`, `FluxSize`, `FluxIconName`, `FluxTo` |
| `components.ts` | Per-component `Props`, `Emits`, and `Slots` types                       |
| `form.ts`       | Form-related types                                                      |
| `filter.ts`     | Filter component types                                                  |
| `notify.ts`     | Snackbar, alert, confirm, and prompt types                              |
| `statistics.ts` | Types for `@flux-ui/statistics`                                         |

> Component-owned types live next to their component as inline `defineProps` / `defineEmits` / `defineSlots`.
> Only types with cross-package or cross-component reuse belong here.

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.

There is no build step; consumers import directly from `./src/index.ts`.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/internals`](../internals)
- [`@flux-ui/statistics`](../statistics)
- [`@flux-ui/application`](../application)
