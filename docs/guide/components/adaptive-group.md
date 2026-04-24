---
outline: deep

props:
    -   name: gap
        description: The gap in pixels between the items inside the group.
        type: number
        optional: true
        default: 9

slots:
    -   name: default
        description: The `FluxAdaptiveSlot` items to orchestrate.
---

# Adaptive group

A group that coordinates multiple [`FluxAdaptiveSlot`](./adaptive-slot) items so they collapse in a predictable, priority-based order instead of the one with the widest default content collapsing first. The group observes its own width and the desired widths of each child, and decides which items remain in their default slot and which switch to their fallback.

Items collapse in ascending order of their `priority` prop. The lowest-priority item that is still default is the first to switch to its fallback when space runs out; the highest-priority item keeps its default slot the longest.

::: render
render=../../code/guide/components/adaptive-slot/preview.vue
:::

::: tip
The ordering is strict: if two items have the same priority, the one declared first in the template collapses first. Changing a priority at runtime is reactive — the group re-evaluates immediately.
:::

<FrontmatterDocs/>

## Used components

- [Adaptive slot](./adaptive-slot)
