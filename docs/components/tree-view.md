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

<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Tree view

A standalone tree view component that renders a hierarchical list of nodes with expand/collapse support. Nodes emit `click` and `dblclick` events so the parent can react to user interaction. The tree is rendered inline (not in a popup) and includes connecting lines and per-level color indicators.

::: render
render=../code/components/tree-view/preview.vue
:::

<FrontmatterDocs/>

## Option object

Each entry in the `options` array (and nested `children` arrays) is a `FluxTreeViewOption`:

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Property</FluxTableHeader>
                <FluxTableHeader>Type</FluxTableHeader>
                <FluxTableHeader>Description</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><code>id</code></FluxTableCell>
            <FluxTableCell><code>string | number</code></FluxTableCell>
            <FluxTableCell>Unique identifier for the node. Included in emitted events.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>label</code></FluxTableCell>
            <FluxTableCell><code>string</code></FluxTableCell>
            <FluxTableCell>Display label for the node.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>icon</code></FluxTableCell>
            <FluxTableCell><code>FluxIconName</code></FluxTableCell>
            <FluxTableCell>Optional icon shown before the label.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>children</code></FluxTableCell>
            <FluxTableCell><code>FluxTreeViewOption[]</code></FluxTableCell>
            <FluxTableCell>Nested child nodes. A node with children shows an expand/collapse chevron.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Keyboard navigation

<FluxPane>
    <FluxTable>
        <template #header>
            <FluxTableRow>
                <FluxTableHeader>Key</FluxTableHeader>
                <FluxTableHeader>Action</FluxTableHeader>
            </FluxTableRow>
        </template>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Down</kbd></FluxTableCell>
            <FluxTableCell>Move highlight to the next visible node.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Up</kbd></FluxTableCell>
            <FluxTableCell>Move highlight to the previous visible node.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Right</kbd></FluxTableCell>
            <FluxTableCell>Expand the highlighted node (if collapsed). If already expanded, moves to its first child.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Left</kbd></FluxTableCell>
            <FluxTableCell>Collapse the highlighted node (if expanded). If already collapsed, moves to its parent.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Enter</kbd> / <kbd>Space</kbd></FluxTableCell>
            <FluxTableCell>Emit <code>click</code> for the highlighted node.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell>Any letter</FluxTableCell>
            <FluxTableCell>Jump to the first visible node whose label starts with that letter.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Examples

::: example Basic || A tree view with per-level colors.
example=../code/components/tree-view/basic.vue
:::

::: example Events || Responding to click and double-click events.
example=../code/components/tree-view/events.vue
:::

## Used components

- [Icon](./icon)
