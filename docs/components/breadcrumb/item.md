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

    -   name: is-current
        description: Explicitly marks the item as the current page (aria-current="page"). Defaults to true when the item has no link, so set it to mark a linked last item as current, or to keep a non-linked item from being treated as current.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The label content of the item. Falls back to the label prop.

requiredIcons:
    - slash-forward
---

# Breadcrumb item

A breadcrumb item is a single step in a [Breadcrumb](../breadcrumb/) trail. Provide a `to` to render it as a router link, an `href` to render it as an external anchor, or neither to mark it as the current page, in which case it becomes plain text with `aria-current="page"`.

By default an item is treated as the current page exactly when it has no link. Use the `is-current` prop to override this: set it on a linked last item to mark it as the current page, or set it to `false` on a non-linked item so it is not wrongly announced as current.

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

::: example Linked current page || Using `is-current` to mark a linked last item as the current page.
example=../../code/components/breadcrumb/item/current.vue
:::

## Used components

- [Icon](../icon)
