---
outline: deep

emits:
    -   name: click
        description: Triggered when the item is clicked.
        type: [ MouseEvent ]

props:
    -   name: label
        description: The label of the item.
        type: string
        optional: true

    -   name: icon
        description: An optional icon shown before the label.
        type: FluxIconName
        optional: true

    -   name: to
        description: A router location. When set, the item renders as a router link.
        type: FluxTo
        optional: true

    -   name: href
        description: An external URL. When set, the item renders as an anchor.
        type: string
        optional: true

slots:
    -   name: default
        description: The label content of the item. Falls back to the label prop.

requiredIcons:
    - slash-forward
---

# Breadcrumb item

A breadcrumb item is a single step in a [Breadcrumb](../breadcrumb/) trail. Provide a `to` to render it as a router link, an `href` to render it as an external anchor, or neither to mark it as the current page — in which case it becomes plain text with `aria-current="page"`.

::: render
render=../../code/components/breadcrumb/item/preview.vue
:::

::: warning
This component is best used within a [Breadcrumb](../breadcrumb/).
:::

<FrontmatterDocs/>

## Examples

::: example Current page || A breadcrumb item representing the current page.
example=../../code/components/breadcrumb/item/basic.vue
:::

## Used components

- [Icon](../icon)
