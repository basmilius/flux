---
outline: deep

props:
    -   name: is-center
        description: Vertically centers the content within the item.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The textual or inline content of the item.
---

# Item content

The item content area holds the main textual or inline content of an item, such as a title, description, or metadata.

::: render
render=../../code/components/item/content/preview.vue
:::

::: tip
This component is best used within an [Item](./index).
:::

<FrontmatterDocs/>

## Examples

::: example Rich content || Combine a title, description and inline metadata within the content area.
example=../../code/components/item/content/rich.vue
:::

::: example Title variations || Content can be just a title, or a title with a supporting description.
example=../../code/components/item/content/states.vue
:::

::: example Centered || Use `is-center` to vertically center the content next to a taller media element.
example=../../code/components/item/content/centered.vue
:::

## Snippet

::: code-group

<<< @/code/components/item/content/preview.vue [FluxItemContent.vue]

:::
