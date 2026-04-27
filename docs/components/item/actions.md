---
outline: deep

props:
    -   name: is-center
        description: Vertically centers the actions within the item.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The action buttons or controls for the item.
---

# Item actions

The item actions area holds buttons or other controls that act on the item, such as edit or delete buttons.

::: render
render=../../code/components/item/actions/preview.vue
:::

::: tip
This component is best used within an [Item](./index).
:::

<FrontmatterDocs/>

## Used components

- [Action bar](../action-bar)
