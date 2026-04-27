---
outline: deep

slots:
    -   name: default
        description: The content of the top bar.
---

# Dashboard top bar

The dashboard top bar component is a sticky bar that sits at the top of the dashboard content area. It is the lower-level building block used by [Dashboard header](./header) and reacts to the collapsed state of the dashboard menu through [`useDashboardInjection`](../composables/useDashboardInjection). Use it directly when you need a top bar with custom content that goes beyond what `FluxDashboardHeader` offers.

<FrontmatterDocs/>

## Snippet

::: code-group

<<< @/code/dashboard/top-bar/snippet.vue [FluxDashboardTopBar.vue]

:::
