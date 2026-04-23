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

# Tree view select

This is a form select element that displays options in a hierarchical tree structure. It supports expanding and collapsing branches, single and multiple selection, an optional search input for filtering, and configurable per-level colors using either a `FluxColor` name or any CSS/HEX color string. The tree structure is rendered with connecting lines to visualize the hierarchy.

::: render
render=../../../code/guide/components/form/tree-view-select/preview.vue
:::

<FrontmatterDocs/>

## Option object

Each entry in the `options` array (and nested `children` arrays) is a `FluxFormTreeViewSelectOption`:

| Property | Type | Description |
|---|---|---|
| `id` | `string \| number` | Unique identifier used as the value when selected. |
| `label` | `string` | Display label for the node. |
| `icon` | `FluxIconName` | Optional icon shown before the label. |
| `selectable` | `boolean` | Whether this node can be selected. Defaults to `true`. Set to `false` on parent nodes to make them act as group headers — clicking them only expands or collapses their children. |
| `children` | `FluxFormTreeViewSelectOption[]` | Nested child options. A node with children shows an expand/collapse chevron. |

## Keyboard navigation

| Key | Action |
|---|---|
| `Enter` / `Space` | Open the popup (when closed) or select/activate the highlighted node. |
| `Arrow Down` | Move highlight to the next visible node. |
| `Arrow Up` | Move highlight to the previous visible node. |
| `Arrow Right` | Expand the highlighted node (if collapsed). If already expanded, moves to its first child. |
| `Arrow Left` | Collapse the highlighted node (if expanded). If already collapsed, moves to its parent. |
| `Backspace` | *(multiple mode)* Removes the last selected tag when the search field is empty. |
| `Escape` | Close the popup and return focus to the trigger. |
| `Tab` | Close the popup. |
| Any letter | Jump to the first visible node whose label starts with that letter. |

## Examples

::: example Basic || A tree view select with per-level colors.
example=../../../code/guide/components/form/tree-view-select/basic.vue
:::

::: example Multiple || A tree view select that allows selecting multiple items across the tree.
example=../../../code/guide/components/form/tree-view-select/multiple.vue
:::

::: example Searchable || A tree view select with a search input. Matching nodes are shown flattened while searching.
example=../../../code/guide/components/form/tree-view-select/searchable.vue
:::

::: example Non-selectable parents || Parent nodes can have `selectable: false` so they act as group headers. Only leaf nodes can be selected.
example=../../../code/guide/components/form/tree-view-select/non-selectable-parents.vue
:::

::: example Custom colors || Using HEX colors instead of FluxColor names for each level.
example=../../../code/guide/components/form/tree-view-select/custom-colors.vue
:::

## Used components

- [Form](../../form)
    - [Input](../input)
- [Icon](../../icon)
- [Tag](../../tag)
