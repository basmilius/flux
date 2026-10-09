---
outline: deep

emits:
    -   name: intent
        description: Triggered when the pointer rests on the item for a moment, or when it receives focus. Use it to load the detail ahead of time.

props:
    -   name: v-model:expanded
        description: Whether the item is open. Only items with an `expandable` slot can open.
        type: boolean
        optional: true
        default: false

    -   name: color
        description: Tints the summary of the item.
        type: FluxColor
        optional: true

    -   name: is-expand-loading
        description: Shows a spinner over the card instead of the expandable content.
        type: boolean
        optional: true

slots:
    -   name: default
        description: The summary row. It is a grid on the `columns` of the list, so every child takes one column.

    -   name: expandable
        description: The content that shows when the item is open.
---

# Card list item

One row of a [Card list](./). Clicks on links, buttons and inputs inside the summary do not toggle the item.

<FrontmatterDocs/>
