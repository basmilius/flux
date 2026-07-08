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

    -   name: leading
        description: Content rendered before the label, such as an [avatar](../avatar), [badge](../badge) or [tag](../tag). Keep it decorative (no link) to avoid nesting interactive elements.

    -   name: trailing
        description: Content rendered after the label, such as a [badge](../badge) or [tag](../tag).

requiredIcons:
    - angle-right
---

# Breadcrumb item

A breadcrumb item is a single step in a [Breadcrumb](../breadcrumb/) trail. Provide a `to` to render it as a router link, an `href` to render it as an external anchor, or neither to mark it as the current page, in which case it becomes plain text with `aria-current="page"`.

Beyond a `label` and `icon`, an item can render richer content through its `leading` and `trailing` slots — an [avatar](../avatar) for a person, a [badge](../badge) for a status, a [tag](../tag) for a label — or fully custom markup through the default slot. When the item is collapsed into an overflow menu, its `label`, `icon` and `leading` slot are shown as a menu entry.

::: render
render=../../code/components/breadcrumb/item/preview.vue
:::

::: warning
This component is best used within a [Breadcrumb](../breadcrumb/).
:::

<FrontmatterDocs/>

## Examples

::: example Current page || Using `is-current` to mark a linked last item as the current page.
example=../../code/components/breadcrumb/item/current.vue
:::

::: example With icons || Add an `icon` to each item to make the trail easier to scan.
example=../../code/components/breadcrumb/item/icons.vue
:::

::: example With an avatar || Use the `leading` slot to render an [avatar](../avatar) for a person or organisation.
example=../../code/components/breadcrumb/item/avatar.vue
:::

::: example With a badge or tag || Use the `trailing` slot to annotate a step with a [badge](../badge) or [tag](../tag).
example=../../code/components/breadcrumb/item/badge.vue
:::

::: example Custom label || Use the default slot to render custom markup instead of the `label` prop.
example=../../code/components/breadcrumb/item/slot.vue
:::

## Used components

- [Icon](../icon)
- [Avatar](../avatar)
- [Badge](../badge)
- [Tag](../tag)
