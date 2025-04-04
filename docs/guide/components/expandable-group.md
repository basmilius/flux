---
outline: deep

props:
    -   name: is-controlled
        description: Allows the group to be controlled through the is-opened prop of each expandable.
        type: boolean
        optional: true

slots:
    -   name: default
        description: Expandables that should be part of the group.
---

# Expandable group

This component groups multiple [Expandables](./expandable) together, allowing for collective control of their open and close states. It provides mechanisms to register, unregister, and close all expandable items within the group. The first item in an uncontrolled group opens by default.

::: render
render=../../code/guide/components/expandable-group/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Default || An expandable group makes sure that only one expandable is open at ant moment. It closes other expandables when one is opened.
example=../../code/guide/components/expandable-group/default.vue
:::

::: example Pane || Grouped expandables are especially nice within a Pane.
example=../../code/guide/components/expandable-group/pane.vue
:::
