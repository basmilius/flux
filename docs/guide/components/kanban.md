---
outline: deep

emits:
    -   name: move
        description: Triggered when a card is dragged to a new position or column.
        type: [ FluxKanbanMoveEvent ]

slots:
    -   name: default
        description: Place FluxKanbanColumn components here.
---

# Kanban

A kanban board for organizing cards across draggable columns. Cards can be moved between columns and reordered within a column using drag and drop. The component is fully controlled — the parent is responsible for updating the data after a `move` event.

::: render
render=../../code/guide/components/kanban/preview.vue
:::

<FrontmatterDocs/>

## Move event

The `move` event contains everything needed to update the data:

| Property | Type | Description |
|---|---|---|
| `cardId` | `string \| number` | The ID of the card that was moved. |
| `fromColumnId` | `string \| number` | The column the card originated from. |
| `toColumnId` | `string \| number` | The column the card was dropped into. |
| `beforeCardId` | `string \| number \| undefined` | The card before which the moved card should be inserted. `undefined` means append at the end of the column. |

## FluxKanbanColumn

| Prop | Type | Required | Description |
|---|---|---|---|
| `column-id` | `string \| number` | Yes | Unique identifier for this column. Included in move events. |
| `label` | `string` | Yes | Header label displayed at the top of the column. |

### Slots

| Slot | Description |
|---|---|
| `default` | Card content — place `FluxKanbanCard` components here. |
| `header` | Replaces the default label with a custom header. |
| `actions` | Extra content rendered at the end of the column header (e.g. an add button). |

## FluxKanbanCard

| Prop | Type | Required | Description |
|---|---|---|---|
| `card-id` | `string \| number` | Yes | Unique identifier for this card. Included in move events. |
| `column-id` | `string \| number` | Yes | The column this card currently belongs to. Must match the parent `FluxKanbanColumn`'s `column-id`. |

## Examples

::: example Basic || A task board with draggable cards.
example=../../code/guide/components/kanban/basic.vue
:::

::: example Custom card || Using the default slot to render rich card content.
example=../../code/guide/components/kanban/custom-card.vue
:::

## Used components

- [Kanban column](#fluxkanbancolumn)
- [Kanban card](#fluxkanbancard)
