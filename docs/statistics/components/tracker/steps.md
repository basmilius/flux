---
outline: deep

slots:
    -   name: default
        description: The steps of the group.
---

# Tracker steps

The group that holds the [Steps](./step) inside an [Entry](./entry). It registers itself with the surrounding [Tracker](./), which branches its rail out into the group and rejoins it under the last step, so the detail of a milestone reads as a detour rather than as extra milestones.

::: render
render=../../../code/statistics/components/tracker/steps/preview.vue
:::

::: tip
An entry can hold more than one group, and a group nothing but steps. Anything else belongs in the body of the entry itself.
:::

::: info
The group carries the ARIA `list` role; each step inside it is a `listitem`.
:::

<FrontmatterDocs/>

## Examples

::: example Per entry || Every entry keeps its own group, so each milestone branches out and comes back on its own.
example=../../../code/statistics/components/tracker/steps/multiple.vue
:::

## Used components

- [Tracker](./)
- [Tracker step](./step)
