---
outline: deep

props:
    -   name: direction
        description: The orientation of the split.
        type: '''horizontal'' | ''vertical'''
        optional: true
        default: horizontal

    -   name: remember-key
        description: When set, pane sizes are persisted in `localStorage` under this key and restored on the next visit.
        type: string
        optional: true

    -   name: tag
        description: The HTML tag to use for the split view container.
        type: keyof HTMLElementTagNameMap
        optional: true
        default: div

slots:
    -   name: default
        description: A series of `FluxSplitViewPane` components, separated by drag handles.

keyboardShortcuts:
    -   key: ← / ↑
        action: Shrink the pane before the focused handle

    -   key: → / ↓
        action: Grow the pane before the focused handle

    -   key: Shift + arrow
        action: Larger step, 64px instead of 16px

    -   key: Home
        action: Collapse the pane to its minSize

    -   key: End
        action: Expand the pane to its maxSize
---

# Split view

A resizable container that splits its space between two or more `FluxSplitViewPane` children. Drag the handle between panes with mouse, touch, or keyboard to resize. Optionally persist sizes via `remember-key`.

::: render
render=../../../code/components/layout/split-view/preview.vue
:::

::: tip
Each pane is configured via props on `FluxSplitViewPane`. See the [pane reference](./pane).
:::

::: tip
Each resize handle is exposed as a focusable `role="separator"` with a descriptive `aria-label` and a percentage-based `aria-valuenow` / `aria-valuetext`, so the split ratio is announced to assistive technologies. Give each pane a stable `:key` when toggling panes with `v-if` so the remaining panes keep their sizes.
:::

<FrontmatterDocs/>

## Examples

::: example Horizontal || A horizontal split with two panes.
example=../../../code/components/layout/split-view/horizontal.vue
:::

::: example Vertical || A vertical split.
example=../../../code/components/layout/split-view/vertical.vue
:::

::: example Persisted || Use `remember-key` to keep pane sizes between sessions.
example=../../../code/components/layout/split-view/persisted.vue
:::

::: example Nested || Nest split views to build complex layouts.
example=../../../code/components/layout/split-view/nested.vue
:::

