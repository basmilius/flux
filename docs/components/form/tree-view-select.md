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

    -   name: expanded-depth
        description: The number of levels that are visible without interaction whenever the popup opens. `1` shows the roots only, `2` the roots and their children, `Infinity` expands the whole tree. Ancestors of the current selection are expanded on top of this, and a manual collapse keeps working while the popup stays open.
        type: number
        optional: true
        default: 1

    -   name: is-cascading
        description: If selecting a node implicitly covers its whole subtree. Descendants of a selected node are then shown as checked and locked. Only applies together with `is-multiple`. The model value still holds only the explicitly selected ids.
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
        description: An array of colors per depth level, used as a fallback for options that have no `color` of their own. Index 0 = root level, index 1 = first child level, etc. Each entry can be a `FluxColor` name (e.g. `primary`, `danger`) or any CSS color string (e.g. `#6366f1`). Levels without an entry keep the neutral marker.
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
    - angle-right
    - angles-up-down
    - magnifying-glass
    - xmark
---

<script setup>
    import { FluxPane, FluxTable, FluxTableRow, FluxTableCell, FluxTableHeader } from '@flux-ui/components';
</script>

# Tree view select

This is a form select element that displays options in a hierarchical tree structure. It supports expanding and collapsing branches, single and multiple selection, an optional search input for filtering, and cascading selection where picking a parent covers its whole subtree. Each selectable option carries a checkbox (multiple) or radio (single) showing whether it is selected. The tree is rendered with connecting lines to visualize the hierarchy. Every option ends its guide line with a marker of the same size: options with children render it as the expand toggle holding the chevron, leaf options as a plain circle. Markers can be colored per option or per depth level, using either a `FluxColor` name or any CSS/HEX color string.

::: render
render=../../code/components/form/tree-view-select/preview.vue
:::

::: info Accessibility
The trigger is exposed as a `role="combobox"` (`aria-haspopup="tree"`) and the option list as a `role="listbox"`. The highlighted node is tracked through `aria-activedescendant`, selectable nodes carry `role="option"` with `aria-selected`, and non-selectable group headers are marked `role="presentation"`. The option row itself stays the control: its checkbox or radio is a read-only indicator marked `aria-hidden`, so assistive tech announces the selection once, through `aria-selected`. When wrapped in a required [Form field](./field/) the trigger also receives `aria-required`.
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
            <FluxTableCell><p>Unique identifier used as the value when selected.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>label</code></FluxTableCell>
            <FluxTableCell><code>string</code></FluxTableCell>
            <FluxTableCell><p>Display label for the node.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>icon</code></FluxTableCell>
            <FluxTableCell><code>FluxIconName</code></FluxTableCell>
            <FluxTableCell><p>Optional icon shown before the label.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>color</code></FluxTableCell>
            <FluxTableCell><code>FluxColor | string</code></FluxTableCell>
            <FluxTableCell><p>Color of this option's marker, either a <code>FluxColor</code> name or any CSS color string. Takes precedence over <code>level-colors</code>.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>disabled</code></FluxTableCell>
            <FluxTableCell><code>boolean</code></FluxTableCell>
            <FluxTableCell><p>Dims the option and blocks selecting it. Its marker stays clickable, so a disabled branch can still be expanded.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>selectable</code></FluxTableCell>
            <FluxTableCell><code>boolean</code></FluxTableCell>
            <FluxTableCell><p>Whether this node can be selected. Defaults to <code>true</code>. Set to <code>false</code> on parent nodes to make them act as group headers. Clicking them only expands or collapses their children.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><code>children</code></FluxTableCell>
            <FluxTableCell><code>FluxFormTreeViewSelectOption[]</code></FluxTableCell>
            <FluxTableCell><p>Nested child options. A node with children shows an expand/collapse chevron.</p></FluxTableCell>
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
            <FluxTableCell><p>Open the popup (when closed) or select/activate the highlighted node.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Down</kbd></FluxTableCell>
            <FluxTableCell><p>Move highlight to the next visible node.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Up</kbd></FluxTableCell>
            <FluxTableCell><p>Move highlight to the previous visible node.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Right</kbd></FluxTableCell>
            <FluxTableCell><p>Expand the highlighted node (if collapsed). If already expanded, moves to its first child.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Arrow Left</kbd></FluxTableCell>
            <FluxTableCell><p>Collapse the highlighted node (if expanded). If already collapsed, moves to its parent.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Backspace</kbd></FluxTableCell>
            <FluxTableCell><p><em>(multiple mode)</em> Removes the last selected tag when the search field is empty.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Escape</kbd></FluxTableCell>
            <FluxTableCell><p>Close the popup and return focus to the trigger.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell><kbd>Tab</kbd></FluxTableCell>
            <FluxTableCell><p>Close the popup.</p></FluxTableCell>
        </FluxTableRow>
        <FluxTableRow>
            <FluxTableCell>Any letter</FluxTableCell>
            <FluxTableCell><p>Jump to the first visible node whose label starts with that letter.</p></FluxTableCell>
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

::: example Searchable || A tree view select with a search input. Matching nodes keep their place in the hierarchy: their ancestors stay visible and non-matching branches are pruned.
example=../../code/components/form/tree-view-select/searchable.vue
:::

::: example Non-selectable parents || Parent nodes can have `selectable: false` so they act as group headers. Only leaf nodes can be selected.
example=../../code/components/form/tree-view-select/non-selectable-parents.vue
:::

::: example Expanded depth || With `expanded-depth`, the popup opens with more than just its roots visible. Handy when the top level only groups the options that can actually be picked.
example=../../code/components/form/tree-view-select/expanded-depth.vue
:::

::: example Cascading || With `is-cascading`, selecting a parent covers its whole subtree. Its descendants are shown as checked and locked, while the model value keeps only the explicitly selected ids.
example=../../code/components/form/tree-view-select/cascading.vue
:::

::: example Disabled options || Options with `disabled: true` cannot be selected, but their branch can still be expanded.
example=../../code/components/form/tree-view-select/disabled-options.vue
:::

::: example Per-option colors || Coloring each option individually with `color`, instead of per depth level.
example=../../code/components/form/tree-view-select/per-option-colors.vue
:::

::: example Custom colors || Using HEX colors instead of FluxColor names for each level.
example=../../code/components/form/tree-view-select/custom-colors.vue
:::

## Used components

- [Form](../form)
    - [Checkbox](./checkbox)
    - [Input](./input)
    - [Radio](./radio)
- [Icon](../icon)
- [Tag](../tag)
