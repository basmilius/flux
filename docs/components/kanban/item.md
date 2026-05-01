---
outline: deep

props:
    -   name: column-id
        description: The column this item currently belongs to. Must match the parent FluxKanbanColumn's column-id.
        type: [ string, number ]

    -   name: disabled
        description: Disables drag-and-drop for this item. The item stays visible but cannot be picked up or focused.
        type: boolean
        optional: true
        default: 'false'

    -   name: item-id
        description: Unique identifier for this item. Included in move events.
        type: [ string, number ]

slots:
    -   name: default
        description: The content of the item. The component is unstyled — render whatever markup (and styling) you want here.
---

# Kanban item

A draggable item inside a [`FluxKanbanColumn`](./column). The `item-id` uniquely identifies the item and the `column-id` must match the parent column — the kanban board uses both to compute drop targets and to populate the `move` event.

The component itself is intentionally unstyled — it only adds the interaction layer (drag handle, focus ring, drop indicator). The visual surface (padding, background, border, shadows) is up to you. Render any markup inside the default slot; the examples below all wrap their content in a `<div class="card">` with a `<style scoped>` block.

::: tip Keyboard support
An item is focusable. Press <kbd>Space</kbd> or <kbd>Enter</kbd> to pick it up, use <kbd>↑</kbd>/<kbd>↓</kbd> to reposition within the column, <kbd>←</kbd>/<kbd>→</kbd> to move to a sibling column, <kbd>Enter</kbd>/<kbd>Space</kbd> to drop and <kbd>Escape</kbd> to cancel.
:::

::: render
render=../../code/components/kanban/item/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A minimal item with just a title.
example=../../code/components/kanban/item/basic.vue
:::

::: example Rich content || An item with a title, description and a priority badge.
example=../../code/components/kanban/item/rich.vue
:::

## Used components

- [Column](./column)
- [Kanban](./)
