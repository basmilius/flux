---
outline: deep

slots:
    -   name: default
        description: The items to stack vertically.
---

# Item stack

The item stack renders a vertical list of [Items](./index) with no gap between them, creating a cohesive grouped list appearance.

::: render
render=../../code/components/item/stack/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Rich list || A stack of items with media, content and actions forms a cohesive list.
example=../../code/components/item/stack/rich.vue
:::

## Snippet

::: code-group

<<< @/code/components/item/stack/preview.vue [FluxItemStack.vue]

:::

## Used components

- [Flex](../layout/flex/)
