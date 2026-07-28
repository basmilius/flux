---
outline: deep

emits:
    -   name: update:is-collapsed
        description: Triggered when the swimlane is collapsed or expanded.
        type: [ boolean ]

props:
    -   name: color
        description: Colors the swimlane header and its count badge.
        type: FluxColor
        optional: true
        default: gray

    -   name: count
        description: A badge value displayed next to the label, typically the number of cards in the swimlane.
        type: number
        optional: true

    -   name: is-collapsed
        description: Controls whether the swimlane is folded shut. Its cards are hidden while collapsed, the column headers stay in place.
        type: boolean
        optional: true
        default: false

    -   name: label
        description: The swimlane title, shown in the header and used as the accessible name of the lane.
        type: string

    -   name: swimlane-id
        description: Unique identifier for this swimlane. Included in move events. Defaults to a generated id, so give an explicit id to recognize the lane in a move event.
        type: [ string, number ]
        optional: true

slots:
    -   name: default
        description: The cells of the swimlane. Place one FluxKanbanColumn per column of the board here.

requiredIcons:
    - angle-right
---

# Kanban swimlane

A swimlane is a horizontal band across a [`FluxKanban`](./) board that groups cards by a second dimension, for instance by assignee, priority or epic. Every lane declares the same columns, so a card sits at the intersection of a column and a lane, and it can be dragged to any other intersection.

::: render
render=../../code/components/kanban/swimlane/preview.vue
:::

::: tip Keyboard support
Grab a card with <kbd>Space</kbd> or <kbd>Enter</kbd>. <kbd>←</kbd>/<kbd>→</kbd> move it to a neighboring column of the same lane, <kbd>↑</kbd>/<kbd>↓</kbd> move it within its cell and continue into the lane above or below. Collapsed lanes are skipped. <kbd>Enter</kbd>/<kbd>Space</kbd> drops the card, <kbd>Escape</kbd> returns it to where it started.
:::

::: warning Same columns in every lane
The board lays all lanes out on one grid. Give every lane the same set of columns, in the same order, otherwise the cells stop lining up. The column headers are rendered once, by the first lane, and stay on screen when that lane is collapsed.
:::

::: warning No column reordering
`reorderable-columns` is ignored on a board with swimlanes. Every lane repeats the same columns, so a reorder would either have to apply to the whole board or be scoped to one lane, and the `move-column` event cannot express that difference.
:::

<FrontmatterDocs/>

## Move event

With swimlanes, the board's `move` event carries the lane a card came from and the lane it was dropped in, on top of the columns:

| Property         | Type                            | Description                            |
|------------------|---------------------------------|----------------------------------------|
| `fromSwimlaneId` | `string \| number \| undefined` | The swimlane the card originated from. |
| `toSwimlaneId`   | `string \| number \| undefined` | The swimlane the card was dropped in.  |

Both are `undefined` on a board without swimlanes. `fromColumnId` and `toColumnId` keep reporting the plain column ids.

## Examples

::: example Basic || Two lanes over the same three columns. Cards move between columns and between lanes.
example=../../code/components/kanban/swimlane/basic.vue
:::

::: example Collapsed || Binding is-collapsed with v-model folds a lane shut without disturbing the rest of the board.
example=../../code/components/kanban/swimlane/collapsed.vue
:::

::: example Colored || Giving each lane a color makes the bands easier to tell apart.
example=../../code/components/kanban/swimlane/colored.vue
:::

::: example Count || Showing the number of cards in a lane next to its label.
example=../../code/components/kanban/swimlane/count.vue
:::

## Used components

- [Badge](../badge)
- [Column](./column)
- [Item](./item)
- [Kanban](./)
