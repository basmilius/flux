---
outline: deep

emits:
    -   name: update:model-value
        description: Triggered when the selected value changes.
        type: [ FluxFormTreeViewSelectValue ]

props:
    -   name: model-value
        description: The selected value(s) of the tree view select.
        type: FluxFormTreeViewSelectValue

    -   name: auto-focus
        description: Focus the trigger when the form is mounted.
        type: boolean
        optional: true
        default: false

    -   name: disabled
        description: If the tree view select is disabled.
        type: boolean
        optional: true

    -   name: error
        description: Error message describing why the tree view select is invalid. Sets aria-invalid and a red border.
        type: [ string, null ]
        optional: true

    -   name: is-condensed
        description: Renders the trigger in a compact style with reduced padding.
        type: boolean
        optional: true

    -   name: is-loading
        description: Marks the tree view select as loading.
        type: boolean
        optional: true

    -   name: is-multiple
        description: If the tree view select allows multiple values to be selected.
        type: boolean
        optional: true

    -   name: is-readonly
        description: If the tree view select is readonly. Blocks opening the popup.
        type: boolean
        optional: true

    -   name: is-searchable
        description: If the tree view select has a search input to filter options.
        type: boolean
        optional: true

    -   name: is-secondary
        description: If the field is secondary and is rendered in an alternative style.
        type: boolean
        optional: true

    -   name: name
        description: The name attribute passed to the underlying form control.
        type: string
        optional: true

    -   name: level-colors
        description: An array of colors per depth level. Index 0 = root level, index 1 = first child level, etc. Each entry can be a `FluxColor` name (e.g. `primary`, `danger`) or any CSS color string (e.g. `#6366f1`). Levels without an entry show no color dot.
        type: (FluxColor | string)[]
        optional: true

    -   name: options
        description: The tree structure of options to display.
        type: FluxFormTreeViewSelectOption[]

    -   name: placeholder
        description: The placeholder text to display when no value is selected.
        type: string
        optional: true

requiredIcons:
    - angle-down
    - angle-right
    - check
    - magnifying-glass
---

<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Tree view select

This is a form select element that displays options in a hierarchical tree structure. It supports expanding and collapsing branches, single and multiple selection, an optional search input for filtering, and configurable per-level colors using either a `FluxColor` name or any CSS/HEX color string. The tree structure is rendered with connecting lines to visualize the hierarchy.

::: render
render=../../code/components/form/tree-view-select/preview.vue
:::

<FrontmatterDocs/>

## Option object

Each entry in the `options` array (and nested `children` arrays) is a `FluxFormTreeViewSelectOption`:

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
            <FluxTableCell>Unique identifier used as the value when selected.</FluxTableCell>
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
            <FluxTableCell><code>selectable</code></FluxTableCell>
            <FluxTableCell><code>boolean</code></FluxTableCell>
            <FluxTableCell>Whether this node can be selected. Defaults to <code>true</code>. Set to <code>false</code> on parent nodes to make them act as group headers — clicking them only expands or collapses their children.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>children</code></FluxTableCell>
            <FluxTableCell><code>FluxFormTreeViewSelectOption[]</code></FluxTableCell>
            <FluxTableCell>Nested child options. A node with children shows an expand/collapse chevron.</FluxTableCell>
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
            <FluxTableCell><kbd>Enter</kbd> / <kbd>Space</kbd></FluxTableCell>
            <FluxTableCell>Open the popup (when closed) or select/activate the highlighted node.</FluxTableCell>
        </FluxTableRow>
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
            <FluxTableCell><kbd>Backspace</kbd></FluxTableCell>
            <FluxTableCell><em>(multiple mode)</em> Removes the last selected tag when the search field is empty.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Escape</kbd></FluxTableCell>
            <FluxTableCell>Close the popup and return focus to the trigger.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Tab</kbd></FluxTableCell>
            <FluxTableCell>Close the popup.</FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell>Any letter</FluxTableCell>
            <FluxTableCell>Jump to the first visible node whose label starts with that letter.</FluxTableCell>
        </FluxTableRow>
    </FluxTable>
</FluxPane>

## Examples

::: example Basic || A tree view select with per-level colors.
example=../../code/components/form/tree-view-select/basic.vue
:::

::: example Multiple || A tree view select that allows selecting multiple items across the tree.
example=../../code/components/form/tree-view-select/multiple.vue
:::

::: example Searchable || A tree view select with a search input. Matching nodes are shown flattened while searching.
example=../../code/components/form/tree-view-select/searchable.vue
:::

::: example Non-selectable parents || Parent nodes can have `selectable: false` so they act as group headers. Only leaf nodes can be selected.
example=../../code/components/form/tree-view-select/non-selectable-parents.vue
:::

::: example Custom colors || Using HEX colors instead of FluxColor names for each level.
example=../../code/components/form/tree-view-select/custom-colors.vue
:::

## Used components

- [Form](../form)
    - [Input](./input)
- [Icon](../icon)
- [Tag](../tag)
