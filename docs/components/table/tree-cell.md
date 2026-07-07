---
outline: deep

emits:
    -   name: toggle
        description: Triggered when the marker of an expandable node is clicked. Expansion state is owned by your application, so handle this by flipping your own expanded state and re-rendering the visible rows.
        type: [ ]

props:
    -   name: level
        description: The depth of this node, starting at `0` for a root. The table derives the guide lines from the levels of the visible tree cells around it.
        type: number

    -   name: color
        description: The colour of the marker. Accepts a `FluxColor` or any custom CSS colour string. Defaults to gray, with no distinction between expandable and leaf markers.
        type: "FluxColor | string"
        optional: true
        default: gray

    -   name: is-expandable
        description: Renders the marker as a toggle with a chevron. Leave it off to render a plain leaf marker.
        type: boolean
        optional: true

    -   name: is-expanded
        description: Whether the node is currently expanded. Controls the chevron direction only; your application decides which child rows are rendered.
        type: boolean
        optional: true
        default: false

slots:
    -   name: default
        description: The content of the cell, shown after the marker.

requiredIcons:
    - angle-right
---

# Table tree cell

The table tree cell renders a tree branch, a round marker and its content in a single cell. Place it instead of a [Cell](./cell) in the column that should show the hierarchy, and give that column a (usually empty) [Header](./header). It draws the guide lines automatically from the `level` of the surrounding tree cells, so all you provide is the depth and whether a node is expandable.

::: render
render=../../code/components/table/tree-cell/preview.vue
:::

::: tip Expansion stays in your app
The tree cell holds no expansion state. It only draws the marker and emits `toggle` when an expandable marker is clicked. Keep your own expanded/collapsed state, flatten your tree into the rows you want to render, and pass each node its `level` and `is-expanded`. Collapsing a node simply means rendering fewer rows.
:::

::: warning
This component is best used within a [Row](./row), as the first cell of a column that has a matching [Header](./header).
:::

<FrontmatterDocs/>

## Examples

::: example File tree || A collapsible file tree whose expanded state lives in the page, driving which rows render.
example=../../code/components/table/tree-cell/preview.vue
:::

::: example Coloured markers || The same tree with a `color` per level, mixing `FluxColor` names with your own palette.
example=../../code/components/table/tree-cell/colored.vue
:::

::: example Custom colours || Passing arbitrary CSS colour strings, so each node carries its own hex value.
example=../../code/components/table/tree-cell/custom-color.vue
:::

## Used components

- [Icon](../icon)
