---
outline: deep

props:
    -   name: card-id
        description: Unique identifier for this card. Included in move events.
        type: [ string, number ]

    -   name: column-id
        description: The column this card currently belongs to. Must match the parent FluxKanbanColumn's column-id.
        type: [ string, number ]

slots:
    -   name: default
        description: The content of the card. Use plain text for simple cards or rich markup for cards with metadata.
---

# Kanban card

A draggable card inside a [`FluxKanbanColumn`](./column). The `card-id` uniquely identifies the card and the `column-id` must match the parent column — the kanban board uses both to compute drop targets and to populate the `move` event.

The default slot is intentionally unopinionated: render a plain string for compact cards, or compose your own layout (title, description, badges, assignees) for richer cards.

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
