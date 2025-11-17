---
outline: deep

props:
    -   name: min-column-width
        description: The minimal width of each pane.
        type: number

slots:
    -   name: default
        description: The panes that should be grouped.
---

# Pane deck

The pane deck is used to group multiple panes together into a cohesive layout. It manages spacing and alignment between panes, helping create organized sections of information or features.

::: render
render=../../../code/guide/components/pane/deck/preview.vue
:::

<FrontmatterDocs/>

## Examples 

::: example Basic || A basic pane deck.
example=../../../code/guide/components/pane/deck/basic.vue
:::

## Used components

- [Layout](../layout)
    - [Grid](../layout/grid)
        - [Auto](../layout/grid/auto)
