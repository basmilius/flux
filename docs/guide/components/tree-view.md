---
outline: deep

emits:
    -   name: click
        description: Triggered when a node is clicked.
        type: [ FluxTreeViewOption ]

    -   name: dblclick
        description: Triggered when a node is double-clicked. Also toggles expand/collapse if the node has children.
        type: [ FluxTreeViewOption ]

props:
    -   name: level-colors
        description: An array of colors per depth level. Index 0 = root level, index 1 = first child level, etc. Each entry can be a `FluxColor` name (e.g. `primary`, `danger`) or any CSS color string (e.g. `#6366f1`). Levels without an entry show no color dot.
        type: (FluxColor | string)[]
        optional: true

    -   name: options
        description: The tree structure of nodes to display.
        type: FluxTreeViewOption[]

requiredIcons:
    - angle-down
    - angle-right
---

# Tree view

A standalone tree view component that renders a hierarchical list of nodes with expand/collapse support. Nodes emit `click` and `dblclick` events so the parent can react to user interaction. The tree is rendered inline (not in a popup) and includes connecting lines and per-level color indicators.

::: render
render=../../code/guide/components/tree-view/preview.vue
:::

<FrontmatterDocs/>

## Option object

Each entry in the `options` array (and nested `children` arrays) is a `FluxTreeViewOption`:

| Property | Type | Description |
|---|---|---|
| `id` | `string \| number` | Unique identifier for the node. Included in emitted events. |
| `label` | `string` | Display label for the node. |
| `icon` | `FluxIconName` | Optional icon shown before the label. |
| `children` | `FluxTreeViewOption[]` | Nested child nodes. A node with children shows an expand/collapse chevron. |

## Keyboard navigation

| Key | Action |
|---|---|
| `Arrow Down` | Move highlight to the next visible node. |
| `Arrow Up` | Move highlight to the previous visible node. |
| `Arrow Right` | Expand the highlighted node (if collapsed). If already expanded, moves to its first child. |
| `Arrow Left` | Collapse the highlighted node (if expanded). If already collapsed, moves to its parent. |
| `Enter` / `Space` | Emit `click` for the highlighted node. |
| Any letter | Jump to the first visible node whose label starts with that letter. |

## Examples

::: example Basic || A tree view with per-level colors.
example=../../code/guide/components/tree-view/basic.vue
:::

::: example Events || Responding to click and double-click events.
example=../../code/guide/components/tree-view/events.vue
:::

## Used components

- [Icon](./icon)
