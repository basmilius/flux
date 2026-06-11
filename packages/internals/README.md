# `@flux-ui/internals`

Shared composables, utilities, directives, and data helpers used across the Flux UI packages.

Built with [`tsdown`](https://github.com/rolldown/tsdown).

## Highlights

The package exposes four sub-entry points alongside the root export:

| Entry                           | Contents                                                                                                                                                                       |
|---------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `@flux-ui/internals`            | Re-exports of every entry below.                                                                                                                                               |
| `@flux-ui/internals/composable` | `useCalendar`, `useEventListener`, `useFocusTrap`, `useFocusZone`, `useInView`, `useRemembered`, `useScrollEdges`, `useScrollPosition`, …                                      |
| `@flux-ui/internals/data`       | Data helpers — e.g. color utilities.                                                                                                                                           |
| `@flux-ui/internals/directive`  | Vue directives — `focusTrap`, `heightTransition`.                                                                                                                              |
| `@flux-ui/internals/util`       | Focus helpers (`wrapFocus`, `getFocusableElement(s)`, `getKeyboardFocusableElements`, `getBidirectionalFocusElement`), `flattenVNodeTree`, `animationFrameDebounce`, `warn`, … |

## ⭐️ Prerequisites

- Bun >= 1.2.13
- Node >= 23

## 🚀 Getting started

1. Make sure the Flux monorepo is checked out.
2. Run `bun install` in the project root.
3. Run `bun run --cwd packages/internals build` to build the package.

## 📦 Sibling packages

- [`@flux-ui/components`](../components)
- [`@flux-ui/types`](../types)
- [`@flux-ui/statistics`](../statistics)
- [`@flux-ui/application`](../application)
