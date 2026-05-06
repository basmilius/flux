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
---

# Split view

A resizable container that splits its space between two or more `FluxSplitViewPane` children. Drag the handle between panes with mouse, touch, or keyboard to resize. Optionally persist sizes via `remember-key`.

::: render
render=../../../code/components/layout/split-view/preview.vue
:::

::: tip
Each pane is configured via props on `FluxSplitViewPane` — see the [pane reference](./pane).
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

## Keyboard

| Key                                      | Action                                       |
|------------------------------------------|----------------------------------------------|
| `Arrow Left` / `Arrow Up`                | Shrink the pane before the focused handle    |
| `Arrow Right` / `Arrow Down`             | Grow the pane before the focused handle      |
| `Shift + Arrow`                          | Larger step (64px instead of 16px)           |
| `Home`                                   | Collapse the pane to its `minSize`           |
| `End`                                    | Expand the pane to its `maxSize`             |
