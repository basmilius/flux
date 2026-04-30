---
outline: deep

props:
    -   name: card-id
        description: Unique identifier for this card. Included in move events.
        type: [ string, number ]

    -   name: column-id
        description: The column this card currently belongs to. Must match the parent FluxKanbanColumn's column-id.
        type: [ string, number ]

    -   name: disabled
        description: Disables drag-and-drop for this card. The card stays visible but cannot be picked up or focused.
        type: boolean
        optional: true
        default: 'false'

slots:
    -   name: default
        description: The content of the card. Use plain text for simple cards or rich markup for cards with metadata.
---

# Kanban card

A draggable card inside a [`FluxKanbanColumn`](./column). The `card-id` uniquely identifies the card and the `column-id` must match the parent column — the kanban board uses both to compute drop targets and to populate the `move` event.

The default slot is intentionally unopinionated: render a plain string for compact cards, or compose your own layout (title, description, badges, assignees) for richer cards.

::: tip Keyboard support
A card is focusable. Press <kbd>Space</kbd> or <kbd>Enter</kbd> to pick it up, use <kbd>↑</kbd>/<kbd>↓</kbd> to reposition within the column, <kbd>←</kbd>/<kbd>→</kbd> to move to a sibling column, <kbd>Enter</kbd>/<kbd>Space</kbd> to drop and <kbd>Escape</kbd> to cancel.
:::

::: render
render=../../code/components/kanban/card/preview.vue
:::

<FrontmatterDocs/>

## Examples

::: example Basic || A simple card that only shows a title.
example=../../code/components/kanban/card/basic.vue
:::

::: example Rich content || A card with a title, description and a priority badge.
example=../../code/components/kanban/card/rich.vue
:::

## Used components

- [Column](./column)
- [Kanban](./)
